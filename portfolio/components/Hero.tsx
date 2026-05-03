'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HERO_CONTENT } from '@/lib/content';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-overlay" />
      <div className="heartbeat-line" />
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#10B981] rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ scale, opacity, y }}
        className="relative z-10 text-center px-8"
      >
        {/* Kinetic Name Text */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4"
        >
          {HERO_CONTENT.name.split(' ').map((word, i) => (
            <span key={i} className="inline-block mr-4">{word}</span>
          ))}
        </motion.h1>

        {/* Title Reveal */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="overflow-hidden"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-[#10B981] mb-6 monospace-data">
            {HERO_CONTENT.title}
          </h2>
        </motion.div>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          {HERO_CONTENT.summary}
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-8 h-12 border-2 border-[#10B981] rounded-full mx-auto flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-[#10B981] rounded-full"
            />
          </motion.div>
          <div className="text-xs monospace-data mt-4 text-gray-500">SCROLL TO EXPLORE</div>
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 monospace-data text-xs text-gray-400">
        SYS.PORTFOLIO.V1.0
      </div>
      <div className="absolute top-8 right-8 monospace-data text-xs text-gray-400">
        STATUS: ONLINE
      </div>
      <div className="absolute bottom-8 left-8 monospace-data text-xs text-gray-400">
        COORD: {Math.random().toFixed(4)}, {Math.random().toFixed(4)}
      </div>
      <div className="absolute bottom-8 right-8 monospace-data text-xs text-gray-400">
        BUILD: 2026.01
      </div>
    </div>
  );
}
