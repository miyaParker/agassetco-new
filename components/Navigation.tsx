'use client';


import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ArrowRight, Building2, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface NavigationProps {
  onNavigate?: (page: 'home' | 'about' | 'team' | 'solutions' | 'portfolio' | 'news' | 'contact' | 'terms' | 'privacy' | 'news-detail' | 'project-detail') => void;
  currentPage?: 'home' | 'about' | 'team' | 'solutions' | 'portfolio' | 'news' | 'contact' | 'terms' | 'privacy' | 'news-detail' | 'project-detail';
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentPage = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCompanyHovered, setIsCompanyHovered] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Transparent style is for Home and Project Detail pages when at the very top.
  const isTransparentCapablePage = currentPage === 'home' || currentPage === 'project-detail';
  const isLightMode = isScrolled || !isTransparentCapablePage || isCompanyHovered;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleLinkClick = (e: React.MouseEvent, page: any) => {
    e.preventDefault();
    if (onNavigate) onNavigate(page);
    setMobileMenuOpen(false);
    setIsCompanyHovered(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home', link: '/' },
    { id: 'company', label: 'Company', hasMega: true },
    { id: 'solutions', label: 'Solutions', link: '/solutions' },
    { id: 'portfolio', label: 'Portfolio', link: '/portfolio' },
    { id: 'news', label: 'News', link: '/news' }
  ];

  const companySubLinks = [
    { id: 'about', label: 'About Us', desc: 'Our mission, mandate and history.', icon: Building2 },
    { id: 'team', label: 'The Team', desc: 'Meet the industry veterans driving AgAsset.', icon: Users }
  ];

  return (
    <>
      <nav 
        onMouseLeave={() => setIsCompanyHovered(false)}
        className={`fixed top-0 left-0 w-full z-[999] px-6 transition-all duration-700 ease-in-out font-sans ${
          isLightMode 
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200/50 py-3' 
            : 'bg-transparent py-6 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
            
            {/* <button onClick={(e) => handleLinkClick(e, 'home')} className="flex items-center gap-2 shrink-0 relative z-50 outline-none group">
              <div 
                className={`w-8 h-8 flex items-center justify-center rounded-full shadow-sm transition-all duration-500 ${
                  isLightMode ? 'bg-ag-green-950' : 'bg-ag-lime'
                }`}
              >
                 <svg viewBox="0 0 100 100" className="w-5 h-5">
                    <path 
                      className={`transition-all duration-500 ${
                        isLightMode ? 'fill-white' : 'fill-ag-green-950'
                      }`}
                      d="M50 0 L60 10 L70 5 L80 15 L75 25 L85 30 L95 25 L100 35 L90 45 L95 55 L100 60 L90 70 L80 65 L70 75 L60 70 L50 80 L40 70 L30 75 L20 65 L10 70 L0 60 L5 55 L10 45 L0 35 L5 25 L15 30 L25 25 L20 15 L30 5 L40 10 Z" 
                    />
                 </svg>
              </div>
              <span 
                className={`text-xl font-bold tracking-tight transition-all duration-500 ${
                  isLightMode ? 'text-ag-green-950' : 'text-white'
                }`}
              >
                AgAsset<span className="text-ag-lime">Co</span>
              </span>
            </button> */}

             <Link href="/" className="flex items-center shrink-0 relative z-50 outline-none group">
              <Image
                src={isLightMode ? '/logo.svg' : '/logo-white.svg'}
                alt="AgAsset Co"
                width={140}
                height={64}
                className={`w-auto transition-all duration-500 ${isLightMode ? 'h-10 lg:h-14' : 'h-9 lg:h-14'}`}
                priority
              />
            </Link>

            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
               <div 
                 className={`rounded-full px-8 py-2.5 flex items-center gap-8 shadow-sm border transition-all duration-500 ${
                   isLightMode 
                     ? 'bg-gray-100/30 border-gray-200/50' 
                     : 'bg-white/5 border-white/10 backdrop-blur-md'
                 }`}
               >
                  {navLinks.map((link) => (
                    <div 
                      key={link.id}
                      className="relative"
                      onMouseEnter={() => link.hasMega && setIsCompanyHovered(true)}
                    >
                      <a 
                        href={link.link}
                        className={`text-sm font-semibold relative group transition-all duration-300 flex items-center gap-1 ${
                          (currentPage === link.id || (link.hasMega && (currentPage === 'about' || currentPage === 'team')))
                            ? 'text-ag-lime' 
                            : (isLightMode ? 'text-ag-green-950 hover:text-ag-lime' : 'text-white/80 hover:text-white')
                        }`}
                      >
                        {link.label}
                        {link.hasMega && (
                          <ChevronDown size={14} className={`transition-transform duration-300 ${isCompanyHovered ? 'rotate-180' : ''}`} />
                        )}
                        <span className={`absolute -bottom-1 left-0 w-0 h-[1.5px] bg-ag-lime transition-all duration-300 group-hover:w-full ${
                          (currentPage === link.id || (link.hasMega && (currentPage === 'about' || currentPage === 'team'))) ? 'w-full' : ''
                        }`}></span>
                      </a>
                    </div>
                  ))}
               </div>
            </div>

            <div className="hidden md:block shrink-0 relative z-50">
              <button 
                onClick={(e) => handleLinkClick(e, 'contact')}
                className={`px-6 py-2.5 rounded-full text-base font-bold tracking-widest uppercase shadow-lg transition-all duration-500 hover:scale-105 active:scale-95 ${
                  isLightMode
                    ? 'bg-ag-green-950 text-white hover:bg-ag-lime' 
                    : 'bg-white text-ag-green-950 hover:bg-ag-lime hover:text-ag-green-950'
                }`}
              >
                Contact Us
              </button>
            </div>

            <button 
              className="lg:hidden shrink-0 relative z-50 outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div 
                className={`p-2 rounded-full border transition-all duration-300 ${
                   isLightMode 
                     ? 'bg-gray-100/50 border-gray-200 text-ag-green-950' 
                     : 'bg-white/10 border-white/20 text-white backdrop-blur-md'
                }`}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </div>
            </button>
        </div>

        {/* Mega Menu Overlay */}
        <AnimatePresence>
          {isCompanyHovered && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 w-full bg-white shadow-xl border-b border-gray-100 no-print hidden lg:block"
            >
              <div className="max-w-7xl mx-auto py-12 px-6">
                <div className="grid grid-cols-12 gap-12">
                  <div className="col-span-4 border-r border-gray-100 pr-12">
                    <h3 className="text-ag-green-950 text-2xl font-bold tracking-tight mb-4">Our Company</h3>
                    <p className="text-gray-500 font-light leading-relaxed mb-8">
                      We act as a specialized bridge between energy access and rural economic productivity across Sub-Saharan Africa.
                    </p>
                    <button 
                      onClick={(e) => handleLinkClick(e, 'about')}
                      className="text-base font-bold text-ag-lime uppercase tracking-[0.2em] flex items-center gap-2 hover:text-ag-green-950 transition-colors group"
                    >
                      Institutional Overview <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  
                  <div className="col-span-8">
                    <div className="grid grid-cols-2 gap-6">
                      {companySubLinks.map((item) => (
                        <button
                          key={item.id}
                          onClick={(e) => handleLinkClick(e, item.id as any)}
                          className="flex items-start gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 text-left group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-ag-green-950 group-hover:bg-ag-lime group-hover:text-white transition-colors duration-300">
                            <item.icon size={24} strokeWidth={1.5} />
                          </div>
                          <div>
                            <h4 className="font-bold text-ag-green-950 mb-1 group-hover:text-ag-lime transition-colors">{item.label}</h4>
                            <p className="text-lg text-gray-500 font-light">{item.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                       <div className="flex items-center gap-6">
                          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Global Reach:</span>
                          <div className="flex gap-4">
                            {['Lagos', 'Nairobi', 'London'].map(city => (
                              <span key={city} className="text-base font-bold text-ag-green-950">{city}</span>
                            ))}
                          </div>
                       </div>
                       <p className="text-sm font-bold text-ag-lime uppercase tracking-[0.2em]">Energy for Growth</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-ag-green-950 fixed inset-0 z-40 pt-32 px-6 flex flex-col items-center"
          >
            <div className="flex flex-col gap-8 items-center justify-center font-sans h-full pb-20 w-full">
              {['home', 'about', 'team', 'solutions', 'portfolio', 'news', 'contact'].map((page) => (
                <motion.a 
                  key={page}
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className={`text-4xl font-bold tracking-tighter capitalize ${currentPage === page ? 'text-ag-lime' : 'text-white'}`}
                  onClick={(e) => handleLinkClick(e, page as any)}
                >
                  {page.replace('-', ' ')}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
