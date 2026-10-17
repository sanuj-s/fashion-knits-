import type { Metadata } from 'next';
import { ExportClient } from './ExportClient';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Global Export & Logistics | Fashion Knits',
  description:
    'Explore Fashion Knits export and logistics coordination in Tiruppur, India, including warehousing, customs documentation, sea freight and air freight planning.',
  keywords: [
    'knitwear exporter India',
    'Tiruppur garment export',
    'international apparel logistics',
    'garment export documentation',
  ],
};

export default function ExportPage() {
  return (
    <>
      <ExportClient />
      <Contact context="export" />
      <Footer />
    </>
  );
}
