'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  className = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef({ val: 0 });

  useEffect(() => {
    let tween: gsap.core.Tween | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          observer.disconnect();

          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setDisplayValue(value);
            return;
          }

          tween = gsap.to(valueRef.current, {
            val: value,
            duration: 2,
            ease: 'power3.out',
            onUpdate: () => {
              setDisplayValue(Math.floor(valueRef.current.val));
            },
          });
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      tween?.kill();
    };
  }, [value]);

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label={`${prefix}${value.toLocaleString()}${suffix} ${label}`}
      className={`flex flex-col items-center text-center ${className}`}
    >
      <div aria-hidden="true" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight tabular-nums">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <div aria-hidden="true" className="mt-2 text-sm uppercase tracking-widest text-muted-gray">
        {label}
      </div>
    </div>
  );
}
