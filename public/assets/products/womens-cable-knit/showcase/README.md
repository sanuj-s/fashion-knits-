# Women's showcase composite images

Place the five finished front-facing garment-and-hanger images in this folder. Each image should include the complete garment and the same natural walnut hanger in one transparent PNG. Keep the garment design intact, use a consistent camera angle, and leave enough edge clearance to preserve the full silhouette.

Use a shared portrait canvas (recommended: 1200 × 1600 px) for all five images. Keep the hook centered and near the top edge so it meets the existing gold rack; position the garment shoulders close beneath the rack and let the garment fill the remaining canvas naturally. Preserve each garment's proportions. The showcase uses `object-contain` and animates the combined image as one object.

Expected files:

- `ivory-cable-knit-cardigan.png`
- `cream-navy-striped-cable-knit-polo.png`
- `cream-cable-knit-polo-navy-tipping.png`
- `navy-cable-knit-polo-gold-buttons.png`
- `navy-ivory-block-stripe-cable-knit-polo.png`

After the files are supplied, set each Women's garment's `showcaseImage` in `lib/products-data.ts` to its matching `/assets/products/womens-cable-knit/showcase/<filename>` path. The `showcaseImageTop` and `showcaseImageWidth` fit values are reserved for per-garment alignment.
