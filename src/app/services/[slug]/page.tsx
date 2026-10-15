import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { getService, services } from "@/lib/services";
import { processSteps } from "@/lib/content";
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

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMeta({
    title: `${s.title} Company in Bangladesh`,
    description: `${s.summary.split(". ")[0]}. ${s.short}`,
    path: `/services/${s.slug}/`,
    keywords: s.keywords,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const [a, b] = s.gradient;
  const others = services.filter((o) => o.slug !== s.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Services", path: "/services/" },
            { name: s.title, path: `/services/${s.slug}/` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            serviceType: s.title,
            description: s.summary,
            url: `${site.url}/services/${s.slug}/`,
            provider: { "@id": `${site.url}/#organization` },
            areaServed: [{ "@type": "Country", name: "Bangladesh" }, "Worldwide"],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: s.title,
              itemListElement: s.deliverables.map((d) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: d },
              })),
            },
          },
          faqLd(s.faqs),
        ]}
      />

      <PageHero
        eyebrow={s.title}
        title={s.headline}
        lede={s.summary}
        colors={s.gradient}
        crumbs={[
          { name: "Services", href: "/services/" },
          { name: s.title, href: `/services/${s.slug}/` },
        ]}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/contact/" className="btn btn-primary !px-7">
            Get a free quote <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <a href="#features" className="btn btn-ghost !px-7">
            Learn more
          </a>
        </div>
      </PageHero>

      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <ServiceVisual service={s} />
          </div>
        </Reveal>
      </div>

      <section id="features" className="py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow="Why it works" title={`${s.title}, done right.`} />
          <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.features.map((f, i) => (
              <StaggerItem key={f.title}>
                <SpotlightCard glow={`${i % 2 ? b : a}26`} className="card h-full p-7">
                  <span className="font-mono text-[13px]" style={{ color: a }}>
                    0{i + 1}
                  </span>
                  <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.025em] text-ink">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.body}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="noise relative overflow-hidden bg-night py-24 text-white md:py-36">
        <div aria-hidden className="absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full opacity-40 blur-[120px]" style={{ background: a }} />
        <div aria-hidden className="absolute -left-40 bottom-0 h-[26rem] w-[26rem] rounded-full opacity-30 blur-[120px]" style={{ background: b }} />
        <div className="container-x relative grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading dark align="left" eyebrow="What you get" title="Deliverables, end to end." />
          </div>
          <Stagger className="grid gap-3 sm:grid-cols-2">
            {s.deliverables.map((d) => (
              <StaggerItem key={d}>
                <div className="flex h-full items-center gap-3 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.1]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: `${a}33`, color: a }}>
                    <Check className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-[15px] text-neutral-200">{d}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <div className="relative mt-20">
          <p className="mb-6 text-center text-[13px] font-medium uppercase tracking-[0.18em] text-neutral-500">Our toolkit</p>
          <Marquee>
            {s.stack.map((t) => (
              <span key={t} className="mx-3 text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.04em] text-white/80">
                {t} <span className="mx-3 text-white/20">✦</span>
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      <section className="py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow="Our process" title="From idea to impact in four steps." />
          <Stagger className="mt-16 grid gap-4 md:grid-cols-4">
            {processSteps.map((p) => (
              <StaggerItem key={p.n}>
                <div className="relative h-full rounded-[28px] bg-mist p-7">
                  <span className="text-[44px] font-bold leading-none tracking-[-0.05em]" style={{ color: p.color }}>
                    {p.n}
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
            <SectionHeading align="left" eyebrow="FAQ" title={`${s.title} questions.`} />
          </div>
          <Reveal className="lg:col-span-7">
            <FAQList faqs={s.faqs} />
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <h2 className="display-md text-ink">Explore more services</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <StaggerItem key={o.slug}>
                <Link href={`/services/${o.slug}/`} className="group card flex h-full items-center gap-4 p-6 transition-transform duration-500 hover:-translate-y-1">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white"
                    style={{ background: `linear-gradient(135deg, ${o.gradient[0]}, ${o.gradient[1]})` }}
                  >
                    <Icon name={o.icon} className="h-6 w-6" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[17px] font-semibold tracking-[-0.02em] text-ink">{o.title}</span>
                    <span className="mt-0.5 line-clamp-1 block text-[14px] text-muted">{o.short}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted transition-transform duration-500 group-hover:rotate-45 group-hover:text-ink" aria-hidden />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTA title={`Ready to start your ${s.title} project?`} />
    </>
  );
}
