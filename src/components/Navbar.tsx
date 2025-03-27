"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by rendering a simpler version initially
  if (!mounted) {
    return (
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl mx-auto bg-gradient-to-r from-white/[0.08] via-white/[0.12] to-white/[0.08] backdrop-blur-[12px] rounded-lg border-2 border-black shadow-[0_8px_32px_rgba(0,0,0,0.08)] px-3 py-1.5 z-50">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-block">
            <h1 className="text-xl font-bold">
              <div className="border border-black px-2 py-0.5 rounded-md">
                <span>Equal</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Hub</span>
              </div>
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm font-medium hover:text-red-500 transition-colors">
              About
            </Link>
            <Link href="/teams" className="text-sm font-medium hover:text-red-500 transition-colors">
              Teams
            </Link>
            <div className="p-1 rounded-md bg-white/5 border border-black transition-all duration-300">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl mx-auto bg-gradient-to-r from-white/[0.08] via-white/[0.12] to-white/[0.08] dark:from-black/[0.08] dark:via-black/[0.12] dark:to-black/[0.08] backdrop-blur-[12px] rounded-lg border-2 border-black dark:border-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] px-3 py-1.5 z-50">
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-block">
          <h1 className="text-xl font-bold">
            <div className="border border-black dark:border-white px-2 py-0.5 rounded-md">
              <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Equal</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Hub</span>
            </div>
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            href="/about" 
            className={`text-sm font-medium ${
              theme === 'dark' ? 'text-white hover:text-red-400' : 'text-black hover:text-red-500'
            } transition-colors`}
          >
            About
          </Link>
          <Link 
            href="/teams" 
            className={`text-sm font-medium ${
              theme === 'dark' ? 'text-white hover:text-red-400' : 'text-black hover:text-red-500'
            } transition-colors`}
          >
            Teams
          </Link>
          <div className="p-1 rounded-md bg-white/5 dark:bg-black/5 border border-black dark:border-white hover:border-black dark:hover:border-white transition-all duration-300">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
} 