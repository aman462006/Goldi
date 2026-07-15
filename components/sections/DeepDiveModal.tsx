"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeft,
  BookOpen,
  Lightbulb,
  Factory,
  AlertTriangle,
  Zap,
  FlaskConical,
  ChevronUp,
  Menu,
} from "lucide-react";
import type { DeepDiveSlide } from "@/data/types";
import { cn } from "@/lib/utils";
import {
  LpcvdFurnaceAnimation,
  QuantumTunnelingAnimation,
  LayerBuildAnimation,
  BandDiagramAnimation,
  CurrentSpreadingAnimation,
} from "../viz/LpcvdAnimations";
import { AldCycleAnimation, AldFieldEffectAnimation } from "../viz/AldAnimations";
import { PecvdPlasmaAnimation, AntiReflectionAnimation } from "../viz/PecvdAnimations";
import { SawDamageAnimation, LightTrappingAnimation } from "../viz/TextureAnimations";
import { BoronDiffusionAnimation } from "../viz/BoronAnimations";
import { EdgeIsolationAnimation } from "../viz/RearEtchAnimations";
import {
  PhosphorusDiffusionAnimation,
  SelectiveEmitterAnimation,
} from "../viz/Pocl3Animations";
import { ChemicalEtchAnimation } from "../viz/FrontEtchAnimations";
import { SnapOffAnimation, FiringFritAnimation } from "../viz/PrintAnimations";
import { ElTestingAnimation } from "../viz/TestAnimations";
import { DiagramFigure } from "../diagrams/Diagrams";

// ─── Visual registry ───────────────────────────────────────────────────────────
const VISUALS: Record<string, () => JSX.Element> = {
  furnace: LpcvdFurnaceAnimation,
  tunneling: QuantumTunnelingAnimation,
  layerBuild: LayerBuildAnimation,
  bandDiagram: BandDiagramAnimation,
  currentSpreading: CurrentSpreadingAnimation,
  "band-selectivity": () => <DiagramFigure name="band-selectivity" caption="" />,
  "polysi-color": () => <DiagramFigure name="polysi-color" caption="" />,
  aldCycle: AldCycleAnimation,
  aldFieldEffect: AldFieldEffectAnimation,
  pecvdPlasma: PecvdPlasmaAnimation,
  antiReflection: AntiReflectionAnimation,
  sawDamage: SawDamageAnimation,
  lightTrapping: LightTrappingAnimation,
  boronDiffusion: BoronDiffusionAnimation,
  edgeIsolation: EdgeIsolationAnimation,
  phosphorusDiffusion: PhosphorusDiffusionAnimation,
  selectiveEmitter: SelectiveEmitterAnimation,
  chemicalEtch: ChemicalEtchAnimation,
  snapOff: SnapOffAnimation,
  firingFrit: FiringFritAnimation,
  elTesting: ElTestingAnimation,
};

// ─── Callout labels that map to styled callout blocks ─────────────────────────
const CALLOUT_ICONS: Record<string, typeof Lightbulb> = {
  "Why It Matters": Lightbulb,
  "Engineering Insight": Zap,
  "Industry Practice": Factory,
  "Common Mistake": AlertTriangle,
  "The Plasma Chemistry": FlaskConical,
  "Cycle Control": Zap,
};

// ─── Main exported component ──────────────────────────────────────────────────
export function DeepDiveModal({
  slides,
  accent,
  stepName,
  onClose,
}: {
  slides: DeepDiveSlide[];
  accent: string;
  stepName?: string;
  onClose: () => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard: Escape closes
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Scroll spy + progress tracker
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const pct = scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0;
      setProgress(Math.min(1, pct));

      const containerTop = el.getBoundingClientRect().top;
      let best = 0;
      sectionRefs.current.forEach((sec, i) => {
        if (!sec) return;
        const top = sec.getBoundingClientRect().top - containerTop;
        if (top <= 150) best = i;
      });
      setActiveIdx(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (i: number) => {
    const sec = sectionRefs.current[i];
    const c = containerRef.current;
    if (!sec || !c) return;
    const offset =
      sec.getBoundingClientRect().top - c.getBoundingClientRect().top + c.scrollTop - 96;
    c.scrollTo({ top: offset, behavior: "smooth" });
    setTocOpen(false);
  };

  const stepLabel = stepName ?? slides[0]?.title ?? "Deep Dive";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {/* ── Layered background ── */}
      <div className="absolute inset-0" style={{ background: "#04060d" }} />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(900px 550px at 65% -5%, ${accent}1a, transparent 65%),
                       radial-gradient(600px 500px at -8% 80%, rgba(124,58,237,0.13), transparent 60%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.038]" />
      {/* Top accent hairline */}
      <div
        className="absolute inset-x-0 top-0 z-10 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accent}90 45%, rgba(124,58,237,0.7) 65%, transparent 100%)`,
        }}
      />

      {/* ══════════════════════════════════════
          Fixed header
          ══════════════════════════════════════ */}
      <header
        className="relative z-20 flex flex-shrink-0 items-center gap-3 border-b border-white/[0.07] px-4 py-3 sm:px-6 sm:py-3.5"
        style={{
          background: "rgba(4,6,13,0.82)",
          backdropFilter: "blur(24px) saturate(160%)",
        }}
      >
        {/* Back button */}
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-[13px] font-medium text-white/50 transition-all hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Center: title */}
        <div className="flex flex-1 items-center justify-center gap-2.5 overflow-hidden">
          <BookOpen className="h-3.5 w-3.5 flex-shrink-0" style={{ color: accent }} />
          <span className="truncate text-[13px] font-semibold text-white/80">{stepLabel}</span>
        </div>

        {/* Right: progress + mobile toc toggle + close */}
        <div className="flex items-center gap-2.5">
          <span className="hidden font-mono text-[10px] tabular-nums text-white/30 sm:block">
            {Math.round(progress * 100)}%
          </span>
          {/* Progress pill */}
          <div className="h-1 w-20 overflow-hidden rounded-full bg-white/[0.08] sm:w-28">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${accent}, #7c3aed)` }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.12, ease: "easeOut" }}
            />
          </div>
          {/* Mobile TOC toggle */}
          <button
            onClick={() => setTocOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white lg:hidden"
          >
            <Menu className="h-3.5 w-3.5" />
          </button>
          {/* Close */}
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/35 transition-colors hover:bg-white/[0.07] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════
          Mobile TOC dropdown
          ══════════════════════════════════════ */}
      <AnimatePresence>
        {tocOpen && (
          <motion.div
            className="absolute inset-x-0 top-[52px] z-30 border-b border-white/[0.08] lg:hidden"
            style={{
              background: "rgba(7,10,20,0.96)",
              backdropFilter: "blur(24px)",
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="no-scrollbar max-h-[50vh] overflow-y-auto p-3">
              {slides.map((s, i) => {
                const active = i === activeIdx;
                return (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                      active ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
                    )}
                  >
                    <span
                      className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold"
                      style={{
                        background: active ? accent : "rgba(255,255,255,0.08)",
                        color: active ? "#04060d" : "rgba(255,255,255,0.35)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-[12.5px] font-medium"
                      style={{ color: active ? "#fff" : "rgba(255,255,255,0.45)" }}
                    >
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          Body: sidebar TOC + scroll content
          ══════════════════════════════════════ */}
      <div className="relative flex flex-1 overflow-hidden">

        {/* ── Left sidebar TOC (desktop) ── */}
        <aside
          className="no-scrollbar hidden w-56 flex-shrink-0 overflow-y-auto border-r border-white/[0.06] py-5 lg:block xl:w-60"
          style={{ background: "rgba(255,255,255,0.013)" }}
          data-lenis-prevent
        >
          <p className="mb-3 px-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/22">
            Contents
          </p>
          <nav className="space-y-px px-2.5">
            {slides.map((s, i) => {
              const active = i === activeIdx;
              return (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={cn(
                    "relative w-full rounded-xl px-2.5 py-2.5 text-left transition-all duration-200",
                    active ? "bg-white/[0.055]" : "hover:bg-white/[0.03]"
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="toc-bar"
                      className="absolute inset-y-1.5 left-0 w-0.5 rounded-r-full"
                      style={{ background: accent }}
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                  <div className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full font-mono text-[8px] font-bold transition-all"
                      style={{
                        background: active ? accent : "rgba(255,255,255,0.06)",
                        color: active ? "#04060d" : "rgba(255,255,255,0.28)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      {s.subtitle && (
                        <div
                          className="truncate text-[8px] font-bold uppercase tracking-[0.14em] transition-colors"
                          style={{ color: active ? accent : "rgba(255,255,255,0.22)" }}
                        >
                          {s.subtitle}
                        </div>
                      )}
                      <p
                        className="mt-0.5 text-[11.5px] font-medium leading-snug transition-colors"
                        style={{ color: active ? "#fff" : "rgba(255,255,255,0.4)" }}
                      >
                        {s.title}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ── Scrollable content ── */}
        <div
          ref={containerRef}
          className="no-scrollbar flex-1 overflow-y-auto"
          data-lenis-prevent
          style={{ overscrollBehavior: "contain" }}
        >
          <div className="mx-auto max-w-[800px] px-5 py-8 pb-36 sm:px-10 sm:py-10">
            {slides.map((slide, i) => (
              <motion.section
                key={i}
                ref={(el) => {
                  sectionRefs.current[i] = el;
                }}
                className={cn(i > 0 && "mt-12 border-t border-white/[0.07] pt-12")}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i < 6 ? i * 0.065 : 0,
                }}
              >
                <SectionRender slide={slide} accent={accent} isFirst={i === 0} />
              </motion.section>
            ))}
          </div>

          {/* Scroll-to-top button */}
          <AnimatePresence>
            {progress > 0.15 && (
              <motion.button
                onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
                className="fixed bottom-8 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-ink-900/80 text-white/50 shadow-lg backdrop-blur-md transition-colors hover:border-white/20 hover:text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronUp className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════
// Section renderer — maps each slide type to its layout
// ══════════════════════════════════════════════════════════
function SectionRender({
  slide,
  accent,
  isFirst,
}: {
  slide: DeepDiveSlide;
  accent: string;
  isFirst: boolean;
}) {
  const Viz = slide.visual ? VISUALS[slide.visual] ?? null : null;

  // Shared section heading
  const SHead = ({ tight = false }: { tight?: boolean }) => (
    <div className={tight ? "mb-5" : "mb-7"}>
      {slide.subtitle && (
        <div
          className="mb-2 text-[9.5px] font-bold uppercase tracking-[0.2em]"
          style={{ color: accent }}
        >
          {slide.subtitle}
        </div>
      )}
      <h2
        className={cn(
          "font-semibold tracking-tight text-white",
          isFirst ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-3xl"
        )}
      >
        {slide.title}
      </h2>
    </div>
  );

  // ── Hero ──────────────────────────────────────────────
  if (slide.type === "hero") {
    return (
      <div
        className="relative overflow-hidden rounded-3xl border border-white/[0.09] p-8 sm:p-12"
        style={{
          background: `linear-gradient(140deg, ${accent}1c 0%, ${accent}08 40%, transparent 70%)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
        {/* Glow orb */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full blur-3xl"
          style={{ background: `${accent}14` }}
        />
        <div className="relative">
          <SHead />
          {slide.tagline && (
            <p
              className="mb-7 text-base font-medium leading-relaxed sm:text-lg"
              style={{ color: `${accent}dd` }}
            >
              {slide.tagline}
            </p>
          )}
          <div className="space-y-4">
            {slide.body?.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-white/62">
                {p}
              </p>
            ))}
          </div>
          {Viz && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-ink-950/60">
              <div className="aspect-video">
                <Viz />
              </div>
              {slide.visualCaption && (
                <p className="border-t border-white/8 px-4 py-3 text-center text-[11.5px] text-white/38">
                  {slide.visualCaption}
                </p>
              )}
            </div>
          )}
          {slide.callout && <DiveCallout {...slide.callout} accent={accent} />}
        </div>
      </div>
    );
  }

  // ── Content (bullet cards) ─────────────────────────────
  if (slide.type === "content") {
    return (
      <div>
        <SHead />
        <div className="grid gap-4 sm:grid-cols-2">
          {slide.bullets?.map((b, i) => (
            <DiveCard key={i} accent={accent} delay={i * 0.04}>
              {b.label && (
                <div
                  className="mb-2.5 font-mono text-[11.5px] font-bold leading-snug"
                  style={{ color: accent }}
                >
                  {b.label}
                </div>
              )}
              <p className="text-[13.5px] leading-relaxed text-white/60">{b.text}</p>
            </DiveCard>
          ))}
        </div>
        {slide.callout && <DiveCallout {...slide.callout} accent={accent} />}
      </div>
    );
  }

  // ── Split (left text / right viz or text) ──────────────
  if (slide.type === "split") {
    return (
      <div>
        <SHead />
        <div className="grid gap-4 lg:grid-cols-2">
          <DiveCard accent={accent}>
            <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-white/62">
              {slide.left}
            </p>
          </DiveCard>
          {Viz ? (
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-950/50">
              <div className="aspect-[4/3]">
                <Viz />
              </div>
              {slide.visualCaption && (
                <p className="border-t border-white/8 px-4 py-2.5 text-center text-[11px] text-white/38">
                  {slide.visualCaption}
                </p>
              )}
            </div>
          ) : slide.right ? (
            <DiveCard accent={accent}>
              <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-white/62">
                {slide.right}
              </p>
            </DiveCard>
          ) : null}
        </div>
        {slide.callout && <DiveCallout {...slide.callout} accent={accent} />}
      </div>
    );
  }

  // ── Stats ──────────────────────────────────────────────
  if (slide.type === "stats") {
    return (
      <div>
        <SHead />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {slide.stats?.map((s, i) => {
            const c = s.color || accent;
            return (
              <div
                key={i}
                className="group rounded-2xl border p-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  borderColor: `${c}2a`,
                  background: `linear-gradient(145deg, ${c}0e, ${c}05)`,
                  boxShadow: `0 4px 24px -8px ${c}10`,
                }}
              >
                <div
                  className="font-mono text-3xl font-bold leading-none tracking-tight sm:text-4xl"
                  style={{ color: c }}
                >
                  {s.value}
                </div>
                {s.unit && (
                  <div className="mt-1 font-mono text-[10px]" style={{ color: `${c}99` }}>
                    {s.unit}
                  </div>
                )}
                <div className="mt-3 text-[10.5px] uppercase tracking-widest text-white/38">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
        {slide.callout && <DiveCallout {...slide.callout} accent={accent} />}
      </div>
    );
  }

  // ── Comparison ─────────────────────────────────────────
  if (slide.type === "comparison") {
    return (
      <div>
        <SHead />
        <div className="grid gap-4 sm:grid-cols-3">
          {slide.comparison?.map((col, i) => (
            <div
              key={i}
              className="group flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                borderColor: `${col.color}28`,
                background: `linear-gradient(155deg, ${col.color}10, ${col.color}04)`,
                boxShadow: `0 0 0 0 ${col.color}00`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px -8px ${col.color}28`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${col.color}00`;
              }}
            >
              <div className="mb-5 flex items-start justify-between gap-2">
                <h4 className="text-[15px] font-semibold text-white">{col.name}</h4>
                {col.badge && (
                  <span
                    className="flex-shrink-0 rounded-full px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-widest"
                    style={{ background: `${col.color}22`, color: col.color }}
                  >
                    {col.badge}
                  </span>
                )}
              </div>
              <ul className="flex-1 space-y-3">
                {col.points.map((p, j) => (
                  <li
                    key={j}
                    className="flex gap-2.5 text-[12.5px] leading-relaxed text-white/58"
                  >
                    <span
                      className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full"
                      style={{ background: col.color }}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Steps (numbered timeline) ──────────────────────────
  if (slide.type === "steps") {
    return (
      <div>
        <SHead />
        <div className="relative space-y-3 pl-6">
          {/* Vertical timeline line */}
          <div
            className="absolute left-[18px] top-5 bottom-5 w-px"
            style={{ background: `linear-gradient(to bottom, ${accent}60, ${accent}10)` }}
          />
          {slide.steps?.map((step, i) => (
            <div key={i} className="relative flex gap-5">
              {/* Node */}
              <div
                className="absolute -left-6 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold"
                style={{
                  background: `${accent}22`,
                  color: accent,
                  outline: `4px solid ${accent}10`,
                  border: `1px solid ${accent}44`,
                }}
              >
                {step.n}
              </div>
              <div
                className="ml-6 flex-1 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <h4 className="text-[14px] font-semibold text-white/90">{step.title}</h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Visual ─────────────────────────────────────────────
  if (slide.type === "visual") {
    return (
      <div>
        <SHead />
        <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-950/60 shadow-2xl">
          <div className="aspect-video">{Viz && <Viz />}</div>
          {slide.caption && (
            <p className="border-t border-white/8 px-5 py-4 text-center text-[13px] leading-relaxed text-white/48">
              {slide.caption}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ── Safety ─────────────────────────────────────────────
  if (slide.type === "safety") {
    return (
      <div>
        <SHead />
        <div className="grid gap-3 sm:grid-cols-2">
          {slide.bullets?.map((b, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-2xl border border-[#ffb020]/16 bg-[#ffb020]/[0.04] p-5"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#ffb020]" />
              <div>
                {b.label && (
                  <div className="mb-1.5 font-mono text-[12px] font-bold text-white/85">
                    {b.label}
                  </div>
                )}
                <p className="text-[13px] leading-relaxed text-white/55">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

// ── Glass card helper ──────────────────────────────────────
function DiveCard({
  children,
  accent,
  delay,
}: {
  children: ReactNode;
  accent: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="group rounded-2xl border border-white/[0.07] bg-white/[0.028] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.13] hover:bg-white/[0.045] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: delay ?? 0,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
    >
      {children}
    </motion.div>
  );
}

// ── Callout block helper ───────────────────────────────────
function DiveCallout({
  label,
  text,
  accent,
}: {
  label: string;
  text: string;
  accent: string;
}) {
  const Icon = CALLOUT_ICONS[label] ?? Lightbulb;
  return (
    <div
      className="mt-6 flex gap-4 rounded-2xl border p-5"
      style={{
        borderColor: `${accent}28`,
        background: `linear-gradient(135deg, ${accent}0d, ${accent}05)`,
      }}
    >
      <Icon
        className="mt-0.5 h-4 w-4 flex-shrink-0"
        style={{ color: accent }}
      />
      <div>
        <div
          className="mb-1.5 text-[9.5px] font-bold uppercase tracking-[0.18em]"
          style={{ color: accent }}
        >
          {label}
        </div>
        <p className="text-[13.5px] leading-relaxed text-white/70">{text}</p>
      </div>
    </div>
  );
}
