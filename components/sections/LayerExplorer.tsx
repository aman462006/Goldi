"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Rotate3d, Move3d, MousePointerClick, Sun } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { cellLayers } from "@/data/layers";
import { getStep } from "@/data/process";
import { cn } from "@/lib/utils";

const LayerStack = dynamic(() => import("@/components/three/LayerStack"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <div className="h-24 w-24 animate-pulse rounded-2xl bg-electric-500/20 blur-2xl" />
    </div>
  ),
});

export function LayerExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>("wafer");
  const [explode, setExplode] = useState(0.5);
  const [autoRotate, setAutoRotate] = useState(true);

  const selected = cellLayers.find((l) => l.id === selectedId) || null;
  const step = selected ? getStep(selected.process) : null;

  return (
    <Section id="explorer" className="py-28 sm:py-36">
      <SectionHeader
        eyebrow="Layer Explorer"
        title={
          <>
            The complete stack,
            <br />
            <span className="text-gradient">pulled apart.</span>
          </>
        }
        description="A TOPCon cell is a sandwich of nine engineered layers — some hundreds of microns thick, some barely a nanometre. Drag to rotate, slide to explode, and click any layer to learn what it does."
        accent="#38bdf8"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* 3D viewer */}
        <div className="relative">
          <div className="relative h-[460px] overflow-hidden rounded-3xl glass sm:h-[560px]">
            <div className="pointer-events-none absolute inset-0 z-0 grid-lines opacity-30" />
            <div
              className="absolute inset-0 z-10"
              onPointerDown={() => setAutoRotate(false)}
            >
              <LayerStack
                selectedId={selectedId}
                explode={explode}
                onSelect={(id) => setSelectedId(id || null)}
                autoRotate={autoRotate}
              />
            </div>

            {/* Sun / back indicators */}
            <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full glass-strong px-3 py-1.5 text-[11px] font-medium text-signal-amber">
              <Sun className="h-3.5 w-3.5" /> Sunlight ↓
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4 z-20 rounded-full glass-strong px-3 py-1.5 text-[11px] font-medium text-white/50">
              Rear electrode
            </div>

            {/* Controls */}
            <div className="absolute inset-x-4 bottom-4 z-20 flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-2xl glass-strong px-4 py-3">
                <Move3d className="h-4 w-4 flex-shrink-0 text-electric-300" />
                <span className="text-[11px] font-medium text-white/50">Explode</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={explode}
                  onChange={(e) => setExplode(parseFloat(e.target.value))}
                  className="topcon-range flex-1"
                />
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/40">
            <span className="flex items-center gap-1.5">
              <Rotate3d className="h-3.5 w-3.5" /> Drag to rotate
            </span>
            <span className="flex items-center gap-1.5">
              <MousePointerClick className="h-3.5 w-3.5" /> Click a layer
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" /> Not to scale — wafer is ~1000× the films
            </span>
          </div>
        </div>

        {/* Info + layer list */}
        <div className="flex flex-col gap-4">
          {/* Selected panel */}
          <div className="relative min-h-[220px] overflow-hidden rounded-3xl glass p-6">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
                      style={{
                        background: `${selected.emissive}1e`,
                        color: selected.emissive,
                      }}
                    >
                      {selected.side} side
                    </span>
                    {selected.formula && (
                      <span className="font-mono text-sm text-white/50">
                        {selected.formula}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                    {selected.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: selected.emissive }}>
                    {selected.role} · {selected.thickness}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">
                    {selected.detail}
                  </p>
                  {step && (
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/50">
                      Created in step {step.step}: <span className="text-white/80">{step.name}</span>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="flex h-full items-center justify-center text-center text-sm text-white/40">
                  Click a layer in the stack to inspect it.
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Layer list */}
          <div className="rounded-3xl glass p-2">
            {cellLayers.map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedId(l.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                  selectedId === l.id ? "bg-white/10" : "hover:bg-white/5",
                )}
              >
                <span
                  className="h-6 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: l.emissive, boxShadow: `0 0 10px ${l.emissive}88` }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-white/85">
                    {l.name}
                  </span>
                </span>
                <span className="flex-shrink-0 font-mono text-[11px] text-white/35">
                  {l.thickness}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
