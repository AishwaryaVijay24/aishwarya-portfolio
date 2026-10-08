"use client";

import { useEffect, useRef, useState } from "react";

type Line = { prompt?: boolean; text: string };

/**
 * Terminal that types its lines once when it scrolls into view.
 * The full text is available to assistive technology immediately via aria-label.
 */
export function TypingTerminal({ lines, label }: { lines: Line[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const total = lines.reduce((n, l) => n + l.text.length, 0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setShown(total));
      return () => cancelAnimationFrame(id);
    }
    let timer: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      timer = setInterval(() => setShown((n) => (n >= total ? n : n + 1)), 28);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [total]);

  // How much of each line is typed so far.
  const starts = lines.map((_, i) => lines.slice(0, i).reduce((n, l) => n + l.text.length, 0));
  const visible = lines.map((line, i) => line.text.slice(0, Math.max(0, shown - starts[i])));

  return (
    <div ref={ref} className="on-night overflow-hidden rounded-[10px] bg-night font-mono text-[13px] leading-[1.75] text-on-night" role="img" aria-label={label}>
      <div className="flex gap-1.5 border-b border-on-night/10 px-3.5 py-3" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <i key={i} className="size-[9px] rounded-full bg-on-night/30" />
        ))}
      </div>
      <pre className="min-h-[150px] px-[18px] pt-4 pb-5 whitespace-pre-wrap" aria-hidden="true">
        {lines.map((line, i) =>
          i > 0 && !visible[i] ? null : (
            <span key={i} className="block">
              {line.prompt ? (
                <>
                  <span className="text-lilac">~</span> {visible[i]}
                </>
              ) : (
                <span className="text-night-muted">{visible[i]}</span>
              )}
            </span>
          ),
        )}
        <span className="block">
          <span className="text-lilac">~</span> <span className="cursor-block" />
        </span>
      </pre>
    </div>
  );
}
