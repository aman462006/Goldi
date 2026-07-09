"use client";

import { motion } from "framer-motion";

const C = {
  bg: "#111",
  si: "#4a4a4a",
  siTexture: "#2a2a2a",
  laser: "#ff3b3b",
  photon: "#ffd700",
  txt: "rgba(255,255,255,0.7)"
};

export const SawDamageAnimation = () => {
  // showing removal of rough surface
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{ background: C.bg }}>
      <text x="160" y="20" fill={C.txt} fontSize="12" textAnchor="middle">Saw Damage Removal (KOH Etch)</text>
      
      {/* Base Silicon */}
      <rect x="40" y="100" width="240" height="100" fill={C.si} />
      
      {/* Rough surface */}
      <motion.path
        d="M 40 100 L 50 80 L 60 100 L 70 70 L 80 100 L 90 60 L 100 100 L 110 75 L 120 100 L 130 85 L 140 100 L 150 70 L 160 100 L 170 80 L 180 100 L 190 65 L 200 100 L 210 85 L 220 100 L 230 70 L 240 100 L 250 80 L 260 100 L 270 70 L 280 100 Z"
        fill={C.si}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      
      {/* Etchant level */}
      <motion.rect
        x="20" y="40" width="280" height="80"
        fill="#3b8cff"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: [0, 0.5, 0.5, 0], y: [-20, 0, 0, -20] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
      />
      
      {/* Pyramids emerging (Texturing) */}
      <motion.path
        d="M 40 100 L 60 85 L 80 100 L 100 85 L 120 100 L 140 85 L 160 100 L 180 85 L 200 100 L 220 85 L 240 100 L 260 85 L 280 100 Z"
        fill={C.siTexture}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
      />
    </svg>
  );
};

export const LightTrappingAnimation = () => {
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{ background: C.bg }}>
      <text x="160" y="20" fill={C.txt} fontSize="12" textAnchor="middle">Light Trapping in Pyramids</text>
      
      {/* Pyramids */}
      <path d="M 40 200 L 100 120 L 160 200 L 220 120 L 280 200 Z" fill={C.siTexture} />
      
      {/* Photon Path */}
      <motion.path
        d="M 120 40 L 120 150 L 140 170 L 180 140 L 160 200"
        fill="transparent"
        stroke={C.photon}
        strokeWidth="2"
        strokeDasharray="400"
        strokeDashoffset="400"
        animate={{ strokeDashoffset: [400, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Photon particles */}
      <motion.circle
        r="4" fill="#fff"
        initial={{ cx: 120, cy: 40 }}
        animate={{ 
          cx: [120, 120, 140, 180, 160],
          cy: [40, 150, 170, 140, 200]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
};
