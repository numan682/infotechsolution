"use client";

import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import type { Dict } from "@/content";
import { site } from "@/lib/site";

const field =
  "peer w-full rounded-2xl border border-line bg-white px-4 pb-2.5 pt-6 text-[16px] text-ink outline-none transition-all duration-300 placeholder:text-transparent hover:border-accent/40 focus:border-accent focus:ring-4 focus:ring-accent/15";
const label =
  "pointer-events-none absolute left-4 top-4 origin-left text-[15px] text-muted transition-all duration-300 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-accent-ink peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]";

/**
 * Static-hosting friendly: builds a pre-filled email and opens the visitor's
 * mail app (mailto:) addressed to our inbox. No server code required.
 */
export function ContactForm({ t, services }: { t: Dict["form"]; services: string[] }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [budget, setBudget] = useState("");
  const serviceRef = useRef<HTMLSelectElement>(null);

  // "Book a demo" links pass ?service=<name>; preselect it so the enquiry is one step shorter.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("service");
    const el = serviceRef.current;
    if (wanted && el && [...el.options].some((o) => o.value === wanted)) el.value = wanted;
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const name = get("name");
    const email = get("email");
    const message = get("message");
    if (!name || !email || message.length < 5) {
      setError(t.required);
      return;
    }
    setError("");

    const L = t.bodyLabels;
    const details: [string, string][] = [
      [L.name, name],
      [L.email, email],
      [L.phone, get("phone")],
      [L.company, get("company")],
      [L.service, get("service")],
      [L.budget, budget],
    ];
    const lines = [...details.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`), "", message];

    const subject = t.subject.replace("{name}", name);
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <m.div
            key="sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="card flex min-h-[520px] flex-col items-center justify-center p-10 text-center"
            role="status"
          >
            <m.span
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="bg-sunset flex h-20 w-20 items-center justify-center rounded-full text-white shadow-[0_20px_40px_-12px_rgba(255,107,0,0.7)]"
            >
              <Check className="h-10 w-10" strokeWidth={2.5} aria-hidden />
            </m.span>
            <h2 className="mt-8 text-[30px] font-bold tracking-[-0.03em] text-ink">{t.sentTitle}</h2>
            <p className="mt-3 max-w-sm leading-relaxed text-muted">
              {t.sentBody}{" "}
              <a className="font-medium text-accent-ink underline underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
            <button type="button" onClick={() => setSent(false)} className="btn btn-ghost mt-8">
              {t.again}
            </button>
          </m.div>
        ) : (
          <m.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            onSubmit={onSubmit}
            className="card space-y-4 p-6 md:p-10"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <input id="name" name="name" required maxLength={100} autoComplete="name" placeholder={t.name} className={field} />
                <label htmlFor="name" className={label}>
                  {t.name} *
                </label>
              </div>
              <div className="relative">
                <input id="email" name="email" type="email" required maxLength={150} autoComplete="email" placeholder={t.email} className={field} />
                <label htmlFor="email" className={label}>
                  {t.email} *
                </label>
              </div>
              <div className="relative">
                <input id="phone" name="phone" type="tel" maxLength={30} autoComplete="tel" placeholder={t.phone} className={field} />
                <label htmlFor="phone" className={label}>
                  {t.phone}
                </label>
              </div>
              <div className="relative">
                <input id="company" name="company" maxLength={120} autoComplete="organization" placeholder={t.company} className={field} />
                <label htmlFor="company" className={label}>
                  {t.company}
                </label>
              </div>
            </div>

            <div className="relative">
              <select
                ref={serviceRef}
                id="service"
                name="service"
                defaultValue=""
                aria-label={t.service}
                className="w-full appearance-none rounded-2xl border border-line bg-white px-4 py-4 text-[16px] text-ink outline-none transition-all hover:border-accent/40 focus:border-accent focus:ring-4 focus:ring-accent/15"
              >
                <option value="" disabled>
                  {t.service}
                </option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
                <option value={t.other}>{t.other}</option>
              </select>
              <span aria-hidden className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-accent-ink">
                ▾
              </span>
            </div>

            <fieldset>
              <legend className="mb-3 mt-2 text-[14px] text-muted">{t.budget}</legend>
              <div className="flex flex-wrap gap-2">
                {t.budgets.map((b) => (
                  <button
                    key={b}
                    type="button"
                    aria-pressed={budget === b}
                    onClick={() => setBudget(budget === b ? "" : b)}
                    className={`relative isolate rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                      budget === b ? "text-white" : "bg-mist text-ink-soft ring-1 ring-accent/10 hover:bg-cream"
                    }`}
                  >
                    {budget === b && (
                      <m.span
                        layoutId="budget-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-accent shadow-[0_8px_20px_-8px_rgba(255,107,0,0.8)]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {b}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="relative">
              <textarea id="message" name="message" required minLength={5} maxLength={4000} rows={5} placeholder={t.message} className={`${field} resize-none`} />
              <label htmlFor="message" className={label}>
                {t.message} *
              </label>
            </div>

            {error && (
              <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-[14px] text-red-700">
                {error}
              </p>
            )}

            <div className="flex flex-col-reverse items-center justify-between gap-4 pt-2 sm:flex-row">
              <p className="flex items-center gap-2 text-[13px] text-muted">
                <Mail className="h-4 w-4 shrink-0 text-accent-ink" aria-hidden /> {t.note}
              </p>
              <button type="submit" className="btn btn-primary group w-full shrink-0 !px-8 sm:w-auto">
                {t.submit} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </button>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
