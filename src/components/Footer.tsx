"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
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
              {" and "}
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
                Prionti Maliha
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
} 