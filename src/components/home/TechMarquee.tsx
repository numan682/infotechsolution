import { techStack } from "@/lib/content";
import { Marquee } from "@/components/ui/Marquee";

export function TechMarquee({ title }: { title: string }) {
  const half = Math.ceil(techStack.length / 2);
  const rows = [techStack.slice(0, half), techStack.slice(half)];
  return (
    <section aria-label={title} className="border-y border-line bg-mist py-10 md:py-14">
      <p className="mb-8 text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-muted">{title}</p>
      <div className="space-y-4" lang="en">
        {rows.map((row, r) => (
          <Marquee key={r} reverse={r === 1}>
            {row.map((t) => (
              <span
                key={t}
                className="mx-2 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[15px] font-medium tracking-[-0.01em] text-ink-soft shadow-[0_1px_2px_rgba(120,50,0,0.06)] ring-1 ring-accent/10 md:mx-3 md:px-6 md:py-3 md:text-[17px]"
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t}
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
