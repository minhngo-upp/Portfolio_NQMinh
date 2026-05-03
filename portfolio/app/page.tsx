'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import ExperienceScroll from '@/components/ExperienceScroll';
import CatalystSection from '@/components/CatalystSection';
import SyncPipeline from '@/components/SyncPipeline';
import BlueprintNavigator from '@/components/BlueprintNavigator';
import ModuleFolders from '@/components/ModuleFolders';
import { SRS_CONTENT } from '@/lib/content';

export default function Home() {
  return (
    <main className="relative">
      {/* Phase I: The Landing */}
      <Hero />
      <ExperienceScroll />
      
      {/* Phase II: The Project World (The Meal Clinic) */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-8 mb-16 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">THE MEAL CLINIC</h2>
            <p className="text-gray-600 monospace-data">Digital Cell Visualization</p>
          </motion.div>
        </div>
      </section>
      
      <CatalystSection />
      
      {/* Section B: The Engine */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Section B: The Engine</h2>
          <p className="text-gray-600 monospace-data">Data Sync Pipeline Architecture</p>
        </div>
        {SRS_CONTENT.flows.map((flow) => (
          <SyncPipeline key={flow.id} flowName={flow.name} steps={flow.steps} />
        ))}
      </section>
      
      {/* Section C: The Blueprint */}
      <BlueprintNavigator />
      
      {/* Section D: The Modules */}
      <ModuleFolders />
      
      {/* Footer */}
      <footer className="py-12 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="monospace-data text-sm mb-4">
            NGÔ QUANG MINH — PRODUCT OWNER
          </div>
          <div className="text-gray-500 text-xs">
            Building AI-powered digital products end-to-end
          </div>
          <div className="mt-8 monospace-data text-xs text-gray-600">
            SYS.PORTFOLIO.V1.0 © 2026
          </div>
        </div>
      </footer>
    </main>
  );
}
