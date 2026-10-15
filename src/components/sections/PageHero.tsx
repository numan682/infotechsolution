import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

type Props = {
  eyebrow: string;
  title: string;
  lede: string;
  highlight?: string[];
  crumbs?: { name: string; href: string }[];
  colors?: [string, string];
  children?: React.ReactNode;
};

/** Hero used on inner pages: animated aurora, breadcrumb, split headline. */
export function PageHero({ eyebrow, title, lede, highlight, crumbs = [], colors = ["#0071e3", "#7c3aed"], children }: Props) {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-44">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-[70%] animate-pulse-soft rounded-full opacity-40 blur-[110px]"
        style={{ background: colors[0] }}
      />
      <div
        aria-hidden
        className="absolute -top-20 left-1/2 h-[24rem] w-[24rem] -translate-x-[5%] animate-pulse-soft rounded-full opacity-30 blur-[110px] [animation-delay:1.5s]"
        style={{ background: colors[1] }}
      />

      <div className="container-x relative text-center">
        {crumbs.length > 0 && (
          <Reveal y={10} blur={false}>
            <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
              <ol className="glass inline-flex flex-wrap items-center gap-1 rounded-full px-4 py-1.5 text-[13px] text-muted ring-1 ring-black/5">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Home
                  </Link>
                </li>
                {crumbs.map((c, i) => (
                  <li key={c.href} className="flex items-center gap-1">
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                    {i === crumbs.length - 1 ? (
                      <span aria-current="page" className="text-ink">
                        {c.name}
                      </span>
                    ) : (
                      <Link href={c.href} className="hover:text-ink">
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
        <SplitText as="h1" text={title} highlight={highlight} animateOnMount className="display-xl mx-auto max-w-5xl" />
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
