"use client";

import { motion } from "framer-motion";

const C = {
  bg: "#111",
  si: "#4a4a4a",
  nLayer: "#3498db",
  plasma: "#a78bfa",
  txt: "rgba(255,255,255,0.7)"
};

export const EdgeIsolationAnimation = () => {
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{ background: C.bg }}>
      <text x="160" y="20" fill={C.txt} fontSize="12" textAnchor="middle">Edge Isolation (Rear Etch)</text>
      
      {/* Wafer Cross Section */}
      <rect x="60" y="100" width="200" height="40" fill={C.si} />
      
      {/* Wrap-around layer (before etch) */}
      <motion.path
        d="M 55 95 L 265 95 L 265 145 L 55 145 Z"
        fill="none" stroke={C.nLayer} strokeWidth="6"
        initial={{ strokeDasharray: "620", strokeDashoffset: "0" }}
        animate={{ strokeDasharray: "620", strokeDashoffset: [0, 0, 100, 100, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Plasma/Etchant attacking edges */}
      <motion.rect
        x="45" y="130" width="20" height="20"
        fill={C.plasma}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: 5, repeat: Infinity, times: [0, 0.4, 0.6], ease: "easeInOut" }}
      />
      <motion.rect
        x="255" y="130" width="20" height="20"
        fill={C.plasma}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: 5, repeat: Infinity, times: [0, 0.4, 0.6], ease: "easeInOut" }}
      />
      
      <text x="160" y="170" fill={C.txt} fontSize="10" textAnchor="middle">Removing parasitic junction</text>
    </svg>
  );
};
