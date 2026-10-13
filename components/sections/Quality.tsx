'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Check, ArrowRight, Microscope, Gauge, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface QualityStep {
  step: string;
  name: string;
  subtitle: string;
  description: string;
  standards: string[];
}

const QUALITY_STEPS: QualityStep[] = [
  {
    step: '01',
    name: 'Raw Material & Yarn Lab Testing',
    subtitle: 'Fiber Verification Before Production',
    description:
      'Every yarn lot undergoes testing for Count Strength Product (CSP), twist per inch (TPI), hairiness, and evenness before entering the knitting floor. Knitted greige fabric is audited using the international 4-Point System.',
    standards: ['International 4-Point Fabric Grading System', 'Yarn CSP & Twist Verification', 'Greige GSM & Loop Geometry Check'],
  },
  {
    step: '02',
    name: 'Dyeing & Color Fastness Protocol',
    subtitle: 'Chemical & Spectrophotometric Testing',
    description:
      'Continuous color verification using computerized spectrophotometers to guarantee batch-to-batch Delta-E values below 0.5 under D65, TL84, and CWF light sources. Standardized washing, rubbing, and perspiration tests.',
    standards: ['Delta-E < 0.5 Color Tolerance', 'ISO 105-C06 Wash Fastness Standard', 'OEKO-TEX® Standard 100 Zero Harmful Chemicals'],
  },
  {
    step: '03',
    name: 'In-Line Sewing & Dimensional Audits',
    subtitle: 'Real-Time AQL 2.5 Assembly Oversight',
    description:
      'Dedicated roving quality controllers audit sewing lines every hour. Critical checkpoints verify seam strength, stitch tension, stitch density (SPI), collar symmetry, and measurement tolerances against approved buyer specs.',
    standards: ['AQL 2.5 In-Line Quality Standard', 'Stitches Per Inch (SPI) Strict Enforcement', 'Measurement Tolerances Within ±0.5cm'],
  },
  {
    step: '04',
    name: '100% Calibrated Needle Detection',
    subtitle: 'Zero Ferrous Foreign Body Security',
    description:
      '100% of finished garments pass through high-sensitivity conveyor metal detection tunnels calibrated every 2 hours with 9-point ferrous test cards (0.8mm Fe) to guarantee total consumer and baby safety.',
    standards: ['0.8mm Ferrous Particle Sensitivity', 'Mandatory 100% Needle Detection Log', 'Calibrated 9-Point Hourly Audit Routine'],
  },
  {
    step: '05',
    name: 'Final Random Inspection (FRI) & Carton Audit',
    subtitle: 'Pre-Shipment Compliance Clearance',
    description:
      'A formal Final Random Inspection (FRI) is performed on packed export cartons in accordance with international MIL-STD-105E sampling tables. Packaging barcoding, carton drop tests, and humidity levels are verified before seal.',
    standards: ['MIL-STD-105E / ISO 2859 Sampling', 'Carton Humidity Monitored (< 12%)', '100% Barcode & Packaging Scannability'],
  },
];

export function Quality() {
  const containerRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      if (stepsRef.current) {
        gsap.fromTo(
          stepsRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepsRef.current,
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
    <section id="quality" ref={containerRef} className="bg-warm-white py-32 md:py-40 px-6 md:px-16 lg:px-24 border-b border-charcoal/10 relative">
      <div className="max-w-[90rem] mx-auto">
        {/* Editorial Eyebrow with numbering */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
            05 // Quality Standards
          </span>
        </div>

        {/* Section Heading with Masked Line Reveal */}
        <SectionHeading
          title={'QUALITY IS\nENGINEERED IN.'}
          subtitle="Multi-stage quality assurance systems engineered to deliver zero-defect reliability across international textile and apparel shipments."
        />

        {/* Real Laboratory & Inspection Photographic Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-16 md:mt-24">
          <div className="group bg-pure-white border border-charcoal/10 overflow-hidden shadow-sm hover:border-accent hover:shadow-2xl transition-all duration-500 h-full flex flex-col justify-between">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal">
              <picture className="w-full h-full">
                <source type="image/webp" srcSet="/assets/images/quality_process.webp" />
                <img
                  src="/assets/images/quality_process.jpg"
                  alt="Fashion Knits In-House Testing Laboratory and Inspection Floor"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-charcoal/90 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase tracking-widest text-accent">
                  <Microscope className="w-3.5 h-3.5 text-accent" />
                  Physical &amp; Chemical Testing Lab
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono text-off-white/90">
                <span className="truncate">Unit-1 Quality Control Station · Netaji Apparel Park</span>
                <span className="text-accent font-semibold ml-2">IN-HOUSE</span>
              </div>
            </div>

            <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-charcoal mb-3 group-hover:text-accent transition-colors duration-300">
                  In-House Textile Testing Laboratory
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed font-normal">
                  Our internal testing laboratory executes physical and chemical tests across all production batches: dimensional stability post-wash, colorfastness to washing and crocking, spirality, burst strength, and pilling resistance before bulk cut.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-charcoal/10 flex items-center justify-between text-xs font-mono text-charcoal/70">
                <span>COLOR TOLERANCE: DELTA-E &lt; 0.5</span>
                <span className="text-accent font-semibold">ISO 105 TEST BENCHMARKS</span>
              </div>
            </div>
          </div>

          <div className="group bg-pure-white border border-charcoal/10 overflow-hidden shadow-sm hover:border-accent hover:shadow-2xl transition-all duration-500 h-full flex flex-col justify-between">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal">
              <picture className="w-full h-full">
                <source type="image/webp" srcSet="/assets/images/team_about.webp" />
                <img
                  src="/assets/images/team_about.jpg"
                  alt="Fashion Knits Certified Technical Quality Controllers and Merchandising Team"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-charcoal/90 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase tracking-widest text-accent">
                  <Gauge className="w-3.5 h-3.5 text-accent" />
                  Technical Quality Assurance Team
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono text-off-white/90">
                <span className="truncate">Inline QA Officers · 100% Needle Detector Calibration</span>
                <span className="text-accent font-semibold ml-2">AQL 2.5 / 4.0</span>
              </div>
            </div>

            <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-charcoal mb-3 group-hover:text-accent transition-colors duration-300">
                  Certified Technical QA Controllers
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed font-normal">
                  Independent roving quality inspectors conduct hourly inline audits along cutting and sewing lines. All measurement points are checked against the approved sealed size set, with non-conformance logged and resolved in real time.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-charcoal/10 flex items-center justify-between text-xs font-mono text-charcoal/70">
                <span>INLINE PROTOCOL: HOURLY SPI AUDITS</span>
                <span className="text-accent font-semibold">ZERO COMPROMISE STANDARDS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Key Metric Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 md:mt-24 p-8 md:p-12 bg-pure-white border border-charcoal/10 shadow-sm">
          <AnimatedCounter value={100} suffix="%" label="Needle Detection Scan" />
          <AnimatedCounter value={2} prefix="AQL " suffix=".5" label="In-Line & Final Inspection" />
          <AnimatedCounter value={5} prefix="< " suffix="%" label="Controlled Shrinkage" />
          <AnimatedCounter value={9} suffix="-Point" label="Hourly Calibration Routine" />
        </div>

        {/* 5-Step Quality Assurance Architecture */}
        <div className="mt-20 pt-16 border-t border-charcoal/10">
          <div className="mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent block mb-2 font-semibold">
              Quality Assurance Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-charcoal">
              5 Checkpoints Between Greige Yarn and Packed Shipment
            </h3>
          </div>

          <div ref={stepsRef} className="space-y-6">
            {QUALITY_STEPS.map((step) => (
              <div
                key={step.step}
                className="group p-8 bg-pure-white border border-charcoal/10 hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <span className="text-2xl md:text-3xl font-mono font-bold text-accent">
                      {step.step}
                    </span>
                    <div>
                      <h4 className="text-xl font-bold uppercase tracking-wider text-charcoal group-hover:text-accent transition-colors duration-300">
                        {step.name}
                      </h4>
                      <p className="text-xs font-mono uppercase tracking-widest text-accent mt-1 font-semibold">
                        {step.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed mt-3 max-w-3xl font-normal">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="lg:w-80 flex-shrink-0 pt-4 lg:pt-0 lg:border-l lg:border-charcoal/10 lg:pl-6 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-gray block mb-1">
                      Enforced Standards:
                    </span>
                    {step.standards.map((std, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs font-mono text-charcoal/80">
                        <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{std}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Full Quality Manual CTA */}
        <div className="mt-16 pt-8 border-t border-charcoal/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-gray">
            Request Our Complete Quality Manual &amp; Lab Test Protocols
          </span>
          <Link
            href="/quality"
            className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-charcoal hover:text-accent transition-colors font-bold group"
          >
            <span>Explore Quality Control Framework</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
