import { readFile } from "node:fs/promises";
import { sourceContent } from "./content-data.mjs";
import { connectDatabase, failSafely } from "./db-common.mjs";

try {
  const { articles, products, imageCount } = await sourceContent();
  console.log(`Validated ${articles.length} articles, ${products.length} products, ${imageCount} local image files.`);
  if (!process.argv.includes("--apply")) {
    console.log("Dry run complete. To migrate, add --apply --target-host=<database hostname>. Existing slugs will be preserved.");
  } else {
    const sql = connectDatabase({ requireTarget: true });
    const schema = await readFile(new URL("../db/migrations/001_content.sql", import.meta.url), "utf8");
    const result = await sql.transaction([
      ...schema.split("-- statement").map((statement) => sql.query(statement)),
      sql`INSERT INTO public.articles SELECT * FROM jsonb_populate_recordset(NULL::public.articles, ${JSON.stringify(articles)}::jsonb) ON CONFLICT (slug) DO NOTHING RETURNING slug`,
      sql`INSERT INTO public.products SELECT * FROM jsonb_populate_recordset(NULL::public.products, ${JSON.stringify(products)}::jsonb) ON CONFLICT (slug) DO NOTHING RETURNING slug`,
    ]);
    console.log(`Committed: ${result.at(-2).length} new articles, ${result.at(-1).length} new products. Existing records were not overwritten.`);
  }
} catch (error) { failSafely(error); }
