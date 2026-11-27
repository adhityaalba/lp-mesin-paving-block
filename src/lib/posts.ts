import data from "@/content/posts.json";

export type Post = {
  slug: string;
  title: string;
  date: string;
  modified: string;
  excerpt: string;
  cover: string | null;
  coverAlt: string;
  categories: string[];
  tags: string[];
  readingMinutes: number;
  html: string;
};

export const posts = data as Post[];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function relatedPosts(post: Post, n = 3) {
  const tags = new Set(post.tags);
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.tags.filter((t) => tags.has(t)).length }))
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, n)
    .map((x) => x.p);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
