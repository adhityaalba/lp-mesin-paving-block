# Panduan kerja agen — Mesin Paving Block

## Konteks yang wajib dibaca

- Setiap tugas: [konteks proyek](docs/PROJECT_CONTEXT.md) dan [workflow Git](docs/GIT_WORKFLOW.md).
- Perubahan kode atau struktur: [aturan kode](docs/CODE_RULES.md).
- Menulis, mengedit, atau menampilkan artikel: [aturan konten SEO](docs/SEO_CONTENT_RULES.md).
- Mengubah data, schema, migrasi, atau koneksi Neon: [panduan database](docs/DATABASE.md).
- `docs/BRAINSTORM.md` adalah catatan ide historis, bukan bukti bahwa seluruh usulnya sudah diterapkan atau disetujui.
- Baca dokumen sesuai tugas; jangan membuka seluruh repo tanpa kebutuhan.

## Alur kerja

1. Pahami tujuan, lingkup, kriteria selesai, dan perubahan lokal yang sudah ada.
2. Untuk brainstorming, berikan rancangan. Untuk permintaan implementasi yang jelas, kerjakan perubahan lokal dalam lingkup tersebut.
3. Implementasikan perubahan kecil yang mudah ditinjau. Jangan ikut merombak bagian yang tidak terkait.
4. Jalankan pemeriksaan yang relevan dan tinjau diff.
5. Laporkan hasil, pemeriksaan, keterbatasan, dan tindakan yang membutuhkan izin.

## Batas kewenangan

- **Jangan commit, pull, atau push tanpa izin eksplisit pengguna untuk tindakan dan lingkup terkait.** Izin mengedit tidak mencakup ketiganya.
- Izin commit tidak mencakup push. Izin pull tidak mencakup penyelesaian konflik dengan membuang pekerjaan pengguna.
- Jangan menganggap kata “lanjut” sebagai izin Git kecuali jelas menjawab pertanyaan persetujuan tindakan Git yang spesifik.
- Jangan publish artikel, deploy, mengubah domain, atau melakukan tindakan destruktif tanpa izin yang sesuai.
- Siapkan hasil yang konkret dan dapat ditinjau sebelum meminta izin. Jangan meminta ulang izin yang sudah jelas diberikan untuk lingkup yang sama.
- Detail dan contoh persetujuan ada di `docs/GIT_WORKFLOW.md`.

## Graphify pada awal sesi proyek

- Jalankan skill `/graphify` sebelum membaca file secara luas.
- Jika `graphify-out/` sudah ada: baca `graphify-out/GRAPH_REPORT.md`, lalu `/graphify . --update` untuk perubahan sejak pemetaan terakhir.
- Jika belum ada dan folder berisi kode atau dokumen nyata: jalankan `/graphify .`.
- Utamakan `query`, `path`, dan `explain` untuk navigasi; verifikasi file sumber sebelum mengedit.
- Lewati hanya untuk folder trivial atau ketika pengguna meminta melewatinya. Laporkan batas cakupan indeks; jangan menyebut indeks kode sebagai indeks dokumen dan gambar.
- Hasil Graphify tidak otomatis masuk staging atau commit.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
