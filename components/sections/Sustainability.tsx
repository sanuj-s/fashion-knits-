'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
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
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sustainability" ref={containerRef} className="bg-off-white py-32 md:py-40 px-6 md:px-16 lg:px-24 border-b border-charcoal/10 relative">
      <div className="max-w-[90rem] mx-auto">
        {/* Editorial Eyebrow with numbering */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
            07 // ESG &amp; Sustainability
          </span>
        </div>

        {/* Section Heading with Masked Line Reveal */}
        <SectionHeading
          title={'MAKING MANUFACTURING\nMORE RESPONSIBLE.'}
          subtitle="Verifiable environmental and ethical accountability embedded into every layer of our textile and garment production in Tiruppur, India."
        />

        {/* 6 Sustainability Pillars Grid */}
        <div
          ref={gridRef}
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {SUSTAINABILITY_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group p-8 md:p-10 bg-pure-white border border-charcoal/10 hover:border-accent hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 bg-charcoal text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-charcoal transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold px-2.5 py-1 border border-accent/30 bg-accent/5">
                      {pillar.complianceTag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold uppercase tracking-wider text-charcoal mb-1.5 group-hover:text-accent transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-widest text-accent mb-4 font-semibold">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-charcoal/8 flex items-center justify-between text-[11px] font-mono text-muted-gray">
                  <span>PILLAR 0{index + 1}</span>
                  <span className="w-1.5 h-1.5 bg-accent/60 rotate-45" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 md:p-10 bg-pure-white border border-charcoal/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mb-1">
              Third-Party Audited Supply Chain
            </span>
            <p className="text-xs sm:text-sm text-charcoal/80 max-w-2xl leading-relaxed">
              We provide formal Transaction Certificates (TCs) for GOTS &amp; OCS orders, verifying the provenance of certified organic cotton from farm to shipping container.
            </p>
          </div>
          <span className="px-5 py-2.5 bg-charcoal text-off-white text-xs font-mono uppercase tracking-widest font-semibold flex-shrink-0">
            TCs Provided With Export
          </span>
        </div>
      </div>
    </section>
  );
}
