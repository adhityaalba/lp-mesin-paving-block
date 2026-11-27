export type Spec = { label: string; value: string };

export type Machine = {
  slug: string;
  code: string;
  nickname: string;
  tagline: string;
  summary: string;
  description: string[];
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  video?: string;
  highlight: { strength: string; output: string; cycle: string; power: string };
  /** paving pcs per cycle and cycle seconds — used by the calculator */
  calc: { pcsPerCycle: number; cycleSeconds: number };
  general: Spec[];
  main: Spec[];
  support: Spec[];
  productivity: Spec[];
  idealFor: string;
  oldPath: string;
};

export const machines: Machine[] = [
  {
    slug: "rh1e15",
    code: "RH1E15",
    nickname: "The Legend Innovated",
    tagline: "Andalan proyek K500",
    summary:
      "Body plat tebal 10 cm, silinder hidrolik diameter besar, dan multiple vibrasi untuk kepadatan maksimal. Siap untuk spesifikasi proyek pemerintah maupun swasta hingga K500.",
    description: [
      "Generasi inovasi dari CV Multi Baja Technic. RH1E15 dirancang dengan body plat tebal 10 cm dan diameter hidrolis besar sehingga tekanan pres mencapai kekuatan maksimal.",
      "Pengadukan bahan baku di cetakan dibantu multiple vibrasi — kepadatan produk paving tidak perlu diragukan. Dilengkapi turbo blower pendingin vibrator serta komponen elektrik Schneider dan Fuji original.",
    ],
    image: "/brand/rh1e15-hd.webp",
    imageAlt: "Mesin paving block RH1E15 The Legend Innovated warna merah kuning",
    gallery: [
      { src: "/brand/rh1e15-poster.webp", alt: "Brosur RH1E15 The Legend Innovated" },
      { src: "/brand/detail-strip.webp", alt: "Detail rotor vibrator, filter oli, dan vibrasi atas RH1E15" },
      { src: "/brand/rh1e15-brochure.webp", alt: "Spesifikasi dan layout area produksi RH1E15" },
    ],
    highlight: { strength: "K500", output: "15 pcs", cycle: "2× cetak/menit", power: "31 kW" },
    calc: { pcsPerCycle: 15, cycleSeconds: 30 },
    general: [
      { label: "Ukuran palet", value: "700 × 750 × 300 mm" },
      { label: "Efektif area produksi", value: "1.000 m²" },
      { label: "Sistem operasi", value: "Semi automatic" },
    ],
    main: [
      { label: "Vibro atas", value: "CVM 2000" },
      { label: "Vibro bawah", value: "2 × 10 HP" },
      { label: "Motor pompa", value: "Hof V20 10 galon, 7,5 HP" },
      { label: "Vibro hopper", value: "CVM 200, stick handle, hose & pipa hidrolis lebih besar" },
      { label: "Power pack", value: "Elektrik Fuji original, tangki oli lebih besar" },
    ],
    support: [
      { label: "Conveyor", value: "7,5 m × 50 cm, 3 ply, 3 HP" },
      { label: "Mixer", value: "Worm gear WPO 200, 15 HP" },
      { label: "Listrik", value: "31 kW, 3 phase" },
    ],
    productivity: [
      { label: "Paving block", value: "15 pcs · 2× cetak / menit" },
      { label: "Batako", value: "8 pcs · 1× cetak / menit" },
      { label: "Kanstin", value: "10 pcs · 1× cetak / menit" },
    ],
    idealFor: "Pabrik skala menengah–besar & supplier proyek",
    oldPath: "/the-legend-innovated-rh1e15/",
  },
  {
    slug: "rh1s12",
    code: "RH1S12",
    nickname: "The Great Innovated",
    tagline: "Paket pabrik siap jalan",
    summary:
      "Solusi produksi terintegrasi: mesin utama dengan vibrasi superior, mixer worm gear 15 HP, dan conveyor 7,5 m. Cukup siapkan listrik 31 kW dan pabrik siap beroperasi.",
    description: [
      "The Great Innovated RH1S12 lebih dari sekadar mesin — ini paket usaha lengkap yang siap beroperasi sejak hari pertama.",
      "Sudah termasuk Mixer Worm Gear WPO 200 bertenaga 15 HP untuk adukan cepat dan merata, serta conveyor 7,5 meter untuk suplai material tanpa henti. Mesin utamanya memakai vibrasi superior dan komponen hidrolis premium untuk cetakan presisi.",
    ],
    image: "/brand/rh1s12-cutout.webp",
    imageAlt: "Mesin paving block RH1S12 The Great Innovated",
    gallery: [
      { src: "/brand/rh1s12-studio.webp", alt: "Mesin RH1S12 tampak samping" },
      { src: "/brand/detail-strip.webp", alt: "Detail komponen vibrasi dan hidrolik" },
    ],
    highlight: { strength: "SNI", output: "12 pcs", cycle: "1× cetak / 30 dtk", power: "31 kW" },
    calc: { pcsPerCycle: 12, cycleSeconds: 30 },
    general: [
      { label: "Ukuran palet", value: "600 × 750 × 300 mm" },
      { label: "Efektif area produksi", value: "1.000 m²" },
      { label: "Sistem operasi", value: "Semi automatic" },
    ],
    main: [
      { label: "Vibro atas", value: "CVM 500" },
      { label: "Vibro bawah", value: "OTG 2 × 7,5 HP" },
      { label: "Motor pompa", value: "Hof V20 8 galon, 7,5 HP" },
      { label: "Vibro hopper", value: "CVM 200, stick handle, hose & pipa hidrolis lebih besar" },
      { label: "Power pack", value: "Elektrik Fuji original, tangki oli lebih besar" },
    ],
    support: [
      { label: "Conveyor", value: "7,5 m × 40 cm, 3 ply, 2 HP" },
      { label: "Mixer", value: "Worm gear WPO 200, 15 HP" },
      { label: "Listrik", value: "31 kW, 3 phase" },
    ],
    productivity: [
      { label: "Paving block", value: "12 pcs · 1× cetak / 30 detik" },
      { label: "Batako", value: "6 pcs · 1× cetak / 30 detik" },
      { label: "Kanstin", value: "10 pcs · 1× cetak / 30 detik" },
    ],
    idealFor: "Pengusaha yang ingin paket pabrik lengkap",
    oldPath: "/the-great-innovated-rh1s12/",
  },
  {
    slug: "hr6e12",
    code: "HR6E12",
    nickname: "The Best Innovated",
    tagline: "Favorit investor pemula",
    summary:
      "Mengandalkan tekanan hidrolik plus double vibrator yang merata hingga kuat tekan K400. Body kotak tebal yang kokoh — pilihan paling diminati untuk memulai usaha paving.",
    description: [
      "Produk terbaru yang paling diminati pemula investasi pabrik paving block.",
      "Type New HR6E12 mengandalkan tekanan selain vibrasi yang merata hingga mencapai kuat tekan K400. Body kotak tebal yang kokoh, tahan tekanan dan perputaran double vibrator, dengan power pack Fuji original berkapasitas oli 80 liter.",
    ],
    image: "/brand/hr6e12-1.webp",
    imageAlt: "Mesin paving block HR6E12 Multi Baja Technic di workshop",
    gallery: [
      { src: "/brand/hr6e12-9.webp", alt: "HR6E12 tampak depan dengan cetakan paving" },
      { src: "/brand/hr6e12-22.webp", alt: "Panel kontrol dan power pack HR6E12" },
      { src: "/brand/hr6e12-31.webp", alt: "Motor pompa hidrolik HR6E12" },
    ],
    video: undefined,
    highlight: { strength: "K400", output: "12 pcs", cycle: "1× cetak / 30 dtk", power: "25 kW" },
    calc: { pcsPerCycle: 12, cycleSeconds: 30 },
    general: [
      { label: "Ukuran palet", value: "580 × 750 × 280 mm" },
      { label: "Efektif area produksi", value: "1.000 m²" },
      { label: "Sistem operasi", value: "Semi automatic" },
    ],
    main: [
      { label: "Vibro atas", value: "CVM 400" },
      { label: "Vibro bawah", value: "OTG 2 × 5,5 HP" },
      { label: "Motor pompa", value: "Hof V10 6 galon, 5,5 HP" },
      { label: "Kontrol", value: "3 stick handle, hose & pipa hidrolis standar" },
      { label: "Power pack", value: "Elektrik Fuji original, tangki oli 80 liter" },
    ],
    support: [
      { label: "Conveyor", value: "7,5 m × 40 cm, 3 ply, 2 HP" },
      { label: "Mixer", value: "1200 × 500 mm, gardan ex truk as terusan, 7,5 HP 4P" },
      { label: "Listrik", value: "25.000 watt, 3 phase" },
    ],
    productivity: [
      { label: "Paving block", value: "12 pcs · 1× cetak / 30 detik" },
      { label: "Batako", value: "6 pcs · 1× cetak / 30 detik" },
      { label: "Kanstin", value: "10 pcs · 1× cetak / 30 detik" },
    ],
    idealFor: "Pemula & UMKM yang baru membuka pabrik",
    oldPath: "/the-best-innovated-hr6e12/",
  },
];

export function getMachine(slug: string) {
  return machines.find((m) => m.slug === slug);
}

export const compareRows: { label: string; get: (m: Machine) => string }[] = [
  { label: "Kuat tekan", get: (m) => (m.highlight.strength === "SNI" ? "Standar SNI" : `Hingga ${m.highlight.strength}`) },
  { label: "Paving / cetak", get: (m) => m.highlight.output },
  { label: "Siklus", get: (m) => m.highlight.cycle },
  { label: "Ukuran palet", get: (m) => m.general[0].value },
  { label: "Vibro bawah", get: (m) => m.main[1].value },
  { label: "Motor pompa", get: (m) => m.main[2].value },
  { label: "Mixer", get: (m) => m.support[1].value },
  { label: "Listrik", get: (m) => m.support[2].value },
  { label: "Cocok untuk", get: (m) => m.idealFor },
];
