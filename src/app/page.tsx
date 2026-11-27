import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { Shape } from "@/components/home/shape";
import { Board } from "@/components/home/board";
import { Stages } from "@/components/home/stages";
import { Rooms } from "@/components/home/rooms";
import { FaqTable } from "@/components/faq-table";
import { Cta } from "@/components/cta";
import { PostCard } from "@/components/post-card";
import { Item, Reveal, Stagger } from "@/components/motion/reveal";
import { faqs } from "@/lib/site";
import { posts } from "@/lib/posts";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <Hero />
      <Board />
      <Shape />
      <Rooms />
      <Stages />
      <FaqTable items={faqs} />

      <section className="section wrap" aria-labelledby="posts-h">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 24, flexWrap: "wrap", marginBottom: 40 }}>
          <Reveal as="h2" id="posts-h" className="head" style={{ maxWidth: "14ch" }}>
            Belajar dulu sebelum berinvestasi
          </Reveal>
          <Link href="/artikel/" className="textlink">
            Semua {posts.length} artikel <span>→</span>
          </Link>
        </div>
        <Stagger className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <Item key={p.slug}>
              <PostCard post={p} />
            </Item>
          ))}
        </Stagger>
      </section>

      <Cta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
