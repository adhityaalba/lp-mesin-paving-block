"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { machines } from "@/lib/machines";
import { site, waLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="foot">
      <div className="foot-cols">
        <div className="foot-col">
          <h4>Multi Baja Technic</h4>
          <p className="muted" style={{ maxWidth: "30ch" }}>
            Produsen mesin cetak paving block dan batako hidrolik. Dirakit di Mojokerto, dipasang di seluruh Indonesia.
          </p>
        </div>
        <div className="foot-col">
          <h4>Mesin</h4>
          <ul>
            {machines.map((m) => (
              <li key={m.slug}>
                <Link href={`/mesin/${m.slug}/`}>
                  {m.code} · {m.nickname.replace(" Innovated", "")}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/mesin/">Bandingkan semua tipe</Link>
            </li>
          </ul>
        </div>
        <div className="foot-col">
          <h4>Perusahaan</h4>
          <ul>
            <li><Link href="/tentang/">Tentang kami</Link></li>
            <li><Link href="/promo/">Promo</Link></li>
            <li><Link href="/artikel/">Artikel & panduan</Link></li>
            <li><Link href="/kontak/">Kontak</Link></li>
          </ul>
        </div>
        <div className="foot-col">
          <h4>Workshop</h4>
          <ul>
            <li>
              <span>
                {site.address.street}, {site.address.village}, {site.address.city}, {site.address.region}
              </span>
            </li>
            <li style={{ marginTop: 14 }}>
              <a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp {site.phone}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} style={{ wordBreak: "break-all" }}>{site.email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div />
      <div>
        <motion.div
          className="foot-word"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg viewBox="0 0 1000 214" role="img" aria-label="Multi Baja">
            <text x="-6" y="190" fontSize="262" textLength="1006" lengthAdjust="spacingAndGlyphs">
              Multi Baja
            </text>
          </svg>
        </motion.div>
        <div className="foot-legal">
          <span>© {site.copyrightYear} CV Multi Baja Technic. mesinpavingblock.id</span>
          <span>Garansi 1 tahun · DP 30% · Kerja sama diikat MOU bermaterai.</span>
        </div>
      </div>
    </footer>
  );
}
