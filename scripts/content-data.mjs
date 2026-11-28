import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { storedPostSchema, storedMachineSchema, publicFileSchema } from "../src/lib/content-schema.ts";
import { articleHtml } from "../src/lib/article-html.ts";

const root = new URL("../", import.meta.url);
export function fileName(value) {
  return publicFileSchema.parse(value.replace(/^\/(?!\/)/, ""));
}
export async function sourceContent() {
  const [posts, machines] = await Promise.all([
    readFile(new URL("src/content/posts.json", root), "utf8").then(JSON.parse),
    readFile(new URL("src/content/machines.seed.json", root), "utf8").then(JSON.parse),
  ]);
  const articles = posts.map((post, position) => ({
    ...storedPostSchema.parse({ ...post, cover: post.cover ? fileName(post.cover) : null, html: articleHtml(post.html, "storage") }), position,
  }));
  const products = machines.map((machine, position) => ({
    ...storedMachineSchema.parse({
      ...machine, image: fileName(machine.image), studio: fileName(machine.studio),
      gallery: machine.gallery.map((image) => ({ ...image, src: fileName(image.src) })),
    }), position,
  }));
  for (const rows of [articles, products]) {
    if (new Set(rows.map((row) => row.slug)).size !== rows.length) throw new Error("Duplicate source slugs");
  }
  const reserved = new Set(["artikel", "mesin", "kontak", "promo", "tentang"]);
  if (articles.some((article) => reserved.has(article.slug))) throw new Error("Article slug collides with a route");
  const images = [
    ...articles.flatMap((article) => [article.cover, ...Array.from(article.html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g), (match) => match[1])]),
    ...products.flatMap((product) => [product.image, product.studio, ...product.gallery.map((image) => image.src)]),
  ].filter(Boolean);
  for (const file of new Set(images)) {
    await access(fileURLToPath(new URL(`public/${publicFileSchema.parse(file)}`, root)));
  }
  return { articles, products, imageCount: new Set(images).size };
}
