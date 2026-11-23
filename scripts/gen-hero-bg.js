// One-off script: derives a lightweight WebP hero background from the
// master image in src/images. Run manually if src/images/fondoh.png changes:
// node scripts/gen-hero-bg.js
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "src/images/fondoh.png");
const OUT = path.join(ROOT, "public/images/fondoh.webp");

async function main() {
  await sharp(SOURCE)
    .resize({ width: 2200, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(OUT);
  console.log("Hero background generated: public/images/fondoh.webp");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
