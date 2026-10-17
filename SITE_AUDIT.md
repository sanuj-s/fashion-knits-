# Fashion Knits website audit

Audit snapshot: 14 October 2026. Scope: the home page, the existing `/products`, `/manufacturing`, `/quality`, `/about`, and `/export` routes, shared navigation/footer/contact sections, local image assets, and the contact API.

## Current home page map (before changes)

| Current order | Section message | Adjacent image / visual | Intended buyer takeaway | Finding |
| --- | --- | --- | --- | --- |
| Hero | Knitwear for brands, with product and quote actions | Editorial models in knitwear | Understand the business and start a conversation | Relevant as illustrative apparel imagery, but there is no visible disclosure; the moving ticker claims expired or unverified standards. |
| About | Two Tiruppur locations and connected production | AI composites of the supplied factory and office buildings | See where the company operates | The AI images could be mistaken for real facilities; square-footage and scope statements are not evidenced. |
| Manufacturing process | Eight stages from yarn to export packing | One generated image per process stage | Understand the order journey | The images match each step but need a clear representative-image notice; copy implies knitting and wet processing always happen in-house. |
| Capabilities | Knitting, color, cutting, assembly | Generated machinery and worker scenes | Understand production infrastructure | Duplicates the process imagery and does not say which work is in-house or subcontracted. |
| Products | Eight knitwear categories | Product images match the garment categories | See the range | Images contain invented garment labels; cards publish unverified fiber, GSM, finish, certification and MOQ claims. |
| Sustainability | Materials and standards | Yarn and swatch still life | Understand material options | Current certification status is not reflected; “lower-water” and named standards are unsupported as active claims. |
| Certificate showcase | Compliance marks and certificates | Logos and PDF previews | Assess buyer compliance | The 16-logo roster includes claims with no supporting files, and two of the supplied scope certificates have expired. |
| Contact | Enquiry form and direct contacts | Generated sampling-studio scene | Send a quote request | The image is illustrative but unlabeled. The API logs submissions and returns success without delivering or storing them. |

The current home page omits the existing export section. Products also appear after the process and capabilities, so visitors do not see the product range early in the buyer journey.

## Other route and shared-component findings (before changes)

| Route/component | Current purpose | Evidence and issue |
| --- | --- | --- |
| `/products` | Product catalogue | Repeats the unsupported materials, technical specifications, MOQ, lead-time and certification claims from the home cards. Product photos are illustrative and contain fabricated labels. |
| `/manufacturing` | Facility and infrastructure overview | Facility cards use AI-composited exteriors; the machinery list names specific machines, gauges, tolerances, test equipment and daily dispatch capability without supporting evidence. The attached BSCI document lists cutting, sewing, trimming, checking, ironing and packing at the Unit 1 branch. |
| `/quality` | Quality processes and certificates | Calls every listed credential “verified/current”, shows 13 unsupported standards, and claims an in-house lab and exact inspection/test protocols. Certificate copies have varying scopes and validity dates. |
| `/about` | Company background and facilities | Contains five undated milestones, ethical/environmental guarantees, certification claims and unsupported facility/inspection metrics. Facility photographs are AI composites. |
| `/export` | Export workflow and logistics | Claims exact lead times, named carriers, ports, routes, distances, customs services, Incoterms, packaging tests and delivery guarantees without evidence. |
| Shared navigation/footer | Route navigation and company summary | Footer repeats unsupported certification claims. Navigation points to existing routes and home anchors. |
| Shared contact section/API | Quote enquiry | API success only reflects a local log statement; there is no email provider or durable store configured. A 200 response is not evidence that the company received an enquiry. |

## Supplied certificate document dates and scope

These are statements read from the local PDF copies, not independently authenticated issuer records:

| Document | What the local copy says | Status on 14 October 2026 |
| --- | --- | --- |
| GOTS, scope certificate USB TEX-5053-GOTS-2510.2 | Scope includes apparel, fabric and yarn; knitting, dyeing, finishing and pre-treatment may be subcontracted. Valid until 27 September 2026. | Expired; do not advertise as current. |
| OCS, scope certificate USB-00007995-OCS-2510 | Scope includes apparel and fabric; several processes may be subcontracted. Valid until 13 October 2026. | Expired; do not advertise as current. |
| OEKO-TEX Standard 100, certificate 2011149 | Product Class I; scope is commission printing on specified knitted/woven fabrics. Valid until 30 November 2026. | The copy indicates current validity, but this is not a site-wide garment certificate and still needs issuer confirmation. |
| amfori BSCI audit 9322 | The copy states 1 June 2026–1 June 2027 and lists cutting, sewing, trimming, checking, ironing and packing at the Netaji Apparel Park branch. | The copy indicates current validity; authenticity and current scope need issuer confirmation. |

## Buyer journey target

1. Hero: state knitwear manufacturing in Tiruppur for apparel brands, with product and quote actions.
2. Product categories.
3. Order/process stages, with representative images explicitly identified.
4. Facility capabilities, distinguishing the documented Unit 1 garment processes from processes that may use subcontractors.
5. Quality checkpoints and certificate scope/date information.
6. Company background and facility references, with current factory and office photographs to be supplied when available.
7. Export planning and material responsibility, with order-specific details rather than unsupported promises.
8. Clear quote contact.

## Business confirmation items

- Current GOTS and OCS renewals, transaction certificate availability, and which facility/processes/products each scope covers.
- Current OEKO-TEX certificate and issuer verification; whether commission printing is the only current scope.
- Current BSCI report, facility identity, valid dates, and the issuer's public verification route.
- Which knitting, dyeing, finishing, testing, sampling and packing operations are in-house versus subcontracted for each product program.
- Current product range, material/finish options, MOQ, sampling/bulk lead times, capacity, test equipment and quality standards.
- Current export destinations, forwarding/port arrangements, export documents and Incoterms offered.
- Higher-resolution, current photographs of the Netaji Apparel Park factory exterior/interior, Angeripalayam office, people, process and genuine garment samples. The supplied facility photos are authentic references but low resolution.
- Confirm the public website domain, contact email/phone, addresses and stated office hours.
- Configure an email provider and verified sender/recipient before the form can submit enquiries electronically.

## Changes made

- Reordered the home page around the buyer journey: knitwear offer, garment categories, production process, capabilities, quality documents, company, export planning, sustainability and enquiry.
- Replaced unsupported claims across the active routes with plain, order-specific language. Added relevant illustrative apparel and production images with context, and removed the nested horizontal process scroller in favor of a regular grid and native page scrolling.
- Replaced the original low-resolution factory and office photographs in the facility cards with the higher-resolution exterior concepts previously supplied in the project. They are identified as factory and office references; image alternative text describes them as illustrative concepts. This keeps them out of the role of authenticated facility photography.
- Added representative sea-freight and air-freight photographs to `/export`, and explained that the separate shipping team coordinates export planning with the buyer and logistics partners. Their locations and imagery are not evidence of Fashion Knits' shipment routes. Image source and license notes are in `public/assets/export/SOURCES.md`.
- No Fashion Knits-specific destination list was present in the repository during the audit. The export page now shows the United States, United Kingdom, Europe, Australia, Japan and South Korea as wider Tiruppur cluster markets, with source links and a clear note that they are not Fashion Knits' confirmed customer destinations. Confirm the company's current or target markets before presenting them as its own export footprint.
- Updated quote delivery behavior: the form only reports provider acceptance when the configured email provider accepts a message; without configuration it offers a prefilled email draft. Provider acceptance is not proof of receipt by a person.

## Remaining company confirmation

- Supply current factory and office photographs if the exterior concepts should be replaced with documentary imagery.
- Confirm current/target export countries, and confirm the shipping team's precise responsibilities, forwarder relationships, documents and shipment modes.
- Confirm the public contact email, phone and addresses; verify current certificate and audit status with issuers.
- Confirm which processes are in-house versus subcontracted for each product and order.
- Configure verified email sender and recipient values and test delivery through a controlled mailbox before publishing the quote form as an online delivery channel.
