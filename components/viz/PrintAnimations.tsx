"use client";

import { motion } from "framer-motion";

const C = {
  bg: "#111",
  si: "#4a4a4a",
  screen: "#bdc3c7",
  paste: "#c0392b",
  squeegee: "#f39c12",
  sinx: "#2980b9",
  txt: "rgba(255,255,255,0.7)"
};

export const SnapOffAnimation = () => {
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{ background: C.bg }}>
      <text x="160" y="20" fill={C.txt} fontSize="12" textAnchor="middle">Screen Printing: Snap-Off</text>
      
      {/* Wafer */}
      <rect x="40" y="180" width="240" height="20" fill={C.si} />
      
      {/* Screen Mesh */}
      <motion.line
        x1="40" y1="160" x2="280" y2="160"
        stroke={C.screen} strokeWidth="2"
        initial={{ y1: 160, y2: 160 }}
        animate={{ 
          y1: [160, 180, 160, 160], 
          y2: [160, 180, 180, 160] 
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Squeegee */}
      <motion.polygon
        points="40,120 50,160 30,160"
        fill={C.squeegee}
        initial={{ x: 0, y: 0 }}
        animate={{ 
          x: [0, 240, 240, 0],
          y: [0, 20, 20, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Paste deposited */}
      <motion.rect
        x="60" y="175" width="10" height="5" fill={C.paste}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.2, 0.9, 1] }}
      />
      <motion.rect
        x="160" y="175" width="10" height="5" fill={C.paste}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.5, 0.6, 0.9, 1] }}
      />
      <motion.rect
        x="240" y="175" width="10" height="5" fill={C.paste}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.7, 0.8, 0.9, 1] }}
      />
    </svg>
  );
};

export const FiringFritAnimation = () => {
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{ background: C.bg }}>
      <text x="160" y="20" fill={C.txt} fontSize="12" textAnchor="middle">Firing: Glass Frit Melting</text>
      
      {/* Wafer */}
      <rect x="80" y="140" width="160" height="60" fill={C.si} />
      
      {/* SiNx ARC Layer */}
      <motion.rect
        x="80" y="130" width="160" height="10"
        fill={C.sinx}
      />
      
      {/* Silver Paste Finger */}
      <motion.path
        d="M 140 100 L 180 100 L 170 130 L 150 130 Z"
        fill="#ecf0f1"
      />
      <text x="160" y="90" fill="#ecf0f1" fontSize="10" textAnchor="middle">Ag Paste</text>
      
      {/* Glass Frit etching through SiNx */}
      <motion.rect
        x="150" y="130" width="20" height="10"
        fill={C.paste}
        initial={{ height: 0, y: 130 }}
        animate={{ height: [0, 10, 10, 0], y: [130, 130, 130, 130] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Ag Crystallites growing into Si */}
      <motion.rect
        x="152" y="140" width="4" height="10"
        fill="#ecf0f1"
        initial={{ height: 0 }}
        animate={{ height: [0, 0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 0.8, 1], ease: "easeOut" }}
      />
      <motion.rect
        x="164" y="140" width="4" height="15"
        fill="#ecf0f1"
        initial={{ height: 0 }}
        animate={{ height: [0, 0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.6, 0.9, 1], ease: "easeOut" }}
      />
      
      <text x="160" y="220" fill={C.txt} fontSize="10" textAnchor="middle">Frit burns through ARC to form contact</text>
    </svg>
  );
};
