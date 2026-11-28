import type { MetadataRoute } from "next";
import { getMachines } from "@/lib/machines";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [machines, posts] = await Promise.all([getMachines(), getPosts()]);
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
