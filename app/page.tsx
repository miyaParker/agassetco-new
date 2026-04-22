import { 
  getHomePage, 
  getHeroSection, 
  getTrustBarSection, 
  getIntroductionSection,
  getTheChallengeSection,
  getOurEcosystemSection,
  getOurProjectsSection,
  getPartnershipSection
} from '@/lib/strapi';
import HomePageClient from '@/components/HomePageClient';

export default async function HomePage() {
  let heroData = null;
  let trustBarData = null;
  let introData = null;
  let challengeData = null;
  let ecosystemData = null;
  let projectsData = null;
  let partnershipData = null;

  try {
    const pageData = await getHomePage();
    heroData = getHeroSection(pageData.sections) ?? null;
    trustBarData = getTrustBarSection(pageData.sections) ?? null;
    introData = getIntroductionSection(pageData.sections) ?? null;
    challengeData = getTheChallengeSection(pageData.sections) ?? null;
    ecosystemData = getOurEcosystemSection(pageData.sections) ?? null;
    projectsData = getOurProjectsSection(pageData.sections) ?? null;
    partnershipData = getPartnershipSection(pageData.sections) ?? null;
  } catch (err) {
    console.error('[HomePage] Failed to fetch Strapi data:', err);
  }

  return (
    <HomePageClient
      heroData={heroData}
      trustBarData={trustBarData}
      introData={introData}
      challengeData={challengeData}
      ecosystemData={ecosystemData}
      projectsData={projectsData}
      partnershipData={partnershipData}
    />
  );
}
