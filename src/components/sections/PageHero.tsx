import Link from "next/link";
import type { CSSProperties } from "react";
import { ChevronRight } from "lucide-react";
import { localePath, type Lang } from "@/i18n/config";
import { getDict } from "@/content";
import { SplitText } from "@/components/ui/SplitText";

type Props = {
  lang: Lang;
  eyebrow: string;
  title: string;
  lede: string;
  highlight?: string[];
  /** Breadcrumb trail after Home; `path` is the English path. */
  crumbs?: { name: string; path: string }[];
  colors?: [string, string];
  children?: React.ReactNode;
};

/** Inner-page hero: warm aurora glow, breadcrumb, split headline. */
export function PageHero({ lang, eyebrow, title, lede, highlight, crumbs = [], colors = ["#FF7A00", "#FFB443"], children }: Props) {
  const dict = getDict(lang);
  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-48">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 h-[30rem] w-[30rem] -translate-x-[75%] animate-pulse-soft rounded-full opacity-35 blur-[120px]"
        style={{ background: colors[0] }}
      />
      <div
        aria-hidden
        className="absolute -top-16 left-1/2 h-[26rem] w-[26rem] -translate-x-[5%] animate-pulse-soft rounded-full opacity-30 blur-[120px] [animation-delay:1.5s]"
        style={{ background: colors[1] }}
      />

      <div className="container-x relative text-center">
        {crumbs.length > 0 && (
          <div className="enter" style={{ "--enter-y": "10px", "--enter-blur": "0px" } as CSSProperties}>
            <nav aria-label={dict.common.breadcrumb} className="mb-8 flex justify-center">
              <ol className="glass inline-flex flex-wrap items-center gap-1 rounded-full px-4 py-1.5 text-[13px] text-muted ring-1 ring-accent/10">
                <li>
                  <Link href={localePath(lang, "/")} className="hover:text-accent-ink">
                    {dict.nav.home}
                  </Link>
                </li>
                {crumbs.map((c, i) => (
                  <li key={c.path} className="flex items-center gap-1">
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                    {i === crumbs.length - 1 ? (
                      <span aria-current="page" className="font-medium text-ink">
                        {c.name}
                      </span>
                    ) : (
                      <Link href={localePath(lang, c.path)} className="hover:text-accent-ink">
                        {c.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        )}
        {/* Pure-CSS entrances: visible from first paint, so LCP doesn't wait for JS. */}
        <p className="eyebrow enter mb-5" style={{ "--enter-y": "16px" } as CSSProperties}>
          {eyebrow}
        </p>
        <SplitText as="h1" text={title} highlight={highlight} animateOnMount delay={0.05} className="display-xl mx-auto max-w-5xl text-ink" />
        <p className="lede enter mx-auto mt-7 max-w-2xl" style={{ "--d": "0.3s" } as CSSProperties}>
          {lede}
        </p>
        {children && (
          <div className="enter mt-10" style={{ "--d": "0.45s", "--enter-blur": "0px" } as CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
