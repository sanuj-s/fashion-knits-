'use client';

import React, { useState, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShieldCheck, Check, Sparkles, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { updatePointerTilt, resetPointerTilt } from '@/components/ui/pointerTilt';

interface ProductItem {
  id: string;
  category: string;
  type: string;
  description: string;
  image: string;
  composition: string;
  weightGsm: string;
  finishes: string[];
  customization: string[];
  organicCertified: boolean;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'tshirts',
    category: 'T-Shirts',
    type: 'tops',
    description: 'Essential crewneck tees, modern relaxed fits, v-necks, and oversized drop-shoulder silhouettes.',
    image: '/assets/products/product_tshirt.webp',
    composition: '100% Combed Cotton, Micro-Modal, Organic Cotton',
    weightGsm: '160 – 220 GSM Single Jersey',
    finishes: ['Bio-Wash Enzyme Finish', 'Silicon Softener', 'Pre-Shrunk < 5%'],
    customization: ['Custom Pantone Color Dyeing', 'High-Density Chest Print', 'Woven Brand Neck Label'],
    organicCertified: true,
  },
  {
    id: 'polos',
    category: 'Polos',
    type: 'tops',
    description: 'Classic and modern polo shirts with engineered flat-knit jacquard collars and reinforced plackets.',
    image: '/assets/products/product_polo.webp',
    composition: '100% Cotton Honeycomb Pique, Mercerized Cotton',
    weightGsm: '220 – 260 GSM Pique Knit',
    finishes: ['Anti-Pilling Treatment', 'Silicon Touch', 'Side-Vent Reinforcements'],
    customization: ['Tipped Rib Collar & Cuffs', 'Engraved Mother-of-Pearl Buttons', 'Chest Embroidery'],
    organicCertified: true,
  },
  {
    id: 'sweatshirts',
    category: 'Sweatshirts',
    type: 'fleece',
    description: 'Raglan and set-in crewneck sweatshirts engineered for cold-weather durability and premium comfort.',
    image: '/assets/products/product_sweatshirt.webp',
    composition: '100% Cotton French Terry, 3-Thread Diagonal Fleece',
    weightGsm: '320 – 380 GSM Heavyweight Terry',
    finishes: ['Heavy Rib Neck & Hem Band', 'Triangle V-Stitch Insert', 'Enzyme Bio-Polishing'],
    customization: ['Garment Wash & Vintage Dye', 'Chenille & Applique Patches', 'Custom Hem Label'],
    organicCertified: true,
  },
  {
    id: 'hoodies',
    category: 'Hoodies',
    type: 'fleece',
    description: 'Pullover and full-zip hooded sweatshirts with 3-piece lined hoods and reinforced kangaroo pockets.',
    image: '/assets/products/product_hoodie.webp',
    composition: 'Heavyweight Cotton/Polyester Brushed Fleece, 100% Organic Cotton',
    weightGsm: '340 – 420 GSM Brushed Fleece',
    finishes: ['Peach Skin Soft Touch', 'Coverstitch Construction', 'Dense Thermal Interior'],
    customization: ['Custom Metal Aglets & Drawcords', 'All-Over Print (AOP)', 'Debossed Leather Trims'],
    organicCertified: true,
  },
  {
    id: 'sportswear',
    category: 'Sportswear & Active',
    type: 'performance',
    description: 'Coordinated performance collections: rapid-dry athletic T-shirts, athletic shorts, and technical track pants.',
    image: '/assets/products/product_sportswear.webp',
    composition: 'Polyester/Spandex Interlock, Recycled Micro-Mesh & Stretch Blends',
    weightGsm: '160 – 220 GSM Quick-Dry',
    finishes: ['Hydrophilic Moisture Management', 'Anti-Microbial & Anti-Odor', 'Flatlock Ergonomic Seams'],
    customization: ['Reflective Heat-Transfer Logos', 'Zippered Ankle & Pocket Details', 'Sublimation Print'],
    organicCertified: false,
  },
  {
    id: 'casualwear',
    category: 'Casualwear & Lounge',
    type: 'tops',
    description: 'Coordinated loungewear sets: relaxed crewneck sweatshirts, fleece joggers, everyday tees, and textured waffle shorts.',
    image: '/assets/products/product_casualwear.webp',
    composition: 'Heavyweight Cotton Jersey, French Terry, Waffle Knit, Rib Knit',
    weightGsm: '240 – 340 GSM Loungewear Terry',
    finishes: ['Pigment Wash / Garment Dye', 'Brushed Hand-Feel', 'Pre-Shrunk Compacting'],
    customization: ['Custom Garment Dye Palettes', 'Cotton Drawstrings & Metal Eyelets', 'Custom Brand Labeling'],
    organicCertified: true,
  },
  {
    id: 'kidswear',
    category: 'Kidswear & Babywear',
    type: 'kids',
    description: 'Authentic childrenswear: ribbed infant rompers with snaps, toddler crew tees, cozy fleece sweatshirts, and matching shorts.',
    image: '/assets/products/product_kidswear.webp',
    composition: 'OEKO-TEX® Product Class I Certified 100% Organic Combed Cotton',
    weightGsm: '160 – 260 GSM Rib, Interlock & Fleece',
    finishes: ['Zero Chemical Irritants', 'Nickel-Free Shoulder Snaps', 'Waterbase Inks Only'],
    customization: ['Snap Plackets for Easy Dressing', 'Baby-Safe Flat Seams', 'Organic Cotton Brand Tags'],
    organicCertified: true,
  },
  {
    id: 'custom_oem',
    category: 'Custom Programs & OEM',
    type: 'bespoke',
    description: 'Bespoke sampling & development: comprehensive fabric swatch libraries, Pantone color options, custom jacquard trims, and private label execution.',
    image: '/assets/products/product_custom_oem.webp',
    composition: 'Custom Yarn Blends & Fabric Constructions to Tech Pack Spec',
    weightGsm: 'Full Custom Grammages (120 to 450 GSM)',
    finishes: ['Custom CAD Grading & Nesting', 'Proprietary Enzyme & Silicon Washes', 'Full AQL 2.5 Audit'],
    customization: ['Complete Private Label Package', 'Retail Barcode & RFID Packing', 'Direct Port Logistics'],
    organicCertified: true,
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Categories' },
  { id: 'tops', label: 'Tops & Polos' },
  { id: 'fleece', label: 'Fleece & Terry' },
  { id: 'performance', label: 'Activewear' },
  { id: 'kids', label: 'Baby & Kids' },
  { id: 'bespoke', label: 'Custom OEM' },
];

const PRODUCT_INTEREST_BY_ID: Record<string, string> = {
  tshirts: 'T-Shirts',
  polos: 'Polos',
  sweatshirts: 'Sweatshirts',
  hoodies: 'Hoodies',
  sportswear: 'Sportswear',
  casualwear: 'Casualwear',
  kidswear: 'Kidswear',
  custom_oem: 'Custom OEM',
};

export function Products() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredProducts =
    activeFilter === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.type === activeFilter || (activeFilter === 'tops' && (p.id === 'tshirts' || p.id === 'polos' || p.id === 'casualwear')));

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const scrollToContact = (productId: string) => {
    const interest = PRODUCT_INTEREST_BY_ID[productId];
    if (interest) {
      window.dispatchEvent(new CustomEvent('fashion-knits:product-interest', { detail: interest }));
    }

    const el = document.getElementById('contact');
    if (el) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section id="products" className="grain relative bg-charcoal text-off-white py-20 sm:py-24 lg:py-32 px-6 md:px-16 lg:px-24 border-b border-white/10">
      <div className="max-w-[90rem] mx-auto">
        {/* Editorial Eyebrow with numbering */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
            04 // Product Portfolio
          </span>
        </div>

        {/* Section Heading with Masked Line Reveal */}
        <SectionHeading
          title={'PRODUCT\nPORTFOLIO.'}
          subtitle="Precision knitted apparel manufactured for international fashion labels, retail chains, and private brands across categories."
          light={true}
        />

        {/* Filter Navigation */}
        <div className="mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div role="group" aria-label="Filter product categories" className="flex flex-wrap items-center gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                aria-pressed={activeFilter === tab.id}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-accent text-charcoal font-bold'
                    : 'bg-white/5 text-off-white/70 border border-white/10 hover:border-white/30 hover:text-off-white'
                } rounded-full`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span aria-live="polite" aria-atomic="true" className="text-[11px] font-mono text-off-white/60">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Export Product Category' : 'Export Product Categories'}
          </span>
        </div>

        {/* Product Cards Grid with Real Product Photography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12">
          {filteredProducts.map((product) => {
            const isExpanded = expandedId === product.id;

            return (
              <div
                key={product.id}
                onPointerMove={updatePointerTilt}
                onPointerLeave={resetPointerTilt}
                className="product-card-reveal premium-card pointer-tilt group rounded-2xl bg-[#161413] border border-white/10 flex flex-col justify-between hover:border-accent hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Category image in a consistent 3:4 crop */}
                <div>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/60 border-b border-white/10">
                    <Image
                      src={product.image}
                      alt={`Fashion Knits ${product.category} production sample`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />

                    {/* Organic Tag */}
                    {product.organicCertified && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/90 backdrop-blur-md text-off-white text-[9px] font-mono tracking-widest uppercase border border-white/10">
                          <ShieldCheck className="w-3 h-3 text-accent" />
                          GOTS Organic
                        </span>
                      </div>
                    )}

                    {/* Grammage Badge */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="px-2.5 py-1 bg-black/90 backdrop-blur-md text-accent text-[9px] font-mono font-bold tracking-wider uppercase border border-white/20 shadow-sm">
                        {product.weightGsm}
                      </span>
                    </div>
                  </div>

                  {/* Category name and expandable technical specifications */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-off-white tracking-[-0.035em] mb-2 group-hover:text-accent transition-colors duration-300">
                      {product.category}
                    </h3>

                    {/* Expandable Technical Specifications */}
                    <div
                      id={`specs-${product.id}`}
                      hidden={!isExpanded}
                      aria-hidden={!isExpanded}
                      className={`${isExpanded ? 'specs-panel' : ''} mt-4 pt-4 border-t border-white/10 space-y-3 text-left`}
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase text-muted-gray block">
                          Fabric Composition:
                        </span>
                        <span className="text-xs font-mono font-semibold text-off-white block mt-0.5">
                          {product.composition}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase text-muted-gray block">
                          Finishing Options:
                        </span>
                        <div className="space-y-1 mt-1">
                          {product.finishes.map((finish, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-1.5 text-[10px] font-mono text-off-white/80">
                              <Check className="w-3 h-3 text-accent flex-shrink-0" />
                              <span>{finish}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <span className="text-[10px] font-mono uppercase text-accent font-semibold block flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Customization / OEM:
                        </span>
                        <div className="space-y-1 mt-1">
                          {product.customization.map((c, cIdx) => (
                            <div key={cIdx} className="text-[10px] font-mono text-off-white/70">
                              • {c}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Action Buttons */}
                <div className="p-6 pt-0 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => toggleExpand(product.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`specs-${product.id}`}
                    className="w-full py-2 bg-white/5 hover:bg-white/10 text-off-white text-[11px] font-mono uppercase tracking-wider border border-white/10 flex items-center justify-between px-3 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Specs' : 'Technical Specs'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-accent" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-muted-gray" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToContact(product.id)}
                    className="btn-shine w-full py-3 bg-accent text-charcoal text-[11px] font-mono uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer"
                  >
                    Enquire about this style
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Product Catalogue */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-gray">
            Looking for Custom Blends or Grammages?
          </span>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-accent hover:text-off-white transition-colors font-bold group"
          >
            <span>View Complete Product Catalogue</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
