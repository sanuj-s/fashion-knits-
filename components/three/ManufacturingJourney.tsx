'use client';

import React, { useState, useEffect, useRef, Component, ErrorInfo, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from '@/lib/animations';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, ChevronDown, Sparkles } from 'lucide-react';

// Error boundary to catch any WebGL / Three.js canvas crashes gracefully
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL 3D Engine fallback activated:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Dynamic import with SSR disabled for Three.js canvas
const JourneyScene = dynamic(
  () => import('./JourneyScene').then((mod) => mod.JourneyScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-transparent">
        <Box className="w-12 h-12 text-accent/60 animate-spin" strokeWidth={1} />
        <span className="text-xs uppercase tracking-[0.3em] text-muted-gray mt-4">
          Initializing 3D Journey Engine...
        </span>
      </div>
    ),
  }
);

interface StageData {
  number: string;
  name: string;
  subtitle: string;
  description: string;
  techNote: string;
}

const JOURNEY_STAGES: StageData[] = [
  {
    number: '01',
    name: 'YARN',
    subtitle: 'High-grade Raw Fiber & Spinning',
    description:
      'Rigorous selection of premium combed and carded cotton, micro-modal, and recycled blends. Yarn counts and tensile integrity are calibrated for international specifications.',
    techNote: '[YARN SPECIFICATION ARCHITECTURE — COUNTS 20s TO 80s]',
  },
  {
    number: '02',
    name: 'KNITTING',
    subtitle: 'Precision Fabric Construction',
    description:
      'High-gauge circular and flat knitting machines producing single jersey, pique, interlock, rib, and fleece. Computerized tension controls guarantee uniform loop formation.',
    techNote: '[KNITTING CAPACITY & MACHINE ARRAY DATA PLACEHOLDER]',
  },
  {
    number: '03',
    name: 'DYEING',
    subtitle: 'Controlled Spectrophotometric Coloring',
    description:
      'Eco-efficient soft-flow dyeing vessels with automated computerized chemical dispensing. Uncompromising colorfastness, exact batch-to-batch Delta-E tolerances.',
    techNote: '[DYEING PROTOCOL & ECO-COMPLIANCE DATA PLACEHOLDER]',
  },
  {
    number: '04',
    name: 'PROCESSING',
    subtitle: 'Hydro-extraction & Heat Setting',
    description:
      'Continuous bleaching, relax dryers, and precision stentering to lock in dimensional stability, shrinkage control, and optimal fabric weight.',
    techNote: '[FABRIC PROCESSING PARAMETERS PLACEHOLDER]',
  },
  {
    number: '05',
    name: 'FINISHING',
    subtitle: 'Surface Refinement & Hand-Feel',
    description:
      'Compacting, bio-polishing, peached carbon finish, and specialized antimicrobial and moisture-wicking treatments engineered to luxury brand benchmarks.',
    techNote: '[SURFACE TREATMENT & FINISH PORTFOLIO PLACEHOLDER]',
  },
  {
    number: '06',
    name: 'GARMENT MFG',
    subtitle: 'CAD Patterning, Cutting & Assembly',
    description:
      'Automated multi-ply CNC cutting tables paired with modular lean sewing lines. Synchronized production workflow with real-time digital throughput tracking.',
    techNote: '[SEWING LINE CONFIGURATION & LINE EFFICIENCY DATA]',
  },
  {
    number: '07',
    name: 'QUALITY CONTROL',
    subtitle: 'Multi-Point Inspection Systems',
    description:
      'Strict 4-Point fabric testing, in-line AQL audits at 2.5 / 4.0, pull-test verification, spectrophotometer color matching, and 100% needle detection scans.',
    techNote: '[AQL QUALITY TOLERANCES & AUDIT METRICS PLACEHOLDER]',
  },
  {
    number: '08',
    name: 'PACKING',
    subtitle: 'Export-Grade Packaging & Barcoding',
    description:
      'Polybagged, flat-packed, or hanger-packed to global retailer compliance. Moisture-resistant master cartons labeled with automated RFID/barcode inventory systems.',
    techNote: '[PACKAGING COMPLIANCE MATRIX PLACEHOLDER]',
  },
  {
    number: '09',
    name: 'GLOBAL EXPORT',
    subtitle: 'Multimodal Worldwide Logistics',
    description:
      'Direct customs clearance integration, bonded warehousing, and streamlined sea/air freight distribution networks connecting manufacturing floors to worldwide retail hubs.',
    techNote: '[EXPORT CORRIDORS & LOGISTICS HUB DATA PLACEHOLDER]',
  },
];

export function ManufacturingJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);
        const idx = Math.min(
          Math.floor(p * (JOURNEY_STAGES.length - 1) + 0.5),
          JOURNEY_STAGES.length - 1
        );
        setActiveStageIndex(idx);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const currentStage = JOURNEY_STAGES[activeStageIndex] || JOURNEY_STAGES[0];

  const jumpToStage = (index: number) => {
    setActiveStageIndex(index);
    const targetProgress = index / (JOURNEY_STAGES.length - 1);
    setProgress(targetProgress);

    if (!sectionRef.current) return;
    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
    const targetScroll = sectionTop + targetProgress * sectionHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative w-full bg-[#121110] text-off-white"
      style={{ height: '750vh' }}
    >
      {/* Sticky Fullscreen Experience Container */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between overflow-hidden px-6 md:px-16 lg:px-24 py-6 md:py-10 select-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#262320] via-[#171514] to-[#0c0c0c]">
        {/* Subtle Ambient Studio Glow behind 3D model */}
        <div className="absolute w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full bg-accent/15 blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-0" />

        {/* Fine Technical Grid Lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 z-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Top Bar: Section Title & 3D Indicator */}
        <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-accent flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              The Signature Journey
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-off-white uppercase mt-0.5">
              From Yarn to Global
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 text-[10px] uppercase font-mono tracking-widest text-muted-gray">
              [3D INTERACTIVE ENGINE — STAGES 01-09]
            </span>
            <span className="text-xs font-mono text-accent font-semibold px-2 py-0.5 bg-accent/10 border border-accent/30">
              STAGE {currentStage.number} / 09
            </span>
          </div>
        </div>

        {/* Center: 3D Canvas Layer */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <WebGLErrorBoundary
            fallback={
              <div className="flex flex-col items-center justify-center text-center p-8 bg-charcoal/80 border border-white/10 max-w-md">
                <Box className="w-12 h-12 text-accent mb-4" />
                <h4 className="text-lg font-bold text-off-white uppercase">
                  Stage {currentStage.number}: {currentStage.name}
                </h4>
                <p className="text-xs text-muted-gray mt-2">{currentStage.subtitle}</p>
              </div>
            }
          >
            <JourneyScene progress={progress} />
          </WebGLErrorBoundary>
        </div>

        {/* Floating Narrative Content: Left Side */}
        <div className="relative z-20 max-w-md md:max-w-lg lg:max-w-xl bg-charcoal/85 backdrop-blur-md p-5 sm:p-7 md:p-8 border border-white/10 my-auto shadow-2xl pointer-events-auto">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-4xl sm:text-6xl md:text-7xl font-bold font-mono tracking-tighter text-accent">
              {currentStage.number}
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-off-white uppercase">
                {currentStage.name}
              </h3>
              <p className="text-xs sm:text-sm text-accent/90 uppercase tracking-widest font-mono">
                {currentStage.subtitle}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm md:text-base text-off-white/80 leading-relaxed mt-3 sm:mt-4">
            {currentStage.description}
          </p>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-mono text-muted-gray uppercase tracking-wider">
              {currentStage.techNote}
            </span>
          </div>
        </div>

        {/* Bottom Interactive Navigation Ribbon */}
        <div className="relative z-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-4 border-t border-white/10">
          {/* Step Pill Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-none">
            {JOURNEY_STAGES.map((s, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={s.number}
                  onClick={() => jumpToStage(idx)}
                  className={`px-2.5 py-1 text-[11px] font-mono transition-all duration-300 rounded-none border cursor-pointer ${
                    isActive
                      ? 'bg-accent text-charcoal border-accent font-bold shadow-[0_0_12px_rgba(201,169,110,0.4)]'
                      : 'bg-white/5 text-off-white/70 border-white/10 hover:border-accent/50 hover:text-off-white'
                  }`}
                  aria-label={`Jump to stage ${s.number} ${s.name}`}
                >
                  {s.number} {s.name}
                </button>
              );
            })}
          </div>

          {/* Scroll instruction indicator */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-muted-gray">
            <span>Scroll to Advance Process</span>
            <ChevronDown className="w-3.5 h-3.5 text-accent animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
