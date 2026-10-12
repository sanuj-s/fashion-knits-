'use client';

import React, { useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView, useReducedMotion } from '@/lib/hooks';
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
    title: 'Textile Foundations in Tirupur',
    description:
      'Established high-gauge circular knitting infrastructure in India\'s premier knitwear hub, engineering single jersey, pique, and interlock fabrics for regional exporters.',
    tag: 'Knitting Infrastructure',
    icon: Factory,
  },
  {
    phase: 'PHASE 02',
    title: 'Vertical Dyeing & Wet Processing',
    description:
      'Commissioned soft-flow jet dyeing vessels and computerized stenter compacting lines, bringing color matching, shrinkage control, and hand-feel refinement under complete in-house governance.',
    tag: 'Vertical Integration',
    icon: Layers,
  },
  {
    phase: 'PHASE 03',
    title: 'Cut & Sew Apparel Manufacturing',
    description:
      'Expanded into full garment manufacturing with computer-aided CAD marker planning, automated multi-ply cutting tables, and modular lean sewing lines tailored for international retail brands.',
    tag: 'Garmenting Scale',
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
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });

  return (
    <section id="story" className="bg-warm-white py-28 md:py-36 px-6 md:px-16 lg:px-24 border-t border-charcoal/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <SectionHeading
          title={'OUR\nSTORY.'}
          subtitle="The evolution of Fashion Knits: building a vertically integrated, certified, and compliant textile and garment manufacturing partner in Tirupur, India."
        />

        {/* Milestone Timeline */}
        <div ref={containerRef} className="mt-20 max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {MILESTONES.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div
                  key={milestone.phase}
                  className="bg-pure-white p-6 border border-charcoal/8 hover:border-accent/40 shadow-sm transition-all duration-300 flex flex-col justify-between"
                  style={{
                    opacity: prefersReducedMotion || isInView ? 1 : 0,
                    transform: prefersReducedMotion || isInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease-out ${index * 0.08}s, transform 0.5s ease-out ${index * 0.08}s`,
                  }}
                >
                  <div>
                    {/* Top phase & icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent">
                        {milestone.phase}
                      </span>
                      <div className="w-8 h-8 bg-charcoal text-accent flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-charcoal uppercase tracking-wider mb-2">
                      {milestone.title}
                    </h3>

                    <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
                      {milestone.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-charcoal/5">
                    <span className="text-[10px] font-mono text-muted-gray uppercase block truncate">
                      {milestone.tag}
                    </span>
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
