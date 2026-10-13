'use client';

import React, { useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView, useReducedMotion } from '@/lib/hooks';
import {
  FileText,
  CheckCircle2,
  Layers,
  Scissors,
  ShieldCheck,
  Ship,
  Anchor,
  Plane,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface WorkflowStep {
  step: string;
  title: string;
  timeframe: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverable: string;
}

const ORDER_WORKFLOW: WorkflowStep[] = [
  {
    step: '01',
    title: 'Tech Pack & Lab Dips',
    timeframe: '7 – 10 Days',
    summary: 'Buyer tech pack analysis, Pantone color lab-dip matching under D65 lighting, and Proto / SMS sample fabrication.',
    icon: FileText,
    deliverable: 'Approved Proto Sample & Lab Dips',
  },
  {
    step: '02',
    title: 'PO & Yarn Allocation',
    timeframe: '3 – 5 Days',
    summary: 'Purchase order signoff, yarn spinning allocation (combed, compact, or GOTS organic cotton), and production scheduling.',
    icon: CheckCircle2,
    deliverable: 'Yarn CSP & Lot Verification',
  },
  {
    step: '03',
    title: 'Knitting & Eco-Dyeing',
    timeframe: '10 – 14 Days',
    summary: 'High-gauge circular knitting at Netaji Apparel Park paired with certified low-liquor soft-flow dyeing and Delta-E < 0.5 color fastness checks.',
    icon: Layers,
    deliverable: 'Approved Bulk Fabric Swatch',
  },
  {
    step: '04',
    title: 'CAD Cutting & Assembly',
    timeframe: '12 – 18 Days',
    summary: 'Automated multi-ply vacuum cutting and modular lean sewing lines with in-line AQL 2.5 stitch density audits.',
    icon: Scissors,
    deliverable: 'Sewn Garments & In-Line QC Pass',
  },
  {
    step: '05',
    title: '100% Metal Scan & QA',
    timeframe: '3 – 5 Days',
    summary: 'Steam tunnel compact pressing, 100% calibrated 0.8mm conveyor needle detector scan, and Final Random Inspection (FRI).',
    icon: ShieldCheck,
    deliverable: 'Pre-Shipment Inspection Report',
  },
  {
    step: '06',
    title: 'Container Stuffing & Port',
    timeframe: 'Direct Dispatch',
    summary: 'Carton barcode verification, on-site container stuffing, and bonded customs transit to Tuticorin / Chennai seaport terminals.',
    icon: Ship,
    deliverable: 'Bill of Lading & GSP/REX Certificate',
  },
];

const LOGISTICS_GATEWAYS = [
  {
    icon: Anchor,
    title: 'Tuticorin Seaport Gateway',
    subtitle: 'Primary Ocean Freight Corridor',
    detail: 'Direct road access from Tirupur to VO Chidambaranar Port (Tuticorin), offering weekly container departures to European, UK, and US deepwater ports.',
  },
  {
    icon: Anchor,
    title: 'Chennai & Cochin Terminals',
    subtitle: 'Consolidated Sea Freight',
    detail: 'Full Container Load (FCL) and Less than Container Load (LCL) dispatch connecting through Chennai Port and Cochin DP World Terminals.',
  },
  {
    icon: Plane,
    title: 'Coimbatore Air Cargo (CJB)',
    subtitle: 'Time-Critical Air Shipments',
    detail: '45-minute transit to Coimbatore International Airport (CJB), with feeder connections to Bengaluru (BLR) and Chennai (MAA) for urgent SMS and retail launches.',
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
          title={'ORDER-TO-SHIPMENT\nWORKFLOW.'}
          subtitle="How international fashion brands and apparel importers work with Fashion Knits: a transparent 6-stage production and export pipeline."
        />

        {/* 1. Clear Order-to-Shipment Visual Diagram */}
        <div ref={containerRef} className="mt-16 md:mt-20">
          <div className="flex items-center justify-between pb-4 border-b border-charcoal/10 mb-8">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent font-bold">
              Buyer Sourcing Pipeline // 6 Operational Milestones
            </h3>
            <span className="text-[11px] font-mono text-muted-gray">
              Transparent Milestones &amp; Timelines
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ORDER_WORKFLOW.map((wf, index) => {
              const Icon = wf.icon;
              return (
                <div
                  key={wf.step}
                  className="bg-pure-white border border-charcoal/10 p-6 md:p-7 flex flex-col justify-between hover:border-accent hover:shadow-md transition-all duration-300 relative group"
                  style={{
                    opacity: prefersReducedMotion || isInView ? 1 : 0,
                    transform: prefersReducedMotion || isInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.4s ease-out ${index * 0.06}s, transform 0.4s ease-out ${index * 0.06}s`,
                  }}
                >
                  <div>
                    {/* Top Row: Step Badge & Timeframe */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 bg-charcoal text-accent font-mono font-bold text-xs flex items-center justify-center">
                          {wf.step}
                        </span>
                        <div className="w-8 h-8 bg-off-white text-charcoal flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold px-2 py-1 bg-off-white border border-charcoal/5">
                        {wf.timeframe}
                      </span>
                    </div>

                    {/* Step Title & 1-Sentence Summary */}
                    <h4 className="text-base font-bold text-charcoal uppercase tracking-wider mb-2">
                      {wf.title}
                    </h4>
                    <p className="text-xs text-charcoal/70 leading-relaxed font-normal mb-5">
                      {wf.summary}
                    </p>
                  </div>

                  {/* Verified Milestone Deliverable */}
                  <div className="pt-4 border-t border-charcoal/5 flex items-center gap-2 text-[10px] font-mono text-charcoal/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span className="font-medium">{wf.deliverable}</span>
                  </div>

                  {/* Corner Accent Line */}
                  <div className="absolute top-0 right-0 w-8 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300" />
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Verified Export Logistics Corridors */}
        <div className="mt-20 pt-16 border-t border-charcoal/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-[0.2em] mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Origin: Shed No. 29, Netaji Apparel Park, New Tirupur – 641 666, India</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-charcoal">
                Direct Seaport &amp; Air Logistics Gateways
              </h3>
            </div>
            <span className="text-[11px] font-mono text-muted-gray">
              Bonded Customs Clearance on Site
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LOGISTICS_GATEWAYS.map((gate, gIdx) => {
              const Icon = gate.icon;
              return (
                <div
                  key={gIdx}
                  className="bg-pure-white p-6 md:p-7 border border-charcoal/8 hover:border-accent/40 shadow-sm transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 bg-charcoal text-accent flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-charcoal uppercase tracking-wider mb-1">
                      {gate.title}
                    </h4>
                    <p className="text-xs font-mono uppercase tracking-wider text-accent mb-3 font-semibold">
                      {gate.subtitle}
                    </p>
                    <p className="text-xs text-charcoal/70 leading-relaxed font-normal">
                      {gate.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View Full Export Details */}
          <div className="mt-16 pt-8 border-t border-charcoal/10 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-gray">
              Complete Export & Logistics Details
            </span>
            <Link
              href="/export"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-charcoal hover:text-accent transition-colors font-bold group"
            >
              <span>View Export Details</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
