"use client";

import { motion } from "framer-motion";

const C = {
  bg: "#111",
  si: "#4a4a4a",
  boron: "#ff4d4d",
  oxygen: "#3498db",
  txt: "rgba(255,255,255,0.7)"
};

export const BoronDiffusionAnimation = () => {
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{ background: C.bg }}>
      <text x="160" y="20" fill={C.txt} fontSize="12" textAnchor="middle">Boron Diffusion (BCl3 + O2)</text>
      
      {/* Silicon Wafer */}
      <rect x="40" y="140" width="240" height="80" fill={C.si} />
      <text x="160" y="185" fill={C.txt} fontSize="12" textAnchor="middle">n-type Silicon</text>

      {/* Gas Flow BCl3 */}
      {[...Array(5)].map((_, i) => (
        <motion.circle
          key={`b-${i}`}
          r="4" fill={C.boron}
          initial={{ cx: 20 + i * 50, cy: 40, opacity: 0 }}
          animate={{
            cy: [40, 120, 140 + Math.random() * 30],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Gas Flow O2 */}
      {[...Array(4)].map((_, i) => (
        <motion.circle
          key={`o-${i}`}
          r="3" fill={C.oxygen}
          initial={{ cx: 40 + i * 50, cy: 40, opacity: 0 }}
          animate={{
            cy: [40, 120, 130],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 3, delay: i * 0.5 + 0.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* BSG Layer forming */}
      <motion.rect
        x="40" y="135" width="240" height="5"
        fill="#9b59b6"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x="160" y="130" fill="#9b59b6" fontSize="10" textAnchor="middle">BSG Layer</text>

      {/* p+ layer forming */}
      <motion.rect
        x="40" y="140" width="240" height="15"
        fill={C.boron}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
};
