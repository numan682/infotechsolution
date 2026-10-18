import type { Dict } from "@/content";
import { valueIcons } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function WhyUs({ t }: { t: Dict["why"] }) {
  return (
    <section className="cv-auto py-24 md:py-36">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} highlight={t.highlight} lede={t.lede} />
        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-5">
          {t.values.map((v, i) => (
            <StaggerItem key={v.title}>
              <SpotlightCard glow="rgba(255,107,0,0.14)" className="card h-full p-7 ring-1 ring-accent/[0.06]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-ink transition-all duration-500 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                  <Icon name={valueIcons[i]} className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.025em] text-ink">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{v.body}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
