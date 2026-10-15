"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

/**
 * Desktop: the section pins and project cards travel sideways as you scroll down.
 * Mobile/touch: a native swipeable carousel with scroll-snap.
 */
export function HorizontalWork() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0.08, 1]);

  return (
    <>
      {/* Desktop pinned horizontal scroll */}
      <section
        ref={section}
        aria-labelledby="work-title"
        className="relative hidden bg-night lg:block"
        style={{ height: `calc(100vh + ${distance}px)` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="container-x mb-10 flex items-end justify-between">
            <div>
              <p className="eyebrow !text-sky-400">Selected work</p>
              <h2 id="work-title" className="display-lg mt-3 text-white">
                Built to perform.
              </h2>
            </div>
            <Link href="/work/" className="btn text-white ring-1 ring-white/20 hover:bg-white/10">
              All projects <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <motion.div ref={track} style={{ x }} className="flex w-max gap-6 pl-[max(2rem,calc((100vw-1200px)/2+2rem))] pr-[8vw]">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
            <MoreCard />
          </motion.div>

          <div className="container-x mt-10">
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
              <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-gradient-to-r from-sky-400 via-violet to-pink" />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile & tablet swipe carousel */}
      <section className="bg-night py-24 lg:hidden">
        <div className="container-x">
          <Reveal y={16}>
            <p className="eyebrow !text-sky-400">Selected work</p>
          </Reveal>
          <SplitText text="Built to perform." className="display-lg mt-3 text-white" />
        </div>
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:px-8" data-lenis-prevent-horizontal>
          {projects.map((p, i) => (
            <div key={p.title} className="snap-center">
              <ProjectCard project={p} index={i} />
            </div>
          ))}
          <div className="snap-center">
            <MoreCard />
          </div>
        </div>
        <div className="container-x mt-8">
          <Link href="/work/" className="btn w-full text-white ring-1 ring-white/20 sm:w-auto">
            All projects <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}

const cardSize =
  "group relative flex h-[440px] w-[82vw] max-w-[520px] shrink-0 flex-col overflow-hidden rounded-[28px] ring-1 ring-white/[0.08] sm:w-[440px] lg:h-[min(520px,62vh)] lg:w-[520px]";

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const host = p.url ? new URL(p.url).host : null;
  const inner = (
    <>
      <div
        className="relative h-[58%] overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }}
      >
        <div aria-hidden className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
        {/* Abstract UI preview */}
        <div className="absolute inset-x-8 bottom-0 top-10 rounded-t-2xl bg-white/90 p-4 shadow-2xl transition-transform duration-700 ease-[var(--ease-apple)] group-hover:-translate-y-3 group-hover:scale-[1.02]">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-black/15" />
            <span className="h-2 w-2 rounded-full bg-black/15" />
            <span className="h-2 w-2 rounded-full bg-black/15" />
            {host && <span className="ml-3 truncate rounded-md bg-black/[0.05] px-2 py-0.5 font-mono text-[10px] text-black/50">{host}</span>}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <span className="col-span-2 h-16 rounded-lg" style={{ background: `${p.gradient[0]}22` }} />
            <span className="h-16 rounded-lg" style={{ background: `${p.gradient[1]}22` }} />
            <span className="h-3 rounded-full bg-black/10" />
            <span className="col-span-2 h-3 rounded-full bg-black/[0.06]" />
            <span className="col-span-3 h-3 w-2/3 rounded-full bg-black/[0.06]" />
          </div>
        </div>
        <span className="absolute left-5 top-4 font-mono text-[12px] text-white/80">0{index + 1}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[13px] text-neutral-500">{p.category}</p>
        <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-white">{p.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-[14px] leading-relaxed text-neutral-400">{p.blurb}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-gradient-cool text-[17px] font-semibold">{p.highlight}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-ink">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </>
  );

  return p.url ? (
    <a href={p.url} target="_blank" rel="noopener" aria-label={`${p.title} (opens in new tab)`} className={`${cardSize} bg-night-soft`}>
      {inner}
    </a>
  ) : (
    <Link href="/work/" className={`${cardSize} bg-night-soft`}>
      {inner}
    </Link>
  );
}

function MoreCard() {
  return (
    <Link href="/contact/" className={`${cardSize} items-center justify-center bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 text-center`}>
      <span aria-hidden className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse-soft rounded-full bg-violet/30 blur-[80px]" />
      <span className="relative text-gradient-cool text-[64px] font-bold leading-none tracking-[-0.05em]">+ more</span>
      <span className="relative mt-4 max-w-[16rem] text-[17px] leading-relaxed text-neutral-300">
        Many more websites, apps and systems shipped. Yours could be next.
      </span>
      <span className="btn btn-light relative mt-8">
        Start a project <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </Link>
  );
}
