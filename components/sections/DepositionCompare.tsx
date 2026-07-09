"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, Gauge, DollarSign, MapPin } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { depositionMethods, tunnelMaterials } from "@/data/comparisons";
import { cn } from "@/lib/utils";

export function DepositionCompare() {
  const [active, setActive] = useState(depositionMethods[1].id);
  const method = depositionMethods.find((m) => m.id === active)!;

  return (
    <Section id="compare" className="py-28 sm:py-36">
      <SectionHeader
        eyebrow="Deposition Methods"
        title={
          <>
            Four ways to build
            <br />
            <span className="text-gradient">a thin film.</span>
          </>
        }
        description="Thermal oxidation, LPCVD, ALD and PECVD are not competitors — they build different materials, on different sides, for different jobs. The industry never asks 'which is best?' but 'which is best for this layer?'"
        accent="#f472b6"
      />

      {/* Method cards */}
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {depositionMethods.map((m, i) => (
          <Reveal key={m.id} i={i}>
            <button
              onClick={() => setActive(m.id)}
              className={cn(
                "group relative h-full w-full overflow-hidden rounded-3xl border p-6 text-left transition-all duration-300",
                active === m.id
                  ? "border-white/20 bg-white/[0.06]"
                  : "border-white/8 bg-white/[0.02] hover:bg-white/[0.04]",
              )}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70"
                style={{ background: m.accent }}
              />
              <div className="relative">
                <div
                  className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: `${m.accent}22`, color: m.accent }}
                >
                  {m.name}
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-tight text-white">
                  {m.deposits}
                </h3>
                <p className="mt-1 text-[12px] text-white/40">{m.full}</p>

                <div className="mt-5 space-y-2 text-[12px]">
                  <Row icon={MapPin} label={m.where} />
                  <Row icon={Thermometer} label={m.temp} />
                  <Row icon={Gauge} label={m.speed} />
                  <Row icon={DollarSign} label={m.cost} />
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Detail panel */}
      <div className="mt-6 overflow-hidden rounded-3xl glass">
        <AnimatePresence mode="wait">
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_1fr]"
          >
            <div>
              <div
                className="text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: method.accent }}
              >
                Why {method.name}?
              </div>
              <p className="mt-3 text-lg leading-relaxed text-white/70">{method.why}</p>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
                Strengths
              </div>
              <ul className="mt-3 space-y-2.5">
                {method.strengths.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-[14px] text-white/65">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: method.accent }}
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tunnel-material scorecard */}
      <Reveal>
        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          {/* Left: explanation */}
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              Why SiO₂ wins the tunnel-oxide job
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-white/55">
              The tunnel oxide must passivate silicon, allow controlled tunneling, and
              block holes. Only SiO₂ — grown from the wafer itself — scores top marks on
              interface and tunneling at once. Al₂O₃ passivates beautifully but tunnels
              poorly, so it works on the <em>front</em>, not as the tunnel oxide.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-electric-400/20 bg-electric-500/[0.06] px-4 py-3">
              <span className="font-mono text-lg font-semibold text-electric-300">5 / 5</span>
              <span className="text-[13px] leading-snug text-white/60">
                interface + tunneling — the only material that maxes both.
              </span>
            </div>
          </div>

          {/* Right: scorecard */}
          <div className="overflow-x-auto no-scrollbar">
            <div className="min-w-[560px]">
              <div className="grid grid-cols-[150px_repeat(4,1fr)] border-b border-white/10 pb-3 text-[11px] font-semibold uppercase tracking-widest text-white/40">
                <div className="px-3">Material</div>
                <Metric>Interface</Metric>
                <Metric>Tunneling</Metric>
                <Metric>Passiv.</Metric>
                <Metric>Field</Metric>
              </div>
              {tunnelMaterials.map((m) => (
                <div
                  key={m.material}
                  className={cn(
                    "grid grid-cols-[150px_repeat(4,1fr)] items-center rounded-xl border-b border-white/5 py-3.5",
                    m.material === "SiO₂" &&
                      "border-transparent bg-electric-500/[0.08] ring-1 ring-inset ring-electric-400/20",
                  )}
                >
                  <div className="px-3">
                    <div className="font-mono text-sm font-semibold text-white/85">
                      {m.material}
                    </div>
                    <div className="text-[10px] text-white/35">{m.use}</div>
                  </div>
                  <RatingBar value={m.interface} />
                  <RatingBar value={m.tunneling} />
                  <RatingBar value={m.passivation} />
                  <RatingBar value={m.fieldEffect} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Row({ icon: Icon, label }: { icon: typeof MapPin; label: string }) {
  return (
    <div className="flex items-center gap-2 text-white/50">
      <Icon className="h-3.5 w-3.5 flex-shrink-0 text-white/30" />
      <span>{label}</span>
    </div>
  );
}

function Metric({ children }: { children: React.ReactNode }) {
  return <div className="text-center">{children}</div>;
}

function RatingBar({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-5 w-2 rounded-full transition-colors",
            i < value ? "" : "bg-white/8",
          )}
          style={
            i < value
              ? {
                  background:
                    value >= 4 ? "#2dd4bf" : value >= 3 ? "#3b8cff" : "#ffb020",
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}
