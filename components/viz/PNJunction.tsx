"use client";

import { useEffect, useRef } from "react";

type Carrier = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: "electron" | "hole";
  life: number;
  trapped?: boolean;
};

export function PNJunction({
  accent,
  conceptId,
}: {
  accent: string;
  conceptId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const conceptRef = useRef(conceptId);
  conceptRef.current = conceptId;

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

    let carriers: Carrier[] = [];
    let t = 0;

    function junctionX() {
      return w * 0.5;
    }

    function spawnPair() {
      const x = Math.random() * w;
      const y = h * (0.25 + Math.random() * 0.5);
      carriers.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        kind: "electron",
        life: 1,
      });
      carriers.push({
        x: x + 6,
        y: y + 6,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        kind: "hole",
        life: 1,
      });
    }

    function drawFieldLines() {
      const jx = junctionX();
      ctx!.strokeStyle = `${accent}44`;
      ctx!.lineWidth = 1;
      for (let i = 1; i <= 5; i++) {
        const y = (h / 6) * i;
        ctx!.beginPath();
        ctx!.moveTo(jx - 60, y);
        ctx!.lineTo(jx + 60, y);
        ctx!.stroke();
        // arrowhead (field points p->n, draw toward left)
        const ax = jx - 60 + ((t * 1.5 + i * 30) % 120);
        ctx!.beginPath();
        ctx!.fillStyle = `${accent}88`;
        ctx!.moveTo(ax, y);
        ctx!.lineTo(ax - 6, y - 3);
        ctx!.lineTo(ax - 6, y + 3);
        ctx!.fill();
      }
    }

    function drawRegions(labelP: string, labelN: string) {
      const jx = junctionX();
      const gp = ctx!.createLinearGradient(0, 0, jx, 0);
      gp.addColorStop(0, "rgba(124,58,237,0.16)");
      gp.addColorStop(1, "rgba(124,58,237,0.03)");
      ctx!.fillStyle = gp;
      ctx!.fillRect(0, 0, jx, h);
      const gn = ctx!.createLinearGradient(jx, 0, w, 0);
      gn.addColorStop(0, "rgba(59,140,255,0.03)");
      gn.addColorStop(1, "rgba(59,140,255,0.16)");
      ctx!.fillStyle = gn;
      ctx!.fillRect(jx, 0, w - jx, h);

      // depletion band
      ctx!.fillStyle = "rgba(255,255,255,0.04)";
      ctx!.fillRect(jx - 26, 0, 52, h);
      ctx!.strokeStyle = "rgba(255,255,255,0.12)";
      ctx!.setLineDash([4, 4]);
      ctx!.beginPath();
      ctx!.moveTo(jx, 0);
      ctx!.lineTo(jx, h);
      ctx!.stroke();
      ctx!.setLineDash([]);

      ctx!.font = "600 12px 'JetBrains Mono', monospace";
      ctx!.textAlign = "left";
      ctx!.fillStyle = "rgba(167,139,250,0.7)";
      ctx!.fillText(labelP, 14, 22);
      ctx!.textAlign = "right";
      ctx!.fillStyle = "rgba(99,172,255,0.7)";
      ctx!.fillText(labelN, w - 14, 22);
      ctx!.textAlign = "center";
      ctx!.fillStyle = "rgba(255,255,255,0.35)";
      ctx!.fillText("depletion", jx, h - 12);
    }

    function drawSun() {
      // rays entering from top
      ctx!.strokeStyle = "rgba(255,176,32,0.5)";
      ctx!.lineWidth = 1.4;
      for (let i = 0; i < 6; i++) {
        const x = (w / 7) * (i + 1);
        const yOff = (t * 2 + i * 26) % 60;
        ctx!.beginPath();
        ctx!.moveTo(x, yOff);
        ctx!.lineTo(x, yOff + 14);
        ctx!.stroke();
      }
    }

    function drawParticle(c: Carrier) {
      const color = c.kind === "electron" ? "125,211,252" : "251,113,133";
      const a = c.life;
      ctx!.beginPath();
      ctx!.fillStyle = `rgba(${color},${0.12 * a})`;
      ctx!.arc(c.x, c.y, 10, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.beginPath();
      ctx!.fillStyle = `rgba(${color},${a})`;
      ctx!.arc(c.x, c.y, 4, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = `rgba(4,6,13,${a})`;
      ctx!.font = "700 7px Inter, sans-serif";
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillText(c.kind === "electron" ? "−" : "+", c.x, c.y + 0.5);
      ctx!.textBaseline = "alphabetic";
    }

    function frame() {
      ctx!.clearRect(0, 0, w, h);
      const mode = conceptRef.current;
      const jx = junctionX();

      // background per mode
      if (mode === "pn-junction" || mode === "tunneling" || mode === "tunnel-oxide") {
        drawRegions("p⁺", "n");
        drawFieldLines();
      } else if (mode === "recombination" || mode === "passivation") {
        drawRegions("surface", "bulk");
        // draw dangling-bond traps along top surface
        for (let i = 0; i < 8; i++) {
          const x = (w / 9) * (i + 1);
          const passivated = mode === "passivation";
          ctx!.beginPath();
          ctx!.fillStyle = passivated
            ? "rgba(45,212,191,0.8)"
            : "rgba(251,113,133,0.85)";
          ctx!.arc(x, 8, 3, 0, Math.PI * 2);
          ctx!.fill();
          if (!passivated) {
            ctx!.strokeStyle = "rgba(251,113,133,0.4)";
            ctx!.beginPath();
            ctx!.moveTo(x, 8);
            ctx!.lineTo(x, 20);
            ctx!.stroke();
          }
        }
      } else {
        drawRegions("p⁺", "n");
      }

      drawSun();

      // spawn
      if (t % 22 === 0 && carriers.length < 60) spawnPair();

      const field = mode === "pn-junction" || mode === "bandgap";
      for (let i = carriers.length - 1; i >= 0; i--) {
        const c = carriers[i];
        c.life -= 0.0025;

        if (field) {
          // field pushes electrons -> n (right), holes -> p (left)
          if (c.kind === "electron") c.vx += 0.05;
          else c.vx -= 0.05;
        }

        if (mode === "recombination") {
          // drift toward top surface traps
          c.vy -= 0.03;
          if (c.y < 16) {
            c.life -= 0.05; // recombine at trap -> flash & die
          }
        }
        if (mode === "passivation") {
          // repelled from surface (field-effect)
          if (c.y < h * 0.35) c.vy += 0.06;
        }

        c.vx *= 0.96;
        c.vy *= 0.96;
        c.x += c.vx;
        c.y += c.vy;

        if (c.x < 0 || c.x > w) c.vx *= -1;
        if (c.y < 0 || c.y > h) c.vy *= -1;

        if (c.life <= 0) {
          carriers.splice(i, 1);
          continue;
        }
        drawParticle(c);
      }

      t += 1;
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [accent]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
