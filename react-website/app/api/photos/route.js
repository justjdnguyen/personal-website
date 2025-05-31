import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Map of manual dates for photos that need them
const manualDates = {
  // Example format:
  // 'japan-2024/IMG_1234.jpg': 'January 15, 2024',
  // Add your manual dates here
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getManualDate(filename) {
  // Check for date in filename (YYYY-MM-DD format)
  const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    return formatDate(dateMatch[1]);
  }
  return null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tripId = searchParams.get("tripId");

  if (!tripId) {
    return NextResponse.json({ error: "Trip ID is required" }, { status: 400 });
  }

  try {
    const tripDir = path.join(process.cwd(), "images", "trips", tripId);
    const files = fs.readdirSync(tripDir);

    const photos = files
      .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map((file, index) => ({
        id: index + 1,
        src: `/api/photos/image?tripId=${tripId}&filename=${file}`,
        alt: file.split(".")[0],
        date: new Date().toISOString().split("T")[0], // You might want to extract this from the filename or metadata
      }));

    return NextResponse.json({ photos });
  } catch (error) {
    console.error("Error loading photos:", error);
    return NextResponse.json(
      { error: "Failed to load photos" },
      { status: 500 }
    );
  }
}
