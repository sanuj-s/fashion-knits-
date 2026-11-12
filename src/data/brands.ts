import brandsData from './brands.generated.json';

export interface BrandInfo {
  slug: string;
  name: string;
  w: number;
  h: number;
  aspect: number;
  renderW: number;
  renderH: number;
  lowRes: boolean;
  meanL: number;
  polarity: 'ink-dark' | 'ink-light';
}

export const BRANDS: BrandInfo[] = brandsData as BrandInfo[];

// rows = [items at even indexes, items at odd indexes] of the ORIGINAL order
export const ROW_1_BRANDS = BRANDS.filter((_, idx) => idx % 2 === 0);
export const ROW_2_BRANDS = BRANDS.filter((_, idx) => idx % 2 !== 0);

/**
 * Optical sizing utility:
 * area A = 3800 px^2. h = sqrt(A / aspect); w = h * aspect.
 * scale = min(1, 150 / w, 52 / h). Final size = (w*scale, h*scale). On <=767 multiply by .82.
 */
export function getLogoSize(aspect: number, isMobile = false) {
  const A = 3800;
  const h = Math.sqrt(A / aspect);
  const w = h * aspect;
  const scale = Math.min(1, 150 / w, 52 / h);
  let finalW = Math.round(w * scale);
  let finalH = Math.round(h * scale);
  if (isMobile) {
    finalW = Math.round(finalW * 0.82);
    finalH = Math.round(finalH * 0.82);
  }
  return { w: finalW, h: finalH };
}
