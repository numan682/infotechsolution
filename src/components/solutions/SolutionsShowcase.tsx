import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { localePath, type Lang } from "@/i18n/config";
import { getDict, getSolutions } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

/** Three flagship solution cards (home page + services index). */
export function SolutionsShowcase({ lang, className = "" }: { lang: Lang; className?: string }) {
  const d = getDict(lang);
  const t = d.solutionsSection;
  return (
    <section className={`cv-auto py-24 md:py-32 ${className}`}>
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} highlight={t.highlight} lede={t.lede} />
        <Stagger className="mt-16 grid gap-5 lg:grid-cols-3" stagger={0.1}>
          {getSolutions(d).map((s) => (
            <StaggerItem key={s.slug}>
              <Link href={localePath(lang, `/services/${s.slug}/`)} className="block h-full">
                <SpotlightCard
                  glow="rgba(255,255,255,0.35)"
                  tilt={false}
                  className="flex h-full flex-col rounded-[30px] bg-white shadow-[0_24px_60px_-28px_rgba(160,60,0,0.45)] ring-1 ring-accent/10 transition-shadow duration-500 hover:shadow-[0_34px_80px_-28px_rgba(160,60,0,0.6)]"
                >
                  <div className="noise relative h-44 overflow-hidden" style={{ background: `linear-gradient(135deg, ${s.gradient[0]}, ${s.gradient[1]})` }}>
                    <div aria-hidden className="dots-light absolute inset-0 opacity-40" />
                    <div aria-hidden className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-white/25 blur-2xl" />
                    <span className="absolute bottom-6 left-6 flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-accent-ink shadow-xl transition-transform duration-700 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-110">
                      <Icon name={s.icon} className="h-8 w-8" />
                    </span>
                    <span aria-hidden className="absolute right-6 top-6 h-3 w-3 rounded-full bg-white">
                      <span className="absolute inset-0 animate-ping rounded-full bg-white" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-[24px] font-bold tracking-[-0.03em] text-ink">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.short}</p>
                    <ul className="mt-5 space-y-2">
                      {s.badges.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-[14px] text-ink-soft">
                          <Check className="h-4 w-4 shrink-0 text-accent-ink" strokeWidth={3} aria-hidden />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-[15px] font-semibold text-accent-ink">
                      {t.explore} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
