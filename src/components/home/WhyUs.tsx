import { values } from "@/lib/content";
import type { IconName } from "@/lib/services";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

const colors = ["#0071e3", "#7c3aed", "#10b981", "#ec4899"];

export function WhyUs() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why InfoTech"
          title="World-class quality. Bangladesh value."
          highlight={["World-class", "quality."]}
          lede="Senior talent, modern tooling and global standards, at a price that makes sense. That’s why ambitious teams choose us and stay."
        />
        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-5">
          {values.map((v, i) => (
            <StaggerItem key={v.title}>
              <SpotlightCard glow={`${colors[i]}24`} className="card h-full p-7">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
                  style={{ background: `${colors[i]}14`, color: colors[i] }}
                >
                  <Icon name={v.icon as IconName} className="h-6 w-6" />
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
