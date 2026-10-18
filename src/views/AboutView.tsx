import { fill, getDict } from "@/content";
import type { Lang } from "@/i18n/config";
import { valueIcons } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site, statValues } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { CTA } from "@/components/sections/CTA";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { formatNumber } from "@/i18n/config";

export const aboutMeta = (lang: Lang) => {
  const t = getDict(lang).pages.about;
  return pageMeta(lang, { title: t.metaTitle, description: t.metaDescription, path: "/about/" });
};

const teamColors = ["#FF7A00", "#FF4D17", "#FFA62B", "#D63F00"];

export function AboutView({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const t = d.pages.about;

  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: t.eyebrow, path: "/about/" }])} />
      <PageHero
        lang={lang}
        eyebrow={t.eyebrow}
        title={t.title}
        highlight={t.highlight}
        lede={fill(t.lede, { year: formatNumber(lang, site.foundingYear) })}
        crumbs={[{ name: t.eyebrow, path: "/about/" }]}
        colors={["#FFA62B", "#FF4D17"]}
      />

      <section className="pb-24 md:pb-36">
        <div className="container-x">
          <Reveal y={16}>
            <p className="eyebrow mb-8">{t.missionEyebrow}</p>
          </Reveal>
          <ScrollRevealText
            className="max-w-5xl text-[clamp(1.75rem,4.4vw,3.6rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-ink"
            text={t.mission}
          />
        </div>
      </section>

      <section className="px-3 md:px-5">
        <div className="bg-sunset noise relative overflow-hidden rounded-[32px] py-20 text-white md:rounded-[44px] md:py-28">
          <div aria-hidden className="grid-bg-light absolute inset-0" />
          <dl className="container-x relative grid grid-cols-2 gap-10 md:grid-cols-4">
            {statValues.map((s, i) => (
              <Reveal key={i}>
                <dt className="sr-only">{d.stats[i]}</dt>
                <dd className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.05em]">
                  <Counter value={s.value} suffix={s.suffix} lang={lang} />
                </dd>
                <dd aria-hidden className="mt-3 text-[15px] text-white/85">
                  {d.stats[i]}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={t.journeyEyebrow} title={t.journeyTitle} />
          <ol className="relative mx-auto mt-16 max-w-3xl md:mt-24">
            <span aria-hidden className="absolute bottom-2 left-[11px] top-2 w-[2px] rounded-full bg-gradient-to-b from-amber via-accent to-coral md:left-1/2 md:-translate-x-1/2" />
            {t.timeline.map((item, i) => (
              <li key={item.year} className={`relative mb-14 pl-12 last:mb-0 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}>
                <span
                  aria-hidden
                  className={`absolute left-0 top-1 h-6 w-6 rounded-full border-4 border-white bg-accent shadow-[0_0_0_5px_rgba(255,107,0,0.18)] ${i % 2 ? "md:-left-3" : "md:-right-3 md:left-auto"}`}
                />
                <Reveal>
                  <p className="font-mono text-sm font-semibold text-accent-ink">{item.year}</p>
                  <h3 className="mt-1 text-[24px] font-semibold tracking-[-0.03em] text-ink">{item.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-muted">{item.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-mist py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={t.peopleEyebrow} title={t.peopleTitle} highlight={t.peopleHighlight} />
          <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.teams.map((team, i) => (
              <StaggerItem key={team.name}>
                <div className="card relative h-full overflow-hidden p-7">
                  <span aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-2xl" style={{ background: teamColors[i] }} />
                  <h3 className="text-[28px] font-bold tracking-[-0.03em]" style={{ color: teamColors[i] }}>
                    {team.name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{team.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={t.valuesEyebrow} title={t.valuesTitle} />
          <Stagger className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {d.why.values.map((v, i) => (
              <StaggerItem key={v.title} className="flex gap-5">
                <span className="bg-sunset flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-[0_10px_24px_-10px_rgba(255,107,0,0.9)]">
                  <Icon name={valueIcons[i]} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-[20px] font-semibold tracking-[-0.025em] text-ink">{v.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-muted">{v.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTA lang={lang} title={d.cta.aboutTitle} />
    </>
  );
}
