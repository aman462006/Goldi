"use client";

import { motion } from "framer-motion";

const C = {
  bg: "#111",
  cell: "#3498db",
  defect: "#111",
  busbar: "#ecf0f1",
  txt: "rgba(255,255,255,0.7)"
};

export const ElTestingAnimation = () => {
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{ background: C.bg }}>
      <text x="160" y="20" fill={C.txt} fontSize="12" textAnchor="middle">EL Testing (Electroluminescence)</text>
      
      {/* Cell Base (Glowing) */}
      <motion.rect
        x="80" y="60" width="160" height="160"
        fill={C.cell}
        initial={{ opacity: 0.1 }}
        animate={{ opacity: [0.1, 0.9, 0.9, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Busbars */}
      <rect x="110" y="60" width="4" height="160" fill={C.busbar} />
      <rect x="160" y="60" width="4" height="160" fill={C.busbar} />
      <rect x="210" y="60" width="4" height="160" fill={C.busbar} />
      
      {/* Fingers */}
      {[...Array(15)].map((_, i) => (
        <line key={`f-${i}`} x1="80" y1={65 + i * 11} x2="240" y2={65 + i * 11} stroke={C.busbar} strokeWidth="0.5" />
      ))}
      
      {/* Defects (Dark Spots) */}
      <motion.circle
        cx="140" cy="100" r="10" fill={C.defect}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.8, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.8, 1] }}
      />
      <motion.path
        d="M 180 160 L 190 150 L 200 170 Z" fill={C.defect}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.9, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 0.8, 1] }}
      />
      
      {/* Power injection arrows */}
      <motion.path
        d="M 112 40 L 112 50 L 108 45 M 112 50 L 116 45" stroke="#f1c40f" strokeWidth="2" fill="none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.path
        d="M 162 40 L 162 50 L 158 45 M 162 50 L 166 45" stroke="#f1c40f" strokeWidth="2" fill="none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      />
      <motion.path
        d="M 212 40 L 212 50 L 208 45 M 212 50 L 216 45" stroke="#f1c40f" strokeWidth="2" fill="none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
      />
      
    </svg>
  );
};
