import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHero } from "@/components/page-hero";
import { FaqTable } from "@/components/faq-table";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { faqs, site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hubungi Kami — Konsultasi Mesin Paving Block",
  description: `Hubungi CV Multi Baja Technic: WhatsApp ${site.phone}, email ${site.email}. Workshop di Jl. Plososari Padangan No. 9, Puri, Mojokerto, Jawa Timur.`,
  alternates: { canonical: "/kontak/" },
};

export default function KontakPage() {
  const rows: [string, ReactNode][] = [
    ["WhatsApp", <a key="wa" className="link" href={waLink()} target="_blank" rel="noopener noreferrer">{site.phone}</a>],
    ["Telepon", <a key="tel" className="link" href={`tel:+${site.phoneRaw}`}>{site.phone}</a>],
    ["Email", <a key="mail" className="link" href={`mailto:${site.email}`} style={{ wordBreak: "break-all" }}>{site.email}</a>],
    ["Workshop", `${site.address.street}, ${site.address.village}, ${site.address.city}, ${site.address.region}`],
    ["Area layanan", "Kirim dan instalasi ke seluruh Indonesia"],
  ];
  return (
    <>
      <PageHero
        title="Mari bicara soal produksi"
        lead="Konsultasi gratis: tipe mesin, kebutuhan lahan dan listrik, sampai estimasi modal. Respons tercepat lewat WhatsApp."
        img="/brand/hr6e12-9.webp"
        alt="Mesin HR6E12 di workshop Mojokerto"
        crumbs={[{ label: "Kontak" }]}
        actions={
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn primary">
            Chat WhatsApp <span className="arrow">→</span>
          </a>
        }
      />

      <section className="section wrap">
        <div className="split-2">
          <div className="l">
            <Reveal as="h2" className="head">Kontak langsung</Reveal>
            <dl style={{ marginTop: 28 }}>
              {rows.map(([k, v]) => (
                <Reveal key={k} className="spec-row">
                  <dt>{k}</dt>
                  <dd style={{ fontWeight: 400 }}>{v}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
          <Reveal className="r">
            <div className="dialog-ui" style={{ background: "var(--surface)" }}>
              <h3>Kirim pertanyaan</h3>
              <p className="sub">Pesan Anda langsung terbuka di WhatsApp kami.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wrap">
        <Reveal className="relative aspect-[16/7] overflow-hidden bg-surface">
          <iframe
            title="Peta lokasi workshop CV Multi Baja Technic"
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`}
            className="absolute inset-0 size-full"
            style={{ filter: "grayscale(0.6) sepia(0.15)", border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </section>

      <FaqTable items={faqs} />
    </>
  );
}
