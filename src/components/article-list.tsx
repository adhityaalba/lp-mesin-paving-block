"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/lib/posts";

const PAGE = 12;

export function ArticleList({ posts, tags }: { posts: Post[]; tags: string[] }) {
  const [tag, setTag] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(PAGE);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (!tag || p.tags.includes(tag)) &&
        (!needle || p.title.toLowerCase().includes(needle) || p.excerpt.toLowerCase().includes(needle)),
    );
  }, [posts, tag, q]);

  return (
    <section className="section wrap">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center" }}>
        <div className="seg" role="group" aria-label="Filter topik">
          {[null, ...tags].map((t) => (
            <button
              key={t ?? "all"}
              type="button"
              aria-pressed={tag === t}
              className={tag === t ? "on" : ""}
              onClick={() => {
                setTag(t);
                setLimit(PAGE);
              }}
            >
              {tag === t && <motion.span layoutId="tag-seg" className="seg-bg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span>{t ?? "Semua"}</span>
            </button>
          ))}
        </div>
        <label className="field" style={{ width: "min(100%, 320px)" }}>
          <span className="sr-only">Cari artikel</span>
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setLimit(PAGE);
            }}
            placeholder="Cari artikel"
          />
        </label>
      </div>

      <p className="small dim" style={{ marginTop: 20 }} aria-live="polite">
        {filtered.length} artikel
      </p>

      <motion.ul layout className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" style={{ marginTop: 28 }}>
        <AnimatePresence mode="popLayout">
          {filtered.slice(0, limit).map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: Math.min(i % PAGE, 6) * 0.03 }}
            >
              <PostCard post={p} priority={i < 3} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {limit < filtered.length && (
        <div style={{ marginTop: 64, display: "flex", justifyContent: "center" }}>
          <button type="button" className="btn" onClick={() => setLimit((l) => l + PAGE)}>
            Muat lebih banyak · {filtered.length - limit} lagi
          </button>
        </div>
      )}
    </section>
  );
}
