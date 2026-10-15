"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

export function Counter({
  value,
  suffix = "",
  duration = 2.2,
  trigger,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  /** Start manually instead of on viewport entry. */
  trigger?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const start = trigger ?? inView;

  useEffect(() => {
    const el = ref.current;
    if (!el || !start) return;
    if (reduce) {
      el.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [start, value, suffix, duration, reduce]);

  // Server HTML contains the final value so crawlers and no-JS users see it.
  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
