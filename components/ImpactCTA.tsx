'use client';


import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { TrustBarSection } from '@/lib/strapi/types';

const FALLBACK_PARTNERS = [
  "World Bank",
  "REA",
  "Agronomie",
  "Power Africa",
  "Shell Foundation"
];

interface ImpactCTAProps {
  data?: TrustBarSection | null;
}

const ImpactCTA: React.FC<ImpactCTAProps> = ({ data }) => {
  const { scrollYProgress } = useScroll();
  // Parallax movement
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Quadruple the array to ensure smooth infinite scrolling on large screens
  const partnerNames = data?.partners?.length 
    ? data.partners.map(p => p.name) 
    : FALLBACK_PARTNERS;
  const marqueePartners = [...partnerNames, ...partnerNames, ...partnerNames, ...partnerNames];

  return (
    <section className="relative w-full overflow-hidden flex flex-col justify-center snap-start bg-ag-green-950 py-24">
      
      {/* CSS Animation for Marquee to enable Pause on Hover */}
      <style>{`
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-right {
          animation: marquee-right 60s linear infinite;
        }
      `}</style>

      {/* 1. Parallax Background Image */}
      <motion.div 
        style={{ y }} 
        className="absolute -top-[20%] left-0 w-full h-[140%] z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?q=80&w=2874&auto=format&fit=crop" 
          alt="Solar Panels in Field" 
          className="w-full h-full object-cover"
        />
        
        {/* Deep Multiply Overlay */}
        <div className="absolute inset-0 bg-ag-green-950/80 mix-blend-multiply" />
        
        {/* Gradient for fading edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-ag-green-950 via-transparent to-ag-green-950/50" />
      </motion.div>

      {/* 2. Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col justify-center h-full gap-12">
        
        {/* ROW 1: Partner Marquee Section */}
        <div className="w-full relative border-b border-white/10 pb-8 pt-4">
            
            {/* Title */}
            <div className="text-center mb-8">
               <p className="text-xs font-bold text-ag-lime uppercase tracking-[0.2em] drop-shadow-sm">
                 {data?.label || "Trusted by Global Institutions & Infrastructure Leaders"}
               </p>
            </div>

            {/* Marquee Container */}
            <div className="relative overflow-hidden group">
                {/* Fade Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-ag-green-950 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-ag-green-950 to-transparent z-20 pointer-events-none" />
                
                {/* Marquee Track with CSS Animation & Pause on Hover */}
                <div className="flex items-center gap-16 md:gap-32 w-max animate-marquee-right group-hover:[animation-play-state:paused]">
                   {marqueePartners.map((name, i) => (
                     <span 
                        key={`partner-${i}`} 
                        className="text-2xl md:text-4xl font-serif font-bold text-white/30 whitespace-nowrap hover:text-white transition-colors duration-500 cursor-default select-none"
                     >
                        {name}
                     </span>
                   ))}
                </div>
            </div>
        </div>

        {/* ROW 2: Main Grid (Title & CTA Box Side-by-Side) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end pb-8">
          
          {/* Col 1: Headline */}
          <div className="mb-8 lg:mb-0">
             <motion.h2 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="text-[3.5rem] md:text-[5rem] leading-[1.1] font-bold text-white tracking-tighter mix-blend-overlay opacity-90 mb-6"
             >
               Ready to <br /> Deploy Capital?
             </motion.h2>
             <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-xl text-gray-400 font-light max-w-md leading-relaxed"
             >
               Join the ecosystem powering the next generation of African agriculture.
             </motion.p>
          </div>

          {/* Col 2: White CTA Box */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-12 w-full rounded-[2.5rem] shadow-2xl relative z-20"
          >
            <h3 className="text-3xl md:text-4xl font-medium text-ag-green-950 mb-6 leading-tight">
               Bridge the gap between energy and economy.
            </h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
               By choosing renewable energy financing, you lower energy costs, reduce carbon emissions, and support innovative solutions that benefit our planet.
            </p>
            <button className="group flex items-center justify-between w-full bg-ag-green-950 text-white p-1 pr-1 rounded-full hover:bg-ag-lime transition-colors duration-500">
               <span className="pl-8 font-bold text-sm tracking-widest uppercase">Partner Now</span>
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-ag-green-950 transition-transform group-hover:rotate-45">
                  <ArrowRight className="w-5 h-5" />
               </div>
            </button>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ImpactCTA;
