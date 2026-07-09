"use client";

import { useEffect, useRef } from "react";

// A lightweight molecular reaction animation: reactant atoms drift in,
// collide at center, and products drift out — tuned per step.
type Spec = {
  reactants: { label: string; color: string }[];
  products: { label: string; color: string }[];
};

const specs: Record<string, Spec> = {
  texture: {
    reactants: [
      { label: "Si", color: "#3b8cff" },
      { label: "NaOH", color: "#2dd4bf" },
    ],
    products: [
      { label: "Na₂SiO₃", color: "#a78bfa" },
      { label: "H₂", color: "#7dd3fc" },
    ],
  },
  boron: {
    reactants: [
      { label: "BCl₃", color: "#a78bfa" },
      { label: "O₂", color: "#7dd3fc" },
    ],
    products: [
      { label: "B₂O₃", color: "#f472b6" },
      { label: "Cl₂", color: "#a3e635" },
    ],
  },
  "rear-etch": {
    reactants: [
      { label: "SiO₂", color: "#38bdf8" },
      { label: "HF", color: "#2dd4bf" },
    ],
    products: [
      { label: "H₂SiF₆", color: "#a78bfa" },
      { label: "H₂O", color: "#7dd3fc" },
    ],
  },
  lpcvd: {
    reactants: [{ label: "SiH₄", color: "#63acff" }],
    products: [
      { label: "Si", color: "#3b8cff" },
      { label: "2 H₂", color: "#7dd3fc" },
    ],
  },
  pocl3: {
    reactants: [
      { label: "P₂O₅", color: "#0ea5e9" },
      { label: "Si", color: "#3b8cff" },
    ],
    products: [
      { label: "SiO₂", color: "#38bdf8" },
      { label: "P", color: "#a3e635" },
    ],
  },
  "front-etch": {
    reactants: [
      { label: "Si", color: "#3b8cff" },
      { label: "KOH", color: "#22d3ee" },
    ],
    products: [
      { label: "K₂SiO₃", color: "#a78bfa" },
      { label: "H₂", color: "#7dd3fc" },
    ],
  },
  ald: {
    reactants: [
      { label: "TMA", color: "#7c3aed" },
      { label: "H₂O", color: "#7dd3fc" },
    ],
    products: [
      { label: "Al₂O₃", color: "#a78bfa" },
      { label: "CH₄", color: "#a3e635" },
    ],
  },
  pecvd: {
    reactants: [
      { label: "SiH₄", color: "#63acff" },
      { label: "NH₃", color: "#f472b6" },
    ],
    products: [
      { label: "SiNₓ:H", color: "#f472b6" },
      { label: "H₂", color: "#7dd3fc" },
    ],
  },
  print: {
    reactants: [
      { label: "Ag", color: "#d7dbe6" },
      { label: "Si", color: "#3b8cff" },
    ],
    products: [{ label: "Ag–Si alloy", color: "#ffb020" }],
  },
  test: {
    reactants: [{ label: "e⁻", color: "#7dd3fc" }],
    products: [{ label: "photon", color: "#ffb020" }],
  },
};

export function ReactionAnimation({
  stepId,
  accent,
}: {
  stepId: string;
  accent: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const spec = specs[stepId] ?? specs.lpcvd;

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

    let t = 0;
    const CYCLE = 220;

    function blob(x: number, y: number, label: string, color: string, scale: number) {
      const r = 20 * scale;
      ctx!.beginPath();
      ctx!.fillStyle = `${color}22`;
      ctx!.arc(x, y, r + 8, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.beginPath();
      const g = ctx!.createRadialGradient(x - r / 3, y - r / 3, 2, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, `${color}aa`);
      ctx!.fillStyle = g;
      ctx!.arc(x, y, r, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = "#04060d";
      ctx!.font = `700 ${Math.max(9, 11 * scale)}px 'JetBrains Mono', monospace`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillText(label, x, y);
      ctx!.textBaseline = "alphabetic";
    }

    function frame() {
      ctx!.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const phase = (t % CYCLE) / CYCLE; // 0..1

      // approach 0-0.4, react flash 0.4-0.55, separate 0.55-1
      const nR = spec.reactants.length;
      const nP = spec.products.length;

      if (phase < 0.5) {
        const p = phase / 0.5; // 0..1 approaching
        spec.reactants.forEach((r, i) => {
          const startX = i === 0 ? 30 : w - 30;
          const y = cy + (i - (nR - 1) / 2) * 46;
          const x = startX + (cx - startX) * easeInOut(p);
          const yy = y + (cy - y) * easeInOut(p) * 0.6;
          blob(x, yy, r.label, r.color, 1);
        });
        if (p > 0.85) {
          // collision glow
          ctx!.beginPath();
          ctx!.fillStyle = `${accent}${Math.floor((p - 0.85) * 6 * 255).toString(16).padStart(2, "0").slice(0, 2)}`;
          ctx!.arc(cx, cy, 40, 0, Math.PI * 2);
          ctx!.fill();
        }
      } else {
        const p = (phase - 0.5) / 0.5;
        // burst ring
        if (p < 0.4) {
          ctx!.beginPath();
          ctx!.strokeStyle = `${accent}${Math.floor((0.4 - p) * 2.5 * 255).toString(16).padStart(2, "0").slice(0, 2)}`;
          ctx!.lineWidth = 2;
          ctx!.arc(cx, cy, 20 + p * 120, 0, Math.PI * 2);
          ctx!.stroke();
        }
        spec.products.forEach((pr, i) => {
          const endX = i === 0 ? 34 : w - 34;
          const y = cy + (i - (nP - 1) / 2) * 46;
          const x = cx + (endX - cx) * easeInOut(p);
          blob(x, y, pr.label, pr.color, 1);
        });
      }

      // arrow hint
      ctx!.fillStyle = "rgba(255,255,255,0.2)";
      ctx!.font = "600 20px Inter";
      ctx!.textAlign = "center";
      ctx!.fillText(phase < 0.5 ? "→" : "", cx, 26);

      t += 1;
      raf = requestAnimationFrame(frame);
    }
    function easeInOut(x: number) {
      return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [stepId, accent]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
