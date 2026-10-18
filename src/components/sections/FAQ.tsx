"use client";

import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";

export function FAQList({ faqs }: { faqs: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <ul className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-[17px] font-medium tracking-[-0.015em] text-ink transition-colors hover:text-accent-ink md:text-[19px]"
              >
                {f.q}
                <m.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/[0.05]"
                >
                  <Plus className="h-4 w-4" aria-hidden />
                </m.span>
              </button>
            </h3>
            {/* Answer stays in the DOM (hidden) so search engines can index it. */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={`${id}-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 pr-10 leading-relaxed text-muted">{f.a}</p>
                </m.div>
              )}
            </AnimatePresence>
            {!isOpen && (
              <p id={`${id}-${i}`} hidden>
                {f.a}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
