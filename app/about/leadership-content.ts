type ReviewStatus = 'approved' | 'pending';

export const MD_NOTE: {
  reviewStatus: ReviewStatus;
  approvalStatus: string;
  paragraphs: string[];
} = {
  reviewStatus: 'pending',
  approvalStatus: 'Proposed copy · awaiting Managing Director approval',
  paragraphs: [
    "Since 1990, Fashion Knits has been shaped by the people, skills and enterprise that make Tiruppur an important centre for apparel manufacturing. We believe lasting partnerships are built on product understanding, consistent workmanship, transparent communication and a commitment to our buyers' requirements.",
    "Our responsibility extends beyond completing an order. It is to understand each buyer's expectations, work closely with the people and partners involved in production, and build relationships that can grow over time.",
    'As the apparel industry evolves, we remain focused on strengthening our capabilities, responding to changing material and product requirements, and contributing positively to the industry ecosystem in which we operate.',
  ],
};

type ConsentValue = { value: string; consentToPublish: boolean };

export const leadership: {
  buyerRole: string;
  contact: {
    phone: ConsentValue;
    whatsapp: ConsentValue;
    email: ConsentValue;
    visitNote: ConsentValue;
  };
} = {
  buyerRole: '',
  contact: {
    phone: { value: '', consentToPublish: false },
    whatsapp: { value: '', consentToPublish: false },
    email: { value: '', consentToPublish: false },
    visitNote: { value: '', consentToPublish: false },
  },
};

export const PUBLIC_APPOINTMENTS = [
  {
    verified: false,
    number: '01',
    role: 'Executive Committee Member',
    organization: "Tiruppur Exporters' Association (TEA)",
    recordName: 'R. Ramu',
    recordDate: 'TEA publication · 12 February 2026',
    currentStatus: 'The publication confirms the listing on that date; it does not state a service term.',
    organizationContext:
      "TEA describes itself as an association for Tiruppur's cotton-knitwear exporters and says it helps buyers locate suppliers and resolve disputes.",
    ecosystemContext:
      'TEA represents Tiruppur knitwear exporters. Its published services include helping buyers locate suppliers and helping members resolve disputes.',
    appointmentSource: 'https://www.tea-india.org/news-board/tea-news/16867-tiruppur-textile-cluster-should-create-5-lakh-new-jobs-govt-to-support-exporters-piyush-goyal-12-february-2026',
    contextSource: 'https://tea-india.org/about-tea/vision',
  },
  {
    verified: false,
    number: '02',
    role: 'Director · Board of Directors',
    organization: 'Apparel, Made-Ups & Home Furnishing Sector Skill Council (AMHSSC)',
    recordName: 'Shri R. Ramu · Fashion Knits',
    recordDate: 'AMHSSC board directory',
    currentStatus: 'The directory lists the position; it does not state an appointment term.',
    organizationContext:
      'AMHSSC states that its remit includes skill development, standardization and certification across the apparel, made-ups and home-furnishing sectors.',
    ecosystemContext:
      'The Council develops skill standards, training and certification for work across apparel, made-ups and home furnishings.',
    appointmentSource: 'https://www.sscamh.com/en/board-members-of-amhssc',
    contextSource: 'https://www.sscamh.com/en/about-us',
  },
  {
    verified: false,
    number: '03',
    role: 'Director',
    organization: 'Netaji Apparel Park',
    recordName: 'R. Ramu',
    recordDate: 'Netaji Apparel Park director page',
    currentStatus: 'The page lists the position; it does not state a publication date or service term.',
    organizationContext:
      'Netaji Apparel Park describes its work as developing apparel manufacturing facilities and integrated industrial and social infrastructure.',
    ecosystemContext:
      'Netaji Apparel Park was developed under the Apparel Parks for Export Scheme to provide apparel manufacturing facilities and supporting infrastructure.',
    appointmentSource: 'https://netajiapparelpark.in/directors.php',
    contextSource: 'https://netajiapparelpark.in/',
  },
] as const;

// These entries remain out of the public-facing profile until the company confirms them.
export const NEEDS_COMPANY_CONFIRMATION = [
  {
    item: 'Name expansion and current service terms for the public Ramu / R. Ramu listings',
    reason:
      'Official records do not consistently expand the name to Ramu Raj or state appointment periods. Confirm the identity match and current/former status before making stronger claims.',
  },
  {
    item: 'Arbitration Council Chairman — Tiruppur Exporters’ Association (TEA)',
    reason:
      'This title appears in the existing About-page copy, but no official appointment record, exact council name, or term was located during this review.',
  },
  {
    item: 'Government-certified Two-Star Export House classification',
    reason:
      'This classification appears in existing site copy, but a current official certificate or status-holder record was not located during this review.',
  },
] as const;
