import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { Item, Reveal, Stagger } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Promo Mesin Paving Block — Free 1 Set Cetakan, DP 30%",
  description:
    "Spesial promo mesin paving block CV Multi Baja Technic: free 1 set cetakan (mould), DP 30% dan sisa dibayar saat mesin siap kirim. Garansi 1 tahun.",
  alternates: { canonical: "/promo/" },
};

const perks = [
  { t: "Free 1 set cetakan", d: "Bonus mould untuk setiap pembelian unit mesin. Pilih motif paving yang paling laku di daerah Anda.", tone: "red" },
  { t: "DP cukup 30%", d: "Sisa pembayaran dilunasi setelah mesin siap dikirim. Modal awal lebih ringan.", tone: "" },
  { t: "Garansi 1 tahun", d: "Full spare part dan service, ditambah training operator sampai produksi lancar.", tone: "" },
  { t: "Kirim & rakit", d: "Ke seluruh Indonesia. Teknisi kami merakit mesin langsung di lokasi Anda.", tone: "gold" },
];

export default function PromoPage() {
  const msg = "Halo, saya mau klaim promo free 1 set cetakan + DP 30%. Mohon info mesin & harganya.";
  return (
    <>
      <PageHero
        title="Free cetakan, DP cukup 30%"
        lead="Mulai produksi paving dengan mesin yang handal dan modal awal yang lebih ringan."
        img="/brand/cta-dunes.webp"
        alt="Pita paving merah mengalir di lanskap"
        crumbs={[{ label: "Promo" }]}
        actions={<Pill href={waLink(msg)}>Klaim promo</Pill>}
      />
      <section className="shell sec">
        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => (
            <Item key={p.t} className={`card pad lift ${p.tone}`} style={{ minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <span className="label">0{i + 1}</span>
              <div>
                <h2 className="h-card">{p.t}</h2>
                <p className="muted" style={{ marginTop: 8, fontSize: 15 }}>{p.d}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </section>
      <section className="shell" style={{ paddingBottom: "clamp(40px, 6vw, 80px)" }}>
        <div className="two inner" style={{ alignItems: "center" }}>
          <Reveal className="l card" style={{ padding: 8 }}>
            <div className="relative aspect-[904/1280] overflow-hidden" style={{ borderRadius: 14 }}>
              <Image src="/brand/rh1e15-poster.webp" alt="Poster mesin RH1E15 The Legend Innovated" fill sizes="(min-width:1080px) 36vw, 92vw" className="object-cover" />
            </div>
          </Reveal>
          <div className="r">
            <Reveal as="p" className="label">Paling dicari</Reveal>
            <Reveal as="h2" className="h-sec" delay={0.05} style={{ marginTop: 10 }}>RH1E15, The Legend Innovated</Reveal>
            <Reveal as="p" className="muted" delay={0.1} style={{ marginTop: 14 }}>
              Body plat tebal 10 cm, diameter hidrolis besar, multiple vibrasi, turbo blower pendingin vibrator, dan elektrik Schneider serta Fuji original.
              Layak untuk spesifikasi proyek hingga K500.
            </Reveal>
            <Reveal delay={0.15} style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Pill href="/mesin/rh1e15/">Spesifikasi RH1E15</Pill>
              <Pill href={waLink(msg)} tone="ghost" icon={false}>Tanya promo</Pill>
            </Reveal>
          </div>
        </div>
      </section>
      <CtaBanner title="Klaim promonya sekarang" message={msg} />
    </>
  );
}
