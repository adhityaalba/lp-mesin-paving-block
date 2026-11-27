"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal } from "@/components/motion/reveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = [
  {
    t: "Konsultasi gratis",
    d: "Ceritakan target produksi, luas lahan, dan daya listrik. Kami rekomendasikan tipe mesin yang pas, tanpa kewajiban membeli.",
    pts: ["Target paving & batako per hari", "Lahan efektif ± 1.000 m²", "Listrik 3 phase, 25–31 kW"],
    img: "/brand/hero-yard.webp",
    alt: "Halaman pabrik paving dengan palet paving siap kirim",
    tone: "t-card",
  },
  {
    t: "MOU & DP 30%",
    d: "Kesepakatan dituangkan dalam MOU bermaterai. Cukup DP 30% di awal, sisanya dilunasi saat mesin siap dikirim.",
    pts: ["DP 30% saja", "Pelunasan saat siap kirim", "Bonus 1 set cetakan"],
    img: "/brand/stack.webp",
    alt: "Tumpukan paving abu, merah, dan kuning",
    tone: "t-red",
  },
  {
    t: "Fabrikasi di workshop",
    d: "Material baru berstandar SNI dan komponen elektrik original. Setiap unit dirakit dan diuji di workshop Mojokerto.",
    pts: ["Material baru standar SNI", "Elektrik Fuji & Schneider", "Diuji sebelum dikirim"],
    img: "/brand/hr6e12-22.webp",
    alt: "Panel kontrol dan power pack mesin di workshop",
    tone: "t-card",
  },
  {
    t: "Kirim & rakit di lokasi",
    d: "Dikirim ke seluruh Indonesia, dari Jakarta dan Semarang sampai Bali dan Sumatera. Teknisi kami merakit langsung di pabrik Anda.",
    pts: ["Jangkauan seluruh Indonesia", "Dirakit teknisi kami", "Mixer & conveyor ikut dipasang"],
    img: "/brand/cta-dunes.webp",
    alt: "Pita paving merah mengalir di lanskap",
    tone: "t-red",
  },
  {
    t: "Training sampai lancar",
    d: "Operator dilatih dari takaran campuran bahan baku sampai mesin berproduksi lancar. Pabrik baru bisa dibantu suplai tenaga produksi.",
    pts: ["Takaran campuran & operasi", "Pendampingan sampai lancar", "Hasil K350 – K500"],
    img: "/brand/herringbone.webp",
    alt: "Paving herringbone yang baru dipasang",
    tone: "t-card",
  },
  {
    t: "Garansi 1 tahun",
    d: "Garansi penuh spare part dan service, suku cadang original tersedia, dan purnajual yang responsif lewat WhatsApp.",
    pts: ["Spare part & service", "Suku cadang original", "Respons via WhatsApp"],
    img: "/brand/hr6e12-31.webp",
    alt: "Motor pompa hidrolik mesin paving",
    tone: "t-gold",
  },
];

/** Sticky cards that stack; each one sinks back as the next slides over it. */
export function ProcessStack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".scard");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          // Only scale: animating filter from "none" made GSAP start at brightness(0) (black cards).
          gsap.fromTo(
            card,
            { scale: 1 },
            {
              scale: 0.92 + i * 0.01,
              ease: "none",
              scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="shell sec" aria-labelledby="stack-h">
      <div className="inner" style={{ marginBottom: 32, display: "grid", gap: 10 }}>
        <Reveal as="p" className="label">Alur pemesanan</Reveal>
        <Reveal as="h2" id="stack-h" className="h-sec" delay={0.05} style={{ maxWidth: "18ch" }}>
          Dari konsultasi sampai paving pertama
        </Reveal>
      </div>
      <div className="stack-list">
        {STEPS.map((s, i) => (
          <article key={s.t} className={`scard ${s.tone}`} style={{ top: `calc(90px + ${i * 18}px)` }}>
            <div className="scard-txt">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 16 }}>
                <span className="big tnum">0{i + 1}</span>
                <span className="label">Tahap {i + 1} / {STEPS.length}</span>
              </div>
              <div>
                <h3 style={{ fontSize: "clamp(28px, 3vw, 46px)", letterSpacing: "-0.04em" }}>{s.t}</h3>
                <p className="muted" style={{ marginTop: 12, maxWidth: "46ch" }}>{s.d}</p>
                <ul style={{ marginTop: 20, fontSize: 15 }}>
                  {s.pts.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </div>
            <div className="scard-vis">
              <Image src={s.img} alt={s.alt} fill sizes="(min-width:1080px) 48vw, 100vw" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
