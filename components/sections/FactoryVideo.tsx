'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Factory, MapPin, Eye, Calendar } from 'lucide-react';

interface FacilityView {
  title: string;
  category: string;
  image: string;
  specs: string;
}

const FACILITY_VIEWS: FacilityView[] = [
  {
    title: 'Main Factory (Unit-1) — Exterior',
    category: 'Netaji Apparel Park · Shed 29',
    image: '/assets/facilities/factory_netaji_park_actual.jpeg',
    specs: 'Shed No: 29, Netaji Apparel Park, New Tiruppur // Main manufacturing facility and production entrance',
  },
  {
    title: 'Corporate Office — Exterior',
    category: 'Angeripalayam Road · Head Office',
    image: '/assets/facilities/office_angeripalayam_actual.webp',
    specs: 'Angeripalayam Road, Tiruppur 641603 // Corporate headquarters for merchandising, sampling and buyer liaison',
  },
  {
    title: 'CAD Computerized Multi-Ply Cutting Floor',
    category: 'Unit-1 Cutting Department',
    image: '/assets/images/cutting_process.webp',
    specs: 'Vacuum-clamped multi-ply cutting tables // Digitized CAD nesting // Tolerances ±0.5mm',
  },
  {
    title: 'Quality Assurance & Finished Garment Inspection',
    category: 'Unit-1 QA & Packing',
    image: '/assets/images/packing_process.webp',
    specs: 'Inline inspection, steam tunnel finishing, 100% needle detection, and container export packing',
  },
];

export function FactoryVideo() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-warm-white text-charcoal py-20 sm:py-24 lg:py-32 px-6 md:px-16 lg:px-24 border-b border-charcoal/10 relative">
      <div className="max-w-[90rem] mx-auto">
        {/* Editorial Eyebrow with numbering */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
            09 // Production Facilities
          </span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16 pb-8 border-b border-charcoal/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-charcoal/5 border border-charcoal/10 text-xs font-mono uppercase tracking-[0.2em] text-accent font-semibold mb-4">
              <Factory className="w-3.5 h-3.5 text-accent" />
              <span>2 Strategic Facilities // Tiruppur, India</span>
            </div>
            <SectionHeading
              title={'WHERE MANUFACTURING\nMEETS PRECISION.'}
              subtitle="Tour our operational footprint across two dedicated facilities in India's knitwear capital."
            />
          </div>

          <div className="text-left sm:text-right flex-shrink-0">
            <span className="text-xs font-mono text-muted-gray uppercase tracking-widest block">
              FACILITY LOCATIONS
            </span>
            <span className="text-sm font-mono text-charcoal font-medium flex items-center sm:justify-end gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              Angeripalayam (HQ) &amp; Netaji Apparel Park (Unit-1)
            </span>
          </div>
        </div>

        {/* 4-Panel Photographic Facility Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {FACILITY_VIEWS.map((facility, idx) => (
            <div key={idx} className="h-full">
              <div className="premium-card group bg-pure-white border border-charcoal/10 overflow-hidden flex flex-col justify-between hover:border-accent hover:shadow-2xl transition-all duration-500 h-full">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-90" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 bg-charcoal/90 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                      {facility.category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold uppercase tracking-wider text-charcoal mb-2 group-hover:text-accent transition-colors duration-300">
                    {facility.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-charcoal/70 leading-relaxed">
                    {facility.specs}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Honest Facility Notice & Virtual Tour CTA */}
        <div className="mt-16 p-8 md:p-10 bg-pure-white border border-charcoal/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
          <div className="max-w-2xl">
            <h4 className="text-base font-bold font-mono uppercase tracking-wider text-charcoal flex items-center gap-2">
              <Eye className="w-4 h-4 text-accent" />
              Schedule In-Person or Live Video Factory Audit
            </h4>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-2 leading-relaxed">
              Official documentary video reel is currently in post-production. International brand sourcing representatives are welcome to schedule an in-person facility inspection or a live video walkthrough with our technical merchandising desk.
            </p>
          </div>

          <button
            onClick={scrollToContact}
            className="btn-shine px-8 py-4 bg-accent hover:bg-pure-white text-charcoal text-xs font-mono uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-2 flex-shrink-0 cursor-pointer shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Request Factory Audit</span>
          </button>
        </div>
      </div>
    </section>
  );
}
