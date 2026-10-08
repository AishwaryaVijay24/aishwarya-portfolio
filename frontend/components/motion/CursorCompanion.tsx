"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

type Mode = "idle" | "link" | "view";

const INTERACTIVE = "a, button, select, summary, [role='button'], .system .node";
const VIEW = "[data-cursor='view']";

// Geometry (px). The robot sits just below-right of the pointer and flips to the
// other side near the right/bottom edges, so it is always fully inside the viewport.
const BOT = 28;
const GAP = 8;
const EDGE = 4;
const RING = 40;
const LABEL_W = 84;

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), Math.max(min, max));

function robotPlacement(px: number, py: number, vw: number, vh: number) {
  let bx = px + GAP;
  if (bx + BOT > vw - EDGE) bx = px - GAP - BOT;
  let by = py + GAP + 4;
  if (by + BOT > vh - EDGE) by = py - GAP - BOT;
  return { bx: clamp(bx, EDGE, vw - BOT - EDGE), by: clamp(by, EDGE, vh - BOT - EDGE) };
}

/**
 * Cursor companion (DESIGN.md §8). The system cursor stays; this layer only follows it.
 * - A small robot trails the pointer with spring lag, leans into movement and looks where it goes.
 * - Over links and buttons a ring expands around the pointer and the robot smiles.
 * - Over project cards a "view" label appears.
 * Mouse only, pointer-events: none, aria-hidden. Hidden for touch and reduced motion.
 */
export function CursorCompanion() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [blink, setBlink] = useState(false);
  const [labelLeft, setLabelLeft] = useState(false);

  // Pointer position (raw), the clamped targets, and the springs that trail them.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ringTX = useMotionValue(0);
  const ringTY = useMotionValue(0);
  const botTX = useMotionValue(0);
  const botTY = useMotionValue(0);
  const visible = useMotionValue(0);
  const ringX = useSpring(ringTX, { stiffness: 520, damping: 38, mass: 0.4 });
  const ringY = useSpring(ringTY, { stiffness: 520, damping: 38, mass: 0.4 });
  const botX = useSpring(botTX, { stiffness: 170, damping: 22, mass: 0.7 });
  const botY = useSpring(botTY, { stiffness: 170, damping: 22, mass: 0.7 });
  const opacity = useSpring(visible, { stiffness: 300, damping: 30 });
  // Lean and look relative to where the robot is heading, not where it is.
  const lean = useTransform(() => clamp((botTX.get() - botX.get()) * 0.35, -14, 14));
  const eyeX = useTransform(() => clamp((x.get() - (botX.get() + BOT / 2)) * 0.05, -1.8, 1.8));
  const eyeY = useTransform(() => clamp((y.get() - (botY.get() + BOT / 2)) * 0.05, -1.8, 1.8));

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(fine.matches && !reduceMotion);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;
    let placed = false;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const vw = document.documentElement.clientWidth;
      const vh = window.innerHeight;
      x.set(e.clientX);
      y.set(e.clientY);
      ringTX.set(clamp(e.clientX, RING / 2, vw - RING / 2));
      ringTY.set(clamp(e.clientY, RING / 2, vh - RING / 2));
      const { bx, by } = robotPlacement(e.clientX, e.clientY, vw, vh);
      botTX.set(bx);
      botTY.set(by);
      setLabelLeft(bx + BOT + GAP + LABEL_W > vw - EDGE);
      if (!placed) {
        ringX.jump(ringTX.get());
        ringY.jump(ringTY.get());
        botX.jump(bx);
        botY.jump(by);
        placed = true;
      }
      visible.set(1);
      const target = e.target instanceof Element ? e.target : null;
      setMode(target?.closest(VIEW) ? "view" : target?.closest(INTERACTIVE) ? "link" : "idle");
    };
    const hide = () => visible.set(0);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

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
      document.documentElement.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
      clearTimeout(timer);
    };
  }, [enabled, x, y, ringTX, ringTY, botTX, botTY, ringX, ringY, botX, botY, visible]);

  if (!enabled) return null;

  const ringSize = mode === "link" ? 40 : 0;

  return (
    <div aria-hidden="true">
      {/* Each layer is a zero-size anchor that follows the pointer; children are offset from it. */}
      <motion.div className="cursor-anchor" style={{ x: ringX, y: ringY, opacity }}>
        <motion.div
          className="cursor-ring"
          animate={{ width: ringSize, height: ringSize }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        />
      </motion.div>
      <motion.div className="cursor-anchor" style={{ x: botX, y: botY, opacity }}>
        <motion.svg
          className="robot"
          viewBox="0 0 40 40"
          style={{ rotate: lean }}
          animate={{ scale: mode === "idle" ? 1 : 1.15 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          data-happy={mode !== "idle"}
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
        <AnimatePresence>
          {mode === "view" && (
            <motion.span
              className="cursor-label"
              data-side={labelLeft ? "left" : "right"}
              initial={{ opacity: 0, scale: 0.8, x: -6 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -6 }}
              transition={{ duration: 0.18 }}
            >
              View →
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
