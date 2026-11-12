import type { Metadata } from 'next';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Get a Quote | Fashion Knits',
  description:
    'Share your knitwear product, quantity, destination and manufacturing requirements with Fashion Knits in Tiruppur, India.',
};

export default async function GetAQuotePage({
  searchParams,
}: {
  searchParams: Promise<{
    product?: string | string[];
    productId?: string | string[];
    productName?: string | string[];
    productCategory?: string | string[];
    fabric?: string | string[];
    color?: string | string[];
    customizations?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;
  const product = first(params.product);
  const productId = first(params.productId);
  const productName = first(params.productName);
  const productCategory = first(params.productCategory);
  const fabric = first(params.fabric);
  const color = first(params.color);
  const customizations = first(params.customizations);

  return (
    <>
      <Contact
        initialProductInterest={productCategory ?? product}
        initialGarment={productId && productName && productCategory ? {
          id: productId,
          name: productName,
          category: productCategory,
          fabric,
          color,
          customizations,
        } : undefined}
      />
      <Footer />
    </>
  );
}
