"use client";

import * as m from "motion/react-m";
import { useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  glow?: string;
  tilt?: boolean;
};

/** Card with a cursor-following spotlight and subtle 3D tilt (mouse only). */
export function SpotlightCard({ children, className = "", glow = "rgba(0,113,227,0.18)", tilt = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const rx = useSpring(0, { stiffness: 160, damping: 18 });
  const ry = useSpring(0, { stiffness: 160, damping: 18 });
  const background = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, ${glow}, transparent 65%)`;

  return (
    <m.div
      ref={ref}
      className={`group relative isolate overflow-hidden ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        mx.set(px);
        my.set(py);
        if (tilt) {
          rx.set(((py / r.height) - 0.5) * -6);
          ry.set(((px / r.width) - 0.5) * 6);
        }
      }}
      onPointerLeave={() => {
        mx.set(-400);
        my.set(-400);
        rx.set(0);
        ry.set(0);
      }}
    >
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </m.div>
  );
}
