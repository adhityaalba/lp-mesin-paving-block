import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHero } from "@/components/page-hero";
import { Faq } from "@/components/faq";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
import { faqs, site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hubungi Kami — Konsultasi Mesin Paving Block",
  description: `Hubungi CV Multi Baja Technic: WhatsApp ${site.phone}, email ${site.email}. Workshop di Jl. Plososari Padangan No. 9, Puri, Mojokerto, Jawa Timur.`,
  alternates: { canonical: "/kontak/" },
};

export default function KontakPage() {
  const rows: [string, ReactNode][] = [
    ["WhatsApp", <a key="wa" className="link-u" href={waLink()} target="_blank" rel="noopener noreferrer">{site.phone}</a>],
    ["Telepon", <a key="tel" className="link-u" href={`tel:+${site.phoneRaw}`}>{site.phone}</a>],
    ["Email", <a key="mail" className="link-u" href={`mailto:${site.email}`} style={{ wordBreak: "break-all" }}>{site.email}</a>],
    ["Workshop", `${site.address.street}, ${site.address.village}, ${site.address.city}, ${site.address.region}`],
    ["Area layanan", "Kirim dan instalasi ke seluruh Indonesia"],
  ];
  return (
    <>
      <PageHero
        title="Mari bicara soal produksi"
        lead="Konsultasi gratis: tipe mesin, kebutuhan lahan dan listrik, sampai estimasi modal. Respons tercepat lewat WhatsApp."
        img="/brand/stack.webp"
        alt="Tumpukan paving abu, merah, dan kuning"
        crumbs={[{ label: "Kontak" }]}
        actions={<Pill href={waLink()} tone="wa">Chat WhatsApp</Pill>}
      />
      <section className="shell sec">
        <div className="two">
          <Reveal className="l card pad">
            <span className="label">Kontak langsung</span>
            <dl style={{ marginTop: 10 }}>
              {rows.map(([k, v]) => (
                <div key={k} className="spec-row">
                  <dt>{k}</dt>
                  <dd style={{ fontWeight: 400 }}>{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="r card pad" delay={0.1}>
            <span className="label">Kirim pertanyaan</span>
            <h2 className="h-card" style={{ marginTop: 8 }}>Pesan Anda langsung terbuka di WhatsApp kami</h2>
            <ContactForm />
          </Reveal>
        </div>
        <Reveal className="card" style={{ marginTop: 16, padding: 8 }}>
          <div className="relative aspect-[16/7] overflow-hidden" style={{ borderRadius: 14 }}>
            <iframe
              title="Peta lokasi workshop CV Multi Baja Technic"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`}
              className="absolute inset-0 size-full"
              style={{ border: 0, filter: "grayscale(0.5) sepia(0.12)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
      <section className="shell" style={{ paddingBottom: "clamp(56px, 8vw, 110px)" }}>
        <div className="two inner">
          <div className="l">
            <Reveal as="p" className="label">FAQ</Reveal>
            <Reveal as="h2" className="h-sec" delay={0.05} style={{ marginTop: 10 }}>Pertanyaan umum</Reveal>
          </div>
          <div className="r"><Faq items={faqs} /></div>
        </div>
      </section>
    </>
  );
}
