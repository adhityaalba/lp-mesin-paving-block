"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SplitTitle } from "@/components/motion/reveal";

const ease = [0.22, 1, 0.36, 1] as const;

/** Inner-page opening: text bottom-left, one lit image on the right. */
export function PageHero({
  title,
  lead,
  img,
  alt,
  contain = false,
  crumbs,
  actions,
}: {
  title: string;
  lead?: ReactNode;
  img: string;
  alt: string;
  contain?: boolean;
  crumbs: { href?: string; label: string }[];
  actions?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.04, 1.16]);

  return (
    <section className="page-hero" ref={ref}>
      <motion.div
        className={`ph-img ${contain ? "contain" : ""}`}
        initial={{ clipPath: "inset(12% 0 12% 0)", opacity: 0 }}
        animate={{ clipPath: "inset(0% 0 0% 0)", opacity: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        <motion.div className="absolute inset-0" style={{ y, scale }}>
          <Image src={img} alt={alt} fill preload sizes="(min-width:1080px) 58vw, 100vw" className={contain ? "" : img.includes("texture") ? "object-cover dim-strong" : "object-cover dimmed"} />
        </motion.div>
      </motion.div>
      <div className="ph-txt">
        <nav aria-label="Breadcrumb" className="ph-crumb">
          <Link href="/">Beranda</Link>
          {crumbs.map((c) => (
            <span key={c.label} style={{ display: "contents" }}>
              <span aria-hidden>/</span>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
        <SplitTitle as="h1" text={title} instant />
        {lead && (
          <motion.p className="lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.45 }}>
            {lead}
          </motion.p>
        )}
        {actions && (
          <motion.div className="ph-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.6 }}>
            {actions}
          </motion.div>
        )}
      </div>
    </section>
  );
}
