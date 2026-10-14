'use client';

import { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (CSS.supports('animation-timeline: scroll()')) return;

    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (bar.current) {
          bar.current.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;
        }
        frame = 0;
      });
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={bar}
      className="scroll-progress-bar fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left bg-accent"
      style={{ transform: 'scaleX(0)' }}
      aria-hidden="true"
    />
  );
}
