import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Board } from "@/components/home/board";
import { CompareTable } from "@/components/machines/compare-table";
import { Cta } from "@/components/cta";
import { Reveal } from "@/components/motion/reveal";
import { machines } from "@/lib/machines";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Katalog Mesin Paving Block — RH1E15, RH1S12, HR6E12",
  description:
    "Bandingkan 3 tipe mesin cetak paving block & batako hidrolik CV Multi Baja Technic: RH1E15 (K500), RH1S12, dan HR6E12 (K400). Spesifikasi lengkap, garansi 1 tahun.",
  alternates: { canonical: "/mesin/" },
};

export default function MesinPage() {
  return (
    <>
      <PageHero
        title="Tiga mesin cetak, satu standar padat"
        lead="Semua semi-automatic dengan sistem hidrolik dan multiple vibrasi. Satu mesin mencetak paving, batako, dan kanstin, cukup dengan mengganti cetakan."
        img="/brand/rh1e15-legend.webp"
        alt="Mesin RH1E15 The Legend Innovated"
        crumbs={[{ label: "Mesin" }]}
        actions={
          <>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn primary">
              Minta rekomendasi <span className="arrow">→</span>
            </a>
            <a href="#banding" className="btn">Bandingkan</a>
          </>
        }
      />

      <section className="section wrap">
        <div className="rooms">
          {machines.map((m, i) => (
            <div key={m.slug} className={`room ${i % 2 ? "flip" : ""}`}>
              <Reveal className="room-img tall" style={{ background: "var(--surface)" }}>
                <Image
                  src={m.image}
                  alt={m.imageAlt}
                  fill
                  sizes="(min-width:1080px) 40vw, 100vw"
                  className={m.image.includes("hr6e12") ? "object-cover dimmed" : "object-contain p-[8%]"}
                />
              </Reveal>
              <Reveal className="room-txt" delay={0.1}>
                <p className="small dim">{m.tagline}</p>
                <h2 className="head" style={{ marginTop: 8 }}>{m.code}</h2>
                <p className="muted" style={{ marginTop: 4 }}>{m.nickname}</p>
                <p>{m.summary}</p>
                <ul>
                  <li>{m.highlight.strength === "SNI" ? "Hasil standar SNI" : `Kuat tekan hingga ${m.highlight.strength}`}</li>
                  <li>{m.calc.pcsPerCycle} paving per siklus {m.calc.cycleSeconds} detik</li>
                  <li>Listrik {m.highlight.power}, 3 phase</li>
                  <li>{m.idealFor}</li>
                </ul>
                <Link href={`/mesin/${m.slug}/`} className="textlink">
                  Spesifikasi lengkap <span>→</span>
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section id="banding" className="section wrap" style={{ scrollMarginTop: 80 }}>
        <Reveal as="h2" className="head" style={{ marginBottom: 32 }}>Perbandingan spesifikasi</Reveal>
        <Reveal>
          <CompareTable />
        </Reveal>
      </section>

      <Board title="Ringkasan cepat" intro="Pilih baris untuk membuka ringkasan tiap mesin." />
      <Cta title="Masih bingung memilih?" body="Ceritakan target produksi Anda. Tim kami bantu hitung kebutuhan mesin, lahan, dan listrik, gratis." />
    </>
  );
}
