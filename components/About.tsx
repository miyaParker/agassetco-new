'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Warehouse, Coins, Settings, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  // We track hover state by ID to show descriptions on hover
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const services = [
    { 
      id: 'deploy', 
      title: 'Deploy', 
      icon: Warehouse, 
      desc: "Infrastructure that lasts beyond the first harvest.",
      type: 'light'
    },
    { 
      id: 'finance', 
      title: 'Finance', 
      icon: Coins, 
      desc: "Capital that understands the rhythm of agriculture.",
      type: 'light'
    },
    { 
      id: 'manage', 
      title: 'Manage', 
      icon: Settings, 
      desc: "Operations that ensure assets never go dark.",
      type: 'light'
    },
    { 
      id: 'partner', 
      title: 'Partner With Us', 
      icon: ArrowRight, 
      desc: "Join the platform bridging energy and economy.",
      type: 'dark' // This will be the distinct dark card
    }
  ];

  return (
    <section id="about" className="py-24 bg-gray-50 relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Changed items-start to items-end for bottom alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-6 pb-2">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold text-ag-lime uppercase tracking-widest mb-4 block leading-none"
              >
                Our Mandate
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[3rem] md:text-[3.5rem] font-medium text-ag-green-950 leading-[1.1] tracking-tight mb-6"
              >
                We drive rural economic growth by financing productive assets powered by <span className="text-ag-lime">renewable energy.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-500 font-light leading-relaxed max-w-md"
              >
                Bridging the gap between energy access and income generation through an integrated, data-driven approach.
              </motion.p>
            </div>
          </div>

          {/* Right Column: 2x2 Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {services.map((item, index) => {
              const isDark = item.type === 'dark';
              const isHovered = hoveredCard === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`
                    relative p-8 flex flex-col justify-between min-h-[260px] transition-all duration-500 rounded-2xl overflow-hidden group
                    ${isDark 
                      ? 'bg-ag-green-950 text-white shadow-xl hover:shadow-2xl hover:shadow-ag-green-900/20' 
                      : 'bg-white hover:shadow-xl shadow-sm'
                    }
                  `}
                >
                  
                  {/* Dark Card Background & Overlay */}
                  {isDark && (
                    <>
                      <div className="absolute inset-0 z-0">
                        <img
                          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop"
                          alt="Background"
                          className="w-full h-full object-cover opacity-60 mix-blend-overlay grayscale transition-transform duration-700 hover:scale-105"
                          loading="eager"
                          fetchPriority="high"
                        />
                        <div className="absolute inset-0 bg-ag-green-950/85 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-ag-green-950 via-transparent to-transparent opacity-80"></div>
                      </div>
                    </>
                  )}

                  {/* Light Card: Animated Top Border (No gray background) */}
                  {!isDark && (
                    <div className="absolute top-0 left-0 w-full h-1">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: isHovered ? "100%" : "0%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-ag-green-950"
                      />
                    </div>
                  )}

                  {/* Card Content (Relative z-10) */}
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-xl font-medium transition-colors duration-300 ${isDark ? 'text-white' : 'text-ag-green-950 group-hover:text-ag-lime-hover'}`}>
                          {item.title}
                        </h3>
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-300
                          ${isDark 
                            ? 'border-white/20 bg-white/10 text-ag-lime' 
                            : 'border-gray-100 bg-gray-50 text-ag-green-950 group-hover:border-ag-lime group-hover:text-ag-lime'
                          }
                        `}>
                           <item.icon className="w-5 h-5 stroke-[1.5]" />
                        </div>
                     </div>

                    {/* Bottom: Description/Link */}
                    <div className="mt-auto relative min-h-[3.5rem] flex items-end">
                      {/* Default State */}
                      <motion.div
                        initial={false}
                        animate={{ 
                          opacity: isHovered && !isDark ? 0 : 1,
                          y: isHovered && !isDark ? -10 : 0
                        }}
                        className="absolute inset-x-0 bottom-0"
                      >
                        {isDark ? (
                          <p className="text-white/80 text-sm leading-relaxed font-light">
                            {item.desc}
                          </p>
                        ) : (
                          <span className="text-xs font-bold tracking-widest text-ag-green-950/40 uppercase block pb-1">
                            [ View Details ]
                          </span>
                        )}
                      </motion.div>

                      {/* Hover State (Light cards) */}
                      {!isDark && (
                         <motion.div
                           initial={false}
                           animate={{ 
                             opacity: isHovered ? 1 : 0,
                             y: isHovered ? 0 : 20
                           }}
                           className="absolute inset-x-0 bottom-0"
                         >
                           <p className="text-ag-green-950 text-sm leading-relaxed font-medium pb-1">
                             {item.desc}
                           </p>
                         </motion.div>
                      )}
                    </div>
                    
                    {/* For Dark Card: Arrow Indicator */}
                    {isDark && (
                      <div className="absolute bottom-0 right-0">
                        <motion.div
                          animate={{ x: isHovered ? 5 : 0 }}
                          className="text-ag-lime"
                        >
                           <ArrowRight className="w-6 h-6" />
                        </motion.div>
                      </div>
                    )}

                  </div>

                </motion.div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;