'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Warehouse, Coins, Settings } from 'lucide-react';

const AboutSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  // Parallax Effect Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 50]);
  const cardY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  const slides = [
    {
      id: 'deploy',
      title: 'Deploy',
      icon: Warehouse,
      desc: "Infrastructure that lasts beyond the first harvest. We build resilient systems tailored for rural environments."
    },
    {
      id: 'finance',
      title: 'Finance',
      icon: Coins,
      desc: "Capital that understands the rhythm of agriculture. Flexible terms aligned with harvest cycles."
    },
    {
      id: 'manage',
      title: 'Manage',
      icon: Settings,
      desc: "Operations that ensure assets never go dark. 24/7 monitoring and rapid response maintenance teams."
    }
  ];

  const backgroundImage = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center bg-gray-50 relative overflow-hidden z-20 snap-start py-24 md:py-0">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Main Grid - Text aligned bottom (items-end) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Content with Parallax & Entrance */}
          <motion.div 
            style={{ y: textY }} 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div>
              <span className="text-sm font-bold text-ag-lime uppercase tracking-widest mb-4 block leading-none">
                Our Mandate
              </span>
              <h2 className="text-4xl md:text-5xl font-medium text-ag-green-950 leading-tight tracking-tight mb-6">
                We drive rural economic growth by financing productive assets powered by <span className="text-ag-lime">renewable energy.</span>
              </h2>
              <p className="text-lg text-gray-500 font-light leading-relaxed max-w-md">
                Bridging the gap between energy access and income generation through an integrated, data-driven approach.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Single Slider Card with Parallax & Entrance */}
          <motion.div 
            style={{ y: cardY }}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.3, 1], delay: 0.1 }}
            className="w-full max-w-md mx-auto lg:mr-0 h-[65vh] min-h-[500px]"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-ag-green-900/20 bg-ag-green-950">
                
                {/* Fixed Background Image Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={backgroundImage}
                        alt="Agricultural Landscape"
                        className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80"
                        loading="eager"
                        fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ag-green-950 via-ag-green-900/50 to-ag-green-900/30"></div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 p-10 h-full flex flex-col justify-center">
                    
                    {/* Icon */}
                    <div className="mb-6 flex justify-start">
                         <AnimatePresence mode="wait">
                            <motion.div
                                key={`icon-${currentSlide}`}
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                                className="w-14 h-14 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-md bg-white/10 text-white"
                            >
                                {React.createElement(slides[currentSlide].icon, {
                                    className: "w-6 h-6 stroke-[1.5]"
                                })}
                            </motion.div>
                         </AnimatePresence>
                    </div>

                    {/* Main Title */}
                    <div className="mb-6">
                        <AnimatePresence mode="wait">
                            <motion.h3 
                                key={`title-${currentSlide}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="text-[2.25rem] font-medium tracking-tight text-white"
                            >
                                {slides[currentSlide].title}
                            </motion.h3>
                        </AnimatePresence>
                    </div>

                    {/* Divider Line */}
                    <div className="w-12 h-1 mb-8 bg-white/80"></div>

                    {/* Description */}
                    <div className="mb-auto">
                        <AnimatePresence mode="wait">
                             <motion.p 
                                key={`desc-${currentSlide}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-lg font-light leading-relaxed text-white/90"
                            >
                                {slides[currentSlide].desc}
                             </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Pagination Indicators */}
                    <div className="flex items-center gap-3 mt-8">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`transition-all duration-300 rounded-full ${
                                    currentSlide === index 
                                        ? 'w-12 h-1.5 bg-white' 
                                        : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Premium Separator: Light Theme */}
      <div className="absolute bottom-0 left-0 w-full flex items-center justify-center z-40">
        <div className="h-px w-full max-w-[95%] bg-gradient-to-r from-transparent via-ag-green-950/10 to-transparent" />
        <div className="absolute w-1.5 h-1.5 rotate-45 bg-ag-green-950 opacity-20" />
      </div>
    </section>
  );
};

export default AboutSlider;