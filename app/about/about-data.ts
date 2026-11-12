import { COMPANY_LOCATIONS } from '@/src/data/company-content';

export type AboutFact = {
  value: string;
  label: string;
  sub: string;
  verified: boolean;
};

export const ABOUT_FACTS: AboutFact[] = [
  {
    value: '1990',
    label: 'Fashion Knits in Tiruppur',
    sub: 'Company history · Tiruppur',
    verified: false,
  },
  {
    value: String(COMPANY_LOCATIONS.length).padStart(2, '0'),
    label: 'Listed Tiruppur locations',
    sub: 'Head Office & Unit 2 · Unit 1 · Unit 3',
    verified: false,
  },
];

export type QualityHighlight = {
  title: string;
  body: string;
  verified: boolean;
};

// Client to supply three or four approved quality/compliance highlights with title, body, and verified: true.
export const QUALITY_HIGHLIGHTS: QualityHighlight[] = [];

export type BuyerSelection = {
  slug: string;
  verified: boolean;
};

// Client to supply approved CUSTOMER_BRANDS slugs only, each with verified: true.
export const BUYER_SELECTIONS: BuyerSelection[] = [];

export type AboutMilestone = {
  year: string;
  text: string;
  verified: boolean;
};

// Client to supply at least three verified milestones with confirmed years and copy.
export const ABOUT_MILESTONES: AboutMilestone[] = [];

export const ABOUT_LOCATION_DETAILS: Record<string, { role: string; photo: string }> = {
  'Head Office & Unit 2': { role: '', photo: '' },
  'Unit 1': { role: '', photo: '' },
  'Unit 3': { role: '', photo: '' },
};

// Email is already published in the shared Footer and Contact section. No site phone is published there.
export const ABOUT_SITE_CONTACT = {
  phone: '',
  email: 'raviramu@fashionknits.net',
};

// No shared route constants exist in this project; these match the existing site navigation routes.
export const ABOUT_ROUTES = {
  products: '/products',
  manufacturing: '/manufacturing',
  quality: '/quality',
  sustainability: '/sustainability',
  globalExport: '/export',
} as const;
