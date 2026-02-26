/**
 * One-time script to generate public/og-image.png (1200×630).
 * Uses Playwright (already installed as a project dependency).
 * Run: node scripts/generate-og.mjs
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, '..', 'public', 'og-image.png');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@200;300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: 1200px;
    height: 630px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 96px;
    font-family: 'Hanken Grotesk', -apple-system, 'Helvetica Neue', sans-serif;
    color: #0d0d0d;
  }

  .eyebrow {
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #555555;
    margin-bottom: 32px;
  }

  h1 {
    font-size: 80px;
    font-weight: 200;
    letter-spacing: -0.02em;
    line-height: 1.05;
    color: #0d0d0d;
    margin-bottom: 32px;
  }

  hr {
    border: none;
    border-top: 1px solid #e0e0e0;
    margin-bottom: 28px;
    width: 64px;
  }

  p {
    font-size: 20px;
    font-weight: 300;
    line-height: 1.55;
    color: #555555;
    max-width: 640px;
  }
</style>
</head>
<body>
  <div class="eyebrow">eiler.dk</div>
  <h1>Writing on<br/>what comes next.</h1>
  <hr />
  <p>Technology, enterprise AI and the architecture of what comes next.</p>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.screenshot({ path: outputPath, type: 'png' });
await browser.close();

console.log(`OG image written to ${outputPath}`);
