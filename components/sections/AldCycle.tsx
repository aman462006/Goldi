"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const phases = [
  {
    id: 0,
    name: "Clean surface",
    sub: "Reactive –OH sites",
    desc: "The wafer starts covered in hydroxyl (–OH) groups — the reactive sites TMA will bond to.",
    color: "#38bdf8",
  },
  {
    id: 1,
    name: "TMA pulse",
    sub: "Self-limiting",
    desc: "Trimethylaluminum flows in and bonds to every available –OH site, releasing methane. Once sites are full, it stops on its own.",
    color: "#7c3aed",
  },
  {
    id: 2,
    name: "Purge",
    sub: "N₂ / Ar",
    desc: "Inert gas sweeps away excess TMA and by-products, leaving exactly one molecular layer.",
    color: "#64748b",
  },
  {
    id: 3,
    name: "H₂O pulse",
    sub: "Forms Al₂O₃",
    desc: "Water reacts only with the bound TMA, forming Al₂O₃ and regenerating –OH sites. Also self-limiting.",
    color: "#7dd3fc",
  },
  {
    id: 4,
    name: "Purge",
    sub: "Cycle complete",
    desc: "A final purge clears the chamber. One full cycle has deposited ~0.1 nm — one atomic layer.",
    color: "#2dd4bf",
  },
];

export function AldCycle() {
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [cycles, setCycles] = useState(50);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setPhase((p) => (p + 1) % phases.length), 1900);
    return () => clearInterval(id);
  }, [playing]);

  const thicknessNm = (cycles * 0.1).toFixed(1);
  const current = phases[phase];

  return (
    <Section id="ald-cycle" className="py-28 sm:py-36">
      <SectionHeader
        eyebrow="Atomic Layer Deposition"
        title={
          <>
            Watch one atomic layer
            <br />
            <span className="text-gradient">form, cycle by cycle.</span>
          </>
        }
        description="ALD is chemistry with a metronome. Two precursors — TMA and water — pulse alternately, each reacting only where the other left off. Because every half-reaction is self-limiting, thickness is set by the number of cycles, not the dose."
        accent="#7c3aed"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Cycle stage */}
        <div className="overflow-hidden rounded-3xl glass">
          <AldStage phase={phase} />

          {/* Phase timeline */}
          <div className="border-t border-white/10 p-5">
            <div className="flex items-center justify-between gap-2">
              {phases.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setPhase(i);
                    setPlaying(false);
                  }}
                  className="group flex flex-1 flex-col items-center gap-2"
                >
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: p.color }}
                      initial={false}
                      animate={{
                        width: phase === i ? "100%" : phase > i ? "100%" : "0%",
                        opacity: phase === i ? 1 : phase > i ? 0.4 : 0.2,
                      }}
                      transition={{ duration: phase === i ? 1.8 : 0.3 }}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-medium transition-colors",
                      phase === i ? "text-white" : "text-white/35",
                    )}
                  >
                    {p.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => setPlaying((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-plasma-500 text-white transition-transform hover:scale-105"
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 pl-0.5" />}
              </button>
              <button
                onClick={() => {
                  setPhase(0);
                  setPlaying(false);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full glass text-white/70 transition-colors hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="min-w-0 flex-1"
                >
                  <div className="text-sm font-semibold text-white">
                    {current.name}{" "}
                    <span className="font-normal" style={{ color: current.color }}>
                      · {current.sub}
                    </span>
                  </div>
                  <div className="truncate text-[12px] text-white/45">
                    {current.desc}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right column: thickness builder + explanation */}
        <div className="flex flex-col gap-5">
          {/* Cycle → thickness */}
          <div className="rounded-3xl glass p-7">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">
                Cycles → thickness
              </h3>
              <span className="font-mono text-2xl font-semibold text-gradient-electric">
                {thicknessNm} nm
              </span>
            </div>

            {/* Stacked layers bar */}
            <div className="mt-5 flex h-24 items-end gap-[2px] overflow-hidden rounded-xl bg-ink-950/60 p-2">
              {Array.from({ length: Math.min(cycles, 60) }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    background: `linear-gradient(180deg, #a78bfa, #7c3aed)`,
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${20 + (i % 6) * 3}%` }}
                  transition={{ delay: i * 0.008, duration: 0.4 }}
                />
              ))}
            </div>

            <div className="mt-5">
              <div className="mb-2 flex justify-between text-[12px] text-white/45">
                <span>{cycles} cycles</span>
                <span>~0.1 nm / cycle</span>
              </div>
              <input
                type="range"
                min={10}
                max={200}
                step={5}
                value={cycles}
                onChange={(e) => setCycles(parseInt(e.target.value))}
                className="topcon-range w-full"
              />
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-white/45">
              To reach a 10 nm film you run{" "}
              <span className="font-mono text-white/70">100 cycles</span>. Production
              Al₂O₃ passivation is typically 5–10 nm — thick enough for full
              passivation, thin enough to keep throughput and contact-opening practical.
            </p>
          </div>

          {/* Conformality note */}
          <div className="rounded-3xl border border-plasma-400/20 bg-plasma-500/[0.05] p-6">
            <h3 className="text-sm font-semibold text-plasma-300">
              Why ALD coats pyramids perfectly
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/55">
              Because each reaction is self-limiting, precursor reaches into every
              valley and up every sidewall and reacts exactly once. Spraying or
              evaporation leaves thin spots on the texture; ALD lays down a near-identical
              thickness everywhere — that&apos;s <em>conformality</em>.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---- Canvas stage: TMA/H2O molecules + conformal film on pyramids ---- */
function AldStage({ phase }: { phase: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const layersRef = useRef(0);

  useEffect(() => {
    // grow film thickness whenever we complete an H2O pulse (phase 3->4)
    if (phase === 4) layersRef.current = Math.min(layersRef.current + 1, 6);
    if (phase === 0 && layersRef.current > 5) layersRef.current = 0;
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const molecules: { x: number; y: number; vy: number; kind: number }[] = [];
    let t = 0;

    function pyramidPath() {
      const baseY = h * 0.82;
      const pw = w / 4;
      ctx!.beginPath();
      ctx!.moveTo(0, baseY);
      for (let i = 0; i < 4; i++) {
        ctx!.lineTo((i + 0.5) * pw, baseY - 70);
        ctx!.lineTo((i + 1) * pw, baseY);
      }
      ctx!.lineTo(w, h);
      ctx!.lineTo(0, h);
      ctx!.closePath();
    }

    function frame() {
      ctx!.clearRect(0, 0, w, h);
      const ph = phaseRef.current;

      // silicon pyramids
      pyramidPath();
      const g = ctx!.createLinearGradient(0, h * 0.4, 0, h);
      g.addColorStop(0, "#1f3a6b");
      g.addColorStop(1, "#0e1424");
      ctx!.fillStyle = g;
      ctx!.fill();

      // conformal Al2O3 film (stroke following the surface, thickness = layers)
      const layers = layersRef.current;
      for (let l = 0; l < layers; l++) {
        pyramidPath();
        ctx!.lineWidth = 2;
        ctx!.strokeStyle = `rgba(167,139,250,${0.25 + l * 0.12})`;
        ctx!.stroke();
      }
      // label
      ctx!.fillStyle = "rgba(255,255,255,0.4)";
      ctx!.font = "600 11px 'JetBrains Mono', monospace";
      ctx!.textAlign = "left";
      ctx!.fillText(`Al₂O₃  ${(layers * 0.1).toFixed(1)} nm`, 12, h - 12);
      ctx!.textAlign = "right";
      ctx!.fillText("textured Si", w - 12, h - 12);

      // molecules depending on phase
      const wantKind = ph === 1 ? 1 : ph === 3 ? 2 : 0; // TMA / H2O / none
      if (wantKind && t % 6 === 0 && molecules.length < 30) {
        molecules.push({
          x: Math.random() * w,
          y: -10,
          vy: 1.2 + Math.random() * 1.2,
          kind: wantKind,
        });
      }
      const baseY = h * 0.82;
      for (let i = molecules.length - 1; i >= 0; i--) {
        const m = molecules[i];
        m.y += m.vy;
        // settle near surface
        if (m.y > baseY - 74) {
          m.vy *= 0.7;
          if (m.vy < 0.15) {
            molecules.splice(i, 1);
            continue;
          }
        }
        const color = m.kind === 1 ? "124,58,237" : "125,211,252";
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${color},0.18)`;
        ctx!.arc(m.x, m.y, 11, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.beginPath();
        ctx!.fillStyle = `rgb(${color})`;
        ctx!.arc(m.x, m.y, 5, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = "#04060d";
        ctx!.font = "700 7px Inter";
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(m.kind === 1 ? "Al" : "O", m.x, m.y);
        ctx!.textBaseline = "alphabetic";
      }
      if (!wantKind) molecules.length = Math.max(0, molecules.length - 1);

      // phase caption top-left
      ctx!.fillStyle = `${phases[ph].color}`;
      ctx!.font = "700 13px Inter";
      ctx!.textAlign = "left";
      ctx!.fillText(phases[ph].name, 14, 26);

      t += 1;
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="h-[320px] w-full sm:h-[380px]" />;
}
