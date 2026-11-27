import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageSkeleton } from "@/components/page-skeleton";
import { PageHero } from "@/components/page-hero";
import { CompareTable } from "@/components/machines/compare-table";
import { Cta } from "@/components/cta";
import { Reveal } from "@/components/motion/reveal";
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

function SpecGroup({ title, specs }: { title: string; specs: Spec[] }) {
  return (
    <Reveal className="spec-group">
      <h3>{title}</h3>
      <dl>
        {specs.map((s) => (
          <div key={s.label} className="spec-row">
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

export default function MachinePage({ params }: PageProps<"/mesin/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
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
  const isPhoto = m.image.includes("hr6e12");

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
        img={m.image}
        alt={m.imageAlt}
        contain={!isPhoto}
        crumbs={[{ href: "/mesin/", label: "Mesin" }, { label: m.code }]}
        actions={
          <>
            <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn primary">
              Tanya harga {m.code} <span className="arrow">→</span>
            </a>
            <a href="#spesifikasi" className="btn">Spesifikasi</a>
          </>
        }
      />

      <section className="band">
        <div className="wrap grid12" style={{ rowGap: 32 }}>
          {[
            ["Kuat tekan", m.highlight.strength === "SNI" ? "Standar SNI" : `Hingga ${m.highlight.strength}`],
            ["Paving per siklus", `${m.calc.pcsPerCycle} pcs`],
            ["Waktu siklus", `${m.calc.cycleSeconds} detik`],
            ["Daya listrik", m.highlight.power],
          ].map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.06} className="col-span-6 lg:col-span-3">
              <p className="small muted">{k}</p>
              <p className="display tnum" style={{ marginTop: 10 }}>{v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="spesifikasi" className="section wrap" style={{ scrollMarginTop: 80 }}>
        <div className="split-2">
          <div className="l sticky-l">
            <Reveal as="h2" className="head">Tentang {m.code}</Reveal>
            {m.description.map((d) => (
              <Reveal key={d.slice(0, 24)} as="p" className="muted" style={{ marginTop: 18 }}>
                {d}
              </Reveal>
            ))}
            <Reveal style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn primary">
                Pesan {m.code} <span className="arrow">→</span>
              </a>
            </Reveal>
            <Reveal className="small dim" style={{ marginTop: 18 }}>
              Free 1 set cetakan. DP 30%, sisanya saat mesin siap kirim.
            </Reveal>
          </div>
          <div className="r spec">
            <SpecGroup title="Spesifikasi umum" specs={m.general} />
            <SpecGroup title="Mesin utama" specs={m.main} />
            <SpecGroup title="Mesin perlengkapan" specs={m.support} />
            <SpecGroup title="Produktivitas" specs={m.productivity} />
          </div>
        </div>
      </section>

      {m.gallery.length > 0 && (
        <section className="section wrap">
          <Reveal as="h2" className="head" style={{ marginBottom: 32 }}>Dari dekat</Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {m.video && (
              <Reveal className="relative aspect-[4/5] overflow-hidden bg-surface">
                <video className="img-fill dimmed" src={m.video} poster={m.image} autoPlay muted loop playsInline preload="none" aria-label={`Video mesin ${m.code} di workshop`} />
              </Reveal>
            )}
            {m.gallery.slice(0, m.video ? 2 : 3).map((g, i) => (
              <Reveal key={g.src} delay={i * 0.06}>
                <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width:768px) 31vw, 92vw" className="object-cover dimmed" />
                </div>
                <p className="cap">{g.alt}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="section wrap">
        <Reveal as="h2" className="head" style={{ marginBottom: 32 }}>Dibandingkan tipe lain</Reveal>
        <Reveal>
          <CompareTable focus={m.slug} />
        </Reveal>
        <div className="big-list" style={{ marginTop: 56 }}>
          {others.map((o) => (
            <Reveal key={o.slug} className="big-item">
              <h3>
                <Link href={`/mesin/${o.slug}/`} className="link">{o.code} · {o.nickname}</Link>
              </h3>
              <p className="muted">{o.summary}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Cta title={`Pesan ${m.code} sekarang`} defaultMachine={`${m.code} (${m.nickname})`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
    </>
  );
}
