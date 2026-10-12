# Fashion Knits — Asset Replacement Directory

This directory hosts production assets for the Fashion Knits corporate website.
All placeholder components (`ImagePlaceholder`, `VideoPlaceholder`, `ModelPlaceholder`, 3D geometries) are modular and designed for direct replacement without restructuring the layout.

## Directory Structure

- `/public/assets/images/` — High-resolution photography (WebP / AVIF format recommended)
  - Factory floors, knitting machinery, dyeing vessels, finishing lines, team photos, garment product photos
- `/public/assets/videos/` — Factory loop videos (MP4 H.264 / WebM VP9)
  - Hero background video: `hero-factory-cinematic.mp4`
  - Cinematic precision section video: `factory-cinematic.mp4`
- `/public/assets/models/` — 3D assets (GLB / glTF)
  - 01-yarn.glb, 02-knitting.glb, 03-dyeing.glb, etc.
- `/public/assets/placeholders/` — Temporary mockups and fallback frames

## How to replace placeholders:

1. **Images (`ImagePlaceholder.tsx`)**:
   Pass your image URL to Next.js `<Image>` component or replace the placeholder tag in each section component (`About.tsx`, `Capabilities.tsx`, `Products.tsx`, etc.).

2. **Videos (`VideoPlaceholder.tsx` & `FactoryVideo.tsx`)**:
   Uncomment the `<video>` block in `Hero.tsx` or `FactoryVideo.tsx` and supply `src="/assets/videos/your-file.mp4"`.

3. **3D Models (`JourneyScene.tsx`)**:
   Use Drei's `useGLTF('/assets/models/your-model.glb')` inside `components/three/JourneyGeometries.tsx` to replace the procedural placeholder meshes.
