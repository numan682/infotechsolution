import { techStack } from "@/lib/content";
import { Marquee } from "@/components/ui/Marquee";

export function TechMarquee() {
  const half = Math.ceil(techStack.length / 2);
  const rows = [techStack.slice(0, half), techStack.slice(half)];
  return (
    <section aria-label="Technologies we use" className="border-y border-black/[0.06] bg-white py-10 md:py-14">
      <p className="mb-8 text-center text-[13px] font-medium uppercase tracking-[0.18em] text-muted">
        Built with world-class technology
      </p>
      <div className="space-y-4">
        {rows.map((row, r) => (
          <Marquee key={r} reverse={r === 1}>
            {row.map((t) => (
              <span
                key={t}
                className="mx-2 rounded-full bg-mist px-5 py-2.5 text-[15px] font-medium tracking-[-0.01em] text-ink-soft md:mx-3 md:px-6 md:py-3 md:text-[17px]"
              >
                {t}
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
