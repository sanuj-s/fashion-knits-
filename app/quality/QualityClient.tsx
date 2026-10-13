'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Download,
  Check,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface VerifiedCertificate {
  id: string;
  name: string;
  standard: string;
  issuer: string;
  licenseNumber: string;
  scopeSummary: string;
  pdfUrl: string;
  previewImage: string;
  statusBadge: string;
  validity: string;
}

const VERIFIED_CERTIFICATES: VerifiedCertificate[] = [
  {
    id: 'gots',
    name: 'GOTS Organic Textile Standard',
    standard: 'Global Organic Textile Standard (GOTS) Version 7.0',
    issuer: 'USB Certification Denetim Gozetim ve Belgelendirme Hizmetleri A.S.',
    licenseNumber: 'USB TEX-5053-GOTS-2510.2 (License USB 005253)',
    scopeSummary:
      'Certified for Dyed fabrics (PC0025), Children’s apparel (PC0004), Men’s apparel (PC0001), Greige fabrics (PC0028), Women’s apparel (PC0002), Babies’ apparel (PC0003), and Greige yarns (PC0030). Processes: Dyeing, Finishing, Pre-treatment, Knitting, Manufacturing, Embroidery, Warehousing.',
    pdfUrl: '/assets/certificates/gots-organic-textile.pdf',
    previewImage: '/assets/certificates/previews/preview_gots.webp',
    statusBadge: 'CURRENT / VERIFIED AUDIT',
    validity: 'Valid until 2026-05-27',
  },
  {
    id: 'ocs',
    name: 'Organic Content Standard (OCS)',
    standard: 'Organic Content Standard (OCS) Version 3.0',
    issuer: 'USB Certification Denetim Gozetim ve Belgelendirme Hizmetleri A.S.',
    licenseNumber: 'USB-00007995-OCS-2510 (Client No: USB 005053)',
    scopeSummary:
      'Certified chain-of-custody for Organic 100 and Organic Blended knitted apparel across Men’s, Women’s, Children’s, and Infant categories. Verified traceability from audited organic cotton raw material to finished export garment.',
    pdfUrl: '/assets/certificates/ocs-organic-content.pdf',
    previewImage: '/assets/certificates/previews/preview_ocs.webp',
    statusBadge: 'CURRENT / VERIFIED AUDIT',
    validity: 'Valid until 2026-10-13',
  },
  {
    id: 'oekotex',
    name: 'OEKO-TEX® Standard 100',
    standard: 'OEKO-TEX® Standard 100 (Product Class I — Baby Safe)',
    issuer: 'Centexbel / OEKO-TEX® Association (Zurich, Switzerland)',
    licenseNumber: 'Certificate No. 2011149 (Annex 6)',
    scopeSummary:
      'Certified non-toxic chemical compliance for knitted apparel, dyed cotton fabrics, and babywear (Product Class I). Tested rigorously for harmful substances, pesticides, heavy metals, formaldehyde, and phthalates.',
    pdfUrl: '/assets/certificates/oeko-tex-standard-100.pdf',
    previewImage: '/assets/certificates/previews/preview_oekotex.png',
    statusBadge: 'CURRENT / VERIFIED AUDIT',
    validity: 'Annual Renewal Cycle',
  },
  {
    id: 'bsci',
    name: 'amfori BSCI Social Compliance Audit',
    standard: 'amfori BSCI Code of Conduct & Social Audit Protocol',
    issuer: 'amfori BSCI Independent Audit Partner',
    licenseNumber: 'Audit ID: 9322 (Avinashi / New Tirupur Facility)',
    scopeSummary:
      'Verified social compliance governing fair wages, maximum working hour limits, occupational health and safety, non-discrimination, collective bargaining rights, and strict prohibition of forced or child labor.',
    pdfUrl: '/assets/certificates/bsci-social-compliance.pdf',
    previewImage: '/assets/certificates/previews/preview_bsci.webp',
    statusBadge: 'CURRENT / VERIFIED AUDIT',
    validity: 'Facility Audited & Compliant',
  },
];

const QUALITY_STAGES = [
  {
    step: '01',
    name: 'Raw Material & Yarn Inspection',
    standard: '100% Lot Testing',
    description:
      'Every yarn shipment from partner spinning mills undergoes CSP tensile testing, yarn count verification, moisture percentage checks, twist per meter (TPM), and hairiness index testing.',
    checkpoint: 'Uster Evenness & Tensile Strength Signoff',
  },
  {
    step: '02',
    name: 'Greige & Dyed Fabric Audit',
    standard: '4-Point Inspection System',
    description:
      'Knitted rolls inspected on illuminated tables for barre, holes, dropped stitches, and spirality. Dyed fabrics verified with spectrophotometer under D65/TL84 lighting for Delta-E < 0.5 shade consistency.',
    checkpoint: 'Delta-E < 0.5 & 4-Point System Pass',
  },
  {
    step: '03',
    name: 'In-Line Sewing & Seam Auditing',
    standard: 'AQL 1.5 In-Line Level',
    description:
      'Continuous roaming QA inspectors monitor stitch density (SPI), seam elasticity, critical measurements against buyer tech pack grading sheets, and correct needle size usage on every modular sewing line.',
    checkpoint: 'Critical Measurement Tech Pack Tolerance ±0.5cm',
  },
  {
    step: '04',
    name: '100% Calibrated Needle Detector Scan',
    standard: '0.8mm Ferrous Calibration',
    description:
      'Zero broken needle policy. 100% of finished garments pass through dual-head conveyorized metal detector tunnels calibrated to 0.8mm ferrous spheres before carton packaging.',
    checkpoint: '100% Calibration Log & Metal-Free Certification',
  },
  {
    step: '05',
    name: 'Final Random Inspection (FRI)',
    standard: 'ISO 2859-1 / AQL 2.5 Major',
    description:
      'Independent QA auditors conduct random carton sampling checking carton gross weight, drop test integrity, barcode legibility, garment hand-feel, folding, and moisture barrier polybagging.',
    checkpoint: 'Formal AQL 2.5 Final Inspection Certificate',
  },
];

const ACCREDITATIONS_LIST = [
  { name: 'GOTS Version 7.0', category: 'Organic', status: 'Verified Scope Certificate On File' },
  { name: 'Organic Content Standard (OCS 100 / Blended)', category: 'Organic', status: 'Verified Scope Certificate On File' },
  { name: 'OEKO-TEX® Standard 100 Class I', category: 'Chemical Safety', status: 'Verified Certificate On File' },
  { name: 'amfori BSCI Social Compliance', category: 'Ethical Labor', status: 'Verified Audit #9322 On File' },
  { name: 'WRAP Worldwide Responsible Accredited Production', category: 'Ethical Labor', status: 'Verified Audit Protocol' },
  { name: 'Sedex SMETA 4-Pillar Protocol', category: 'Ethical Labor', status: 'Sedex Registered Facility' },
  { name: 'Better Cotton Initiative (BCI)', category: 'Sustainable Fibers', status: 'Supply Chain Partner Allocation' },
  { name: 'Global Recycled Standard (GRS)', category: 'Sustainable Fibers', status: 'Recycled Fiber Allocation' },
  { name: 'Higg Index (FEM / FSLM)', category: 'Environmental', status: 'Environmental Facility Module' },
  { name: 'ISO 9001:2015 Quality Management', category: 'Management', status: 'QMS Operational Alignment' },
  { name: 'ISO 14001:2015 Environmental Management', category: 'Environmental', status: 'EMS Operational Alignment' },
  { name: 'Disney FAMA (Facility & Merchandise Authorization)', category: 'Licensing', status: 'Character License Audit Compliant' },
  { name: 'LEGO Certified Facility Approval', category: 'Licensing', status: 'Audited Licensee Manufacturing Partner' },
];

export function QualityClient() {
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredAccreditations =
    filterCategory === 'All'
      ? ACCREDITATIONS_LIST
      : ACCREDITATIONS_LIST.filter((a) => a.category === filterCategory);

  return (
    <div className="bg-warm-white text-charcoal">
      {/* Editorial Header */}
      <section className="grain relative bg-charcoal text-off-white pt-40 pb-28 px-6 md:px-16 lg:px-24 border-b border-white/10 overflow-hidden">
        <div className="max-w-[90rem] mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-accent mb-8">
            <Link href="/" className="hover:text-off-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-off-white/80">Quality &amp; Certifications</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-accent font-semibold mb-6">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>Verified Compliance &amp; Inspection Systems</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.95]">
                <span className="block text-off-white">QUALITY &amp;</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#f0dcae] to-accent mt-1">
                  CERTIFICATIONS.
                </span>
              </h1>
              <p className="text-base sm:text-xl text-off-white/75 mt-8 max-w-2xl leading-relaxed font-normal">
                Complete traceability and uncompromising manufacturing discipline. Explore our verified scope certificates on file, in-house laboratory testing protocols, and 5-stage quality inspection system.
              </p>
            </div>

            <div className="p-8 bg-black/40 border border-white/10 backdrop-blur-md max-w-md flex-shrink-0">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mb-2">
                Zero Compromise Policy
              </span>
              <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed font-mono">
                Only verified, authentic certificates on file are published. Direct PDF verification available for international buyer compliance desks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Verified Scope Certificates Showcase */}
      <section className="py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-pure-white border-b border-charcoal/10">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
              01 // Scope Certificates
            </span>
          </div>

          <SectionHeading
            title={'LEGAL DOCUMENTS\nON FILE.'}
            subtitle="High-resolution document previews of our verified scope certificates. Click any certificate to open or download the complete official PDF."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 md:mt-24">
            {VERIFIED_CERTIFICATES.map((cert) => (
              <div
                key={cert.id}
                className="group bg-warm-white border border-charcoal/10 hover:border-accent hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* High-Resolution Document Preview */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-charcoal/5 border-b border-charcoal/10">
                    <picture className="w-full h-full">
                      <source type="image/webp" srcSet={cert.previewImage} />
                      <img
                        src={cert.previewImage.replace('.webp', '.png')}
                        alt={cert.name}
                        className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </picture>

                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 bg-charcoal/90 text-[9px] font-mono uppercase tracking-widest text-accent font-bold border border-white/10">
                        {cert.statusBadge}
                      </span>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 p-2.5 bg-black/85 backdrop-blur-md text-off-white text-[10px] font-mono truncate">
                      {cert.licenseNumber}
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold block mb-1">
                      {cert.validity}
                    </span>
                    <h3 className="text-xl font-bold uppercase tracking-wider text-charcoal mb-2 group-hover:text-accent transition-colors duration-300">
                      {cert.name}
                    </h3>
                    <p className="text-xs font-mono text-charcoal/80 mb-3 font-semibold">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-charcoal/70 leading-relaxed font-normal mb-6">
                      {cert.scopeSummary}
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-8 pt-0">
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine w-full py-3 bg-charcoal hover:bg-accent hover:text-charcoal text-off-white text-xs font-mono uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Official PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Stage Inspection Protocol */}
      <section className="grain relative py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-charcoal text-off-white border-b border-white/10">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
              02 // QA Systems
            </span>
          </div>

          <SectionHeading
            title={'5-STAGE QUALITY\nINSPECTION SYSTEM.'}
            subtitle="Engineered quality checkpoints operating at every phase from raw spinning yarn to bonded container loading."
            light={true}
          />

          <div className="space-y-6 mt-16 md:mt-24">
            {QUALITY_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="group p-8 md:p-10 bg-[#161413] border border-white/10 hover:border-accent hover:shadow-2xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
              >
                <div className="flex items-start gap-6">
                  <span className="text-3xl md:text-4xl font-mono font-bold text-accent">
                    {stage.step}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold block mb-1">
                      {stage.standard}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-off-white mb-2 group-hover:text-accent transition-colors duration-300">
                      {stage.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed font-normal max-w-3xl">
                      {stage.description}
                    </p>
                  </div>
                </div>

                <div className="lg:w-80 flex-shrink-0 pt-4 lg:pt-0 lg:border-l lg:border-white/10 lg:pl-8">
                  <span className="text-[10px] font-mono uppercase text-muted-gray block mb-1">
                    Checkpoint Signoff:
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-off-white/90">
                    <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span>{stage.checkpoint}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Accreditations Roster */}
      <section className="py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-warm-white">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
                03 // Compliance Roster
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal">
                13 Audited Accreditations &amp; Protocols
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Organic', 'Chemical Safety', 'Ethical Labor', 'Sustainable Fibers', 'Licensing'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-charcoal text-off-white font-bold'
                      : 'bg-pure-white text-charcoal/70 border border-charcoal/10 hover:border-charcoal/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAccreditations.map((acc, idx) => (
              <div
                key={idx}
                className="group p-6 bg-pure-white border border-charcoal/10 hover:border-accent hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold px-2 py-0.5 border border-accent/30 bg-accent/5 inline-block mb-3">
                    {acc.category}
                  </span>
                  <h3 className="text-base font-bold uppercase tracking-wider text-charcoal mb-2">
                    {acc.name}
                  </h3>
                  <p className="text-xs font-mono text-charcoal/70">
                    {acc.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
