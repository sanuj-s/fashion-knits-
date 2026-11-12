'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowRight, Factory, Sparkles, SlidersHorizontal } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { useReducedMotion } from '@/lib/hooks';

/* ── Verified Figure Data ───────────────────────────────────── */
const FIGURES = [
  {
    numericValue: 2000,
    prefix: '~',
    display: '~2,000',
    label: 'Machine capacity',
    note: 'machines · 2026 figure',
  },
  {
    numericValue: 350000,
    prefix: '~',
    display: '~350,000',
    label: 'Production capacity',
    note: 'pieces per month · 2026 figure',
  },
  {
    numericValue: null,
    prefix: '',
    display: '5 + 5',
    label: 'Decoration equipment',
    note: 'automatic printing + embroidery machines · 2026 figure',
  },
];

export function ManufacturingHero() {
  const heroRef = useRef<HTMLElement>(null);
  const photoCardRef = useRef<HTMLDivElement>(null);
  const photoInnerRef = useRef<HTMLDivElement>(null);
  const photoLightRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLParagraphElement>(null);
  const stat2Ref = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  /* ── Master Coordinated Entrance + Scroll Animations ──────── */
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      /* ── 1. Page Load Coordinated Entrance Timeline ── */
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
      });

      // Ambient backdrop atmosphere
      tl.fromTo(
        '.mfg-ambient-glow',
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' },
        0
      );

      // Breadcrumb navigation
      tl.fromTo(
        '.mfg-hero-breadcrumb',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.75 },
        0.12
      );

      // Category eyebrow
      tl.fromTo(
        '.mfg-hero-eyebrow',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.75 },
        0.22
      );

      // Gold line scale-out
      tl.fromTo(
        '.mfg-gold-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.85, ease: 'power3.inOut' },
        0.32
      );

      // Headline line-by-line masked text reveal
      tl.fromTo(
        '.mfg-h1-line',
        { yPercent: 115 },
        { yPercent: 0, duration: 1.25, stagger: 0.12, ease: 'power4.out' },
        0.35
      );

      // Supporting paragraph
      tl.fromTo(
        '.mfg-hero-para',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.85 },
        0.65
      );

      // CTA primary & secondary buttons with subtle stagger
      tl.fromTo(
        '.mfg-btn-primary',
        { opacity: 0, y: 18, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'back.out(1.2)' },
        0.8
      );
      tl.fromTo(
        '.mfg-btn-secondary',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.75 },
        0.9
      );

      // Technical metadata badges
      tl.fromTo(
        '.mfg-meta-badge',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 },
        1.0
      );

      // Image card reveal with smooth clip-path mask
      tl.fromTo(
        '.mfg-photo-stage',
        {
          opacity: 0,
          clipPath: 'inset(8% 8% 8% 8% round 1.25rem)',
          borderColor: 'rgba(201, 169, 110, 0.65)',
        },
        {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0% round 1.25rem)',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          duration: 1.35,
          ease: 'power3.inOut',
        },
        0.5
      );

      // Inner image reveal
      tl.fromTo(
        '.mfg-inner-image',
        { scale: 1.15, opacity: 0 },
        { scale: 1.04, opacity: 1, duration: 1.5, ease: 'power2.out' },
        0.6
      );

      // Card top badge & markers
      tl.fromTo(
        '.mfg-card-top-marker',
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 },
        1.05
      );

      // Process-spec panel at the bottom of the card
      tl.fromTo(
        '.mfg-process-spec',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        1.1
      );

      // Divider inside process spec panel
      tl.fromTo(
        '.mfg-spec-divider',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: 'power3.inOut' },
        1.25
      );

      /* ── 2. Statistics Panel Entrance + Single Count-Up on Scroll ── */
      const statTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.mfg-stats-panel',
          start: 'top 92%',
          once: true,
        },
      });

      statTimeline.fromTo(
        '.mfg-stats-panel',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );

      statTimeline.fromTo(
        '.mfg-stat-divider',
        { scaleY: 0 },
        { scaleY: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
        '-=0.5'
      );

      statTimeline.fromTo(
        '.mfg-stat-item',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      );

      // Single count-up on numerical values
      const counterObj1 = { val: 0 };
      statTimeline.to(
        counterObj1,
        {
          val: 2000,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            if (stat1Ref.current) {
              stat1Ref.current.textContent = `~${Math.round(counterObj1.val).toLocaleString()}`;
            }
          },
        },
        '-=0.6'
      );

      const counterObj2 = { val: 0 };
      statTimeline.to(
        counterObj2,
        {
          val: 350000,
          duration: 2.0,
          ease: 'power2.out',
          onUpdate: () => {
            if (stat2Ref.current) {
              stat2Ref.current.textContent = `~${Math.round(counterObj2.val).toLocaleString()}`;
            }
          },
        },
        '-=1.6'
      );

      /* ── 3. Subtle Parallax Scrub on Scroll ── */
      // Inner image shifts subtly slower than the page scroll (depth effect)
      gsap.to('.mfg-inner-image', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Content gently drifts up
      gsap.to('.mfg-copy-col', {
        yPercent: -5,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: '30% top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ── Interactive Pointer Depth on Image Crop & Light (Desktop Only) ── */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const card = photoCardRef.current;
    const inner = photoInnerRef.current;
    const light = photoLightRef.current;
    if (!card || !inner) return;

    let frame = 0;
    const handlePointerMove = (e: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;

        // Shift inner image crop subtly inside stationary card
        gsap.to(inner, {
          x: normX * 16,
          y: normY * 12,
          duration: 0.7,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        // Shift warm amber lighting gradient
        if (light) {
          gsap.to(light, {
            x: normX * 24,
            y: normY * 20,
            opacity: 0.65 + normY * 0.15,
            duration: 0.7,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }

        frame = 0;
      });
    };

    const handlePointerLeave = () => {
      // Gentle spring reset
      gsap.to(inner, {
        x: 0,
        y: 0,
        scale: 1.04,
        duration: 1.1,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      if (light) {
        gsap.to(light, {
          x: 0,
          y: 0,
          opacity: 0.45,
          duration: 1.1,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    card.addEventListener('pointermove', handlePointerMove, { passive: true });
    card.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    return () => {
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="mfg-hero-root grain relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-charcoal text-off-white"
    >
      {/* ── Ambient Background Layers ────────────────────────── */}
      {/* 1. Diffused warm golden ambient tone */}
      <div
        className="mfg-ambient-glow pointer-events-none absolute -right-[10%] top-[8%] h-[75vw] w-[75vw] max-h-[850px] max-w-[850px] rounded-full blur-[140px]"
        style={{
          background:
            'radial-gradient(circle, rgba(201,169,110,0.18) 0%, rgba(144,115,72,0.08) 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />
      {/* 2. Secondary cool charcoal depth */}
      <div
        className="pointer-events-none absolute -left-[15%] bottom-[15%] h-[50vw] w-[50vw] max-h-[600px] max-w-[600px] rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* 3. Subtle shifting light beam */}
      <div className="mfg-light-sweep pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

      {/* ── Main Hero Stage (Responsive Grid) ─────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-1 flex-col justify-center px-5 pt-24 sm:px-8 sm:pt-28 lg:px-16 lg:pt-28 xl:px-24">
        <div className="grid items-center gap-8 py-4 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* ── Left Column: Editorial Content ── */}
          <div className="mfg-copy-col flex flex-col justify-center lg:col-span-7 xl:col-span-7">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mfg-hero-breadcrumb mb-4 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.22em] text-accent sm:text-xs"
            >
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span aria-hidden="true" className="text-white/35">
                /
              </span>
              <span aria-current="page" className="text-white/80">
                Manufacturing
              </span>
            </nav>

            {/* Eyebrow + Gold Accent Line */}
            <div className="mfg-hero-eyebrow mb-4 flex items-center gap-3">
              <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent sm:text-[11px]">
                <Factory aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
                Manufacturing · Tiruppur, India
              </span>
              <span
                className="mfg-gold-line hidden h-px w-14 origin-left bg-accent sm:inline-block"
                aria-hidden="true"
              />
            </div>

            {/* Headline — Two independent masked lines */}
            <h1 className="max-w-4xl text-[clamp(2.4rem,5vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="mfg-h1-line block">From CAD Patterns</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="mfg-h1-line block text-accent">
                  to Finished Garments.
                </span>
              </span>
            </h1>

            {/* Mobile / Tablet inline visual on small screens */}
            <div className="my-5 block lg:hidden">
              <div className="mfg-mobile-card relative mx-auto aspect-[16/11] max-h-[290px] w-full max-w-[480px] overflow-hidden rounded-xl border border-white/15 bg-[#171614] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <div className="mfg-mobile-drift absolute inset-[-3%]">
                  <Image
                    src="/images/manufacturing/manufacturing-needle.webp"
                    alt="Industrial precision sewing machine stitching gold knit fabric at Fashion Knits manufacturing facility"
                    fill
                    sizes="(max-width: 640px) 92vw, 480px"
                    priority
                    className="object-cover object-[50%_36%]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.15em] text-white/80 sm:text-[9px]">
                  <span className="rounded bg-black/60 px-2 py-0.5 backdrop-blur-md">
                    ISO 4915 · 301 Lockstitch
                  </span>
                  <span className="rounded bg-accent/20 px-2 py-0.5 text-accent backdrop-blur-md">
                    Precision Seam
                  </span>
                </div>
              </div>
            </div>

            {/* Supporting paragraph */}
            <p className="mfg-hero-para mt-3 max-w-2xl text-xs leading-6 text-white/75 sm:text-sm sm:leading-7 lg:text-base lg:leading-8">
              Fashion Knits combines in-house CAD for cutting and pattern making, print and embroidery facilities, product-focused production lines and garment finishing across its Tiruppur locations.
            </p>

            {/* CTA Buttons: Primary & Secondary */}
            <div className="mfg-hero-cta mt-6 flex flex-wrap items-center gap-3.5 sm:mt-7">
              <Link
                href="/#contact"
                className="mfg-btn-primary btn-shine group relative inline-flex min-h-11 items-center gap-3 rounded-full bg-accent px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-charcoal transition-all duration-300 hover:bg-[#e2c78f] hover:shadow-[0_8px_30px_rgba(201,169,110,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
              >
                Discuss a production brief
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>

              <Link
                href="/quality"
                className="mfg-btn-secondary inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-off-white transition-all duration-300 hover:border-accent/80 hover:bg-white/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
              >
                Quality Standards
              </Link>
            </div>

            {/* Technical Metadata Badges */}
            <div className="mt-6 hidden flex-wrap items-center gap-3 border-t border-white/10 pt-4 sm:flex">
              <span className="mfg-meta-badge inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
                <Sparkles className="h-3 w-3" />
                Lectra &amp; Bullmer Automated Cutting
              </span>
              <span className="text-white/25">·</span>
              <span className="mfg-meta-badge inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
                10 Decoration Lines
              </span>
              <span className="text-white/25">·</span>
              <span className="mfg-meta-badge inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
                Tiruppur Hub
              </span>
            </div>
          </div>

          {/* ── Right Column: Featured Photographic Showcase (Desktop) ── */}
          <div className="relative hidden lg:col-span-5 lg:flex lg:justify-end xl:col-span-5">
            <div
              ref={photoCardRef}
              className="mfg-photo-stage group pointer-events-auto relative aspect-[3/4] max-h-[min(54vh,500px)] w-full max-w-[420px] overflow-hidden rounded-[1.25rem] border border-white/15 bg-[#171614] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/5 will-change-transform xl:max-w-[450px]"
            >
              {/* Inner Image Container with Continuous Drift + Interactive Pointer Shift */}
              <div
                ref={photoInnerRef}
                className="mfg-inner-image absolute inset-[-4%] will-change-transform transition-transform duration-500 ease-out group-hover:scale-105"
              >
                <div className="mfg-drift-frame absolute inset-0">
                  <Image
                    src="/images/manufacturing/manufacturing-needle.webp"
                    alt="Industrial precision sewing machine stitching gold knit fabric at Fashion Knits manufacturing facility"
                    fill
                    sizes="(max-width: 1280px) 40vw, 450px"
                    priority
                    quality={90}
                    className="object-cover object-[50%_36%]"
                  />
                </div>
              </div>

              {/* Cinematic Vignette Layers */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-charcoal/25"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-charcoal/40 via-transparent to-charcoal/20"
                aria-hidden="true"
              />

              {/* Shifting Warm Amber Highlights Overlay */}
              <div
                ref={photoLightRef}
                className="mfg-card-light pointer-events-none absolute inset-[-20%] mix-blend-overlay will-change-transform"
                style={{
                  background:
                    'radial-gradient(circle at 55% 42%, rgba(201,169,110,0.42) 0%, rgba(201,169,110,0.12) 40%, transparent 65%)',
                }}
                aria-hidden="true"
              />

              {/* Top Technical Markers */}
              <div className="mfg-card-top-marker absolute left-4 top-4 z-10 flex items-center gap-2">
                <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                  In-House Assembly
                </span>
              </div>

              <div className="mfg-card-top-marker absolute right-4 top-4 z-10 font-mono text-[9px] text-accent/70">
                + + +
              </div>

              {/* Bottom Process-Spec Panel with Refined Reveal & Hover State */}
              <div className="mfg-process-spec absolute bottom-0 inset-x-0 z-10 border-t border-white/10 bg-[#141312]/85 p-3.5 backdrop-blur-md transition-colors duration-300 hover:bg-[#1a1918]/95">
                <span className="mfg-spec-divider absolute top-0 inset-x-0 h-px origin-left bg-gradient-to-r from-accent/60 via-accent/20 to-transparent" aria-hidden="true" />
                <div className="flex items-center justify-between text-white/85">
                  <div className="flex items-center gap-2.5">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-accent">
                        Process Spec
                      </p>
                      <p className="mt-0.5 text-xs font-medium tracking-tight text-white/90">
                        Automatic Stitch Precision
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
                      Standard
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] font-semibold text-accent">
                      ISO 4915 · 301
                    </p>
                  </div>
                </div>
              </div>

              {/* Corner Crosshairs */}
              <span className="pointer-events-none absolute -bottom-1 -left-1 font-mono text-xs text-accent/60" aria-hidden="true">
                ⌞
              </span>
              <span className="pointer-events-none absolute -top-1 -right-1 font-mono text-xs text-accent/60" aria-hidden="true">
                ⌝
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Statistics Strip (Scroll Reveal + Single Count-Up) ── */}
      <div className="mfg-stats-panel relative z-10 mt-auto border-t border-white/10 bg-[#121110]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-[90rem] px-5 py-5 sm:px-8 sm:py-6 lg:px-16 xl:px-24">
          <div className="grid gap-5 sm:grid-cols-3 sm:gap-0">
            {/* Stat 1: Machine Capacity */}
            <div className="flex items-stretch">
              <article className="mfg-stat-item flex-1 py-1 transition-colors duration-200 hover:bg-white/[0.03] sm:px-4">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-accent sm:text-[10px]">
                  {FIGURES[0].label}
                </p>
                <p
                  ref={stat1Ref}
                  className="mt-1.5 text-2xl font-semibold leading-none tracking-[-0.06em] text-white sm:text-3xl lg:text-4xl tabular-nums"
                >
                  {FIGURES[0].display}
                </p>
                <p className="mt-1.5 text-[11px] text-white/60 sm:text-xs">
                  {FIGURES[0].note}
                </p>
              </article>
              <div
                className="mfg-stat-divider hidden h-auto w-px origin-top bg-white/15 sm:block"
                aria-hidden="true"
              />
            </div>

            {/* Stat 2: Production Capacity */}
            <div className="flex items-stretch">
              <article className="mfg-stat-item flex-1 py-1 transition-colors duration-200 hover:bg-white/[0.03] sm:px-4">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-accent sm:text-[10px]">
                  {FIGURES[1].label}
                </p>
                <p
                  ref={stat2Ref}
                  className="mt-1.5 text-2xl font-semibold leading-none tracking-[-0.06em] text-white sm:text-3xl lg:text-4xl tabular-nums"
                >
                  {FIGURES[1].display}
                </p>
                <p className="mt-1.5 text-[11px] text-white/60 sm:text-xs">
                  {FIGURES[1].note}
                </p>
              </article>
              <div
                className="mfg-stat-divider hidden h-auto w-px origin-top bg-white/15 sm:block"
                aria-hidden="true"
              />
            </div>

            {/* Stat 3: Decoration Equipment */}
            <div className="flex items-stretch">
              <article className="mfg-stat-item flex-1 py-1 transition-colors duration-200 hover:bg-white/[0.03] sm:px-4">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-accent sm:text-[10px]">
                  {FIGURES[2].label}
                </p>
                <p className="mt-1.5 text-2xl font-semibold leading-none tracking-[-0.06em] text-white sm:text-3xl lg:text-4xl tabular-nums">
                  {FIGURES[2].display}
                </p>
                <p className="mt-1.5 text-[11px] text-white/60 sm:text-xs">
                  {FIGURES[2].note}
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
