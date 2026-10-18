import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { localePath, type Lang } from "@/i18n/config";
import { fill, getDict } from "@/content";
import { site } from "@/lib/site";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

/** Big sunset-orange call-to-action panel. */
export function CTA({ lang, title }: { lang: Lang; title?: string }) {
  const dict = getDict(lang);
  const t = dict.cta;
  return (
    <section className="px-3 py-3 md:px-5 md:py-5">
      <div className="bg-sunset noise relative isolate overflow-hidden rounded-[32px] px-6 py-24 text-center md:rounded-[44px] md:py-36">
        <div aria-hidden className="grid-bg-light absolute inset-0" />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full opacity-70 blur-[90px]"
          style={{ background: "conic-gradient(from 0deg, #ffc24b, #ff6b00, #ff3d3d, #ffd08a, #ff8a00, #ffc24b)" }}
        />
        <div aria-hidden className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/25 blur-[100px]" />
        <div className="relative mx-auto max-w-3xl">
          <SplitText text={title ?? t.title} className="display-lg text-white" />
          <Reveal delay={0.2}>
            <p className="lede mx-auto mt-6 max-w-xl !text-white/85">{t.lede}</p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Link href={localePath(lang, "/contact/")} className="btn btn-light group !px-7 !text-base">
                  {t.primary} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </Magnetic>
              <Magnetic>
                {site.whatsapp ? (
                  <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light !px-7 !text-base">
                    <MessageCircle className="h-4 w-4" aria-hidden /> {dict.common.whatsapp}
                  </a>
                ) : (
                  <a href={`tel:${site.phoneHref}`} className="btn btn-outline-light !px-7 !text-base">
                    <Phone className="h-4 w-4" aria-hidden /> {fill(dict.common.callUs, { phone: site.phone })}
                  </a>
                )}
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
