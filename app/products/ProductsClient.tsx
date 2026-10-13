'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Layers,
  Scissors,
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
      {/* Editorial Header */}
      <section className="grain relative bg-charcoal text-off-white pt-40 pb-28 px-6 md:px-16 lg:px-24 border-b border-white/10 overflow-hidden">
        <div className="max-w-[90rem] mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-accent mb-8">
            <Link href="/" className="hover:text-off-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-off-white/80">Product Catalogue</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-4xl">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent block mb-3 font-semibold">
                Commercial Knitted Apparel Portfolio
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.95]">
                <span className="block text-off-white">PRODUCT</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#f0dcae] to-accent mt-1">
                  CATALOGUE.
                </span>
              </h1>
              <p className="text-base sm:text-xl text-off-white/75 mt-8 max-w-2xl leading-relaxed font-normal">
                Explore our export-grade knitted garment portfolio. Manufactured for international fashion brands, private labels, and retail distributors across our two specialized facilities in Tiruppur, India.
              </p>
            </div>

            <div className="p-8 bg-black/40 border border-white/10 backdrop-blur-md max-w-md flex-shrink-0">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mb-2">
                Manufacturing Highlights
              </span>
              <div className="space-y-2 text-xs font-mono text-off-white/80">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-muted-gray">STANDARD MOQS</span>
                  <span className="text-accent font-semibold">800 – 1,000 PCS</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-muted-gray">PRODUCTION LEAD TIME</span>
                  <span className="text-off-white">45 – 65 DAYS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-gray">SAMPLING TURNAROUND</span>
                  <span className="text-accent font-semibold">7 – 10 DAYS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalogue Section */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-[90rem] mx-auto">
          {/* Category Filter Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-charcoal/10">
            <div className="flex flex-wrap items-center gap-2">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-charcoal text-off-white font-bold'
                      : 'bg-pure-white text-charcoal/70 border border-charcoal/10 hover:border-charcoal/30'
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
                  className="group bg-pure-white border border-charcoal/10 flex flex-col justify-between hover:border-accent hover:shadow-2xl transition-all duration-500 overflow-hidden"
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
                      href="/#contact"
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
