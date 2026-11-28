import assert from "node:assert/strict";
import { sourceContent } from "./content-data.mjs";
import { connectDatabase, failSafely } from "./db-common.mjs";

// Client feedback received 28 November 2026. Update media and the corrected offer only.
const productSlugs = ["rh1e15", "rh1s12"];
const articleSlug = "jenis-cetakan-paving-block";
const oldOffer = "Saat ini tersedia promo <strong>gratis 1 set cetakan</strong> untuk setiap pembelian mesin (syarat dan ketentuan berlaku).";
const newOffer = "Setiap pembelian mesin mendapat <strong>gratis setting dan training di lokasi</strong>.";

try {
  const source = await sourceContent();
  const products = productSlugs.map((slug) => {
    const product = source.products.find((item) => item.slug === slug);
    assert.ok(product, `Missing seed: ${slug}`);
    const { image, imageAlt, studio, gallery, video } = product;
    return { slug, image, imageAlt, studio, gallery, video: video ?? null };
  });
  const article = source.articles.find((item) => item.slug === articleSlug);
  assert.ok(article?.html.includes(newOffer));
  console.log("Validated original media for RH1E15/RH1S12 and the corrected offer in one article.");
  if (!process.argv.includes("--apply")) {
    console.log("Dry run. Apply with --apply --target-host=<approved database hostname> after the media files are available in that environment.");
  } else {
    const sql = connectDatabase({ requireTarget: true });
    const [existingProducts, existingArticles] = await sql.transaction([
      sql`SELECT slug FROM public.products WHERE slug = ANY(${productSlugs})`,
      sql`SELECT html FROM public.articles WHERE slug = ${articleSlug}`,
    ], { readOnly: true });
    assert.equal(existingProducts.length, products.length, "Expected products must already exist");
    assert.equal(existingArticles.length, 1, "Expected article must already exist");
    assert.ok(existingArticles[0].html.includes(oldOffer) || existingArticles[0].html.includes(newOffer), "Article offer changed; review before updating");
    await sql.transaction([
      ...products.map((product) => sql`
        UPDATE public.products SET image = ${product.image}, "imageAlt" = ${product.imageAlt},
          studio = ${product.studio}, gallery = ${JSON.stringify(product.gallery)}::jsonb, video = ${product.video}
        WHERE slug = ${product.slug}
      `),
      sql`UPDATE public.articles SET html = replace(html, ${oldOffer}, ${newOffer}), modified = ${article.modified}
          WHERE slug = ${articleSlug} AND strpos(html, ${oldOffer}) > 0`,
    ]);
    const [savedProducts, savedArticles] = await sql.transaction([
      sql`SELECT slug, image, "imageAlt", studio, gallery, video FROM public.products WHERE slug = ANY(${productSlugs})`,
      sql`SELECT html FROM public.articles WHERE slug = ${articleSlug}`,
    ], { readOnly: true });
    for (const expected of products) {
      assert.deepEqual(savedProducts.find((item) => item.slug === expected.slug), expected);
    }
    assert.ok(savedArticles[0].html.includes(newOffer));
    assert.ok(!savedArticles[0].html.includes(oldOffer));
    console.log("Verified: media updated for 2 products; article offer corrected. Other product fields and article content preserved.");
  }
} catch (error) { failSafely(error); }
