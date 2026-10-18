"use client";

import * as m from "motion/react-m";
import { useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

/** Paragraph whose words light up one by one as the user scrolls through it. */
export function ScrollRevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  // Dim words stay at >=3:1 contrast (large text AA), then warm up to full ink.
  const color = useTransform(progress, range, ["#8c7c71", "#1c1410"]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <m.span style={{ color }}>{children}</m.span>
    </span>
  );
}
