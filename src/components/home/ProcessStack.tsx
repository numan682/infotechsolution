"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Check } from "lucide-react";
import { processSteps } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Cards pin on top of each other and recede as the next one slides over. */
export function ProcessStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = processSteps.length;

  return (
    <section className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="How we work"
          title="A process built for zero surprises."
          highlight={["zero", "surprises."]}
          lede="Four clear stages, weekly demos and one dedicated team. You always know what’s happening and what’s next."
        />

        <div ref={ref} className="relative mt-16 md:mt-24">
          {processSteps.map((step, i) => (
            <StackCard key={step.n} step={step} i={i} n={n} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({
  step,
  i,
  n,
  progress,
}: {
  step: (typeof processSteps)[number];
  i: number;
  n: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (n - 1 - i) * 0.04;
  const scale = useTransform(progress, [i / n, 1], [1, targetScale]);
  const dim = useTransform(progress, [i / n, (i + 1) / n], [0, i === n - 1 ? 0 : 0.35]);

  return (
    <div className="sticky h-[78vh] min-h-[480px]" style={{ top: `calc(var(--header-h) + 24px + ${i * 18}px)` }}>
      <motion.article
        style={{ scale, transformOrigin: "50% 0%" }}
        className="relative grid h-[min(560px,70vh)] min-h-[440px] overflow-hidden rounded-[32px] bg-night p-7 text-white shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.5)] md:grid-cols-2 md:p-12"
      >
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-50 blur-[100px]"
          style={{ background: step.color }}
        />
        <div className="relative flex flex-col">
          <span className="font-mono text-sm text-neutral-500">{step.n} / 0{n}</span>
          <h3 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-bold leading-none tracking-[-0.045em]">{step.title}</h3>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-neutral-300 md:text-[18px]">{step.body}</p>
          <ul className="mt-auto space-y-3 pt-8">
            {step.points.map((pt) => (
              <li key={pt} className="flex items-center gap-3 text-[15px] text-neutral-200">
                <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: `${step.color}33`, color: step.color }}>
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                {pt}
              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden className="relative hidden items-center justify-center md:flex">
          <span
            className="select-none bg-clip-text text-[16rem] font-bold leading-none tracking-[-0.08em] text-transparent"
            style={{ backgroundImage: `linear-gradient(160deg, ${step.color}, transparent 85%)` }}
          >
            {step.n}
          </span>
        </div>
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />
      </motion.article>
    </div>
  );
}
