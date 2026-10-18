import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { localePath, type Lang } from "@/i18n/config";
import { getDict, getServices } from "@/content";
import { mapsUrl, navPaths, site } from "@/lib/site";
import { Logo } from "./Logo";
import { SocialIcons } from "./SocialIcons";

export function Footer({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const t = dict.footer;
  const href = (p: string) => localePath(lang, p);
  const year = new Date().getFullYear();

  return (
    <footer className="cv-auto relative overflow-hidden bg-night text-white/60">
      <div aria-hidden className="absolute -top-48 left-1/2 h-96 w-[64rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-amber/30 via-accent/40 to-coral/30 blur-[130px]" />
      <div className="container-x relative pb-10 pt-20 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href={href("/")} aria-label={site.name}>
              <Logo dark />
            </Link>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed">{t.blurb}</p>
            <SocialIcons className="mt-6" lang={lang} />
          </div>

          <nav aria-label={t.services} className="md:col-span-3">
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-white">{t.services}</h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              {getServices(dict).map((s) => (
                <li key={s.slug}>
                  <Link href={href(`/services/${s.slug}/`)} className="transition-colors hover:text-accent">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.company} className="md:col-span-2">
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-white">{t.company}</h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              {navPaths.map((p) => (
                <li key={p}>
                  <Link href={href(p)} className="transition-colors hover:text-accent">
                    {dict.nav.labels[p]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={href("/privacy-policy/")} className="transition-colors hover:text-accent">
                  {t.privacy}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-white">{t.contact}</h2>
            <address className="mt-5 space-y-4 text-[15px] not-italic">
              <a href={`tel:${site.phoneHref}`} className="flex items-start gap-3 transition-colors hover:text-accent">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-start gap-3 transition-colors hover:text-accent">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden /> {site.email}
              </a>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition-colors hover:text-accent">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span>
                  {site.address.street}, {site.address.locality} {site.address.postalCode}, {site.address.country}
                </span>
              </a>
            </address>
            <Link href={href("/contact/")} className="btn btn-primary mt-7 !min-h-10 !text-[14px]">
              {dict.nav.cta} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <p
          aria-hidden
          lang="en"
          className="mt-20 select-none bg-gradient-to-b from-accent/70 via-accent/25 to-transparent bg-clip-text text-center text-[18vw] font-bold leading-none tracking-[-0.06em] text-transparent md:text-[13vw] lg:text-[11rem]"
        >
          InfoTech
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[13px] md:flex-row">
          <p>
            © {year} {site.name}. {t.rights}
          </p>
          <p>{t.madeIn} 🇧🇩</p>
        </div>
      </div>
    </footer>
  );
}
