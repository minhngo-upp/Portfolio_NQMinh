'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface SyncPipelineProps {
  flowName: string;
  steps: string[];
}

export default function SyncPipeline({ flowName, steps }: SyncPipelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const packetRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<SVGSVGElement>(null);
  const dashboardRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!packetRef.current || !phoneRef.current || !dashboardRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        pin: false
      }
    });

    // Animate data packet from phone to dashboard
    tl.fromTo(packetRef.current,
      { x: 0, opacity: 1 },
      { x: 300, opacity: 1, duration: 2, ease: "power2.inOut" }
    );

    // Pulse animation on phone
    gsap.to(phoneRef.current, {
      scale: 1.05,
      duration: 0.3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Pulse animation on dashboard
    gsap.to(dashboardRef.current, {
      scale: 1.02,
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.2
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full py-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-8">
        <h3 className="text-2xl font-bold mb-8 text-center">Sync Pipeline: {flowName}</h3>
        
        <div className="relative h-64 bg-white rounded-lg border border-[#E5E7EB] p-8">
          {/* Background Grid */}
          <div className="absolute inset-0 grid-overlay opacity-20" />
          
          {/* SVG Pipeline */}
          <svg className="w-full h-full" viewBox="0 0 600 200">
            {/* Connection Line */}
            <line
              x1="150"
              y1="100"
              x2="450"
              y2="100"
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="opacity-50"
            />
            
            {/* Phone Icon */}
            <g ref={phoneRef} className="interactive">
              <rect x="100" y="60" width="100" height="80" rx="10" fill="#FAFAFA" stroke="#10B981" strokeWidth="2"/>
              <circle cx="150" cy="120" r="8" fill="#10B981"/>
              <text x="150" y="150" textAnchor="middle" fontSize="12" fill="#1a1a1a" className="monospace-data">Mobile App</text>
            </g>
            
            {/* Dashboard Icon */}
            <g ref={dashboardRef} className="interactive">
              <rect x="400" y="50" width="120" height="100" rx="5" fill="#FAFAFA" stroke="#10B981" strokeWidth="2"/>
              <rect x="410" y="60" width="100" height="60" fill="#E5E7EB" opacity="0.5"/>
              <text x="460" y="150" textAnchor="middle" fontSize="12" fill="#1a1a1a" className="monospace-data">Web Dashboard</text>
            </g>
            
            {/* Data Packet */}
            <g ref={packetRef}>
              <circle cx="150" cy="100" r="12" fill="#10B981" className="blinking-data"/>
              <text x="150" y="104" textAnchor="middle" fontSize="8" fill="#FAFAFA">DATA</text>
            </g>
          </svg>
          
          {/* NFR Badges in Margins */}
          <div className="absolute top-4 right-4 space-y-2">
            <div className="bg-[#10B981]/10 px-3 py-1 rounded border border-[#10B981]/30 interactive">
              <span className="monospace-data text-xs blinking-data">NFR-001: ≤ 5s</span>
              <div className="text-[10px] text-gray-500 mt-1">Sync Job Latency</div>
            </div>
            <div className="bg-[#10B981]/10 px-3 py-1 rounded border border-[#10B981]/30 interactive">
              <span className="monospace-data text-xs blinking-data">NFR-005: JWT</span>
              <div className="text-[10px] text-gray-500 mt-1">Authentication</div>
            </div>
          </div>
          
          {/* Steps Display */}
          <div className="absolute bottom-4 left-4 space-y-1">
            {steps.slice(0, 3).map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-xs text-gray-600 monospace-data"
              >
                <span className="text-[#10B981]">→</span> {step.substring(0, 40)}...
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
