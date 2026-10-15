"use client";

import { motion } from "motion/react";

const bars = [42, 64, 50, 78, 58, 88, 70, 96, 74, 100, 84, 92];
const ease = [0.22, 1, 0.36, 1] as const;

/** Pure-CSS laptop-style browser window showing a live analytics dashboard. */
export function DeviceMockup() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="rounded-[20px] bg-gradient-to-b from-neutral-700 to-neutral-900 p-[6px] shadow-[0_50px_120px_-30px_rgba(0,30,90,0.45),0_30px_60px_-30px_rgba(0,0,0,0.5)] md:rounded-[28px] md:p-[10px]">
        <div className="overflow-hidden rounded-[15px] bg-[#0b0b0f] md:rounded-[20px]">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <div className="mx-auto hidden rounded-md bg-white/[0.06] px-16 py-1 font-mono text-[11px] text-neutral-400 sm:block">
              app.yourbusiness.com
            </div>
          </div>

          <div className="grid grid-cols-12 gap-3 p-3 md:gap-4 md:p-5">
            {/* Sidebar */}
            <div className="col-span-3 hidden space-y-2 md:block">
              {["Overview", "Revenue", "Customers", "Orders", "Reports"].map((l, i) => (
                <div
                  key={l}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] ${
                    i === 0 ? "bg-white/[0.08] text-white" : "text-neutral-500"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-sky-400" : "bg-neutral-600"}`} />
                  {l}
                </div>
              ))}
              <div className="mt-6 rounded-xl bg-gradient-to-br from-accent/40 to-violet/40 p-3">
                <p className="text-[11px] font-medium text-white">AI insight</p>
                <p className="mt-1 text-[10px] leading-snug text-white/70">Weekend sales up 18%. Boost ads Fri–Sat.</p>
              </div>
            </div>

            {/* Main */}
            <div className="col-span-12 space-y-3 md:col-span-9 md:space-y-4">
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {[
                  { k: "Revenue", v: "৳ 24.8L", d: "+32%", c: "text-emerald-400" },
                  { k: "Visitors", v: "182K", d: "+248%", c: "text-sky-400" },
                  { k: "Conversion", v: "6.4%", d: "+1.9pt", c: "text-fuchsia-400" },
                ].map((s, i) => (
                  <motion.div
                    key={s.k}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.12, duration: 0.7, ease }}
                    className="rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/[0.06] md:p-4"
                  >
                    <p className="text-[9px] text-neutral-500 md:text-[11px]">{s.k}</p>
                    <p className="mt-1 text-[13px] font-semibold tracking-tight text-white md:text-xl">{s.v}</p>
                    <p className={`text-[9px] md:text-[11px] ${s.c}`}>{s.d}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-5 gap-2 md:gap-4">
                {/* Line chart */}
                <div className="col-span-3 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/[0.06] md:p-4">
                  <p className="text-[10px] text-neutral-400 md:text-[12px]">Growth</p>
                  <svg viewBox="0 0 300 110" className="mt-2 h-20 w-full md:h-32" preserveAspectRatio="none" aria-hidden>
                    <defs>
                      <linearGradient id="dm-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#38bdf8" stopOpacity="0.35" />
                        <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="dm-line" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#38bdf8" />
                        <stop offset="1" stopColor="#c084fc" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M0 95 C30 90 45 70 75 72 S120 50 150 55 S200 30 225 32 S270 12 300 8 L300 110 L0 110Z"
                      fill="url(#dm-area)"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.4, duration: 1 }}
                    />
                    <motion.path
                      d="M0 95 C30 90 45 70 75 72 S120 50 150 55 S200 30 225 32 S270 12 300 8"
                      fill="none"
                      stroke="url(#dm-line)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, duration: 1.8, ease }}
                    />
                  </svg>
                </div>
                {/* Bars */}
                <div className="col-span-2 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/[0.06] md:p-4">
                  <p className="text-[10px] text-neutral-400 md:text-[12px]">Orders</p>
                  <div className="mt-2 flex h-20 items-end gap-[3px] md:h-32 md:gap-1.5">
                    {bars.map((h, i) => (
                      <motion.span
                        key={i}
                        className="flex-1 origin-bottom rounded-t-[3px] bg-gradient-to-t from-violet to-pink"
                        style={{ height: `${h}%` }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9 + i * 0.05, duration: 0.8, ease }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden grid-cols-2 gap-4 sm:grid">
                {[
                  { t: "Deploy #482 succeeded", s: "Production · 42s ago", c: "bg-emerald-400" },
                  { t: "Lighthouse score 100", s: "Performance · SEO · A11y", c: "bg-sky-400" },
                ].map((r) => (
                  <div key={r.t} className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/[0.06]">
                    <span className={`h-2 w-2 animate-pulse rounded-full ${r.c}`} />
                    <div>
                      <p className="text-[12px] text-white">{r.t}</p>
                      <p className="text-[10px] text-neutral-500">{r.s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Laptop base */}
      <div className="mx-auto h-3 w-[104%] -translate-x-[2%] rounded-b-[18px] bg-gradient-to-b from-neutral-300 to-neutral-400 md:h-5" />
      <div className="mx-auto h-1.5 w-[30%] rounded-b-xl bg-neutral-400/70" />
    </div>
  );
}

/** Small phone mockup that floats beside the laptop. */
export function PhoneMockup() {
  return (
    <div className="w-[150px] rounded-[30px] bg-neutral-900 p-[5px] shadow-[0_30px_80px_-20px_rgba(60,0,120,0.5)] md:w-[200px] md:rounded-[38px] md:p-[7px]">
      <div className="relative overflow-hidden rounded-[25px] bg-gradient-to-b from-[#1a1033] to-[#0b0b0f] px-3 pb-4 pt-7 md:rounded-[31px] md:px-4 md:pt-9">
        <span className="absolute left-1/2 top-2 h-4 w-14 -translate-x-1/2 rounded-full bg-black md:h-5 md:w-20" />
        <p className="text-[9px] text-neutral-400 md:text-[11px]">Wallet balance</p>
        <p className="text-[17px] font-semibold tracking-tight text-white md:text-2xl">৳ 48,250</p>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {["Send", "Pay", "Top-up"].map((a, i) => (
            <div key={a} className="flex flex-col items-center gap-1">
              <span
                className="h-7 w-7 rounded-full md:h-9 md:w-9"
                style={{ background: ["#0071e3", "#7c3aed", "#ec4899"][i] }}
              />
              <span className="text-[8px] text-neutral-400 md:text-[10px]">{a}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          {["Grocery", "Transport", "Salary"].map((t, i) => (
            <div key={t} className="flex items-center justify-between rounded-lg bg-white/[0.06] px-2 py-1.5">
              <span className="text-[8px] text-neutral-300 md:text-[10px]">{t}</span>
              <span className={`text-[8px] md:text-[10px] ${i === 2 ? "text-emerald-400" : "text-neutral-400"}`}>
                {i === 2 ? "+৳ 65,000" : `-৳ ${[1240, 380][i]}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
