# Brainstorming — Redesign mesinpavingblock.id → Next.js

> Sumber: WordPress (Elementor) mesinpavingblock.id — CV Multi Baja Technic, Mojokerto.
> Konten mentah sudah diekspor via REST API ke `content/wp-export/` (11 page, 70 artikel, 95 media, kategori).

---

## 1. Audit situs lama (temuan)

| Area | Kondisi sekarang | Masalah |
|---|---|---|
| Struktur | 11 halaman Elementor, tiap halaman **mengulang blok yang sama** (hero RH1E15, Kenapa Kami, Tentang Kami, Promo) | Konten duplikat → SEO lemah, user bingung "halaman ini beda apa?" |
| Produk | 3 tipe: **RH1E15 (The Legend)**, **RH1S12 (The Great)**, **HR6E12 (The Best)** | Spek ditulis sebagai teks bebas, tidak bisa dibandingkan |
| Artikel | 70 post SEO (kapasitas, 2 vs 4 cetakan, perawatan, kota: Jakarta/Surabaya/Semarang) | Aset terkuat situs — wajib dipertahankan URL-nya |
| CTA | "Pesan Sekarang" / "Hubungi Kami" → WA 0812-1696-9177 | Tidak ada konteks produk yang dibawa ke WA |
| Trust | Garansi 1 thn, K350–K500, DP 30%, MOU bermaterai, free 1 set cetakan | Tersebar, tidak ditonjolkan; tanpa foto pabrik/testimoni/peta klien |
| Teknis | Copyright 2023, typo ("Berganasi", "mouding", "dilengkapo") | Kesan kurang terawat |

## 2. Tujuan redesign

1. **Lead WhatsApp berkualitas** — user datang dengan tipe mesin + kebutuhan kapasitas yang sudah jelas.
2. **Pertahankan & naikkan SEO** — URL artikel identik (`/{slug}/`), schema Product/Article/FAQ/LocalBusiness, Core Web Vitals hijau.
3. **Kredibilitas pabrikan** — tampil sebagai produsen serius, bukan reseller.
4. **Mudah dikelola** — tim bisa tambah artikel tanpa developer.

## 3. Sitemap usulan

```
/                         Home (satu cerita utuh, tanpa duplikasi)
/mesin                    Katalog + tabel perbandingan 3 tipe
/mesin/rh1e15             The Legend   (redirect dari /the-legend-innovated-rh1e15/)
/mesin/rh1s12             The Great    (redirect dari /the-great-innovated-rh1s12/)
/mesin/hr6e12             The Best     (redirect dari /the-best-innovated-hr6e12/)
/kalkulator               Kalkulator kapasitas & estimasi ROI  ← magnet lead baru
/tentang                  Profil pabrik, proses produksi, galeri, legalitas
/promo                    Promo aktif (free cetakan, DP 30%)
/artikel                  Blog + filter kategori
/{slug}/                  Artikel (URL lama dipertahankan persis)
/area/[kota]              Landing lokal (Jakarta, Surabaya, Semarang, Bali, Sumatera…)
/kontak                   WA, form, peta Google, alamat
```
`/kenapakami`, `/tentangkami`, `/hubungikami` → 301 ke halaman baru.

## 4. Ide fitur (prioritas)

**Must (MVP)**
- Tabel perbandingan spek 3 mesin (output/menit, daya listrik, vibro, palet, harga "mulai dari"/hubungi).
- Tombol WA kontekstual: `Halo, saya tertarik RH1E15 untuk kapasitas ±X pcs/hari…` (pesan pre-filled per halaman).
- Sticky CTA bar di mobile (WA + Telepon).
- Migrasi 70 artikel + gambar, redirect 301 lengkap, sitemap.xml, robots, OG image otomatis.
- FAQ dengan schema (sudah ada di home lama).

**Should**
- **Kalkulator produksi**: input target m²/hari → rekomendasi tipe mesin, jam kerja, estimasi omzet. Hasil bisa dikirim ke WA.
- Galeri/video mesin beroperasi + foto pengiriman ke klien (bukti sosial).
- Badge trust: Garansi 1 thn · K350–K500 · SNI material · MOU bermaterai · Training operator.

**Could**
- Peta sebaran klien Indonesia.
- Halaman spare part & cetakan (motif paving: holland, segi enam, cacing, kanstin).
- Download brosur PDF (lead capture opsional).

## 5. Arah desain (hasil ui-ux-pro-max)

- **Pattern:** Trust & Authority + Conversion — Hero kredibilitas → Bukti (angka, garansi) → Produk → CTA jelas.
- **Style:** "Industrial clean" — kontras tinggi, grid tegas, foto mesin besar, garis/sudut tajam (radius kecil 4–6px), tanpa gradient ungu/AI-look.
- **Warna** (Construction/Industrial palette, disesuaikan):

  | Role | Hex | Catatan |
  |---|---|---|
  | Primary (steel) | `#1E293B` | header, footer, teks judul |
  | Secondary | `#64748B` | teks sekunder |
  | Accent / CTA | `#EA580C` safety orange | hanya untuk CTA & highlight; teks di atasnya hitam/putih tebal ≥4.5:1 dicek |
  | WhatsApp | `#16A34A` | tombol WA saja |
  | Background | `#F8FAFC` / Card `#FFFFFF` | |
  | Border | `#E2E8F0` | |

- **Tipografi** — opsi:
  - A. **Bebas Neue** (display, judul besar caps) + **Source Sans 3** (body) → kesan industri/berat. *(rekomendasi)*
  - B. **Outfit** + **Rubik** → lebih modern/startup.
- **Motion:** level 4/10 — reveal & stagger ringan saat scroll, angka spek "count-up", hormati `prefers-reduced-motion`.
- **Ikon:** Lucide (SVG), tanpa emoji.
- **Aksesibilitas:** fokus ring jelas, target sentuh ≥44px, body ≥16px, alt text semua foto mesin.

## 6. Arsitektur teknis

- **Next.js 16 (App Router) + TypeScript + Tailwind v4** — sudah di-scaffold di folder ini.
- **Rendering:** SSG/ISR untuk semua halaman → cepat & murah di Vercel.
- **Konten — 3 opsi:**

  | Opsi | Cara | + | − |
  |---|---|---|---|
  | **A. Headless WordPress** | WP tetap jadi CMS, Next.js ambil via REST/WPGraphQL, ISR | Tim tetap nulis di WP, nol migrasi | WP tetap harus di-hosting & diamankan |
  | **B. MDX di repo** | Artikel dikonversi ke `.mdx` | Gratis, super cepat, versi di Git | Penulis harus pakai Git / perlu developer |
  | **C. Headless CMS** (Sanity/Payload) | Migrasi sekali ke CMS baru | UX editor modern | Biaya/effort migrasi |

  **Rekomendasi:** mulai **A (headless WP)** agar SEO & alur tim tidak terganggu; produk (3 tipe) di-hardcode sebagai data TypeScript terstruktur supaya tabel perbandingan & schema konsisten. Bisa pindah ke B/C nanti.
- **Gambar:** `next/image` (AVIF/WebP), `remotePatterns` ke domain WP atau salin ke Vercel Blob.
- **Form kontak:** Server Action → kirim ke WA/email (Resend) — opsional.
- **Analytics:** Vercel Analytics + Speed Insights, event klik WA.
- **Domain:** mesinpavingblock.id dipindah ke Vercel setelah QA; WP pindah ke subdomain mis. `cms.mesinpavingblock.id`.

## 7. Roadmap

1. **Fase 0** (sekarang) — scaffold, Vercel, brainstorming ✅
2. **Fase 1** — design tokens + komponen (Header, Hero, ProductCard, SpecTable, WAButton, FAQ, Footer)
3. **Fase 2** — Home, Katalog, 3 detail mesin, Kontak, Tentang
4. **Fase 3** — Artikel (headless WP) + redirect 301 + sitemap + schema
5. **Fase 4** — Kalkulator produksi, landing per kota
6. **Fase 5** — QA (Lighthouse, a11y), preview di Vercel, switch domain

## 8. Pertanyaan untuk Anda

1. CMS: tetap WordPress (headless) atau pindah total?
2. Apakah boleh menampilkan **harga** (atau "mulai dari Rp…")?
3. Ada foto/video asli pabrik & mesin? (gambar sekarang banyak hasil AI generator)
4. Tipografi: opsi A (Bebas Neue, industrial) atau B (Outfit, modern)?
5. Nomor WA & email tetap 0812-1696-9177 / yahoo? (disarankan email domain sendiri)
6. Ada testimoni/daftar klien yang boleh dipublikasikan?
