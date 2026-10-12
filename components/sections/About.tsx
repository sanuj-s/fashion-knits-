'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export function About() {
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imagesRef.current) return;
    
    gsap.fromTo(
      imagesRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imagesRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section id="about" className="bg-off-white py-32 md:py-40 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="BUILT AROUND\nMANUFACTURING." 
          subtitle="Fashion Knits brings together textile manufacturing, garment production, quality systems and global export capabilities within an integrated manufacturing ecosystem." 
        />
        
        <div ref={imagesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 md:mt-24">
          <ImagePlaceholder
            label="AUTOMATED CIRCULAR KNITTING FACILITY"
            src="/assets/images/factory_about.jpg"
            alt="Fashion Knits Modern Factory Floor"
            aspectRatio="4/3"
          />
          <ImagePlaceholder
            label="TEXTILE INNOVATION & PATTERN ENGINEERING LAB"
            src="/assets/images/team_about.jpg"
            alt="Fashion Knits Engineering & Quality Team"
            aspectRatio="4/3"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 md:mt-24 pt-16 border-t border-muted-gray/20">
          {/* PLACEHOLDER: Replace with actual Fashion Knits data */}
          <AnimatedCounter value={20} suffix="+" label="Years of Experience" />
          <AnimatedCounter value={50} suffix="M+" label="Garments Produced" />
          <AnimatedCounter value={30} suffix="+" label="Global Markets" />
          <AnimatedCounter value={10} suffix="K+" label="Daily Capacity" />
        </div>
      </div>
    </section>
  );
}
