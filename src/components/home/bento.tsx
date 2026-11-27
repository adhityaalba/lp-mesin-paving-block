"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { Item, Parallax, Reveal, Stagger } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
import { ArrowUR } from "@/components/ui/icons";
import type { FinishKey, MouldKey } from "@/components/three/mould-viewer";
import { waLink } from "@/lib/site";

const MouldViewer = dynamic(() => import("@/components/three/mould-viewer"), { ssr: false });

const MOULDS: { key: MouldKey; label: string; note: string }[] = [
  { key: "holland", label: "Holland", note: "Paving 20 × 10 cm, motif paling laku untuk jalan lingkungan dan parkiran." },
  { key: "hexagon", label: "Segi enam", note: "Tampilan rapi untuk taman, trotoar, dan area komersial." },
  { key: "cacing", label: "Cacing", note: "Saling mengunci kuat, cocok untuk area dengan beban kendaraan." },
  { key: "kanstin", label: "Kanstin", note: "Pembatas jalan dan taman, dicetak dengan mesin yang sama." },
];
const FINISHES: { key: FinishKey; label: string; swatch: string }[] = [
  { key: "abu", label: "Abu natural", swatch: "#a8a297" },
  { key: "merah", label: "Merah", swatch: "#c8242a" },
  { key: "emas", label: "Kuning", swatch: "#c9a63a" },
];

const BARS = [
  { k: "K225", h: 38 },
  { k: "K300", h: 52 },
  { k: "K350", h: 64, hot: true },
  { k: "K400", h: 78, hot: true },
  { k: "K450", h: 88, hot: true },
  { k: "K500", h: 100, hot: true },
];

/** Every route through the dot grid lights a few "delivery" points. */
const DOTS = Array.from({ length: 7 * 12 }, (_, i) => i);
const LIT = new Set([15, 20, 29, 41, 44, 52, 58, 63, 70]);

export function Bento() {
  const [mould, setMould] = useState<MouldKey>("holland");
  const [finish, setFinish] = useState<FinishKey>("abu");
  const current = MOULDS.find((m) => m.key === mould)!;

  return (
    <section className="shell sec" aria-labelledby="bento-h">
      <div className="inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 24, flexWrap: "wrap", marginBottom: 32 }}>
        <div>
          <Reveal as="h2" id="bento-h" className="h-sec">Dibangun untuk produksi serius</Reveal>
          <Reveal as="p" className="muted" delay={0.08} style={{ marginTop: 10 }}>
            Satu mesin, banyak motif. Hasil padat dari palet pertama sampai terakhir.
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <Pill href="/mesin/" tone="ghost" icon={false} size="sm">Lihat semua mesin</Pill>
        </Reveal>
      </div>

      <Stagger className="bento">
        {/* 3D mould viewer */}
        <Item className="card pad b-3d lift" style={{ display: "flex", flexDirection: "column", minHeight: 560 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="label">01 / Motif cetakan</span>
            <span className="label">Putar & geser</span>
          </div>
          <div style={{ position: "relative", flex: 1, minHeight: 280, margin: "8px -12px" }}>
            <MouldViewer mould={mould} finish={finish} />
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <h3 className="h-card">{current.label}</h3>
              <motion.p key={mould} className="muted" style={{ marginTop: 6, fontSize: 15 }} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                {current.note}
              </motion.p>
            </div>
            <div className="seg" role="radiogroup" aria-label="Motif cetakan">
              {MOULDS.map((m) => (
                <button key={m.key} type="button" role="radio" aria-checked={mould === m.key} className={mould === m.key ? "on" : ""} onClick={() => setMould(m.key)}>
                  {mould === m.key && <motion.span layoutId="mould-on" className="seg-bg" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  {m.label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }} role="radiogroup" aria-label="Warna paving">
              {FINISHES.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  role="radio"
                  aria-checked={finish === f.key}
                  aria-label={f.label}
                  title={f.label}
                  onClick={() => setFinish(f.key)}
                  style={{
                    width: 28, height: 28, borderRadius: 99, background: f.swatch, cursor: "pointer",
                    boxShadow: finish === f.key ? "0 0 0 3px var(--card), 0 0 0 5px var(--ink)" : "inset 0 0 0 1px rgba(0,0,0,.1)",
                    transition: "box-shadow .25s",
                  }}
                />
              ))}
              <span className="dim" style={{ fontSize: 13, marginLeft: 6 }}>Warna sesuai campuran pigmen</span>
            </div>
          </div>
        </Item>

        {/* Strength bars */}
        <Item className="card pad b-wide lift">
          <span className="card-num">02</span>
          <span className="label">Kuat tekan</span>
          <h3 className="h-card" style={{ marginTop: 10, maxWidth: "18ch" }}>Padat sampai K500, sesuai standar proyek</h3>
          <p className="muted" style={{ marginTop: 8, fontSize: 15, maxWidth: "48ch" }}>
            Sistem hidrolik dan vibrasi ganda menghasilkan paving K350 hingga K500 untuk proyek pemerintah maupun swasta.
          </p>
          <div className="bars" style={{ marginTop: 24 }}>
            {BARS.map((b, i) => (
              <div key={b.k}>
                <motion.i
                  className={b.hot ? "hot" : ""}
                  style={{ height: `${b.h * 0.8}%` }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.08 }}
                />
                <span>{b.k}</span>
              </div>
            ))}
          </div>
        </Item>

        {/* Warranty */}
        <Item className="card pad b-s lift" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <span className="label">03 / Garansi</span>
          <div>
            <b style={{ fontSize: "clamp(44px, 4.4vw, 64px)", fontWeight: 500, letterSpacing: "-0.05em", lineHeight: 1 }}>1 tahun</b>
            <p className="muted" style={{ fontSize: 15, marginTop: 8 }}>Spare part & service penuh, suku cadang original tersedia.</p>
          </div>
        </Item>

        {/* Delivery map */}
        <Item className="card pad b-m lift" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <span className="label">04 / Pengiriman</span>
            <a href={waLink("Halo, saya ingin tahu ongkos kirim & instalasi mesin ke lokasi saya.")} target="_blank" rel="noopener noreferrer" className="circle-ico" aria-label="Tanya ongkos kirim">
              <ArrowUR />
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 8 }} aria-hidden>
            {DOTS.map((d) => (
              <motion.span
                key={d}
                style={{ aspectRatio: "1", borderRadius: 99, background: LIT.has(d) ? "var(--accent)" : "var(--surface-2)" }}
                initial={LIT.has(d) ? { scale: 0 } : false}
                whileInView={LIT.has(d) ? { scale: [0, 1.5, 1] } : undefined}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + (d % 12) * 0.05 }}
              />
            ))}
          </div>
          <p className="muted" style={{ fontSize: 15 }}>Kirim & rakit di lokasi: Jakarta, Semarang, Bali, hingga Sumatera.</p>
        </Item>

        {/* Image */}
        <Item className="card b-img lift" style={{ minHeight: 360 }}>
          <Parallax className="absolute inset-0" amount={6}>
            <Image src="/brand/stack.webp" alt="Tumpukan paving abu, merah, dan kuning hasil cetak yang padat" fill sizes="(min-width:1080px) 56vw, 100vw" className="object-cover" />
          </Parallax>
          <div className="glass" style={{ position: "absolute", left: 16, bottom: 16, padding: "14px 18px", borderRadius: 16, maxWidth: 320 }}>
            <span className="label" style={{ color: "var(--muted)" }}>05 / Hasil cetak</span>
            <p style={{ marginTop: 4, fontWeight: 500 }}>Paving, batako, dan kanstin dari satu mesin, cukup ganti cetakan.</p>
          </div>
        </Item>

        {/* Red promo */}
        <Item className="card pad red b-red lift" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24 }}>
          <span className="label">06 / Spesial promo</span>
          <div>
            <h3 style={{ fontSize: "clamp(32px, 3.4vw, 52px)", letterSpacing: "-0.045em", lineHeight: 0.98 }}>
              Free 1 set cetakan. DP cukup 30%.
            </h3>
            <p style={{ marginTop: 12, fontSize: 15, maxWidth: "40ch" }}>Sisa pembayaran dilunasi saat mesin siap dikirim. Kerja sama diikat MOU bermaterai.</p>
          </div>
          <div>
            <Pill href="/promo/" tone="light" size="sm">Lihat promo</Pill>
          </div>
        </Item>
      </Stagger>
    </section>
  );
}
