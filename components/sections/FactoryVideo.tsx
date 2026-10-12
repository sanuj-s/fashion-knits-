'use client';

import { useRef, useEffect } from 'react';
import { FactoryCinematicVideo } from '@/components/ui/FactoryCinematicVideo';
import { gsap } from '@/lib/animations';
import { useReducedMotion } from '@/lib/hooks';

export function FactoryVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !textRef.current || !gsap) return;

    const ctx = gsap.context(() => {
      // Subtle parallax effect on text
      gsap.to(textRef.current, {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] w-full bg-charcoal overflow-hidden flex items-center justify-center border-y border-white/10"
    >
      {/* Cinematic Live Multi-Cam Factory Video Experience */}
      <div className="absolute inset-0">
        <FactoryCinematicVideo
          label="FASHION KNITS FACTORY PRODUCTION BROADCAST"
          showHud={true}
        />
      </div>

      {/* Floating Center Narrative Overlay */}
      <div className="relative z-20 px-6 max-w-5xl mx-auto pointer-events-none text-center">
        <span className="text-xs uppercase font-mono tracking-[0.3em] text-accent mb-4 inline-block bg-charcoal/80 backdrop-blur-md px-4 py-1.5 border border-white/15">
          Cinematic Production Telemetry
        </span>
        <h2
          ref={textRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-off-white tracking-tight leading-[0.95] uppercase drop-shadow-2xl"
        >
          WHERE MANUFACTURING
          <br />
          <span className="text-accent">MEETS PRECISION.</span>
        </h2>
      </div>
    </section>
  );
}
