"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SplitTitle } from "@/components/motion/reveal";
import { useDesktopMotion } from "@/components/motion/use-desktop-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Inner-page hero: a rounded image card with the title bottom-left. */
export function PageHero({
  title,
  lead,
  img,
  alt,
  contain = false,
  product,
  crumbs,
  actions,
}: {
  title: string;
  lead?: ReactNode;
  img: string;
  alt: string;
  contain?: boolean;
  /** Product photo on the right, with a matching card background. */
  product?: { bg: string };
  crumbs: { href?: string; label: string }[];
  actions?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const desktopMotion = useDesktopMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], desktopMotion ? ["0%", "12%"] : ["0%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], desktopMotion ? [1, 0.95] : [1, 1]);

  return (
    <section className="ph" ref={ref}>
      <motion.div
        className={`ph-card ${contain ? "plain" : ""} ${product ? "product" : ""}`}
        style={{ scale, ...(product ? ({ background: product.bg, ["--pbg" as string]: product.bg } as object) : {}) }}
      >
        <motion.div
          className={`bg ${contain ? "contain" : ""} ${product ? "product" : ""}`}
          style={{ y }}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease }}
        >
          <Image src={img} alt={alt} fill preload sizes="(min-width:1080px) 90vw, 100vw" />
        </motion.div>
        <div className="ph-txt">
          <motion.nav aria-label="Breadcrumb" className="crumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <Link href="/">Beranda</Link>
            {crumbs.map((c) => (
              <span key={c.label} style={{ display: "contents" }}>
                <span aria-hidden>/</span>
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </span>
            ))}
          </motion.nav>
          <SplitTitle as="h1" text={title} instant delay={0.3} className="h-display" style={{ fontSize: "clamp(2.4rem, 1.2rem + 4vw, 5.2rem)" }} />
          {lead && (
            <motion.p className="lead" style={{ marginTop: 18, maxWidth: "44ch", color: "#3b322b" }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.6 }}>
              {lead}
            </motion.p>
          )}
          {actions && (
            <motion.div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 26 }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.75 }}>
              {actions}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
