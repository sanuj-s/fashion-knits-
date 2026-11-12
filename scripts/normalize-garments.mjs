#!/usr/bin/env node
/**
 * One-time script: trim transparent padding from each garment WebP so the
 * top edge is exactly the apex of the hanger hook, then export WebP with
 * alpha (quality 90) into public/assets/products/_normalized/.
 *
 * Usage:  node scripts/normalize-garments.mjs
 */

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'public/assets/products/showcase');
const OUT_DIR = path.join(ROOT, 'public/assets/products/_normalized');

fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs.readdirSync(SRC_DIR).filter(f => f.startsWith('perspective-') && f.endsWith('.webp'));

console.log(`Found ${files.length} garment images to normalize.\n`);

for (const file of files) {
  const srcPath = path.join(SRC_DIR, file);
  const img = sharp(srcPath);
  const meta = await img.metadata();

  // Trim transparent padding from all edges
  const trimmed = await sharp(srcPath).trim().toBuffer({ resolveWithObject: true });

  const outFile = file; // keep same filename
  const outPath = path.join(OUT_DIR, outFile);

  await sharp(trimmed.data)
    .webp({ quality: 84, alphaQuality: 85, effort: 6 })
    .toFile(outPath);

  const outMeta = await sharp(outPath).metadata();

  console.log(
    `  ${file}: ${meta.width}x${meta.height} → ${outMeta.width}x${outMeta.height}` +
    `  (trimmed ${(meta.width - outMeta.width)}px W, ${(meta.height - outMeta.height)}px H)`
  );
}

console.log(`\nDone. Normalized images written to: ${OUT_DIR}`);
