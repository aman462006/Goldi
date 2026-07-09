"use client";

import { Sun, ArrowUp } from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { processSteps } from "@/data/process";

export function Footer() {
  const { scrollTo } = useLenis();
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-5 pt-20 pb-10 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric-400/50 to-transparent" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-electric-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-electric-400 to-plasma-500">
                <Sun className="h-4.5 w-4.5 text-white" />
              </span>
              <span className="text-lg font-semibold">
                TOPCon <span className="text-white/40">/ Journey</span>
              </span>
            </div>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/50">
              An interactive guide to Tunnel Oxide Passivated Contact solar cell
              manufacturing — from a bare silicon wafer to a tested, high-efficiency
              bifacial photovoltaic device. Every step, physics principle, chemical
              reaction and layer, visualized.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["25%+ efficiency", "1.5 nm tunnel oxide", "n-type bifacial", "Fraunhofer ISE · 2013"].map(
                (t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
              The 10-step flow
            </h4>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {processSteps.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo("#process", { offset: -60 })}
                  className="flex items-center gap-2 text-left text-[13px] text-white/50 transition-colors hover:text-white/85"
                >
                  <span
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: s.accent }}
                  />
                  <span className="truncate">
                    {s.step}. {s.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-[12px] text-white/35">
            Built as an educational experience. Technical content sourced from TOPCon,
            ALD, LPCVD &amp; PECVD process references.
          </p>
          <button
            onClick={() => scrollTo("#hero", { offset: 0 })}
            className="group flex items-center gap-2 rounded-full glass px-4 py-2 text-[12px] font-medium text-white/60 transition-colors hover:text-white"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
