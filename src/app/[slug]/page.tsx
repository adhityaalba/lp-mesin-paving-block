import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageSkeleton } from "@/components/page-skeleton";
import { PostCard } from "@/components/post-card";
import { Cta } from "@/components/cta";
import { ReadingProgress } from "@/components/reading-progress";
import { formatDate, getPost, posts, relatedPosts } from "@/lib/posts";
import { machines } from "@/lib/machines";
import { site, waLink } from "@/lib/site";

/** Articles keep their original WordPress URL: /{slug}/ */
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/${p.slug}/` },
    openGraph: {
      type: "article",
      publishedTime: p.date,
      modifiedTime: p.modified,
      images: p.cover ? [{ url: p.cover }] : undefined,
    },
  };
}

export default function PostPage({ params }: PageProps<"/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PostContent params={params} />
    </Suspense>
  );
}

async function PostContent({ params }: { params: PageProps<"/[slug]">["params"] }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = relatedPosts(post);
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
      <article>
        <header className="wrap" style={{ paddingTop: 140, paddingBottom: 48 }}>
          <nav aria-label="Breadcrumb" className="ph-crumb">
            <Link href="/">Beranda</Link>
            <span aria-hidden>/</span>
            <Link href="/artikel/">Artikel</Link>
          </nav>
          <div className="grid12" style={{ rowGap: 24 }}>
            <h1 className="display col-span-12 lg:col-span-8" style={{ fontSize: "clamp(2rem, 1.3rem + 2.6vw, 3.75rem)" }}>
              {post.title}
            </h1>
            <p className="small muted col-span-12 lg:col-span-3 lg:col-start-10 lg:self-end">
              {formatDate(post.date)} · {post.readingMinutes} menit baca
              {post.tags.length > 0 && <span className="dim" style={{ display: "block", marginTop: 6 }}>{post.tags.slice(0, 3).join(", ")}</span>}
            </p>
          </div>
        </header>

        {post.cover && (
          <div className="wrap">
            <div className="relative aspect-video overflow-hidden bg-surface" style={{ maxWidth: 1200 }}>
              <Image src={post.cover} alt={post.coverAlt} fill preload sizes="(min-width:1280px) 1200px, 100vw" className="object-cover dimmed" />
            </div>
          </div>
        )}

        <div className="section wrap">
          <div className="grid12" style={{ rowGap: 48 }}>
            <div className="prose-mpb col-span-12 lg:col-span-7" dangerouslySetInnerHTML={{ __html: post.html }} />
            <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
              <div className="sticky-l" style={{ display: "grid", gap: 4 }}>
                <div className="spec-group">
                  <h3>Butuh mesinnya?</h3>
                  <p style={{ fontSize: 20, letterSpacing: "-0.01em", lineHeight: 1.3 }}>Konsultasi gratis dengan produsen langsung.</p>
                  <a
                    href={waLink(`Halo, saya baru membaca artikel "${post.title}". Saya ingin konsultasi mesin paving block.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn primary"
                    style={{ marginTop: 18, width: "100%" }}
                  >
                    Chat WhatsApp <span className="arrow">→</span>
                  </a>
                </div>
                {(mentioned.length ? mentioned : machines).slice(0, 3).map((m) => (
                  <Link key={m.slug} href={`/mesin/${m.slug}/`} className="step" style={{ gridTemplateColumns: "1fr auto", alignItems: "center", padding: 20 }}>
                    <span>
                      <span style={{ display: "block", fontWeight: 500 }}>{m.code}</span>
                      <span className="small muted">{m.nickname}</span>
                    </span>
                    <span className="small muted tnum">{m.highlight.strength}</span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="section wrap">
        <h2 className="head" style={{ marginBottom: 40 }}>Baca juga</h2>
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
      <Cta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
