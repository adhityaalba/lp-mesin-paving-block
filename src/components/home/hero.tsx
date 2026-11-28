"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { Magnetic, SplitTitle } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
import { ArrowUR, WhatsAppIcon } from "@/components/ui/icons";
import { waLink } from "@/lib/site";
import type { Machine } from "@/lib/content-schema";
import { useDesktopMotion } from "@/components/motion/use-desktop-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const CHIPS = [
  { t: "Body plat 10 cm", cls: "c1", d: 0 },
  { t: "Multiple vibrasi", cls: "c2", d: 0.8 },
  { t: "Elektrik Fuji original", cls: "c3", d: 1.6 },
];

const TRUST = ["Garansi 1 tahun", "DP 30%", "Gratis setting dan training di lokasi", "Kirim se-Indonesia"];

export function Hero({ machine }: { machine: Pick<Machine, "image" | "imageAlt"> }) {
  const ref = useRef<HTMLElement>(null);
  const desktopMotion = useDesktopMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], desktopMotion ? ["0%", "18%"] : ["0%", "0%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], desktopMotion ? [0, 90] : [0, 0]);
  const stageY = useTransform(scrollYProgress, [0, 1], desktopMotion ? [0, -60] : [0, 0]);

  // 3D tilt of the product stage toward the cursor.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const glow = useTransform(
    [mx, my],
    ([x, y]) => `radial-gradient(60% 55% at ${50 + (x as number) * 40}% ${40 + (y as number) * 30}%, rgba(255,240,225,0.38), rgba(255,240,225,0) 70%)`,
  );

  return (
    <section ref={ref} className="hero2" aria-labelledby="hero-h">
      <motion.div className="hero2-bg" style={{ y: bgY }} initial={{ scale: 1.12, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2, ease }}>
        <Image src="/brand/herringbone.webp" alt="" fill preload sizes="100vw" />
      </motion.div>

      <div className="hero2-grid shell">
        <motion.div className="hero2-copy" style={{ y: copyY }}>
          <motion.span className="badge" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.4 }}>
            <span className="dot" /> Produsen langsung · Mojokerto
          </motion.span>
          <SplitTitle as="h1" id="hero-h" className="h-display" text="Mesin cetak paving yang padat sampai K500" delay={0.5} instant />
          <motion.p className="lead" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1 }}>
            Mesin paving dan batako hidrolik dengan multiple vibrasi. Dirakit di workshop sendiri, dikirim dan dipasang di seluruh Indonesia.
          </motion.p>
          <motion.div className="hero2-cta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1.15 }}>
            <Magnetic>
              <Pill href={waLink()} icon={<WhatsAppIcon className="size-4" />}>Konsultasi gratis</Pill>
            </Magnetic>
            <Magnetic>
              <Pill href="#mesin" tone="light">Lihat 3 tipe mesin</Pill>
            </Magnetic>
          </motion.div>
          <motion.ul className="hero2-trust" initial="h" animate="s" variants={{ h: {}, s: { transition: { staggerChildren: 0.08, delayChildren: 1.3 } } }}>
            {TRUST.map((t) => (
              <motion.li key={t} variants={{ h: { opacity: 0, y: 10 }, s: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}>
                <span className="dot gold" /> {t}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="hero2-stage"
          style={{ y: stageY }}
          initial={{ opacity: 0, clipPath: "inset(10% 6% 10% 6% round 32px)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 32px)" }}
          transition={{ duration: 1.5, ease, delay: 0.3 }}
          onPointerMove={(e) => {
            if (!desktopMotion || e.pointerType !== "mouse") return;
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width - 0.5);
            my.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          <motion.div className="stage-glow" style={{ background: glow }} aria-hidden />
          <motion.span className="stage-num" aria-hidden initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, ease, delay: 0.7 }}>
            K500
          </motion.span>
          <div className="stage-floor" aria-hidden />
          <motion.div className="stage-machine" style={{ rotateX: desktopMotion ? rx : 0, rotateY: desktopMotion ? ry : 0 }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease, delay: 0.8 }}>
            <motion.div className="absolute inset-0" animate={desktopMotion ? { y: [0, -8, 0] } : { y: 0 }} transition={{ duration: desktopMotion ? 6 : 0, repeat: desktopMotion ? Infinity : 0, ease: "easeInOut" }}>
              <Image src={machine.image} alt={machine.imageAlt} fill preload sizes="(min-width:1080px) 30vw, 70vw" />
            </motion.div>
          </motion.div>
          <div className="stage-chips">
          {CHIPS.map((c) => (
            <motion.span
              key={c.t}
              className={`stage-chip glass ${c.cls}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={desktopMotion ? { opacity: 1, scale: 1, y: [0, -6, 0] } : { opacity: 1, scale: 1, y: 0 }}
              transition={{
                opacity: { duration: 0.6, delay: 1.4 + c.d * 0.2 },
                scale: { duration: 0.6, delay: 1.4 + c.d * 0.2 },
                y: { duration: desktopMotion ? 5 : 0, repeat: desktopMotion ? Infinity : 0, ease: "easeInOut", delay: desktopMotion ? c.d : 0 },
              }}
            >
              <span className="dot gold" /> {c.t}
            </motion.span>
          ))}
          </div>
          <Link href="/mesin/rh1e15/" className="stage-bar glass">
            <span>
              <span className="label" style={{ color: "var(--muted)" }}>Tipe unggulan</span>
              <b>RH1E15 · The Legend</b>
            </span>
            <span className="circle-ico"><ArrowUR /></span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
