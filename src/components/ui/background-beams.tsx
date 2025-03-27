"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { createNoisePosition } from "@/lib/noise";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const noise = createNoisePosition();
    const beams = 10;
    const beamElements: HTMLDivElement[] = [];

    for (let i = 0; i < beams; i++) {
      const beam = document.createElement("div");
      beam.className = "absolute inset-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent";
      container.appendChild(beam);
      beamElements.push(beam);
    }

    const animate = () => {
      const rect = container.getBoundingClientRect();
      const { width, height } = rect;

      beamElements.forEach((beam, i) => {
        const x = noise(i, 0, width);
        const y = noise(i, 1, height);
        beam.style.transform = `translate(${x}px, ${y}px)`;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      beamElements.forEach((beam) => beam.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden [--line-color:theme(colors.purple.500/50)]",
        className
      )}
    />
  );
}; 