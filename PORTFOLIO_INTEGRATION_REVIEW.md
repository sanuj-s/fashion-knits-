# Fashion Knits portfolio integration review

Reviewed: 24 October 2026  
Primary company source: `Fashion Knits Profile.pdf` (27 pages, supplied by the site owner)

## Change contract

- **Objective:** Integrate source-supported company information into the existing Fashion Knits website so apparel buyers can review company background, products, manufacturing, quality, export preparation, sustainability and available records.
- **Source precedence:** The supplied company profile is the primary source for company-specific details. Local certificate PDFs and the public company contact listing were cross-checked where available. A statement in a profile is attributed to the profile when current operation, scope or independent confirmation is not established.
- **Fixed invariants:** Preserve the Next.js/React/TypeScript/Tailwind architecture, site routes, navigation, quote form and API contract, SEO metadata, charcoal/ivory/gold identity, keyboard access and reduced-motion behavior.
- **Bounds:** Edit only portfolio-related pages, shared components, source-derived optimized assets and this review record. Keep the existing website audit. Do not deploy, push, contact the company, or publish externally.
- **Allowed decisions:** Organize source facts into buyer-facing sections; label profile statements, representative imagery, document status and unresolved scope; omit or qualify claims that lack adequate evidence.
- **Prohibited claims:** Do not invent or imply current customers, installed equipment/counts, facility operation, monthly capacity, certifications, audit outcomes, test results, export routes, logistics services, sustainability impact or quality guarantees.
- **Acceptance checks:** Review each changed route at desktop and mobile widths; verify local asset paths; run the repository lint, TypeScript and production-build commands requested by the owner. No new test suites are added.
- **Rollback:** Revert the focused source and asset changes listed in this review; retain the pre-existing `SITE_AUDIT.md` and unrelated workspace content.

## Source-to-page map

| Portfolio pages | Source material | Website destination |
| --- | --- | --- |
| 2–3 | Since-1990 company story, Tiruppur base and stated values | Home and `/about` |
| 4–8, 18 | Infrastructure, machines, operations and capacity statements | `/manufacturing`; listed machine models shown with profile-image caveat |
| 9–11 | Fabric inspection, test lab, AQL, production-stage checks, metal detection and packing | `/quality`, `/manufacturing`, `/export` |
| 12 | Men’s, women’s, kids’ and babies/toddler product lists | Home and `/products` |
| 13 | 27 customer-brand logos | Home and `/quality`; public-use and relationship confirmation remains required |
| 14–17 | Company-profile solar, park-wide solar, tree-planting and wastewater statements | Home sustainability section, each with attribution/scope caveats |
| 19 | Credential logos without complete supporting records | Not shown as current certifications |
| 20–26 | GOTS, OCS, OEKO-TEX, amfori BSCI summary, Disney FAMA and WRAP records | Home certificate summary and `/quality` document gallery |
| 27 | Three listed addresses, website and email | `/about`, `/export`, footer and enquiry email fallback |

## Pages and components changed

- `components/sections/Products.tsx`, `app/products/ProductsClient.tsx`: four company-profile product segments and their listed garment types; illustrative imagery remains identified as such.
- `app/about/AboutClient.tsx`, `components/sections/About.tsx`: profile history, values, three listed addresses and existing company-supplied reference photos with identity caveats; Unit 03 remains a labeled photo placeholder.
- `app/manufacturing/ManufacturingClient.tsx`: profile-named cutting, embroidery and printing equipment grouped by process; no facility-wide machine totals or capacity claim is published.
- `app/quality/QualityClient.tsx`, `components/sections/BrandStandards.tsx`, `components/sections/BrandLogoCarousel.tsx`, `components/sections/CertificateShowcase.tsx`: profile-reported inspection and testing statements, six document records, and profile-listed customer logos with qualification notes and readable backing.
- `components/sections/Sustainability.tsx`: company-profile and park-wide environmental statements clearly distinguished by operator/scope.
- `app/export/ExportClient.tsx`, `app/export/page.tsx`: profile-listed garment dispatch preparation and locations, with freight, customs, warehousing and document responsibilities presented as items to confirm.
- `components/sections/Contact.tsx`, `components/sections/Footer.tsx`, `app/api/contact/route.ts`: profile-listed email fallback and addresses; removed the old `.com` mailbox and unsubstantiated telephone number. Form submission and API behavior are preserved.
- `public/assets/brands/portfolio/`, `public/assets/portfolio/`, `public/assets/certificates/previews/`: optimized source-derived logos, equipment/ESG images and certificate-page previews. The full source portfolio PDF is not copied into the public assets.

## Company confirmation checklist

1. **Customer names and logos:** The profile page includes Next, Alana, Acanthé, Noppies, DW-Shop, Coop, Beverly Hills Polo Club, BOSS, Zadig & Voltaire, Karl Lagerfeld, Billiebush, WE Fashion, Esprit, La Fancée, Sun City, Keedo, DKNY, Sloggi, Camp David, Sergent Major, Diesel, Lalique, Coopérative U, Marc O’Polo, Aéropostale, Punto Blanco and Lodger. Confirm relationship status (past/current), exact naming and permission to display each logo publicly.
2. **Contact and domain:** The profile lists `raviramu@fashionknits.net` and `www.fashionknits.in`; the [public `.net` company contact listing](https://www.fashionknits.net/) repeats the mailbox and Angeripalayam address, but was last indexed about five months before this review. The existing website sitemap uses `.com`. Confirm the monitored mailbox, canonical website domain, address spelling and redirect plan. No telephone number is published from the reviewed profile.
3. **Facilities:** Confirm current operation, exact unit number, postal address, processes performed and production route at each of the three profile-listed addresses. The PDF assigns Unit 01 to Netaji Apparel Park and Head Office/Unit 02 to Angeripalayam; its Disney form calls the No. 29 site Unit 2. The Unit 03 address has no PIN code. Confirm that the two low-resolution company-supplied reference photos depict the current sites.
4. **Machinery and production:** Confirm each profile-listed machine is installed, active and at the stated site: Lectra automatic cutter, Bullmer E80, Barudan embroidery, three Tajima embroidery machines, Kornit Storm 931, M&R Challenger II, Sportsman EX and M&R Alpha 8 Oval. Confirm the current total machine count and which processes are owned, in-house or subcontracted. The profile’s approximately 350,000 pieces/month figure and totals in its facility illustration are intentionally omitted pending current facility-by-facility scope, product mix and measurement basis.
5. **Quality:** Confirm the profile’s 4-point fabric inspection, in-house colorfastness/shrinkage/physical-attribute lab tests, AQL 1.5 garment inspection, production-stage checks, metal detection, final checking, ironing and export-carton packing. Supply test methods, lab scope/equipment, current records, sampling standard/version and any result or accreditation evidence before making stronger claims.
6. **Sustainability and social responsibility:** Confirm that the 200 kWp rooftop solar system belongs to and currently serves Fashion Knits at the stated NAP site. Keep the separately described 3.4 MW installation attributed to the wider Apparel Park. Confirm dates, campaign organizer and Fashion Knits’ own share of the “almost 125,000 trees over two years” statement. Confirm the wastewater system’s site, operator, present operation and reuse route. No emissions or impact metric is published.
7. **Export:** The PDF states garment checks, ironing, metal detection and export-carton packing, but does not evidence company-operated warehousing, customs brokerage, freight booking, sea/air services, named destinations or a dedicated export team. Confirm any such service and who performs it before adding it as a company capability. The “Two-Star Export House” statement on page 2 has no supporting current recognition document in the supplied set and is not presented as current.

## Certificate and record review

Dates and scope below are transcribed from the supplied/local document copies, not authenticated with issuers.

| Record | Copy details | Review status and required action |
| --- | --- | --- |
| GOTS scope certificate | USB Certification; certificate `USB TEX-5053-GOTS-2510.2`; local copy states validity to 27 Sep 2026; apparel, yarn and listed textile processes across named facilities; starred operations may be subcontracted. | Expired as of review date. Obtain a current scope certificate and shipment-level transaction certificates before any product claim. |
| OCS scope certificate | USB Certification; `USB-00007995-OCS-2510`, version `.2`; local copy states validity to 13 Oct 2026; apparel/fabrics and listed processing scope. | Expired as of review date. Obtain a current scope certificate and applicable transaction documents. |
| OEKO-TEX® STANDARD 100 | Local copy `2011149`, Fashion Knits Printing Division, Product Class I (Annex 6), commission printing scope; copy states validity to 30 Nov 2026. The portfolio separately shows older no. `1908098`, broad knitwear scope, through 31 Aug 2026. | Current copy is unverified and narrow to the listed printing scope; older profile copy is expired. Confirm issuer status and do not combine the two scopes. |
| WRAP Certificate of Compliance | `9322`, Fashion Knits Branch; local copy states 1 Jun 2026–1 Jun 2027 and lists cutting/sewing/trimming/checking/ironing/packing at the Apparel Park address. Existing filename `bsci-social-compliance.pdf` is misleading; its content is WRAP. | Copy period overlaps the review date, but issuer, site identity and current scope are not independently verified. Request an authenticated copy. |
| amfori BSCI monitoring summary | ID `25-0306371`; Fashion Knits Branch, Plot 29, Nethaji Apparel Park; visit 25–28 Feb 2025; submitted 9 Mar 2025; summary lists overall B and expiry 9 Mar 2027; monitor shown as TÜV Rheinland. | Summary/acknowledgement only, not a certificate or full report. Obtain the full current report and confirm facility coverage and issuer/platform status. |
| Disney FAMA authorization | ID `13PHRL3E6WTM`; Sun City licensee/vendor; Fashion Knits Unit 2, No. 29, Netaji Apparel Park; issued 4 Nov 2024; form says one year or earlier revocation/agreement expiry. | Expired after 4 Nov 2025. Authorization, not certification; facility unit number also differs from the address page. Obtain current facility-specific authorization if relevant. |

The profile’s GOTS, OEKO-TEX, Sedex/SMETA, Disney FAMA, amfori BSCI, Better Cotton, ICS, OCS and WRAP logo row on page 19 is not treated as proof of active scope. Better Cotton and ICS supporting documents were not supplied.

## Missing originals and limitations

- Current high-resolution photos that identify each active facility and Unit 03; approved current production-floor, cutting, embroidery, printing, sewing, testing, packing, solar, wastewater and team photographs.
- Current, site-specific machine photos and an owner-confirmed inventory/capacity schedule. The machine images used on `/manufacturing` are illustrations shown in the supplied profile, not installation evidence.
- Current authenticated GOTS/OCS/OEKO-TEX/WRAP records, complete amfori BSCI report, current Disney FAMA authorization if applicable, and transaction certificates for any product-level organic claim.
- Lab scope, methods/equipment list, sample results/reports, inspection plan and AQL standard/version where the company wants those details to be buyer-facing.
- Written approval for public display of customer brands and permission to use original logo artwork.
- Confirmed official mailbox, canonical domain and current contact details.

## Verification results

- `npm run lint`: passed with 0 errors and 7 existing warnings in legacy components (`Certifications.tsx`, `CompanyStory.tsx`, `FactoryVideo.tsx`, `Quality.tsx`, `FactoryCinematicVideo.tsx` and `ImagePlaceholder.tsx`). Those components have no imports from the active route tree; this review does not modify them.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed. Next.js warned that it ignored `/Users/apple/package-lock.json` because it is outside this repository and suggested configuring `outputFileTracingRoot`; the app compiled and all 10 routes were generated.
- Local browser review: home, product catalogue, About facilities, manufacturing equipment, quality checks and certificate gallery, sustainability cards, export preparation and export locations were opened at desktop and mobile widths. No page runtime errors were reported. Visual review confirmed responsive card layouts and loaded source assets.
- Local site is running at `http://localhost:3000/` for review. No deployment or remote changes were made.
