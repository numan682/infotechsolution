"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import type { Lang } from "@/i18n/config";
import { statValues } from "@/lib/site";
import { Counter } from "@/components/ui/Counter";

type Props = { lang: Lang; t: { eyebrow: string; line1: string; line2: string }; labels: string[] };

/** An orange sun grows from a dot until it fills the screen, revealing the stats. */
export function ExpandReveal({ lang, t, labels }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const radius = useTransform(scrollYProgress, [0, 0.45], reduce ? [150, 150] : [4, 150]);
  const clipPath = useTransform(radius, (r) => `circle(${r}% at 50% 50%)`);
  const titleScale = useTransform(scrollYProgress, [0.1, 0.5], reduce ? [1, 1] : [0.7, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0.12, 0.35], [0, 1]);
  const statsOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const statsY = useTransform(scrollYProgress, [0.4, 0.6], [40, 0]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const innerRingRotate = useTransform(ringRotate, (r) => -r * 1.5);
  const [countUp, setCountUp] = useState(false);
  useMotionValueEvent(statsOpacity, "change", (v) => v > 0.6 && setCountUp(true));

  return (
    <section ref={ref} className="relative h-[220vh]" aria-labelledby="impact-title">
      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">
        <motion.div style={{ clipPath }} className="bg-sunset noise absolute inset-0">
          <div aria-hidden className="grid-bg-light absolute inset-0" />
          <motion.div
            aria-hidden
            style={{ rotate: ringRotate }}
            className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
          >
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_24px_8px_rgba(255,255,255,0.7)]" />
          </motion.div>
          <motion.div
            aria-hidden
            style={{ rotate: innerRingRotate }}
            className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
          >
            <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-sun shadow-[0_0_24px_8px_rgba(255,194,75,0.8)]" />
          </motion.div>
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun/40 blur-[120px]" />

          <div className="container-x relative flex h-full flex-col items-center justify-center text-center">
            <motion.div style={{ scale: titleScale, opacity: titleOpacity }}>
              <p className="eyebrow !text-white/90">{t.eyebrow}</p>
              <h2 id="impact-title" className="display-xl mt-4 text-white">
                {t.line1}
                <br />
                <span className="text-white/75">{t.line2}</span>
              </h2>
            </motion.div>

            <motion.dl
              style={{ opacity: statsOpacity, y: statsY }}
              className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-4"
            >
              {statValues.map((s, i) => (
                <div key={i} className="rounded-3xl bg-white/12 px-4 py-6 ring-1 ring-white/25 backdrop-blur-md">
                  <dt className="sr-only">{labels[i]}</dt>
                  <dd className="text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-none tracking-[-0.05em] text-white">
                    <Counter value={s.value} suffix={s.suffix} trigger={countUp} lang={lang} />
                  </dd>
                  <dd aria-hidden className="mt-3 text-[13px] text-white/80 md:text-[14px]">
                    {labels[i]}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
