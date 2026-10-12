'use client';

import React, { useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView, useReducedMotion } from '@/lib/hooks';
import {
  Layers,
  Droplet,
  Cpu,
  Scissors,
  Sparkles,
  ShieldCheck,
  Package,
  Globe,
  CheckCircle2,
} from 'lucide-react';

interface Capability {
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  specs: string[];
}

const CAPABILITIES: Capability[] = [
  {
    name: 'Circular & Flat Knitting',
    category: 'Textile Construction',
    description: 'Precision knit fabric manufacturing engineered for consistent loop geometry, dimensional stability, and zero spirality across high volume runs.',
    icon: Layers,
    specs: ['Gauges: 20GG to 32GG', 'Structures: Single Jersey, Pique, Interlock, Rib, Fleece', 'Certified Organic Cotton & Modal Blends'],
  },
  {
    name: 'Eco-Friendly Soft-Flow Dyeing',
    category: 'Wet Processing',
    description: 'Automated soft-flow dyeing vessels with computerized dye and chemical dispensing, adhering to strict zero-discharge and OEKO-TEX chemical standards.',
    icon: Droplet,
    specs: ['Low Liquor-Ratio Processing', 'Spectrophotometer Delta-E < 0.5', 'OEKO-TEX® Class I Baby-Safe Dyestuffs'],
  },
  {
    name: 'Stenter & Fabric Processing',
    category: 'Dimensional Finishing',
    description: 'Continuous hydro-extraction, relax drying, and multi-chamber stenter processing to lock fabric width, grammage, and residual shrinkage.',
    icon: Cpu,
    specs: ['Residual Shrinkage: < 5% (L&W)', 'Continuous Torque & Skewing Correction', 'Uniform Roll-to-Roll GSM Consistency'],
  },
  {
    name: 'Automated Cut & Sew Assembly',
    category: 'Garment Manufacturing',
    description: 'Computerized CAD marker optimization paired with multi-ply vacuum cutting tables and modular single-piece flow sewing lines for flawless fit.',
    icon: Scissors,
    specs: ['CAD Digitized Patterns & Marker Planning', 'Juki & Brother Programmable Stations', 'Overlock, Flatlock, and Twin-Needle Seams'],
  },
  {
    name: 'Value-Added Surface Finishing',
    category: 'Specialized Treatments',
    description: 'Enzyme bio-polishing, carbon peach finish, pigment/discharge printing, all-over rotary print (AOP), and precision multi-head embroidery.',
    icon: Sparkles,
    specs: ['Bio-Wash & Peached Suede Finishes', 'Pigment, Discharge, & Water-Based Prints', 'Multi-Head High-Density Embroidery'],
  },
  {
    name: 'In-House Testing Laboratory',
    category: 'Quality Assurance',
    description: 'Comprehensive physical and chemical textile testing verifying color fastness, dimensional stability, pilling resistance, and seam strength.',
    icon: ShieldCheck,
    specs: ['Washing, Rubbing, & Light Fastness Labs', 'Seam Burst & Pull-Force Snap Testing', '100% Calibrated Metal Detection'],
  },
  {
    name: 'Retail-Ready Packaging',
    category: 'Compliance Packing',
    description: 'Automated steam pressing, individualized polybagging, flat or hanger packing, and barcode/RFID inventory labeling tailored to international retailer manuals.',
    icon: Package,
    specs: ['Vacuum Steam Tunnel Pressing', 'Moisture-Resistant Master Cartons', 'Retailer Barcode & RFID Verification'],
  },
  {
    name: 'Logistics & Worldwide Export',
    category: 'Global Freight',
    description: 'Direct factory container loading with bonded customs clearance in Tirupur, connecting seamlessly to Tuticorin, Chennai, and air freight gateways.',
    icon: Globe,
    specs: ['Direct Seaport Gateways: Tuticorin / Chennai', 'Air Freight: CJB, BLR, MAA', 'Full EDI Customs Documentation & TCs'],
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
          title={'CAPABILITIES\nBUILT AT SCALE.'}
          subtitle="From high-gauge circular knitting and eco-dyeing to modular garment manufacturing and global export compliance in Tirupur, India."
        />

        {/* 8 Technical Capabilities Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-20"
        >
          {CAPABILITIES.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={capability.name}
                className="group relative bg-pure-white border border-charcoal/8 p-7 md:p-8 flex flex-col justify-between hover:border-accent/40 hover:shadow-lg transition-all duration-300"
                style={{
                  opacity: prefersReducedMotion || isInView ? 1 : 0,
                  transform: prefersReducedMotion || isInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease-out ${index * 0.07}s, transform 0.6s ease-out ${index * 0.07}s`,
                }}
              >
                <div>
                  {/* Top Bar: Icon & Category */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 bg-charcoal text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-charcoal transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-gray">
                      {capability.category}
                    </span>
                  </div>

                  {/* Capability Name */}
                  <h3 className="text-lg font-bold text-charcoal uppercase tracking-wider mb-2">
                    {capability.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed mb-6">
                    {capability.description}
                  </p>
                </div>

                {/* Specs List */}
                <div className="pt-5 border-t border-charcoal/5 space-y-2">
                  {capability.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-[11px] font-mono text-charcoal/80">
                      <CheckCircle2 className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
                      <span className="leading-tight">{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Accent hover bottom line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
