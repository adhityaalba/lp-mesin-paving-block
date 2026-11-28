import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { database } from "@/lib/db";
import { machineForDisplay, type Machine } from "@/lib/content-schema";

export type { Machine, Spec } from "@/lib/content-schema";

export async function getMachines(): Promise<Machine[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");
  const rows = await database()`SELECT * FROM public.products ORDER BY position, slug`;
  return rows.map((row) => machineForDisplay({ ...row, video: row.video ?? undefined }));
}

export async function getMachine(slug: string) {
  return (await getMachines()).find((machine) => machine.slug === slug);
}

export const compareRows: { label: string; get: (m: Machine) => string }[] = [
  { label: "Kuat tekan", get: (m) => (m.highlight.strength === "SNI" ? "Standar SNI" : `Hingga ${m.highlight.strength}`) },
  { label: "Paving / cetak", get: (m) => m.highlight.output },
  { label: "Siklus", get: (m) => m.highlight.cycle },
  { label: "Ukuran palet", get: (m) => m.general[0].value },
  { label: "Vibro bawah", get: (m) => m.main[1].value },
  { label: "Motor pompa", get: (m) => m.main[2].value },
  { label: "Mixer", get: (m) => m.support[1].value },
  { label: "Listrik", get: (m) => m.support[2].value },
  { label: "Cocok untuk", get: (m) => m.idealFor },
];
