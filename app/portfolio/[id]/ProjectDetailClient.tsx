'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SingleProject from '@/components/SingleProject';
import type { ProjectDetail } from '@/lib/strapi';

type PageType = 'home' | 'about' | 'team' | 'solutions' | 'portfolio' | 'news' | 'contact' | 'terms' | 'privacy' | 'cookie-policy' | 'news-detail' | 'project-detail';

interface Props {
  projectId: string;
  projectData: ProjectDetail | null;
}

export default function ProjectDetailClient({ projectId, projectData }: Props) {
  const router = useRouter();

  const handleNavigate = (page: PageType, id?: number | string) => {
    if (page === 'news-detail') router.push(`/news/${id}`);
    else if (page === 'project-detail') router.push(`/portfolio/${id}`);
    else router.push(page === 'home' ? '/' : `/${page}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
      <SingleProject projectId={projectId} projectData={projectData} onNavigate={handleNavigate} />
    </motion.div>
  );
}
