"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export const SparklesCore = ({
  background,
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  className,
  particleColor,
  id,
}: {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createParticle = () => {
      const size = Math.random() * (maxSize - minSize) + minSize;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speedX = (Math.random() - 0.5) * 0.5;
      const speedY = (Math.random() - 0.5) * 0.5;
      const opacity = Math.random() * 0.5 + 0.5;

      return {
        x,
        y,
        size,
        speedX,
        speedY,
        opacity,
      };
    };

    const initParticles = () => {
      particles.current = Array.from(
        { length: particleDensity },
        createParticle
      );
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor || "#FFFFFF"}${Math.floor(particle.opacity * 255).toString(16).padStart(2, "0")}`;
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [maxSize, minSize, particleColor, particleDensity]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn("absolute inset-0 -z-10", className)}
      style={{
        background: background || "transparent",
        pointerEvents: "none",
      }}
    />
  );
}; 