import Image from "next/image";
import Link from "next/link";
import { Parallax, Reveal } from "@/components/motion/reveal";

/** Lit exhibits from the workshop, text set beside each. */
export function Rooms() {
  return (
    <section className="section wrap" aria-labelledby="rooms-h">
      <Reveal as="h2" id="rooms-h" className="head" style={{ marginBottom: "clamp(48px, 6vw, 96px)", maxWidth: "16ch" }}>
        Dari workshop kami, bukan dari katalog
      </Reveal>
      <div className="rooms">
        <div className="room">
          <Reveal className="room-img tall">
            <video
              className="img-fill dimmed"
              src="/video/hr6e12-loop.mp4"
              poster="/brand/hr6e12-1.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-label="Video mesin HR6E12 di workshop Mojokerto"
            />
          </Reveal>
          <Reveal className="room-txt" delay={0.1}>
            <h3>Rangka plat tebal, double vibrator</h3>
            <p className="muted">
              Rekaman langsung dari workshop di Mojokerto. Body kotak yang kokoh menahan tekanan dan putaran vibrator,
              sehingga kepadatan paving tetap rata dari palet pertama sampai terakhir.
            </p>
            <ul>
              <li>Body plat tebal hingga 10 cm pada RH1E15</li>
              <li>Silinder hidrolik diameter besar</li>
              <li>Turbo blower pendingin vibrator</li>
            </ul>
            <Link href="/mesin/hr6e12/" className="textlink">
              Lihat HR6E12 <span>→</span>
            </Link>
          </Reveal>
        </div>

        <div className="room flip">
          <Parallax className="room-img" amount={50}>
            <Image src="/brand/detail-strip.webp" alt="Detail RH1E15: rotor vibrator dua fungsi, filter oli dan saringan bahan baku, vibrasi atas tambahan" fill sizes="(min-width:1080px) 58vw, 100vw" className="object-cover dimmed" />
          </Parallax>
          <Reveal className="room-txt" delay={0.1}>
            <h3>Komponen yang tidak kami hemat</h3>
            <p className="muted">
              Seluruh material baru berstandar SNI. Power pack memakai elektrik Fuji original dengan tangki oli lebih
              besar, dan setiap detail difokuskan pada vibrasi besar serta tekanan hidrolik yang maksimal.
            </p>
            <ul>
              <li>Rotor vibrator di bawah meja cetak</li>
              <li>Filter oli dan saringan bahan baku</li>
              <li>Vibrasi atas tambahan untuk produk K500</li>
            </ul>
          </Reveal>
        </div>

        <div className="room">
          <Parallax className="room-img" amount={50}>
            <Image src="/brand/paving-texture.webp" alt="Permukaan paving holland yang padat dan rapi" fill sizes="(min-width:1080px) 58vw, 100vw" className="object-cover dim-strong" />
          </Parallax>
          <Reveal className="room-txt" delay={0.1}>
            <h3>Hasilnya yang dinilai, bukan mesinnya</h3>
            <p className="muted">
              Paving dan batako dari mesin kami dijamin padat dan kuat, K350 sampai K500, sesuai standar proyek
              pemerintah daerah maupun swasta. Banyak pengusaha pengguna mesin kami melaporkan keuntungan di atas 40%.
            </p>
            <Link href="/artikel/" className="textlink">
              Baca panduan produksi <span>→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
