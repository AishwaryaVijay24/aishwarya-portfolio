"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

const INTERACTIVE = "a, button, select, input, textarea, [role='button'], .project-card, .system .node";

/**
 * The robot companion (DESIGN.md §8). Mouse only, decorative, never replaces the cursor.
 * Hidden for touch input and reduced motion.
 */
export function RobotCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [happy, setHappy] = useState(false);
  const [blink, setBlink] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });
  // Lean into horizontal travel; eyes look along the direction of travel.
  const lag = useTransform(() => x.get() - sx.get());
  const rotate = useTransform(lag, (v) => Math.max(-14, Math.min(14, v * 0.5)));
  const eyeX = useTransform(() => clampEye(x.get() - sx.get()));
  const eyeY = useTransform(() => clampEye(y.get() - sy.get()));
  const placed = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(fine.matches && !reduceMotion);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX + 14);
      y.set(e.clientY + 16);
      if (!placed.current) {
        sx.jump(e.clientX + 14);
        sy.jump(e.clientY + 16);
        placed.current = true;
      }
      setVisible(true);
      setHappy(e.target instanceof Element && Boolean(e.target.closest(INTERACTIVE)));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    let timer: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      timer = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        scheduleBlink();
      }, 2600 + Math.random() * 3200);
    };
    scheduleBlink();

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      clearTimeout(timer);
    };
  }, [enabled, x, y, sx, sy]);

  if (!enabled) return null;

  return (
    <motion.svg
      className="robot"
      viewBox="0 0 40 40"
      aria-hidden="true"
      style={{ x: sx, y: sy, rotate, opacity: visible ? 1 : 0 }}
      data-happy={happy}
      data-blink={blink}
    >
      <line x1="20" y1="4" x2="20" y2="10" className="antenna" />
      <circle cx="20" cy="4" r="2.6" className="tip" />
      <rect x="2.5" y="18" width="4" height="7" rx="2" className="ear" />
      <rect x="33.5" y="18" width="4" height="7" rx="2" className="ear" />
      <rect x="6" y="10" width="28" height="23" rx="8" className="head" />
      <rect x="10" y="15" width="20" height="13" rx="5" className="face" />
      <motion.g style={{ x: eyeX, y: eyeY }}>
        <g className="eyes">
          <circle cx="16" cy="21.5" r="2.2" className="eye" />
          <circle cx="24" cy="21.5" r="2.2" className="eye" />
          <path d="M13.8 22.6 q2.2 -3 4.4 0 M21.8 22.6 q2.2 -3 4.4 0" className="smile" />
        </g>
      </motion.g>
    </motion.svg>
  );
}

function clampEye(delta: number) {
  return Math.max(-1.8, Math.min(1.8, delta * 0.08));
}
