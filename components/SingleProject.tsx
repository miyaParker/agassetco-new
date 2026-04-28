'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { 
  ArrowUpRight, 
  Download, 
  CheckCircle2, 
  Zap, 
  Activity, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Briefcase,
  Layers,
  Fuel,
  Cog,
  ChevronLeft,
  Droplets,
  ChevronRight,
  Home,
  Users,
  TrendingUp,
  Plus,
  Minus,
  Info
} from 'lucide-react';
import SectionHeader from './SectionHeader';
import type { ProjectDetail } from '@/lib/strapi';

// --- DATA ---

const PROJECTS_DATA: Record<string, any> = {
  '01': {
    id: 'NG-JIG-001',
    title: 'Jigawa Rice Milling Hub.',
    location: 'Phase 1 • Gwaram LGA, Jigawa State',
    heroImage: 'https://images.unsplash.com/photo-1595838788863-29a377d0a7d5?q=80&w=2874&auto=format&fit=crop',
    structure: 'Lease-to-Own',
    partner: 'Grid Dev Co',
    date: 'Q3 2024',
    challenge: 'Gwaram processing clusters relied exclusively on fossil fuels. Diesel costs exceeding ₦1,200/liter eroded SME margins by 45%. Meanwhile, the local mini-grid suffered from low daytime utilization, threatening its long-term viability.',
    solution: 'AgAsset Co deployed 5 industrial-grade electric rice hullers through a lease-to-own structure. These machines act as Anchor Loads, providing the grid with consistent daytime demand while slashing energy costs for the processors.',
    outcome: '100% clean energy transition across the hub. Average processor income has increased by 35% within the first 6 months of operation.',
    totalAssetValue: '₦245,000,000',
    beneficiaries: '15 SMEs',
    spv: 'AgAsset SPV-01',
    specs: [
        { label: "Financing Model", val: "Lease-to-Own", sub: "24 Month Term", icon: Briefcase, details: "A structured financing arrangement where SMEs pay off the asset through daily or weekly installments aligned with their production cycles. Title transfers upon final payment." },
        { label: "Credit Enhancement", val: "IoT Lockout", sub: "20% Down-payment", icon: ShieldCheck, details: "Automated risk mitigation via integrated firmware that allows for remote asset immobilization in the event of default, reducing the need for physical collateral." },
        { label: "Current Ownership", val: "AgAsset Co", sub: "Special Purpose Vehicle", icon: Layers, details: "Assets are held within a Ring-Fenced SPV to ensure investor protection and balance sheet optimization during the repayment lifecycle." },
        { label: "Equipment Profile", val: "5x 10HP Hullers", sub: "Industrial Grade", icon: Cog, details: "Equipped with high-efficiency copper-wound motors designed for continuous operation in high-temperature environments, maximizing throughput." },
        { label: "Grid Integration", val: "3-Phase AC", sub: "Smart Metered Hub", icon: Zap, details: "Fully integrated into the local mini-grid with smart metering that allows for real-time load synchronization and daytime energy optimization." },
        { label: "Daily Runtime", val: "6.5 Hours", sub: "Peak Solar Optimized", icon: Clock, details: "Operational schedule curated to coincide with peak photovoltaic generation, minimizing strain on battery storage and ensuring lowest energy costs." },
    ],
    metrics: [
        { to: 35, suffix: "%", label: "Income Increase", desc: "Net growth in processor profit margins.", icon: TrendingUp },
        { to: 4.5, suffix: "T", label: "Daily Output", desc: "Tons of rice processed per single shift.", icon: Cog },
        { to: 12.5, suffix: "k", label: "Fuel Displaced", desc: "Liters of diesel removed from the cycle.", icon: Fuel },
        { to: 15, suffix: "", label: "Jobs Created", desc: "New direct processing and logistics roles.", icon: Users }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1625246333195-58197bd47f3b?q=80&w=2940&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2940&auto=format&fit=crop'
    ],
    timeline: [
        { date: 'Jan 2024', title: 'Origination', desc: 'Feasibility study and credit vetting.' },
        { date: 'Apr 2024', title: 'Deployment', desc: 'Technical installation of huller units.' },
        { date: 'Oct 2024', title: 'Management', desc: 'Uptime: 99.2% | Repayment: On-Track.' }
    ]
  },
  '03': {
    id: 'NG-ELE-003',
    title: 'Eleuma PUE Hub.',
    location: 'Multi-Site Deployment • Nigeria',
    heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2940&auto=format&fit=crop',
    structure: 'Lease-to-Own',
    partner: 'Eleuma',
    date: 'Q1 2025',
    challenge: 'In many emerging markets, operators of income-generating activities are hindered by labor-intensive manual processes or expensive diesel-powered machinery. These traditional methods result in significant time loss and limited productivity, stifling the economic growth of rural communities and operators.',
    solution: 'The project deploys Productive Use Equipment (PUE), such as agricultural millers and water pumps, powered by renewable energy sources like solar mini-grids. By switching to electric sources, operators significantly reduce labor and processing time while enhancing productivity, output capacity, and daily revenue.',
    outcome: 'Two PUE units deployed across two sites with ₦70m in structured lease-to-own financing. Operators achieved a 5x increase in daily output and revenue within the first quarter of operation.',
    totalAssetValue: '₦70,000,000',
    beneficiaries: '2 Operator Sites',
    spv: 'AgAsset SPV-03',
    specs: [
        { label: "Financing Model", val: "Lease-to-Own", sub: "24 Month Term", icon: Briefcase, details: "A structured financing arrangement where operators pay off equipment through installments aligned with their production cycles. Title transfers upon final payment." },
        { label: "Credit Enhancement", val: "IoT Lockout", sub: "20% Down-payment", icon: ShieldCheck, details: "Automated risk mitigation via integrated firmware allowing remote asset immobilization in the event of default, reducing the need for physical collateral." },
        { label: "Current Ownership", val: "AgAsset Co", sub: "Special Purpose Vehicle", icon: Layers, details: "Assets are held within a ring-fenced SPV to ensure investor protection and balance sheet optimization during the repayment lifecycle." },
        { label: "Equipment Profile", val: "Millers & Pumps", sub: "2 PUE Units", icon: Cog, details: "Electric agricultural millers and water pumps replacing diesel-powered equivalents, engineered for continuous operation on solar mini-grid power supply." },
        { label: "Energy Source", val: "Solar Mini-Grid", sub: "Off-Grid Powered", icon: Zap, details: "Equipment integrated into existing solar mini-grid infrastructure, providing consistent clean energy and acting as anchor productive loads for daytime generation." },
        { label: "Daily Runtime", val: "8 Hours", sub: "Peak Solar Optimized", icon: Clock, details: "Operational schedule curated to coincide with peak photovoltaic generation, minimizing battery storage strain and ensuring the lowest effective energy cost." },
    ],
    metrics: [
        { to: 5, suffix: "x", label: "Output Increase", desc: "Increase in daily processing output and revenue per operator.", icon: TrendingUp },
        { to: 70, suffix: "m", label: "Financing (₦)", desc: "Total lease-to-own financing deployed across both sites.", icon: Cog },
        { to: 2, suffix: "", label: "Sites Active", desc: "PUE units commissioned across two operator locations.", icon: Users },
        { to: 100, suffix: "%", label: "Diesel Displaced", desc: "Full transition from fossil fuel to solar-powered operations.", icon: Fuel },
    ],
    gallery: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2940&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1625246333195-58197bd47f3b?q=80&w=2940&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2940&auto=format&fit=crop'
    ],
    timeline: [
        { date: 'Q3 2024', title: 'Origination', desc: 'Feasibility study and equipment vendor selection.' },
        { date: 'Q1 2025', title: 'Deployment', desc: 'Installation of PUE units across two operator sites.' },
        { date: 'Present', title: 'Operations', desc: 'Output tracking, repayment monitoring, and utilization optimization.' }
    ]
  },
  '02': {
    id: 'NG-KAD-002',
    title: 'Kaduna Cold Chain Facility.',
    location: 'Cluster B • Zaria, Kaduna State',
    heroImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2874&auto=format&fit=crop',
    structure: 'PUE-as-a-Service',
    partner: 'Solar Refrigeration Ltd',
    date: 'Q1 2024',
    challenge: 'Over 50% of tomato harvests in Zaria were lost within 48 hours due to extreme heat and zero cooling capacity. Farmers were forced to sell at "distress prices" to avoid total loss.',
    solution: 'Deployment of 10 modular blast-cooling units powered by an integrated off-grid solar array. This allows farmers to preserve produce for up to 21 days while waiting for better market prices.',
    outcome: 'Post-harvest spoilage reduced from 55% to less than 4%. Local market price stability improved by 22% during peak harvest cycles.',
    totalAssetValue: '₦180,000,000',
    beneficiaries: '500+ Smallholders',
    spv: 'AgAsset SPV-02',
    specs: [
        { label: "Financing Model", val: "Fee-Per-Crate", sub: "Pay-as-you-Store", icon: Briefcase, details: "Users pay a small transaction fee per crate of produce stored, removing all upfront costs for farmers while generating consistent cashflow." },
        { label: "Thermal Storage", val: "Phase Change", sub: "Integrated Cold Bank", icon: ShieldCheck, details: "Advanced cooling tech that stores 'cold' in specialized phase-change materials, allowing for temperature maintenance overnight without battery drain." },
        { label: "Asset Type", val: "Modular Blast", sub: "ISO-Certified Units", icon: Layers, details: "Scalable modular units that can be transported and commissioned within 72 hours, designed for rapid deployment in high-yield agriculture zones." },
        { label: "Energy Source", val: "35kW Solar", sub: "Off-Grid Hybrid", icon: Zap, details: "Dedicated solar array with lithium-ion backup ensures 24/7 climate control independently of the unreliable local power grid." },
        { label: "Temp Control", val: "2°C Stable", sub: "Precision Monitoring", icon: Activity, details: "Ultra-precise thermostat controls maintaining produce at optimal metabolic dormancy to extend shelf life without freezing damage." },
        { label: "SME Access", val: "Community App", sub: "Real-time Booking", icon: Clock, details: "Digital reservation system where cooperatives can book cooling space in advance, optimizing facility utilization and farmer schedules." },
    ],
    metrics: [
        { to: 95, suffix: "%", label: "Spoilage Reduction", desc: "Eliminating post-harvest waste for perishables.", icon: Droplets },
        { to: 21, suffix: " Days", label: "Shelf Life", desc: "Maximum cold-storage preservation time.", icon: Clock },
        { to: 250, suffix: "T", label: "Monthly Capacity", desc: "Tons processed through the Zaria node.", icon: Cog },
        { to: 120, suffix: "", label: "Subscriptions", desc: "Smallholder groups using PUE-as-a-Service.", icon: Users }
    ],
    gallery: [
        'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2944&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2942&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e10?q=80&w=2071&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1621460244018-8f192931448b?q=80&w=2940&auto=format&fit=crop'
    ],
    timeline: [
        { date: 'Nov 2023', title: 'Strategic Planning', desc: 'Site mapping for tomato corridors.' },
        { date: 'Feb 2024', title: 'Commissioning', desc: 'Deployment of 10 modular blast units.' },
        { date: 'Present', title: 'Expansion', desc: 'Planning for 5 additional nodes in Kaduna.' }
    ]
  }
};

// Official SDG Data
const SDG_MAP: Record<number, { name: string; color: string }> = {
  1: { name: "No Poverty", color: "#E5243B" },
  2: { name: "Zero Hunger", color: "#DDA63A" },
  7: { name: "Affordable and Clean Energy", color: "#FDB713" },
  8: { name: "Decent Work and Economic Growth", color: "#A21942" },
  9: { name: "Industry, Innovation and Infrastructure", color: "#FD6925" },
  12: { name: "Responsible Consumption and Production", color: "#BF8B2E" },
  13: { name: "Climate Action", color: "#3F7E44" }
};

// Map additional location IDs to specific data keys
const ID_MAP: Record<string, string> = {
    'imo': '01',
    'kaduna': '02',
    'ogun': '02',
    'benue': '01',
    'niger': '01',
    'kano': '02',
    'eleuma': '03',
    '01': '01',
    '02': '02',
    '03': '03',
};

const FALLBACK_ID = '01';

// Map CMS icon name strings → Lucide components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase, ShieldCheck, Layers, Cog, Zap, Clock, TrendingUp, Fuel, Users, Droplets, Activity, MapPin, Info,
};

function resolveIcon(name: string | null | undefined): React.ComponentType<{ className?: string }> {
  return (name && ICON_MAP[name]) || Cog;
}

function buildCmsProject(d: ProjectDetail) {
  return {
    id: d.projectId ?? d.documentId,
    title: d.title,
    location: d.location ?? '',
    heroImage: d.heroImage ?? '',
    structure: d.structure ?? '',
    status: d.status ?? d.structure ?? '',
    partner: d.partner ?? '',
    date: d.date ?? '',
    challenge: d.challenge ?? '',
    solution: d.solution ?? '',
    outcome: d.outcome ?? '',
    totalAssetValue: d.totalAssetValue ?? '',
    beneficiaries: d.beneficiaries ?? '',
    spv: d.spv ?? '',
    specs: (d.specs ?? []).map(s => ({ ...s, icon: resolveIcon(s.icon) })),
    metrics: (d.metrics ?? []).map(m => ({ ...m, icon: resolveIcon(m.icon) })),
    gallery: d.gallery ?? [],
    timeline: d.timeline ?? [],
    sdgs: d.sdgs ?? [],
  };
}

// --- SUB-COMPONENTS ---

const SDGTooltip: React.FC<{ id: number; children: React.ReactNode }> = ({ id, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    const data = SDG_MAP[id];
    
    return (
        <div className="relative inline-block no-print" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {children}
            <AnimatePresence>
                {isHovered && (
                    <motion.div 
                        initial={{ opacity: 0, y: 5, x: "-50%", scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                        exit={{ opacity: 0, y: 5, x: "-50%", scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute bottom-full left-1/2 mb-3 z-[100] pointer-events-none"
                    >
                        <div className="bg-ag-green-950 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-2xl border border-white/10 flex items-center gap-3 w-48 text-center justify-center leading-tight">
                            <div className="shrink-0 w-2 h-2 rounded-full" style={{ backgroundColor: data?.color }} />
                            <span className="whitespace-normal">{data?.name}</span>
                            {/* Pointer */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-ag-green-950 rotate-45 -mt-1 border-r border-b border-white/10" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Counter = ({ from, to, duration = 1.5, suffix = "" }: { from: number; to: number; duration?: number; suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        node.textContent = value.toLocaleString(undefined, { maximumFractionDigits: 1 }) + suffix;
      },
      ease: "easeOut"
    });
    return () => controls.stop();
  }, [from, to, duration, suffix]);
  return <span ref={nodeRef} className="font-mono tabular-nums" />;
};

const EfficiencyDashboard = () => (
  <div className="flex flex-col gap-6 h-full font-sans">
    <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between h-32">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Net OpEx Savings</p>
            <div>
                <span className="text-3xl font-bold text-ag-green-950">62%</span>
                <div className="w-full h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '62%' }} transition={{ duration: 1.5 }} className="h-full bg-ag-lime" />
                </div>
            </div>
        </div>
        <div className="bg-ag-green-950 p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-32">
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none">Carbon Offset</p>
            <div>
                <span className="text-2xl font-bold text-ag-lime">125T</span>
                <p className="text-[10px] text-white/40 font-medium mt-1">CO2e per Year</p>
            </div>
        </div>
    </div>
    
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex-1">
        <div className="flex justify-between items-center mb-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Energy Arbitrage</p>
            <Zap className="w-3.5 h-3.5 text-ag-lime" />
        </div>
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Diesel Grid Baseline</span>
                <span className="text-xs font-bold text-red-500">₦1,200 / L</span>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">AgAsset Solar LCOE</span>
                <span className="text-xs font-bold text-ag-lime">₦45 / kWh eq</span>
            </div>
            <div className="w-full h-12 flex gap-1 items-end mt-4">
                {[40, 60, 30, 80, 90, 45, 70, 85, 30, 95].map((h, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ height: 0 }} 
                        whileInView={{ height: `${h}%` }} 
                        transition={{ delay: i * 0.05 }} 
                        className={`flex-1 rounded-t-sm ${i > 7 ? 'bg-ag-lime' : 'bg-gray-100'}`} 
                    />
                ))}
            </div>
        </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

interface SingleProjectProps {
  projectId?: string | number | null;
  projectData?: ProjectDetail | null;
  onNavigate?: (page: any, id?: any) => void;
}

const SingleProject: React.FC<SingleProjectProps> = ({ projectId, projectData, onNavigate }) => {
  const [activeSubnav, setActiveSubnav] = useState('context');
  const [expandedSpecIndex, setExpandedSpecIndex] = useState<number>(0);

  const project = projectData
    ? buildCmsProject(projectData)
    : (() => {
        const idStr = projectId ? String(projectId) : FALLBACK_ID;
        const dataKey = ID_MAP[idStr] || FALLBACK_ID;
        return PROJECTS_DATA[dataKey] || PROJECTS_DATA[FALLBACK_ID];
      })();

  const subnavItems = [
    { id: 'context', label: '01 CONTEXT' },
    { id: 'technical', label: '02 TECHNICAL DATA' },
    { id: 'impact', label: '03 IMPACT' },
    { id: 'media', label: '04 MEDIA' },
    { id: 'lifecycle', label: '05 LIFECYCLE' }
  ];

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 160; 
      for (const item of subnavItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSubnav(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleScrollTo = (id: string) => {
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

  const handleDownloadFactsheet = () => {
    window.print();
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-ag-lime selection:text-white pb-0">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-ag-green-950 flex flex-col justify-end">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            src={project.heroImage}
            className="w-full h-full object-cover"
            alt={project.title}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-ag-green-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-ag-green-950 via-ag-green-950/20 to-transparent" />
        </div>

        {/* BREADCRUMBS & BACK */}
        <div className="absolute top-32 left-0 w-full z-30 px-6 no-print">
           <div className="max-w-7xl mx-auto flex items-center justify-between">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-white/50 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full w-fit border border-white/10 shadow-sm"
              >
                <Home className="w-2.5 h-2.5" />
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => onNavigate?.('home')}>Home</span>
                <ChevronRight className="w-2.5 h-2.5 opacity-30" />
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => onNavigate?.('portfolio')}>Portfolio</span>
                <ChevronRight className="w-2.5 h-2.5 opacity-30" />
                <span className="text-white">Deal ng-{project.id.toLowerCase()}</span>
              </motion.div>

              <button 
                onClick={() => onNavigate?.('portfolio')}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-ag-lime transition-all active:scale-95 group w-fit"
              >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
              </button>
           </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-24 md:pb-32">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeInUp}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-8">
               <span className="bg-ag-lime text-ag-green-950 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-ag-lime/20">
                  [ ACTIVE / REPAYING ]
               </span>
               <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">CASE STUDY: {project.id}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-bold text-white leading-[0.9] tracking-tighter mb-6">
              {project.title.split('.')[0]}<span className="text-ag-lime italic font-serif">.</span>
            </h1>
            
            <div className="flex items-center gap-4 text-white/60">
               <MapPin className="w-4 h-4 text-ag-lime" />
               <p className="text-lg md:text-xl font-light tracking-wide uppercase">{project.location}</p>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full backdrop-blur-3xl bg-ag-green-950/30 border-t border-white/10 z-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center">
             <div className="grid grid-cols-3 w-full divide-x divide-white/10 text-white">
                <div className="px-4 md:px-8 first:pl-0">
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.3em] mb-1">Structure</p>
                  <p className="text-xs md:sm font-bold uppercase tracking-widest">{project.status}</p>
                </div>
                <div className="px-4 md:px-8">
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.3em] mb-1">Primary Partner</p>
                  <p className="text-xs md:sm font-bold uppercase tracking-widest">{project.partner}</p>
                </div>
                <div className="px-4 md:px-8 last:pr-0">
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.3em] mb-1">Commissioned</p>
                  <p className="text-xs md:sm font-bold uppercase tracking-widest">{project.date}</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* STICKY SUB-NAV BAR */}
      <div className="sticky top-[80px] z-[998] bg-[#f8f9fa] backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300 no-print">
        <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-center gap-4 md:gap-12 overflow-x-auto no-scrollbar">
          {subnavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={`text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] whitespace-nowrap transition-all duration-300 relative group py-3 ${
                activeSubnav === item.id ? 'text-ag-lime' : 'text-[#94a3b8] hover:text-[#64748b]'
              }`}
            >
              {item.label}
              {activeSubnav === item.id && (
                <motion.div 
                  layoutId="subnavActiveBar"
                  className="absolute bottom-0 left-0 w-full h-[2.5px] bg-ag-lime"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. SECTION 01: EXECUTIVE SUMMARY */}
      <section id="context" className="py-32 bg-white scroll-mt-[140px]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-7xl mx-auto px-6"
        >
          <SectionHeader number="01" category="Context" title="Transitioning Rural Markets to Solar." />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            <aside className="lg:col-span-4 lg:sticky lg:top-48">
               <motion.div 
                 whileHover={{ y: -5 }}
                 className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 shadow-sm relative overflow-hidden group transition-all duration-500"
               >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Layers className="w-24 h-24 text-ag-green-950" />
                  </div>
                  <h4 className="text-[10px] font-bold text-ag-lime uppercase tracking-[0.3em] mb-10">Deal Snapshot</h4>
                  
                  <div className="space-y-8">
                     <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Asset Value</p>
                        <p className="text-3xl font-bold text-ag-green-950 font-mono tracking-tight">{project.totalAssetValue}</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Direct Beneficiaries</p>
                        <p className="text-3xl font-bold text-ag-green-950 font-mono tracking-tight">{project.beneficiaries}</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">SPV Entity</p>
                        <p className="text-xl font-bold text-ag-green-950 uppercase tracking-widest">{project.spv}</p>
                     </div>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-gray-200 no-print">
                    <button onClick={handleDownloadFactsheet} className="w-full flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-ag-green-950 hover:text-ag-lime transition-colors group/btn">
                      Download Deal Sheet <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
                    </button>
                  </div>
               </motion.div>
            </aside>

            <div className="lg:col-span-8 space-y-24">
               <div>
                  <h3 className="text-xs font-bold text-ag-green-950 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                     <div className="w-8 h-[1px] bg-ag-lime" /> The Challenge
                  </h3>
                  <p className="text-2xl md:text-3xl text-gray-500 font-light leading-relaxed mb-8">
                    {project.challenge}
                  </p>
               </div>

               <div>
                  <h3 className="text-xs font-bold text-ag-green-950 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                     <div className="w-8 h-[1px] bg-ag-lime" /> The Solution
                  </h3>
                  <p className="text-2xl md:text-3xl text-gray-500 font-light leading-relaxed mb-8">
                    {project.solution}
                  </p>
               </div>

               <motion.div 
                 whileHover={{ scale: 1.01 }}
                 className="bg-ag-green-950 p-12 md:p-16 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group"
               >
                  <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                    <CheckCircle2 className="w-48 h-48 text-white" />
                  </div>
                  <h3 className="text-[10px] font-bold text-ag-lime uppercase tracking-[0.3em] mb-8">Executive Outcome</h3>
                  <p className="text-2xl md:text-4xl font-medium tracking-tight mb-10 leading-[1.2] relative z-10 italic">
                    "{project.outcome}"
                  </p>
                  <div className="flex items-center gap-4 relative z-10">
                     <div className="w-10 h-10 rounded-full bg-ag-lime/20 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-ag-lime" />
                     </div>
                     <span className="text-xs font-bold uppercase tracking-widest text-white/60">Live Performance Monitoring Active</span>
                  </div>
               </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. SECTION 02: THE DEAL SHEET (Refactored to Mid-Expansion) */}
      <section id="technical" className="py-32 bg-gray-50 border-y border-gray-200 scroll-mt-[140px]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-7xl mx-auto px-6"
        >
          <SectionHeader number="02" category="Technical Data" title="Portfolio Specs & Mechanics." />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Grid Column */}
            <div className="lg:col-span-8 flex flex-col">
               {/* TOP ROW */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {project.specs.slice(0, 3).map((spec: any, idx: number) => (
                    <SpecBox 
                        key={idx} 
                        spec={spec} 
                        isActive={expandedSpecIndex === idx} 
                        onClick={() => setExpandedSpecIndex(idx)} 
                    />
                  ))}
               </div>

               {/* SHARED EXPANSION PANEL - ALWAYS OPEN */}
               <div className="bg-ag-green-950 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden h-[340px] flex flex-col justify-center">
                    {/* Content switcher */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`spec-content-${expandedSpecIndex}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
                        >
                            <div className="md:col-span-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-ag-lime text-ag-green-950 flex items-center justify-center">
                                        {React.createElement(project.specs[expandedSpecIndex].icon, { className: "w-6 h-6 stroke-[1.5]" })}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">
                                            {project.specs[expandedSpecIndex].label} Breakdown
                                        </p>
                                        <h3 className="text-3xl font-bold text-white tracking-tight">
                                            {project.specs[expandedSpecIndex].val}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-lg text-white/70 font-light leading-relaxed mb-8">
                                    {project.specs[expandedSpecIndex].details}
                                </p>
                                <div className="flex items-center gap-3 text-[10px] font-bold text-ag-lime uppercase tracking-widest bg-ag-lime/10 px-4 py-2 rounded-full w-fit">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Technical Validation Complete
                                </div>
                            </div>
                            
                            <div className="md:col-span-4 flex flex-col gap-4">
                                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 flex flex-col gap-2">
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Classification</p>
                                    <p className="text-xl font-bold text-ag-lime leading-tight">
                                        {project.specs[expandedSpecIndex].sub}
                                    </p>
                                </div>
                                <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-ag-lime transition-colors flex items-center gap-2 pl-4 no-print">
                                    <Info className="w-3 h-3" /> Technical Datasheet (PDF)
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    
                    {/* Decorative element - Static */}
                    <div className="absolute top-0 left-12 w-20 h-1.5 bg-ag-lime rounded-b-full opacity-50" />
               </div>

               {/* BOTTOM ROW */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {project.specs.slice(3, 6).map((spec: any, idx: number) => (
                    <SpecBox 
                        key={idx + 3} 
                        spec={spec} 
                        isActive={expandedSpecIndex === idx + 3} 
                        onClick={() => setExpandedSpecIndex(idx + 3)} 
                    />
                  ))}
               </div>
            </div>

            {/* Efficiency Metrics Dashboard Sidebar */}
            <div className="lg:col-span-4">
              <EfficiencyDashboard />
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. SECTION 03: IMPACT SCORECARD */}
      <section id="impact" className="py-40 bg-ag-green-950 text-white relative overflow-hidden scroll-mt-[140px]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ag-lime/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          <SectionHeader number="03" category="Impact" title="Project Yield & ROI." dark={true} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
             {project.metrics.map((m: any, i: number) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.03)' }}
                  className="bg-white/5 border border-white/10 p-10 rounded-[2rem] flex flex-col justify-between transition-all duration-500"
                >
                    <div className="mb-8">
                       <div className="w-12 h-12 rounded-2xl bg-ag-lime/10 flex items-center justify-center mb-6">
                          <m.icon className="w-6 h-6 text-ag-lime" />
                       </div>
                       <div className="text-5xl font-black text-white mb-2 tracking-tighter">
                         <Counter from={0} to={m.to} suffix={m.suffix} />
                       </div>
                       <p className="text-[11px] font-black text-ag-lime uppercase tracking-[0.3em] mb-4">{m.label}</p>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed font-light">{m.desc}</p>
                </motion.div>
             ))}
          </div>

          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
             <div className="flex flex-col gap-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-[0.3em]">Alignment Framework</h4>
                <p className="text-xs text-white/40 font-medium tracking-wide">Mapped against United Nations Sustainable Development Goals (SDGs)</p>
             </div>
             
             <div className="flex flex-wrap justify-center gap-10 opacity-80 hover:opacity-100 transition-opacity">
                {(project.sdgs?.length ? project.sdgs : [1, 7, 8, 9, 13]).map((num) => (
                  <SDGTooltip key={num} id={num}>
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="flex flex-col items-center gap-3"
                    >
                        <div 
                        className="w-16 h-16 text-white flex items-center justify-center font-bold text-3xl rounded-lg shadow-xl"
                        style={{ backgroundColor: SDG_MAP[num]?.color || '#ccc' }}
                        >
                        {num}
                        </div>
                        <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">SDG {num}</span>
                    </motion.div>
                  </SDGTooltip>
                ))}
             </div>
          </div>
        </motion.div>
      </section>

      {/* 5. SECTION 04: PROJECT GALLERY */}
      <section id="media" className="py-32 bg-white scroll-mt-[140px]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-7xl mx-auto px-6"
        >
          <SectionHeader number="04" category="Media" title="Visual Verification." />
          
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[1000px] md:h-[650px]">
             <motion.div 
               whileHover={{ scale: 1.02 }}
               transition={{ type: 'spring', stiffness: 300 }}
               className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden shadow-2xl relative group cursor-zoom-in"
             >
                <img src={project.gallery[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Gallery 1" loading="eager" fetchPriority="high" />
                <div className="absolute inset-0 bg-ag-green-950/20 group-hover:bg-transparent transition-colors duration-1000" />
             </motion.div>
             <motion.div 
               whileHover={{ scale: 1.02 }}
               transition={{ type: 'spring', stiffness: 300 }}
               className="md:col-span-2 md:row-span-1 rounded-3xl overflow-hidden shadow-xl relative group cursor-zoom-in"
             >
                <img src={project.gallery[1]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Gallery 2" loading="eager" fetchPriority="high" />
                <div className="absolute inset-0 bg-ag-green-950/20 group-hover:bg-transparent transition-colors duration-1000" />
             </motion.div>
             <motion.div 
               whileHover={{ scale: 1.02 }}
               transition={{ type: 'spring', stiffness: 300 }}
               className="md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden shadow-lg relative group cursor-zoom-in"
             >
                <img src={project.gallery[2]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Gallery 3" loading="eager" fetchPriority="high" />
                <div className="absolute inset-0 bg-ag-green-950/20 group-hover:bg-transparent transition-colors duration-1000" />
             </motion.div>
             <motion.div 
               whileHover={{ scale: 1.02 }}
               transition={{ type: 'spring', stiffness: 300 }}
               className="md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden shadow-lg relative group cursor-zoom-in"
             >
                <img src={project.gallery[3]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Gallery 4" loading="eager" fetchPriority="high" />
                <div className="absolute inset-0 bg-ag-green-950/20 group-hover:bg-transparent transition-colors duration-1000" />
             </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 6. SECTION 05: OPERATIONS TIMELINE */}
      <section id="lifecycle" className="py-32 bg-gray-50 border-t border-gray-200 scroll-mt-[140px]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-7xl mx-auto px-6"
        >
          <SectionHeader number="05" category="Lifecycle" title="Hub Deployment Roadmap." />
          
          <div className="relative pt-24 pb-16">
            <div className="absolute top-[122px] left-0 w-full h-[1px] bg-gray-200" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
               {project.timeline.map((step: any, i: number) => (
                   <motion.div 
                    key={i} 
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center md:items-start group transition-all duration-500"
                   >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-10 relative z-10 shadow-xl border-4 border-white transition-all duration-500 ${i === 2 ? 'bg-ag-lime' : 'bg-ag-green-950'}`}>
                        {i === 2 ? <Activity className="w-6 h-6 text-ag-green-950" /> : <CheckCircle2 className="w-6 h-6 text-white" />}
                    </div>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-4 ${i === 2 ? 'text-ag-lime' : 'text-gray-400'}`}>
                        {i === 2 && <span className="inline-block w-1.5 h-1.5 rounded-full bg-ag-lime animate-pulse mr-3 mb-0.5" />}
                        {step.date}
                    </p>
                    <h5 className="text-2xl font-bold text-ag-green-950 mb-4 tracking-tight">{step.title}</h5>
                    <p className="text-[15px] text-gray-500 font-light leading-relaxed">{step.desc}</p>
                    </motion.div>
               ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 7. PRE-FOOTER CTA - Updated design */}
      <section className="relative bg-ag-green-950 py-40 overflow-hidden no-print">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-ag-lime/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[11px] font-bold text-ag-lime uppercase tracking-[0.5em] mb-14"
            >
              INVESTMENT OPPORTUNITY
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-[8rem] font-bold text-white tracking-tighter leading-[0.85] mb-16 max-w-5xl"
            >
              Replicate This <br/> <span className="text-ag-lime">Success.</span>
            </motion.h2>

            <div className="flex flex-col md:flex-row gap-8 items-center">
               <motion.button 
                 onClick={handleDownloadFactsheet}
                 whileHover={{ scale: 1.05, y: -5 }}
                 whileTap={{ scale: 0.95 }}
                 className="group flex items-center gap-8 bg-white text-ag-green-950 px-10 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:shadow-2xl transition-all duration-500"
               >
                  Download Factsheet (PDF)
                  <div className="w-8 h-8 bg-ag-green-950 rounded-full flex items-center justify-center text-white transition-all">
                    <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                  </div>
               </motion.button>

               <motion.button 
                 onClick={() => onNavigate?.('contact')}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="group flex items-center gap-8 bg-transparent border border-white/20 text-white px-10 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-ag-green-950 transition-all duration-500"
               >
                  Inquire About Solution
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
               </motion.button>
            </div>
        </div>
      </section>

    </div>
  );
};

// --- MINI HELPERS ---

const SpecBox: React.FC<{ spec: any; isActive: boolean; onClick: () => void }> = ({ spec, isActive, onClick }) => (
    <motion.button 
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`text-left p-6 rounded-3xl border transition-all duration-500 group flex flex-col justify-between min-h-[140px] flex-1 ${
            isActive 
            ? 'bg-ag-green-950 border-ag-green-950 text-white shadow-xl' 
            : 'bg-white border-gray-200 text-ag-green-950 hover:border-ag-lime hover:shadow-lg'
        } factsheet-grid-item`}
    >
        <div className="flex justify-between items-start no-print">
            <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-ag-lime text-ag-green-950' : 'bg-gray-50 text-ag-green-950 group-hover:bg-ag-lime/10'}`}>
                <spec.icon className="w-5 h-5 stroke-[1.5]" />
            </div>
            {isActive ? <Minus className="w-4 h-4 text-ag-lime" /> : <Plus className="w-4 h-4 text-gray-300 group-hover:text-ag-lime" />}
        </div>
        <div>
            <p className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-1 ${isActive ? 'text-white/40' : 'text-gray-400'}`}>
                {spec.label}
            </p>
            <h4 className="text-base font-bold tracking-tight leading-tight">{spec.val}</h4>
        </div>
    </motion.button>
);

export default SingleProject;