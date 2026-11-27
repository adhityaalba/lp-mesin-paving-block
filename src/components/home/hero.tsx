"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Magnetic, SplitTitle } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
import { ArrowUR, WhatsAppIcon } from "@/components/ui/icons";
import { waLink } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "14%"]);
  const machineY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const textO = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.94]);

  // Cursor parallax: background and machine shift in opposite directions.
  const mx = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const bgX = useTransform(sx, (v) => v * -14);
  const mX = useTransform(sx, (v) => v * 22);

  return (
    <section
      ref={ref}
      className="hero"
      aria-labelledby="hero-h"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
      }}
    >
      <motion.div className="hero-card" style={{ scale: cardScale }}>
        <motion.div
          className="hero-bg"
          style={{ y: bgY, x: bgX }}
          initial={{ scale: 1.18, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease }}
        >
          <Image src="/brand/hero-yard.webp" alt="" fill preload sizes="100vw" />
        </motion.div>

        <motion.div className="hero-center" style={{ y: textY, opacity: textO }}>
          <motion.span className="badge" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.5 }}>
            <span className="dot" /> Produsen langsung · Mojokerto
          </motion.span>
          <SplitTitle as="h1" id="hero-h" className="h-display" text="Mesin Paving Block K500" delay={0.6} instant />
          <motion.p className="lead" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1.1 }}>
            Mesin cetak paving dan batako hidrolik dengan multiple vibrasi. Padat, kuat, dan siap untuk standar proyek.
          </motion.p>
        </motion.div>

        <motion.div className="hero-shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 1.2 }} />
        <motion.div
          className="hero-machine"
          style={{ y: machineY, x: mX }}
          initial={{ opacity: 0, y: 120, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.6, ease, delay: 0.9 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ translate: "-50% 0" }}
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src="/brand/rh1e15-hd.webp" alt="Mesin paving block RH1E15 buatan CV Multi Baja Technic" fill sizes="(min-width:720px) 22vw, 46vw" preload />
          </motion.div>
        </motion.div>

        <motion.div className="hero-stat glass" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease, delay: 1.3 }}>
          <b className="tnum">K500</b>
          <span className="label" style={{ color: "var(--muted)" }}>Kuat tekan hasil cetak</span>
          <div style={{ marginTop: 14 }}>
            <Magnetic>
              <Pill href={waLink()} tone="light" size="sm" icon={<WhatsAppIcon className="size-3.5" />}>
                Chat WhatsApp
              </Pill>
            </Magnetic>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 1.4 }}>
          <Link href="#mesin" className="notch" aria-label="Lihat katalog mesin">
            <span className="circle-ico"><ArrowUR /></span>
            <span className="notch-txt">
              <b style={{ display: "block", fontWeight: 500, fontSize: 15 }}>Katalog mesin</b>
              <span className="dim" style={{ fontSize: 13 }}>3 tipe ›</span>
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
