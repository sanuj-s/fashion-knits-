import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  Boxes,
  ClipboardCheck,
  FileText,
  Globe2,
  PackageCheck,
  Plane,
  Ship,
  Warehouse,
} from 'lucide-react';

const MARKETS = [
  { code: 'US', name: 'United States', region: 'North America', lon: -98, lat: 39 },
  { code: 'UK', name: 'United Kingdom', region: 'Europe', lon: -3, lat: 55 },
  { code: 'EU', name: 'Europe', region: 'Regional market', lon: 15, lat: 50 },
  { code: 'AU', name: 'Australia', region: 'Oceania', lon: 134, lat: -25 },
  { code: 'JP', name: 'Japan', region: 'East Asia', lon: 138, lat: 36 },
  { code: 'KR', name: 'South Korea', region: 'East Asia', lon: 127.5, lat: 36 },
];

const WORKFLOW = [
  { number: '01', title: 'Confirm requirements', copy: 'Share the destination, order details and buyer delivery requirements.', icon: Globe2 },
  { number: '02', title: 'Prepare the cargo', copy: 'Coordinate storage, packing instructions and shipment readiness.', icon: Boxes },
  { number: '03', title: 'Coordinate documents', copy: 'Confirm required paperwork and customs-clearance responsibilities.', icon: FileText },
  { number: '04', title: 'Arrange freight handoff', copy: 'Agree the freight option, handoff point, costs and responsibilities.', icon: PackageCheck },
  { number: '05', title: 'Coordinate updates', copy: 'Keep the buyer and logistics partners aligned through the shipment.', icon: ClipboardCheck },
];

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-xs ${light ? 'text-[#d4b575]' : 'text-[#907348]'}`}>
      <span aria-hidden="true" className={`h-px w-8 ${light ? 'bg-[#d4b575]' : 'bg-[#aa8953]'}`} />
      {children}
    </p>
  );
}

function PhotoTag({ children }: { children: ReactNode }) {
  return (
    <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-[#181714]/70 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm sm:left-5 sm:top-5">
      {children}
    </span>
  );
}

function PhotoCaption({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <figcaption className={`px-4 py-3 text-[10px] leading-5 sm:px-5 ${dark ? 'text-white/55' : 'text-charcoal/50'}`}>{children}</figcaption>;
}

export function ExportClient() {
  return (
    <div className="bg-warm-white text-charcoal">
      <section aria-labelledby="export-hero-title" className="relative isolate min-h-[680px] overflow-hidden bg-[#191815] text-white sm:min-h-[720px] lg:min-h-[min(800px,calc(100svh-5rem))]">
        <Image
          src="/assets/export/global-port.jpg"
          alt="Container vessels, cranes and freight infrastructure at a commercial port at night"
          fill
          priority
          sizes="100vw"
          quality={82}
          className="-z-20 object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(20,19,17,.94)_0%,rgba(20,19,17,.72)_48%,rgba(20,19,17,.2)_100%),linear-gradient(0deg,rgba(20,19,17,.58),transparent_48%)]" />
        <div className="mx-auto flex min-h-[680px] max-w-[100rem] flex-col justify-between px-5 pb-8 pt-24 sm:min-h-[720px] sm:px-8 sm:pb-10 sm:pt-28 lg:min-h-[min(800px,calc(100svh-5rem))] lg:px-16 lg:pb-12 lg:pt-32">
          <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.18em] text-white/70 sm:text-xs">
            <Link href="/" className="transition-colors hover:text-white">Home</Link><span aria-hidden="true" className="text-white/40">/</span><span aria-current="page" className="text-white">Global Export</span>
          </nav>
          <div className="max-w-4xl py-16 sm:py-20">
            <Eyebrow light>Global export &amp; logistics</Eyebrow>
            <h1 id="export-hero-title" className="max-w-4xl text-[clamp(3.35rem,8.4vw,7.6rem)] font-semibold leading-[0.89] tracking-[-0.07em]">
              Connecting your business to <span className="text-white/55">global markets.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:mt-8 sm:text-base sm:leading-8">
              From warehousing and customs coordination to freight planning and shipment handoff, our dedicated export and logistics teams work with buyers and logistics partners to coordinate international orders.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="#contact" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#d3b476] px-5 text-[10px] font-bold uppercase tracking-[0.13em] text-charcoal transition-colors hover:bg-[#e5c991] focus-visible:outline-white">
                Discuss an export order <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="#capabilities" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/35 px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:border-white hover:bg-white/10">
                Explore our capabilities <ArrowDownRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t border-white/25 pt-5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/75 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
            <span>Warehousing <i className="mx-2 not-italic text-[#d3b476]">/</i> Customs coordination <i className="mx-2 not-italic text-[#d3b476]">/</i> Sea &amp; air freight</span>
            <span className="text-white/55">Representative port photograph</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="markets-title" className="border-b border-charcoal/10 bg-[#f3f0e9] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[100rem]">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <Eyebrow>Tiruppur knitwear market context</Eyebrow>
              <h2 id="markets-title" className="max-w-4xl text-[clamp(2.6rem,5.6vw,5.25rem)] font-semibold leading-[0.93] tracking-[-0.065em]">Global reach. <span className="text-charcoal/40">Coordinated locally.</span></h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-charcoal/65 lg:col-span-4 lg:justify-self-end">
              Our export team works with buyers and logistics partners to plan for agreed destinations. The places shown are references from wider Tiruppur knitwear industry reporting, not a confirmed Fashion Knits customer list.
            </p>
          </div>

          <figure className="relative mt-9 overflow-hidden rounded-[1.2rem] border border-charcoal/10 bg-[#e9e4da] px-3 py-5 sm:mt-12 sm:px-8 sm:py-8">
            <div className="relative mx-auto aspect-[1200/483] w-full max-w-[1160px]">
              <Image
                src="/assets/export/world-map.svg"
                alt="World map with markers for regions referenced in Tiruppur knitwear industry reporting; no Fashion Knits shipment routes are shown"
                fill
                sizes="(max-width: 1200px) 94vw, 1160px"
                className="object-contain"
              />
              {MARKETS.map(({ code, lon, lat }) => {
                const x = ((lon + 180) / 360) * 100;
                const y = ((85 - lat) / 145) * 100;
                return (
                  <span key={code} aria-hidden="true" className="absolute z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#f5f0e6] bg-[#9b7944] shadow-[0_0_0_5px_rgba(155,121,68,.18)] sm:h-4 sm:w-4 sm:shadow-[0_0_0_7px_rgba(155,121,68,.18)]" style={{ left: `${x}%`, top: `${y}%` }} />
                );
              })}
            </div>
            <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-charcoal/10 pt-4 text-[9px] font-semibold uppercase tracking-[0.13em] text-charcoal/50 sm:text-[10px]">
              <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#9b7944]" />Tiruppur cluster market references</span>
              <span>Map markers are indicative; no freight routes are represented</span>
            </figcaption>
          </figure>

          <ul aria-label="Markets mentioned in Tiruppur knitwear industry reporting" className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {MARKETS.map(({ code, name, region }) => (
              <li key={code} className="flex min-h-[82px] items-center gap-3 border-b border-charcoal/15 px-2 py-4 sm:gap-4 sm:px-3">
                <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#9b7944]/35 font-mono text-[9px] font-semibold tracking-[0.08em] text-[#907348]">{code}</span>
                <span><span className="block text-sm font-medium tracking-[-0.02em]">{name}</span><span className="mt-1 block text-[9px] uppercase tracking-[0.11em] text-charcoal/45">{region}</span></span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3 text-[10px] leading-5 text-charcoal/50 sm:flex-row sm:items-start sm:justify-between">
            <p className="max-w-3xl">Industry coverage cites the United States, the United Kingdom, Europe, Australia, Japan and South Korea among Tiruppur knitwear markets. Contact the team to confirm requirements for your destination.</p>
            <p className="shrink-0">Sources: <a className="underline underline-offset-2 hover:text-charcoal" href="https://www.tea-india.org/news-board/16746-bangla-on-boil-tiruppur-looks-to-sew-up-knitwear-deals-9th-december-2024" target="_blank" rel="noreferrer">TEA</a> · <a className="underline underline-offset-2 hover:text-charcoal" href="https://www.apparelviews.com/wp-content/uploads/2024/09/AV_August_2024_Web.pdf" target="_blank" rel="noreferrer">Apparel Views</a></p>
          </div>
        </div>
      </section>

      <section id="capabilities" aria-labelledby="warehouse-title" className="scroll-mt-24 border-b border-charcoal/10 bg-warm-white px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[100rem] gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
          <figure className="overflow-hidden rounded-[1.2rem] bg-[#e5dfd4] lg:col-span-7">
            <div className="relative aspect-[1.25/1] sm:aspect-[1.5/1] lg:aspect-[1.28/1]">
              <Image src="/assets/export/warehouse.jpg" alt="Warehouse aisle with stored freight and a forklift handling cargo" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
              <PhotoTag><Warehouse aria-hidden="true" className="mr-2 inline h-3.5 w-3.5 text-[#dfbd7d]" />Warehousing &amp; cargo preparation</PhotoTag>
            </div>
            <PhotoCaption>Representative warehouse photograph; it does not depict a verified Fashion Knits facility.</PhotoCaption>
          </figure>
          <div className="lg:col-span-5">
            <Eyebrow>Storage &amp; dispatch coordination</Eyebrow>
            <h2 id="warehouse-title" className="text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.065em]">Organized storage. <span className="text-charcoal/40">Careful cargo handling.</span></h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-charcoal/65">The dedicated team coordinates warehousing and storage as part of export operations, keeping cargo preparation aligned with the agreed packing and dispatch plan.</p>
            <ul className="mt-7 grid gap-x-6 sm:grid-cols-2">
              {['Storage coordination', 'Inventory handling', 'Cargo preparation', 'Packing coordination and dispatch'].map((item) => (
                <li key={item} className="flex min-h-12 items-center gap-3 border-t border-charcoal/15 py-3 text-sm text-charcoal/75"><span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#aa8953]" />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="customs-title" className="border-b border-white/10 bg-charcoal px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[100rem] gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <Eyebrow light>Export documentation</Eyebrow>
            <h2 id="customs-title" className="text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.065em]">Documentation and customs, <span className="text-white/45">coordinated.</span></h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">The export team coordinates clearance steps and checks which paperwork applies to the destination, shipment and agreed delivery terms.</p>
            <ul className="mt-7 grid gap-x-6 border-t border-white/15 sm:grid-cols-2">
              {['Commercial invoices', 'Packing lists', 'Certificates of origin, where required', 'Bill of lading or air waybill'].map((item) => (
                <li key={item} className="flex min-h-12 items-center gap-3 border-b border-white/15 py-3 text-sm text-white/80"><FileText aria-hidden="true" className="h-4 w-4 shrink-0 text-[#d3b476]" />{item}</li>
              ))}
            </ul>
            <p className="mt-4 max-w-xl text-[11px] leading-5 text-white/50">Requirements vary. Buyers, carriers, customs brokers and other authorized parties may prepare or issue particular documents; responsibilities are confirmed for each shipment.</p>
          </div>
          <figure className="overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/5 lg:col-span-7">
            <div className="relative aspect-[1.25/1] sm:aspect-[1.5/1] lg:aspect-[1.28/1]">
              <Image src="/assets/export/documentation.jpg" alt="A logistics worker completing a shipment handling document on a clipboard" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover object-center" />
              <PhotoTag>Shipment paperwork</PhotoTag>
            </div>
            <PhotoCaption dark>Representative stock image of shipment documentation.</PhotoCaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="sea-title" className="border-b border-charcoal/10 bg-[#f3f0e9] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[100rem] gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
          <figure className="overflow-hidden rounded-[1.2rem] bg-[#d9d4ca] lg:col-span-7">
            <div className="relative aspect-[1.3/1] sm:aspect-[1.65/1] lg:aspect-[1.38/1]">
              <Image src="/assets/export/sea-freight.jpg" alt="Container ship loaded with freight at a commercial seaport" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
              <PhotoTag><Ship aria-hidden="true" className="mr-2 inline h-3.5 w-3.5 text-[#dfbd7d]" />Sea freight</PhotoTag>
            </div>
            <PhotoCaption>Representative sea freight image; carrier and route are arranged for each shipment.</PhotoCaption>
          </figure>
          <div className="lg:col-span-5">
            <Eyebrow>International ocean freight</Eyebrow>
            <h2 id="sea-title" className="text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.065em]">Sea freight for <span className="text-charcoal/40">international cargo.</span></h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-charcoal/65">The team coordinates sea freight options with the buyer and appointed logistics partners, aligning shipment arrangements with the order and destination requirements.</p>
            <div className="mt-7 border-t border-charcoal/15 pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#907348]">Confirmed for each order</p>
              <p className="mt-3 text-sm leading-6 text-charcoal/70">Route, carrier, transit time, cost, handoff point and freight responsibilities depend on the shipment and the agreed delivery terms.</p>
            </div>
            <Link href="#contact" className="group mt-6 inline-flex min-h-11 items-center gap-3 border-b border-charcoal/25 pb-2 text-[10px] font-bold uppercase tracking-[0.13em] transition-colors hover:border-[#907348] hover:text-[#907348]">Discuss sea freight <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="air-title" className="border-b border-white/10 bg-[#24231f] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[100rem] gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <Eyebrow light>International air cargo</Eyebrow>
            <h2 id="air-title" className="text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.065em]">Air freight for <span className="text-white/45">time-sensitive needs.</span></h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">When air freight is under consideration, the team can coordinate with buyers and logistics partners around destination, shipment requirements and delivery priorities.</p>
            <div className="mt-7 border-t border-white/15 pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#d3b476]">Planned around your order</p>
              <p className="mt-3 text-sm leading-6 text-white/65">Availability, transit timing and cost depend on the selected service, route, cargo details and booking confirmation.</p>
            </div>
            <Link href="#contact" className="group mt-6 inline-flex min-h-11 items-center gap-3 border-b border-white/30 pb-2 text-[10px] font-bold uppercase tracking-[0.13em] text-white transition-colors hover:border-[#d3b476] hover:text-[#d3b476]">Discuss delivery requirements <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
          <figure className="order-1 overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/5 lg:order-2 lg:col-span-7">
            <div className="relative aspect-[1.3/1] sm:aspect-[1.65/1] lg:aspect-[1.38/1]">
              <Image src="/assets/export/air-freight.jpg" alt="Cargo aircraft being loaded with freight pallets on an airport apron" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
              <PhotoTag><Plane aria-hidden="true" className="mr-2 inline h-3.5 w-3.5 text-[#dfbd7d]" />Air freight</PhotoTag>
            </div>
            <PhotoCaption dark>Representative airport freight image.</PhotoCaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="workflow-title" className="border-b border-charcoal/10 bg-warm-white px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[100rem]">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <Eyebrow>Shipment coordination</Eyebrow>
              <h2 id="workflow-title" className="max-w-4xl text-[clamp(2.6rem,5.7vw,5.2rem)] font-semibold leading-[0.93] tracking-[-0.065em]">One coordinated journey. <span className="text-charcoal/40">Clear responsibilities.</span></h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-charcoal/60 lg:col-span-4 lg:justify-self-end">The export team aligns each step with the buyer and logistics partners. Carriers, customs authorities, brokers and destination delivery partners handle services within their own remit.</p>
          </div>
          <ol className="relative mt-10 grid gap-7 before:absolute before:bottom-4 before:left-[15px] before:top-4 before:w-px before:bg-charcoal/15 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5 lg:before:bottom-auto lg:before:left-[8%] lg:before:right-[8%] lg:before:top-[17px] lg:before:h-px lg:before:w-auto">
            {WORKFLOW.map(({ number, title, copy, icon: Icon }) => (
              <li key={number} className="relative grid grid-cols-[2rem_1fr] gap-x-4 lg:block">
                <span className="relative z-10 grid h-8 w-8 place-items-center rounded-full border border-[#a78854]/50 bg-warm-white text-[9px] font-mono font-semibold text-[#907348]">{number}</span>
                <div className="pb-1 lg:pt-6">
                  <Icon aria-hidden="true" className="mb-4 hidden h-4 w-4 text-[#907348] lg:block" />
                  <h3 className="text-base font-medium tracking-[-0.02em]">{title}</h3>
                  <p className="mt-2 max-w-xs text-xs leading-5 text-charcoal/60">{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="team-title" className="border-b border-charcoal/10 bg-[#f3f0e9] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[100rem] gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
          <figure className="overflow-hidden rounded-[1.2rem] bg-[#dcd6cb] lg:col-span-6">
            <div className="relative aspect-[1.25/1] sm:aspect-[1.5/1] lg:aspect-[1.16/1]">
              <Image src="/assets/export/shipping-team.jpg" alt="Logistics worker reviewing shipment paperwork at a desk in a representative stock photograph" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <PhotoTag>Export coordination</PhotoTag>
            </div>
            <PhotoCaption>Representative stock image; the person shown is not Fashion Knits staff.</PhotoCaption>
          </figure>
          <div className="lg:col-span-6">
            <Eyebrow>A dedicated export team</Eyebrow>
            <h2 id="team-title" className="text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.065em]">One team to keep <span className="text-charcoal/40">the details moving.</span></h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-charcoal/65">Fashion Knits has dedicated export and logistics teams to coordinate storage, paperwork, customs steps and freight arrangements with the buyer and appointed partners.</p>
            <ul className="mt-7 grid gap-x-8 sm:grid-cols-2">
              {[
                'A dedicated export and shipping team',
                'Coordination across storage, documents and freight',
                'Communication with buyers and logistics partners',
                'Order-specific planning for responsibilities, timing and costs',
              ].map((item) => (
                <li key={item} className="flex min-h-[58px] items-start gap-3 border-t border-charcoal/15 py-4 text-sm leading-5 text-charcoal/75"><span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#aa8953]" />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="export-cta-title" className="relative isolate overflow-hidden bg-[#191815] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-16 lg:py-28">
        <Image src="/assets/export/world-map.svg" alt="" aria-hidden="true" fill sizes="100vw" className="-z-20 object-contain object-right opacity-[0.11]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#191815_0%,rgba(25,24,21,.94)_54%,rgba(25,24,21,.72)_100%)]" />
        <div className="mx-auto grid max-w-[100rem] gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow light>International enquiry</Eyebrow>
            <h2 id="export-cta-title" className="max-w-5xl text-[clamp(2.8rem,6.5vw,6.2rem)] font-semibold leading-[0.9] tracking-[-0.07em]">Planning your next <span className="text-white/50">international shipment?</span></h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">Share your destination and order requirements. Our team can review the details and coordinate the next steps with you.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-start lg:justify-self-end">
            <Link href="#contact" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#d3b476] px-5 text-[10px] font-bold uppercase tracking-[0.13em] text-charcoal transition-colors hover:bg-[#e5c991]">Discuss an export order <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            <Link href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:border-white hover:bg-white/10">Get a quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
