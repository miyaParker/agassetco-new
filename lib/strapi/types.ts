export interface StrapiRichTextChild {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface StrapiRichTextNode {
  type: 'paragraph' | 'heading' | 'list' | 'list-item' | 'quote' | 'code';
  children: StrapiRichTextChild[];
  level?: number;
  format?: 'ordered' | 'unordered';
}

export type StrapiRichText = StrapiRichTextNode[];

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
  size: number;
  name: string;
  hash: string;
  ext: string;
  mime: string;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  } | null;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  url: string;
  width: number | null;
  height: number | null;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  } | null;
  ext: string;
  mime: string;
  size: number;
}

export interface HeroStats {
  assets?: string;
  financing_totals?: string;
  geographic_reach?: string;
  processing_volume?: string;
  energy_consumption?: string;
  community_engagement?: string;
}

// --- Section component types ---

export interface HeroSection {
  __component: 'sections.hero';
  id: number;
  eyebrow: string;
  title: StrapiRichText;
  subtitle: StrapiRichText;
  primaryButtonLabel: string;
  primaryButtonUrl: string;
  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;
  badgeText?: string;
  stats?: HeroStats | null;
  video_poster?: StrapiMedia | null;
  video?: StrapiMedia | null;
}

export interface TrustBarPartner {
  id: number;
  name: string;
  url: string | null;
}

export interface TrustBarSection {
  __component: 'sections.trust-bar';
  id: number;
  label: string;
  partners?: TrustBarPartner[];
}

export interface IntroductionBullet {
  id: number;
  label: string;
  description: string;
}

export interface IntroductionSection {
  __component: 'sections.introduction';
  id: number;
  sectionLabel: string;
  title: StrapiRichText;
  body: StrapiRichText;
  bullets?: IntroductionBullet[];
}

export interface Project {
  id: number;
  title: string;
  country: string;
  year: string;
  challenge: string;
  solution: string;
  core_impact: string[];
  sdg_impact: number[];
  slug: string | null;
  categories: string[];
  images: StrapiMedia[];
}

export interface OurProjectsSection {
  __component: 'sections.our-projects';
  id: number;
  sectionLabel: string;
  title: string;
  project: Project[];
}

export interface ChallengeCard {
  id: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  svg_icon: string | null;
}

export interface TheChallengeSection {
  __component: 'sections.the-challenge';
  id: number;
  sectionLabel: string | null;
  title: string | null;
  challenge_card: ChallengeCard[];
}

export interface EcosystemCard {
  id: number;
  card_id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  svg_icon: string | null;
  cta: string | null;
  cta_url: string | null;
}

export interface OurEcosystemSection {
  __component: 'sections.our-ecosystem';
  id: number;
  sectionLabel: string | null;
  title: string | null;
  card: EcosystemCard[];
}

export interface PartnershipCard {
  id: number;
  title: string | null;
  description: string | null;
  cta: string | null;
  cta_url: string | null;
}

export interface PartnershipSection {
  __component: 'sections.partnership';
  id: number;
  title: string | null;
  description: string | null;
  partnership_card: PartnershipCard | null;
}

export interface PortfolioHeroSection {
  __component: 'sections.portfolio-hero';
  id: number;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  stats: Record<string, string> | null;
  hero_img: StrapiMedia | null;
}

export interface ReachProjectShowcase {
  id: number;
  title: string | null;
  sector: string | null;
  state_deployed: string | null;
  description: string | null;
  sdgs: number[] | null;
  url: string | null;
  // Geographic coordinates string, e.g. "7.0°E, 4.85°N"
  position: string | null;
}

export interface ReachSection {
  __component: 'sections.reach';
  id: number;
  title: string | null;
  sectionLabel: string | null;
  position: string | null;
  projects_showcase: ReachProjectShowcase[] | null;
}

export interface CaseStudiesSection {
  __component: 'sections.case-studies';
  id: number;
  title: string | null;
  categories: {
    id: number;
    name: string | null;
  }[] | null;
  projects: Project[] | null;
}

export interface ValidationCard {
  id: number;
  quote: string | null;
  author_name: string | null;
  author_title: string | null;
  company_name: string | null;
}

export interface ValidationSection {
  __component: 'sections.validation';
  id: number;
  title: string | null;
  validation_cards: ValidationCard[] | null;
}

export type Section = HeroSection | TrustBarSection | IntroductionSection | OurProjectsSection | TheChallengeSection | OurEcosystemSection | PartnershipSection | PortfolioHeroSection | ReachSection | CaseStudiesSection | ValidationSection;

// --- Page response types ---

export interface HomePageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  slug: string;
  sections: Section[];
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// --- Project detail (collection type) ---

export interface ProjectSpec {
  id: number;
  label: string | null;
  val: string | null;
  sub: string | null;
  icon: string | null;
  details: string | null;
}

export interface ProjectMetric {
  id: number;
  to: number | null;
  suffix: string | null;
  label: string | null;
  desc: string | null;
  icon: string | null;
}

export interface ProjectTimelineStep {
  id: number;
  date: string | null;
  title: string | null;
  desc: string | null;
}

export interface ProjectDetail {
  id: number;
  documentId: string;
  projectId: string | null;
  title: string;
  slug: string;
  location: string | null;
  heroImage: string | null;
  structure: string | null;
  partner: string | null;
  date: string | null;
  status: string | null;
  challenge: string | null;
  solution: string | null;
  outcome: string | null;
  totalAssetValue: string | null;
  beneficiaries: string | null;
  spv: string | null;
  specs: ProjectSpec[];
  metrics: ProjectMetric[];
  gallery: string[] | null;
  timeline: ProjectTimelineStep[];
  sdgs: number[] | null;
}
