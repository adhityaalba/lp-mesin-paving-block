import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { CompareTable } from "@/components/machines/compare-table";
import { CtaBanner } from "@/components/cta-banner";
import { Counter, Item, Reveal, Stagger } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
import { getMachine, machines, type Spec } from "@/lib/machines";
import { site, waLink } from "@/lib/site";

export function generateStaticParams() {
  return machines.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/mesin/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const m = getMachine(slug);
  if (!m) return {};
  return {
    title: `Mesin Paving Block ${m.code} — ${m.nickname}`,
    description: `${m.summary} Spesifikasi lengkap, produktivitas, dan promo free 1 set cetakan.`,
    alternates: { canonical: `/mesin/${m.slug}/` },
    openGraph: { images: [{ url: m.gallery[0]?.src ?? m.image }] },
  };
}

function SpecCard({ title, specs, n }: { title: string; specs: Spec[]; n: string }) {
  return (
    <Item className="card pad">
      <span className="card-num">{n}</span>
      <span className="label">{title}</span>
      <dl style={{ marginTop: 10 }}>
        {specs.map((s) => (
          <div key={s.label} className="spec-row">
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </Item>
  );
}

export default function MachinePage({ params }: PageProps<"/mesin/[slug]">) {
  return (
    <Suspense fallback={<div className="ph"><div className="ph-card" /></div>}>
      <MachineContent params={params} />
    </Suspense>
  );
}

async function MachineContent({ params }: { params: PageProps<"/mesin/[slug]">["params"] }) {
  const { slug } = await params;
  const m = getMachine(slug);
  if (!m) notFound();
  const others = machines.filter((x) => x.slug !== m.slug);
  const msg = `Halo CV Multi Baja Technic, saya tertarik mesin ${m.code} (${m.nickname}). Boleh minta info harga & ketersediaan?`;
  const strength = parseInt(m.highlight.strength.replace("K", ""), 10);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Mesin Paving Block ${m.code} ${m.nickname}`,
    image: `${site.domain}${m.image}`,
    description: m.summary,
    brand: { "@type": "Brand", name: "Multi Baja Technic" },
    manufacturer: { "@type": "Organization", name: site.name },
    category: "Mesin cetak paving block",
  };

  return (
    <>
      <PageHero
        title={`${m.code}, ${m.nickname}`}
        lead={m.summary}
        img={m.studio}
        alt={`Foto studio mesin paving block ${m.code} ${m.nickname}`}
        product={{ bg: m.studioBg }}
        crumbs={[{ href: "/mesin/", label: "Mesin" }, { label: m.code }]}
        actions={
          <>
            <Pill href={waLink(msg)}>Tanya harga {m.code}</Pill>
            <Pill href="#spesifikasi" tone="ghost" icon={false}>Spesifikasi</Pill>
          </>
        }
      />

      <section className="shell" style={{ paddingTop: "clamp(56px, 7vw, 100px)" }}>
        <Stagger className="stats inner">
          <Item>
            <b className="tnum">{Number.isNaN(strength) ? "SNI" : <Counter to={strength} prefix="K" />}</b>
            <span className="label">Kuat tekan</span>
          </Item>
          <Item><b className="tnum"><Counter to={m.calc.pcsPerCycle} suffix=" pcs" /></b><span className="label">Paving per siklus</span></Item>
          <Item><b className="tnum"><Counter to={m.calc.cycleSeconds} suffix=" dtk" /></b><span className="label">Waktu siklus</span></Item>
          <Item><b className="tnum">{m.highlight.power}</b><span className="label">Daya listrik, 3 phase</span></Item>
        </Stagger>
      </section>

      <section id="spesifikasi" className="shell sec" style={{ scrollMarginTop: 90 }}>
        <div className="two inner">
          <div className="l sticky-l">
            <Reveal as="p" className="label">Tentang mesin</Reveal>
            <Reveal as="h2" className="h-sec" delay={0.05} style={{ marginTop: 10 }}>{m.code} dari dekat</Reveal>
            {m.description.map((d) => (
              <Reveal key={d.slice(0, 24)} as="p" className="muted" style={{ marginTop: 16 }}>{d}</Reveal>
            ))}
            <Reveal style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Pill href={waLink(msg)}>Pesan {m.code}</Pill>
            </Reveal>
            <Reveal className="chips" style={{ marginTop: 18 }}>
              <span className="gold">Free 1 set cetakan</span>
              <span>DP 30%</span>
              <span>Garansi 1 tahun</span>
            </Reveal>
          </div>
          <Stagger className="r rows">
            <SpecCard n="01" title="Spesifikasi umum" specs={m.general} />
            <SpecCard n="02" title="Mesin utama" specs={m.main} />
            <SpecCard n="03" title="Mesin perlengkapan" specs={m.support} />
            <SpecCard n="04" title="Produktivitas" specs={m.productivity} />
          </Stagger>
        </div>
      </section>

      {m.gallery.length > 0 && (
        <section className="shell" style={{ paddingBottom: "clamp(56px, 8vw, 110px)" }}>
          <Stagger className="grid gap-4 md:grid-cols-3">
            {m.gallery.slice(0, 3).map((g) => (
              <Item key={g.src} className="card lift" style={{ padding: 8 }}>
                <div className="relative aspect-[4/5] overflow-hidden" style={{ borderRadius: 14 }}>
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width:768px) 31vw, 92vw" className="object-cover" />
                </div>
                <p className="dim" style={{ fontSize: 13, padding: "10px 8px 6px" }}>{g.alt}</p>
              </Item>
            ))}
          </Stagger>
        </section>
      )}

      <section className="shell" style={{ paddingBottom: "clamp(56px, 8vw, 110px)" }}>
        <div className="inner" style={{ marginBottom: 24 }}>
          <Reveal as="h2" className="h-sec">Dibanding tipe lain</Reveal>
        </div>
        <Reveal className="card" style={{ padding: "8px 8px 0" }}>
          <CompareTable focus={m.slug} />
        </Reveal>
        <Stagger className="grid gap-4 md:grid-cols-2" style={{ marginTop: 16 }}>
          {others.map((o) => (
            <Item key={o.slug} className="card pad lift">
              <span className="label">{o.tagline}</span>
              <h3 className="h-card" style={{ marginTop: 8 }}>
                <Link href={`/mesin/${o.slug}/`} className="after:absolute after:inset-0">{o.code} · {o.nickname}</Link>
              </h3>
              <p className="muted" style={{ marginTop: 8, fontSize: 15 }}>{o.summary}</p>
            </Item>
          ))}
        </Stagger>
      </section>

      <CtaBanner title={`Pesan ${m.code} sekarang`} message={msg} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
    </>
  );
}
