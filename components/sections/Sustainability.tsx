'use client'

import { useRef } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useInView, useReducedMotion } from '@/lib/hooks'
import { Leaf } from 'lucide-react'

const SUSTAINABILITY_AREAS = [
  { name: 'Responsible Manufacturing', placeholder: '[ADD FASHION KNITS RESPONSIBLE MANUFACTURING INFORMATION]' },
  { name: 'Resource Efficiency', placeholder: '[ADD FASHION KNITS RESOURCE EFFICIENCY INFORMATION]' },
  { name: 'Waste Reduction', placeholder: '[ADD FASHION KNITS WASTE REDUCTION INFORMATION]' },
  { name: 'Energy', placeholder: '[ADD FASHION KNITS ENERGY INFORMATION]' },
  { name: 'Water Management', placeholder: '[ADD FASHION KNITS WATER MANAGEMENT INFORMATION]' },
  { name: 'Responsible Materials', placeholder: '[ADD FASHION KNITS RESPONSIBLE MATERIALS INFORMATION]' },
]

export function Sustainability() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <section id="sustainability" className="bg-charcoal py-32 md:py-40 px-6 md:px-16 lg:px-24">
      <SectionHeading title="MAKING MANUFACTURING\nMORE RESPONSIBLE." light={true} />

      <div 
        ref={containerRef}
        className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {SUSTAINABILITY_AREAS.map((area, index) => (
          <div
            key={index}
            className="p-8 border border-off-white/10 relative group hover:border-accent/30 transition-colors duration-300"
            style={{
              opacity: prefersReducedMotion || isInView ? 1 : 0,
              transform: prefersReducedMotion || isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`
            }}
          >
            <Leaf className="absolute top-6 right-6 w-5 h-5 text-accent/40" />
            <h3 className="text-lg font-bold text-off-white uppercase tracking-wider pr-8">
              {area.name}
            </h3>
            <p className="text-sm text-off-white/40 italic mt-6">
              {area.placeholder}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
