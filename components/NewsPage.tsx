'use client';


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronRight, Calendar, ArrowRight, Filter, ChevronDown, Plus, TrendingUp, Clock, Bookmark } from 'lucide-react';

interface NewsPageProps {
  onNavigate?: (page: any, id?: any) => void;
}

const FEATURED_SLIDES = [
  {
    id: 'f1',
    title: "Reducing post-harvest losses by 40% through localized preservation.",
    category: "CASE STUDY",
    date: "Feb 28, 2025",
    image: "https://images.unsplash.com/photo-1763252453830-3f5c06f97e68?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    excerpt: "Our latest case study in Kaduna demonstrates how temperature-controlled logistics transforms vegetable value chains."
  },
  {
    id: 'f2',
    title: "Financing the Solar Transition in Rural Clusters.",
    category: "FINANCE",
    date: "Mar 05, 2025",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2944&auto=format&fit=crop",
    excerpt: "New lease-to-own models are unlocking potential for over 5,000 smallholder farmers in Northern Nigeria."
  },
  {
    id: 'f3',
    title: "The Future of IoT in Remote Asset Management.",
    category: "TECHNOLOGY",
    date: "Mar 12, 2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    excerpt: "Why real-time telemetry is the key to bankability and investor confidence in productive use energy."
  }
];

const ARTICLES = [
  {
    id: 1,
    category: "EQUIPMENT",
    title: "Introducing the TANKVOLT T22-Pro",
    excerpt: "The next evolution in heavy-duty electric logistics assets, capable of bridging peak gaps.",
    date: "June 15, 2025",
    image: "/tankvolt.jpeg",
    badgeColor: "bg-purple-100 text-purple-700"
  },
  {
    id: 2,
    category: "STRATEGY",
    title: "Kenya Expansion Plans Finalized",
    excerpt: "AgAsset Co is bringing its market-leading PUE financing technology to Nairobi in Q4 2025.",
    date: "May 30, 2025",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2940&auto=format&fit=crop",
    badgeColor: "bg-orange-100 text-orange-700"
  },
  {
    id: 3,
    category: "TECHNOLOGY",
    title: "AI-Driven Asset Health Monitoring",
    excerpt: "New IoT firmware update allows for predictive maintenance alerts before machinery downtime.",
    date: "May 12, 2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    id: 4,
    category: "IMPACT",
    title: "Rural Safety Initiative Launched",
    excerpt: "Training over 1,000 operators in safe industrial machinery handling across cluster zones.",
    date: "April 20, 2025",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2940&auto=format&fit=crop",
    badgeColor: "bg-indigo-100 text-indigo-700"
  },
  {
    id: 5,
    category: "FINANCE",
    title: "AgAsset Co Secures New Series B",
    excerpt: "Consolidating our position as the continent's primary productive infrastructure vehicle.",
    date: "March 15, 2025",
 image: "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badgeColor: "bg-teal-100 text-teal-700"
  },
  {
    id: 6,
    category: "MILESTONES",
    title: "500 Assets Successfully Deployed",
    excerpt: "A historic day as we cross the 1 million swap threshold network-wide.",
    date: "February 28, 2025",
    image: "https://images.unsplash.com/photo-1743742566156-f1745850281a?q=80&w=3025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badgeColor: "bg-yellow-100 text-yellow-700"
  }
];

const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % FEATURED_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Fix: Casting ease array to any to resolve framer-motion Variants type mismatch
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <div className="bg-[#fbfbfb] min-h-screen font-sans selection:bg-ag-lime selection:text-white pb-32">
      
      {/* 01. INNER PAGE HERO */}
      <section className="pt-32 pb-24 bg-white overflow-hidden px-6">
        <motion.div 
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Metadata & Breadcrumbs Header */}
          <motion.div variants={fadeInUp as any} className="flex flex-row items-center justify-between mb-12 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-ag-green-950 bg-gray-50 px-4 py-2 rounded-full w-fit border border-gray-100">
              <Home className="w-2.5 h-2.5" />
              <span className="cursor-pointer hover:text-ag-lime transition-colors" onClick={() => onNavigate?.('home')}>Home</span>
              <ChevronRight className="w-2.5 h-2.5 opacity-50" />
              <span className="opacity-50">Media</span>
              <ChevronRight className="w-2.5 h-2.5 opacity-50" />
              <span className="text-ag-green-950">News</span>
            </div>
            
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-ag-green-950">
              06 Articles & Insights — 2025
            </div>
          </motion.div>

          {/* Banner Slider Area - Updated border radius to 0.7rem */}
          <motion.div variants={fadeInUp as any} className="relative w-full aspect-[21/9] md:aspect-[2.5/1] mb-20 group">
            <div className="absolute inset-0 rounded-[0.7rem] overflow-hidden bg-gray-100 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  src={FEATURED_SLIDES[currentSlide].image} 
                  alt="Featured News" 
                  className="w-full h-full object-cover grayscale"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-ag-green-950/20 mix-blend-multiply"></div>
              
              <div className="absolute bottom-0 left-0 h-1.5 bg-white/20 w-full">
                <motion.div 
                  key={currentSlide}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8, ease: "linear" }}
                  className="h-full bg-ag-lime"
                />
              </div>
            </div>
          </motion.div>

          {/* Featured Insights Accordion */}
          <motion.div variants={fadeInUp as any} className="w-full">
            <div className="flex justify-between items-center border-b border-ag-green-950 pb-4 mb-8">
              <h3 className="text-sm font-bold text-ag-green-950 uppercase tracking-[0.3em]">Featured Insights</h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest cursor-default select-none">[ Active Slider ]</span>
            </div>
            
            <div className="flex flex-col">
              {FEATURED_SLIDES.map((slide, i) => (
                <div 
                  key={slide.id} 
                  onMouseEnter={() => setCurrentSlide(i)}
                  onClick={() => onNavigate?.('news-detail', slide.id)}
                  className={`flex flex-col md:flex-row items-center justify-between py-10 border-b border-gray-100 group cursor-pointer transition-all duration-500 ${currentSlide === i ? 'bg-gray-50/50 px-6 -mx-6' : 'hover:bg-gray-50/30'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 flex-1">
                    <span className={`text-xs font-bold font-mono transition-colors ${currentSlide === i ? 'text-ag-lime' : 'text-gray-300'}`}>0{i+1}</span>
                    <div className="flex flex-col gap-1 max-w-3xl">
                       <div className="flex items-center gap-3 mb-1">
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${currentSlide === i ? 'text-ag-lime' : 'text-gray-400'}`}>{slide.category}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full" />
                          <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{slide.date}</span>
                       </div>
                       <h4 className={`text-xl md:text-3xl font-bold tracking-tight transition-all duration-300 ${currentSlide === i ? 'text-ag-green-950 translate-x-2' : 'text-gray-400 group-hover:text-ag-green-950'}`}>
                        {slide.title}
                       </h4>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-4 transition-all duration-500 ${currentSlide === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ag-lime">READ</span>
                    <div className="w-10 h-10 rounded-full bg-ag-lime flex items-center justify-center text-white shadow-lg shadow-ag-lime/20">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 02. RECENT UPDATES GRID (Immersive Cards) */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-ag-green-950 tracking-tight">Recent Updates</h2>
            <p className="text-sm text-gray-400 font-medium">Browse our archives by topic or category.</p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="relative group">
              <button className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border border-gray-200 text-[11px] font-bold uppercase tracking-widest text-ag-green-950 hover:border-ag-lime transition-all shadow-sm">
                <Filter className="w-3.5 h-3.5" />
                Filter
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
            
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] border-l border-gray-200 pl-8">
              Showing 6 of 27
            </div>
          </div>
        </div>

        {/* Updated Grid with Immersive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => onNavigate?.('news-detail', article.id)}
              className="relative aspect-[4/5] rounded-[0.7rem] overflow-hidden group cursor-pointer transition-all duration-500 bg-white"
            >
              {/* Default View: Full Immersive Image */}
              <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover grayscale mix-blend-multiply opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ag-green-950/90 via-ag-green-950/40 to-ag-green-950/20" />
                
                {/* Immersive Text Overlays */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{article.category}</span>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
                      <Bookmark className="text-white w-4 h-4 stroke-[1.5]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 leading-tight tracking-tight">
                      {article.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed font-light text-sm line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover View: Editorial White Card */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col">
                <div className="h-[45%] overflow-hidden">
                   <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                     <Calendar className="w-3.5 h-3.5" />
                     {article.date}
                   </div>
                   <h3 className="text-xl font-bold text-ag-green-950 mb-3 leading-tight">
                     {article.title}
                   </h3>
                   <p className="text-sm text-gray-500 font-light leading-relaxed mb-6 line-clamp-2">
                     {article.excerpt}
                   </p>
                   <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-ag-lime">Read Insights</span>
                     <ArrowRight className="w-4 h-4 text-ag-lime" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-20 flex justify-center">
           <button className="group flex items-center gap-4 bg-white border border-gray-200 px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-ag-green-950 hover:bg-ag-green-950 hover:text-white transition-all duration-500 shadow-sm">
             View All Insights
             <div className="w-6 h-6 bg-ag-lime rounded-full flex items-center justify-center transition-transform group-hover:rotate-45">
                <Plus className="w-3 h-3 text-white" />
             </div>
           </button>
        </div>
      </section>

      {/* 03. NEWSLETTER CTA */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-ag-green-950 rounded-[3rem] p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-ag-lime/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-ag-lime w-6 h-6" />
              <span className="text-ag-lime text-[10px] font-bold uppercase tracking-[0.3em]">Stay Informed</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6 leading-tight">
              Get the latest PUE <br/> insights delivered.
            </h2>
            <p className="text-white/60 font-light leading-relaxed">
              Join 2,000+ infrastructure developers and investors receiving our bi-weekly deep dives into rural energy markets.
            </p>
          </div>
          <div className="relative z-10 w-full max-w-md">
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Work Email" 
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-8 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-ag-lime transition-all"
              />
              <button className="bg-ag-lime text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-ag-green-950 transition-all shadow-xl shadow-ag-lime/20">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default NewsPage;
