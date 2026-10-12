'use client';

import React, { useState, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView, useReducedMotion } from '@/lib/hooks';
import { Download, CheckCircle2, ExternalLink } from 'lucide-react';

interface VerifiedScopeCertificate {
  id: string;
  name: string;
  standard: string;
  issuer: string;
  licenseNumber: string;
  scope: string;
  pdfUrl: string;
  logo: string;
  validity: string;
}

const VERIFIED_SCOPE_CERTIFICATES: VerifiedScopeCertificate[] = [
  {
    id: 'gots',
    name: 'GOTS',
    standard: 'Global Organic Textile Standard (Version 7.0)',
    issuer: 'USB Certification (Control Union Partner)',
    licenseNumber: 'USB TEX-5053-GOTS-2510.2',
    scope: 'Organic Cotton Knitted Apparel (Men, Women, Children, Babies) // Circular Knitting, Dyeing, Finishing, Printing, Cut & Sew, Export',
    pdfUrl: '/assets/certificates/gots-organic-textile.pdf',
    logo: '/assets/certificates/logos/cert_gots.png',
    validity: 'Scope Certified Active',
  },
  {
    id: 'ocs',
    name: 'OCS 100 & OCS Blended',
    standard: 'Organic Content Standard (Version 3.0)',
    issuer: 'USB Certification Denetim',
    licenseNumber: 'USB-00007995-OCS-2510',
    scope: 'Certified Organic Cotton & Cotton Blends // Full Chain of Custody from Fiber Sourcing to Finished Garments',
    pdfUrl: '/assets/certificates/ocs-organic-content.pdf',
    logo: '/assets/certificates/logos/cert_ocs_100.png',
    validity: 'Scope Certified Active',
  },
  {
    id: 'oekotex',
    name: 'OEKO-TEX® Standard 100',
    standard: 'Annex 4 (Product Class I: Baby Articles)',
    issuer: 'Centexbel Belgian Textile Research Centre',
    licenseNumber: 'Certificate No. 2011149',
    scope: 'Knitted Garments Safe for Infants & Children // Tested Free of Harmful Chemicals, Azo Dyes, Heavy Metals, and Formaldehyde',
    pdfUrl: '/assets/certificates/oeko-tex-standard-100.pdf',
    logo: '/assets/certificates/logos/cert_oekotex.png',
    validity: 'Product Class I Certified',
  },
  {
    id: 'bsci',
    name: 'amfori BSCI',
    standard: 'Business Social Compliance Initiative',
    issuer: 'amfori Audited Independent Inspection',
    licenseNumber: 'Audit ID: 9322',
    scope: 'Fair Remuneration, Occupational Health & Safety, Environmental Protection, No Child Labor, Ethical Business Conduct',
    pdfUrl: '/assets/certificates/bsci-social-compliance.pdf',
    logo: '/assets/certificates/logos/cert_amfori_bsci.svg',
    validity: 'Social Audit Verified',
  },
];

interface AccreditationItem {
  name: string;
  fullName: string;
  category: 'social' | 'esg' | 'quality' | 'license';
  logo: string;
  status: string;
  hasPdf?: string;
}

const ACCREDITATIONS: AccreditationItem[] = [
  {
    name: 'GOTS',
    fullName: 'Global Organic Textile Standard',
    category: 'esg',
    logo: '/assets/certificates/logos/cert_gots.png',
    status: 'Verified Scope Certificate',
    hasPdf: '/assets/certificates/gots-organic-textile.pdf',
  },
  {
    name: 'OEKO-TEX®',
    fullName: 'STANDARD 100 Class I (Baby Safe)',
    category: 'quality',
    logo: '/assets/certificates/logos/cert_oekotex.png',
    status: 'Product Class I Certificate',
    hasPdf: '/assets/certificates/oeko-tex-standard-100.pdf',
  },
  {
    name: 'amfori BSCI',
    fullName: 'Business Social Compliance Initiative',
    category: 'social',
    logo: '/assets/certificates/logos/cert_amfori_bsci.svg',
    status: 'Verified Social Audit',
    hasPdf: '/assets/certificates/bsci-social-compliance.pdf',
  },
  {
    name: 'OCS 100',
    fullName: 'Organic Content Standard 100',
    category: 'esg',
    logo: '/assets/certificates/logos/cert_ocs_100.png',
    status: 'Verified Scope Certificate',
    hasPdf: '/assets/certificates/ocs-organic-content.pdf',
  },
  {
    name: 'SMETA',
    fullName: 'Sedex Members Ethical Trade Audit',
    category: 'social',
    logo: '/assets/certificates/logos/cert_smeta.svg',
    status: '4-Pillar Audited Facility',
  },
  {
    name: 'SEDEX',
    fullName: 'Supplier Ethical Data Exchange',
    category: 'social',
    logo: '/assets/certificates/logos/cert_sedex.png',
    status: 'Registered Supply Chain Member',
  },
  {
    name: 'WRAP',
    fullName: 'Worldwide Responsible Accredited Production',
    category: 'social',
    logo: '/assets/certificates/logos/cert_wrap.png',
    status: 'Social Compliance Accredited',
  },
  {
    name: 'Disney FAMA',
    fullName: 'Facility and Merchandise Authorization',
    category: 'license',
    logo: '/assets/certificates/logos/cert_disney_fama.png',
    status: 'Authorized Production Facility',
  },
  {
    name: 'LEGO',
    fullName: 'LEGO Supplier Compliance',
    category: 'license',
    logo: '/assets/certificates/logos/cert_lego.png',
    status: 'Approved Licensee Facility',
  },
  {
    name: 'BCI',
    fullName: 'Better Cotton Initiative',
    category: 'esg',
    logo: '/assets/certificates/logos/cert_bci.png',
    status: 'Sustainable Cotton Sourcing',
  },
  {
    name: 'GRS',
    fullName: 'Global Recycled Standard',
    category: 'esg',
    logo: '/assets/certificates/logos/cert_grs.png',
    status: 'Recycled Fiber Verified',
  },
  {
    name: 'Higg Index',
    fullName: 'Sustainable Apparel Coalition (FEM / FSLM)',
    category: 'esg',
    logo: '/assets/certificates/logos/cert_higg_index.png',
    status: 'Facility Environmental Module',
  },
  {
    name: 'Nordic Swan',
    fullName: 'Nordic Ecolabel Criteria Compliant',
    category: 'esg',
    logo: '/assets/certificates/logos/cert_nordic_swan.png',
    status: 'Eco-Textile Evaluated',
  },
  {
    name: 'IGBC Green',
    fullName: 'Indian Green Building Council Platinum',
    category: 'esg',
    logo: '/assets/certificates/logos/cert_igbc_green.png',
    status: 'Sustainable Infrastructure',
  },
  {
    name: 'ISO 9001:2015',
    fullName: 'Quality Management Systems (Intertek UKAS)',
    category: 'quality',
    logo: '/assets/certificates/logos/cert_intertek_iso.png',
    status: 'UKAS Quality Management',
  },
  {
    name: 'ISO 14001 & 45001',
    fullName: 'Environmental & Occupational Health Management',
    category: 'quality',
    logo: '/assets/certificates/logos/cert_ias_iso.png',
    status: 'Certified Management Systems',
  },
  {
    name: 'OCS Blended',
    fullName: 'Organic Content Standard Blended',
    category: 'esg',
    logo: '/assets/certificates/logos/cert_ocs_blended.png',
    status: 'Chain-of-Custody Compliant',
  },
];

export function Certifications() {
  const [filter, setFilter] = useState<'all' | 'social' | 'esg' | 'quality' | 'license'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });

  const filteredAccreditations =
    filter === 'all'
      ? ACCREDITATIONS
      : ACCREDITATIONS.filter((item) => item.category === filter);

  return (
    <section id="certifications" className="bg-[#f9f7f4] py-28 md:py-36 px-6 md:px-16 lg:px-24 border-t border-charcoal/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <SectionHeading
          title={'CERTIFICATIONS\n& COMPLIANCE.'}
          subtitle="International accreditations and verified scope certificates governing environmental stewardship, product safety, ethical labor, and quality systems at Fashion Knits."
        />

        {/* Part 1: Downloadable Verified Scope Certificates */}
        <div className="mt-16">
          <div className="flex items-center justify-between pb-4 border-b border-charcoal/10 mb-8">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent font-bold">
              Verified Scope Certificates // Official Documents
            </h3>
            <span className="text-[11px] font-mono text-muted-gray">
              Direct PDF Verification Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VERIFIED_SCOPE_CERTIFICATES.map((cert) => (
              <div
                key={cert.id}
                className="bg-pure-white border border-charcoal/10 p-6 md:p-8 flex flex-col justify-between hover:border-accent hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-off-white/80 p-2 border border-charcoal/5 flex items-center justify-center">
                        <img
                          src={cert.logo}
                          alt={`${cert.name} emblem`}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-charcoal tracking-tight">
                          {cert.name}
                        </h4>
                        <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold block">
                          {cert.validity}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-muted-gray bg-off-white px-2 py-1 border border-charcoal/5">
                      {cert.licenseNumber}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-charcoal/90 mt-2">
                    {cert.standard}
                  </p>
                  <p className="text-[11px] font-mono text-muted-gray mt-0.5">
                    Issuing Body: {cert.issuer}
                  </p>
                  <p className="text-xs text-charcoal/70 leading-relaxed mt-3">
                    {cert.scope}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-charcoal/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-gray flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    Authenticity Audited
                  </span>
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-charcoal text-off-white text-xs font-mono uppercase tracking-wider hover:bg-accent hover:text-charcoal transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Scope PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Comprehensive 17-Accreditation Grid with Filter Tabs */}
        <div ref={containerRef} className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-charcoal/10 mb-8">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent font-bold">
              Global Compliance &amp; Accreditation Portfolio
            </h3>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              {[
                { id: 'all', label: 'All (17)' },
                { id: 'social', label: 'Social & Ethical' },
                { id: 'esg', label: 'Organic & ESG' },
                { id: 'quality', label: 'Quality & ISO' },
                { id: 'license', label: 'Character Licensing' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as typeof filter)}
                  className={`px-3 py-1.5 uppercase transition-all cursor-pointer ${
                    filter === tab.id
                      ? 'bg-charcoal text-off-white font-bold'
                      : 'bg-pure-white text-charcoal/70 border border-charcoal/10 hover:border-charcoal/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredAccreditations.map((item, index) => (
              <div
                key={item.name}
                className="bg-pure-white border border-charcoal/8 p-5 flex flex-col items-center text-center justify-between hover:border-accent/50 hover:shadow-md transition-all duration-200"
                style={{
                  opacity: prefersReducedMotion || isInView ? 1 : 0,
                  transform: prefersReducedMotion || isInView ? 'translateY(0)' : 'translateY(15px)',
                  transition: `opacity 0.4s ease-out ${index * 0.03}s, transform 0.4s ease-out ${index * 0.03}s`,
                }}
              >
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img
                    src={item.logo}
                    alt={`${item.name} emblem`}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-charcoal uppercase tracking-wider">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-muted-gray leading-tight mt-1 line-clamp-2">
                    {item.fullName}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-charcoal/5 w-full">
                  {item.hasPdf ? (
                    <a
                      href={item.hasPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-accent hover:underline"
                    >
                      <span>Scope PDF</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <span className="text-[9px] font-mono text-muted-gray/80 uppercase block">
                      {item.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 3: Audit Readiness Statement */}
        <div className="mt-16 bg-charcoal text-off-white p-8 md:p-10 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-accent block mb-2">
              Buyer Audit Readiness
            </span>
            <h4 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
              Open to Third-Party Brand &amp; Retail Audits
            </h4>
            <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed mt-2">
              Fashion Knits maintains an open-door policy for scheduled factory audits by international brands, third-party inspection agencies (SGS, Intertek, Bureau Veritas), and customer compliance officers.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-accent text-charcoal text-xs font-mono uppercase tracking-widest font-bold hover:bg-pure-white transition-colors flex-shrink-0 cursor-pointer"
          >
            Request Audit Pack
          </button>
        </div>
      </div>
    </section>
  );
}
