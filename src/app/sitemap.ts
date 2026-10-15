import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/services/", priority: 0.9, freq: "monthly" },
    { path: "/work/", priority: 0.8, freq: "monthly" },
    { path: "/about/", priority: 0.7, freq: "monthly" },
    { path: "/process/", priority: 0.6, freq: "monthly" },
    { path: "/contact/", priority: 0.8, freq: "yearly" },
    { path: "/privacy-policy/", priority: 0.2, freq: "yearly" },
  ];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p.path}`, lastModified: now, changeFrequency: p.freq, priority: p.priority })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
