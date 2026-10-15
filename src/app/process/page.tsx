import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Check } from "lucide-react";
import { engagementModels } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { CTA } from "@/components/sections/CTA";
import { ProcessStack } from "@/components/home/ProcessStack";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMeta({
  title: "Our Process & Engagement Models",
  description:
    "How InfoTech Solution delivers software projects on time and on budget: discovery, design, agile development and launch, with fixed-price, dedicated team and retainer options.",
  path: "/process/",
});

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Process", path: "/process/" }])} />
      <PageHero
        eyebrow="Process"
        title="Clarity at every step."
        highlight={["Clarity"]}
        lede="A proven delivery process, transparent communication and flexible ways to work together, so you always know what you’re getting."
        crumbs={[{ name: "Process", href: "/process/" }]}
        colors={["#7c3aed", "#ec4899"]}
      />

      <ProcessStack />

      <section className="bg-mist py-24 md:py-36">
        <div className="container-x">
          <SectionHeading
            eyebrow="Engagement models"
            title="Work with us your way."
            highlight={["your", "way."]}
            lede="Whether you need a single project delivered or a long-term product team, there’s a model that fits."
          />
          <Stagger className="mt-16 grid gap-5 lg:grid-cols-3">
            {engagementModels.map((m) => {
              const featured = "featured" in m && m.featured;
              return (
                <StaggerItem key={m.title}>
                  <div
                    className={`relative flex h-full flex-col overflow-hidden rounded-[32px] p-8 md:p-10 ${
                      featured ? "bg-night text-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]" : "card"
                    }`}
                  >
                    {featured && (
                      <>
                        <span aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet/50 blur-[90px]" />
                        <span className="absolute right-6 top-6 rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium">Most popular</span>
                      </>
                    )}
                    <h3 className="relative text-[28px] font-bold tracking-[-0.04em]">{m.title}</h3>
                    <p className={`relative mt-3 text-[16px] leading-relaxed ${featured ? "text-neutral-300" : "text-muted"}`}>{m.body}</p>
                    <ul className="relative mt-8 space-y-3">
                      {m.points.map((p) => (
                        <li key={p} className="flex items-center gap-3 text-[15px]">
                          <Check className={`h-4 w-4 ${featured ? "text-sky-400" : "text-accent"}`} aria-hidden />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact/" className={`btn relative mt-auto w-full !mt-10 ${featured ? "btn-light" : "btn-dark"}`}>
                      Discuss this model
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <CTA />
    </>
  );
}
