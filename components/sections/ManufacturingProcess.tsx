'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Stage {
  number: string;
  name: string;
  summary: string;
  image: string;
  specs: string[];
  standard: string;
}

const PRODUCTION_STAGES: Stage[] = [
  {
    number: '01',
    name: 'Yarn Sourcing',
    summary: 'Sourcing certified organic cotton and combed compact yarns from audited spinning mills.',
    image: '/assets/images/yarn_process.webp',
    specs: ['Yarn Counts: 20s to 80s Single & Double', 'Low Hairiness & High CSP Calibrated', '100% Organic Chain of Custody Verified'],
    standard: 'GOTS v7.0 & OCS 100 Standards',
  },
  {
    number: '02',
    name: 'Circular Knitting',
    summary: 'High-gauge circular knitting machines producing single jersey, pique, interlock, rib, and fleece.',
    image: '/assets/images/knitting_process.webp',
    specs: ['Machine Gauges: 20GG to 32GG', 'Diameters: 24" to 36"', 'Single Jersey, Pique, Interlock, Rib, Waffle, Fleece'],
    standard: 'Zero-Spirality & GSM Calibration',
  },
  {
    number: '03',
    name: 'Eco Soft-Flow Dyeing',
    summary: 'Certified soft-flow jet dyeing with low liquor ratios and OEKO-TEX Standard 100 non-toxic dyes.',
    image: '/assets/images/dyeing_process.webp',
    specs: ['Low Liquor-Ratio Eco Vessels', 'Computerized Spectrophotometer Delta-E < 0.5', 'Non-Toxic ZDHC Compliant Dyestuffs'],
    standard: 'OEKO-TEX® Standard 100 Class I',
  },
  {
    number: '04',
    name: 'CAD Cutting',
    summary: 'Multi-ply vacuum cutting tables synchronized with CAD marker optimization for maximum fabric yield.',
    image: '/assets/images/cutting_process.webp',
    specs: ['CAD Pattern Grading & Nesting', 'Vacuum-Clamped Multi-Ply Spreading', 'Precision Cut Tolerances ±0.5mm'],
    standard: 'CAD Automated Pattern System',
  },
  {
    number: '05',
    name: 'Precision Stitching',
    summary: 'Modular lean sewing lines with programmable Juki and Brother machines for precision seam construction.',
    image: '/assets/images/stitching_process.webp',
    specs: ['Programmable Juki & Brother Workstations', 'Overlock, Flatlock, & Chainstitch Seams', 'Hourly In-Line Stitch Density (SPI) Audits'],
    standard: 'Lean Modular Assembly Protocol',
  },
  {
    number: '06',
    name: 'Fabric Finishing',
    summary: 'Enzyme bio-polishing, peached suede finish, silicon softening, and calender compacting.',
    image: '/assets/images/finishing_process.webp',
    specs: ['Enzyme Bio-Polishing & Silicon Baths', 'Tension-Free Calender Compacting', 'Residual Shrinkage Controlled < 5%'],
    standard: 'ISO Shrinkage & Dimensional Standards',
  },
  {
    number: '07',
    name: 'Quality & Metal Scan',
    summary: 'In-line AQL 2.5 auditing, seam burst testing, and 100% calibrated conveyor metal detection.',
    image: '/assets/images/quality_process.webp',
    specs: ['AQL 2.5 In-Line & Final Random Audit', '0.8mm Ferrous Calibrated Needle Detection', 'Seam Strength, Pull-Test, & Color Crock Testing'],
    standard: 'MIL-STD-105E & 9-Point Needle Audit',
  },
  {
    number: '08',
    name: 'Export Packing',
    summary: 'Steam tunnel pressing, individual polybagging, barcode scan, carton packing for global sea & air dispatch.',
    image: '/assets/images/packing_process.webp',
    specs: ['Steam Tunnel Finishing & Hand Ironing', 'Retail Drop-Tested Heavy Export Cartons', 'Bonded Container Loading at Unit-1 NAP'],
    standard: 'Global Retail Compliance & Barcode Scan',
  },
];

export function ManufacturingProcess() {
  const pinSectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(1);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop: Pinned horizontal scroll story
    mm.add('(min-width: 1024px)', () => {
      if (!pinSectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 120;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinSectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getScrollAmount() * 1.2}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
            const stageIndex = Math.min(
              8,
              Math.max(1, Math.floor(self.progress * 8) + 1)
            );
            setActiveStage(stageIndex);
          },
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="manufacturing"
      ref={pinSectionRef}
      className="grain relative w-full bg-charcoal text-off-white overflow-hidden border-b border-white/10"
    >
      {/* Header Bar within pinned section */}
      <div className="pt-24 lg:pt-28 pb-8 px-6 md:px-16 lg:px-24 max-w-[90rem] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
              02 // Manufacturing Story
            </span>
          </div>
          <SectionHeading
            title={'FROM YARN\nTO EXPORT.'}
            subtitle="Explore our end-to-end 8-stage manufacturing cycle — operating with tight ISO tolerances and verified GOTS/OEKO-TEX standards."
            light={true}
          />
        </div>

        {/* Live Stage Counter & Desktop Horizontal Hint */}
        <div className="flex items-center gap-8 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-accent text-lg font-bold">0{activeStage}</span>
            <span className="text-muted-gray">/</span>
            <span className="text-muted-gray">08 STAGES</span>
          </div>
          <span className="hidden lg:inline-block text-[11px] uppercase tracking-[0.2em] text-off-white/60">
            Scroll To Navigate Sequence &rarr;
          </span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full h-[2px] bg-white/10 relative">
        <div
          ref={progressBarRef}
          className="absolute inset-y-0 left-0 w-full bg-accent origin-left transition-transform duration-75"
          style={{ transform: 'scaleX(0.125)' }}
        />
      </div>

      {/* Track: Horizontal on Desktop, Responsive Flow on Mobile */}
      <div className="py-12 lg:py-16 px-6 md:px-16 lg:px-24">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full lg:w-max will-change-transform"
        >
          {PRODUCTION_STAGES.map((stage) => (
            <div
              key={stage.number}
              className="w-full lg:w-[480px] xl:w-[520px] flex-shrink-0 bg-[#161413] border border-white/10 hover:border-accent/60 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Photo with 16:10 ratio */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                <picture className="w-full h-full">
                  <source type="image/webp" srcSet={stage.image} />
                  <img
                    src={stage.image.replace('.webp', '.jpg')}
                    alt={stage.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-[#161413] via-transparent to-transparent opacity-90" />
                
                {/* Number Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-charcoal/90 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-accent">
                    STAGE {stage.number}
                  </span>
                </div>

                {/* Standard Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-off-white/80 border border-white/10">
                    {stage.standard}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-off-white mb-2 group-hover:text-accent transition-colors duration-300">
                    {stage.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed mb-6">
                    {stage.summary}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    {stage.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5 text-xs font-mono text-off-white/80">
                        <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-muted-gray">
                  <span>FASHION KNITS // UNIT-1</span>
                  <span className="text-accent font-semibold">TIRUPPUR</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer bar of section */}
      <div className="pb-16 px-6 md:px-16 lg:px-24 max-w-[90rem] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-gray">
          Continuous Quality Protocol Across All 8 Stages
        </span>
        <Link
          href="/manufacturing"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-accent hover:text-off-white transition-colors font-bold group"
        >
          <span>Detailed Manufacturing Deep-Dive</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}
