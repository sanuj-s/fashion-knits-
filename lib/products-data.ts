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
    url?: string;
  };
  views: GarmentViews;
  /** Raster front image used only in the homepage product detail viewer. */
  detailFrontImage?: string;
  scale?: number;
  /** Optional complete homepage image with the garment and hanger integrated. */
  showcaseImage?: string;
  /** Keep catalogue-only concepts out of the homepage's five-piece hanging edit. */
  showInHomepageShowcase?: boolean;
  /** Use the homepage image placement without adding a separate hanger overlay. */
  showcaseArtOnly?: boolean;
  showcaseFit?: {
    scale?: number;
    imageTop?: number;
    imageWidth?: number;
    showcaseImageTop?: number;
    showcaseImageWidth?: number;
  };
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
        detailFrontImage: '/assets/products/detail-hanger/mens-concept-minimal-logo-tee.webp',
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
        detailFrontImage: '/assets/products/detail-hanger/mens-concept-art-graphic-tee.webp',
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
        detailFrontImage: '/assets/products/detail-hanger/mens-concept-half-zip-knit.webp',
        hasHanger: false,
        fabricOptions: ['Cotton knit', 'Cotton-merino blend knit', 'Wool-rich fine-gauge knit'],
        colorways: [{ name: 'Oat', swatch: '#c9bdab' }, { name: 'Deep olive', swatch: '#575b46' }, { name: 'Midnight', swatch: '#292d33' }],
        customizationOptions: ['Fit & proportions', 'Collar and zip finish', 'Knit gauge', 'Color palette', 'Labels & trims'],
      }),
      garment({
        id: 'mens-tshirts-polos',
        category: "Men's apparel",
        name: 'BOSS-inspired navy piqué polo',
        description: 'A refined midnight navy cotton piqué polo with a crisp collar, clean three-button placket and understated white BOSS chest mark.',
        construction: 'Cotton piqué body, three-button placket, ribbed collar and cuffs, straight hem and embroidered BOSS chest mark.',
        designReference: references.bossPolo,
        frontImage: '/assets/products/detail-hanger/mens-boss-polo.webp',
        fabricOptions: ['Cotton pique', 'Cotton jersey', 'Cotton-rich knit polo fabric'],
        colorways: [{ name: 'Ink navy', swatch: '#17233a' }, { name: 'White', swatch: '#f3f1eb' }, { name: 'Black', swatch: '#202124' }],
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
        detailFrontImage: '/assets/products/detail-hanger/mens-hoodies-sweatshirts.webp',
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
        detailFrontImage: '/assets/products/detail-hanger/mens-jackets-coats-jumpers.webp',
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
        detailFrontImage: '/assets/products/detail-hanger/mens-sleepwear-lounge.webp',
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
        id: 'womens-cable-knit-cardigan',
        category: "Women's apparel",
        name: 'Ivory cable-knit cardigan',
        description: 'A long-sleeve V-neck cardigan concept in an all-over cable texture, finished with contrast navy edging, gold-tone buttons and two front patch pockets.',
        construction: 'V-neck, full button front, long sleeves, two patch pockets and ribbed cuffs and hem with navy contrast tipping; final proportions and trim details are for buyer review.',
        designReference: { label: 'Heritage collegiate cable-knit direction' },
        frontImage: '/assets/products/womens-cable-knit/ivory-cable-knit-polo-cardigan.webp',
        detailFrontImage: '/assets/products/detail-hanger/womens-cable-knit-cardigan.webp',
        hasHanger: false,
        showcaseArtOnly: true,
        showcaseFit: { scale: 1.02, imageTop: 26, imageWidth: 96, showcaseImageTop: 0, showcaseImageWidth: 100 },
        fabricOptions: ['Cable-knit stitch direction · gauge to discuss', 'Textured knit direction · hand feel to discuss', 'Smooth body with cable-knit panels'],
        colorways: [{ name: 'Ivory & navy', swatch: '#e9e2d5' }, { name: 'Midnight', swatch: '#252b39' }, { name: 'Camel & ivory', swatch: '#ad9070' }],
        customizationOptions: ['Body length and ease', 'V-neck depth and edging', 'Button size and finish', 'Pocket shape and placement', 'Contrast tipping', 'Labels and trims'],
      }),
      garment({
        id: 'womens-cream-navy-striped-cable-polo',
        category: "Women's apparel",
        name: 'Cream and navy striped cable-knit polo',
        description: 'A short-sleeve cream polo concept with broad navy bands across the body and sleeves. Its relaxed straight outline and cable texture give the colour blocking a tactile finish.',
        construction: 'Short sleeves, spread collar, short button placket, broad horizontal colour bands and ribbed cuffs and hem; stripe placement and body proportions remain open to the buyer brief.',
        designReference: { label: 'Heritage rugby stripe and cable-knit direction' },
        frontImage: '/assets/products/womens-cable-knit/cream-navy-striped-cable-knit-polo.webp',
        detailFrontImage: '/assets/products/detail-hanger/womens-cream-navy-striped-cable-polo.webp',
        hasHanger: false,
        showcaseArtOnly: true,
        showcaseFit: { scale: 1.02, imageTop: 26, imageWidth: 100, showcaseImageTop: 0, showcaseImageWidth: 100 },
        fabricOptions: ['Cable-knit stitch direction · gauge to discuss', 'Textured knit direction · stitch scale to discuss', 'Smooth knit direction with cable-knit panels'],
        colorways: [{ name: 'Cream & navy', swatch: '#e9e2d5' }, { name: 'Forest & cream', swatch: '#51604e' }, { name: 'Cocoa & oat', swatch: '#796252' }],
        customizationOptions: ['Body ease and length', 'Stripe width and placement', 'Collar and placket finish', 'Sleeve length and cuff', 'Colour palette', 'Labels and trims'],
      }),
      garment({
        id: 'womens-cream-cable-polo-navy-tipping',
        category: "Women's apparel",
        name: 'Cream cable-knit polo with navy tipping',
        description: 'A short-sleeve, gently shaped polo concept in cream cable knit with slim navy collar and cuff stripes, a tipped hem and gold-tone buttons.',
        construction: 'Collared neckline, short button placket, short sleeves, vertical cable texture and ribbed sleeve and hem finishes with narrow contrast stripes; fit is for buyer review.',
        designReference: { label: 'Fine-gauge collegiate knitwear direction' },
        frontImage: '/assets/products/womens-cable-knit/cream-cable-knit-polo-navy-tipping.webp',
        detailFrontImage: '/assets/products/detail-hanger/womens-cream-cable-polo-navy-tipping.webp',
        hasHanger: false,
        showcaseArtOnly: true,
        showcaseFit: { scale: 1.07, imageTop: 26, imageWidth: 91, showcaseImageTop: 0, showcaseImageWidth: 94 },
        fabricOptions: ['Fine cable-knit stitch direction · gauge to discuss', 'Textured knit direction · hand feel to discuss', 'Smooth knit direction with cable-knit panels'],
        colorways: [{ name: 'Cream & navy', swatch: '#e9e2d5' }, { name: 'Rose & cream', swatch: '#c99593' }, { name: 'Navy & ivory', swatch: '#3b4558' }],
        customizationOptions: ['Body shaping and length', 'Stripe width and placement', 'Collar and placket finish', 'Button finish', 'Colour palette', 'Labels and trims'],
      }),
      garment({
        id: 'womens-navy-cable-polo-gold-buttons',
        category: "Women's apparel",
        name: 'Navy cable-knit polo with gold-tone buttons',
        description: 'A short-sleeve polo concept in solid deep navy cable knit, with a clean collar, gold-tone placket buttons and a small contrasting chest motif in the supplied visual.',
        construction: 'Short sleeves, polo collar, button placket, all-over vertical cable texture and ribbed sleeve ends and hem; branding, button finish and proportions can be reviewed with the buyer.',
        designReference: { label: 'Classic solid-colour cable-knit polo direction' },
        frontImage: '/assets/products/womens-cable-knit/navy-cable-knit-polo-gold-buttons.webp',
        detailFrontImage: '/assets/products/detail-hanger/womens-navy-cable-polo-gold-buttons.webp',
        hasHanger: false,
        showcaseArtOnly: true,
        showcaseFit: { scale: 1.07, imageTop: 26, imageWidth: 92, showcaseImageTop: 0, showcaseImageWidth: 94 },
        fabricOptions: ['Cable-knit stitch direction · gauge to discuss', 'Textured knit direction · stitch scale to discuss', 'Smooth knit direction with cable-knit panels'],
        colorways: [{ name: 'Deep navy', swatch: '#202739' }, { name: 'Forest green', swatch: '#33453d' }, { name: 'Oat', swatch: '#d7cbb8' }],
        customizationOptions: ['Body ease and length', 'Collar and placket finish', 'Button size and finish', 'Chest motif or buyer artwork', 'Colour palette', 'Labels and trims'],
      }),
      garment({
        id: 'womens-navy-ivory-block-stripe-cable-polo',
        category: "Women's apparel",
        name: 'Navy and ivory colour-block cable-knit polo',
        description: 'A short-sleeve polo concept that pairs a navy yoke and broad body bands with an ivory cable-knit centre stripe for a high-contrast, collegiate look.',
        construction: 'Short sleeves, navy collar and placket, broad horizontal colour blocks, cable-knit texture and ribbed cuffs and hem; colour-block placement and stripe width are for buyer discussion.',
        designReference: { label: 'Collegiate colour-block knitwear direction' },
        frontImage: '/assets/products/womens-cable-knit/navy-ivory-block-stripe-cable-knit-polo.webp',
        detailFrontImage: '/assets/products/detail-hanger/womens-navy-ivory-block-stripe-cable-polo.webp',
        hasHanger: false,
        showcaseArtOnly: true,
        showcaseFit: { scale: 1.01, imageTop: 26, imageWidth: 100, showcaseImageTop: 0, showcaseImageWidth: 100 },
        fabricOptions: ['Cable-knit stitch direction · gauge to discuss', 'Textured knit direction · stitch scale to discuss', 'Smooth knit direction with cable-knit panels'],
        colorways: [{ name: 'Navy & ivory', swatch: '#293044' }, { name: 'Forest & cream', swatch: '#44564b' }, { name: 'Burgundy & oat', swatch: '#704448' }],
        customizationOptions: ['Body ease and length', 'Colour-block layout', 'Stripe width and placement', 'Collar and placket finish', 'Colour palette', 'Labels and trims'],
      }),
      garment({
        id: 'womens-cream-cable-polo-contrast-placket',
        category: "Women's apparel",
        name: 'Cream cable-knit polo with contrast placket',
        description: 'A short-sleeve cream polo concept with a solid navy collar and placket, gold-tone buttons and narrow contrast edging at the sleeves.',
        construction: 'Short sleeves, contrast polo collar and button placket, vertical cable texture and ribbed sleeve and hem finishes; exact trim proportions are for buyer review.',
        designReference: { label: 'Heritage contrast-trim knit polo direction' },
        frontImage: '/assets/products/womens-cable-knit/cream-cable-knit-polo-contrast-placket.webp',
        detailFrontImage: '/assets/products/detail-hanger/womens-cream-cable-polo-contrast-placket.webp',
        hasHanger: false,
        showInHomepageShowcase: false,
        fabricOptions: ['Cable-knit stitch direction · gauge to discuss', 'Textured knit direction · hand feel to discuss', 'Smooth knit direction with cable-knit panels'],
        colorways: [{ name: 'Cream & navy', swatch: '#e9e2d5' }, { name: 'Slate & ivory', swatch: '#687184' }, { name: 'Burgundy & cream', swatch: '#704448' }],
        customizationOptions: ['Body ease and length', 'Collar contrast and shape', 'Placket length', 'Button size and finish', 'Sleeve edging', 'Labels and trims'],
      }),
      garment({
        id: 'womens-ivory-cable-polo-navy-placket',
        category: "Women's apparel",
        name: 'Ivory cable-knit polo with navy placket',
        description: 'An ivory short-sleeve polo concept with a deep navy collar and placket, contrast cuff bands and a navy-and-ivory ribbed hem.',
        construction: 'Short sleeves, contrast polo collar and button placket, all-over cable texture and striped rib finishes at the cuffs and hem; fit and trim details remain for buyer review.',
        designReference: { label: 'Heritage contrast-trim cable-knit direction' },
        frontImage: '/assets/products/womens-cable-knit/ivory-cable-knit-polo-navy-placket.webp',
        detailFrontImage: '/assets/products/detail-hanger/womens-ivory-cable-polo-navy-placket.webp',
        hasHanger: false,
        showInHomepageShowcase: false,
        fabricOptions: ['Cable-knit stitch direction · gauge to discuss', 'Textured knit direction · hand feel to discuss', 'Smooth knit direction with cable-knit panels'],
        colorways: [{ name: 'Ivory & navy', swatch: '#e9e2d5' }, { name: 'Oat & forest', swatch: '#d6cbb8' }, { name: 'Cream & burgundy', swatch: '#e8dece' }],
        customizationOptions: ['Body ease and length', 'Collar and placket contrast', 'Cuff stripe placement', 'Hem stripe placement', 'Colour palette', 'Labels and trims'],
      }),
      garment({
        id: 'womens-ivory-navy-fine-stripe-cable-polo',
        category: "Women's apparel",
        name: 'Ivory and navy fine-stripe cable-knit polo',
        description: 'A fitted-looking short-sleeve ivory polo concept with repeated narrow navy bands across the body and sleeves, a navy collar and a solid navy hem.',
        construction: 'Short sleeves, navy collar and placket, narrow horizontal stripes, cable-knit texture and a solid navy ribbed hem; body shaping and stripe repeat are for buyer review.',
        designReference: { label: 'Fine-stripe collegiate cable-knit direction' },
        frontImage: '/assets/products/womens-cable-knit/ivory-navy-fine-stripe-cable-knit-polo.webp',
        detailFrontImage: '/assets/products/detail-hanger/womens-ivory-navy-fine-stripe-cable-polo.webp',
        hasHanger: false,
        showInHomepageShowcase: false,
        fabricOptions: ['Cable-knit stitch direction · gauge to discuss', 'Textured knit direction · stitch scale to discuss', 'Smooth knit direction with cable-knit panels'],
        colorways: [{ name: 'Ivory & navy', swatch: '#e9e2d5' }, { name: 'Oat & charcoal', swatch: '#d8ccb9' }, { name: 'Sage & cream', swatch: '#b7bdaa' }],
        customizationOptions: ['Body shaping and length', 'Stripe width and repeat', 'Collar and placket finish', 'Hem contrast', 'Colour palette', 'Labels and trims'],
      }),
      garment({
        id: 'womens-navy-cable-polo-ivory-tipping',
        category: "Women's apparel",
        name: 'Navy cable-knit polo with ivory tipping',
        description: 'A short-sleeve deep navy polo concept with slim ivory double stripes on the collar and cuffs, light buttons and a small contrasting chest motif in the supplied visual.',
        construction: 'Short sleeves, polo collar and button placket, all-over cable texture and ribbed collar and cuff edges with narrow contrast tipping; branding and trim details are for buyer discussion.',
        designReference: { label: 'Classic contrast-tipped knit polo direction' },
        frontImage: '/assets/products/womens-cable-knit/navy-cable-knit-polo-ivory-tipping.webp',
        detailFrontImage: '/assets/products/detail-hanger/womens-navy-cable-polo-ivory-tipping.webp',
        hasHanger: false,
        showInHomepageShowcase: false,
        fabricOptions: ['Cable-knit stitch direction · gauge to discuss', 'Textured knit direction · stitch scale to discuss', 'Smooth knit direction with cable-knit panels'],
        colorways: [{ name: 'Navy & ivory', swatch: '#202739' }, { name: 'Forest & cream', swatch: '#33453d' }, { name: 'Cream & navy', swatch: '#e9e2d5' }],
        customizationOptions: ['Body ease and length', 'Collar stripe width', 'Cuff stripe width', 'Button finish', 'Chest motif or buyer artwork', 'Labels and trims'],
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
        detailFrontImage: '/assets/products/detail-hanger/kids-concept-rugby-top.webp',
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
        detailFrontImage: '/assets/products/detail-hanger/kids-tshirts.webp',
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
        detailFrontImage: '/assets/products/detail-hanger/kids-sweaters-pullovers.webp',
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
        detailFrontImage: '/assets/products/detail-hanger/kids-sets.webp',
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
        detailFrontImage: '/assets/products/detail-hanger/baby-concept-striped-romper.webp',
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
        detailFrontImage: '/assets/products/detail-hanger/baby-tshirts.webp',
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
        detailFrontImage: '/assets/products/detail-hanger/baby-rompers-onesies.webp',
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
        detailFrontImage: '/assets/products/detail-hanger/baby-dresses-frocks.webp',
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
        detailFrontImage: '/assets/products/detail-hanger/baby-pajamas.webp',
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

