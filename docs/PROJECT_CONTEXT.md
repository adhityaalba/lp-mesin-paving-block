# Konteks proyek

Dokumen acuan kerja lokal. Terakhir dicocokkan dengan repo: 28 November 2026. Perbarui jika keputusan atau implementasi berubah.

## Tujuan

Website mesinpavingblock.id memperkenalkan mesin paving block dan batako, membantu calon pembeli memahami pilihan, dan mengarahkan konsultasi melalui WhatsApp. Prioritas: informasi dapat dipercaya, navigasi jelas, URL artikel lama terjaga, serta kode dan konten mudah dirawat.

Audiens kerja: calon pengusaha paving, pemilik usaha yang ingin meningkatkan produksi, dan pembeli mesin untuk kebutuhan proyek. Ini adalah asumsi editorial berdasarkan isi repo; data pelanggan atau arahan pengguna dapat memperbaikinya.

## Sumber acuan

| Informasi | Sumber repo | Cara memperlakukannya |
|---|---|---|
| Identitas, domain, kontak, CTA | `src/lib/site.ts` | Sumber konfigurasi aplikasi; periksa ulang sebelum perubahan |
| Model dan spesifikasi mesin | Neon `public.products` melalui `src/lib/machines.ts` | Data katalog, bukan bukti pengujian independen |
| Artikel yang ditampilkan | Neon `public.articles` melalui `src/lib/posts.ts` | Cek duplikasi topik sebelum menambah |
| Kontrak data dan validasi | `src/lib/content-schema.ts` | Artikel, produk, dan referensi file gambar |
| Detail artikel | `src/app/[slug]/page.tsx` | URL, metadata, dan tampilan artikel |
| Redirect dan trailing slash | `next.config.ts` | Periksa sebelum perubahan URL |
| Impor WordPress | `scripts/migrate-wp.py` | Tinjau dampak sebelum menjalankan ulang impor |
| Brainstorm awal | `docs/BRAINSTORM.md` | Riwayat ide; tidak otomatis menjadi keputusan aktif |

Identitas yang tercantum dalam konfigurasi: CV Multi Baja Technic, merek Mesin Paving Block, Mojokerto. Model katalog: RH1E15, RH1S12, HR6E12. Ambil nomor kontak dan rincian spesifikasi langsung dari sumber di atas agar tidak membuat salinan yang berbeda.

## Kondisi teknis saat ini

- Next.js App Router, React, TypeScript strict, dan Tailwind. Versi aktual diperiksa di `package.json` dan lockfile.
- `src/app/`: routing, layout, metadata, dan komposisi halaman.
- `src/components/`: komponen tampilan, dikelompokkan menurut penggunaan.
- `src/lib/`: konfigurasi, query Neon server, validasi, dan fungsi domain.
- `src/content/posts.json` dan `src/content/machines.seed.json`: snapshot untuk migrasi awal, bukan sumber runtime. Headless WordPress dan MDX dalam brainstorm bukan implementasi aktif.
- Artikel dan produk dibaca dari Neon melalui `DATABASE_URL`; schema harus dimigrasikan sebelum build. Ikuti [panduan database](DATABASE.md) untuk development dan production.
- `public/`: aset publik. `content/wp-export/` merupakan bahan ekspor lokal yang diabaikan Git.
- Artikel memakai `/{slug}/`, bukan `/artikel/{slug}/`. `/artikel/` adalah indeks. Pertahankan trailing slash dan URL lama.
- Script tersedia: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm run test:content`, `npm run db:migrate`, `npm run db:verify`.

## Status fakta dan klaim

Bedakan “tercantum di kode”, “dikonfirmasi pemilik”, dan “didukung dokumen/bukti”. Jangan menaikkan status klaim hanya karena muncul di artikel lama.

Klaim K350–K500, kesesuaian SNI, garansi satu tahun, DP 30%, bonus cetakan, kapasitas produksi, dan cakupan layanan ditemukan dalam repo. Dokumen ini tidak memverifikasi kebenaran, masa berlaku, atau syaratnya. Sebelum memakainya dalam konten baru, minta bukti atau konfirmasi yang relevan. Jika belum tersedia, simpan pertanyaan dalam draft dan tahan klaim tersebut dari publikasi.

Untuk fakta baru, catat: nilai/klaim, sumber, tanggal konfirmasi, pihak yang mengonfirmasi, syarat berlaku, dan status verifikasi. Informasi yang bertentangan harus diselesaikan bersama pengguna, bukan dipilih diam-diam.

## Suara merek dan batas editorial

- Bahasa Indonesia yang jelas, praktis, dan profesional; sapaan “Anda”.
- Jelaskan istilah teknis saat pertama muncul. Gunakan satuan dan model mesin secara konsisten.
- Dahulukan kebutuhan produksi pembaca sebelum ajakan penjualan.
- CTA spesifik dan wajar, misalnya konsultasi kebutuhan kapasitas, daya, atau tipe mesin.
- Hindari superlatif tanpa bukti, janji keuntungan, kepastian peringkat Google, dan testimoni fiktif.
- Gambar ilustrasi atau hasil AI tidak boleh dipresentasikan sebagai bukti pengiriman, pelanggan, atau kondisi pabrik nyata.

## Keputusan yang memerlukan pembahasan

Perubahan CMS, migrasi format artikel, restrukturisasi besar, URL publik, harga atau kebijakan komersial, dan penambahan layanan berbayar harus dijelaskan dampaknya serta mendapat persetujuan sebelum diterapkan. Perbaikan lokal rutin dalam tugas yang sudah diminta dapat dilanjutkan.
