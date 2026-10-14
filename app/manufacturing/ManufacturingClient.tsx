'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Factory,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Check,
  Building2,
  Layers,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface MachineryPillar {
  id: string;
  department: string;
  facility: string;
  image: string;
  summary: string;
  specs: string[];
  equipmentList: string[];
  capacityNote?: string;
}

const MACHINERY_PILLARS: MachineryPillar[] = [
  {
    id: 'knitting',
    department: 'Circular & Flat Knitting Floor',
    facility: 'Unit-1: Netaji Apparel Park',
    image: '/assets/images/knitting_process.webp',
    summary:
      'High-gauge circular knitting machine array engineered for consistent loop structure, dimensional stability, and zero spirality across jersey, pique, rib, and fleece fabrics.',
    specs: [
      'Machine Gauges: 20GG, 24GG, 28GG, 32GG',
      'Machine Diameters: 24" to 36" Multi-Feeder',
      'Fabric Constructions: Single Jersey, Pique, Interlock, 1x1 & 2x2 Rib, French Terry, Waffle, Fleece',
      'Electronic Lycra / Spandex attachment feeds for uniform stretch elasticity',
    ],
    equipmentList: [
      'High-speed multi-track circular knitting machines',
      'Positive yarn storage feeders with electronic stop motions',
      'Computerized flat-knit collar & cuff jacquard machines',
      'Digital fabric roll length & weight counters',
    ],
  },
  {
    id: 'cutting',
    department: 'CAD Pattern & Multi-Ply Cutting Floor',
    facility: 'Unit-1: Netaji Apparel Park',
    image: '/assets/images/cutting_process.webp',
    summary:
      'Computerized CAD marker optimization synchronized with automated vacuum-clamped multi-ply fabric spreading and precision cutting for minimal fabric scrap and exact tolerances.',
    specs: [
      'Digitized CAD Pattern Grading & Marker Nesting Software',
      'Multi-ply vacuum-clamped spreading tables (up to 48 plies)',
      'Precision cut tolerance: ±0.5mm across all garment panels',
      'Automated laser notch markers and bundle labeling',
    ],
    equipmentList: [
      'CAD marker planning & digitizing workstations',
      'Motorized straight-knife and automated band knife cutters',
      'Air-cushion fabric spreading tables with edge alignment',
      'Barcoded bundle management and ticket tracking system',
    ],
  },
  {
    id: 'sewing',
    department: 'Modular Lean Sewing Assembly Lines',
    facility: 'Unit-1: Netaji Apparel Park',
    image: '/assets/images/stitching_process.webp',
    summary:
      'Dedicated modular sewing lines configured for rapid changeover, ergonomic operator stations, and continuous in-line quality auditing (AQL 2.5) across all stitch styles.',
    specs: [
      '4-Thread & 5-Thread Heavy Overlock for Seam Reinforcement',
      '3-Needle 5-Thread Flatlock / Coverstitch for Hem & Collar Binding',
      'Direct-Drive Single-Needle Lockstitch with Automatic Thread Trimmers',
      'Programmable Computerized Buttonhole & Button Attaching Stations',
    ],
    equipmentList: [
      'Industrial Juki, Brother, Pegasus & Yamato workstation array',
      'Feed-off-the-arm interlock machines for activewear flat-seaming',
      'Heavy-duty electronic bartacking machines for stress points',
      'In-line Q-check stations with lighted inspection mannequins',
    ],
  },
  {
    id: 'dyeing_partner',
    department: 'Certified Wet Processing & Eco-Dyeing',
    facility: 'Audited Partner Processing Houses (Tiruppur Cluster)',
    image: '/assets/images/dyeing_process.webp',
    summary:
      'Partnered with OEKO-TEX® and GOTS certified dyeing facilities operating soft-flow jet vessels with low liquor ratios, computerized dyestuff dispensing, and Zero Liquid Discharge (ZLD).',
    specs: [
      'Low Liquor-Ratio Eco Soft-Flow Jet Dyeing Vessels',
      'Computerized Spectrophotometer Color Matching with Delta-E < 0.5',
      'Non-Toxic ZDHC Compliant Dyestuffs and Bio-Auxiliaries',
      'Relaxation dryers and tensionless stenter compacting lines',
    ],
    equipmentList: [
      'High-temperature soft-flow jet dyeing machines',
      'Automated robotic chemical & dye weighing dispensary',
      'Felt compacting calenders for residual shrinkage control (< 5%)',
      'Biological ETP & RO Zero Liquid Discharge treatment plants',
    ],
    capacityNote: 'Dyeing allocation: Scalable through dedicated audited processing partner agreements',
  },
  {
    id: 'testing_lab',
    department: 'In-House Quality & Fabric Testing Lab',
    facility: 'Unit-1 & Corporate Office',
    image: '/assets/images/quality_process.webp',
    summary:
      'Rigorous physical and chemical testing laboratory ensuring all fabric rolls and finished garments adhere strictly to international buyer AQL 2.5 standards before export packing.',
    specs: [
      'ISO 105-C06 Color Fastness to Washing & Laundering',
      'ISO 105-X12 Dry & Wet Crocking / Rubbing Fastness Test',
      'AATCC 135 / ISO 6330 Dimensional Stability & Fabric Shrinkage Oven',
      '100% Calibrated 0.8mm Ferrous Conveyor Needle Detector Scan',
    ],
    equipmentList: [
      'Standardized D65/TL84/CWF color matching light booths',
      'Digital tensile & seam burst strength testing instruments',
      'Martindale abrasion & pilling resistance testers',
      'Conveyorized multi-channel metal detection tunnels',
    ],
    capacityNote: 'Audit protocol: 100% fabric lot testing and AQL 2.5 / 4.0 finished garment audits',
  },
  {
    id: 'packing_export',
    department: 'Finishing, Packaging & Container Dispatch',
    facility: 'Unit-1: Netaji Apparel Park',
    image: '/assets/images/packing_process.webp',
    summary:
      'Clean finishing floor equipped with vacuum steam ironing tables, thread suction trimmers, retail barcode scanning, and direct container stuffing at Netaji Apparel Park.',
    specs: [
      'Industrial Vacuum Steam Pressing with Moisture Control',
      'Automated Thread Trimming and Suction Lint Removers',
      'Barcode / UPC / RFID Verification against Buyer PO Packing List',
      'Direct 20ft & 40ft container stuffing for bonded port transit',
    ],
    equipmentList: [
      'Vacuum steam ironing stations with boiler steam lines',
      'Thread suction trimming & garment inspection tables',
      'High-speed barcode & RFID scanner terminals',
      'Drop-tested carton strap sealing and pallet stretch wrappers',
    ],
    capacityNote: 'Dispatch capability: Daily export stuffing with bonded transit to Tuticorin/Chennai/Cochin',
  },
];

export function ManufacturingClient() {
  const [expandedPillar, setExpandedPillar] = useState<string | null>('knitting');

  const togglePillar = (id: string) => {
    setExpandedPillar((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-warm-white text-charcoal">
      {/* Editorial Hero Header */}
      <section className="grain relative bg-charcoal text-off-white pt-40 pb-28 px-6 md:px-16 lg:px-24 border-b border-white/10 overflow-hidden">
        <div className="max-w-[90rem] mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-accent mb-8">
            <Link href="/" className="hover:text-off-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-off-white/80">Manufacturing &amp; Infrastructure</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-accent font-semibold mb-6">
                <Factory className="w-3.5 h-3.5 text-accent" />
                <span>2 Strategic Facilities · Tiruppur, India</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.95]">
                <span className="block text-off-white">MANUFACTURING &amp;</span>
                <span className="mt-1 block text-accent">
                  CAPABILITIES.
                </span>
              </h1>
              <p className="text-base sm:text-xl text-off-white/75 mt-8 max-w-2xl leading-relaxed font-normal">
                Dedicated garment manufacturing infrastructure engineered for scale, consistency, and compliance. Operating across our primary corporate office on Angeripalayam Road and our main production facility at Netaji Apparel Park (Unit-1), Tiruppur.
              </p>
            </div>

            <div className="p-8 bg-black/40 border border-white/10 backdrop-blur-md max-w-md flex-shrink-0">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mb-2">
                Operational Framework
              </span>
              <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed font-mono">
                Specialized in-house knitting, CAD cutting, modular sewing, and QA — collaborating with audited spinning mills and certified zero-liquid discharge eco-dyeing houses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Overview */}
      <section className="py-20 sm:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-pure-white border-b border-charcoal/10">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
              01 // Dedicated Production Units
            </span>
          </div>

          <SectionHeading
            title={'PHYSICAL\nINFRASTRUCTURE.'}
            subtitle="Separating executive merchandising from factory-floor operations to guarantee fast sample turnaround and disciplined production control."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-16 md:mt-24">
            {/* Unit 1 */}
            <div className="premium-card group bg-warm-white border border-charcoal/10 overflow-hidden shadow-sm hover:border-accent hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal">
                <picture className="w-full h-full">
                  <source type="image/webp" srcSet="/assets/facilities/factory_netaji_park_exterior.webp" />
                  <img
                    src="/assets/facilities/factory_netaji_park_exterior.jpg"
                    alt="Exterior of the Unit 1 main factory at Netaji Apparel Park"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </picture>
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 bg-charcoal/90 text-accent text-[10px] font-mono uppercase tracking-widest font-bold border border-white/20">
                    Unit-1 // Main Plant
                  </span>
                </div>
                <span className="absolute top-4 right-4 z-10 rounded-full border border-charcoal/10 bg-warm-white/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-charcoal/75 backdrop-blur-md">
                  Representative image
                </span>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold uppercase tracking-tight text-charcoal mb-2">
                  Netaji Apparel Park (Unit-1) Main Factory
                </h3>
                <p className="text-xs font-mono text-muted-gray mb-4">
                  Shed No: 29, Netaji Apparel Park, New Tirupur – 641 666
                </p>
                <p className="text-sm text-charcoal/70 leading-relaxed font-normal">
                  Our core 20,000+ sq.ft production plant houses circular knitting machines, CAD computerized multi-ply cutting tables, synchronized lean sewing assembly lines, steam finishing tunnels, and direct container export packing bays.
                </p>
              </div>
            </div>

            {/* Corporate Office */}
            <div className="premium-card group bg-warm-white border border-charcoal/10 overflow-hidden shadow-sm hover:border-accent hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal">
                <picture className="w-full h-full">
                  <source type="image/webp" srcSet="/assets/facilities/office_angeripalayam_exterior.webp" />
                  <img
                    src="/assets/facilities/office_angeripalayam_exterior.jpg"
                    alt="Exterior of the Fashion Knits corporate office in Angeripalayam"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </picture>
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 bg-charcoal/90 text-accent text-[10px] font-mono uppercase tracking-widest font-bold border border-white/20">
                    Corporate HQ // Showroom
                  </span>
                </div>
                <span className="absolute top-4 right-4 z-10 rounded-full border border-charcoal/10 bg-warm-white/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-charcoal/75 backdrop-blur-md">
                  Representative image
                </span>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold uppercase tracking-tight text-charcoal mb-2">
                  Angeripalayam Corporate Office &amp; Sampling
                </h3>
                <p className="text-xs font-mono text-muted-gray mb-4">
                  Angeripalayam Main Road, Tiruppur – 641 603
                </p>
                <p className="text-sm text-charcoal/70 leading-relaxed font-normal">
                  Our central corporate headquarters manages international buyer accounts, technical merchandising, Pantone color lab dips, proto sampling development, quality assurance auditing, and regulatory compliance documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machinery & Process Pillars Deep-Dive */}
      <section className="py-20 sm:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-off-white border-b border-charcoal/10">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
              02 // Machinery &amp; Departments
            </span>
          </div>

          <SectionHeading
            title={'DEPARTMENTAL\nCAPACITIES.'}
            subtitle="Explore our specialized machinery arrays and equipment allocations across each phase of production."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 md:mt-24">
            {MACHINERY_PILLARS.map((pillar) => {
              const isExpanded = expandedPillar === pillar.id;

              return (
                <div
                  key={pillar.id}
                  className="premium-card group bg-pure-white border border-charcoal/10 hover:border-accent hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal">
                      <picture className="w-full h-full">
                        <source type="image/webp" srcSet={pillar.image} />
                        <img
                          src={pillar.image.replace('.webp', '.jpg')}
                          alt={pillar.department}
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      </picture>
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-1 bg-charcoal/90 text-accent text-[9px] font-mono uppercase tracking-wider font-bold border border-white/20">
                          {pillar.facility}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 md:p-8">
                      <h3 className="text-xl font-bold uppercase tracking-wider text-charcoal mb-2 group-hover:text-accent transition-colors duration-300">
                        {pillar.department}
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-normal mb-6">
                        {pillar.summary}
                      </p>

                      <div className="space-y-2 pt-4 border-t border-charcoal/10">
                        <span className="text-[10px] font-mono uppercase text-muted-gray block font-semibold">
                          Technical Specifications:
                        </span>
                        {pillar.specs.slice(0, 3).map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2 text-xs font-mono text-charcoal/80">
                            <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-charcoal/10 space-y-3 animate-fadeIn">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-muted-gray block font-semibold">
                              Equipment Highlights:
                            </span>
                            <div className="space-y-1 mt-1">
                              {pillar.equipmentList.map((eq, eIdx) => (
                                <div key={eIdx} className="text-xs font-mono text-charcoal/70">
                                  • {eq}
                                </div>
                              ))}
                            </div>
                          </div>
                          {pillar.capacityNote && (
                            <div className="pt-2">
                              <span className="text-[10px] font-mono uppercase text-accent font-semibold block">
                                Operational note:
                              </span>
                              <span className="text-xs font-mono text-charcoal/80 block mt-0.5">
                                {pillar.capacityNote}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 md:p-8 pt-0">
                    <button
                      onClick={() => togglePillar(pillar.id)}
                      className="w-full py-2.5 bg-charcoal/5 hover:bg-charcoal/10 text-charcoal text-[11px] font-mono uppercase tracking-wider border border-charcoal/10 flex items-center justify-between px-3.5 transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Equipment List' : 'View Equipment List'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-accent" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-muted-gray" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audit Schedule CTA */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-pure-white">
        <div className="max-w-[90rem] mx-auto">
          <div className="p-8 md:p-12 bg-charcoal text-off-white border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl grain">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent block mb-2 font-semibold">
                Factory Visits &amp; Buyer Audits
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-off-white">
                Schedule an On-Site Technical Audit
              </h3>
              <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed mt-2 font-normal">
                International brand sourcing directors and QA officers are welcome to tour our Netaji Apparel Park plant and Angeripalayam showroom in Tiruppur.
              </p>
            </div>

            <Link
              href="#contact"
              className="btn-shine px-8 py-4 bg-accent text-charcoal text-xs font-mono uppercase tracking-widest font-bold transition-all duration-300 flex-shrink-0 cursor-pointer"
            >
              Request Factory Tour
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
