import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/lib/services";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceVisual } from "@/components/sections/ServiceVisual";
import { CTA } from "@/components/sections/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "IT Services in Bangladesh: Web, App, Software & SEO",
  description:
    "Web development, mobile apps, UI/UX design, custom software & ERP, e-commerce, cloud & DevOps, SEO and AI automation from InfoTech Solution, a leading IT company in Dhaka, Bangladesh.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Services", path: "/services/" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}/services/${s.slug}/`,
              name: s.title,
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Services"
        title="Every service your business needs to grow."
        highlight={["grow."]}
        lede="Strategy, design, engineering and marketing under one roof, delivered by a senior team in Dhaka for clients around the world."
        crumbs={[{ name: "Services", href: "/services/" }]}
      />

      <div className="container-x space-y-28 pb-28 md:space-y-40 md:pb-40">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} className="grid items-center gap-10 md:grid-cols-2 md:gap-16" aria-labelledby={`${s.slug}-title`}>
            <Reveal className={i % 2 ? "md:order-2" : ""}>
              <ServiceVisual service={s} />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow" style={{ color: s.gradient[0] }}>
                0{i + 1} · {s.title}
              </p>
              <h2 id={`${s.slug}-title`} className="display-md mt-3 text-ink">
                {s.headline}
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-muted">{s.summary}</p>
              <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[15px] text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: s.gradient[0] }} aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
              <Link href={`/services/${s.slug}/`} className="btn btn-dark mt-9">
                Explore {s.title} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Reveal>
          </section>
        ))}
      </div>

      <CTA />
    </>
  );
}
