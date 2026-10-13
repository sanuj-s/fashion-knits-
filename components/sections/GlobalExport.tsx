'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  FileText,
  CheckCircle2,
  Layers,
  Scissors,
  ShieldCheck,
  Ship,
  Anchor,
  Plane,
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
    detail: 'Direct road access from Tiruppur to VO Chidambaranar Port (Tuticorin), offering weekly container departures to European, UK, and US deepwater ports.',
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
  const containerRef = useRef<HTMLElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      if (workflowRef.current) {
        gsap.fromTo(
          workflowRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: workflowRef.current,
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
    <section id="global-reach" ref={containerRef} className="grain relative bg-charcoal text-off-white py-32 md:py-40 px-6 md:px-16 lg:px-24 border-b border-white/10">
      <div className="max-w-[90rem] mx-auto">
        {/* Editorial Eyebrow with numbering */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
            08 // Global Export Logistics
          </span>
        </div>

        {/* Section Heading with Masked Line Reveal */}
        <SectionHeading
          title={'BUILT FOR\nGLOBAL COMMERCE.'}
          subtitle="Seamless international logistics from container stuffing at our Netaji Apparel Park plant to deepwater seaports and international air hubs."
          light={true}
        />

        {/* 6-Step Order Workflow Grid */}
        <div className="mt-16 md:mt-24">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent block mb-2 font-semibold">
              Execution Timeline
            </span>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-off-white">
              6-Step Order Fulfillment Workflow
            </h3>
          </div>

          <div
            ref={workflowRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {ORDER_WORKFLOW.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="group p-8 bg-[#161413] border border-white/10 hover:border-accent hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-mono font-bold text-accent">
                        {item.step}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-accent font-bold">
                          {item.timeframe}
                        </span>
                        <div className="w-8 h-8 bg-black/60 border border-white/10 flex items-center justify-center text-accent">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold uppercase tracking-wider text-off-white mb-2 group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed font-normal mb-6">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase text-muted-gray block">
                      Phase Milestone:
                    </span>
                    <span className="text-xs font-mono text-off-white/90 font-semibold block mt-0.5">
                      {item.deliverable}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Strategic Ocean & Air Gateways */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent block mb-2 font-semibold">
              Logistics Infrastructure
            </span>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-off-white">
              Direct Seaport &amp; Airport Connectivity from Tiruppur
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {LOGISTICS_GATEWAYS.map((gateway, idx) => {
              const Icon = gateway.icon;
              return (
                <div
                  key={idx}
                  className="group p-8 bg-[#161413] border border-white/10 hover:border-accent transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-black/60 border border-white/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-charcoal transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold uppercase tracking-wider text-off-white mb-1">
                      {gateway.title}
                    </h4>
                    <p className="text-xs font-mono uppercase tracking-widest text-accent mb-4 font-semibold">
                      {gateway.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed font-normal">
                      {gateway.detail}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-muted-gray">
                    <span>GATEWAY 0{idx + 1}</span>
                    <span className="w-1.5 h-1.5 bg-accent/60 rotate-45" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Export Support CTA */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-gray">
            INCOTERMS Supported: FOB, CIF, DDP, CFR Worldwide
          </span>
          <Link
            href="/export"
            className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-accent hover:text-off-white transition-colors font-bold group"
          >
            <span>Explore Shipping &amp; Trade Terms</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
