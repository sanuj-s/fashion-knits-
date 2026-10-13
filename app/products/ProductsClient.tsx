'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Layers,
  Scissors,
  CheckCircle2,
  FileText,
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
    image: '/assets/products/product_tshirt.jpg',
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
    image: '/assets/products/product_polo.jpg',
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
    image: '/assets/products/product_sweatshirt.jpg',
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
    image: '/assets/products/product_hoodie.jpg',
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
    image: '/assets/products/product_sportswear.jpg',
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
    image: '/assets/products/product_casualwear.jpg',
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
    image: '/assets/products/product_kidswear.jpg',
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
    image: '/assets/products/product_custom_oem.jpg',
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

  const handleRequestQuote = (category: string) => {
    const contactForm = document.getElementById('contact');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
      // Pre-select product dropdown if present
      const select = document.getElementById('product-interest-select') as HTMLSelectElement | null;
      if (select) {
        select.value = category;
      }
    }
  };

  return (
    <div className="bg-warm-white text-charcoal">
      {/* Editorial Header */}
      <section className="bg-charcoal text-off-white pt-36 pb-20 px-6 md:px-16 lg:px-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-accent mb-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span className="text-off-white/70">Product Catalogue</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent block mb-3">
                Commercial Knitted Apparel Portfolio
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-off-white">
                PRODUCT<br />
                <span className="text-accent">CATALOGUE.</span>
              </h1>
              <p className="text-sm sm:text-base text-off-white/80 mt-6 leading-relaxed">
                Explore our export-grade knitted garment portfolio. Manufactured for international fashion brands, private labels, and retail distributors across our two specialized facilities in Tiruppur, India.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 max-w-sm">
              <span className="text-xs font-mono uppercase tracking-widest text-accent block mb-1">
                Buyer Technical Assurance
              </span>
              <p className="text-xs text-off-white/70 leading-relaxed font-mono">
                GOTS &amp; OCS Organic Cotton // OEKO-TEX® Class I Baby-Safe // 100% Needle Detector Scanned // AQL 2.5 Inspection Standard
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mt-12 pb-2 overflow-x-auto scrollbar-none">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-accent text-charcoal font-bold shadow-sm'
                      : 'bg-white/5 text-off-white/70 hover:bg-white/10 hover:text-off-white border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Product Grid */}
      <section className="py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const isExpanded = expandedId === product.id;
              return (
                <div
                  key={product.id}
                  className="group bg-pure-white border border-charcoal/10 hover:border-accent transition-all duration-300 flex flex-col justify-between shadow-sm"
                >
                  {/* Top Image Card */}
                  <div>
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-charcoal/5">
                      <img
                        src={product.image}
                        alt={product.category}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                        loading="lazy"
                      />

                      {/* Organic Certified Badge */}
                      {product.organicCertified && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-charcoal/90 backdrop-blur-md border border-white/15 text-[10px] font-mono text-accent uppercase tracking-widest">
                            <ShieldCheck className="w-3 h-3 text-accent" />
                            GOTS Organic
                          </span>
                        </div>
                      )}

                      {/* Weight GSM Pill */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="px-2.5 py-1 bg-pure-white/95 backdrop-blur-md text-[10px] font-mono text-charcoal uppercase tracking-widest font-semibold border border-charcoal/10 shadow-sm">
                          {product.weightGsm}
                        </span>
                      </div>
                    </div>

                    {/* Content Block */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-charcoal uppercase tracking-wider group-hover:text-accent transition-colors">
                        {product.category}
                      </h3>
                      <p className="text-xs font-mono text-accent mt-0.5">
                        {product.subtitle}
                      </p>
                      <p className="text-xs text-charcoal/70 leading-relaxed mt-3">
                        {product.description}
                      </p>

                      {/* Expandable Technical Specs Drawer */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-charcoal/10 space-y-3 text-xs font-mono">
                          <div>
                            <span className="text-muted-gray uppercase tracking-widest text-[10px] block">
                              Fiber Composition:
                            </span>
                            <span className="text-charcoal font-medium">
                              {product.composition}
                            </span>
                          </div>

                          <div>
                            <span className="text-muted-gray uppercase tracking-widest text-[10px] block">
                              Yarn Counts:
                            </span>
                            <span className="text-charcoal font-medium">
                              {product.yarnCounts}
                            </span>
                          </div>

                          <div>
                            <span className="text-muted-gray uppercase tracking-widest text-[10px] block mb-1">
                              Technical Finishes:
                            </span>
                            <ul className="space-y-1">
                              {product.finishes.map((f, i) => (
                                <li key={i} className="flex items-center gap-1.5 text-charcoal/80">
                                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <span className="text-muted-gray uppercase tracking-widest text-[10px] block mb-1">
                              Customization Options:
                            </span>
                            <ul className="space-y-1">
                              {product.customization.map((c, i) => (
                                <li key={i} className="flex items-center gap-1.5 text-charcoal/80">
                                  <span className="w-1.5 h-1.5 rounded-full bg-charcoal" />
                                  <span>{c}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-2 border-t border-charcoal/5 flex items-center justify-between text-[11px]">
                            <span className="text-muted-gray">MOQ:</span>
                            <span className="font-bold text-charcoal">{product.moq}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-6 pt-0 space-y-2">
                    <button
                      onClick={() => toggleExpand(product.id)}
                      className="w-full py-2.5 px-3 bg-off-white hover:bg-charcoal/5 text-charcoal/80 text-[11px] font-mono uppercase tracking-widest flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Specs' : 'Technical Specs'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-accent" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-accent" />
                      )}
                    </button>

                    <button
                      onClick={() => handleRequestQuote(product.category)}
                      className="w-full py-3 px-4 bg-charcoal hover:bg-accent hover:text-charcoal text-off-white text-xs font-mono uppercase tracking-widest font-bold transition-colors cursor-pointer"
                    >
                      Request Quote / Sample
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OEM Fabric Swatch & Customization Capabilities */}
      <section className="bg-off-white py-24 px-6 md:px-16 lg:px-24 border-t border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold block">
                Custom Apparel Programs
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-charcoal">
                ENGINEERED TO YOUR<br />
                <span className="text-accent">EXACT TECH PACK.</span>
              </h2>
              <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed">
                Whether you need bespoke GSM fabric development, Pantone-matched reactive eco-dyeing, high-density screen printing, or private-label trims, Fashion Knits offers turnkey OEM garment manufacturing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 bg-pure-white border border-charcoal/10">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal block mb-1">
                    Fabric Swatch Library
                  </span>
                  <p className="text-xs text-charcoal/60 leading-relaxed">
                    Single Jersey, Pique, French Terry, Interlock, 1x1 &amp; 2x2 Rib, Waffle, and custom Spandex stretch blends.
                  </p>
                </div>

                <div className="p-5 bg-pure-white border border-charcoal/10">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal block mb-1">
                    Pantone Lab Dip Service
                  </span>
                  <p className="text-xs text-charcoal/60 leading-relaxed">
                    Color-matching under standard D65 and store light sources with spectrophotometer Delta-E &lt; 0.5 approval swatches.
                  </p>
                </div>

                <div className="p-5 bg-pure-white border border-charcoal/10">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal block mb-1">
                    Embellishment &amp; Print
                  </span>
                  <p className="text-xs text-charcoal/60 leading-relaxed">
                    High-density rubber prints, waterbase, puff, discharge, silicone badges, and computerized embroidery.
                  </p>
                </div>

                <div className="p-5 bg-pure-white border border-charcoal/10">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal block mb-1">
                    Turnkey Private Label
                  </span>
                  <p className="text-xs text-charcoal/60 leading-relaxed">
                    Woven labels, care tags, FSC hangtags, barcode stickers, individual bio-polybags, and export master cartons.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-charcoal/15 shadow-md">
                <img
                  src="/assets/products/product_custom_oem.jpg"
                  alt="Custom OEM Garment Samples and Fabric Swatches"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-charcoal/95 backdrop-blur-md text-off-white text-xs font-mono border border-white/10 flex items-center justify-between">
                  <span>SAMPLE DEVELOPMENT: 7 – 10 DAYS</span>
                  <span className="text-accent">PANTONE TCX / TPG</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
