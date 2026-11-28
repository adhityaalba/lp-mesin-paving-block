# Aturan kode dan workflow implementasi

## Sebelum mengubah

1. Baca konteks proyek dan aturan lokal terkait.
2. Periksa status Git dan diff agar perubahan pengguna tetap terjaga.
3. Temukan implementasi yang sudah ada melalui Graphify dan pencarian terarah.
4. Nyatakan hasil yang dituju dan kriteria selesai. Tanyakan hanya informasi yang menghalangi keputusan penting.
5. Untuk kode Next.js, baca panduan relevan di `node_modules/next/dist/docs/`; jangan mengandalkan pola versi lama. Jika panduan belum tersedia, cari dokumentasi resmi yang sesuai versi.

## Struktur dan tanggung jawab

- Pertahankan struktur yang ada. Route mengatur komposisi halaman; logika yang dipakai lintas halaman berada di modul domain; komponen fokus pada UI.
- Simpan data produk, kontak, dan konten pada sumber yang jelas. Jangan menyalin data tersebut ke banyak komponen.
- Gunakan komponen bersama ketika ada kebutuhan nyata berulang. Hindari abstraksi generik hanya untuk kemungkinan masa depan.
- Pisahkan fungsi ketika tanggung jawabnya bercampur atau sulit dibaca, bukan semata karena batas jumlah baris.
- Gunakan pola penamaan yang sudah berlaku: nama file deskriptif, komponen PascalCase, fungsi/variabel camelCase, tipe bernama sesuai domain.
- Hindari folder serba guna yang menampung logika tidak berhubungan. Letakkan helper dekat fitur jika hanya dipakai fitur itu.

## Implementasi

- Pertahankan TypeScript strict. Hindari `any`, non-null assertion, dan type assertion yang menyembunyikan ketidakpastian tanpa alasan.
- Validasi data dari luar pada batas masuk. Perlakukan HTML impor sebagai input yang membutuhkan sanitasi; jangan menambahkan HTML mentah yang belum dipercaya.
- Buat alur data eksplisit dan fungsi deterministik bila memungkinkan. Hindari efek samping tersembunyi.
- Gunakan batas server/client sesuai kebutuhan dan dokumentasi versi terpasang. Jangan membuat seluruh halaman menjadi client hanya untuk satu interaksi.
- Komentar menjelaskan alasan atau batasan yang tidak jelas dari kode. Hapus import/kode mati yang terkait perubahan.
- Gunakan token desain dan komponen yang tersedia. Periksa tampilan mobile, navigasi keyboard, label, fokus, serta reduced motion untuk perubahan UI.
- Dependency baru harus memiliki kebutuhan konkret. Pakai kemampuan yang tersedia jika memadai; bahas penambahan besar atau layanan eksternal terlebih dahulu.
- Jangan membaca atau menampilkan secret tanpa kebutuhan tugas, memasukkannya ke source, log, konten, atau bundle browser.
- Jangan melakukan refactor luas, format seluruh repo, atau upgrade dependency dalam tugas kecil yang tidak memerlukannya.

## Pemeriksaan sesuai dampak

| Perubahan | Pemeriksaan minimum yang relevan |
|---|---|
| Dokumentasi saja | Isi, konsistensi aturan, tautan lokal, diff dan whitespace |
| Artikel/data | Struktur data, fakta, slug unik, tautan/aset, tampilan halaman terkait |
| TypeScript/komponen | Lint, pemeriksaan tipe, perilaku yang diubah |
| Routing/rendering/config/build | Pemeriksaan di atas ditambah production build dan route terkait |
| Perbaikan bug/logika penting | Reproduksi dan pengujian regresi yang membuktikan perilaku |

Perintah yang tersedia: `npm run lint`, `./node_modules/.bin/tsc --noEmit`, `npm run build`. Verifikasi ketersediaannya sebelum menjalankan; jangan mengklaim `npm test` ada jika belum dikonfigurasi. Build tidak sama dengan izin deploy.

Jangan menambah test untuk dokumentasi atau test yang hanya menyalin implementasi. Bila pemeriksaan gagal, bedakan kegagalan akibat perubahan dengan masalah yang sudah ada. Laporkan pemeriksaan yang tidak dijalankan dan alasannya.

## Kriteria selesai

- Perilaku memenuhi permintaan dan tetap dalam lingkup.
- Diff ditinjau; perubahan pengguna tidak tertimpa.
- Pemeriksaan yang relevan selesai atau hambatannya dijelaskan.
- Dokumentasi dan kontrak data terkait diperbarui jika berubah.
- Ringkasan berisi hasil, lokasi penting, verifikasi, dan keterbatasan.
- Commit, pull, push, dan deployment mengikuti izin terpisah dalam workflow Git.
