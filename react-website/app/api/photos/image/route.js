import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tripId = searchParams.get("tripId");
  const filename = searchParams.get("filename");

  if (!tripId || !filename) {
    return NextResponse.json(
      { error: "Trip ID and filename are required" },
      { status: 400 }
    );
  }

  try {
    const imagePath = path.join(
      process.cwd(),
      "public",
      "images",
      "trips",
      tripId,
      filename
    );

    if (!fs.existsSync(imagePath)) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const contentType = getContentType(filename);

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return NextResponse.json(
      { error: "Failed to serve image" },
      { status: 500 }
    );
  }
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}
