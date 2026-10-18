import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { localeMeta, type Lang } from "@/i18n/config";
import { getDict, getServices, getSolutions } from "@/content";
import type { IconName } from "@/lib/services";
import { Icon } from "@/components/ui/Icon";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SmoothScroll } from "./SmoothScroll";
import { JsonLd, organizationLd, websiteLd } from "@/components/seo/JsonLd";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });

// Crawlers and visitors without JavaScript still see content whose entrance
// animation would normally be started by JS (Motion's initial opacity: 0).
const noJsFallback = `[style*="opacity:0"]:not([aria-hidden]){opacity:1!important;transform:none!important;filter:none!important}`;

/** <html>/<body> wrapper shared by the English and Bangla root layouts. */
export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const dict = getDict(lang);
  // Icons are rendered here (server) and passed as elements, keeping lucide out of the client bundle.
  const toNav = (s: { slug: string; title: string; short: string; icon: IconName; gradient: [string, string] }) => ({
    slug: s.slug,
    title: s.title,
    short: s.short,
    gradient: s.gradient,
    icon: <Icon name={s.icon} className="h-5 w-5" />,
  });
  const services = getServices(dict).map(toNav);
  const solutions = getSolutions(dict).map(toNav);

  return (
    <html lang={localeMeta[lang].htmlLang} className={geistSans.variable}>
      <body className="flex min-h-dvh flex-col">
        <noscript>
          <style>{noJsFallback}</style>
        </noscript>
        <JsonLd data={[organizationLd(lang), websiteLd(lang)]} />
        <SmoothScroll>
          <Header lang={lang} nav={dict.nav} services={services} solutions={solutions} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer lang={lang} />
        </SmoothScroll>
      </body>
    </html>
  );
}
