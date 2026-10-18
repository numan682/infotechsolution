import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { formatNumber, localePath, type Lang } from "@/i18n/config";
import { fill, getDict, getService, getServices } from "@/content";
import { processColors } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceVisual } from "@/components/sections/ServiceVisual";
import { CTA } from "@/components/sections/CTA";
import { FAQList } from "@/components/sections/FAQ";
import { Icon } from "@/components/ui/Icon";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/seo/JsonLd";

/** Trim to a word boundary so search snippets aren't cut mid-word. */
function clampWords(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:।.]$/, "")}…`;
}

export const serviceDetailMeta = (lang: Lang, slug: string) => {
  const d = getDict(lang);
  const s = getService(d, slug);
  if (!s) return {};
  return pageMeta(lang, {
    title: fill(d.pages.serviceDetail.metaTitle, { service: s.title }),
    description: clampWords(`${s.short} ${s.summary}`, 155),
    path: `/services/${s.slug}/`,
    keywords: s.keywords,
    image: `/og/${s.slug}.png`,
  });
};

export function ServiceDetailView({ lang, slug }: { lang: Lang; slug: string }) {
  const d = getDict(lang);
  const t = d.pages.serviceDetail;
  const s = getService(d, slug);
  if (!s) return null;
  const others = getServices(d)
    .filter((o) => o.slug !== s.slug)
    .slice(0, 3);
  const num = (n: number) => `${formatNumber(lang, 0)}${formatNumber(lang, n)}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(lang, [
            { name: d.pages.services.eyebrow, path: "/services/" },
            { name: s.title, path: `/services/${s.slug}/` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            serviceType: s.title,
            description: s.summary,
            url: `${site.url}${localePath(lang, `/services/${s.slug}/`)}`,
            provider: { "@id": `${site.url}/#organization` },
            areaServed: [{ "@type": "Country", name: "Bangladesh" }, "Worldwide"],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: s.title,
              itemListElement: s.deliverables.map((item) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: item } })),
            },
          },
          faqLd(s.faqs),
        ]}
      />

      <PageHero
        lang={lang}
        eyebrow={s.title}
        title={s.headline}
        lede={s.summary}
        colors={s.gradient}
        crumbs={[
          { name: d.pages.services.eyebrow, path: "/services/" },
          { name: s.title, path: `/services/${s.slug}/` },
        ]}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={localePath(lang, "/contact/")} className="btn btn-primary group !px-7">
            {d.common.getQuote} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <a href="#features" className="btn btn-ghost !px-7">
            {d.common.learnMore}
          </a>
        </div>
      </PageHero>

      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <ServiceVisual gradient={s.gradient} stack={s.stack} icon={<Icon name={s.icon} />} />
          </div>
        </Reveal>
      </div>

      <section id="features" className="py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={t.whyEyebrow} title={fill(t.whyTitle, { service: s.title })} />
          <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.features.map((f, i) => (
              <StaggerItem key={f.title}>
                <SpotlightCard glow="rgba(255,107,0,0.14)" className="card h-full p-7 ring-1 ring-accent/[0.06]">
                  <span className="font-mono text-[13px] font-semibold text-accent-ink">{num(i + 1)}</span>
                  <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.025em] text-ink">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.body}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-3 md:px-5">
        <div className="bg-sunset noise relative overflow-hidden rounded-[32px] py-24 text-white md:rounded-[44px] md:py-32">
          <div aria-hidden className="grid-bg-light absolute inset-0" />
          <div aria-hidden className="absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-sun/50 blur-[120px]" />
          <div className="container-x relative grid gap-14 lg:grid-cols-2">
            <SectionHeading tone="onColor" align="left" eyebrow={t.deliverablesEyebrow} title={t.deliverablesTitle} />
            <Stagger className="grid gap-3 sm:grid-cols-2">
              {s.deliverables.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex h-full items-center gap-3 rounded-2xl bg-white/15 p-5 ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/25">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-accent-ink">
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="text-[15px] font-medium text-white">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div className="relative mt-20" lang="en">
            <p className="mb-6 text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-white/70">{t.toolkit}</p>
            <Marquee>
              {s.stack.map((tech) => (
                <span key={tech} className="mx-3 text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.04em] text-white/90">
                  {tech} <span className="mx-3 text-white/40">✦</span>
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={t.processEyebrow} title={t.processTitle} />
          <Stagger className="mt-16 grid gap-4 md:grid-cols-4">
            {d.process.steps.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="relative h-full rounded-[28px] bg-mist p-7 ring-1 ring-accent/[0.08]">
                  <span className="text-[44px] font-bold leading-none tracking-[-0.05em]" style={{ color: processColors[i] }}>
                    {num(i + 1)}
                  </span>
                  <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.025em] text-ink">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-mist py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading align="left" eyebrow={t.faqEyebrow} title={fill(t.faqTitle, { service: s.title })} />
          </div>
          <Reveal className="lg:col-span-7">
            <FAQList faqs={s.faqs} />
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <h2 className="display-md text-ink">{t.more}</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <StaggerItem key={o.slug}>
                <Link
                  href={localePath(lang, `/services/${o.slug}/`)}
                  className="group card flex h-full items-center gap-4 p-6 ring-1 ring-transparent transition-all duration-500 hover:-translate-y-1 hover:ring-accent/20"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white"
                    style={{ background: `linear-gradient(135deg, ${o.gradient[0]}, ${o.gradient[1]})` }}
                  >
                    <Icon name={o.icon} className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[17px] font-semibold tracking-[-0.02em] text-ink">{o.title}</span>
                    <span className="mt-0.5 line-clamp-1 block text-[14px] text-muted">{o.short}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-accent-ink transition-transform duration-500 group-hover:rotate-45" aria-hidden />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTA lang={lang} title={fill(d.cta.serviceTitle, { service: s.title })} />
    </>
  );
}
