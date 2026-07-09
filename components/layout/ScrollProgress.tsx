"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-white/[0.06]">
      <motion.div
        className="h-full w-full origin-left"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, #38bdf8, #3b8cff 40%, #7c3aed 80%, #f472b6)",
          boxShadow: "0 0 10px rgba(59,140,255,0.5)",
        }}
      />
    </div>
  );
}
