'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { id: 'tshirts', filter: 'tops', name: 'T-Shirts', description: 'Crew, V-neck, relaxed and oversized knit tops. Construction, fabric and fit are developed against your brief.', image: '/assets/products/product_tshirt.webp' },
  { id: 'polos', filter: 'tops', name: 'Polos', description: 'Knit polo styles shaped around the requested collar, placket, fit and trim details.', image: '/assets/products/product_polo.webp' },
  { id: 'sweatshirts', filter: 'fleece', name: 'Sweatshirts', description: 'Crewneck and other sweatshirt styles for casual, uniform and seasonal ranges.', image: '/assets/products/product_sweatshirt.webp' },
  { id: 'hoodies', filter: 'fleece', name: 'Hoodies', description: 'Pullover and zip hoodie programs developed from your fit and construction requirements.', image: '/assets/products/product_hoodie.webp' },
  { id: 'sportswear', filter: 'active', name: 'Sportswear & Active', description: 'Knit activewear concepts. Fabric performance and test requirements are agreed for each program.', image: '/assets/products/product_sportswear.webp' },
  { id: 'casualwear', filter: 'tops', name: 'Casualwear & Lounge', description: 'Relaxed tops, bottoms and coordinated knitwear for everyday and lounge collections.', image: '/assets/products/product_casualwear.webp' },
  { id: 'kidswear', filter: 'kids', name: 'Kidswear & Babywear', description: 'Children’s and infant knitwear. Product safety requirements must be confirmed for each program.', image: '/assets/products/product_kidswear.webp' },
  { id: 'custom', filter: 'custom', name: 'Custom Programs & OEM', description: 'Custom development based on your reference sample, tech pack, target materials and private-label brief.', image: '/assets/products/product_custom_oem.webp' },
];

const FILTERS = [
  { id: 'all', label: 'All categories' },
  { id: 'tops', label: 'Tops & polos' },
  { id: 'fleece', label: 'Fleece & terry' },
  { id: 'active', label: 'Activewear' },
  { id: 'kids', label: 'Kidswear' },
  { id: 'custom', label: 'Custom OEM' },
];

export function ProductsClient() {
  const [activeFilter, setActiveFilter] = useState('all');
  const visibleCategories = activeFilter === 'all' ? CATEGORIES : CATEGORIES.filter((item) => item.filter === activeFilter);

  return (
    <div className="bg-warm-white text-charcoal">
      <section className="border-b border-white/10 bg-charcoal px-5 pb-14 pt-28 text-off-white sm:px-8 sm:pb-16 sm:pt-32 lg:px-16 lg:pb-20">
        <div className="mx-auto max-w-[90rem]">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-accent sm:text-xs"><Link href="/" className="hover:text-white">Home</Link><span aria-hidden="true" className="text-white/35">/</span><span aria-current="page" className="text-white/75">Products</span></nav>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Knitwear for apparel brands</p>
          <h1 className="max-w-4xl text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">Product <span className="text-accent">categories.</span></h1>
          <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-white/70 sm:text-base">Explore the knitwear categories Fashion Knits presents to buyers. Share a tech pack, reference sample, fabric direction or private-label brief to confirm what can be developed for your order.</p>
            <Link href="#contact" className="inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-accent px-5 text-[10px] font-bold uppercase tracking-[0.14em] text-charcoal transition-colors hover:bg-[#e5c78e]">Discuss your requirements <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section id="catalogue" aria-labelledby="catalogue-title" className="px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[90rem]">
          <div className="flex flex-col gap-5 border-b border-charcoal/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div><h2 id="catalogue-title" className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl">Browse by garment type</h2><p className="mt-2 text-xs leading-5 text-charcoal/55">Available materials, minimums and production timing depend on the style and order brief.</p></div>
            <span aria-live="polite" className="font-mono text-[10px] uppercase tracking-[0.12em] text-charcoal/50">{visibleCategories.length} categories</span>
          </div>

          <div role="group" aria-label="Filter product categories" className="mt-5 flex flex-wrap gap-2">
            {FILTERS.map((filter) => <button key={filter.id} type="button" aria-pressed={activeFilter === filter.id} onClick={() => setActiveFilter(filter.id)} className={`min-h-10 rounded-full px-4 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#907348] ${activeFilter === filter.id ? 'bg-charcoal text-white' : 'border border-charcoal/15 bg-white text-charcoal/65 hover:border-charcoal/35 hover:text-charcoal'}`}>{filter.label}</button>)}
          </div>

          <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.13em] text-charcoal/50 sm:text-[10px]">Illustrative garment imagery · garments and labels shown are not Fashion Knits production samples</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {visibleCategories.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-[1rem] border border-charcoal/10 bg-white">
                <figure className="relative aspect-[4/3] overflow-hidden bg-[#e7e3dc]">
                  <Image src={item.image} alt={`Illustrative ${item.name.toLowerCase()} style reference, not a Fashion Knits production sample`} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/55 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-white">Style reference</span>
                </figure>
                <div className="flex min-h-44 flex-col p-5">
                  <h3 className="text-xl font-medium tracking-[-0.035em]">{item.name}</h3>
                  <p className="mt-2 flex-1 text-xs leading-5 text-charcoal/60">{item.description}</p>
                  <Link href="/#contact" className="mt-5 inline-flex min-h-10 items-center justify-between border-t border-charcoal/10 pt-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#856c42] hover:text-charcoal">Discuss this category <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
