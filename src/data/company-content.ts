export const PRODUCT_GROUPS = [
  {
    id: 'mens',
    label: "Men's",
    categories: ['T-shirts & polos', 'Hoodies & sweatshirts', 'Shorts & joggers', 'Jackets, coats & jumpers', 'Sleepwear & lounge wear'],
  },
  {
    id: 'womens',
    label: "Women's",
    categories: ['T-shirts & tops', 'Dresses & shirts', 'Cardigans & sweaters', 'Sweatshirts & hoodies', 'Pre/post-maternity wear'],
  },
  {
    id: 'kids',
    label: "Kids'",
    categories: ['T-shirts', 'Shorts', 'Sweaters & pullovers', 'T-shirt and shorts sets'],
  },
  {
    id: 'babies',
    label: 'Babies & toddler',
    categories: ['T-shirts', 'Rompers & onesies', 'Dresses & frocks', 'Pajamas / nightwear'],
  },
] as const;

export const CUSTOMER_BRANDS = [
  { name: 'Next', slug: 'next' },
  { name: 'Alana', slug: 'alana' },
  { name: 'Acanthé', slug: 'acanthe' },
  { name: 'Noppies', slug: 'noppies' },
  { name: 'DW-Shop', slug: 'dw-shop' },
  { name: 'Coop', slug: 'coop' },
  { name: 'Beverly Hills Polo Club', slug: 'beverly-hills-polo-club' },
  { name: 'BOSS', slug: 'boss' },
  { name: 'Zadig & Voltaire', slug: 'zadig-voltaire' },
  { name: 'Karl Lagerfeld', slug: 'karl-lagerfeld' },
  { name: 'Billiebush', slug: 'billiebush' },
  { name: 'WE Fashion', slug: 'we-fashion' },
  { name: 'Esprit', slug: 'esprit' },
  { name: 'La Fancée', slug: 'la-fancee' },
  { name: 'Sun City', slug: 'sun-city' },
  { name: 'Keedo', slug: 'keedo' },
  { name: 'DKNY', slug: 'dkny' },
  { name: 'Sloggi', slug: 'sloggi' },
  { name: 'Camp David', slug: 'camp-david' },
  { name: 'Sergent Major', slug: 'sergent-major' },
  { name: 'Diesel', slug: 'diesel' },
  { name: 'Lalique', slug: 'lalique' },
  { name: 'Coopérative U', slug: 'cooperative-u' },
  { name: 'Marc O’Polo', slug: 'marc-opolo' },
  { name: 'Aéropostale', slug: 'aeropostale' },
  { name: 'Punto Blanco', slug: 'punto-blanco' },
  { name: 'Lodger', slug: 'lodger' },
] as const;

export const EQUIPMENT_ITEMS = [
  { name: 'Lectra fully automatic cutting machine', group: 'Pattern & Cut', image: '/assets/manufacturing-equipment/lectra-automatic-cutting.webp' },
  { name: 'Bullmer E80 fully automatic cutting machine', group: 'Pattern & Cut', image: '/assets/manufacturing-equipment/bullmer-e80-cutting.webp' },
  { name: 'Kornit Storm 931 digital printing machine', group: 'Print & Embroider', image: '/assets/manufacturing-equipment/kornit-storm-931-digital-printing.webp' },
  { name: 'M&R Challenger II printing machine', group: 'Print & Embroider', image: '/assets/manufacturing-equipment/mr-challenger-ii-printing.webp' },
  { name: 'Sportsman EX printing machine', group: 'Print & Embroider', image: '/assets/manufacturing-equipment/sportsman-ex-printing.webp' },
  { name: 'M&R Alpha 8 Oval printing machine', group: 'Print & Embroider', image: '/assets/manufacturing-equipment/mr-alpha-8-oval-printing.webp' },
  { name: 'Barudan embroidery machine', group: 'Print & Embroider', image: '/assets/manufacturing-equipment/barudan-embroidery.webp' },
  { name: 'Tajima embroidery machines', group: 'Print & Embroider', image: '/assets/manufacturing-equipment/tajima-embroidery.webp' },
] as const;

export const COMPANY_LOCATIONS = [
  {
    name: 'Head Office & Unit 2',
    address: 'Fashion Knits, 81/82 Angeripalayam Main Road, Tiruppur 641 603, Tamil Nadu, India.',
  },
  {
    name: 'Unit 1',
    address: 'Shed No. 29, Netaji Apparel Park, New Tiruppur 641 666, Tamil Nadu, India.',
  },
  {
    name: 'Unit 3',
    address: 'SF No. 275, P.N. Road, Tiruppur, Tamil Nadu, India.',
  },
] as const;
