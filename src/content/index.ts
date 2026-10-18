import type { Lang } from "@/i18n/config";
import { serviceMeta } from "@/lib/services";
import { projectMeta } from "@/lib/content";
import { solutionMeta } from "@/lib/solutions";
import en, { type Dict } from "./en";
import bn from "./bn";

export type { Dict };

const dicts: Record<Lang, Dict> = { en, bn };
export const getDict = (lang: Lang) => dicts[lang];

/** Replace {tokens} in a string. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? `{${k}}`));
}

export function getServices(dict: Dict) {
  return serviceMeta.map((m) => ({ ...m, gradient: [...m.gradient] as [string, string], stack: [...m.stack], ...dict.services[m.slug] }));
}
export type Service = ReturnType<typeof getServices>[number];

export function getService(dict: Dict, slug: string) {
  return getServices(dict).find((s) => s.slug === slug);
}

export function getProjects(dict: Dict) {
  return projectMeta.map((m) => ({ ...m, url: m.url as string | undefined, gradient: [...m.gradient] as [string, string], ...dict.projects[m.id] }));
}
export type Project = ReturnType<typeof getProjects>[number];

export function getSolutions(dict: Dict) {
  return solutionMeta.map((m) => ({ ...m, gradient: [...m.gradient] as [string, string], ...dict.solutions[m.slug] }));
}
export type Solution = ReturnType<typeof getSolutions>[number];

export function getSolution(dict: Dict, slug: string) {
  return getSolutions(dict).find((s) => s.slug === slug);
}
