"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Pill } from "@/components/ui/pill";
import { nav, site, waLink } from "@/lib/site";
import { getLenis } from "@/components/providers/smooth-scroll";

const ease = [0.22, 1, 0.36, 1] as const;

function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Multi Baja Technic — beranda">
      <Image src="/brand/logo.webp" alt="" width={30} height={30} />
      Multi Baja Technic
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [hide, setHide] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      setSolid(y > 60);
      if (y > 500 && y > last.current + 4) setHide(true);
      if (y <= 500 || y < last.current - 4) setHide(false);
      last.current = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.documentElement.style.overflow;
    const previousFocus = document.activeElement;
    document.documentElement.style.overflow = "hidden";
    getLenis()?.stop();
    const focusable = () => sheet.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    focusable()?.[0]?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const elements = focusable();
      if (!elements?.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = previousOverflow;
      getLenis()?.start();
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={`hdr ${solid ? "solid" : ""}`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hide && !open ? "-120%" : 0, opacity: 1 }}
        transition={{ duration: 0.3, ease }}
      >
        <div className="hdr-in">
          <Brand />
          <nav className="navpill glass" aria-label="Navigasi utama">
            {nav.map((l) => {
              const on = pathname.startsWith(l.href);
              return (
                <Link key={l.href} href={l.href} className={on ? "on" : ""}>
                  {on && <motion.span layoutId="nav-on" className="on-bg" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="hdr-cta" style={{ display: "inline-flex" }}>
              <Pill href={waLink()} size="sm">Konsultasi</Pill>
            </span>
            <button className="menu-btn pill light sm plain" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="sheet">
              Menu
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={sheet}
            id="sheet"
            className="sheet"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Brand />
              <button className="pill light sm plain" onClick={() => setOpen(false)}>
                Tutup
              </button>
            </div>
            <nav aria-label="Menu seluler">
              {[{ href: "/", label: "Beranda" }, ...nav].map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05, duration: 0.7, ease }}>
                  <Link href={l.href} onClick={() => setOpen(false)}>
                    {l.label} <small>0{i + 1}</small>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div style={{ marginTop: "auto", display: "grid", gap: 10 }}>
              <Pill href={waLink()}>Konsultasi via WhatsApp</Pill>
              <p className="dim" style={{ fontSize: 13 }}>
                WA {site.phone} · Workshop Puri, Mojokerto
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
