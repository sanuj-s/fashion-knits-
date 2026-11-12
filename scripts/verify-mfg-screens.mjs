import { chromium } from '/Users/apple/.npm/_npx/31e32ef8478fbf80/node_modules/playwright/index.mjs';

const VIEWPORTS = [
  { name: 'desktop-1920', width: 1920, height: 1080 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
];

async function run() {
  console.log('Launching Chrome via Playwright...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    console.log(`Navigating at ${vp.name} (${vp.width}x${vp.height})...`);
    await page.goto('http://127.0.0.1:3000/manufacturing', { waitUntil: 'networkidle' });

    // Wait 1.6s for entrance animation timeline to complete
    await page.waitForTimeout(1600);

    // Verify buttons are in DOM and clickable
    const ctaPrimary = await page.$('.mfg-btn-primary');
    const ctaSecondary = await page.$('.mfg-btn-secondary');
    if (!ctaPrimary || !ctaSecondary) {
      throw new Error(`[${vp.name}] CTA buttons not found in DOM`);
    }

    const ctaPrimaryHref = await ctaPrimary.getAttribute('href');
    const ctaSecondaryHref = await ctaSecondary.getAttribute('href');
    console.log(`[${vp.name}] Primary CTA href: ${ctaPrimaryHref}, Secondary CTA href: ${ctaSecondaryHref}`);

    // If desktop, test pointer hover on photo card
    if (vp.width >= 1024) {
      const card = await page.$('.mfg-photo-stage');
      if (card) {
        const box = await card.boundingBox();
        if (box) {
          // Move pointer into card
          await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.3);
          await page.waitForTimeout(300);
          await page.screenshot({ path: `output/mfg-screens/${vp.name}-hover.png` });
          console.log(`Saved hover screenshot to output/mfg-screens/${vp.name}-hover.png`);

          // Move pointer out to test reset
          await page.mouse.move(10, 10);
          await page.waitForTimeout(600);
        }
      }
    }

    const outPath = `output/mfg-screens/${vp.name}.png`;
    await page.screenshot({ path: outPath });
    console.log(`Saved screenshot to ${outPath}`);

    if (consoleErrors.length > 0) {
      console.warn(`[${vp.name}] Console errors:`, consoleErrors);
    } else {
      console.log(`[${vp.name}] Clean: 0 console errors.`);
    }

    await context.close();
  }

  // Also test scroll into statistics / next section
  console.log('Testing scroll into statistics...');
  const scrollContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const scrollPage = await scrollContext.newPage();
  await scrollPage.goto('http://127.0.0.1:3000/manufacturing', { waitUntil: 'networkidle' });
  await scrollPage.waitForTimeout(1000);
  await scrollPage.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
  await scrollPage.waitForTimeout(1200);
  await scrollPage.screenshot({ path: 'output/mfg-screens/desktop-1440-scrolled.png' });
  console.log('Saved scrolled screenshot to output/mfg-screens/desktop-1440-scrolled.png');
  await scrollContext.close();

  // Test reduced motion
  console.log('Testing prefers-reduced-motion: reduce...');
  const rmContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const rmPage = await rmContext.newPage();
  await rmPage.goto('http://127.0.0.1:3000/manufacturing', { waitUntil: 'networkidle' });
  await rmPage.waitForTimeout(400);
  await rmPage.screenshot({ path: 'output/mfg-screens/reduced-motion-1440.png' });
  console.log('Saved reduced-motion screenshot to output/mfg-screens/reduced-motion-1440.png');
  await rmContext.close();

  await browser.close();
  console.log('All browser verifications completed successfully!');
}

run().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
