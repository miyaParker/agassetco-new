import { strapiGet } from '../client';
import { 
  Section, 
  PortfolioHeroSection,
  ReachSection,
  CaseStudiesSection,
  ValidationSection,
  TheChallengeSection,
  StrapiSingleResponse
} from '../types';

export interface PortfolioPageData {
  id: number;
  title: string;
  slug: string;
  PortfolioSections: Section[];
}

export async function getPortfolioPage(): Promise<PortfolioPageData> {
  try {
    const response = await strapiGet<StrapiSingleResponse<PortfolioPageData>>('/portfolio-page', {
      params: {
        // Shallow-populate all dynamic zone sections (picks up simple fields)
        'populate[PortfolioSections][populate]': '*',
        // Deep-populate nested relations per component
        'populate[PortfolioSections][on][sections.portfolio-hero][populate]': '*',
        'populate[PortfolioSections][on][sections.reach][populate][projects_showcase][populate]': '*',
        'populate[PortfolioSections][on][sections.case-studies][populate][projects][populate]': '*',
        'populate[PortfolioSections][on][sections.the-challenge][populate][challenge_card][populate]': '*',
        'populate[PortfolioSections][on][sections.validation][populate][validation_cards][populate]': '*',
      },
      revalidate: 60,
      tags: ['portfolio-page'],
    });

    return response.data;
  } catch (error) {
    console.error('[Strapi] Error fetching portfolio page:', error);
    throw error;
  }
}

function findSection<T extends Section>(sections: Section[], componentName: T['__component']): T | undefined {
  if (!sections) return undefined;
  return sections.find((section): section is T => section.__component === componentName);
}

export function getPortfolioHeroSection(sections: Section[]): PortfolioHeroSection | undefined {
  return findSection<PortfolioHeroSection>(sections, 'sections.portfolio-hero');
}

export function getReachSection(sections: Section[]): ReachSection | undefined {
  return findSection<ReachSection>(sections, 'sections.reach');
}

export function getCaseStudiesSection(sections: Section[]): CaseStudiesSection | undefined {
  return findSection<CaseStudiesSection>(sections, 'sections.case-studies');
}

export function getValidationSection(sections: Section[]): ValidationSection | undefined {
  return findSection<ValidationSection>(sections, 'sections.validation');
}

// export function getTheChallengeSection(sections: Section[]): TheChallengeSection | undefined {
//   return findSection<TheChallengeSection>(sections, 'sections.the-challenge');
// }
