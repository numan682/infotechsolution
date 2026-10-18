import Link from "next/link";
import { Check } from "lucide-react";
import { localePath, type Lang } from "@/i18n/config";
import { getDict } from "@/content";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CTA } from "@/components/sections/CTA";
import { ProcessStack } from "@/components/home/ProcessStack";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export const processMeta = (lang: Lang) => {
  const t = getDict(lang).pages.process;
  return pageMeta(lang, { title: t.metaTitle, description: t.metaDescription, path: "/process/" });
};

export function ProcessView({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const t = d.pages.process;

  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: t.eyebrow, path: "/process/" }])} />
      <PageHero lang={lang} eyebrow={t.eyebrow} title={t.title} highlight={t.highlight} lede={t.lede} crumbs={[{ name: t.eyebrow, path: "/process/" }]} colors={["#FF5A00", "#FFC24B"]} />

      <ProcessStack lang={lang} t={d.process} />

      <section className="bg-mist py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={t.modelsEyebrow} title={t.modelsTitle} highlight={t.modelsHighlight} lede={t.modelsLede} />
          <Stagger className="mt-16 grid gap-5 lg:grid-cols-3">
            {t.models.map((m, i) => {
              const featured = i === 1;
              return (
                <StaggerItem key={m.title}>
                  <div
                    className={`relative flex h-full flex-col overflow-hidden rounded-[32px] p-8 md:p-10 ${
                      featured ? "bg-sunset noise text-white shadow-[0_40px_80px_-30px_rgba(255,107,0,0.7)] lg:-translate-y-4" : "card"
                    }`}
                  >
                    {featured && (
                      <>
                        <span aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sun/60 blur-[90px]" />
                        <span className="absolute right-6 top-6 rounded-full bg-white/20 px-3 py-1 text-[12px] font-semibold">{t.popular}</span>
                      </>
                    )}
                    <h3 className="relative text-[28px] font-bold tracking-[-0.03em]">{m.title}</h3>
                    <p className={`relative mt-3 text-[16px] leading-relaxed ${featured ? "text-white/90" : "text-muted"}`}>{m.body}</p>
                    <ul className="relative mt-8 space-y-3">
                      {m.points.map((p) => (
                        <li key={p} className="flex items-center gap-3 text-[15px]">
                          <span className={`flex h-5 w-5 items-center justify-center rounded-full ${featured ? "bg-white text-accent" : "bg-accent/10 text-accent"}`}>
                            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <Link href={localePath(lang, "/contact/")} className={`btn relative !mt-10 mt-auto w-full ${featured ? "btn-light" : "btn-primary"}`}>
                      {t.discuss}
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <CTA lang={lang} />
    </>
  );
}
