'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EXPERIENCE_CARDS, SKILLS_GRID } from '@/lib/content';

export default function ExperienceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -1000]);

  return (
    <div ref={containerRef} className="relative py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <h2 className="text-3xl font-bold mb-4">Experience: The Impact</h2>
        <p className="text-gray-600 monospace-data">Horizontal Scroll Gallery</p>
      </div>

      {/* Horizontal Scrolling Cards */}
      <motion.div style={{ x }} className="flex gap-8 px-8">
        {EXPERIENCE_CARDS.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="interactive flex-shrink-0 w-[400px] p-8 rounded-lg border-2 bg-[#FAFAFA] hover:border-[#10B981] transition-colors"
            style={{ borderColor: card.color }}
          >
            <div className="mb-4">
              <div className="text-xs monospace-data text-gray-500 mb-2">PROJECT 0{card.id}</div>
              <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
              <div className="text-4xl font-black text-[#10B981] mb-4">{card.metric}</div>
              <p className="text-gray-600">{card.description}</p>
            </div>
            
            {/* Visual Element */}
            <div className="h-32 rounded bg-gradient-to-br from-[#E5E7EB] to-white flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 rounded-full"
                style={{ backgroundColor: card.color }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Skills Grid Section */}
      <div className="max-w-7xl mx-auto px-8 mt-32">
        <h2 className="text-3xl font-bold mb-4">Skills Matrix</h2>
        <p className="text-gray-600 monospace-data mb-12">Core Competencies</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS_GRID.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="p-6 rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] interactive hover:border-[#10B981] transition-colors"
            >
              <h3 className="font-bold mb-4 text-[#10B981]">{skillGroup.category}</h3>
              <ul className="space-y-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: groupIndex * 0.1 + skillIndex * 0.05 }}
                    className="text-sm text-gray-700 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
