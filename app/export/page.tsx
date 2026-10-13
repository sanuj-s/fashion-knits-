import type { Metadata } from 'next';
import { ExportClient } from './ExportClient';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Global Export & Logistics | Fashion Knits Tiruppur',
  description:
    'Order-to-shipment workflow, seaport and air logistics corridors, export documentation, and international shipping capabilities from Fashion Knits, Tiruppur, India.',
  keywords: [
    'knitwear exporter India',
    'Tiruppur garment export',
    'container logistics',
    'FOB CIF export',
  ],
};

export default function ExportPage() {
  return (
    <>
      <ExportClient />
      <Contact />
      <Footer />
    </>
  );
}
