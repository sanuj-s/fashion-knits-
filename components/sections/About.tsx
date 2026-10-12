'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShieldCheck, MapPin, Layers, Award } from 'lucide-react';

const OPERATIONAL_PILLARS = [
  {
    icon: MapPin,
    title: 'Tirupur Apparel Park',
    subtitle: 'Strategic Manufacturing Base',
    detail: 'Located in Avinashi, Tamil Nadu — at the core of India\'s world-renowned knitwear industrial corridor with dedicated export logistics access.',
  },
  {
    icon: Layers,
    title: 'Vertical Integration',
    subtitle: 'Yarn to Export Dispatch',
    detail: 'In-house coordination across circular knitting, soft-flow dyeing, compacting, CAD pattern cutting, sewing, and carton packaging.',
  },
  {
    icon: ShieldCheck,
    title: 'Certified Organic',
    subtitle: 'GOTS & OCS Verified',
    detail: 'Certified chain-of-custody tracking from raw organic cotton bales through certified spinning, eco-dyeing, and garment fabrication.',
  },
  {
    icon: Award,
    title: 'Social Compliance',
    subtitle: 'amfori BSCI & SMETA',
    detail: 'Audited against rigorous international ethical labor benchmarks, safe working conditions, fair compensation, and zero child labor.',
  },
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  return (
    <section id="about" ref={containerRef} className="bg-off-white py-28 md:py-36 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <SectionHeading
          title={'BUILT AROUND\nMANUFACTURING.'}
          subtitle="Fashion Knits brings together textile engineering, garment manufacturing, rigorous quality systems, and global export compliance within a vertically integrated ecosystem in Tirupur, India."
        />

        {/* Editorial Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 md:mt-20 items-start">
          <div className="lg:col-span-7 space-y-6 text-charcoal/80 text-base md:text-lg leading-relaxed font-normal">
            <p>
              Headquartered at Apparel Park, Eettiveerampalayam in Avinashi, Tirupur, Fashion Knits serves as a reliable manufacturing and sourcing partner for international fashion brands, private labels, and high-volume apparel distributors worldwide.
            </p>
            <p className="text-sm md:text-base text-charcoal/70">
              Our infrastructure is engineered around complete accountability. From sourcing certified organic and combed cotton yarns to high-gauge circular knitting, soft-flow eco-dyeing, tension-free stentering, computer-aided cutting, and modular sewing lines, every manufacturing stage is monitored under unified quality standards.
            </p>
            <div className="p-6 bg-pure-white border-l-2 border-accent border-y border-r border-charcoal/5 shadow-sm mt-8">
              <p className="text-xs uppercase font-mono tracking-widest text-accent font-semibold mb-1">
                Executive Manufacturing Scope
              </p>
              <p className="text-xs text-charcoal/70 leading-relaxed font-mono">
                Men&apos;s, Women&apos;s, Children&apos;s &amp; Babies&apos; Knitted Apparel // Product Class I Baby-Safe OEKO-TEX® Certified // GOTS Organic Cotton v7.0 // amfori BSCI Audit #9322
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-charcoal text-off-white p-8 md:p-10 border border-white/10 relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-accent block mb-3">
                Manufacturing Philosophy
              </span>
              <h3 className="text-2xl font-bold tracking-tight uppercase leading-snug">
                Precision Engineering at Every Seam
              </h3>
              <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed mt-4">
                We believe commercial success for global apparel brands begins on the factory floor: consistent fabric weights, uniform shrinkage control, exact Delta-E color fastness, and ethical, transparent production timelines you can rely on season after season.
              </p>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-muted-gray">
                <span>LOCATION: TIRUPUR (INDIA)</span>
                <span className="text-accent">AQL 2.5 / 4.0</span>
              </div>
            </div>
            {/* Subtle luxury ambient glow */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>

        {/* 4 Verified Operational Pillars (Replacing unverified counters) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 md:mt-24 pt-16 border-t border-charcoal/10"
        >
          {OPERATIONAL_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-pure-white p-6 md:p-8 border border-charcoal/8 hover:border-accent/40 transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-charcoal text-accent flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-charcoal uppercase tracking-wider">
                  {pillar.title}
                </h4>
                <p className="text-xs font-mono uppercase tracking-widest text-accent/90 mt-1">
                  {pillar.subtitle}
                </p>
                <p className="text-xs text-charcoal/70 leading-relaxed mt-3">
                  {pillar.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
