import { strapiGet } from '../client';
import type {
  HomePageData,
  StrapiSingleResponse,
  HeroSection,
  TrustBarSection,
  IntroductionSection,
  OurProjectsSection,
  TheChallengeSection,
  OurEcosystemSection,
  PartnershipSection,
  Section,
} from '../types';

export async function getHomePage(): Promise<HomePageData> {
  const response = await strapiGet<StrapiSingleResponse<HomePageData>>(
    '/home-page',
    {
      params: {
        'populate[sections][on][sections.hero][populate]': '*',
        'populate[sections][on][sections.introduction][populate]': '*',
        'populate[sections][on][sections.trust-bar][populate]': '*',
        'populate[sections][on][sections.the-challenge][populate]': '*',
        'populate[sections][on][sections.our-ecosystem][populate]': '*',
        'populate[sections][on][sections.our-projects][populate][project][populate]': '*',
        'populate[sections][on][sections.partnership][populate]': '*',
      },
      revalidate: 60,
      tags: ['home-page'],
    }
  );
  return response.data;
}

function findSection<T extends Section>(
  sections: Section[],
  component: T['__component']
): T | undefined {
  return sections.find(s => s.__component === component) as T | undefined;
}

export function getHeroSection(sections: Section[]): HeroSection | undefined {
  return findSection<HeroSection>(sections, 'sections.hero');
}

export function getTrustBarSection(sections: Section[]): TrustBarSection | undefined {
  return findSection<TrustBarSection>(sections, 'sections.trust-bar');
}

export function getIntroductionSection(sections: Section[]): IntroductionSection | undefined {
  return findSection<IntroductionSection>(sections, 'sections.introduction');
}

export function getAllIntroductionSections(sections: Section[]): IntroductionSection[] {
  return sections.filter(s => s.__component === 'sections.introduction') as IntroductionSection[];
}

export function getOurProjectsSection(sections: Section[]): OurProjectsSection | undefined {
  return findSection<OurProjectsSection>(sections, 'sections.our-projects');
}

export function getTheChallengeSection(sections: Section[]): TheChallengeSection | undefined {
  return findSection<TheChallengeSection>(sections, 'sections.the-challenge');
}

export function getOurEcosystemSection(sections: Section[]): OurEcosystemSection | undefined {
  return findSection<OurEcosystemSection>(sections, 'sections.our-ecosystem');
}

export function getPartnershipSection(sections: Section[]): PartnershipSection | undefined {
  return findSection<PartnershipSection>(sections, 'sections.partnership');
}
