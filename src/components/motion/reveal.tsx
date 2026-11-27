"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;
type Tag = "div" | "p" | "h2" | "h3" | "li" | "ul" | "section" | "article" | "span";

/** Rises in once when it enters the viewport (optionally with a soft blur). */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  as = "div",
  className,
  style,
  id,
  blur = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: Tag;
  className?: string;
  style?: CSSProperties;
  id?: string;
  blur?: boolean;
}) {
  const reduce = useReducedMotion();
  const C = motion[as];
  return (
    <C
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: reduce ? 0 : y, filter: blur && !reduce ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </C>
  );
}

export function Stagger({ children, className, gap = 0.08, as = "div", style }: { children: ReactNode; className?: string; gap?: number; as?: Tag; style?: CSSProperties }) {
  const C = motion[as];
  return (
    <C
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </C>
  );
}

export function Item({ children, className, as = "div", y = 30, style }: { children: ReactNode; className?: string; as?: Tag; y?: number; style?: CSSProperties }) {
  const reduce = useReducedMotion();
  const C = motion[as];
  return (
    <C
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y, scale: reduce ? 1 : 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.95, ease } },
      }}
    >
      {children}
    </C>
  );
}

/** Headline whose words slide up from a mask. */
export function SplitTitle({
  text,
  as = "h2",
  className,
  delay = 0,
  instant = false,
  id,
  style,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  instant?: boolean;
  id?: string;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const C = motion[as];
  const words = text.split(" ");
  return (
    <C
      id={id}
      className={className}
      style={style}
      initial="hidden"
      {...(instant ? { animate: "show" } : { whileInView: "show", viewport: { once: true } })}
      aria-label={text}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={i} className="mask" aria-hidden="true" style={{ marginRight: "0.22em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            variants={{
              hidden: { y: reduce ? 0 : "110%", rotate: reduce ? 0 : 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease } },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </C>
  );
}

/** Children drift against the scroll inside an overflow-hidden box (GSAP scrub). */
export function Parallax({ children, className, amount = 10, style }: { children: ReactNode; className?: string; amount?: number; style?: CSSProperties }) {
  const box = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          box.current!.firstElementChild,
          { yPercent: -amount, scale: 1.08 },
          { yPercent: amount, scale: 1, ease: "none", scrollTrigger: { trigger: box.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    },
    { scope: box },
  );
  return (
    <div ref={box} className={className} style={{ overflow: "hidden", ...style }}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

/** Number that counts up once visible; renders the final value on the server. */
export function Counter({ to, prefix = "", suffix = "", decimals = 0 }: { to: number; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const mv = useMotionValue(to);
  const text = useTransform(mv, (v) => v.toLocaleString("id-ID", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }));
  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    mv.jump(0);
    const c = animate(mv, to, { duration: 2, ease });
    return () => c.stop();
  }, [inView, to, mv]);
  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{text}</motion.span>
      {suffix}
    </span>
  );
}

/** Pulls its child gently toward the cursor. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });
  return (
    <motion.span
      ref={ref}
      style={{ x, y, display: "inline-flex" }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
