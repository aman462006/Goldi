"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, AlertTriangle } from "lucide-react";
import type { DeepDiveSlide } from "@/data/types";
import { cn } from "@/lib/utils";
import { 
  LpcvdFurnaceAnimation, 
  QuantumTunnelingAnimation,
  LayerBuildAnimation,
  BandDiagramAnimation,
  CurrentSpreadingAnimation
} from "../viz/LpcvdAnimations";
import { 
  AldCycleAnimation,
  AldFieldEffectAnimation
} from "../viz/AldAnimations";
import {
  PecvdPlasmaAnimation,
  AntiReflectionAnimation
} from "../viz/PecvdAnimations";
import { SawDamageAnimation, LightTrappingAnimation } from "../viz/TextureAnimations";
import { BoronDiffusionAnimation } from "../viz/BoronAnimations";
import { EdgeIsolationAnimation } from "../viz/RearEtchAnimations";
import { PhosphorusDiffusionAnimation, SelectiveEmitterAnimation } from "../viz/Pocl3Animations";
import { ChemicalEtchAnimation } from "../viz/FrontEtchAnimations";
import { SnapOffAnimation, FiringFritAnimation } from "../viz/PrintAnimations";
import { ElTestingAnimation } from "../viz/TestAnimations";
import { DiagramFigure } from "../diagrams/Diagrams";

// Map visual keys to their respective components
const VISUALS: Record<string, () => JSX.Element> = {
  "furnace": LpcvdFurnaceAnimation,
  "tunneling": QuantumTunnelingAnimation,
  "layerBuild": LayerBuildAnimation,
  "bandDiagram": BandDiagramAnimation,
  "currentSpreading": CurrentSpreadingAnimation,
  "band-selectivity": () => <DiagramFigure name="band-selectivity" caption="" />,
  "polysi-color": () => <DiagramFigure name="polysi-color" caption="" />,
  "aldCycle": AldCycleAnimation,
  "aldFieldEffect": AldFieldEffectAnimation,
  "pecvdPlasma": PecvdPlasmaAnimation,
  "antiReflection": AntiReflectionAnimation,
  "sawDamage": SawDamageAnimation,
  "lightTrapping": LightTrappingAnimation,
  "boronDiffusion": BoronDiffusionAnimation,
  "edgeIsolation": EdgeIsolationAnimation,
  "phosphorusDiffusion": PhosphorusDiffusionAnimation,
  "selectiveEmitter": SelectiveEmitterAnimation,
  "chemicalEtch": ChemicalEtchAnimation,
  "snapOff": SnapOffAnimation,
  "firingFrit": FiringFritAnimation,
  "elTesting": ElTestingAnimation
};

export function DeepDiveModal({
  slides,
  accent,
  onClose,
}: {
  slides: DeepDiveSlide[];
  accent: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const next = () => {
    if (index < slides.length - 1) {
      setDirection(1);
      setIndex((i) => i + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex((i) => i - 1);
    }
  };

  const slide = slides[index];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      z: 0,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 60 : -60,
      opacity: 0,
    }),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-2xl"
      />

      {/* Main Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="relative flex h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 glass-strong shadow-2xl"
      >
        {/* Header bar */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <span
              className="rounded-full px-3 py-1 font-mono text-[11px] font-semibold"
              style={{ background: `${accent}22`, color: accent }}
            >
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
            <span className="text-sm font-medium text-white/50">Dive Deeper</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body: sidebar + slide content */}
        <div className="relative flex flex-grow overflow-hidden">
          {/* ── Slide nav sidebar ── */}
          <nav className="no-scrollbar hidden w-56 flex-shrink-0 overflow-y-auto border-r border-white/8 py-3 lg:block"
               style={{ background: "rgba(255,255,255,0.025)" }}>
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className="group w-full px-3 py-2.5 text-left transition-colors"
                >
                  <div className="flex items-start gap-2.5 rounded-xl px-2.5 py-2 transition-colors"
                       style={{
                         background: active ? `${accent}18` : "transparent",
                         borderLeft: active ? `2px solid ${accent}` : "2px solid transparent",
                       }}>
                    <span
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold"
                      style={{
                        background: active ? accent : "rgba(255,255,255,0.08)",
                        color: active ? "#04060d" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      {s.subtitle && (
                        <div
                          className="truncate text-[9px] font-semibold uppercase tracking-widest"
                          style={{ color: active ? accent : "rgba(255,255,255,0.35)" }}
                        >
                          {s.subtitle}
                        </div>
                      )}
                      <div
                        className="mt-0.5 truncate text-[12px] font-medium leading-snug"
                        style={{ color: active ? "#fff" : "rgba(255,255,255,0.5)" }}
                      >
                        {s.title}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* ── Slide Content Area ── */}
          <div className="relative flex-grow overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 overflow-y-auto px-6 py-8 sm:px-12 sm:py-12"
                data-lenis-prevent
                style={{ overscrollBehavior: "contain" }}
              >
                <div className="mx-auto max-w-4xl">
                  {slide.subtitle && (
                    <div
                      className="mb-3 text-[11px] font-bold uppercase tracking-widest"
                      style={{ color: accent }}
                    >
                      {slide.subtitle}
                    </div>
                  )}
                  <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl text-white">
                    {slide.title}
                  </h2>
                  {slide.tagline && (
                    <p className="mt-3 text-lg font-medium text-white/60">{slide.tagline}</p>
                  )}

                  <div className="mt-10">
                    <SlideRenderer slide={slide} accent={accent} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-shrink-0 items-center justify-between border-t border-white/10 bg-white/[0.02] px-6 py-4">
          <button
            onClick={prev}
            disabled={index === 0}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors disabled:opacity-30 hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 24 : 6,
                  background: i === index ? accent : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={index === slides.length - 1}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors disabled:opacity-30 hover:bg-white/10"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Sub-component to render different slide types
function SlideRenderer({ slide, accent }: { slide: DeepDiveSlide; accent: string }) {
  const VisualComp = slide.visual ? VISUALS[slide.visual] : null;

  switch (slide.type) {
    case "hero":
      return (
        <div className="space-y-8">
          {slide.body?.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-white/80">
              {p}
            </p>
          ))}
          {slide.callout && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-white/50">
                {slide.callout.label}
              </div>
              <div className="text-[15px] leading-relaxed text-white">
                {slide.callout.text}
              </div>
            </div>
          )}
        </div>
      );

    case "split":
      return (
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-6">
            {slide.body?.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-white/80">
                {p}
              </p>
            ))}
            {slide.left && (
              <div className="whitespace-pre-line text-[15px] leading-relaxed text-white/80">
                {slide.left}
              </div>
            )}
          </div>
          {VisualComp ? (
            <div>
              <div className="aspect-4/3 overflow-hidden rounded-2xl border border-white/10 bg-ink-950/50">
                <VisualComp />
              </div>
              {slide.visualCaption && (
                <div className="mt-3 text-center text-[12px] text-white/50">
                  {slide.visualCaption}
                </div>
              )}
            </div>
          ) : slide.right ? (
            <div className="whitespace-pre-line text-[15px] leading-relaxed text-white/80">
              {slide.right}
            </div>
          ) : null}
        </div>
      );

    case "visual":
      return (
        <div className="mx-auto max-w-2xl">
          {VisualComp && (
            <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-ink-950/50">
              <VisualComp />
            </div>
          )}
          {slide.caption && (
            <p className="mt-6 text-center text-[15px] leading-relaxed text-white/70">
              {slide.caption}
            </p>
          )}
        </div>
      );

    case "content":
      return (
        <div className="grid gap-8 lg:grid-cols-2">
          {slide.bullets?.map((b, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              {b.label && (
                <div className="mb-2 font-mono text-[13px] font-bold" style={{ color: accent }}>
                  {b.label}
                </div>
              )}
              <p className="text-[14px] leading-relaxed text-white/70">{b.text}</p>
            </div>
          ))}
          {slide.callout && (
            <div className="col-span-full mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-white/50">
                {slide.callout.label}
              </div>
              <div className="text-[15px] leading-relaxed text-white">
                {slide.callout.text}
              </div>
            </div>
          )}
        </div>
      );

    case "steps":
      return (
        <div className="space-y-4">
          {slide.steps?.map((step, i) => (
            <div key={i} className="flex gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-mono text-lg font-bold"
                style={{ background: `${accent}22`, color: accent }}
              >
                {step.n}
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-white">{step.title}</h4>
                <p className="mt-1 text-[14px] leading-relaxed text-white/60">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      );

    case "stats":
      return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {slide.stats?.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border p-6"
              style={{
                borderColor: s.color ? `${s.color}33` : `${accent}33`,
                background: s.color ? `${s.color}0c` : `${accent}0c`,
              }}
            >
              <div className="text-[11px] uppercase tracking-widest text-white/50">
                {s.label}
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-mono text-3xl font-semibold text-white">
                  {s.value}
                </span>
                {s.unit && <span className="font-mono text-sm text-white/40">{s.unit}</span>}
              </div>
            </div>
          ))}
        </div>
      );

    case "comparison":
      return (
        <div className="grid gap-6 lg:grid-cols-3">
          {slide.comparison?.map((col, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{col.name}</h3>
                {col.badge && (
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ background: `${col.color}22`, color: col.color }}
                  >
                    {col.badge}
                  </span>
                )}
              </div>
              <ul className="mt-6 space-y-4">
                {col.points.map((p, j) => (
                  <li key={j} className="flex gap-3 text-[13px] leading-relaxed text-white/70">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: col.color }}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
