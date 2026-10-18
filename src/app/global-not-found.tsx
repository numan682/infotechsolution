import type { Metadata } from "next";
import { Anek_Bangla, Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import en from "@/content/en";
import bn from "@/content/bn";
import { LogoMark } from "@/components/layout/Logo";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const anek = Anek_Bangla({ variable: "--font-anek-bangla", subsets: ["bengali"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://infotechsolution.site"),
  title: "404 — InfoTech Solution",
  robots: { index: false, follow: true },
};

/** Site-wide 404 (English + Bangla), used for any URL that matches no route. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geist.variable} ${anek.variable}`}>
      <body>
        <main className="relative flex min-h-dvh items-center overflow-hidden">
          <div aria-hidden className="grid-bg absolute inset-0" />
          <div aria-hidden className="absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 animate-pulse-soft rounded-full bg-accent/25 blur-[120px]" />
          <div className="container-x relative py-20 text-center">
            <Link href="/" className="inline-flex" aria-label="InfoTech Solution">
              <LogoMark className="h-12 w-12" />
            </Link>
            <p className="text-gradient mt-6 text-[clamp(7rem,24vw,15rem)] font-bold leading-none tracking-[-0.07em]">404</p>
            <h1 className="display-md mt-4 text-ink">{en.pages.notFound.title}</h1>
            <p className="lede mx-auto mt-3 max-w-md">{en.pages.notFound.body}</p>
            <p lang="bn" className="mx-auto mt-6 max-w-md text-[18px] font-semibold text-ink" style={{ fontFamily: "var(--font-anek-bangla)" }}>
              {bn.pages.notFound.title}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/" className="btn btn-primary">
                {en.pages.notFound.back}
              </Link>
              <Link href="/bn/" lang="bn" className="btn btn-ghost" style={{ fontFamily: "var(--font-anek-bangla)" }}>
                {bn.pages.notFound.back}
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
