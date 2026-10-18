import { Anek_Bangla, Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { localeMeta, type Lang } from "@/i18n/config";
import { getDict, getServices } from "@/content";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SmoothScroll } from "./SmoothScroll";
import { JsonLd, organizationLd, websiteLd } from "@/components/seo/JsonLd";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap", preload: false });
// Only downloaded when Bangla glyphs render, so English pages don't pay for it.
const anekBangla = Anek_Bangla({ variable: "--font-anek-bangla", subsets: ["bengali"], display: "swap", preload: false });

/** <html>/<body> wrapper shared by the English and Bangla root layouts. */
export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const dict = getDict(lang);
  const services = getServices(dict).map((s) => ({ slug: s.slug, title: s.title, short: s.short, icon: s.icon, gradient: s.gradient }));

  return (
    <html lang={localeMeta[lang].htmlLang} className={`${geistSans.variable} ${geistMono.variable} ${anekBangla.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={[organizationLd(lang), websiteLd(lang)]} />
        <SmoothScroll>
          <Header lang={lang} nav={dict.nav} services={services} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer lang={lang} />
        </SmoothScroll>
      </body>
    </html>
  );
}
