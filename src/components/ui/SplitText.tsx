"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment, type JSX } from "react";

type Props = {
  text: string;
  as?: keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3" | "p">;
  className?: string;
  delay?: number;
  /** Words (exact match) to render with the animated gradient. */
  highlight?: string[];
  animateOnMount?: boolean;
};

/** Headline where each word rises out of a mask, Apple keynote style. */
export function SplitText({ text, as = "h2", className, delay = 0, highlight = [], animateOnMount = false }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");

  const trigger = animateOnMount
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag
      className={className}
      initial={reduce ? false : "hidden"}
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={i}>
        <span aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${highlight.includes(word) ? "text-gradient" : ""}`}
            variants={{
              hidden: { y: "110%", rotate: 4, opacity: 0 },
              show: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
          </motion.span>
        </span>
        {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
