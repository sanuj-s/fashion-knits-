'use client';

import React, { useState, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView, useReducedMotion } from '@/lib/hooks';
import { Download, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface VerifiedScopeCertificate {
  id: string;
  name: string;
  standard: string;
  issuer: string;
  licenseNumber: string;
  scopeSummary: string;
  pdfUrl: string;
  previewImage: string;
  logo: string;
  statusBadge: string;
}

const VERIFIED_SCOPE_CERTIFICATES: VerifiedScopeCertificate[] = [
  {
    id: 'gots',
    name: 'GOTS',
    standard: 'Global Organic Textile Standard (Version 7.0)',
    issuer: 'USB Certification (Control Union Partner)',
    licenseNumber: 'USB TEX-5053-GOTS-2510.2',
    scopeSummary: 'Men, Women, Children & Babies Knitted Garments (Organic Cotton)',
    pdfUrl: '/assets/certificates/gots-organic-textile.pdf',
    previewImage: '/assets/certificates/previews/preview_gots.png',
    logo: '/assets/certificates/logos/cert_gots.png',
    statusBadge: 'Verified Scope Certificate',
  },
  {
    id: 'ocs',
    name: 'OCS 100',
    standard: 'Organic Content Standard (Version 3.0)',
    issuer: 'USB Certification Denetim',
    licenseNumber: 'USB-00007995-OCS-2510',
    scopeSummary: 'Certified Organic Cotton & Cotton Blends Chain of Custody',
    pdfUrl: '/assets/certificates/ocs-organic-content.pdf',
    previewImage: '/assets/certificates/previews/preview_ocs.png',
    logo: '/assets/certificates/logos/cert_ocs_100.png',
    statusBadge: 'Verified Scope Certificate',
  },
  {
    id: 'oekotex',
    name: 'OEKO-TEX®',
    standard: 'STANDARD 100 Annex 4 (Product Class I: Baby Articles)',
    issuer: 'Centexbel Belgian Textile Research Centre',
    licenseNumber: 'Certificate No. 2011149',
    scopeSummary: 'Tested Safe for Newborn Infants: Zero Harmful Dyes, Heavy Metals, or Formaldehyde',
    pdfUrl: '/assets/certificates/oeko-tex-standard-100.pdf',
    previewImage: '/assets/certificates/previews/preview_oekotex.png',
    logo: '/assets/certificates/logos/cert_oekotex.png',
    statusBadge: 'Product Class I Baby-Safe',
  },
  {
    id: 'bsci',
    name: 'amfori BSCI',
    standard: 'Business Social Compliance Initiative Code of Conduct',
    issuer: 'amfori Audited Independent Inspection',
    licenseNumber: 'Audit ID: 9322',
    scopeSummary: 'Fair Compensation, Worker Health & Safety, Environmental Protection, No Child Labor',
    pdfUrl: '/assets/certificates/bsci-social-compliance.pdf',
    previewImage: '/assets/certificates/previews/preview_bsci.png',
    logo: '/assets/certificates/logos/cert_amfori_bsci.svg',
    statusBadge: 'Social Audit Verified',
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
          subtitle="Official scope certificates and recognized compliance accreditations governing sustainability, chemical safety, ethical labor, and quality systems at Fashion Knits."
        />

        {/* 1. Verified Scope Certificates with Real Scanned Document Previews */}
        <div className="mt-16">
          <div className="flex items-center justify-between pb-4 border-b border-charcoal/10 mb-8">
            <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent font-bold">
              Verified Scope Certificates // Official Documents On File
            </h3>
            <span className="text-[11px] font-mono text-muted-gray">
              Direct PDF Verification Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VERIFIED_SCOPE_CERTIFICATES.map((cert) => (
              <div
                key={cert.id}
                className="bg-pure-white border border-charcoal/10 flex flex-col justify-between hover:border-accent hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  {/* Real Scanned Document Thumbnail Preview */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-off-white/80 border-b border-charcoal/10">
                    <img
                      src={cert.previewImage}
                      alt={`${cert.name} Official Scope Certificate`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Logo & Status Badge Overlay */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="w-10 h-10 bg-white p-1.5 shadow-md flex items-center justify-center border border-charcoal/5">
                        <img
                          src={cert.logo}
                          alt={cert.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <span className="px-2 py-1 bg-charcoal/90 backdrop-blur-md text-[9px] font-mono font-bold uppercase tracking-wider text-accent border border-white/10 block truncate">
                        {cert.licenseNumber}
                      </span>
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-5">
                    <h4 className="text-base font-bold text-charcoal uppercase tracking-wider mb-1">
                      {cert.name}
                    </h4>
                    <p className="text-[11px] font-mono text-accent font-semibold mb-2">
                      {cert.statusBadge}
                    </p>
                    <p className="text-xs text-charcoal/70 leading-relaxed font-normal">
                      {cert.scopeSummary}
                    </p>
                  </div>
                </div>

                {/* Direct Verified PDF Download Button */}
                <div className="p-5 pt-0">
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 bg-charcoal hover:bg-accent text-off-white hover:text-charcoal text-[11px] font-mono uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Scope PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Full 17-Accreditation Grid with Filter Tabs */}
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
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-accent hover:underline font-bold"
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

        {/* 3. Audit Readiness Banner */}
        <div className="mt-16 bg-charcoal text-off-white p-8 md:p-10 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-accent block mb-2">
              Buyer Audit Readiness
            </span>
            <h4 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
              Scheduled Third-Party &amp; Brand Audits Welcome
            </h4>
            <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed mt-2">
              Fashion Knits regularly hosts customer compliance teams, third-party inspection agencies (SGS, Intertek, Bureau Veritas), and brand auditors across our Netaji Apparel Park factory and Angeripalayam corporate office.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-accent text-charcoal text-xs font-mono uppercase tracking-widest font-bold hover:bg-pure-white transition-colors flex-shrink-0 cursor-pointer"
          >
            Inquire for Audit Protocol
          </button>
        </div>

        {/* View Full Quality & Certifications Page */}
        <div className="mt-12 pt-8 border-t border-charcoal/10 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-gray">
            Detailed Certifications & Compliance
          </span>
          <Link
            href="/quality"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-charcoal hover:text-accent transition-colors font-bold group"
          >
            <span>View All Certifications</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
