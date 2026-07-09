"use client";

import { motion } from "framer-motion";

const C = {
  bg: "#111",
  si: "#4a4a4a",
  phos: "#2ecc71",
  laser: "#e74c3c",
  txt: "rgba(255,255,255,0.7)"
};

export const PhosphorusDiffusionAnimation = () => {
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{ background: C.bg }}>
      <text x="160" y="20" fill={C.txt} fontSize="12" textAnchor="middle">POCl3 Diffusion</text>
      
      <rect x="40" y="140" width="240" height="80" fill={C.si} />
      <text x="160" y="185" fill={C.txt} fontSize="12" textAnchor="middle">p-type Silicon</text>

      {/* Bubbling POCl3 gas */}
      {[...Array(6)].map((_, i) => (
        <motion.circle
          key={`p-${i}`}
          r="4" fill={C.phos}
          initial={{ cx: 30 + i * 40, cy: 40, opacity: 0 }}
          animate={{
            cy: [40, 130, 145 + Math.random() * 20],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* PSG Layer */}
      <motion.rect
        x="40" y="135" width="240" height="5"
        fill="#a3e4d7"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x="160" y="130" fill="#a3e4d7" fontSize="10" textAnchor="middle">PSG Layer</text>

      {/* n+ Emitter */}
      <motion.rect
        x="40" y="140" width="240" height="15"
        fill={C.phos}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
};

export const SelectiveEmitterAnimation = () => {
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{ background: C.bg }}>
      <text x="160" y="20" fill={C.txt} fontSize="12" textAnchor="middle">Selective Emitter (Laser Doping)</text>
      
      <rect x="40" y="120" width="240" height="80" fill={C.si} />
      <rect x="40" y="115" width="240" height="5" fill="#a3e4d7" /> {/* PSG layer */}
      <rect x="40" y="120" width="240" height="15" fill={C.phos} opacity="0.3" /> {/* Lightly doped emitter */}

      {/* Laser beam */}
      <motion.line
        x1="100" y1="30" x2="100" y2="120"
        stroke={C.laser} strokeWidth="4"
        initial={{ x1: 60, x2: 60, opacity: 0 }}
        animate={{
          x1: [60, 160, 260],
          x2: [60, 160, 260],
          opacity: [0, 1, 1, 1, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Heavily doped regions */}
      <motion.rect
        x="55" y="120" width="10" height="25"
        fill={C.phos}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.8, 1] }}
      />
      <motion.rect
        x="155" y="120" width="10" height="25"
        fill={C.phos}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.5, 0.8, 1] }}
      />
      <motion.rect
        x="255" y="120" width="10" height="25"
        fill={C.phos}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.7, 0.8, 0.9, 1] }}
      />
    </svg>
  );
};
