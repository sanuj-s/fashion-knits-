import type { Metadata } from 'next';
import { QualityClient } from './QualityClient';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Quality Control & Certified Compliance | Fashion Knits Tiruppur',
  description:
    'Verified scope certificates and quality testing protocols at Fashion Knits. GOTS v7.0, OCS v3.0, OEKO-TEX® Standard 100 Class I, amfori BSCI social audit, and AQL 2.5 inline inspection.',
  keywords: [
    'GOTS certified knitwear',
    'OEKO-TEX Class 1 Tiruppur',
    'BSCI audited garment factory',
    'AQL 2.5 textile quality control',
    'needle detector inspection India',
    'apparel compliance certificates',
  ],
};

export default function QualityPage() {
  return (
    <>
      <QualityClient />
      <Contact />
      <Footer />
    </>
  );
}
