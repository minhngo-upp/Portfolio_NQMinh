'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FRS_CONTENT } from '@/lib/content';

export default function ModuleFolders() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  return (
    <div className="w-full py-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-4 text-center">The Modules: System Folders</h2>
        <p className="text-gray-600 text-center mb-12 monospace-data">7 Functional Requirement Categories (A–G)</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FRS_CONTENT.modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="interactive"
            >
              <div
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  expandedModule === module.id
                    ? 'border-[#10B981] bg-white shadow-lg'
                    : 'border-[#E5E7EB] bg-white hover:border-[#10B981]/50'
                }`}
              >
                {/* Folder Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                  <div>
                    <div className="text-xs monospace-data text-[#10B981]">Folder {module.id}</div>
                    <h3 className="font-bold">{module.name}</h3>
                  </div>
                </div>
                
                {/* Requirements Count */}
                <div className="text-sm text-gray-500">
                  {module.requirements.length} requirements
                </div>
                
                {/* Expand Indicator */}
                <motion.div
                  animate={{ rotate: expandedModule === module.id ? 180 : 0 }}
                  className="absolute top-6 right-6 text-[#10B981]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </motion.div>
              </div>
              
              {/* Expanded Content */}
              <AnimatePresence>
                {expandedModule === module.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 bg-white rounded-lg border border-[#E5E7EB] overflow-hidden"
                  >
                    <div className="p-4 space-y-3">
                      {module.requirements.map((req, reqIdx) => (
                        <motion.div
                          key={req.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: reqIdx * 0.05 }}
                          className="group relative p-3 bg-[#FAFAFA] rounded border border-[#E5E7EB] hover:border-[#10B981]/50 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="monospace-data text-xs text-[#10B981] mb-1">{req.id}</div>
                              <div className="text-sm">{req.description}</div>
                            </div>
                            
                            {/* SRS Reference Tooltip */}
                            <div className="relative group/tooltip">
                              <div className="w-6 h-6 rounded-full bg-[#10B981]/10 flex items-center justify-center text-xs text-[#10B981] cursor-help">
                                i
                              </div>
                              <div className="absolute right-0 bottom-full mb-2 hidden group-hover/tooltip:block w-max max-w-[200px] p-2 bg-[#1a1a1a] text-white text-xs rounded shadow-lg z-30">
                                Maps to {req.srsRef}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
