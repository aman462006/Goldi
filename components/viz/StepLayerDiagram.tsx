"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Step order (must match processSteps ids)
───────────────────────────────────────────────────────────── */
const STEP_ORDER = [
  "texture","boron","rear-etch","lpcvd","pocl3","front-etch","ald","pecvd","print","test",
];

/* ─────────────────────────────────────────────────────────────
   Cross-section geometry  (all values in viewBox px units)
   Front = top, Rear = bottom
───────────────────────────────────────────────────────────── */
const CX  = 10;   // left x of cross-section
const CW  = 480;  // width of cross-section
const N   = 22;   // pyramid count along width
const PH  = 10;   // pyramid height (tip-to-valley)

// Silicon base
const SI_VY  = 68;   // pyramid valley y  (bottom of teeth)
const SI_BOT = 162;  // flat bottom of Si bulk

// Front layers — grow upward from Si surface
const BOR_T  = 10;                      // boron emitter thickness
const ARC_T  = 12;                      // SiNₓ ARC thickness
const MTL_H  = 8;                       // metal finger height

const BOR_TOP = SI_VY - BOR_T;          // 58  boron top valley
const ARC_TOP = BOR_TOP - ARC_T;        // 46  arc top valley
const ARC_PK  = ARC_TOP - PH;           // 36  highest SiNₓ peak
const MTL_BOT = ARC_PK;                 // 36  bottom of metal bar
const MTL_TOP = ARC_PK - MTL_H;         // 28  top of metal bar

// Rear layers — grow downward from Si bottom
const TNL_BOT = SI_BOT + 5;             // 167  tunnel oxide bottom
const PSI_BOT = TNL_BOT + 16;           // 183  poly-Si bottom
const ALO_BOT = PSI_BOT + 7;            // 190  Al₂O₃ bottom
const RSN_BOT = ALO_BOT + 11;           // 201  rear SiNₓ bottom
const RMT_BOT = RSN_BOT + 10;           // 211  rear metal bottom

// ViewBox
const VW = 900;
const VH = RMT_BOT + 16;               // ~227

// Label area geometry
const RX = CX + CW + 10;               // 500  start of leader line
const LX = RX + 28;                    // 528  text x

/* ─────────────────────────────────────────────────────────────
   Path helpers
───────────────────────────────────────────────────────────── */

/** A band whose top and bottom are both the same zigzag, separated by vertical offset */
function zigzagBand(topVY: number, botVY: number): string {
  const pw = CW / N;
  const d: string[] = [`M ${CX},${topVY}`];
  for (let i = 0; i < N; i++) {
    d.push(`L ${CX + i * pw + pw / 2},${topVY - PH}`);
    d.push(`L ${CX + (i + 1) * pw},${topVY}`);
  }
  d.push(`L ${CX + CW},${botVY}`);
  for (let i = N - 1; i >= 0; i--) {
    d.push(`L ${CX + i * pw + pw / 2},${botVY - PH}`);
    d.push(`L ${CX + i * pw},${botVY}`);
  }
  d.push("Z");
  return d.join(" ");
}

/** Silicon: zigzag top, flat bottom */
function siPath(): string {
  const pw = CW / N;
  const d: string[] = [`M ${CX},${SI_VY}`];
  for (let i = 0; i < N; i++) {
    d.push(`L ${CX + i * pw + pw / 2},${SI_VY - PH}`);
    d.push(`L ${CX + (i + 1) * pw},${SI_VY}`);
  }
  d.push(`L ${CX + CW},${SI_BOT}`);
  d.push(`L ${CX},${SI_BOT}`);
  d.push("Z");
  return d.join(" ");
}

/* ─────────────────────────────────────────────────────────────
   Layer definitions
───────────────────────────────────────────────────────────── */
interface LayerDef {
  id: string;
  appearsAt: number;          // step index when this layer first appears
  dopedAt?: number;           // step index when fill/label changes (poly-Si)
  fill: string;
  dopedFill?: string;
  labelColor: string;
  dopedLabelColor?: string;
  label: string;
  dopedLabel?: string;
  sub?: string;               // thickness hint
  leaderFromY: number;        // y on right edge of cross-section for leader line
  labelY: number;             // y of the text label (can differ to avoid overlap)
}

const LAYERS: LayerDef[] = [
  {
    id: "rear-metal",  appearsAt: 8,
    fill: "#374151",       labelColor: "#9ca3af",
    label: "Ag/Al rear contact",
    leaderFromY: (RSN_BOT + RMT_BOT) / 2,   // 206
    labelY: 210,
  },
  {
    id: "rear-sinx",   appearsAt: 7,
    fill: "#3b0764",       labelColor: "#c4b5fd",
    label: "SiNₓ (rear)", sub: "~80 nm",
    leaderFromY: (ALO_BOT + RSN_BOT) / 2,   // 195.5
    labelY: 196,
  },
  {
    id: "al2o3",       appearsAt: 6,
    fill: "#064e3b",       labelColor: "#34d399",
    label: "Al₂O₃ passivation", sub: "~10 nm",
    leaderFromY: (PSI_BOT + ALO_BOT) / 2,   // 186.5
    labelY: 182,
  },
  {
    id: "poly-si",     appearsAt: 3, dopedAt: 4,
    fill: "#1e293b",       dopedFill: "#1e3a8a",
    labelColor: "#64748b", dopedLabelColor: "#60a5fa",
    label: "poly-Si", dopedLabel: "n⁺ poly-Si", sub: "~100 nm",
    leaderFromY: (TNL_BOT + PSI_BOT) / 2,   // 175
    labelY: 168,
  },
  {
    id: "tunnel-ox",   appearsAt: 3,
    fill: "#1e2d3d",       labelColor: "#7dd3fc",
    label: "SiO₂ tunnel oxide", sub: "~1.5 nm",
    leaderFromY: (SI_BOT + TNL_BOT) / 2,    // 164.5
    labelY: 154,
  },
  {
    id: "n-si",        appearsAt: -1,
    fill: "#172554",       labelColor: "#93c5fd",
    label: "n-Si base", sub: "~180 µm",
    leaderFromY: (SI_VY + SI_BOT) / 2,      // 115
    labelY: 115,
  },
  {
    id: "p-boron",     appearsAt: 1,
    fill: "#7c2d12",       labelColor: "#fb923c",
    label: "p⁺ boron emitter", sub: "~200 nm",
    leaderFromY: (BOR_TOP + SI_VY) / 2,     // 63
    labelY: 66,
  },
  {
    id: "front-sinx",  appearsAt: 7,
    fill: "#1e1b4b",       labelColor: "#a5b4fc",
    label: "SiNₓ:H ARC", sub: "~75 nm",
    leaderFromY: (ARC_TOP + BOR_TOP) / 2,   // 52
    labelY: 48,
  },
  {
    id: "front-metal", appearsAt: 8,
    fill: "#4b5563",       labelColor: "#cbd5e1",
    label: "Ag contact fingers",
    leaderFromY: (MTL_TOP + MTL_BOT) / 2,   // 32
    labelY: 30,
  },
];

/* ─────────────────────────────────────────────────────────────
   Render helpers
───────────────────────────────────────────────────────────── */
function LeaderLine({
  fromY, toY, color,
}: { fromY: number; toY: number; color: string }) {
  const x0 = CX + CW;
  const x1 = RX;
  const x2 = x1 + 14;
  return (
    <g opacity={0.55}>
      <line x1={x0} y1={fromY} x2={x1} y2={fromY} stroke={color} strokeWidth={0.8} />
      {Math.abs(fromY - toY) > 1 && (
        <line x1={x1} y1={fromY} x2={x2} y2={toY} stroke={color} strokeWidth={0.8} />
      )}
      <line x1={x2} y1={toY} x2={LX - 4} y2={toY} stroke={color} strokeWidth={0.8} />
      <circle cx={LX - 4} cy={toY} r={1.8} fill={color} />
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────── */
export function StepLayerDiagram({ stepId, accent }: { stepId: string; accent: string }) {
  const si = (STEP_ORDER as string[]).indexOf(stepId);

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      className="h-full w-full"
      style={{ fontFamily: "system-ui,-apple-system,sans-serif" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* n-Si gradient — darker at surface, a bit lighter in bulk */}
        <linearGradient id="nsi-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1e3a6e" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
        {/* Subtle glow filter for newest layer */}
        <filter id="glow" x="-4%" y="-20%" width="108%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── FRONT label + sunlight arrows ── */}
      <text x={CX} y={16} fill="rgba(255,255,255,0.22)" fontSize={7.5} fontWeight="700" letterSpacing="2.5">
        FRONT  (LIGHT ENTERS)
      </text>
      {[0.06,0.18,0.30,0.43,0.55,0.68,0.80,0.93].map((f, i) => (
        <g key={i} opacity={0.3}>
          <line
            x1={CX + f * CW} y1={MTL_TOP - 8}
            x2={CX + f * CW} y2={MTL_TOP - 1}
            stroke="#fde68a" strokeWidth={1.5} strokeLinecap="round"
          />
          <polygon
            points={`${CX + f * CW - 2.5},${MTL_TOP - 1} ${CX + f * CW + 2.5},${MTL_TOP - 1} ${CX + f * CW},${MTL_TOP + 2}`}
            fill="#fde68a"
          />
        </g>
      ))}

      {/* ── REAR label ── */}
      <text x={CX} y={VH - 4} fill="rgba(255,255,255,0.22)" fontSize={7.5} fontWeight="700" letterSpacing="2.5">
        REAR
      </text>

      {/* ── Layer shapes ── */}
      {LAYERS.map((layer) => {
        const visible = layer.appearsAt === -1 || layer.appearsAt <= si;
        const isDoped = layer.dopedAt !== undefined && si >= layer.dopedAt;
        const fill    = isDoped && layer.dopedFill ? layer.dopedFill : layer.fill;
        const lColor  = isDoped && layer.dopedLabelColor ? layer.dopedLabelColor : layer.labelColor;
        const lText   = isDoped && layer.dopedLabel ? layer.dopedLabel : layer.label;
        const isNew   = layer.appearsAt === si || (layer.dopedAt !== undefined && layer.dopedAt === si);

        return (
          <motion.g
            key={layer.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* ── Shape ── */}
            {layer.id === "n-si" ? (
              <path d={siPath()} fill="url(#nsi-grad)" />
            ) : layer.id === "p-boron" ? (
              <path d={zigzagBand(BOR_TOP, SI_VY)} fill={fill} />
            ) : layer.id === "front-sinx" ? (
              <path d={zigzagBand(ARC_TOP, BOR_TOP)} fill={fill} />
            ) : layer.id === "front-metal" ? (
              /* Finger bars — flat rectangles with gaps */
              <>
                {Array.from({ length: 6 }).map((_, i) => {
                  const seg = CW / 6;
                  const fw  = seg * 0.44;
                  return (
                    <rect
                      key={i}
                      x={CX + i * seg + (seg - fw) / 2}
                      y={MTL_TOP}
                      width={fw}
                      height={MTL_H}
                      rx={1}
                      fill={fill}
                    />
                  );
                })}
              </>
            ) : layer.id === "tunnel-ox" ? (
              <rect x={CX} y={SI_BOT}  width={CW} height={5}          fill={fill} />
            ) : layer.id === "poly-si" ? (
              <motion.rect x={CX} y={TNL_BOT} width={CW} height={16} rx={0}
                animate={{ fill }} transition={{ duration: 0.5 }} />
            ) : layer.id === "al2o3" ? (
              <rect x={CX} y={PSI_BOT} width={CW} height={7}          fill={fill} />
            ) : layer.id === "rear-sinx" ? (
              <rect x={CX} y={ALO_BOT} width={CW} height={11}         fill={fill} />
            ) : layer.id === "rear-metal" ? (
              <rect x={CX} y={RSN_BOT} width={CW} height={10}         fill={fill} />
            ) : null}

            {/* ── Glow pulse on newest layer ── */}
            {isNew && visible && (
              <motion.rect
                x={CX - 1} y={layer.leaderFromY - 8}
                width={CW + 2} height={16}
                fill="none"
                stroke={lColor}
                strokeWidth={1.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0] }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            )}

            {/* ── Leader line ── */}
            {visible && (
              <LeaderLine fromY={layer.leaderFromY} toY={layer.labelY} color={lColor} />
            )}

            {/* ── Label text ── */}
            {visible && (
              <text x={LX} y={layer.labelY + 3.5} fontSize={10.5}>
                <tspan fill={lColor} fontWeight="600">{lText}</tspan>
                {layer.sub && (
                  <tspan fill={lColor} opacity={0.4} fontSize={9} dx={5}>{layer.sub}</tspan>
                )}
              </text>
            )}
          </motion.g>
        );
      })}

      {/* ── Thin divider between cross-section and label area ── */}
      <line
        x1={CX + CW + 4} y1={MTL_TOP - 12}
        x2={CX + CW + 4} y2={RMT_BOT + 4}
        stroke="rgba(255,255,255,0.07)" strokeWidth={1}
      />
    </svg>
  );
}
