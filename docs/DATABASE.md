# Database artikel dan produk

## Sumber data

Aplikasi membaca Neon PostgreSQL melalui `@neondatabase/serverless` di server. `DATABASE_URL` wajib tersedia saat build dan runtime. Tidak ada fallback diam-diam ke JSON jika koneksi atau tabel bermasalah.

- `public.articles`: satu baris per slug artikel, termasuk judul, tanggal asli, metadata, HTML, kategori, tags, dan urutan.
- `public.products`: satu baris per slug produk, termasuk identitas, deskripsi, spesifikasi, kalkulator, galeri, dan urutan. Data bertingkat memakai JSONB.
- `src/lib/content-schema.ts`: validasi data dan kontrak tipe.
- `src/lib/posts.ts` dan `src/lib/machines.ts`: pembacaan server dengan cache Next.js `minutes` (revalidasi setelah 60 detik, stale client 5 menit, expiry 1 jam; bukan pembaruan real-time).
- Komponen client menerima data lewat props; driver dan kredensial tidak masuk bundle browser.

Gambar tetap berada di `public/`. Kolom gambar menyimpan nama file relatif, misalnya `brand/rh1e15-hd.webp` atau `media/artikel/topik.webp`. Subfolder dipertahankan untuk menghindari benturan nama. Aplikasi menambahkan `/` saat menampilkan gambar. HTML artikel juga menyimpan referensi file gambar lokal, disanitasi dan dipulihkan menjadi URL publik saat dibaca. Tidak ada binary, base64, atau host gambar yang disimpan pada field gambar.

## Lingkungan

- Lokal: `.env.local` dengan `DATABASE_URL` branch **development**. File ini diabaikan Git.
- Vercel Production: `DATABASE_URL` dari branch **main** yang dikelola integrasi Neon.
- Preview: perlu variabel koneksi ke branch terpisah sebelum build. Jangan mengarahkannya ke production secara tidak sengaja.
- Node.js 22.18+ diperlukan untuk script migrasi yang membaca modul TypeScript secara native. Gunakan versi Node yang konsisten di lokal dan Vercel.

Jangan menyalin kredensial development ke environment Production. Database branch development dan main terpisah; migrasi di development tidak otomatis membuat tabel di main.

## Migrasi awal

Sumber migrasi: `src/content/posts.json` (ekspor artikel lama) dan `src/content/machines.seed.json` (snapshot katalog sebelum migrasi). Keduanya dipertahankan sebagai bahan impor, bukan sumber runtime. Mengedit seed tidak otomatis memperbarui database.

1. Pasang dependency sesuai lockfile dengan `npm ci`.
2. Validasi data dan semua file gambar tanpa menghubungi database:

   ```sh
   npm run test:content
   npm run db:migrate
   ```

3. Periksa branch dan hostname target di Neon; gunakan kredensial branch yang sesuai di `DATABASE_URL`.
4. Setelah tindakan migrasi target itu diizinkan pengguna, jalankan:

   ```sh
   npm run db:migrate -- --apply --target-host=HOST_DATABASE_YANG_DISETUJUI
   npm run db:verify
   ```

Hostname tidak memuat username/password. Argumen target wajib cocok dengan koneksi. Variabel environment proses mengungguli `.env.local`; jangan menjalankan dengan environment yang tidak diketahui.

DDL di `db/migrations/001_content.sql` dan impor dijalankan dalam satu transaksi. Jika gagal, transaksi dibatalkan. Slug adalah primary key; `ON CONFLICT (slug) DO NOTHING` membuat pengulangan tidak menggandakan atau menimpa baris lama. Impor tidak menghapus record. Verifikasi membandingkan semua field dan urutan seed, sehingga akan melaporkan perbedaan bila konten sudah diedit di database; jangan memaksa overwrite untuk meloloskan verifikasi.

Perubahan schema berikutnya harus memakai migrasi baru; `CREATE TABLE IF NOT EXISTS` ini tidak mengubah struktur tabel yang sudah ada.

## Perubahan konten berikutnya

Edit data pada database branch yang sesuai, validasi kontrak, dan uji tampilan sebelum publikasi. HTML disanitasi saat dibaca; field gambar wajib berupa file relatif yang tersedia dalam deployment `public/`. Gambar baru tetap perlu ditambahkan ke repo dan dideploy dengan izin pengguna.

Saat ini belum ada dashboard admin atau status draft. Semua baris artikel yang valid dibaca sebagai artikel publik. Jangan menyimpan draft ke tabel aktif production. Penambahan workflow draft memerlukan implementasi terpisah.

Cache direvalidasi mengikuti traffic dan profil `minutes`; perubahan tidak dijamin tampil segera. Belum ada endpoint publik untuk invalidasi cache.

## Rilis production

Sebelum commit/push/deploy, ikuti `GIT_WORKFLOW.md`:

1. Pastikan migrasi, verifikasi, lint, typecheck, dan build development lolos.
2. Dapatkan izin migrasi branch main; periksa isi target dan backup jika sudah memiliki data.
3. Jalankan migrasi dan verifikasi menggunakan koneksi production melalui environment yang aman. Jangan mengganti koneksi lokal development secara permanen.
4. Pastikan environment target Vercel memiliki koneksi dan schema siap **sebelum** build versi baru dijalankan.
5. Commit/push/deploy hanya setelah izin masing-masing diberikan. Push bisa memicu build otomatis.
6. Verifikasi home, indeks/detail artikel, katalog/detail produk, sitemap, kalkulator, dan gambar setelah deploy.

Jika rilis aplikasi perlu dibatalkan, versi kode sebelumnya masih dapat menggunakan snapshot file lamanya. Jangan otomatis menghapus tabel atau me-reset branch database sebagai langkah rollback.
