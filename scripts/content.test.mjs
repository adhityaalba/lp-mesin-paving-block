import test from "node:test";
import assert from "node:assert/strict";
import { sourceContent, fileName } from "./content-data.mjs";
import { publicFileUrl, machineForDisplay, storedMachineSchema } from "../src/lib/content-schema.ts";
import { articleHtml } from "../src/lib/article-html.ts";

test("seed retains all records and only references existing public image files", async () => {
  const data = await sourceContent();
  assert.equal(data.articles.length, 70);
  assert.equal(data.products.length, 3);
  assert.ok(data.imageCount > 0);
  for (const product of data.products) {
    const display = machineForDisplay(product);
    assert.equal(display.image, `/${product.image}`);
    assert.equal(display.studio, `/${product.studio}`);
    assert.deepEqual(display.calc, product.calc);
    if (product.video) assert.equal(display.video, `/${product.video}`);
  }
});
test("public file references reject remote, embedded and traversal paths", () => {
  for (const path of ["https://example.com/a.jpg", "data:image/png;base64,abc", "../a.jpg", "//evil/a.jpg", "brand/%2e%2e/a.jpg", "brand\\a.jpg"]) {
    assert.throws(() => fileName(path));
  }
  assert.equal(publicFileUrl(fileName("/brand/mesin.webp")), "/brand/mesin.webp");
});
test("article HTML strips executable markup and restores inline public image URLs", () => {
  const input = '<p onclick="alert(1)">Text</p><script>alert(1)</script><a href="javascript:alert(1)">link</a><img src="/media/artikel/test.webp" onerror="alert(1)" alt="Test">';
  const stored = articleHtml(input, "storage");
  assert.match(stored, /src="media\/artikel\/test.webp"/);
  assert.doesNotMatch(stored, /onclick|onerror|<script|javascript:/);
  assert.match(articleHtml(stored), /src="\/media\/artikel\/test.webp"/);
  assert.throws(() => articleHtml('<img src="https://example.com/a.jpg">'));
});
test("invalid product capacity cannot reach the calculator", async () => {
  const { products } = await sourceContent();
  assert.throws(() => storedMachineSchema.parse({ ...products[0], calc: { pcsPerCycle: 15, cycleSeconds: 0 } }));
});
test("product video references cannot load remote or embedded content", async () => {
  const { products } = await sourceContent();
  for (const video of ["https://example.com/track.mp4", "data:video/mp4;base64,abc", "../private.mp4"]) {
    assert.throws(() => storedMachineSchema.parse({ ...products[0], video }));
  }
});
