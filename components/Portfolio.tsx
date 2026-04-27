'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Plus, Minus, CheckCircle2 } from 'lucide-react';
import SectionHeader from './SectionHeader';
import type { OurProjectsSection } from '@/lib/strapi/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

function mediaUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path}`;
}

const SDG_COLORS: Record<number, string> = {
  1: "#E5243B", 2: "#DDA63A", 7: "#FDB713", 8: "#A21942",
  9: "#FD6925", 12: "#BF8B2E", 13: "#3F7E44",
};

interface PortfolioProps {
  data?: OurProjectsSection | null;
  onNavigate?: (page: any, id?: any) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ data, onNavigate }) => {
  const projects = data?.project ?? [];
  const [activeId, setActiveId] = useState<number | null>(projects[0]?.id ?? null);

  return (
    <section id="portfolio" className="bg-white py-24 relative snap-start z-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="05"
          category={data?.sectionLabel ?? 'Our Projects'}
          title={data?.title ?? 'Deploying capital where it matters most.'}
        />

        <div className="flex flex-col border-t border-gray-200">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              isOpen={activeId === project.id}
              onClick={() => setActiveId(activeId === project.id ? null : project.id)}
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
  project: OurProjectsSection['project'][0];
  index: number;
  isOpen: boolean;
  onClick: () => void;
}

const ProjectRow: React.FC<ProjectRowProps> = ({ project, index, isOpen, onClick }) => {
  const indexLabel = String(index + 1).padStart(2, '0');

  return (
    <div className="border-b border-gray-200 group">
      <div
        onClick={onClick}
        className="w-full py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left group-hover:bg-gray-50/50 transition-colors duration-300 px-2 cursor-pointer"
      >
        <div className="flex items-baseline gap-6 md:gap-12">
          <span className="text-sm font-bold text-gray-300 font-sans hidden md:block">
            / {indexLabel}
          </span>
          <h3 className={`text-2xl md:text-4xl font-medium tracking-tight transition-colors duration-300 ${isOpen ? 'text-ag-lime' : 'text-ag-green-950 group-hover:text-ag-green-700'}`}>
            {project.title}
          </h3>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-8 pl-0 md:pl-4">
          <div className="flex items-center gap-6 text-sm text-gray-500 font-medium tracking-wide">
            <span>{project.country}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>{project.year}</span>
          </div>

          <div className="hidden md:block w-px h-6 bg-gray-200 mx-2" />

          <div className="flex gap-2 flex-wrap">
            {project.categories.slice(0, 2).map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-ag-green-950 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {project.slug && (
            <Link
              href={`/portfolio/${project.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="md:flex hidden items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-ag-lime transition-colors"
            >
              View Project
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          )}
          <div className="md:ml-2 text-gray-400 group-hover:text-ag-green-950 transition-colors">
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
                {/* Images */}
                <div className="lg:col-span-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                    {project.images[0] && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative rounded-[0.7rem] overflow-hidden group/image aspect-[4/3]"
                      >
                        <img
                          src={mediaUrl(project.images[0].url)}
                          alt={project.images[0].alternativeText ?? project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group/image:scale-110"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-ag-green-950/10 group/image:bg-transparent transition-colors duration-300" />
                      </motion.div>
                    )}
                    <div className="flex flex-col gap-4">
                      {project.images.slice(1, 3).map((img, i) => (
                        <motion.div
                          key={img.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (i + 1) * 0.1 }}
                          className="relative rounded-[0.7rem] overflow-hidden group/image flex-1 min-h-[160px]"
                        >
                          <img
                            src={mediaUrl(img.url)}
                            alt={img.alternativeText ?? project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group/image:scale-110"
                            loading="eager"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-5 flex flex-col justify-between py-2">
                  <div className="space-y-10">
                    <div>
                      <h4 className="text-[10px] font-bold text-ag-lime uppercase tracking-[0.2em] mb-3">Challenge</h4>
                      <p className="text-sm text-gray-500 font-light leading-relaxed">{project.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-ag-lime uppercase tracking-[0.2em] mb-3">Solution</h4>
                      <p className="text-sm text-gray-500 font-light leading-relaxed">{project.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-ag-lime uppercase tracking-[0.2em] mb-3">Core Impact</h4>
                      <ul className="space-y-2">
                        {project.core_impact.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-ag-green-950 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-ag-lime shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-12 flex items-center justify-between pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mr-2">SDG Impact:</span>
                      {project.sdg_impact.map((sdg) => (
                        <div
                          key={sdg}
                          className="w-8 h-8 rounded flex items-center justify-center text-white text-[10px] font-bold shadow-sm hover:scale-110 transition-transform cursor-help"
                          style={{ backgroundColor: SDG_COLORS[sdg] ?? '#ccc' }}
                          title={`SDG Goal ${sdg}`}
                        >
                          {sdg}
                        </div>
                      ))}
                    </div>

                    {project.slug && (
                      <Link
                        href={`/portfolio/${project.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 text-[10px] font-bold text-ag-green-950 uppercase tracking-[0.25em] flex items-center gap-2 hover:text-ag-lime transition-all group/btn"
                      >
                        Full Case Study
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </Link>
                    )}
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
