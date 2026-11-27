import type { MetadataRoute } from "next";
import { machines } from "@/lib/machines";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "mesin/", "tentang/", "promo/", "artikel/", "kontak/"].map((p) => ({
    url: `${site.domain}/${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  return [
    ...pages,
    ...machines.map((m) => ({ url: `${site.domain}/mesin/${m.slug}/`, priority: 0.9 })),
    ...posts.map((p) => ({ url: `${site.domain}/${p.slug}/`, lastModified: p.modified, priority: 0.6 })),
  ];
}
