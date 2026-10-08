"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Pulls its child slightly toward the pointer (DESIGN.md §9, magnetic CTA).
 * Mouse only; still for touch and reduced motion.
 */
export function Magnetic({ children, strength = 0.28, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  return (
    <motion.span
      className={`inline-flex ${className}`}
      style={reduceMotion ? undefined : { x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduceMotion || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
