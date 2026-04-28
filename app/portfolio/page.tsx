import PortfolioPageClient from './PortfolioPageClient';
import { getPortfolioPage, getProjects } from '@/lib/strapi';

export default async function PortfolioPageRoute() {
  let portfolioData = null;
  let projects = [];

  try {
    [portfolioData, projects] = await Promise.all([
      getPortfolioPage(),
      getProjects(),
    ]);
  } catch (err) {
    console.error('[PortfolioPage] Failed to fetch Strapi data:', err);
  }

  return <PortfolioPageClient initialData={portfolioData} projects={projects} />;
}
