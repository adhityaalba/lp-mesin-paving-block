"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Parallax } from "@/components/motion/reveal";

const STAGES = [
  {
    name: "Konsultasi",
    clause: "Pertama, ceritakan rencana Anda",
    text: "Target produksi, luas lahan, dan daya listrik yang tersedia. Dari situ kami rekomendasikan tipe mesin yang pas. Gratis, tanpa kewajiban membeli.",
    title: "Kebutuhan tercatat",
    rows: [["Target", "Paving holland & batako"], ["Lahan efektif", "± 1.000 m²"], ["Listrik", "3 phase, 25–31 kW"], ["Rekomendasi", "Tipe mesin & paket"]],
  },
  {
    name: "MOU & DP",
    clause: "Lalu, ikat dengan MOU",
    text: "Kesepakatan dituangkan dalam MOU bermaterai. Cukup DP 30% di awal, sisanya dilunasi saat mesin sudah siap dikirim.",
    title: "Kesepakatan",
    rows: [["Pembayaran awal", "DP 30%"], ["Pelunasan", "Saat mesin siap kirim"], ["Dokumen", "MOU bermaterai"], ["Bonus", "1 set cetakan"]],
  },
  {
    name: "Fabrikasi",
    clause: "Mesin dirakit di workshop",
    text: "Seluruh material baru berstandar SNI dengan komponen elektrik original. Setiap unit dirakit dan diuji di workshop Mojokerto sebelum berangkat.",
    title: "Di workshop",
    rows: [["Lokasi", "Puri, Mojokerto"], ["Material", "Baru, standar SNI"], ["Elektrik", "Fuji & Schneider original"], ["Uji", "Sebelum dikirim"]],
  },
  {
    name: "Kirim & pasang",
    clause: "Dikirim dan dirakit di lokasi",
    text: "Kami mengirim ke seluruh Indonesia, dari Jakarta dan Semarang sampai Bali dan Sumatera. Teknisi turun langsung merakit mesin di pabrik Anda.",
    title: "Instalasi",
    rows: [["Jangkauan", "Seluruh Indonesia"], ["Perakitan", "Oleh teknisi kami"], ["Perlengkapan", "Mixer & conveyor"], ["Status", "Siap produksi"]],
  },
  {
    name: "Training",
    clause: "Operator Anda dilatih",
    text: "Dari takaran campuran bahan baku sampai mesin berproduksi lancar. Untuk pabrik yang baru berdiri, kami bisa bantu suplai tenaga produksi.",
    title: "Pendampingan",
    rows: [["Materi", "Campuran & operasi"], ["Durasi", "Sampai produksi lancar"], ["Tenaga kerja", "Bisa dibantu suplai"], ["Hasil", "K350 – K500"]],
  },
  {
    name: "Garansi",
    clause: "Satu tahun penuh, kami tetap di sini",
    text: "Garansi spare part dan service selama satu tahun, ketersediaan suku cadang asli, dan layanan purnajual yang responsif.",
    title: "Purnajual",
    rows: [["Garansi", "1 tahun penuh"], ["Cakupan", "Spare part & service"], ["Suku cadang", "Original tersedia"], ["Kontak", "WhatsApp langsung"]],
  },
];

function Fragment({ i }: { i: number }) {
  const s = STAGES[i];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={i}
        data-ui
        className="card-ui"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <b style={{ fontWeight: 500, fontSize: 17 }}>{s.title}</b>
          <span style={{ color: "var(--muted)", fontSize: 13 }}>
            Tahap {i + 1} / {STAGES.length}
          </span>
        </div>
        {s.rows.map(([k, v], r) => (
          <motion.div
            key={k}
            className="row"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + r * 0.05 }}
          >
            <span className="k">{k}</span>
            <span className="v">{v}</span>
          </motion.div>
        ))}
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          {STAGES.map((_, d) => (
            <span key={d} style={{ flex: 1, height: 6, background: d <= i ? "var(--accent)" : "var(--surface-4)", transition: "background .3s" }} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/** How ordering works — the reader drags through the stages. */
export function Stages() {
  const [i, setI] = useState(0);
  const s = STAGES[i];
  const last = STAGES.length - 1;
  return (
    <section className="stages" aria-label="Alur pemesanan mesin">
      <div className="stages-l">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <h2>{s.clause}</h2>
            <p>{s.text}</p>
          </motion.div>
        </AnimatePresence>
        <Link href="/tentang/" className="textlink" style={{ marginTop: 30 }}>
          Kenali workshop kami <span>→</span>
        </Link>
      </div>
      <div className="stages-r">
        <Parallax className="absolute inset-0" amount={40}>
          <Image src="/brand/paving-texture.webp" alt="" fill sizes="50vw" className="object-cover" style={{ opacity: 0.18, filter: "grayscale(1)", mixBlendMode: "multiply" }} />
        </Parallax>
        <Fragment i={i} />
      </div>
      <div className="stages-bar">
        <div className="stage-range">
          <span className="track-fill" style={{ width: `${(i / last) * 100}%` }} />
          <input
            className="range"
            type="range"
            min={0}
            max={last}
            step={1}
            value={i}
            aria-label="Tahap pemesanan"
            aria-valuetext={s.name}
            onChange={(e) => setI(Number(e.target.value))}
          />
        </div>
        <div className="stages-names" style={{ ["--n" as string]: STAGES.length }}>
          {STAGES.map((x, k) => (
            <button key={x.name} type="button" className={k === i ? "on" : ""} onClick={() => setI(k)}>
              {x.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
