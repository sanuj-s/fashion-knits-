'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
} from 'lucide-react';

interface ProductItem {
  id: string;
  category: string;
  type: string;
  subtitle: string;
  description: string;
  image: string;
  composition: string;
  weightGsm: string;
  yarnCounts: string;
  finishes: string[];
  customization: string[];
  moq: string;
  leadTime: string;
  organicCertified: boolean;
}

const CATALOG_PRODUCTS: ProductItem[] = [
  {
    id: 'tshirts',
    category: 'T-Shirts & Core Basics',
    type: 'tops',
    subtitle: 'Classic Crew, V-Neck, Oversized & Drop-Shoulder Styles',
    description:
      'High-grade everyday basic and premium fashion tees. Knitted from combed compact and GOTS certified organic yarns with uniform stitch density and minimal torquing.',
    image: '/assets/products/product_tshirt.webp',
    composition: '100% Combed Cotton, Cotton/Modal, Cotton/Elastane (95/5)',
    weightGsm: '160 – 220 GSM Single Jersey',
    yarnCounts: '26s, 30s, 34s, 40s Combed Compact',
    finishes: ['Bio-Polishing / Enzyme Wash', 'Silicone Softener', 'Anti-Pilling Finish'],
    customization: ['Waterbase & Discharge Screen Print', 'High-Density Rubber Prints', 'Custom Neck Rib & Woven Labels'],
    moq: '1,000 pcs per colorway',
    leadTime: '45 – 60 Days (Proto approved)',
    organicCertified: true,
  },
  {
    id: 'polos',
    category: 'Pique & Jersey Polos',
    type: 'tops',
    subtitle: 'Classic Knit Polos, Jacquard Collars & Modern Flat Knits',
    description:
      'Refined polo shirts with engineered flat-knit jacquard collars and cuffs. Built for corporate, retail, and casual collections with shape retention after repeated laundry cycles.',
    image: '/assets/products/product_polo.webp',
    composition: '100% Cotton Pique, Cotton/Polyester Blend, Mercerized Cotton',
    weightGsm: '220 – 260 GSM Honeycomb & Pique',
    yarnCounts: '24s, 30s Double Yarn (2/30s)',
    finishes: ['Pre-Shrunk Compacting', 'Resin Finish for Collar Stiffening', 'Color Fastness Delta-E < 0.5'],
    customization: ['Custom Engineered Jacquard Collar Stripes', 'Engraved Mother-of-Pearl & Resin Buttons', 'Embroidery & Silicone Badges'],
    moq: '1,000 pcs per colorway',
    leadTime: '50 – 65 Days',
    organicCertified: true,
  },
  {
    id: 'sweatshirts',
    category: 'Heavyweight Sweatshirts',
    type: 'fleece',
    subtitle: 'Crewneck Pullovers, French Terry & Brushed Fleece',
    description:
      'Cozy, durable crewneck sweatshirts engineered for autumn and winter collections. Available in loopback French terry and carbon-brushed inner fleece with heavy 2x2 rib trims.',
    image: '/assets/products/product_sweatshirt.webp',
    composition: '100% Cotton French Terry, 80/20 Cotton/Poly Fleece',
    weightGsm: '320 – 380 GSM Heavyweight Terry',
    yarnCounts: '30s Face / 10s Loop (3-Thread Fleece)',
    finishes: ['Carbon Peach Brushed Fleece', 'Garment Pigment Wash', 'Anti-Shrinkage Heat Setting'],
    customization: ['Chenille & 3D Puff Embroidery', 'Custom Triangular Rib Neck Insert', 'Herringbone Inside Neck Tape'],
    moq: '800 pcs per colorway',
    leadTime: '50 – 60 Days',
    organicCertified: true,
  },
  {
    id: 'hoodies',
    category: 'Pullover & Zip Hoodies',
    type: 'fleece',
    subtitle: 'Double-Layer Hoods, Kangaroo Pockets & Custom Hardware',
    description:
      'Premium heavyweight hoodies built with double-lined hoods, heavy cotton drawcords, reinforced kangaroo pockets, and high-tensile metal aglets and YKK zippers.',
    image: '/assets/products/product_hoodie.webp',
    composition: '100% Organic Cotton French Terry, 3-Thread Brushed Fleece',
    weightGsm: '340 – 420 GSM Ultra-Heavyweight',
    yarnCounts: '32s Face / 12s Fleece Pile',
    finishes: ['Enzyme Peach Touch', 'Pre-Washed for Zero Shrinkage', 'Reactive Eco-Dyeing'],
    customization: ['Heavy Flat Cotton Cords with Metal Tips', 'Direct-to-Film (DTF) & Screen Print', 'Branded YKK Metal Pullers'],
    moq: '800 pcs per colorway',
    leadTime: '50 – 65 Days',
    organicCertified: true,
  },
  {
    id: 'sportswear',
    category: 'Sportswear & Activewear',
    type: 'performance',
    subtitle: 'Technical Athletic Tees, Running Shorts & Track Pants',
    description:
      'Coordinated performance athletic collections engineered for maximum breathability, 4-way stretch recovery, rapid moisture evaporation, and chafeless movement.',
    image: '/assets/products/product_sportswear.webp',
    composition: 'Recycled Polyester/Spandex Interlock, Micro-Mesh Blends',
    weightGsm: '160 – 220 GSM Technical Knit',
    yarnCounts: '50D, 75D Micro-Filament & Poly-Spandex',
    finishes: ['Hydrophilic Quick-Dry Wicking', 'Anti-Microbial & Odor-Control', 'UPF 50+ Sun Protection'],
    customization: ['Laser-Cut Ventilation Eyelets', 'Reflective 3M Heat-Transfer Logos', 'Zippered Concealed Pockets'],
    moq: '1,000 pcs per style',
    leadTime: '50 – 60 Days',
    organicCertified: false,
  },
  {
    id: 'casualwear',
    category: 'Casualwear & Loungewear',
    type: 'tops',
    subtitle: 'Coordinated Sets, Joggers, Waffle Shorts & Everyday Knits',
    description:
      'Modern relaxed loungewear collections combining soft French terry pullovers, elasticated drawstring joggers, boxy drop-shoulder tees, and tactile waffle shorts.',
    image: '/assets/products/product_casualwear.webp',
    composition: '100% Cotton Heavy Jersey, French Terry, Waffle & Thermal Knit',
    weightGsm: '240 – 340 GSM Loungewear Terry',
    yarnCounts: '20s, 24s Combed & 16s Open-End',
    finishes: ['Garment Pigment Dye / Vintage Wash', 'Silicon Softener', 'Pre-Shrunk Compacting'],
    customization: ['Cotton Drawcords with Clean Bartacking', 'Custom Pocket Bags & Metal Eyelets', 'Custom Brand Label Kits'],
    moq: '800 pcs per style',
    leadTime: '50 – 60 Days',
    organicCertified: true,
  },
  {
    id: 'kidswear',
    category: 'Kidswear & Babywear',
    type: 'kids',
    subtitle: 'Organic Baby Rompers, Toddler Tees & Matching Fleece Sets',
    description:
      'Certified non-toxic childrenswear and babywear manufactured strictly under OEKO-TEX® Product Class I (baby-safe) standards with ultra-soft flatlock seams and nickel-free snaps.',
    image: '/assets/products/product_kidswear.webp',
    composition: '100% GOTS Organic Combed Cotton, Interlock & 1x1 Rib',
    weightGsm: '160 – 260 GSM Rib, Interlock & Fleece',
    yarnCounts: '30s, 40s Super-Combed Compact',
    finishes: ['Non-Toxic Waterbase Processing Only', 'Hypoallergenic Softening', 'Zero Formaldehyde or Heavy Metals'],
    customization: ['Nickel-Free Shoulder & Inseam Snaps', 'Envelope Necklines for Easy Dressing', 'Tagless Screen-Printed Neck Labels'],
    moq: '1,000 pcs per style',
    leadTime: '45 – 60 Days',
    organicCertified: true,
  },
  {
    id: 'custom_oem',
    category: 'Custom Programs & OEM',
    type: 'bespoke',
    subtitle: 'Complete Sampling, Pantone Matching & Private Label Packages',
    description:
      'Full-service custom OEM apparel development. Send us your tech packs, target fabric swatches, and Pantone codes, and our merchandising desk will create physical proto samples.',
    image: '/assets/products/product_custom_oem.webp',
    composition: 'Custom Yarn Blends & Fiber Compositions to Buyer Tech Pack',
    weightGsm: 'Full Custom Grammages (120 to 450 GSM)',
    yarnCounts: '20s to 80s Count Array',
    finishes: ['Custom CAD Pattern Grading & Nesting', 'Proprietary Enzyme, Mineral & Acid Washes', 'Full AQL 2.5 Audit'],
    customization: ['Custom Jacquard Collar Trims', 'FSC Hangtags, Barcodes & RFID Bags', 'Direct Container Export Dispatch'],
    moq: 'Custom program MOQ upon review',
    leadTime: 'Sample: 7–10 Days | Bulk: 50–65 Days',
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

export function ProductsClient() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredProducts =
    activeFilter === 'all'
      ? CATALOG_PRODUCTS
      : CATALOG_PRODUCTS.filter(
          (p) =>
            p.type === activeFilter ||
            (activeFilter === 'tops' && (p.id === 'tshirts' || p.id === 'polos' || p.id === 'casualwear'))
        );

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-warm-white text-charcoal">
      {/* Product catalogue hero */}
      <section className="grain relative isolate overflow-hidden border-b border-white/10 bg-charcoal px-5 pb-14 pt-24 text-off-white sm:px-8 sm:pb-16 sm:pt-28 lg:px-16 lg:pb-20 lg:pt-32">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-[90rem]">
          <div className="mb-8 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.22em] text-accent sm:text-xs">
            <Link href="/" className="transition-colors hover:text-off-white">Home</Link>
            <span className="text-white/35">/</span>
            <span className="text-off-white/75">Product catalogue</span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_.98fr] lg:gap-14">
            <div className="catalogue-hero-copy max-w-4xl">
              <span className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-white/[0.035] px-3.5 py-2 text-[9px] font-mono font-semibold uppercase tracking-[0.18em] text-accent sm:text-[10px]">
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                Commercial knitwear · Tiruppur, India
              </span>
              <h1 className="text-[clamp(3.4rem,7.2vw,7rem)] font-semibold uppercase leading-[0.86] tracking-[-0.065em]">
                <span className="block text-off-white">Product</span>
                <span className="mt-2 block text-accent">
                  Catalogue.
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-sm leading-7 text-off-white/70 sm:text-base sm:leading-8 lg:mt-8 lg:text-lg">
                Explore export-ready knitwear for fashion labels, retailers and private brands. Choose a core style or develop a custom program with our Tiruppur team.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
                <a
                  href="#catalogue"
                  className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-5 text-[10px] font-bold uppercase tracking-[0.14em] text-charcoal shadow-[0_12px_32px_rgba(193,158,96,.18)] transition-colors hover:bg-[#e5c78e] sm:px-6 sm:text-xs"
                >
                  Browse collections
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <Link
                  href="#contact"
                  className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white/40 hover:text-white sm:px-6 sm:text-xs"
                >
                  Request a quote
                </Link>
              </div>
            </div>

            <figure className="catalogue-hero-visual motion-photo group relative isolate mx-auto aspect-[4/3] w-full max-w-[48rem] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#29251f] shadow-[0_32px_100px_rgba(0,0,0,.36)] lg:aspect-[1.25/1]">
              <Image
                src="/assets/images/hero_campaign.webp"
                alt="Models wearing refined knitwear in neutral and olive tones"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 48vw"
                className="motion-photo-image object-cover object-[66%_center] transition-transform duration-700 motion-safe:group-hover:scale-[1.16]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151411]/90 via-[#151411]/10 to-black/5" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-2 text-[8px] font-mono font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md sm:left-5 sm:top-5 sm:text-[9px]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Representative collection imagery
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <div className="grid grid-cols-3 divide-x divide-white/15 rounded-xl border border-white/15 bg-[#171614]/75 px-2 py-3 shadow-xl backdrop-blur-xl sm:px-4 sm:py-4">
                  <div className="px-2 sm:px-3">
                    <span className="block text-[8px] font-mono uppercase tracking-[0.14em] text-white/50 sm:text-[9px]">Typical MOQ</span>
                    <span className="mt-1 block text-[10px] font-semibold text-white sm:text-xs">800–1,000 pcs</span>
                  </div>
                  <div className="px-2 sm:px-3">
                    <span className="block text-[8px] font-mono uppercase tracking-[0.14em] text-white/50 sm:text-[9px]">Sampling</span>
                    <span className="mt-1 block text-[10px] font-semibold text-white sm:text-xs">7–10 days</span>
                  </div>
                  <div className="px-2 sm:px-3">
                    <span className="block text-[8px] font-mono uppercase tracking-[0.14em] text-white/50 sm:text-[9px]">Production</span>
                    <span className="mt-1 block text-[10px] font-semibold text-white sm:text-xs">45–65 days</span>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Main Catalogue Section */}
      <section id="catalogue" className="scroll-mt-24 py-20 md:py-28 px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-[90rem] mx-auto">
          {/* Category Filter Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-charcoal/10">
            <div className="flex flex-wrap items-center gap-2">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  aria-pressed={activeFilter === tab.id}
                  className={`min-h-10 rounded-full border px-4 py-2.5 text-[10px] font-mono uppercase tracking-[0.1em] transition-all cursor-pointer motion-safe:hover:-translate-y-0.5 sm:px-5 sm:text-xs ${
                    activeFilter === tab.id
                      ? 'border-charcoal bg-charcoal text-off-white font-bold shadow-[0_8px_20px_rgba(25,24,22,.12)]'
                      : 'border-charcoal/10 bg-pure-white text-charcoal/70 hover:border-accent/60 hover:text-charcoal'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-muted-gray">
              Showing {filteredProducts.length} Product Categories
            </span>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {filteredProducts.map((product) => {
              const isExpanded = expandedId === product.id;

              return (
                <div
                  key={product.id}
                  className="product-card-reveal premium-card group bg-pure-white border border-charcoal/10 flex flex-col justify-between hover:border-accent hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div>
                    {/* Real Commercial Photograph (3:4 ratio) */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-off-white border-b border-charcoal/10">
                      <picture className="w-full h-full">
                        <source type="image/webp" srcSet={product.image} />
                        <img
                          src={product.image.replace('.webp', '.jpg')}
                          alt={`Fashion Knits ${product.category} Production Sample`}
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      </picture>

                      {product.organicCertified && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-charcoal/90 backdrop-blur-md text-off-white text-[9px] font-mono tracking-widest uppercase border border-white/10">
                            <ShieldCheck className="w-3 h-3 text-accent" />
                            GOTS Organic
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="px-2.5 py-1 bg-white/95 text-charcoal text-[9px] font-mono font-bold tracking-wider uppercase border border-charcoal/15 shadow-sm">
                          {product.weightGsm}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 md:p-8">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold block mb-1">
                        {product.subtitle}
                      </span>
                      <h3 className="text-xl font-bold text-charcoal uppercase tracking-wider mb-2 group-hover:text-accent transition-colors duration-300">
                        {product.category}
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-normal mb-6">
                        {product.description}
                      </p>

                      {/* Expandable Specifications */}
                      {isExpanded && (
                        <div className="pt-4 border-t border-charcoal/10 space-y-3.5 text-xs font-mono text-left">
                          <div>
                            <span className="text-[10px] text-muted-gray uppercase block">Fabric Composition:</span>
                            <span className="text-charcoal font-semibold block mt-0.5">{product.composition}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-muted-gray uppercase block">Yarn Count Specification:</span>
                            <span className="text-charcoal font-semibold block mt-0.5">{product.yarnCounts}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-muted-gray uppercase block">Finishes &amp; Treatments:</span>
                            <div className="space-y-1 mt-1">
                              {product.finishes.map((f, i) => (
                                <div key={i} className="flex items-center gap-1.5 text-charcoal/80">
                                  <Check className="w-3 h-3 text-accent flex-shrink-0" />
                                  <span>{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-accent uppercase font-semibold block">Custom OEM Options:</span>
                            <div className="space-y-1 mt-1">
                              {product.customization.map((c, i) => (
                                <div key={i} className="text-charcoal/70 text-[11px]">• {c}</div>
                              ))}
                            </div>
                          </div>
                          <div className="pt-2 border-t border-charcoal/10 flex justify-between">
                            <span className="text-muted-gray">MOQ:</span>
                            <span className="text-charcoal font-semibold">{product.moq}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-gray">LEAD TIME:</span>
                            <span className="text-charcoal font-semibold">{product.leadTime}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-6 md:p-8 pt-0 space-y-2.5">
                    <button
                      onClick={() => toggleExpand(product.id)}
                      className="w-full py-2 bg-charcoal/5 hover:bg-charcoal/10 text-charcoal text-[11px] font-mono uppercase tracking-wider border border-charcoal/10 flex items-center justify-between px-3 transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Collapse Specs' : 'Full Tech Specs'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-accent" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-muted-gray" />
                      )}
                    </button>

                    <Link
                      href="#contact"
                      className="btn-shine block text-center w-full py-3 bg-charcoal hover:bg-accent hover:text-charcoal text-off-white text-[11px] font-mono uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      Request Quotation
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
