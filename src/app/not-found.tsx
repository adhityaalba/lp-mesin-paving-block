import Image from "next/image";
import { Pill } from "@/components/ui/pill";

export default function NotFound() {
  return (
    <section className="ph">
      <div className="ph-card">
        <div className="bg"><Image src="/brand/cta-dunes.webp" alt="" fill sizes="100vw" /></div>
        <div className="ph-txt">
          <span className="badge"><span className="dot" /> Error 404</span>
          <h1 className="h-display" style={{ marginTop: 16, fontSize: "clamp(2.4rem, 1.2rem + 4vw, 5rem)" }}>Halaman ini retak sebelum dicetak</h1>
          <p className="lead" style={{ marginTop: 14, color: "#3b322b" }}>Halaman yang Anda cari tidak ditemukan atau sudah dipindahkan.</p>
          <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            <Pill href="/">Kembali ke beranda</Pill>
            <Pill href="/artikel/" tone="ghost" icon={false}>Baca artikel</Pill>
          </div>
        </div>
      </div>
    </section>
  );
}
