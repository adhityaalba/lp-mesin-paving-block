import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { ProcessStack } from "@/components/home/process-stack";
import { CtaBanner } from "@/components/cta-banner";
import { Item, Parallax, Reveal, Stagger } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Kami — Produsen Mesin Paving Block Mojokerto",
  description:
    "CV Multi Baja Technic: produsen mesin cetak paving block & batako di Puri, Mojokerto. Material baru standar SNI, spare part original, hasil K350–K500, kerja sama diikat MOU bermaterai.",
  alternates: { canonical: "/tentang/" },
};

const values = [
  { k: "Berkualitas", v: "Mesin modern bergaransi satu tahun, kokoh dan kuat, dengan hasil produk padat berisi. Dijamin bisa K350 sampai K500." },
  { k: "Menguntungkan", v: "Banyak pengusaha dan perusahaan melaporkan keuntungan lebih dari 40% dengan mesin press paving buatan kami." },
  { k: "Layanan terbaik", v: "Pabrik paving yang baru berdiri kami bantu sampai produksi lancar, termasuk suplai karyawan produksi bila diperlukan." },
  { k: "Bergaransi", v: "Produk teruji dengan garansi penuh spare part dan service selama satu tahun." },
];

export default function TentangPage() {
  return (
    <>
      <PageHero
        title="Bukan yang pertama, tapi yang terbaik"
        lead="Workshop kami di Puri, Mojokerto hanya berkonsentrasi pada satu hal: mesin press paving dan batako yang hasilnya padat dan kuat."
        img="/brand/hero-scene.webp"
        alt="Lanskap tenang dengan monumen tumpukan paving"
        crumbs={[{ label: "Tentang" }]}
        actions={<Pill href={waLink()}>Bicara dengan kami</Pill>}
      />

      <section className="shell sec">
        <div className="two inner">
          <div className="l">
            <Reveal as="p" className="label">Profil</Reveal>
            <Reveal as="h2" className="h-sec" delay={0.05} style={{ marginTop: 10 }}>Satu pekerjaan, dikerjakan serius</Reveal>
          </div>
          <div className="r">
            <Reveal as="p" className="lead" style={{ color: "var(--ink)" }}>
              CV Multi Baja Technic berdiri di Jl. Plososari Padangan No. 9, Desa Plososari, Kecamatan Puri, Kabupaten Mojokerto.
            </Reveal>
            <Reveal as="p" className="muted" style={{ marginTop: 18 }}>
              Seluruh bahan yang kami gunakan baru dan berstandar SNI, dengan spare part bermutu original. Hasilnya mesin press paving dan batako
              yang produknya dijamin padat dan kuat, K350 sampai K500, sesuai standar proyek pemerintah daerah maupun swasta.
            </Reveal>
            <Reveal as="p" className="muted" style={{ marginTop: 14 }}>
              Kami terus berinovasi dan memantau langsung pabrik paving dan batako yang memakai mesin kami. Setiap kerja sama diikat dengan MOU bermaterai.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell">
        <Stagger className="bento">
          <Item className="card b-img" style={{ minHeight: 420 }}>
            <Parallax className="absolute inset-0" amount={6}>
              <Image src="/brand/stack.webp" alt="Tumpukan paving abu, merah, dan kuning" fill sizes="(min-width:1080px) 56vw, 100vw" className="object-cover" />
            </Parallax>
          </Item>
          <Item className="card pad red b-red" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span className="label">Hasil yang dinilai</span>
            <div>
              <b style={{ fontSize: "clamp(56px, 6vw, 96px)", fontWeight: 500, letterSpacing: "-0.05em", lineHeight: 1 }}>K350–K500</b>
              <p style={{ marginTop: 10, fontSize: 15 }}>Kuat tekan paving dan batako dari mesin kami, sesuai standar SNI.</p>
            </div>
          </Item>
        </Stagger>
      </section>

      <section className="shell sec">
        <div className="inner" style={{ marginBottom: 24 }}>
          <Reveal as="p" className="label">Kenapa kami</Reveal>
          <Reveal as="h2" className="h-sec" delay={0.05} style={{ marginTop: 10 }}>Empat alasan memilih Multi Baja</Reveal>
        </div>
        <Stagger className="rows">
          {values.map((x, i) => (
            <Item key={x.k} className="row-card lift">
              <h3 className="h-card"><span className="dim" style={{ fontSize: 14, marginRight: 12 }}>0{i + 1}</span>{x.k}</h3>
              <p>{x.v}</p>
            </Item>
          ))}
        </Stagger>
      </section>

      <ProcessStack />
      <CtaBanner />
    </>
  );
}
