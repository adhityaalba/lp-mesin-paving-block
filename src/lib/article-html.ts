import sanitizeHtml from "sanitize-html";
import { publicFileSchema, publicFileUrl } from "./content-schema.ts";

/** Both storage and rendering use the same allowlist; inline images stay in public/. */
export function articleHtml(html: string, mode: "storage" | "display" = "display") {
  return sanitizeHtml(html, {
    allowedTags: ["p", "h2", "h3", "h4", "ul", "ol", "li", "strong", "b", "em", "i", "a",
      "table", "thead", "tbody", "tr", "td", "th", "blockquote", "br", "hr", "img"],
    allowedAttributes: {
      a: ["href", "title", "rel"], img: ["src", "alt", "loading", "width", "height"],
      td: ["colspan", "rowspan"], th: ["colspan", "rowspan", "scope"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    transformTags: {
      img: (_tag, attrs) => {
        // Only a single leading slash is accepted from the legacy public URLs.
        const file = publicFileSchema.safeParse((attrs.src ?? "").replace(/^\/(?!\/)/, ""));
        if (!file.success) throw new Error("Article image must refer to a file in public/");
        return { tagName: "img", attribs: { ...attrs, src: mode === "storage" ? file.data : publicFileUrl(file.data) } };
      },
    },
  });
}
