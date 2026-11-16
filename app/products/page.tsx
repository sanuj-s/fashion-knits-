import type { Metadata } from 'next';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { ProductsClient } from './ProductsClient';
import { MATERIAL_DIRECTIONS } from './products-experience-data';
import { EnquiryCTA } from '@/components/sections/EnquiryCTA';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Knitwear Products for Apparel Brands | Fashion Knits',
  description:
    'Explore knitwear categories presented by Fashion Knits in Tiruppur, India. Discuss garment development and order requirements with the team.',
  keywords: [
    'knitwear catalogue',
    'Tiruppur garment exporter',
    'custom polo manufacturer',
    'kidswear knitwear development',
    'fleece hoodie OEM',
    'activewear manufacturer India',
  ],
};

export default function ProductsPage() {
  const materialImages = Object.fromEntries(MATERIAL_DIRECTIONS.flatMap((material) => {
    const filename = `${material.id}.webp`;
    const filepath = join(process.cwd(), 'public', 'materials', filename);
    return existsSync(filepath)
      ? [[material.id, { src: `/materials/${filename}`, alt: material.imageAlt ?? `${material.name} fabric texture` }]]
      : [];
  }));

  return (
    <>
      <ProductsClient materialImages={materialImages} />
      <EnquiryCTA context="products" />
      <Footer />
    </>
  );
}
