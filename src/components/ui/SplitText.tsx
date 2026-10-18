"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { Fragment, type CSSProperties, type JSX } from "react";

type Tag = keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3" | "p">;
type Props = {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  /** Words (exact match) to render with the animated gradient. */
  highlight?: string[];
  /**
   * Animate immediately with pure CSS (for above-the-fold headlines). The words are
   * visible to the browser from first paint, so LCP isn't held back by JavaScript.
   */
  animateOnMount?: boolean;
};

const wordWrap = "inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom";

/** Headline where each word rises out of a mask, Apple keynote style. Text appears once in the DOM. */
export function SplitText({ text, as = "h2", className, delay = 0, highlight = [], animateOnMount = false }: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const cls = (word: string) => `inline-block ${highlight.includes(word) ? "text-gradient" : ""}`;

  if (animateOnMount) {
    const Tag = as;
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className={`word-rise ${cls(word)}`} style={{ "--i": i, "--d": `${delay}s` } as CSSProperties}>
              {word}
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </Tag>
    );
  }

  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className={wordWrap}>
            <m.span
              className={cls(word)}
              variants={{
                hidden: { y: "110%", rotate: 4, opacity: 0 },
                show: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {word}
            </m.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
