"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Pill } from "@/components/ui/pill";
import type { Machine } from "@/lib/content-schema";
import { waLink } from "@/lib/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TAG: Record<string, string> = { rh1e15: "Unggulan", rh1s12: "Paket lengkap", hr6e12: "Favorit pemula" };

/** Large screens get a pinned catalogue; other layouts read vertically. */
export function MachinesHz({ machines }: { machines: Machine[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1081px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const dist = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.9, invalidateOnRefresh: true },
        });
        gsap.to(".hz-bar i", { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, scrub: true } });
        gsap.utils.toArray<HTMLElement>(".mcard").forEach((card) => {
          const img = card.querySelector(".m-move");
          if (img)
            gsap.fromTo(img, { xPercent: 14, rotate: 3 }, {
              xPercent: -14, rotate: -3, ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            });
          gsap.from(card.querySelectorAll(".m-in"), {
            y: 40, opacity: 0, stagger: 0.06, duration: 0.9, ease: "expo.out",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 75%" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="mesin" className="hz" style={{ paddingBlock: "clamp(56px, 8vh, 96px)" }} aria-labelledby="hz-h">
      <div className="hz-viewport">
        <div ref={track} className="hz-track" style={{ paddingBottom: 12 }}>
          <div className="hz-intro">
            <span className="label">Katalog mesin</span>
            <h2 id="hz-h" className="h-sec" style={{ marginTop: 12 }}>
              Tiga tipe. Satu standar: padat.
            </h2>
            <p className="muted" style={{ marginTop: 14 }}>
              Dari pemula yang baru membuka pabrik sampai supplier proyek K500. Semua semi-automatic dan bergaransi satu tahun.
            </p>
            <div style={{ marginTop: 24 }}>
              <Pill href="/mesin/" tone="ghost" icon={false} size="sm">Bandingkan spesifikasi</Pill>
            </div>
          </div>

          {machines.map((m, i) => {
            return (
              <article key={m.slug} className="mcard" style={{ scrollSnapAlign: "center" }}>
                <div className="mcard-vis" style={{ background: m.studioBg }}>
                  <div className="m-photo">
                    <div className="m-move">
                      <Image src={m.studio} alt={`Mesin paving block ${m.code} ${m.nickname}`} fill sizes="(min-width:1080px) 46vw, 88vw" style={{ objectFit: "contain", objectPosition: "50% 100%" }} />
                    </div>
                  </div>
                  <span className="badge" style={{ position: "absolute", left: 18, bottom: 18 }}>
                    <span className="dot gold" /> 0{i + 1} / 03
                  </span>
                </div>
                <div className="mcard-txt">
                  <div className="chips m-in">
                    <span className="gold">{TAG[m.slug]}</span>
                    <span>{m.tagline}</span>
                  </div>
                  <div className="m-in">
                    <h3 style={{ fontSize: "clamp(40px, 4.6vw, 72px)", letterSpacing: "-0.05em", lineHeight: 0.92 }}>{m.code}</h3>
                    <p className="muted" style={{ marginTop: 6 }}>{m.nickname}</p>
                  </div>
                  <p className="muted m-in" style={{ fontSize: 15.5 }}>{m.summary}</p>
                  <div className="mspec m-in">
                    <div><span className="label">Kuat tekan</span><b>{m.highlight.strength === "SNI" ? "SNI" : m.highlight.strength}</b></div>
                    <div><span className="label">Per siklus</span><b>{m.calc.pcsPerCycle} pcs</b></div>
                    <div><span className="label">Siklus</span><b>{m.calc.cycleSeconds} dtk</b></div>
                    <div><span className="label">Listrik</span><b>{m.highlight.power}</b></div>
                  </div>
                  <div className="m-in" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
                    <Pill href={`/mesin/${m.slug}/`} size="sm">Spesifikasi</Pill>
                    <Pill
                      href={waLink(`Halo CV Multi Baja Technic, saya tertarik mesin ${m.code} (${m.nickname}). Boleh minta info harga?`)}
                      tone="ghost"
                      size="sm"
                      icon={false}
                    >
                      Tanya harga
                    </Pill>
                  </div>
                </div>
              </article>
            );
          })}
          <div className="hz-spacer" aria-hidden />
        </div>
      </div>
      <div className="hz-bar" aria-hidden><i /></div>
    </section>
  );
}
