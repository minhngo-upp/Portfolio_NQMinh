'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PRD_CONTENT } from '@/lib/content';

export default function CatalystSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScanned, setIsScanned] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const blurAmount = useTransform(scrollYProgress, [0, 0.5], [10, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

  return (
    <div ref={containerRef} className="relative py-20 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">Section A: The Catalyst</h2>
          <p className="text-gray-600 monospace-data text-center mb-12">Problem Discovery & Expected Outcomes</p>
        </motion.div>

        {/* Blurry Collage with Scanner */}
        <motion.div
          style={{ filter: `blur(${blurAmount}px)`, opacity }}
          className="relative p-8 rounded-lg border border-[#E5E7EB] bg-white mb-12"
          onMouseEnter={() => setIsScanned(true)}
          onMouseLeave={() => setIsScanned(false)}
        >
          {/* Scanner Line */}
          <div className={`scanner-line ${isScanned ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
          
          {/* Problem Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              Problem Statement
            </h3>
            <div className="p-6 bg-red-50 rounded-lg border border-red-200">
              <p className="text-lg text-gray-800 italic">"{PRD_CONTENT.problemStatement}"</p>
            </div>
          </motion.div>

          {/* Target Users */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-xl font-bold mb-4">Target Users</h3>
            <div className="flex flex-wrap gap-3">
              {PRD_CONTENT.targetUsers.map((user, index) => (
                <motion.span
                  key={user}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="px-4 py-2 bg-[#E5E7EB] rounded-full text-sm monospace-data"
                >
                  {user}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Expected Outcomes - Counting Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-8 text-center">Expected Outcomes (G1–G4)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRD_CONTENT.expectedOutcomes.map((outcome, index) => (
              <CounterCard key={outcome.id} outcome={outcome} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Separate component for counting animation
function CounterCard({ outcome, index }: { outcome: typeof PRD_CONTENT.expectedOutcomes[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-lg border-2 border-[#10B981] bg-white text-center interactive hover:bg-[#10B981]/5 transition-colors"
    >
      <div className="text-xs monospace-data text-[#10B981] mb-2">{outcome.id}</div>
      <div className="text-3xl font-black text-[#10B981] mb-2">
        {outcome.value}
        <span className="text-lg ml-1">{outcome.unit}</span>
      </div>
      <div className="text-sm text-gray-600">{outcome.label}</div>
    </motion.div>
  );
}
