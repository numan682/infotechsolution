import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Phone } from "lucide-react";
import { formatNumber, localePath, type Lang } from "@/i18n/config";
import { fill, getDict, getSolution, getSolutions } from "@/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { CTA } from "@/components/sections/CTA";
import { FAQList } from "@/components/sections/FAQ";
import { AudienceTabs } from "@/components/solutions/AudienceTabs";
import { SolutionVisual } from "@/components/solutions/SolutionVisual";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SplitText } from "@/components/ui/SplitText";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/seo/JsonLd";

function clampWords(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:।.]$/, "")}…`;
}

export const solutionMeta = (lang: Lang, slug: string) => {
  const d = getDict(lang);
  const s = getSolution(d, slug);
  if (!s) return {};
  return pageMeta(lang, {
    title: fill(d.solutionPage.metaTitle, { solution: s.title }),
    description: clampWords(`${s.short} ${s.summary}`, 155),
    path: `/services/${s.slug}/`,
    keywords: s.keywords,
    image: `/og/${s.slug}.png`,
  });
};

export function SolutionView({ lang, slug }: { lang: Lang; slug: string }) {
  const d = getDict(lang);
  const t = d.solutionPage;
  const s = getSolution(d, slug);
  if (!s) return null;
  const href = (p: string) => localePath(lang, p);
  const demoHref = `${href("/contact/")}?service=${encodeURIComponent(s.title)}`;
  const num = (n: number) => `${formatNumber(lang, 0)}${formatNumber(lang, n)}`;
  const others = getSolutions(d).filter((o) => o.slug !== s.slug);
  const url = `${site.url}${href(`/services/${s.slug}/`)}`;

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
            "@id": `${url}#service`,
            name: s.title,
            serviceType: s.title,
            description: s.summary,
            url,
            image: `${site.url}/og/${s.slug}.png`,
            provider: { "@id": `${site.url}/#organization` },
            areaServed: { "@type": "Country", name: "Bangladesh" },
            audience: s.audiences.map((a) => ({ "@type": "Audience", audienceType: a.name })),
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: s.title,
              itemListElement: s.features.map((f) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: f.title, description: f.body } })),
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: s.stepsTitle,
            step: s.steps.map((st, i) => ({ "@type": "HowToStep", position: i + 1, name: st.title, text: st.body })),
          },
          faqLd(s.faqs),
        ]}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div aria-hidden className="absolute -top-40 left-[10%] h-[30rem] w-[30rem] animate-pulse-soft rounded-full opacity-30 blur-[120px]" style={{ background: s.gradient[0] }} />
        <div aria-hidden className="absolute right-[5%] top-10 h-[26rem] w-[26rem] animate-pulse-soft rounded-full opacity-30 blur-[120px] [animation-delay:1.5s]" style={{ background: s.gradient[1] }} />

        <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div>
            <nav aria-label={d.common.breadcrumb} className="enter mb-7" style={{ "--enter-y": "10px", "--enter-blur": "0px" } as CSSProperties}>
              <ol className="flex flex-wrap items-center gap-1 text-[13px] text-muted">
                <li>
                  <Link href={href("/")} className="hover:text-accent-ink">
                    {d.nav.home}
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                  <Link href={href("/services/")} className="hover:text-accent-ink">
                    {d.pages.services.eyebrow}
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                  <span aria-current="page" className="font-medium text-ink">
                    {s.title}
                  </span>
                </li>
              </ol>
            </nav>

            <p className="enter inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-[13px] font-semibold text-ink shadow-sm ring-1 ring-accent/15" style={{ "--enter-y": "12px" } as CSSProperties}>
              <span className="flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ background: `linear-gradient(135deg, ${s.gradient[0]}, ${s.gradient[1]})` }}>
                <Icon name={s.icon} className="h-4 w-4" />
              </span>
              {t.eyebrow} · {s.title}
            </p>

            <SplitText as="h1" animateOnMount delay={0.05} text={s.headline} highlight={s.highlight} className="display-lg mt-6 text-ink" />

            <p className="lede enter mt-6 max-w-xl" style={{ "--d": "0.3s" } as CSSProperties}>
              {s.summary}
            </p>

            <div className="enter mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "0.4s", "--enter-blur": "0px" } as CSSProperties}>
              <Link href={demoHref} className="btn btn-primary group !px-7 !text-base">
                {t.demo} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <a href={`tel:${site.phoneHref}`} className="btn btn-ghost !px-7 !text-base">
                <Phone className="h-4 w-4" aria-hidden /> {t.call}
              </a>
            </div>

            <ul className="enter mt-8 flex flex-wrap gap-x-6 gap-y-2.5" style={{ "--d": "0.5s", "--enter-blur": "0px" } as CSSProperties}>
              {s.badges.map((b) => (
                <li key={b} className="flex items-center gap-2 text-[14px] font-medium text-ink-soft">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700">
                    <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="enter" style={{ "--d": "0.25s", "--enter-y": "60px", "--enter-blur": "0px", animationDuration: "1.2s" } as CSSProperties}>
            <SolutionVisual kind={s.kind} labels={s.visual} />
          </div>
        </div>
      </section>

      {/* ---------- At a glance ---------- */}
      <section aria-label={t.glance} className="container-x relative z-10 -mt-4 pb-6">
        <Reveal>
          <dl className="grid grid-cols-2 overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_-30px_rgba(120,50,0,0.4)] ring-1 ring-accent/10 lg:grid-cols-4">
            {s.facts.map((f, i) => (
              <div key={f.label} className={`p-6 md:p-8 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="text-gradient text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold leading-none tracking-[-0.03em]">{f.value}</dd>
                <dd className="mt-2.5 text-[14px] leading-snug text-muted">{f.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ---------- Challenge ---------- */}
      <section className="cv-auto py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={t.challenge} title={s.challengeTitle} />
          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.challenges.map((c, i) => (
              <StaggerItem key={c.title}>
                <div className="relative h-full overflow-hidden rounded-[26px] bg-mist p-7 ring-1 ring-accent/[0.08]">
                  <span aria-hidden className="absolute -right-2 -top-4 select-none text-[88px] font-bold leading-none text-accent/[0.07]">
                    {num(i + 1)}
                  </span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-accent-ink shadow-sm ring-1 ring-accent/10">
                    <Icon name={c.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="relative mt-6 text-[19px] font-semibold tracking-[-0.02em] text-ink">{c.title}</h3>
                  <p className="relative mt-2 text-[15px] leading-relaxed text-muted">{c.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="cv-auto bg-cream py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={t.how} title={s.stepsTitle} />
          <Stagger className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5" stagger={0.12}>
            <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-[2px] bg-gradient-to-r from-amber via-accent to-coral lg:block" />
            {s.steps.map((st, i) => (
              <StaggerItem key={st.title} className="relative">
                <div className="flex flex-col items-start lg:items-center lg:text-center">
                  <span className="bg-sunset relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-[18px] font-bold text-white shadow-[0_12px_30px_-10px_rgba(255,107,0,0.9)] ring-8 ring-cream">
                    {num(i + 1)}
                  </span>
                  <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.02em] text-ink">{st.title}</h3>
                  <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-muted">{st.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Capabilities ---------- */}
      <section className="cv-auto py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={t.features} title={s.featuresTitle} />
          <Stagger className={`mt-16 grid gap-4 sm:grid-cols-2 ${s.features.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {s.features.map((f) => (
              <StaggerItem key={f.title}>
                <SpotlightCard glow="rgba(255,107,0,0.14)" className="card h-full p-7 ring-1 ring-accent/[0.06]">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_10px_24px_-10px_rgba(255,107,0,0.9)] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${s.gradient[0]}, ${s.gradient[1]})` }}
                  >
                    <Icon name={f.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.02em] text-ink">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.body}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- Who benefits ---------- */}
      <section className="px-3 md:px-5">
        <div className="bg-sunset noise relative overflow-hidden rounded-[32px] py-20 md:rounded-[44px] md:py-28">
          <div aria-hidden className="grid-bg-light absolute inset-0" />
          <div aria-hidden className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-sun/40 blur-[120px]" />
          <div className="container-x relative">
            <SectionHeading tone="onColor" align="left" eyebrow={t.benefits} title={s.benefitsTitle} />
            <div className="mt-10">
              <AudienceTabs audiences={s.audiences.map((a) => ({ name: a.name, items: a.items, icon: <Icon name={a.icon} className="h-4.5 w-4.5" /> }))} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Use cases ---------- */}
      <section className="cv-auto py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={t.useCases} title={s.useCasesTitle} />
          <Stagger className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-3">
            {s.useCases.map((u) => (
              <StaggerItem key={u.label}>
                <span className="flex items-center gap-2.5 rounded-full bg-white py-2.5 pl-2.5 pr-5 text-[15px] font-medium text-ink shadow-[0_8px_24px_-14px_rgba(120,50,0,0.4)] ring-1 ring-accent/10">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent-ink">
                    <Icon name={u.icon} className="h-4 w-4" />
                  </span>
                  {u.label}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="cv-auto bg-mist py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading align="left" eyebrow={t.faq} title={t.faqTitle} />
          </div>
          <Reveal className="lg:col-span-7">
            <FAQList faqs={s.faqs} />
          </Reveal>
        </div>
      </section>

      {/* ---------- More solutions ---------- */}
      <section className="cv-auto py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <h2 className="display-md text-ink">{t.related}</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2">
            {others.map((o) => (
              <StaggerItem key={o.slug}>
                <Link
                  href={href(`/services/${o.slug}/`)}
                  className="group card flex h-full items-center gap-5 p-6 ring-1 ring-transparent transition-all duration-500 hover:-translate-y-1 hover:ring-accent/20 md:p-7"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${o.gradient[0]}, ${o.gradient[1]})` }}>
                    <Icon name={o.icon} className="h-7 w-7" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[19px] font-semibold tracking-[-0.02em] text-ink">{o.title}</span>
                    <span className="mt-1 line-clamp-2 block text-[14px] text-muted">{o.short}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-accent-ink transition-transform duration-500 group-hover:rotate-45" aria-hidden />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTA lang={lang} title={s.ctaTitle} lede={s.ctaLede} primary={t.demo} primaryHref={demoHref} />
    </>
  );
}
