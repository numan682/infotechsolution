import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { localePath, type Lang } from "@/i18n/config";
import { getDict, getServices } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

// 6-column bento: two wide cards, then two rows of three.
const spans = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2"];

export function ServicesBento({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const t = dict.servicesSection;
  return (
    <section id="services" className="bg-mist py-24 md:py-36">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} highlight={t.highlight} lede={t.lede} />

        <Stagger className="mt-16 grid gap-4 md:mt-20 md:grid-cols-6 md:gap-5" stagger={0.07}>
          {getServices(dict).map((s, i) => {
            const big = i < 2;
            return (
              <StaggerItem key={s.slug} className={spans[i]}>
                <Link href={localePath(lang, `/services/${s.slug}/`)} className="block h-full">
                  <SpotlightCard
                    glow="rgba(255,107,0,0.16)"
                    className={`card h-full p-7 ring-1 ring-transparent transition-all duration-500 hover:shadow-[0_30px_60px_-25px_rgba(160,60,0,0.3)] hover:ring-accent/20 md:p-8 ${big ? "md:min-h-[340px]" : "md:min-h-[280px]"}`}
                  >
                    <div
                      aria-hidden
                      className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-50"
                      style={{ background: `linear-gradient(135deg, ${s.gradient[0]}, ${s.gradient[1]})` }}
                    />
                    <div className="flex h-full flex-col">
                      <div className="flex items-start justify-between">
                        <span
                          className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_10px_24px_-10px_rgba(255,107,0,0.9)] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-110"
                          style={{ background: `linear-gradient(135deg, ${s.gradient[0]}, ${s.gradient[1]})` }}
                        >
                          <Icon name={s.icon} className="h-6 w-6" />
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/[0.08] text-accent transition-all duration-500 group-hover:rotate-45 group-hover:bg-accent group-hover:text-white">
                          <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </span>
                      </div>
                      <div className="mt-auto pt-10">
                        <h3 className={`font-semibold tracking-[-0.03em] text-ink ${big ? "text-[28px] md:text-[34px]" : "text-[22px] md:text-[24px]"}`}>
                          {s.title}
                        </h3>
                        <p className={`mt-2 leading-relaxed text-muted ${big ? "max-w-md text-[16px] md:text-[17px]" : "text-[15px]"}`}>{s.short}</p>
                        {big && (
                          <ul className="mt-5 flex flex-wrap gap-2" lang="en">
                            {s.stack.slice(0, 4).map((tech) => (
                              <li key={tech} className="rounded-full bg-mist px-3 py-1 text-[12px] font-medium text-ink-soft ring-1 ring-accent/10">
                                {tech}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
