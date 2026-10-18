"use client";

import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Check } from "lucide-react";

type Audience = { name: string; icon: ReactNode; items: { title: string; body: string }[] };

/**
 * Stakeholder tabs (e.g. Government / Police / Public). Every panel stays in the DOM
 * (inactive ones `hidden`) so all benefits remain indexable. Arrow keys switch tabs.
 */
export function AudienceTabs({ audiences }: { audiences: Audience[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + audiences.length) % audiences.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-orientation="horizontal" onKeyDown={onKey} className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {audiences.map((a, i) => {
          const selected = i === active;
          return (
            <button
              key={a.name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative isolate flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-[15px] font-semibold transition-colors ${
                selected ? "text-ink" : "text-white/90 hover:bg-white/10"
              }`}
            >
              {selected && (
                <m.span layoutId={`${id}-pill`} className="absolute inset-0 -z-10 rounded-full bg-white shadow-lg" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <span className={selected ? "text-accent-ink" : ""}>{a.icon}</span>
              {a.name}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {audiences.map((a, i) => {
          const grid = `grid gap-4 sm:grid-cols-2 ${a.items.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`;
          const card = (item: Audience["items"][number]) => (
            <>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent-ink">
                <Check className="h-4.5 w-4.5" strokeWidth={3} aria-hidden />
              </span>
              <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{item.body}</p>
            </>
          );
          const cardClass = "rounded-[24px] bg-white p-6 shadow-[0_20px_50px_-25px_rgba(90,30,0,0.6)]";
          return (
            <div key={a.name} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={i !== active}>
              {i === active ? (
                <AnimatePresence mode="wait">
                  <m.ul key={a.name} className={grid} initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }}>
                    {a.items.map((item) => (
                      <m.li
                        key={item.title}
                        className={cardClass}
                        variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
                      >
                        {card(item)}
                      </m.li>
                    ))}
                  </m.ul>
                </AnimatePresence>
              ) : (
                // Hidden panels still carry their content for search engines.
                <ul className={grid}>
                  {a.items.map((item) => (
                    <li key={item.title} className={cardClass}>
                      {card(item)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
