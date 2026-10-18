import type { Metadata } from "next";
import { localeMeta, localePath, type Lang } from "@/i18n/config";
import { getDict } from "@/content";
import { site } from "./site";

/**
 * Per-page metadata with canonical + hreflang alternates for both languages.
 * `path` is the English path (e.g. "/about/"); the Bangla URL is derived from it.
 */
export function pageMeta(
  lang: Lang,
  {
    title,
    description,
    path,
    keywords,
    absoluteTitle = false,
  }: { title: string; description: string; path: string; keywords?: string[]; absoluteTitle?: boolean },
): Metadata {
  const dict = getDict(lang);
  const url = localePath(lang, path);
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: dict.meta.ogAlt, type: "image/png" };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords ?? dict.meta.keywords,
    alternates: {
      canonical: url,
      languages: { en: localePath("en", path), bn: localePath("bn", path), "x-default": localePath("en", path) },
    },
    openGraph: {
      type: "website",
      locale: localeMeta[lang].ogLocale,
      alternateLocale: localeMeta[lang === "en" ? "bn" : "en"].ogLocale,
      siteName: site.name,
      url,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage.url] },
  };
}

/** Root-layout metadata shared by every page in a language. */
export function rootMeta(lang: Lang): Metadata {
  const dict = getDict(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.siteTitle, template: `%s | ${site.name}` },
    description: dict.meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    category: "technology",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    formatDetection: { telephone: false, email: false, address: false },
    verification: {
      ...(site.verification.google ? { google: site.verification.google } : {}),
      ...(site.verification.bing ? { other: { "msvalidate.01": site.verification.bing } } : {}),
    },
  };
}
