'use client';

import React, { useState, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView, useReducedMotion } from '@/lib/hooks';
import { ChevronDown, ChevronUp, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Stage {
  number: string;
  name: string;
  summary: string;
  image: string;
  expandedDetails: {
    overview: string;
    specs: string[];
    standard: string;
  };
}

const PRODUCTION_STAGES: Stage[] = [
  {
    number: '01',
    name: 'Yarn',
    summary: 'Sourcing certified organic cotton and combed compact yarns from audited spinning mills.',
    image: '/assets/images/yarn_process.jpg',
    expandedDetails: {
      overview: 'Strategic sourcing from leading spinning mills covering 100% combed cotton, micro-modal, and GOTS/OCS certified organic cotton with calibrated tensile strength.',
      specs: ['Yarn Counts: 20s to 80s Single & Double', 'Low Hairiness & High CSP Calibrated', '100% Organic Chain of Custody Verified'],
      standard: 'GOTS v7.0 & OCS 100 Standards',
    },
  },
  {
    number: '02',
    name: 'Knitting',
    summary: 'High-gauge circular knitting machines producing single jersey, pique, interlock, rib, and fleece.',
    image: '/assets/images/knitting_process.jpg',
    expandedDetails: {
      overview: 'Precision circular and flat knitting machinery with electronic computerized tension control ensuring uniform loop geometry and zero fabric spirality.',
      specs: ['Machine Gauges: 20GG to 32GG', 'Diameters: 24" to 36"', 'Single Jersey, Pique, Interlock, Rib, Waffle, Fleece'],
      standard: 'Zero-Spirality & GSM Calibration',
    },
  },
  {
    number: '03',
    name: 'Dyeing',
    summary: 'Certified soft-flow jet dyeing with low liquor ratios and OEKO-TEX Standard 100 non-toxic dyes.',
    image: '/assets/images/dyeing_process.jpg',
    expandedDetails: {
      overview: 'Partnered with audited soft-flow dyeing and processing facilities utilizing computerized dispensing for uniform shade penetration and superior fastness.',
      specs: ['Low Liquor-Ratio Eco Vessels', 'Computerized Spectrophotometer Delta-E < 0.5', 'Non-Toxic ZDHC Compliant Dyestuffs'],
      standard: 'OEKO-TEX® Standard 100 Class I',
    },
  },
  {
    number: '04',
    name: 'Cutting',
    summary: 'Multi-ply vacuum cutting tables synchronized with CAD marker optimization for maximum fabric yield.',
    image: '/assets/images/cutting_process.jpg',
    expandedDetails: {
      overview: 'Digitized pattern grading and automated marker nesting delivering cut tolerance precision within ±0.5mm while minimizing fabric scrap.',
      specs: ['CAD Pattern Grading & Nesting', 'Vacuum-Clamped Multi-Ply Spreading', 'Precision Cut Tolerances ±0.5mm'],
      standard: 'CAD Automated Pattern System',
    },
  },
  {
    number: '05',
    name: 'Stitching',
    summary: 'Modular lean sewing lines with programmable Juki and Brother machines for precision seam construction.',
    image: '/assets/images/stitching_process.jpg',
    expandedDetails: {
      overview: 'Synchronized assembly lines operating under single-piece flow systems with specialized workstations for overlock, flatlock, and twin-needle hems.',
      specs: ['Programmable Juki & Brother Workstations', 'Overlock, Flatlock, & Chainstitch Seams', 'Hourly In-Line Stitch Density (SPI) Audits'],
      standard: 'Lean Modular Assembly Protocol',
    },
  },
  {
    number: '06',
    name: 'Finishing',
    summary: 'Enzyme bio-polishing, peached suede finish, silicon softening, and calender compacting.',
    image: '/assets/images/finishing_process.jpg',
    expandedDetails: {
      overview: 'Multi-chamber stenters and tubular compactors to lock fabric dimensional stability, ensure silky hand-feel, and prevent post-wash shrinkage.',
      specs: ['Enzyme Bio-Polishing & Silicon Baths', 'Tension-Free Calender Compacting', 'Residual Shrinkage Controlled < 5%'],
      standard: 'ISO Shrinkage & Dimensional Standards',
    },
  },
  {
    number: '07',
    name: 'Quality Inspection',
    summary: 'In-line AQL 2.5 auditing, seam burst testing, and 100% calibrated conveyor metal detection.',
    image: '/assets/images/quality_process.jpg',
    expandedDetails: {
      overview: 'Full-spectrum physical laboratory testing accompanied by 100% conveyor metal detector scans to ensure total consumer and infant safety.',
      specs: ['AQL 2.5 In-Line & Final Random Audit', '0.8mm Ferrous Calibrated Needle Detection', 'Seam Strength, Pull-Test, & Color Crock Testing'],
      standard: 'MIL-STD-105E & 9-Point Needle Audit',
    },
  },
  {
    number: '08',
    name: 'Packing',
    summary: 'Steam pressing, moisture-barrier polybags, and container packing at Netaji Apparel Park (Unit-1).',
    image: '/assets/images/packing_process.jpg',
    expandedDetails: {
      overview: 'Pristine steam finishing, custom polybagging, barcode labeling, and container stuffing at our Netaji Apparel Park factory ready for port dispatch.',
      specs: ['Vacuum Steam Pressing Stations', 'Retail Barcode & RFID Inventory Labeling', 'Moisture-Barrier Heavy Duty Master Cartons'],
      standard: 'International Retail Compliance',
    },
  },
];

export function ManufacturingProcess() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });

  const toggleExpand = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="manufacturing" className="bg-charcoal text-off-white py-28 md:py-36 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <SectionHeading
          title={'VISUAL PRODUCTION\nJOURNEY.'}
          subtitle="From certified yarn selection to export container dispatch: an 8-stage precision manufacturing journey across our facilities in Tiruppur, India."
          light={true}
        />

        {/* Connected Process Navigation Bar */}
        <div className="mt-12 pb-6 border-b border-white/10 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max text-xs font-mono uppercase tracking-wider text-muted-gray">
            {PRODUCTION_STAGES.map((stg, i) => (
              <React.Fragment key={stg.number}>
                <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-off-white/80 font-bold">
                  {stg.number} {stg.name}
                </span>
                {i < PRODUCTION_STAGES.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-accent/60 mx-1 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 8-Stage Responsive Visual Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
        >
          {PRODUCTION_STAGES.map((stage, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={stage.number}
                className="group bg-[#171514] border border-white/10 flex flex-col justify-between hover:border-accent/40 transition-all duration-300"
                style={{
                  opacity: prefersReducedMotion || isInView ? 1 : 0,
                  transform: prefersReducedMotion || isInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.4s ease-out ${index * 0.05}s, transform 0.4s ease-out ${index * 0.05}s`,
                }}
              >
                {/* Stage Photograph with Badge */}
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40 border-b border-white/10">
                    <img
                      src={stage.image}
                      alt={`Fashion Knits ${stage.name} Process`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 bg-charcoal/90 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase tracking-widest text-accent">
                        STAGE {stage.number}
                      </span>
                    </div>
                  </div>

                  {/* Concise Title & 1-Sentence Summary */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold uppercase tracking-tight text-off-white mb-2">
                      {stage.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed font-normal">
                      {stage.summary}
                    </p>

                    {/* Expandable Technical Details */}
                    {isExpanded && (
                      <div className="mt-5 pt-4 border-t border-white/10 space-y-3 animate-fadeIn">
                        <p className="text-xs text-accent font-mono leading-relaxed">
                          {stage.expandedDetails.overview}
                        </p>
                        <div className="space-y-1.5 pt-1">
                          {stage.expandedDetails.specs.map((spec, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2 text-[11px] font-mono text-off-white/80">
                              <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                              <span className="leading-tight">{spec}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-gray pt-2 border-t border-white/5">
                          Standard: {stage.expandedDetails.standard}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expansion Toggle Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => toggleExpand(index)}
                    className="w-full py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono uppercase tracking-wider text-off-white/80 hover:text-accent transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Specs' : 'Expand Specs'}</span>
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

        {/* View Full Manufacturing Capabilities */}
        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-gray">
            Complete Manufacturing Details
          </span>
          <Link
            href="/manufacturing"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-off-white hover:text-accent transition-colors font-bold group"
          >
            <span>View Manufacturing</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
