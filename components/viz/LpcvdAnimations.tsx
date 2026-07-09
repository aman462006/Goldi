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
};

export function LpcvdFurnaceAnimation() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Background Tube */}
      <rect x="20" y="40" width="280" height="160" rx="16" fill="rgba(255,255,255,0.02)" stroke={C.grid} strokeWidth="2" />
      <text x="160" y="30" textAnchor="middle" style={{ fontSize: 10, fill: C.txt, fontFamily: "sans-serif" }}>
        LPCVD Furnace Tube
      </text>

      {/* Wafer Boat / Stack */}
      {[80, 110, 140, 170, 200, 230].map((x) => (
        <g key={x}>
          <rect x={x} y="80" width="4" height="80" fill="#12233f" stroke={C.electric} strokeWidth="1" />
          <motion.rect
            x={x - 2}
            y="80"
            width="2"
            height="80"
            fill={C.teal}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 80 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.rect
            x={x + 4}
            y="80"
            width="2"
            height="80"
            fill={C.teal}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 80 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </g>
      ))}
      <text x="156" y="180" textAnchor="middle" style={{ fontSize: 8, fill: C.teal, fontFamily: "sans-serif" }}>
        Growing Poly-Si
      </text>

      {/* Gas flow (Silane SiH4 in, H2 out) */}
      <motion.g
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 300, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="20" cy="120" r="4" fill={C.plasma} />
        <text x="20" y="112" textAnchor="middle" style={{ fontSize: 8, fill: C.plasma, fontFamily: "sans-serif" }}>
          SiH₄
        </text>
      </motion.g>
      
      <motion.g
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 300, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 1 }}
      >
        <circle cx="20" cy="140" r="4" fill={C.plasma} />
      </motion.g>

      <motion.g
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 320, opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.5 }}
      >
        <circle cx="20" cy="90" r="2" fill={C.txt} />
        <circle cx="24" cy="90" r="2" fill={C.txt} />
        <text x="22" y="84" textAnchor="middle" style={{ fontSize: 7, fill: C.txt, fontFamily: "sans-serif" }}>
          H₂
        </text>
      </motion.g>
    </svg>
  );
}

export function QuantumTunnelingAnimation() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Regions */}
      <rect x="20" y="40" width="100" height="160" fill="rgba(59,140,255,0.1)" />
      <rect x="120" y="40" width="20" height="160" fill="rgba(124,58,237,0.2)" stroke={C.plasma} strokeWidth="1" />
      <rect x="140" y="40" width="160" height="160" fill="rgba(45,212,191,0.1)" />
      
      <text x="70" y="220" textAnchor="middle" style={{ fontSize: 9, fill: C.txt, fontFamily: "sans-serif" }}>Wafer (n)</text>
      <text x="130" y="230" textAnchor="middle" style={{ fontSize: 9, fill: C.plasma, fontFamily: "sans-serif", writingMode: "vertical-rl" }}>1.5nm Tunnel Oxide</text>
      <text x="220" y="220" textAnchor="middle" style={{ fontSize: 9, fill: C.txt, fontFamily: "sans-serif" }}>Poly-Si (n⁺)</text>

      {/* Electron Tunneling */}
      <motion.circle
        cx="40" cy="80" r="4" fill={C.electric}
        initial={{ x: 0 }}
        animate={{ x: [0, 60, 80, 240] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.4, 0.5, 1], ease: "easeInOut" }}
      />
      <text x="40" y="72" textAnchor="middle" style={{ fontSize: 8, fill: C.electric, fontFamily: "sans-serif" }}>e⁻</text>
      
      {/* Wavefunction line */}
      <path d="M 20,100 Q 70,80 120,100" fill="none" stroke={C.electric} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <path d="M 120,100 Q 130,110 140,100" fill="none" stroke={C.electric} strokeWidth="2" opacity="0.8" />
      <path d="M 140,100 Q 220,90 300,100" fill="none" stroke={C.electric} strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
      
      {/* Hole Blocked */}
      <motion.circle
        cx="40" cy="160" r="4" fill={C.rose}
        initial={{ x: 0 }}
        animate={{ x: [0, 60, 70, 40, 20] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.3, 0.4, 0.6, 1], ease: "easeInOut" }}
      />
      <text x="40" y="152" textAnchor="middle" style={{ fontSize: 8, fill: C.rose, fontFamily: "sans-serif" }}>h⁺</text>
    </svg>
  );
}

export function LayerBuildAnimation() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="waferGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(59,140,255,0.2)" />
          <stop offset="100%" stopColor="rgba(59,140,255,0.05)" />
        </linearGradient>
      </defs>
      {/* Wafer (always there) */}
      <rect x="40" y="140" width="240" height="60" rx="4" fill="url(#waferGrad)" stroke={C.electric} strokeWidth="1" />
      <text x="160" y="175" textAnchor="middle" style={{ fontSize: 10, fill: C.electric, fontFamily: "sans-serif" }}>n-Type Silicon Wafer (150µm)</text>

      {/* Oxide Layer */}
      <motion.rect
        x="40" y="130" width="240" height="10" fill={C.plasma}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
      />
      <motion.text
        x="160" y="138" textAnchor="middle" style={{ fontSize: 7, fill: "#fff", fontFamily: "sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
      >
        SiO₂ Tunnel Oxide (1.5nm)
      </motion.text>

      {/* Poly-Si Layer */}
      <motion.rect
        x="40" y="90" width="240" height="40" fill="rgba(45,212,191,0.2)" stroke={C.teal} strokeWidth="1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2, repeat: Infinity, repeatType: "reverse", repeatDelay: 4 }}
      />
      <motion.text
        x="160" y="115" textAnchor="middle" style={{ fontSize: 10, fill: C.teal, fontFamily: "sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2, repeat: Infinity, repeatType: "reverse", repeatDelay: 4 }}
      >
        n⁺ Poly-Silicon (150nm)
      </motion.text>
      
      {/* Metal Contacts */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2.5 }}
      >
        <rect x="60" y="75" width="40" height="15" fill="#e2e8f0" />
        <rect x="140" y="75" width="40" height="15" fill="#e2e8f0" />
        <rect x="220" y="75" width="40" height="15" fill="#e2e8f0" />
        <text x="160" y="65" textAnchor="middle" style={{ fontSize: 9, fill: "#e2e8f0", fontFamily: "sans-serif" }}>Metal Fingers</text>
      </motion.g>
    </svg>
  );
}

export function BandDiagramAnimation() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Regions */}
      <rect x="20" y="20" width="100" height="200" fill="rgba(59,140,255,0.05)" />
      <rect x="120" y="20" width="20" height="200" fill="rgba(124,58,237,0.1)" />
      <rect x="140" y="20" width="140" height="200" fill="rgba(45,212,191,0.05)" />
      
      <text x="70" y="215" textAnchor="middle" style={{ fontSize: 8, fill: C.txt, fontFamily: "sans-serif" }}>n-Si Wafer</text>
      <text x="130" y="215" textAnchor="middle" style={{ fontSize: 7, fill: C.txt, fontFamily: "sans-serif" }}>SiO₂</text>
      <text x="210" y="215" textAnchor="middle" style={{ fontSize: 8, fill: C.txt, fontFamily: "sans-serif" }}>n⁺ Poly-Si</text>

      {/* Fermi Level */}
      <line x1="20" y1="120" x2="280" y2="120" stroke={C.txt} strokeWidth="1" strokeDasharray="4 2" />
      <text x="260" y="115" style={{ fontSize: 8, fill: C.txt, fontFamily: "sans-serif" }}>Ef</text>

      {/* Conduction Band (Ec) */}
      <path d="M 20,80 L 110,80 Q 120,80 120,60 L 140,60 Q 140,90 150,90 L 280,90" fill="none" stroke={C.electric} strokeWidth="2" />
      <text x="30" y="75" style={{ fontSize: 9, fill: C.electric, fontFamily: "sans-serif" }}>Ec (Small Barrier)</text>

      {/* Valence Band (Ev) */}
      <path d="M 20,180 L 110,180 Q 120,180 120,130 L 140,130 Q 140,190 150,190 L 280,190" fill="none" stroke={C.rose} strokeWidth="2" />
      <text x="30" y="175" style={{ fontSize: 9, fill: C.rose, fontFamily: "sans-serif" }}>Ev (Massive Barrier)</text>

      {/* Electron rolling down Ec */}
      <motion.circle
        cx="0" cy="0" r="4" fill={C.electric}
        initial={{ x: 40, y: 76 }}
        animate={{ x: [40, 110, 125, 150, 260], y: [76, 76, 55, 86, 86] }}
        transition={{ duration: 2.5, repeat: Infinity, times: [0, 0.4, 0.45, 0.55, 1], ease: "easeInOut" }}
      />
      <text x="40" y="65" style={{ fontSize: 8, fill: C.electric, fontFamily: "sans-serif" }}>e⁻ tunnels easily</text>

      {/* Hole bouncing off Ev */}
      <motion.circle
        cx="0" cy="0" r="4" fill={C.rose}
        initial={{ x: 40, y: 184 }}
        animate={{ x: [40, 110, 115, 60], y: [184, 184, 184, 184] }}
        transition={{ duration: 2.5, repeat: Infinity, times: [0, 0.4, 0.45, 1], ease: "easeInOut" }}
      />
      <text x="40" y="195" style={{ fontSize: 8, fill: C.rose, fontFamily: "sans-serif" }}>h⁺ blocked by barrier</text>
    </svg>
  );
}

export function CurrentSpreadingAnimation() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Wafer */}
      <rect x="20" y="120" width="280" height="80" fill="rgba(59,140,255,0.1)" stroke={C.electric} strokeWidth="1" />
      <text x="160" y="160" textAnchor="middle" style={{ fontSize: 10, fill: C.txt, fontFamily: "sans-serif" }}>Silicon Wafer</text>

      {/* Oxide */}
      <rect x="20" y="110" width="280" height="10" fill={C.plasma} />
      
      {/* Poly-Si Sheet */}
      <rect x="20" y="70" width="280" height="40" fill="rgba(45,212,191,0.2)" stroke={C.teal} strokeWidth="1" />
      <text x="160" y="95" textAnchor="middle" style={{ fontSize: 10, fill: C.teal, fontFamily: "sans-serif" }}>Poly-Si Continuous Sheet</text>

      {/* Metal Fingers */}
      <rect x="60" y="50" width="40" height="20" fill="#e2e8f0" />
      <rect x="220" y="50" width="40" height="20" fill="#e2e8f0" />

      {/* Electron 1 (under metal) */}
      <motion.circle
        r="3" fill={C.electric}
        initial={{ cx: 80, cy: 150 }}
        animate={{ cx: [80, 80, 80, 80], cy: [150, 115, 90, 60] }}
        transition={{ duration: 2, repeat: Infinity, times: [0, 0.3, 0.5, 1] }}
      />

      {/* Electron 2 (under gap, travels sideways) */}
      <motion.circle
        r="3" fill={C.electric}
        initial={{ cx: 160, cy: 150 }}
        animate={{ cx: [160, 160, 160, 240, 240], cy: [150, 115, 80, 80, 60] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.2, 0.3, 0.8, 1] }}
      />
      <path d="M 160,80 L 240,80" fill="none" stroke={C.electric} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <text x="200" y="75" textAnchor="middle" style={{ fontSize: 7, fill: C.electric, fontFamily: "sans-serif" }}>Lateral spreading</text>
    </svg>
  );
}
