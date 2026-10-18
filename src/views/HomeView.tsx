import Link from "next/link";
import { localePath, type Lang } from "@/i18n/config";
import { getDict, getProjects } from "@/content";
import { pageMeta } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { TechMarquee } from "@/components/home/TechMarquee";
import { Statement } from "@/components/home/Statement";
import { ServicesBento } from "@/components/home/ServicesBento";
import { ProcessStack } from "@/components/home/ProcessStack";
import { ExpandReveal } from "@/components/home/ExpandReveal";
import { HorizontalWork } from "@/components/home/HorizontalWork";
import { WhyUs } from "@/components/home/WhyUs";
import { CTA } from "@/components/sections/CTA";
import { FAQList } from "@/components/sections/FAQ";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, faqLd } from "@/components/seo/JsonLd";

export const homeMeta = (lang: Lang) => {
  const d = getDict(lang);
  return pageMeta(lang, { title: d.meta.siteTitle, description: d.meta.description, path: "/", absoluteTitle: true });
};

export function HomeView({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const href = (p: string) => localePath(lang, p);

  return (
    <>
      <JsonLd data={faqLd(d.faq.items)} />
      <Hero t={d.hero} links={{ services: href("/services/ai-automation/"), contact: href("/contact/"), work: href("/work/") }} />
      <TechMarquee title={d.marquee} />
      <Statement t={d.statement} />
      <ServicesBento lang={lang} />
      <ExpandReveal lang={lang} t={d.impact} labels={d.stats} />
      <ProcessStack lang={lang} t={d.process} />
      <HorizontalWork
        t={d.work}
        projects={getProjects(d)}
        labels={{ allProjects: d.common.allProjects, newTab: d.common.newTab }}
        links={{ work: href("/work/"), contact: href("/contact/") }}
      />
      <WhyUs t={d.why} />

      <section className="bg-mist py-24 md:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading align="left" eyebrow={d.faq.eyebrow} title={d.faq.title} highlight={d.faq.highlight} lede={d.faq.lede} />
            <Reveal delay={0.2}>
              <Link href={href("/contact/")} className="link-arrow mt-6">
                {d.faq.cta}
              </Link>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7">
            <FAQList faqs={d.faq.items} />
          </Reveal>
        </div>
      </section>

      <CTA lang={lang} />
    </>
  );
}
