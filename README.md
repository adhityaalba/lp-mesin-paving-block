# Mesin Paving Block — CV Multi Baja Technic

Company profile mesinpavingblock.id, dibangun ulang dengan Next.js 16 (App Router), Three.js, Lenis, GSAP, dan Motion.

## Branch

| Branch    | Fungsi                                                  |
| --------- | ------------------------------------------------------- |
| `main`    | Production. Setiap push ke `main` dideploy ke produksi. |
| `develop` | Pengembangan lokal. Push ke `develop` = preview Vercel.  |

Alur kerja: kerjakan di `develop`, lalu merge ke `main` saat siap rilis.

## Menjalankan lokal

```bash
npm install
npm run dev
```

## Konten

- Artikel: `src/content/posts.json`, hasil migrasi WordPress lewat `scripts/migrate-wp.py`.
- Data mesin: `src/lib/machines.ts`. Info perusahaan & kontak: `src/lib/site.ts`.
- Gambar & video: `public/brand`, `public/media`, `public/video`.
