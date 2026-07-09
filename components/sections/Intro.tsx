"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus, TrendingUp, Zap, ShieldCheck, Recycle } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { DiagramFigure } from "@/components/diagrams/Diagrams";
import {
  cellComparison,
  topconAdvantages,
  topconTradeoffs,
} from "@/data/comparisons";
import { cn } from "@/lib/utils";

const efficiency = [
  { name: "TOPCon", value: 25, color: "#3b8cff", note: "n-type · passivated contact" },
  { name: "HJT", value: 24.5, color: "#7c3aed", note: "heterojunction" },
  { name: "PERC", value: 23.5, color: "#38bdf8", note: "p-type · legacy leader" },
];

const highlights = [
  { icon: TrendingUp, title: "25%+ efficiency", body: "Higher than PERC (23.5%) and HJT (24.5%) — driven by very high open-circuit voltage." },
  { icon: ShieldCheck, title: "Negligible degradation", body: "No first-year power drop. PERC modules can lose up to ~8% in year one." },
  { icon: Recycle, title: "Upgrades PERC lines", body: "8 of 12 steps are identical to PERC; operators and equipment transfer directly." },
  { icon: Zap, title: "Broad spectral response", body: "Strong across both short and long wavelengths, less weather-sensitive yield." },
];

export function Intro() {
  const [col, setCol] = useState(0);

  return (
    <Section id="intro" className="py-28 sm:py-36">
      <SectionHeader
        eyebrow="Introduction"
        title={
          <>
            What is <span className="text-gradient">TOPCon</span>, and why does it win?
          </>
        }
        description="TOPCon — Tunnel Oxide Passivated Contact — was proposed in 2013 by Germany's Fraunhofer ISE. It uses a phosphorus-doped poly-silicon film and a sub-2 nm oxide to build an electron-selective contact, letting majority electrons tunnel through while blocking recombination. The payoff is a very high Voc and a new efficiency ceiling for silicon."
        accent="#3b8cff"
      />

      {/* Efficiency graph */}
      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Reveal>
          <div className="rounded-3xl glass p-7">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">
                Champion cell efficiency
              </h3>
              <span className="text-[11px] text-white/35">indicative %</span>
            </div>
            <div className="space-y-5">
              {efficiency.map((e, i) => (
                <div key={e.name}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-sm font-medium text-white/80">{e.name}</span>
                    <span className="font-mono text-sm" style={{ color: e.color }}>
                      {e.value}%
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${e.color}, ${e.color}bb)`,
                        boxShadow: `0 0 16px ${e.color}66`,
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(e.value / 27) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.15, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <div className="mt-1 text-[11px] text-white/35">{e.note}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <RevealGroup className="grid grid-cols-2 gap-4">
          {highlights.map((h) => (
            <Reveal key={h.title}>
              <div className="h-full rounded-2xl glass p-5 transition-colors hover:bg-white/[0.06]">
                <h.icon className="h-5 w-5 text-electric-300" />
                <div className="mt-3 text-sm font-semibold text-white">{h.title}</div>
                <div className="mt-1.5 text-[13px] leading-relaxed text-white/50">
                  {h.body}
                </div>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      {/* Cell anatomy — native cross-section */}
      <Reveal>
        <div className="mx-auto mt-10 max-w-2xl">
          <DiagramFigure
            name="cell-stack"
            label="Structure"
            accent="#3b8cff"
            caption="The full TOPCon stack, front to rear — SiNₓ + Al₂O₃ passivation, the p⁺ emitter, the n-type absorber wafer, then the rear ~1.5 nm tunnel oxide, n⁺ poly-Si and the metal electrode."
          />
        </div>
      </Reveal>

      {/* Comparison table */}
      <Reveal>
        <div className="mt-16 overflow-hidden rounded-3xl glass">
          <div className="grid grid-cols-4 border-b border-white/10">
            <div className="p-4 text-[11px] font-semibold uppercase tracking-widest text-white/40">
              Metric
            </div>
            {cellComparison.columns.map((c, i) => (
              <button
                key={c}
                onClick={() => setCol(i)}
                className={cn(
                  "p-4 text-center text-sm font-semibold transition-colors",
                  col === i ? "text-white" : "text-white/45 hover:text-white/70",
                )}
              >
                <span className="relative">
                  {c}
                  {col === i && (
                    <motion.span
                      layoutId="compare-underline"
                      className="absolute -bottom-4 left-0 h-0.5 w-full rounded-full bg-electric-400"
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <div>
            {cellComparison.rows.map((row, ri) => (
              <div
                key={row.label}
                className={cn(
                  "grid grid-cols-4 items-center border-b border-white/5 last:border-0",
                  ri % 2 ? "bg-white/[0.015]" : "",
                )}
              >
                <div className="p-4 text-[13px] font-medium text-white/60">
                  {row.label}
                </div>
                {row.values.map((v, vi) => (
                  <div
                    key={vi}
                    className={cn(
                      "p-4 text-center text-[13px] transition-colors",
                      col === vi
                        ? "font-semibold text-white"
                        : "text-white/45",
                    )}
                  >
                    {v}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Advantages / tradeoffs */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl border border-signal-teal/20 bg-signal-teal/[0.04] p-7">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-signal-teal">
              <Check className="h-4 w-4" /> Advantages
            </h3>
            <ul className="mt-5 space-y-3">
              {topconAdvantages.map((a) => (
                <li key={a} className="flex gap-3 text-[14px] leading-relaxed text-white/65">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-signal-teal" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal i={1}>
          <div className="h-full rounded-3xl border border-signal-amber/20 bg-signal-amber/[0.04] p-7">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-signal-amber">
              <Minus className="h-4 w-4" /> Trade-offs
            </h3>
            <ul className="mt-5 space-y-3">
              {topconTradeoffs.map((t) => (
                <li key={t} className="flex gap-3 text-[14px] leading-relaxed text-white/65">
                  <Minus className="mt-0.5 h-4 w-4 flex-shrink-0 text-signal-amber" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
