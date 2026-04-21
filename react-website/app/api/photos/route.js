import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const R2_URL = process.env.NEXT_PUBLIC_R2_URL;

// ─── R2 source ────────────────────────────────────────────────────────────────
async function getPhotosFromR2(tripId) {
  const metaUrl = `${R2_URL}/trips/${tripId}/meta.json`;
  const res = await fetch(metaUrl, { next: { revalidate: 3600 } });
  if (!res.ok) return null;

  const meta = await res.json();
  return Object.entries(meta).map(([key, { width, height, lqip }], index) => {
    // key is the filename stem; reconstruct original extension by trying jpg
    const file = key + ".jpg";
    return {
      id: index + 1,
      src:   `${R2_URL}/trips/${tripId}/${file}`,
      thumb: `${R2_URL}/trips/${tripId}/thumbs/${key}.webp`,
      alt:   key,
      width,
      height,
      lqip,
    };
  });
}

// ─── Local filesystem source ──────────────────────────────────────────────────
async function getPhotosFromLocal(tripId) {
  const tripDir = path.join(process.cwd(), "public", "images", "trips", tripId);
  const thumbDir = path.join(tripDir, "thumbs");
  const metaPath = path.join(tripDir, "meta.json");

  if (!fs.existsSync(tripDir)) return [];

  const files = fs
    .readdirSync(tripDir)
    .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
    .sort();

  // Load LQIP sidecar if available
  const meta = fs.existsSync(metaPath)
    ? JSON.parse(fs.readFileSync(metaPath, "utf8"))
    : {};

  return await Promise.all(
    files.map(async (file, index) => {
      const key = path.parse(file).name;
      const thumbName = key + ".webp";
      const hasThumb = fs.existsSync(path.join(thumbDir, thumbName));
      const cached = meta[key];

      let width = cached?.width ?? null;
      let height = cached?.height ?? null;
      let lqip = cached?.lqip ?? null;

      // Fall back to sharp read if meta.json doesn't exist yet
      if (!width || !height) {
        try {
          const m = await sharp(path.join(tripDir, file)).metadata();
          width = m.width;
          height = m.height;
        } catch {}
      }

      return {
        id: index + 1,
        src:   `/images/trips/${tripId}/${file}`,
        thumb: hasThumb
          ? `/images/trips/${tripId}/thumbs/${thumbName}`
          : `/images/trips/${tripId}/${file}`,
        alt: key,
        width,
        height,
        lqip,
      };
    })
  );
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tripId = searchParams.get("tripId");

  if (!tripId) {
    return NextResponse.json({ error: "Trip ID is required" }, { status: 400 });
  }

  try {
    const photos = R2_URL
      ? await getPhotosFromR2(tripId)
      : await getPhotosFromLocal(tripId);

    if (!photos) {
      return NextResponse.json({ photos: [] });
    }

    return NextResponse.json({ photos });
  } catch (error) {
    console.error("Error loading photos:", error);
    return NextResponse.json({ error: "Failed to load photos" }, { status: 500 });
  }
}
