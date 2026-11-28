"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import type { MachineLink } from "@/lib/content-schema";
import { waLink } from "@/lib/site";

export function FloatingWA({ machines }: { machines: MachineLink[] }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 800);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const machine = machines.find((m) => pathname.startsWith(`/mesin/${m.slug}`));
  const msg = machine
    ? `Halo CV Multi Baja Technic, saya tertarik mesin ${machine.code} (${machine.nickname}). Boleh minta info harga & ketersediaan?`
    : undefined;
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={waLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat WhatsApp"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pill wa fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6"
          style={{ boxShadow: "0 16px 30px -12px rgba(31,168,85,.6)" }}
        >
          <span className="hidden sm:inline">WhatsApp</span>
          <span className="ico"><WhatsAppIcon className="size-4" /></span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
