"use client";

import { motion } from "framer-motion";

const C = {
  electric: "#3b8cff",
  plasma: "#a78bfa",
  photon: "#facc15",
  teal: "#2dd4bf",
  rose: "#fb7185",
  ink: "#04060d",
  grid: "rgba(255,255,255,0.07)",
  txt: "rgba(255,255,255,0.55)",
  sih4: "#818cf8", // Indigo for SiH4
  nh3: "#60a5fa", // Blue for NH3
  rf: "#c084fc", // Purple for RF field
};

export function PecvdPlasmaAnimation() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Chamber */}
      <rect x="20" y="20" width="280" height="200" rx="10" fill={C.ink} stroke={C.grid} strokeWidth="2" />
      <text x="160" y="35" textAnchor="middle" style={{ fontSize: 10, fill: C.txt, fontFamily: "sans-serif" }}>
        PECVD Vacuum Chamber (400°C)
      </text>

      {/* RF Electrodes */}
      <rect x="60" y="50" width="200" height="10" fill="#475569" />
      <text x="160" y="47" textAnchor="middle" style={{ fontSize: 8, fill: C.rf, fontFamily: "sans-serif", fontWeight: "bold" }}>RF Power (+) </text>
      
      <rect x="60" y="180" width="200" height="10" fill="#475569" />
      <text x="160" y="200" textAnchor="middle" style={{ fontSize: 8, fill: C.txt, fontFamily: "sans-serif" }}>Grounded Heater (-)</text>

      {/* Wafer */}
      <rect x="80" y="175" width="160" height="5" fill="rgba(59,140,255,0.4)" stroke={C.electric} strokeWidth="1" />
      
      {/* RF Plasma Field */}
      <motion.rect
        x="60" y="60" width="200" height="120" fill="rgba(192,132,252,0.15)"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
      />
      <text x="160" y="125" textAnchor="middle" style={{ fontSize: 16, fill: "rgba(192,132,252,0.3)", fontFamily: "sans-serif", fontWeight: "bold" }}>PLASMA</text>

      {/* Gas Molecules (SiH4) Breaking */}
      <motion.g animate={{ y: [0, 60, 60], opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 0.55] }}>
        <circle cx="100" cy="60" r="4" fill={C.sih4} />
        <text x="100" y="54" textAnchor="middle" style={{ fontSize: 8, fill: C.sih4, fontFamily: "sans-serif" }}>SiH₄</text>
      </motion.g>
      
      {/* Fragments hitting wafer */}
      <motion.g animate={{ y: [60, 110, 110], opacity: [0, 0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 0.55, 1] }}>
        <circle cx="95" cy="65" r="2" fill={C.sih4} />
        <circle cx="105" cy="60" r="1" fill={C.txt} />
        <circle cx="98" cy="70" r="1" fill={C.txt} />
      </motion.g>

      {/* Gas Molecules (NH3) Breaking */}
      <motion.g animate={{ y: [0, 60, 60], opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.45], delay: 1 }}>
        <circle cx="220" cy="60" r="4" fill={C.nh3} />
        <text x="220" y="54" textAnchor="middle" style={{ fontSize: 8, fill: C.nh3, fontFamily: "sans-serif" }}>NH₃</text>
      </motion.g>
      
      {/* Fragments hitting wafer */}
      <motion.g animate={{ y: [60, 110, 110], opacity: [0, 0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.45, 1], delay: 1 }}>
        <circle cx="215" cy="65" r="2" fill={C.nh3} />
        <circle cx="225" cy="60" r="1" fill={C.txt} />
      </motion.g>

      {/* Film Growth */}
      <motion.rect
        x="80" y="173" width="160" height="2" fill={C.teal}
        initial={{ scaleY: 0, transformOrigin: "bottom" }}
        animate={{ scaleY: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.8, 1] }}
      />
      <text x="160" y="170" textAnchor="middle" style={{ fontSize: 8, fill: C.teal, fontFamily: "sans-serif" }}>Growing SiNx:H Film</text>
    </svg>
  );
}

export function AntiReflectionAnimation() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Air, SiNx, Silicon regions */}
      <rect x="20" y="20" width="280" height="80" fill={C.ink} />
      <text x="160" y="40" textAnchor="middle" style={{ fontSize: 10, fill: C.txt, fontFamily: "sans-serif" }}>Air (n ≈ 1.0)</text>

      <rect x="20" y="100" width="280" height="40" fill="rgba(45,212,191,0.2)" stroke={C.teal} strokeWidth="1" />
      <text x="160" y="125" textAnchor="middle" style={{ fontSize: 10, fill: C.teal, fontFamily: "sans-serif" }}>SiNx ARC (n ≈ 2.0)</text>

      <rect x="20" y="140" width="280" height="80" fill="rgba(59,140,255,0.1)" stroke={C.electric} strokeWidth="1" />
      <text x="160" y="180" textAnchor="middle" style={{ fontSize: 10, fill: C.electric, fontFamily: "sans-serif" }}>Silicon (n ≈ 3.5)</text>

      {/* Title */}
      <text x="160" y="230" textAnchor="middle" style={{ fontSize: 12, fill: C.txt, fontFamily: "sans-serif", fontWeight: "bold" }}>
        Destructive Interference
      </text>

      {/* Incoming Light Wave */}
      <motion.path
        d="M 60,20 Q 80,60 100,100" fill="none" stroke={C.photon} strokeWidth="2" strokeLinecap="round"
        initial={{ strokeDasharray: "200 200", strokeDashoffset: 200 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Light entering silicon (transmitted) */}
      <motion.path
        d="M 100,100 L 120,140 L 140,200" fill="none" stroke={C.photon} strokeWidth="3" strokeLinecap="round"
        initial={{ strokeDasharray: "200 200", strokeDashoffset: 200, opacity: 0 }}
        animate={{ strokeDashoffset: 0, opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.5 }}
      />
      <text x="145" y="210" style={{ fontSize: 8, fill: C.photon, fontFamily: "sans-serif" }}>Light trapped!</text>

      {/* Reflection 1 (Top surface) */}
      <motion.path
        d="M 100,100 Q 130,50 160,20" fill="none" stroke={C.rose} strokeWidth="1" strokeDasharray="4 2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1], delay: 0.5 }}
      />
      
      {/* Reflection 2 (Bottom surface) */}
      <motion.path
        d="M 100,100 L 120,140 Q 140,70 160,20" fill="none" stroke={C.electric} strokeWidth="1" strokeDasharray="4 2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1], delay: 0.8 }}
      />

      {/* Interference marker */}
      <motion.text
        x="165" y="50" style={{ fontSize: 8, fill: C.txt, fontFamily: "sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1], delay: 1 }}
      >
        Waves cancel out!
      </motion.text>
    </svg>
  );
}
