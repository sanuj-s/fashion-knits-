# Showroom angle asset manifest

Every style currently has a single real front image. Back, left, right and close-up images have not been supplied. The showroom shows explicit angle placeholders and does not simulate rotation from a flat image.

## Add real views

For each style, add matching, production-approved views under public/assets/products/views/{style-id}/ using these filenames:

- back.webp
- left.webp
- right.webp
- detail.webp

Then add the corresponding paths to that style's views object in lib/products-data.ts. Use the same garment, colourway, crop, lighting and scale in every view. Do not add an angle until its image is available.

## Current front images

| Style reference | Current front image | Additional real views needed |
|---|---|---|
| mens-concept-minimal-logo-tee | /assets/products/trend-edit/mens-luxury-logo-tee-cutout.webp | back.webp, left.webp, right.webp, detail.webp |
| mens-concept-art-graphic-tee | /assets/products/trend-edit/mens-art-graphic-tee-cutout.webp | back.webp, left.webp, right.webp, detail.webp |
| mens-concept-half-zip-knit | /assets/products/trend-edit/mens-half-zip-knit-pullover.webp | back.webp, left.webp, right.webp, detail.webp |
| mens-tshirts-polos | /assets/products/_normalized/perspective-mens-polo.webp | back.webp, left.webp, right.webp, detail.webp |
| mens-hoodies-sweatshirts | /assets/products/_normalized/perspective-mens-hoodie.webp | back.webp, left.webp, right.webp, detail.webp |
| mens-shorts-joggers | /assets/products/_normalized/perspective-mens-joggers.webp | back.webp, left.webp, right.webp, detail.webp |
| mens-jackets-coats-jumpers | /assets/products/_normalized/perspective-mens-jacket.webp | back.webp, left.webp, right.webp, detail.webp |
| mens-sleepwear-lounge | /assets/products/_normalized/perspective-mens-lounge-top.webp | back.webp, left.webp, right.webp, detail.webp |
| womens-concept-striped-knit-polo | /assets/products/trend-edit/womens-striped-knit-polo.webp | back.webp, left.webp, right.webp, detail.webp |
| womens-concept-funnel-neck-knit | /assets/products/trend-edit/womens-ribbed-funnel-neck-top.webp | back.webp, left.webp, right.webp, detail.webp |
| womens-tshirts | /assets/products/_normalized/perspective-womens-top.webp | back.webp, left.webp, right.webp, detail.webp |
| womens-dresses-shirts | /assets/products/_normalized/perspective-womens-dress.webp | back.webp, left.webp, right.webp, detail.webp |
| womens-cardigans-sweaters | /assets/products/_normalized/perspective-womens-cardigan.webp | back.webp, left.webp, right.webp, detail.webp |
| womens-sweatshirts-hoodies | /assets/products/_normalized/perspective-womens-sweatshirt.webp | back.webp, left.webp, right.webp, detail.webp |
| womens-maternity | /assets/products/_normalized/perspective-womens-maternity.webp | back.webp, left.webp, right.webp, detail.webp |
| kids-concept-rugby-top | /assets/products/trend-edit/kids-modern-rugby-top.webp | back.webp, left.webp, right.webp, detail.webp |
| kids-tshirts | /assets/products/_normalized/perspective-kids-tshirt.webp | back.webp, left.webp, right.webp, detail.webp |
| kids-shorts | /assets/products/_normalized/perspective-kids-shorts.webp | back.webp, left.webp, right.webp, detail.webp |
| kids-sweaters-pullovers | /assets/products/_normalized/perspective-kids-sweater.webp | back.webp, left.webp, right.webp, detail.webp |
| kids-sets | /assets/products/_normalized/perspective-kids-set.webp | back.webp, left.webp, right.webp, detail.webp |
| baby-concept-striped-romper | /assets/products/trend-edit/baby-striped-rib-romper.webp | back.webp, left.webp, right.webp, detail.webp |
| baby-tshirts | /assets/products/_normalized/perspective-baby-top.webp | back.webp, left.webp, right.webp, detail.webp |
| baby-rompers-onesies | /assets/products/_normalized/perspective-baby-romper.webp | back.webp, left.webp, right.webp, detail.webp |
| baby-dresses-frocks | /assets/products/_normalized/perspective-baby-dress.webp | back.webp, left.webp, right.webp, detail.webp |
| baby-pajamas | /assets/products/_normalized/perspective-baby-sleeper.webp | back.webp, left.webp, right.webp, detail.webp |
