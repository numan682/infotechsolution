"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { stats } from "@/lib/site";
import { Counter } from "@/components/ui/Counter";

/** A dark circle grows from a dot to fill the screen, revealing the stats. */
export function ExpandReveal() {
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
        <motion.div style={{ clipPath }} className="noise absolute inset-0 bg-night">
          <div aria-hidden className="grid-bg-dark absolute inset-0" />
          <motion.div
            aria-hidden
            style={{ rotate: ringRotate }}
            className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
          >
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400 shadow-[0_0_24px_6px_rgba(56,189,248,0.6)]" />
          </motion.div>
          <motion.div
            aria-hidden
            style={{ rotate: innerRingRotate }}
            className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
          >
            <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_24px_6px_rgba(232,121,249,0.6)]" />
          </motion.div>
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[120px]" />

          <div className="container-x relative flex h-full flex-col items-center justify-center text-center">
            <motion.div style={{ scale: titleScale, opacity: titleOpacity }}>
              <p className="eyebrow !text-sky-400">Our impact</p>
              <h2 id="impact-title" className="display-xl mt-4 text-white">
                From Dhaka
                <br />
                <span className="text-gradient-cool">to the world.</span>
              </h2>
            </motion.div>

            <motion.dl
              style={{ opacity: statsOpacity, y: statsY }}
              className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-x-6 gap-y-10 md:mt-20 md:grid-cols-4"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-none tracking-[-0.05em] text-white">
                    <Counter value={s.value} suffix={s.suffix} trigger={countUp} />
                  </dd>
                  <dd aria-hidden className="mt-3 text-[14px] text-neutral-400 md:text-[15px]">
                    {s.label}
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
