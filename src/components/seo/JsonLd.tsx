import { localePath, localeMeta, type Lang } from "@/i18n/config";
import { getDict, getServices } from "@/content";
import { mapsUrl, site } from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for `<` so it can't break out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationLd(lang: Lang) {
  const dict = getDict(lang);
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: "ইনফোটেক সলিউশন",
    url: site.url,
    logo: { "@type": "ImageObject", url: `${site.url}/logo.png`, width: 512, height: 512 },
    image: `${site.url}/opengraph-image`,
    description: dict.meta.description,
    slogan: dict.hero.title,
    hasMap: mapsUrl,
    knowsLanguage: ["en", "bn"],
    knowsAbout: getServices(dict).map((s) => s.title),
    email: site.email,
    telephone: site.phoneHref,
    foundingDate: String(site.foundingYear),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    areaServed: [{ "@type": "Country", name: "Bangladesh" }, "Worldwide"],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "19:00",
    },
    sameAs: Object.values(site.socials),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneHref,
      email: site.email,
      contactType: "sales",
      availableLanguage: ["English", "Bengali"],
    },
  };
}

export function websiteLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}${localePath(lang, "/")}#website`,
    url: `${site.url}${localePath(lang, "/")}`,
    name: site.name,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: localeMeta[lang].htmlLang,
  };
}

export function breadcrumbLd(lang: Lang, items: { name: string; path: string }[]) {
  const dict = getDict(lang);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: dict.nav.home, path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${localePath(lang, it.path)}`,
    })),
  };
}

export function faqLd(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
