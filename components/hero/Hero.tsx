'use client';

import React from 'react';
import { ScrollIndicator } from './ScrollIndicator';
import { ArrowRight, ShieldCheck, Factory } from 'lucide-react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-end bg-charcoal text-off-white overflow-hidden pt-32 pb-20 md:pb-28 px-6 md:px-16 lg:px-24"
    >
      {/* Background Architectural Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Subtle Luxury Textile Grid & Radial Backlight */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl">
        {/* Editorial Eyebrow */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.25em] text-accent">
            <Factory className="w-3.5 h-3.5 text-accent" />
            <span>Tirupur Manufacturing Hub // Export Division</span>
          </div>
        </div>

        {/* Confident Large Headline */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-off-white uppercase">
          <span className="block">FROM YARN</span>
          <span className="block text-accent">TO GLOBAL.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg md:text-xl text-off-white/80 max-w-2xl mt-8 font-normal leading-relaxed">
          Integrated textile and knitwear manufacturing built for international apparel brands.
          Precision engineered from fiber selection, circular knitting, and eco-friendly dyeing
          to finished garment export in Tirupur, India.
        </p>

        {/* Trust & Compliance Micro-Badges */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-xs font-mono text-off-white/60 uppercase tracking-wider">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            GOTS &amp; OCS Organic Certified
          </span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            OEKO-TEX® Standard 100 Class I
          </span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            amfori BSCI &amp; SMETA Audited
          </span>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-10">
          <button
            onClick={() => scrollToSection('capabilities')}
            className="group inline-flex items-center justify-center px-8 py-4 bg-accent text-charcoal text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:bg-pure-white focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
          >
            Explore Capabilities
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center justify-center px-8 py-4 border border-off-white/30 text-off-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-off-white/10 hover:border-off-white focus:outline-none focus:ring-2 focus:ring-off-white cursor-pointer"
          >
            Start an Inquiry
          </button>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
