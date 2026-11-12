export type MaterialFilter = 'natural' | 'recycled' | 'blended' | 'lightweight' | 'heavier' | 'stretch' | 'soft-touch';

export interface MaterialDirection {
  id: string;
  name: string;
  kind: 'Fibre direction' | 'Fabric construction';
  composition: string;
  feel: string;
  breathability: string;
  stretch: string;
  applications: string;
  care: string;
  filters: MaterialFilter[];
}

export const MATERIAL_DIRECTIONS: MaterialDirection[] = [
  { id: 'organic-cotton', name: 'Organic cotton', kind: 'Fibre direction', composition: 'Cotton fibre; source and any required certification need confirmation for each programme.', feel: 'Soft, familiar hand with a natural surface.', breathability: 'Generally breathable; final result depends on yarn, knit and finish.', stretch: 'Low unless blended or knitted with stretch yarn.', applications: 'Everyday tees, baby essentials and relaxed tops.', care: 'Set care after fibre, dye and finish are approved.', filters: ['natural', 'soft-touch'] },
  { id: 'combed-cotton', name: 'Combed cotton', kind: 'Fibre direction', composition: 'Cotton yarn direction; fibre content and yarn specification are to be confirmed.', feel: 'Smooth, clean surface with a refined hand.', breathability: 'Generally breathable in lightweight constructions.', stretch: 'Depends on the knit structure or added stretch fibre.', applications: 'Premium jersey, polos and soft everyday layers.', care: 'Follow the approved care label for the final construction.', filters: ['natural', 'lightweight', 'soft-touch'] },
  { id: 'recycled-polyester', name: 'Recycled polyester', kind: 'Fibre direction', composition: 'Recycled polyester option; source, content and documentation require confirmation.', feel: 'Can range from smooth to lightly textured.', breathability: 'Varies with yarn, knit and finishing choices.', stretch: 'Depends on construction and any elastane content.', applications: 'Sport-inspired tops, colour-blocked layers and blends.', care: 'Care instructions depend on the finished blend and print.', filters: ['recycled', 'blended'] },
  { id: 'cotton-polyester', name: 'Cotton–polyester blend', kind: 'Fibre direction', composition: 'Cotton and polyester; the blend ratio is agreed during development.', feel: 'Balanced surface that can be smooth or lightly brushed.', breathability: 'Varies with ratio, yarn and construction.', stretch: 'Low unless the design includes a stretch component.', applications: 'Sweatshirts, tees and easy-care casualwear directions.', care: 'Confirm wash and finishing requirements on the approved sample.', filters: ['blended', 'heavier'] },
  { id: 'cotton-elastane', name: 'Cotton–elastane', kind: 'Fibre direction', composition: 'Cotton with elastane; the percentage is to be confirmed for the brief.', feel: 'Soft cotton hand with added recovery potential.', breathability: 'Depends on the cotton ratio and knit density.', stretch: 'Stretch is intended; recovery depends on yarn and construction.', applications: 'Fitted tees, rib tops and comfort-focused bottoms.', care: 'Care and recovery should be checked on the approved sample.', filters: ['natural', 'blended', 'stretch', 'soft-touch'] },
  { id: 'french-terry', name: 'French terry', kind: 'Fabric construction', composition: 'Loopback knit construction; fibre content is selected separately.', feel: 'Smooth face with looped reverse.', breathability: 'Varies with fibre, loop and fabric weight.', stretch: 'Some give from the knit; amount varies by construction.', applications: 'Sweatshirts, hoodies, joggers and coordinated sets.', care: 'Follow care guidance for the selected fibre and finish.', filters: ['heavier', 'soft-touch'] },
  { id: 'fleece', name: 'Fleece', kind: 'Fabric construction', composition: 'Brushed knit direction; fibre blend and brushing level need confirmation.', feel: 'Soft, brushed inner or outer face depending on finish.', breathability: 'Depends on density, fibre and brushing.', stretch: 'Usually modest; depends on base knit and blend.', applications: 'Sweatshirts, hoodies and cold-weather layers.', care: 'Final care depends on fibre content and surface finish.', filters: ['heavier', 'soft-touch'] },
  { id: 'single-jersey', name: 'Single jersey', kind: 'Fabric construction', composition: 'Knit structure; fibre content may be selected to suit the brief.', feel: 'Smooth face with a lighter, flexible drape.', breathability: 'Often breathable in lighter constructions.', stretch: 'Natural crosswise give; recovery varies by yarn and finishing.', applications: 'T-shirts, baby tops, dresses and lounge layers.', care: 'Set care after fibre, colour and finish are confirmed.', filters: ['lightweight', 'stretch', 'soft-touch'] },
  { id: 'pique', name: 'Piqué', kind: 'Fabric construction', composition: 'Textured knit structure; fibre content and surface are agreed separately.', feel: 'Distinctive small-scale texture with a more structured hand.', breathability: 'Varies by pique structure and fabric weight.', stretch: 'Moderate knit give may be present; confirm on sample.', applications: 'Polo shirts and structured casual tops.', care: 'Follow the approved care label for the selected fibre blend.', filters: ['natural', 'blended'] },
  { id: 'rib-knit', name: 'Rib knit', kind: 'Fabric construction', composition: 'Ribbed knit structure; fibre content and rib scale are specified separately.', feel: 'Defined vertical texture with a close, flexible hand.', breathability: 'Depends on fibre, gauge and density.', stretch: 'Typically flexible; recovery depends on the yarn blend.', applications: 'Necklines, cuffs, fitted tops and babywear directions.', care: 'Confirm stretch recovery and care on the approved sample.', filters: ['stretch', 'soft-touch'] },
  { id: 'interlock', name: 'Interlock', kind: 'Fabric construction', composition: 'Double-knit structure; fibre content is selected for the intended use.', feel: 'Smooth on both faces with a stable, substantial hand.', breathability: 'Varies with fibre, yarn and density.', stretch: 'Moderate give may be present; confirm finished recovery.', applications: 'Baby essentials, tees, sets and comfortable layers.', care: 'Set care based on the final material and finish.', filters: ['heavier', 'soft-touch'] },
  { id: 'viscose', name: 'Viscose', kind: 'Fibre direction', composition: 'Regenerated cellulose fibre; exact source and blend require confirmation.', feel: 'Fluid, smooth hand with a soft drape.', breathability: 'Often comfortable in lighter fabric constructions.', stretch: 'Depends on the knit or woven construction and blend.', applications: 'Draped tops, dresses and lightweight knitwear.', care: 'Care method depends on fabric construction and finishing.', filters: ['blended', 'lightweight', 'soft-touch'] },
  { id: 'modal', name: 'Modal', kind: 'Fibre direction', composition: 'Regenerated cellulose fibre; source and blend should be confirmed.', feel: 'Soft, smooth surface with a fluid feel.', breathability: 'Varies with fibre blend and fabric density.', stretch: 'Depends on the knit structure and any stretch fibre.', applications: 'Lounge tops, soft tees and lightweight layers.', care: 'Follow the final care label; verify colour and dimensional stability.', filters: ['blended', 'lightweight', 'soft-touch'] },
  { id: 'lyocell', name: 'Lyocell', kind: 'Fibre direction', composition: 'Regenerated cellulose fibre; source and content need confirmation.', feel: 'Smooth hand with a soft, fluid drape.', breathability: 'Depends on the yarn, blend and construction.', stretch: 'Depends on the fabric construction and fibre blend.', applications: 'Relaxed tops, dresses and soft-touch layers.', care: 'Care details depend on the chosen blend and finishing route.', filters: ['blended', 'lightweight', 'soft-touch'] },
  { id: 'linen-blend', name: 'Linen blend', kind: 'Fibre direction', composition: 'Linen combined with another fibre; blend ratio is to be agreed.', feel: 'Dry, natural texture with a relaxed surface.', breathability: 'Often suited to lighter warm-weather fabric directions.', stretch: 'Limited unless blended with a stretch fibre or knit structure.', applications: 'Warm-weather tops, relaxed dresses and light layers.', care: 'Confirm shrinkage, appearance and care on the selected sample.', filters: ['natural', 'blended', 'lightweight'] },
  { id: 'wool-blend', name: 'Wool blend', kind: 'Fibre direction', composition: 'Wool with a secondary fibre; fibre content and source require confirmation.', feel: 'Can range from soft and fine to textured and warm.', breathability: 'Varies by wool content, yarn and construction.', stretch: 'Depends on knit structure and fibre blend.', applications: 'Fine-gauge sweaters, cardigans and seasonal layers.', care: 'Care instructions depend on the exact fibre mix and finish.', filters: ['natural', 'blended', 'heavier', 'soft-touch'] },
];

export type TrendSeason = 'spring-summer' | 'autumn-winter' | 'year-round';

export interface TrendDirection {
  id: string;
  audience: string;
  audienceLabel: string;
  season: TrendSeason;
  title: string;
  description: string;
  colours: string[];
  fabrics: string[];
  garments: string[];
  image: string;
  imageAlt: string;
}

export const TREND_DIRECTIONS: TrendDirection[] = [
  { id: 'men-relaxed-essentials', audience: 'mens', audienceLabel: "Men's", season: 'year-round', title: 'Relaxed essentials', description: 'Easy proportions and considered surface details create a versatile base for a buyer-defined casualwear story.', colours: ['Soft ivory', 'Earth brown', 'Sage'], fabrics: ['Single jersey', 'French terry'], garments: ['Oversized tees', 'Relaxed co-ords'], image: '/assets/products/trend-edit/mens-art-graphic-tee.webp', imageAlt: 'Ivory graphic T-shirt concept with a buyer-replaceable art direction' },
  { id: 'men-textured-knit', audience: 'mens', audienceLabel: "Men's", season: 'spring-summer', title: 'Texture in motion', description: 'Textured polos and stripe scale offer a refined alternative to a plain surface.', colours: ['Marina blue', 'Soft ivory', 'Transformative teal'], fabrics: ['Piqué', 'Cotton knit'], garments: ['Textured polos', 'Striped knitwear'], image: '/assets/products/_normalized/perspective-mens-polo.webp', imageAlt: 'Classic knit polo product concept' },
  { id: 'men-layered-form', audience: 'mens', audienceLabel: "Men's", season: 'autumn-winter', title: 'Quiet structure', description: 'A softly structured layer brings shape and a subtle tactile finish to a seasonal range.', colours: ['Earth brown', 'Sage', 'Warm neutral'], fabrics: ['Fine-gauge knit', 'Interlock'], garments: ['Half-zip pullovers', 'Knit jackets'], image: '/assets/products/trend-edit/mens-half-zip-knit-pullover.webp', imageAlt: 'Olive half-zip knit product concept' },
  { id: 'women-open-knit', audience: 'womens', audienceLabel: "Women's", season: 'spring-summer', title: 'Openwork softness', description: 'Pointelle and airy stitch directions add texture while keeping the silhouette light.', colours: ['Soft ivory', 'Blue aura', 'Muskmelon'], fabrics: ['Lightweight knit', 'Cotton-viscose knit'], garments: ['Openwork tops', 'Layered knitwear'], image: '/assets/products/trend-edit/womens-striped-knit-polo.webp', imageAlt: 'Striped short-sleeve knit polo product concept' },
  { id: 'women-sculpted-rib', audience: 'womens', audienceLabel: "Women's", season: 'autumn-winter', title: 'Sculpted rib', description: 'A defined rib and raised neckline make a familiar layer feel more considered.', colours: ['Berry', 'Earth brown', 'Soft ivory'], fabrics: ['Rib knit', 'Cotton-modal jersey'], garments: ['Funnel-neck tops', 'Statement cardigans'], image: '/assets/products/trend-edit/womens-ribbed-funnel-neck-top.webp', imageAlt: 'Ribbed funnel-neck knit top product concept' },
  { id: 'women-soft-sets', audience: 'womens', audienceLabel: "Women's", season: 'year-round', title: 'Soft-set dressing', description: 'Coordinated pieces bring an easy, complete look to lounge and everyday collections.', colours: ['Sage', 'Warm neutral', 'Berry'], fabrics: ['Interlock', 'Soft jersey'], garments: ['Co-ord sets', 'Lounge layers'], image: '/assets/products/_normalized/perspective-womens-sweatshirt.webp', imageAlt: 'Clean-cut sweatshirt product concept' },
  { id: 'kids-colour-play', audience: 'kids', audienceLabel: "Kids'", season: 'spring-summer', title: 'Colour-block play', description: 'Balanced blocks and lively contrast give everyday shapes a playful collection point of view.', colours: ['Marina blue', 'Acacia', 'Soft ivory'], fabrics: ['Cotton jersey', 'Piqué'], garments: ['Rugby tops', 'Everyday tees'], image: '/assets/products/trend-edit/kids-modern-rugby-top.webp', imageAlt: 'Colour-block kids rugby top product concept' },
  { id: 'kids-easy-coordinates', audience: 'kids', audienceLabel: "Kids'", season: 'year-round', title: 'Easy coordinates', description: 'Comfortable separates in a shared palette make matching sets feel relaxed and versatile.', colours: ['Sage', 'Warm neutral', 'Muskmelon'], fabrics: ['Single jersey', 'French terry'], garments: ['Tee and short sets', 'Pull-on bottoms'], image: '/assets/products/_normalized/perspective-kids-set.webp', imageAlt: 'Kids coordinated T-shirt and short set concept' },
  { id: 'kids-layered-comfort', audience: 'kids', audienceLabel: "Kids'", season: 'autumn-winter', title: 'Comfort in layers', description: 'Soft sweats and familiar knits make room for seasonal layering and age-appropriate detail.', colours: ['Blue aura', 'Soft ivory', 'Berry'], fabrics: ['Fleece', 'Cotton knit'], garments: ['Sweatshirts', 'Crew sweaters'], image: '/assets/products/_normalized/perspective-kids-sweater.webp', imageAlt: 'Kids crew-neck sweater product concept' },
  { id: 'baby-soft-everyday', audience: 'babies-toddler', audienceLabel: 'Babies & toddler', season: 'year-round', title: 'Soft everyday layers', description: 'Gentle colour and straightforward silhouettes shape a calm foundation for infant essentials.', colours: ['Soft ivory', 'Sage', 'Blue aura'], fabrics: ['Interlock', 'Cotton rib'], garments: ['Baby tops', 'Sleepsuits'], image: '/assets/products/_normalized/perspective-baby-top.webp', imageAlt: 'Soft baby top product concept' },
  { id: 'baby-earthy-stripe', audience: 'babies-toddler', audienceLabel: 'Babies & toddler', season: 'spring-summer', title: 'A softer stripe', description: 'A quiet stripe brings just enough expression to a practical, easy-to-coordinate shape.', colours: ['Sage', 'Soft ivory', 'Muskmelon'], fabrics: ['Cotton rib', 'Single jersey'], garments: ['Rompers', 'Matching sets'], image: '/assets/products/trend-edit/baby-striped-rib-romper.webp', imageAlt: 'Sage and cream striped baby romper concept' },
  { id: 'baby-practical-sets', audience: 'babies-toddler', audienceLabel: 'Babies & toddler', season: 'autumn-winter', title: 'Practical little layers', description: 'Considered one-pieces and soft layers keep the focus on comfort, movement and a clear buyer brief.', colours: ['Warm neutral', 'Blue aura', 'Berry'], fabrics: ['Interlock', 'Cotton-modal jersey'], garments: ['Rompers', 'Sleepwear'], image: '/assets/products/_normalized/perspective-baby-sleeper.webp', imageAlt: 'Footed baby sleepsuit product concept' },
];

export const PALETTE_DIRECTIONS = [
  { name: 'Transformative teal', hex: '#176b70', pairing: 'Soft ivory · earth brown' },
  { name: 'Blue aura', hex: '#a8bdc9', pairing: 'Warm neutral · deep navy' },
  { name: 'Marina blue', hex: '#496a86', pairing: 'Soft ivory · acacia' },
  { name: 'Sage', hex: '#adb7a5', pairing: 'Soft ivory · earth brown' },
  { name: 'Acacia', hex: '#c4a45a', pairing: 'Deep navy · warm neutral' },
  { name: 'Muskmelon', hex: '#e49a7b', pairing: 'Soft ivory · sage' },
  { name: 'Berry', hex: '#915264', pairing: 'Soft ivory · warm neutral' },
  { name: 'Earth brown', hex: '#75604f', pairing: 'Blue aura · soft ivory' },
  { name: 'Soft ivory', hex: '#e9e3d8', pairing: 'Transformative teal · berry' },
  { name: 'Warm neutral', hex: '#c9bdab', pairing: 'Sage · deep navy' },
  { name: 'Electric lime', hex: '#c5d333', pairing: 'Deep navy · soft ivory' },
  { name: 'Signal coral', hex: '#e16454', pairing: 'Marina blue · soft ivory' },
];

export const STYLE_INSPIRATION = [
  { title: 'Premium basics', note: 'Precise proportions, quiet surfaces and thoughtful finishing.', image: '/assets/products/showcase/mens-tee-polo.webp', alt: 'Folded jersey and polo garment concepts', label: 'Everyday essentials' },
  { title: 'Textured knitwear', note: 'Stitch, stripe and rib become the defining detail.', image: '/assets/products/showcase/perspective-womens-cardigan.webp', alt: 'Textured cardigan product concept', label: 'Modern knit' },
  { title: 'Sport-inspired casual', note: 'Functional shapes with a comfortable, relaxed hand.', image: '/assets/products/showcase/perspective-mens-hoodie.webp', alt: 'Dark hoodie product concept', label: 'Casualwear' },
  { title: 'Playful kidswear', note: 'Simple silhouettes with confident colour and graphic placement.', image: '/assets/products/trend-edit/kids-modern-rugby-top.webp', alt: 'Colour-block kids rugby top concept', label: 'Kidswear' },
  { title: 'Soft infant layers', note: 'Gentle palettes and practical shapes for everyday dressing.', image: '/assets/products/showcase/perspective-baby-romper.webp', alt: 'Infant romper product concept', label: 'Babywear' },
];

export const DEVELOPMENT_STEPS = [
  { title: 'Product concept', detail: 'Align the silhouette, use and visual direction.' },
  { title: 'Fabric & yarn', detail: 'Review fibre, construction, hand-feel and colour.' },
  { title: 'Sampling', detail: 'Develop a sample against the buyer brief.' },
  { title: 'Pattern & fit', detail: 'Review measurements, proportions and size set.' },
  { title: 'Garment production', detail: 'Confirm the approved construction and order plan.' },
  { title: 'Quality review', detail: 'Agree checks against the approved specification.' },
  { title: 'Finishing & pack', detail: 'Confirm labels, trims and packaging details.' },
  { title: 'Dispatch planning', detail: 'Align shipment details with the confirmed order.' },
];
