"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const budgets = ["< $1k", "$1k – $5k", "$5k – $15k", "$15k – $50k", "$50k+"];
type Status = "idle" | "sending" | "sent" | "error";

const field =
  "peer w-full rounded-2xl border border-black/10 bg-white px-4 pb-2.5 pt-6 text-[16px] text-ink outline-none transition-all duration-300 placeholder:text-transparent focus:border-accent focus:ring-4 focus:ring-accent/10";
const label =
  "pointer-events-none absolute left-4 top-4 origin-left text-[15px] text-muted transition-all duration-300 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [budget, setBudget] = useState("");
  const [startedAt] = useState(() => Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("budget", budget);
    data.set("elapsed", String(Math.round((Date.now() - startedAt) / 1000)));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(site.contactEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
      setBudget("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="card flex min-h-[520px] flex-col items-center justify-center p-10 text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald to-cyan text-white shadow-[0_20px_40px_-12px_rgba(16,185,129,0.6)]"
            >
              <Check className="h-10 w-10" strokeWidth={2.5} aria-hidden />
            </motion.span>
            <h2 className="mt-8 text-[32px] font-bold tracking-[-0.04em] text-ink">Message received.</h2>
            <p className="mt-3 max-w-sm text-muted">Thanks for reaching out! A member of our team will get back to you within one business day.</p>
            <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-8">
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            onSubmit={onSubmit}
            className="card space-y-4 p-6 md:p-10"
            noValidate={false}
          >
            {/* Honeypot: hidden from humans, bots fill it in. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <input id="name" name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={field} />
                <label htmlFor="name" className={label}>
                  Your name *
                </label>
              </div>
              <div className="relative">
                <input id="email" name="email" type="email" required maxLength={150} autoComplete="email" placeholder="Email" className={field} />
                <label htmlFor="email" className={label}>
                  Email address *
                </label>
              </div>
              <div className="relative">
                <input id="phone" name="phone" type="tel" maxLength={30} autoComplete="tel" placeholder="Phone" className={field} />
                <label htmlFor="phone" className={label}>
                  Phone / WhatsApp
                </label>
              </div>
              <div className="relative">
                <input id="company" name="company" maxLength={120} autoComplete="organization" placeholder="Company" className={field} />
                <label htmlFor="company" className={label}>
                  Company
                </label>
              </div>
            </div>

            <div className="relative">
              <select
                id="service"
                name="service"
                defaultValue=""
                className="w-full appearance-none rounded-2xl border border-black/10 bg-white px-4 py-4 text-[16px] text-ink outline-none transition-all focus:border-accent focus:ring-4 focus:ring-accent/10"
              >
                <option value="" disabled>
                  What can we help with?
                </option>
                {services.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Other">Something else</option>
              </select>
              <span aria-hidden className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-muted">
                ▾
              </span>
            </div>

            <fieldset>
              <legend className="mb-3 mt-2 text-[14px] text-muted">Estimated budget</legend>
              <div className="flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <button
                    key={b}
                    type="button"
                    aria-pressed={budget === b}
                    onClick={() => setBudget(budget === b ? "" : b)}
                    className={`relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                      budget === b ? "text-white" : "bg-mist text-ink-soft hover:bg-black/[0.07]"
                    }`}
                  >
                    {budget === b && (
                      <motion.span layoutId="budget-pill" className="absolute inset-0 -z-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                    )}
                    <span className="relative">{b}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="relative">
              <textarea id="message" name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Message" className={`${field} resize-none`} />
              <label htmlFor="message" className={label}>
                Tell us about your project *
              </label>
            </div>

            {status === "error" && (
              <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-[14px] text-red-700">
                {error} You can also email us directly at{" "}
                <a className="font-medium underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </p>
            )}

            <div className="flex flex-col-reverse items-center justify-between gap-4 pt-2 sm:flex-row">
              <p className="text-[13px] text-muted">We reply within 24 hours. Your details stay private.</p>
              <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full !px-8 disabled:opacity-70 sm:w-auto">
                {status === "sending" ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> Sending…
                  </>
                ) : (
                  <>
                    Send message <ArrowRight className="h-4 w-4" aria-hidden />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
