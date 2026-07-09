"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function MagneticButton({
  children,
  onClick,
  className,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.28, y: y * 0.28 });
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
      className={cn(
        "group relative inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors",
        variant === "primary"
          ? "text-white"
          : "text-white/80 hover:text-white glass",
        className,
      )}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-electric-500 to-plasma-500 opacity-100 transition-opacity group-hover:opacity-90" />
      )}
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-electric-400 to-plasma-400 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-70" />
      )}
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </motion.button>
  );
}
