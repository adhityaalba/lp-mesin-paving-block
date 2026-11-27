#!/usr/bin/env python3
"""Migrate WordPress (Elementor) posts into a clean JSON for Next.js.

Usage:
  python3 -I scripts/migrate-wp.py <posts.json> <wp-content/uploads dir> <project root>

- Pulls only the text-editor widget body out of Elementor markup
- Sanitises HTML to a small whitelist
- Converts featured + inline images to WebP (max 1400px) under public/media/
- Writes src/content/posts.json
"""
import html
import json
import os
import re
import subprocess
import sys
from html.parser import HTMLParser

posts_path, uploads_dir, root = sys.argv[1], sys.argv[2], sys.argv[3]
media_out = os.path.join(root, "public", "media", "artikel")
os.makedirs(media_out, exist_ok=True)

ALLOWED = {"p", "h2", "h3", "h4", "ul", "ol", "li", "strong", "b", "em", "i", "a",
           "table", "thead", "tbody", "tr", "td", "th", "blockquote", "br", "hr", "img"}
VOID = {"br", "hr", "img"}
RENAME = {"h1": "h2", "b": "strong", "i": "em"}
SITE = re.compile(r"^https?://(www\.)?mesinpavingblock\.id")
UPLOAD = re.compile(r"^https?://(www\.)?mesinpavingblock\.id/wp-content/uploads/(.+)$")


def convert(rel_path: str, out_name: str) -> str | None:
    """Convert an upload (preferring the full-size original) to WebP; return public URL."""
    rel_path = rel_path.split("?")[0]
    candidates = [rel_path, re.sub(r"-\d+x\d+(\.\w+)$", r"\1", rel_path),
                  re.sub(r"-scaled(\.\w+)$", r"\1", rel_path)]
    src = next((os.path.join(uploads_dir, c) for c in candidates
                if os.path.isfile(os.path.join(uploads_dir, c))), None)
    if not src:
        return None
    dst = os.path.join(media_out, out_name + ".webp")
    if not os.path.exists(dst):
        subprocess.run(["magick", src, "-resize", "1400x>", "-strip",
                        "-quality", "78", dst], check=True)
    return "/media/artikel/" + out_name + ".webp"


class WidgetExtractor(HTMLParser):
    """Collect raw inner HTML of Elementor text-editor widgets."""

    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.depth = 0
        self.capture_at = None
        self.buf: list[str] = []
        self.chunks: list[str] = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in VOID:
            if self.capture_at is not None:
                self.buf.append(self.get_starttag_text())
            return
        self.depth += 1
        if self.capture_at is None and a.get("data-widget_type") == "text-editor.default":
            self.capture_at = self.depth
            return
        if self.capture_at is not None:
            self.buf.append(self.get_starttag_text())

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if self.capture_at is not None and self.depth == self.capture_at:
            self.chunks.append("".join(self.buf))
            self.buf, self.capture_at = [], None
        elif self.capture_at is not None:
            self.buf.append(f"</{tag}>")
        self.depth -= 1

    def handle_data(self, data):
        if self.capture_at is not None:
            self.buf.append(data)

    def handle_entityref(self, name):
        self.handle_data(f"&{name};")

    def handle_charref(self, name):
        self.handle_data(f"&#{name};")


class Sanitiser(HTMLParser):
    def __init__(self, slug):
        super().__init__(convert_charrefs=False)
        self.out: list[str] = []
        self.slug = slug
        self.img_n = 0

    def handle_starttag(self, tag, attrs):
        tag = RENAME.get(tag, tag)
        if tag not in ALLOWED:
            return
        a = dict(attrs)
        if tag == "a":
            href = (a.get("href") or "").strip()
            href = SITE.sub("", href) or "/"
            ext = href.startswith("http")
            extra = ' target="_blank" rel="noopener noreferrer"' if ext else ""
            self.out.append(f'<a href="{html.escape(href)}"{extra}>')
        elif tag == "img":
            m = UPLOAD.match(a.get("src") or "")
            if not m:
                return
            self.img_n += 1
            url = convert(m.group(2), f"{self.slug}-{self.img_n}")
            if url:
                alt = html.escape(a.get("alt") or "")
                self.out.append(f'<img src="{url}" alt="{alt}" loading="lazy" />')
        else:
            self.out.append(f"<{tag}>")

    def handle_endtag(self, tag):
        tag = RENAME.get(tag, tag)
        if tag in ALLOWED and tag not in VOID:
            self.out.append(f"</{tag}>")

    def handle_data(self, data):
        self.out.append(data)

    def handle_entityref(self, name):
        self.out.append(f"&{name};")

    def handle_charref(self, name):
        self.out.append(f"&#{name};")


def clean(raw: str, slug: str) -> str:
    s = Sanitiser(slug)
    s.feed(raw)
    out = "".join(s.out)
    out = re.sub(r"<(p|li|h2|h3|h4|strong|em)>\s*(&nbsp;|\s)*</\1>", "", out)
    out = re.sub(r"\n{2,}", "\n", out)
    return out.strip()


def text_of(h: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", h))).strip()


posts = json.load(open(posts_path))
result = []
for p in posts:
    slug = p["slug"]
    rendered = p["content"]["rendered"]
    if "data-widget_type" in rendered:
        ex = WidgetExtractor()
        ex.feed(rendered)
        raw = "\n".join(ex.chunks)
    else:
        raw = rendered
    body = clean(raw, slug)
    emb = p.get("_embedded", {})
    cover = None
    fm = (emb.get("wp:featuredmedia") or [{}])[0]
    m = UPLOAD.match(fm.get("source_url") or "")
    if m:
        cover = convert(m.group(2), f"{slug}-cover")
    tags, cats = [], []
    for group in emb.get("wp:term", []):
        for t in group:
            (cats if t.get("taxonomy") == "category" else tags).append(html.unescape(t["name"]))
    plain = text_of(body)
    excerpt = text_of(p.get("excerpt", {}).get("rendered", "")) or plain[:180]
    title = html.unescape(p["title"]["rendered"]).strip()
    if excerpt.lower().startswith(title.lower()):
        excerpt = excerpt[len(title):].strip()
    excerpt = re.sub(r"\s*\[&hellip;\]|\s*\[…\]", "…", excerpt)[:220]
    result.append({
        "slug": slug,
        "title": html.unescape(p["title"]["rendered"]),
        "date": p["date"],
        "modified": p["modified"],
        "excerpt": excerpt,
        "cover": cover,
        "coverAlt": html.unescape(fm.get("alt_text") or p["title"]["rendered"]),
        "categories": sorted(set(cats)),
        "tags": sorted(set(tags)),
        "readingMinutes": max(1, round(len(plain.split()) / 200)),
        "html": body,
    })
    print(f"{slug}: {len(plain.split())} words, cover={'yes' if cover else 'no'}", file=sys.stderr)

result.sort(key=lambda x: x["date"], reverse=True)
out_dir = os.path.join(root, "src", "content")
os.makedirs(out_dir, exist_ok=True)
with open(os.path.join(out_dir, "posts.json"), "w") as f:
    json.dump(result, f, ensure_ascii=False, indent=1)
print(f"wrote {len(result)} posts", file=sys.stderr)
