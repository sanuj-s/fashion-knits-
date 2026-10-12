'use client';

import React, { useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView, useReducedMotion } from '@/lib/hooks';
import { Leaf, Droplets, Zap, Recycle, ShieldCheck, HeartHandshake } from 'lucide-react';

interface SustainabilityPillar {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  complianceTag: string;
}

const SUSTAINABILITY_PILLARS: SustainabilityPillar[] = [
  {
    title: 'Certified Organic Fibers',
    subtitle: 'GOTS & OCS Chain of Custody',
    description:
      'We prioritize 100% GOTS and OCS certified organic cotton cultivated without synthetic pesticides, genetically modified seeds, or chemical fertilizers, protecting farmer livelihoods and soil microbiomes.',
    icon: Leaf,
    complianceTag: 'GOTS v7.0 // OCS 100',
  },
  {
    title: 'Zero Harmful Chemicals',
    subtitle: 'OEKO-TEX® Product Class I Safety',
    description:
      'Every chemical auxiliary, reactive dye, and finish complies with stringent ZDHC MRSL guidelines and OEKO-TEX Standard 100 Class I thresholds, guaranteeing safety even for newborn infant wear.',
    icon: ShieldCheck,
    complianceTag: 'OEKO-TEX® Standard 100',
  },
  {
    title: 'Responsible Water Management',
    subtitle: 'Low-Liquor Dyeing & Water Recovery',
    description:
      'Soft-flow jet dyeing machines operating at optimized low-liquor ratios dramatically reduce water demand per kilogram of processed fabric, supported by biological effluent treatment and recycling.',
    icon: Droplets,
    complianceTag: 'Low-Liquor Processing',
  },
  {
    title: 'Thermal & Electrical Energy Efficiency',
    subtitle: 'Optimized Factory Infrastructure',
    description:
      'Equipped with variable frequency drive (VFD) motors across circular knitting arrays and exhaust heat exchangers on stenters to capture and recirculate thermal energy, lowering our carbon footprint.',
    icon: Zap,
    complianceTag: 'IGBC Platinum Benchmark',
  },
  {
    title: 'Waste Reduction & Pre-Consumer Recycling',
    subtitle: 'CAD Marker Optimization & GRS',
    description:
      'Computerized CAD nesting maximizes fabric utilization to minimize cut-room scraps. Pure cotton offcuts are systematically sorted and diverted to GRS-certified textile recyclers for circular re-spinning.',
    icon: Recycle,
    complianceTag: 'GRS Recycled Program',
  },
  {
    title: 'Worker Welfare & Ethical Governance',
    subtitle: 'amfori BSCI & SMETA Audited Fair Labor',
    description:
      'Rigorous social compliance ensures fair living compensation, equal opportunity, strictly enforced working hours, ergonomic workstations, and comprehensive occupational health and safety.',
    icon: HeartHandshake,
    complianceTag: 'amfori BSCI #9322 // SMETA',
  },
];

export function Sustainability() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });

  return (
    <section id="sustainability" className="bg-charcoal text-off-white py-28 md:py-36 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <SectionHeading
          title={'MAKING MANUFACTURING\nMORE RESPONSIBLE.'}
          subtitle="Verifiable environmental and ethical accountability embedded into every layer of our textile and garment production in Tirupur, India."
          light={true}
        />

        {/* 6 Sustainability Pillars Grid */}
        <div
          ref={containerRef}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SUSTAINABILITY_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 bg-[#171514] border border-white/10 relative group hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
                style={{
                  opacity: prefersReducedMotion || isInView ? 1 : 0,
                  transform: prefersReducedMotion || isInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease-out ${index * 0.08}s, transform 0.6s ease-out ${index * 0.08}s`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-accent/80 uppercase tracking-wider bg-white/5 px-2.5 py-1 border border-white/10">
                      {pillar.complianceTag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-off-white uppercase tracking-wider mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-widest text-accent mb-4">
                    {pillar.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-muted-gray">
                  <span>PILLAR 0{index + 1} / 06</span>
                  <span className="text-accent">VERIFIED ESG</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
