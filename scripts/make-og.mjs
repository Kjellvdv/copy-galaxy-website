/**
 * Generates public/og-default.png from an inline SVG.
 * Run with `node scripts/make-og.mjs` after changing the wordmark or tagline.
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

let seed = 20260825;
const rand = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
const stars = Array.from({ length: 110 }, () => {
  const bright = rand() < 0.14;
  return `<circle cx="${(rand() * 1200).toFixed(1)}" cy="${(rand() * 630).toFixed(1)}" r="${
    bright ? (1.3 + rand()).toFixed(2) : (0.5 + rand() * 0.6).toFixed(2)
  }" fill="#fff" opacity="${(0.2 + rand() * 0.6).toFixed(2)}"/>`;
}).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="a" cx="18%" cy="0%" r="70%">
      <stop offset="0%" stop-color="#7c8cff" stop-opacity=".42"/>
      <stop offset="100%" stop-color="#7c8cff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="b" cx="88%" cy="12%" r="62%">
      <stop offset="0%" stop-color="#c084fc" stop-opacity=".34"/>
      <stop offset="100%" stop-color="#c084fc" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#05060f"/>
  <rect width="1200" height="630" fill="url(#a)"/>
  <rect width="1200" height="630" fill="url(#b)"/>
  ${stars}
  <circle cx="82" cy="72" r="7" fill="#7c8cff"/>
  <text x="102" y="79" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="24" fill="#e8eaf6">the copy galaxy</text>
  <text x="80" y="330" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="82" font-weight="600" fill="#ffffff" letter-spacing="-2">Web design</text>
  <text x="80" y="424" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="82" font-weight="600" fill="#ffffff" letter-spacing="-2">worth stealing</text>
  <text x="80" y="500" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="28" fill="#8b91b8">A public swipe file of landing page patterns.</text>
  <rect x="80" y="540" width="360" height="2" fill="#7c8cff" opacity=".7"/>
</svg>`;

// fileURLToPath, not .pathname — the iCloud path has spaces that stay percent-encoded otherwise.
const out = fileURLToPath(new URL('../public/og-default.png', import.meta.url));
await sharp(Buffer.from(svg)).png().toFile(out);
console.log('wrote public/og-default.png');
