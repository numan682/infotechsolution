"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Check } from "lucide-react";
import { formatNumber, type Lang } from "@/i18n/config";
import type { Dict } from "@/content";
import { processColors } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Step = Dict["process"]["steps"][number];

/** Orange cards pin on top of each other and recede as the next one slides over. */
export function ProcessStack({ lang, t }: { lang: Lang; t: Dict["process"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = t.steps.length;

  return (
    <section className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} highlight={t.highlight} lede={t.lede} />

        <div ref={ref} className="relative mt-16 md:mt-24">
          {t.steps.map((step, i) => (
            <StackCard key={i} step={step} i={i} n={n} lang={lang} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({ step, i, n, lang, progress }: { step: Step; i: number; n: number; lang: Lang; progress: MotionValue<number> }) {
  const targetScale = 1 - (n - 1 - i) * 0.04;
  const scale = useTransform(progress, [i / n, 1], [1, targetScale]);
  const dim = useTransform(progress, [i / n, (i + 1) / n], [0, i === n - 1 ? 0 : 0.18]);
  const num = `${formatNumber(lang, 0)}${formatNumber(lang, i + 1)}`;
  const color = processColors[i % processColors.length];

  return (
    <div className="sticky h-[78vh] min-h-[500px]" style={{ top: `calc(var(--header-h) + 28px + ${i * 18}px)` }}>
      <motion.article
        style={{ scale, transformOrigin: "50% 0%", background: `linear-gradient(140deg, ${color}, #ff9a3d 130%)` }}
        className="noise relative grid h-[min(560px,70vh)] min-h-[460px] overflow-hidden rounded-[32px] p-7 text-white shadow-[0_-20px_60px_-30px_rgba(160,60,0,0.6)] md:grid-cols-2 md:p-12"
      >
        <div aria-hidden className="dots-light absolute inset-0 opacity-25" />
        <div aria-hidden className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-sun/50 blur-[100px]" />
        <div className="relative flex flex-col">
          <span className="font-mono text-sm text-white/75">
            {num} / {formatNumber(lang, 0)}
            {formatNumber(lang, n)}
          </span>
          <h3 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em]">{step.title}</h3>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/90 md:text-[18px]">{step.body}</p>
          <ul className="mt-auto space-y-3 pt-8">
            {step.points.map((pt) => (
              <li key={pt} className="flex items-center gap-3 text-[15px] text-white">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-accent">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                </span>
                {pt}
              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden className="relative hidden items-center justify-center md:flex">
          <span className="select-none bg-gradient-to-b from-white/70 to-white/0 bg-clip-text text-[16rem] font-bold leading-none tracking-[-0.06em] text-transparent">
            {num}
          </span>
        </div>
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-[#5a1f00]" />
      </motion.article>
    </div>
  );
}
