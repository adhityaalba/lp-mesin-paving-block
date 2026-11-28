"use client";

import { useSyncExternalStore } from "react";

const query = "(min-width: 1081px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** Keep scroll-linked movement out of small screens and reduced-motion layouts. */
export function useDesktopMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}
