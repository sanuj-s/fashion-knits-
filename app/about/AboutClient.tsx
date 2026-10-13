'use client';

import React from 'react';
import Link from 'next/link';
import {
  Factory,
  Award,
  Users,
  Quote,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const MILESTONES = [
  {
    phase: 'PHASE 01',
    title: 'Textile Foundations in Tiruppur',
    description:
      'Established high-gauge circular knitting infrastructure in India\'s premier knitwear hub, engineering single jersey, pique, and interlock fabrics for regional apparel exporters.',
    tag: 'Knitting Infrastructure',
  },
  {
    phase: 'PHASE 02',
    title: 'Certified Processing Partnerships',
    description:
      'Formed long-standing alliances with certified soft-flow dyeing and processing houses, ensuring computerized color matching, tight shrinkage control, and zero liquid discharge standards.',
    tag: 'Certified Wet Processing',
  },
  {
    phase: 'PHASE 03',
    title: 'Netaji Apparel Park Expansion (Unit-1)',
    description:
      'Established our primary garment manufacturing plant at Shed No. 29, Netaji Apparel Park, scaling computer-aided CAD cutting, modular lean sewing lines, and export finishing.',
    tag: 'NAP Unit-1 Expansion',
  },
  {
    phase: 'PHASE 04',
    title: 'Organic & Chemical Accreditations',
    description:
      'Attained verified GOTS Organic Cotton (v7.0), OCS 100, and OEKO-TEX® Standard 100 (Product Class I baby-safe) certifications, creating a verified non-toxic supply chain.',
    tag: 'GOTS & OEKO-TEX',
  },
  {
    phase: 'PHASE 05',
    title: 'Social Audits & Character Licensing',
    description:
      'Achieved amfori BSCI and SMETA 4-pillar social compliance audits, alongside international facility authorizations including Disney FAMA and LEGO licensee approvals.',
    tag: 'BSCI & Disney FAMA',
  },
];

const CORE_VALUES = [
  {
    title: 'Integrity & Accountability',
    description:
      'We operate transparent supply chains. From yarn lot traceability to honest delivery timelines, buyers receive unfiltered operational visibility.',
  },
  {
    title: 'Precision Craftsmanship',
    description:
      'Zero defect mindset. Every garment panel is inspected for stitch density, seam burst strength, and calibrated ±0.5cm tech pack tolerances.',
  },
  {
    title: 'Ethical Workforce Governance',
    description:
      'Fair living wages, safe working environments, clean water, medical coverage, and complete prohibition of child or forced labor.',
  },
  {
    title: 'Environmental Stewardship',
    description:
      'Prioritizing GOTS certified organic fibers, ZDHC-compliant non-toxic dyestuffs, and packaging made from FSC-certified or recycled paper.',
  },
];

export function AboutClient() {
  return (
    <div className="bg-warm-white text-charcoal">
      {/* Editorial Hero Header */}
      <section className="grain relative bg-charcoal text-off-white pt-40 pb-28 px-6 md:px-16 lg:px-24 border-b border-white/10 overflow-hidden">
        <div className="max-w-[90rem] mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-accent mb-8">
            <Link href="/" className="hover:text-off-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-off-white/80">About Us</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-accent font-semibold mb-6">
                <Factory className="w-3.5 h-3.5 text-accent" />
                <span>Our Heritage &amp; Infrastructure</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.95]">
                <span className="block text-off-white">ABOUT</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#f0dcae] to-accent mt-1">
                  FASHION KNITS.
                </span>
              </h1>
              <p className="text-base sm:text-xl text-off-white/75 mt-8 max-w-2xl leading-relaxed font-normal">
                A dedicated knitwear and garment manufacturing company based in Tiruppur, India. Structured across our Angeripalayam Road corporate headquarters and our Netaji Apparel Park production facility (Unit-1) to serve international fashion brands.
              </p>
            </div>

            <div className="p-8 bg-black/40 border border-white/10 backdrop-blur-md max-w-md flex-shrink-0">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mb-2">
                Manufacturing Core
              </span>
              <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed font-mono">
                Men&apos;s, Women&apos;s, Children&apos;s &amp; Infant Knits // GOTS &amp; OCS Certified Organic // OEKO-TEX® Class I // amfori BSCI Audited
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Showcase */}
      <section className="py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-pure-white border-b border-charcoal/10">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
              01 // Two Strategic Facilities
            </span>
          </div>

          <SectionHeading
            title={'WHERE HEADQUARTERS\nMEETS PRODUCTION.'}
            subtitle="Separating administrative focus from factory execution to guarantee dedicated client servicing and precision manufacturing."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-16 md:mt-24">
            {/* Unit 1 */}
            <div className="group bg-warm-white border border-charcoal/10 overflow-hidden shadow-sm hover:border-accent hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal">
                <picture className="w-full h-full">
                  <source type="image/webp" srcSet="/assets/facilities/factory_netaji_park.webp" />
                  <img
                    src="/assets/facilities/factory_netaji_park.jpg"
                    alt="Netaji Apparel Park Plant"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal/90 text-accent text-[10px] font-mono font-bold uppercase tracking-widest border border-white/20">
                    <Factory className="w-3.5 h-3.5 text-accent" />
                    Unit-1 Production Facility
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold uppercase tracking-tight text-charcoal mb-3 group-hover:text-accent transition-colors duration-300">
                  Netaji Apparel Park (Unit-1) Main Plant
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed font-normal">
                  Shed No. 29, Netaji Apparel Park: dedicated 20,000+ sq.ft production plant housing circular knitting, CAD multi-ply cutting, sewing assembly lines, and export packing.
                </p>
                <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-center justify-between text-xs font-mono text-muted-gray">
                  <span>CAPACITY: KNITTING &amp; SEWING</span>
                  <span className="text-accent font-semibold">TIRUPPUR</span>
                </div>
              </div>
            </div>

            {/* Corporate HQ */}
            <div className="group bg-warm-white border border-charcoal/10 overflow-hidden shadow-sm hover:border-accent hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal">
                <picture className="w-full h-full">
                  <source type="image/webp" srcSet="/assets/facilities/office_angeripalayam.webp" />
                  <img
                    src="/assets/facilities/office_angeripalayam.jpg"
                    alt="Corporate Office Angeripalayam"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal/90 text-accent text-[10px] font-mono font-bold uppercase tracking-widest border border-white/20">
                    <Building2 className="w-3.5 h-3.5 text-accent" />
                    Corporate HQ &amp; Showroom
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-bold uppercase tracking-tight text-charcoal mb-3 group-hover:text-accent transition-colors duration-300">
                  Angeripalayam Corporate Office &amp; Sampling
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed font-normal">
                  Angeripalayam Main Road: central corporate headquarters managing technical merchandising, fabric swatch development, Pantone lab dips, proto sampling, and buyer liaisons.
                </p>
                <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-center justify-between text-xs font-mono text-muted-gray">
                  <span>MERCHANDISING &amp; SAMPLING</span>
                  <span className="text-accent font-semibold">TIRUPPUR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Management Philosophy */}
      <section className="py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-off-white border-b border-charcoal/10">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
              02 // Executive Governance
            </span>
          </div>

          <SectionHeading
            title={'LEADERSHIP &\nMANAGEMENT PHILOSOPHY.'}
            subtitle="Guiding principles of quality, ethical workplace standards, and transparent buyer partnerships."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-16 md:mt-24">
            {/* MD Profile Card */}
            <div className="lg:col-span-5 bg-pure-white p-8 sm:p-12 border border-charcoal/10 shadow-sm">
              <div className="w-16 h-16 bg-charcoal text-accent flex items-center justify-center mb-6">
                <Users className="w-8 h-8" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold block mb-1">
                Executive Leadership
              </span>
              <h3 className="text-2xl font-bold uppercase tracking-wider text-charcoal">
                [Managing Director Profile]
              </h3>
              <p className="text-xs font-mono text-muted-gray mt-1">
                Fashion Knits // Tiruppur, India
              </p>

              <div className="mt-6 pt-6 border-t border-charcoal/10 text-xs sm:text-sm text-charcoal/70 leading-relaxed space-y-3 font-normal">
                <p>
                  <em>Note: [Executive leadership biography, founder name, and photograph to be provided by Fashion Knits management.]</em>
                </p>
                <p>
                  Under executive direction, Fashion Knits has grown from specialized circular knitting foundations into a globally recognized export garment manufacturer, maintaining an unyielding focus on quality, ethical workplace standards, and transparent international buyer partnerships.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-charcoal/10 text-[11px] font-mono text-charcoal/80">
                <span>HEADQUARTERS: ANGERIPALAYAM MAIN ROAD, TIRUPPUR</span>
              </div>
            </div>

            {/* Leadership Vision & Quote */}
            <div className="lg:col-span-7 space-y-8">
              <div className="grain relative p-8 md:p-12 bg-charcoal text-off-white border border-white/10 shadow-xl overflow-hidden">
                <Quote className="w-10 h-10 text-accent/30 mb-4" />
                <h4 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight leading-snug">
                  &ldquo;In textile export, consistency is not a goal — it is the only viable business model.&rdquo;
                </h4>
                <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed mt-5">
                  Every garment that leaves our Netaji Apparel Park factory carries our reputation. We invest in precision circular knitting, automated CAD marker nesting, and certified eco-processing to guarantee that every stitch meets international buyer expectations season after season.
                </p>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-off-white/60">
                  <span>EXECUTIVE COMMITMENT</span>
                  <span className="text-accent font-semibold">AQL 2.5 INSPECTION</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-pure-white border border-charcoal/10 shadow-sm">
                <AnimatedCounter value={20000} suffix="+" label="Sq.Ft Facility" />
                <AnimatedCounter value={100} suffix="%" label="Needle Detection" />
                <AnimatedCounter value={2} prefix="AQL " suffix=".5" label="Quality Standard" />
                <AnimatedCounter value={16} suffix=" Standards" label="Audited Roster" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Milestones */}
      <section className="grain relative py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-charcoal text-off-white border-b border-white/10">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
              03 // Company Evolution
            </span>
          </div>

          <SectionHeading
            title={'MILESTONES &\nGROWTH.'}
            subtitle="The evolution of Fashion Knits from regional circular knitting foundations to international certified apparel manufacturing."
            light={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-16 md:mt-24">
            {MILESTONES.map((m) => (
              <div
                key={m.phase}
                className="group bg-[#161413] p-8 border border-white/10 hover:border-accent hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold block mb-4">
                    {m.phase}
                  </span>
                  <h3 className="text-lg font-bold uppercase tracking-wider text-off-white mb-2 group-hover:text-accent transition-colors duration-300">
                    {m.title}
                  </h3>
                  <p className="text-xs text-off-white/70 leading-relaxed font-normal">
                    {m.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 text-[11px] font-mono text-muted-gray">
                  <span>{m.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-pure-white border-b border-charcoal/10">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
              04 // Operating Principles
            </span>
          </div>

          <SectionHeading
            title={'WHAT DEFINES\nFASHION KNITS.'}
            subtitle="The ethical and operational benchmarks embedded across our organization."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-24">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="group p-8 bg-warm-white border border-charcoal/10 hover:border-accent hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div className="w-10 h-10 bg-charcoal text-accent font-mono text-xs font-bold flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-charcoal transition-colors duration-300">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-charcoal mb-2">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-normal">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Standing Banner */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-warm-white">
        <div className="max-w-[90rem] mx-auto">
          <div className="p-8 md:p-12 bg-pure-white border border-charcoal/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-sm">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-widest font-semibold mb-2">
                <Award className="w-4 h-4 text-accent" />
                <span>Industry Recognitions &amp; Positions</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-charcoal">
                Awards, Trade Memberships &amp; Industry Standing
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed mt-2">
                Active member within Tiruppur&apos;s knitwear export ecosystem. Specific regional trade council memberships (e.g. TEA, AEPC) and export awards will be populated upon official confirmation by Fashion Knits.
              </p>
              <p className="text-xs font-mono text-muted-gray mt-2 italic">
                [Trade Council Memberships &amp; Export Awards: details to be verified with company credentials]
              </p>
            </div>

            <Link
              href="/#contact"
              className="btn-shine px-8 py-4 bg-accent text-charcoal text-xs font-mono uppercase tracking-widest font-bold transition-all duration-300 flex-shrink-0 cursor-pointer shadow-sm"
            >
              Contact Corporate Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
