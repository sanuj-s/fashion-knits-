'use client';

import React, { useState, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView, useReducedMotion } from '@/lib/hooks';
import {
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Scissors,
  Shirt,
  ShieldCheck,
  Package,
  Globe,
  Sliders,
  Droplet,
} from 'lucide-react';

interface Stage {
  number: string;
  name: string;
  subtitle: string;
  description: string;
  techSpecs: string[];
  icon: React.ComponentType<{ className?: string }>;
  image?: string;
  placeholderLabel?: string;
}

const STAGES: Stage[] = [
  {
    number: '01',
    name: 'Yarn Sourcing & Spinning',
    subtitle: 'High-Grade Fiber & Counts',
    description:
      'Rigorous selection of premium combed cotton, compact yarns, micro-modal, and GOTS-certified organic cotton blends. Calibrated tensile strength and low-hairiness yarn counts ranging from 20s to 80s.',
    techSpecs: ['Counts: 20s to 80s Combed & Compact', 'GOTS & OCS Organic Cotton', 'Tensile & CSP Lab Verified'],
    icon: Sliders,
    image: '/assets/images/yarn_process.jpg',
  },
  {
    number: '02',
    name: 'Circular & Flat Knitting',
    subtitle: 'Precision Fabric Construction',
    description:
      'High-gauge circular knitting machines producing single jersey, honeycomb pique, interlock, 1x1 & 2x2 rib, waffle, and 3-thread fleece. Computerized electronic tension controllers guarantee uniform loop geometry.',
    techSpecs: ['Machine Gauges: 20GG to 32GG', 'Diameters: 24" to 36"', 'Zero-Spirality Calibrated'],
    icon: Layers,
    image: '/assets/images/knitting_process.jpg',
  },
  {
    number: '03',
    name: 'Eco-Friendly Dyeing',
    subtitle: 'Soft-Flow Spectrophotometric Coloring',
    description:
      'Eco-efficient soft-flow dyeing vessels with automated computerized chemical dispensing. Low liquor-ratio processing with OEKO-TEX Standard 100 Class I certified dyes and batch-to-batch Delta-E < 0.5 tolerances.',
    techSpecs: ['OEKO-TEX Class I Dyes', 'Spectrophotometer Delta-E < 0.5', 'Automated Dosing System'],
    icon: Droplet,
    image: '/assets/images/dyeing_process.jpg',
  },
  {
    number: '04',
    name: 'Fabric Processing & Stentering',
    subtitle: 'Hydro-extraction & Heat Setting',
    description:
      'Continuous hydro-extractors, relax dryers, and multi-chamber precision stenters to lock in dimensional stability, cross-grain alignment, shrinkage control (< 5%), and uniform GSM across rolls.',
    techSpecs: ['Shrinkage: < 5% Length & Width', 'Torque / Skewing: < 3%', 'Continuous Stenter Width Lock'],
    icon: Cpu,
    placeholderLabel: 'PROCESS // HEAT SETTING & STENTER COMPACTING',
  },
  {
    number: '05',
    name: 'Specialized Fabric Finishing',
    subtitle: 'Surface Refinement & Hand-Feel',
    description:
      'Tubular and open-width compacting, enzyme bio-polishing, carbon peach finish, silicon softening, and specialized antimicrobial / moisture-wicking treatments customized to buyer brand benchmarks.',
    techSpecs: ['Bio-Polishing Enzyme Wash', 'Peached Carbon Suede Finish', 'Silicon & Antimicrobial Baths'],
    icon: Sparkles,
    placeholderLabel: 'PROCESS // BIO-WASH & CALENDER COMPACTING',
  },
  {
    number: '06',
    name: 'Computerized Cutting',
    subtitle: 'CAD Marker & Precision Multi-Ply',
    description:
      'Automated CAD pattern plotting and multi-ply vacuum cutting tables. Computerized marker optimization guarantees precision cut tolerances within ±0.5mm while maximizing fabric utilization.',
    techSpecs: ['CAD Gerber / Lectra Digitized', 'Tolerances: ±0.5mm', 'Vacuum Clamped Multi-Ply'],
    icon: Scissors,
    image: '/assets/images/cutting_process.jpg',
  },
  {
    number: '07',
    name: 'Garment Sewing & Assembly',
    subtitle: 'Modular Lean Production Lines',
    description:
      'Dedicated modular sewing lines equipped with Juki / Brother programmable machines. Overlock, flatlock, twin-needle, and chain stitch workstations synchronized under single-piece flow systems.',
    techSpecs: ['Juki & Brother Workstations', 'Flatlock & Overlock Seams', 'In-Line Quality Gateways'],
    icon: Shirt,
    placeholderLabel: 'PROCESS // MODULAR LEAN SEWING ASSEMBLY',
  },
  {
    number: '08',
    name: 'Multi-Point Quality Control',
    subtitle: 'In-Line & Final AQL 2.5 / 4.0 Audits',
    description:
      '100% inline inspection at critical sewing checkpoints, 4-point fabric grading, pull-force snap testing, colorfastness wash tests, and 100% calibrated needle / metal detector security scanning.',
    techSpecs: ['AQL 2.5 / 4.0 Standard', '100% Metal Detector Scans', 'Pull-Test & Seam Integrity'],
    icon: ShieldCheck,
    placeholderLabel: 'PROCESS // QUALITY LAB & NEEDLE DETECTION',
  },
  {
    number: '09',
    name: 'Pressing & Export Packaging',
    subtitle: 'Retail-Ready Compliance Packaging',
    description:
      'Vacuum steam pressing tables for pristine wrinkle-free presentation. Garments are polybagged, flat-packed, or hanger-packed to international retailer specifications with verified barcode/RFID labeling.',
    techSpecs: ['Steam Tunnel & Vacuum Press', 'Moisture-Barrier Polybags', 'Buyer Barcode & RFID Verified'],
    icon: Package,
    placeholderLabel: 'PROCESS // EXPORT CARTON & RFID PACKAGING',
  },
  {
    number: '10',
    name: 'Global Logistics & Dispatch',
    subtitle: 'Multimodal Container Freight',
    description:
      'Direct container stuffing at our Avinashi facility with bonded logistics access to Tuticorin, Chennai, and Kochi seaports. Seamless customs documentation, EUR.1 / GSP certificates, and worldwide tracking.',
    techSpecs: ['Tuticorin & Chennai Port Gateways', 'Air Freight: CJB / BLR / MAA', 'Full EDI Customs Documentation'],
    icon: Globe,
    placeholderLabel: 'PROCESS // MULTIMODAL EXPORT DISPATCH',
  },
];

export function ManufacturingProcess() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });

  const activeStage = STAGES[activeStageIndex];
  const ActiveIcon = activeStage.icon;

  return (
    <section id="manufacturing" className="bg-charcoal text-off-white py-28 md:py-36 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <SectionHeading
          title={'FROM RAW MATERIAL\nTO FINISHED PRODUCT.'}
          subtitle="Our complete manufacturing journey: 10 vertically coordinated stages engineered for quality, consistency, and compliance in Tirupur, India."
          light={true}
        />

        {/* Interactive Editorial Timeline */}
        <div ref={containerRef} className="mt-16 md:mt-20">
          {/* Horizontal Stage Stepper for Desktop & Tablet */}
          <div className="border-b border-white/10 pb-4 mb-10 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 min-w-max">
              {STAGES.map((stage, idx) => {
                const isActive = idx === activeStageIndex;
                return (
                  <button
                    key={stage.number}
                    onClick={() => setActiveStageIndex(idx)}
                    className={`px-3 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                      isActive
                        ? 'bg-accent text-charcoal border-accent font-bold shadow-md'
                        : 'bg-white/5 text-off-white/70 border-white/10 hover:border-accent/40 hover:text-off-white'
                    }`}
                  >
                    <span>{stage.number}</span>{' '}
                    <span className="hidden sm:inline">{stage.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Featured Detail Card */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#171514] border border-white/10 p-6 sm:p-10 md:p-12"
            style={{
              opacity: prefersReducedMotion || isInView ? 1 : 0,
              transition: 'opacity 0.5s ease-out',
            }}
          >
            {/* Left Column: Stage Editorial Information */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl sm:text-6xl font-bold font-mono tracking-tighter text-accent">
                    {activeStage.number}
                  </span>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-[0.2em] text-accent/90 block">
                      Stage {activeStage.number} / 10
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-off-white">
                      {activeStage.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-accent mb-6">
                  {activeStage.subtitle}
                </p>

                <p className="text-sm sm:text-base text-off-white/80 leading-relaxed">
                  {activeStage.description}
                </p>

                {/* Technical Specifications Checklist */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-muted-gray mb-3">
                    Technical Stage Parameters
                  </h4>
                  <div className="space-y-2">
                    {activeStage.techSpecs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2.5 text-xs font-mono text-off-white/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3 mt-10 pt-6 border-t border-white/10">
                <button
                  onClick={() => setActiveStageIndex((prev) => (prev > 0 ? prev - 1 : STAGES.length - 1))}
                  className="px-4 py-2 border border-white/15 text-xs font-mono uppercase tracking-wider text-off-white/80 hover:border-accent hover:text-accent transition-colors cursor-pointer"
                >
                  ← Previous Stage
                </button>
                <button
                  onClick={() => setActiveStageIndex((prev) => (prev < STAGES.length - 1 ? prev + 1 : 0))}
                  className="px-4 py-2 bg-accent text-charcoal text-xs font-mono uppercase tracking-wider font-bold hover:bg-pure-white transition-colors cursor-pointer"
                >
                  Next Stage →
                </button>
              </div>
            </div>

            {/* Right Column: Visual Component (Real Image or Neutral Process Specification Card) */}
            <div className="lg:col-span-5 flex flex-col justify-center min-h-[280px] sm:min-h-[340px]">
              {activeStage.image ? (
                <div className="relative w-full h-full min-h-[300px] border border-white/15 overflow-hidden group">
                  <img
                    src={activeStage.image}
                    alt={activeStage.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="px-3 py-1 bg-charcoal/90 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-off-white">
                      {activeStage.name} — Tirupur Facility
                    </span>
                  </div>
                </div>
              ) : (
                /* Neutral Intentional Process Technical Badge */
                <div className="w-full h-full min-h-[300px] bg-charcoal border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                      <ActiveIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-gray px-2 py-1 bg-white/5 border border-white/10">
                      Standardized SOP
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-2">
                      {activeStage.placeholderLabel}
                    </p>
                    <h4 className="text-xl font-bold uppercase tracking-tight text-off-white">
                      {activeStage.name}
                    </h4>
                    <p className="text-xs text-off-white/60 mt-2 font-mono leading-relaxed">
                      Executed strictly in accordance with certified GOTS organic protocol, OEKO-TEX Standard 100 chemical restrictions, and amfori BSCI safety regulations.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-muted-gray">
                    <span>STAGE {activeStage.number} / 10</span>
                    <span className="text-accent">VERIFIED WORKFLOW</span>
                  </div>

                  {/* Subtle technical corner accents */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent/40 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent/40 pointer-events-none" />
                </div>
              )}
            </div>
          </div>

          {/* Quick-Scan Grid of All 10 Stages Below */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-8">
            {STAGES.map((stage, idx) => {
              const isSelected = idx === activeStageIndex;
              return (
                <button
                  key={stage.number}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`p-4 border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-accent/10 border-accent text-off-white'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/30 text-off-white/60 hover:text-off-white'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-accent mb-1">{stage.number}</div>
                  <div className="text-xs font-bold uppercase truncate">{stage.name}</div>
                  <div className="text-[10px] text-muted-gray truncate mt-0.5">{stage.subtitle}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
