import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { formatNumber, localePath, type Lang } from "@/i18n/config";
import { fill, getDict, getServices } from "@/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceVisual } from "@/components/sections/ServiceVisual";
import { CTA } from "@/components/sections/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export const servicesMeta = (lang: Lang) => {
  const t = getDict(lang).pages.services;
  return pageMeta(lang, { title: t.metaTitle, description: t.metaDescription, path: "/services/" });
};

export function ServicesView({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const t = d.pages.services;
  const services = getServices(d);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(lang, [{ name: t.eyebrow, path: "/services/" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}${localePath(lang, `/services/${s.slug}/`)}`,
              name: s.title,
            })),
          },
        ]}
      />
      <PageHero lang={lang} eyebrow={t.eyebrow} title={t.title} highlight={t.highlight} lede={t.lede} crumbs={[{ name: t.eyebrow, path: "/services/" }]} />

      <div className="container-x space-y-28 pb-28 md:space-y-40 md:pb-40">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} className="grid items-center gap-10 md:grid-cols-2 md:gap-16" aria-labelledby={`${s.slug}-title`}>
            <Reveal className={i % 2 ? "md:order-2" : ""}>
              <ServiceVisual service={s} />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow">
                {formatNumber(lang, 0)}
                {formatNumber(lang, i + 1)} · {s.title}
              </p>
              <h2 id={`${s.slug}-title`} className="display-md mt-3 text-ink">
                {s.headline}
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-muted">{s.summary}</p>
              <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {s.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink-soft">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={localePath(lang, `/services/${s.slug}/`)} className="btn btn-primary group mt-9">
                {fill(t.explore, { service: s.title })}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </Reveal>
          </section>
        ))}
      </div>

      <CTA lang={lang} />
    </>
  );
}
