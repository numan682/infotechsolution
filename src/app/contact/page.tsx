import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMeta({
  title: "Contact Us: Get a Free Quote",
  description:
    "Talk to InfoTech Solution about your website, app or software project. Free consultation and a fixed quote within 24 hours. Based in Dhaka, Bangladesh, serving clients worldwide.",
  path: "/contact/",
});

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.street}, ${site.address.locality}, ${site.address.country}`,
)}`;

const channels = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}`, color: "#0071e3" },
  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phoneHref}`, color: "#7c3aed" },
  ...(site.whatsapp
    ? [{ icon: MessageCircle, label: "WhatsApp", value: "Chat with us instantly", href: `https://wa.me/${site.whatsapp}`, color: "#10b981" }]
    : []),
  { icon: MapPin, label: "Office", value: `${site.address.street}, ${site.address.locality}`, href: mapsUrl, color: "#ec4899" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Contact", path: "/contact/" }]),
          { "@context": "https://schema.org", "@type": "ContactPage", url: `${site.url}/contact/`, about: { "@id": `${site.url}/#organization` } },
        ]}
      />
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about your next big thing."
        highlight={["next", "big", "thing."]}
        lede="Share a few details and we’ll come back with ideas, a timeline and a fixed quote, usually within 24 hours."
        crumbs={[{ name: "Contact", href: "/contact/" }]}
        colors={["#0071e3", "#10b981"]}
      />

      <section className="pb-28 md:pb-40">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {channels.map((c) => (
                <StaggerItem key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="card group flex items-center gap-4 p-5 transition-transform duration-500 hover:-translate-y-1"
                  >
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
                      style={{ background: `${c.color}14`, color: c.color }}
                    >
                      <c.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] text-muted">{c.label}</span>
                      <span className="block truncate text-[16px] font-medium tracking-[-0.01em] text-ink">{c.value}</span>
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.3}>
              <div className="mt-3 flex items-center gap-4 rounded-[28px] bg-night p-6 text-white">
                <Clock className="h-5 w-5 shrink-0 text-sky-400" aria-hidden />
                <div>
                  <p className="text-[13px] text-neutral-400">Working hours</p>
                  <p className="text-[15px] font-medium">{site.hours}</p>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
