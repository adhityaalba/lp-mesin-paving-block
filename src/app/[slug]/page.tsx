import { formatDate } from "@/lib/post-format";
import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { CtaBanner } from "@/components/cta-banner";
import { ReadingProgress } from "@/components/reading-progress";
import { Pill } from "@/components/ui/pill";
import { getPost, getPosts, relatedPosts } from "@/lib/posts";
import { getMachines } from "@/lib/machines";
import { site, waLink } from "@/lib/site";

/** Articles keep their original WordPress URL: /{slug}/ */
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/${p.slug}/` },
    openGraph: { type: "article", publishedTime: p.date, modifiedTime: p.modified, images: p.cover ? [{ url: p.cover }] : undefined },
  };
}

export default function PostPage({ params }: PageProps<"/[slug]">) {
  return (
    <Suspense fallback={<div style={{ minHeight: "80svh" }} />}>
      <PostContent params={params} />
    </Suspense>
  );
}

async function PostContent({ params }: { params: PageProps<"/[slug]">["params"] }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const [related, machines] = await Promise.all([relatedPosts(post), getMachines()]);
  const mentioned = machines.filter((m) => post.html.includes(m.code) || post.title.includes(m.code));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.modified,
    image: post.cover ? `${site.domain}${post.cover}` : undefined,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, logo: `${site.domain}/brand/logo.webp` },
    mainEntityOfPage: `${site.domain}/${post.slug}/`,
  };

  return (
    <>
      <ReadingProgress />
      <article className="shell" style={{ paddingTop: 120 }}>
        <header className="inner" style={{ maxWidth: 980 }}>
          <nav aria-label="Breadcrumb" className="crumb">
            <Link href="/">Beranda</Link>
            <span aria-hidden>/</span>
            <Link href="/artikel/">Artikel</Link>
          </nav>
          <span className="badge" style={{ background: "var(--card)" }}>
            <span className="dot gold" /> {formatDate(post.date)} · {post.readingMinutes} menit baca
          </span>
          <h1 className="h-sec" style={{ marginTop: 18, fontSize: "clamp(2rem, 1.3rem + 2.6vw, 3.6rem)" }}>{post.title}</h1>
        </header>

        {post.cover && (
          <div className="card" style={{ padding: 8, marginTop: 32 }}>
            <div className="relative aspect-[21/10] overflow-hidden" style={{ borderRadius: 14 }}>
              <Image src={post.cover} alt={post.coverAlt} fill preload sizes="(min-width:1440px) 1400px, 100vw" className="object-cover" />
            </div>
          </div>
        )}

        <div className="two" style={{ paddingBlock: "clamp(40px, 6vw, 80px)" }}>
          <div className="card pad" style={{ gridColumn: "1 / span 8" }}>
            <div className="prose-mpb" dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
          <aside style={{ gridColumn: "9 / span 4" }}>
            <div className="sticky-l rows">
              <div className="card pad red">
                <span className="label">Butuh mesinnya?</span>
                <p className="h-card" style={{ marginTop: 8 }}>Konsultasi gratis dengan produsen langsung.</p>
                <div style={{ marginTop: 18 }}>
                  <Pill href={waLink(`Halo, saya baru membaca artikel "${post.title}". Saya ingin konsultasi mesin paving block.`)} tone="light" size="sm">
                    Chat WhatsApp
                  </Pill>
                </div>
              </div>
              {(mentioned.length ? mentioned : machines).slice(0, 3).map((m) => (
                <Link key={m.slug} href={`/mesin/${m.slug}/`} className="card lift" style={{ padding: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>
                    <b style={{ display: "block", fontWeight: 500 }}>{m.code}</b>
                    <span className="dim" style={{ fontSize: 13 }}>{m.nickname}</span>
                  </span>
                  <span className="chips"><span>{m.highlight.strength}</span></span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </article>

      <section className="shell" style={{ paddingBottom: 24 }}>
        <h2 className="h-sec inner" style={{ marginBottom: 24 }}>Baca juga</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => <PostCard key={p.slug} post={p} />)}
        </div>
      </section>
      <CtaBanner />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
