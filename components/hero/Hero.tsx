'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getImageProps } from 'next/image';
import { gsap } from '@/lib/animations';
import { ScrollIndicator } from './ScrollIndicator';
import { ArrowRight, MapPin } from 'lucide-react';
import { useReducedMotion } from '@/lib/hooks';

type HeroSlide = {
  src: string;
  width: number;
  height: number;
  desktopPosition: string;
  mobilePosition: string;
  label: string;
};

const HERO_IMAGES: HeroSlide[] = [
  {
    src: '/images/hero/hero-yarn-machinery.jpg',
    width: 729,
    height: 936,
    desktopPosition: '100% 50%',
    mobilePosition: '42% 50%',
    label: 'Yarn machinery',
  },
  {
    src: '/images/hero/hero-garment-fitting.jpg',
    width: 735,
    height: 963,
    desktopPosition: '100% 50%',
    mobilePosition: '22% 50%',
    label: 'Garment fitting',
  },
  {
    src: '/images/hero/hero-sewing-production.jpg',
    width: 736,
    height: 1104,
    desktopPosition: '100% 50%',
    mobilePosition: '68% 48%',
    label: 'Sewing production',
  },
];

const HERO_IMAGE_INTERVAL = 5000;

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
  const [activeImage, setActiveImage] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const visibleImageIndex = activeImage % HERO_IMAGES.length;

  useEffect(() => {
    const section = root.current;
    if (!section || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(document.visibilityState === 'visible');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !isHeroVisible || !isDocumentVisible) return;

    const timeout = window.setTimeout(() => {
      setActiveImage((current) => (current + 1) % HERO_IMAGES.length);
    }, HERO_IMAGE_INTERVAL);

    return () => window.clearTimeout(timeout);
  }, [activeImage, isHeroVisible, isDocumentVisible, prefersReducedMotion]);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.set('.h-line', { yPercent: 115 });
      gsap.set('.h-fade', { y: 28, opacity: 0 });
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to('.h-line', { yPercent: 0, duration: 1.3, stagger: 0.14 }, 0.25)
        .to('.h-fade', { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, 0.7);
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
    <section ref={root} id="hero" onMouseMove={spot} className="grain relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-charcoal pt-28 text-off-white sm:pt-32">
      {/* Full-bleed image sequence; decorative images crossfade behind the hero copy. */}
      <div className="h-bg absolute inset-0 z-0">
        {HERO_IMAGES.map((image, index) => {
          const { props: slideImage } = getImageProps({
            src: image.src,
            width: image.width,
            height: image.height,
            alt: '',
            sizes: '100vw',
            quality: 75,
            loading: 'eager',
            fetchPriority: index === 0 ? 'high' : 'low',
          });

          return (
            <picture
              key={image.src}
              className={`hero-slide-picture absolute inset-0 block h-full w-full transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
                index === visibleImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                {...slideImage}
                alt=""
                draggable={false}
                style={{
                  '--hero-position-desktop': image.desktopPosition,
                  '--hero-position-mobile': image.mobilePosition,
                } as React.CSSProperties}
                className="hero-slide-image absolute inset-0 h-full w-full"
              />
            </picture>
          );
        })}
      </div>
      <div aria-label="Hero background photos" role="group" className="absolute bottom-24 right-6 z-20 flex items-center gap-1.5 sm:right-8 lg:right-16">
        <span className="mr-2 hidden text-[9px] font-semibold uppercase tracking-[0.14em] text-white/65 sm:inline">
          {HERO_IMAGES[visibleImageIndex].label}
        </span>
        {HERO_IMAGES.map((image, index) => (
          <button
            key={image.label}
            type="button"
            aria-label={`Show hero photo ${index + 1}: ${image.label}`}
            aria-pressed={index === visibleImageIndex}
            onClick={() => setActiveImage(index)}
            className="group inline-flex h-10 w-8 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className={`h-[2px] rounded-full bg-white transition-[width,background-color] duration-300 motion-reduce:transition-none ${index === visibleImageIndex ? 'w-6 !bg-accent' : 'w-3 group-hover:w-5'}`} />
          </button>
        ))}
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-charcoal/75 via-charcoal/45 to-charcoal/5" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/25" />
      <div className="spotlight absolute inset-0 z-[2] pointer-events-none" />

      <div className="h-content relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-16 lg:px-24 my-auto pb-10">
        <div className="h-fade flex items-center gap-4 mb-8">
          <span className="h-px w-12 bg-accent" />
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-accent font-semibold">Fashion Knits // Tiruppur, India</span>
        </div>

        <h1 className="max-w-7xl text-balance font-semibold uppercase leading-[0.94] tracking-[-0.055em] text-[clamp(2.75rem,6vw,5.9rem)]">
          <span className="block overflow-hidden pb-[0.08em]"><span className="h-line block">Knitwear that moves</span></span>
          <span className="block overflow-hidden pb-[0.08em]"><span className="h-line block text-accent">your brand forward.</span></span>
        </h1>

        <p className="h-fade text-base sm:text-xl text-off-white/75 max-w-2xl mt-6 sm:mt-7 leading-relaxed">
          From first swatch to finished garment, our Tiruppur team helps apparel brands shape a knitwear range around their brief, standards and production needs.
        </p>

        <div className="h-fade flex flex-col sm:flex-row gap-4 mt-8 sm:mt-9">
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
