import type { ReactNode } from "react";

/** Infinite CSS marquee. Content is duplicated once; the copy is hidden from assistive tech. */
export function Marquee({ children, className = "", reverse = false }: { children: ReactNode; className?: string; reverse?: boolean }) {
  return (
    <div className={`mask-fade-x group flex overflow-hidden ${className}`}>
      <div
        className="flex w-max shrink-0 animate-marquee group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
