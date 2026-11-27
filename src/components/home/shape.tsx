"use client";

import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { machines } from "@/lib/machines";
import { waLink } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;
/** Holland paving 20×10 cm ≈ 50 pcs per m². */
const PCS_PER_M2 = 50;
const DAYS = 25;

function Num({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString("id-ID"));
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.6, ease });
    return () => c.stop();
  }, [value, mv]);
  return <motion.span>{text}</motion.span>;
}

function Seg({ value, options, onChange, label }: { value: number; options: string[]; onChange: (i: number) => void; label: string }) {
  return (
    <div className="seg" role="radiogroup" aria-label={label}>
      {options.map((o, i) => (
        <button key={o} type="button" role="radio" aria-checked={value === i} className={value === i ? "on" : ""} onClick={() => onChange(i)}>
          {value === i && <motion.span layoutId="seg-machine" className="seg-bg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
          <span>{o}</span>
        </button>
      ))}
    </div>
  );
}

function Range({ label, min, max, step = 1, value, onChange, left, right }: {
  label: string; min: number; max: number; step?: number; value: number; onChange: (v: number) => void; left: string; right: string;
}) {
  return (
    <div>
      <input className="range" type="range" aria-label={label} min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      <div className="range-row">
        <span>{left}</span>
        <b className="tnum">{right}</b>
      </div>
    </div>
  );
}

/** Fixed output on the left; the reader configures a production line on the right. */
export function Shape() {
  const [mi, setMi] = useState(0);
  const [hours, setHours] = useState(8);
  const [eff, setEff] = useState(70);
  const m = machines[mi];
  const perDay = (3600 / m.calc.cycleSeconds) * m.calc.pcsPerCycle * hours * (eff / 100);
  const m2 = perDay / PCS_PER_M2;
  const msg = `Halo, saya menghitung di website: mesin ${m.code}, ${hours} jam/hari, efisiensi ${eff}% ≈ ${Math.round(perDay).toLocaleString("id-ID")} paving/hari (${Math.round(m2)} m²). Mohon info harga & detailnya.`;

  return (
    <section className="shape" aria-labelledby="shape-h">
      <div className="shape-out">
        <Image className="bgimg" src="/brand/yard.webp" alt="" fill sizes="50vw" />
        <motion.div data-ui className="card-ui" layout transition={{ duration: 0.5, ease }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div>
              <div className="muted" style={{ fontSize: 13 }}>Lini produksi</div>
              <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.01em", marginTop: 2 }}>{m.code}</div>
            </div>
            <span className="tag">{m.nickname}</span>
          </div>
          <div className="big">
            <Num value={perDay} />
          </div>
          <div className="muted" style={{ fontSize: 13, marginBottom: 12 }}>paving holland per hari, perkiraan</div>
          <div className="row"><span className="k">Luas per hari</span><span className="v tnum"><Num value={m2} /> m²</span></div>
          <div className="row"><span className="k">Luas per bulan ({DAYS} hari)</span><span className="v tnum"><Num value={m2 * DAYS} /> m²</span></div>
          <div className="row"><span className="k">Siklus cetak</span><span className="v tnum">{m.calc.pcsPerCycle} pcs / {m.calc.cycleSeconds} detik</span></div>
          <div className="row"><span className="k">Daya listrik</span><span className="v tnum">{m.highlight.power}, 3 phase</span></div>
          {eff >= 95 && (
            <p style={{ marginTop: 12, color: "var(--accent-hi)", fontSize: 13 }}>
              Efisiensi di atas 90% jarang tercapai. Ganti palet dan suplai bahan selalu memakan waktu.
            </p>
          )}
        </motion.div>
      </div>

      <div className="shape-read">
        <Reveal as="h2" id="shape-h">Hitung pabrik Anda</Reveal>
        <Reveal as="p" className="muted measure" delay={0.08}>
          Setiap kontrol di bawah mengubah lini produksi di sebelah kiri. Angkanya teoretis, dihitung dari siklus cetak
          tiap mesin.
        </Reveal>

        <Reveal className="shape-block">
          <h3>Pilih mesinnya.</h3>
          <p className="muted">
            RH1E15 untuk supplier proyek K500, RH1S12 untuk paket pabrik lengkap, HR6E12 untuk pemula yang baru membuka
            usaha.
          </p>
          <div className="ctl">
            <Seg label="Tipe mesin" value={mi} options={machines.map((x) => x.code)} onChange={setMi} />
          </div>
        </Reveal>

        <Reveal className="shape-block">
          <h3>Tentukan jam kerja.</h3>
          <p className="muted">Satu shift biasanya delapan jam. Dua shift menggandakan output tanpa menambah mesin.</p>
          <div className="ctl">
            <Range label="Jam kerja per hari" min={4} max={20} value={hours} onChange={setHours} left="Jam kerja" right={`${hours} jam / hari`} />
          </div>
        </Reveal>

        <Reveal className="shape-block">
          <h3>Jujur soal efisiensi.</h3>
          <p className="muted">
            Kapasitas di brosur adalah angka ideal. Di lapangan ada waktu isi bahan, ganti palet, dan istirahat operator.
            Tujuh puluh persen adalah titik awal yang wajar.
          </p>
          <div className="ctl">
            <Range label="Efisiensi operasional" min={40} max={100} step={5} value={eff} onChange={setEff} left="Efisiensi" right={`${eff}%`} />
          </div>
        </Reveal>

        <Reveal className="shape-block">
          <h3>Kirim hitungannya ke kami.</h3>
          <p className="muted">
            Tim kami membalas dengan rekomendasi mesin, kebutuhan lahan dan listrik, serta penawaran harga.
          </p>
          <div className="ctl">
            <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn primary">
              Kirim ke WhatsApp <span className="arrow">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
