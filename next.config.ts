import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Old WordPress URLs all end with "/" — keep them identical for SEO.
  trailingSlash: true,
  images: {
    // Local dev runs from an exFAT drive where macOS writes "._*" AppleDouble files into
    // .next/cache/images and the optimizer serves them as images. Sources are already WebP,
    // so skip optimisation in dev; Vercel production keeps AVIF/WebP resizing.
    unoptimized: process.env.NODE_ENV === "development",
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80, 90],
  },
  async redirects() {
    return [
      { source: "/the-legend-innovated-rh1e15/", destination: "/mesin/rh1e15/", permanent: true },
      { source: "/the-great-innovated-rh1s12/", destination: "/mesin/rh1s12/", permanent: true },
      { source: "/the-best-innovated-hr6e12/", destination: "/mesin/hr6e12/", permanent: true },
      { source: "/sample-page/", destination: "/mesin/rh1e15/", permanent: true },
      { source: "/tentangkami/", destination: "/tentang/", permanent: true },
      { source: "/kenapakami/", destination: "/tentang/", permanent: true },
      { source: "/hubungikami/", destination: "/kontak/", permanent: true },
      { source: "/metaads/", destination: "/", permanent: true },
      { source: "/category/:path*", destination: "/artikel/", permanent: true },
      { source: "/tag/:path*", destination: "/artikel/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: false },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
