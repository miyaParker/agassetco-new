import { getProjectBySlug } from '@/lib/strapi';
import ProjectDetailClient from './ProjectDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const projectData = await getProjectBySlug(id);

  return <ProjectDetailClient projectId={id} projectData={projectData} />;
}
