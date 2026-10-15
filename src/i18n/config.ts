export const locales = ["en", "bn"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "en";

export const localeMeta: Record<Lang, { label: string; short: string; htmlLang: string; ogLocale: string; numberLocale: string }> = {
  en: { label: "English", short: "EN", htmlLang: "en", ogLocale: "en_US", numberLocale: "en-US" },
  bn: { label: "বাংলা", short: "বাং", htmlLang: "bn", ogLocale: "bn_BD", numberLocale: "bn-BD" },
};

/** English lives at the root, Bangla under /bn. `path` must start with "/". */
export function localePath(lang: Lang, path: string) {
  return lang === "en" ? path : `/bn${path === "/" ? "/" : path}`;
}

/** Strip the locale prefix from a pathname, returning the English-equivalent path. */
export function basePath(pathname: string) {
  if (pathname === "/bn" || pathname === "/bn/") return "/";
  return pathname.startsWith("/bn/") ? pathname.slice(3) : pathname;
}

export function langFromPath(pathname: string): Lang {
  return pathname === "/bn" || pathname.startsWith("/bn/") ? "bn" : "en";
}

export function formatNumber(lang: Lang, n: number) {
  return new Intl.NumberFormat(localeMeta[lang].numberLocale, { useGrouping: false }).format(n);
}
