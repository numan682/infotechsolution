"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";
import { DeviceMockup, PhoneMockup } from "./DeviceMockup";

const ease = [0.22, 1, 0.36, 1] as const;

const chips = [
  { label: "Core Web Vitals", value: "100", className: "left-[-2%] top-[18%] md:left-[-6%]", color: "#10b981" },
  { label: "Organic traffic", value: "+248%", className: "right-[-2%] top-[6%] md:right-[-5%]", color: "#0071e3" },
  { label: "Launch", value: "On time", className: "left-[6%] bottom-[8%] hidden sm:flex", color: "#7c3aed" },
];

export function Hero() {
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
  const glowScale = useTransform(p, [0, 0.5], [1, 1.4]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 md:pt-36">
      <div aria-hidden className="grid-bg absolute inset-0 h-[70%]" />
      <motion.div aria-hidden style={{ scale: glowScale }} className="pointer-events-none absolute inset-x-0 top-0 h-[900px]">
        <div className="absolute left-[10%] top-[8%] h-[26rem] w-[26rem] animate-pulse-soft rounded-full bg-accent/30 blur-[120px]" />
        <div className="absolute right-[8%] top-[18%] h-[22rem] w-[22rem] animate-pulse-soft rounded-full bg-violet/25 blur-[120px] [animation-delay:1.2s]" />
        <div className="absolute left-[40%] top-[40%] h-[20rem] w-[20rem] animate-pulse-soft rounded-full bg-pink/20 blur-[120px] [animation-delay:2.4s]" />
      </motion.div>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="container-x relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease }}
        >
          <Link
            href="/services/"
            className="glass group mb-8 inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-[13px] text-ink-soft ring-1 ring-black/[0.06] transition hover:ring-black/15"
          >
            <span className="flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[11px] font-medium text-white">
              <Sparkles className="h-3 w-3" aria-hidden /> New
            </span>
            AI & automation services now live
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </motion.div>

        <SplitText
          as="h1"
          animateOnMount
          delay={0.15}
          text="Technology, engineered to move you."
          highlight={["move", "you."]}
          className="display-xl mx-auto max-w-6xl text-ink"
        />

        <motion.p
          className="lede mx-auto mt-7 max-w-2xl"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.7, duration: 1, ease }}
        >
          InfoTech Solution is a Bangladesh-based IT company and digital agency. We design and build websites, apps and
          software that look stunning, load instantly and grow your business.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease }}
        >
          <Magnetic>
            <Link href="/contact/" className="btn btn-primary !px-7 !text-base">
              Start your project <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/work/" className="btn btn-ghost !px-7 !text-base">
              See our work
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      <div className="container-x relative mt-16 pb-24 md:mt-20 md:pb-36" style={{ perspective: 1600 }}>
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.4, ease }}
        >
          <motion.div style={{ rotateX, scale, y, transformOrigin: "50% 100%" }} className="relative">
            <DeviceMockup />

            {chips.map((c, i) => (
              <motion.div
                key={c.label}
                className={`glass absolute z-10 flex items-center gap-2.5 rounded-2xl px-3 py-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.25)] ring-1 ring-black/5 md:px-4 md:py-3 ${c.className}`}
                initial={{ opacity: 0, scale: 0.6, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.15, type: "spring", stiffness: 200, damping: 16 }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                <span className="text-left">
                  <span className="block text-[10px] text-muted md:text-[11px]">{c.label}</span>
                  <span className="block text-[13px] font-semibold tracking-tight text-ink md:text-[15px]">{c.value}</span>
                </span>
              </motion.div>
            ))}

            <motion.div
              style={{ y: phoneY }}
              className="absolute -bottom-10 right-[-2%] z-20 md:-bottom-16 md:right-[-4%]"
              initial={{ opacity: 0, x: 60, rotate: 8 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 1.2, duration: 1.2, ease }}
            >
              <div className="animate-float">
                <PhoneMockup />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
