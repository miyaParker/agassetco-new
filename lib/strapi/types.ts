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
  cta_url: string | null;
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

export type Section = HeroSection | TrustBarSection | IntroductionSection | OurProjectsSection | TheChallengeSection | OurEcosystemSection | PartnershipSection;

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
