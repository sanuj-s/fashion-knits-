'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

const PRODUCTS = [
  { category: 'T-Shirts', description: 'Essential basics to premium fashion tees.', image: '/assets/images/cutting_process.jpg' },
  { category: 'Polos', description: 'Classic and modern polo constructions.', image: '/assets/images/knitting_process.jpg' },
  { category: 'Sweatshirts', description: 'Fleece and french terry compositions.', image: '/assets/images/dyeing_process.jpg' },
  { category: 'Hoodies', description: 'Pullover and zip-through styles.', image: '/assets/images/cutting_process.jpg' },
  { category: 'Sportswear', description: 'Performance-driven athletic garments.', image: '/assets/images/knitting_process.jpg' },
  { category: 'Casualwear', description: 'Everyday comfort and style.', image: '/assets/images/yarn_process.jpg' },
  { category: 'Kidswear', description: 'Quality garments for children.', image: '/assets/images/team_about.jpg' },
  { category: 'Custom Garments', description: 'Bespoke manufacturing to specification.', image: '/assets/images/factory_about.jpg' },
];

export function Products() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    
    gsap.fromTo(
      gridRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section id="products" className="bg-warm-white py-32 md:py-40 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="PRODUCT\nRANGE." 
          subtitle="Comprehensive garment manufacturing across categories." 
        />
        
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mt-16 md:mt-24">
          {PRODUCTS.map((product, index) => (
            <div key={index} className="group relative border-t-2 border-transparent hover:border-accent pt-4 transition-colors duration-300">
              <div className="overflow-hidden mb-4">
                <div className="transition-transform duration-500 group-hover:scale-[1.03]">
                  <ImagePlaceholder 
                    label={product.category.toUpperCase()}
                    src={product.image}
                    alt={product.category}
                    aspectRatio="3/4" 
                  />
                </div>
              </div>
              <h3 className="text-sm uppercase tracking-widest font-bold mt-4 text-charcoal">
                {product.category}
              </h3>
              <p className="text-sm text-muted-gray mt-1 leading-relaxed">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
