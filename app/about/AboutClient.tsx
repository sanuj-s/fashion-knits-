'use client';

import React from 'react';
import Link from 'next/link';
import {
  Factory,
  MapPin,
  Award,
  Users,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Globe,
  Quote,
} from 'lucide-react';

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
      {/* Editorial Header */}
      <section className="bg-charcoal text-off-white pt-36 pb-20 px-6 md:px-16 lg:px-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-accent mb-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span className="text-off-white/70">About Us</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
                <Factory className="w-3.5 h-3.5 text-accent" />
                <span>Our Heritage &amp; Infrastructure</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-off-white">
                ABOUT<br />
                <span className="text-accent">FASHION KNITS.</span>
              </h1>
              <p className="text-sm sm:text-base text-off-white/80 mt-6 leading-relaxed">
                A dedicated knitwear and garment manufacturing company based in Tiruppur, India. Structured across our Angeripalayam Road corporate headquarters and our Netaji Apparel Park production facility (Unit-1) to serve international fashion brands.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 max-w-sm">
              <span className="text-xs font-mono uppercase tracking-widest text-accent block mb-2">
                Manufacturing Core
              </span>
              <p className="text-xs text-off-white/70 leading-relaxed font-mono">
                Men&apos;s, Women&apos;s, Children&apos;s &amp; Infant Knits // GOTS &amp; OCS Certified Organic // OEKO-TEX® Class I // amfori BSCI Audited
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Managing Director Profile */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-pure-white border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
              Executive Governance
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal">
              Leadership &amp; Management Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* MD Profile Card */}
            <div className="lg:col-span-5 bg-off-white p-8 sm:p-10 border border-charcoal/10 relative">
              <div className="w-20 h-20 bg-charcoal text-accent flex items-center justify-center mb-6">
                <Users className="w-10 h-10" />
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

              <div className="mt-6 pt-6 border-t border-charcoal/10 text-xs sm:text-sm text-charcoal/70 leading-relaxed space-y-3">
                <p>
                  <em>Note: [Executive leadership biography, founder name, and photograph to be provided by Fashion Knits management.]</em>
                </p>
                <p>
                  Under executive direction, Fashion Knits has grown from specialized circular knitting foundations into a globally recognized export garment manufacturer, maintaining an unyielding focus on quality, ethical workplace standards, and transparent international buyer partnerships.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-charcoal/10 text-[11px] font-mono text-charcoal/80">
                <span>HEADQUARTERS: ANGERIPALAYAM MAIN ROAD, TIRUPPUR</span>
              </div>
            </div>

            {/* Leadership Vision & Quote */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-8 bg-charcoal text-off-white border border-white/10 relative overflow-hidden">
                <Quote className="w-10 h-10 text-accent/30 mb-4" />
                <h4 className="text-xl sm:text-2xl font-bold uppercase tracking-tight leading-snug">
                  &ldquo;In textile export, consistency is not a goal — it is the only viable business model.&rdquo;
                </h4>
                <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed mt-4">
                  Every garment that leaves our Netaji Apparel Park factory carries our reputation. We invest in precision circular knitting, automated CAD marker nesting, and certified eco-processing to guarantee that every stitch meets international buyer expectations season after season.
                </p>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-muted-gray">
                  <span>EXECUTIVE COMMITMENT</span>
                  <span className="text-accent">AQL 2.5 INSPECTION</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-off-white border border-charcoal/10">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal block mb-1">
                    Primary Office
                  </span>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    Angeripalayam Main Road: houses client merchandising, tech pack analysis, fabric swatch development, and sampling.
                  </p>
                </div>

                <div className="p-5 bg-off-white border border-charcoal/10">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal block mb-1">
                    Main Factory (Unit-1)
                  </span>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    Shed No. 29, Netaji Apparel Park: dedicated circular knitting, CAD multi-ply cutting, sewing lines, and export packing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Milestones */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-off-white border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
              Evolutionary Path
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal">
              Company Milestones &amp; Growth
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/70 mt-2 max-w-2xl leading-relaxed">
              The evolution of Fashion Knits from regional circular knitting foundations to international certified apparel manufacturing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {MILESTONES.map((m) => (
              <div
                key={m.phase}
                className="bg-pure-white p-6 border border-charcoal/10 flex flex-col justify-between hover:border-accent transition-colors shadow-sm"
              >
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold block mb-2">
                    {m.phase}
                  </span>
                  <h3 className="text-base font-bold uppercase tracking-wider text-charcoal mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-charcoal/10 text-[10px] font-mono text-muted-gray">
                  Tag: {m.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-pure-white border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
              Operating Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal">
              What Defines Fashion Knits
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="p-6 bg-off-white border border-charcoal/10 hover:border-accent transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-charcoal text-accent font-mono text-xs font-bold flex items-center justify-center mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold uppercase tracking-wider text-charcoal mb-2">
                  {val.title}
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Positions & Awards Placeholder Section */}
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 md:p-10 bg-pure-white border border-charcoal/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-widest mb-1">
                <Award className="w-4 h-4 text-accent" />
                <span>Industry Recognitions &amp; Positions</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-charcoal">
                Awards, Trade Memberships &amp; Industry Standing
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed mt-2">
                Active member within Tiruppur&apos;s knitwear export ecosystem. Specific regional trade council memberships (e.g. TEA, AEPC) and export awards will be populated upon official confirmation by Fashion Knits.
              </p>
              <p className="text-xs font-mono text-muted-gray mt-2 italic">
                [Trade Council Memberships &amp; Export Awards: details to be verified with company credentials]
              </p>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-charcoal text-off-white hover:bg-accent hover:text-charcoal text-xs font-mono uppercase tracking-widest font-bold transition-colors flex-shrink-0 cursor-pointer"
            >
              Contact Corporate Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
