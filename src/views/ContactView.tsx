import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { localePath, type Lang } from "@/i18n/config";
import { getDict, getServices, getSolutions } from "@/content";
import { pageMeta } from "@/lib/seo";
import { mapsUrl, site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export const contactMeta = (lang: Lang) => {
  const t = getDict(lang).pages.contact;
  return pageMeta(lang, { title: t.metaTitle, description: t.metaDescription, path: "/contact/" });
};

export function ContactView({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const t = d.pages.contact;
  const c = d.common;

  const channels = [
    { icon: Phone, label: c.phone, value: site.phone, href: `tel:${site.phoneHref}`, external: false },
    { icon: Mail, label: c.email, value: site.email, href: `mailto:${site.email}`, external: false },
    ...(site.whatsapp ? [{ icon: MessageCircle, label: c.whatsappLabel, value: c.whatsappValue, href: `https://wa.me/${site.whatsapp}`, external: true }] : []),
    {
      icon: MapPin,
      label: c.office,
      value: `${site.address.street}, ${site.address.locality} ${site.address.postalCode}`,
      href: mapsUrl,
      external: true,
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(lang, [{ name: t.eyebrow, path: "/contact/" }]),
          { "@context": "https://schema.org", "@type": "ContactPage", url: `${site.url}${localePath(lang, "/contact/")}`, about: { "@id": `${site.url}/#organization` } },
        ]}
      />
      <PageHero lang={lang} eyebrow={t.eyebrow} title={t.title} highlight={t.highlight} lede={t.lede} crumbs={[{ name: t.eyebrow, path: "/contact/" }]} />

      <section className="pb-28 md:pb-40">
        <div className="container-x grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {channels.map((ch) => (
                <StaggerItem key={ch.label}>
                  <a
                    href={ch.href}
                    target={ch.external ? "_blank" : undefined}
                    rel={ch.external ? "noopener noreferrer" : undefined}
                    className="card group flex items-center gap-4 p-5 ring-1 ring-transparent transition-all duration-500 hover:-translate-y-1 hover:ring-accent/20"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent-ink transition-all duration-500 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                      <ch.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] text-muted">{ch.label}</span>
                      <span className="block truncate text-[16px] font-semibold tracking-[-0.01em] text-ink">{ch.value}</span>
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.3}>
              <div className="bg-sunset noise relative mt-3 flex items-center gap-4 overflow-hidden rounded-[28px] p-6 text-white">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-[13px] text-white/80">{c.hoursLabel}</p>
                  <p className="text-[15px] font-semibold">{c.hours}</p>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <ContactForm t={d.form} services={[...getSolutions(d), ...getServices(d)].map((s) => s.title)} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
