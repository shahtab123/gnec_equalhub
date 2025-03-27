"use client";

import { PlayMode } from "@/components/PlayMode";

export default function PlayPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Play Mode
        </h1>
        <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
          Choose from our selection of interactive games and challenges designed to make learning about gender equality and social inclusion engaging and fun.
        </p>
      </div>

      <PlayMode />
    </div>
  );
} 