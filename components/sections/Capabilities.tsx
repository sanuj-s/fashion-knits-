'use client';

import React, { useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView, useReducedMotion } from '@/lib/hooks';
import {
  Cpu,
  Sparkles,
  Package,
  Globe,
  CheckCircle2,
} from 'lucide-react';

interface PrimaryCapability {
  name: string;
  category: string;
  summary: string;
  image: string;
  specs: string[];
}

const PRIMARY_CAPABILITIES: PrimaryCapability[] = [
  {
    name: 'Circular & Flat Knitting',
    category: 'Textile Construction',
    summary: 'High-gauge circular knitting for consistent loop geometry, dimensional stability, and zero spirality.',
    image: '/assets/images/knitting_process.jpg',
    specs: ['Gauges: 20GG to 32GG', 'Single Jersey, Pique, Rib, Interlock, Fleece', 'Certified Organic Cotton & Modal'],
  },
  {
    name: 'Eco-Friendly Dyeing',
    category: 'Wet Processing',
    summary: 'Low-liquor soft-flow dyeing vessels with automated computerized chemical and dyestuff dispensing.',
    image: '/assets/images/dyeing_process.jpg',
    specs: ['Low Liquor-Ratio Eco Vessels', 'Delta-E < 0.5 Spectrophotometer Tolerance', 'OEKO-TEX® Class I Baby-Safe Dyes'],
  },
  {
    name: 'CAD Cutting & Assembly',
    category: 'Garment Manufacturing',
    summary: 'Computerized CAD marker optimization with multi-ply vacuum cutting tables and modular lean sewing lines.',
    image: '/assets/images/cutting_process.jpg',
    specs: ['Precision Cut Tolerances ±0.5mm', 'Juki & Brother Programmable Stations', 'Overlock, Flatlock, & Twin-Needle'],
  },
  {
    name: 'In-House Testing Laboratory',
    category: 'Quality Assurance',
    summary: 'Physical and chemical textile testing verifying color fastness, shrinkage, and 100% metal detector scanning.',
    image: '/assets/images/team_about.jpg',
    specs: ['ISO Wash & Crocking Fastness Labs', 'Seam Burst & Pull-Force Testing', '100% Calibrated 0.8mm Needle Scan'],
  },
];

interface SecondaryCapability {
  title: string;
  category: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const SPECIALIZED_SERVICES: SecondaryCapability[] = [
  {
    title: 'Stenter & Fabric Compacting',
    category: 'Dimensional Locking',
    summary: 'Continuous relax drying and heat setting to lock residual shrinkage below 5% and eliminate skewing.',
    icon: Cpu,
    tag: 'Shrinkage < 5%',
  },
  {
    title: 'Value-Added Printing & Embroidery',
    category: 'Specialized Embellishment',
    summary: 'All-over rotary printing, water-based pigment/discharge chest prints, and high-density multi-head embroidery.',
    icon: Sparkles,
    tag: 'AOP & High-Density',
  },
  {
    title: 'Retail Compliance Packaging',
    category: 'Finishing & Packing',
    summary: 'Steam tunnel pressing, individual polybagging, flat or hanger packing, and verified barcode/RFID carton labeling.',
    icon: Package,
    tag: 'RFID & Drop-Tested',
  },
  {
    title: 'Bonded Seaport & Air Logistics',
    category: 'Worldwide Export',
    summary: 'Direct container stuffing at Netaji Apparel Park connecting via bonded transit to Tuticorin, Chennai, and Cochin seaport hubs.',
    icon: Globe,
    tag: 'EDI Customs Ready',
  },
];

export function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });

  return (
    <section id="capabilities" className="bg-off-white py-28 md:py-36 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <SectionHeading
          title={'MANUFACTURING\nCAPABILITIES.'}
          subtitle="Dedicated manufacturing infrastructure engineered for scale, consistency, and compliance across our Tiruppur facilities."
        />

        {/* 1. Primary Photo-Backed Capability Cards (Visual First) */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-20"
        >
          {PRIMARY_CAPABILITIES.map((cap, index) => (
            <div
              key={cap.name}
              className="group bg-pure-white border border-charcoal/10 flex flex-col justify-between hover:border-accent hover:shadow-lg transition-all duration-300"
              style={{
                opacity: prefersReducedMotion || isInView ? 1 : 0,
                transform: prefersReducedMotion || isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease-out ${index * 0.05}s, transform 0.4s ease-out ${index * 0.05}s`,
              }}
            >
              <div>
                {/* Real Process Photo */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-black/20 border-b border-charcoal/8">
                  <img
                    src={cap.image}
                    alt={cap.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 bg-charcoal/90 backdrop-blur-md text-[9px] font-mono uppercase tracking-widest text-accent border border-white/10">
                      {cap.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-base font-bold text-charcoal uppercase tracking-wider mb-2">
                    {cap.name}
                  </h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-normal mb-5">
                    {cap.summary}
                  </p>

                  <div className="pt-4 border-t border-charcoal/5 space-y-1.5">
                    {cap.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-[11px] font-mono text-charcoal/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Specialized Services Icon Cards */}
        <div className="mt-12 pt-12 border-t border-charcoal/10">
          <div className="flex items-center justify-between pb-4 border-b border-charcoal/10 mb-8">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-accent font-bold">
              Integrated Specialized Services
            </h4>
            <span className="text-[11px] font-mono text-muted-gray">
              Comprehensive Value Addition
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALIZED_SERVICES.map((serv, sIdx) => {
              const Icon = serv.icon;
              return (
                <div
                  key={sIdx}
                  className="bg-pure-white p-6 border border-charcoal/8 hover:border-accent/40 shadow-sm transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-charcoal text-accent flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-accent font-bold px-2 py-0.5 bg-off-white border border-charcoal/5">
                        {serv.tag}
                      </span>
                    </div>

                    <h5 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-1.5">
                      {serv.title}
                    </h5>

                    <p className="text-xs text-charcoal/70 leading-relaxed font-normal">
                      {serv.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
