'use client';


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Added CheckCircle2 to imports
import { ArrowUpRight, Plus, Minus, CheckCircle2 } from 'lucide-react';
import SectionHeader from './SectionHeader';

// Data Configuration
const projects = [
  {
    id: '01',
    title: "Jigawa Agro-Processing Hub",
    location: "Nigeria",
    year: "2024",
    tags: ["Solar Milling", "PUE"],
    problem: "Localized rice clusters relied exclusively on fossil fuels. High diesel costs eroded smallholder margins by 45%, while the regional mini-grid suffered from low daytime utilization.",
    solution: "Deployed industrial-grade electric rice hullers through a lease-to-own structure, acting as stable Anchor Loads for the grid while slashing energy costs for processors.",
    impact: ["SME Revenue +35%", "100% Diesel Displacement", "99.2% Operational Uptime"],
    sdgs: [7, 8, 9],
    images: [
      "https://images.unsplash.com/photo-1706770290344-b4a1ba7fc6b3?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1763800758293-40b0658f2141?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1686820740687-426a7b9b2043?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    id: '02',
    title: "Kaduna Cold Chain Facility",
    location: "Kaduna",
    year: "2023",
    tags: ["Storage", "Logistics"],
    problem: "Over 50% of tomato harvests in Zaria were lost within 48 hours due to extreme heat. Farmers were forced to sell at distress prices to avoid total inventory loss.",
    solution: "Deployment of modular blast-cooling units powered by integrated off-grid solar arrays, extending produce shelf life from 2 days to 21 days for over 500 smallholders.",
    impact: ["Spoilage Reduced to <4%", "Market Price Stability +22%", "125T CO2e Offset Annually"],
    sdgs: [1, 2, 7],
    images: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2874&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2944&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2942&auto=format&fit=crop"  
    ]
  },
  {
    id: '03',
    title: "Ogun Mini-Grid Integration",
    location: "Ogun",
    year: "2025",
    tags: ["Grid Stability", "Utility"],
    problem: "Mini-grid viability was threatened by 'flat' daytime load profiles. Communities had power, but lacked the equipment to use it for income-generating activities.",
    solution: "Introduction of solar-powered borehole and milling systems that optimize daytime consumption, providing predictable revenue for the local utility provider.",
    impact: ["Grid ARPU +40%", "3x Annual Harvest Cycles", "65% Growth in Household Income"],
    sdgs: [7, 9, 13],
    images: [
      "https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=2787&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2940&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940&auto=format&fit=crop"  
    ]
  }
];

const SDG_COLORS: Record<number, string> = {
  1: "#E5243B", 2: "#DDA63A", 7: "#FDB713", 8: "#A21942", 9: "#FD6925", 12: "#BF8B2E", 13: "#3F7E44"
};

interface PortfolioProps {
  onNavigate?: (page: any, id?: any) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onNavigate }) => {
  const [activeId, setActiveId] = useState<string | null>('01');

  return (
    <section id="portfolio" className="bg-white py-24 relative snap-start z-20">
      
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
            number="05" 
            category="Our Projects" 
            title={<>Deploying capital where <br /> it matters most.</>} 
        />

        <div className="flex flex-col border-t border-gray-200">
          {projects.map((project) => (
            <ProjectRow 
              key={project.id} 
              project={project} 
              isOpen={activeId === project.id}
              onClick={() => setActiveId(activeId === project.id ? null : project.id)}
              onDetailClick={() => onNavigate?.('project-detail', project.id)}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full flex items-center justify-center z-40">
        <div className="h-px w-full max-w-[95%] bg-gradient-to-r from-transparent via-ag-green-950/10 to-transparent" />
      </div>

    </section>
  );
};

interface ProjectRowProps {
  project: typeof projects[0];
  isOpen: boolean;
  onClick: () => void;
  onDetailClick?: () => void;
}

const ProjectRow: React.FC<ProjectRowProps> = ({ project, isOpen, onClick, onDetailClick }) => {
  return (
    <div className="border-b border-gray-200 group">
      <div 
        onClick={onClick}
        className="w-full py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left group-hover:bg-gray-50/50 transition-colors duration-300 px-2 cursor-pointer"
      >
        <div className="flex items-baseline gap-6 md:gap-12">
          <span className="text-sm font-bold text-gray-300 font-sans hidden md:block">
            / {project.id}
          </span>
          <h3 className={`text-2xl md:text-4xl font-medium tracking-tight transition-colors duration-300 ${isOpen ? 'text-ag-lime' : 'text-ag-green-950 group-hover:text-ag-green-700'}`}>
            {project.title}
          </h3>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-8 pl-0 md:pl-4">
          <div className="flex items-center gap-6 text-sm text-gray-500 font-medium tracking-wide">
            <span>{project.location}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{project.year}</span>
          </div>
          
          <div className="hidden md:block w-px h-6 bg-gray-200 mx-2"></div>
          
          <div className="flex gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-ag-green-950 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="md:ml-4 text-gray-400 group-hover:text-ag-green-950 transition-colors">
             {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
            className="overflow-hidden"
          >
            <div className="pb-12 pt-2 px-2">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-8">
                {/* Images Column */}
                <div className="lg:col-span-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative rounded-[0.7rem] overflow-hidden group/image aspect-[4/3]"
                    >
                       <img src={project.images[0]} alt="Project Detail 1" className="w-full h-full object-cover transition-transform duration-700 group/image:scale-110" loading="eager" fetchPriority="high" />
                       <div className="absolute inset-0 bg-ag-green-950/10 group/image:bg-transparent transition-colors duration-300" />
                    </motion.div>
                    <div className="flex flex-col gap-4">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative rounded-[0.7rem] overflow-hidden group/image flex-1 min-h-[160px]"
                      >
                         <img src={project.images[1]} alt="Project Detail 2" className="w-full h-full object-cover transition-transform duration-700 group/image:scale-110" loading="eager" fetchPriority="high" />
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative rounded-[0.7rem] overflow-hidden group/image flex-1 min-h-[160px]"
                      >
                         <img src={project.images[2]} alt="Project Detail 3" className="w-full h-full object-cover transition-transform duration-700 group/image:scale-110" loading="eager" fetchPriority="high" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Details Column - Full Content Stacked */}
                <div className="lg:col-span-5 flex flex-col justify-between py-2">
                   <div className="space-y-10">
                      <div>
                        <h4 className="text-[10px] font-bold text-ag-lime uppercase tracking-[0.2em] mb-3">Challenge</h4>
                        <p className="text-sm text-gray-500 font-light leading-relaxed">{project.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-ag-lime uppercase tracking-[0.2em] mb-3">Solution</h4>
                        <p className="text-sm text-gray-500 font-light leading-relaxed">{project.solution}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-ag-lime uppercase tracking-[0.2em] mb-3">Core Impact</h4>
                        <ul className="space-y-2">
                          {project.impact.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-ag-green-950 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-ag-lime" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                   </div>

                   <div className="mt-12 flex items-center justify-between pt-8 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                         <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mr-2">SDG Impact:</span>
                         {project.sdgs.map((sdg) => (
                           <div 
                             key={sdg} 
                             className="w-8 h-8 rounded flex items-center justify-center text-white text-[10px] font-bold shadow-sm hover:scale-110 transition-transform cursor-help"
                             style={{ backgroundColor: SDG_COLORS[sdg] || '#ccc' }}
                             title={`SDG Goal ${sdg}`}
                           >
                             {sdg}
                           </div>
                         ))}
                      </div>

                      <motion.button 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        onClick={(e) => { e.stopPropagation(); onDetailClick?.(); }}
                        className="shrink-0 text-[10px] font-bold text-ag-green-950 uppercase tracking-[0.25em] flex items-center gap-2 hover:text-ag-lime transition-all group/btn"
                      >
                          Full Case Study 
                          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </motion.button>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Portfolio;
