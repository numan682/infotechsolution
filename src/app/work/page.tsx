import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { CTA } from "@/components/sections/CTA";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMeta({
  title: "Our Work: GPS Tracking, Apps, Websites & Software",
  description:
    "Projects by InfoTech Solution: the MobiTrack24 GPS tracking app and server, the Sun City Engineering website, inventory software, a language learning app and more, built in Bangladesh.",
  path: "/work/",
});

const cardShell = "h-full rounded-[32px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_32px_-12px_rgba(0,0,0,0.1)]";

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Work", path: "/work/" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${site.name} portfolio`,
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "CreativeWork",
                name: p.title,
                description: p.blurb,
                ...(p.url ? { url: p.url } : {}),
                creator: { "@id": `${site.url}/#organization` },
              },
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Our work"
        title="Products people love to use."
        highlight={["love"]}
        lede="GPS tracking platforms, mobile apps, business software and websites, designed, engineered and launched by our team in Dhaka."
        crumbs={[{ name: "Work", href: "/work/" }]}
        colors={["#ec4899", "#7c3aed"]}
      />

      <section className="pb-28 md:pb-40">
        <Stagger className="container-x grid gap-5 md:grid-cols-2" stagger={0.1}>
          {projects.map((p, i) => {
            const wide = i % 3 === 0;
            const host = p.url ? new URL(p.url).host : null;
            const card = (
              <SpotlightCard glow="rgba(255,255,255,0.25)" tilt={false} className={cardShell}>
                <article>
                  <div
                    className={`relative overflow-hidden ${wide ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/10]"}`}
                    style={{ background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }}
                  >
                    <div aria-hidden className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
                    <div className="absolute inset-x-[8%] bottom-0 top-[14%] rounded-t-[20px] bg-white/90 p-5 shadow-2xl transition-transform duration-700 ease-[var(--ease-apple)] group-hover:-translate-y-4 group-hover:scale-[1.02]">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                        {host && (
                          <span className="mx-auto truncate rounded-md bg-black/[0.05] px-3 py-0.5 font-mono text-[11px] text-black/50">{host}</span>
                        )}
                      </div>
                      <div className="mt-5 grid grid-cols-4 gap-3">
                        <span className="col-span-4 h-5 w-1/2 rounded-full bg-black/10 md:col-span-2" />
                        <span className="col-span-2 h-20 rounded-xl md:col-span-1" style={{ background: `${p.gradient[0]}26` }} />
                        <span className="col-span-2 h-20 rounded-xl md:col-span-1" style={{ background: `${p.gradient[1]}26` }} />
                        <span className="col-span-4 hidden h-20 rounded-xl bg-black/[0.05] md:col-span-2 md:block" />
                        <span className="col-span-4 h-3 rounded-full bg-black/[0.06]" />
                        <span className="col-span-3 h-3 rounded-full bg-black/[0.06]" />
                      </div>
                    </div>
                    <span className="glass absolute left-5 top-5 rounded-full px-3 py-1 text-[12px] font-medium text-ink">{p.category}</span>
                  </div>
                  <div className="flex flex-col gap-4 p-7 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                    <div>
                      <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-ink md:text-[28px]">{p.title}</h2>
                      <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">{p.blurb}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <li key={t} className="rounded-full bg-mist px-3 py-1 text-[12px] font-medium text-ink-soft">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="shrink-0 sm:text-right">
                      <p className="text-gradient text-[20px] font-bold tracking-tight md:text-[22px]">{p.highlight}</p>
                      {host && <p className="text-[13px] font-medium text-accent">Visit site ↗</p>}
                    </div>
                  </div>
                  {host && (
                    <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="h-5 w-5" aria-hidden />
                    </span>
                  )}
                </article>
              </SpotlightCard>
            );
            return (
              <StaggerItem key={p.title} className={wide ? "md:col-span-2" : ""}>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener" className="block h-full" aria-label={`${p.title} (opens in new tab)`}>
                    {card}
                  </a>
                ) : (
                  card
                )}
              </StaggerItem>
            );
          })}

          <StaggerItem>
            <Link
              href="/contact/"
              className="noise group relative flex h-full min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-[32px] bg-night p-10 text-center"
            >
              <span aria-hidden className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-pulse-soft rounded-full bg-violet/40 blur-[90px]" />
              <span className="text-gradient-cool relative text-[72px] font-bold leading-none tracking-[-0.05em]">+ more</span>
              <span className="relative mt-4 max-w-xs text-[17px] leading-relaxed text-neutral-300">
                And many more websites, apps and systems. Some are private, ask us for relevant case studies.
              </span>
              <span className="btn btn-light relative mt-8">
                Talk to us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </StaggerItem>
        </Stagger>
      </section>

      <CTA title="Your project could be next." />
    </>
  );
}
