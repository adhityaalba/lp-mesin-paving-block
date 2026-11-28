export const site = {
  name: "CV Multi Baja Technic",
  brand: "Mesin Paving Block",
  domain: "https://mesinpavingblock.id",
  tagline: "Produsen Mesin Cetak Paving Block & Batako",
  description:
    "Produsen mesin paving block & batako hidrolik dari Mojokerto. Hasil cetak K350–K500 sesuai SNI, garansi 1 tahun, DP 30%, kirim & instalasi ke seluruh Indonesia.",
  phone: "0812-1696-9177",
  phoneRaw: "6281216969177",
  email: "cv.multibajatechnic@yahoo.com",
  address: {
    street: "Jl. Plososari Padangan No. 9, Dsn. Tirim",
    village: "Desa Plososari, Kec. Puri",
    city: "Kab. Mojokerto",
    region: "Jawa Timur",
    country: "ID",
  },
  mapsQuery: "Plososari Padangan No.9 Puri Mojokerto",
  founded: 2023,
  copyrightYear: 2026,
} as const;

export function waLink(message?: string) {
  const text =
    message ??
    "Halo CV Multi Baja Technic, saya ingin konsultasi mesin paving block.";
  return `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(text)}`;
}

export const nav = [
  { href: "/mesin/", label: "Mesin" },
  { href: "/tentang/", label: "Tentang" },
  { href: "/promo/", label: "Promo" },
  { href: "/artikel/", label: "Artikel" },
  { href: "/kontak/", label: "Kontak" },
] as const;

export const trustPoints = [
  "Kuat tekan K350–K500",
  "Garansi 1 tahun",
  "DP 30%",
  "Gratis setting dan training di lokasi",
  "Training operator",
  "Kirim seluruh Indonesia",
  "Material baru standar SNI",
  "MOU bermaterai",
] as const;

export const faqs = [
  {
    q: "Berapa standar kuat tekan paving block yang dihasilkan mesin CV Multi Baja Technic?",
    a: "Mesin cetak kami memakai sistem hidrolik dan vibrasi ganda. Hasil cetakan mampu mencapai kuat tekan K350 hingga K500, sehingga memenuhi standar SNI untuk proyek infrastruktur pemerintah maupun konstruksi komersial.",
  },
  {
    q: "Apakah melayani pengiriman dan instalasi ke luar Jawa Timur?",
    a: "Ya. Kami melayani pemesanan, pengiriman, dan instalasi mesin ke seluruh Indonesia — termasuk Jakarta, Semarang, Bali, hingga kawasan industri di Sumatera. Tim kami turun langsung untuk perakitan di lokasi Anda.",
  },
  {
    q: "Apa saja garansi yang didapatkan?",
    a: "Setiap unit dilengkapi garansi resmi 1 tahun penuh, termasuk spare part dan service. Kami juga menjamin ketersediaan suku cadang asli dan layanan purnajual yang responsif.",
  },
  {
    q: "Apakah pengoperasian mesin memerlukan keahlian khusus?",
    a: "Tidak. Mesin didesain mudah dioperasikan, dan teknisi kami melatih karyawan Anda mulai dari mencampur bahan baku hingga mesin berproduksi lancar. Untuk pabrik baru, kami bisa bantu suplai tenaga produksi bila diperlukan.",
  },
  {
    q: "Bagaimana sistem pembayarannya?",
    a: "Down payment 30% di awal. Sisa pembayaran dilunasi setelah mesin siap dikirim. Kerja sama diikat dengan MOU bermaterai.",
  },
  {
    q: "Mesin bisa mencetak produk apa saja?",
    a: "Paving block berbagai motif (holland, segi enam, cacing, dll.), batako, dan kanstin — cukup dengan mengganti cetakan (mould). Setiap pembelian mendapat gratis setting dan training di lokasi.",
  },
] as const;
