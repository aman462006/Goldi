"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────────
   Plane data
──────────────────────────────────────────────────────────────── */
interface PlaneData {
  id: string;
  miller: string;
  name: string;
  color: string;
  etchRate: string;
  etchPct: number;
  atomLabel: string;
  bondCount: number;
  role: string;
  why: string;
  bullets: string[];
}

const PLANES: PlaneData[] = [
  {
    id: "100",
    miller: "{100}",
    name: "Cubic Face",
    color: "#3b8cff",
    etchRate: "Fast  (~100× rel.)",
    etchPct: 92,
    atomLabel: "Square lattice — 6.78 × 10¹⁴ cm⁻²",
    bondCount: 2,
    role: "Standard silicon wafer orientation. KOH / NaOH attacks this plane preferentially, making it recede rapidly during texturing to expose the stable {111} pyramid sidewalls.",
    why: "Each surface atom has 2 unsatisfied 'dangling' bonds pointing away from the crystal. Etchant molecules readily attack these exposed sites and pull atoms off the lattice quickly.",
    bullets: [
      "Solar-grade wafers sliced perpendicular to the [100] direction",
      "Square 2-D atom arrangement with spacing a/√2 ≈ 3.84 Å",
      "2 dangling bonds per surface atom — weaker lateral bonding",
      "Etches 50–100× faster than {111} in 20 % KOH at 80 °C",
      "Pyramid base planes in every textured TOPCon wafer are {100}",
    ],
  },
  {
    id: "110",
    miller: "{110}",
    name: "Diagonal Face",
    color: "#a78bfa",
    etchRate: "Moderate  (~40–50×)",
    etchPct: 48,
    atomLabel: "Centred-rectangular — 9.59 × 10¹⁴ cm⁻²",
    bondCount: 1,
    role: "A diagonal cross-section of the unit cell. Etches at an intermediate rate — relevant for etch-pit defect analysis and mechanical wafer scribing, but not targeted in texturing.",
    why: "Higher atom packing density than {100} plus only 1 dangling bond per atom instead of 2. More bonds must be broken per unit area to remove each surface layer.",
    bullets: [
      "12 equivalent {110} planes in the silicon unit cell",
      "Centred-rectangular 2-D lattice — alternating staggered rows",
      "1 dangling bond per surface atom — stronger lateral bonding",
      "Etch rate ~40–50 % of {100} in dilute KOH",
      "Appears as 45° diagonal cleavage planes during wafer scribing",
    ],
  },
  {
    id: "111",
    miller: "{111}",
    name: "Close-Packed Face",
    color: "#34d399",
    etchRate: "Very slow  (~1–2×)",
    etchPct: 4,
    atomLabel: "Hexagonal close-packed — 7.83 × 10¹⁴ cm⁻²",
    bondCount: 3,
    role: "The stable pyramid facet in every textured TOPCon wafer. NaOH/KOH texturing leaves this surface almost untouched — four {111} faces form each microscopic light-trapping pyramid.",
    why: "3 back-bonds and only 1 dangling bond per surface atom. Removing any atom requires simultaneously breaking 3 lateral bonds — a rare thermal event. This makes {111} chemically inert to dilute alkali.",
    bullets: [
      "Four {111} faces build each inverted pyramid on the wafer",
      "Hexagonal close-packed 2-D arrangement — highest surface density",
      "3 back-bonds per atom → etch rate only 1–2 % of {100}",
      "Self-terminating etch — pyramids stop growing once {111} is exposed",
      "Light bounces between adjacent {111} sidewalls before entering the cell",
    ],
  },
];

/* ────────────────────────────────────────────────────────────────
   Isometric cube geometry
──────────────────────────────────────────────────────────────── */
const S = 58;
const ISO_CX = 112, ISO_CY = 118;

function isoXY(x: number, y: number, z: number) {
  return {
    x: ISO_CX + (x - z) * S * 0.866,
    y: ISO_CY + (x + z) * S * 0.5 - y * S,
  };
}

const VA = isoXY(0,0,0); // front-bottom  (overlaps G in 2-D)
const VB = isoXY(1,0,0); // right-bottom-front
const VC = isoXY(1,1,0); // right-top-front
const VD = isoXY(0,1,0); // left-top-front
const VE = isoXY(0,0,1); // left-bottom-back
const VF = isoXY(1,0,1); // right-bottom-back (bottom)
const VH = isoXY(0,1,1); // left-top-back

function p2s(...verts: {x:number;y:number}[]) {
  return verts.map(v => `${v.x.toFixed(1)},${v.y.toFixed(1)}`).join(" ");
}

// Plane highlight polygons
const PLANE_POLYS: Record<string, {x:number;y:number}[]> = {
  "100": [VA, VB, VC, VD],   // front face z=0
  "110": [VB, VD, VH, VF],   // diagonal rhombus
  "111": [VB, VD, VE],        // corner triangle
};

// All 12 cube edges (G≈A in 2-D)
const CUBE_EDGES: [{x:number;y:number},{x:number;y:number}][] = [
  [VA,VB],[VB,VC],[VC,VD],[VD,VA],     // front face
  [VB,VF],[VF,VA],[VA,VH],[VH,VC],     // right + top meeting G≈A
  [VD,VH],[VH,VE],[VE,VA],[VE,VF],     // remaining back edges
];

function IsoCube({ planeId, color }: { planeId: string; color: string }) {
  const poly = PLANE_POLYS[planeId] ?? [];
  const polyPts = p2s(...poly);
  const cx = poly.reduce((s,v) => s + v.x, 0) / (poly.length || 1);
  const cy = poly.reduce((s,v) => s + v.y, 0) / (poly.length || 1);

  return (
    <svg viewBox="0 0 224 236" className="w-full h-full" aria-hidden>
      <defs>
        <filter id={`cglow-${planeId}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Cube faces — 3 visible */}
      <polygon points={p2s(VA,VB,VF,VA)}  fill="transparent" />
      <polygon points={p2s(VB,VF,VA,VC)}  fill="#0c1827" stroke="none"/>
      <polygon points={p2s(VA,VB,VC,VD)}  fill="#162030" stroke="none"/>
      <polygon points={p2s(VD,VC,VA,VH)}  fill="#1c2d42" stroke="none"/>

      {/* Plane fill */}
      <polygon points={polyPts} fill={color} fillOpacity={0.16}/>

      {/* Plane animated outline */}
      <motion.polygon
        key={planeId}
        points={polyPts}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
        initial={{ strokeOpacity: 0.3 }}
        animate={{ strokeOpacity: [0.35, 1, 0.35] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* All cube edges */}
      {CUBE_EDGES.map(([v1, v2], i) => (
        <line key={i}
          x1={v1.x} y1={v1.y} x2={v2.x} y2={v2.y}
          stroke="rgba(255,255,255,0.14)" strokeWidth={0.8}
        />
      ))}

      {/* Miller index label at centroid */}
      <text
        x={cx} y={cy + 4}
        textAnchor="middle"
        fill={color}
        fontSize={13}
        fontWeight="700"
        fontFamily="monospace"
        filter={`url(#cglow-${planeId})`}
      >
        {`{${planeId}}`}
      </text>

      {/* Axis labels */}
      <text x={VB.x+7} y={VB.y+5}  fill="rgba(255,255,255,0.28)" fontSize={11} fontStyle="italic">x</text>
      <text x={VD.x-2} y={VD.y-9}  fill="rgba(255,255,255,0.28)" fontSize={11} fontStyle="italic">y</text>
      <text x={VE.x-15} y={VE.y+4} fill="rgba(255,255,255,0.28)" fontSize={11} fontStyle="italic">z</text>

      <text x={8} y={229} fill="rgba(255,255,255,0.18)" fontSize={7.5} letterSpacing="1">
        Si DIAMOND CUBIC  •  a = 5.43 Å
      </text>
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────
   Atom surface grid
──────────────────────────────────────────────────────────────── */
type Vec2 = { x: number; y: number };

function buildAtoms(planeId: string, cx: number, cy: number): Vec2[] {
  const atoms: Vec2[] = [];
  if (planeId === "100") {
    const d = 34;
    for (let i = -3; i <= 3; i++)
      for (let j = -3; j <= 3; j++)
        atoms.push({ x: cx + i * d, y: cy + j * d });
  } else if (planeId === "110") {
    for (let i = -4; i <= 4; i++)
      for (let j = -4; j <= 4; j++) {
        const x = cx + i * 36 + j * 18;
        const y = cy + j * 28;
        if (x >= 14 && x <= 210 && y >= 14 && y <= 176)
          atoms.push({ x, y });
      }
  } else {
    for (let i = -5; i <= 5; i++)
      for (let j = -5; j <= 5; j++) {
        const x = cx + i * 30 + j * 15;
        const y = cy + j * 26;
        if (x >= 14 && x <= 210 && y >= 14 && y <= 176)
          atoms.push({ x, y });
      }
  }
  return atoms;
}

function buildBonds(atoms: Vec2[], thresh: number): [Vec2,Vec2][] {
  const bonds: [Vec2,Vec2][] = [];
  for (let i = 0; i < atoms.length; i++)
    for (let j = i + 1; j < atoms.length; j++) {
      const dx = atoms[i].x - atoms[j].x, dy = atoms[i].y - atoms[j].y;
      if (dx*dx + dy*dy < thresh*thresh) bonds.push([atoms[i], atoms[j]]);
    }
  return bonds;
}

const BOND_THRESH: Record<string,number> = { "100": 39, "110": 38, "111": 34 };

const UNIT_CELL_PATH: Record<string, (cx:number, cy:number) => string> = {
  "100": (cx, cy) => `M ${cx} ${cy-34} h 34 v 34 h -34 Z`,
  "110": (cx, cy) => `M ${cx} ${cy} l 36 0 l 18 28 l -36 0 Z`,
  "111": (cx, cy) => `M ${cx} ${cy} l 30 0 l 15 26 l -30 0 Z`,
};

function AtomSurface({ planeId, color }: { planeId: string; color: string }) {
  const cx = 112, cy = 94;
  const atoms = buildAtoms(planeId, cx, cy);
  const bonds = buildBonds(atoms, BOND_THRESH[planeId] ?? 36);
  const cellPath = UNIT_CELL_PATH[planeId]?.(cx, cy) ?? "";

  return (
    <svg viewBox="0 0 224 192" className="w-full h-full" aria-hidden>
      {/* Bonds */}
      {bonds.map(([a, b], i) => (
        <line key={i}
          x1={a.x} y1={a.y} x2={b.x} y2={b.y}
          stroke={color} strokeWidth={1.2} opacity={0.22}
        />
      ))}

      {/* Atoms */}
      {atoms.map((atom, i) => (
        <motion.circle
          key={`${planeId}-${i}`}
          cx={atom.x} cy={atom.y} r={5.5}
          fill={color} fillOpacity={0.88}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.007, duration: 0.22, ease: "easeOut" }}
        />
      ))}

      {/* Unit cell */}
      <path d={cellPath} fill="none"
        stroke={color} strokeWidth={1}
        strokeDasharray="5,4" opacity={0.5}
      />

      <text x={8} y={185} fill="rgba(255,255,255,0.18)" fontSize={7.5} letterSpacing="1">
        TOP-DOWN VIEW  •  SURFACE ATOM ARRANGEMENT
      </text>
      <text x={216} y={185} textAnchor="end" fill="rgba(255,255,255,0.18)" fontSize={7.5} letterSpacing="1">
        — — UNIT CELL
      </text>
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────
   Main section component
──────────────────────────────────────────────────────────────── */
export function CrystalOrientation() {
  const [active, setActive] = useState("100");
  const plane = PLANES.find(p => p.id === active) ?? PLANES[0];
  const barRef = useRef<HTMLDivElement>(null);
  const inView = useInView(barRef, { once: true, margin: "-80px 0px" });

  return (
    <Section id="crystal-orientation" className="py-28">
      <SectionHeader
        eyebrow="Crystal Structure"
        title={<>Silicon planes<br />&amp; anisotropic etching</>}
        description="TOPCon texturing relies on a single chemical fact: different crystal planes of silicon etch at dramatically different rates in KOH. Choosing the right wafer orientation makes random etching produce perfectly ordered light-trapping pyramids — no lithography required."
        accent="#3b8cff"
      />

      {/* Plane selector tabs */}
      <div className="mt-14 flex flex-wrap gap-3">
        {PLANES.map(p => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={cn(
              "relative flex items-center gap-3 rounded-2xl border px-5 py-3.5 text-left transition-all duration-200",
              active === p.id ? "border-transparent" : "border-white/8 hover:border-white/16"
            )}
            style={active === p.id ? {
              borderColor: `${p.color}55`,
              background: `${p.color}15`,
              boxShadow: `0 0 0 1px ${p.color}44, 0 4px 20px ${p.color}20`,
            } : {
              background: "rgba(255,255,255,0.03)",
            }}
          >
            {active === p.id && (
              <motion.div
                layoutId="plane-sel-bg"
                className="absolute inset-0 rounded-2xl"
                style={{ background: `${p.color}0a` }}
              />
            )}
            <span className="relative z-10 font-mono text-xl font-bold tracking-tight"
              style={{ color: p.color }}>
              {p.miller}
            </span>
            <div className="relative z-10">
              <div className="text-sm font-semibold text-white/80">{p.name}</div>
              <div className="text-xs text-white/35">{p.etchRate}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Main detail panel — changes per plane */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr_1.35fr]"
        >
          {/* ── 3-D cube card ── */}
          <div className="rounded-3xl border p-5"
            style={{ borderColor: `${plane.color}22`, background: "rgba(8,14,24,0.75)" }}>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/28">
              3-D Crystal Orientation
            </p>
            <div className="h-56">
              <IsoCube planeId={plane.id} color={plane.color} />
            </div>
            <p className="mt-2 text-center text-[10px] leading-relaxed text-white/28">
              {plane.id === "100"
                ? "One of 6 equivalent {100} cube faces highlighted"
                : plane.id === "110"
                ? "{110} diagonal cuts the cube at equal x + y intercepts"
                : "{111} corner plane — equal intercepts on all 3 axes"}
            </p>
          </div>

          {/* ── Atom surface card ── */}
          <div className="rounded-3xl border p-5"
            style={{ borderColor: `${plane.color}22`, background: "rgba(8,14,24,0.75)" }}>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/28">
              Surface Atom Arrangement
            </p>
            <div className="h-56">
              <AtomSurface planeId={plane.id} color={plane.color} />
            </div>
            <div className="mt-2 rounded-xl px-3 py-2 text-center text-[10px] text-white/45"
              style={{ background: `${plane.color}0e` }}>
              {plane.atomLabel}
            </div>
          </div>

          {/* ── Info card ── */}
          <div className="rounded-3xl border p-6 flex flex-col gap-4"
            style={{ borderColor: `${plane.color}22`, background: "rgba(8,14,24,0.75)" }}>

            {/* Role */}
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: plane.color }}>
                Role in TOPCon
              </p>
              <p className="text-sm leading-relaxed text-white/65">{plane.role}</p>
            </div>

            {/* Etch rate bar */}
            <div ref={barRef}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-white/35">
                  Relative etch rate (KOH / NaOH)
                </span>
                <span className="rounded-full px-2 py-0.5 font-mono text-[10px] font-bold"
                  style={{ color: plane.color, background: `${plane.color}18` }}>
                  {plane.etchRate}
                </span>
              </div>
              <div className="relative h-3 overflow-hidden rounded-full bg-white/6">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${plane.color}99, ${plane.color})` }}
                  initial={{ width: "0%" }}
                  animate={{ width: inView ? `${plane.etchPct}%` : "0%" }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                />
              </div>
            </div>

            {/* Dangling bonds */}
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/28">
                Dangling bonds per surface atom
              </p>
              <div className="flex items-center gap-2.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}
                    className="h-4 w-4 rounded-full border-2 transition-all duration-300"
                    style={i < plane.bondCount
                      ? { borderColor: plane.color, background: `${plane.color}55` }
                      : { borderColor: "rgba(255,255,255,0.1)", background: "transparent" }}
                  />
                ))}
                <span className="text-[11px] text-white/38">
                  {plane.bondCount} / 4 unsatisfied
                </span>
              </div>
            </div>

            {/* Why */}
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/28">
                Why this etch rate?
              </p>
              <p className="text-xs leading-relaxed text-white/48">{plane.why}</p>
            </div>

            {/* Bullets */}
            <ul className="space-y-1.5">
              {plane.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-white/55">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: plane.color }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom callout: pyramids in practice */}
      <div className="mt-8 rounded-3xl border p-6 sm:p-8"
        style={{
          borderColor: "rgba(59,140,255,0.18)",
          background: "linear-gradient(135deg, rgba(59,140,255,0.05) 0%, rgba(52,211,153,0.04) 100%)",
        }}>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">

          {/* Mini comparison bars */}
          <div className="flex-shrink-0 sm:w-52">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-white/28">
              Etch rate comparison
            </p>
            {PLANES.map(p => (
              <div key={p.id} className="mb-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold" style={{ color: p.color }}>
                    {p.miller}
                  </span>
                  <span className="text-[10px] text-white/35">{p.etchPct} %</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/6">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: p.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${p.etchPct}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Explanation */}
          <div className="flex-1">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#3b8cff]">
              How planes create pyramids
            </p>
            <h3 className="mb-3 text-xl font-semibold tracking-tight text-white/90">
              Anisotropic etching in action
            </h3>
            <p className="mb-3 text-sm leading-relaxed text-white/58">
              A {"{"}{100}{"}"}-cut silicon wafer is placed in a hot dilute KOH solution. The etchant attacks{" "}
              {"{"}{100}{"}"} surfaces roughly{" "}
              <span className="font-semibold text-[#3b8cff]">100× faster</span> than {"{"}{111}{"}"}.
              Wherever a tiny surface pit exposes a {"{"}{111}{"}"} face, etching along that direction
              stalls while neighbouring {"{"}{100}{"}"} regions keep eroding. The result: self-terminating
              inverted pyramids whose sidewalls are all {"{"}{111}{"}"} — growing uniformly across the
              wafer without any lithography mask.
            </p>
            <p className="text-sm leading-relaxed text-white/58">
              This pyramid texture reduces front-surface reflectance from{" "}
              <span className="font-semibold text-white/80">≈ 35 % (flat silicon)</span> down to{" "}
              <span className="font-semibold text-[#34d399]">&lt; 5 % (textured)</span> by trapping
              light between adjacent {"{"}{111}{"}"} facets before it can escape — directly boosting
              the short-circuit current J<sub>sc</sub> of the finished TOPCon cell by several mA cm⁻².
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
