"use client";

import { LazyMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import type Lenis from "lenis";

// The animation engine is fetched after first paint instead of shipping in the main bundle.
const loadFeatures = () => import("@/components/motion/features").then((mod) => mod.default);

/**
 * Motion features for the whole app, plus inertia smooth scrolling on mouse/trackpad
 * devices. Lenis is downloaded on demand and never on touch screens (which scroll
 * natively) or for users who prefer reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;

    const sync = async () => {
      const want = finePointer.matches && !reduced.matches;
      if (!want) {
        lenisRef.current?.destroy();
        lenisRef.current = null;
        return;
      }
      if (lenisRef.current) return;
      const { default: LenisCtor } = await import("lenis");
      if (cancelled || lenisRef.current) return;
      lenisRef.current = new LenisCtor({ lerp: 0.1, autoRaf: true, anchors: { offset: -80 } });
    };

    sync();
    finePointer.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      cancelled = true;
      finePointer.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Keep Lenis' internal position in sync when the router jumps to the top of a new page.
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    if (!window.location.hash) lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
