import type { Metadata } from 'next';
import { SustainabilityPage } from '@/components/sections/SustainabilityPage';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Sustainability | Fashion Knits',
  description:
    'Explore Fashion Knits initiatives in material choice, rooftop solar, water reuse and community afforestation in Tiruppur.',
  keywords: [
    'Fashion Knits sustainability',
    'Tiruppur solar energy',
    'Netaji Apparel Park solar',
    'Tiruppur afforestation',
    'garment wastewater treatment',
  ],
};

export default function SustainabilityRoute() {
  return (
    <>
      <SustainabilityPage />
      <Footer />
    </>
  );
}
