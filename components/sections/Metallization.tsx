"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  SlidersHorizontal,
  AlertTriangle,
  Gauge,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import {
  printFlow,
  printMechanics,
  printParams,
  printMaterials,
  contactMetals,
  printDefects,
  printSpecs,
  metalMethods,
  spcConcept,
  spcTable,
  fingerSpecs,
  boronConcentration,
  boronJunctionDepthUm,
  boronBackgroundLog,
  sheetResistanceRef,
} from "@/data/metallization";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "materials", label: "Materials", icon: Layers },
  { id: "parameters", label: "Parameters", icon: SlidersHorizontal },
  { id: "defects", label: "Defects", icon: AlertTriangle },
  { id: "spc", label: "Factory QC", icon: Gauge },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function Metallization() {
  const [tab, setTab] = useState<TabId>("materials");

  return (
    <Section id="metallization" className="py-28 sm:py-36">
      <SectionHeader
        eyebrow="Bonus Deep Dive · Metallization"
        title={
          <>
            The last step, where
            <br />
            <span className="text-gradient">silver meets silicon.</span>
          </>
        }
        description="Every passivation layer we built is an insulator — electrons can't escape through them. Screen printing lays down the metal grid that finally lets current out, then the factory guards it with statistical process control. This is the least glamorous and most defect-prone step in the line."
        accent="#ffb020"
      />

      {/* Print mechanics: animated diagram + how the wafer survives */}
      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-stretch">
        <PrintDiagram />
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl glass p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-signal-amber">
              Why a 0.15 mm wafer doesn&apos;t shatter
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {printMechanics.map((m) => (
                <div key={m.title} className="rounded-2xl bg-white/[0.03] p-4">
                  <div className="text-[13px] font-semibold text-white">{m.title}</div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-white/50">
                    {m.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-signal-amber/20 bg-signal-amber/[0.05] p-6">
            <h3 className="text-sm font-semibold text-signal-amber">
              The shading trade-off
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/55">
              Cover the whole front in silver and no light gets in. So we print{" "}
              <em>thin</em> fingers — but thinner fingers mean higher resistance.
              Many narrow, closely-spaced fingers keep both shading and the
              distance electrons travel through the resistive emitter small.
              Firing then makes it real: glass frit locally etches through the
              SiNₓ so silver contacts silicon only in tiny openings, leaving the
              passivation intact everywhere else.
            </p>
          </div>
        </div>
      </div>

      {/* 8-step flow strip */}
      <Reveal>
        <div className="mt-8 overflow-x-auto no-scrollbar">
          <div className="flex min-w-[820px] gap-2">
            {printFlow.map((s, i) => (
              <div
                key={s.id}
                className="flex-1 rounded-2xl border border-white/8 bg-white/[0.02] p-3.5"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-signal-amber/15 font-mono text-[10px] font-bold text-signal-amber">
                    {i + 1}
                  </span>
                  <span className="text-[12px] font-semibold text-white">{s.name}</span>
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-white/45">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Tabbed deep-dive */}
      <div className="mt-16">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const activeTab = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeTab
                    ? "bg-white/10 text-white ring-1 ring-white/15"
                    : "text-white/45 hover:bg-white/5 hover:text-white/70",
                )}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {tab === "materials" && <MaterialsTab />}
              {tab === "parameters" && <ParametersTab />}
              {tab === "defects" && <DefectsTab />}
              {tab === "spc" && <SpcTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Boron diffusion diagram + chart */}
      <BoronFeature />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Animated top-down screen-print diagram                              */
/* ------------------------------------------------------------------ */
function PrintDiagram() {
  const [p, setP] = useState(0); // 0..1 sweep progress
  const [firing, setFiring] = useState(false);

  useEffect(() => {
    let raf = 0;
    let start = performance.now();
    const SWEEP = 3600;
    const HOLD = 1400;
    function loop(now: number) {
      const t = now - start;
      if (t < SWEEP) {
        setP(t / SWEEP);
        setFiring(false);
      } else if (t < SWEEP + HOLD) {
        setP(1);
        setFiring(true);
      } else {
        start = now;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const top = 44;
  const bottom = 262;
  const sweepY = top + p * (bottom - top);
  const fingers = Array.from({ length: 13 }, (_, i) => 46 + i * 21);
  const busbars = [110, 196];

  return (
    <div className="relative overflow-hidden rounded-3xl glass">
      <svg viewBox="0 0 300 300" className="h-full w-full">
        <defs>
          <linearGradient id="wafer-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0e1424" />
            <stop offset="1" stopColor="#070a14" />
          </linearGradient>
          <linearGradient id="sq-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a3020" />
            <stop offset="1" stopColor="#ffb020" />
          </linearGradient>
        </defs>

        {/* wafer */}
        <rect x="28" y="32" width="244" height="242" rx="14" fill="url(#wafer-g)" stroke="rgba(255,255,255,0.08)" />

        {/* firing glow */}
        {firing && (
          <rect x="28" y="32" width="244" height="242" rx="14" fill="#ffb020" opacity="0.12">
            <animate attributeName="opacity" values="0.05;0.18;0.05" dur="1.1s" repeatCount="indefinite" />
          </rect>
        )}

        {/* busbars (revealed once the squeegee passes) */}
        {busbars.map((by) => {
          const on = sweepY >= by;
          return (
            <rect
              key={by}
              x="40"
              y={by - 3}
              width="220"
              height="6"
              rx="3"
              fill={firing ? "#e5e7eb" : "#ffb020"}
              opacity={on ? 0.9 : 0.08}
            />
          );
        })}

        {/* fingers grow downward as the squeegee passes */}
        {fingers.map((fx) => {
          const y2 = Math.min(sweepY, bottom);
          return (
            <line
              key={fx}
              x1={fx}
              y1={top}
              x2={fx}
              y2={y2}
              stroke={firing ? "#e5e7eb" : "#ffb020"}
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity={firing ? 0.9 : 0.8}
            />
          );
        })}

        {/* paste bead ahead of the squeegee */}
        {!firing && (
          <rect x="40" y={sweepY - 12} width="220" height="7" rx="3.5" fill="#ffd27a" opacity="0.85" />
        )}

        {/* squeegee bar */}
        {!firing && (
          <g>
            <rect x="34" y={sweepY - 5} width="232" height="9" rx="4" fill="url(#sq-g)" />
            <rect x="34" y={sweepY - 5} width="232" height="3" rx="1.5" fill="#fff" opacity="0.25" />
          </g>
        )}
      </svg>

      <div className="pointer-events-none absolute left-4 top-4 text-[11px] font-medium">
        <span className="rounded-full glass-strong px-2.5 py-1 text-white/70">
          {firing ? "Firing · frit etches through SiNₓ" : "Squeegee printing Ag fingers + busbars"}
        </span>
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 flex gap-2 text-[10px]">
        <span className="flex items-center gap-1.5 rounded-full glass-strong px-2 py-1 text-white/60">
          <span className="h-2 w-2 rounded-full bg-signal-amber" /> paste
        </span>
        <span className="flex items-center gap-1.5 rounded-full glass-strong px-2 py-1 text-white/60">
          <span className="h-2 w-2 rounded-full bg-white" /> fired Ag
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Materials tab                                                       */
/* ------------------------------------------------------------------ */
function MaterialsTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {printMaterials.map((g) => (
          <div key={g.group} className="rounded-3xl glass p-6">
            <div
              className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
              style={{ background: `${g.accent}1e`, color: g.accent }}
            >
              {g.group}
            </div>
            <ul className="mt-4 space-y-3.5">
              {g.items.map((it) => (
                <li key={it.name}>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: g.accent }}
                    />
                    <span className="text-[13.5px] font-semibold text-white/85">
                      {it.name}
                    </span>
                  </div>
                  <p className="ml-3.5 text-[12px] leading-relaxed text-white/50">
                    {it.role}
                    {it.note && <span className="block text-white/35">{it.note}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Why silver row */}
      <div className="rounded-3xl glass p-6">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">
          Why silver — and not the cheaper metals
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contactMetals.map((m) => {
            const tone =
              m.verdict === "used"
                ? { ring: "ring-signal-teal/30", chip: "bg-signal-teal/15 text-signal-teal", label: "Standard" }
                : m.verdict === "future"
                  ? { ring: "ring-electric-400/25", chip: "bg-electric-500/15 text-electric-300", label: "Next-gen" }
                  : m.verdict === "rear"
                    ? { ring: "ring-white/10", chip: "bg-white/10 text-white/60", label: "Rear only" }
                    : { ring: "ring-signal-rose/25", chip: "bg-signal-rose/15 text-signal-rose", label: "Not used" };
            return (
              <div key={m.metal} className={cn("rounded-2xl bg-white/[0.03] p-4 ring-1", tone.ring)}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-white/85">
                    {m.metal}
                  </span>
                  <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider", tone.chip)}>
                    {tone.label}
                  </span>
                </div>
                <p className="mt-2 text-[11.5px] leading-relaxed text-white/50">{m.note}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alt metallization methods */}
      <div className="rounded-3xl glass p-6">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">
          Ways to metallize a cell
        </h3>
        <div className="mt-4 space-y-2">
          {metalMethods.map((m) => (
            <div
              key={m.name}
              className={cn(
                "grid grid-cols-[minmax(120px,1fr)_1.3fr_1fr] items-center gap-3 rounded-xl px-4 py-3 text-[12.5px]",
                m.current
                  ? "bg-signal-amber/[0.08] ring-1 ring-inset ring-signal-amber/20"
                  : "bg-white/[0.02]",
              )}
            >
              <div className="flex items-center gap-2 font-semibold text-white/85">
                {m.name}
                {m.current && (
                  <span className="rounded-full bg-signal-amber/20 px-2 py-0.5 text-[9px] font-bold uppercase text-signal-amber">
                    Industry
                  </span>
                )}
              </div>
              <div className="text-white/55">{m.advantage}</div>
              <div className="text-white/40">{m.limit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Material specifications — what engineers qualify before production */}
      <div className="rounded-3xl glass p-6">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">
          Material specifications that get qualified
        </h3>
        <p className="mt-2 max-w-2xl text-[12.5px] leading-relaxed text-white/45">
          Every material carries a spec sheet; if one property drifts out of range the print
          can fail. The best material isn&apos;t the strongest on any single property — it&apos;s
          the one with the lowest cost-per-watt that runs stably for millions of wafers.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {printSpecs.map((g) => (
            <div key={g.group} className="rounded-2xl bg-white/[0.03] p-5">
              <div
                className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
                style={{ background: `${g.accent}1e`, color: g.accent }}
              >
                {g.group}
              </div>
              <ul className="mt-3.5 space-y-2.5">
                {g.items.map((it, i) => (
                  <li key={i} className="flex gap-2 text-[12px] leading-relaxed text-white/55">
                    <span
                      className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full"
                      style={{ background: g.accent }}
                    />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Parameters tab — interactive too-low / optimum / too-high          */
/* ------------------------------------------------------------------ */
function ParametersTab() {
  const [active, setActive] = useState(7); // firing temp — the most critical
  const param = printParams[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      {/* selector */}
      <div className="rounded-3xl glass p-2">
        {printParams.map((pr, i) => (
          <button
            key={pr.name}
            onClick={() => setActive(i)}
            className={cn(
              "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors",
              i === active ? "bg-white/10" : "hover:bg-white/[0.04]",
            )}
          >
            <span
              className={cn(
                "text-[13.5px] font-medium",
                i === active ? "text-white" : "text-white/55",
              )}
            >
              {pr.name}
            </span>
            <span className="font-mono text-[11px] text-signal-amber">{pr.optimum}</span>
          </button>
        ))}
      </div>

      {/* detail */}
      <div className="rounded-3xl glass p-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={param.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              {param.name}
            </h3>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-signal-amber/15 px-3 py-1 text-[12px] font-medium text-signal-amber">
              Optimum · {param.optimum}
            </div>

            {/* tri-state bar */}
            <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 text-center text-[11px] font-semibold uppercase tracking-wider">
              <div className="bg-signal-rose/15 py-2 text-signal-rose">Too low</div>
              <div className="bg-signal-teal/15 py-2 text-signal-teal">Optimum</div>
              <div className="bg-signal-rose/15 py-2 text-signal-rose">Too high</div>
            </div>

            <div className="mt-5 space-y-4">
              <ParamRow tone="bad" label="If too low">{param.tooLow}</ParamRow>
              <ParamRow tone="good" label="At optimum">
                Sharp, continuous fingers with low resistance and minimal shading — the
                cell performs as designed.
              </ParamRow>
              <ParamRow tone="bad" label="If too high">{param.tooHigh}</ParamRow>
            </div>

            <p className="mt-6 rounded-2xl bg-white/[0.03] p-4 text-[12.5px] leading-relaxed text-white/45">
              None of these ten knobs is independent — a thicker paste needs more
              pressure, a new screen needs a new snap-off, narrower fingers need a
              different firing profile. Screen printing is a multi-variable
              optimisation, not ten separate dials.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ParamRow({
  tone,
  label,
  children,
}: {
  tone: "good" | "bad";
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
          tone === "good" ? "bg-signal-teal/20 text-signal-teal" : "bg-signal-rose/20 text-signal-rose",
        )}
      >
        {tone === "good" ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      </span>
      <div>
        <div
          className={cn(
            "text-[12px] font-semibold uppercase tracking-wider",
            tone === "good" ? "text-signal-teal" : "text-signal-rose/90",
          )}
        >
          {label}
        </div>
        <p className="mt-0.5 text-[13px] leading-relaxed text-white/60">{children}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Defects tab                                                         */
/* ------------------------------------------------------------------ */
function DefectsTab() {
  return (
    <div>
      <p className="mb-6 max-w-2xl text-[14px] leading-relaxed text-white/50">
        A defect just 20–30 µm across can scrap a cell, so lines watch for far more
        than &quot;did the paste print.&quot; Fifteen recurring abnormalities, their
        root cause, what they cost, and how the factory catches each one.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {printDefects.map((d, i) => (
          <Reveal key={d.name} i={i % 3}>
            <div className="h-full rounded-2xl glass p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[13.5px] font-semibold text-white">{d.name}</span>
                <span className="whitespace-nowrap rounded-full bg-white/8 px-2 py-0.5 text-[9px] font-medium text-white/45">
                  {d.detect}
                </span>
              </div>
              <p className="mt-2 text-[11.5px] leading-relaxed text-white/45">
                <span className="text-white/60">Cause:</span> {d.cause}
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-signal-rose/80">
                {d.effect}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SPC tab — nested target / control / spec ranges                     */
/* ------------------------------------------------------------------ */
function SpcTab() {
  const [zone, setZone] = useState(1);
  const c = spcConcept;
  const active = c.zones[zone];

  // map a value to 0..100% across a padded axis
  const axisLo = c.specLo - 1;
  const axisHi = c.specHi + 1;
  const pct = (v: number) => ((v - axisLo) / (axisHi - axisLo)) * 100;
  const zoneValue = parseFloat(active.value);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      {/* visualization */}
      <div className="rounded-3xl glass p-7">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">
            {c.metric} · nested limits
          </h3>
          <span className="font-mono text-2xl font-semibold text-gradient-electric">
            {active.value}
          </span>
        </div>

        {/* nested bands */}
        <div className="relative mt-8 h-24">
          {/* spec band */}
          <div
            className="absolute top-6 h-12 rounded-lg bg-signal-rose/10 ring-1 ring-inset ring-signal-rose/20"
            style={{ left: `${pct(c.specLo)}%`, width: `${pct(c.specHi) - pct(c.specLo)}%` }}
          />
          {/* control band */}
          <div
            className="absolute top-6 h-12 rounded-lg bg-signal-teal/15 ring-1 ring-inset ring-signal-teal/30"
            style={{ left: `${pct(c.controlLo)}%`, width: `${pct(c.controlHi) - pct(c.controlLo)}%` }}
          />
          {/* target line */}
          <div className="absolute top-4 h-16 w-0.5 -translate-x-1/2 bg-white/70" style={{ left: `${pct(c.target)}%` }}>
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-white/70">
              target
            </span>
          </div>
          {/* current marker */}
          <motion.div
            className="absolute top-1 z-10"
            animate={{ left: `${pct(zoneValue)}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            style={{ left: `${pct(zoneValue)}%` }}
          >
            <div
              className={cn(
                "-translate-x-1/2",
                active.tone === "good" ? "text-signal-teal" : active.tone === "warn" ? "text-signal-amber" : "text-signal-rose",
              )}
            >
              <div className="mx-auto h-4 w-4 rounded-full border-2 border-current bg-ink-950" />
              <div className="mx-auto h-16 w-0.5 bg-current opacity-40" />
            </div>
          </motion.div>
        </div>

        {/* axis labels */}
        <div className="relative mt-1 h-4 text-[10px] text-white/35">
          <span className="absolute -translate-x-1/2 font-mono" style={{ left: `${pct(c.specLo)}%` }}>
            {c.specLo} (LSL)
          </span>
          <span className="absolute -translate-x-1/2 font-mono text-signal-teal/70" style={{ left: `${pct(c.controlLo)}%` }}>
            {c.controlLo}
          </span>
          <span className="absolute -translate-x-1/2 font-mono text-signal-teal/70" style={{ left: `${pct(c.controlHi)}%` }}>
            {c.controlHi}
          </span>
          <span className="absolute -translate-x-1/2 font-mono" style={{ left: `${pct(c.specHi)}%` }}>
            {c.specHi} (USL)
          </span>
        </div>

        {/* zone buttons */}
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {c.zones.map((z, i) => (
            <button
              key={z.id}
              onClick={() => setZone(i)}
              className={cn(
                "rounded-xl px-3 py-2 text-[11px] font-medium transition-all",
                i === zone
                  ? z.tone === "good"
                    ? "bg-signal-teal/20 text-signal-teal ring-1 ring-signal-teal/40"
                    : z.tone === "warn"
                      ? "bg-signal-amber/20 text-signal-amber ring-1 ring-signal-amber/40"
                      : "bg-signal-rose/20 text-signal-rose ring-1 ring-signal-rose/40"
                  : "bg-white/[0.03] text-white/45 hover:bg-white/[0.06]",
              )}
            >
              {z.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-[13px] leading-relaxed text-white/60"
          >
            {active.verdict}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* explanation + table */}
      <div className="flex flex-col gap-5">
        <div className="rounded-3xl border border-electric-400/20 bg-electric-500/[0.05] p-6">
          <h3 className="text-sm font-semibold text-electric-300">
            Why two limits, not one?
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-white/55">
            The wide <span className="text-signal-rose/80">specification</span> band
            decides if a cell ships. The tighter{" "}
            <span className="text-signal-teal/80">control</span> band is an early-warning
            zone: cross it and the product is still fine, but the process is drifting.
            Engineers act on the drift before a single defective cell is made — the core
            idea of SPC is keeping the process <em>centred</em>, not merely in-spec.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl glass">
          <div className="grid grid-cols-[1.1fr_0.9fr_1fr_1fr] border-b border-white/10 px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">
            <span>Parameter</span>
            <span>Target</span>
            <span>Control</span>
            <span>Spec</span>
          </div>
          {spcTable.map((r) => (
            <div
              key={r.param}
              className="grid grid-cols-[1.1fr_0.9fr_1fr_1fr] border-b border-white/5 px-4 py-2.5 text-[11.5px] last:border-0"
            >
              <span className="text-white/70">{r.param}</span>
              <span className="font-mono text-white/85">{r.target}</span>
              <span className="font-mono text-signal-teal/80">{r.control}</span>
              <span className="font-mono text-white/45">{r.spec}</span>
            </div>
          ))}
        </div>

        <div className="rounded-3xl glass p-5">
          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
            Finger geometry by technology
          </h4>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            {fingerSpecs.map((f) => (
              <div key={f.param} className="flex items-baseline justify-between gap-2 text-[12px]">
                <span className="text-white/50">{f.param}</span>
                <span className="font-mono text-white/80">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Boron diffusion — live chart + reference infographic                */
/* ------------------------------------------------------------------ */
function BoronFeature() {
  return (
    <div className="mt-24">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-plasma-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-plasma-300">
            Reference diagram
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Boron diffusion, from the whiteboard up
        </h3>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/55">
          Step 2 of the line forms the P–N junction. Boron enters the front surface
          and its concentration falls almost exponentially with depth — the junction
          sits where it meets the wafer&apos;s phosphorus background. That profile sets
          the emitter&apos;s <em>sheet resistance</em>, the number the whole diffusion
          step is tuned against.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <BoronChart />

        <div className="flex flex-col gap-5">
          <div className="rounded-3xl glass p-6">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/50">
              Sheet resistance of a boron emitter
            </h4>
            <div className="mt-4 space-y-2">
              {sheetResistanceRef.map((s) => (
                <div
                  key={s.type}
                  className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 text-[13px]"
                >
                  <span className="text-white/65">{s.type}</span>
                  <span className="font-mono text-white/85">{s.rs}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-start gap-2 text-[12.5px] leading-relaxed text-white/45">
              <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-plasma-300" />
              Lower R<sub>s</sub> means better lateral conductivity — but push it too
              low and recombination climbs. There is an optimum, measured with a
              four-point probe.
            </p>
          </div>

          <figure className="overflow-hidden rounded-3xl glass">
            <div className="relative aspect-[3/2] w-full bg-white">
              <Image
                src="/diagrams/boron-diffusion.jpg"
                alt="Boron diffusion process infographic: bare wafer through post-diffusion clean, cross-section, concentration profile, and sheet-resistance measurement"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
            <figcaption className="border-t border-white/10 px-4 py-3 text-[11.5px] text-white/45">
              Full engineering reference: the six-stage boron flow, the exponential
              concentration profile, and the four-point-probe sheet-resistance
              measurement.
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

function BoronChart() {
  const [depth, setDepth] = useState(0);
  const width = 460;
  const height = 300;
  const padL = 52;
  const padR = 18;
  const padT = 20;
  const padB = 40;
  const maxDepth = 2.5;
  const logMin = 14;
  const logMax = 20.5;

  const x = (d: number) => padL + (d / maxDepth) * (width - padL - padR);
  const y = (log: number) =>
    padT + (1 - (log - logMin) / (logMax - logMin)) * (height - padT - padB);

  const pts: string[] = [];
  for (let d = 0; d <= maxDepth + 0.001; d += 0.05) {
    pts.push(`${x(d)},${y(boronConcentration(d))}`);
  }
  const cursorLog = boronConcentration(depth);
  const yTicks = [15, 16, 17, 18, 19, 20];

  return (
    <div className="rounded-3xl glass p-6">
      <div className="flex items-baseline justify-between">
        <h4 className="text-sm font-semibold uppercase tracking-widest text-white/50">
          Boron concentration vs depth
        </h4>
        <span className="font-mono text-[13px] text-plasma-300">
          {depth.toFixed(2)} µm
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 w-full">
        {/* grid + y ticks */}
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={padL} y1={y(t)} x2={width - padR} y2={y(t)} stroke="rgba(255,255,255,0.06)" />
            <text x={padL - 8} y={y(t) + 3} textAnchor="end" className="fill-white/35" style={{ fontSize: 9, fontFamily: "monospace" }}>
              10^{t}
            </text>
          </g>
        ))}

        {/* phosphorus background */}
        <line x1={padL} y1={y(boronBackgroundLog)} x2={width - padR} y2={y(boronBackgroundLog)} stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.6" />
        <text x={width - padR} y={y(boronBackgroundLog) - 5} textAnchor="end" className="fill-photon-400" style={{ fontSize: 9 }}>
          n-type P background
        </text>

        {/* junction depth */}
        <line x1={x(boronJunctionDepthUm)} y1={padT} x2={x(boronJunctionDepthUm)} y2={height - padB} stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        <text x={x(boronJunctionDepthUm) + 4} y={padT + 10} className="fill-plasma-300" style={{ fontSize: 9 }}>
          junction xⱼ
        </text>

        {/* area under curve */}
        <polygon
          points={`${x(0)},${height - padB} ${pts.join(" ")} ${x(maxDepth)},${height - padB}`}
          fill="url(#boron-fill)"
          opacity="0.25"
        />
        <defs>
          <linearGradient id="boron-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f472b6" />
            <stop offset="1" stopColor="#f472b6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* curve */}
        <polyline points={pts.join(" ")} fill="none" stroke="#f472b6" strokeWidth="2.4" strokeLinecap="round" />

        {/* cursor */}
        <line x1={x(depth)} y1={padT} x2={x(depth)} y2={height - padB} stroke="rgba(255,255,255,0.25)" />
        <circle cx={x(depth)} cy={y(cursorLog)} r="5" fill="#f472b6" stroke="#04060d" strokeWidth="2" />

        {/* x axis label */}
        <text x={(padL + width - padR) / 2} y={height - 8} textAnchor="middle" className="fill-white/40" style={{ fontSize: 10 }}>
          Depth from surface (µm)
        </text>
      </svg>

      <input
        type="range"
        min={0}
        max={maxDepth}
        step={0.01}
        value={depth}
        onChange={(e) => setDepth(parseFloat(e.target.value))}
        className="topcon-range mt-2 w-full"
      />
      <p className="mt-3 text-[12.5px] leading-relaxed text-white/45">
        {depth < boronJunctionDepthUm ? (
          <>
            Inside the <span className="text-signal-rose/80">p⁺ emitter</span> — boron
            dominates, ~10<sup>{cursorLog.toFixed(0)}</sup> cm⁻³. Holes are the majority
            carrier here.
          </>
        ) : (
          <>
            Past the junction, in the <span className="text-photon-400">n-type base</span> —
            boron has fallen below the phosphorus background, so the wafer is n-type again.
          </>
        )}
      </p>
    </div>
  );
}
