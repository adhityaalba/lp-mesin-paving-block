"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
import type { Machine } from "@/lib/content-schema";
import { waLink } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;
const PCS_PER_M2 = 50; // holland 20×10 cm
const DAYS = 25;

function Num({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString("id-ID"));
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.7, ease });
    return () => c.stop();
  }, [value, mv]);
  return <motion.span>{text}</motion.span>;
}

export function Calculator({ machines }: { machines: Machine[] }) {
  const [mi, setMi] = useState(0);
  const [hours, setHours] = useState(8);
  const [eff, setEff] = useState(70);
  const m = machines[mi] ?? machines[0];
  if (!m) return null;
  const perDay = (3600 / m.calc.cycleSeconds) * m.calc.pcsPerCycle * hours * (eff / 100);
  const m2 = perDay / PCS_PER_M2;
  const msg = `Halo, saya menghitung di website: mesin ${m.code}, ${hours} jam/hari, efisiensi ${eff}% ≈ ${Math.round(perDay).toLocaleString("id-ID")} paving/hari (${Math.round(m2)} m²). Mohon info harga & detailnya.`;

  return (
    <section className="shell sec" aria-labelledby="calc-h" style={{ paddingTop: 0 }}>
      <div className="two inner" style={{ alignItems: "center" }}>
        <div className="l">
          <Reveal as="p" className="label">Kalkulator produksi</Reveal>
          <Reveal as="h2" id="calc-h" className="h-sec" delay={0.05} style={{ marginTop: 10 }}>
            Berapa paving per hari?
          </Reveal>
          <Reveal as="p" className="lead" delay={0.1} style={{ marginTop: 14 }}>
            Geser kontrolnya. Angka dihitung dari siklus cetak tiap mesin, lalu dikoreksi dengan efisiensi lapangan.
          </Reveal>
          <Reveal as="p" className="dim" delay={0.14} style={{ marginTop: 14, fontSize: 14 }}>
            Asumsi paving holland 20×10 cm (±{PCS_PER_M2} pcs/m²) dan {DAYS} hari kerja per bulan.
          </Reveal>
        </div>
        <Reveal className="r card pad" delay={0.1}>
          <div className="seg" role="radiogroup" aria-label="Tipe mesin" style={{ marginBottom: 22 }}>
            {machines.map((x, i) => (
              <button key={x.slug} type="button" role="radio" aria-checked={mi === i} className={mi === i ? "on" : ""} onClick={() => setMi(i)}>
                {mi === i && <motion.span layoutId="calc-on" className="seg-bg" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                {x.code}
              </button>
            ))}
          </div>
          <div className="card red" style={{ borderRadius: 18, padding: "22px 24px", boxShadow: "none" }}>
            <span className="label">Perkiraan paving per hari</span>
            <div style={{ fontSize: "clamp(52px, 6vw, 88px)", fontWeight: 500, letterSpacing: "-0.05em", lineHeight: 1, marginTop: 8 }} className="tnum" aria-live="polite">
              <Num value={perDay} />
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 14, flexWrap: "wrap", fontSize: 15 }}>
              <span><b className="tnum"><Num value={m2} /></b> m² / hari</span>
              <span><b className="tnum"><Num value={m2 * DAYS} /></b> m² / bulan</span>
            </div>
          </div>
          <div style={{ display: "grid", gap: 22, marginTop: 26 }}>
            <label>
              <div className="range-row"><span>Jam kerja</span><b className="tnum">{hours} jam / hari</b></div>
              <input className="range" type="range" min={4} max={20} value={hours} onChange={(e) => setHours(+e.target.value)} />
            </label>
            <label>
              <div className="range-row"><span>Efisiensi operasional</span><b className="tnum">{eff}%</b></div>
              <input className="range" type="range" min={40} max={100} step={5} value={eff} onChange={(e) => setEff(+e.target.value)} />
            </label>
          </div>
          {eff >= 95 && <p className="err" style={{ marginTop: 12 }}>Efisiensi di atas 90% jarang tercapai di lapangan.</p>}
          <div style={{ marginTop: 24 }}>
            <Pill href={waLink(msg)} tone="wa">Kirim hitungan ke WhatsApp</Pill>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
