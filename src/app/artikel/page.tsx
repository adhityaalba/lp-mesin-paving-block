import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ArticleList } from "@/components/article-list";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Artikel & Panduan Usaha Paving Block",
  description:
    "Panduan memilih mesin paving block, perawatan, kapasitas produksi, rasio campuran, hingga peluang usaha paving dan batako.",
  alternates: { canonical: "/artikel/" },
};

export default function ArtikelPage() {
  const tags = Array.from(
    posts.flatMap((p) => p.tags).reduce((m, t) => m.set(t, (m.get(t) ?? 0) + 1), new Map<string, number>()),
  )
    .filter(([, n]) => n >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([t]) => t);

  return (
    <>
      <PageHero
        title="Artikel dan panduan produksi"
        lead={`${posts.length} tulisan tentang memilih mesin, kapasitas, perawatan, rasio campuran, sampai strategi usaha paving.`}
        img="/brand/stack.webp"
        alt="Tumpukan paving hasil produksi"
        crumbs={[{ label: "Artikel" }]}
      />
      <ArticleList posts={posts.map((p) => ({ ...p, html: "" }))} tags={tags} />
    </>
  );
}
