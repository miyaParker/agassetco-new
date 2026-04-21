'use client';


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface NewsSectionProps {
  onNavigate?: (page: any, id?: any) => void;
}

const articles = [
  {
    id: 1,
    title: "Financing the Solar Transition",
    date: "March 12, 2025",
    excerpt: "How lease-to-own models are unlocking potential in rural Nigeria. We explore the financial structures that allow smallholder farmers to bypass the massive upfront costs of solar equipment.",
    image: "https://images.unsplash.com/photo-1589201529153-5297335c1684?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "The Impact of Cold Chain Storage",
    date: "February 28, 2025",
    excerpt: "Reducing post-harvest losses by 40% through localized preservation. Our latest case study in Kaduna demonstrates how temperature-controlled logistics transforms vegetable value chains.",
    image: "https://images.unsplash.com/photo-1589201529153-5297335c1684?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    title: "IoT in Remote Asset Management",
    date: "February 15, 2025",
    excerpt: "Why data visibility is the key to bankability. How we use real-time telemetry to track asset performance, predict maintenance needs, and secure investor confidence.",
    image: "https://images.unsplash.com/photo-1589201529153-5297335c1684?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    title: "Scaling Mini-Grid Demand",
    date: "January 10, 2025",
    excerpt: "Solving the utilization puzzle for rural energy developers. By introducing productive use assets, we create the stable daytime loads necessary for mini-grid profitability.",
    image: "https://images.unsplash.com/photo-1589201529153-5297335c1684?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const NewsSection: React.FC<NewsSectionProps> = ({ onNavigate }) => {
  const [activeId, setActiveId] = useState(1);
  const activeArticle = articles.find(a => a.id === activeId) || articles[0];

  return (
    <section id="news" className="bg-white py-24 relative snap-start">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. Standardized Header */}
        <SectionHeader 
            number="06" 
            category="Articles & Blog" 
            title={<>Renewable energy <br />innovations and insights.</>} 
        />

        {/* 2. Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT: Active Image Display - Updated border radius to 0.7rem */}
          <div className="relative h-[400px] md:h-[550px] rounded-[0.7rem] overflow-hidden bg-gray-100 shadow-2xl cursor-pointer" onClick={() => onNavigate?.('news-detail', activeArticle.id)}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeArticle.id}
                src={activeArticle.image}
                alt={activeArticle.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </AnimatePresence>
            
            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-ag-green-950/40 to-transparent pointer-events-none" />
          </div>

          {/* RIGHT: Content & List */}
          <div className="flex flex-col">
            
            {/* Active Article Details */}
            <div className="mb-16 min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeArticle.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-sm font-medium text-gray-400 mb-4">
                    {activeArticle.date}
                  </div>
                  <p className="text-xl md:text-2xl leading-relaxed text-gray-500 font-light cursor-pointer" onClick={() => onNavigate?.('news-detail', activeArticle.id)}>
                    {activeArticle.excerpt}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Article List Navigation */}
            <div>
              <div className="flex justify-between items-end border-b border-ag-green-950 mb-6 pb-2">
                <h3 className="text-lg font-bold text-ag-green-950">Latest Articles</h3>
                <span className="text-xs text-gray-400 font-mono cursor-pointer" onClick={() => onNavigate?.('news')}>[ VIEW ALL ]</span>
              </div>
              
              <div className="flex flex-col">
                {articles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => setActiveId(article.id)}
                    onDoubleClick={() => onNavigate?.('news-detail', article.id)}
                    className="group flex items-center justify-between py-6 border-b border-gray-100 hover:border-ag-lime/30 transition-colors text-left"
                  >
                    <span 
                      className={`text-lg md:text-xl transition-colors duration-300 ${
                        activeId === article.id 
                          ? 'text-ag-green-950 font-bold' 
                          : 'text-gray-400 font-medium group-hover:text-ag-green-950'
                      }`}
                    >
                      {article.title}
                    </span>
                    
                    <div className={`
                      flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300
                      ${activeId === article.id ? 'text-ag-lime opacity-100' : 'text-gray-300 opacity-0 group-hover:opacity-100'}
                    `} onClick={(e) => { e.stopPropagation(); onNavigate?.('news-detail', article.id); }}>
                      Read
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default NewsSection;
