import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { localePath, type Lang } from "@/i18n/config";
import { getDict } from "@/content";
import { Reveal } from "@/components/ui/Reveal";
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
          <Reveal y={10} blur={false}>
            <nav aria-label={dict.common.breadcrumb} className="mb-8 flex justify-center">
              <ol className="glass inline-flex flex-wrap items-center gap-1 rounded-full px-4 py-1.5 text-[13px] text-muted ring-1 ring-accent/10">
                <li>
                  <Link href={localePath(lang, "/")} className="hover:text-accent">
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
                      <Link href={localePath(lang, c.path)} className="hover:text-accent">
                        {c.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}
        <Reveal y={16}>
          <p className="eyebrow mb-5">{eyebrow}</p>
        </Reveal>
        <SplitText as="h1" text={title} highlight={highlight} animateOnMount className="display-xl mx-auto max-w-5xl text-ink" />
        <Reveal delay={0.35}>
          <p className="lede mx-auto mt-7 max-w-2xl">{lede}</p>
        </Reveal>
        {children && (
          <Reveal delay={0.5}>
            <div className="mt-10">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
