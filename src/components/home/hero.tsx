"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SplitTitle } from "@/components/motion/reveal";
import { waLink } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const PavingField = dynamic(() => import("@/components/three/paving-field"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg" />,
});

/** Real workshop photographs for the small print. */
const SMALL = [
  { src: "/brand/hr6e12-1.webp", alt: "Mesin HR6E12 di workshop Mojokerto" },
  { src: "/brand/rh1s12-studio.webp", alt: "Mesin RH1S12 tampak samping" },
  { src: "/brand/hr6e12-22.webp", alt: "Panel kontrol dan power pack mesin HR6E12" },
];

const PHASES = ["Bahan masuk ke cetakan", "Vibrasi ganda memadatkan", "Tekanan hidrolik turun", "Paving padat, siap diangkat"];

function Crossfade() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      if (!document.hidden) setI((x) => (x + 1) % SMALL.length);
    }, 5600);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={SMALL[i].src}
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      >
        <Image src={SMALL[i].src} alt={SMALL[i].alt} fill sizes="(min-width:1080px) 13vw, 30vw" />
      </motion.div>
    </AnimatePresence>
  );
}

function PhaseCaption() {
  const [p, setP] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      if (!document.hidden) setP((x) => (x + 1) % PHASES.length);
    }, 2400);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <div className="hero-big-cap" aria-live="polite">
      <span className="pulse" />
      <AnimatePresence mode="wait">
        <motion.span
          key={p}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
        >
          {PHASES[p]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bigY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const smallY = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="hero-stage">
        <motion.div
          className="hero-small"
          style={{ y: smallY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 0.5 }}
        >
          <Crossfade />
        </motion.div>
        <motion.div
          className="hero-big"
          style={{ y: bigY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease, delay: 0.15 }}
        >
          <PavingField />
          <PhaseCaption />
        </motion.div>
      </div>

      <motion.div className="hero-copy" style={{ y: copyY, opacity: fade }}>
        <SplitTitle as="h1" text="Mesin paving block yang mencetak padat, sampai K500" delay={0.3} instant />
        <span id="hero-title" className="sr-only">
          CV Multi Baja Technic, produsen mesin cetak paving block dan batako hidrolik
        </span>
        <motion.p
          className="sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.7 }}
        >
          Mesin cetak paving dan batako hidrolik dengan multiple vibrasi. Hasilnya padat dan kuat, sesuai standar
          proyek pemerintah maupun swasta.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.85 }}
        >
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn primary">
            Konsultasi via WhatsApp <span className="arrow">→</span>
          </a>
          <Link href="/mesin/" className="chip" aria-label="Lihat tiga tipe mesin">
            <span className="chip-label">3 tipe</span>
            <span>RH1E15 · RH1S12 · HR6E12</span>
          </Link>
        </motion.div>
      </motion.div>

      <motion.p
        className="hero-side"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.1 }}
      >
        <b>Dirakit di workshop sendiri</b> di Mojokerto, lalu dikirim dan dipasang di seluruh Indonesia. Garansi 1 tahun.
      </motion.p>
    </section>
  );
}
