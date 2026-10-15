"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Service } from "@/lib/services";
import { Icon } from "@/components/ui/Icon";

/** Parallax gradient tile with the service icon and floating tech pills. */
export function ServiceVisual({ service }: { service: Service }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const iconY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const iconRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const pillsY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const [a, b] = service.gradient;

  return (
    <div
      ref={ref}
      className="noise relative aspect-[4/3] overflow-hidden rounded-[32px]"
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
    >
      <div aria-hidden className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
      <div aria-hidden className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/25 blur-3xl" />
      <motion.div
        style={{ y: iconY, rotate: iconRotate }}
        className="absolute left-1/2 top-1/2 -ml-16 -mt-16 flex h-32 w-32 items-center justify-center rounded-[36px] bg-white/95 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] md:-ml-20 md:-mt-20 md:h-40 md:w-40 md:rounded-[44px]"
      >
        <Icon name={service.icon} className="h-14 w-14 md:h-16 md:w-16" style={{ color: a }} />
      </motion.div>
      <motion.ul style={{ y: pillsY }} className="absolute inset-x-6 bottom-6 flex flex-wrap justify-center gap-2" aria-label="Technologies">
        {service.stack.slice(0, 5).map((t) => (
          <li key={t} className="glass rounded-full px-3 py-1.5 text-[12px] font-medium text-ink">
            {t}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
