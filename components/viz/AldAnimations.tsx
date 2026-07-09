"use client";

import { motion } from "framer-motion";

const C = {
  electric: "#3b8cff",
  plasma: "#a78bfa",
  photon: "#38bdf8",
  teal: "#2dd4bf",
  rose: "#fb7185",
  ink: "#04060d",
  grid: "rgba(255,255,255,0.07)",
  txt: "rgba(255,255,255,0.55)",
  tma: "#facc15", // Yellow for TMA
  h2o: "#60a5fa", // Blue for H2O
  al2o3: "#818cf8", // Indigo for Al2O3
};

export function AldCycleAnimation() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Background Grid */}
      <rect x="0" y="0" width="320" height="240" fill={C.ink} />
      
      {/* Textured Silicon Surface */}
      <path d="M 40,200 L 80,140 L 120,200 L 160,140 L 200,200 L 240,140 L 280,200 Z" fill="rgba(59,140,255,0.1)" stroke={C.electric} strokeWidth="1" />
      <text x="160" y="220" textAnchor="middle" style={{ fontSize: 10, fill: C.electric, fontFamily: "sans-serif" }}>
        Textured Silicon Surface (Dangling Bonds)
      </text>

      {/* Cycle Text */}
      <motion.text
        x="160" y="30" textAnchor="middle" style={{ fontSize: 12, fill: C.txt, fontFamily: "sans-serif", fontWeight: "bold" }}
        animate={{ opacity: [1, 1, 0, 0, 0, 0, 1] }}
        transition={{ duration: 10, repeat: Infinity, times: [0, 0.2, 0.25, 0.5, 0.75, 0.95, 1] }}
      >
        Step 1: TMA Pulse (Self-Limiting)
      </motion.text>
      <motion.text
        x="160" y="30" textAnchor="middle" style={{ fontSize: 12, fill: C.txt, fontFamily: "sans-serif", fontWeight: "bold" }}
        animate={{ opacity: [0, 0, 1, 1, 0, 0, 0] }}
        transition={{ duration: 10, repeat: Infinity, times: [0, 0.2, 0.25, 0.45, 0.5, 0.95, 1] }}
      >
        Step 2: Purge
      </motion.text>
      <motion.text
        x="160" y="30" textAnchor="middle" style={{ fontSize: 12, fill: C.txt, fontFamily: "sans-serif", fontWeight: "bold" }}
        animate={{ opacity: [0, 0, 0, 0, 1, 1, 0] }}
        transition={{ duration: 10, repeat: Infinity, times: [0, 0.45, 0.5, 0.7, 0.75, 0.95, 1] }}
      >
        Step 3: H₂O Pulse (Reaction)
      </motion.text>
      <motion.text
        x="160" y="30" textAnchor="middle" style={{ fontSize: 12, fill: C.txt, fontFamily: "sans-serif", fontWeight: "bold" }}
        animate={{ opacity: [0, 0, 0, 0, 0, 0, 1] }}
        transition={{ duration: 10, repeat: Infinity, times: [0, 0.7, 0.75, 0.95, 0.96, 0.99, 1] }}
      >
        Step 4: Purge & Complete (1 Layer)
      </motion.text>

      {/* TMA Molecules Falling */}
      <motion.g animate={{ opacity: [0, 1, 0, 0, 0, 0, 0] }} transition={{ duration: 10, repeat: Infinity, times: [0, 0.05, 0.2, 0.25, 0.5, 0.75, 1] }}>
        {[60, 100, 140, 180, 220, 260].map((x, i) => (
          <motion.circle
            key={`tma-${i}`}
            r="4" fill={C.tma}
            initial={{ cx: x, cy: 0 }}
            animate={{ cy: [0, 170, 170] }}
            transition={{ duration: 10, repeat: Infinity, times: [0, 0.15, 1] }}
          />
        ))}
      </motion.g>

      {/* H2O Molecules Falling */}
      <motion.g animate={{ opacity: [0, 0, 0, 1, 0, 0, 0] }} transition={{ duration: 10, repeat: Infinity, times: [0, 0.25, 0.45, 0.5, 0.7, 0.75, 1] }}>
        {[60, 100, 140, 180, 220, 260].map((x, i) => (
          <motion.circle
            key={`h2o-${i}`}
            r="3" fill={C.h2o}
            initial={{ cx: x, cy: 0 }}
            animate={{ cy: [0, 0, 170, 170, 170] }}
            transition={{ duration: 10, repeat: Infinity, times: [0, 0.5, 0.65, 0.8, 1] }}
          />
        ))}
      </motion.g>

      {/* Formed Al2O3 Layer */}
      <motion.path
        d="M 40,195 L 80,135 L 120,195 L 160,135 L 200,195 L 240,135 L 280,195"
        fill="none" stroke={C.al2o3} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 0, 0, 1, 1], opacity: [0, 0, 0, 1, 1] }}
        transition={{ duration: 10, repeat: Infinity, times: [0, 0.6, 0.65, 0.75, 1] }}
      />
    </svg>
  );
}

export function AldFieldEffectAnimation() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Regions */}
      <rect x="20" y="40" width="140" height="160" fill="rgba(59,140,255,0.05)" />
      <rect x="160" y="40" width="20" height="160" fill="rgba(129,140,248,0.2)" stroke={C.al2o3} strokeWidth="1" />
      <rect x="180" y="40" width="120" height="160" fill="rgba(45,212,191,0.05)" />
      
      <text x="90" y="220" textAnchor="middle" style={{ fontSize: 9, fill: C.electric, fontFamily: "sans-serif" }}>p-Type Silicon</text>
      <text x="170" y="230" textAnchor="middle" style={{ fontSize: 9, fill: C.al2o3, fontFamily: "sans-serif", writingMode: "vertical-rl" }}>Al₂O₃ (ALD)</text>
      <text x="240" y="220" textAnchor="middle" style={{ fontSize: 9, fill: C.txt, fontFamily: "sans-serif" }}>SiNx / Air</text>

      {/* Negative Fixed Charges in Al2O3 */}
      {[50, 70, 90, 110, 130, 150, 170, 190].map((y, i) => (
        <g key={`charge-${i}`}>
          <circle cx="170" cy={y} r="5" fill="rgba(251,113,133,0.3)" />
          <text x="170" y={y + 3} textAnchor="middle" style={{ fontSize: 8, fill: C.rose, fontFamily: "sans-serif", fontWeight: "bold" }}>-</text>
        </g>
      ))}

      {/* Title */}
      <text x="160" y="20" textAnchor="middle" style={{ fontSize: 12, fill: C.txt, fontFamily: "sans-serif", fontWeight: "bold" }}>
        Field-Effect Passivation
      </text>

      {/* Incoming Electron being repelled */}
      <motion.circle
        r="4" fill={C.electric}
        initial={{ cx: 40, cy: 120 }}
        animate={{ cx: [40, 130, 130, 40], cy: [120, 120, 120, 180] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.4, 0.5, 1], ease: "easeInOut" }}
      />
      <motion.text
        x="40" y="112" style={{ fontSize: 8, fill: C.electric, fontFamily: "sans-serif" }}
        animate={{ x: [40, 130, 130, 40], y: [112, 112, 112, 172] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.4, 0.5, 1], ease: "easeInOut" }}
      >
        e⁻
      </motion.text>

      {/* Repulsion Lines */}
      <motion.path
        d="M 160,120 Q 140,120 140,100" fill="none" stroke={C.rose} strokeWidth="2" strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 0] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.35, 0.5, 1] }}
      />
      <motion.path
        d="M 160,120 Q 140,120 140,140" fill="none" stroke={C.rose} strokeWidth="2" strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 0] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.35, 0.5, 1] }}
      />

      <text x="140" y="100" textAnchor="end" style={{ fontSize: 7, fill: C.rose, fontFamily: "sans-serif" }}>
        Repelled by negative charge
      </text>
    </svg>
  );
}
