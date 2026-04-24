import PortfolioPageClient from './PortfolioPageClient';
import { getPortfolioPage } from '@/lib/strapi';

export default async function PortfolioPageRoute() {
  let portfolioData = null;

  try {
    portfolioData = await getPortfolioPage();
  } catch (err) {
    console.error('[PortfolioPage] Failed to fetch Strapi data:', err);
  }

  return <PortfolioPageClient initialData={portfolioData} />;
}

