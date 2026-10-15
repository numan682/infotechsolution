"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Menu is "open for a given path", so it closes automatically on navigation.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) =>
    setOpenPath((v instanceof Function ? v(open) : v) ? pathname : null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    setHidden(y > 320 && y > prev && !open);
  });

  // Lock page scroll while the mobile menu is open.
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenPath(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
            scrolled || open ? "glass shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-transparent"
          }`}
        >
          <nav aria-label="Main" className="container-x flex h-16 items-center justify-between">
            <Link href="/" aria-label={`${site.name} home`} className="relative z-10">
              <Logo />
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative rounded-full px-4 py-2 text-[14px] text-ink-soft transition-colors hover:text-ink"
                  >
                    {isActive(item.href) && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-black/[0.06]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <Link href="/contact/" className="btn btn-primary hidden !min-h-9 !px-4 !py-1.5 !text-[14px] sm:inline-flex">
                Start a project
              </Link>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((o) => !o)}
                className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full md:hidden"
              >
                <span className="relative block h-3.5 w-5">
                  <motion.span
                    className="absolute left-0 top-0 block h-[1.6px] w-5 rounded-full bg-ink"
                    animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.span
                    className="absolute bottom-0 left-0 block h-[1.6px] w-5 rounded-full bg-ink"
                    animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              </button>
            </div>
          </nav>
          <motion.div
            aria-hidden
            className="h-px origin-left bg-gradient-to-r from-accent via-violet to-pink"
            style={{ scaleX: scrollYProgress, opacity: scrolled ? 1 : 0 }}
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="glass fixed inset-0 z-40 flex flex-col px-6 pb-10 pt-24 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.15 } }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } }, hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } } }}
            >
              {[{ href: "/", label: "Home" }, ...nav].map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block py-2 text-[34px] font-semibold tracking-[-0.035em] ${
                      pathname === item.href ? "text-ink" : "text-ink/55"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="mt-auto space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.35 } }}
              exit={{ opacity: 0 }}
            >
              <Link href="/contact/" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a href={`mailto:${site.email}`} className="block text-center text-sm text-muted">
                {site.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
