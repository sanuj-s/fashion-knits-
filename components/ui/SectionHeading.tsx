'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeInUp } from '@/lib/animations';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = titleRefs.current.filter(Boolean) as HTMLElement[];
    
    if (elements.length > 0) {
      // Use the imported fadeInUp animation function
      fadeInUp(elements, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        stagger: 0.1,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const lines = title.split(/\\n|\n/);
  const alignmentClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  const titleColor = light ? 'text-off-white' : 'text-charcoal';
  const subtitleColor = light ? 'text-off-white/70' : 'text-muted-gray';

  return (
    <div ref={containerRef} className={`flex flex-col ${alignmentClass} ${className}`}>
      <div className="flex flex-col">
        {lines.map((line, i) => (
          <h2
            key={i}
            ref={(el) => {
              titleRefs.current[i] = el;
            }}
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-none ${titleColor}`}
          >
            {line}
          </h2>
        ))}
      </div>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl mt-6 ${subtitleColor} text-balance`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
