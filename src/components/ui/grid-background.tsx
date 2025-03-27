"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function GridBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute h-full w-full bg-black">
          <div className="absolute h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]" style={{ backgroundSize: '100px 100px' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <div className={`absolute h-full w-full ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div 
          className={`absolute h-full w-full ${
            theme === 'dark' 
              ? 'bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]' 
              : 'bg-[linear-gradient(to_right,#ff00002e_1px,transparent_1px),linear-gradient(to_bottom,#ff00002e_1px,transparent_1px)]'
          }`} 
          style={{ backgroundSize: '100px 100px' }} 
        />
      </div>
    </div>
  );
} 