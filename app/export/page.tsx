import type { Metadata } from 'next';
import { ExportClient } from './ExportClient';
import { EnquiryCTA } from '@/components/sections/EnquiryCTA';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Global Apparel Export & Logistics | Fashion Knits',
  description:
    'Explore international market opportunities and export coordination, logistics, warehousing, customs and freight support from Fashion Knits in Tiruppur, India.',
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
      <EnquiryCTA context="export" />
      <Footer />
    </>
  );
}
