"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { machines } from "@/lib/machines";
import { site, waLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="foot shell">
      <div className="inner">
        <div className="foot-grid">
          <div>
            <Link href="/" className="brand" style={{ paddingLeft: 0 }}>
              <Image src="/brand/logo.webp" alt="" width={30} height={30} />
              Multi Baja Technic
            </Link>
            <p className="muted" style={{ marginTop: 14, maxWidth: "34ch", fontSize: 15 }}>
              Produsen mesin cetak paving block dan batako hidrolik. Dirakit di Mojokerto, dipasang di seluruh Indonesia.
            </p>
          </div>
          <div>
            <h4>Mesin</h4>
            <ul>
              {machines.map((m) => (
                <li key={m.slug}>
                  <Link href={`/mesin/${m.slug}/`}>{m.code} · {m.nickname.replace(" Innovated", "")}</Link>
                </li>
              ))}
              <li><Link href="/mesin/">Bandingkan semua</Link></li>
            </ul>
          </div>
          <div>
            <h4>Perusahaan</h4>
            <ul>
              <li><Link href="/tentang/">Tentang kami</Link></li>
              <li><Link href="/promo/">Promo</Link></li>
              <li><Link href="/artikel/">Artikel</Link></li>
              <li><Link href="/kontak/">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h4>Workshop</h4>
            <ul>
              <li className="muted" style={{ fontSize: 14 }}>
                {site.address.street}, {site.address.village}, {site.address.city}
              </li>
              <li><a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp {site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} style={{ wordBreak: "break-all" }}>{site.email}</a></li>
            </ul>
          </div>
        </div>
        <motion.div
          className="foot-word"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg viewBox="0 0 1000 200" role="img" aria-label="Multi Baja">
            <text x="-6" y="180" fontSize="248" textLength="1008" lengthAdjust="spacingAndGlyphs">Multi Baja</text>
          </svg>
        </motion.div>
        <div className="foot-legal">
          <span>© {site.copyrightYear} CV Multi Baja Technic · mesinpavingblock.id</span>
          <span>Garansi 1 tahun · DP 30% · MOU bermaterai</span>
        </div>
      </div>
    </footer>
  );
}
