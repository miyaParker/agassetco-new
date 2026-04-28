'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import PortfolioPage from '@/components/PortfolioPage';
import { PortfolioPageData, ProjectDetail } from '@/lib/strapi';

type PageType = 'home' | 'about' | 'team' | 'solutions' | 'portfolio' | 'news' | 'contact' | 'terms' | 'privacy' | 'cookie-policy' | 'news-detail' | 'project-detail';

interface Props {
  initialData: PortfolioPageData | null;
  projects: ProjectDetail[];
}

export default function PortfolioPageClient({ initialData, projects }: Props) {
  const router = useRouter();

  const handleNavigate = (page: PageType, id?: number | string) => {
    if (page === 'news-detail') router.push(`/news/${id}`);
    else if (page === 'project-detail') router.push(`/portfolio/${id}`);
    else router.push(page === 'home' ? '/' : `/${page}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <PortfolioPage onNavigate={handleNavigate} data={initialData} projects={projects} />
    </motion.div>
  );
}
