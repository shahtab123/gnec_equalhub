"use client";

import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  className,
  color = "red",
}: {
  children?: React.ReactNode;
  className?: string;
  color?: "red" | "blue" | "green" | "purple" | "yellow";
}) => {
  const borderColors = {
    red: "border-red-500/20",
    blue: "border-blue-500/20",
    green: "border-green-500/20",
    purple: "border-purple-500/20",
    yellow: "border-yellow-500/20",
  };

  const backgroundColors = {
    red: "bg-gradient-to-b from-red-500/20 to-orange-500/20",
    blue: "bg-gradient-to-b from-blue-500/20 to-purple-500/20",
    green: "bg-gradient-to-b from-green-500/20 to-emerald-500/20",
    purple: "bg-gradient-to-b from-purple-500/20 to-indigo-500/20",
    yellow: "bg-gradient-to-b from-yellow-500/20 to-orange-500/20",
  };

  return (
    <div
      className={cn(
        "relative rounded-xl border p-8 backdrop-blur-sm dark:bg-black/40 bg-white/40",
        borderColors[color],
        backgroundColors[color],
        className
      )}
    >
      {children}
    </div>
  );
}; 