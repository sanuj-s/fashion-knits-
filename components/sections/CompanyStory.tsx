'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Award, Layers, ShieldCheck, Factory, Globe } from 'lucide-react';

interface Milestone {
  phase: string;
  title: string;
  description: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MILESTONES: Milestone[] = [
  {
    phase: 'PHASE 01',
    title: 'Textile Foundations in Tiruppur',
    description:
      'Established high-gauge circular knitting infrastructure in India\'s premier knitwear hub, engineering single jersey, pique, and interlock fabrics for regional exporters.',
    tag: 'Knitting Infrastructure',
    icon: Factory,
  },
  {
    phase: 'PHASE 02',
    title: 'Certified Processing Partnerships',
    description:
      'Established long-standing partnerships with certified soft-flow dyeing and processing units, ensuring computerized color matching, tight shrinkage control, and OEKO-TEX chemical safety.',
    tag: 'Certified Wet Processing',
    icon: Layers,
  },
  {
    phase: 'PHASE 03',
    title: 'Netaji Apparel Park Expansion (Unit-1)',
    description:
      'Established our dedicated production plant at Shed No. 29, Netaji Apparel Park, scaling computer-aided CAD cutting, modular lean sewing lines, and export finishing for international brands.',
    tag: 'NAP Unit-1 Factory',
    icon: Globe,
  },
  {
    phase: 'PHASE 04',
    title: 'Organic & Chemical Accreditations',
    description:
      'Attained verified GOTS Organic Cotton (v7.0), OCS 100, and OEKO-TEX® Standard 100 (Product Class I baby-safe) certifications, establishing a verified sustainable supply chain.',
    tag: 'GOTS & OEKO-TEX',
    icon: ShieldCheck,
  },
  {
    phase: 'PHASE 05',
    title: 'Social Audits & Character Licensing',
    description:
      'Achieved amfori BSCI and SMETA 4-pillar social compliance audits, alongside international facility authorizations including Disney FAMA and LEGO licensee approvals.',
    tag: 'BSCI & Disney FAMA',
    icon: Award,
  },
];

export function CompanyStory() {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
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
    <section id="story" ref={containerRef} className="grain relative bg-charcoal text-off-white py-20 sm:py-24 lg:py-32 px-6 md:px-16 lg:px-24 border-b border-white/10">
      <div className="max-w-[90rem] mx-auto">
        {/* Editorial Eyebrow with numbering */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
            10 // Heritage &amp; Evolution
          </span>
        </div>

        {/* Section Heading with Masked Line Reveal */}
        <SectionHeading
          title={'OUR\nSTORY.'}
          subtitle="The evolution of Fashion Knits: building a trusted, certified, and compliant knitwear manufacturing partner across two specialized facilities in Tiruppur, India."
          light={true}
        />

        {/* Milestone Timeline Grid */}
        <div ref={timelineRef} className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-16 md:mt-24">
          {MILESTONES.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <div
                key={milestone.phase}
                className="premium-card group bg-[#161413] p-8 border border-white/10 hover:border-accent hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-accent">
                      {milestone.phase}
                    </span>
                    <div className="w-9 h-9 bg-black/60 border border-white/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-charcoal transition-colors duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-off-white uppercase tracking-wider mb-3 group-hover:text-accent transition-colors duration-300">
                    {milestone.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed font-normal">
                    {milestone.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-muted-gray">
                  <span>{milestone.tag}</span>
                  <span className="w-1.5 h-1.5 bg-accent/60 rotate-45" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Story Summary Banner */}
        <div className="mt-16 p-8 md:p-10 bg-[#141312] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mb-1">
              Manufacturing Heritage
            </span>
            <p className="text-xs sm:text-sm text-off-white/80 leading-relaxed font-mono">
              From circular knitting machinery foundations to international multi-accreditation exports, our trajectory is rooted in technical discipline and verifiable compliance.
            </p>
          </div>
          <span className="px-5 py-2.5 bg-white/5 border border-white/10 text-off-white text-xs font-mono uppercase tracking-widest font-semibold flex-shrink-0">
            Tiruppur, India // 641 603 &amp; 641 666
          </span>
        </div>
      </div>
    </section>
  );
}
