'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Download, ExternalLink } from 'lucide-react';

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
    previewImage: '/assets/certificates/previews/preview_gots.webp',
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
    previewImage: '/assets/certificates/previews/preview_ocs.webp',
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
    previewImage: '/assets/certificates/previews/preview_bsci.webp',
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

type AccreditationFilter = 'all' | 'social' | 'esg' | 'quality' | 'license';

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
    status: 'Audited Independent Inspection (ID: 9322)',
    hasPdf: '/assets/certificates/bsci-social-compliance.pdf',
  },
  {
    name: 'OCS 100',
    fullName: 'Organic Content Standard v3.0',
    category: 'esg',
    logo: '/assets/certificates/logos/cert_ocs_100.png',
    status: 'Verified Scope Certificate',
    hasPdf: '/assets/certificates/ocs-organic-content.pdf',
  },
  {
    name: 'OCS Blended',
    fullName: 'Organic Content Standard (Blends)',
    category: 'esg',
    logo: '/assets/certificates/logos/cert_ocs_blended.png',
    status: 'Verified Chain of Custody',
  },
  {
    name: 'Sedex SMETA',
    fullName: 'Sedex Members Ethical Trade Audit',
    category: 'social',
    logo: '/assets/certificates/logos/cert_smeta.png',
    status: 'Social & Labor Standards Compliant',
  },
  {
    name: 'WRAP',
    fullName: 'Worldwide Responsible Accredited Production',
    category: 'social',
    logo: '/assets/certificates/logos/cert_wrap.png',
    status: 'Ethical Manufacturing Benchmark',
  },
  {
    name: 'BCI',
    fullName: 'Better Cotton Initiative',
    category: 'esg',
    logo: '/assets/certificates/logos/cert_bci.png',
    status: 'Sustainable Cotton Sourcing Partner',
  },
  {
    name: 'GRS',
    fullName: 'Global Recycled Standard',
    category: 'esg',
    logo: '/assets/certificates/logos/cert_grs.png',
    status: 'Recycled Fiber Tracing Protocol',
  },
  {
    name: 'Higg Index',
    fullName: 'Sustainable Apparel Coalition Higg FEM',
    category: 'esg',
    logo: '/assets/certificates/logos/cert_higg_index.png',
    status: 'Environmental Performance Module',
  },
  {
    name: 'ISO 9001:2015',
    fullName: 'Quality Management Systems',
    category: 'quality',
    logo: '/assets/certificates/logos/cert_intertek_iso.png',
    status: 'Intertek Audited Quality System',
  },
  {
    name: 'ISO 14001:2015',
    fullName: 'Environmental Management Systems',
    category: 'quality',
    logo: '/assets/certificates/logos/cert_ias_iso.png',
    status: 'Environmental Protocol Compliant',
  },
  {
    name: 'Disney FAMA',
    fullName: 'Facility and Merchandise Authorization',
    category: 'license',
    logo: '/assets/certificates/logos/cert_disney_fama.png',
    status: 'Authorized Licensed Factory',
  },
  {
    name: 'LEGO Licensee',
    fullName: 'LEGO Group Social & Safety Audited',
    category: 'license',
    logo: '/assets/certificates/logos/cert_lego.png',
    status: 'Authorized Licensed Manufacturer',
  },
  {
    name: 'IGBC Green',
    fullName: 'Indian Green Building Council Platinum',
    category: 'esg',
    logo: '/assets/certificates/logos/cert_igbc_green.png',
    status: 'Netaji Apparel Park Facility Standard',
  },
  {
    name: 'Nordic Swan',
    fullName: 'Nordic Ecolabelling Criteria Compliant',
    category: 'esg',
    logo: '/assets/certificates/logos/cert_nordic_swan.png',
    status: 'Export Dyeing Partner Accreditation',
  },
];

export function Certifications() {
  const [activeCategory, setActiveCategory] = useState<AccreditationFilter>('all');

  const filteredAccreditations =
    activeCategory === 'all'
      ? ACCREDITATIONS
      : ACCREDITATIONS.filter((item) => item.category === activeCategory);

  return (
    <section id="certifications" className="grain relative bg-[#161413] text-off-white py-20 sm:py-24 lg:py-32 px-6 md:px-16 lg:px-24 border-b border-white/10">
      <div className="max-w-[90rem] mx-auto">
        {/* Editorial Eyebrow with numbering */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-10 bg-accent" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
            06 // Verified Certifications
          </span>
        </div>

        {/* Section Heading with Masked Line Reveal */}
        <SectionHeading
          title={'VERIFIED GLOBAL\nACCREDITATIONS.'}
          subtitle="Genuine third-party certifications and verified audits governing our manufacturing facilities, social ethics, babywear safety, and organic supply chain."
          light={true}
        />

        {/* 4 Primary Verified Scope Certificates Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-24">
          {VERIFIED_SCOPE_CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className="premium-card group bg-[#121110] border border-white/10 hover:border-accent hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Certificate Scan Preview */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/60 border-b border-white/10">
                  <picture className="w-full h-full">
                    <source type="image/webp" srcSet={cert.previewImage} />
                    <img
                      src={cert.previewImage.replace('.webp', '.png')}
                      alt={`${cert.name} Official Scope Certificate Scan`}
                      className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-transparent opacity-90" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 bg-black/90 backdrop-blur-md text-accent text-[9px] font-mono tracking-widest uppercase border border-white/20">
                      {cert.statusBadge}
                    </span>
                  </div>

                  {/* Logo overlay */}
                  <div className="absolute bottom-3 right-3 z-10 w-12 h-12 bg-white/95 p-1.5 border border-white/20 shadow-md">
                    <img src={cert.logo} alt={cert.name} className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 md:p-8">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent block font-semibold mb-1">
                    {cert.issuer}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-off-white mb-2 group-hover:text-accent transition-colors duration-300">
                    {cert.name}
                  </h3>
                  <p className="text-xs font-mono text-off-white/80 mb-3 font-semibold">
                    {cert.standard}
                  </p>
                  <p className="text-xs text-off-white/60 leading-relaxed font-normal mb-4">
                    {cert.scopeSummary}
                  </p>

                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[10px] font-mono text-muted-gray uppercase block">
                      License / Audit ID:
                    </span>
                    <span className="text-xs font-mono text-accent font-semibold block mt-0.5">
                      {cert.licenseNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action: Download Scope PDF */}
              <div className="p-6 md:p-8 pt-0">
                <a
                  href={cert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine w-full py-3 bg-white/5 hover:bg-accent hover:text-charcoal border border-white/10 text-off-white text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>View Scope PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 16 Industry Accreditations Filter & Grid */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent block mb-2 font-semibold">
                Complete Compliance Portfolio
              </span>
              <h3 className="text-2xl font-bold uppercase tracking-tight text-off-white">
                16 Verified Standards &amp; Facility Authorizations
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {([
                { id: 'all', label: 'All (16)' },
                { id: 'esg', label: 'Organic & ESG' },
                { id: 'social', label: 'Social Ethics' },
                { id: 'quality', label: 'Quality & ISO' },
                { id: 'license', label: 'Brand Licensing' },
              ] satisfies { id: AccreditationFilter; label: string }[]).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-accent text-charcoal font-bold'
                      : 'bg-white/5 text-off-white/70 border border-white/10 hover:border-white/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {filteredAccreditations.map((item, idx) => (
              <div
                key={idx}
                className="premium-card group bg-[#121110] border border-white/10 hover:border-accent p-4 flex flex-col items-center text-center justify-between transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/95 p-1.5 flex items-center justify-center mb-3">
                  <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-off-white group-hover:text-accent transition-colors block">
                    {item.name}
                  </span>
                  <span className="text-[9px] font-mono text-off-white/50 block mt-1 line-clamp-2">
                    {item.status}
                  </span>
                </div>
                {item.hasPdf && (
                  <a
                    href={item.hasPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-[9px] font-mono uppercase tracking-wider text-accent hover:underline inline-flex items-center gap-1"
                  >
                    <span>PDF</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
