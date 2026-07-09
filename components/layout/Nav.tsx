"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun } from "lucide-react";
import { navSections } from "@/data/nav";
import { useActiveSection } from "@/lib/useActiveSection";
import { useLenis } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";

export function Nav() {
  const ids = navSections.map((s) => s.id);
  const active = useActiveSection(ids);
  const { scrollTo } = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function go(id: string) {
    setMobileOpen(false);
    scrollTo(`#${id}`, { offset: -70 });
  }

  return (
    <>
      {/* Top bar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        {/* Desktop: one cohesive, centered pill */}
        <div className="mx-auto hidden max-w-7xl justify-center px-8 lg:flex">
          <nav className="flex items-center gap-1 rounded-full glass-strong p-1.5 shadow-2xl shadow-black/40">
            <button
              onClick={() => go("hero")}
              className="flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-3.5 transition-colors hover:bg-white/5"
            >
              <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-electric-400 to-plasma-500">
                <Sun className="h-4 w-4 text-white" strokeWidth={2.4} />
                <span className="absolute inset-0 rounded-lg bg-electric-400/40 blur-md" />
              </span>
              <span className="whitespace-nowrap text-sm font-semibold tracking-tight">
                TOPCon<span className="text-white/40"> / Journey</span>
              </span>
            </button>

            <span className="mx-1 h-5 w-px bg-white/10" />

            {navSections.slice(1).map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
                  active === s.id ? "text-white" : "text-white/50 hover:text-white/80",
                )}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile: logo left, actions right */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:hidden">
          <button
            onClick={() => go("hero")}
            className={cn(
              "flex items-center gap-2.5 rounded-full px-3 py-2 transition-all",
              scrolled && "glass-strong",
            )}
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-electric-400 to-plasma-500">
              <Sun className="h-4 w-4 text-white" strokeWidth={2.4} />
              <span className="absolute inset-0 rounded-lg bg-electric-400/40 blur-md" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              TOPCon<span className="text-white/40"> / Journey</span>
            </span>
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full glass-strong"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute inset-x-4 top-20 grid grid-cols-2 gap-2 rounded-3xl glass-strong p-3"
            >
              {navSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                    active === s.id
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right-side mini process map (desktop) */}
      <MiniMap active={active} onGo={go} />
    </>
  );
}

function MiniMap({ active, onGo }: { active: string; onGo: (id: string) => void }) {
  return (
    <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2.5 xl:flex">
      {navSections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => onGo(s.id)}
            className="group flex items-center gap-2.5"
          >
            <span
              className={cn(
                "translate-x-2 whitespace-nowrap rounded-md glass-strong px-2 py-1 text-[11px] font-medium tracking-wide opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
                isActive ? "text-white" : "text-white/60",
              )}
            >
              {s.label}
            </span>
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span
                className={cn(
                  "rounded-full transition-all duration-300",
                  isActive
                    ? "h-2.5 w-2.5 bg-electric-400"
                    : "h-1.5 w-1.5 bg-white/25 group-hover:bg-white/50",
                )}
                style={isActive ? { boxShadow: "0 0 12px #3b8cff" } : undefined}
              />
              {isActive && (
                <motion.span
                  layoutId="minimap-ring"
                  className="absolute inset-0 rounded-full ring-1 ring-electric-400/50"
                  style={{ scale: 2 }}
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
