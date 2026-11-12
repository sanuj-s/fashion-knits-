import { EQUIPMENT_ITEMS } from '@/src/data/company-content';

export type ProcessId = 'pattern-cut' | 'digital-print' | 'screen-print' | 'embroidery';

export type MachineHotspot = {
  id: string;
  label: string;
  detail: string;
  x: number;
  y: number;
};

export type MachineSource = {
  label: string;
  url: string;
  context: string;
};

export type MachineCapability = {
  title: string;
  detail: string;
  sourceLabel: string;
};

export type MachineStep = {
  title: string;
  detail: string;
};

export type MachineTechnicalFact = {
  label: string;
  value: string;
  scope: 'company inventory' | 'manufacturer family';
};

export type ShowroomMachine = {
  id: string;
  name: string;
  manufacturer: string;
  model?: string;
  process: ProcessId;
  image: string;
  imageWidth: number;
  imageHeight: number;
  primaryFunction: string;
  overview: string;
  garmentOutcome: string;
  buyerPrompt: string;
  capabilities: readonly MachineCapability[];
  howSteps: readonly MachineStep[];
  technicalFacts: readonly MachineTechnicalFact[];
  configurationContext: string;
  sources: readonly MachineSource[];
  hotspots: readonly MachineHotspot[];
};

export const PROCESS_STAGES: ReadonlyArray<{
  id: ProcessId;
  number: string;
  title: string;
  description: string;
}> = [
  {
    id: 'pattern-cut',
    number: '01',
    title: 'Pattern & cut',
    description: 'Prepare and cut fabric components for garment construction.',
  },
  {
    id: 'digital-print',
    number: '02',
    title: 'Digital printing',
    description: 'Apply approved artwork digitally where the style calls for it.',
  },
  {
    id: 'screen-print',
    number: '03',
    title: 'Screen printing',
    description: 'Print approved artwork through prepared screens where specified.',
  },
  {
    id: 'embroidery',
    number: '04',
    title: 'Embroidery',
    description: 'Add stitched decoration when it is part of the garment brief.',
  },
];

type EquipmentName = (typeof EQUIPMENT_ITEMS)[number]['name'];

type MachineDetails = Omit<ShowroomMachine, 'image'> & {
  imageSource: EquipmentName;
};

const MACHINE_DETAILS: Record<EquipmentName, MachineDetails> = {
  'Lectra fully automatic cutting machine': {
    id: 'lectra',
    name: 'Lectra fully automatic cutting machine',
    manufacturer: 'Lectra',
    process: 'pattern-cut',
    imageSource: 'Lectra fully automatic cutting machine',
    imageWidth: 600,
    imageHeight: 450,
    primaryFunction: 'Automatic fabric cutting',
    overview: 'A prepared marker guides the cutter as it turns fabric into accurately shaped garment panels, ready for the next production steps.',
    garmentOutcome: 'Cut panels prepared for sewing and garment assembly.',
    buyerPrompt: 'For a production brief, discuss the fabric construction, marker data and panel requirements with the Fashion Knits team.',
    capabilities: [
      {
        title: 'Pattern-led cutting',
        detail: 'A cutting plan defines the shapes and placement of the garment panels across the fabric lay.',
        sourceLabel: 'Cutting process',
      },
      {
        title: 'A broad apparel range',
        detail: 'Lectra’s Vector Fashion family covers multiple production models and fabrics, including knits, wovens, denim and lace.',
        sourceLabel: 'Vector Fashion family',
      },
      {
        title: 'Different production scales',
        detail: 'Lectra describes Vector variants for small series through high-volume production; the options vary by model.',
        sourceLabel: 'Vector Fashion family',
      },
    ],
    howSteps: [
      { title: 'Prepare the marker', detail: 'Approved pattern pieces are arranged into a cutting plan for the order.' },
      { title: 'Position the fabric', detail: 'Fabric is laid out and secured according to the planned cut.' },
      { title: 'Cut the panels', detail: 'The cutting head follows the marker paths to separate garment components.' },
    ],
    technicalFacts: [
      { label: 'Fashion Knits equipment', value: 'Lectra fully automatic cutting machine', scope: 'company inventory' },
      { label: 'Manufacturer reference', value: 'Vector Fashion automatic fabric cutting range', scope: 'manufacturer family' },
    ],
    configurationContext: 'Fashion Knits identifies an automatic Lectra cutter. Vector Fashion is included as a manufacturer-family reference; model-specific features depend on the installed machine.',
    sources: [
      { label: 'Lectra · Vector Fashion', url: 'https://www.lectra.com/en/fashion/products/vector-fashion', context: 'Manufacturer product family' },
    ],
    hotspots: [
      { id: 'cutting-head', label: 'Cutting head', detail: 'The visible head moves across the work area to follow the prepared cutting plan.', x: 54, y: 37 },
      { id: 'cutting-surface', label: 'Cutting surface', detail: 'The table supports the fabric lay while the cutter separates the garment panels.', x: 73, y: 59 },
    ],
  },
  'Bullmer E80 fully automatic cutting machine': {
    id: 'bullmer-e80',
    name: 'Bullmer E80 fully automatic cutting machine',
    manufacturer: 'Bullmer',
    model: 'E80',
    process: 'pattern-cut',
    imageSource: 'Bullmer E80 fully automatic cutting machine',
    imageWidth: 527,
    imageHeight: 323,
    primaryFunction: 'Automatic fabric cutting',
    overview: 'Automated cutting separates the fabric shapes in a garment plan into panels for sewing. Fashion Knits’ equipment list names a Bullmer E80.',
    garmentOutcome: 'Fabric components cut to the planned garment shapes.',
    buyerPrompt: 'For a particular style, confirm fabric type, lay arrangement and the cutting route with the production team.',
    capabilities: [
      {
        title: 'Single-ply and high-ply approaches',
        detail: 'Bullmer’s apparel range includes separate single-ply and high-ply cutting systems designed for different order and material needs.',
        sourceLabel: 'Bullmer apparel range',
      },
      {
        title: 'Pattern matching',
        detail: 'Bullmer documents scanner-assisted matching for patterned checks and stripes on its Premiumcut single-ply system.',
        sourceLabel: 'Premiumcut family',
      },
      {
        title: 'High-ply cutting',
        detail: 'Bullmer’s Procut apparel information describes high-ply cutting; the published cut height depends on material and product configuration.',
        sourceLabel: 'Procut family',
      },
    ],
    howSteps: [
      { title: 'Set the cut plan', detail: 'The production plan determines panel shapes and fabric placement.' },
      { title: 'Arrange the lay', detail: 'Fabric is prepared on the cutter bed for the selected job.' },
      { title: 'Cut and collect', detail: 'The cutter traces the planned shapes; the finished pieces move to the next operation.' },
    ],
    technicalFacts: [
      { label: 'Fashion Knits equipment', value: 'Bullmer E80 fully automatic cutting machine', scope: 'company inventory' },
      { label: 'Manufacturer reference', value: 'Bullmer apparel cutting systems', scope: 'manufacturer family' },
    ],
    configurationContext: 'Bullmer’s apparel portfolio includes several cutting-system families. Model-specific cutting height and options vary by the selected E80 build.',
    sources: [
      { label: 'Bullmer · Apparel cutting', url: 'https://www.bullmer.de/en/industries/apparel/', context: 'Manufacturer apparel range' },
      { label: 'Bullmer · Procut D 8001 brochure', url: 'https://www.bullmer.de/wp-content/uploads/2019/12/Procut_D_8001_S-ENG_small.pdf', context: 'Procut family documentation' },
    ],
    hotspots: [
      { id: 'cutting-gantry', label: 'Cutting carriage', detail: 'The visible carriage travels along the cutter bridge over the fabric work area.', x: 33, y: 37 },
      { id: 'fabric-bed', label: 'Fabric bed', detail: 'The table supports the fabric while the cutter follows the planned shapes.', x: 73, y: 65 },
    ],
  },
  'Kornit Storm 931 digital printing machine': {
    id: 'kornit-storm-931',
    name: 'Kornit Storm 931 digital printing machine',
    manufacturer: 'Kornit Digital',
    model: 'Storm 931',
    process: 'digital-print',
    imageSource: 'Kornit Storm 931 digital printing machine',
    imageWidth: 746,
    imageHeight: 432,
    primaryFunction: 'Direct-to-garment digital printing',
    overview: 'Digital artwork is printed onto a supported garment surface. Kornit’s history describes the 930/931 generation as early production direct-to-garment systems.',
    garmentOutcome: 'A printed garment or textile surface when digital print is specified for the style.',
    buyerPrompt: 'Discuss garment type, print placement, artwork and an approved print sample for the order.',
    capabilities: [
      {
        title: 'Digital artwork workflow',
        detail: 'The print image is prepared digitally and applied to the garment surface at the print area.',
        sourceLabel: 'Direct-to-garment process',
      },
      {
        title: 'A distinct decoration route',
        detail: 'Digital garment printing does not use the prepared screens required by screen printing.',
        sourceLabel: 'Process distinction',
      },
      {
        title: 'Storm 931 lineage',
        detail: 'Kornit’s published company history groups the 930/931 systems with its early production DTG generation.',
        sourceLabel: 'Kornit product history',
      },
    ],
    howSteps: [
      { title: 'Prepare artwork', detail: 'Approved artwork and placement are set for the garment program.' },
      { title: 'Position the garment', detail: 'The garment is placed on the print area for the digital print pass.' },
      { title: 'Print the image', detail: 'The printer applies the approved digital artwork to the supported surface.' },
    ],
    technicalFacts: [
      { label: 'Fashion Knits equipment', value: 'Kornit Storm 931 digital printing machine', scope: 'company inventory' },
      { label: 'Documented process', value: 'Direct-to-garment digital printing', scope: 'manufacturer family' },
    ],
    configurationContext: 'Fashion Knits identifies a Kornit Storm 931. Model-specific options and operating settings depend on the machine’s installed configuration.',
    sources: [
      { label: 'Kornit · product history', url: 'https://www.kornit.com/magazine/kornit-digital-history/', context: 'Manufacturer history of the 930/931 generation' },
      { label: 'Kornit · direct-to-garment printing', url: 'https://www.kornit.com/direct-to-garment/', context: 'Manufacturer process overview' },
    ],
    hotspots: [
      { id: 'print-area', label: 'Print area', detail: 'The garment is held at the print area while approved artwork is applied digitally.', x: 28, y: 55 },
      { id: 'operator-display', label: 'Operator display', detail: 'The screen is the visible operator interface; this image does not establish installed software or settings.', x: 65, y: 35 },
    ],
  },
  'M&R Challenger II printing machine': {
    id: 'challenger-ii',
    name: 'M&R Challenger II printing machine',
    manufacturer: 'M&R',
    model: 'Challenger II',
    process: 'screen-print',
    imageSource: 'M&R Challenger II printing machine',
    imageWidth: 719,
    imageHeight: 350,
    primaryFunction: 'Automatic screen printing',
    overview: 'Prepared screens transfer ink to a garment or cut piece positioned on a pallet. Multiple print stations can be used for multi-colour artwork when the style calls for it.',
    garmentOutcome: 'Screen-printed artwork on an approved garment or cut piece.',
    buyerPrompt: 'Discuss artwork colours, placement, print sample approval and the garment or panel to be printed.',
    capabilities: [
      {
        title: 'Indexed print stations',
        detail: 'M&R documents servo-driven indexing and electric printheads across the Challenger II family.',
        sourceLabel: 'Challenger II family',
      },
      {
        title: 'Multi-print setup',
        detail: 'The family supports multiple print strokes and programmed printhead sequences; the press configuration determines available options.',
        sourceLabel: 'Challenger II family',
      },
      {
        title: 'Registration and setup',
        detail: 'M&R documents pallet location, screen registration and print/flood adjustments as part of the press workflow.',
        sourceLabel: 'Challenger II family',
      },
    ],
    howSteps: [
      { title: 'Prepare the screens', detail: 'Approved artwork is separated into screen layers for the print plan.' },
      { title: 'Position the garment', detail: 'A garment or cut piece is placed and aligned on the print pallet.' },
      { title: 'Print each pass', detail: 'The press indexes prepared screens to apply the required ink layers.' },
    ],
    technicalFacts: [
      { label: 'Fashion Knits equipment', value: 'M&R Challenger II printing machine', scope: 'company inventory' },
      { label: 'Published family variants', value: '10–18 colour models; maximum image area 50 × 70 cm (20 × 28 in)', scope: 'manufacturer family' },
    ],
    configurationContext: 'Published Challenger II colour counts and print areas vary by model. The family options shown here are manufacturer specifications.',
    sources: [
      { label: 'M&R · Challenger II brochure', url: 'https://www.mrprint.com/brochures/challenger-ii-ii-os-automatic-screen-printing-presses-20160829-9r6V09X0r20144yr.pdf', context: 'Manufacturer brochure; family features and options' },
    ],
    hotspots: [
      { id: 'print-station', label: 'Print station', detail: 'The screen and squeegee at a print station carry out one ink pass on the garment or panel below.', x: 70, y: 47 },
      { id: 'garment-pallet', label: 'Garment pallet', detail: 'The pallet supports and locates the garment or cut piece beneath the screen.', x: 42, y: 70 },
    ],
  },
  'Sportsman EX printing machine': {
    id: 'sportsman-ex',
    name: 'M&R Sportsman EX printing machine',
    manufacturer: 'M&R',
    model: 'Sportsman EX',
    process: 'screen-print',
    imageSource: 'Sportsman EX printing machine',
    imageWidth: 659,
    imageHeight: 322,
    primaryFunction: 'Automatic screen printing',
    overview: 'A rotating indexer brings a positioned garment beneath prepared screens. The press can apply separate print passes for artwork that calls for screen printing.',
    garmentOutcome: 'Screen-printed artwork on an approved garment or cut piece.',
    buyerPrompt: 'For the order, confirm artwork colours, print placement, garment position and the approved strike-off.',
    capabilities: [
      {
        title: 'Controlled print passes',
        detail: 'M&R lists electric printheads, servo-driven indexing and multiple print-stroke capability for Sportsman EX presses.',
        sourceLabel: 'Sportsman EX family',
      },
      {
        title: 'Digital operator interface',
        detail: 'The product family documentation describes a colour touchscreen, self-diagnostics and production information.',
        sourceLabel: 'Sportsman EX family',
      },
      {
        title: 'Garment positioning',
        detail: 'M&R describes a locator system to assist with positioning garments and cut pieces on the pallets.',
        sourceLabel: 'Sportsman EX family',
      },
    ],
    howSteps: [
      { title: 'Load the garment', detail: 'The garment or cut piece is placed on a pallet at the loading position.' },
      { title: 'Register the artwork', detail: 'Prepared screens are aligned to the garment print location.' },
      { title: 'Index through print passes', detail: 'The carousel advances the pallet through the selected screen-printing sequence.' },
    ],
    technicalFacts: [
      { label: 'Fashion Knits equipment', value: 'Sportsman EX printing machine', scope: 'company inventory' },
      { label: 'Published family options', value: '6–12 colour models; image areas vary by model up to 51 × 71 cm (20 × 28 in)', scope: 'manufacturer family' },
    ],
    configurationContext: 'Sportsman EX colour, print-area and station options vary by model. The figures shown describe the manufacturer’s range.',
    sources: [
      { label: 'M&R · Sportsman EX press', url: 'https://www.mrprint.com/equipment/sportsman-ex-automatic-screen-printing-press', context: 'Manufacturer product range, features and specifications' },
    ],
    hotspots: [
      { id: 'print-station', label: 'Print station', detail: 'A prepared screen applies an ink pass as the pallet indexes beneath the printhead.', x: 73, y: 52 },
      { id: 'control-panel', label: 'Control panel', detail: 'The visible display is the operator interface shown in this equipment view.', x: 50, y: 40 },
    ],
  },
  'M&R Alpha 8 Oval printing machine': {
    id: 'alpha-8-oval',
    name: 'M&R Alpha 8 Oval printing machine',
    manufacturer: 'M&R',
    model: 'Alpha 8 Oval',
    process: 'screen-print',
    imageSource: 'M&R Alpha 8 Oval printing machine',
    imageWidth: 732,
    imageHeight: 272,
    primaryFunction: 'Oval automatic screen printing',
    overview: 'An oval index path carries garments or cut pieces through screen-printing stations. The process supports designs assigned to screen printing in the approved garment plan.',
    garmentOutcome: 'Screen-printed artwork on a garment or cut piece, when specified.',
    buyerPrompt: 'Discuss the artwork sequence, panel or garment placement, and any sample approval needed for the print.',
    capabilities: [
      {
        title: 'Oval production path',
        detail: 'M&R describes the oval format as a way to arrange printing, loading and unloading stations in a flexible layout.',
        sourceLabel: 'Alpha 8 family',
      },
      {
        title: 'Modular station layout',
        detail: 'The Alpha 8 family uses expandable modules; printhead placement and station count vary with the configured model.',
        sourceLabel: 'Alpha 8 family',
      },
      {
        title: 'Textile applications',
        detail: 'M&R lists items such as T-shirts, hooded sweatshirts, pant legs and cut pieces as Alpha 8 application examples.',
        sourceLabel: 'Alpha 8 family',
      },
    ],
    howSteps: [
      { title: 'Place the garment or panel', detail: 'The operator positions the item on an oval-line pallet.' },
      { title: 'Move through selected stations', detail: 'The indexer carries each pallet through print and any specified flash or open stations.' },
      { title: 'Complete the print sequence', detail: 'The configured screens apply the approved artwork layers before the item leaves the line.' },
    ],
    technicalFacts: [
      { label: 'Fashion Knits equipment', value: 'M&R Alpha 8 Oval printing machine', scope: 'company inventory' },
      { label: 'Published family formats', value: 'Alpha 8 5070, 6080 and 80110; station and print-area layouts vary by model', scope: 'manufacturer family' },
    ],
    configurationContext: 'Alpha 8 layouts support different station counts and placements. The configurations shown are manufacturer family options.',
    sources: [
      { label: 'M&R · Alpha 8 brochure', url: 'https://www.mrprint.com/brochures/alpha-8-automatic-screen-printing-press-en-20150925-9r6VnmmXr20144yr.pdf', context: 'Manufacturer brochure; family layout and options' },
    ],
    hotspots: [
      { id: 'oval-stations', label: 'Oval print stations', detail: 'The linked stations carry garment pallets through a configured screen-printing sequence.', x: 55, y: 55 },
      { id: 'control-panel', label: 'Control panel', detail: 'The visible display is the operator interface shown at the end of the oval press.', x: 93, y: 26 },
    ],
  },
  'Barudan embroidery machine': {
    id: 'barudan-embroidery',
    name: 'Barudan embroidery machine',
    manufacturer: 'Barudan',
    process: 'embroidery',
    imageSource: 'Barudan embroidery machine',
    imageWidth: 500,
    imageHeight: 274,
    primaryFunction: 'Machine embroidery',
    overview: 'A digitized stitch path guides the machine as thread is sewn into supported fabric. Embroidery is used when the garment design calls for stitched artwork.',
    garmentOutcome: 'An embroidered mark or design on the garment or fabric piece specified for the order.',
    buyerPrompt: 'Discuss the artwork file, stitch sample, placement and garment construction before confirming an embroidered style.',
    capabilities: [
      {
        title: 'Commercial embroidery formats',
        detail: 'Barudan’s catalogue includes single-head, compact-bridge, multi-head and other commercial machine families.',
        sourceLabel: 'Barudan product range',
      },
      {
        title: 'Frame-based work',
        detail: 'The selected frame holds the work area for stitching; frame and product fit depend on the installed machine and attachment.',
        sourceLabel: 'Embroidery process',
      },
      {
        title: 'A wide apparel range',
        detail: 'Barudan’s product information shows embroidery applications across clothing and other sewn products, depending on model and frame.',
        sourceLabel: 'Barudan product range',
      },
    ],
    howSteps: [
      { title: 'Prepare the stitch file', detail: 'Approved artwork is digitized into the stitch sequence for the chosen placement.' },
      { title: 'Hoop or frame the work', detail: 'The fabric or garment section is stabilized in a compatible frame.' },
      { title: 'Stitch the design', detail: 'Needles and thread build the embroidery along the programmed path.' },
    ],
    technicalFacts: [
      { label: 'Fashion Knits equipment', value: 'Barudan embroidery machine', scope: 'company inventory' },
      { label: 'Manufacturer reference', value: 'Commercial machine families include single-head, compact-bridge and multi-head lines', scope: 'manufacturer family' },
    ],
    configurationContext: 'Barudan’s commercial range includes single-head, compact-bridge and multi-head machines. Head, needle and frame details depend on the selected model.',
    sources: [
      { label: 'Barudan · product range', url: 'https://barudan.co.jp/en/product/', context: 'Manufacturer machine families and applications' },
    ],
    hotspots: [
      { id: 'needle-heads', label: 'Needle head assembly', detail: 'The visible needle heads form the stitches along the design path on the framed workpiece.', x: 58, y: 40 },
      { id: 'work-bed', label: 'Embroidery bed', detail: 'The bed and frame area support the fabric while the design is stitched.', x: 50, y: 73 },
    ],
  },
  'Tajima embroidery machines': {
    id: 'tajima-embroidery',
    name: 'Tajima embroidery machines',
    manufacturer: 'Tajima',
    process: 'embroidery',
    imageSource: 'Tajima embroidery machines',
    imageWidth: 900,
    imageHeight: 519,
    primaryFunction: 'Commercial machine embroidery',
    overview: 'Tajima’s commercial embroidery machines stitch digitized designs onto supported garments or fabric. Fashion Knits’ equipment list records Tajima embroidery machines.',
    garmentOutcome: 'An embroidered detail, logo or design on a garment or textile piece when included in the style brief.',
    buyerPrompt: 'Discuss the digitized design, garment placement and stitch sample with the team before production approval.',
    capabilities: [
      {
        title: 'Single-head and multi-head lines',
        detail: 'Tajima’s commercial range includes single-head and multi-head embroidery machines for different production needs.',
        sourceLabel: 'Tajima commercial range',
      },
      {
        title: 'Cylinder and flat formats',
        detail: 'The product range includes cylinder-type and flat-type machines; the best format depends on the item and installed model.',
        sourceLabel: 'Tajima product range',
      },
      {
        title: 'Finished-product applications',
        detail: 'Tajima describes applications such as logo and emblem embroidery on finished apparel; exact suitability depends on machine and frame.',
        sourceLabel: 'Tajima commercial range',
      },
    ],
    howSteps: [
      { title: 'Digitize the artwork', detail: 'The design is translated into a stitch sequence and approved for placement.' },
      { title: 'Secure the garment area', detail: 'A compatible frame stabilizes the part of the item to be embroidered.' },
      { title: 'Run the stitch sequence', detail: 'The head follows the programmed path to create the embroidery.' },
    ],
    technicalFacts: [
      { label: 'Fashion Knits equipment', value: 'Tajima embroidery machines', scope: 'company inventory' },
      { label: 'Manufacturer reference', value: 'Commercial single-head and multi-head cylinder or flat-type lines', scope: 'manufacturer family' },
    ],
    configurationContext: 'Tajima’s range includes single-head and multi-head cylinder and flat formats. Head, needle and frame details depend on the selected model.',
    sources: [
      { label: 'Tajima · commercial embroidery machines', url: 'https://www.tajima.com/product/commercial-embroidery-machines/', context: 'Manufacturer product range and applications' },
      { label: 'Tajima · product lineup', url: 'https://www.tajima.com/product/', context: 'Manufacturer product categories' },
    ],
    hotspots: [
      { id: 'needle-heads', label: 'Needle head assembly', detail: 'The visible heads stitch a programmed design into the fabric held below them.', x: 53, y: 42 },
      { id: 'work-bed', label: 'Embroidery bed', detail: 'The work area supports the garment frame as the embroidery design is stitched.', x: 50, y: 77 },
    ],
  },
};

export const SHOWROOM_MACHINES: readonly ShowroomMachine[] = EQUIPMENT_ITEMS.map((item) => {
  const details = MACHINE_DETAILS[item.name];
  return {
    ...details,
    image: item.image,
  };
});
