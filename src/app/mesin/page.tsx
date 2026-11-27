import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { MachinesHz } from "@/components/home/machines-hz";
import { CompareTable } from "@/components/machines/compare-table";
import { Calculator } from "@/components/home/calculator";
import { CtaBanner } from "@/components/cta-banner";
import { Reveal } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
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
        lead="Semua semi-automatic dengan hidrolik dan multiple vibrasi. Satu mesin mencetak paving, batako, dan kanstin, cukup ganti cetakan."
        img="/brand/studio-rh1e15.webp"
        alt="Foto studio mesin paving block RH1E15"
        product={{ bg: "#ece2cf" }}
        crumbs={[{ label: "Mesin" }]}
        actions={
          <>
            <Pill href={waLink()}>Minta rekomendasi</Pill>
            <Pill href="#banding" tone="ghost" icon={false}>Bandingkan</Pill>
          </>
        }
      />
      <MachinesHz />
      <section id="banding" className="shell sec" style={{ scrollMarginTop: 90 }}>
        <div className="inner" style={{ marginBottom: 24 }}>
          <Reveal as="p" className="label">Perbandingan</Reveal>
          <Reveal as="h2" className="h-sec" delay={0.05} style={{ marginTop: 10 }}>Spesifikasi berdampingan</Reveal>
        </div>
        <Reveal className="card" style={{ padding: "8px 8px 0" }}>
          <CompareTable />
        </Reveal>
      </section>
      <Calculator />
      <CtaBanner title="Masih bingung memilih?" body="Ceritakan target produksi Anda. Kami bantu hitung kebutuhan mesin, lahan, dan listrik, gratis." />
    </>
  );
}
