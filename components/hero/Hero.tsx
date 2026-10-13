'use client';

import React from 'react';
import { ScrollIndicator } from './ScrollIndicator';
import { ArrowRight, ShieldCheck, Layers, Award, MapPin } from 'lucide-react';

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
      className="relative w-full min-h-screen flex flex-col justify-between bg-charcoal text-off-white overflow-hidden pt-32 sm:pt-36 pb-12 sm:pb-16 px-6 md:px-16 lg:px-24"
    >
      {/* Subtle Luxury Atmospheric Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-[#141312]" />
        {/* Soft, warm ambient vignette */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px]" />
      </div>

      {/* Main Two-Column Editorial Hero Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          
          {/* Left Column: Typography & CTAs (5 Cols on Large, 6 on XL) */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-center">
            {/* Minimalist Editorial Eyebrow */}
            <div className="mb-5 sm:mb-6">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold block">
                Fashion Knits // Tiruppur, India
              </span>
            </div>

            {/* Core Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold tracking-tight uppercase leading-[1.08] sm:leading-[1.02]">
              <span className="block text-off-white">MADE FOR BRANDS.</span>
              <span className="block text-accent mt-1">BUILT FOR THE WORLD.</span>
            </h1>

            {/* Concise Supporting Copy */}
            <p className="text-base sm:text-lg text-off-white/80 max-w-lg mt-6 leading-relaxed font-normal">
              Precision knitwear development and manufacturing for international apparel brands.
            </p>

            {/* Refined Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8 sm:mt-10">
              <button
                onClick={() => scrollToSection('products')}
                className="group inline-flex items-center justify-center px-8 py-4 bg-accent text-charcoal text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:bg-pure-white focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              >
                EXPLORE PRODUCTS
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection('manufacturing')}
                className="inline-flex items-center justify-center px-8 py-4 border border-off-white/30 text-off-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-off-white/10 hover:border-off-white focus:outline-none focus:ring-2 focus:ring-off-white cursor-pointer"
              >
                OUR MANUFACTURING
              </button>
            </div>
          </div>

          {/* Right Column: High-End Luxury Knitwear Campaign Photograph */}
          <div className="lg:col-span-7 xl:col-span-6">
            <div className="relative group overflow-hidden border border-white/10 bg-[#161413] shadow-2xl">
              {/* Responsive Luxury Campaign Image (Desktop 16:9 / Mobile 3:4) */}
              <picture className="block w-full">
                <source
                  media="(max-width: 640px)"
                  srcSet="/assets/images/hero_luxury_knitwear_mobile.jpg"
                />
                <img
                  src="/assets/images/hero_luxury_knitwear.jpg"
                  alt="Fashion Knits Luxury Editorial Campaign: Handcrafted Honeycomb Pique Polo, Organic Cotton T-Shirt, and French Terry Sweatshirt"
                  className="w-full h-auto max-h-[560px] object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>

              {/* Subtle Luxury Gradient Vignette along bottom for caption readability */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent pointer-events-none" />

              {/* Restrained Editorial Caption Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-off-white/80 bg-black/60 backdrop-blur-md px-3 sm:px-4 py-2 border border-white/10">
                <span className="truncate">
                  Editorial Campaign // Pique Polo · Organic Tee · French Terry
                </span>
                <span className="text-accent ml-2 flex-shrink-0 font-semibold">
                  Unit-1 NAP
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Restrained Verified Trust Strip Below Hero */}
      <div className="relative z-10 max-w-7xl w-full mx-auto mt-6 pt-6 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-off-white/70 uppercase">
          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <div className="inline-flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>GOTS &amp; OCS Organic Certified</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-accent" />
              <span>OEKO-TEX® Standard 100 Class I</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-accent" />
              <span>amfori BSCI #9322 Audited</span>
            </div>
          </div>

          <div className="hidden md:inline-flex items-center gap-2 text-muted-gray">
            <MapPin className="w-3.5 h-3.5 text-accent/80" />
            <span>NAP Unit-1 &amp; Angeripalayam HQ · Tiruppur</span>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
