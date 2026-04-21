/**
 * Generates WebP thumbnails + base64 LQIP blur placeholders for all trips.
 * Outputs a JSON sidecar file per trip: public/images/trips/[id]/meta.json
 *
 * Usage:
 *   node scripts/gen-thumbs.mjs              # all trips
 *   node scripts/gen-thumbs.mjs japan-2025   # one trip
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tripsDir = path.join(__dirname, "../public/images/trips");
const THUMB_WIDTH = 800;
const THUMB_QUALITY = 78;
const LQIP_WIDTH = 16;

const targetTrip = process.argv[2];
const trips = targetTrip
  ? [targetTrip]
  : fs.readdirSync(tripsDir).filter((d) =>
      fs.statSync(path.join(tripsDir, d)).isDirectory()
    );

for (const trip of trips) {
  const tripDir = path.join(tripsDir, trip);
  const thumbDir = path.join(tripDir, "thumbs");
  if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir);

  const files = fs
    .readdirSync(tripDir)
    .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
    .sort();

  console.log(`\n${trip}: ${files.length} images`);

  const meta = {};

  for (const file of files) {
    const srcPath = path.join(tripDir, file);
    const thumbName = path.parse(file).name + ".webp";
    const thumbPath = path.join(thumbDir, thumbName);
    const key = path.parse(file).name;

    // Read dimensions once
    const { width, height } = await sharp(srcPath).metadata();

    // Generate thumb if missing
    if (!fs.existsSync(thumbPath)) {
      await sharp(srcPath)
        .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
        .webp({ quality: THUMB_QUALITY })
        .toFile(thumbPath);
      process.stdout.write(`  ✓ thumb  ${file}\n`);
    }

    // Always regenerate LQIP (fast, ~1ms each)
    const lqipBuf = await sharp(srcPath)
      .resize({ width: LQIP_WIDTH })
      .webp({ quality: 20 })
      .toBuffer();
    const lqip = `data:image/webp;base64,${lqipBuf.toString("base64")}`;

    meta[key] = { width, height, lqip };
  }

  // Write sidecar JSON
  const metaPath = path.join(tripDir, "meta.json");
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
  console.log(`  → wrote meta.json (${files.length} entries)`);
}

console.log("\nDone.");
