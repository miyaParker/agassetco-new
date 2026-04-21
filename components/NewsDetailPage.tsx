'use client';


import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, ArrowRight, Home, Share2 } from 'lucide-react';

interface NewsDetailPageProps {
  articleId?: number | string | null;
  onNavigate?: (page: any, id?: any) => void;
}

const ALL_ARTICLES = [
  {
    id: 1,
    category: "FINANCE",
    title: "Financing the Solar Transition in Rural Clusters",
    date: "March 12, 2025",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?q=80&w=2874&auto=format&fit=crop",
    content: `Logistics in Sub-Saharan Africa is undergoing a seismic shift. As fuel prices continue to fluctuate and urbanization accelerates, the demand for reliable, cost-effective last-mile delivery solutions has never been higher. AgAsset Co is proud to announce the closing of our Series A funding round, a pivotal moment in our mission to electrify the continent's commercial fleet.

    The round was led by Blackaion Capital, with participation from strategic infrastructure partners. This capital injection will directly fund the deployment of 500 new Productive Use hubs across five key states in Nigeria, creating a contiguous energy corridor from Lagos to Abuja.`,
    quote: "We are not just building charging points; we are building the internet of energy for logistics. Speed, reliability, and data are our currency.",
    author: "OBIORA OKOYE, CEO",
    subTitle: "Powering the AgAsset Ecosystem",
    subContent: "Central to this expansion is the rollout of our next-generation battery technology, optimized for the rigorous demands of commercial riders. The new capital allows us to scale production of the TANKVOLT T22-Pro, a purpose-built electric motorcycle designed for African roads.",
    lookingAhead: "With this funding, we are also launching our Rider Welfare Initiative, providing comprehensive health insurance and safety training for every rider on our platform. The future of mobility isn't just about technology; it's about the people who move our cities."
  },
  {
    id: "expansion",
    category: "EXPANSION",
    title: "Kenya Expansion Plans Finalized",
    date: "May 30, 2024",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2940&auto=format&fit=crop",
    content: `Logistics in Sub-Saharan Africa is undergoing a seismic shift. As fuel prices continue to fluctuate and urbanization accelerates, the demand for reliable, cost-effective last-mile delivery solutions has never been higher. Swap Station Mobility is proud to announce the closing of our Series A funding round, a pivotal moment in our mission to electrify the continent's commercial fleet.

    The round was led by Blackaion Capital, with participation from strategic infrastructure partners. This capital injection will directly fund the deployment of 500 new Swap Hubs across five key states in Nigeria, creating a contiguous energy corridor from Lagos to Abuja.`,
    quote: "We are not just building charging points; we are building the internet of energy for logistics. Speed, reliability, and data are our currency.",
    author: "OBIORA OKOYE, CEO",
    subTitle: "Powering the TankVolt Ecosystem",
    subContent: "Central to this expansion is the rollout of our next-generation battery technology, optimized for the rigorous demands of commercial riders. The new capital allows us to scale production of the TankVolt T22-Pro, a purpose-built electric motorcycle designed for African roads.",
    lookingAhead: "With this funding, we are also launching our Rider Welfare Initiative, providing comprehensive health insurance and safety training for every rider on our platform. The future of mobility isn't just about technology; it's about the people who move our cities."
  }
];

const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ articleId, onNavigate }) => {
  const article = ALL_ARTICLES.find(a => a.id === articleId) || ALL_ARTICLES[0];

  // Fix: Casting ease array to any to resolve framer-motion Variants type mismatch
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <div className="bg-white min-h-screen pb-32 pt-24 font-sans selection:bg-ag-lime selection:text-white">
      {/* Top Meta Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100">
        <button 
          onClick={() => onNavigate?.('news')}
          className="flex items-center gap-2 hover:text-ag-green-950 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> BACK TO NEWS
        </button>
        <span className="opacity-20">|</span>
        <span className="text-ag-green-950">{article.category}</span>
        <span className="opacity-20">|</span>
        <span>{article.date}</span>
        <span className="opacity-20 hidden md:inline">|</span>
        <button className="hidden md:flex items-center gap-2 hover:text-ag-green-950 transition-colors">
          <Share2 className="w-3.5 h-3.5" /> SHARE
        </button>
      </nav>

      {/* Title Section */}
      <header className="max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">
        <motion.h1 
          initial="hidden"
          animate="visible"
          variants={fadeInUp as any}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-ag-green-950 leading-[0.95] tracking-tighter"
        >
          {article.title}
        </motion.h1>
      </header>

      {/* Hero Image - Updated border radius to 0.7rem */}
      <section className="max-w-6xl mx-auto px-6 mb-20 md:mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="aspect-[21/9] rounded-[0.7rem] overflow-hidden shadow-2xl relative"
        >
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
          <div className="absolute inset-0 bg-ag-green-950/10 mix-blend-multiply" />
        </motion.div>
      </section>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-xl prose-ag-green max-w-none text-gray-600 font-light leading-relaxed text-xl">
          <p className="mb-12 first-letter:text-7xl first-letter:font-bold first-letter:text-ag-lime first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
            {article.content}
          </p>

          {/* Pull Quote */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp as any}
            className="my-16 md:my-24 pl-8 border-l-4 border-ag-lime bg-gray-50/50 py-10 pr-8 rounded-r-3xl"
          >
            <p className="text-2xl md:text-3xl font-bold text-ag-green-950 italic leading-snug mb-6">
              "{article.quote}"
            </p>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-ag-lime">— {article.author}</span>
          </motion.div>

          <h3 className="text-3xl font-bold text-ag-green-950 mb-8 tracking-tight">{article.subTitle}</h3>
          <p className="mb-12">
            {article.subContent}
          </p>
          <p className="mb-12">
            {article.lookingAhead}
          </p>
        </div>
      </article>

      {/* About Section - Matching Screenshot Reference */}
      <section className="bg-gray-50/50 py-24 border-y border-gray-100 mb-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 bg-ag-lime rounded-full" />
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-ag-green-950">About AgAsset Co</h3>
          </div>
          <p className="text-lg text-gray-500 font-light leading-relaxed mb-6">
            Founded to accelerate Africa’s transition to sustainable logistics, <strong className="text-ag-green-950">AgAsset Co</strong> is building the continent’s most resilient clean-energy infrastructure. By combining solar-integrated swapping hubs, automotive-grade battery technology, and real-time IoT telemetry, we provide a zero-downtime energy layer for commercial fleets. Committed to reducing carbon emissions and lowering operational costs, AgAsset Co empowers logistics operators to scale efficiently in high-growth urban markets. Recognized for our vertically integrated "Power-as-a-Service" model, we are redefining how African cities move.
          </p>
          <a href="https://www.agasset.co" className="text-sm font-bold text-ag-lime border-b border-ag-lime pb-1 hover:text-ag-green-950 hover:border-ag-green-950 transition-all">
            www.agasset.co
          </a>
        </div>
      </section>

      {/* Continue Reading - Matching Screenshot Reference */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-ag-green-950 mb-12 tracking-tight">Continue Reading</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "250th Swap Hub Deployed in Lagos Mainland", cat: "MILESTONES", date: "September 12, 2024", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop" },
             { title: "Strategic Partnership with Glovo Announced", cat: "PRESS RELEASE", date: "August 05, 2024", img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2940&auto=format&fit=crop" },
             { title: "Introducing the TANKVOLT T22-Pro", cat: "PRODUCT", date: "June 15, 2024", img: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?q=80&w=2787&auto=format&fit=crop" }
           ].map((item, idx) => (
             <div key={idx} className="group cursor-pointer">
                {/* Updated border radius to 0.7rem */}
                <div className="aspect-[16/10] rounded-[0.7rem] overflow-hidden mb-6 relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="eager" fetchPriority="high" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white px-3 py-1 rounded-full text-[9px] font-bold text-ag-green-950 uppercase tracking-widest">{item.cat}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                   <Calendar className="w-3 h-3" /> {item.date}
                </div>
                <h3 className="text-xl font-bold text-ag-green-950 leading-tight group-hover:text-ag-lime transition-colors">
                  {item.title}
                </h3>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default NewsDetailPage;
