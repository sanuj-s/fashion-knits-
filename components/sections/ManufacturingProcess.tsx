'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { useIsMobile } from '@/lib/hooks';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

const STAGES = [
  { number: '01', name: 'Yarn', description: 'Sourcing premium raw materials for production.', image: '/assets/images/yarn_process.jpg' },
  { number: '02', name: 'Knitting', description: 'Precision fabric construction at scale.', image: '/assets/images/knitting_process.jpg' },
  { number: '03', name: 'Dyeing', description: 'Consistent color through advanced processes.', image: '/assets/images/dyeing_process.jpg' },
  { number: '04', name: 'Processing', description: 'Fabric treatment and enhancement.', image: '/assets/images/dyeing_process.jpg' },
  { number: '05', name: 'Finishing', description: 'Surface refinement and quality preparation.', image: '/assets/images/factory_hero.jpg' },
  { number: '06', name: 'Cutting', description: 'Precision pattern cutting for minimal waste.', image: '/assets/images/cutting_process.jpg' },
  { number: '07', name: 'Sewing', description: 'Expert garment assembly and construction.', image: '/assets/images/cutting_process.jpg' },
  { number: '08', name: 'Quality Control', description: 'Multi-point inspection at every stage.', image: '/assets/images/team_about.jpg' },
  { number: '09', name: 'Packing', description: 'Careful packaging to international standards.', image: '/assets/images/factory_about.jpg' },
  { number: '10', name: 'Export', description: 'Global logistics and delivery.', image: '/assets/images/factory_hero.jpg' },
];

export function ManufacturingProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile || !containerRef.current || !scrollRef.current) return;
    
    const scrollWidth = scrollRef.current.scrollWidth - containerRef.current.offsetWidth;
    
    const tween = gsap.to(scrollRef.current, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });
    
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isMobile]);

  return (
    <section id="manufacturing" className="bg-charcoal py-32 overflow-hidden">
      <div className="px-6 md:px-16 lg:px-24 max-w-7xl mx-auto mb-16">
        <SectionHeading 
          title="FROM RAW MATERIAL\nTO FINISHED PRODUCT." 
          light={true} 
        />
      </div>

      {isMobile ? (
        <div className="flex flex-col gap-12 px-6">
          {STAGES.map((stage) => (
            <div key={stage.number} className="w-full">
              <ImagePlaceholder 
                label={`${stage.name.toUpperCase()} PROCESS`}
                src={stage.image}
                alt={stage.name}
                aspectRatio="4/3" 
                className="mb-6"
              />
              <div className="relative z-10 -mt-12 pl-6">
                <span className="text-7xl font-bold text-off-white/10 block mb-2">{stage.number}</span>
                <h3 className="text-xl font-bold text-off-white mb-2">{stage.name}</h3>
                <p className="text-sm text-off-white/50">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div ref={containerRef} className="h-[700px] flex items-center relative pl-6 md:pl-16 lg:pl-24">
          <div ref={scrollRef} className="flex gap-8 pr-24 flex-nowrap h-full pt-12">
            {STAGES.map((stage) => (
              <div key={stage.number} className="min-w-[400px] h-[500px] flex-shrink-0 flex flex-col justify-end relative group">
                <div className="absolute inset-0 h-[65%] top-0">
                  <ImagePlaceholder 
                    label={`${stage.name.toUpperCase()} PROCESS`}
                    src={stage.image}
                    alt={stage.name}
                    aspectRatio="16/10"
                    className="h-full w-full"
                  />
                </div>
                <div className="bg-charcoal relative z-10 pt-6 mt-auto">
                  <span className="text-7xl font-bold text-off-white/10 block mb-4">{stage.number}</span>
                  <h3 className="text-xl font-bold text-off-white mb-2">{stage.name}</h3>
                  <p className="text-sm text-off-white/50">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
