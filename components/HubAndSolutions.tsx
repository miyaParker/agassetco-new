'use client';


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Users, Briefcase, Settings, ArrowUpRight, Zap, Database, ShieldCheck } from 'lucide-react';
import SectionHeader from './SectionHeader';
import type { OurEcosystemSection } from '@/lib/strapi/types';

interface HubAndSolutionsProps {
  data?: OurEcosystemSection | null;
}

// --- DATA CONFIGURATION ---

const STATIC_BG = "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=2940&auto=format&fit=crop";


const SPOKES = [
  { 
    id: 1,
    icon: Wifi, 
    label: "IoT Tracking", 
    x: 50, y: 10 // Top
  },
  { 
    id: 2,
    icon: Settings, 
    label: "Maintenance", 
    x: 90, y: 50 // Right
  },
  { 
    id: 3,
    icon: Users, 
    label: "End Users", 
    x: 50, y: 90 // Bottom
  },
  { 
    id: 4,
    icon: Briefcase, 
    label: "Capital", 
    x: 10, y: 50 // Left
  }
];

const HubAndSolutions: React.FC<HubAndSolutionsProps> = ({ data }) => {
    const displaySolutions = data?.card?.map((item) => {
        return {
            id: item?.card_id,
            title: item?.title,
            subtitle: item?.subtitle,
            description: item?.description,
            relatedSpokeId: item?.card_id ? parseInt(item.card_id, 10) : undefined,
            icon: item?.svg_icon,
        };
    }) || [];
  const [activeSolution, setActiveSolution] = useState(0);
  const activeSpokeId = displaySolutions[activeSolution].relatedSpokeId;


  return (
    <section className="relative min-h-screen bg-ag-green-950 pt-32 lg:pt-40 pb-24 overflow-hidden snap-start flex flex-col">
      
      {/* 1. STATIC CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 z-0">
         <img 
           src={STATIC_BG}
           alt="Background" 
           className="w-full h-full object-cover"
         />
         
         {/* Custom Gradient: Light at top (30%), Dark at bottom */}
         <div className="absolute inset-0 bg-gradient-to-b from-ag-green-950/40 via-ag-green-950/90 to-ag-green-950" />
         
         {/* Subtle Multiply Overlay to unify colors */}
         <div className="absolute inset-0 bg-ag-green-950/50 mix-blend-multiply" />
      </div>

      {/* 2. CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full h-full flex flex-col">
        
        {/* HEADER */}
        <div className="mb-12 border-b border-white/20 pb-8 drop-shadow-md">
            <SectionHeader 
                number="03" 
                category={data?.sectionLabel || "Our Ecosystem"} 
                title={data?.title || <>Integrated Solutions <br /> & <span className="text-ag-lime">Infrastructure.</span></>} 
                dark={true}
            />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* LEFT COLUMN: THE HUB (The Engine) */}
            <div className="relative h-[500px] w-full flex items-center justify-center order-2 lg:order-1 sticky top-32">
                
                {/* SVG Connections with Flowing Stroke */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {SPOKES.map((spoke, i: number) => {
                        const isActive = activeSpokeId === spoke.id;
                        return (
                            <motion.line
                                key={i}
                                x1="50%" y1="50%"
                                x2={`${spoke.x}%`} y2={`${spoke.y}%`}
                                stroke={isActive ? "#78BC42" : "rgba(255,255,255,0.1)"}
                                strokeWidth={isActive ? "3" : "1"}
                                strokeDasharray={isActive ? "8 8" : "4 4"}
                                initial={{ pathLength: 0, strokeDashoffset: 0 }}
                                animate={{ 
                                    pathLength: 1,
                                    strokeDashoffset: isActive ? [0, -32] : 0 
                                }}
                                transition={{ 
                                    pathLength: { duration: 1 },
                                    strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" }
                                }}
                            />
                        );
                    })}
                    {/* Rotating Ring */}
                    <motion.circle 
                        cx="50%" cy="50%" r="18%" 
                        stroke="#78BC42" strokeWidth="1" fill="none" strokeDasharray="4 4" 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{ originX: "50%", originY: "50%" }}
                        className="opacity-30"
                    />
                </svg>

                {/* Central Core with Subtle Pulse */}
                <div className="relative z-20 w-40 h-40 flex items-center justify-center">
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-ag-lime blur-2xl"
                    />
                    <div className="relative z-20 w-full h-full rounded-full bg-ag-green-950 border border-white/10 shadow-[0_0_60px_rgba(120,188,66,0.1)] flex flex-col items-center justify-center text-center p-4 backdrop-blur-sm">
                        <div className="text-white font-bold text-xl tracking-tight">AgAsset</div>
                        <div className="text-[10px] text-ag-lime uppercase tracking-widest mt-1">Central Hub</div>
                    </div>
                </div>

                {/* Spokes */}
                {SPOKES.map((spoke) => {
                    const isActive = activeSpokeId === spoke.id;
                    return (
                        <motion.div
                            key={spoke.id}
                            className="absolute flex flex-col items-center justify-center w-24"
                            style={{ 
                                left: `${spoke.x}%`, 
                                top: `${spoke.y}%`, 
                                x: "-50%", 
                                y: "-50%" 
                            }}
                            animate={{ scale: isActive ? 1.1 : 1, opacity: isActive ? 1 : 0.5 }}
                        >
                            <div className={`
                                w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all duration-500 border
                                ${isActive 
                                    ? 'bg-ag-lime text-ag-green-950 border-ag-lime shadow-[0_0_30px_rgba(120,188,66,0.4)]' 
                                    : 'bg-ag-green-900 text-white/50 border-white/10'
                                }
                            `}>
                                <spoke.icon className="w-6 h-6" />
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/30'}`}>
                                {spoke.label}
                            </span>
                        </motion.div>
                    );
                })}
            </div>

            {/* RIGHT COLUMN: SOLUTIONS LIST (The Interface) */}
            <div className="flex flex-col gap-5 order-1 lg:order-2">
                {displaySolutions.map((solution, index) => {
                    const isActive = activeSolution === index;
                    return (
                        <motion.div
                            layout // Handles vertical position shuffling smoothly
                            key={solution.id}
                            onClick={() => setActiveSolution(index)}
                            initial={false}
                            className={`
                                relative rounded-xl cursor-pointer overflow-hidden
                                transition-colors duration-500
                                ${isActive 
                                    ? 'bg-white shadow-2xl z-20' 
                                    : 'bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm z-10'
                                }
                            `}
                        >
                            <motion.div layout="position" className="px-6 py-6">
                                {/* Header Row */}
                                <div className="flex items-center gap-5">
                                    <div className={`
                                        w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300
                                        ${isActive 
                                            ? 'bg-ag-lime text-ag-green-950 shadow-sm' 
                                            : 'bg-white/10 text-white/50'
                                        }
                                    `}>
                                        {solution.icon ? (
                                            <div className="w-5 h-5 [&>svg]:w-full [&>svg]:h-full" dangerouslySetInnerHTML={{ __html: solution.icon }} />
                                        ) : null}
                                    </div>
                                    
                                    <div className="grow flex flex-col justify-center">
                                        <motion.span 
                                            layout="position"
                                            className={`text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors duration-300 ${isActive ? 'text-ag-lime' : 'text-white/40'}`}
                                        >
                                            {solution.subtitle}
                                        </motion.span>
                                        <motion.h3 
                                            layout="position"
                                            className={`text-xl font-medium transition-colors duration-300 ${isActive ? 'text-ag-green-950' : 'text-white'}`}
                                        >
                                            {solution.title}
                                        </motion.h3>
                                    </div>

                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                        ${isActive ? 'bg-ag-green-950 text-white' : 'bg-transparent text-white/20'}
                                    `}>
                                        <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'rotate-45' : ''}`} />
                                    </div>
                                </div>

                                {/* Expanded Description - FIXED HEIGHT for stability */}
                                <AnimatePresence initial={false}>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 160 }} // Fixed height prevents section jumping
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-6 pl-[4.25rem] pr-2 h-full">
                                                <div className="w-12 h-0.5 bg-ag-lime mb-4" />
                                                <p className="text-gray-500 font-light leading-relaxed text-sm">
                                                    {solution.description}
                                                </p>
                                                
                                                <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ag-green-950 cursor-pointer group/link hover:text-ag-lime transition-colors">
                                                    <span>Explore Solution</span>
                                                    <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

        </div>
      </div>

    </section>
  );
};

export default HubAndSolutions;
