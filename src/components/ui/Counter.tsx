"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { formatNumber, type Lang } from "@/i18n/config";

export function Counter({
  value,
  suffix = "",
  duration = 2.2,
  trigger,
  lang = "en",
}: {
  value: number;
  suffix?: string;
  duration?: number;
  /** Start manually instead of on viewport entry. */
  trigger?: boolean;
  lang?: Lang;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const start = trigger ?? inView;
  const final = `${formatNumber(lang, value)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || !start || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${formatNumber(lang, Math.round(v))}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [start, value, suffix, duration, reduce, lang]);

  // Server HTML contains the final value so crawlers and no-JS users see it.
  return (
    <span ref={ref} className="tabular-nums">
      {final}
    </span>
  );
}
