# Konteks dan aturan artikel SEO

Gunakan bersama `PROJECT_CONTEXT.md`. Tujuan artikel adalah menjawab kebutuhan calon pembeli secara akurat dan membantu konsultasi yang relevan. Aturan editorial di sini adalah standar proyek; bukan jaminan peringkat atau syarat universal Google.

## Brief sebelum menulis

Salin dan isi untuk setiap tugas artikel. Informasi yang belum diketahui ditandai sebagai pertanyaan, bukan diisi dengan karangan.

```text
Topik/judul kerja:
Target pembaca dan tahap kebutuhannya:
Pertanyaan utama yang harus terjawab:
Tujuan pencarian: informasi / perbandingan / pembelian
Keyword utama:
Topik dan istilah pendukung:
Artikel lama terkait dan keputusan: buat baru / perbarui / gabungkan
Nilai tambah: contoh, data, pengalaman nyata, atau perbandingan
Produk yang relevan:
Fakta + sumber + tanggal verifikasi + syarat berlaku:
Informasi yang perlu dikonfirmasi:
Outline H2/H3:
Slug yang diusulkan atau URL lama yang dipertahankan:
Internal link yang sudah diverifikasi:
Gambar, asal/hak penggunaan, dan alt text:
CTA:
Penulis/reviewer sebenarnya:
Status: draft / siap review / disetujui untuk publikasi
```

## Riset dan ketepatan informasi

- Baca artikel yang sudah ada dan halaman produk terkait. Jika kebutuhan pembaca sama, pertimbangkan memperbarui artikel lama daripada menambah duplikasi.
- Untuk riset pencarian, gunakan hasil aktual bila tersedia. Jangan mengarang volume keyword, tingkat persaingan, posisi pencarian, atau data Search Console. Tanpa data, labeli pilihan keyword sebagai hipotesis.
- Prioritaskan data pemilik, manual resmi, bukti pengujian, dan sumber primer. Catat tanggal untuk harga, promo, spesifikasi, dan kebijakan yang dapat berubah.
- Harga, garansi, sertifikasi, hasil uji, dan testimoni membutuhkan sumber. Keberadaan klaim di repo tidak cukup untuk menyebutnya terverifikasi.
- Kapasitas harus menyertakan asumsi yang relevan, misalnya jenis cetakan, waktu siklus, jam kerja, dan downtime. Pisahkan kapasitas teoretis dari hasil operasi yang diukur.
- Jangan menyimpulkan kuat tekan atau kepatuhan standar hanya dari tipe mesin. Klaim hasil pengujian memerlukan bukti dan kondisi pengujiannya.
- Jika bukti belum tersedia, hilangkan klaim dari naskah publik dan catat kebutuhan konfirmasi untuk pengguna.

## Penulisan dan penyuntingan

- Jawab pertanyaan utama di awal, lalu jelaskan alasan dan langkah yang membantu keputusan pembaca.
- Tulis judul deskriptif, paragraf yang mudah dibaca, serta H2/H3 yang runtut. Standar proyek: satu H1 dari template halaman; isi artikel dimulai dengan H2 bila membutuhkan heading.
- Keyword digunakan alami. Tidak ada target keyword density atau jumlah kata wajib; panjang mengikuti kebutuhan pembahasan.
- Beri nilai tambah yang nyata dan sumber yang jelas. Jangan menyalin pesaing, membuat pengalaman palsu, atau menghasilkan banyak halaman yang hanya mengganti nama kota/keyword.
- FAQ hanya untuk pertanyaan yang relevan dan belum terjawab dengan baik. Tidak wajib untuk setiap artikel.
- Gunakan CTA yang terkait isi; hindari menyisipkan promosi berulang di setiap bagian.
- Reviewer memeriksa fakta, bahasa, logika, dan sumber sebelum naskah dinyatakan siap publikasi. Jangan mencantumkan nama/keahlian reviewer fiktif.

## Metadata, tautan, dan gambar

- Judul dan deskripsi harus mewakili isi secara jujur. Panjang karakter boleh menjadi panduan editorial, bukan batas tetap atau jaminan tampilan Google.
- Gunakan slug singkat dan deskriptif untuk artikel baru; cek keunikan serta benturan dengan route seperti `/mesin/` dan `/kontak/`.
- Pertahankan URL artikel lama `/{slug}/`. Usulkan redirect permanen ke halaman relevan jika perubahan URL disetujui; periksa rantai/loop dan perbarui internal link.
- Gunakan tautan internal dengan anchor yang menjelaskan tujuan. Verifikasi target; jangan mengarang URL. Tautkan sumber luar saat membantu mendukung informasi.
- Gambar informatif memakai alt yang sesuai isi; gambar dekoratif memakai alt kosong. Jangan menjejalkan keyword ke alt.
- Pastikan hak penggunaan, asal gambar, ukuran tampilan, dan beban gambar sesuai kebutuhan. Ilustrasi tidak menjadi bukti pengalaman nyata.

## Integrasi dengan implementasi sekarang

Artikel aktif dibaca dari Neon `public.articles` melalui `src/lib/posts.ts`; tipe dan validasinya ada di `src/lib/content-schema.ts`. `src/content/posts.json` hanya snapshot migrasi. Field konten:

```text
slug, title, date, modified, excerpt, cover, coverAlt,
categories, tags, readingMinutes, html
```

- `title` menjadi judul halaman; `excerpt` saat ini digunakan sebagai meta description. Tinjau keduanya untuk pengguna dan hasil pencarian.
- Isi `date` dan `modified` dengan tanggal yang benar. Jangan mengubah tanggal hanya agar terlihat baru; `modified` mengikuti pembaruan substansial.
- `html` harus aman dan sesuai struktur template; aplikasi melakukan sanitasi saat membaca. Gambar, termasuk gambar inline, disimpan sebagai nama file relatif terhadap `public/`, tanpa binary/base64/domain. Ikuti `DATABASE.md` untuk impor.
- Periksa tipe, slug unik, aset cover, kategori/tags, dan estimasi waktu baca yang sesuai isi.
- Brief, sumber, dan status editorial adalah konteks kerja; jangan menambah field runtime atau mengganti format penyimpanan tanpa implementasi yang sesuai.
- Runtime saat ini belum memiliki field status draft dalam tipe `Post`. Semua baris tabel artikel dibaca sebagai konten publik. Draft jangan dimasukkan ke tabel production lalu dianggap tersembunyi. Simpan sebagai draft lokal terpisah bila diminta; publikasi memerlukan persetujuan.

## Pemeriksaan sebelum publikasi

- Pertanyaan pembaca terjawab dan tidak tumpang tindih tanpa nilai tambah dengan artikel lama.
- Klaim penting didukung sumber; tidak ada placeholder, informasi palsu, atau pertanyaan internal dalam naskah publik.
- Judul, deskripsi, URL, tanggal, heading, gambar, dan link sudah diperiksa.
- Halaman tampil baik di mobile dan desktop; navigasi serta CTA berfungsi.
- URL final mengembalikan halaman yang benar; canonical konsisten; halaman yang ingin diindeks bebas dari `noindex` yang tidak disengaja; sitemap memuat URL yang memang ingin diindeks.
- Structured data sesuai konten yang terlihat dan pedoman resmi terbaru untuk jenisnya. Jangan menjanjikan rich result atau menambahkan schema hanya untuk mengejar tampilannya.
- Persetujuan pengguna untuk publikasi/deploy sudah jelas. Commit dan push tetap mengikuti `GIT_WORKFLOW.md`.

Setelah publikasi, evaluasi dengan data aktual yang tersedia: keterindeksan, query, klik, dan konsultasi yang relevan. Jangan mengarang hasil atau menjanjikan waktu naik peringkat. Pemantauan berkala hanya dijadwalkan bila diminta.

## Rujukan resmi

Ditinjau pada 28 November 2026. Periksa lagi jika kebijakan Google atau fitur hasil pencarian berubah.

- [Google: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — dasar konten bermanfaat, orisinal, dan dapat dipercaya; tidak ada jumlah kata favorit Google.
- [Google: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) — dasar judul, struktur, tautan, gambar, dan keterpahaman konten.
