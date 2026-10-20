'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/animations';
import { ScrollIndicator } from './ScrollIndicator';
import { ArrowRight, MapPin } from 'lucide-react';
import { useReducedMotion } from '@/lib/hooks';

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const move = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: 'power3.out' });
  };
  const leave = () => {
    if (prefersReducedMotion) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1,0.4)' });
  };
  return <div ref={ref} onMouseMove={move} onMouseLeave={leave} className="inline-block">{children}</div>;
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.set('.h-line', { yPercent: 115 });
      gsap.set('.h-fade', { y: 28, opacity: 0 });
      gsap.set('.h-bg', { scale: 1.25 });
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to('.h-bg', { scale: 1.05, duration: 2.6 }, 0)
        .to('.h-line', { yPercent: 0, duration: 1.3, stagger: 0.14 }, 0.25)
        .to('.h-fade', { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, 0.7);
      gsap.to('.h-bg', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.h-content', { yPercent: -8, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: root.current, start: '15% top', end: 'bottom top', scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  const spot = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const go = (id: string) => {
    const behavior = prefersReducedMotion ? 'auto' : 'smooth';
    document.getElementById(id)?.scrollIntoView({ behavior });
  };

  return (
    <section ref={root} id="hero" onMouseMove={spot} className="grain relative flex min-h-[min(54rem,100svh)] w-full flex-col justify-between overflow-hidden bg-charcoal pt-28 text-off-white sm:pt-32">
      {/* Full-bleed photograph */}
      <picture className="absolute inset-0 z-0">
        <source type="image/webp" srcSet="/assets/images/hero_campaign.webp" />
        <img
          src="/assets/images/hero_campaign.jpg"
          alt=""
          width="1672"
          height="941"
          className="h-bg w-full h-full object-cover object-center"
          fetchPriority="high"
        />
      </picture>
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-charcoal/75 via-charcoal/45 to-charcoal/5" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/25" />
      <div className="spotlight absolute inset-0 z-[2] pointer-events-none" />

      <div className="h-content relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 my-auto pb-10">
        <div className="h-fade flex items-center gap-4 mb-8">
          <span className="h-px w-12 bg-accent" />
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-accent font-semibold">Fashion Knits // Tiruppur, India</span>
        </div>

        <h1 className="max-w-6xl font-semibold uppercase leading-[0.92] tracking-[-0.055em] text-[clamp(2.6rem,8.2vw,7.5rem)]">
          <span className="block overflow-hidden pb-[0.08em]"><span className="h-line block">Knitwear made</span></span>
          <span className="block overflow-hidden pb-[0.08em]"><span className="h-line block text-accent">for apparel brands.</span></span>
        </h1>

        <p className="h-fade text-base sm:text-xl text-off-white/75 max-w-xl mt-8 leading-relaxed">
          Fashion Knits develops and manufactures knitwear in Tiruppur, India. Share your product brief to discuss fabrics, garment construction, production and export requirements.
        </p>

        <div className="h-fade flex flex-col sm:flex-row gap-4 mt-10">
          <Magnetic>
            <a href="#products" onClick={(event) => { event.preventDefault(); go('products'); }} className="btn-shine group inline-flex items-center px-9 py-4 bg-accent text-charcoal text-xs uppercase tracking-[0.2em] font-semibold cursor-pointer">
              Explore Products <ArrowRight className="w-4 h-4 ml-3 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <Link href="/get-a-quote" className="inline-flex items-center px-9 py-4 border border-off-white/30 backdrop-blur-sm text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 hover:bg-off-white hover:text-charcoal cursor-pointer">
              Request a Quote
            </Link>
          </Magnetic>
        </div>

        <div className="h-fade hidden md:inline-flex items-center gap-2 mt-12 px-4 py-2 border border-white/15 bg-black/30 backdrop-blur-md text-[11px] font-mono uppercase tracking-wider text-off-white/80">
          <MapPin className="w-3.5 h-3.5 text-accent" /> NAP Unit-1 &amp; Angeripalayam HQ
        </div>
      </div>

      <p className="absolute bottom-[5.75rem] right-6 z-10 rounded-full border border-white/20 bg-black/35 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur sm:bottom-[5.8rem] sm:right-8">
        Illustrative apparel image
      </p>

      <div className="relative z-10 border-t border-white/10 bg-charcoal/75 px-6 py-4 backdrop-blur-md sm:px-8 sm:py-5">
        <ul className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-x-6 gap-y-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-off-white/65 sm:text-[10px] sm:tracking-[0.2em]">
          <li>Tiruppur, India</li>
          <li>Knitwear manufacturing</li>
          <li>Custom product programs</li>
          <li>International buyer enquiries</li>
        </ul>
      </div>
      <ScrollIndicator />
    </section>
  );
}
