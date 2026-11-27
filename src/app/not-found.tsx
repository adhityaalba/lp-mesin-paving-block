import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "80svh" }}>
      <div className="ph-txt" style={{ gridColumn: "1 / span 7" }}>
        <p className="small dim">Error 404</p>
        <h1 style={{ marginTop: 16 }}>Halaman ini retak sebelum sempat dicetak</h1>
        <p className="lead">Halaman yang Anda cari tidak ditemukan atau sudah dipindahkan.</p>
        <div className="ph-actions">
          <Link href="/" className="btn primary">
            Kembali ke beranda <span className="arrow">→</span>
          </Link>
          <Link href="/artikel/" className="btn">Baca artikel</Link>
        </div>
      </div>
    </section>
  );
}
