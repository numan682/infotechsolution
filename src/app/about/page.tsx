import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, stats } from "@/lib/site";
import { values } from "@/lib/content";
import type { IconName } from "@/lib/services";
import { PageHero } from "@/components/sections/PageHero";
import { CTA } from "@/components/sections/CTA";
import { Counter } from "@/components/ui/Counter";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMeta({
  title: "About Us: A Bangladesh IT Company Built on Craft",
  description:
    "Meet InfoTech Solution, a Dhaka-based team of designers, engineers and strategists building world-class websites, apps and software for clients in Bangladesh and worldwide.",
  path: "/about/",
});

// TODO: update the milestones with your real company history.
const timeline = [
  { year: String(site.foundingYear), title: "Founded in Dhaka", body: "Started as a small web studio with a big belief: Bangladeshi talent can build world-class software." },
  { year: "2020", title: "Going mobile", body: "Launched our mobile practice, shipping Flutter and React Native apps to both app stores." },
  { year: "2022", title: "Going global", body: "Began partnering with clients across the Middle East, Europe and North America." },
  { year: "2024", title: "Cloud & growth", body: "Added cloud, DevOps and performance-marketing teams to support products after launch." },
  { year: "2026", title: "AI-first", body: "Bringing AI assistants and automation into every product we build." },
];

const teams = [
  { n: "Design", body: "Product, UI/UX and brand designers obsessed with detail.", color: "#ec4899" },
  { n: "Engineering", body: "Full-stack, mobile and cloud engineers who ship clean, tested code.", color: "#0071e3" },
  { n: "Growth", body: "SEO, content and paid-media specialists focused on ROI.", color: "#10b981" },
  { n: "Delivery", body: "Project managers and QA who keep everything on time and on budget.", color: "#7c3aed" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "About", path: "/about/" }])} />
      <PageHero
        eyebrow="About us"
        title="Made in Bangladesh. Built for the world."
        highlight={["Built", "for", "the", "world."]}
        lede={`Since ${site.foundingYear}, InfoTech Solution has helped startups, SMEs and enterprises turn ambitious ideas into digital products people love.`}
        crumbs={[{ name: "About", href: "/about/" }]}
        colors={["#10b981", "#0071e3"]}
      />

      <section className="pb-24 md:pb-36">
        <div className="container-x">
          <Reveal y={16}>
            <p className="eyebrow mb-8">Our mission</p>
          </Reveal>
          <ScrollRevealText
            className="max-w-5xl text-[clamp(1.75rem,4.4vw,3.6rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-ink"
            text="To make world-class technology accessible to every business, by pairing Bangladesh’s brilliant engineering talent with global standards of design, quality and care."
          />
        </div>
      </section>

      <section className="bg-night py-24 text-white md:py-32">
        <dl className="container-x grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((s) => (
            <Reveal key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-gradient-cool text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.05em]">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <dd aria-hidden className="mt-3 text-[15px] text-neutral-400">
                {s.label}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow="Our journey" title="A few chapters so far." />
          <ol className="relative mx-auto mt-16 max-w-3xl md:mt-24">
            <span aria-hidden className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-accent via-violet to-pink md:left-1/2" />
            {timeline.map((t, i) => (
              <li key={t.year} className={`relative mb-14 pl-12 last:mb-0 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}>
                <span
                  aria-hidden
                  className={`absolute left-0 top-1 h-6 w-6 rounded-full border-4 border-paper bg-accent shadow-[0_0_0_4px_rgba(0,113,227,0.15)] ${i % 2 ? "md:-left-3" : "md:-right-3 md:left-auto"}`}
                />
                <Reveal>
                  <p className="font-mono text-sm text-accent">{t.year}</p>
                  <h3 className="mt-1 text-[24px] font-semibold tracking-[-0.03em] text-ink">{t.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-muted">{t.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-mist py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow="Our people" title="One team. Four crafts." highlight={["Four", "crafts."]} />
          <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {teams.map((t) => (
              <StaggerItem key={t.n}>
                <div className="card relative h-full overflow-hidden p-7">
                  <span aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-2xl" style={{ background: t.color }} />
                  <h3 className="text-[28px] font-bold tracking-[-0.04em]" style={{ color: t.color }}>
                    {t.n}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{t.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow="What we value" title="Principles we never compromise." />
          <Stagger className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {values.map((v) => (
              <StaggerItem key={v.title} className="flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-white">
                  <Icon name={v.icon as IconName} className="h-6 w-6" />
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

      <CTA title="Let’s build something remarkable." />
    </>
  );
}
