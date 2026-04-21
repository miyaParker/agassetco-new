'use client';


import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  /* Updated union to include news-detail and other missing pages to stay consistent with App.tsx */
  onNavigate?: (page: 'home' | 'about' | 'solutions' | 'portfolio' | 'news' | 'contact' | 'terms' | 'privacy' | 'news-detail' | 'cookie-policy') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent, page: any) => {
    e.preventDefault();
    if (onNavigate) onNavigate(page);
  };

  return (
    <footer className="bg-white text-ag-green-950 pt-24 pb-8 border-t border-gray-200 snap-start">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. Top Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          
          {/* Branding Column */}
          <div className="col-span-1 md:col-span-1 pr-8">
            <div className="flex items-end gap-1 mb-6 select-none cursor-pointer" onClick={(e) => handleLinkClick(e, 'home')}>
               {/* <span className="text-3xl font-bold tracking-tighter text-ag-green-950 leading-none">
                 AgAsset<span className="text-ag-lime">Co</span>
               </span> */}
               <Image
                src="/logo.svg"
                alt="AgAsset Co"
                width={140}
                height={64}
                className={`w-auto transition-all duration-500 h-10 lg:h-14`}
                priority
              />
               <div className="relative w-8 h-8 -mb-1 ml-1">
                 <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none">
                    <circle cx="50" cy="50" r="25" stroke="#0F5132" strokeWidth="8" />
                    <path d="M50 15 V10 M50 90 V85 M15 50 H10 M85 50 H90" stroke="#0F5132" strokeWidth="8" strokeLinecap="round" />
                    <path d="M25 25 L22 22 M78 78 L75 75 M25 75 L22 78 M78 25 L75 22" stroke="#0F5132" strokeWidth="8" strokeLinecap="round" />
                    <path d="M50 50 Q 50 20 30 10" stroke="#0F5132" strokeWidth="6" strokeLinecap="round" />
                    <path d="M50 50 Q 50 15 70 5" stroke="#0F5132" strokeWidth="6" strokeLinecap="round" />
                    <path d="M40 30 Q 30 25 35 15" stroke="#0F5132" strokeWidth="4" strokeLinecap="round" />
                    <path d="M60 25 Q 70 20 65 10" stroke="#0F5132" strokeWidth="4" strokeLinecap="round" />
                 </svg>
               </div>
            </div>
            <p className="text-lg text-gray-400 leading-relaxed mb-6 font-medium">
              A wholly owned subsidiary of <strong className="text-ag-green-950">Agronomie</strong>.
            </p>
            <div className="text-base font-bold uppercase tracking-widest text-gray-300">
               Lagos • Nairobi
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold mb-6 text-base uppercase tracking-widest text-gray-400">Company</h4>
            <ul className="space-y-4 text-lg font-medium">
              {[
                { name: 'About Us', page: 'about' },
                { name: 'Portfolio', page: 'portfolio' },
                { name: 'Solutions', page: 'solutions' },
                { name: 'Insights', page: 'news' },
                { name: 'Contact', page: 'contact' }
              ].map(item => (
                <li key={item.name}>
                  <a href="#" onClick={(e) => handleLinkClick(e, item.page)} className="hover:text-ag-lime transition-colors flex items-center gap-2 group">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold mb-6 text-base uppercase tracking-widest text-gray-400">Solutions</h4>
            <ul className="space-y-4 text-lg font-medium">
              {['Lease-to-Own', 'PUE Financing', 'Asset Management', 'Developer Portal'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-ag-lime transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 3 */}
          <div>
             <h4 className="font-bold mb-6 text-base uppercase tracking-widest text-gray-400">Connect</h4>
             <ul className="space-y-4 text-lg font-medium">
               {['LinkedIn', 'Twitter / X', 'Medium'].map(item => (
                 <li key={item}>
                   <a href="#" className="flex items-center gap-2 hover:text-ag-lime transition-colors group">
                     {item}
                     <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </a>
                 </li>
               ))}
             </ul>
          </div>

        </div>

        {/* 2. Standardized Footer Line & Signature */}
        <div className="w-full">
           {/* Line matching section title lines width and color */}
           <div className="w-full h-px bg-gray-200 mb-8" />
           
           <h1 className="text-xl font-bold tracking-widest text-ag-green-950 w-full text-center md:text-left select-none uppercase mb-8">
              ©2025 — AGASSETCO
           </h1>
        </div>

        {/* 3. Bottom Utility Row */}
        {/* <div className="flex flex-col md:flex-row justify-between items-center text-base font-bold text-gray-400 uppercase tracking-widest mt-4">
           <div className="flex gap-8">
              <a href="#" onClick={(e) => handleLinkClick(e, 'privacy')} className="hover:text-ag-green-950 transition-colors">Privacy Policy</a>
              <a href="#" onClick={(e) => handleLinkClick(e, 'terms')} className="hover:text-ag-green-950 transition-colors">Terms</a>
              <a href="#" onClick={(e) => handleLinkClick(e, 'cookie-policy')} className="hover:text-ag-green-950 transition-colors">Cookies</a>
           </div>
           <div className="mt-4 md:mt-0 tracking-[0.2em]">
              Energy for Growth
           </div>
        </div> */}


             <div className="flex flex-col md:flex-row md:justify-between items-center text-sm font-bold text-gray-400 uppercase md:tracking-widest mt-4">
           <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-ag-green-950 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-ag-green-950 transition-colors">Terms</Link>
              <Link href="/cookie-policy" className="hover:text-ag-green-950 transition-colors">Cookie Policy</Link>
           </div>
           <div className="mt-4 md:mt-0 tracking-[0.2em]">
              Energy for Growth
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
