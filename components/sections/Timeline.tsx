"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/Section";
import { processSteps } from "@/data/process";
import { useLenis } from "@/components/providers/SmoothScroll";

export function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.35"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const { scrollTo } = useLenis();

  return (
    <Section id="timeline" className="py-28 sm:py-36">
      <SectionHeader
        eyebrow="The Complete Flow"
        title={
          <>
            Ten steps from wafer
            <br />
            <span className="text-gradient">to finished cell.</span>
          </>
        }
        description="A bare sawn wafer enters; a graded, tested, high-efficiency bifacial cell leaves. Each stage transforms the wafer physically and electrically — scroll to light up the line, or jump straight into any step below."
        accent="#2dd4bf"
      />

      <div ref={trackRef} className="relative mt-20">
        {/* Base line */}
        <div className="absolute left-0 right-0 top-6 h-[2px] bg-white/8" />
        {/* Progress line */}
        <motion.div
          className="absolute left-0 top-6 h-[2px] origin-left"
          style={{
            width: lineWidth,
            background: "linear-gradient(90deg,#38bdf8,#3b8cff,#7c3aed,#f472b6,#a3e635)",
            boxShadow: "0 0 14px rgba(59,140,255,0.6)",
          }}
        />

        <div className="no-scrollbar -mx-5 overflow-x-auto px-5 pb-4 lg:mx-0 lg:overflow-visible lg:px-0">
          <div className="flex min-w-[900px] gap-3 lg:min-w-0 lg:grid lg:grid-cols-10 lg:gap-2">
            {processSteps.map((s, i) => (
              <TimelineNode
                key={s.id}
                step={s}
                index={i}
                progress={scrollYProgress}
                onClick={() => scrollTo("#process", { offset: -60 })}
              />
            ))}
          </div>
        </div>
      </div>

    </Section>
  );
}

function TimelineNode({
  step,
  index,
  progress,
  onClick,
}: {
  step: (typeof processSteps)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  onClick: () => void;
}) {
  const threshold = index / processSteps.length;
  const opacity = useTransform(
    progress,
    [threshold - 0.02, threshold + 0.05],
    [0.35, 1],
  );
  const dotScale = useTransform(
    progress,
    [threshold - 0.02, threshold + 0.05],
    [0.7, 1],
  );

  return (
    <motion.button
      style={{ opacity }}
      onClick={onClick}
      className="group flex flex-1 flex-col items-start text-left"
    >
      {/* Dot */}
      <motion.span
        style={{ scale: dotScale }}
        className="relative mb-4 flex h-[13px] w-[13px] items-center justify-center rounded-full ring-4 ring-ink-950"
      >
        <span
          className="h-[13px] w-[13px] rounded-full"
          style={{ background: step.accent, boxShadow: `0 0 12px ${step.accent}` }}
        />
      </motion.span>

      <div className="w-[92px] rounded-2xl border border-white/6 bg-white/[0.02] p-3 transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/[0.05] lg:w-full">
        <div
          className="font-mono text-[10px] font-semibold"
          style={{ color: step.accent }}
        >
          {String(step.step).padStart(2, "0")}
        </div>
        <div className="mt-1 text-[13px] font-semibold leading-tight text-white/85">
          {step.name}
        </div>
        <div className="mt-1.5 hidden text-[11px] leading-snug text-white/40 lg:block">
          {step.side}
        </div>
      </div>
    </motion.button>
  );
}
