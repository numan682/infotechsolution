import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

// 6-column bento: two wide cards, then two rows of three.
const spans = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2"];

export function ServicesBento() {
  return (
    <section id="services" className="bg-mist py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we do"
          title="Everything you need to win online."
          highlight={["win", "online."]}
          lede="One partner for strategy, design, engineering and growth. Pick a single service or let us run your entire digital stack."
        />

        <Stagger className="mt-16 grid gap-4 md:mt-20 md:grid-cols-6 md:gap-5" stagger={0.07}>
          {services.map((s, i) => {
            const big = i < 2;
            return (
              <StaggerItem key={s.slug} className={spans[i]}>
                <Link href={`/services/${s.slug}/`} className="block h-full">
                  <SpotlightCard
                    glow={`${s.gradient[0]}2e`}
                    className={`card h-full p-7 transition-shadow duration-500 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.18)] md:p-8 ${big ? "md:min-h-[340px]" : "md:min-h-[280px]"}`}
                  >
                    <div
                      aria-hidden
                      className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-50"
                      style={{ background: `linear-gradient(135deg, ${s.gradient[0]}, ${s.gradient[1]})` }}
                    />
                    <div className="flex h-full flex-col">
                      <div className="flex items-start justify-between">
                        <span
                          className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110 group-hover:-rotate-6"
                          style={{ background: `linear-gradient(135deg, ${s.gradient[0]}, ${s.gradient[1]})` }}
                        >
                          <Icon name={s.icon} className="h-6 w-6" />
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.04] text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-white">
                          <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </span>
                      </div>
                      <div className="mt-auto pt-10">
                        <h3 className={`font-semibold tracking-[-0.03em] text-ink ${big ? "text-[28px] md:text-[34px]" : "text-[22px] md:text-[24px]"}`}>
                          {s.title}
                        </h3>
                        <p className={`mt-2 leading-relaxed text-muted ${big ? "max-w-md text-[16px] md:text-[17px]" : "text-[15px]"}`}>
                          {s.short}
                        </p>
                        {big && (
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {s.stack.slice(0, 4).map((t) => (
                              <li key={t} className="rounded-full bg-mist px-3 py-1 text-[12px] font-medium text-ink-soft">
                                {t}
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
