'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Cpu, Sparkles, Package, Globe, Check } from 'lucide-react';

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
    image: '/assets/images/knitting_process.webp',
    specs: ['Gauges: 20GG to 32GG', 'Single Jersey, Pique, Rib, Interlock, Fleece', 'Certified Organic Cotton & Modal'],
  },
  {
    name: 'Eco-Friendly Dyeing',
    category: 'Wet Processing',
    summary: 'Low-liquor soft-flow dyeing vessels with automated computerized chemical and dyestuff dispensing.',
    image: '/assets/images/dyeing_process.webp',
    specs: ['Low Liquor-Ratio Eco Vessels', 'Delta-E < 0.5 Spectrophotometer Tolerance', 'OEKO-TEX® Class I Baby-Safe Dyes'],
  },
  {
    name: 'CAD Cutting & Assembly',
    category: 'Garment Manufacturing',
    summary: 'Computerized CAD marker optimization with multi-ply vacuum cutting tables and modular lean sewing lines.',
    image: '/assets/images/cutting_process.webp',
    specs: ['Precision Cut Tolerances ±0.5mm', 'Juki & Brother Programmable Stations', 'Overlock, Flatlock, & Twin-Needle'],
  },
  {
    name: 'In-House Testing Laboratory',
    category: 'Quality Assurance',
    summary: 'Physical and chemical textile testing verifying color fastness, shrinkage, and 100% metal detector scanning.',
    image: '/assets/images/quality_process.webp',
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
    <section id="capabilities" ref={containerRef} className="bg-off-white py-32 md:py-40 px-6 md:px-16 lg:px-24 border-b border-charcoal/10 relative">
      <div className="max-w-[90rem] mx-auto">
        {/* Editorial Eyebrow with numbering */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
            03 // Technical Capabilities
          </span>
        </div>

        {/* Section Heading with Masked Line Reveal */}
        <SectionHeading
          title={'ENGINEERED FOR\nPERFORMANCE.'}
          subtitle="Precision manufacturing capabilities engineered to fulfill the stringent quality, speed-to-market, and compliance demands of international fashion brands."
        />

        {/* 4 Primary Capabilities Grid with Photography */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-24">
          {PRIMARY_CAPABILITIES.map((cap, idx) => (
            <div
              key={idx}
              className="group bg-pure-white border border-charcoal/10 hover:border-accent hover:shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal">
                  <picture className="w-full h-full">
                    <source type="image/webp" srcSet={cap.image} />
                    <img
                      src={cap.image.replace('.webp', '.jpg')}
                      alt={cap.name}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 bg-charcoal/90 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
                      {cap.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-bold uppercase tracking-tight text-charcoal mb-2 group-hover:text-accent transition-colors duration-300">
                    {cap.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed mb-6 font-normal">
                    {cap.summary}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-charcoal/10">
                    {cap.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs font-mono text-charcoal/80">
                        <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 pt-0">
                <div className="pt-4 border-t border-charcoal/8 flex items-center justify-between text-[11px] font-mono text-muted-gray">
                  <span>CAPABILITY 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 bg-accent/60 rotate-45" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Specialized Processing & Value-Added Services */}
        <div className="mt-20 pt-16 border-t border-charcoal/10">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent block mb-2 font-semibold">
              Specialized Infrastructure
            </span>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-charcoal">
              Value-Added Finishing &amp; Global Logistics
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALIZED_SERVICES.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="group bg-pure-white p-7 border border-charcoal/10 hover:border-accent hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 bg-charcoal text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-charcoal transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold px-2 py-0.5 border border-accent/30 bg-accent/5">
                        {service.tag}
                      </span>
                    </div>

                    <h4 className="text-base font-bold uppercase tracking-wider text-charcoal mb-2">
                      {service.title}
                    </h4>
                    <p className="text-xs text-charcoal/70 leading-relaxed font-normal">
                      {service.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-charcoal/8 text-[11px] font-mono text-muted-gray">
                    <span>{service.category}</span>
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
