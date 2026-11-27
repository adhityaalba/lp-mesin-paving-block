"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site, waLink } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

/** Small live-feeling readout: the workshop status line. */
function WorkshopRead() {
  return (
    <div className="netread">
      <span className="pulse" aria-hidden />
      <span>
        Workshop <b>Mojokerto</b>
      </span>
      <span>
        WA <b className="tnum">{site.phone}</b>
      </span>
    </div>
  );
}

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

  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      if (y > 400 && y > last.current + 4) setHide(true);
      if (y < last.current - 4) setHide(false);
      last.current = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Close the sheet when the route changes (state-from-props, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`nav ${solid ? "solid" : ""} ${hide && !open ? "hide" : ""}`}>
        <div className="wrap nav-in">
          <div className="nav-left">
            <Brand />
            <nav className="nav-links" aria-label="Navigasi utama">
              {nav.map((l) => {
                const on = pathname.startsWith(l.href);
                return (
                  <Link key={l.href} href={l.href} className={on ? "on" : ""}>
                    {on && (
                      <motion.span layoutId="navpill" className="pill" transition={{ type: "spring", stiffness: 380, damping: 34 }} />
                    )}
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="nav-right">
            <WorkshopRead />
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn primary sm">
              Konsultasi
            </a>
            <button className="menu-btn" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="sheet">
              Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="sheet"
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="nav-in">
              <Brand />
              <button className="menu-btn" style={{ display: "inline-block" }} onClick={() => setOpen(false)}>
                Tutup
              </button>
            </div>
            <nav aria-label="Menu seluler">
              {[{ href: "/", label: "Beranda" }, ...nav].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease }}
                >
                  <Link href={l.href}>{l.label}</Link>
                </motion.div>
              ))}
            </nav>
            <div className="sheet-foot">
              <WorkshopRead />
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn primary">
                Konsultasi via WhatsApp <span className="arrow">→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
