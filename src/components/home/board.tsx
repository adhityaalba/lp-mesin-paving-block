"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Item, Reveal, Stagger } from "@/components/motion/reveal";
import { machines } from "@/lib/machines";

const ease = [0.22, 1, 0.36, 1] as const;
const STATUS: Record<string, { label: string; hot?: boolean }> = {
  rh1e15: { label: "Unggulan", hot: true },
  rh1s12: { label: "Paket lengkap" },
  hr6e12: { label: "Favorit pemula" },
};

/** The three machines as rows; one opens at a time. */
export function Board({ title = "Tiga mesin, satu standar", intro }: { title?: string; intro?: string }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" aria-labelledby="board-h">
      <div className="board-head wrap" style={{ paddingInline: "var(--m)" }}>
        <Reveal as="h2" id="board-h" className="head">
          {title}
        </Reveal>
        <Reveal as="p" className="muted measure" delay={0.1}>
          {intro ??
            "Semua semi-automatic, semua bergaransi satu tahun. Pilih baris untuk melihat ringkasannya, lalu buka spesifikasi lengkapnya."}
        </Reveal>
      </div>
      <div className="board" data-ui>
        <div className="brow brow-head" aria-hidden style={{ minHeight: 44, background: "transparent", cursor: "default", fontSize: 13, color: "var(--dim)", letterSpacing: 0 }}>
          <span>Tipe</span>
          <span>Kuat tekan</span>
          <span>Paving / siklus</span>
          <span>Listrik</span>
          <span style={{ justifySelf: "end" }}>Status</span>
        </div>
        <Stagger className="board-rows" gap={0.05}>
          {machines.map((m, i) => {
            const st = STATUS[m.slug];
            const isOpen = open === i;
            return (
              <Item key={m.slug} y={18}>
                <motion.div
                  layout
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpen(i);
                    }
                  }}
                  className={`brow ${isOpen ? "open" : ""}`}
                  transition={{ duration: 0.45, ease }}
                >
                  <span>
                    {m.code} <span style={{ opacity: 0.6 }}>· {m.nickname.replace(" Innovated", "")}</span>
                  </span>
                  <span className="f">{m.highlight.strength === "SNI" ? "Standar SNI" : `Hingga ${m.highlight.strength}`}</span>
                  <span className="f">
                    {m.calc.pcsPerCycle} pcs / {m.calc.cycleSeconds} dtk
                  </span>
                  <span className="f">{m.highlight.power}</span>
                  <span className={`st ${st.hot ? "hot" : ""}`}>{st.label}</span>
                  {isOpen && (
                    <motion.span className="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                      <span>
                        <p>{m.summary}</p>
                        <Link href={`/mesin/${m.slug}/`} className="go" onClick={(e) => e.stopPropagation()}>
                          Spesifikasi lengkap {m.code} →
                        </Link>
                      </span>
                      <Image src={m.image} alt="" width={200} height={260} className="object-contain" />
                    </motion.span>
                  )}
                </motion.div>
              </Item>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
