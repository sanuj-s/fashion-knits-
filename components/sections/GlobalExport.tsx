'use client'

import { useRef } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useInView, useReducedMotion } from '@/lib/hooks'

export function GlobalExport() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <section id="global-reach" className="bg-off-white py-32 md:py-40 px-6 md:px-16 lg:px-24">
      <SectionHeading title="MADE HERE.\nDELIVERED WORLDWIDE." />

      <div 
        ref={containerRef}
        className="mt-20 max-w-5xl mx-auto"
        style={{
          opacity: prefersReducedMotion || isInView ? 1 : 0,
          transform: prefersReducedMotion || isInView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
        }}
      >
        {/* Simple SVG Map Placeholder */}
        <div className="relative w-full aspect-[2/1] bg-warm-white rounded-lg border border-muted-gray/20 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-10">
            {/* Extremely simplified dot grid representation */}
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dotGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle fill="currentColor" cx="10" cy="10" r="2" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#dotGrid)" className="text-charcoal" />
            </svg>
          </div>
          
          {/* PLACEHOLDER: Add actual export destinations */}
          {/* Example dots for major hubs */}
          <div className="absolute top-[30%] left-[20%] w-3 h-3 bg-accent rounded-full animate-pulse" /> {/* NA */}
          <div className="absolute top-[25%] left-[50%] w-3 h-3 bg-accent rounded-full animate-pulse" /> {/* Europe */}
          <div className="absolute top-[45%] left-[70%] w-3 h-3 bg-accent rounded-full animate-pulse" /> {/* Asia */}
          
          <div className="z-10 text-center p-6 bg-off-white/80 backdrop-blur-sm rounded shadow-sm border border-muted-gray/10 mx-6">
            <p className="text-sm md:text-base text-muted-gray font-medium">
              [ADD FASHION KNITS EXPORT DESTINATIONS AND MARKET INFORMATION]
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-bold text-charcoal">[XX]+</div>
            <div className="text-sm text-muted-gray uppercase tracking-widest font-medium">Countries</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-bold text-charcoal">[XX]+</div>
            <div className="text-sm text-muted-gray uppercase tracking-widest font-medium">Clients</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-bold text-charcoal">[XX]+</div>
            <div className="text-sm text-muted-gray uppercase tracking-widest font-medium">Annual Shipments</div>
          </div>
        </div>
      </div>
    </section>
  )
}
