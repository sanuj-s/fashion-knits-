'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Award,
  Building2,
  Factory,
  Layers,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { gsap } from '@/lib/animations';
import { updatePointerTilt, resetPointerTilt } from '@/components/ui/pointerTilt';

const FACILITIES = [
  {
    number: '01',
    label: 'Main plant · Unit 01',
    title: 'Production built around precision',
    location: 'Netaji Apparel Park, New Tiruppur',
    image: '/assets/facilities/factory_netaji_park_exterior.webp',
    alt: 'Exterior of the Netaji Apparel Park knitwear factory in Tiruppur',
    imageNote: 'Netaji Apparel Park · Unit 01',
    detail: '20,000+ sq. ft.',
    icon: Factory,
    imageSize: 'aspect-[5/4]',
    column: 'lg:col-span-7',
    offset: '',
    sizes: '(max-width: 1024px) 100vw, 58vw',
  },
  {
    number: '02',
    label: 'Corporate office · Sampling',
    title: 'Ideas take shape here',
    location: 'Angeripalayam, Tiruppur',
    image: '/assets/facilities/office_angeripalayam_exterior.webp',
    alt: 'Exterior of the Fashion Knits corporate office in Angeripalayam',
    imageNote: 'Angeripalayam · Corporate HQ',
    detail: 'Tiruppur, India',
    icon: Building2,
    imageSize: 'aspect-[4/3]',
    column: 'lg:col-span-5',
    offset: 'lg:mt-28',
    sizes: '(max-width: 1024px) 100vw, 42vw',
  },
];

const PILLARS = [
  {
    number: '01',
    title: 'Two Tiruppur units',
    detail: 'A corporate office and a dedicated production plant.',
    icon: MapPin,
  },
  {
    number: '02',
    title: 'Production, connected',
    detail: 'Knitting, CAD cutting, sewing assembly and finishing.',
    icon: Layers,
  },
  {
    number: '03',
    title: 'Certified materials',
    detail: 'GOTS and OCS chain-of-custody tracking for organic cotton.',
    icon: ShieldCheck,
  },
  {
    number: '04',
    title: 'Responsible standards',
    detail: 'amfori BSCI and SMETA social compliance audits.',
    icon: Award,
  },
];

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const reveal = (element: HTMLDivElement | null) => {
        if (!element?.children.length) return;
        gsap.fromTo(
          element.children,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 84%', once: true },
          }
        );
      };

      reveal(galleryRef.current);
      reveal(pillarsRef.current);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative overflow-hidden border-b border-charcoal/10 bg-[#f6f4ef] px-5 py-24 sm:px-8 md:py-32 lg:px-14 xl:px-20"
    >
      <div className="mx-auto max-w-[86rem]">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#907348]">
                About Fashion Knits
              </span>
            </div>
            <h2 className="max-w-4xl text-[clamp(3rem,6.2vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-charcoal">
              <span className="block">Made with care.</span>
              <span className="block text-charcoal/55">Built around knitwear.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-2">
            <p className="max-w-xl text-base leading-relaxed text-charcoal/70 md:text-lg">
              Two Tiruppur locations. One connected knitwear partner, from first swatch to finished garment.
            </p>
            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-2 border-b border-charcoal/25 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal transition-colors hover:border-accent hover:text-[#907348]"
            >
              Discover our company
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div ref={galleryRef} className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
          {FACILITIES.map((facility) => {
            const Icon = facility.icon;
            return (
              <article
                key={facility.number}
                onPointerMove={updatePointerTilt}
                onPointerLeave={resetPointerTilt}
                className={`premium-card pointer-tilt group ${facility.column} ${facility.offset}`}
              >
                <figure className={`motion-photo relative ${facility.imageSize} overflow-hidden rounded-[1.15rem] bg-[#e8e4dc]`}>
                  <Image
                    src={facility.image}
                    alt={facility.alt}
                    fill
                    sizes={facility.sizes}
                    loading="lazy"
                    className="motion-photo-image object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171612]/65 via-[#171612]/5 to-[#171612]/10" />
                  <div className="absolute inset-x-4 top-4 flex flex-wrap items-start justify-between gap-2 sm:inset-x-5 sm:top-5 sm:gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#191815]/65 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                      <Icon className="h-3.5 w-3.5 text-[#dfbd7d]" />
                      {facility.label}
                    </span>
                    <span className="rounded-full border border-charcoal/10 bg-[#f7f5f0]/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-charcoal/75 backdrop-blur-md">
                      Representative image
                    </span>
                  </div>
                  <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white sm:inset-x-6 sm:bottom-6">
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/85">
                      {facility.imageNote}
                    </span>
                    <span className="shrink-0 text-xs font-medium tracking-wide text-white">
                      {facility.detail}
                    </span>
                  </figcaption>
                </figure>

                <div className="pt-6 sm:pt-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#907348]">
                    {facility.location}
                  </p>
                  <h3 className="mt-2 text-2xl font-medium leading-tight tracking-[-0.03em] text-charcoal sm:text-[1.8rem]">
                    {facility.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between border-t border-charcoal/12 pt-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-charcoal/45">
                    <span>Fashion Knits · Tiruppur</span>
                    <span>{facility.number} / 02</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 border-t border-charcoal/15 pt-7 md:mt-16 md:pt-9">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-medium tracking-[-0.035em] text-charcoal sm:text-2xl">
              Connected from yarn to shipment.
            </h3>
            <span className="text-[9px] font-mono uppercase tracking-[0.12em] text-charcoal/45 sm:text-[10px]">
              Tiruppur, India
            </span>
          </div>

          <div ref={pillarsRef} className="flex flex-wrap gap-2.5 sm:gap-3">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="premium-card inline-flex items-center gap-2.5 rounded-full border border-charcoal/10 bg-white/60 px-4 py-3 sm:px-5"
                >
                  <Icon className="h-4 w-4 text-[#a38454]" />
                  <h4 className="text-[10px] font-semibold uppercase tracking-[0.1em] text-charcoal sm:text-[11px]">
                    {pillar.title}
                  </h4>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
