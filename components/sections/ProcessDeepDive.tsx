"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Atom,
  FlaskConical,
  Waves,
  Cog,
  SlidersHorizontal,
  Activity,
  ShieldAlert,
  AlertTriangle,
  Skull,
  Layers3,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { DiagramFigure } from "@/components/diagrams/Diagrams";
import { processSteps } from "@/data/process";
import { ReactionAnimation } from "@/components/viz/ReactionAnimation";
import type { ProcessStep } from "@/data/types";
import { cn } from "@/lib/utils";
import { DeepDiveModal } from "./DeepDiveModal";
import { StepLayerDiagram } from "@/components/viz/StepLayerDiagram";

const tabs = [
  { id: "purpose",    label: "Purpose",       icon: Target },
  { id: "physics",    label: "Physics",        icon: Atom },
  { id: "chemistry",  label: "Chemistry",      icon: FlaskConical },
  { id: "factors",    label: "Factors",        icon: Waves },
  { id: "equipment",  label: "Equipment",      icon: Cog },
  { id: "parameters", label: "Parameters",     icon: SlidersHorizontal },
  { id: "spc",        label: "SPC",            icon: Activity },
  { id: "pfmea",      label: "PFMEA",          icon: ShieldAlert },
  { id: "defects",    label: "Abnormalities",  icon: AlertTriangle },
  { id: "safety",     label: "Safety",         icon: Skull },
] as const;

type TabId = (typeof tabs)[number]["id"];

function tabHasData(step: ProcessStep, id: TabId): boolean {
  switch (id) {
    case "physics":    return step.physics.length > 0;
    case "chemistry":  return step.chemistry.length > 0;
    case "factors":    return !!step.influencingFactors?.length;
    case "parameters": return step.parameters.length > 0;
    case "spc":        return !!step.spc?.length;
    case "pfmea":      return !!step.pfmea?.length;
    case "defects":    return step.defects.length > 0;
    case "safety":     return !!step.safety?.length;
    default:           return true;
  }
}

export function ProcessDeepDive() {
  const [activeStepId, setActiveStepId]   = useState(processSteps[0].id);
  const [stepTabs,     setStepTabs]       = useState<Record<string, TabId>>({});
  const [deepDiveId,   setDeepDiveId]     = useState<string | null>(null);
  const stepRefs = useRef<Record<string, HTMLElement | null>>({});

  /* ── scroll-spy: whichever step is ~30% from top wins ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    processSteps.forEach((step) => {
      const el = stepRefs.current[step.id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStepId(step.id); },
        { rootMargin: "-28% 0px -62% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const getTab = (id: string): TabId => stepTabs[id] ?? "purpose";
  const setTab = (id: string, tab: TabId) =>
    setStepTabs((prev) => ({ ...prev, [id]: tab }));

  const scrollToStep = (id: string) => {
    const el = stepRefs.current[id];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const deepDiveStep = deepDiveId
    ? processSteps.find((s) => s.id === deepDiveId)
    : null;

  return (
    <Section id="process" className="py-28 sm:py-36">
      <SectionHeader
        eyebrow="Every Step, In Depth"
        title={
          <>
            Inside each
            <br />
            <span className="text-gradient">manufacturing step.</span>
          </>
        }
        description="Purpose, physics, chemistry, influencing factors, equipment & tanks, process parameters, SPC limits, PFMEA risk analysis, abnormalities and chemical safety — the entire factory process document, organized step by step."
        accent="#3b8cff"
      />

      <div className="mt-14 flex items-start gap-8">
        {/* ═══════════════════════════════
            Sticky left sidebar
            ═══════════════════════════════ */}
        <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-24 self-start z-10">
          <div
            className="overflow-hidden rounded-2xl border border-white/8"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015))",
              backdropFilter: "blur(18px) saturate(140%)",
            }}
          >
            <div className="border-b border-white/8 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white/35">
              Process Steps
            </div>
            <nav className="no-scrollbar max-h-[72vh] overflow-y-auto py-1.5">
              {processSteps.map((s) => {
                const isActive = activeStepId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToStep(s.id)}
                    className="flex w-full items-center gap-0 px-2 py-1 text-left"
                  >
                    <div
                      className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 transition-all duration-200"
                      style={{
                        background: isActive ? `${s.accent}16` : "transparent",
                        borderLeft: isActive
                          ? `2px solid ${s.accent}`
                          : "2px solid transparent",
                      }}
                    >
                      <span
                        className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold transition-all duration-200"
                        style={{
                          background: isActive ? s.accent : `${s.accent}28`,
                          color:      isActive ? "#04060d" : s.accent,
                        }}
                      >
                        {s.step}
                      </span>
                      <span
                        className="text-[12.5px] font-medium leading-snug transition-colors duration-200"
                        style={{
                          color: isActive
                            ? "#fff"
                            : "rgba(255,255,255,0.42)",
                        }}
                      >
                        {s.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ═══════════════════════════════
            Scrollable step articles
            ═══════════════════════════════ */}
        <div className="min-w-0 flex-1 space-y-20">
          {processSteps.map((step) => {
            const tab = getTab(step.id);
            return (
              <article
                key={step.id}
                ref={(el) => { stepRefs.current[step.id] = el; }}
                id={`step-${step.id}`}
                className="overflow-hidden rounded-3xl glass"
              >
                {/* ── Header band ── */}
                <div
                  className="relative overflow-hidden border-b border-white/10 p-7 sm:p-9"
                  style={{
                    background: `linear-gradient(120deg, ${step.accent}18, transparent 60%)`,
                  }}
                >
                  <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />
                  <div className="relative flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-3">
                        <span
                          className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
                          style={{ background: `${step.accent}22`, color: step.accent }}
                        >
                          Step {step.step} · {step.side}
                        </span>
                      </div>
                      <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                        {step.name}
                      </h3>
                      <p className="mt-2 text-base font-medium" style={{ color: step.accent }}>
                        {step.tagline}
                      </p>
                      <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                        {step.oneLiner}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      {step.deepDive && (
                        <button
                          onClick={() => setDeepDiveId(step.id)}
                          className="group relative flex items-center gap-2 overflow-hidden rounded-full border px-5 py-2 font-medium text-white transition-all hover:scale-105"
                          style={{
                            borderColor: `${step.accent}44`,
                            background:  `linear-gradient(120deg, ${step.accent}22, ${step.accent}11)`,
                            boxShadow:   `0 0 20px ${step.accent}22`,
                          }}
                        >
                          <span className="relative z-10 text-sm">Dive Deeper</span>
                          <ChevronRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          <div
                            className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${step.accent}44, transparent)`,
                            }}
                          />
                        </button>
                      )}
                      {step.layer && (
                        <div className="rounded-2xl border border-white/10 bg-ink-900/50 p-4">
                          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-white/40">
                            <Layers3 className="h-3.5 w-3.5" /> Layer formed
                          </div>
                          <div className="mt-2 text-sm font-semibold text-white">
                            {step.layer.material}
                          </div>
                          <div
                            className="mt-1 font-mono text-xs"
                            style={{ color: step.accent }}
                          >
                            {step.layer.thickness}
                          </div>
                          <div className="mt-0.5 text-[11px] text-white/40">
                            {step.layer.where}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Layer cross-section visual ── */}
                <div
                  className="relative h-72 w-full overflow-hidden border-b border-white/8"
                >
                  <StepLayerDiagram stepId={step.id} accent={step.accent} />
                </div>

                {/* ── Tabs ── */}
                <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-white/10 px-4">
                  {tabs.map((tb) => {
                    const isActive  = tab === tb.id;
                    const disabled  = !tabHasData(step, tb.id);
                    return (
                      <button
                        key={tb.id}
                        disabled={disabled}
                        onClick={() => setTab(step.id, tb.id)}
                        className={cn(
                          "relative flex flex-shrink-0 items-center gap-2 px-4 py-3.5 text-[13px] font-medium transition-colors",
                          disabled && "cursor-not-allowed opacity-30",
                          isActive ? "text-white" : "text-white/45 hover:text-white/75",
                        )}
                      >
                        <tb.icon className="h-4 w-4" />
                        {tb.label}
                        {isActive && (
                          <motion.span
                            layoutId={`tab-underline-${step.id}`}
                            className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                            style={{ background: step.accent }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* ── Tab content ── */}
                <div className="p-7 sm:p-9">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.id + tab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                    >
                      <TabContent step={step} tab={tab} />

                      {/* Figures for this tab */}
                      {step.figures?.some((f) => f.tab === tab) && (
                        <div className="mt-7 border-t border-white/8 pt-7">
                          <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/40">
                            <ImageIcon className="h-3.5 w-3.5" />
                            Illustrated
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            {step.figures
                              .filter((f) => f.tab === tab)
                              .map((f) => (
                                <DiagramFigure
                                  key={f.diagram}
                                  name={f.diagram}
                                  caption={f.caption}
                                  label={f.label}
                                  accent={step.accent}
                                />
                              ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Deep-dive modal */}
      <AnimatePresence>
        {deepDiveStep?.deepDive && (
          <DeepDiveModal
            key={deepDiveId}
            slides={deepDiveStep.deepDive}
            accent={deepDiveStep.accent}
            stepName={deepDiveStep.name}
            onClose={() => setDeepDiveId(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ─────────────────────────────────────────
   Tab content renderer (extracted for clarity)
   ───────────────────────────────────────── */
function TabContent({ step, tab }: { step: ProcessStep; tab: TabId }) {
  switch (tab) {
    case "purpose":
      return (
        <div className="grid gap-8 lg:grid-cols-2">
          <ul className="space-y-4">
            {step.purpose.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: step.accent }}
                />
                <span className="text-[15px] leading-relaxed text-white/65">{p}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-4">
            {step.advantages && (
              <InfoCard title="Advantages" color={step.accent} items={step.advantages} />
            )}
            {step.industrial && (
              <InfoCard title="Industrial considerations" color="#94a3b8" items={step.industrial} />
            )}
          </div>
        </div>
      );

    case "physics":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {step.physics.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-5"
            >
              <div
                className="mb-2 font-mono text-xs font-bold"
                style={{ color: step.accent }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-[14px] leading-relaxed text-white/65">{p}</p>
            </div>
          ))}
        </div>
      );

    case "chemistry":
      return (
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-3">
            {step.chemistry.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/8 bg-ink-950/40 p-5"
              >
                <div
                  className="no-scrollbar overflow-x-auto font-mono text-base font-semibold"
                  style={{ color: step.accent }}
                >
                  {r.equation}
                </div>
                {r.note && (
                  <div className="mt-2 text-[13px] text-white/45">{r.note}</div>
                )}
              </div>
            ))}
          </div>
          <div className="h-[240px] overflow-hidden rounded-2xl border border-white/8 bg-ink-950/40">
            <ReactionAnimation stepId={step.id} accent={step.accent} />
          </div>
        </div>
      );

    case "factors":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {step.influencingFactors?.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-5"
            >
              <div className="flex items-center gap-2">
                <Waves className="h-4 w-4" style={{ color: step.accent }} />
                <span className="text-[14px] font-semibold text-white/85">{f.factor}</span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-white/55">{f.effect}</p>
            </div>
          ))}
        </div>
      );

    case "equipment":
      return (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            {step.equipment.main && (
              <div
                className="h-fit rounded-2xl border p-6"
                style={{
                  borderColor: `${step.accent}33`,
                  background:  `${step.accent}0c`,
                }}
              >
                <Cog className="h-6 w-6" style={{ color: step.accent }} />
                <div className="mt-3 text-[11px] uppercase tracking-widest text-white/40">
                  Main equipment
                </div>
                <div className="mt-1 text-lg font-semibold text-white">
                  {step.equipment.main}
                </div>
              </div>
            )}
            <ul className="space-y-3">
              {step.equipment.detail.map((d, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl bg-white/[0.02] p-3.5 text-[14px] leading-relaxed text-white/65"
                >
                  <ChevronRight
                    className="mt-0.5 h-4 w-4 flex-shrink-0"
                    style={{ color: step.accent }}
                  />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {step.tanks && (
            <div>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-white/40">
                Tank-by-tank sequence
              </div>
              <div className="no-scrollbar overflow-x-auto rounded-2xl border border-white/8">
                <div className="min-w-[640px]">
                  <div className="grid grid-cols-[1.1fr_0.8fr_1.8fr] border-b border-white/10 bg-white/[0.02] text-[10px] font-semibold uppercase tracking-widest text-white/40">
                    <div className="p-3">Tank</div>
                    <div className="p-3">Chemical</div>
                    <div className="p-3">Role</div>
                  </div>
                  {step.tanks.map((t, i) => (
                    <div
                      key={i}
                      className={cn(
                        "grid grid-cols-[1.1fr_0.8fr_1.8fr] border-b border-white/5 text-[12.5px] last:border-0",
                        i % 2 && "bg-white/[0.012]",
                      )}
                    >
                      <div className="p-3 font-medium text-white/80">{t.name}</div>
                      <div className="p-3 font-mono text-[11px]" style={{ color: step.accent }}>
                        {t.chemical}
                      </div>
                      <div className="p-3 text-white/55">
                        {t.role}
                        {t.reaction && (
                          <span className="mt-1 block font-mono text-[11px] text-white/40">
                            {t.reaction}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step.operationFlow && (
            <div>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-white/40">
                Operation flow
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {step.operationFlow.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/8 bg-white/[0.02] p-4"
                  >
                    <span
                      className="font-mono text-[11px] font-bold"
                      style={{ color: step.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/60">{f}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );

    case "parameters":
      return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {step.parameters.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-5"
            >
              <div className="text-[11px] uppercase tracking-widest text-white/40">
                {p.label}
              </div>
              <div
                className="mt-2 font-mono text-lg font-semibold"
                style={{ color: step.accent }}
              >
                {p.value}
              </div>
              {p.hint && (
                <div className="mt-1.5 text-[12px] leading-snug text-white/40">{p.hint}</div>
              )}
            </div>
          ))}
        </div>
      );

    case "spc":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {step.spc?.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-5"
            >
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" style={{ color: step.accent }} />
                <span className="text-[14px] font-semibold text-white/85">{s.item}</span>
              </div>
              <div
                className="mt-3 font-mono text-[13px] font-semibold leading-relaxed"
                style={{ color: step.accent }}
              >
                {s.range}
              </div>
              <div className="mt-2 space-y-0.5 text-[11.5px] text-white/40">
                {s.instrument && <div>Instrument · {s.instrument}</div>}
                {s.frequency  && <div>Frequency · {s.frequency}</div>}
                {s.remark     && <div className="text-white/50">{s.remark}</div>}
              </div>
            </div>
          ))}
        </div>
      );

    case "pfmea":
      return (
        <div className="no-scrollbar overflow-x-auto rounded-2xl border border-white/8">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[1.2fr_1.2fr_1.3fr_1.3fr_auto] border-b border-white/10 bg-white/[0.02] text-[10px] font-semibold uppercase tracking-widest text-white/40">
              <div className="p-3">Failure mode</div>
              <div className="p-3">Effect</div>
              <div className="p-3">Cause</div>
              <div className="p-3">Current control</div>
              <div className="p-3 text-center">RPN</div>
            </div>
            {step.pfmea?.map((r, i) => (
              <div
                key={i}
                className={cn(
                  "grid grid-cols-[1.2fr_1.2fr_1.3fr_1.3fr_auto] border-b border-white/5 text-[12px] last:border-0",
                  i % 2 && "bg-white/[0.012]",
                )}
              >
                <div className="p-3 font-medium text-white/80">{r.mode}</div>
                <div className="p-3 text-white/50">{r.effect}</div>
                <div className="p-3 text-white/50">{r.cause}</div>
                <div className="p-3 text-white/55">{r.control}</div>
                <div className="flex items-center justify-center p-3">
                  <RpnBadge rpn={r.rpn} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "defects":
      return (
        <div className="no-scrollbar overflow-x-auto rounded-2xl border border-white/8">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1fr_1.2fr_1.4fr] border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-widest text-white/40">
              <div className="p-3.5">Abnormality</div>
              <div className="p-3.5">Root cause</div>
              <div className="p-3.5">Countermeasure</div>
            </div>
            {step.defects.map((d, i) => (
              <div
                key={i}
                className={cn(
                  "grid grid-cols-[1fr_1.2fr_1.4fr] border-b border-white/5 text-[13px] last:border-0",
                  i % 2 && "bg-white/[0.012]",
                )}
              >
                <div className="p-3.5 font-medium text-white/80">{d.name}</div>
                <div className="p-3.5 text-white/50">{d.cause}</div>
                <div className="p-3.5 text-white/60">{d.fix}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "safety":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {step.safety?.map((s, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-2xl border border-signal-amber/15 bg-signal-amber/[0.04] p-5"
            >
              <Skull className="mt-0.5 h-5 w-5 flex-shrink-0 text-signal-amber" />
              <div>
                <div className="font-mono text-[13px] font-semibold text-white/85">
                  {s.chemical}
                </div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/55">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

/* ── small helpers ── */

function RpnBadge({ rpn }: { rpn: number }) {
  if (!rpn) return <span className="font-mono text-[12px] text-white/30">—</span>;
  const tone =
    rpn >= 100
      ? "bg-signal-rose/20 text-signal-rose"
      : rpn >= 60
        ? "bg-signal-amber/20 text-signal-amber"
        : "bg-white/10 text-white/60";
  return (
    <span className={cn("rounded-md px-2 py-1 font-mono text-[12px] font-bold", tone)}>
      {rpn}
    </span>
  );
}

function InfoCard({ title, color, items }: { title: string; color: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
      <div className="text-[11px] font-semibold uppercase tracking-widest" style={{ color }}>
        {title}
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((it, i) => (
          <li key={i} className="text-[13px] leading-relaxed text-white/55">{it}</li>
        ))}
      </ul>
    </div>
  );
}
