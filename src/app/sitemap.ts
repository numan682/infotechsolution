import type { MetadataRoute } from "next";
import { locales, localePath } from "@/i18n/config";
import { site } from "@/lib/site";
import { serviceSlugs } from "@/lib/services";
import { solutionSlugs } from "@/lib/solutions";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/services/", priority: 0.9, freq: "monthly" },
    ...solutionSlugs.map((slug) => ({ path: `/services/${slug}/`, priority: 0.95, freq: "monthly" as const })),
    ...serviceSlugs.map((slug) => ({ path: `/services/${slug}/`, priority: 0.85, freq: "monthly" as const })),
    { path: "/work/", priority: 0.8, freq: "monthly" },
    { path: "/about/", priority: 0.7, freq: "monthly" },
    { path: "/process/", priority: 0.6, freq: "monthly" },
    { path: "/contact/", priority: 0.8, freq: "yearly" },
    { path: "/privacy-policy/", priority: 0.2, freq: "yearly" },
  ];

  // One entry per language, each listing both versions as hreflang alternates.
  return pages.flatMap((p) =>
    locales.map((lang) => ({
      url: `${site.url}${localePath(lang, p.path)}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: lang === "en" ? p.priority : Math.round(p.priority * 90) / 100,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${localePath(l, p.path)}`])),
      },
    })),
  );
}
