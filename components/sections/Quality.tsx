'use client'

import { useRef } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useInView, useReducedMotion } from '@/lib/hooks'

const QUALITY_STEPS = [
  { step: '01', name: 'Material Inspection', description: 'Every raw material tested before production begins.' },
  { step: '02', name: 'Production Monitoring', description: 'Continuous oversight throughout manufacturing.' },
  { step: '03', name: 'Inline Quality Control', description: 'Real-time inspection at every production stage.' },
  { step: '04', name: 'Final Inspection', description: 'Comprehensive final check before approval.' },
  { step: '05', name: 'Packing Audit', description: 'Final verification before shipment.' },
]

export function Quality() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <section id="quality" className="bg-off-white py-32 md:py-40 px-6 md:px-16 lg:px-24">
      <SectionHeading title="QUALITY IS\nENGINEERED IN." />

      <div ref={containerRef} className="mt-20 relative max-w-4xl mx-auto">
        {/* Vertical Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-muted-gray/30 -translate-x-1/2" />

        <div className="space-y-16">
          {QUALITY_STEPS.map((step, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={step.step}
                className={`relative flex items-center ${
                  isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
                style={{
                  opacity: prefersReducedMotion || isInView ? 1 : 0,
                  transform: prefersReducedMotion || isInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`
                }}
              >
                {/* Dot */}
                <div className="absolute left-[10px] md:left-1/2 w-3 h-3 rounded-full bg-accent -translate-x-1/2 z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                  <div className="text-5xl font-bold text-charcoal/10 mb-2">{step.step}</div>
                  <h3 className="text-xl font-bold text-charcoal mb-2">{step.name}</h3>
                  <p className="text-sm text-muted-gray">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
