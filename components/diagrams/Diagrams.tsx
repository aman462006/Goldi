"use client";

import type { ReactNode } from "react";

/* ============================================================
   Native, theme-matched diagrams rebuilt from the process
   document (no slide screenshots). Each returns an inline SVG.
   ============================================================ */

const C = {
  electric: "#3b8cff",
  electric2: "#63acff",
  plasma: "#a78bfa",
  photon: "#38bdf8",
  teal: "#2dd4bf",
  amber: "#ffb020",
  rose: "#fb7185",
  ink: "#04060d",
  grid: "rgba(255,255,255,0.07)",
  axis: "rgba(255,255,255,0.28)",
  txt: "rgba(255,255,255,0.55)",
  txtDim: "rgba(255,255,255,0.35)",
};

const FONT = "system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

/* ---------- shared bits ---------- */

function AxisLabel({
  x,
  y,
  children,
  anchor = "middle",
  size = 8.5,
  color = C.txtDim,
  mono = false,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  size?: number;
  color?: string;
  mono?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      style={{ fontSize: size, fill: color, fontFamily: mono ? MONO : FONT }}
    >
      {children}
    </text>
  );
}

function Svg({ children, ratio = "4/3" }: { children: ReactNode; ratio?: string }) {
  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full"
      style={{ aspectRatio: ratio, display: "block" }}
    >
      {children}
    </svg>
  );
}

/* ---------- 1. TOPCon cell cross-section ---------- */

export function CellStack() {
  const layers = [
    { label: "SiNₓ:H  (anti-reflection)", h: 16, fill: "#1b3a63", stroke: C.photon },
    { label: "Al₂O₃  (front passivation)", h: 14, fill: "#20304f", stroke: C.plasma },
    { label: "p⁺ emitter  (boron)", h: 22, fill: "#4a1f2e", stroke: C.rose },
    { label: "n-type Si wafer  (~150 µm)", h: 78, fill: "#12233f", stroke: C.electric },
    { label: "SiO₂ tunnel oxide  (~1.5 nm)", h: 9, fill: "#3a2a5c", stroke: C.plasma },
    { label: "n⁺ poly-Si  (~130 nm)", h: 22, fill: "#123a52", stroke: C.teal },
    { label: "Rear electrode  (Ag)", h: 16, fill: "#3a3020", stroke: C.amber },
  ];
  const x = 20;
  const w = 150;
  let y = 30;
  return (
    <Svg>
      {/* sun rays */}
      {[40, 70, 100, 130].map((sx) => (
        <line
          key={sx}
          x1={sx}
          y1={6}
          x2={sx - 8}
          y2={26}
          stroke={C.amber}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.7"
        />
      ))}
      <circle cx="150" cy="12" r="7" fill={C.amber} opacity="0.9" />
      {layers.map((l) => {
        const rect = (
          <g key={l.label}>
            <rect
              x={x}
              y={y}
              width={w}
              height={l.h}
              fill={l.fill}
              stroke={l.stroke}
              strokeWidth="1"
              opacity="0.95"
            />
            <line x1={x + w} y1={y + l.h / 2} x2={x + w + 12} y2={y + l.h / 2} stroke={l.stroke} strokeWidth="1" opacity="0.5" />
            <text
              x={x + w + 16}
              y={y + l.h / 2 + 3}
              style={{ fontSize: 8.5, fill: C.txt, fontFamily: FONT }}
            >
              {l.label}
            </text>
          </g>
        );
        y += l.h;
        return rect;
      })}
    </Svg>
  );
}

/* ---------- 2. Reflectance vs wavelength ---------- */

function LineChart({
  series,
  yMax,
  yLabel,
  xLabel,
  xTicks,
  yTicks,
  legend,
}: {
  series: { pts: [number, number][]; color: string; fill?: boolean }[];
  yMax: number;
  yLabel: string;
  xLabel: string;
  xTicks: { v: number; label: string }[];
  yTicks: number[];
  legend: { color: string; label: string }[];
  xRange?: [number, number];
}) {
  const padL = 34;
  const padR = 14;
  const padT = 16;
  const padB = 30;
  const W = 320;
  const H = 240;
  const x0 = xTicks[0].v;
  const x1 = xTicks[xTicks.length - 1].v;
  const px = (v: number) => padL + ((v - x0) / (x1 - x0)) * (W - padL - padR);
  const py = (v: number) => padT + (1 - v / yMax) * (H - padT - padB);
  return (
    <Svg>
      {/* y grid + ticks */}
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={padL} y1={py(t)} x2={W - padR} y2={py(t)} stroke={C.grid} />
          <AxisLabel x={padL - 5} y={py(t) + 3} anchor="end" mono>
            {t}
          </AxisLabel>
        </g>
      ))}
      {/* axes */}
      <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke={C.axis} />
      <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke={C.axis} />
      {/* x ticks */}
      {xTicks.map((t) => (
        <AxisLabel key={t.v} x={px(t.v)} y={H - padB + 12} mono>
          {t.label}
        </AxisLabel>
      ))}
      <AxisLabel x={(padL + W - padR) / 2} y={H - 4}>
        {xLabel}
      </AxisLabel>
      <text
        x={10}
        y={(padT + H - padB) / 2}
        transform={`rotate(-90 10 ${(padT + H - padB) / 2})`}
        textAnchor="middle"
        style={{ fontSize: 8.5, fill: C.txtDim, fontFamily: FONT }}
      >
        {yLabel}
      </text>
      {/* series */}
      {series.map((s, i) => {
        const d = s.pts.map((p) => `${px(p[0])},${py(p[1])}`).join(" ");
        return (
          <g key={i}>
            {s.fill && (
              <polygon
                points={`${px(s.pts[0][0])},${py(0)} ${d} ${px(s.pts[s.pts.length - 1][0])},${py(0)}`}
                fill={s.color}
                opacity="0.12"
              />
            )}
            <polyline points={d} fill="none" stroke={s.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
      {/* legend */}
      {legend.map((l, i) => (
        <g key={l.label} transform={`translate(${padL + 6}, ${padT + 6 + i * 13})`}>
          <rect width="14" height="3" rx="1.5" y="-3" fill={l.color} />
          <text x="19" y="0" style={{ fontSize: 8, fill: C.txt, fontFamily: FONT }}>
            {l.label}
          </text>
        </g>
      ))}
    </Svg>
  );
}

export function ReflectanceChart() {
  const flat: [number, number][] = [
    [300, 60], [400, 42], [500, 36], [600, 34], [700, 33], [800, 34], [900, 36], [1000, 40], [1100, 52],
  ];
  const textured: [number, number][] = [
    [300, 18], [400, 10], [500, 7], [600, 6], [700, 6], [800, 7], [900, 9], [1000, 12], [1100, 20],
  ];
  return (
    <LineChart
      series={[
        { pts: flat, color: C.rose },
        { pts: textured, color: C.teal, fill: true },
      ]}
      yMax={70}
      yLabel="Reflectance (%)"
      xLabel="Wavelength (nm)"
      xTicks={[
        { v: 300, label: "300" },
        { v: 600, label: "600" },
        { v: 900, label: "900" },
        { v: 1100, label: "1100" },
      ]}
      yTicks={[0, 20, 40, 60]}
      legend={[
        { color: C.rose, label: "Flat wafer" },
        { color: C.teal, label: "Textured" },
      ]}
    />
  );
}

export function AntiReflectionChart() {
  const bare: [number, number][] = [
    [300, 50], [400, 38], [500, 34], [600, 33], [700, 34], [800, 35], [900, 37], [1000, 41], [1100, 48],
  ];
  const coated: [number, number][] = [
    [300, 22], [400, 12], [500, 5], [600, 2.5], [700, 4], [800, 9], [900, 16], [1000, 24], [1100, 33],
  ];
  return (
    <LineChart
      series={[
        { pts: bare, color: C.rose },
        { pts: coated, color: C.photon, fill: true },
      ]}
      yMax={60}
      yLabel="Reflectance (%)"
      xLabel="Wavelength (nm)"
      xTicks={[
        { v: 300, label: "300" },
        { v: 600, label: "600" },
        { v: 900, label: "900" },
        { v: 1100, label: "1100" },
      ]}
      yTicks={[0, 20, 40, 60]}
      legend={[
        { color: C.rose, label: "Bare silicon" },
        { color: C.photon, label: "+ SiNₓ (n·d = λ/4)" },
      ]}
    />
  );
}

/* ---------- 3. Thermal profiles ---------- */

function ThermalProfile({
  points,
  maxTemp,
  color,
  annotations = [],
}: {
  points: { x: number; t: number }[];
  maxTemp: number;
  color: string;
  annotations?: { x: number; t: number; label: string }[];
}) {
  const padL = 34;
  const padR = 14;
  const padT = 22;
  const padB = 28;
  const W = 320;
  const H = 240;
  const px = (x: number) => padL + x * (W - padL - padR);
  const py = (t: number) => padT + (1 - t / maxTemp) * (H - padT - padB);
  const d = points.map((p) => `${px(p.x)},${py(p.t)}`).join(" ");
  const yTicks = [0, maxTemp / 2, maxTemp];
  return (
    <Svg>
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={padL} y1={py(t)} x2={W - padR} y2={py(t)} stroke={C.grid} />
          <AxisLabel x={padL - 5} y={py(t) + 3} anchor="end" mono>
            {Math.round(t)}
          </AxisLabel>
        </g>
      ))}
      <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke={C.axis} />
      <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke={C.axis} />
      <AxisLabel x={(padL + W - padR) / 2} y={H - 3}>
        Time →
      </AxisLabel>
      <text
        x={10}
        y={(padT + H - padB) / 2}
        transform={`rotate(-90 10 ${(padT + H - padB) / 2})`}
        textAnchor="middle"
        style={{ fontSize: 8.5, fill: C.txtDim, fontFamily: FONT }}
      >
        Temperature (°C)
      </text>
      <polygon points={`${px(points[0].x)},${py(0)} ${d} ${px(points[points.length - 1].x)},${py(0)}`} fill={color} opacity="0.12" />
      <polyline points={d} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {annotations.map((a) => (
        <g key={a.label}>
          <circle cx={px(a.x)} cy={py(a.t)} r="3" fill={color} stroke={C.ink} strokeWidth="1.5" />
          <text x={px(a.x)} y={py(a.t) - 6} textAnchor="middle" style={{ fontSize: 8, fill: C.txt, fontFamily: FONT }}>
            {a.label}
          </text>
        </g>
      ))}
    </Svg>
  );
}

export function BoronProfile() {
  return (
    <ThermalProfile
      color={C.plasma}
      maxTemp={1000}
      points={[
        { x: 0, t: 40 }, { x: 0.1, t: 820 }, { x: 0.22, t: 820 }, { x: 0.3, t: 810 },
        { x: 0.48, t: 810 }, { x: 0.56, t: 920 }, { x: 0.8, t: 920 }, { x: 0.92, t: 750 }, { x: 1, t: 700 },
      ]}
      annotations={[
        { x: 0.16, t: 820, label: "Pre-ox 820°" },
        { x: 0.39, t: 810, label: "Dep 810°" },
        { x: 0.68, t: 920, label: "Drive-in 920°" },
      ]}
    />
  );
}

export function Pocl3Profile() {
  return (
    <ThermalProfile
      color={C.electric}
      maxTemp={1000}
      points={[
        { x: 0, t: 40 }, { x: 0.12, t: 790 }, { x: 0.38, t: 790 }, { x: 0.5, t: 860 },
        { x: 0.86, t: 860 }, { x: 1, t: 760 },
      ]}
      annotations={[
        { x: 0.25, t: 790, label: "Deposition" },
        { x: 0.68, t: 860, label: "Isothermal drive-in" },
      ]}
    />
  );
}

export function FiringProfile() {
  return (
    <ThermalProfile
      color={C.amber}
      maxTemp={900}
      points={[
        { x: 0, t: 160 }, { x: 0.35, t: 200 }, { x: 0.46, t: 500 }, { x: 0.52, t: 786 },
        { x: 0.58, t: 640 }, { x: 0.7, t: 300 }, { x: 1, t: 160 },
      ]}
      annotations={[{ x: 0.52, t: 786, label: "Peak 786°" }]}
    />
  );
}

/* ---------- 4. Poly-Si colour ↔ thickness ---------- */

export function PolySiColorChart() {
  const swatches = [
    { c: "#4f9e7f", label: "Jade green", nm: "80–85 nm", note: "too thin", tone: C.rose },
    { c: "#d98cae", label: "Pink", nm: "115–120 nm", note: "slightly low", tone: C.amber },
    { c: "#7d1f3d", label: "Burgundy", nm: "~130 nm", note: "standard", tone: C.teal },
  ];
  return (
    <Svg ratio="16/9">
      {swatches.map((s, i) => {
        const x = 18 + i * 100;
        return (
          <g key={s.label}>
            <rect x={x} y={26} width="82" height="70" rx="8" fill={s.c} stroke="rgba(255,255,255,0.15)" />
            <text x={x + 41} y={118} textAnchor="middle" style={{ fontSize: 10, fill: C.txt, fontFamily: FONT, fontWeight: 600 }}>
              {s.label}
            </text>
            <text x={x + 41} y={133} textAnchor="middle" style={{ fontSize: 9.5, fill: "rgba(255,255,255,0.85)", fontFamily: MONO }}>
              {s.nm}
            </text>
            <rect x={x + 21} y={142} width="40" height="14" rx="7" fill={`${s.tone}22`} />
            <text x={x + 41} y={152} textAnchor="middle" style={{ fontSize: 8, fill: s.tone, fontFamily: FONT }}>
              {s.note}
            </text>
          </g>
        );
      })}
      <text x={160} y={185} textAnchor="middle" style={{ fontSize: 8.5, fill: C.txtDim, fontFamily: FONT }}>
        Film colour is the fast in-line read-out of poly-Si thickness.
      </text>
    </Svg>
  );
}

/* ---------- 5. Four-point probe ---------- */

export function FourPointProbe() {
  const probeX = [95, 130, 165, 200];
  const top = 150;
  return (
    <Svg ratio="4/3">
      {/* slab: emitter over base */}
      <rect x={55} y={top} width={210} height={20} fill="#4a1f2e" stroke={C.rose} strokeWidth="1" />
      <rect x={55} y={top + 20} width={210} height={40} fill="#12233f" stroke={C.electric} strokeWidth="1" />
      <text x={60} y={top + 14} style={{ fontSize: 8, fill: C.txt, fontFamily: FONT }}>p⁺ emitter</text>
      <text x={60} y={top + 44} style={{ fontSize: 8, fill: C.txt, fontFamily: FONT }}>n-type base</text>
      {/* probes */}
      {probeX.map((x, i) => {
        const outer = i === 0 || i === 3;
        const col = outer ? C.amber : C.photon;
        return (
          <g key={x}>
            <line x1={x} y1={70} x2={x} y2={top} stroke={col} strokeWidth="2" />
            <circle cx={x} cy={68} r="3.5" fill={col} />
            <text x={x} y={60} textAnchor="middle" style={{ fontSize: 9, fill: col, fontFamily: MONO, fontWeight: 700 }}>
              {outer ? "I" : "V"}
            </text>
          </g>
        );
      })}
      {/* current arrows */}
      <text x={probeX[0]} y={44} textAnchor="middle" style={{ fontSize: 7.5, fill: C.amber, fontFamily: FONT }}>current</text>
      <text x={probeX[3]} y={44} textAnchor="middle" style={{ fontSize: 7.5, fill: C.amber, fontFamily: FONT }}>current</text>
      <text x={(probeX[1] + probeX[2]) / 2} y={44} textAnchor="middle" style={{ fontSize: 7.5, fill: C.photon, fontFamily: FONT }}>voltage</text>
      {/* spacing braces */}
      <text x={160} y={30} textAnchor="middle" style={{ fontSize: 8, fill: C.txtDim, fontFamily: FONT }}>
        four probes · equal spacing S
      </text>
      {/* formula */}
      <text x={160} y={200} textAnchor="middle" style={{ fontSize: 13, fill: "#fff", fontFamily: MONO, fontWeight: 700 }}>
        R
        <tspan style={{ fontSize: 9 }} dy="3">S</tspan>
        <tspan dy="-3"> = C · V / I</tspan>
      </text>
      <text x={160} y={216} textAnchor="middle" style={{ fontSize: 8, fill: C.txtDim, fontFamily: FONT }}>
        outer probes drive current · inner probes read voltage
      </text>
    </Svg>
  );
}

/* ---------- 6. Band-diagram carrier selectivity ---------- */

export function BandSelectivity() {
  const regions = [
    { x0: 20, x1: 120, label: "n-Si", fill: "rgba(59,140,255,0.10)" },
    { x0: 120, x1: 165, label: "SiO₂", fill: "rgba(124,58,237,0.16)" },
    { x0: 165, x1: 300, label: "n⁺ poly", fill: "rgba(45,212,191,0.10)" },
  ];
  return (
    <Svg ratio="4/3">
      {regions.map((r) => (
        <g key={r.label}>
          <rect x={r.x0} y={30} width={r.x1 - r.x0} height={170} fill={r.fill} />
          <text x={(r.x0 + r.x1) / 2} y={214} textAnchor="middle" style={{ fontSize: 9, fill: C.txt, fontFamily: FONT }}>
            {r.label}
          </text>
        </g>
      ))}
      {/* conduction band Ec — small electron barrier at oxide */}
      <polyline
        points="20,80 120,80 130,64 155,64 165,80 300,80"
        fill="none"
        stroke={C.photon}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <text x={24} y={74} style={{ fontSize: 8, fill: C.photon, fontFamily: MONO }}>Ec</text>
      {/* valence band Ev — large hole barrier at oxide */}
      <polyline
        points="20,150 120,150 130,104 155,104 165,150 300,150"
        fill="none"
        stroke={C.rose}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <text x={24} y={162} style={{ fontSize: 8, fill: C.rose, fontFamily: MONO }}>Ev</text>
      {/* electron: small barrier → passes */}
      <circle cx={142} cy={64} r="4" fill={C.photon} />
      <text x={142} y={52} textAnchor="middle" style={{ fontSize: 7.5, fill: C.photon, fontFamily: FONT }}>e⁻ · ~3.1 eV</text>
      <text x={210} y={74} style={{ fontSize: 7.5, fill: C.teal, fontFamily: FONT }}>→ tunnels</text>
      {/* hole: large barrier → blocked */}
      <circle cx={142} cy={104} r="4" fill={C.rose} />
      <text x={142} y={128} textAnchor="middle" style={{ fontSize: 7.5, fill: C.rose, fontFamily: FONT }}>h⁺ · ~4.5 eV</text>
      <text x={210} y={144} style={{ fontSize: 7.5, fill: C.rose, fontFamily: FONT }}>✕ blocked</text>
      <text x={160} y={22} textAnchor="middle" style={{ fontSize: 8, fill: C.txtDim, fontFamily: FONT }}>
        electrons see a small barrier, holes a large one
      </text>
    </Svg>
  );
}

/* ---------- 7. I–V curve ---------- */

export function IVCurve() {
  const padL = 34;
  const padR = 30;
  const padT = 16;
  const padB = 30;
  const W = 320;
  const H = 240;
  const Voc = 0.72;
  const Isc = 40; // mA/cm² scale (illustrative)
  const px = (v: number) => padL + (v / Voc) * (W - padL - padR);
  const py = (i: number) => padT + (1 - i / Isc) * (H - padT - padB);
  // I-V: flat near Isc, knee, drop to Voc
  const iv: [number, number][] = [
    [0, 39.5], [0.3, 39], [0.45, 38.5], [0.55, 37.5], [0.6, 36], [0.64, 33], [0.67, 28], [0.69, 20], [0.71, 9], [0.72, 0],
  ];
  // Power = V*I, scaled to Isc axis for display
  const pmax = Math.max(...iv.map((p) => p[0] * p[1]));
  const power = iv.map((p) => [p[0], (p[0] * p[1] / pmax) * Isc] as [number, number]);
  const mpp = iv.reduce((a, b) => (a[0] * a[1] > b[0] * b[1] ? a : b));
  return (
    <Svg>
      {[0, 10, 20, 30, 40].map((t) => (
        <g key={t}>
          <line x1={padL} y1={py(t)} x2={W - padR} y2={py(t)} stroke={C.grid} />
          <AxisLabel x={padL - 5} y={py(t) + 3} anchor="end" mono>
            {t}
          </AxisLabel>
        </g>
      ))}
      <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke={C.axis} />
      <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke={C.axis} />
      {[0, 0.2, 0.4, 0.6].map((v) => (
        <AxisLabel key={v} x={px(v)} y={H - padB + 12} mono>
          {v.toFixed(1)}
        </AxisLabel>
      ))}
      <AxisLabel x={(padL + W - padR) / 2} y={H - 3}>
        Voltage (V)
      </AxisLabel>
      <text x={10} y={(padT + H - padB) / 2} transform={`rotate(-90 10 ${(padT + H - padB) / 2})`} textAnchor="middle" style={{ fontSize: 8, fill: C.txtDim, fontFamily: FONT }}>
        Current
      </text>
      {/* power curve */}
      <polyline points={power.map((p) => `${px(p[0])},${py(p[1])}`).join(" ")} fill="none" stroke={C.amber} strokeWidth="1.6" strokeDasharray="4 3" opacity="0.8" />
      {/* IV curve */}
      <polyline points={iv.map((p) => `${px(p[0])},${py(p[1])}`).join(" ")} fill="none" stroke={C.electric} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* markers */}
      <circle cx={px(0)} cy={py(Isc - 0.5)} r="3" fill={C.photon} />
      <text x={px(0) + 5} y={py(Isc - 0.5) - 4} style={{ fontSize: 8, fill: C.photon, fontFamily: FONT }}>Isc</text>
      <circle cx={px(Voc)} cy={py(0)} r="3" fill={C.rose} />
      <text x={px(Voc) - 2} y={py(0) - 5} textAnchor="end" style={{ fontSize: 8, fill: C.rose, fontFamily: FONT }}>Voc</text>
      <circle cx={px(mpp[0])} cy={py(mpp[1])} r="3.5" fill={C.teal} stroke={C.ink} strokeWidth="1.4" />
      <text x={px(mpp[0]) + 5} y={py(mpp[1]) - 4} style={{ fontSize: 8, fill: C.teal, fontFamily: FONT }}>Pmpp</text>
      {/* legend */}
      <g transform={`translate(${W - padR - 74}, ${padT + 4})`}>
        <line x1="0" y1="0" x2="14" y2="0" stroke={C.electric} strokeWidth="2.4" />
        <text x="18" y="3" style={{ fontSize: 7.5, fill: C.txt, fontFamily: FONT }}>I–V</text>
        <line x1="0" y1="12" x2="14" y2="12" stroke={C.amber} strokeWidth="1.6" strokeDasharray="4 3" />
        <text x="18" y="15" style={{ fontSize: 7.5, fill: C.txt, fontFamily: FONT }}>Power</text>
      </g>
    </Svg>
  );
}

/* ============================================================
   Photo diagram wrappers (uploaded screenshots)
   ============================================================ */

function PhotoDiagram({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full overflow-hidden rounded-lg" style={{ aspectRatio: "16/9" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-contain" />
    </div>
  );
}

function AnisotropicEtching() {
  return <PhotoDiagram src="/diagrams/anisotropic-etching.png" alt="Anisotropic etching pyramid formation" />;
}
function BoronDiffusionProfile() {
  return <PhotoDiagram src="/diagrams/boron-diffusion-profile.png" alt="Boron diffusion concentration profile" />;
}
function BoronDiffusionEquipment() {
  return <PhotoDiagram src="/diagrams/boron-diffusion-equipment.png" alt="Boron diffusion furnace equipment" />;
}
function PhosphorusDeposition() {
  return <PhotoDiagram src="/diagrams/phosphorus-deposition.png" alt="POCl3 phosphorus deposition diagram" />;
}
function Pocl3Equipment() {
  return <PhotoDiagram src="/diagrams/pocl3-equipment.png" alt="POCl3 diffusion furnace equipment" />;
}
function PhosphorusDiffusionProfile() {
  return <PhotoDiagram src="/diagrams/phosphorus-diffusion-profile.png" alt="Phosphorus diffusion concentration profile" />;
}
function AlkalineEtchingFlow() {
  return <PhotoDiagram src="/diagrams/alkaline-etching-flow.png" alt="Alkaline front etching process flow" />;
}
function ScreenPrintPrinciple() {
  return <PhotoDiagram src="/diagrams/screen-print-principle.png" alt="Screen printing squeegee and mesh principle" />;
}

/* ============================================================
   Registry + framed figure wrapper
   ============================================================ */

const REGISTRY: Record<string, () => JSX.Element> = {
  "cell-stack": CellStack,
  reflectance: ReflectanceChart,
  "anti-reflection": AntiReflectionChart,
  "boron-profile": BoronProfile,
  "pocl3-profile": Pocl3Profile,
  "firing-profile": FiringProfile,
  "polysi-color": PolySiColorChart,
  "four-point-probe": FourPointProbe,
  "band-selectivity": BandSelectivity,
  "iv-curve": IVCurve,
  "anisotropic-etching": AnisotropicEtching,
  "boron-diffusion-profile": BoronDiffusionProfile,
  "boron-diffusion-equipment": BoronDiffusionEquipment,
  "phosphorus-deposition": PhosphorusDeposition,
  "pocl3-equipment": Pocl3Equipment,
  "phosphorus-diffusion-profile": PhosphorusDiffusionProfile,
  "alkaline-etching-flow": AlkalineEtchingFlow,
  "screen-print-principle": ScreenPrintPrinciple,
};

export function DiagramFigure({
  name,
  caption,
  label,
  accent = C.photon,
  className,
}: {
  name: string;
  caption: string;
  label?: string;
  accent?: string;
  className?: string;
}) {
  const Comp = REGISTRY[name];
  if (!Comp) return null;
  return (
    <figure className={`overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] ${className ?? ""}`}>
      <div className="relative bg-ink-950/40 p-4">
        {label && (
          <span
            className="absolute left-3 top-3 z-10 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
            style={{ background: `${accent}e6`, color: C.ink }}
          >
            {label}
          </span>
        )}
        <Comp />
      </div>
      <figcaption className="border-t border-white/10 px-4 py-3 text-[12px] leading-relaxed text-white/50">
        {caption}
      </figcaption>
    </figure>
  );
}
