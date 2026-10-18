import type { Dict } from "@/content";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { Reveal } from "@/components/ui/Reveal";

export function Statement({ t }: { t: Dict["statement"] }) {
  return (
    <section className="relative overflow-hidden py-28 md:py-44">
      <div aria-hidden className="absolute -right-40 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="container-x relative">
        <Reveal y={16}>
          <p className="eyebrow mb-8">{t.eyebrow}</p>
        </Reveal>
        <h2 className="sr-only">{t.srTitle}</h2>
        <ScrollRevealText
          className="max-w-5xl text-[clamp(1.75rem,4.4vw,3.6rem)] font-semibold leading-[1.15] tracking-[-0.035em] text-ink"
          text={t.text}
        />
      </div>
    </section>
  );
}
