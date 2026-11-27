import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Cta } from "@/components/cta";
import { Reveal } from "@/components/motion/reveal";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Promo Mesin Paving Block — Free 1 Set Cetakan, DP 30%",
  description:
    "Spesial promo mesin paving block CV Multi Baja Technic: free 1 set cetakan (mould), DP 30% dan sisa dibayar saat mesin siap kirim. Garansi 1 tahun.",
  alternates: { canonical: "/promo/" },
};

const perks = [
  { t: "Free 1 set cetakan", d: "Bonus mould untuk setiap pembelian unit mesin. Pilih motif paving yang paling laku di daerah Anda." },
  { t: "DP cukup 30%", d: "Sisa pembayaran dilunasi setelah mesin paving block siap dikirim. Modal awal lebih ringan." },
  { t: "Garansi 1 tahun", d: "Full spare part dan service, ditambah training operator sampai produksi lancar." },
  { t: "Kirim dan pasang", d: "Ke seluruh Indonesia. Teknisi kami merakit mesin langsung di lokasi Anda." },
];

export default function PromoPage() {
  const msg = "Halo, saya mau klaim promo free 1 set cetakan + DP 30%. Mohon info mesin & harganya.";
  return (
    <>
      <PageHero
        title="Free cetakan, DP cukup 30%"
        lead="Ingin mempercepat produksi paving block? Mulai dengan mesin yang handal dan modal awal yang lebih ringan."
        img="/brand/rh1e15-poster.webp"
        alt="Poster mesin paving block RH1E15 The Legend Innovated"
        crumbs={[{ label: "Promo" }]}
        actions={
          <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn primary">
            Klaim promo <span className="arrow">→</span>
          </a>
        }
      />

      <section className="section wrap">
        <div className="big-list">
          {perks.map((p) => (
            <Reveal key={p.t} className="big-item">
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="room flip">
          <Reveal className="room-img tall" style={{ background: "var(--surface)" }}>
            <Image src="/brand/rh1e15-hd.webp" alt="Mesin paving block RH1E15" fill sizes="(min-width:1080px) 40vw, 100vw" className="object-contain p-[8%]" />
          </Reveal>
          <Reveal className="room-txt" delay={0.1}>
            <p className="small dim">Paling dicari</p>
            <h3 style={{ marginTop: 8 }}>RH1E15, The Legend Innovated</h3>
            <p className="muted">
              Body plat tebal 10 cm, diameter hidrolis besar, multiple vibrasi, turbo blower pendingin vibrator, dan
              elektrik Schneider serta Fuji original. Layak untuk spesifikasi proyek hingga K500.
            </p>
            <Link href="/mesin/rh1e15/" className="textlink">
              Spesifikasi RH1E15 <span>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <Cta title="Klaim promonya" />
    </>
  );
}
