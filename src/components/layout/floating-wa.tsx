"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { machines } from "@/lib/machines";
import { waLink } from "@/lib/site";

/** Quiet square WhatsApp button; carries the machine on screen into the chat. */
export function FloatingWA() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-4 bottom-4 z-40 inline-flex min-h-12 items-center gap-2.5 bg-wa px-4 text-[15px] font-medium text-white sm:right-6 sm:bottom-6"
        >
          <WhatsAppIcon className="size-5" />
          <span className="hidden sm:inline">WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
