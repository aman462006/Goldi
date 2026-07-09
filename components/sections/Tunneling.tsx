"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Zap, Ban } from "lucide-react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  kind: "electron" | "hole";
  crossing: boolean;
  reflected: boolean;
  alpha: number;
};

export function Tunneling() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [oxideNm, setOxideNm] = useState(1.5);
  const oxideRef = useRef(oxideNm);
  oxideRef.current = oxideNm;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

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

    const particles: Particle[] = [];
    let phase = 0;

    function barrierX() {
      return w * 0.5;
    }
    function barrierWidth() {
      // 0.5nm -> thin, 5nm -> thick. Map to px.
      return 8 + (oxideRef.current / 5) * 70;
    }
    // Electron tunneling probability vs oxide thickness.
    // Logistic centred at ~2.6 nm: high through the 1.2-1.8 nm sweet spot,
    // then collapses as the barrier thickens (≈0.5% at 5 nm).
    function tunnelProb() {
      const t = oxideRef.current;
      const p = 1 / (1 + Math.exp((t - 2.6) * 2.2));
      return Math.max(0.03, Math.min(0.98, p));
    }

    function spawn() {
      const kind: "electron" | "hole" = Math.random() > 0.42 ? "electron" : "hole";
      particles.push({
        x: -10,
        y: h * (0.25 + Math.random() * 0.5),
        vx: 0.9 + Math.random() * 0.7,
        kind,
        crossing: false,
        reflected: false,
        alpha: 1,
      });
    }

    let spawnTimer = 0;

    function drawBands() {
      const bx = barrierX();
      const bw = barrierWidth();
      // n-type silicon (left)
      const g1 = ctx!.createLinearGradient(0, 0, bx, 0);
      g1.addColorStop(0, "rgba(30,58,107,0.35)");
      g1.addColorStop(1, "rgba(30,58,107,0.12)");
      ctx!.fillStyle = g1;
      ctx!.fillRect(0, 0, bx - bw / 2, h);
      // n+ poly (right)
      const g2 = ctx!.createLinearGradient(bx, 0, w, 0);
      g2.addColorStop(0, "rgba(18,64,110,0.14)");
      g2.addColorStop(1, "rgba(14,165,233,0.28)");
      ctx!.fillStyle = g2;
      ctx!.fillRect(bx + bw / 2, 0, w - (bx + bw / 2), h);
      // oxide barrier
      const gb = ctx!.createLinearGradient(bx - bw / 2, 0, bx + bw / 2, 0);
      gb.addColorStop(0, "rgba(124,58,237,0.05)");
      gb.addColorStop(0.5, "rgba(124,58,237,0.5)");
      gb.addColorStop(1, "rgba(124,58,237,0.05)");
      ctx!.fillStyle = gb;
      ctx!.fillRect(bx - bw / 2, 0, bw, h);

      // labels
      ctx!.font = "600 12px 'JetBrains Mono', monospace";
      ctx!.fillStyle = "rgba(156,204,255,0.6)";
      ctx!.textAlign = "left";
      ctx!.fillText("n-Si  (electrons)", 14, 24);
      ctx!.textAlign = "right";
      ctx!.fillStyle = "rgba(125,211,252,0.7)";
      ctx!.fillText("n⁺ poly-Si", w - 14, 24);
      ctx!.textAlign = "center";
      ctx!.fillStyle = "rgba(167,139,250,0.85)";
      ctx!.fillText(`SiO₂  ${oxideRef.current.toFixed(1)} nm`, bx, h - 16);
    }

    function drawWave() {
      // classic tunneling wavefunction: oscillate left, decay in barrier, small oscillation right
      const bx = barrierX();
      const bw = barrierWidth();
      const midY = h * 0.5;
      const ampL = 26;
      const decay = tunnelProb();
      const ampR = ampL * decay;
      ctx!.beginPath();
      ctx!.lineWidth = 2;
      ctx!.strokeStyle = "rgba(125,211,252,0.85)";
      for (let x = 0; x <= w; x += 2) {
        let y = midY;
        if (x < bx - bw / 2) {
          y = midY - Math.sin((x - phase) * 0.06) * ampL;
        } else if (x <= bx + bw / 2) {
          const into = (x - (bx - bw / 2)) / bw;
          const env = ampL * Math.pow(decay, into);
          y = midY - Math.sin((x - phase) * 0.06) * env;
        } else {
          y = midY - Math.sin((x - phase) * 0.06) * ampR;
        }
        if (x === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.stroke();
    }

    function frame() {
      ctx!.clearRect(0, 0, w, h);
      drawBands();
      drawWave();

      const bx = barrierX();
      const bw = barrierWidth();
      const prob = tunnelProb();

      spawnTimer += 1;
      if (spawnTimer > 26) {
        spawnTimer = 0;
        spawn();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        // interaction with barrier: decide once, at the barrier's left face,
        // purely from the tunneling probability (holes see a far taller barrier)
        if (!p.reflected && !p.crossing && p.x >= bx - bw / 2 - 2) {
          const passProb = p.kind === "electron" ? prob : prob * 0.1;
          if (Math.random() < passProb) {
            p.crossing = true;
          } else {
            p.reflected = true;
            p.x = bx - bw / 2 - 2; // snap to face so it visibly bounces back
            p.vx = -Math.abs(p.vx);
          }
        }
        if (p.crossing && p.x > bx - bw / 2 && p.x < bx + bw / 2) {
          p.alpha = 0.4;
        } else {
          p.alpha = Math.min(1, p.alpha + 0.05);
        }
        p.x += p.vx;
        if (p.x < -20 || p.x > w + 20) {
          particles.splice(i, 1);
          continue;
        }

        const color = p.kind === "electron" ? "125,211,252" : "251,113,133";
        // glow
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${color},${0.14 * p.alpha})`;
        ctx!.arc(p.x, p.y, 12, 0, Math.PI * 2);
        ctx!.fill();
        // core
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${color},${p.alpha})`;
        ctx!.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
        ctx!.fill();
        // sign
        ctx!.fillStyle = `rgba(4,6,13,${p.alpha})`;
        ctx!.font = "700 8px Inter, sans-serif";
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(p.kind === "electron" ? "−" : "+", p.x, p.y + 0.5);
        ctx!.textBaseline = "alphabetic";
      }

      phase += 1.4;
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <Section id="tunneling" className="py-28 sm:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Quantum Tunneling"
            title={
              <>
                A wall electrons
                <br />
                <span className="text-gradient">walk through.</span>
              </>
            }
            accent="#7c3aed"
          />
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/55">
            At 1.5 nm the oxide is ~50,000× thinner than a hair. An electron
            isn&apos;t a tiny ball here — it&apos;s a wave. Part of that wave
            extends through the barrier, so it has a real probability of appearing
            on the far side.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-start gap-3 rounded-2xl glass p-4">
              <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-photon-300" />
              <div>
                <div className="text-sm font-semibold text-white">
                  Electrons · ~3.1 eV barrier
                </div>
                <div className="text-sm text-white/50">
                  Small barrier + heavy n⁺ doping → high tunneling probability. They pass.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl glass p-4">
              <Ban className="mt-0.5 h-5 w-5 flex-shrink-0 text-signal-rose" />
              <div>
                <div className="text-sm font-semibold text-white">
                  Holes · ~4.5 eV barrier
                </div>
                <div className="text-sm text-white/50">
                  Much taller barrier, and they&apos;re minority carriers → they turn back.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl glass p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-white/70">
                Oxide thickness
              </span>
              <span className="font-mono text-sm text-electric-300">
                {oxideNm.toFixed(1)} nm
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={5}
              step={0.1}
              value={oxideNm}
              onChange={(e) => setOxideNm(parseFloat(e.target.value))}
              className="topcon-range w-full"
            />
            <p className="mt-3 text-xs leading-relaxed text-white/40">
              {oxideNm < 1
                ? "Too thin — pinholes can form and metal may touch silicon, causing heavy recombination."
                : oxideNm <= 1.8
                  ? "The industry sweet spot: electrons tunnel freely while the surface stays passivated."
                  : oxideNm < 3.5
                    ? "Getting thick — tunneling probability is dropping, current and fill factor fall."
                    : "Far too thick — almost no electrons tunnel. The cell effectively stops working."}
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[420px] overflow-hidden rounded-3xl glass sm:h-[500px]"
        >
          <canvas ref={canvasRef} className="h-full w-full" />
          <div className="pointer-events-none absolute right-4 top-4 flex gap-3 text-[11px]">
            <span className="flex items-center gap-1.5 rounded-full glass-strong px-2.5 py-1">
              <span className="h-2 w-2 rounded-full bg-photon-300" /> electron
            </span>
            <span className="flex items-center gap-1.5 rounded-full glass-strong px-2.5 py-1">
              <span className="h-2 w-2 rounded-full bg-signal-rose" /> hole
            </span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
