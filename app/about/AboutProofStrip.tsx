'use client';

import { useEffect, useRef, useState } from 'react';
import type { AboutFact } from './about-data';
import { AboutDrawLine, AboutReveal, AboutSectionSeam } from './AboutMotion';
import styles from './about.module.css';

function CountUpValue({ value }: { value: string }) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const element = valueRef.current;
    const target = Number(value);
    if (!element || !Number.isFinite(target) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let startedAt: number | undefined;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      const tick = (timestamp: number) => {
        if (startedAt === undefined) startedAt = timestamp;
        const progress = Math.min((timestamp - startedAt) / 900, 1);
        const eased = 1 - (1 - progress) ** 3;
        const current = Math.round(target * eased);
        setDisplayValue(String(current).padStart(value.length, '0'));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      setDisplayValue('0'.padStart(value.length, '0'));
      frame = window.requestAnimationFrame(tick);
    }, { threshold: 0.4 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span
      ref={valueRef}
      aria-label={value}
      aria-live="off"
      className={styles.proofCount}
      style={{ minWidth: `${Math.max(value.length, 2)}ch` }}
    >
      {displayValue}
    </span>
  );
}

export function AboutProofStrip({ facts }: { facts: AboutFact[] }) {
  return (
    <section id="proof-strip" aria-label="Fashion Knits at a glance" className="relative border-b border-charcoal/10 bg-[#f0ede7] px-5 sm:px-8 lg:px-16">
      <AboutSectionSeam />
      <div className={`${styles.proofGrid} mx-auto max-w-[90rem]`}>
        {facts.map(({ value, label, sub, verified }, index) => (
          <AboutReveal key={label} delay={index * 0.1} className={`${styles.proofItem} grid items-center gap-4 py-6 sm:gap-6 sm:px-8 sm:py-8 lg:px-12`}>
            {index < facts.length - 1 && <AboutDrawLine orientation="vertical" className={styles.proofDivider} />}
            <p data-verified={verified} className="font-serif text-4xl font-medium tracking-[-0.03em] text-[#907348] sm:text-5xl">
              <CountUpValue value={value} />
            </p>
            <div>
              <p className="text-sm font-semibold tracking-[-0.02em] sm:text-base">{label}</p>
              <p className="mt-1 text-xs leading-5 text-charcoal/55 sm:text-sm">{sub}</p>
            </div>
          </AboutReveal>
        ))}
      </div>
    </section>
  );
}
