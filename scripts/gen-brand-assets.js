// One-off script: derives web logo, brand mark, favicons and OG image from the
// master logos in src/brand. Run manually only if the masters change:
//   node scripts/gen-brand-assets.js
//
// Masters:
//   src/brand/logotipo.png — cyan lockup, transparent background (on-page use)
//   src/brand/logot.png    — lockup + "software & technology" on navy (OG image)
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const LOGOTIPO = path.join(ROOT, "src/brand/logotipo.png");
const LOGOT = path.join(ROOT, "src/brand/logot.png");
const NAVY = { r: 0, g: 24, b: 51, alpha: 1 }; // sampled from logot.png

async function trimmedLogotipo() {
  return sharp(LOGOTIPO).trim({ threshold: 10 }).png().toBuffer();
}

async function webLogo() {
  const trimmed = await trimmedLogotipo();
  const meta = await sharp(trimmed).metadata();
  const width = 640;
  const height = Math.round((width / meta.width) * meta.height);
  await sharp(trimmed)
    .resize({ width, height })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(path.join(ROOT, "public/brand/logo.webp"));
  return { width, height };
}

// Isolates the "A + dot" mark: it is the leftmost glyph cluster of the lockup.
async function markBuffer() {
  const trimmed = await trimmedLogotipo();
  const { data, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  // Find the first fully transparent column gap after the mark begins.
  const colInk = new Array(info.width).fill(false);
  for (let x = 0; x < info.width; x++) {
    for (let y = 0; y < info.height; y++) {
      if (data[(y * info.width + x) * 4 + 3] > 40) { colInk[x] = true; break; }
    }
  }
  let x = 0;
  while (!colInk[x]) x++;
  // The mark's "A" and dot touch no letter; walk until a gap wider than 1.5% of width.
  const minGap = Math.round(info.width * 0.015);
  let gap = 0;
  let end = x;
  for (; x < info.width; x++) {
    if (colInk[x]) { gap = 0; end = x; } else if (++gap > minGap) break;
  }
  const crop = await sharp(trimmed)
    .extract({ left: 0, top: 0, width: end + 1, height: info.height })
    .toBuffer();
  return sharp(crop).trim({ threshold: 10 }).png().toBuffer();
}

async function markWebp(mark) {
  const meta = await sharp(mark).metadata();
  const height = 160;
  const width = Math.round((height / meta.height) * meta.width);
  await sharp(mark).resize({ height, width }).webp({ quality: 92, alphaQuality: 100 })
    .toFile(path.join(ROOT, "public/brand/mark.webp"));
}

async function squareIcon(mark, size) {
  const pad = Math.round(size * 0.2);
  const inner = size - pad * 2;
  const resized = await sharp(mark)
    .resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: NAVY } })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toBuffer();
}

async function ogImage() {
  const W = 1200;
  const H = 630;
  const meta = await sharp(LOGOT).metadata();
  // logot.png has generous navy padding; scale to cover width and crop to 1200x630.
  const scaledH = Math.round((W / meta.width) * meta.height);
  const resized = await sharp(LOGOT).resize({ width: W, height: scaledH }).toBuffer();
  await sharp({ create: { width: W, height: H, channels: 4, background: NAVY } })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toFile(path.join(ROOT, "src/app/opengraph-image.png"));
}

async function main() {
  const mark = await markBuffer();
  await markWebp(mark);

  const icon512 = await squareIcon(mark, 512);
  await sharp(icon512).toFile(path.join(ROOT, "src/app/icon.png"));
  await sharp(icon512).toFile(path.join(ROOT, "public/icons/icon-512.png"));
  await sharp(await squareIcon(mark, 192)).toFile(path.join(ROOT, "public/icons/icon-192.png"));
  await sharp(await squareIcon(mark, 180)).toFile(path.join(ROOT, "src/app/apple-icon.png"));

  await ogImage();
  const dims = await webLogo();
  console.log("Brand assets generated. logo.webp:", dims);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
