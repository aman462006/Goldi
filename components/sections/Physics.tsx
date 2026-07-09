"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/Section";
import { physicsConcepts } from "@/data/physics";
import { PNJunction } from "@/components/viz/PNJunction";
import { cn } from "@/lib/utils";

export function Physics() {
  const [active, setActive] = useState(physicsConcepts[0].id);
  const concept = physicsConcepts.find((c) => c.id === active)!;

  return (
    <Section id="physics" className="py-28 sm:py-36">
      <SectionHeader
        eyebrow="Solar Cell Physics"
        title={
          <>
            The physics that turns
            <br />
            <span className="text-gradient">light into current.</span>
          </>
        }
        description="Before any factory step makes sense, seven ideas have to click — from the band gap that catches a photon to the mental model of how carriers really move. Follow them in order; each one sets up the next."
        accent="#a78bfa"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Concept selector */}
        <div className="flex flex-col gap-2.5">
          {physicsConcepts.map((c, i) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300",
                  isActive
                    ? "border-white/15 bg-white/[0.06]"
                    : "border-white/5 bg-white/[0.015] hover:bg-white/[0.04]",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="physics-active"
                    className="absolute left-0 top-0 h-full w-1 rounded-r-full"
                    style={{ background: c.accent, boxShadow: `0 0 14px ${c.accent}` }}
                  />
                )}
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold"
                    style={{
                      background: `${c.accent}1c`,
                      color: c.accent,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div
                      className={cn(
                        "text-sm font-semibold transition-colors",
                        isActive ? "text-white" : "text-white/70",
                      )}
                    >
                      {c.title}
                    </div>
                    <div className="mt-0.5 truncate text-[12px] text-white/40">
                      {c.short}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Concept detail + viz */}
        <div className="flex flex-col gap-5">
          <div className="relative h-[280px] overflow-hidden rounded-3xl glass sm:h-[320px]">
            <PNJunction accent={concept.accent} conceptId={concept.id} />
          </div>
          <div className="rounded-3xl glass p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h3
                  className="text-2xl font-semibold tracking-tight"
                  style={{ color: concept.accent }}
                >
                  {concept.title}
                </h3>
                <div className="mt-4 space-y-3">
                  {concept.body.map((p, i) => (
                    <p key={i} className="text-[15px] leading-relaxed text-white/60">
                      {p}
                    </p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
