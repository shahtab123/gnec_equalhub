"use client";

import { motion } from "framer-motion";
import { GridBackground } from "@/components/ui/grid-background";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { Scale, Gamepad2, Brain } from "lucide-react";

const games = [
  {
    title: "Balance the Scales",
    description: "Make choices that promote gender equality and social inclusion by balancing virtual scales. Each decision impacts the balance - choose wisely!",
    icon: Scale,
    color: "red",
    link: "/play/mini-games/balance-scales",
    status: "ready" as const
  },
  {
    title: "Path to Parity",
    description: "Guide characters along a path from inequality to parity by making choices that remove obstacles. Learn about SDG 5 and 10 through engaging gameplay!",
    icon: Brain,
    color: "purple",
    link: "/play/mini-games/path-to-parity",
    status: "ready" as const
  },
  {
    title: "Inclusion Adventure",
    description: "Coming soon! Embark on an adventure where your choices shape an inclusive world.",
    icon: Gamepad2,
    color: "blue",
    link: "/play/mini-games/inclusion-adventure",
    status: "coming-soon" as const
  }
];

export default function MiniGamesPage() {
  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0">
        <GridBackground />
      </div>

      <Navbar />

      <div className="relative max-w-4xl mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Educational Mini-Games
            </h1>
            <p className="text-xl text-foreground/90">
              Learn about gender equality and social inclusion through interactive games
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <Link href={game.status === "ready" ? game.link : "#"}>
                  <div className={`relative bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-${game.color}-500/50 transition-all duration-300 h-full`}>
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`p-3 rounded-lg bg-${game.color}-500/20 border border-${game.color}-500/30`}>
                        <game.icon className={`w-8 h-8 text-${game.color}-400`} />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground">{game.title}</h3>
                      
                      <p className="text-foreground/70">{game.description}</p>
                      
                      {game.status === "coming-soon" && (
                        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-foreground/50">
                          Coming Soon
                        </span>
                      )}
                      
                      {game.status === "ready" && (
                        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400">
                          Play Now
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 