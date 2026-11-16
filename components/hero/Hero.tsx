'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/animations';
import { ScrollIndicator } from './ScrollIndicator';
import { ArrowRight, MapPin } from 'lucide-react';
import { useReducedMotion } from '@/lib/hooks';
import styles from './Hero.module.css';

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
  return <div ref={ref} onMouseMove={move} onMouseLeave={leave} className="w-full sm:w-auto">{children}</div>;
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const heroVideo = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const updatePlaybackPreference = () => {
      setIsVideoEnabled(!reducedMotionQuery.matches && !mobileQuery.matches);
    };

    updatePlaybackPreference();
    reducedMotionQuery.addEventListener('change', updatePlaybackPreference);
    mobileQuery.addEventListener('change', updatePlaybackPreference);
    return () => {
      reducedMotionQuery.removeEventListener('change', updatePlaybackPreference);
      mobileQuery.removeEventListener('change', updatePlaybackPreference);
    };
  }, []);

  useEffect(() => {
    const section = root.current;
    if (!section || !isVideoEnabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [isVideoEnabled]);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(document.visibilityState === 'visible');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    const video = heroVideo.current;
    if (!video) return;

    if (!isVideoEnabled || !isHeroVisible || !isDocumentVisible) {
      video.pause();
      if (!isVideoEnabled && video.currentTime > 0) {
        video.currentTime = 0;
        video.load();
      }
      return;
    }

    void video.play().catch(() => undefined);
  }, [isHeroVisible, isDocumentVisible, isVideoEnabled]);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const revealItems = '.h-eyebrow, .h-line, .h-body, .h-actions, .h-location';
      gsap.set(revealItems, { y: 16, opacity: 0 });
      gsap.timeline({ defaults: { ease: 'power2.out' } })
        .to(revealItems, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, 0.15);
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
    <section ref={root} id="hero" onMouseMove={spot} style={{ '--hero-dim': 0.78 } as React.CSSProperties} className="grain relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-charcoal pt-28 text-off-white sm:pt-32">
      {/* The muted factory footage plays as a decorative background. */}
      <div className="h-bg absolute inset-0 z-0 overflow-hidden">
        <video
          ref={heroVideo}
          aria-hidden="true"
          tabIndex={-1}
          autoPlay={isVideoEnabled}
          muted
          loop
          playsInline
          preload={isVideoEnabled ? 'metadata' : 'none'}
          poster="/images/hero/hero-knitting-machines-poster.png"
          className={`${styles.videoGrade} absolute inset-0 h-full w-full object-cover object-center`}
        >
          <source src="/videos/knitting-machines-producing-fabric.mp4" type="video/mp4" />
        </video>
      </div>
      <div aria-hidden="true" className={`${styles.heroOverlay} pointer-events-none absolute inset-0 z-[1]`} />
      <div aria-hidden="true" className={`${styles.heroTopFade} pointer-events-none absolute inset-x-0 top-0 z-[1] h-[180px]`} />
      <div aria-hidden="true" className={`${styles.heroBottomFade} pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36`} />
      <div className="spotlight absolute inset-0 z-[2] pointer-events-none" />

      <div className="h-content relative z-10 my-auto w-full max-w-[90rem] mx-auto px-5 pb-10 sm:px-8 lg:px-16 xl:px-24">
        <div className="h-eyebrow mb-6 flex items-center gap-4">
          <span className="h-px w-12 bg-accent" />
          <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-accent text-shadow-[0_1px_12px_rgba(0,0,0,0.65)] sm:text-xs">Fashion Knits // Tiruppur, India</span>
        </div>

        <h1
          aria-label="Knitwear that moves your brand forward."
          style={{ wordSpacing: '0.1em' }}
          className={`${styles.heroText} max-w-7xl text-balance font-semibold uppercase leading-[0.96] tracking-[-0.02em] text-[clamp(2rem,8.5vw,2.5rem)] lg:text-[clamp(3rem,5.5vw,6rem)]`}
        >
          <span aria-hidden="true" className="hidden lg:block">
            <span className="block overflow-hidden pb-[0.08em]"><span className="h-line block">Knitwear that moves</span></span>
            <span className="block overflow-hidden pb-[0.08em]"><span className="h-line block text-accent">your brand forward.</span></span>
          </span>
          <span aria-hidden="true" className="block lg:hidden">
            <span className="block overflow-hidden pb-[0.08em]"><span className="h-line block">Knitwear that</span></span>
            <span className="block overflow-hidden pb-[0.08em]"><span className="h-line block">moves your brand</span></span>
            <span className="block overflow-hidden pb-[0.08em]"><span className="h-line block text-accent">forward.</span></span>
          </span>
        </h1>

        <p className={`${styles.heroText} h-body mt-6 max-w-[60ch] text-pretty text-[clamp(1rem,1.3vw,1.25rem)] font-normal leading-[1.6] text-white/[0.88]`}>
          From first swatch to finished garment, our Tiruppur team helps apparel brands shape a knitwear range around their brief, standards and production needs.
        </p>

        <div className="h-actions mt-8 flex flex-col gap-4 sm:flex-row">
          <Magnetic>
            <a href="#products" onClick={(event) => { event.preventDefault(); go('products'); }} className="home-hero-primary btn-shine group inline-flex h-14 w-full items-center justify-center gap-3 border border-accent bg-accent px-8 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal transition-colors duration-300 hover:bg-[#d8b87a] focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 sm:w-auto">
              Explore Products <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic>
            <Link href="/get-a-quote" className="inline-flex h-14 w-full items-center justify-center gap-3 border border-white/45 bg-black/20 px-8 text-xs font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 sm:w-auto">
              Request a Quote
            </Link>
          </Magnetic>
        </div>

        <div className="h-location mt-8 hidden self-start items-center gap-2 border border-white/15 bg-black/30 px-4 py-2 text-[11px] font-mono uppercase tracking-wider text-white/90 backdrop-blur-md md:inline-flex">
          <MapPin className="w-3.5 h-3.5 text-accent" /> NAP Unit-1 &amp; Angeripalayam HQ
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-charcoal/85 px-5 py-4 backdrop-blur-md sm:px-8 lg:px-16 xl:px-24">
        <ul className="mx-auto grid max-w-[90rem] grid-cols-2 items-center text-[8px] font-semibold uppercase tracking-[0.12em] text-white/75 sm:text-[9px] sm:tracking-[0.15em] md:grid-cols-4">
          <li className="px-2 py-1 text-center sm:px-3 md:py-0">Tiruppur, India</li>
          <li className="border-l border-white/15 px-2 py-1 text-center sm:px-3 md:py-0">Knitwear manufacturing</li>
          <li className="border-t border-white/10 px-2 py-1 text-center sm:px-3 md:border-l md:border-t-0 md:border-white/15 md:py-0">Custom product programs</li>
          <li className="border-l border-t border-white/10 px-2 py-1 text-center sm:px-3 md:border-t-0 md:border-white/15 md:py-0">International buyer enquiries</li>
        </ul>
      </div>
      <ScrollIndicator />
    </section>
  );
}
