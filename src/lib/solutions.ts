// Flagship solutions (language-independent data). Text lives in src/content/{en,bn}.ts
// under `solutions`, keyed by slug. They share the /services/<slug>/ URL space.
import type { IconName } from "./services";

export const solutionMeta = [
  { slug: "gps-tracking", icon: "satellite", gradient: ["#FF6B00", "#FFB443"], kind: "fleet" },
  { slug: "smart-tag", icon: "qr", gradient: ["#F43F1A", "#FF9A3D"], kind: "plate" },
  { slug: "employee-tracking", icon: "user-check", gradient: ["#E85D00", "#FFC24B"], kind: "field" },
] as const satisfies readonly { slug: string; icon: IconName; gradient: readonly [string, string]; kind: string }[];

export type SolutionSlug = (typeof solutionMeta)[number]["slug"];
export type SolutionVisual = (typeof solutionMeta)[number]["kind"];
export const solutionSlugs = solutionMeta.map((s) => s.slug);
export const isSolution = (slug: string): slug is SolutionSlug => (solutionSlugs as readonly string[]).includes(slug);
