'use client'

import { useRef } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useInView, useReducedMotion } from '@/lib/hooks'

const MILESTONES = [
  { year: '[YEAR]', event: '[ADD COMPANY MILESTONE — e.g., Company Founded]' },
  { year: '[YEAR]', event: '[ADD COMPANY MILESTONE — e.g., First Export]' },
  { year: '[YEAR]', event: '[ADD COMPANY MILESTONE — e.g., Factory Expansion]' },
  { year: '[YEAR]', event: '[ADD COMPANY MILESTONE — e.g., New Market Entry]' },
  { year: '[YEAR]', event: '[ADD COMPANY MILESTONE — e.g., Sustainability Initiative]' },
]

export function CompanyStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <section id="story" className="bg-warm-white py-32 md:py-40 px-6 md:px-16 lg:px-24">
      <SectionHeading title="OUR\nSTORY." subtitle="The Fashion Knits journey." />

      <div 
        ref={containerRef}
        className="mt-20 max-w-6xl mx-auto relative"
      >
        {/* Desktop Horizontal Line */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-muted-gray/30 -translate-y-1/2" />
        
        {/* Mobile Vertical Line */}
        <div className="md:hidden absolute left-[15px] top-0 bottom-0 w-px bg-muted-gray/30" />

        <div className="flex flex-col md:flex-row md:justify-between space-y-12 md:space-y-0">
          {MILESTONES.map((milestone, index) => {
            const isTop = index % 2 === 0
            return (
              <div
                key={index}
                className="relative pl-12 md:pl-0 md:w-48 flex-shrink-0"
                style={{
                  opacity: prefersReducedMotion || isInView ? 1 : 0,
                  transform: prefersReducedMotion || isInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`
                }}
              >
                {/* Dot */}
                <div className="absolute left-[10px] md:left-1/2 top-1.5 md:top-1/2 w-3 h-3 rounded-full bg-accent md:-translate-x-1/2 md:-translate-y-1/2 z-10" />

                <div className={`flex flex-col ${!isTop ? 'md:flex-col-reverse md:mt-[calc(50%+2rem)]' : 'md:mb-[calc(50%+2rem)]'} md:text-center`}>
                  <div className={`text-2xl font-bold text-accent ${isTop ? 'md:mb-4' : 'md:mt-4'}`}>
                    {milestone.year}
                  </div>
                  <div className="text-sm text-muted-gray italic mt-1 md:mt-0">
                    {milestone.event}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
