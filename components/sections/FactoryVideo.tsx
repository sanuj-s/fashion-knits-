'use client';

import React from 'react';
import { Factory, MapPin, Eye, Calendar } from 'lucide-react';

interface FacilityView {
  title: string;
  category: string;
  image: string;
  specs: string;
}

const FACILITY_VIEWS: FacilityView[] = [
  {
    title: 'Main Factory (Unit-1) — Production Floor',
    category: 'Netaji Apparel Park · Shed 29',
    image: '/assets/facilities/factory_netaji_park.jpg',
    specs: 'Shed No: 29, Netaji Apparel Park, New Tirupur // Circular knitting, sewing assembly & finishing lines',
  },
  {
    title: 'Primary Corporate Office & Sample Showroom',
    category: 'Angeripalayam Road · Head Office',
    image: '/assets/facilities/office_angeripalayam.jpg',
    specs: 'Angeripalayam Road, Tiruppur 641603 // Executive management, technical merchandising & proto sampling',
  },
  {
    title: 'CAD Computerized Multi-Ply Cutting Floor',
    category: 'Unit-1 Cutting Department',
    image: '/assets/images/cutting_process.jpg',
    specs: 'Vacuum-clamped multi-ply cutting tables // Digitized CAD nesting // Tolerances ±0.5mm',
  },
  {
    title: 'Quality Assurance & Finished Garment Inspection',
    category: 'Unit-1 QA & Packing',
    image: '/assets/images/packing_process.jpg',
    specs: 'Inline inspection, steam tunnel finishing, 100% needle detection, and container export packing',
  },
];

export function FactoryVideo() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full bg-charcoal text-off-white py-28 md:py-36 px-6 md:px-16 lg:px-24 border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-accent mb-3">
              <Factory className="w-3.5 h-3.5 text-accent" />
              <span>2 Strategic Facilities // Tiruppur, India</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-off-white">
              WHERE MANUFACTURING<br />
              <span className="text-accent">MEETS PRECISION.</span>
            </h2>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-mono text-muted-gray uppercase tracking-widest block">
              FACILITY LOCATIONS
            </span>
            <span className="text-sm font-mono text-off-white font-medium flex items-center sm:justify-end gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              Angeripalayam (HQ) &amp; Netaji Apparel Park (Unit-1)
            </span>
          </div>
        </div>

        {/* 4-Panel Photographic Facility Gallery (No Fake Video Controls) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {FACILITY_VIEWS.map((facility, idx) => (
            <div key={idx} className="h-full">
              <div
                className="group bg-[#171514] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-accent/50 transition-all duration-300 h-full"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 bg-charcoal/90 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-accent">
                      {facility.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold uppercase tracking-wider text-off-white mb-2">
                    {facility.title}
                  </h3>
                  <p className="text-xs font-mono text-off-white/70 leading-relaxed">
                    {facility.specs}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Honest Facility Notice & Virtual Tour CTA */}
        <div className="mt-12 p-6 md:p-8 bg-[#171514] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="text-sm font-bold font-mono uppercase tracking-widest text-off-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-accent" />
              Schedule In-Person or Live Video Factory Audit
            </h4>
            <p className="text-xs text-off-white/70 mt-1 leading-relaxed">
              Official documentary video reel is currently in post-production. International brand sourcing representatives are welcome to schedule an in-person facility inspection or a live video walkthrough with our technical merchandising desk.
            </p>
          </div>

          <button
            onClick={scrollToContact}
            className="px-6 py-3 bg-accent hover:bg-pure-white text-charcoal text-xs font-mono uppercase tracking-widest font-bold transition-colors flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Request Factory Audit</span>
          </button>
        </div>
      </div>
    </section>
  );
}
