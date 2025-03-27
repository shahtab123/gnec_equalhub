"use client";

import { motion } from "framer-motion";

interface ScaleProps {
  value: number; // 0-10, where 5 is balanced
  size?: "sm" | "md" | "lg";
}

export function Scale({ value, size = "md" }: ScaleProps) {
  // Calculate the rotation based on the value
  // Value 5 = 0 degrees (balanced)
  // Value 0 = -30 degrees (max tilt left)
  // Value 10 = 30 degrees (max tilt right)
  const rotation = ((value - 5) / 5) * 30;
  
  // Calculate vertical offset for pans based on rotation
  const leftPanOffset = Math.sin((rotation * Math.PI) / 180) * 40;  // Convert to radians and multiply by distance

  // Size classes
  const sizeClasses = {
    sm: {
      container: "w-32 h-32",
      beam: "w-2 h-1",
      pan: "w-12 h-12",
      chain: "h-8",
      stand: "<h-2></h-2>9 w-2",
      base: "w-20 h-2"
    },
    md: {
      container: "w-48 h-48",
      beam: "w-48 h-1.5",
      pan: "w-16 h-16",
      chain: "h-12",
      stand: "h-40 w-2.5",
      base: "w-8 h-2.5"
    },
    lg: {
      container: "w-64 h-64",
      beam: "w-64 h-2",
      pan: "w-20 h-20",
      chain: "h-16",
      stand: "h-44 w-3",
      base: "w-36 h-4"
    }
  };

  return (
    <div className={`relative ${sizeClasses[size].container}`}>
      {/* Base */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        {/* Stand */}
        <div className={`${sizeClasses[size].stand} bg-gradient-to-b from-red-500/50 to-orange-500/50 rounded-full`} />
        {/* Base platform */}
        <div className={`${sizeClasses[size].base} bg-gradient-to-r from-red-500/50 via-orange-500/50 to-red-500/50 rounded-full`} />
      </motion.div>

      {/* Pivot point and beam */}
      <div className="absolute top-[5%] left-1/2 transform -translate-x-1/2">
        {/* Pivot circle */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-br from-red-500/50 to-orange-500/50 rounded-full border border-white/20 transform -translate-x-1/2 -translate-y-1/2 z-10" 
        />
        
        {/* Balance Beam */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: rotation }}
          transition={{ 
            duration: 0.5, 
            delay: 0.2,
            rotate: {
              type: "spring",
              stiffness: 100,
              damping: 10
            }
          }}
          className={`${sizeClasses[size].beam} bg-gradient-to-r from-red-500/50 via-orange-500/50 to-red-500/50 rounded-full relative`}
          style={{
            transformOrigin: "center"
          }}
        >
          {/* Left Pan */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute -left-0.1 top-9 origin-top"
            style={{
              rotate: -rotation // Keep pan level while beam rotates
            }}
          >
            {/* Chain */}
            <div className={`${sizeClasses[size].chain} w-px bg-gradient-to-b from-red-500/50 to-transparent`} />
            {/* Pan */}
            <div className={`${sizeClasses[size].pan} -translate-x-1/2 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-full border border-white/20 backdrop-blur-sm`} />
          </motion.div>

          {/* Right Pan */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute right-0 top-9 origin-top"
            style={{
              rotate: -rotation // Keep pan level while beam rotates
            }}
          >
            {/* Chain */}
            <div className={`${sizeClasses[size].chain} w-px bg-gradient-to-b from-red-500/50 to-transparent translate-x-19 translate-y-0.1`} />
            {/* Pan */}
            <div className={`${sizeClasses[size].pan} translate-x-1/2 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-full border border-white/20 backdrop-blur-sm`} />
          </motion.div>
        </motion.div>
      </div>

      {/* Balance Indicator */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full text-center"
      >
        <div className="flex items-center justify-center gap-1">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 h-3 rounded-full transition-colors duration-300 ${
                i === value
                  ? "bg-red-500"
                  : i === 5
                  ? "bg-green-500/50"
                  : "bg-white/20"
              }`}
            />
          ))}
        </div>
        <div className="mt-2 text-sm text-foreground/50">
          {value < 5 ? "⬅️ Unbalanced" : value > 5 ? "Unbalanced ➡️" : "Balanced ✨"}
        </div>
      </motion.div>
    </div>
  );
} 