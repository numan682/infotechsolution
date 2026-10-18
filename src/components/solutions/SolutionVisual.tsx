import type { CSSProperties } from "react";
import { BadgeCheck, BellRing, Camera, Check, Lock, MapPin, Navigation, ScanLine, Satellite, ShieldCheck } from "lucide-react";
import type { SolutionVisual as VisualKind } from "@/lib/solutions";

/*
 * Product visuals for the solution pages. Pure SVG + CSS animation (SMIL for motion
 * along a path), rendered on the server: zero client JavaScript.
 */

type Labels = Record<string, string | string[]>;
const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v.join(" ") : (v ?? ""));

export function SolutionVisual({ kind, labels }: { kind: VisualKind; labels: Labels }) {
  if (kind === "fleet") return <FleetVisual t={labels} />;
  if (kind === "plate") return <PlateVisual t={labels} />;
  return <FieldVisual t={labels} />;
}

/* ---------- shared bits ---------- */

const streets = [
  "M0 70 H400", "M0 150 H400", "M0 230 H400", "M60 0 V300", "M170 0 V300", "M290 0 V300",
  "M0 300 L120 190 L250 120 L400 40", "M230 300 C 260 240, 330 220, 400 210",
];

function MapBase({ dark = true }: { dark?: boolean }) {
  return (
    <>
      <rect width="400" height="300" fill={dark ? "#1a120d" : "#fff7f1"} />
      {/* blocks & park */}
      <rect x="72" y="82" width="86" height="56" rx="6" fill={dark ? "#221812" : "#ffeede"} />
      <rect x="182" y="162" width="96" height="56" rx="6" fill={dark ? "#221812" : "#ffeede"} />
      <rect x="302" y="82" width="86" height="56" rx="6" fill={dark ? "#1d2a1a" : "#e9f5e1"} />
      {/* river */}
      <path d="M-10 260 C 80 235, 140 290, 230 262 S 360 240, 410 268" stroke={dark ? "#24384a" : "#cfe6f5"} strokeWidth="16" fill="none" />
      {streets.map((d) => (
        <path key={d} d={d} stroke={dark ? "#3a2b21" : "#f3dccb"} strokeWidth="7" fill="none" strokeLinecap="round" />
      ))}
      {streets.map((d) => (
        <path key={`c${d}`} d={d} stroke={dark ? "#4a382c" : "#ffffff"} strokeWidth="1" strokeDasharray="5 7" fill="none" />
      ))}
    </>
  );
}

function Toast({ icon, text, tone, delay, className }: { icon: React.ReactNode; text: string; tone: string; delay: string; className: string }) {
  return (
    <div
      className={`absolute z-10 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-[12px] font-semibold text-ink shadow-[0_18px_40px_-14px_rgba(0,0,0,0.45)] md:text-[13px] ${className}`}
      style={{ animation: `toast-cycle 8s ease-in-out ${delay} infinite both` }}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ background: tone }}>
        {icon}
      </span>
      {text}
    </div>
  );
}

/* ---------- GPS / fleet ---------- */

const route = "M40 300 L40 230 L170 230 L170 150 L290 150 L290 70 L360 70";

function FleetVisual({ t }: { t: Labels }) {
  return (
    <div aria-hidden className="relative">
      <div className="overflow-hidden rounded-[28px] bg-[#120c08] p-2 shadow-[0_40px_100px_-30px_rgba(160,60,0,0.55)] ring-1 ring-black/10 md:p-3">
        <div className="relative overflow-hidden rounded-[22px]">
          <svg viewBox="0 0 400 300" className="block h-auto w-full">
            <MapBase />
            {/* geofence */}
            <path d="M190 40 L380 40 L380 130 L190 130 Z" fill="rgba(255,107,0,0.10)" stroke="#ff6b00" strokeWidth="1.5" strokeDasharray="6 5" />
            {/* route */}
            <path d={route} stroke="#ff6b00" strokeOpacity="0.25" strokeWidth="8" fill="none" strokeLinejoin="round" strokeLinecap="round" />
            <path
              d={route}
              stroke="url(#fleet-route)"
              strokeWidth="4"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="900"
              style={{ "--len": 900, animation: "draw-path 2.4s cubic-bezier(0.22,1,0.36,1) 0.4s both" } as CSSProperties}
            />
            <defs>
              <linearGradient id="fleet-route" x1="0" y1="1" x2="1" y2="0">
                <stop stopColor="#ffc24b" />
                <stop offset="1" stopColor="#ff4d17" />
              </linearGradient>
            </defs>
            {/* parked vehicles */}
            {[
              [110, 70],
              [330, 230],
              [60, 150],
            ].map(([x, y]) => (
              <g key={`${x}${y}`}>
                <circle cx={x} cy={y} r="7" fill="#2a1d14" stroke="#ffa62b" strokeWidth="2" />
              </g>
            ))}
            {/* moving vehicle */}
            <g>
              <circle r="16" fill="#ff6b00" opacity="0.25">
                <animateMotion dur="9s" repeatCount="indefinite" path={route} />
              </circle>
              <circle r="8" fill="#ff6b00" stroke="#fff" strokeWidth="3">
                <animateMotion dur="9s" repeatCount="indefinite" path={route} />
              </circle>
            </g>
            {/* destination pin */}
            <g transform="translate(360 70)">
              <circle r="10" fill="#fff" />
              <circle r="5" fill="#ff4d17" />
            </g>
          </svg>

          {/* fleet panel */}
          <div className="absolute left-3 top-3 w-[44%] max-w-[210px] rounded-2xl bg-white/95 p-3 shadow-xl md:left-4 md:top-4">
            <div className="flex items-center justify-between text-[11px] font-semibold text-ink md:text-[12px]">
              <span>{str(t.fleet)}</span>
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> {str(t.online)}
              </span>
            </div>
            <div className="mt-2 rounded-xl bg-mist p-2">
              <p className="truncate font-mono text-[9px] text-ink-soft md:text-[10px]">{str(t.plate)}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 md:text-[11px]">
                  <Navigation className="h-3 w-3" /> {str(t.moving)}
                </span>
                <span className="text-[10px] font-bold text-ink md:text-[11px]">{str(t.speed)}</span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-ink-soft md:text-[11px]">
              <span>{str(t.today)}</span>
              <span className="font-bold text-ink">{str(t.distance)}</span>
            </div>
          </div>

          <Toast icon={<BellRing className="h-3.5 w-3.5" />} text={str(t.alert)} tone="#ff6b00" delay="1.2s" className="bottom-3 left-3 md:bottom-4 md:left-4" />
          <Toast icon={<Lock className="h-3.5 w-3.5" />} text={str(t.lock)} tone="#1c1410" delay="5.2s" className="bottom-3 right-3 md:bottom-4 md:right-4" />
        </div>
      </div>
      <span className="absolute -right-3 -top-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-ink shadow-lg ring-1 ring-accent/15">
        <Satellite className="h-3.5 w-3.5 text-accent-ink" /> GPS
      </span>
    </div>
  );
}

/* ---------- Smart Tag / number plate ---------- */

// Decorative QR-style matrix (deterministic, not a real code).
const QR_N = 25;
const qrPath = (() => {
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const finder = (x: number, y: number) => (x < 8 && y < 8) || (x >= QR_N - 8 && y < 8) || (x < 8 && y >= QR_N - 8);
  let d = "";
  for (let y = 0; y < QR_N; y++)
    for (let x = 0; x < QR_N; x++) if (!finder(x, y) && rnd() > 0.52) d += `M${x} ${y}h1v1h-1z`;
  return d;
})();

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="7" height="7" fill="#1c1410" />
      <rect x="1" y="1" width="5" height="5" fill="#fff" />
      <rect x="2" y="2" width="3" height="3" fill="#1c1410" />
    </g>
  );
}

function PlateVisual({ t }: { t: Labels }) {
  return (
    <div aria-hidden className="relative mx-auto max-w-[560px] pb-40 pt-8 md:pb-36">
      <div className="absolute inset-x-10 top-10 h-48 rounded-full bg-accent/25 blur-3xl" />
      {/* the plate */}
      <div className="relative rotate-[-3deg] rounded-[22px] bg-gradient-to-b from-neutral-200 to-neutral-400 p-2 shadow-[0_40px_80px_-30px_rgba(120,50,0,0.6)] transition-transform duration-700 hover:rotate-0">
        <div className="relative grid grid-cols-[auto_1fr] items-center gap-4 rounded-[16px] bg-white p-4 ring-2 ring-ink md:gap-6 md:p-6">
          <div className="relative overflow-hidden rounded-lg bg-white p-1 ring-1 ring-black/10">
            <svg viewBox={`-1 -1 ${QR_N + 2} ${QR_N + 2}`} className="h-24 w-24 md:h-32 md:w-32" shapeRendering="crispEdges">
              <rect x="-1" y="-1" width={QR_N + 2} height={QR_N + 2} fill="#fff" />
              <path d={qrPath} fill="#1c1410" />
              <Finder x={0} y={0} />
              <Finder x={QR_N - 7} y={0} />
              <Finder x={0} y={QR_N - 7} />
              <rect x={QR_N / 2 - 2.5} y={QR_N / 2 - 2.5} width="5" height="5" rx="1" fill="#ff6b00" />
            </svg>
            <span
              className="absolute inset-x-1 top-1 h-0.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(255,107,0,0.8)]"
              style={{ "--sweep": "calc(100% + 5.5rem)", animation: "scan-sweep 2.6s ease-in-out infinite" } as CSSProperties}
            />
          </div>
          <div className="min-w-0 text-center" lang="bn" style={{ fontFamily: "var(--font-bangla)" }}>
            <p className="text-[clamp(1rem,3.4vw,1.6rem)] font-bold leading-none text-ink">ঢাকা মেট্রো-রি</p>
            <p className="mt-2 text-[clamp(2rem,8vw,3.6rem)] font-bold leading-none tracking-wide text-ink">১২-৩৪৫৬</p>
          </div>
          {/* GPS module */}
          <span className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center md:h-14 md:w-14">
            <span className="absolute inset-0 rounded-full bg-accent/40" style={{ animation: "signal-ring 2.2s ease-out infinite" }} />
            <span className="absolute inset-0 rounded-full bg-accent/40" style={{ animation: "signal-ring 2.2s ease-out 1.1s infinite" }} />
            <span className="relative flex h-full w-full items-center justify-center rounded-full bg-sunset text-white shadow-lg ring-4 ring-white">
              <Satellite className="h-5 w-5 md:h-6 md:w-6" />
            </span>
          </span>
        </div>
      </div>

      {/* verification card on a phone */}
      <div className="absolute bottom-0 right-0 w-[62%] max-w-[270px] rotate-[2deg] rounded-[26px] bg-ink p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] md:right-4">
        <div className="rounded-[21px] bg-white p-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
              <BadgeCheck className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-[13px] font-bold text-ink">{str(t.verified)}</p>
              <p className="text-[11px] text-ink-soft">{str(t.registered)}</p>
            </div>
          </div>
          <ul className="mt-3 space-y-1.5 text-[11px] text-ink-soft">
            {[t.zone, t.permit, t.owner].map((line) => (
              <li key={str(line)} className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={3} /> {str(line)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <span className="absolute left-0 top-0 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-ink shadow-lg ring-1 ring-accent/15">
        <ScanLine className="h-3.5 w-3.5 text-accent-ink" /> {str(t.scan)}
      </span>
      <span className="absolute bottom-16 left-2 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-ink shadow-lg ring-1 ring-accent/15">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> {str(t.live)}
      </span>
    </div>
  );
}

/* ---------- Employee / field check-in ---------- */

function FieldVisual({ t }: { t: Labels }) {
  const stops = Array.isArray(t.stops) ? t.stops : [];
  return (
    <div aria-hidden className="relative mx-auto grid max-w-[560px] grid-cols-1 items-end gap-4 sm:grid-cols-[1fr_auto]">
      {/* timeline card */}
      <div className="relative z-10 order-2 rounded-[24px] bg-white p-4 shadow-[0_30px_70px_-25px_rgba(120,50,0,0.45)] ring-1 ring-accent/10 sm:order-none sm:mb-8 md:p-5">
        <p className="text-[12px] font-semibold text-ink-soft">{str(t.visits)}</p>
        <p className="text-[18px] font-bold tracking-tight text-ink md:text-[20px]">{str(t.progress)}</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mist">
          <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-amber to-accent" />
        </div>
        <ol className="relative mt-4 space-y-3">
          <span className="absolute bottom-2 left-[9px] top-2 w-px bg-line" />
          {stops.map((s, i) => {
            const done = i < 3;
            return (
              <li key={s} className="relative flex items-center gap-3 text-[12px] md:text-[13px]">
                <span
                  className={`relative flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full ${
                    done ? "bg-emerald-500 text-white" : i === 3 ? "bg-white ring-2 ring-accent" : "bg-white ring-2 ring-line"
                  }`}
                >
                  {done && <Check className="h-3 w-3" strokeWidth={3.5} />}
                </span>
                <span className={done ? "font-medium text-ink" : "text-ink-soft"}>{s}</span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* phone with geofence map */}
      <div className="relative w-[230px] justify-self-center rounded-[34px] bg-ink p-1.5 shadow-[0_40px_80px_-25px_rgba(0,0,0,0.55)] sm:w-[200px] sm:justify-self-auto md:w-[230px]">
        <div className="relative overflow-hidden rounded-[29px] bg-white">
          <span className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
          <svg viewBox="0 0 230 300" className="block h-auto w-full">
            <rect width="230" height="300" fill="#fff7f1" />
            {["M0 90 H230", "M0 200 H230", "M70 0 V300", "M165 0 V300", "M0 280 L230 120"].map((d) => (
              <path key={d} d={d} stroke="#f3dccb" strokeWidth="9" fill="none" strokeLinecap="round" />
            ))}
            <rect x="82" y="102" width="70" height="86" rx="8" fill="#ffeede" />
            {/* geofence */}
            <circle cx="117" cy="145" r="54" fill="rgba(255,107,0,0.12)" stroke="#ff6b00" strokeWidth="1.5" strokeDasharray="5 4" />
            <circle cx="117" cy="145" r="54" fill="none" stroke="#ff6b00" strokeOpacity="0.5" strokeWidth="1">
              <animate attributeName="r" values="40;62;40" dur="3s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* site pin */}
            <path d="M117 112 c-11 0 -19 8 -19 18 c0 13 19 31 19 31 s19 -18 19 -31 c0 -10 -8 -18 -19 -18z" fill="#ff4d17" />
            <circle cx="117" cy="130" r="6.5" fill="#fff" />
            {/* employee walking into the fence */}
            <path id="walk" d="M20 280 L70 230 L95 172" fill="none" stroke="#c44100" strokeWidth="2" strokeDasharray="3 4" />
            <circle r="7" fill="#1c1410" stroke="#fff" strokeWidth="3">
              <animateMotion dur="5s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="linear" path="M20 280 L70 230 L95 172" />
            </circle>
          </svg>
          {/* check-in card */}
          <div className="absolute inset-x-2.5 bottom-2.5 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-ink">
                  {str(t.checkedIn)} · {str(t.time)}
                </p>
                <p className="truncate text-[10.5px] text-ink-soft">{str(t.within)}</p>
              </div>
            </div>
            <p className="mt-2 flex items-center gap-1.5 truncate text-[10.5px] font-medium text-ink-soft">
              <MapPin className="h-3 w-3 shrink-0 text-accent-ink" /> {str(t.client)}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-[10.5px] font-medium text-ink-soft">
              <Camera className="h-3 w-3 shrink-0 text-accent-ink" /> {str(t.proof)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
