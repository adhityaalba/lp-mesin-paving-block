import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWA } from "@/components/layout/floating-wa";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { site } from "@/lib/site";
import "./globals.css";

// General Sans (Fontshare, ITF Free Font License) — self-hosted.
const general = localFont({
  src: [
    { path: "../fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-general",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Mesin Paving Block K500 & Batako Hidrolik | CV Multi Baja Technic",
    template: "%s | Multi Baja Technic",
  },
  description: site.description,
  keywords: [
    "mesin paving block",
    "mesin cetak paving",
    "mesin batako",
    "mesin press paving hidrolik",
    "jual mesin paving block",
    "mesin paving block Mojokerto",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Mesin Paving Block — CV Multi Baja Technic",
    images: [{ url: "/brand/yard.webp" }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: site.domain,
  telephone: `+${site.phoneRaw}`,
  email: site.email,
  image: `${site.domain}/brand/logo.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: "Puri, Mojokerto",
    addressRegion: site.address.region,
    addressCountry: "ID",
  },
  areaServed: "ID",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={general.variable}>
      <body>
        <a
          href="#konten"
          className="sr-only z-[90] bg-accent px-4 py-2 font-medium text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Lewati ke konten
        </a>
        <SmoothScroll />
        <Header />
        <main id="konten">{children}</main>
        <Footer />
        <FloatingWA />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
