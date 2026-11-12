import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const SRC_DIR = path.join(projectRoot, 'public/assets/brands/customer-logos');
const OUT_DIR = path.join(projectRoot, 'public/brands/_processed');
const DATA_DIR = path.join(projectRoot, 'src/data');
const CONTACT_SHEET_PATH = path.join(projectRoot, 'brands-contact-sheet.png');

// Ensure output directories exist
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(DATA_DIR, { recursive: true });

// 27 brands in original order from BrandStandards.tsx
export const BRANDS = [
  { name: 'Next', slug: 'next' },
  { name: 'Alana', slug: 'alana' },
  { name: 'Acanthé', slug: 'acanthe' },
  { name: 'Noppies', slug: 'noppies' },
  { name: 'DW-Shop', slug: 'dw-shop' },
  { name: 'Coop', slug: 'coop' },
  { name: 'Beverly Hills Polo Club', slug: 'beverly-hills-polo-club' },
  { name: 'BOSS', slug: 'boss', polarity: 'ink-dark' }, // Bold black text
  { name: 'Zadig & Voltaire', slug: 'zadig-voltaire' },
  { name: 'Karl Lagerfeld', slug: 'karl-lagerfeld' },
  { name: 'Billiebush', slug: 'billiebush' },
  { name: 'WE Fashion', slug: 'we-fashion' },
  { name: 'Esprit', slug: 'esprit' },
  { name: 'La Fancée', slug: 'la-fancee' },
  { name: 'Sun City', slug: 'sun-city' },
  { name: 'Keedo', slug: 'keedo' },
  { name: 'DKNY', slug: 'dkny', polarity: 'ink-dark' }, // Bold black text
  { name: 'Sloggi', slug: 'sloggi' },
  { name: 'Camp David', slug: 'camp-david' },
  { name: 'Sergent Major', slug: 'sergent-major' },
  { name: 'Diesel', slug: 'diesel' }, // White letters on red box -> auto ink-light
  { name: 'Lalique', slug: 'lalique' },
  { name: 'Coopérative U', slug: 'cooperative-u' },
  { name: 'Marc O’Polo', slug: 'marc-opolo' },
  { name: 'Aéropostale', slug: 'aeropostale' },
  { name: 'Punto Blanco', slug: 'punto-blanco', polarity: 'ink-dark' }, // Black text with small white dot
  { name: 'Lodger', slug: 'lodger' },
];

/**
 * Optical sizing utility:
 * area A = 3800 px^2. h = sqrt(A / aspect); w = h * aspect.
 * scale = min(1, 150 / w, 52 / h). Final size = (w*scale, h*scale). On <=767 multiply by .82.
 */
export function getLogoSize(aspect, isMobile = false) {
  const A = 11000;
  const h = Math.sqrt(A / aspect);
  const w = h * aspect;
  const scale = Math.min(1, 190 / w, 74 / h);
  let finalW = Math.round(w * scale);
  let finalH = Math.round(h * scale);
  if (isMobile) {
    finalW = Math.round(finalW * 0.82);
    finalH = Math.round(finalH * 0.82);
  }
  return { w: finalW, h: finalH };
}

async function cropLogoArtwork(inputPath) {
  const source = sharp(inputPath);
  const sourceMeta = await source.metadata();
  const { data, info } = await source.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = Buffer.from(data);
  const { width, height, channels } = info;

  if (!sourceMeta.hasAlpha) {
    const edgeBand = Math.max(2, Math.round(Math.min(width, height) * 0.05));
    const edgeColors = new Map();
    const addSample = (x, y) => {
      const offset = (y * width + x) * channels;
      const color = [0, 1, 2].map((channel) => pixels[offset + channel]);
      const key = color.map((value) => Math.round(value / 16)).join(',');
      const sample = edgeColors.get(key) ?? { color: [0, 0, 0], count: 0 };
      color.forEach((value, channel) => { sample.color[channel] += value; });
      sample.count += 1;
      edgeColors.set(key, sample);
    };

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (x < edgeBand || x >= width - edgeBand || y < edgeBand || y >= height - edgeBand) {
          addSample(x, y);
        }
      }
    }

    const background = [...edgeColors.values()].sort((a, b) => b.count - a.count)[0];
    const backgroundColor = background.color.map((value) => Math.round(value / background.count));
    const isBackground = (offset) => Math.max(
      Math.abs(pixels[offset] - backgroundColor[0]),
      Math.abs(pixels[offset + 1] - backgroundColor[1]),
      Math.abs(pixels[offset + 2] - backgroundColor[2]),
    ) <= 32;
    const queue = new Uint32Array(width * height);
    let head = 0;
    let tail = 0;

    const enqueueBackground = (x, y) => {
      const pixelIndex = y * width + x;
      const offset = pixelIndex * channels;
      if (pixels[offset + 3] === 0 || !isBackground(offset)) return;
      pixels[offset + 3] = 0;
      queue[tail] = pixelIndex;
      tail += 1;
    };

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (x < edgeBand || x >= width - edgeBand || y < edgeBand || y >= height - edgeBand) {
          enqueueBackground(x, y);
        }
      }
    }

    while (head < tail) {
      const pixelIndex = queue[head];
      head += 1;
      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);
      if (x > 0) enqueueBackground(x - 1, y);
      if (x + 1 < width) enqueueBackground(x + 1, y);
      if (y > 0) enqueueBackground(x, y - 1);
      if (y + 1 < height) enqueueBackground(x, y + 1);
    }
  }

  let left = width;
  let top = height;
  let right = -1;
  let bottom = -1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = pixels[(y * width + x) * channels + 3];
      if (alpha <= 10) continue;
      left = Math.min(left, x);
      top = Math.min(top, y);
      right = Math.max(right, x);
      bottom = Math.max(bottom, y);
    }
  }

  if (right < left || bottom < top) {
    return { buffer: await source.png().toBuffer(), width, height };
  }

  const padding = 2;
  left = Math.max(0, left - padding);
  top = Math.max(0, top - padding);
  right = Math.min(width - 1, right + padding);
  bottom = Math.min(height - 1, bottom + padding);
  const cropWidth = right - left + 1;
  const cropHeight = bottom - top + 1;
  const buffer = await sharp(pixels, { raw: info })
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .png()
    .toBuffer();

  return { buffer, width: cropWidth, height: cropHeight };
}

async function processLogos() {
  console.log(`Processing ${BRANDS.length} brand logos...`);
  const generatedData = [];
  const processedForSheet = [];

  for (const brand of BRANDS) {
    const inputPath = path.join(SRC_DIR, `${brand.slug}.webp`);
    if (!fs.existsSync(inputPath)) {
      console.error(`Missing logo file: ${inputPath}`);
      continue;
    }

    // Step a: remove connected near-uniform edge backgrounds and crop to visible artwork.
    const { buffer: trimmedBuf, width: trimmedSourceWidth } = await cropLogoArtwork(inputPath);

    // Step b: Resize to fit within 320x112 with withoutEnlargement
    const resizedColorBuf = await sharp(trimmedBuf)
      .resize(320, 112, { fit: 'inside', withoutEnlargement: true })
      .toBuffer();

    const colorMeta = await sharp(resizedColorBuf).metadata();
    const w = colorMeta.width;
    const h = colorMeta.height;
    const aspect = Number((w / h).toFixed(4));

    // Step c: Save COLOR copy
    const colorOutPath = path.join(OUT_DIR, `${brand.slug}.color.webp`);
    await sharp(resizedColorBuf)
      .webp({ quality: 92, alphaQuality: 100 })
      .toFile(colorOutPath);

    // Step d: MONO copy, retaining the transparent edge crop.
    const { data: greyData } = await sharp(resizedColorBuf)
      .removeAlpha()
      .greyscale()
      .normalise()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { data: colorPixels, info: colorInfo } = await sharp(resizedColorBuf)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    let sumL = 0;
    let visiblePixels = 0;
    for (let i = 0; i < greyData.length; i += 1) {
      const alpha = colorPixels[i * colorInfo.channels + 3];
      sumL += greyData[i] * alpha / 255;
      visiblePixels += alpha / 255;
    }
    const meanL = visiblePixels > 0 ? sumL / visiblePixels : 255;

    let useInkDark = meanL < 115;
    if (brand.polarity === 'ink-dark') {
      useInkDark = true;
    } else if (brand.polarity === 'ink-light') {
      useInkDark = false;
    }

    // Allocate RGBA buffer: RGB = 255 everywhere, alpha = (255 - L) or L
    const rgbaBuffer = Buffer.alloc(w * h * 4);
    for (let i = 0; i < w * h; i++) {
      const L = greyData[i];
      const sourceAlpha = colorPixels[i * colorInfo.channels + 3];
      const alpha = Math.round((useInkDark ? 255 - L : L) * sourceAlpha / 255);
      const idx = i * 4;
      rgbaBuffer[idx] = 255;     // R
      rgbaBuffer[idx + 1] = 255; // G
      rgbaBuffer[idx + 2] = 255; // B
      rgbaBuffer[idx + 3] = alpha; // A
    }

    const monoOutPath = path.join(OUT_DIR, `${brand.slug}.mono.webp`);
    await sharp(rgbaBuffer, { raw: { width: w, height: h, channels: 4 } })
      .webp({ quality: 90, alphaQuality: 100 })
      .toFile(monoOutPath);

    // Optical rendered dimensions
    const rendered = getLogoSize(aspect);
    const lowRes = trimmedSourceWidth < 2 * rendered.w;

    generatedData.push({
      slug: brand.slug,
      name: brand.name,
      w,
      h,
      aspect,
      renderW: rendered.w,
      renderH: rendered.h,
      lowRes,
      meanL: Number(meanL.toFixed(1)),
      polarity: useInkDark ? 'ink-dark' : 'ink-light',
    });

    processedForSheet.push({
      slug: brand.slug,
      name: brand.name,
      monoOutPath,
      renderW: rendered.w,
      renderH: rendered.h,
      lowRes,
    });
  }

  // Step e: Write src/data/brands.generated.json
  const jsonPath = path.join(DATA_DIR, 'brands.generated.json');
  fs.writeFileSync(jsonPath, JSON.stringify(generatedData, null, 2), 'utf-8');
  console.log(`Wrote metadata to ${jsonPath}`);

  // Step f: Build contact sheet (NOT in /public): brands-contact-sheet.png
  // 6 columns, cells 260x120 on #151515, showing each mono logo at its computed rendered size with its name below
  const cols = 6;
  const rows = Math.ceil(processedForSheet.length / cols);
  const cellW = 260;
  const cellH = 120;
  const totalW = cols * cellW;
  const totalH = rows * cellH;

  const composites = [];

  // Cell border lines for clear grid structure
  let gridSvg = `<svg width="${totalW}" height="${totalH}">`;
  for (let c = 0; c <= cols; c++) {
    gridSvg += `<line x1="${c * cellW}" y1="0" x2="${c * cellW}" y2="${totalH}" stroke="#252525" stroke-width="1" />`;
  }
  for (let r = 0; r <= rows; r++) {
    gridSvg += `<line x1="0" y1="${r * cellH}" x2="${totalW}" y2="${r * cellH}" stroke="#252525" stroke-width="1" />`;
  }
  gridSvg += '</svg>';
  composites.push({ input: Buffer.from(gridSvg), left: 0, top: 0 });

  for (let i = 0; i < processedForSheet.length; i++) {
    const item = processedForSheet[i];
    const c = i % cols;
    const r = Math.floor(i / cols);
    const cellLeft = c * cellW;
    const cellTop = r * cellH;

    // Resize mono logo to computed rendered size
    const logoBuf = await sharp(item.monoOutPath)
      .resize(item.renderW, item.renderH)
      .png()
      .toBuffer();

    const logoLeft = cellLeft + Math.round((cellW - item.renderW) / 2);
    const logoTop = cellTop + Math.round((64 - item.renderH) / 2) + 12;

    composites.push({
      input: logoBuf,
      left: logoLeft,
      top: logoTop,
    });

    // Label SVG below the logo
    const safeName = item.name
      .toUpperCase()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const labelColor = item.lowRes ? '#e0a96d' : 'rgba(255,255,255,0.7)';
    const tagText = item.lowRes ? ' [LOW-RES]' : '';
    const labelSvg = `
      <svg width="${cellW}" height="36">
        <text x="${cellW / 2}" y="18" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="500" letter-spacing="1" fill="${labelColor}" text-anchor="middle">
          ${safeName}${tagText}
        </text>
        <text x="${cellW / 2}" y="32" font-family="monospace" font-size="9" fill="rgba(255,255,255,0.35)" text-anchor="middle">
          ${item.renderW}x${item.renderH}px
        </text>
      </svg>
    `;

    composites.push({
      input: Buffer.from(labelSvg),
      left: cellLeft,
      top: cellTop + 78,
    });
  }

  await sharp({
    create: {
      width: totalW,
      height: totalH,
      channels: 4,
      background: '#151515',
    },
  })
    .composite(composites)
    .png()
    .toFile(CONTACT_SHEET_PATH);

  console.log(`Saved contact sheet to ${CONTACT_SHEET_PATH}`);
}

processLogos().catch(err => {
  console.error('Processing failed:', err);
  process.exit(1);
});
