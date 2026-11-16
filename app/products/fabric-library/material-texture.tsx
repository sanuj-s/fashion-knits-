'use client';

import { useId } from 'react';

type MaterialTextureProps = {
  materialId: string;
  className?: string;
  tint?: string;
};

type TexturePalette = {
  base: string;
  light: string;
  dark: string;
  grain: number;
};

const TEXTURE_PALETTES: Record<string, TexturePalette> = {
  'organic-cotton': { base: '#a89a80', light: '#d3c6aa', dark: '#554a38', grain: 0.72 },
  'combed-cotton': { base: '#c0b59e', light: '#e1d6be', dark: '#6d6251', grain: 0.92 },
  'recycled-polyester': { base: '#596d78', light: '#aab7ba', dark: '#24353e', grain: 0.62 },
  'cotton-polyester': { base: '#938b7e', light: '#c9c0b1', dark: '#4d4842', grain: 0.76 },
  'cotton-elastane': { base: '#897f71', light: '#c4b8a7', dark: '#433d37', grain: 0.74 },
  'french-terry': { base: '#646b64', light: '#aeb3a6', dark: '#303831', grain: 0.88 },
  fleece: { base: '#958b7f', light: '#cfc2b2', dark: '#4e463e', grain: 0.46 },
  'single-jersey': { base: '#7d8179', light: '#c0bfb1', dark: '#414943', grain: 0.95 },
  pique: { base: '#54726f', light: '#9eb5aa', dark: '#243e3a', grain: 0.88 },
  'rib-knit': { base: '#888579', light: '#c8c1b3', dark: '#49453f', grain: 0.76 },
  interlock: { base: '#aaa79a', light: '#ddd5c5', dark: '#5e5b55', grain: 1.18 },
  viscose: { base: '#81766d', light: '#d0b8a3', dark: '#403935', grain: 0.52 },
  modal: { base: '#9b9287', light: '#ded0bd', dark: '#524a43', grain: 0.56 },
  lyocell: { base: '#71827f', light: '#c6d1c5', dark: '#334442', grain: 0.62 },
  'linen-blend': { base: '#a08f73', light: '#d5c6a6', dark: '#544b3b', grain: 0.58 },
  'wool-blend': { base: '#73685c', light: '#b8a28a', dark: '#352f2a', grain: 0.34 },
};

function TexturePattern({ id, materialId, palette }: { id: string; materialId: string; palette: TexturePalette }) {
  const line = { stroke: palette.light, strokeWidth: 0.7, strokeOpacity: 0.34, fill: 'none' as const };
  const shadowLine = { stroke: palette.dark, strokeWidth: 0.8, strokeOpacity: 0.38, fill: 'none' as const };

  switch (materialId) {
    case 'single-jersey':
      return <pattern id={id} width="18" height="14" patternUnits="userSpaceOnUse"><path d="M1 2 5 6 9 2M10 9l4 4 4-4M5 6v4M14 2v7" {...line} /><path d="M1 2v7M9 2v7" {...shadowLine} /></pattern>;
    case 'rib-knit':
      return <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse"><rect width="7" height="14" fill={palette.light} opacity=".1" /><path d="M2 0v14M4 0v14M9 0v14M11 0v14" stroke={palette.dark} strokeOpacity=".32" strokeWidth="1" /><path d="M1 0v14M8 0v14" stroke={palette.light} strokeOpacity=".36" strokeWidth="1" /></pattern>;
    case 'french-terry':
      return <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="4" cy="5" r="1.6" fill={palette.dark} opacity=".3" /><circle cx="13" cy="13" r="1.6" fill={palette.light} opacity=".35" /><circle cx="13" cy="4" r="1" fill={palette.light} opacity=".2" /><path d="M2 8c1.4-2.5 3.2-2.5 4.6 0M10.8 16c1.3-2.3 3.1-2.3 4.4 0" {...shadowLine} /></pattern>;
    case 'fleece':
      return <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse"><path d="M3 5c2-2 4 1 5 0s2-3 4-1M16 8c1-2 4-1 5 1s3 0 4-2M1 20c2-2 4 0 5-2s4-2 5 0M16 23c2-2 4-1 5 1s4 0 5-2" {...line} /><circle cx="12" cy="13" r=".8" fill={palette.light} opacity=".25" /></pattern>;
    case 'pique':
      return <pattern id={id} width="20" height="18" patternUnits="userSpaceOnUse"><path d="m5 1 5 2.8v5.6L5 12.2 0 9.4V3.8zm10 5.6 5 2.8v5.7l-5 2.8-5-2.8v-5.7zM15 1l5 2.8M5 12.2V18" {...line} /><path d="m5 3.3 3.2 1.8v3.4L5 10.3 1.8 8.5V5.1z" {...shadowLine} /></pattern>;
    case 'interlock':
      return <pattern id={id} width="12" height="10" patternUnits="userSpaceOnUse"><path d="M0 2 3 5l3-3M6 7l3 3 3-3" stroke={palette.light} strokeOpacity=".4" strokeWidth=".55" fill="none" /><path d="M0 2v6M6 2v5M12 2v6" stroke={palette.dark} strokeOpacity=".32" strokeWidth=".65" /></pattern>;
    case 'cotton-polyester':
      return <pattern id={id} width="24" height="22" patternUnits="userSpaceOnUse"><path d="M2 5 7 3M14 7l6-2M5 16l7-2M17 20l5-2" stroke={palette.light} strokeOpacity=".4" strokeWidth="1.2" /><path d="M0 10 24 2M0 21 24 13" stroke={palette.dark} strokeOpacity=".2" strokeWidth=".65" /></pattern>;
    case 'cotton-elastane':
      return <pattern id={id} width="28" height="18" patternUnits="userSpaceOnUse"><path d="M0 5c4-4 7 4 11 0s7 4 11 0 5 2 6 1M0 14c4-4 7 4 11 0s7 4 11 0 5 2 6 1" {...line} /><path d="M0 8c4-4 7 4 11 0s7 4 11 0 5 2 6 1" {...shadowLine} /></pattern>;
    case 'viscose':
    case 'modal':
    case 'lyocell':
      return <pattern id={id} width="160" height="200" patternUnits="userSpaceOnUse"><path d="M-30 30C20 12 30 70 80 48s62-1 110-30M-30 72C20 53 35 110 83 88s60-1 107-27M-30 143c53-25 68 34 117 12s60-4 103-25M-30 188c55-25 70 30 118 10s55-2 102-24" stroke={palette.light} strokeOpacity={materialId === 'lyocell' ? '.26' : '.34'} strokeWidth="9" fill="none" /><path d="M-20 37c51-18 59 43 107 22s62-2 100-24M-20 151c51-21 66 35 116 14s60-3 101-23" stroke={palette.dark} strokeOpacity=".17" strokeWidth="2" fill="none" /></pattern>;
    case 'linen-blend':
      return <pattern id={id} width="38" height="34" patternUnits="userSpaceOnUse"><path d="M1 4h12m5 0h18M4 10h7m5 0h19M0 20h17m4 0h12M7 28h9m5 0h14" stroke={palette.light} strokeOpacity=".4" strokeWidth="1.1" /><path d="M5 0v9m0 5v15M22 2v12m0 7v13M34 0v17m0 5v10" stroke={palette.dark} strokeOpacity=".26" strokeWidth=".9" /></pattern>;
    case 'wool-blend':
      return <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M3 5c2-4 5-2 4 1s-4 1-3 5m11-8c3-2 5 1 3 3s-4 2-2 5M2 19c0-3 4-4 5-1s-2 4-4 3m13-2c-2-3 2-5 4-2s-1 5-3 4" stroke={palette.light} strokeOpacity=".46" strokeWidth="1.2" fill="none" /></pattern>;
    case 'recycled-polyester':
      return <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse"><path d="M-5 18 18-5M2 27 27 2M13 29 29 13" stroke={palette.light} strokeOpacity=".21" strokeWidth="1.1" /><path d="M-7 11 11-7M8 29 29 8" stroke={palette.dark} strokeOpacity=".22" strokeWidth=".8" /></pattern>;
    case 'organic-cotton':
    case 'combed-cotton':
      return <pattern id={id} width="34" height="30" patternUnits="userSpaceOnUse"><path d="M2 7 9 5M17 9l10-2M6 22l12-3M24 25l8-2" stroke={palette.light} strokeOpacity={materialId === 'combed-cotton' ? '.25' : '.4'} strokeWidth={materialId === 'combed-cotton' ? '.7' : '1.3'} /><path d="M4 12 8 11M21 15l5-1M12 28l4-1" stroke={palette.dark} strokeOpacity=".24" strokeWidth=".7" /></pattern>;
    default:
      return <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 10h20M10 0v20" stroke={palette.light} strokeOpacity=".18" strokeWidth=".6" /></pattern>;
  }
}

export function getMaterialTint(materialId: string) {
  return TEXTURE_PALETTES[materialId]?.base ?? '#77746a';
}

export function MaterialTexture({ materialId, className, tint }: MaterialTextureProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const palette = TEXTURE_PALETTES[materialId] ?? TEXTURE_PALETTES['single-jersey'];
  const colorsId = `mat-colors-${id}`;
  const patternId = `mat-pattern-${id}`;
  const grainId = `mat-grain-${id}`;
  const satinId = `mat-satin-${id}`;

  return (
    <svg className={className} viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={colorsId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={palette.light} stopOpacity=".72" />
          <stop offset=".42" stopColor={tint ?? palette.base} />
          <stop offset="1" stopColor={palette.dark} />
        </linearGradient>
        <linearGradient id={satinId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".46" stopColor="#fff" stopOpacity={['viscose', 'modal', 'lyocell'].includes(materialId) ? '.2' : '.08'} />
          <stop offset=".54" stopColor="#fff" stopOpacity=".02" />
          <stop offset="1" stopColor="#000" stopOpacity=".14" />
        </linearGradient>
        <filter id={grainId} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency={palette.grain / 100} numOctaves="2" seed={materialId.length * 13} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer><feFuncA type="linear" slope=".22" /></feComponentTransfer>
        </filter>
        <TexturePattern id={patternId} materialId={materialId} palette={palette} />
      </defs>
      <rect width="400" height="520" fill={`url(#${colorsId})`} />
      <rect width="400" height="520" fill={`url(#${patternId})`} opacity=".7" />
      <rect width="400" height="520" fill={`url(#${satinId})`} />
      <rect width="400" height="520" filter={`url(#${grainId})`} opacity=".16" style={{ mixBlendMode: 'soft-light' }} />
      <path d="M0 0h400v520H0z" fill="none" stroke="#fff" strokeOpacity=".08" strokeWidth="2" />
    </svg>
  );
}
