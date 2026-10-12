'use client';

import React, { useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView, useReducedMotion } from '@/lib/hooks';
import { Anchor, Plane, FileCheck, MapPin, Globe } from 'lucide-react';

const LOGISTICS_HUBS = [
  {
    icon: Anchor,
    title: 'Major Seaport Gateways',
    badge: 'Ocean Container Freight',
    description:
      'Direct container dispatch from our Avinashi facility connecting via dedicated road corridors to Tuticorin Port (VO Chidambaranar), Chennai Port, and Kochi Port for global ocean freight.',
    keyPoints: ['Tuticorin Port (Primary Export Hub)', 'Chennai & Kochi Container Terminals', 'FCL & LCL Consolidated Shipments'],
  },
  {
    icon: Plane,
    title: 'Air Freight Access',
    badge: 'Time-Critical Shipments',
    description:
      'Proximity to Coimbatore International Airport (CJB - 45km), Bengaluru International (BLR), and Chennai (MAA) enables rapid air-freight fulfillment for urgent buyer launches and sampling.',
    keyPoints: ['Coimbatore International (CJB) Proximity', 'Direct Bengaluru & Chennai Cargo Access', 'Express Air Courier Dispatch'],
  },
  {
    icon: FileCheck,
    title: 'Customs & Documentation',
    badge: 'Full EDI Integration',
    description:
      'In-house export documentation team handling Electronic Data Interchange (EDI), GSP / REX certificates of origin, Bill of Lading, Certificate of Inspection, and buyer compliance paperwork.',
    keyPoints: ['Tirupur Inland Container Depot (ICD)', 'GSP & REX Statement of Origin', 'Direct Electronic Customs Clearance'],
  },
];

const DESTINATION_REGIONS = [
  {
    region: 'European Union',
    countries: 'Germany, France, Netherlands, Spain, Italy, Sweden, Denmark',
    compliance: 'REACH & GOTS v7.0 Compliant',
  },
  {
    region: 'United Kingdom',
    countries: 'Great Britain & Northern Ireland',
    compliance: 'SEDEX & SMETA 4-Pillar Audited',
  },
  {
    region: 'North America',
    countries: 'United States & Canada',
    compliance: 'AQL 2.5 & CPSIA Certified',
  },
  {
    region: 'Middle East & Asia-Pacific',
    countries: 'UAE, Saudi Arabia, Australia, Japan',
    compliance: 'OEKO-TEX Class I Baby-Safe',
  },
];

export function GlobalExport() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });

  return (
    <section id="global-reach" className="bg-off-white py-28 md:py-36 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <SectionHeading
          title={'MADE HERE.\nDELIVERED WORLDWIDE.'}
          subtitle="Strategic export logistics engineered to connect our manufacturing floor in Tirupur, India, to international retail distribution centers and port terminals worldwide."
        />

        {/* Global Hub Map & Export Corridors */}
        <div
          ref={containerRef}
          className="mt-16 md:mt-20 max-w-6xl mx-auto"
          style={{
            opacity: prefersReducedMotion || isInView ? 1 : 0,
            transform: prefersReducedMotion || isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          {/* Clean Editorial Export Map Canvas */}
          <div className="relative w-full bg-charcoal text-off-white p-8 md:p-12 border border-charcoal/10 overflow-hidden">
            {/* Background Grid Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-[0.2em] mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Origin: Apparel Park, Avinashi, Tirupur, India</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-off-white">
                  Global Export Corridors &amp; Trade Networks
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-muted-gray bg-white/5 px-4 py-2 border border-white/10">
                <Globe className="w-4 h-4 text-accent" />
                <span>IN-HOUSE CONTAINER STUFFING</span>
              </div>
            </div>

            {/* Destination Corridors Grid */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DESTINATION_REGIONS.map((dest, dIdx) => (
                <div key={dIdx} className="bg-white/5 border border-white/10 p-5">
                  <span className="text-xs font-mono uppercase tracking-wider text-accent block mb-1">
                    {dest.region}
                  </span>
                  <p className="text-xs text-off-white/80 font-normal leading-relaxed mb-3">
                    {dest.countries}
                  </p>
                  <span className="text-[10px] font-mono text-muted-gray uppercase block pt-2 border-t border-white/10">
                    {dest.compliance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Logistics Infrastructure Cards (Replacing placeholder XX stats) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {LOGISTICS_HUBS.map((hub, hIdx) => {
              const Icon = hub.icon;
              return (
                <div
                  key={hIdx}
                  className="bg-pure-white p-7 md:p-8 border border-charcoal/8 hover:border-accent/40 shadow-sm transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-charcoal text-accent flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-muted-gray uppercase tracking-wider">
                        {hub.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-charcoal uppercase tracking-wider mb-2">
                      {hub.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed mb-6">
                      {hub.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-charcoal/5 space-y-1.5">
                    {hub.keyPoints.map((pt, pIdx) => (
                      <div key={pIdx} className="text-[11px] font-mono text-charcoal/80 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-accent" />
                        <span>{pt}</span>
                      </div>
                    ))}
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
