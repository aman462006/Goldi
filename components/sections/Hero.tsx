"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useLenis } from "@/components/providers/SmoothScroll";

const CrystalScene = dynamic(() => import("@/components/three/CrystalScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-electric-500/20 blur-3xl" />
    </div>
  ),
});

const words = ["Journey", "Inside", "a", "Solar", "Cell"];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const { scrollTo } = useLenis();

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* 3D scene */}
      <motion.div
        style={{ scale: sceneScale, opacity }}
        className="absolute inset-0 z-0"
      >
        <CrystalScene />
      </motion.div>

      {/* Vignette + grid */}
      <div className="pointer-events-none absolute inset-0 z-[1] grid-lines opacity-40 mask-fade-b" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-5xl px-5 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium tracking-[0.2em] text-white/60 uppercase backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-electric-300" />
          Tunnel Oxide Passivated Contact
        </motion.div>

        <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          {words.map((w, i) => (
            <motion.span
              key={w + i}
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.35 + i * 0.1,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={
                i >= 3
                  ? "mr-[0.25em] inline-block text-gradient"
                  : "mr-[0.25em] inline-block"
              }
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-white/55 sm:text-xl"
        >
          Explore every manufacturing step — from raw silicon wafer to a
          high-efficiency photovoltaic device — through the physics, chemistry,
          and atomic layers that make TOPCon the world&apos;s leading solar technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton onClick={() => scrollTo("#intro", { offset: -60 })}>
            Start Journey
            <ArrowDown className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            variant="ghost"
            onClick={() => scrollTo("#explorer", { offset: -60 })}
          >
            Explore the Layers
          </MagneticButton>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mx-auto mt-16 flex max-w-lg items-center justify-center gap-8 text-center"
        >
          {[
            { v: "25%+", l: "Efficiency" },
            { v: "1.5 nm", l: "Tunnel oxide" },
            { v: "10", l: "Process steps" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-2xl font-semibold text-gradient-electric sm:text-3xl">
                {s.v}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-widest text-white/40">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
