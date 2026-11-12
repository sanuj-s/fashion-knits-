/** Original, buyer-led garment concepts for the Fashion Knits showroom. */

export type GarmentAngle = 'front' | 'back' | 'left' | 'right' | 'detail';

export interface GarmentViews {
  /** Each entry must be a real image of the same garment at the named angle. */
  front: string;
  back?: string;
  left?: string;
  right?: string;
  detail?: string;
}

export interface GarmentColorway {
  name: string;
  swatch: string;
}

export interface GarmentReference {
  id: string;
  category: string;
  name: string;
  description: string;
  construction: string;
  /** Official-brand references are editorial research only, never product claims. */
  designReference?: {
    label: string;
    url: string;
  };
  views: GarmentViews;
  scale?: number;
  /** Add a hanger graphic when the supplied front image has no hanger. */
  hasHanger?: boolean;
  isStyleConcept?: boolean;
  /** Range directions remain proposals until a buyer confirms a tech pack. */
  fabricOptions: string[];
  colorways: GarmentColorway[];
  customizationOptions: string[];
}

export interface AudienceCollection {
  id: string;
  label: string;
  garments: GarmentReference[];
}

const references = {
  bossKnit: { label: 'BOSS · modern knit essentials', url: 'https://www.hugoboss.com/us/v/knit-shirts' },
  bossPolo: { label: 'BOSS · knitted polo direction', url: 'https://www.hugoboss.com/men-knitted-polos_black/' },
  zegna: { label: 'ZEGNA · refined knitwear', url: 'https://www.zegna.com/uk-en/ready-to-wear/knitwear/' },
  armani: { label: 'Emporio Armani · contemporary knitwear', url: 'https://www.armani.com/en-us/emporio-armani/woman/clothing/knitwear/' },
  armaniBaby: { label: 'Emporio Armani · babywear', url: 'https://www.armani.com/en-us/emporio-armani/kids/baby-boy/clothing/' },
  burberry: { label: 'Burberry · women’s knitwear', url: 'https://int.burberry.com/l/womens-clothing/knitwear/' },
  diorKids: { label: 'Dior · kidswear', url: 'https://www.dior.com/en_us/fashion/kids/summer-collection' },
  ralphLauren: { label: 'Ralph Lauren · baby and kidswear', url: 'https://www.ralphlauren.com/baby' },
};

function garment(
  item: Omit<GarmentReference, 'views'> & { frontImage: string },
): GarmentReference {
  const { frontImage, ...details } = item;
  return { ...details, scale: details.scale ?? 1, isStyleConcept: true, views: { front: frontImage } };
}

export const AUDIENCE_COLLECTIONS: AudienceCollection[] = [
  {
    id: 'mens',
    label: "Men's",
    garments: [
      garment({
        id: 'mens-concept-minimal-logo-tee',
        category: "Men's apparel",
        name: 'Compact jersey crew T-shirt',
        description: 'A clean, slightly relaxed crew with a substantial-looking body, crisp rib neckline and quiet tonal finish. The blank surface is intentional so a buyer can set the artwork and label direction.',
        construction: 'Set-in short sleeves, rib crew neck, straight hem and clean coverstitch finish.',
        designReference: references.bossKnit,
        frontImage: '/assets/products/trend-edit/mens-luxury-logo-tee-cutout.webp',
        hasHanger: false,
        fabricOptions: ['Compact cotton jersey', 'Cotton-rich stretch jersey', 'Lightweight loopback jersey'],
        colorways: [{ name: 'Ink', swatch: '#202020' }, { name: 'Chalk', swatch: '#e8e4dc' }, { name: 'Graphite', swatch: '#62615d' }],
        customizationOptions: ['Fit & proportions', 'Neck rib', 'Color palette', 'Buyer artwork', 'Labels & trims'],
      }),
      garment({
        id: 'mens-concept-art-graphic-tee',
        category: "Men's apparel",
        name: 'Gallery print T-shirt',
        description: 'An easy ivory crew-neck designed as a canvas for a considered chest or back print. The reference artwork can be replaced with original buyer-supplied graphics.',
        construction: 'Relaxed straight body, classic crew rib and short sleeves with a clean double-needle hem.',
        designReference: { label: 'Independent art-led premium direction', url: 'https://www.hugoboss.com/men/' },
        frontImage: '/assets/products/trend-edit/mens-art-graphic-tee-cutout.webp',
        hasHanger: false,
        fabricOptions: ['Soft cotton jersey', 'Compact cotton jersey', 'Cotton-modal jersey'],
        colorways: [{ name: 'Natural', swatch: '#e8e1d4' }, { name: 'Washed black', swatch: '#3a3937' }, { name: 'Stone', swatch: '#a69f93' }],
        customizationOptions: ['Fit & proportions', 'Color palette', 'Print placement', 'Buyer artwork', 'Labels & trims'],
      }),
      garment({
        id: 'mens-concept-half-zip-knit',
        category: "Men's apparel",
        name: 'Fine-gauge half-zip knit',
        description: 'A softly structured pullover with a tall collar, short zip opening and understated rib framing. Designed as a refined layer over a tee or shirt.',
        construction: 'Half-zip funnel collar, set-in sleeves, ribbed cuffs and hem; yarn and gauge to be confirmed.',
        designReference: references.zegna,
        frontImage: '/assets/products/trend-edit/mens-half-zip-knit-pullover.webp',
        hasHanger: false,
        fabricOptions: ['Cotton knit', 'Cotton-merino blend knit', 'Wool-rich fine-gauge knit'],
        colorways: [{ name: 'Oat', swatch: '#c9bdab' }, { name: 'Deep olive', swatch: '#575b46' }, { name: 'Midnight', swatch: '#292d33' }],
        customizationOptions: ['Fit & proportions', 'Collar and zip finish', 'Knit gauge', 'Color palette', 'Labels & trims'],
      }),
      garment({
        id: 'mens-tshirts-polos',
        category: "Men's apparel",
        name: 'Classic knit polo',
        description: 'A versatile short-sleeve polo with a soft collar, neat button placket and restrained contrast potential at the placket or cuff.',
        construction: 'Rib collar and sleeve ends, front placket and straight side-split hem; final details to buyer specification.',
        designReference: references.bossPolo,
        frontImage: '/assets/products/_normalized/perspective-mens-polo.webp',
        fabricOptions: ['Cotton pique', 'Cotton jersey', 'Cotton-rich knit polo fabric'],
        colorways: [{ name: 'Heather grey', swatch: '#aaa9a6' }, { name: 'Navy', swatch: '#2c3545' }, { name: 'Ecru', swatch: '#e4ddcf' }],
        customizationOptions: ['Fit & proportions', 'Collar and placket', 'Contrast tipping', 'Color palette', 'Labels & trims'],
      }),
      garment({
        id: 'mens-hoodies-sweatshirts',
        category: "Men's apparel",
        name: 'Structured fleece hoodie',
        description: 'A pared-back pullover hoodie with a confident, relaxed outline and room for a tonal or graphic treatment chosen by the buyer.',
        construction: 'Drawcord hood, front pouch pocket, rib cuffs and hem; finishing and hardware remain configurable.',
        designReference: { label: 'Modern Parisian casualwear direction', url: 'https://www.hugoboss.com/men/' },
        frontImage: '/assets/products/_normalized/perspective-mens-hoodie.webp',
        fabricOptions: ['Cotton loopback terry', 'Brushed cotton-rich fleece', 'Unbrushed French terry'],
        colorways: [{ name: 'Charcoal', swatch: '#4a4a47' }, { name: 'Pine', swatch: '#39473e' }, { name: 'Oatmeal', swatch: '#c9c1b3' }],
        customizationOptions: ['Fit & proportions', 'Hood and drawcord', 'Pocket finish', 'Color palette', 'Buyer artwork'],
      }),
      garment({
        id: 'mens-shorts-joggers',
        category: "Men's apparel",
        name: 'Knit joggers & shorts',
        description: 'An easy coordinated-bottom direction with a clean waistband and tapered jogger line; a matching short can be developed from the same visual brief.',
        construction: 'Elasticated waistband, adjustable drawcord and practical pockets; leg shape and cuff finish are buyer configurable.',
        designReference: references.armani,
        frontImage: '/assets/products/_normalized/perspective-mens-joggers.webp',
        hasHanger: false,
        fabricOptions: ['Cotton loopback terry', 'Cotton-rich interlock', 'Lightweight stretch jersey'],
        colorways: [{ name: 'Slate', swatch: '#777978' }, { name: 'Olive', swatch: '#62604d' }, { name: 'Black', swatch: '#292929' }],
        customizationOptions: ['Jogger or short length', 'Waistband and drawcord', 'Pocket layout', 'Color palette', 'Labels & trims'],
      }),
      garment({
        id: 'mens-jackets-coats-jumpers',
        category: "Men's apparel",
        name: 'Soft knit zip jacket',
        description: 'A compact zip-through layer that sits between a cardigan and light jacket, with a neat collar and clean vertical front line.',
        construction: 'Full front zip, shaped collar, set-in sleeves and rib-finished cuffs and hem.',
        designReference: references.zegna,
        frontImage: '/assets/products/_normalized/perspective-mens-jacket.webp',
        fabricOptions: ['Cotton Milano knit', 'Cotton-merino knit', 'Compact double-knit fabric'],
        colorways: [{ name: 'Ink', swatch: '#303237' }, { name: 'Camel', swatch: '#a98d6b' }, { name: 'Forest', swatch: '#3c4a40' }],
        customizationOptions: ['Fit & proportions', 'Collar shape', 'Zip and pocket details', 'Color palette', 'Labels & trims'],
      }),
      garment({
        id: 'mens-sleepwear-lounge',
        category: "Men's apparel",
        name: 'Relaxed lounge top',
        description: 'A soft, unstructured top with a calm crew neckline and an easy fit for a coordinated lounge program.',
        construction: 'Long sleeves, ribbed neckline and cuffs, straight hem; matching bottoms may be specified separately.',
        designReference: references.bossKnit,
        frontImage: '/assets/products/_normalized/perspective-mens-lounge-top.webp',
        fabricOptions: ['Cotton-modal jersey', 'Cotton interlock', 'Lightweight loopback jersey'],
        colorways: [{ name: 'Soft grey', swatch: '#aaa9a5' }, { name: 'Ink', swatch: '#292b30' }, { name: 'Cream', swatch: '#e8e0d1' }],
        customizationOptions: ['Fit & proportions', 'Neck and cuff finish', 'Coordinated set', 'Color palette', 'Labels & trims'],
      }),
    ],
  },
  {
    id: 'womens',
    label: "Women's",
    garments: [
      garment({
        id: 'womens-concept-striped-knit-polo',
        category: "Women's apparel",
        name: 'Striped knit polo',
        description: 'A fine striped short-sleeve knit with a soft collar and compact button opening. The stripe scale and contrast can be tuned to the buyer’s palette.',
        construction: 'Ribbed collar, sleeve ends and hem; clean placket and a softly shaped body.',
        designReference: references.armani,
        frontImage: '/assets/products/trend-edit/womens-striped-knit-polo.webp',
        fabricOptions: ['Cotton-viscose knit', 'Cotton-rich fine-gauge knit', 'Lightweight textured knit'],
        colorways: [{ name: 'Sage & cream', swatch: '#b9bdaa' }, { name: 'Navy & ivory', swatch: '#495364' }, { name: 'Rose & oat', swatch: '#c99e9c' }],
        customizationOptions: ['Fit & proportions', 'Stripe scale', 'Collar and placket', 'Color palette', 'Labels & trims'],
      }),
      garment({
        id: 'womens-concept-funnel-neck-knit',
        category: "Women's apparel",
        name: 'Ribbed funnel-neck sweater',
        description: 'A close, tactile rib-knit layer with a softly raised neckline and long sleeves. Its restrained silhouette is intended to work alone or under tailoring.',
        construction: 'Funnel neck, full-length sleeves and ribbed cuffs and hem; stretch and body length to buyer fit review.',
        designReference: references.zegna,
        frontImage: '/assets/products/trend-edit/womens-ribbed-funnel-neck-top.webp',
        hasHanger: false,
        fabricOptions: ['Cotton rib knit', 'Viscose-blend rib knit', 'Merino-rich rib knit'],
        colorways: [{ name: 'Ivory', swatch: '#e5ded1' }, { name: 'Mocha', swatch: '#8b7262' }, { name: 'Black', swatch: '#292929' }],
        customizationOptions: ['Fit & proportions', 'Neck height', 'Rib scale', 'Color palette', 'Labels & trims'],
      }),
      garment({
        id: 'womens-tshirts',
        category: "Women's apparel",
        name: 'Refined jersey tops',
        description: 'A clean tee and top direction built around a flattering shoulder line, precise neckline and a smooth, premium-looking surface.',
        construction: 'Short-sleeve crew silhouette with a fine neck binding and straight hem; alternate sleeve and neckline shapes are configurable.',
        designReference: { label: 'Premium graphic jersey direction', url: 'https://www.hugoboss.com/women/' },
        frontImage: '/assets/products/_normalized/perspective-womens-top.webp',
        fabricOptions: ['Compact cotton jersey', 'Cotton-modal jersey', 'Lightweight rib jersey'],
        colorways: [{ name: 'Chalk', swatch: '#e8e3d9' }, { name: 'Soft rose', swatch: '#cba6a0' }, { name: 'Ink', swatch: '#2c2d31' }],
        customizationOptions: ['Fit & proportions', 'Neckline and sleeve', 'Color palette', 'Buyer artwork', 'Labels & trims'],
      }),
      garment({
        id: 'womens-dresses-shirts',
        category: "Women's apparel",
        name: 'Fine-gauge knit dress',
        description: 'A softly flared long-sleeve dress with a clean crew neck and a quiet, refined surface, suited to a buyer-defined trim or stitch detail.',
        construction: 'Crew neckline, long sleeves and shaped waist-to-hem line; length and ease confirmed against the buyer sample.',
        designReference: references.burberry,
        frontImage: '/assets/products/_normalized/perspective-womens-dress.webp',
        fabricOptions: ['Cotton-viscose knit', 'Merino-rich fine-gauge knit', 'Compact ponte knit'],
        colorways: [{ name: 'Warm ivory', swatch: '#e4dccc' }, { name: 'Deep navy', swatch: '#333b4c' }, { name: 'Bordeaux', swatch: '#75494d' }],
        customizationOptions: ['Fit & proportions', 'Dress length', 'Neck and cuff finish', 'Color palette', 'Labels & trims'],
      }),
      garment({
        id: 'womens-cardigans-sweaters',
        category: "Women's apparel",
        name: 'Textured cardigan',
        description: 'A versatile cardigan direction with a defined front opening and tactile knit surface, designed to layer over a tee or fine-gauge top.',
        construction: 'Long sleeves, front button opening and rib finishing; button material, gauge and pocket treatment are open to the brief.',
        designReference: references.armani,
        frontImage: '/assets/products/_normalized/perspective-womens-cardigan.webp',
        fabricOptions: ['Cotton knit', 'Cotton-viscose textured knit', 'Wool-rich cardigan knit'],
        colorways: [{ name: 'Oatmeal', swatch: '#c6b9a7' }, { name: 'Camel', swatch: '#a48664' }, { name: 'Navy', swatch: '#3b4554' }],
        customizationOptions: ['Fit & proportions', 'Knit texture', 'Button and pocket details', 'Color palette', 'Labels & trims'],
      }),
      garment({
        id: 'womens-sweatshirts-hoodies',
        category: "Women's apparel",
        name: 'Clean-cut sweatshirt',
        description: 'A pared-back sweatshirt with a softly relaxed shoulder and refined rib details, designed for a tonal finish or buyer-supplied artwork.',
        construction: 'Crew neck, long sleeves, ribbed neck/cuffs/hem and a straight body; fit to be confirmed from the size set.',
        designReference: references.bossKnit,
        frontImage: '/assets/products/_normalized/perspective-womens-sweatshirt.webp',
        hasHanger: false,
        fabricOptions: ['Unbrushed cotton French terry', 'Brushed cotton-rich fleece', 'Cotton-modal loopback'],
        colorways: [{ name: 'Ecru', swatch: '#e2dbce' }, { name: 'Heather grey', swatch: '#aaa9a5' }, { name: 'Black', swatch: '#2d2d2c' }],
        customizationOptions: ['Fit & proportions', 'Neck rib', 'Color palette', 'Buyer artwork', 'Labels & trims'],
      }),
      garment({
        id: 'womens-maternity',
        category: "Women's apparel",
        name: 'Soft maternity layering top',
        description: 'A longer, easy-fit knit top with a gentle drape and room for comfort through changing proportions. Final fit should be approved on a buyer size set.',
        construction: 'Long sleeves, softly shaped side seams and a smooth neckline; ease and length are configurable.',
        frontImage: '/assets/products/_normalized/perspective-womens-maternity.webp',
        hasHanger: false,
        fabricOptions: ['Cotton-modal jersey', 'Viscose-rich stretch jersey', 'Soft cotton rib jersey'],
        colorways: [{ name: 'Cocoa', swatch: '#937c6b' }, { name: 'Stone', swatch: '#b8b0a3' }, { name: 'Black', swatch: '#292929' }],
        customizationOptions: ['Fit & proportions', 'Length and ease', 'Neckline', 'Color palette', 'Labels & trims'],
      }),
    ],
  },
  {
    id: 'kids',
    label: "Kids'",
    garments: [
      garment({
        id: 'kids-concept-rugby-top',
        category: "Kids' apparel",
        name: 'Colour-block rugby top',
        description: 'An energetic long-sleeve top with a classic collar and broad, balanced colour blocking, scaled for a contemporary kidswear range.',
        construction: 'Collared neckline, short button placket, long sleeves and ribbed cuffs; contrast panels can be reworked.',
        designReference: references.ralphLauren,
        frontImage: '/assets/products/trend-edit/kids-modern-rugby-top.webp',
        hasHanger: false,
        fabricOptions: ['Cotton jersey', 'Cotton pique', 'Cotton loopback jersey'],
        colorways: [{ name: 'Navy & cream', swatch: '#414957' }, { name: 'Forest & chalk', swatch: '#53634f' }, { name: 'Rust & oat', swatch: '#a86a4f' }],
        customizationOptions: ['Age-graded fit', 'Panel layout', 'Collar and placket', 'Color palette', 'Labels & trims'],
      }),
      garment({
        id: 'kids-tshirts',
        category: "Kids' apparel",
        name: 'Everyday graphic T-shirt',
        description: 'A comfortable short-sleeve tee with a simple crew shape and a clean front for a small motif, playful print or buyer artwork.',
        construction: 'Rib crew neck, short sleeves and straight hem; proportions are to be age graded and buyer approved.',
        designReference: references.diorKids,
        frontImage: '/assets/products/_normalized/perspective-kids-tshirt.webp',
        hasHanger: false,
        fabricOptions: ['Soft cotton jersey', 'Compact cotton jersey', 'Cotton-modal jersey'],
        colorways: [{ name: 'Chalk', swatch: '#e8e4dc' }, { name: 'Poppy', swatch: '#b65c4e' }, { name: 'Navy', swatch: '#384354' }],
        customizationOptions: ['Age-graded fit', 'Neck rib', 'Color palette', 'Buyer artwork', 'Labels & trims'],
      }),
      garment({
        id: 'kids-shorts',
        category: "Kids' apparel",
        name: 'Pull-on knit shorts',
        description: 'A practical pull-on short with a relaxed leg and clean finish, designed to coordinate with tees, polos or a matching top.',
        construction: 'Elasticated waistband, optional drawcord and side pockets; inseam and leg opening confirmed to size chart.',
        designReference: references.ralphLauren,
        frontImage: '/assets/products/_normalized/perspective-kids-shorts.webp',
        fabricOptions: ['Cotton loopback terry', 'Cotton interlock', 'Stretch cotton jersey'],
        colorways: [{ name: 'Navy', swatch: '#394252' }, { name: 'Khaki', swatch: '#9c9277' }, { name: 'Stone', swatch: '#b9b1a4' }],
        customizationOptions: ['Age-graded fit', 'Leg length', 'Waistband and drawcord', 'Color palette', 'Labels & trims'],
      }),
      garment({
        id: 'kids-sweaters-pullovers',
        category: "Kids' apparel",
        name: 'Soft crew-neck sweater',
        description: 'A cosy crew pullover with a straightforward silhouette and room for a considered stitch, stripe or small motif detail.',
        construction: 'Rib crew, cuffs and hem with long sleeves; gauge, ease and finishing to be reviewed in the sample.',
        designReference: references.diorKids,
        frontImage: '/assets/products/_normalized/perspective-kids-sweater.webp',
        hasHanger: false,
        fabricOptions: ['Cotton knit', 'Cotton-acrylic blend knit', 'Wool-rich knit'],
        colorways: [{ name: 'Ecru', swatch: '#e2dccf' }, { name: 'Dusty blue', swatch: '#8494a0' }, { name: 'Soft rose', swatch: '#c49a9a' }],
        customizationOptions: ['Age-graded fit', 'Knit gauge', 'Stripe or motif', 'Color palette', 'Labels & trims'],
      }),
      garment({
        id: 'kids-sets',
        category: "Kids' apparel",
        name: 'Coordinated tee & short set',
        description: 'A considered two-piece set that pairs a simple top with a matching pull-on short, with colour and trim designed as one story.',
        construction: 'Short-sleeve crew tee and elastic-waist short; each piece is sampled and fit approved as a coordinated set.',
        designReference: references.armani,
        frontImage: '/assets/products/_normalized/perspective-kids-set.webp',
        hasHanger: false,
        fabricOptions: ['Cotton jersey set', 'Cotton-rich interlock', 'Soft loopback set'],
        colorways: [{ name: 'Ivory & sage', swatch: '#c2c6b2' }, { name: 'Navy & chalk', swatch: '#485160' }, { name: 'Terracotta & cream', swatch: '#b87860' }],
        customizationOptions: ['Age-graded fit', 'Set composition', 'Color palette', 'Print or embroidery brief', 'Labels & trims'],
      }),
    ],
  },
  {
    id: 'babies-toddler',
    label: 'Babies & toddler',
    garments: [
      garment({
        id: 'baby-concept-striped-romper',
        category: 'Babies & toddler',
        name: 'Striped rib-knit romper',
        description: 'A soft-looking short-sleeve one-piece in a gentle stripe, with a comfortable infant silhouette and practical lower opening.',
        construction: 'Rib-knit body, short sleeves, bound neckline and snap-opening suggestion; closure and safety details require buyer approval.',
        designReference: references.ralphLauren,
        frontImage: '/assets/products/trend-edit/baby-striped-rib-romper.webp',
        fabricOptions: ['Soft cotton rib', 'Organic-cotton option for buyer review', 'Cotton-modal rib'],
        colorways: [{ name: 'Sage & cream', swatch: '#adb29f' }, { name: 'Dusty blue & ecru', swatch: '#8a9eab' }, { name: 'Rose & oat', swatch: '#c99e9c' }],
        customizationOptions: ['Age and fit review', 'Stripe scale', 'Neck and leg binding', 'Color palette', 'Labels & trims'],
      }),
      garment({
        id: 'baby-tshirts',
        category: 'Babies & toddler',
        name: 'Soft baby tops',
        description: 'A gentle short-sleeve top concept with a smooth hand-feel direction, easy proportions and a clean neckline for comfortable layering.',
        construction: 'Short sleeves, soft neck binding and a straight body; opening details and sizing to be confirmed to the buyer brief.',
        designReference: references.armaniBaby,
        frontImage: '/assets/products/_normalized/perspective-baby-top.webp',
        fabricOptions: ['Soft cotton jersey', 'Cotton-modal jersey', 'Lightweight cotton interlock'],
        colorways: [{ name: 'Oat', swatch: '#d1c5b3' }, { name: 'Sky', swatch: '#a8bdc9' }, { name: 'Cream', swatch: '#e8dfd0' }],
        customizationOptions: ['Age and fit review', 'Neck opening', 'Color palette', 'Buyer artwork', 'Labels & trims'],
      }),
      garment({
        id: 'baby-rompers-onesies',
        category: 'Babies & toddler',
        name: 'Everyday snap-front romper',
        description: 'A practical one-piece with a simple upper body and room for comfortable movement, intended for a buyer-defined print or subtle trim.',
        construction: 'Short-sleeve romper shape with snap-opening concept at the lower body; final fastening and safety review required.',
        designReference: references.ralphLauren,
        frontImage: '/assets/products/_normalized/perspective-baby-romper.webp',
        fabricOptions: ['Cotton interlock', 'Cotton rib jersey', 'Cotton-modal jersey'],
        colorways: [{ name: 'Ecru', swatch: '#e4dccd' }, { name: 'Sage', swatch: '#aeb7a7' }, { name: 'Powder blue', swatch: '#a9bfcc' }],
        customizationOptions: ['Age and fit review', 'Opening and fastening', 'Color palette', 'Buyer artwork', 'Labels & trims'],
      }),
      garment({
        id: 'baby-dresses-frocks',
        category: 'Babies & toddler',
        name: 'Soft baby dress',
        description: 'A sweet, uncomplicated dress direction with a softly gathered skirt and gentle proportions for babies and toddlers.',
        construction: 'Rounded neckline, short sleeves and gathered skirt; lining, closure and age-specific safety details require buyer approval.',
        designReference: references.diorKids,
        frontImage: '/assets/products/_normalized/perspective-baby-dress.webp',
        hasHanger: false,
        fabricOptions: ['Cotton jersey', 'Soft cotton interlock', 'Lightweight cotton knit'],
        colorways: [{ name: 'Petal', swatch: '#d9b6b4' }, { name: 'Cream', swatch: '#e8dfd0' }, { name: 'Sky', swatch: '#a8bdc9' }],
        customizationOptions: ['Age and fit review', 'Skirt fullness', 'Neck and sleeve finish', 'Color palette', 'Labels & trims'],
      }),
      garment({
        id: 'baby-pajamas',
        category: 'Babies & toddler',
        name: 'Footed sleepsuit',
        description: 'A calm sleepwear direction with a full-length infant shape and soft surface, suitable for buyer-selected colour blocking or a small all-over print.',
        construction: 'Long sleeves and legs with enclosed-foot option; fastening path and safety requirements must be confirmed before sampling.',
        designReference: references.armaniBaby,
        frontImage: '/assets/products/_normalized/perspective-baby-sleeper.webp',
        hasHanger: false,
        fabricOptions: ['Soft cotton interlock', 'Cotton-modal jersey', 'Lightweight cotton rib'],
        colorways: [{ name: 'Natural', swatch: '#e0d8ca' }, { name: 'Sage', swatch: '#aeb7a7' }, { name: 'Dusty blue', swatch: '#8a9eab' }],
        customizationOptions: ['Age and fit review', 'Footed or open-leg', 'Fastening review', 'Color palette', 'Labels & trims'],
      }),
    ],
  },
];

/** Route for the showroom's asset manifest; only supplied front images are currently populated. */
export const GARMENT_VIEW_ORDER = ['front', 'right', 'back', 'left', 'detail'] as const;
export const GARMENT_ANGLE_LABELS: Record<GarmentAngle, string> = {
  front: 'Front',
  back: 'Back',
  left: 'Left side',
  right: 'Right side',
  detail: 'Close-up',
};

