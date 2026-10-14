'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, align = 'left', light = false, className = '' }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const st = { trigger: ref.current, start: 'top 85%', once: true };
      gsap.from('.sh-line', { yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: 0.12, scrollTrigger: st });
      gsap.from('.sh-sub', { y: 24, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out', scrollTrigger: st });
    }, ref);
    return () => ctx.revert();
  }, []);

  const lines = title.split(/\\n|\n/);
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div ref={ref} className={`flex flex-col ${alignment} ${className}`}>
      <div className="flex flex-col">
        {lines.map((line, i) => (
          <div key={i} className="overflow-hidden pb-[0.1em] -mb-[0.1em]">
            <h2 className={`sh-line max-w-[22ch] text-balance text-[clamp(2.35rem,5.3vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.05em] ${light ? 'text-off-white' : 'text-charcoal'}`}>{line}</h2>
          </div>
        ))}
      </div>
      {subtitle && <p className={`sh-sub mt-5 max-w-[42rem] text-[15px] leading-relaxed text-balance sm:text-base md:mt-6 md:text-lg ${light ? 'text-off-white/70' : 'text-muted-gray'}`}>{subtitle}</p>}
    </div>
  );
}
