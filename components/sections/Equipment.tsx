"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Flame, Zap } from "lucide-react";

export function Equipment() {
  return (
    <Section id="equipment" className="py-28 sm:py-36">
      <SectionHeader
        eyebrow="Inside the Machines"
        title={
          <>
            A quartz furnace and
            <br />
            <span className="text-gradient">a cloud of plasma.</span>
          </>
        }
        description="Two of TOPCon's defining tools. LPCVD grows the poly-silicon in a long, hot, low-pressure quartz tube. PECVD grows silicon nitride in a cold glow of RF plasma — so the finished junction is never overheated."
        accent="#3b8cff"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {/* LPCVD furnace */}
        <Reveal>
          <div className="overflow-hidden rounded-3xl glass">
            <div className="flex items-center gap-3 border-b border-white/10 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-500/20">
                <Flame className="h-5 w-5 text-electric-300" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white">LPCVD Furnace</h3>
                <p className="text-[12px] text-white/45">
                  Low-Pressure CVD · 590–630 °C · &lt; 2000 sccm
                </p>
              </div>
            </div>
            <FurnaceCanvas />
            <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 text-center">
              <Stat label="Boat" value="1000 pcs" />
              <Stat label="Poly" value="~130 nm" />
              <Stat label="Oxide" value="1.9–2.1 nm" />
            </div>
          </div>
        </Reveal>

        {/* PECVD plasma */}
        <Reveal i={1}>
          <div className="overflow-hidden rounded-3xl glass">
            <div className="flex items-center gap-3 border-b border-white/10 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-plasma-500/20">
                <Zap className="h-5 w-5 text-plasma-300" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white">PECVD Plasma</h3>
                <p className="text-[12px] text-white/45">
                  Plasma-Enhanced CVD · 200–450 °C · RF glow discharge
                </p>
              </div>
            </div>
            <PlasmaCanvas />
            <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 text-center">
              <Stat label="Index" value="n ≈ 2.0–2.3" />
              <Stat label="ARC" value="~78 nm" />
              <Stat label="Boat" value="416 pcs" />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Explanatory strip */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-electric-500/15 bg-electric-500/[0.04] p-5"
        >
          <p className="text-[13px] leading-relaxed text-white/60">
            <span className="font-semibold text-electric-300">Why LPCVD?</span> Silane
            (SiH₄) thermally decomposes — SiH₄ → Si + 2 H₂ — and the silicon builds a
            dense, uniform poly layer on the tunnel oxide. Low pressure spreads the gas
            evenly and suppresses gas-phase reactions for a clean, low-defect film.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-plasma-400/15 bg-plasma-500/[0.04] p-5"
        >
          <p className="text-[13px] leading-relaxed text-white/60">
            <span className="font-semibold text-plasma-300">Why PECVD?</span> The RF field
            rips SiH₄ and NH₃ into reactive fragments, so SiNₓ:H grows at ~200–450 °C
            instead of 700–900 °C. That protects the already-formed junction — and traps
            hydrogen that later passivates bulk defects during firing.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4">
      <div className="font-mono text-sm font-semibold text-white/85">{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-widest text-white/35">
        {label}
      </div>
    </div>
  );
}

/* ---- LPCVD quartz-tube furnace ---- */
function FurnaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    const gas: { x: number; y: number; v: number }[] = [];
    let t = 0;

    function frame() {
      ctx!.clearRect(0, 0, w, h);
      const cy = h / 2;
      const tubeH = h * 0.5;

      // heat glow bg
      const glow = ctx!.createLinearGradient(0, cy - tubeH / 2, 0, cy + tubeH / 2);
      const pulse = 0.08 + Math.sin(t * 0.04) * 0.03;
      glow.addColorStop(0, `rgba(255,120,40,${pulse})`);
      glow.addColorStop(0.5, `rgba(255,80,20,${pulse * 1.6})`);
      glow.addColorStop(1, `rgba(255,120,40,${pulse})`);
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, cy - tubeH / 2, w, tubeH);

      // tube walls
      ctx!.strokeStyle = "rgba(125,211,252,0.35)";
      ctx!.lineWidth = 2;
      ctx!.beginPath();
      ctx!.moveTo(20, cy - tubeH / 2);
      ctx!.lineTo(w - 20, cy - tubeH / 2);
      ctx!.moveTo(20, cy + tubeH / 2);
      ctx!.lineTo(w - 20, cy + tubeH / 2);
      ctx!.stroke();

      // heating coils
      ctx!.strokeStyle = "rgba(255,140,60,0.5)";
      ctx!.lineWidth = 2;
      for (let x = 30; x < w - 30; x += 22) {
        ctx!.beginPath();
        ctx!.arc(x, cy - tubeH / 2 - 6, 6, Math.PI, 0);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.arc(x, cy + tubeH / 2 + 6, 6, 0, Math.PI);
        ctx!.stroke();
      }

      // wafer boat (vertical wafers)
      const boatX = w * 0.3;
      const boatW = w * 0.44;
      const n = 14;
      for (let i = 0; i < n; i++) {
        const x = boatX + (boatW / n) * i;
        const shimmer = 0.5 + Math.sin(t * 0.05 + i) * 0.12;
        ctx!.fillStyle = `rgba(99,172,255,${shimmer})`;
        ctx!.fillRect(x, cy - tubeH / 2 + 12, 2.4, tubeH - 24);
      }

      // gas flow in from left
      if (t % 5 === 0 && gas.length < 40) {
        gas.push({
          x: 24,
          y: cy + (Math.random() - 0.5) * (tubeH - 20),
          v: 0.7 + Math.random() * 0.8,
        });
      }
      for (let i = gas.length - 1; i >= 0; i--) {
        const p = gas[i];
        p.x += p.v;
        if (p.x > w - 24) {
          gas.splice(i, 1);
          continue;
        }
        ctx!.beginPath();
        ctx!.fillStyle = "rgba(163,230,53,0.7)";
        ctx!.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.fillStyle = "rgba(255,255,255,0.35)";
      ctx!.font = "600 10px 'JetBrains Mono', monospace";
      ctx!.textAlign = "left";
      ctx!.fillText("SiH₄ →", 22, cy - tubeH / 2 - 20);
      ctx!.textAlign = "right";
      ctx!.fillText("→ Si + 2H₂", w - 22, cy + tubeH / 2 + 24);

      t += 1;
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);
  return <canvas ref={canvasRef} className="h-[240px] w-full" />;
}

/* ---- PECVD plasma glow discharge ---- */
function PlasmaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    const ions: { x: number; y: number; vx: number; vy: number; c: string }[] = [];
    let t = 0;

    function frame() {
      ctx!.clearRect(0, 0, w, h);
      const waferY = h * 0.72;

      // electrodes
      ctx!.fillStyle = "rgba(148,163,184,0.25)";
      ctx!.fillRect(20, h * 0.16, w - 40, 6); // top (cathode)
      ctx!.fillStyle = "rgba(148,163,184,0.4)";
      ctx!.fillRect(20, waferY + 10, w - 40, 8); // bottom

      // RF field ripples
      const pulse = Math.sin(t * 0.1);
      ctx!.strokeStyle = `rgba(124,58,237,${0.14 + pulse * 0.08})`;
      ctx!.lineWidth = 1;
      for (let y = h * 0.22; y < waferY; y += 14) {
        ctx!.beginPath();
        for (let x = 20; x < w - 20; x += 6) {
          const yy = y + Math.sin(x * 0.05 + t * 0.12) * 3;
          if (x === 20) ctx!.moveTo(x, yy);
          else ctx!.lineTo(x, yy);
        }
        ctx!.stroke();
      }

      // plasma glow
      const glow = ctx!.createRadialGradient(w / 2, h * 0.44, 10, w / 2, h * 0.44, w * 0.5);
      glow.addColorStop(0, `rgba(139,92,246,${0.22 + pulse * 0.06})`);
      glow.addColorStop(1, "rgba(139,92,246,0)");
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, h * 0.18, w, waferY - h * 0.18);

      // wafer
      ctx!.fillStyle = "rgba(31,58,107,0.9)";
      ctx!.fillRect(w * 0.15, waferY, w * 0.7, 8);

      // ionized species
      if (t % 3 === 0 && ions.length < 60) {
        const kinds = [
          ["99,172,255", -1], // Si
          ["244,114,182", -1], // N
          ["125,211,252", -1], // H
        ] as const;
        const k = kinds[Math.floor(Math.random() * kinds.length)];
        ions.push({
          x: 20 + Math.random() * (w - 40),
          y: h * 0.24,
          vx: (Math.random() - 0.5) * 0.6,
          vy: 0.8 + Math.random() * 1.2,
          c: k[0],
        });
      }
      for (let i = ions.length - 1; i >= 0; i--) {
        const p = ions[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > waferY) {
          ions.splice(i, 1);
          continue;
        }
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${p.c},0.16)`;
        ctx!.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.beginPath();
        ctx!.fillStyle = `rgb(${p.c})`;
        ctx!.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.fillStyle = "rgba(255,255,255,0.35)";
      ctx!.font = "600 10px 'JetBrains Mono', monospace";
      ctx!.textAlign = "left";
      ctx!.fillText("SiH₄ + NH₃ → plasma", 24, h * 0.14);
      ctx!.textAlign = "center";
      ctx!.fillText("SiNₓ:H film", w / 2, waferY + 30);

      t += 1;
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);
  return <canvas ref={canvasRef} className="h-[240px] w-full" />;
}
