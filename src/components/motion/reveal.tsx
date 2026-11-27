"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;
type Tag = "div" | "p" | "h2" | "h3" | "li" | "ul" | "section" | "article" | "span";

/** Rises in once when it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  as = "div",
  className,
  style,
  id,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: Tag;
  className?: string;
  style?: CSSProperties;
  id?: string;
}) {
  const reduce = useReducedMotion();
  const C = motion[as];
  return (
    <C
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </C>
  );
}

/** Staggers its <Item> children. */
export function Stagger({ children, className, gap = 0.075, as = "div" }: { children: ReactNode; className?: string; gap?: number; as?: Tag }) {
  const C = motion[as];
  return (
    <C
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </C>
  );
}

export function Item({ children, className, as = "div", y = 24 }: { children: ReactNode; className?: string; as?: Tag; y?: number }) {
  const reduce = useReducedMotion();
  const C = motion[as];
  return (
    <C
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
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
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  instant?: boolean;
  id?: string;
}) {
  const reduce = useReducedMotion();
  const C = motion[as];
  const words = text.split(" ");
  return (
    <C
      id={id}
      className={className}
      initial="hidden"
      {...(instant ? { animate: "show" } : { whileInView: "show", viewport: { once: true } })}
      aria-label={text}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="reveal-mask"
          aria-hidden="true"
          style={{ display: "inline-block", marginRight: "0.24em", paddingBottom: "0.06em" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            variants={{
              hidden: { y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 },
              show: { y: "0%", opacity: 1, transition: { duration: 1, ease } },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </C>
  );
}

/** Picture that drifts against the scroll (GSAP ScrollTrigger scrub). */
export function Parallax({
  children,
  className,
  amount = 60,
  style,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  style?: CSSProperties;
}) {
  const box = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          box.current!.firstElementChild,
          { yPercent: -amount / 10, scale: 1.12 },
          {
            yPercent: amount / 10,
            scale: 1.02,
            ease: "none",
            scrollTrigger: { trigger: box.current, start: "top bottom", end: "bottom top", scrub: true },
          },
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
