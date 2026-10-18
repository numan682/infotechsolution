"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Dict } from "@/content";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";
import { DeviceMockup, PhoneMockup } from "./DeviceMockup";

const ease = [0.22, 1, 0.36, 1] as const;

const chipStyles = [
  { className: "left-[-2%] top-[18%] md:left-[-6%]", color: "#10b981" },
  { className: "right-[-2%] top-[6%] md:right-[-5%]", color: "#ff6b00" },
  { className: "left-[6%] bottom-[8%] hidden sm:flex", color: "#ffa62b" },
];

type Props = { t: Dict["hero"]; links: { services: string; contact: string; work: string } };

export function Hero({ t, links }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // Laptop starts tilted back and flattens + grows as you scroll (Apple product reveal).
  const rotateX = useTransform(p, [0, 0.45], reduce ? [0, 0] : [24, 0]);
  const scale = useTransform(p, [0, 0.45], reduce ? [1, 1] : [0.88, 1.04]);
  const y = useTransform(p, [0, 0.45], reduce ? [0, 0] : [0, -40]);
  const textY = useTransform(p, [0, 0.4], reduce ? [0, 0] : [0, -120]);
  const textOpacity = useTransform(p, [0, 0.3], [1, 0]);
  const phoneY = useTransform(p, [0, 0.6], reduce ? [0, 0] : [80, -60]);
  const sunScale = useTransform(p, [0, 0.5], [1, 1.5]);
  const sunY = useTransform(p, [0, 0.5], [0, 160]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 md:pt-40">
      <div aria-hidden className="grid-bg absolute inset-0 h-[70%]" />
      {/* Rising sun glow */}
      <m.div aria-hidden style={{ scale: sunScale, y: sunY }} className="pointer-events-none absolute inset-x-0 top-0 h-[900px]">
        <div className="absolute left-1/2 top-[34%] h-[34rem] w-[34rem] -translate-x-1/2 animate-pulse-soft rounded-full bg-accent/30 blur-[130px]" />
        <div className="absolute left-[12%] top-[10%] h-[22rem] w-[22rem] animate-pulse-soft rounded-full bg-amber/30 blur-[120px] [animation-delay:1.2s]" />
        <div className="absolute right-[10%] top-[16%] h-[20rem] w-[20rem] animate-pulse-soft rounded-full bg-coral/20 blur-[120px] [animation-delay:2.4s]" />
      </m.div>

      <m.div style={{ y: textY, opacity: textOpacity }} className="container-x relative text-center">
        <div className="enter" style={{ "--enter-y": "16px", "--enter-blur": "0px" } as CSSProperties}>
          <Link
            href={links.services}
            className="glass group mb-8 inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-[13px] text-ink-soft ring-1 ring-accent/15 transition hover:ring-accent/40"
          >
            <span className="bg-sunset flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white">
              <Sparkles className="h-3 w-3" aria-hidden /> {t.badgeNew}
            </span>
            {t.badge}
            <ArrowRight className="h-3.5 w-3.5 text-accent-ink transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <SplitText as="h1" animateOnMount delay={0.08} text={t.title} highlight={t.highlight} className="display-xl mx-auto max-w-6xl text-ink" />

        {/* CSS entrances (no JS wait) keep LCP fast; delays stay short for the same reason. */}
        <p className="lede enter mx-auto mt-7 max-w-2xl" style={{ "--d": "0.3s" } as CSSProperties}>
          {t.lede}
        </p>

        <div className="enter mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ "--d": "0.45s", "--enter-blur": "0px" } as CSSProperties}>
          <Magnetic>
            <Link href={links.contact} className="btn btn-primary group !px-7 !text-base">
              {t.primary} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href={links.work} className="btn btn-ghost !px-7 !text-base">
              {t.secondary}
            </Link>
          </Magnetic>
        </div>
      </m.div>

      <div className="container-x relative mt-16 pb-24 md:mt-20 md:pb-36" style={{ perspective: 1600 }}>
        <div className="enter" style={{ "--d": "0.35s", "--enter-y": "120px", "--enter-blur": "0px", animationDuration: "1.4s" } as CSSProperties}>
          <m.div style={{ rotateX, scale, y, transformOrigin: "50% 100%" }} className="relative">
            <DeviceMockup />

            {t.chips.map((c, i) => (
              <m.div
                key={c.label}
                aria-hidden
                className={`glass absolute z-10 flex items-center gap-2.5 rounded-2xl px-3 py-2 shadow-[0_20px_40px_-15px_rgba(160,60,0,0.35)] ring-1 ring-accent/10 md:px-4 md:py-3 ${chipStyles[i].className}`}
                initial={{ opacity: 0, scale: 0.6, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.15, type: "spring", stiffness: 200, damping: 16 }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inset-0 animate-ping rounded-full opacity-60" style={{ background: chipStyles[i].color }} />
                  <span className="relative h-2.5 w-2.5 rounded-full" style={{ background: chipStyles[i].color }} />
                </span>
                <span className="text-left">
                  <span className="block text-[10px] font-medium text-ink-soft md:text-[11px]">{c.label}</span>
                  <span className="block text-[13px] font-semibold tracking-tight text-ink md:text-[15px]">{c.value}</span>
                </span>
              </m.div>
            ))}

            <m.div
              style={{ y: phoneY }}
              className="absolute -bottom-10 right-[-2%] z-20 md:-bottom-16 md:right-[-4%]"
              initial={{ opacity: 0, x: 60, rotate: 8 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 1.2, duration: 1.2, ease }}
            >
              <div className="animate-float">
                <PhoneMockup />
              </div>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
