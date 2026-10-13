'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShieldCheck, MapPin, Layers, Award, ArrowRight, Building2, Factory } from 'lucide-react';
import Link from 'next/link';

const OPERATIONAL_PILLARS = [
  {
    icon: MapPin,
    title: 'Two Strategic Units',
    subtitle: 'Office & Main Factory',
    detail: 'Primary corporate office on Angeripalayam Road and main production facility at Netaji Apparel Park (Unit-1), Tiruppur.',
  },
  {
    icon: Layers,
    title: 'Precision Assembly',
    subtitle: 'Cut-to-Pack Excellence',
    detail: 'Specialized in-house knitting, CAD cutting, sewing lines, garment finishing, and rigorous inspection with certified processing partners.',
  },
  {
    icon: ShieldCheck,
    title: 'Certified Organic',
    subtitle: 'GOTS & OCS Verified',
    detail: 'Certified chain-of-custody tracking from raw organic cotton through certified spinning, eco-dyeing, and garment fabrication.',
  },
  {
    icon: Award,
    title: 'Social Compliance',
    subtitle: 'amfori BSCI & SMETA',
    detail: 'Audited against rigorous international ethical labor benchmarks, safe working conditions, fair compensation, and zero child labor.',
  },
];

export function About() {
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
            stagger: 0.12,
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
    <section id="about" ref={containerRef} className="bg-off-white py-32 md:py-40 px-6 md:px-16 lg:px-24 border-b border-charcoal/10 relative">
      <div className="max-w-[90rem] mx-auto">
        {/* Editorial Eyebrow with numbering */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
            01 // About Us
          </span>
        </div>

        {/* Section Heading with Masked Line Reveal */}
        <SectionHeading
          title={'BUILT AROUND\nMANUFACTURING.'}
          subtitle="Fashion Knits operates a dedicated two-unit infrastructure in Tiruppur, India — uniting client merchandising at our Angeripalayam Road corporate office with specialized garment manufacturing at Netaji Apparel Park (Unit-1)."
        />

        {/* Real-Level Photographic Facility Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-16 md:mt-24">
          {/* Unit 1: Netaji Apparel Park Main Plant */}
          <div className="group bg-pure-white border border-charcoal/10 overflow-hidden shadow-sm hover:border-accent hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal">
              <picture className="w-full h-full">
                <source type="image/webp" srcSet="/assets/facilities/factory_netaji_park.webp" />
                <img
                  src="/assets/facilities/factory_netaji_park.jpg"
                  alt="Fashion Knits Unit-1 Main Manufacturing Plant at Netaji Apparel Park"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-charcoal/90 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase tracking-widest text-accent">
                  <Factory className="w-3.5 h-3.5 text-accent" />
                  Unit-1 Production Facility
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono text-off-white/90">
                <span className="truncate">Shed No. 29, Netaji Apparel Park, New Tirupur</span>
                <span className="text-accent font-semibold ml-2">20,000+ SQ.FT</span>
              </div>
            </div>

            <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-charcoal mb-3 group-hover:text-accent transition-colors duration-300">
                  Netaji Apparel Park (Unit-1) Main Plant
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed font-normal">
                  Our dedicated production plant houses high-gauge circular knitting machines, automated CAD multi-ply vacuum cutting tables, modular lean sewing assembly lines, steam finishing, and bonded export carton packing.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-charcoal/10 flex items-center justify-between text-xs font-mono text-charcoal/70">
                <span className="uppercase tracking-wider">CAPACITY: KNITTING &amp; SEWING</span>
                <span className="text-accent font-semibold tracking-wider">AQL 2.5 INSPECTION</span>
              </div>
            </div>
          </div>

          {/* Corporate HQ: Angeripalayam Road Office & Showroom */}
          <div className="group bg-pure-white border border-charcoal/10 overflow-hidden shadow-sm hover:border-accent hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal">
              <picture className="w-full h-full">
                <source type="image/webp" srcSet="/assets/facilities/office_angeripalayam.webp" />
                <img
                  src="/assets/facilities/office_angeripalayam.jpg"
                  alt="Fashion Knits Corporate Office on Angeripalayam Road, Tiruppur"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-charcoal/90 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase tracking-widest text-accent">
                  <Building2 className="w-3.5 h-3.5 text-accent" />
                  Corporate HQ &amp; Showroom
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono text-off-white/90">
                <span className="truncate">Angeripalayam Main Road, Tiruppur – 641 603</span>
                <span className="text-accent font-semibold ml-2">SAMPLING LAB</span>
              </div>
            </div>

            <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-charcoal mb-3 group-hover:text-accent transition-colors duration-300">
                  Angeripalayam Corporate Office &amp; Sampling
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed font-normal">
                  Our central corporate headquarters manages technical merchandising, international buyer liaisons, fabric swatch libraries, Pantone color lab dips, proto sampling, and regulatory social audit oversight.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-charcoal/10 flex items-center justify-between text-xs font-mono text-charcoal/70">
                <span className="uppercase tracking-wider">MERCHANDISING &amp; SAMPLING</span>
                <span className="text-accent font-semibold tracking-wider">RAPID PROTO FABRICATION</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20 md:mt-28 items-start">
          <div className="lg:col-span-7 space-y-6 text-charcoal/80 text-base md:text-lg leading-relaxed font-normal">
            <p>
              Operating across two key facilities in Tiruppur, Fashion Knits serves as a reliable manufacturing and sourcing partner for international fashion brands, private labels, and high-volume apparel distributors worldwide.
            </p>
            <p className="text-sm md:text-base text-charcoal/70">
              Our setup separates administrative focus from factory floor execution: our primary corporate office on Angeripalayam Main Road manages sampling, client liaison, technical merchandising, and executive oversight, while our main manufacturing plant at Shed No. 29, Netaji Apparel Park (Unit-1) houses circular knitting, CAD pattern cutting, modular sewing assembly, finishing, and export carton packing.
            </p>
            <div className="p-6 md:p-8 bg-pure-white border-l-2 border-accent border-y border-r border-charcoal/10 shadow-sm mt-8">
              <p className="text-xs uppercase font-mono tracking-widest text-accent font-semibold mb-2">
                Executive Manufacturing Scope
              </p>
              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-mono">
                Men&apos;s, Women&apos;s, Children&apos;s &amp; Babies&apos; Knitted Apparel // Product Class I Baby-Safe OEKO-TEX® Certified // GOTS Organic Cotton v7.0 // amfori BSCI Audit #9322
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-charcoal text-off-white p-8 md:p-12 border border-white/10 relative overflow-hidden shadow-2xl grain">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-accent" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-accent font-semibold">
                  Manufacturing Philosophy
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase leading-snug">
                Precision Engineering at Every Seam
              </h3>
              <p className="text-sm text-off-white/70 leading-relaxed mt-5">
                We believe commercial success for global apparel brands begins on the factory floor: consistent fabric weights, uniform shrinkage control, exact Delta-E color fastness, and ethical, transparent production timelines you can rely on season after season.
              </p>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-off-white/60">
                <span>LOCATION: TIRUPPUR (INDIA)</span>
                <span className="text-accent font-semibold">AQL 2.5 / 4.0</span>
              </div>
            </div>
            {/* Subtle luxury ambient glow */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>

        {/* 4 Verified Operational Pillars */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 md:mt-28 pt-16 border-t border-charcoal/10"
        >
          {OPERATIONAL_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group bg-pure-white p-8 border border-charcoal/10 hover:border-accent hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-charcoal text-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-charcoal transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-charcoal uppercase tracking-wider">
                    {pillar.title}
                  </h4>
                  <p className="text-xs font-mono uppercase tracking-widest text-accent mt-1 font-semibold">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed mt-4">
                    {pillar.detail}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-charcoal/8 flex items-center justify-between text-[11px] font-mono text-muted-gray">
                  <span>PILLAR 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 bg-accent/60 rotate-45" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore Full Company Profile CTA */}
        <div className="mt-16 pt-8 border-t border-charcoal/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-gray">
            Learn More About Our Heritage &amp; Operations
          </span>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-charcoal hover:text-accent transition-colors font-bold group"
          >
            <span>Explore Company Profile</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
