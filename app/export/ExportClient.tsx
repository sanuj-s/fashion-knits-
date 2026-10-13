'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useInView, useReducedMotion } from '@/lib/hooks';
import {
  FileText,
  CheckCircle2,
  Layers,
  Scissors,
  ShieldCheck,
  Ship,
  Anchor,
  Plane,
  MapPin,
  FileCheck,
  Award,
  Package,
  Boxes,
  Barcode,
  Droplets,
  FileSpreadsheet,
  ArrowRight,
  Shield,
  Truck,
  Clock,
  Sparkles,
} from 'lucide-react';

interface WorkflowStep {
  step: string;
  title: string;
  timeframe: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverable: string;
  checkpoints: string[];
}

const ORDER_WORKFLOW: WorkflowStep[] = [
  {
    step: '01',
    title: 'Tech Pack & Lab Dips',
    timeframe: '7 – 10 Days',
    summary:
      'Buyer tech pack analysis, Pantone color lab-dip matching under D65 lighting, and Proto / SMS sample fabrication.',
    icon: FileText,
    deliverable: 'Approved Proto Sample & Lab Dips',
    checkpoints: [
      'Spectrophotometer Delta-E < 0.5 color matching under D65/TL84 lighting',
      'Digital CAD pattern grading & garment construction review',
      'Yarn count, gauge, and shrinkage percentage evaluation',
    ],
  },
  {
    step: '02',
    title: 'PO & Yarn Allocation',
    timeframe: '3 – 5 Days',
    summary:
      'Purchase order signoff, yarn spinning allocation (combed, compact, or GOTS organic cotton), and production scheduling.',
    icon: CheckCircle2,
    deliverable: 'Yarn CSP & Lot Verification',
    checkpoints: [
      'Certified spinning mill allocation with lot CSP strength verification',
      'GOTS / OCS organic cotton fiber batch allocation and TC reservation',
      'Locked production line Gantt schedule with line-allocation signoff',
    ],
  },
  {
    step: '03',
    title: 'Knitting & Eco-Dyeing',
    timeframe: '10 – 14 Days',
    summary:
      'High-gauge circular knitting at Netaji Apparel Park paired with certified low-liquor soft-flow dyeing and Delta-E < 0.5 color fastness checks.',
    icon: Layers,
    deliverable: 'Approved Bulk Fabric Swatch',
    checkpoints: [
      '4-point system visual inspection for greige and dyed fabric rolls',
      'ZDHC & OEKO-TEX® Standard 100 Class I compliant wet processing',
      'Stenter relaxation compacting with residual shrinkage controlled to < 5%',
    ],
  },
  {
    step: '04',
    title: 'CAD Cutting & Assembly',
    timeframe: '12 – 18 Days',
    summary:
      'Automated multi-ply vacuum cutting and modular lean sewing lines with in-line AQL 2.5 stitch density audits.',
    icon: Scissors,
    deliverable: 'Sewn Garments & In-Line QC Pass',
    checkpoints: [
      'Automated vacuum multi-ply spreading with ±0.5mm cut tolerance',
      'Dedicated modular sewing lines with calibrated stitch-per-inch (SPI) monitoring',
      'Continuous in-line traffic light QC audits and seam burst testing',
    ],
  },
  {
    step: '05',
    title: '100% Metal Scan & QA',
    timeframe: '3 – 5 Days',
    summary:
      'Steam tunnel compact pressing, 100% calibrated 0.8mm conveyor needle detector scan, and Final Random Inspection (FRI).',
    icon: ShieldCheck,
    deliverable: 'Pre-Shipment Inspection Report (FRI)',
    checkpoints: [
      '100% pass through calibrated 0.8mm 9-point conveyor needle detection tunnels',
      'Industrial vacuum steam pressing with garment moisture check (< 12%)',
      'Final Random Inspection (FRI) conducted to buyer AQL 2.5 / 4.0 standards',
    ],
  },
  {
    step: '06',
    title: 'Container Stuffing & Port',
    timeframe: 'Direct Dispatch',
    summary:
      'Carton barcode verification, on-site container stuffing, and bonded customs transit to Tuticorin / Chennai seaport terminals.',
    icon: Ship,
    deliverable: 'Bill of Lading & GSP/REX Certificate',
    checkpoints: [
      'Barcode & RFID verification against buyer Purchase Order packing list',
      'On-site 20ft / 40ft container stuffing with desiccant protection at Netaji Apparel Park',
      'Tamper-evident bolt seal application and bonded green corridor customs transit',
    ],
  },
];

interface ExportDocument {
  id: string;
  name: string;
  code: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  standard: string;
  details: string[];
}

const EXPORT_DOCUMENTS: ExportDocument[] = [
  {
    id: 'invoice-packing',
    name: 'Commercial Invoice & Packing List',
    code: 'INV / PKL',
    icon: FileSpreadsheet,
    description:
      'Itemized export invoice and comprehensive packing list detailing PO numbers, carton numbers, style breakdown, net/gross weights, CBM volume, and harmonized HS codes.',
    standard: 'International Customs Standard',
    details: [
      'Exact carton-by-carton breakdown with size and color ratios',
      'Harmonized System (HS) Tariff Codes: 6109 (T-Shirts), 6110 (Sweaters/Polos)',
      'Verified gross, tare, and net weights with cubic volume measurements',
    ],
  },
  {
    id: 'bill-of-lading',
    name: 'Ocean Bill of Lading (B/L) / Air Waybill',
    code: 'B/L / AWB',
    icon: Ship,
    description:
      'Original negotiable or express Seaway Bill of Lading issued by premier ocean shipping lines, or IATA Air Waybill for time-critical air consignments, confirming cargo loaded on board.',
    standard: 'Premier Carriers (Maersk, MSC, Hapag-Lloyd, CMA CGM)',
    details: [
      'Clean on-board ocean Bill of Lading with container seal numbers',
      'Express Seaway Bill release or 3/3 original negotiable sets upon agreement',
      'IATA compliant Air Waybill (AWB) for air freight dispatches from CJB',
    ],
  },
  {
    id: 'coo',
    name: 'Certificate of Origin (COO)',
    code: 'COO / LEGAL',
    icon: FileCheck,
    description:
      'Formal Certificate of Origin authenticated by the regional Chamber of Commerce and authorized Indian export authorities, certifying genuine manufacture in Tiruppur, India.',
    standard: 'Chamber of Commerce Authenticated',
    details: [
      'Confirms 100% manufacturing origin at Tiruppur, Tamil Nadu, India',
      'Essential document for bilateral tariff classifications and customs clearance',
      'Issued with digital verification and stamping',
    ],
  },
  {
    id: 'gsp-rex',
    name: 'GSP / REX Statement on Invoice',
    code: 'REX / GSP',
    icon: Award,
    description:
      'Registered Exporter System (REX) statement on commercial invoices, enabling preferential tariff treatment and reduced duty entry into European Union and UK markets.',
    standard: 'EU & UK Preferential Tariff Framework',
    details: [
      'Registered Exporter (REX) number endorsed directly on commercial invoice',
      'Entitles European & UK apparel importers to preferential duty access',
      'Replaces legacy Form-A certificates under updated trade compliance guidelines',
    ],
  },
  {
    id: 'phytosanitary',
    name: 'Phytosanitary & Fumigation Certificate',
    code: 'ISPM-15',
    icon: ShieldCheck,
    description:
      'Certified fumigation treatment and phytosanitary certificate for wooden pallets, timber skids, and dunnage materials complying strictly with international ISPM-15 standards.',
    standard: 'ISPM-15 Plant Health Regulations',
    details: [
      'Heat-treated or methyl-bromide fumigated timber pallets with official stamp',
      'Guarantees zero quarantine delays at destination container terminals',
      'Standard protocol for all palletized FCL and LCL ocean shipments',
    ],
  },
  {
    id: 'lab-reports',
    name: 'Accredited Lab Test Reports & Organic TCs',
    code: 'QA / TC',
    icon: Layers,
    description:
      'Certified physical and chemical test reports covering AZO dyestuffs, formaldehyde, heavy metals, pH values, and color fastness, alongside USB GOTS/OCS Transaction Certificates.',
    standard: 'Accredited Labs (SGS / Intertek / TÜV / In-House)',
    details: [
      'Chemical compliance test reports: AZO-free, nickel-free, phthalate-free',
      'Physical audits: dimensional stability, spirality, and pilling resistance',
      'Official USB GOTS / OCS Transaction Certificates (TC) for organic cotton orders',
    ],
  },
];

const LOGISTICS_GATEWAYS = [
  {
    icon: Anchor,
    title: 'Tuticorin Seaport Gateway',
    subtitle: 'Primary Ocean Freight Corridor',
    distance: '~340 km · 6–8 hrs Direct Highway',
    detail:
      'Direct road access from Tiruppur to VO Chidambaranar Port (Tuticorin), offering weekly container departures to European, UK, Mediterranean, and US deepwater ports.',
    specs: [
      'Primary ocean freight artery for containerized knitwear exports',
      'Weekly vessel calls connecting to Rotterdam, Hamburg, Felixstowe, and US East Coast',
      'Direct FCL container stuffing at Netaji Apparel Park dock with bonded customs escort',
      'Average highway transit: 6 to 8 hours from factory gate to port terminal gate',
    ],
  },
  {
    icon: Anchor,
    title: 'Chennai & Cochin Terminals',
    subtitle: 'Consolidated Sea Freight & Trans-Pacific',
    distance: 'Chennai ~460 km · Cochin ~195 km',
    detail:
      'Full Container Load (FCL) and Less than Container Load (LCL) dispatch connecting through Chennai Port and Cochin DP World Vallarpadam Terminals.',
    specs: [
      'Chennai Port provides direct trans-Pacific trunk lines to US West Coast and Asia',
      'Cochin Vallarpadam International Container Terminal offers express Middle East links',
      'Equipped for Less than Container Load (LCL) consolidation and multi-buyer drops',
      'Flexible alternative routing during regional port weather or congestion windows',
    ],
  },
  {
    icon: Plane,
    title: 'Coimbatore Air Cargo (CJB)',
    subtitle: 'Time-Critical Air Shipments',
    distance: '45 km · ~45 mins Road Transit',
    detail:
      '45-minute transit to Coimbatore International Airport (CJB), with feeder connections to Bengaluru (BLR) and Chennai (MAA) for urgent SMS and retail launches.',
    specs: [
      'Immediate 45-minute transfer from Netaji Apparel Park to CJB Air Cargo Terminal',
      'Daily domestic freighter connections feeding BLR (Kempegowda) and MAA hubs',
      'Designed for Salesman Samples (SMS), prototype fit sets, and photo-shoot runs',
      'Express fast-track customs clearance for critical seasonal shelf replenishments',
    ],
  },
];

interface IncotermMode {
  term: string;
  name: string;
  summary: string;
  responsibilities: string[];
  bestFor: string;
}

const INCOTERMS: IncotermMode[] = [
  {
    term: 'FOB',
    name: 'Free On Board',
    summary:
      'The industry standard for knitwear exporters. Fashion Knits assumes responsibility until cargo is safely loaded past the vessel rail at Tuticorin or Chennai port.',
    responsibilities: [
      'Fashion Knits covers: Production, export packaging, inland trucking to port, export customs clearance, and terminal handling charges (THC).',
      'Buyer covers: International ocean freight, marine transit insurance, import customs clearance, and destination port handling.',
    ],
    bestFor: 'International brands & retailers with centralized corporate ocean carrier contracts.',
  },
  {
    term: 'CIF',
    name: 'Cost, Insurance & Freight',
    summary:
      'Turnkey ocean shipping solution. Fashion Knits arranges and pays container freight and procures marine cargo insurance to the buyer’s nominated destination port.',
    responsibilities: [
      'Fashion Knits covers: All origin costs, export clearances, ocean container freight, and Institute Cargo Clauses (A) marine transit insurance.',
      'Buyer covers: Destination import customs clearance, local port dues, and final inland delivery to warehouse.',
    ],
    bestFor: 'Importers seeking landed port pricing without negotiating local shipping line contracts.',
  },
  {
    term: 'CFR',
    name: 'Cost & Freight',
    summary:
      'Fashion Knits covers origin costs and primary ocean freight to the foreign destination port, while transit cargo insurance is managed under the buyer’s corporate marine policy.',
    responsibilities: [
      'Fashion Knits covers: Manufacturing, export packing, inland trucking, Indian export clearance, and primary ocean freight booking.',
      'Buyer covers: Marine insurance policy, destination customs duty, and inland terminal handling.',
    ],
    bestFor: 'Importers with existing corporate open-cover marine insurance policies.',
  },
  {
    term: 'EXW / FCA',
    name: 'Ex Works / Free Carrier',
    summary:
      'Cargo is packed and made ready for handover at our Netaji Apparel Park factory dock, or delivered to the buyer’s nominated Tiruppur freight consolidator / CFS.',
    responsibilities: [
      'Fashion Knits covers: Manufacturing, quality audits, export packaging, and loading at factory dock.',
      'Buyer / Forwarder covers: Inland transit, export documentation filing, port charges, and international freight.',
    ],
    bestFor: 'Global buying houses consolidating multi-vendor purchase orders in South India.',
  },
];

interface PackagingStandard {
  title: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  specs: string[];
}

const PACKAGING_STANDARDS: PackagingStandard[] = [
  {
    title: 'Individual Garment Polybagging',
    tag: 'Primary Barrier',
    icon: Package,
    description:
      'Garments are folded and encased in 100% virgin LDPE or certified biodegradable polybags, protecting the fabric against dust and friction throughout transit.',
    specs: [
      'Standard multilingual child safety suffocation warning text',
      'Die-cut punch air-vent holes to prevent air entrapment and ballooning',
      'Anti-static additive surface to prevent dust adherence during warehouse handling',
    ],
  },
  {
    title: 'Size/Color Ratio Assorted Inner Cartons',
    tag: 'Store-Ready Assortment',
    icon: Boxes,
    description:
      'Precision ratio packaging engineered to buyer PO specifications, delivering pre-sorted retail packs ready for immediate distribution center put-away.',
    specs: [
      'Solid-size / solid-color or customized ratio bundles (e.g., 1-2-2-1 S-M-L-XL)',
      'Sub-bundled with paper banding or recyclable clear master sleeves',
      'Inner pack barcode identification matching buyer store allocation manifests',
    ],
  },
  {
    title: 'Heavy-Duty 5-Ply Export Master Cartons',
    tag: 'Structural Integrity',
    icon: Shield,
    description:
      '5-ply double-wall corrugated virgin Kraft board cartons engineered to high Mullen Burst Test ratings to withstand multi-tier ocean container stacking.',
    specs: [
      'High Mullen Burst Test rating (> 200 PSI / ECT 44) for heavy container loads',
      'Moisture-resistant adhesive binding prevents fluting collapse during marine humidity',
      'Reinforced strapping and heavy-duty tamper-evident paper or vinyl packing tape',
    ],
  },
  {
    title: 'Buyer-Specific Barcode & RFID Labeling',
    tag: 'Automated Traceability',
    icon: Barcode,
    description:
      'High-resolution GS1 compliant shipping marks and barcode labels printed on all four carton faces, paired with buyer-specified RFID hangtags or carton inlays.',
    specs: [
      'Carton shipping marks printed with PO number, style code, carton sequence, and CBM',
      'GS1-128 / UPC-A / EAN-13 barcodes verified with digital verification scanners',
      'Encoded EPC Gen2 RFID tags supported for automated retail receiving docks',
    ],
  },
  {
    title: 'Moisture Barrier & Desiccant Packaging',
    tag: 'Ocean Transit Defense',
    icon: Droplets,
    description:
      'Every export carton is fitted with heavy-gauge polyethylene liner bags and calculated silica gel desiccant packs to prevent container rain and condensation damage.',
    specs: [
      'Non-toxic silica gel / clay desiccant sachets calculated per carton cubic volume',
      'Heavy-gauge poly-liner barrier wraps entire inner contents inside master carton',
      'Ensures garment moisture content remains strictly below 12% across deepwater transit',
    ],
  },
  {
    title: 'Carton Drop & Transit Testing',
    tag: 'Integrity Verification',
    icon: Truck,
    description:
      'Standardized pre-shipment package integrity testing verifying that cartons survive handling, rough road transit, and port crane movements without distortion.',
    specs: [
      'ISTA-1A certified 10-drop testing sequence (corners, edges, and faces)',
      'Carton compression tests ensuring zero deformation under stacked loads',
      '100% carton condition inspection prior to container loading dock release',
    ],
  },
];

export function ExportClient() {
  const workflowRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<HTMLDivElement>(null);
  const gatewaysRef = useRef<HTMLDivElement>(null);
  const incotermsRef = useRef<HTMLDivElement>(null);
  const packagingRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const isWorkflowInView = useInView(workflowRef, { once: true, amount: 0.05 });
  const isDocsInView = useInView(docsRef, { once: true, amount: 0.05 });
  const isGatewaysInView = useInView(gatewaysRef, { once: true, amount: 0.05 });
  const isIncotermsInView = useInView(incotermsRef, { once: true, amount: 0.05 });
  const isPackagingInView = useInView(packagingRef, { once: true, amount: 0.05 });

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-warm-white text-charcoal">
      {/* 1. Page Hero Banner */}
      <section className="bg-charcoal text-off-white pt-36 pb-20 px-6 md:px-16 lg:px-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-accent mb-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span className="text-off-white/70">Global Export &amp; Logistics</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
                <Ship className="w-3.5 h-3.5 text-accent" />
                <span>Direct Factory Container Stuffing · Tiruppur, India</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-off-white">
                GLOBAL EXPORT &amp;
                <br />
                <span className="text-accent">LOGISTICS.</span>
              </h1>
              <p className="text-sm sm:text-base text-off-white/80 mt-6 leading-relaxed">
                Order-to-shipment workflow transparency, bonded container transit, certified export documentation, and established deepwater seaport and air corridors connecting our manufacturing facilities in Tiruppur, India to destination ports worldwide.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 max-w-sm">
              <span className="text-xs font-mono uppercase tracking-widest text-accent block mb-2">
                Shipping Infrastructure
              </span>
              <p className="text-xs text-off-white/70 leading-relaxed font-mono">
                Direct container stuffing at Netaji Apparel Park // Bonded corridor to Tuticorin &amp; Chennai seaports // Coimbatore (CJB) Air Cargo // FOB, CIF &amp; CFR modes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Order-to-Shipment Workflow */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-off-white border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title={'ORDER-TO-SHIPMENT\nWORKFLOW.'}
            subtitle="A transparent 6-stage production and export pipeline ensuring on-time vessel departures, milestone visibility, and zero-defect compliance for international apparel buyers."
          />

          <div ref={workflowRef} className="mt-16 md:mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-charcoal/10 mb-8 gap-2">
              <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent font-bold">
                Buyer Sourcing Pipeline // 6 Operational Milestones
              </h3>
              <span className="text-[11px] font-mono text-muted-gray">
                Transparent Milestones &amp; Timelines
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ORDER_WORKFLOW.map((wf, index) => {
                const Icon = wf.icon;
                return (
                  <div
                    key={wf.step}
                    className="bg-pure-white border border-charcoal/10 p-6 md:p-7 flex flex-col justify-between hover:border-accent hover:shadow-md transition-all duration-300 relative group"
                    style={{
                      opacity: prefersReducedMotion || isWorkflowInView ? 1 : 0,
                      transform:
                        prefersReducedMotion || isWorkflowInView
                          ? 'translateY(0)'
                          : 'translateY(20px)',
                      transition: `opacity 0.4s ease-out ${index * 0.06}s, transform 0.4s ease-out ${index * 0.06}s`,
                    }}
                  >
                    <div>
                      {/* Top Row: Step Badge & Timeframe */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 bg-charcoal text-accent font-mono font-bold text-xs flex items-center justify-center">
                            {wf.step}
                          </span>
                          <div className="w-8 h-8 bg-off-white text-charcoal flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold px-2 py-1 bg-off-white border border-charcoal/5">
                          {wf.timeframe}
                        </span>
                      </div>

                      {/* Step Title & Summary */}
                      <h4 className="text-base font-bold text-charcoal uppercase tracking-wider mb-2">
                        {wf.title}
                      </h4>
                      <p className="text-xs text-charcoal/70 leading-relaxed font-normal mb-5">
                        {wf.summary}
                      </p>

                      {/* Expanded Checkpoints */}
                      <div className="space-y-2 mb-6">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-gray block">
                          Key Audit Points:
                        </span>
                        {wf.checkpoints.map((pt, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-start gap-2 text-[11px] text-charcoal/80"
                          >
                            <span className="text-accent font-bold text-xs mt-0.5">•</span>
                            <span className="leading-snug">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Verified Milestone Deliverable */}
                    <div className="pt-4 border-t border-charcoal/5 flex items-center gap-2 text-[11px] font-mono text-charcoal/90">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="font-semibold">{wf.deliverable}</span>
                    </div>

                    {/* Corner Accent Line */}
                    <div className="absolute top-0 right-0 w-8 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Export Documentation Section */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-pure-white border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title={'EXPORT\nDOCUMENTATION.'}
            subtitle="Standard export documentation provided with every shipment. Every export consignment from Fashion Knits is accompanied by fully authenticated shipping documents to guarantee prompt international customs clearance."
          />

          <div ref={docsRef} className="mt-16 md:mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-charcoal/10 mb-8 gap-2">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent font-bold">
                  Standard Export Documentation Package
                </h3>
              </div>
              <span className="text-[11px] font-mono text-accent font-semibold px-2.5 py-1 bg-off-white border border-charcoal/5">
                Standard export documentation provided with every shipment
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EXPORT_DOCUMENTS.map((doc, dIdx) => {
                const Icon = doc.icon;
                return (
                  <div
                    key={doc.id}
                    className="bg-off-white border border-charcoal/10 p-6 md:p-7 flex flex-col justify-between hover:border-accent transition-all duration-300"
                    style={{
                      opacity: prefersReducedMotion || isDocsInView ? 1 : 0,
                      transform:
                        prefersReducedMotion || isDocsInView ? 'translateY(0)' : 'translateY(20px)',
                      transition: `opacity 0.4s ease-out ${dIdx * 0.05}s, transform 0.4s ease-out ${dIdx * 0.05}s`,
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-charcoal text-accent flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal/60 px-2 py-0.5 bg-pure-white border border-charcoal/5 font-bold">
                          {doc.code}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-charcoal uppercase tracking-wider mb-2">
                        {doc.name}
                      </h4>
                      <p className="text-xs text-charcoal/70 leading-relaxed mb-5">
                        {doc.description}
                      </p>

                      <div className="space-y-2 mb-6 pt-4 border-t border-charcoal/10">
                        {doc.details.map((item, iIdx) => (
                          <div
                            key={iIdx}
                            className="flex items-start gap-2 text-[11px] text-charcoal/80"
                          >
                            <span className="text-accent font-bold">•</span>
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-charcoal/10 text-[10px] font-mono text-muted-gray uppercase tracking-wider">
                      Standard: <span className="text-charcoal font-semibold">{doc.standard}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Logistics Gateways */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-off-white border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title={'LOGISTICS\nGATEWAYS.'}
            subtitle="Direct arterial highway connectivity linking our Netaji Apparel Park manufacturing facility to South India's premier deepwater container seaports and international air cargo terminals."
          />

          <div ref={gatewaysRef} className="mt-16 md:mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-charcoal/10 mb-8 gap-2">
              <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-[0.2em]">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Origin: Shed No. 29, Netaji Apparel Park, New Tirupur 641666, India</span>
              </div>
              <span className="text-[11px] font-mono text-muted-gray">
                Bonded Customs Clearance on Site
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LOGISTICS_GATEWAYS.map((gate, gIdx) => {
                const Icon = gate.icon;
                return (
                  <div
                    key={gIdx}
                    className="bg-pure-white p-6 md:p-8 border border-charcoal/10 hover:border-accent shadow-sm transition-all duration-300 flex flex-col justify-between"
                    style={{
                      opacity: prefersReducedMotion || isGatewaysInView ? 1 : 0,
                      transform:
                        prefersReducedMotion || isGatewaysInView
                          ? 'translateY(0)'
                          : 'translateY(20px)',
                      transition: `opacity 0.4s ease-out ${gIdx * 0.08}s, transform 0.4s ease-out ${gIdx * 0.08}s`,
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-charcoal text-accent flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono text-charcoal/60 px-2 py-0.5 bg-off-white border border-charcoal/5 font-semibold">
                          {gate.distance}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-charcoal uppercase tracking-wider mb-1">
                        {gate.title}
                      </h4>
                      <p className="text-xs font-mono uppercase tracking-wider text-accent mb-4 font-semibold">
                        {gate.subtitle}
                      </p>
                      <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
                        {gate.detail}
                      </p>

                      <div className="space-y-2.5 pt-4 border-t border-charcoal/5">
                        {gate.specs.map((spec, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-start gap-2 text-[11px] text-charcoal/80"
                          >
                            <span className="text-accent font-bold mt-0.5">•</span>
                            <span className="leading-snug">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-center gap-2 text-[10px] font-mono text-muted-gray">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      <span>Regular Scheduled Departures</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Incoterms & Shipping Modes */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-pure-white border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title={'INCOTERMS & SHIPPING\nMODES.'}
            subtitle="We support internationally recognized ICC Incoterms rules tailored to buyer freight agreements, logistics workflows, and risk allocations."
          />

          <div ref={incotermsRef} className="mt-16 md:mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-charcoal/10 mb-8 gap-2">
              <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent font-bold">
                Commercial Shipping Arrangements
              </h3>
              <span className="text-[11px] font-mono text-accent font-semibold px-2.5 py-1 bg-off-white border border-charcoal/5">
                Incoterms availability subject to buyer agreement
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {INCOTERMS.map((term, tIdx) => (
                <div
                  key={term.term}
                  className="bg-off-white border border-charcoal/10 p-6 md:p-8 flex flex-col justify-between hover:border-accent transition-all duration-300"
                  style={{
                    opacity: prefersReducedMotion || isIncotermsInView ? 1 : 0,
                    transform:
                      prefersReducedMotion || isIncotermsInView
                        ? 'translateY(0)'
                        : 'translateY(20px)',
                    transition: `opacity 0.4s ease-out ${tIdx * 0.08}s, transform 0.4s ease-out ${tIdx * 0.08}s`,
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-charcoal text-accent font-mono font-bold text-xs tracking-wider">
                        {term.term}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-widest text-muted-gray">
                        {term.name}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-charcoal uppercase tracking-wider mb-2">
                      {term.name} ({term.term})
                    </h4>
                    <p className="text-xs text-charcoal/70 leading-relaxed mb-5">
                      {term.summary}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-charcoal/10 mb-6">
                      {term.responsibilities.map((resp, rIdx) => (
                        <div
                          key={rIdx}
                          className="flex items-start gap-2 text-[11px] text-charcoal/80"
                        >
                          <span className="text-accent font-bold mt-0.5">•</span>
                          <span className="leading-snug">{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-charcoal/10 bg-pure-white p-3 border border-charcoal/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-gray block mb-1">
                      Recommended For:
                    </span>
                    <p className="text-xs font-medium text-charcoal leading-snug">
                      {term.bestFor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Packaging Standards */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-off-white border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title={'EXPORT PACKAGING\nSTANDARDS.'}
            subtitle="Engineered packaging specifications designed to survive multi-week ocean transport, prevent humidity damage, and integrate seamlessly into automated retail distribution centers."
          />

          <div ref={packagingRef} className="mt-16 md:mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-charcoal/10 mb-8 gap-2">
              <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-accent font-bold">
                Export Carton &amp; Transit Engineering
              </h3>
              <span className="text-[11px] font-mono text-muted-gray">
                ISTA-1A Certified Packaging Protocols
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PACKAGING_STANDARDS.map((pack, pIdx) => {
                const Icon = pack.icon;
                return (
                  <div
                    key={pIdx}
                    className="bg-pure-white border border-charcoal/10 p-6 md:p-7 flex flex-col justify-between hover:border-accent hover:shadow-sm transition-all duration-300"
                    style={{
                      opacity: prefersReducedMotion || isPackagingInView ? 1 : 0,
                      transform:
                        prefersReducedMotion || isPackagingInView
                          ? 'translateY(0)'
                          : 'translateY(20px)',
                      transition: `opacity 0.4s ease-out ${pIdx * 0.06}s, transform 0.4s ease-out ${pIdx * 0.06}s`,
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-charcoal text-accent flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold px-2 py-0.5 bg-off-white border border-charcoal/5">
                          {pack.tag}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-charcoal uppercase tracking-wider mb-2">
                        {pack.title}
                      </h4>
                      <p className="text-xs text-charcoal/70 leading-relaxed mb-5">
                        {pack.description}
                      </p>

                      <div className="space-y-2 pt-4 border-t border-charcoal/5 mb-4">
                        {pack.specs.map((item, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-start gap-2 text-[11px] text-charcoal/80"
                          >
                            <span className="text-accent font-bold">•</span>
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-charcoal/10 flex items-center gap-1.5 text-[10px] font-mono text-muted-gray">
                      <Sparkles className="w-3.5 h-3.5 text-accent" />
                      <span>Retail Ready &amp; Barcode Verified</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA / Contact Inquiry */}
      <section className="py-20 px-6 md:px-16 lg:px-24 bg-warm-white">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 md:p-12 bg-charcoal text-off-white border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-widest mb-3">
                <Ship className="w-4 h-4 text-accent" />
                <span>Export Merchandising Desk · Tiruppur</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-off-white">
                Plan Your International Shipment
              </h3>
              <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed mt-3">
                Our export merchandising desk in Tiruppur assists international fashion buyers with freight schedule consultations, FOB/CIF quotations, sample dispatches, and factory container capacity bookings.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-accent">
                <span>✓ Angeripalayam Road HQ</span>
                <span>✓ Netaji Apparel Park Unit-1</span>
                <span>✓ export@fashionknits.com</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 relative z-10 w-full lg:w-auto">
              <button
                onClick={scrollToContact}
                className="px-6 py-4 bg-accent text-charcoal hover:bg-white text-xs font-mono uppercase tracking-widest font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Submit Export Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="mailto:export@fashionknits.com"
                className="px-6 py-4 bg-white/10 border border-white/20 text-off-white hover:bg-white/20 text-xs font-mono uppercase tracking-widest font-bold transition-colors flex items-center justify-center"
              >
                Direct Email
              </a>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
              <Ship className="w-80 h-80 text-white" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
