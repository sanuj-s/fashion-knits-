'use client';

import React, { useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView, useReducedMotion } from '@/lib/hooks';

interface Certification {
  name: string;
  fullName: string;
  subtitle: string;
  logo: string;
  documentUrl?: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    name: 'GOTS',
    fullName: 'Global Organic Textile Standard',
    subtitle: 'Standard',
    logo: '/assets/certificates/logos/cert_gots.png',
    documentUrl: '/assets/certificates/gots-organic-textile.pdf',
  },
  {
    name: 'OCS',
    fullName: 'Organic Content Standard',
    subtitle: 'Standard',
    logo: '/assets/certificates/logos/cert_ocs_100.png',
    documentUrl: '/assets/certificates/ocs-organic-content.pdf',
  },
  {
    name: 'OEKO-TEX®',
    fullName: 'STANDARD 100',
    subtitle: 'Standard',
    logo: '/assets/certificates/logos/cert_oekotex.png',
    documentUrl: '/assets/certificates/oeko-tex-standard-100.pdf',
  },
  {
    name: 'amfori BSCI',
    fullName: 'Business Social Compliance Initiative',
    subtitle: 'Social Compliance',
    logo: '/assets/certificates/logos/cert_amfori_bsci.svg',
    documentUrl: '/assets/certificates/bsci-social-compliance.pdf',
  },
  {
    name: 'SMETA',
    fullName: 'Sedex Members Ethical Trade Audit',
    subtitle: 'Audit',
    logo: '/assets/certificates/logos/cert_smeta.svg',
    documentUrl: '/assets/certificates/smeta-audit.pdf',
  },
  {
    name: 'WRAP',
    fullName: 'Worldwide Responsible Accredited Production',
    subtitle: 'Certification',
    logo: '/assets/certificates/logos/cert_wrap.png',
    documentUrl: '/assets/certificates/wrap-social-compliance.pdf',
  },
  {
    name: 'SEDEX',
    fullName: 'Supplier Ethical Data Exchange',
    subtitle: 'Ethical Supply Chain Platform',
    logo: '/assets/certificates/logos/cert_sedex.png',
    documentUrl: '/assets/certificates/sedex-membership.pdf',
  },
  {
    name: 'BCI',
    fullName: 'Better Cotton Initiative',
    subtitle: 'Sustainability Program',
    logo: '/assets/certificates/logos/cert_bci.png',
    documentUrl: '/assets/certificates/bci-better-cotton.pdf',
  },
  {
    name: 'GRS',
    fullName: 'Global Recycled Standard',
    subtitle: 'Standard',
    logo: '/assets/certificates/logos/cert_grs.png',
    documentUrl: '/assets/certificates/grs-recycled-standard.pdf',
  },
  {
    name: 'Higg Index',
    fullName: 'Sustainable Apparel Coalition',
    subtitle: 'Sustainability Assessment',
    logo: '/assets/certificates/logos/cert_higg_index.png',
    documentUrl: '/assets/certificates/higg-index-fem.pdf',
  },
  {
    name: 'Disney FAMA',
    fullName: 'Facility and Merchandise Authorization',
    subtitle: 'Facility Authorization',
    logo: '/assets/certificates/logos/cert_disney_fama.png',
    documentUrl: '/assets/certificates/disney-fama.pdf',
  },
];

export function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });

  return (
    <section id="certifications" className="bg-[#f9f7f4] py-28 md:py-36 px-6 md:px-16 lg:px-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={'CERTIFICATIONS\n& COMPLIANCE.'}
          subtitle="Recognized standards and compliance programs supporting quality, sustainability, product safety and responsible manufacturing across our operations."
        />
      </div>

      {/* Certification Cards Grid */}
      <div ref={containerRef} className="max-w-7xl mx-auto mt-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {CERTIFICATIONS.map((cert, index) => (
            <div
              key={cert.name}
              className="group relative bg-pure-white border border-charcoal/8 p-6 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
              style={{
                opacity: prefersReducedMotion || isInView ? 1 : 0,
                transform: prefersReducedMotion || isInView ? 'translateY(0)' : 'translateY(15px)',
                transition: `opacity 0.5s ease-out ${index * 0.05}s, transform 0.5s ease-out ${index * 0.05}s`,
              }}
            >
              {/* Logo */}
              <div className="w-24 h-24 mb-4 flex items-center justify-center">
                <img
                  src={cert.logo}
                  alt={`${cert.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Name */}
              <h4 className="text-lg font-bold text-charcoal tracking-tight mb-1">
                {cert.name}
              </h4>

              {/* Full Name */}
              <p className="text-xs text-muted-gray leading-tight mb-1">
                {cert.fullName}
              </p>

              {/* Subtitle */}
              <p className="text-[10px] uppercase tracking-wider text-muted-gray/70 mb-4">
                {cert.subtitle}
              </p>

              {/* View Certificate Button */}
              {cert.documentUrl && (
                <a
                  href={cert.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-charcoal font-medium group/btn hover:text-accent transition-colors mt-auto"
                  aria-label={`View ${cert.name} certificate document`}
                >
                  <span>View Certificate</span>
                  <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                </a>
              )}

              {/* Accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
