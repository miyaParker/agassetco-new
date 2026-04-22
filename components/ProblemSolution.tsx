'use client';


import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BatteryWarning, Wrench, Coins } from 'lucide-react';
import SectionHeader from './SectionHeader';
import type { TheChallengeSection } from '@/lib/strapi/types';

interface ProblemSolutionProps {
  data?: TheChallengeSection | null;
}

const ProblemSolution: React.FC<ProblemSolutionProps> = ({ data }) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Fix: Casting ease array to any to resolve framer-motion Variants type mismatch
  const fadeInUp = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const tags = [
    { id: 'risk', label: '#RISK', desc: "Banks refuse to lend because assets break down." },
    { id: 'ops', label: '#OPS', desc: "Without a maintenance ecosystem, machinery fails." },
    { id: 'waste', label: '#WASTE', desc: "Expensive equipment becomes scrap metal in months." }
  ];
  const defaultDesc = "The Asset Graveyard: Investors retreat as capital turns into rusted metal.";

  return (
    <section ref={containerRef} className="bg-white relative snap-start">
      {/* PART 1: THE CHALLENGE */}
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 bg-white">
        
        {/* Standardized Header */}
        <SectionHeader 
          number="02" 
          category={data?.sectionLabel || "The Challenge"} 
          title={data?.title || <>The Systemic Failure of <span className="text-ag-lime">Rural Energy Markets.</span></>} 
        />

        {/* Description Paragraph */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16 -mt-8 md:-mt-12"
        >
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            Mini-grids fail without demand. Farmers fail without equipment. We solve the deadlock.
          </p>
        </motion.div>

        {/* 3-Card Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[420px] mb-24"
        >
          {/* Card 1: Developer Pain */}
          <motion.div 
            variants={fadeInUp}
            className="bg-ag-green-950 rounded-[0.7rem] p-8 flex flex-col justify-between relative group hover:shadow-2xl hover:shadow-ag-green-900/20 transition-all duration-300 transform hover:-translate-y-1"
          >
             <div className="flex justify-between items-start">
               <span className="text-white/70 text-sm font-light uppercase tracking-wider">Developer Pain</span>
               <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                 <BatteryWarning className="text-white w-5 h-5 stroke-[1.5]" />
               </div>
             </div>
             <div>
               <div className="text-3xl font-medium text-white mb-4 leading-tight">
                 {data?.challenge_card?.[0]?.title || <>The Utilization <br/><span className="text-ag-lime">Gap</span></>}
               </div>
               <p className="text-white/60 text-sm leading-relaxed font-light">
                 {data?.challenge_card?.[0]?.description || "Solar developers build expensive grids, but rural communities lack the machinery to consume enough power, making grids unprofitable."}
               </p>
             </div>
          </motion.div>

          {/* Card 2: End-User Pain */}
          <motion.div 
            variants={fadeInUp}
            className="relative rounded-[0.7rem] overflow-hidden p-8 flex flex-col justify-between group h-full min-h-[350px] transform hover:-translate-y-1 transition-transform duration-300"
          >
             <div className="absolute inset-0">
               <img 
                 src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2940&auto=format&fit=crop" 
                 alt="Cost Barrier" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale mix-blend-multiply opacity-80"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-ag-green-900/90 via-ag-green-900/40 to-ag-green-900/20"></div>
             </div>
             <div className="relative z-10 flex justify-end">
               <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md hover:bg-white/20 transition-colors">
                 <Coins className="text-white w-5 h-5 stroke-[1.5]" />
               </div>
             </div>
             <div className="relative z-10">
                <div className="text-white/70 text-sm font-light uppercase tracking-wider mb-2">{data?.challenge_card?.[1]?.title || "End-User Pain"}</div>
               <h3 className="text-2xl text-white font-medium mb-3">{data?.challenge_card?.[1]?.subtitle || "The CapEx Barrier"}</h3>
               <p className="text-white/80 leading-relaxed font-light text-sm max-w-[95%]">
                 {data?.challenge_card?.[1]?.description || "Rural enterprises are solvent but illiquid. They cannot afford the $2,000+ upfront cost for equipment, trapping them in subsistence."}
               </p>
             </div>
          </motion.div>

          {/* Card 3: Investor Pain */}
          <motion.div 
            variants={fadeInUp}
            className="bg-[#F3F4F6] rounded-[0.7rem] p-8 flex flex-col justify-between group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
             <div className="flex justify-between items-start mb-4">
               <span className="text-ag-green-950/60 text-sm font-light uppercase tracking-wider">Investor Pain</span>
               <div className="w-12 h-12 rounded-full border border-ag-green-950/10 flex items-center justify-center bg-white shadow-sm">
                 <Wrench className="text-ag-green-950 w-5 h-5 stroke-[1.5]" />
               </div>
             </div>
             <div className="flex flex-col h-full justify-end">
               <div className="min-h-[120px] flex items-end mb-6">
                 <AnimatePresence mode="wait">
                    <motion.h3 
                      key={activeTag || 'default'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl md:text-2xl text-ag-green-950 font-medium leading-tight"
                    >
                      {activeTag ? tags.find(t => t.id === activeTag)?.desc : defaultDesc}
                    </motion.h3>
                 </AnimatePresence>
               </div>
               <div className="flex flex-wrap gap-2">
                 {tags.map((tag) => (
                   <button 
                     key={tag.id}
                     onMouseEnter={() => setActiveTag(tag.id)}
                     onMouseLeave={() => setActiveTag(null)}
                     className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 border ${
                       activeTag === tag.id 
                         ? 'bg-ag-green-950 text-white border-ag-green-950 shadow-lg transform scale-105' 
                         : 'bg-white text-ag-green-900 border-gray-200 hover:border-ag-green-950'
                     }`}
                   >
                     {tag.label}
                   </button>
                 ))}
               </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;
