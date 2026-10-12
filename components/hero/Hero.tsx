'use client';

import React, { useEffect, useRef } from 'react';
import { FactoryCinematicVideo } from '@/components/ui/FactoryCinematicVideo';
import { ScrollIndicator } from './ScrollIndicator';
import { gsap } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/animations';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Staggered reveal for the headline lines
      tl.fromTo(
        '.hero-line',
        { y: 80, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.2, stagger: 0.15 },
        0.2
      );

      // Subheading fade & rise
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.6'
      );

      // CTA buttons fade & slide
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      );

      // Parallax effect on scroll
      gsap.to(headlineRef.current, {
        y: -50,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(bgRef.current, {
        y: 80,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-end bg-charcoal text-off-white overflow-hidden pt-28 pb-16 md:pb-24 px-6 md:px-16 lg:px-24"
    >
      {/* Background Visual: Live Cinematic Fashion Knits Factory Footage */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-45 select-none"
      >
        <FactoryCinematicVideo
          showHud={false}
          className="w-full h-full border-none"
        />
        {/* Cinematic Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/50 to-transparent" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl">
        {/* Subtle Category/Pre-header */}
        <div className="overflow-hidden mb-4">
          <p className="hero-line text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-accent">
            Integrated Manufacturing Ecosystem
          </p>
        </div>

        {/* Confident Large Editorial Headline */}
        <h1
          ref={headlineRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-off-white uppercase"
        >
          <div className="overflow-hidden">
            <span className="hero-line inline-block">FROM YARN</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-line inline-block text-accent">TO GLOBAL.</span>
          </div>
        </h1>

        {/* Supporting Copy */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl text-off-white/70 max-w-xl mt-8 font-normal leading-relaxed"
        >
          Integrated textile and garment manufacturing built for global brands.
          Precision engineered from raw fiber to worldwide delivery.
        </p>

        {/* Call to Actions */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-10"
        >
          <button
            onClick={() => scrollToSection('capabilities')}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-accent text-charcoal text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:bg-pure-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Explore Our Capabilities
            <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center justify-center px-8 py-4 border border-off-white/30 text-off-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-off-white/10 hover:border-off-white focus:outline-none focus:ring-2 focus:ring-off-white"
          >
            Contact Fashion Knits
          </button>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
