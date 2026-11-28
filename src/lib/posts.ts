import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { database } from "@/lib/db";
import { storedPostSchema, publicFileUrl, type Post } from "@/lib/content-schema";
import { articleHtml } from "@/lib/article-html";

export type { Post } from "@/lib/content-schema";

export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("articles");
  const rows = await database()`SELECT * FROM public.articles ORDER BY position, slug`;
  return rows.map((row) => {
    const post = storedPostSchema.parse(row);
    return { ...post, cover: post.cover ? publicFileUrl(post.cover) : null, html: articleHtml(post.html) };
  });
}

export async function getPost(slug: string) {
  return (await getPosts()).find((post) => post.slug === slug);
}

export async function relatedPosts(post: Post, n = 3) {
  const tags = new Set(post.tags);
  return (await getPosts())
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.tags.filter((t) => tags.has(t)).length }))
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, n)
    .map((x) => x.p);
}
