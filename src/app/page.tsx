"use client";

import { GridBackground } from "@/components/ui/grid-background";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const modes = [
    {
      title: "Quest Mode",
      description: "Test your knowledge of SDG 5 (Gender Equality) and SDG 10 (Reduced Inequalities) through an engaging five-part challenge. Features multiple-choice questions, true/false scenarios, match-the-fact exercises, personal pledges, and micro-advocacy tasks.",
      link: "/quest",
      features: [
        "Interactive knowledge assessment",
        "Match-the-fact challenges",
        "Personal action pledges",
        "Micro-advocacy tasks",
        "Downloadable results"
      ]
    },
    {
      title: "Play Mode",
      description: "Dive into interactive mini-games and ice-breaking activities designed to make learning about equality and inclusion engaging. Features Path to Parity, Balance Scales, and team-building exercises.",
      link: "/play",
      features: [
        "Educational mini-games",
        "Interactive team activities",
        "Ice-breaking exercises",
        "Group learning sessions",
        "Engaging gameplay mechanics"
      ]
    },
    {
      title: "Skill Mode",
      description: "Connect with mentors and peers to share and learn skills related to equality and inclusion. Access structured courses, video lessons, and free educational resources from various platforms aligned with SDG 5 and 10.",
      link: "/skill",
      features: [
        "Skill exchange platform",
        "Video & document lessons",
        "Interactive quizzes",
        "Free learning resources",
        "Expert-led courses"
      ]
    },
    {
      title: "Impact Mode",
      description: "Assess and improve your organization's inclusivity with our comprehensive assessment tool. Get detailed analytics on gender balance, leadership diversity, and inclusion metrics aligned with SDG 5 and 10.",
      link: "/impact",
      features: [
        "Inclusivity assessment",
        "Detailed analytics",
        "Custom recommendations",
        "Community projects",
        "Volunteer opportunities"
      ]
    }
  ];

  return (
    <main className="relative min-h-screen">
      {/* Grid Background */}
      <div className="fixed inset-0">
        <GridBackground />
      </div>
      
      <Navbar />

      {/* All content */}
      <div ref={ref} className="relative">
        {/* Hero Section */}
        <section className="relative h-[85vh]">
          {/* Background Glow Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-red-500/30 rounded-full blur-3xl opacity-50 animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-[30rem] h-[30rem] bg-orange-500/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
          </div>

          {/* Main Content */}
          <div className="relative pt-12 px-4 h-full">
            <div className="max-w-7xl mx-auto h-full">
              {/* Title Section */}
              <div className="flex flex-col items-center justify-center h-full relative">
                <motion.div style={{ y, opacity }}>
                  <div className="relative -mt-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-3xl" />
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-center relative">
                      <span className="text-foreground">Equal</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Hub</span>
                    </h1>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="mt-4 text-2xl md:text-3xl font-semibold text-center"
                >
                  <span className="text-foreground">
                    A Unified Platform for Equality and Inclusion
                  </span>
                </motion.div>

                {/* Description with Animated Background */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="mt-4 max-w-4xl mx-auto relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/40 dark:border-white/10">
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                      EqualHub is an interactive platform offering four powerful modes for promoting equality and inclusion. Through gamified learning, trivia competitions, skill sharing, and impact tracking, we align with{" "}
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="font-bold text-red-500 inline-block px-1"
                      >
                        SDG 5
                      </motion.span>
                      {" and "}
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="font-bold text-red-500 inline-block px-1"
                      >
                        SDG 10
                      </motion.span>
                      {" "}to create lasting change.
                    </p>
                  </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute bottom-28 left-1/2 -translate-x-1/2"
                >
                  <div className="w-1 h-10 bg-red-500 dark:bg-white rounded-full"></div>
                </motion.div>
              </div>
            </div>
        </div>
        </section>

        {/* Modes Section */}
        <section className="relative py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {modes.map((mode, idx) => (
                <motion.div
                  key={mode.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative"
                >
                  {/* Card Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  <div className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 hover:border-red-500/50 transition-all duration-300">
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      {mode.title === "Quest Mode" ? (
                        <img 
                          src="https://unsplash.com/photos/BrcwCWqIWpo/download?force=true"
                          alt="Quest Mode"
                          className="w-full h-full object-cover object-[center_75%]"
                        />
                      ) : mode.title === "Play Mode" ? (
                        <img 
                          src="https://unsplash.com/photos/zA66MV4EyXc/download?force=true"
                          alt="Play Mode"
                          className="w-full h-full object-cover object-[center_35%]"
                        />
                      ) : mode.title === "Skill Mode" ? (
                        <img 
                          src="https://unsplash.com/photos/2qgTDqwZQFg/download?force=true"
                          alt="Skill Mode"
                          className="w-full h-full object-cover object-[center_35%]"
                        />
                      ) : mode.title === "Impact Mode" ? (
                        <img 
                          src="https://unsplash.com/photos/9yuMtjAMMrI/download?force=true"
                          alt="Impact Mode"
                          className="w-full h-full object-cover object-[center_75%]"
                        />
                      ) : (
                        /* Dynamic gradient background */
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/40 via-orange-500/40 to-pink-500/40 animate-gradient-slow" />
                      )}
                      
                      {/* Glassmorphism overlay */}
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] backdrop-saturate-150" />
                      
                      {/* Title overlay with glass effect */}
                      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 pt-4 pb-4 px-4">
                        <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] relative">
                          <span className="relative z-10">{mode.title}</span>
                        </h3>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 bg-gradient-to-b from-black/40 to-black/20">
                      <p className="text-gray-200 mb-6 line-clamp-3">{mode.description}</p>
                      
                      {/* Features with enhanced styling */}
                      <ul className="space-y-3">
                        {mode.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 group/item">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-red-400 to-orange-400 group-hover/item:scale-150 transition-transform duration-300" />
                            <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Action button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 w-full py-3 px-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 border border-white/10 rounded-xl text-white font-semibold transition-all duration-300 hover:border-red-500/50"
                      >
                        <Link href={mode.link} className="block w-full">
                          Explore {mode.title}
                        </Link>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <p className="text-foreground/70 text-center relative">
                  Created by{" "}
                  <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
                    Shahtab Mohtasin
                  </span>
                </p>
              </motion.div>
            </div>
          </div>
      </footer>
    </div>
    </main>
  );
}
