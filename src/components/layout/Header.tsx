"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Mail, Phone } from "lucide-react";
import { basePath, localePath, type Lang } from "@/i18n/config";
import type { Dict } from "@/content";
import type { IconName } from "@/lib/services";
import { navPaths, site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

type NavService = { slug: string; title: string; short: string; icon: IconName; gradient: [string, string] };
type Props = { lang: Lang; nav: Dict["nav"]; services: NavService[] };

const spring = { type: "spring", stiffness: 380, damping: 34, mass: 0.8 } as const;
const ease = [0.22, 1, 0.36, 1] as const;

export function Header({ lang, nav, services }: Props) {
  const pathname = usePathname();
  const path = basePath(pathname);
  const lenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The mobile menu is "open for a given path", so it closes itself on navigation.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const toggleMenu = () => setOpenPath(open ? null : pathname);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenPath(null);
      setMegaOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const href = (p: string) => localePath(lang, p);
  const isActive = (p: string) => path.startsWith(p);
  const activeKey = navPaths.find(isActive) ?? null;
  const pillKey = hovered ?? activeKey;

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {nav.skip}
      </a>

      {/* Reading progress */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-amber via-accent to-coral"
        style={{ scaleX: progress }}
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 md:px-5">
        <motion.div
          className="pointer-events-auto relative w-full"
          initial={false}
          animate={{
            maxWidth: scrolled ? 960 : 1240,
            marginTop: scrolled ? 12 : 0,
            borderRadius: scrolled ? 999 : 0,
            backgroundColor: scrolled || open ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0)",
            boxShadow: scrolled
              ? "0 12px 40px -12px rgba(120,50,0,0.22), 0 0 0 1px rgba(255,107,0,0.10)"
              : "0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0)",
          }}
          transition={spring}
          style={{ backdropFilter: scrolled || open ? "saturate(180%) blur(22px)" : "none", WebkitBackdropFilter: scrolled || open ? "saturate(180%) blur(22px)" : "none" }}
          onMouseLeave={closeMega}
        >
          <motion.nav
            aria-label="Main"
            className="flex items-center justify-between gap-3"
            initial={false}
            animate={{ height: scrolled ? 60 : 76, paddingLeft: scrolled ? 10 : 8, paddingRight: scrolled ? 8 : 8 }}
            transition={spring}
          >
            <Link href={href("/")} aria-label={`${site.name} — ${nav.home}`} className="relative z-10 shrink-0 rounded-full px-2 py-1">
              <Logo compact={scrolled} />
            </Link>

            {/* Desktop links with a highlight that glides between items */}
            <ul className="relative hidden items-center lg:flex" onMouseLeave={() => setHovered(null)}>
              {navPaths.map((p) => {
                const isServices = p === "/services/";
                return (
                  <li
                    key={p}
                    className="relative"
                    onMouseEnter={() => {
                      setHovered(p);
                      if (isServices) openMega();
                      else closeMega();
                    }}
                  >
                    <Link
                      href={href(p)}
                      aria-current={isActive(p) ? "page" : undefined}
                      onFocus={() => (isServices ? openMega() : setMegaOpen(false))}
                      className={`relative z-10 flex items-center gap-1 rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors duration-300 ${
                        pillKey === p ? "text-ink" : "text-ink-soft/80 hover:text-ink"
                      }`}
                    >
                      {nav.labels[p]}
                      {isServices && (
                        <ChevronDown
                          aria-hidden
                          className={`h-3.5 w-3.5 transition-transform duration-300 ${megaOpen ? "rotate-180 text-accent" : ""}`}
                        />
                      )}
                      {isActive(p) && (
                        <span aria-hidden className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
                      )}
                    </Link>
                    {pillKey === p && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-accent/[0.09] ring-1 ring-accent/15"
                        transition={spring}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <LangToggle lang={lang} path={path} label={nav.language} />
              <Link href={href("/contact/")} className="btn btn-primary group hidden !min-h-10 !px-5 !py-2 !text-[14px] sm:inline-flex">
                {nav.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <MenuButton open={open} onClick={toggleMenu} label={open ? nav.closeMenu : nav.openMenu} />
            </div>
          </motion.nav>

          {/* Services mega menu (desktop) */}
          <AnimatePresence>
            {megaOpen && (
              <motion.div
                className="absolute left-1/2 top-full hidden w-[min(940px,calc(100vw-40px))] -translate-x-1/2 pt-3 lg:block"
                initial={{ opacity: 0, y: -10, scale: 0.97, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, scale: 0.98, filter: "blur(4px)" }}
                transition={{ duration: 0.32, ease }}
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <div className="grid grid-cols-[1fr_260px] gap-3 rounded-[28px] bg-white p-3 shadow-[0_30px_80px_-20px_rgba(120,50,0,0.3)] ring-1 ring-accent/10">
                  <div>
                    <p className="px-3 pb-2 pt-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">{nav.servicesMenuTitle}</p>
                    <motion.ul
                      className="grid grid-cols-2 gap-1"
                      initial="hidden"
                      animate="show"
                      variants={{ show: { transition: { staggerChildren: 0.025 } } }}
                    >
                      {services.map((s) => (
                        <motion.li
                          key={s.slug}
                          variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease } } }}
                        >
                          <Link
                            href={href(`/services/${s.slug}/`)}
                            onClick={() => setMegaOpen(false)}
                            className="group flex items-start gap-3 rounded-2xl p-3 transition-colors duration-300 hover:bg-mist"
                          >
                            <span
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-[0_8px_18px_-8px_rgba(255,107,0,0.8)] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-110 group-hover:-rotate-6"
                              style={{ background: `linear-gradient(135deg, ${s.gradient[0]}, ${s.gradient[1]})` }}
                            >
                              <Icon name={s.icon} className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[14.5px] font-semibold text-ink">{s.title}</span>
                              <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-snug text-muted">{s.short}</span>
                            </span>
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                  <div className="bg-sunset noise relative flex flex-col overflow-hidden rounded-[22px] p-6 text-white">
                    <span aria-hidden className="dots-light absolute inset-0 opacity-40" />
                    <span aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sun/60 blur-3xl" />
                    <p className="relative text-[20px] font-semibold leading-snug">{nav.servicesMenuPromoTitle}</p>
                    <p className="relative mt-2 text-[13.5px] leading-relaxed text-white/85">{nav.servicesMenuPromoBody}</p>
                    <div className="relative mt-auto space-y-2 pt-6">
                      <Link href={href("/contact/")} onClick={() => setMegaOpen(false)} className="btn btn-light w-full !min-h-10 !text-[14px]">
                        {nav.cta} <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                      <Link
                        href={href("/services/")}
                        onClick={() => setMegaOpen(false)}
                        className="btn btn-outline-light w-full !min-h-10 !text-[14px]"
                      >
                        {nav.servicesMenuAll}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      <MobileMenu open={open} lang={lang} nav={nav} services={services} path={path} onNavigate={() => setOpenPath(null)} />
    </>
  );
}

/** EN | বাং segmented switch with a sliding knob. Links to the same page in the other language. */
function LangToggle({ lang, path, label }: { lang: Lang; path: string; label: string }) {
  const options: { l: Lang; text: string }[] = [
    { l: "en", text: "EN" },
    { l: "bn", text: "বাং" },
  ];
  return (
    <div role="group" aria-label={label} className="relative flex items-center rounded-full bg-ink/[0.05] p-1 ring-1 ring-black/[0.04]">
      {options.map((o) => {
        const active = o.l === lang;
        return (
          <Link
            key={o.l}
            href={localePath(o.l, path)}
            hrefLang={o.l}
            lang={o.l}
            aria-current={active ? "true" : undefined}
            className={`relative z-10 flex h-8 min-w-10 items-center justify-center rounded-full px-2.5 text-[13px] font-semibold transition-colors duration-300 ${
              active ? "text-white" : "text-ink-soft hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-knob"
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-accent shadow-[0_6px_16px_-6px_rgba(255,107,0,0.9)]"
                transition={spring}
              />
            )}
            {o.text}
          </Link>
        );
      })}
    </div>
  );
}

function MenuButton({ open, onClick, label }: { open: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={open}
      aria-controls="mobile-menu"
      onClick={onClick}
      className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition-transform active:scale-95 lg:hidden"
    >
      <span className="relative block h-3 w-[18px]">
        <motion.span
          className="absolute left-0 top-0 block h-[2px] w-full rounded-full bg-white"
          animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.4, ease }}
        />
        <motion.span
          className="absolute bottom-0 left-0 block h-[2px] rounded-full bg-white"
          animate={open ? { rotate: -45, y: -5, width: "100%" } : { rotate: 0, y: 0, width: "60%" }}
          transition={{ duration: 0.4, ease }}
        />
      </span>
    </button>
  );
}

function MobileMenu({
  open,
  lang,
  nav,
  services,
  path,
  onNavigate,
}: {
  open: boolean;
  lang: Lang;
  nav: Dict["nav"];
  services: NavService[];
  path: string;
  onNavigate: () => void;
}) {
  const href = (p: string) => localePath(lang, p);
  const items = ["/", ...navPaths];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-white px-6 pb-8 pt-28 lg:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)", transition: { duration: 0.5, ease, delay: 0.1 } }}
          transition={{ duration: 0.7, ease }}
          data-lenis-prevent
        >
          <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-[90px]" />
          <span aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber/25 blur-[90px]" />

          <motion.ul
            className="relative flex flex-col"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
              hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
            }}
          >
            {items.map((p, i) => {
              const active = p === "/" ? path === "/" : path.startsWith(p);
              return (
                <motion.li
                  key={p}
                  className="border-b border-line/70"
                  variants={{
                    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease } },
                  }}
                >
                  <Link href={href(p)} onClick={onNavigate} className="group flex items-center gap-4 py-3.5">
                    <span className="w-6 font-mono text-[12px] text-accent">0{i + 1}</span>
                    <span className={`flex-1 text-[30px] font-semibold tracking-[-0.03em] ${active ? "text-accent" : "text-ink"}`}>
                      {p === "/" ? nav.home : nav.labels[p]}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted transition-transform duration-300 group-active:rotate-45" aria-hidden />
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div
            className="relative mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.5, ease } }}
            exit={{ opacity: 0 }}
          >
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">{nav.servicesMenuTitle}</p>
            <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={href(`/services/${s.slug}/`)}
                  onClick={onNavigate}
                  className="flex shrink-0 items-center gap-2 rounded-full bg-mist py-2 pl-2 pr-4 text-[13.5px] font-medium text-ink ring-1 ring-accent/10"
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-white"
                    style={{ background: `linear-gradient(135deg, ${s.gradient[0]}, ${s.gradient[1]})` }}
                  >
                    <Icon name={s.icon} className="h-3.5 w-3.5" />
                  </span>
                  {s.title}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative mt-auto space-y-3 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.5, ease } }}
            exit={{ opacity: 0 }}
          >
            <Link href={href("/contact/")} onClick={onNavigate} className="btn btn-primary w-full !min-h-12 !text-base">
              {nav.cta} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <div className="grid grid-cols-[1.35fr_1fr] gap-2">
              <a href={`tel:${site.phoneHref}`} className="btn btn-ghost whitespace-nowrap !px-3 !text-[13.5px]">
                <Phone className="h-4 w-4" aria-hidden /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="btn btn-ghost !px-3 !text-[13.5px]">
                <Mail className="h-4 w-4" aria-hidden /> {nav.email}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
