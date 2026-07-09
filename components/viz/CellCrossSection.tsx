"use client";

import { motion } from "framer-motion";

const STEP_ORDER = [
  "texture","boron","rear-etch","lpcvd","pocl3","front-etch","ald","pecvd","print","test",
];

interface LayerDef {
  id: string;
  label: string;
  fill: string;
  textDark?: boolean;
  appearsAt: number;
  ry: number;
  h: number;
  fingers?: boolean;
  silicon?: boolean;
  dopedAt?: number;
  dopedFill?: string;
  dopedLabel?: string;
}

const CX    = 8;
const CW    = 384;
const TOP_Y = 22;

const LAYERS: LayerDef[] = [
  { id:"front-metal", label:"Ag fingers",      textDark:true, fill:"#d1d5db", appearsAt:8,  ry:0,   h:8,  fingers:true },
  { id:"front-sinx",  label:"SiNₓ:H ARC",                    fill:"#3730a3", appearsAt:7,  ry:8,   h:10               },
  { id:"p-boron",     label:"p⁺ emitter",                     fill:"#b45309", appearsAt:1,  ry:18,  h:9                },
  { id:"n-si",        label:"n-Si",                           fill:"#1e3a8a", appearsAt:-1, ry:27,  h:66, silicon:true },
  { id:"tunnel-ox",   label:"SiO₂",            textDark:true, fill:"#cbd5e1", appearsAt:3,  ry:93,  h:5                },
  { id:"poly-si",     label:"poly-Si",                        fill:"#475569", appearsAt:3,  ry:98,  h:14,
    dopedAt:4, dopedFill:"#1d4ed8", dopedLabel:"n⁺ poly-Si"                                                           },
  { id:"al2o3",       label:"Al₂O₃",                         fill:"#047857", appearsAt:6,  ry:112, h:6                },
  { id:"rear-sinx",   label:"SiNₓ",                          fill:"#6d28d9", appearsAt:7,  ry:118, h:9                },
  { id:"rear-metal",  label:"Ag/Al",                         fill:"#6b7280", appearsAt:8,  ry:127, h:9                },
];

// Total stack bottom: ry 127+9=136 → absolute y = 22+136 = 158. ViewBox height = 168.

const BADGES: Record<string, { text: string; fill: string }> = {
  texture:       { text: "Surface textured",           fill: "#1e3a8a" },
  boron:         { text: "+ p⁺ boron emitter",         fill: "#b45309" },
  "rear-etch":   { text: "Rear side cleaned",          fill: "#64748b" },
  lpcvd:         { text: "+ tunnel oxide + poly-Si",   fill: "#475569" },
  pocl3:         { text: "n⁺ phosphorus doping",       fill: "#1d4ed8" },
  "front-etch":  { text: "BSG / PSG removed",          fill: "#64748b" },
  ald:           { text: "+ Al₂O₃ passivation",        fill: "#047857" },
  pecvd:         { text: "+ SiNₓ ARC + rear SiNₓ",    fill: "#6d28d9" },
  print:         { text: "+ Ag contact metallisation", fill: "#9ca3af" },
  test:          { text: "Complete cell stack",        fill: "#3b8cff" },
};

export function CellCrossSection({ stepId }: { stepId: string }) {
  const si = (STEP_ORDER as string[]).indexOf(stepId);
  const badge = BADGES[stepId];

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 400 168"
        className="h-full w-full"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        {/* FRONT / REAR axis labels */}
        <text x={CX} y={14} fill="rgba(255,255,255,0.28)" fontSize={7} fontWeight="700" letterSpacing="2">
          FRONT (LIGHT ENTERS)
        </text>
        <text x={CX} y={165} fill="rgba(255,255,255,0.28)" fontSize={7} fontWeight="700" letterSpacing="2">
          REAR
        </text>

        {/* Sunlight arrows */}
        {[0.07, 0.22, 0.38, 0.54, 0.70, 0.86].map((f, i) => (
          <g key={i} opacity={0.4}>
            <line
              x1={CX + f * CW} y1={TOP_Y - 10}
              x2={CX + f * CW} y2={TOP_Y - 2}
              stroke="#fde68a" strokeWidth={1.5} strokeLinecap="round"
            />
            <polygon
              points={`${CX + f * CW - 2},${TOP_Y - 2} ${CX + f * CW + 2},${TOP_Y - 2} ${CX + f * CW},${TOP_Y + 1}`}
              fill="#fde68a"
            />
          </g>
        ))}

        {/* Layer bands */}
        {LAYERS.map((layer) => {
          const visible = layer.appearsAt === -1 || layer.appearsAt <= si;
          const absY    = TOP_Y + layer.ry;
          const isDoped = layer.dopedAt !== undefined && si >= layer.dopedAt;
          const fill    = isDoped && layer.dopedFill  ? layer.dopedFill  : layer.fill;
          const label   = isDoped && layer.dopedLabel ? layer.dopedLabel : layer.label;
          const darkTxt = layer.textDark && !isDoped;

          return (
            <motion.g
              key={layer.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              {layer.silicon ? (
                <SiLayer cx={CX} y={absY} w={CW} h={layer.h} fill={fill} />
              ) : layer.fingers ? (
                <>
                  {Array.from({ length: 5 }).map((_, i) => {
                    const seg = CW / 5;
                    const fw  = seg * 0.42;
                    return (
                      <rect
                        key={i}
                        x={CX + i * seg + (seg - fw) / 2}
                        y={absY}
                        width={fw}
                        height={layer.h}
                        rx={1}
                        fill={fill}
                      />
                    );
                  })}
                </>
              ) : (
                <rect x={CX} y={absY} width={CW} height={layer.h} fill={fill} />
              )}

              {/* Label inside band */}
              {layer.h >= 8 && !layer.fingers && (
                <text
                  x={CX + CW / 2}
                  y={absY + layer.h / 2 + 3.5}
                  textAnchor="middle"
                  fill={darkTxt ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.82)"}
                  fontSize={Math.min(8.5, layer.h - 2)}
                  fontWeight="600"
                  letterSpacing="0.4"
                >
                  {label}
                </text>
              )}
            </motion.g>
          );
        })}

        {/* Glow outline on newly-added layers */}
        {LAYERS.filter((l) => l.appearsAt === si).map((layer) => (
          <motion.rect
            key={`glow-${layer.id}-${stepId}`}
            x={CX}
            y={TOP_Y + layer.ry}
            width={CW}
            height={layer.h}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={2}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.25] }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* Step badge */}
      {badge && (
        <motion.div
          key={stepId}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full px-2.5 py-1"
          style={{
            background: "rgba(4,6,13,0.72)",
            border: `1px solid ${badge.fill}55`,
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
            style={{ background: badge.fill }}
          />
          <span
            className="font-mono text-[9px] font-semibold uppercase tracking-widest"
            style={{ color: badge.fill }}
          >
            {badge.text}
          </span>
        </motion.div>
      )}
    </div>
  );
}

function SiLayer({
  cx, y, w, h, fill,
}: {
  cx: number; y: number; w: number; h: number; fill: string;
}) {
  const n  = 18;
  const pw = w / n;
  const ph = 7;
  let d    = `M ${cx} ${y + ph}`;
  for (let i = 0; i < n; i++) {
    const x0 = cx + i * pw;
    const xm = x0 + pw / 2;
    const x1 = x0 + pw;
    d += ` L ${xm} ${y} L ${x1} ${y + ph}`;
  }
  d += ` V ${y + h} H ${cx} Z`;
  return <path d={d} fill={fill} />;
}
