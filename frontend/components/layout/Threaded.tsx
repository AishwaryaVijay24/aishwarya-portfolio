"use client";

import { useEffect, useRef } from "react";

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * The page thread (DESIGN.md §9): one line runs down a left rail and draws itself
 * as the visitor scrolls. Every element marked `data-knot` lands on it.
 * Also hosts the graph-paper surface and its cursor glow (DESIGN.md §7).
 */
export function Threaded({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<SVGPathElement>(null);
  const drawRef = useRef<SVGPathElement>(null);
  const knotsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const base = baseRef.current!;
    const draw = drawRef.current!;
    const knotsG = knotsRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let samples: [number, number][] = [];
    let total = 0;
    let knots: { circle: SVGCircleElement; y: number; el: Element }[] = [];
    let frame = 0;

    const layout = () => {
      const railX = Math.max(18, Math.min(window.innerWidth * 0.05, 64));
      const rootRect = root.getBoundingClientRect();
      const knotEls = [...root.querySelectorAll("[data-knot]")];
      const points: [number, number][] = [[railX, 0]];
      knotEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        points.push([railX, r.top - rootRect.top + r.height / 2]);
      });
      points.push([railX, root.offsetHeight]);

      const sway = Math.min(28, window.innerWidth * 0.03);
      let d = `M ${points[0][0]} ${points[0][1]}`;
      for (let i = 1; i < points.length; i++) {
        const [x0, y0] = points[i - 1];
        const [x1, y1] = points[i];
        const dy = y1 - y0;
        const s = (i % 2 ? 1 : -1) * sway;
        d += ` C ${x0 + s} ${y0 + dy * 0.35}, ${x1 + s} ${y1 - dy * 0.35}, ${x1} ${y1}`;
      }
      base.setAttribute("d", d);
      draw.setAttribute("d", d);
      total = draw.getTotalLength();
      draw.style.strokeDasharray = String(total);
      samples = [];
      for (let i = 0; i <= 240; i++) {
        const l = (total * i) / 240;
        samples.push([l, draw.getPointAtLength(l).y]);
      }

      knotsG.replaceChildren();
      knots = points.slice(1, -1).map(([x, y], i) => {
        const circle = document.createElementNS(SVG_NS, "circle");
        circle.setAttribute("cx", String(x));
        circle.setAttribute("cy", String(y));
        circle.setAttribute("r", "4.5");
        circle.setAttribute("class", "knot");
        knotsG.appendChild(circle);
        return { circle, y, el: knotEls[i] };
      });
      progress();
    };

    const progress = () => {
      frame = 0;
      if (!total) return;
      const top = root.getBoundingClientRect().top;
      const yLine = reduce.matches ? Infinity : window.innerHeight * 0.62 - top;
      let len = total;
      if (yLine < samples[samples.length - 1][1]) {
        len = 0;
        for (let i = 1; i < samples.length; i++) {
          if (samples[i][1] >= yLine) {
            const [l0, y0] = samples[i - 1];
            const [l1, y1] = samples[i];
            len = l0 + (l1 - l0) * ((yLine - y0) / Math.max(y1 - y0, 0.001));
            break;
          }
        }
      }
      draw.style.strokeDashoffset = String(Math.max(total - Math.max(len, 0), 0));
      knots.forEach((k) => {
        const lit = String(k.y <= yLine);
        k.circle.setAttribute("data-lit", lit);
        k.el.setAttribute("data-lit", lit);
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(progress);
    };

    // Content streams in and fonts load, so re-measure whenever the size changes.
    const resizeObserver = new ResizeObserver(() => layout());
    resizeObserver.observe(root);
    window.addEventListener("scroll", onScroll, { passive: true });
    reduce.addEventListener("change", layout);
    layout();

    // Graph-paper glow around the mouse
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduce.matches) return;
      const r = root.getBoundingClientRect();
      root.style.setProperty("--mx", `${e.clientX - r.left}px`);
      root.style.setProperty("--my", `${e.clientY - r.top}px`);
      root.dataset.glow = "true";
    };
    const onPointerLeave = () => {
      root.dataset.glow = "false";
    };
    root.addEventListener("pointermove", onPointer, { passive: true });
    root.addEventListener("pointerleave", onPointerLeave);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      reduce.removeEventListener("change", layout);
      root.removeEventListener("pointermove", onPointer);
      root.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className={`threaded ${className}`}>
      <div className="grid-glow" aria-hidden="true" />
      <svg className="thread-svg" aria-hidden="true">
        <path ref={baseRef} className="base" />
        <path ref={drawRef} className="draw" />
        <g ref={knotsRef} />
      </svg>
      {children}
    </div>
  );
}
