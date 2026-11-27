import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Stages } from "@/components/home/stages";
import { Cta } from "@/components/cta";
import { Parallax, Reveal } from "@/components/motion/reveal";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Kami — Produsen Mesin Paving Block Mojokerto",
  description:
    "CV Multi Baja Technic: produsen mesin cetak paving block & batako di Puri, Mojokerto. Material baru standar SNI, spare part original, hasil K350–K500, kerja sama diikat MOU bermaterai.",
  alternates: { canonical: "/tentang/" },
};

const values = [
  { k: "Berkualitas", v: "Mesin modern bergaransi satu tahun, kokoh dan kuat, dengan hasil produk yang padat berisi. Dijamin bisa K350 sampai K500." },
  { k: "Menguntungkan", v: "Banyak pengusaha dan perusahaan melaporkan keuntungan lebih dari 40% dengan mesin press paving buatan kami." },
  { k: "Layanan terbaik", v: "Pabrik paving yang baru berdiri kami bantu sampai produksi lancar, termasuk suplai karyawan produksi bila diperlukan." },
  { k: "Bergaransi", v: "Produk teruji dengan garansi penuh spare part dan service selama satu tahun." },
];

export default function TentangPage() {
  return (
    <>
      <PageHero
        title="Bukan yang pertama, tapi yang terbaik"
        lead="Workshop kami di Puri, Mojokerto hanya berkonsentrasi pada satu hal: mesin press paving dan batako yang menghasilkan produk padat dan kuat."
        img="/brand/yard.webp"
        alt="Ilustrasi area produksi pabrik paving block"
        crumbs={[{ label: "Tentang" }]}
        actions={
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn primary">
            Bicara dengan kami <span className="arrow">→</span>
          </a>
        }
      />

      <section className="section wrap">
        <div className="split-2">
          <div className="l sticky-l">
            <Reveal as="h2" className="head">Satu pekerjaan, dikerjakan dengan serius</Reveal>
          </div>
          <div className="r">
            <Reveal as="p" className="lead">
              CV Multi Baja Technic berdiri di Jl. Plososari Padangan No. 9, Desa Plososari, Kecamatan Puri, Kabupaten
              Mojokerto.
            </Reveal>
            <Reveal as="p" className="muted" style={{ marginTop: 22 }}>
              Seluruh bahan yang kami gunakan baru dan berstandar SNI, dengan spare part bermutu original. Hasilnya mesin
              press paving dan batako yang produknya dijamin padat dan kuat, K350 sampai K500, sesuai standar proyek
              pemerintah daerah maupun swasta.
            </Reveal>
            <Reveal as="p" className="muted" style={{ marginTop: 18 }}>
              Kami terus berinovasi dan memantau langsung pabrik-pabrik paving dan batako yang memakai mesin kami. Setiap
              kerja sama dengan konsumen diikat dengan MOU bermaterai.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="wrap">
        <Parallax className="relative aspect-[1131/439] bg-surface" amount={40}>
          <Image src="/brand/legend-banner.webp" alt="Banner The Legend Innovated dengan profil singkat mesin RH1E15" fill sizes="100vw" className="object-cover dimmed" />
        </Parallax>
      </section>

      <section className="section wrap">
        <Reveal as="h2" className="head" style={{ marginBottom: 24 }}>Kenapa memilih kami</Reveal>
        <div className="big-list">
          {values.map((x) => (
            <Reveal key={x.k} className="big-item">
              <h3>{x.k}</h3>
              <p>{x.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="room">
          <Reveal className="room-img tall">
            <video
              className="img-fill dimmed"
              src="/video/workshop-loop.mp4"
              poster="/brand/workshop-poster.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-label="Suasana workshop perakitan mesin paving block"
            />
          </Reveal>
          <Reveal className="room-txt" delay={0.1}>
            <h3>Dirakit dan diuji di workshop sendiri</h3>
            <p className="muted">
              Setiap unit lewat tangan tim kami sebelum dikirim: rangka, panel elektrik, power pack, sampai uji vibrasi.
              Dari sini mesin berangkat ke Jakarta, Semarang, Bali, hingga Sumatera.
            </p>
          </Reveal>
        </div>
      </section>

      <Stages />
      <Cta />
    </>
  );
}
