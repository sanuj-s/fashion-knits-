'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Factory,
  Cpu,
  Scissors,
  Layers,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Calendar,
  Eye,
  ChevronDown,
  ChevronUp,
  Package,
  Globe,
} from 'lucide-react';

interface MachineryPillar {
  id: string;
  department: string;
  facility: string;
  image: string;
  summary: string;
  specs: string[];
  equipmentList: string[];
  capacityNote: string;
}

const MACHINERY_PILLARS: MachineryPillar[] = [
  {
    id: 'knitting',
    department: 'Circular & Flat Knitting Floor',
    facility: 'Unit-1: Netaji Apparel Park',
    image: '/assets/images/knitting_process.jpg',
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
    capacityNote: 'Knitting capacity: [Capacity figure to be confirmed by Fashion Knits — e.g. ~120 – 180 Tons/month]',
  },
  {
    id: 'cutting',
    department: 'CAD Pattern & Multi-Ply Cutting Floor',
    facility: 'Unit-1: Netaji Apparel Park',
    image: '/assets/images/cutting_process.jpg',
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
    capacityNote: 'Cutting capacity: [Capacity figure to be confirmed by Fashion Knits — e.g. ~8,000 – 12,000 pcs/day]',
  },
  {
    id: 'sewing',
    department: 'Modular Lean Sewing Assembly Lines',
    facility: 'Unit-1: Netaji Apparel Park',
    image: '/assets/images/stitching_process.jpg',
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
    capacityNote: 'Garmenting capacity: [Capacity figure to be confirmed by Fashion Knits — e.g. ~150,000 – 250,000 pcs/month]',
  },
  {
    id: 'dyeing_partner',
    department: 'Certified Wet Processing & Eco-Dyeing',
    facility: 'Audited Partner Processing Houses (Tiruppur Cluster)',
    image: '/assets/images/dyeing_process.jpg',
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
    image: '/assets/images/team_about.jpg',
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
    image: '/assets/images/packing_process.jpg',
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
      <section className="bg-charcoal text-off-white pt-36 pb-20 px-6 md:px-16 lg:px-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-accent mb-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span className="text-off-white/70">Manufacturing &amp; Capabilities</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
                <Factory className="w-3.5 h-3.5 text-accent" />
                <span>2 Strategic Facilities · Tiruppur, India</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-off-white">
                MANUFACTURING &amp;<br />
                <span className="text-accent">CAPABILITIES.</span>
              </h1>
              <p className="text-sm sm:text-base text-off-white/80 mt-6 leading-relaxed">
                Dedicated garment manufacturing infrastructure engineered for scale, consistency, and compliance. Operating across our primary corporate office on Angeripalayam Road and our main production facility at Netaji Apparel Park (Unit-1), Tiruppur.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 max-w-sm">
              <span className="text-xs font-mono uppercase tracking-widest text-accent block mb-2">
                Operational Framework
              </span>
              <p className="text-xs text-off-white/70 leading-relaxed font-mono">
                Specialized in-house knitting, CAD cutting, sewing lines, and QA — collaborating with audited spinning mills and certified zero-liquid discharge eco-dyeing houses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 Strategic Facilities Overview */}
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-pure-white border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
              Physical Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal">
              Two Dedicated Units in Tiruppur
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-3 leading-relaxed">
              Separating executive merchandising from factory-floor operations to guarantee fast sample turnaround and disciplined production control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Unit 1: Main Factory */}
            <div className="bg-off-white border border-charcoal/10 overflow-hidden flex flex-col justify-between hover:border-accent transition-colors">
              <div className="relative aspect-[16/10] w-full bg-charcoal/10 overflow-hidden">
                <img
                  src="/assets/facilities/factory_netaji_park.jpg"
                  alt="Unit 1 Main Factory Netaji Apparel Park"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-charcoal/90 text-accent text-[10px] font-mono uppercase tracking-widest font-bold border border-white/10">
                    Unit-1 // Main Factory
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-2 text-accent text-xs font-mono mb-2">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>Shed No: 29, Netaji Apparel Park, New Tirupur – 641 666</span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-charcoal">
                  Manufacturing Plant &amp; Assembly Lines
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed mt-3">
                  Housed inside Tiruppur&apos;s landmark textile hub, Netaji Apparel Park. Accommodates high-gauge circular knitting, computerized vacuum CAD cutting tables, modular sewing lines, steam finishing, 100% metal detector tunnels, and direct container stuffing bays.
                </p>
                <div className="mt-6 pt-4 border-t border-charcoal/10 grid grid-cols-2 gap-3 text-[11px] font-mono text-charcoal/80">
                  <div>✓ Circular Knitting Floor</div>
                  <div>✓ CAD Multi-Ply Cutting</div>
                  <div>✓ Modular Sewing Lines</div>
                  <div>✓ 100% Metal Scan &amp; Packing</div>
                </div>
              </div>
            </div>

            {/* Unit 2: Corporate Office */}
            <div className="bg-off-white border border-charcoal/10 overflow-hidden flex flex-col justify-between hover:border-accent transition-colors">
              <div className="relative aspect-[16/10] w-full bg-charcoal/10 overflow-hidden">
                <img
                  src="/assets/facilities/office_angeripalayam.jpg"
                  alt="Corporate Head Office Angeripalayam Road"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-charcoal/90 text-accent text-[10px] font-mono uppercase tracking-widest font-bold border border-white/10">
                    Corporate Office // HQ
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-2 text-accent text-xs font-mono mb-2">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>Angeripalayam Main Road, Gandhi Nagar Post, Tiruppur – 641 603</span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-charcoal">
                  Executive Office &amp; Sampling Showroom
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed mt-3">
                  Our central commercial headquarters located in the core of Tiruppur city. Houses executive management, buyer liaison desks, technical merchandising, tech pack CAD development, proto sampling rooms, and an extensive commercial fabric swatch library.
                </p>
                <div className="mt-6 pt-4 border-t border-charcoal/10 grid grid-cols-2 gap-3 text-[11px] font-mono text-charcoal/80">
                  <div>✓ Executive Administration</div>
                  <div>✓ Technical Merchandising</div>
                  <div>✓ Proto &amp; SMS Sampling</div>
                  <div>✓ Fabric Swatch Showroom</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machinery & Technical Capabilities Breakdown */}
      <section className="py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
              Departmental Audit
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal">
              Machinery &amp; Technical Infrastructure
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-2 max-w-2xl leading-relaxed">
              Explore the technical specifications, equipment array, and operational standards powering each manufacturing stage.
            </p>
          </div>

          <div className="space-y-6">
            {MACHINERY_PILLARS.map((pillar) => {
              const isExpanded = expandedPillar === pillar.id;
              return (
                <div
                  key={pillar.id}
                  className="bg-pure-white border border-charcoal/10 overflow-hidden transition-all duration-300 shadow-sm"
                >
                  {/* Department Summary Row */}
                  <div
                    onClick={() => togglePillar(pillar.id)}
                    className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-off-white/40 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-charcoal text-accent flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest">
                          <span>{pillar.facility}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-charcoal mt-1">
                          {pillar.department}
                        </h3>
                        <p className="text-xs sm:text-sm text-charcoal/70 mt-1 max-w-3xl leading-relaxed">
                          {pillar.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0 self-end md:self-center">
                      <span className="text-xs font-mono uppercase tracking-widest text-muted-gray hidden lg:inline">
                        {isExpanded ? 'Collapse' : 'Expand Details'}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-off-white flex items-center justify-center text-charcoal">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-accent" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-accent" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <div className="px-6 pb-8 sm:px-8 border-t border-charcoal/10 pt-6 bg-off-white/30">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Process Photo */}
                        <div className="lg:col-span-4 relative aspect-[4/3] w-full overflow-hidden border border-charcoal/10">
                          <img
                            src={pillar.image}
                            alt={pillar.department}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Technical Specs */}
                        <div className="lg:col-span-4 space-y-3">
                          <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold block">
                            Key Technical Specifications:
                          </span>
                          <ul className="space-y-2 text-xs sm:text-sm text-charcoal/80">
                            {pillar.specs.map((spec, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Equipment List & Capacity */}
                        <div className="lg:col-span-4 space-y-3">
                          <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold block">
                            Equipment &amp; Workstations:
                          </span>
                          <ul className="space-y-2 text-xs sm:text-sm text-charcoal/80">
                            {pillar.equipmentList.map((eq, eIdx) => (
                              <li key={eIdx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-charcoal flex-shrink-0 mt-1.5" />
                                <span>{eq}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="pt-4 border-t border-charcoal/10">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-gray block">
                              Operational Metric:
                            </span>
                            <span className="text-xs font-mono text-charcoal font-semibold italic">
                              {pillar.capacityNote}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Production Capacity & Compliance Note */}
      <section className="bg-charcoal text-off-white py-20 px-6 md:px-16 lg:px-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent block mb-2">
              Buyer Audit &amp; Verification Protocol
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-off-white">
              Schedule an On-Site Factory Audit
            </h3>
            <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed mt-2">
              International brand sourcing representatives and compliance auditors (SGS, Intertek, Bureau Veritas) are welcome to schedule an on-site inspection across our Netaji Apparel Park factory and Angeripalayam corporate office.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0">
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-accent hover:bg-pure-white text-charcoal text-xs font-mono uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Audit / Factory Visit</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
