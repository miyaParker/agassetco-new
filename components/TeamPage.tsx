'use client';


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronRight, Linkedin, ArrowUpRight, Plus, Minus, ArrowRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  img: string;
  linkedin: string;
}

const EXECUTIVE_TEAM: TeamMember[] = [
  { 
    id: 'exec1', 
    name: "Sarah Van Dorn", 
    title: "Chief Executive Officer", 
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    linkedin: "#"
  },
  { 
    id: 'exec2', 
    name: "Michael Abara", 
    title: "Technical Director", 
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
    linkedin: "#"
  },
  { 
    id: 'exec3', 
    name: "Elena Rossi", 
    title: "Chief Investment Officer", 
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
    linkedin: "#"
  }
];

const BOARD_TEAM: TeamMember[] = [
  { 
    id: 'board1', 
    name: "Dr. Tunde Ojo", 
    title: "Chairman", 
    img: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1887&auto=format&fit=crop",
    linkedin: "#"
  },
  { 
    id: 'board2', 
    name: "Claire Thompson", 
    title: "Non-Executive Director", 
    img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1886&auto=format&fit=crop",
    linkedin: "#"
  },
  { 
    id: 'board3', 
    name: "Jameson Pike", 
    title: "Venture Partner", 
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
    linkedin: "#"
  },
  { 
    id: 'board4', 
    name: "Fatima Yusuf", 
    title: "Impact Director", 
    img: "https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?q=80&w=1887&auto=format&fit=crop",
    linkedin: "#"
  },
  { 
    id: 'board5', 
    name: "Robert Lang", 
    title: "Strategic Advisor", 
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    linkedin: "#"
  }
];

const MEMBERS_TEAM: TeamMember[] = [
  { id: 'm1', name: "Korede Bello", title: "Operations Lead", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop", linkedin: "#" },
  { id: 'm2', name: "Aisha Mohammed", title: "Credit Analyst", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop", linkedin: "#" },
  { id: 'm3', name: "David Chen", title: "IoT Engineer", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop", linkedin: "#" },
  { id: 'm4', name: "Grace Onu", title: "Field Supervisor", img: "https://images.unsplash.com/photo-1598550874175-4d0fe4a2c943?q=80&w=1887&auto=format&fit=crop", linkedin: "#" },
  { id: 'm5', name: "Samuel Wright", title: "Asset Manager", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop", linkedin: "#" },
  { id: 'm6', name: "Blessing Okafor", title: "Partnerships", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop", linkedin: "#" },
  { id: 'm7', name: "Emanuel Silva", title: "Systems Dev", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop", linkedin: "#" },
  { id: 'm8', name: "Isabella Cruz", title: "Legal Counsel", img: "https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?q=80&w=1887&auto=format&fit=crop", linkedin: "#" }
];

const SECTIONS = [
  { id: 'executive', label: 'Executive' },
  { id: 'board', label: 'Board of Directors' },
  { id: 'members', label: 'Members' }
];

interface TeamPageProps {
  onNavigate?: (page: any) => void;
}

const TeamPage: React.FC<TeamPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState('executive');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 140;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  const imageEntrance = {
    hidden: { opacity: 0, scale: 1.08 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-ag-lime selection:text-white">
      
      {/* 01. HERO SECTION */}
      <section className="pt-32 pb-24 bg-white overflow-hidden px-6">
        <motion.div 
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Breadcrumbs */}
          <motion.div variants={fadeInUp as any} className="flex flex-row items-center justify-between mb-12 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-ag-green-950 bg-gray-50 px-4 py-2 rounded-full w-fit border border-gray-100">
              <Home className="w-2.5 h-2.5" />
              <span className="cursor-pointer hover:text-ag-lime transition-colors" onClick={() => onNavigate?.('home')}>Home</span>
              <ChevronRight className="w-2.5 h-2.5 opacity-50" />
              <span className="opacity-50">Company</span>
              <ChevronRight className="w-2.5 h-2.5 opacity-50" />
              <span className="text-ag-green-950">The Team</span>
            </div>
            
            <div className="text-sm font-bold uppercase tracking-[0.3em] text-ag-green-950">
              02 Corporate Governance & Leadership — 2025
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div variants={imageEntrance as any} className="relative w-full aspect-[21/9] md:aspect-[3/1] mb-16 group">
            <div className="absolute inset-0 rounded-[0.7rem] overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop"
                alt="AgAsset Team"
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-ag-green-950/10 group-hover:bg-transparent transition-colors duration-1000 mix-blend-multiply"></div>
            </div>
            
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 flex items-center justify-center z-10 pointer-events-none overflow-visible">
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 0.8, x: 0 }}
                transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="rotate-90 whitespace-nowrap text-white text-5xl md:text-8xl font-bold tracking-tighter select-none origin-center"
              >
                LEADERSHIP
              </motion.div>
            </div>
          </motion.div>

          {/* Title & Description Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-16">
            <div className="lg:col-span-5 pt-2">
              <motion.p 
                variants={fadeInUp as any}
                className="text-lg md:text-2xl text-gray-500 font-light leading-relaxed max-w-md mb-8"
              >
                A multi-disciplinary team of veterans spanning energy, agriculture, finance, and logistics. We are unified by a single mandate: bridging the productive use gap.
              </motion.p>
              <motion.div variants={fadeInUp as any} className="flex items-center gap-4 text-base font-bold text-ag-green-950/40 uppercase tracking-widest">
                <span>Infrastructure</span>
                <span className="w-1 h-1 bg-ag-lime rounded-full"></span>
                <span>Operations</span>
                <span className="w-1 h-1 bg-ag-lime rounded-full"></span>
                <span>Impact</span>
              </motion.div>
            </div>

            <div className="lg:col-span-7 lg:text-right">
              <motion.h1 
                variants={fadeInUp as any}
                className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-ag-green-950 leading-[0.95] tracking-tighter"
              >
                THE VOICES <br/>
                OF <span className="text-ag-lime">EXECUTION.</span>
              </motion.h1>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 02. MAIN CONTENT WITH SIDEBAR */}
      <section className="max-w-7xl mx-auto px-6 mt-12 relative mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* STICKY SIDEBAR NAVIGATION */}
          <aside className="lg:col-span-3 hidden lg:block sticky top-48 self-start no-print">
            <div className="text-sm font-bold uppercase tracking-[0.25em] text-gray-400 border-b border-gray-100 pb-8 mb-10">
              Categories
            </div>
            
            <nav className="flex flex-col gap-0 relative">
              <div className="absolute left-[3px] top-0 bottom-0 w-px bg-gray-100" />
              
              {SECTIONS.map((section, i) => {
                const isActive = activeSection === section.id;
                return (
                  <a 
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => scrollToSection(e, section.id)}
                    className={`text-base font-bold uppercase tracking-widest transition-all duration-500 flex items-center gap-8 pl-1.5 py-6 relative group ${
                      isActive ? 'text-ag-green-950' : 'text-gray-300 hover:text-ag-green-950/70'
                    }`}
                  >
                    <div className={`absolute left-0 w-[7px] h-[7px] rounded-full z-10 transition-all duration-500 ${
                      isActive ? 'bg-ag-lime scale-100' : 'bg-transparent scale-0'
                    }`} />
                    
                    <span className={`text-sm transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                      0{i + 1}
                    </span>
                    <span className="relative">
                      {section.label}
                      {isActive && (
                        <motion.div 
                          layoutId="teamSidebarUnderline"
                          className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-ag-green-950"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </span>
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* MAIN TEAM GRIDS */}
          <div className="lg:col-span-9">
            <div className="space-y-40">
              
              {/* EXECUTIVE SECTION */}
              <article id="executive" className="scroll-mt-48">
                <SectionHeader 
                  number="01" 
                  category="Leadership" 
                  title={<>Executive <span className="text-ag-lime">Team.</span></>} 
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-12">
                  {EXECUTIVE_TEAM.map((member, i) => (
                    <TeamCard key={member.id} member={member} index={i} />
                  ))}
                </div>
              </article>

              {/* BOARD SECTION */}
              <article id="board" className="scroll-mt-48">
                <SectionHeader 
                  number="02" 
                  category="Governance" 
                  title={<>Board of <span className="text-ag-lime">Directors.</span></>} 
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-12">
                  {BOARD_TEAM.map((member, i) => (
                    <TeamCard key={member.id} member={member} index={i} />
                  ))}
                </div>
              </article>

              {/* MEMBERS SECTION */}
              <article id="members" className="scroll-mt-48">
                <SectionHeader 
                  number="03" 
                  category="Operations" 
                  title={<>Strategic <span className="text-ag-lime">Members.</span></>} 
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mt-12">
                  {MEMBERS_TEAM.map((member, i) => (
                    <TeamCard key={member.id} member={member} index={i} small />
                  ))}
                </div>
              </article>

            </div>
          </div>

        </div>
      </section>

      {/* 03. CTA FOOTER SECTION */}
      <section className="relative bg-ag-green-950 py-24 overflow-hidden no-print">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-sm font-bold text-ag-lime uppercase tracking-[0.5em] mb-10"
            >
              CAREERS & IMPACT
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] mb-12 max-w-4xl"
            >
              Build the future <br/> <span className="text-ag-lime italic font-serif">With Us.</span>
            </motion.h2>

            <motion.button 
              onClick={() => onNavigate?.('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-8 bg-white text-ag-green-950 px-10 py-6 rounded-full font-bold uppercase tracking-widest text-base hover:shadow-2xl transition-all duration-500"
            >
              View Open Roles
              <div className="w-8 h-8 bg-ag-green-950 rounded-full flex items-center justify-center text-white transition-all">
                <ArrowRight size={14} className="group-hover:-rotate-45 transition-transform" />
              </div>
            </motion.button>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ag-lime/5 rounded-full blur-[140px] pointer-events-none" />
      </section>

    </div>
  );
};

interface TeamCardProps {
  member: TeamMember;
  index: number;
  small?: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, index, small = false }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group cursor-pointer"
    >
      <div className="aspect-[3/4] overflow-hidden rounded-[0.7rem] mb-6 bg-gray-100 relative shadow-md group-hover:shadow-xl transition-all duration-500">
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
          loading="eager"
          fetchPriority="high"
        />
        
        {/* LinkedIn Reveal Overlay */}
        <div className="absolute inset-0 bg-ag-green-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <motion.a 
              href={member.linkedin}
              whileHover={{ scale: 1.15 }}
              className="w-12 h-12 rounded-full bg-white text-ag-green-950 flex items-center justify-center shadow-2xl hover:bg-ag-lime hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin size={20} strokeWidth={2} />
            </motion.a>
        </div>
      </div>
      <h3 className={`${small ? 'text-2xl' : 'text-3xl'} font-bold text-ag-green-950 group-hover:text-ag-lime transition-colors duration-300`}>
        {member.name}
      </h3>
      <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mt-1">
        {member.title}
      </p>
    </motion.div>
  );
};

export default TeamPage;
