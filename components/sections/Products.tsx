'use client';

import React, { useState, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView, useReducedMotion } from '@/lib/hooks';
import { ArrowUpRight, ShieldCheck, Check } from 'lucide-react';

interface ProductItem {
  category: string;
  type: string;
  description: string;
  asset: string;
  fabricSpecs: string;
  weightGsm: string;
  finishes: string[];
  organicAvailable: boolean;
}

const PRODUCTS: ProductItem[] = [
  {
    category: 'T-Shirts',
    type: 'tops',
    description: 'Essential crewnecks, relaxed tees, v-necks, and oversized drop-shoulder silhouettes.',
    asset: '/assets/products/t-shirt.svg',
    fabricSpecs: '100% Combed Cotton, Cotton/Modal, Organic Cotton',
    weightGsm: '160 – 220 GSM Single Jersey',
    finishes: ['Bio-Wash Enzyme Finish', 'Silicon Softener', 'Pre-Shrunk < 5%'],
    organicAvailable: true,
  },
  {
    category: 'Polos',
    type: 'tops',
    description: 'Classic & modern polo constructions with flat-knit jacquard collars and reinforced plackets.',
    asset: '/assets/products/polo.svg',
    fabricSpecs: 'Honeycomb Pique, Slub Pique, Mercerized Cotton',
    weightGsm: '220 – 260 GSM Pique Knit',
    finishes: ['Flat-Knit Collar & Cuff', 'Side-Slit Vents', 'Dyed-to-Match Buttons'],
    organicAvailable: true,
  },
  {
    category: 'Sweatshirts',
    type: 'fleece',
    description: 'Raglan and set-in crewneck sweatshirts engineered for cold-weather durability and comfort.',
    asset: '/assets/products/sweatshirt.svg',
    fabricSpecs: '3-Thread Fleece, Diagonal French Terry, Loopback',
    weightGsm: '320 – 380 GSM Heavyweight Terry',
    finishes: ['Heavy Rib Neck & Hem', 'Triangle V-Stitch Insert', 'Anti-Pilling Treatment'],
    organicAvailable: true,
  },
  {
    category: 'Hoodies',
    type: 'fleece',
    description: 'Pullover and full-zip hoodies with 3-piece lined hoods and reinforced kangaroo pockets.',
    asset: '/assets/products/hoodie.svg',
    fabricSpecs: 'Heavyweight Brushed Fleece, Cotton/Poly Blends',
    weightGsm: '340 – 420 GSM Brushed Fleece',
    finishes: ['3-Piece Lined Hood', 'Metal Aglet Drawcords', 'Coverstitch Seams'],
    organicAvailable: true,
  },
  {
    category: 'Sportswear & Active',
    type: 'performance',
    description: 'Performance-driven athletic apparel with rapid moisture management and ergonomic seams.',
    asset: '/assets/products/sportswear.svg',
    fabricSpecs: 'Polyester/Spandex Interlock, Recycled Micro-Mesh',
    weightGsm: '160 – 200 GSM Quick-Dry',
    finishes: ['Moisture-Wicking Treatment', 'Flatlock Anti-Chafe Seams', 'Sublimation Ready'],
    organicAvailable: false,
  },
  {
    category: 'Casualwear & Lounge',
    type: 'tops',
    description: 'Contemporary loungewear, heavyweight boxy tees, track pants, and comfortable basics.',
    asset: '/assets/products/casualwear.svg',
    fabricSpecs: 'Open-End Heavy Jersey, Waffle Knit, Micro-Rib',
    weightGsm: '240 – 280 GSM Heavy Jersey',
    finishes: ['Vintage Wash / Garment Dye', 'Drop-Shoulder Cut', 'Compacted Hand-Feel'],
    organicAvailable: true,
  },
  {
    category: 'Kidswear & Babywear',
    type: 'kids',
    description: 'Ultra-gentle baby rompers, infant tees, and childrenswear certified completely non-toxic.',
    asset: '/assets/products/kidswear.svg',
    fabricSpecs: 'OEKO-TEX® Class I Certified 100% Organic Cotton',
    weightGsm: '160 – 200 GSM Interlock & Jersey',
    finishes: ['Nickel-Free Shoulder Snaps', 'Non-Toxic Waterbase Inks', 'Zero Chemical Irritants'],
    organicAvailable: true,
  },
  {
    category: 'Custom OEM Programs',
    type: 'bespoke',
    description: 'Bespoke garment manufacturing developed strictly to international buyer tech packs and specs.',
    asset: '/assets/products/custom-garments.svg',
    fabricSpecs: 'Custom Knitting & Fiber Blends to Buyer Spec',
    weightGsm: 'Custom Weights (120 to 450 GSM)',
    finishes: ['Custom CAD Grading & Nesting', 'Buyer Private Label Trims', 'Full AQL Quality Protocol'],
    organicAvailable: true,
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Categories' },
  { id: 'tops', label: 'Tops & Polos' },
  { id: 'fleece', label: 'Fleece & Terry' },
  { id: 'performance', label: 'Active & Sport' },
  { id: 'kids', label: 'Kids & Babywear' },
  { id: 'bespoke', label: 'Bespoke OEM' },
];

export function Products() {
  const [activeFilter, setActiveFilter] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });

  const filteredProducts =
    activeFilter === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.type === activeFilter || (activeFilter === 'tops' && (p.category === 'T-Shirts' || p.category === 'Polos' || p.category === 'Casualwear & Lounge')));

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="products" className="bg-warm-white py-28 md:py-36 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <SectionHeading
          title={'PRODUCT\nRANGE.'}
          subtitle="Comprehensive knitted apparel manufacturing across product categories. Engineered for global fashion brands and retail distributors."
        />

        {/* Filter Navigation & Technical CAD Disclaimer */}
        <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-charcoal/10">
          <div className="flex flex-wrap items-center gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-charcoal text-off-white font-bold'
                    : 'bg-pure-white text-charcoal/70 border border-charcoal/10 hover:border-charcoal/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-[11px] font-mono text-muted-gray flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>CAD TECH PACK SPECS // PRODUCTION SAMPLES SENT ON INQUIRY</span>
          </div>
        </div>

        {/* Product Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-10"
        >
          {filteredProducts.map((product, index) => (
            <div
              key={product.category}
              className="group bg-pure-white border border-charcoal/10 flex flex-col justify-between hover:border-accent hover:shadow-xl transition-all duration-300"
              style={{
                opacity: prefersReducedMotion || isInView ? 1 : 0,
                transform: prefersReducedMotion || isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease-out ${index * 0.05}s, transform 0.5s ease-out ${index * 0.05}s`,
              }}
            >
              {/* Product Visual Area: CAD Spec SVG */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-off-white/50 border-b border-charcoal/5">
                <img
                  src={product.asset}
                  alt={`${product.category} Technical CAD Specification`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />

                {/* Organic Certification Tag */}
                {product.organicAvailable && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-charcoal/90 text-off-white text-[9px] font-mono tracking-widest uppercase border border-white/10">
                      <ShieldCheck className="w-3 h-3 text-accent" />
                      GOTS Organic
                    </span>
                  </div>
                )}

                <div className="absolute bottom-3 left-3 z-10">
                  <span className="px-2 py-0.5 bg-white/95 text-charcoal text-[9px] font-mono font-bold tracking-wider uppercase border border-charcoal/10">
                    {product.weightGsm}
                  </span>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-charcoal uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>{product.category}</span>
                    <ArrowUpRight className="w-4 h-4 text-muted-gray group-hover:text-accent transition-colors" />
                  </h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  <div className="pt-3 border-t border-charcoal/5 space-y-1.5 mb-4">
                    <div className="text-[10px] font-mono text-muted-gray uppercase">
                      Fabric Construction:
                    </div>
                    <div className="text-[11px] font-mono font-medium text-charcoal">
                      {product.fabricSpecs}
                    </div>
                  </div>

                  <div className="space-y-1 mb-4">
                    {product.finishes.map((finish, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-[10px] font-mono text-charcoal/70">
                        <Check className="w-3 h-3 text-accent flex-shrink-0" />
                        <span>{finish}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquiry CTA */}
                <button
                  onClick={scrollToContact}
                  className="w-full py-2.5 mt-2 bg-charcoal/5 group-hover:bg-charcoal text-charcoal group-hover:text-off-white text-[10px] font-mono uppercase tracking-widest font-bold border border-charcoal/10 group-hover:border-charcoal transition-all cursor-pointer"
                >
                  Request Sample / Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
