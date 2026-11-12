'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type KeyboardEvent, type ReactNode } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  ClipboardCheck,
  FileText,
  FlaskConical,
  PackageCheck,
  Ruler,
  Search,
  ShieldCheck,
  Shirt,
  SwatchBook,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const QUALITY_INPUTS = [
  {
    title: 'Approved sample & tech pack',
    detail: 'Start with one shared product reference: the approved sample, current tech pack, construction notes and revision history.',
    reference: 'Agree which version is the controlling reference before production planning.',
  },
  {
    title: 'Measurements & size specifications',
    detail: 'Define the points of measure, size range, measurement method and tolerances for the garment programme.',
    reference: 'Share the buyer’s measurement chart and confirm tolerances for each point of measure.',
  },
  {
    title: 'Fabric composition & materials',
    detail: 'Clarify fibre content, fabric construction, weight, hand feel and any material restrictions relevant to the order.',
    reference: 'Identify the approved material reference and any required verification or test method.',
  },
  {
    title: 'Stitching, construction & finish',
    detail: 'Document seam and stitch expectations, garment construction, trims and the finish expected on the approved sample.',
    reference: 'Use the sample, construction details and workmanship notes as the agreed comparison point.',
  },
  {
    title: 'Colour, artwork & branding',
    detail: 'Align colour references, artwork placement, print or embellishment details, labels and branding components.',
    reference: 'Record approved shade, artwork and component references, including placement where specified.',
  },
  {
    title: 'Buyer tests & compliance',
    detail: 'Identify product, destination-market and buyer-specific test or restricted-substance requirements early.',
    reference: 'Confirm the buyer protocol, applicable RSL version, test method and who will arrange testing.',
  },
] as const;

const QUALITY_JOURNEY = [
  {
    title: 'Development & specification',
    description: 'The brief, approved sample and technical documents establish the intended product and the criteria that matter to the buyer.',
  },
  {
    title: 'Production readiness',
    description: 'Material, construction, colour, components and any buyer-required tests are aligned before the order moves into bulk planning.',
  },
  {
    title: 'In-production quality',
    description: 'Reviewing work during production can help teams notice workmanship or specification differences while there is time to respond.',
  },
  {
    title: 'Finished garment review',
    description: 'Final visual, measurement, labelling and packing checks can be compared with the agreed order requirements.',
  },
] as const;

const GARMENT_DETAILS = [
  {
    title: 'Measurement & fit',
    icon: Ruler,
    what: 'Compare the garment with the approved specification using its stated points of measure and tolerances.',
    why: 'Measurement consistency affects fit, grading and how a style performs across its size range.',
    agree: 'Measurement chart, method, sample condition and tolerances for each point of measure.',
  },
  {
    title: 'Stitching & seams',
    icon: Search,
    what: 'Review seam construction, stitch appearance, joins and visible workmanship against the approved construction.',
    why: 'Construction details influence appearance, comfort and garment performance in wear.',
    agree: 'Construction notes, approved sample and any buyer workmanship reference.',
  },
  {
    title: 'Fabric appearance',
    icon: SwatchBook,
    what: 'Look at the fabric surface, construction, hand feel and visible condition in the finished garment.',
    why: 'Surface character and fabric behaviour help define how the product looks and feels.',
    agree: 'Approved material reference, composition, weight and any relevant visual criteria.',
  },
  {
    title: 'Colour & shade',
    icon: SwatchBook,
    what: 'Compare colour with the agreed reference and identify whether shade testing is required for the product.',
    why: 'Shade variation can change the look of a style across panels, components or production lots.',
    agree: 'Approved shade standard, tolerance and buyer-required test method where applicable.',
  },
  {
    title: 'Finishing & presentation',
    icon: Shirt,
    what: 'Review the garment’s visible condition and presentation against the approved sample and finishing notes.',
    why: 'Finishing details shape the first impression of a garment when it reaches the buyer or wearer.',
    agree: 'Finishing reference, garment condition criteria and any presentation requirements.',
  },
  {
    title: 'Labels, trims & branding',
    icon: ClipboardCheck,
    what: 'Check the specified labels and trims, their identity and placement against the buyer’s instructions.',
    why: 'Correct components and placement support product identification and brand presentation.',
    agree: 'Approved component list, artwork, label content and placement references.',
  },
  {
    title: 'Packing & order presentation',
    icon: PackageCheck,
    what: 'Align folding, polybag or other packing, carton information and assortment details with the order.',
    why: 'Clear packing instructions help keep finished goods organised for receipt and onward handling.',
    agree: 'Packing method, labels, carton marks, assortment and shipment documentation requirements.',
  },
] as const;

const TEST_TOPICS = [
  {
    title: 'Dimensional stability',
    description: 'A buyer may specify shrinkage or dimensional-change evaluation after a defined care or conditioning process, especially where fabric relaxation can affect fit.',
    reference: 'Agree the method, conditioning, sample and allowable change for the product.',
  },
  {
    title: 'Colourfastness',
    description: 'Colour transfer or change may need assessment for the intended use, material, colour and care conditions.',
    reference: 'Confirm the relevant exposure, test method, performance level and shade reference.',
  },
  {
    title: 'Composition & fabric weight',
    description: 'Fibre composition and fabric weight can be important to product description, material approval and buyer specification.',
    reference: 'Agree the verified material reference, sampling approach and applicable method.',
  },
  {
    title: 'Pilling & abrasion',
    description: 'Surface wear testing may be relevant for fabrics expected to experience repeated rubbing or regular use.',
    reference: 'Select the method and required performance in line with the garment’s intended use.',
  },
  {
    title: 'Restricted substances',
    description: 'Chemical requirements may be set by the destination market and the individual buyer’s current Restricted Substances List (RSL).',
    reference: 'Confirm the buyer’s current RSL, product scope, test protocol and approved laboratory route.',
  },
] as const;

const IMPROVEMENT_STEPS = [
  {
    title: 'Identify the deviation',
    description: 'Describe the observed difference clearly and record the affected product, process or order reference.',
  },
  {
    title: 'Compare with the agreed requirement',
    description: 'Check the approved sample, specification, method or buyer instruction that applies to the case.',
  },
  {
    title: 'Investigate the cause',
    description: 'Look for contributing factors in material, method, machine, measurement, handling or communication.',
  },
  {
    title: 'Agree corrective action',
    description: 'Define a practical response with the relevant team and buyer, including ownership where needed.',
  },
  {
    title: 'Verify the result',
    description: 'Where appropriate, review the next relevant output against the agreed requirement and record the learning.',
  },
] as const;

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function handleTabKeyDown(
  event: KeyboardEvent<HTMLButtonElement>,
  index: number,
  count: number,
  select: (value: number) => void,
) {
  if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const next = event.key === 'Home'
    ? 0
    : event.key === 'End'
      ? count - 1
      : (index + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : count - 1)) % count;
  select(next);
  event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
}

export function QualityClient() {
  const [activeInput, setActiveInput] = useState(0);
  const [activeDetail, setActiveDetail] = useState(0);
  const [activeTest, setActiveTest] = useState(0);
  const [activeImprovement, setActiveImprovement] = useState(0);
  const reduceMotion = useReducedMotion();

  const currentInput = QUALITY_INPUTS[activeInput];
  const currentDetail = GARMENT_DETAILS[activeDetail];
  const currentTest = TEST_TOPICS[activeTest];
  const currentImprovement = IMPROVEMENT_STEPS[activeImprovement];

  return (
    <div className="overflow-hidden bg-[#f2efe9] text-[#24221e]">
      <section className="relative isolate min-h-[820px] overflow-hidden bg-[#1b1a18] text-[#faf8f3] sm:min-h-[820px] lg:min-h-[790px]">
        <motion.div
          className="absolute inset-x-0 top-16 -z-20 h-[32rem] w-full sm:h-[42rem] lg:inset-y-0 lg:left-0 lg:right-auto lg:h-auto lg:w-[min(60vw,72rem)]"
          initial={{ opacity: 0.55, scale: 1.045 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/assets/images/quality-hero-garment-inspection.webp"
            alt="Illustrative scene of a garment technician examining a knit sweater, with another worker in the background"
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-[49%_40%] sm:object-[52%_42%] lg:object-center"
          />
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(22,21,19,.18)_0%,rgba(22,21,19,.24)_34%,rgba(22,21,19,.88)_100%)] lg:bg-[linear-gradient(90deg,rgba(22,21,19,.02)_0%,rgba(22,21,19,.1)_36%,rgba(22,21,19,.82)_61%,#1b1a18_100%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#1b1a18] to-transparent lg:hidden" />

        <div className="mx-auto flex min-h-[820px] max-w-[100rem] flex-col justify-between px-5 pb-10 pt-28 sm:min-h-[820px] sm:px-8 sm:pb-12 sm:pt-32 lg:min-h-[790px] lg:px-16 lg:pb-16 lg:pt-32">
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white/75 sm:text-xs">
            <Link href="/" className="transition-colors hover:text-[#e0c58f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d2b473]">Home</Link>
            <span aria-hidden="true" className="text-white/40">/</span>
            <span aria-current="page" className="text-white">Quality</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="max-w-2xl lg:col-start-8 lg:col-span-5">
              <Reveal>
                <p className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#ddbd7e] sm:text-xs">
                  <span aria-hidden="true" className="h-px w-9 bg-[#c7a569]" />Quality &amp; product assurance
                </p>
                <p className="mb-5 text-[9px] uppercase tracking-[0.1em] text-white/58">Illustrative image · not a Fashion Knits facility photograph</p>
                <h1 className="max-w-[13ch] text-[clamp(3.4rem,7vw,7.25rem)] font-medium leading-[0.86] tracking-[-0.075em]">Every detail starts with <span className="font-serif font-normal italic text-[#e2c992]">the standard.</span></h1>
                <p className="mt-7 max-w-xl text-sm leading-7 text-white/78 sm:text-base sm:leading-8">From fabric and fit to construction and finishing, garment quality begins with a clear brief, agreed specifications and attention to the details that matter to the buyer.</p>
                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                  <Link href="/get-a-quote" className="group inline-flex min-h-12 items-center justify-between gap-7 border-b border-[#d2b473] pb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#eed9aa] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d2b473] sm:min-w-[16rem]">
                    Discuss your quality requirements <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                  <a href="#quality-journey" className="group inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d2b473]">Explore our quality approach <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="quality-approach" aria-labelledby="quality-inputs-title" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[92rem]">
          <Reveal className="grid gap-7 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80643b]">Before the first production decision</p>
              <h2 id="quality-inputs-title" className="max-w-4xl text-[clamp(2.6rem,5.5vw,5.2rem)] font-medium leading-[0.91] tracking-[-0.07em]">Quality begins <span className="font-serif font-normal italic text-[#9a7a48]">before production.</span></h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#24221e]/67 lg:col-span-5 lg:pb-1 sm:text-base">A clear product brief gives the buyer and production teams a common reference. Agreeing the details early helps reduce ambiguity as a garment programme develops.</p>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-6">
              <div className="relative min-h-[360px] overflow-hidden bg-[#d9d1c3] sm:min-h-[510px]">
                <Image src="/assets/images/quality-hero-inspection.webp" alt="Illustrative close-up of a knit garment and hands checking a measurement reference" fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover object-center" />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,23,20,.02)_35%,rgba(25,23,20,.72)_100%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#e2c992]">A shared reference</p>
                  <p className="mt-2 max-w-md font-serif text-2xl leading-tight sm:text-3xl">One approved brief. A clearer conversation at every stage.</p>
                </div>
                <p className="absolute right-3 top-3 bg-[#1b1a18]/70 px-2.5 py-1.5 text-[8px] uppercase tracking-[0.12em] text-white/75 backdrop-blur-sm">Illustrative image</p>
              </div>
            </Reveal>

            <div className="lg:col-span-6">
              <div role="tablist" aria-label="Product requirements to agree" className="border-t border-[#24221e]/15">
                {QUALITY_INPUTS.map((item, index) => (
                  <button
                    key={item.title}
                    id={`quality-input-tab-${index}`}
                    role="tab"
                    aria-selected={activeInput === index}
                    aria-controls="quality-input-panel"
                    tabIndex={activeInput === index ? 0 : -1}
                    onClick={() => setActiveInput(index)}
                    onKeyDown={(event) => handleTabKeyDown(event, index, QUALITY_INPUTS.length, setActiveInput)}
                    className={`group flex min-h-[3.7rem] w-full items-center gap-4 border-b border-[#24221e]/15 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#9a7a48] ${activeInput === index ? 'text-[#24221e]' : 'text-[#24221e]/52 hover:text-[#24221e]'}`}
                  >
                    <span className={`w-8 shrink-0 font-mono text-[10px] tracking-[0.14em] ${activeInput === index ? 'text-[#967543]' : 'text-[#24221e]/35'}`}>0{index + 1}</span>
                    <span className="flex-1 text-sm font-medium sm:text-base">{item.title}</span>
                    <ChevronRight aria-hidden="true" className={`h-4 w-4 shrink-0 transition-transform duration-300 ${activeInput === index ? 'translate-x-0 text-[#967543]' : '-translate-x-1 text-transparent group-hover:translate-x-0 group-hover:text-[#967543]'}`} />
                  </button>
                ))}
              </div>
              <div id="quality-input-panel" role="tabpanel" aria-labelledby={`quality-input-tab-${activeInput}`} aria-live="polite" className="min-h-[205px] pt-6 sm:min-h-[220px]">
                <motion.div key={activeInput} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#80643b]">Why agree it early</p>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#24221e]/75 sm:text-base">{currentInput.detail}</p>
                  <p className="mt-4 border-l border-[#b69a66] pl-3 text-xs leading-5 text-[#24221e]/60"><span className="font-semibold text-[#24221e]/80">Useful reference:</span> {currentInput.reference}</p>
                </motion.div>
              </div>
              <p className="mt-3 text-[10px] leading-5 text-[#24221e]/48">These are buyer-planning considerations; the applicable requirements are agreed for each programme.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="quality-journey" aria-labelledby="quality-journey-title" className="scroll-mt-24 border-y border-[#24221e]/8 bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <Reveal className="grid gap-7 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80643b]">The quality journey</p>
              <h2 id="quality-journey-title" className="max-w-4xl text-[clamp(2.6rem,5.2vw,5rem)] font-medium leading-[0.92] tracking-[-0.07em]">Four moments to align <span className="font-serif font-normal italic text-[#9a7a48]">on the way.</span></h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#24221e]/65 lg:col-span-5 lg:pb-1">A practical framework for discussing where product requirements matter. Specific checks, timing and responsibility should be confirmed for each order.</p>
          </Reveal>
          <div className="relative mt-12 lg:mt-16">
            <div aria-hidden="true" className="absolute left-[4%] right-[4%] top-4 hidden h-px bg-[#b69a66]/45 lg:block" />
            <ol className="relative grid gap-9 before:absolute before:bottom-6 before:left-[13px] before:top-3 before:w-px before:bg-[#b69a66]/50 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 sm:before:hidden lg:grid-cols-4 lg:gap-9">
            {QUALITY_JOURNEY.map((stage, index) => (
              <motion.li key={stage.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduceMotion ? 0 : 0.52, delay: reduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }} className="relative pl-11 sm:pl-0">
                <span aria-hidden="true" className="absolute left-[6px] top-2 h-4 w-4 rounded-full border border-[#9b7b49] bg-white ring-4 ring-white sm:static sm:mb-6 sm:block sm:h-8 sm:w-8 sm:ring-0">
                  <span className="absolute left-[5px] top-[5px] h-1.5 w-1.5 rounded-full bg-[#9b7b49] sm:left-[10px] sm:top-[10px] sm:h-2 sm:w-2" />
                </span>
                <p className="font-mono text-[10px] tracking-[0.15em] text-[#967543]">STAGE 0{index + 1}</p>
                <h3 className="mt-3 max-w-[15ch] text-xl font-medium leading-tight tracking-[-0.04em] sm:text-2xl">{stage.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-[#24221e]/65">{stage.description}</p>
              </motion.li>
            ))}
            </ol>
          </div>
          <p className="mt-10 border-t border-[#24221e]/10 pt-4 text-[10px] leading-5 text-[#24221e]/55">This journey is a planning framework, not a representation that every step is a formally documented Fashion Knits procedure or applies identically to every order.</p>
        </div>
      </section>

      <section aria-labelledby="garment-details-title" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[92rem]">
          <Reveal className="grid gap-7 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80643b]">Anatomy of an agreed standard</p>
              <h2 id="garment-details-title" className="max-w-4xl text-[clamp(2.6rem,5.2vw,5rem)] font-medium leading-[0.92] tracking-[-0.07em]">What quality means <span className="font-serif font-normal italic text-[#9a7a48]">in a garment.</span></h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#24221e]/65 lg:col-span-5 lg:pb-1">Select a detail to see what buyers commonly define, why it matters and which reference can guide a clear conversation.</p>
          </Reveal>

          <div className="mt-11 grid border-t border-[#24221e]/15 lg:mt-14 lg:grid-cols-12">
            <div role="tablist" aria-label="Garment quality details" className="lg:col-span-5">
              {GARMENT_DETAILS.map((item, index) => (
                <button key={item.title} id={`garment-tab-${index}`} role="tab" aria-selected={activeDetail === index} aria-controls="garment-detail-panel" tabIndex={activeDetail === index ? 0 : -1} onClick={() => setActiveDetail(index)} onKeyDown={(event) => handleTabKeyDown(event, index, GARMENT_DETAILS.length, setActiveDetail)} className={`group flex min-h-[4.2rem] w-full items-center gap-4 border-b border-[#24221e]/15 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#9a7a48] ${activeDetail === index ? 'text-[#24221e]' : 'text-[#24221e]/53 hover:text-[#24221e]'}`}>
                  <span className="w-8 shrink-0 font-mono text-[10px] tracking-[0.15em] text-[#967543]">0{index + 1}</span>
                  <span className="flex-1 text-sm font-medium sm:text-base">{item.title}</span>
                  <ChevronRight aria-hidden="true" className={`h-4 w-4 shrink-0 transition-transform duration-300 ${activeDetail === index ? 'text-[#967543]' : '-translate-x-1 text-transparent group-hover:translate-x-0 group-hover:text-[#967543]'}`} />
                </button>
              ))}
            </div>
            <div id="garment-detail-panel" role="tabpanel" aria-labelledby={`garment-tab-${activeDetail}`} aria-live="polite" className="min-h-[380px] border-b border-[#24221e]/15 py-8 lg:col-span-7 lg:border-l lg:border-b-0 lg:pl-12 lg:py-9 xl:pl-20">
              <motion.div key={activeDetail} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.32 }}>
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#ad9160]/55 text-[#856a3e]"><currentDetail.icon aria-hidden="true" className="h-5 w-5" /></span>
                  <div><p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#80643b]">Selected detail</p><h3 className="mt-2 text-2xl font-medium tracking-[-0.05em] sm:text-3xl">{currentDetail.title}</h3></div>
                </div>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div><p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#80643b]">What it means</p><p className="mt-2 text-sm leading-6 text-[#24221e]/72">{currentDetail.what}</p></div>
                  <div><p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#80643b]">Why it matters</p><p className="mt-2 text-sm leading-6 text-[#24221e]/72">{currentDetail.why}</p></div>
                  <div className="border-t border-[#24221e]/12 pt-4 sm:col-span-2"><p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#80643b]">Useful buyer reference</p><p className="mt-2 text-sm leading-6 text-[#24221e]/72">{currentDetail.agree}</p></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="testing-title" className="relative isolate overflow-hidden bg-[#1c1b19] px-5 py-20 text-[#f6f3ed] sm:px-8 sm:py-24 lg:px-16 lg:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_88%_12%,rgba(194,163,104,.12),transparent_34%),linear-gradient(110deg,rgba(255,255,255,.02),transparent_58%)]" />
        <div className="mx-auto max-w-[92rem]">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7"><p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d6b777]"><FlaskConical aria-hidden="true" className="h-4 w-4" />Fabric &amp; performance testing</p><h2 id="testing-title" className="max-w-4xl text-[clamp(2.5rem,5.2vw,5rem)] font-medium leading-[0.92] tracking-[-0.07em]">Test what matters <span className="font-serif font-normal italic text-[#dfc48f]">to the product.</span></h2></div>
            <p className="max-w-xl text-sm leading-7 text-white/65 lg:col-span-5">The relevant test plan depends on the product, material, function, market and buyer specification. Each programme should identify its methods, performance criteria and testing route.</p>
          </Reveal>

          <div className="mt-11 grid border-t border-white/15 lg:mt-14 lg:grid-cols-12">
            <div role="tablist" aria-label="Examples of apparel tests to agree" className="lg:col-span-4">
              {TEST_TOPICS.map((topic, index) => <button key={topic.title} id={`test-tab-${index}`} role="tab" aria-selected={activeTest === index} aria-controls="test-panel" tabIndex={activeTest === index ? 0 : -1} onClick={() => setActiveTest(index)} onKeyDown={(event) => handleTabKeyDown(event, index, TEST_TOPICS.length, setActiveTest)} className={`group flex min-h-[3.7rem] w-full items-center gap-4 border-b border-white/15 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#d6b777] ${activeTest === index ? 'text-white' : 'text-white/52 hover:text-white'}`}>
                <span className="w-8 shrink-0 font-mono text-[10px] tracking-[0.15em] text-[#d6b777]">0{index + 1}</span><span className="flex-1 text-sm font-medium sm:text-base">{topic.title}</span><ChevronRight aria-hidden="true" className={`h-4 w-4 shrink-0 transition-transform duration-300 ${activeTest === index ? 'text-[#d6b777]' : '-translate-x-1 text-transparent group-hover:translate-x-0 group-hover:text-[#d6b777]'}`} />
              </button>)}
            </div>
            <div id="test-panel" role="tabpanel" aria-labelledby={`test-tab-${activeTest}`} aria-live="polite" className="min-h-[290px] border-b border-white/15 py-7 sm:py-9 lg:col-span-8 lg:border-b-0 lg:border-l lg:pl-10 xl:pl-16">
              <motion.div key={activeTest} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.32 }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#d6b777]">Testing may be relevant when specified</p>
                <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">{currentTest.title}</h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">{currentTest.description}</p>
                <p className="mt-5 max-w-2xl border-l border-[#c6a568] pl-4 text-sm leading-6 text-white/55"><span className="font-semibold text-white/80">Agree in the brief:</span> {currentTest.reference}</p>
              </motion.div>
            </div>
          </div>

          <div className="mt-9 grid gap-7 border-t border-white/12 pt-7 md:grid-cols-2 md:gap-10">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d6b777]">Inspection is not a laboratory test</p><p className="mt-3 max-w-xl text-sm leading-6 text-white/62">A production-floor inspection compares work with agreed visual or measurement requirements. A laboratory test uses a defined method to assess a sample. Where required, the buyer and supplier should agree whether testing is arranged through a qualified external laboratory.</p></div>
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d6b777]">Start with the buyer’s current protocol</p><p className="mt-3 max-w-xl text-sm leading-6 text-white/62">AFIRM publishes apparel RSL and chemical guidance; individual buyers may set additional or different requirements. Fashion Knits does not claim AFIRM membership or blanket compliance with every buyer RSL.</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.1em]"><a href="https://afirm-group.com/afirm-rsl/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[#e0c58f] underline decoration-[#b9995e]/70 underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6b777]">AFIRM RSL <ArrowUpRight aria-hidden="true" className="h-3 w-3" /></a><a href="https://afirm-group.com/chemical-information-sheets/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[#e0c58f] underline decoration-[#b9995e]/70 underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6b777]">Chemical information sheets <ArrowUpRight aria-hidden="true" className="h-3 w-3" /></a></div></div>
          </div>
        </div>
      </section>

      <section aria-labelledby="published-quality-title" className="border-b border-[#24221e]/10 bg-[#e8e3d9] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[92rem] gap-8 lg:grid-cols-12 lg:items-start lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80643b]">Company-published information</p>
            <h2 id="published-quality-title" className="text-[clamp(2.4rem,4.7vw,4.35rem)] font-medium leading-[0.94] tracking-[-0.07em]">A starting point for a <span className="font-serif font-normal italic text-[#9a7a48]">buyer conversation.</span></h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#24221e]/65">Fashion Knits’ current website describes the practices below. Their detailed scope, order-level application and alignment with a buyer’s protocol should be confirmed for each programme.</p>
          </Reveal>
          <div className="lg:col-span-7">
            <ul className="divide-y divide-[#24221e]/15 border-y border-[#24221e]/15">
              <li className="grid gap-2 py-4 sm:grid-cols-[13rem_1fr] sm:gap-5"><p className="text-sm font-medium">Fabric inspection</p><p className="text-sm leading-6 text-[#24221e]/65">The site lists a four-point fabric inspection system.</p></li>
              <li className="grid gap-2 py-4 sm:grid-cols-[13rem_1fr] sm:gap-5"><p className="text-sm font-medium">Material testing</p><p className="text-sm leading-6 text-[#24221e]/65">The site lists an in-house testing lab for colourfastness, shrinkage and other physical attributes. Confirm available methods and programme scope.</p></li>
              <li className="grid gap-2 py-4 sm:grid-cols-[13rem_1fr] sm:gap-5"><p className="text-sm font-medium">Garment inspection</p><p className="text-sm leading-6 text-[#24221e]/65">The site refers to final inspection under “Global AQL” and lists AQL 1.5. Confirm the applicable sampling plan and order-level requirement with the buyer.</p></li>
              <li className="grid gap-2 py-4 sm:grid-cols-[13rem_1fr] sm:gap-5"><p className="text-sm font-medium">Metal detection</p><p className="text-sm leading-6 text-[#24221e]/65">Metal detection is listed for finished products before packing; applicability and protocol should be agreed for the product programme.</p></li>
              <li className="grid gap-2 py-4 sm:grid-cols-[13rem_1fr] sm:gap-5"><p className="text-sm font-medium">Export packing</p><p className="text-sm leading-6 text-[#24221e]/65">The site describes secure export-carton packing to customer requirements.</p></li>
            </ul>
            <p className="mt-4 flex items-start gap-2 text-[10px] leading-5 text-[#24221e]/55"><ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#8d7042]" />These are company-published descriptions, not a claim that every check or test applies to every order.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="improvement-title" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <Reveal className="grid gap-7 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7"><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80643b]">If a deviation appears</p><h2 id="improvement-title" className="max-w-4xl text-[clamp(2.6rem,5.2vw,5rem)] font-medium leading-[0.92] tracking-[-0.07em]">A clear path from <span className="font-serif font-normal italic text-[#9a7a48]">finding to learning.</span></h2></div>
            <p className="max-w-xl text-sm leading-7 text-[#24221e]/65 lg:col-span-5 lg:pb-1">Select a stage in this general corrective-action cycle. It explains a recognised way to structure quality conversations; it is not a claim of a certified Fashion Knits system.</p>
          </Reveal>

          <div className="mt-12 grid gap-9 border-t border-[#24221e]/15 pt-8 lg:grid-cols-12 lg:gap-12">
            <div role="tablist" aria-label="Corrective action cycle" className="grid gap-1 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {IMPROVEMENT_STEPS.map((step, index) => <button key={step.title} id={`improvement-tab-${index}`} role="tab" aria-selected={activeImprovement === index} aria-controls="improvement-panel" tabIndex={activeImprovement === index ? 0 : -1} onClick={() => setActiveImprovement(index)} onKeyDown={(event) => handleTabKeyDown(event, index, IMPROVEMENT_STEPS.length, setActiveImprovement)} className={`group flex min-h-[3.5rem] items-center gap-4 border-b border-[#24221e]/12 px-2 py-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#9a7a48] ${activeImprovement === index ? 'text-[#24221e]' : 'text-[#24221e]/55 hover:text-[#24221e]'}`}><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[9px] ${activeImprovement === index ? 'border-[#9a7a48] text-[#80643b]' : 'border-[#24221e]/20'}`}>0{index + 1}</span><span className="text-sm font-medium">{step.title}</span><ChevronRight aria-hidden="true" className={`ml-auto h-4 w-4 transition-transform duration-300 ${activeImprovement === index ? 'text-[#967543]' : '-translate-x-1 text-transparent group-hover:translate-x-0 group-hover:text-[#967543]'}`} /></button>)}
            </div>
            <div id="improvement-panel" role="tabpanel" aria-labelledby={`improvement-tab-${activeImprovement}`} aria-live="polite" className="flex min-h-[265px] flex-col justify-between bg-[#e8e3d9] p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <motion.div key={activeImprovement} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#80643b]">Improvement cycle · 0{activeImprovement + 1}</p><h3 className="mt-4 max-w-xl text-2xl font-medium leading-tight tracking-[-0.045em] sm:text-3xl">{currentImprovement.title}</h3><p className="mt-4 max-w-2xl text-sm leading-7 text-[#24221e]/70">{currentImprovement.description}</p>
              </motion.div>
              <div className="mt-9 flex items-center gap-2 border-t border-[#24221e]/15 pt-5" aria-label={`Step ${activeImprovement + 1} of ${IMPROVEMENT_STEPS.length}`}>
                {IMPROVEMENT_STEPS.map((step, index) => <span key={step.title} className={`h-[2px] flex-1 transition-colors duration-300 ${index <= activeImprovement ? 'bg-[#967543]' : 'bg-[#24221e]/15'}`} />)}
                <span className="ml-2 font-mono text-[9px] tracking-[0.14em] text-[#24221e]/55">0{activeImprovement + 1} / 05</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="certificates" aria-labelledby="credentials-title" className="scroll-mt-24 border-y border-[#24221e]/8 bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <Reveal className="grid gap-7 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7"><p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80643b]"><FileText aria-hidden="true" className="h-4 w-4" />Credentials &amp; records</p><h2 id="credentials-title" className="max-w-4xl text-[clamp(2.5rem,5.1vw,4.8rem)] font-medium leading-[0.92] tracking-[-0.07em]">Scope matters as much <span className="font-serif font-normal italic text-[#9a7a48]">as the name.</span></h2></div>
            <p className="max-w-xl text-sm leading-7 text-[#24221e]/65 lg:col-span-5 lg:pb-1">The documents below apply only to the named entity, facility, processes and dates. A facility audit, an authorisation and a product certification are different kinds of records.</p>
          </Reveal>

          <div className="mt-11 grid border-y border-[#24221e]/15 lg:mt-14 lg:grid-cols-2">
            <article className="py-7 lg:pr-10 lg:py-9">
              <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#80643b]">Product standard · scope-bound</p><span className="border border-[#a48859]/50 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#715b37]">Valid to 30 Nov 2026</span></div>
              <h3 className="mt-5 text-xl font-medium tracking-[-0.04em] sm:text-2xl">OEKO-TEX® STANDARD 100</h3>
              <p className="mt-3 text-sm leading-6 text-[#24221e]/65"><span className="font-semibold text-[#24221e]/80">Fashion Knits · Printing Division · Product Class I, Annex 6.</span> The certificate scope covers specified commission printing on knitted and woven fabrics, including listed fibre types and print methods. It is not a blanket certificate for all Fashion Knits garments.</p>
              <a href="/assets/certificates/oeko-tex-standard-100.pdf" target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-10 items-center gap-2 border-b border-[#24221e]/20 pb-2 text-[9px] font-bold uppercase tracking-[0.13em] transition-colors hover:border-[#967543] hover:text-[#80643b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#967543]">View scope certificate <FileText aria-hidden="true" className="h-3.5 w-3.5" /><ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></a>
            </article>
            <article className="border-t border-[#24221e]/15 py-7 lg:border-l lg:border-t-0 lg:pl-10 lg:py-9">
              <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#80643b]">Facility certificate · named processes</p><span className="border border-[#a48859]/50 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#715b37]">1 Jun 2026 – 1 Jun 2027</span></div>
              <h3 className="mt-5 text-xl font-medium tracking-[-0.04em] sm:text-2xl">WRAP Certificate of Compliance</h3>
              <p className="mt-3 text-sm leading-6 text-[#24221e]/65"><span className="font-semibold text-[#24221e]/80">Fashion Knits Branch · WRAP #9322 · Shed 29, Netaji Apparel Park.</span> The document lists cutting, sewing, trimming, checking, ironing and packing for the named facility during the stated period.</p>
              <a href="/assets/certificates/wrap-certificate-of-compliance.pdf" target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-10 items-center gap-2 border-b border-[#24221e]/20 pb-2 text-[9px] font-bold uppercase tracking-[0.13em] transition-colors hover:border-[#967543] hover:text-[#80643b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#967543]">View certificate <FileText aria-hidden="true" className="h-3.5 w-3.5" /><ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></a>
            </article>
          </div>

          <div className="mt-8 grid gap-7 md:grid-cols-2">
            <div className="border-l border-[#a48859] pl-4"><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#80643b]">Social monitoring record · not a product certificate</p><h3 className="mt-2 text-base font-medium">amfori BSCI monitoring summary</h3><p className="mt-2 text-xs leading-5 text-[#24221e]/62">A Fashion Knits Branch summary in the project records describes full-monitoring activity beginning 25 February 2025 at Netaji Apparel Park. No rating or current certification claim is published here; request a verified current summary for buyer review.</p></div>
            <p className="flex items-start gap-2 text-[10px] leading-5 text-[#24221e]/55"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#8d7042]" />Dates above are transcribed from the supplied documents and reflect their stated periods. Buyers should confirm live status, product eligibility and transaction documentation with the relevant programme before making a product claim.</p>
          </div>

          <details className="group mt-10 border-t border-[#24221e]/15 pt-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-2 text-sm font-medium marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#967543] [&::-webkit-details-marker]:hidden"><span>Expired and historical records</span><span className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.12em] text-[#80643b]"><span>Open record notes</span><ChevronRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-open:rotate-90" /></span></summary>
            <div className="grid gap-6 border-t border-[#24221e]/10 py-6 md:grid-cols-3">
              <div><p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#8a5c4a]">Expired · 27 Sep 2026</p><h3 className="mt-2 text-sm font-medium">GOTS Scope Certificate · Version 7.0</h3><p className="mt-2 text-xs leading-5 text-[#24221e]/62">Scope certificate for listed apparel and textile products and processes. Some marked processes may be subcontracted. A scope certificate alone does not certify shipped goods; the applicable transaction certificate is required.</p><a href="/assets/certificates/gots-organic-textile.pdf" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#80643b] underline underline-offset-4">Open expired record <ArrowUpRight aria-hidden="true" className="h-3 w-3" /></a></div>
              <div><p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#8a5c4a]">Expired · 13 Oct 2026</p><h3 className="mt-2 text-sm font-medium">OCS Scope Certificate · Version 3.0</h3><p className="mt-2 text-xs leading-5 text-[#24221e]/62">Scope certificate for listed apparel and textile processes; some marked processes may be subcontracted. Goods claims require applicable transaction documentation.</p><a href="/assets/certificates/ocs-organic-content.pdf" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#80643b] underline underline-offset-4">Open expired record <ArrowUpRight aria-hidden="true" className="h-3 w-3" /></a></div>
              <div><p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#8a5c4a]">Historical · one-year term</p><h3 className="mt-2 text-sm font-medium">Disney FAMA facility authorisation</h3><p className="mt-2 text-xs leading-5 text-[#24221e]/62">Issued 4 November 2024 for Fashion Knits Unit 2, Netaji Apparel Park, and named licensee Sun City. This was facility- and licensee-specific authorisation, not a product certification; it is not current.</p></div>
            </div>
          </details>
        </div>
      </section>

      <section aria-labelledby="export-quality-title" className="bg-[#e8e3d9] px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:col-span-7">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80643b]">Quality &amp; export preparation</p>
            <h2 id="export-quality-title" className="max-w-4xl text-[clamp(2.5rem,5.1vw,4.8rem)] font-medium leading-[0.92] tracking-[-0.07em]">Ready for the details <span className="font-serif font-normal italic text-[#9a7a48]">beyond the garment.</span></h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#24221e]/68">Final presentation can extend to buyer-specific labels and trims, folding, packing instructions, carton marks and shipment documents. Metal detection may also be required by the buyer or product programme. The right checks depend on the order brief.</p>
          </Reveal>
          <div className="lg:col-span-5">
            <ul className="border-y border-[#24221e]/15">
              {['Labels, trims & order identity', 'Folding and packing instructions', 'Carton marks and assortment details', 'Metal detection where specified', 'Shipment document requirements'].map((item, index) => <li key={item} className="flex items-center gap-4 border-b border-[#24221e]/12 py-3 last:border-0"><span className="font-mono text-[9px] tracking-[0.14em] text-[#967543]">0{index + 1}</span><span className="text-sm text-[#24221e]/75">{item}</span></li>)}
            </ul>
            <Link href="/export" className="group mt-7 inline-flex items-center gap-3 border-b border-[#967543]/60 pb-2 text-[10px] font-bold uppercase tracking-[0.13em] text-[#24221e] transition-colors hover:border-[#24221e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#967543]">Explore global export preparation <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
