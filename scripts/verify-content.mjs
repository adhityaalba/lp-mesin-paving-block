import assert from "node:assert/strict";
import { sourceContent } from "./content-data.mjs";
import { connectDatabase, failSafely } from "./db-common.mjs";
import { storedPostSchema, storedMachineSchema } from "../src/lib/content-schema.ts";

try {
  const source = await sourceContent();
  const sql = connectDatabase();
  const [articles, products] = await sql.transaction([
    sql`SELECT * FROM public.articles ORDER BY position, slug`,
    sql`SELECT * FROM public.products ORDER BY position, slug`,
  ], { readOnly: true });
  for (const [actual, expected, schema] of [
    [articles, source.articles, storedPostSchema], [products, source.products, storedMachineSchema],
  ]) {
    actual.forEach((row) => schema.parse({ ...row, video: row.video ?? undefined }));
    for (const item of expected) {
      const row = actual.find((row) => row.slug === item.slug);
      assert.ok(row, `Missing record: ${item.slug}`);
      assert.deepEqual(schema.parse({ ...row, video: row.video ?? undefined }), schema.parse({ ...item, video: item.video ?? undefined }), `Content differs: ${item.slug}`);
      assert.equal(row.position, item.position);
    }
  }
  console.log(`Verified full seed content and ordering: ${source.articles.length} articles, ${source.products.length} products; ${source.imageCount} local images exist.`);
  console.log(`Total database records: ${articles.length} articles, ${products.length} products.`);
} catch (error) { failSafely(error); }
