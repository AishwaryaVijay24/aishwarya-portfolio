"use client";

import { useEffect, useRef } from "react";

type Props = {
  as?: "div" | "li" | "h1" | "h2" | "h3" | "p" | "section" | "article" | "figure";
  /** Direction the element enters from. Omit for children that animate themselves (masks, words). */
  from?: "up" | "left" | "right" | "scale" | "tilt";
  className?: string;
  /** Delay in ms, exposed to CSS as --delay (used for staggered list rules). */
  delay?: number;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;

/**
 * Marks an element to animate in once when it scrolls into view.
 * Only elements that start below the fold are hidden first, so server-rendered
 * content is always visible without JavaScript and in the first frame.
 */
export function Reveal({ as: Tag = "div", from, className, delay, children, style, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.dataset.pre = "true";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.pre = "false";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      data-reveal={from}
      style={delay ? ({ ...style, "--delay": `${delay}ms` } as React.CSSProperties) : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
