"use client";

import { motion } from "framer-motion";

const C = {
  bg: "#111",
  si: "#4a4a4a",
  psg: "#a3e4d7",
  bsg: "#9b59b6",
  etchant: "#3b8cff",
  txt: "rgba(255,255,255,0.7)"
};

export const ChemicalEtchAnimation = () => {
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{ background: C.bg }}>
      <text x="160" y="20" fill={C.txt} fontSize="12" textAnchor="middle">Chemical Etch (PSG/BSG Removal)</text>
      
      <rect x="60" y="100" width="200" height="40" fill={C.si} />
      
      {/* Top Glass layer (e.g. PSG) */}
      <motion.rect
        x="60" y="90" width="200" height="10" fill={C.psg}
        initial={{ opacity: 1, height: 10, y: 90 }}
        animate={{ opacity: [1, 0.5, 0], height: [10, 5, 0], y: [90, 95, 100] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x="160" y="85" fill={C.psg} fontSize="10" textAnchor="middle">Glass Layer (PSG/BSG)</text>

      {/* Bottom Glass layer */}
      <motion.rect
        x="60" y="140" width="200" height="10" fill={C.bsg}
        initial={{ opacity: 1, height: 10 }}
        animate={{ opacity: [1, 0.5, 0], height: [10, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Etchant bath effect */}
      <motion.path
        d="M 40 180 Q 80 160 160 180 T 280 180 L 280 200 L 40 200 Z"
        fill={C.etchant} opacity="0.4"
        initial={{ y: 0 }}
        animate={{ y: [-150, -50, -150] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
};
