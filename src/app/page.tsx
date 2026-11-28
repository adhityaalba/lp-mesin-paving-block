import { getMachines } from "@/lib/machines";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Bento } from "@/components/home/bento";
import { MachinesHz } from "@/components/home/machines-hz";
import { ProcessStack } from "@/components/home/process-stack";
import { Calculator } from "@/components/home/calculator";
import { Faq } from "@/components/faq";
import { CtaBanner } from "@/components/cta-banner";
import { PostCard } from "@/components/post-card";
import { Item, Reveal, Stagger } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
import { faqs } from "@/lib/site";
import { getPosts } from "@/lib/posts";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default async function Home() {
  const [machines, posts] = await Promise.all([getMachines(), getPosts()]);
  return (
    <>
      <Hero />
      <Stats />
      <Bento />
      <MachinesHz machines={machines} />
      <ProcessStack />
      <Calculator machines={machines} />

      <section className="shell sec" style={{ paddingTop: 0 }} aria-labelledby="faq-h">
        <div className="two inner">
          <div className="l sticky-l">
            <Reveal as="p" className="label">FAQ</Reveal>
            <Reveal as="h2" id="faq-h" className="h-sec" delay={0.05} style={{ marginTop: 10 }}>Pertanyaan yang sering diajukan</Reveal>
            <Reveal delay={0.1} style={{ marginTop: 22 }}>
              <Pill href="/kontak/" tone="ghost" icon={false} size="sm">Tanya langsung</Pill>
            </Reveal>
          </div>
          <div className="r">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <section className="shell" aria-labelledby="posts-h">
        <div className="inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 24, flexWrap: "wrap", marginBottom: 28 }}>
          <div>
            <Reveal as="p" className="label">Artikel & panduan</Reveal>
            <Reveal as="h2" id="posts-h" className="h-sec" delay={0.05} style={{ marginTop: 10 }}>Belajar sebelum berinvestasi</Reveal>
          </div>
          <Reveal delay={0.1}><Pill href="/artikel/" tone="ghost" icon={false} size="sm">Semua {posts.length} artikel</Pill></Reveal>
        </div>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <Item key={p.slug}><PostCard post={p} /></Item>
          ))}
        </Stagger>
      </section>

      <CtaBanner />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
