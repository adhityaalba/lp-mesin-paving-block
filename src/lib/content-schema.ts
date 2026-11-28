import { z } from "zod";

// File names are relative to public/, never a remote URL or an embedded image.
export const publicFileSchema = z.string().min(1).refine(
  (value) => !value.startsWith("/") && !/[\\:?#%\s]/.test(value) &&
    value.split("/").every((part) => part !== ".." && part !== "." && part !== ""),
  "Expected a file name relative to public/",
);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const text = z.string();
const spec = z.object({ label: text, value: text });
export const storedPostSchema = z.object({
  slug, title: text.min(1), date: z.iso.datetime({ local: true, offset: true }),
  modified: z.iso.datetime({ local: true, offset: true }), excerpt: text,
  cover: publicFileSchema.nullable(), coverAlt: text,
  categories: z.array(text), tags: z.array(text),
  readingMinutes: z.number().int().positive(), html: text,
});
export const storedMachineSchema = z.object({
  slug, code: text.min(1), nickname: text.min(1), tagline: text, summary: text,
  description: z.array(text), image: publicFileSchema, imageAlt: text,
  studio: publicFileSchema, studioBg: z.string().regex(/^#[\da-fA-F]{6}$/),
  gallery: z.array(z.object({ src: publicFileSchema, alt: text })),
  video: text.optional(),
  highlight: z.object({ strength: text, output: text, cycle: text, power: text }),
  calc: z.object({ pcsPerCycle: z.number().positive(), cycleSeconds: z.number().positive() }),
  general: z.array(spec).min(1), main: z.array(spec).min(3), support: z.array(spec).min(3),
  productivity: z.array(spec), idealFor: text, oldPath: text,
});

export type Post = z.infer<typeof storedPostSchema>;
export type Machine = z.infer<typeof storedMachineSchema>;
export type Spec = z.infer<typeof spec>;
export type MachineLink = Pick<Machine, "slug" | "code" | "nickname">;

export function publicFileUrl(file: string): string {
  return `/${publicFileSchema.parse(file)}`;
}

export function machineForDisplay(input: unknown): Machine {
  const machine = storedMachineSchema.parse(input);
  return {
    ...machine, image: publicFileUrl(machine.image), studio: publicFileUrl(machine.studio),
    gallery: machine.gallery.map((image) => ({ ...image, src: publicFileUrl(image.src) })),
  };
}
