"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Three.js stays out of the initial bundle and never runs on the server.
const NeuralMesh = dynamic(() => import("./NeuralMesh"), { ssr: false });

/** Positions the hero's 3D field behind the content of its Night band. */
export function HeroField() {
  const ref = useRef<HTMLDivElement>(null);
  const [hero, setHero] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setHero(ref.current?.closest<HTMLElement>("[data-night-band]") ?? null);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 -z-10" aria-hidden="true">
      {hero && <NeuralMesh hero={hero} />}
    </div>
  );
}
