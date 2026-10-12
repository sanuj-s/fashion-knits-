'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

const CAPABILITIES = [
  { name: 'Knitting', description: 'Precision manufacturing engineered for consistency, scale and quality.', image: '/assets/images/knitting_process.jpg' },
  { name: 'Dyeing', description: 'Advanced color matching and dyeing for every specification.', image: '/assets/images/dyeing_process.jpg' },
  { name: 'Fabric Processing', description: 'Comprehensive fabric treatment and finishing processes.', image: '/assets/images/dyeing_process.jpg' },
  { name: 'Garment Manufacturing', description: 'Full-scale cutting, sewing and assembly operations.', image: '/assets/images/cutting_process.jpg' },
  { name: 'Finishing', description: 'Premium finishing for superior hand-feel and appearance.', image: '/assets/images/factory_hero.jpg' },
  { name: 'Quality Control', description: 'Multi-stage inspection and quality assurance systems.', image: '/assets/images/team_about.jpg' },
  { name: 'Packaging', description: 'International-standard packaging and presentation.', image: '/assets/images/factory_about.jpg' },
  { name: 'Export', description: 'Global logistics and export management.', image: '/assets/images/factory_hero.jpg' },
];

export function Capabilities() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    
    gsap.fromTo(
      gridRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  return (
    <section id="capabilities" className="bg-off-white py-32 md:py-40 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="CAPABILITIES\nBUILT AT SCALE." 
        />
        
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-16 md:mt-24">
          {CAPABILITIES.map((capability, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="overflow-hidden mb-4">
                <div className="transition-transform duration-500 group-hover:scale-[1.02]">
                  <ImagePlaceholder 
                    label={capability.name.toUpperCase()}
                    src={capability.image}
                    alt={capability.name}
                    aspectRatio="3/2" 
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold mt-4 uppercase tracking-wider text-charcoal">
                {capability.name}
              </h3>
              <p className="text-sm text-muted-gray mt-2 leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
