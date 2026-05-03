'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ERD_CONTENT } from '@/lib/content';

interface ERDNode {
  name: string;
  columns: Array<{ name: string; type: string; constraints: string }>;
  businessRules: string[];
}

export default function BlueprintNavigator() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [hoveredRule, setHoveredRule] = useState<string | null>(null);

  return (
    <div className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-4 text-center">The Blueprint: ERD Architecture</h2>
        <p className="text-gray-600 text-center mb-12 monospace-data">Interactive Database Schema Visualization</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Node Map */}
          <div className="lg:col-span-2 relative h-[500px] bg-[#FAFAFA] rounded-lg border border-[#E5E7EB] p-8 overflow-hidden">
            <div className="absolute inset-0 grid-overlay opacity-30" />
            
            {/* Nodes Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-6">
              {ERD_CONTENT.tables.map((table, index) => (
                <motion.div
                  key={table.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 cursor-pointer interactive transition-all duration-300 ${
                    selectedTable === table.name
                      ? 'border-[#10B981] bg-[#10B981]/10'
                      : 'border-[#E5E7EB] bg-white hover:border-[#10B981]/50'
                  }`}
                  onClick={() => setSelectedTable(table.name)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedTable === table.name ? 'bg-[#10B981]' : 'bg-[#E5E7EB]'
                    }`} />
                    <h4 className="font-bold monospace-data text-sm">{table.name}</h4>
                  </div>
                  <div className="text-xs text-gray-500">
                    {table.columns.length} columns
                  </div>
                  
                  {/* Connection Lines (visual only) */}
                  {index < ERD_CONTENT.tables.length - 1 && (
                    <div className="absolute bottom-0 left-1/2 w-px h-8 bg-[#10B981]/30" />
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Animated Assembly Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" opacity="0.5" />
                </marker>
              </defs>
              
              {/* Dynamic connection lines between nodes */}
              <line x1="25%" y1="30%" x2="75%" y2="30%" stroke="#10B981" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" markerEnd="url(#arrowhead)" />
              <line x1="25%" y1="70%" x2="75%" y2="70%" stroke="#10B981" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" markerEnd="url(#arrowhead)" />
            </svg>
          </div>
          
          {/* Column Details Panel */}
          <div className="bg-[#FAFAFA] rounded-lg border border-[#E5E7EB] p-6">
            <AnimatePresence mode="wait">
              {selectedTable ? (
                <motion.div
                  key={selectedTable}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold monospace-data text-[#10B981]">{selectedTable}</h3>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700">Column Structure:</h4>
                    {ERD_CONTENT.tables.find(t => t.name === selectedTable)?.columns.map((col, idx) => (
                      <motion.div
                        key={col.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="text-xs p-2 bg-white rounded border border-[#E5E7EB]"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-mono font-bold text-[#1a1a1a]">{col.name}</span>
                          <span className="text-gray-500 monospace-data">{col.type}</span>
                        </div>
                        {col.constraints && (
                          <div className="text-gray-400 mt-1">{col.constraints}</div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Business Rules */}
                  {ERD_CONTENT.tables.find(t => t.name === selectedTable)?.businessRules.map((rule, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="p-3 bg-[#10B981]/10 rounded border border-[#10B981]/30"
                      onMouseEnter={() => setHoveredRule(rule)}
                      onMouseLeave={() => setHoveredRule(null)}
                    >
                      <div className="text-xs monospace-data blinking-data">{rule}</div>
                      
                      {/* Tooltip */}
                      <AnimatePresence>
                        {hoveredRule === rule && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute mt-12 p-2 bg-[#1a1a1a] text-white text-xs rounded shadow-lg z-20"
                          >
                            Maps to SRS BR-DB-{idx + 1}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-gray-500 py-20"
                >
                  <div className="monospace-data text-sm">Select a node to reveal schema</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
