export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="lg-mark" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFA62B" />
          <stop offset="0.5" stopColor="#FF6B00" />
          <stop offset="1" stopColor="#F43F1A" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#lg-mark)" />
      <circle cx="13.5" cy="11.5" r="2.6" fill="white" />
      <rect x="11" y="16.5" width="5" height="13" rx="2.5" fill="white" />
      <path d="M21 13.5h9.5M25.75 13.5v16" stroke="white" strokeWidth="4.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className={`transition-all duration-500 ${compact ? "h-8 w-8" : "h-9 w-9"}`} />
      <span className={`text-[17px] font-semibold tracking-[-0.03em] ${dark ? "text-white" : "text-ink"}`} lang="en">
        InfoTech<span className="font-normal opacity-55"> Solution</span>
      </span>
    </span>
  );
}
