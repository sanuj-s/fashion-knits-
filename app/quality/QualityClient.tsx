import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { BrandStandards } from '@/components/sections/BrandStandards';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ClipboardCheck,
  FileText,
  FlaskConical,
  Ruler,
  Shirt,
  SwatchBook,
} from 'lucide-react';

const PROCESS_STAGES = [
  {
    number: '01',
    title: 'Set the specification',
    detail: 'Align the tech pack or reference garment, material direction, shade standard and inspection requirements.',
  },
  {
    number: '02',
    title: 'Review materials',
    detail: 'Agree what to verify at receipt: fabric identity, colour, condition and any buyer-required testing.',
  },
  {
    number: '03',
    title: 'Approve the sample',
    detail: 'Confirm fit, construction, measurements, trims and labels on the approved sample before bulk production.',
  },
  {
    number: '04',
    title: 'Plan production checks',
    detail: 'Set review points, acceptance criteria, record format and the route for resolving a finding.',
  },
  {
    number: '05',
    title: 'Finish & final review',
    detail: 'Agree checks for garment appearance, measurements, workmanship and presentation before packing.',
  },
  {
    number: '06',
    title: 'Prepare for dispatch',
    detail: 'Review agreed quality records, labels, carton details and destination documents before shipment handoff.',
  },
];

const DOCUMENTS = [
  {
    name: 'GOTS scope certificate',
    kind: 'Organic textile standard · Scope certificate',
    status: 'Local copy expired · 27 Sep 2026',
    statusTone: 'expired',
    preview: '/assets/certificates/previews/preview_gots.webp',
    previewAlt: 'First page preview of the Fashion Knits GOTS scope certificate',
    href: '/assets/certificates/gots-organic-textile.pdf',
    scope: [
      'Entity: Fashion Knits. The facility appendix lists 81/82 Angeripalayam Main Road and Shed No. 29, Nethaji Apparel Park, Tiruppur.',
      'Products include knitted and dyed fabrics, apparel and greige yarn. Listed processes include knitting, dyeing, finishing, pre-treatment, manufacturing, embroidery and embellishment; starred processes may be subcontracted.',
      'Local PDF states validity through 27 September 2026. Scope certificates do not prove that a specific shipment is certified; transaction documents are needed for applicable goods.',
    ],
  },
  {
    name: 'OCS scope certificate',
    kind: 'Organic Content Standard · Scope certificate',
    status: 'Local copy expired · 13 Oct 2026',
    statusTone: 'expired',
    preview: '/assets/certificates/previews/preview_ocs.webp',
    previewAlt: 'First page preview of the Fashion Knits OCS scope certificate',
    href: '/assets/certificates/ocs-organic-content.pdf',
    scope: [
      'Entity: Fashion Knits. The facility appendix lists 81/82 Angeripalayam Main Road and Shed No. 29, Nethaji Apparel Park, Tiruppur.',
      'Products include apparel, dyed fabrics and greige fabrics. Listed processes include knitting, dyeing, finishing, pre-treatment, printing, manufacturing, embroidery and embellishment; starred processes may be subcontracted.',
      'Local PDF states validity through 13 October 2026. A valid transaction certificate or equivalent is required to support an OCS claim for specific goods.',
    ],
  },
  {
    name: 'OEKO-TEX® STANDARD 100',
    kind: 'Product certification · Printing Division',
    status: 'Local copy states validity to 30 Nov 2026',
    statusTone: 'stated',
    preview: '/assets/certificates/previews/preview_oekotex.png',
    previewAlt: 'First page preview of the Fashion Knits OEKO-TEX STANDARD 100 certificate',
    href: '/assets/certificates/oeko-tex-standard-100.pdf',
    scope: [
      'Entity and facility: Fashion Knits (Printing Division), 81/82 Angeripalayam Main Road, Gandhi Nagar Post, Tiruppur.',
      'Scope: commission printing on knitted/woven fabrics of cotton (including organic/recycled), modal, polyester (including recycled), viscose and blends of these fibres, with or without elastane. Listed print processes: pigment, non-PVC and discharge (including AOP). Product Class I (Annex 6).',
      'The local copy states validity to 30 November 2026. Issuer status has not been independently checked; this scope is limited to the printing division and specified products.',
    ],
  },
  {
    name: 'WRAP Certificate of Compliance',
    kind: 'Facility compliance certificate · WRAP certificate',
    status: 'Period on copy · 1 Jun 2026–1 Jun 2027',
    statusTone: 'stated',
    preview: '/assets/certificates/previews/preview_bsci.webp',
    previewAlt: 'First page preview of a WRAP Certificate of Compliance for Fashion Knits Branch',
    href: '/assets/certificates/bsci-social-compliance.pdf',
    scope: [
      'The supplied PDF is a WRAP Certificate of Compliance, not an amfori BSCI audit record. It names Fashion Knits Branch at Survey No. 5, Door No./Shed No. 29, Apparel Park, Eettiveerampalayam, Avinashi, Tiruppur.',
      'Listed processes: cutting, sewing, trimming, checking, ironing and packing. The copy shows WRAP number 9322 and a certification period of 1 June 2026 to 1 June 2027.',
      'The certificate and issuer status have not been independently verified. Request a current copy and confirm that the facility and production processes for the order are covered.',
    ],
  },
] as const;

function SectionEyebrow({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <p className={`mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px] ${tone === 'dark' ? 'text-[#d1b373]' : 'text-[#795d34]'}`}>
      <span aria-hidden="true" className={`h-px w-8 ${tone === 'dark' ? 'bg-[#d1b373]' : 'bg-[#9e7a41]'}`} />
      {children}
    </p>
  );
}

function RepresentativeFigure({
  src,
  alt,
  caption,
  className = '',
  priority = false,
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`relative isolate overflow-hidden rounded-[1.2rem] bg-[#d6d0c5] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 44vw"
        className="object-cover"
        {...(priority ? { preload: true } : { loading: 'lazy' as const })}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#191815]/70 via-transparent to-[#191815]/15" />
      <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#1b1a17]/55 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:left-5 sm:top-5">
        Representative image
      </span>
      <figcaption className="absolute bottom-4 left-4 right-4 text-xs font-medium leading-5 text-white sm:bottom-5 sm:left-5 sm:right-5 sm:text-sm">
        {caption}
      </figcaption>
    </figure>
  );
}

export function QualityClient() {
  return (
    <div className="overflow-hidden bg-[#faf8f5] text-[#25231f]">
      <section className="relative isolate overflow-hidden bg-[#171614] px-5 pb-12 pt-28 text-[#faf8f5] sm:px-8 sm:pb-16 sm:pt-32 lg:px-16 lg:pb-20 lg:pt-36">
        <Image
          src="/assets/images/quality-hero-inspection.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="z-0 object-cover object-[center_48%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(23,22,20,0.98)_0%,rgba(23,22,20,0.95)_38%,rgba(23,22,20,0.84)_68%,rgba(23,22,20,0.66)_100%),linear-gradient(0deg,rgba(23,22,20,0.82)_0%,rgba(23,22,20,0.18)_55%,rgba(23,22,20,0.34)_100%)]"
        />
        <div className="relative z-10 mx-auto flex min-h-[34rem] max-w-[88rem] flex-col justify-between sm:min-h-[38rem] lg:min-h-[39rem]">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span aria-current="page" className="text-white/85">Quality</span>
          </nav>

          <div className="flex flex-1 items-center py-12 sm:py-16 lg:py-20">
            <div className="max-w-[54rem] py-2">
              <SectionEyebrow tone="dark">Quality assurance · Tiruppur, India</SectionEyebrow>
              <h1 className="max-w-4xl text-[clamp(3rem,7.8vw,7.2rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
                Quality Built Into <span className="block text-white/55">Every Stage.</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
                We work with apparel brands to align knitwear specifications, approved samples and inspection plans before bulk production. Each order has a clear reference for what to check and when.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="#contact" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#cfad70] px-6 text-[10px] font-bold uppercase tracking-[0.13em] text-[#201d17] transition-colors hover:bg-[#e1c58e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfad70]">
                  Discuss Your Quality Requirements <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <a href="#quality-process" className="inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-white/65 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfad70]">
                  See the process <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              </div>
              <p className="mt-8 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/65">
                <ClipboardCheck aria-hidden="true" className="h-4 w-4 text-[#cfad70]" />
                Buyer-aligned requirements · Order by order
              </p>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-3 border-t border-white/15 pt-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/50 sm:mt-14 sm:text-[10px]">
            <span>Materials</span><span className="text-center">Workmanship</span><span className="text-right">Dispatch readiness</span>
          </div>
        </div>
      </section>

      <section id="quality-process" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[88rem]">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SectionEyebrow>01 / The order journey</SectionEyebrow>
              <h2 className="max-w-4xl text-[clamp(2.35rem,5vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.065em]">One clear standard, carried through the order.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#25231f]/65 lg:col-span-4 lg:pb-1">
              Set the product reference and inspection expectations early, then carry them through sample approval, production and shipment preparation.
            </p>
          </div>

          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 xl:grid-cols-6">
            {PROCESS_STAGES.map((stage) => (
              <li key={stage.number} className="relative rounded-[1rem] border border-[#25231f]/10 bg-white p-5 sm:p-6 xl:min-h-[17rem]">
                <span className="font-mono text-[10px] tracking-[0.12em] text-[#795d34]">{stage.number} <span className="text-[#25231f]/70">/ 06</span></span>
                <h3 className="mt-7 text-lg font-medium leading-snug tracking-[-0.035em]">{stage.title}</h3>
                <p className="mt-3 text-xs leading-5 text-[#25231f]/70">{stage.detail}</p>
                {stage.number !== '06' && <span aria-hidden="true" className="absolute right-5 top-5 hidden h-px w-7 bg-[#c5a56d] xl:block" />}
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-4xl text-[11px] leading-5 text-[#5f5b54]">Inspection points, acceptance criteria and records are agreed for the buyer’s product and order; a single fixed sampling level is not assumed.</p>
        </div>
      </section>

      <section className="border-y border-[#25231f]/8 bg-[#f1eee8] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[88rem] items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <RepresentativeFigure
            src="/assets/images/capability_assembly.webp"
            alt="Representative close view of garment construction at a sewing machine"
            caption="Construction and seam finish are reviewed against the approved sample"
            className="aspect-[1.13/1] sm:aspect-[1.4/1] lg:aspect-[1.08/1]"
          />
          <div className="lg:py-8">
            <SectionEyebrow>02 / Material &amp; workmanship</SectionEyebrow>
            <h2 className="max-w-2xl text-[clamp(2.3rem,4.8vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.065em]">Make the details measurable.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#25231f]/65">
              The check plan follows the approved sample and technical pack. Buyers can define the material, garment and workmanship points that matter to their product.
            </p>
            <ul className="mt-7 divide-y divide-[#25231f]/12 border-y border-[#25231f]/12">
              <li className="flex gap-4 py-4"><SwatchBook aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#967644]" /><p className="text-sm leading-6"><strong className="font-semibold">Material and shade.</strong> Confirm fabric construction, visible condition and colour against the approved reference.</p></li>
              <li className="flex gap-4 py-4"><Ruler aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#967644]" /><p className="text-sm leading-6"><strong className="font-semibold">Measurement and fit.</strong> Use the agreed points, size set and tolerances from the order specification.</p></li>
              <li className="flex gap-4 py-4"><Shirt aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#967644]" /><p className="text-sm leading-6"><strong className="font-semibold">Construction and finish.</strong> Review seams, stitches, joins, trims, labels and overall appearance against the approved sample.</p></li>
            </ul>
            <p className="mt-4 text-[10px] leading-5 text-[#5f5b54]">Check methods, tolerances and required records are confirmed with the buyer for each style.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[88rem] items-center gap-8 lg:grid-cols-[1fr_0.88fr] lg:gap-16">
          <div className="order-2 lg:order-1">
                <SectionEyebrow>03 / Testing &amp; technical verification</SectionEyebrow>
            <h2 className="max-w-3xl text-[clamp(2.3rem,4.8vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.065em]">Test to the product brief.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#25231f]/65">
              Test requirements depend on the material, end use and destination. Agree the test method, sample, standard and report needed before bulk production.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <article className="rounded-[0.9rem] border border-[#25231f]/10 bg-white p-5">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#82673e]"><ClipboardCheck aria-hidden="true" className="h-4 w-4" /> In-house</p>
                <p className="mt-3 text-sm leading-6 text-[#25231f]/70">The material reviewed does not confirm an in-house laboratory or test equipment. Confirm any requested in-house checks for the specific order.</p>
              </article>
              <article className="rounded-[0.9rem] border border-[#25231f]/10 bg-white p-5">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#82673e]"><FlaskConical aria-hidden="true" className="h-4 w-4" /> External testing</p>
                <p className="mt-3 text-sm leading-6 text-[#25231f]/70">External lab testing can be discussed on request. Confirm the laboratory, method, scope, timing and report with the team before placing the order.</p>
              </article>
            </div>
            <p className="mt-4 text-[10px] leading-5 text-[#5f5b54]">No laboratory accreditation or blanket test capability is claimed on this page.</p>
          </div>
          <RepresentativeFigure
            src="/assets/images/capability_color_lab.webp"
            alt="Representative scene of a textile colour sample being reviewed beside testing equipment"
            caption="Illustrative technical verification setting; equipment and location are not identified as Fashion Knits facilities"
            className="order-1 aspect-[1.16/1] sm:aspect-[1.35/1] lg:order-2 lg:aspect-[0.96/1]"
          />
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#22211e] px-5 py-16 text-[#faf8f5] sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[88rem] items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <RepresentativeFigure
            src="/assets/images/contact_sampling_studio.webp"
            alt="Representative knitwear sample review with fabric swatches and colour references"
            caption="An approved sample and clear specification give the order a shared reference"
            className="aspect-[1.25/1] sm:aspect-[1.55/1] lg:aspect-[1.05/1]"
          />
          <div className="lg:py-6">
            <SectionEyebrow tone="dark">04 / Specification &amp; inspection planning</SectionEyebrow>
            <h2 className="max-w-3xl text-[clamp(2.3rem,4.7vw,4.35rem)] font-semibold leading-[0.95] tracking-[-0.065em]">Agree the reference before the run.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65">Before bulk, bring the product brief and buyer requirements into one order plan. This helps the production and inspection teams work from the same approved details.</p>
            <div className="mt-7 grid gap-x-6 sm:grid-cols-2">
              {[
                ['Tech pack & sample', 'Approved construction, fit and reference garment.'],
                ['Measurements', 'Points of measure, size set and tolerances.'],
                ['Inspection criteria', 'Buyer requirements, sample plan and reporting format.'],
                ['Labels & packing', 'Label placement, folding, assortment and carton details.'],
              ].map(([title, detail]) => (
                <div key={title} className="border-t border-white/15 py-4">
                  <h3 className="text-sm font-medium">{title}</h3>
                  <p className="mt-1 text-xs leading-5 text-white/65">{detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10px] leading-5 text-white/65">Inspection scope and records are set for each order, not treated as one universal checklist.</p>
          </div>
        </div>
      </section>

      <section id="certificates" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[88rem]">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SectionEyebrow>05 / Certifications &amp; compliance</SectionEyebrow>
              <h2 className="max-w-4xl text-[clamp(2.35rem,5vw,4.7rem)] font-semibold leading-[0.94] tracking-[-0.065em]">Documents, with scope in view.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#25231f]/70 lg:col-span-4 lg:pb-1">Review the facility, activities and product coverage on each document. A certificate or audit record does not automatically cover every product or shipment.</p>
          </div>

          <ul className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {DOCUMENTS.map((document) => (
              <li key={document.name} className="flex flex-col overflow-hidden rounded-[1rem] border border-[#25231f]/10 bg-white shadow-[0_14px_45px_rgba(42,36,27,.035)]">
                <div className="relative h-48 bg-[#f2efe9] sm:h-56">
                  <Image src={document.preview} alt={document.previewAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" loading="lazy" className="object-contain p-4" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[#25231f]/10 bg-white/95 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-[#25231f]/70 shadow-sm">
                    <FileText aria-hidden="true" className="h-3.5 w-3.5 text-[#967644]" /> {document.kind.split(' · ')[1] ?? document.kind}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className={`w-fit rounded-full px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] ${document.statusTone === 'expired' ? 'bg-[#f5e9e4] text-[#844636]' : 'bg-[#f2efe6] text-[#765e37]'}`}>
                    {document.status}
                  </span>
                  <h3 className="mt-4 text-lg font-medium leading-snug tracking-[-0.03em]">{document.name}</h3>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#6b665e]">{document.kind.split(' · ')[0]}</p>
                  <details className="group mt-4 border-t border-[#25231f]/10 pt-3">
                    <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#755d36] marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#967644] [&::-webkit-details-marker]:hidden">
                      Scope &amp; facility details
                      <span aria-hidden="true" className="text-lg leading-none transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <ul className="mt-2 space-y-2 text-[11px] leading-[1.55] text-[#25231f]/68">
                      {document.scope.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                  </details>
                  <a href={document.href} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-10 items-center gap-2 border-t border-[#25231f]/10 pt-3 text-[10px] font-bold uppercase tracking-[0.11em] text-[#25231f] transition-colors hover:text-[#8d6c39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#967644]">
                    Open original PDF <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-5xl border-l-2 border-[#c5a56d] pl-4 text-[11px] leading-5 text-[#5f5b54]">
            Dates and scope above are transcribed from the local copies reviewed on 15 October 2026. Current issuer status has not been independently verified. Request updated documents before presenting any certification or compliance claim as current.
          </p>
        </div>
      </section>

      <section className="border-y border-[#25231f]/10 bg-[#f1eee8] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <SectionEyebrow>06 / Traceability &amp; corrective action</SectionEyebrow>
            <h2 className="max-w-2xl text-[clamp(2.3rem,4.6vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.065em]">Make findings clear and actionable.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#25231f]/65">
              Agree the record and review path for the order before production starts. If a check identifies a difference, compare it with the approved specification and agree the next step with the responsible team and buyer where required.
            </p>
            <p className="mt-4 text-[10px] leading-5 text-[#5f5b54]">Record format, decision owner and approval route are defined per order; no specific digital tracking system is assumed.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:pt-2">
            {[
              { number: '01', title: 'Record', detail: 'Connect the observation to the style, sample and agreed check.' },
              { number: '02', title: 'Review', detail: 'Assess the difference against the buyer-approved requirement.' },
              { number: '03', title: 'Resolve', detail: 'Agree disposition, corrective action and any approval needed.' },
            ].map((item) => (
              <article key={item.number} className="rounded-[1rem] border border-[#25231f]/10 bg-white p-5 sm:p-6">
                <span className="font-mono text-[10px] tracking-[0.1em] text-[#967644]">{item.number}</span>
                <h3 className="mt-6 text-xl font-medium tracking-[-0.04em]">{item.title}</h3>
                <p className="mt-3 text-xs leading-5 text-[#25231f]/70">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[88rem] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <RepresentativeFigure
            src="/assets/images/process-garment-finishing.webp"
            alt="Representative image of a finished knit garment being pressed and smoothed"
            caption="Finishing is followed by a review against the buyer’s agreed order requirements"
            className="aspect-[1.25/1] sm:aspect-[1.55/1] lg:aspect-[1.18/1]"
          />
          <div>
            <SectionEyebrow>07 / Final inspection &amp; dispatch readiness</SectionEyebrow>
            <h2 className="max-w-3xl text-[clamp(2.3rem,4.7vw,4.3rem)] font-semibold leading-[0.95] tracking-[-0.065em]">Ready against the order brief.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#25231f]/65">Before shipment, review the points agreed for the finished garment and its presentation. The order plan defines inspection criteria, records and packing checks.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'Appearance and workmanship',
                'Measurements and size assortment',
                'Labels, folding and presentation',
                'Carton details and required documents',
              ].map((item) => <li key={item} className="flex gap-3 rounded-[0.75rem] border border-[#25231f]/10 bg-white p-4 text-xs font-medium leading-5"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#967644]" />{item}</li>)}
            </ul>
            <p className="mt-4 text-[10px] leading-5 text-[#5f5b54]">Buyer-specific inspection sampling and acceptance levels are confirmed for each order.</p>
          </div>
        </div>
      </section>

      <BrandStandards context="quality" />

      <section className="bg-[#1b1a18] px-5 py-16 text-[#faf8f5] sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-7 border-t border-white/15 pt-8 sm:pt-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <SectionEyebrow>Discuss an order</SectionEyebrow>
            <h2 className="text-[clamp(2.5rem,5.8vw,5.5rem)] font-semibold leading-[0.93] tracking-[-0.07em]">Let’s Define the Quality Your Brand Expects.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/60">Share your tech pack, reference sample, inspection criteria and testing requirements with the Fashion Knits team.</p>
          </div>
          <Link href="#contact" className="inline-flex min-h-12 w-fit shrink-0 items-center gap-3 rounded-full bg-[#cfad70] px-6 text-[10px] font-bold uppercase tracking-[0.13em] text-[#201d17] transition-colors hover:bg-[#e1c58e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfad70]">
            Discuss Your Requirements <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <p className="mx-auto mt-8 max-w-[88rem] text-[9px] font-semibold uppercase tracking-[0.13em] text-white/65">Fashion Knits · Tiruppur, India</p>
      </section>
    </div>
  );
}
