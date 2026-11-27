import Image from "next/image";
import { Magnetic, Parallax, SplitTitle, Reveal } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waLink } from "@/lib/site";

export function CtaBanner({
  title = "Cetak paving pertama Anda bulan ini.",
  body = "Free 1 set cetakan, DP cukup 30%. Konsultasi gratis dengan produsen langsung.",
  message,
}: {
  title?: string;
  body?: string;
  message?: string;
}) {
  return (
    <section className="shell" style={{ paddingBlock: "clamp(24px, 4vw, 60px)" }}>
      <div className="banner">
        <Parallax className="bg" amount={6}>
          <Image src="/brand/cta-dunes.webp" alt="" fill sizes="100vw" />
        </Parallax>
        <div className="inner" style={{ padding: "clamp(28px, 5vw, 72px)", maxWidth: 760 }}>
          <SplitTitle text={title} className="h-display" style={{ fontSize: "clamp(2.4rem, 1.2rem + 4.2vw, 5rem)" }} />
          <Reveal as="p" className="lead" delay={0.2} style={{ marginTop: 18, maxWidth: "40ch", color: "#3b322b" }}>
            {body}
          </Reveal>
          <Reveal delay={0.3} style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
            <Magnetic>
              <Pill href={waLink(message)} tone="light" icon={<WhatsAppIcon className="size-4" />}>Chat WhatsApp</Pill>
            </Magnetic>
            <Magnetic>
              <Pill href="/mesin/">Lihat katalog</Pill>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
