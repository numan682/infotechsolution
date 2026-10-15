import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/services";
import { Logo } from "./Logo";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-night text-neutral-400">
      <div aria-hidden className="grid-bg-dark absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent/30 via-violet/30 to-pink/30 blur-[120px]"
      />
      <div className="container-x relative pb-10 pt-20 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" aria-label={`${site.name} home`}>
              <Logo dark />
            </Link>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed">
              A Bangladesh-based IT company and digital agency crafting software, apps and growth for ambitious brands
              worldwide.
            </p>
            <SocialIcons className="mt-6" />
          </div>

          <div className="md:col-span-3">
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-white">Services</h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className="transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-white">Company</h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy-policy/" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-white">Get in touch</h2>
            <address className="mt-5 space-y-4 text-[15px] not-italic">
              <a href={`mailto:${site.email}`} className="flex items-start gap-3 transition-colors hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {site.email}
              </a>
              <a href={`tel:${site.phoneHref}`} className="flex items-start gap-3 transition-colors hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {site.phone}
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>
                  {site.address.street}, {site.address.locality} {site.address.postalCode}, {site.address.country}
                </span>
              </p>
            </address>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-20 select-none bg-gradient-to-b from-white/25 to-white/0 bg-clip-text text-center text-[18vw] font-bold leading-none tracking-[-0.06em] text-transparent md:text-[13vw] lg:text-[11rem]"
        >
          InfoTech
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[13px] md:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Designed & engineered in Dhaka, Bangladesh 🇧🇩</p>
        </div>
      </div>
    </footer>
  );
}
