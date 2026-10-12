'use client';

import React, { useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView, useReducedMotion } from '@/lib/hooks';
import { CheckCircle2 } from 'lucide-react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });

  return (
    <section id="quality" className="bg-off-white py-28 md:py-36 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <SectionHeading
          title={'QUALITY IS\nENGINEERED IN.'}
          subtitle="Multi-stage quality assurance systems engineered to deliver zero-defect reliability across international textile and apparel shipments."
        />

        {/* Quality Timeline */}
        <div ref={containerRef} className="mt-20 relative max-w-5xl mx-auto">
          {/* Vertical Timeline Guide Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-charcoal/15 -translate-x-1/2" />

          <div className="space-y-16">
            {QUALITY_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.step}
                  className={`relative flex items-start ${
                    isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                  style={{
                    opacity: prefersReducedMotion || isInView ? 1 : 0,
                    transform: prefersReducedMotion || isInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`,
                  }}
                >
                  {/* Central Node Indicator */}
                  <div className="absolute left-[15px] md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-off-white -translate-x-1/2 z-10 mt-1.5 shadow-sm" />

                  {/* Step Card Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isEven ? 'md:pl-12' : 'md:pr-12 md:text-right'
                    }`}
                  >
                    <div className="bg-pure-white p-8 border border-charcoal/8 hover:border-accent/40 shadow-sm transition-all duration-300">
                      <div className={`flex items-baseline gap-3 mb-2 ${isEven ? '' : 'md:justify-end'}`}>
                        <span className="text-3xl font-bold font-mono text-accent">
                          {step.step}
                        </span>
                        <span className="text-xs uppercase font-mono tracking-widest text-muted-gray">
                          QUALITY STAGE
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-charcoal uppercase tracking-tight mb-1">
                        {step.name}
                      </h3>

                      <p className="text-xs font-mono uppercase tracking-wider text-accent mb-4">
                        {step.subtitle}
                      </p>

                      <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed mb-6 text-left">
                        {step.description}
                      </p>

                      <div className="pt-4 border-t border-charcoal/5 space-y-2 text-left">
                        {step.standards.map((std, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-[11px] font-mono text-charcoal/80">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                            <span>{std}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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
