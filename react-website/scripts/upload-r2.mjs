/**
 * Uploads originals, WebP thumbs, and meta.json for all trips (or one) to R2.
 * Skips files that already exist in the bucket (HEAD check).
 *
 * Requires .env.local:
 *   R2_ACCOUNT_ID=...
 *   R2_ACCESS_KEY_ID=...
 *   R2_SECRET_ACCESS_KEY=...
 *   R2_BUCKET_NAME=...
 *   R2_PUBLIC_URL=https://pub-xxxx.r2.dev   (or custom domain)
 *
 * Usage:
 *   node scripts/upload-r2.mjs              # all trips
 *   node scripts/upload-r2.mjs japan-2025   # one trip
 */
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env.local manually (no dotenv dependency needed)
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
}

const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME } = process.env;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
  console.error("Missing R2 env vars. Check .env.local");
  process.exit(1);
}

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
});

const tripsDir = path.join(__dirname, "../public/images/trips");
const targetTrip = process.argv[2];
const trips = targetTrip
  ? [targetTrip]
  : fs.readdirSync(tripsDir).filter((d) =>
      fs.statSync(path.join(tripsDir, d)).isDirectory()
    );

async function exists(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function upload(localPath, r2Key, contentType) {
  if (await exists(r2Key)) {
    process.stdout.write(`  skip  ${r2Key}\n`);
    return;
  }
  await s3.send(new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: r2Key,
    Body: fs.readFileSync(localPath),
    ContentType: contentType,
  }));
  process.stdout.write(`  ✓ up   ${r2Key}\n`);
}

const mimeOf = (f) => {
  const ext = path.extname(f).toLowerCase();
  if (ext === ".webp") return "image/webp";
  if (ext === ".json") return "application/json";
  return "image/jpeg";
};

let total = 0;

for (const trip of trips) {
  const tripDir = path.join(tripsDir, trip);
  const thumbDir = path.join(tripDir, "thumbs");
  console.log(`\n${trip}`);

  if (!fs.existsSync(path.join(tripDir, "meta.json"))) {
    console.warn(`  ⚠ meta.json missing — run gen-thumbs.mjs first`);
    continue;
  }

  // Originals
  for (const f of fs.readdirSync(tripDir).filter((f) => /\.(jpg|jpeg|png)$/i.test(f))) {
    await upload(path.join(tripDir, f), `trips/${trip}/${f}`, mimeOf(f));
    total++;
  }

  // Thumbs
  if (fs.existsSync(thumbDir)) {
    for (const f of fs.readdirSync(thumbDir).filter((f) => f.endsWith(".webp"))) {
      await upload(path.join(thumbDir, f), `trips/${trip}/thumbs/${f}`, "image/webp");
      total++;
    }
  }

  // Meta sidecar
  await upload(path.join(tripDir, "meta.json"), `trips/${trip}/meta.json`, "application/json");
  total++;
}

console.log(`\nDone. Processed ${total} files.`);
