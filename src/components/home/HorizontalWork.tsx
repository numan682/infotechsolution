"use client";

import * as m from "motion/react-m";
import { useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Dict, Project } from "@/content";

type Props = {
  t: Dict["work"];
  projects: Project[];
  labels: { allProjects: string; newTab: string };
  links: { work: string; contact: string };
};

const desktopQuery = "(min-width: 1024px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(desktopQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useIsDesktop = () =>
  useSyncExternalStore(subscribe, () => window.matchMedia(desktopQuery).matches, () => false);

/**
 * One set of cards, two behaviours:
 * desktop pins the section and slides the cards sideways as you scroll;
 * touch screens get a native swipeable carousel with scroll-snap.
 */
export function HorizontalWork({ t, projects, labels, links }: Props) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el || !isDesktop) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0.08, 1]);

  return (
    <section
      ref={section}
      aria-labelledby="work-title"
      className="relative bg-cream"
      style={isDesktop && distance ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="flex flex-col justify-center py-24 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden lg:py-0">
        <div aria-hidden className="absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-accent/15 blur-[130px]" />
        <div className="container-x relative mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 id="work-title" className="display-lg mt-3 text-ink">
              {t.title}
            </h2>
          </div>
          <Link href={links.work} className="btn btn-dark group hidden lg:inline-flex">
            {labels.allProjects} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <div className="no-scrollbar relative max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-auto" data-lenis-prevent-horizontal>
          <m.div
            ref={track}
            style={{ x: isDesktop ? x : 0 }}
            className="flex w-max gap-4 px-5 pb-6 md:px-8 lg:gap-6 lg:pb-0 lg:pl-[max(2rem,calc((100vw-1200px)/2+2rem))] lg:pr-[8vw]"
          >
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} newTab={labels.newTab} fallbackHref={links.work} />
            ))}
            <MoreCard t={t} href={links.contact} />
          </m.div>
        </div>

        <div className="container-x relative mt-6 lg:mt-10">
          <div className="hidden h-[3px] w-full overflow-hidden rounded-full bg-accent/15 lg:block">
            <m.div style={{ scaleX: bar }} className="h-full origin-left bg-gradient-to-r from-amber via-accent to-coral" />
          </div>
          <Link href={links.work} className="btn btn-dark w-full sm:w-auto lg:hidden">
            {labels.allProjects} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

const cardSize =
  "group relative flex h-[440px] w-[82vw] max-w-[520px] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] sm:w-[440px] lg:h-[min(520px,62vh)] lg:w-[520px]";

function ProjectCard({ project: p, index, newTab, fallbackHref }: { project: Project; index: number; newTab: string; fallbackHref: string }) {
  const host = p.url ? new URL(p.url).host : null;
  const inner = (
    <>
      <div aria-hidden className="relative h-[58%] overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }}>
        <div className="dots-light absolute inset-0 opacity-40" />
        <div className="absolute inset-x-8 bottom-0 top-10 rounded-t-2xl bg-white/95 p-4 shadow-2xl transition-transform duration-700 ease-[var(--ease-apple)] group-hover:-translate-y-3 group-hover:scale-[1.02]">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            {host && <span className="ml-3 truncate rounded-md bg-black/[0.05] px-2 py-0.5 font-mono text-[10px] text-black/60">{host}</span>}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <span className="col-span-2 h-16 rounded-lg" style={{ background: `${p.gradient[0]}26` }} />
            <span className="h-16 rounded-lg" style={{ background: `${p.gradient[1]}33` }} />
            <span className="h-3 rounded-full bg-black/10" />
            <span className="col-span-2 h-3 rounded-full bg-black/[0.06]" />
            <span className="col-span-3 h-3 w-2/3 rounded-full bg-black/[0.06]" />
          </div>
        </div>
        <span className="absolute left-5 top-4 font-mono text-[12px] font-semibold text-white">0{index + 1}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[13px] font-medium text-accent-ink">{p.category}</p>
        <h3 className="mt-1.5 text-[22px] font-semibold tracking-[-0.03em] text-ink">{p.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-[14px] leading-relaxed text-muted">{p.blurb}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-gradient text-[17px] font-bold">{p.highlight}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-accent group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </>
  );
  const cls = `${cardSize} bg-white shadow-[0_20px_50px_-24px_rgba(160,60,0,0.35)] ring-1 ring-accent/10 transition-shadow duration-500 hover:shadow-[0_30px_70px_-24px_rgba(160,60,0,0.5)]`;

  return p.url ? (
    <a href={p.url} target="_blank" rel="noopener" className={cls}>
      {inner}
      <span className="sr-only"> ({newTab})</span>
    </a>
  ) : (
    <Link href={fallbackHref} className={cls}>
      {inner}
    </Link>
  );
}

function MoreCard({ t, href }: { t: Dict["work"]; href: string }) {
  return (
    <Link href={href} className={`${cardSize} bg-sunset noise items-center justify-center p-8 text-center text-white`}>
      <span aria-hidden className="dots-light absolute inset-0 opacity-30" />
      <span aria-hidden className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse-soft rounded-full bg-sun/40 blur-[80px]" />
      <span className="relative text-[64px] font-bold leading-none tracking-[-0.04em]">{t.moreTitle}</span>
      <span className="relative mt-4 max-w-[17rem] text-[17px] leading-relaxed text-white">{t.moreBody}</span>
      <span className="btn btn-light relative mt-8">
        {t.moreCta} <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </Link>
  );
}
