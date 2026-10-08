"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";

import { MeshSystem } from "./meshSystem";

/**
 * React layer for the hero's neural mesh (DESIGN.md §8). The simulation lives in
 * MeshSystem; this file wires it to the canvas, pointer, scroll, theme and visibility.
 * Decorative only: pauses off screen or in a hidden tab, one still frame with reduced motion.
 */

const cssVar = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

function Scene({ hero, still }: { hero: HTMLElement; still: boolean }) {
  const { scene, camera, gl, viewport, size, invalidate } = useThree();
  const systemRef = useRef<MeshSystem | null>(null);
  const pointerRef = useRef({ tx: 0, ty: 0, tk: 0, x: 0, y: 0, k: 0 });
  const small = size.width < 700;
  const { width, height } = viewport;

  // Create the system once and attach it to the scene.
  useEffect(() => {
    const system = new MeshSystem();
    systemRef.current = system;
    scene.add(system.group);
    return () => {
      scene.remove(system.group);
      system.dispose();
      systemRef.current = null;
    };
  }, [scene]);

  // Rebuild the network when the viewport changes size.
  useEffect(() => {
    systemRef.current?.build(width, height, small);
    invalidate();
  }, [width, height, small, invalidate]);

  // Pointer, quiet zone around the message, theme colours.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      const inside = e.clientY >= r.top && e.clientY <= r.bottom;
      pointerRef.current.tk = inside ? 1 : 0;
      if (!inside) return;
      pointerRef.current.tx = (e.clientX - r.left) / r.width - 0.5;
      pointerRef.current.ty = 0.5 - (e.clientY - r.top) / r.height;
    };
    const onLeave = () => {
      pointerRef.current.tk = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);

    const measureQuiet = () => {
      const msg = hero.querySelector("[data-hero-message]");
      if (!msg) return;
      const m = msg.getBoundingClientRect();
      const h = hero.getBoundingClientRect();
      const pad = 24;
      const nx = (px: number) => ((px - h.left) / h.width) * 2 - 1;
      const ny = (py: number) => 1 - ((py - h.top) / h.height) * 2;
      systemRef.current?.setQuietZone(nx(m.left - pad), ny(m.bottom + pad), nx(m.right + pad), ny(m.top - pad));
      invalidate();
    };
    const resizeObserver = new ResizeObserver(measureQuiet);
    resizeObserver.observe(hero);
    measureQuiet();

    const recolor = () => {
      systemRef.current?.setColors(cssVar("--lilac", "#b9a6f5"), cssVar("--peri", "#7e95ff"));
      invalidate();
    };
    const themeObserver = new MutationObserver(recolor);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", recolor);
    recolor();

    return () => {
      window.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      scheme.removeEventListener("change", recolor);
    };
  }, [hero, invalidate]);

  useFrame((_, rawDelta) => {
    const system = systemRef.current;
    if (!system) return;
    const dt = still ? 0 : Math.min(rawDelta, 0.05);
    const p = pointerRef.current;
    const follow = 1 - Math.exp(-dt * 3);
    const fade = 1 - Math.exp(-dt * 2.5);
    pointerRef.current.x = p.x + (p.tx - p.x) * follow;
    pointerRef.current.y = p.y + (p.ty - p.y) * follow;
    pointerRef.current.k = p.k + (p.tk - p.k) * fade;

    const scroll = still ? 0 : Math.min(Math.max(window.scrollY / (hero.offsetHeight * 0.8), 0), 1);
    const { x, y, k } = pointerRef.current;
    system.update({ dt, pointer: { x, y, k }, scroll, pixelRatio: gl.getPixelRatio() });
    camera.position.set(x * 0.8, y * 0.5, 10 + scroll * 5);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function NeuralMesh({ hero }: { hero: HTMLElement }) {
  const [still, setStill] = useState(false);
  const [active, setActive] = useState(true);
  const [maxDpr, setMaxDpr] = useState(1.5);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = true;
    const sync = () => {
      setStill(reduce.matches);
      setActive(onScreen && !document.hidden && !reduce.matches);
    };
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(hero);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
    };
  }, [hero]);

  return (
    <Canvas
      camera={{ fov: 35, position: [0, 0, 10], near: 0.1, far: 100 }}
      dpr={[1, maxDpr]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={active ? "always" : "demand"}
      style={{ pointerEvents: "none" }}
    >
      <PerformanceMonitor onDecline={() => setMaxDpr(1)} />
      <Scene hero={hero} still={still} />
    </Canvas>
  );
}
