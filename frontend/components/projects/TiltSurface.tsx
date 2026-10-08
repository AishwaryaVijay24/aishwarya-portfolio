"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

type Props = { className?: string; art: React.ReactNode; children: React.ReactNode };

/**
 * Layered depth for project cards (DESIGN.md §9): the surface tilts a few degrees
 * toward the pointer, the artwork moves further than the text. No blanket scaling.
 */
export function TiltSurface({ className = "", art, children }: Props) {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 180, damping: 22, mass: 0.6 };
  const x = useSpring(px, spring);
  const y = useSpring(py, spring);
  const rotateY = useTransform(x, (v) => v * 6);
  const rotateX = useTransform(y, (v) => v * -5);
  const artX = useTransform(x, (v) => v * 28);
  const artY = useTransform(y, (v) => v * 28);
  const textX = useTransform(x, (v) => v * -8);
  const textY = useTransform(y, (v) => v * -8);

  return (
    <div
      className="[perspective:900px]"
      onPointerMove={(e) => {
        if (reduceMotion || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div className={`tilt-surface ${className}`} style={reduceMotion ? undefined : { rotateX, rotateY }}>
        <motion.div className="absolute -inset-[6%]" style={reduceMotion ? undefined : { x: artX, y: artY }}>
          {art}
        </motion.div>
        <motion.div className="absolute inset-x-0 bottom-0" style={reduceMotion ? undefined : { x: textX, y: textY }}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
