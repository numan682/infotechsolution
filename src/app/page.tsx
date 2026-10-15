import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { homeFaqs } from "@/lib/content";
import { site } from "@/lib/site";
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

export const metadata: Metadata = pageMeta({
  title: `${site.name} | IT Company & Digital Agency in Bangladesh`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd(homeFaqs)} />
      <Hero />
      <TechMarquee />
      <Statement />
      <ServicesBento />
      <ExpandReveal />
      <ProcessStack />
      <HorizontalWork />
      <WhyUs />

      <section className="bg-mist py-24 md:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Questions? Answered."
              highlight={["Answered."]}
              lede="Everything you need to know before we start building together."
            />
            <Reveal delay={0.2}>
              <Link href="/contact/" className="link-arrow mt-6">
                Still curious? Talk to us →
              </Link>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7">
            <FAQList faqs={homeFaqs} />
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
