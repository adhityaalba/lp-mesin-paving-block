/** Fallback shown in the instant App Shell while a prerendered dynamic page streams in. */
export function PageSkeleton() {
  return (
    <div className="page-hero" aria-busy="true" aria-label="Memuat halaman">
      <div className="ph-img" />
      <div className="ph-txt">
        <div style={{ height: 14, width: 160, background: "var(--surface-2)" }} />
        <div style={{ height: 56, width: "90%", background: "var(--surface-2)", marginTop: 28 }} />
        <div style={{ height: 56, width: "60%", background: "var(--surface-2)", marginTop: 10 }} />
      </div>
    </div>
  );
}
