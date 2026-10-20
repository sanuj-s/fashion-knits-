'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface ProductItem {
  id: string;
  category: string;
  type: string;
  description: string;
  image: string;
}

const PRODUCTS: ProductItem[] = [
  { id: 'tshirts', category: 'T-Shirts', type: 'tops', description: 'Crew, V-neck, relaxed and oversized knit tops for core and seasonal collections.', image: '/assets/products/product_tshirt.webp' },
  { id: 'polos', category: 'Polos', type: 'tops', description: 'Knit polo styles developed around the requested collar, placket, fit and trim details.', image: '/assets/products/product_polo.webp' },
  { id: 'sweatshirts', category: 'Sweatshirts', type: 'fleece', description: 'Crewneck and other sweatshirt styles for casual, uniform and seasonal ranges.', image: '/assets/products/product_sweatshirt.webp' },
  { id: 'hoodies', category: 'Hoodies', type: 'fleece', description: 'Pullover and zip hoodie programs shaped around the buyer’s fit and construction brief.', image: '/assets/products/product_hoodie.webp' },
  { id: 'sportswear', category: 'Sportswear & Active', type: 'performance', description: 'Knit activewear concepts, with fabric performance and test requirements agreed for each order.', image: '/assets/products/product_sportswear.webp' },
  { id: 'casualwear', category: 'Casualwear & Lounge', type: 'tops', description: 'Relaxed tops, bottoms and coordinated knitwear for everyday and lounge collections.', image: '/assets/products/product_casualwear.webp' },
  { id: 'kidswear', category: 'Kidswear & Babywear', type: 'kids', description: 'Children’s and infant knitwear. Product safety and material standards must be confirmed for each program.', image: '/assets/products/product_kidswear.webp' },
  { id: 'custom_oem', category: 'Custom Programs & OEM', type: 'bespoke', description: 'Custom development based on your reference sample, tech pack, target materials and private-label brief.', image: '/assets/products/product_custom_oem.webp' },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Categories' },
  { id: 'tops', label: 'Tops & Polos' },
  { id: 'fleece', label: 'Fleece & Terry' },
  { id: 'performance', label: 'Activewear' },
  { id: 'kids', label: 'Baby & Kids' },
  { id: 'bespoke', label: 'Custom OEM' },
];

export function Products() {
  const [activeFilter, setActiveFilter] = useState('all');
  const router = useRouter();
  const filteredProducts = activeFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((product) => product.type === activeFilter);

  const enquireAbout = (productId: string) => {
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product) return;
    window.dispatchEvent(new CustomEvent('fashion-knits:product-interest', { detail: product.category }));
    router.push(`/get-a-quote?product=${encodeURIComponent(product.category)}`);
  };

  return (
    <section id="products" className="relative border-b border-white/10 bg-charcoal px-5 py-20 text-off-white sm:px-8 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[100rem]">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs font-mono font-semibold uppercase tracking-[0.22em] text-accent">01 / Knitwear categories</span>
        </div>
        <SectionHeading
          title={'KNITWEAR FOR\nYOUR COLLECTION.'}
          subtitle="Fashion Knits works with apparel brands on knit tops, fleece, activewear, children’s styles and custom programs. Share a reference or tech pack to discuss a suitable construction."
          light={true}
        />

        <div className="mt-10 flex flex-col gap-4 border-b border-white/10 pb-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label="Filter product categories" className="flex flex-wrap items-center gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                aria-pressed={activeFilter === tab.id}
                className={`min-h-10 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.11em] transition-colors ${activeFilter === tab.id ? 'bg-accent text-charcoal' : 'border border-white/15 bg-white/5 text-white/70 hover:border-white/35 hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <span aria-live="polite" className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/50">
            {filteredProducts.length} categories
          </span>
        </div>

        <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45 sm:text-[10px]">
          Illustrative garment photographs · style and labels shown are not Fashion Knits production samples
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {filteredProducts.map((product) => (
            <article key={product.id} className="group flex h-full flex-col overflow-hidden rounded-[1rem] border border-white/10 bg-[#201e1b] transition-colors hover:border-accent/55">
              <figure className="relative aspect-[4/3] overflow-hidden bg-[#292620]">
                <Image
                  src={product.image}
                  alt={`Illustrative ${product.category.toLowerCase()} garment photograph; not a Fashion Knits sample`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.035]"
                />
                <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/85 backdrop-blur sm:text-[9px]">
                  Style reference
                </span>
              </figure>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-xl font-medium tracking-[-0.035em] text-white">{product.category}</h3>
                <p className="mt-2 flex-1 text-xs leading-6 text-white/65 sm:text-[13px]">{product.description}</p>
                <button
                  type="button"
                  onClick={() => enquireAbout(product.id)}
                  className="group/button mt-5 inline-flex min-h-11 items-center justify-between border-t border-white/10 pt-3 text-left text-[9px] font-semibold uppercase tracking-[0.13em] text-accent transition-colors hover:text-white sm:text-[10px]"
                >
                  Discuss this category
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-white/55">Fiber, fabric weight, finishes, order quantities and timing are confirmed against each buyer brief.</p>
          <Link href="/products" className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:text-white sm:text-xs">
            Browse the product catalogue <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
