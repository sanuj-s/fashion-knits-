'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Download,
  ExternalLink,
  CheckCircle2,
  FileText,
  Calendar,
  Layers,
  Activity,
} from 'lucide-react';

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
    pdfUrl: '/assets/certificates/Scope_Certificate_GOTS.pdf',
    previewImage: '/assets/certificates/previews/preview_gots.png',
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
    pdfUrl: '/assets/certificates/Scope_Certificate_OCS.pdf',
    previewImage: '/assets/certificates/previews/preview_ocs.png',
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
    pdfUrl: '/assets/certificates/OEKO-TEX_Certificate.pdf',
    previewImage: '/assets/certificates/previews/preview_oekotex.png',
    statusBadge: 'CURRENT / VERIFIED AUDIT',
    validity: 'Annual Renewal Cycle',
  },
  {
    id: 'bsci',
    name: 'amfori BSCI / WRAP Compliance Audit',
    standard: 'amfori BSCI Code of Conduct & WRAP Gold Facility Audit',
    issuer: 'amfori BSCI / WRAP (Worldwide Responsible Accredited Production)',
    licenseNumber: 'Audit ID: 9322 (Avinashi / New Tirupur Facility)',
    scopeSummary:
      'Verified social compliance governing fair wages, maximum working hour limits, occupational health and safety, non-discrimination, collective bargaining rights, and strict prohibition of forced or child labor.',
    pdfUrl: '/assets/certificates/WRAP_BSCI_Audit_Certificate.pdf',
    previewImage: '/assets/certificates/previews/preview_bsci.png',
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
      <section className="bg-charcoal text-off-white pt-36 pb-20 px-6 md:px-16 lg:px-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-accent mb-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span className="text-off-white/70">Quality &amp; Certifications</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>Verified Compliance &amp; Inspection Systems</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-off-white">
                QUALITY &amp;<br />
                <span className="text-accent">CERTIFICATIONS.</span>
              </h1>
              <p className="text-sm sm:text-base text-off-white/80 mt-6 leading-relaxed">
                Complete traceability and uncompromising manufacturing discipline. Explore our verified scope certificates on file, in-house laboratory testing protocols, and 5-stage quality inspection system.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 max-w-sm">
              <span className="text-xs font-mono uppercase tracking-widest text-accent block mb-1">
                Zero Compromise Policy
              </span>
              <p className="text-xs text-off-white/70 leading-relaxed font-mono">
                Only verified, authentic certificates on file are published. Direct PDF verification available for international buyer compliance desks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Verified Scope Certificates with Scanned Previews */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-pure-white border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
              Verified Legal Documents On File
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal">
              Official Scope Certificates
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-2 max-w-2xl leading-relaxed">
              High-resolution document previews of our verified scope certificates. Click any certificate to open or download the complete official PDF.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VERIFIED_CERTIFICATES.map((cert) => (
              <div
                key={cert.id}
                className="group bg-off-white border border-charcoal/10 hover:border-accent transition-all duration-300 flex flex-col justify-between shadow-sm"
              >
                <div>
                  {/* High-Resolution Document Preview */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-charcoal/5 border-b border-charcoal/10">
                    <img
                      src={cert.previewImage}
                      alt={cert.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
                      loading="lazy"
                    />

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 bg-charcoal/90 text-[9px] font-mono uppercase tracking-widest text-accent font-bold border border-white/10">
                        {cert.statusBadge}
                      </span>
                    </div>

                    {/* License Number Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-2.5 bg-black/85 backdrop-blur-md text-off-white text-[10px] font-mono truncate">
                      {cert.licenseNumber}
                    </div>
                  </div>

                  {/* Document Summary */}
                  <div className="p-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold block">
                      {cert.validity}
                    </span>
                    <h3 className="text-base font-bold text-charcoal uppercase tracking-wider mt-1 group-hover:text-accent transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-[11px] font-mono text-muted-gray mt-1">
                      Issuer: {cert.issuer}
                    </p>
                    <p className="text-xs text-charcoal/70 leading-relaxed mt-3">
                      {cert.scopeSummary}
                    </p>
                  </div>
                </div>

                {/* PDF Download Button */}
                <div className="p-6 pt-0">
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-charcoal hover:bg-accent hover:text-charcoal text-off-white text-xs font-mono uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Scope PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Stage Quality Inspection Framework */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-off-white border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
              AQL 2.5 Major / 4.0 Minor Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal">
              5-Stage Quality Inspection Framework
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-2 max-w-2xl leading-relaxed">
              Every production order follows unified checkpoints from incoming yarn lot verification through 100% metal detector tunnels to Final Random Inspection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {QUALITY_STAGES.map((q) => (
              <div
                key={q.step}
                className="bg-pure-white p-6 border border-charcoal/10 flex flex-col justify-between hover:border-accent transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold font-mono text-charcoal/15">
                      {q.step}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-accent/15 text-charcoal font-semibold">
                      {q.standard}
                    </span>
                  </div>

                  <h3 className="text-base font-bold uppercase tracking-wider text-charcoal mb-2">
                    {q.name}
                  </h3>

                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    {q.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-charcoal/10 text-[10px] font-mono text-accent font-semibold">
                  ✓ {q.checkpoint}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations Matrix */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-pure-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
                Industry Accreditations Matrix
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal">
                Compliance &amp; Audit Portfolio
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Organic', 'Ethical Labor', 'Chemical Safety', 'Licensing'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-charcoal text-off-white font-bold'
                      : 'bg-off-white text-charcoal/70 hover:bg-charcoal/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAccreditations.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-off-white border border-charcoal/10 flex items-center justify-between gap-4 hover:border-accent/50 transition-colors"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold block">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-charcoal mt-0.5">
                    {item.name}
                  </h4>
                  <p className="text-[11px] font-mono text-charcoal/60 mt-1">
                    {item.status}
                  </p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
              </div>
            ))}
          </div>

          {/* Audit Booking Card */}
          <div className="mt-16 bg-charcoal text-off-white p-8 md:p-10 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-accent block mb-2">
                Third-Party Brand Audits
              </span>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                Scheduled Audits Welcomed Across Both Facilities
              </h3>
              <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed mt-2">
                Fashion Knits regularly hosts customer compliance teams, independent inspection agencies (SGS, Intertek, Bureau Veritas), and brand auditors across our Netaji Apparel Park factory and Angeripalayam corporate office.
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
        </div>
      </section>
    </div>
  );
}
