import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { Reveal } from "@/components/ui/Reveal";

export function Statement() {
  return (
    <section className="py-28 md:py-44">
      <div className="container-x">
        <Reveal y={16}>
          <p className="eyebrow mb-8">Who we are</p>
        </Reveal>
        <h2 className="sr-only">About InfoTech Solution</h2>
        <ScrollRevealText
          className="max-w-5xl text-[clamp(1.75rem,4.4vw,3.6rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-ink"
          text="We’re designers, engineers and strategists from Dhaka, building digital products that are fast, beautiful and made to grow. From first sketch to millions of users, we sweat every detail so your customers never have to think twice."
        />
      </div>
    </section>
  );
}
