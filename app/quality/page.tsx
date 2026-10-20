import type { Metadata } from 'next';
import { QualityClient } from './QualityClient';
import { EnquiryCTA } from '@/components/sections/EnquiryCTA';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Quality Assurance & Certifications | Fashion Knits',
  description:
    'Explore buyer-aligned quality planning for knitwear, from sample approval and workmanship checks to dispatch readiness and certification document scope.',
  keywords: [
    'garment quality planning India',
    'knitwear inspection requirements',
    'apparel compliance certificates',
  ],
};

export default function QualityPage() {
  return (
    <>
      <QualityClient />
      <EnquiryCTA context="quality" />
      <Footer />
    </>
  );
}
