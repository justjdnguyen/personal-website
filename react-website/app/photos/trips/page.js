"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";

const trips = [
  {
    id: "japan-2025",
    name: "JAPAN 2025",
    path: "/photos/trips/japan-2025",
    date: { year: 2025, month: 4 },
  },
  {
    id: "loveland-apr-2025",
    name: "LOVELAND APR 2025",
    path: "/photos/trips/loveland-apr-2025",
    date: { year: 2025, month: 3 }, // Apr
  },
  {
    id: "loveland-mar-2025",
    name: "LOVELAND MAR 2025",
    path: "/photos/trips/loveland-mar-2025",
    date: { year: 2025, month: 2 }, // Mar
  },
  {
    id: "loveland-feb-2025",
    name: "LOVELAND FEB 2025",
    path: "/photos/trips/loveland-feb-2025",
    date: { year: 2025, month: 1 }, // Feb
  },
];

// Helper to extract year and month from id or name, or use explicit date property
function parseTripDate(trip) {
  if (trip.date) return trip.date;
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const lower = (trip.id + " " + trip.name).toLowerCase();
  const yearMatch = lower.match(/20\d{2}/);
  const year = yearMatch ? parseInt(yearMatch[0], 10) : 0;
  let month = -1;
  for (let i = 0; i < months.length; i++) {
    if (lower.includes(months[i])) {
      month = i;
      break;
    }
  }
  return { year, month };
}

const sortedTrips = [...trips].sort((a, b) => {
  const da = parseTripDate(a);
  const db = parseTripDate(b);
  // Sort by year desc, then month desc, then fallback to original order
  if (db.year !== da.year) return db.year - da.year;
  if (db.month !== da.month) return db.month - da.month;
  return 0;
});

export default function TripsPage() {
  const [tripPreviews, setTripPreviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTripPreviews() {
      setLoading(true);
      setError(null);
      const previews = {};

      for (const trip of sortedTrips) {
        try {
          console.log(`Loading preview for ${trip.id}...`);
          const response = await fetch(`/api/photos?tripId=${trip.id}`);
          console.log(`Response status for ${trip.id}:`, response.status);

          if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error loading ${trip.id}:`, errorData);
            continue;
          }

          const data = await response.json();
          console.log(
            `Loaded ${data.photos?.length || 0} photos for ${trip.id}`
          );

          if (data.photos?.length > 0) {
            previews[trip.id] = data.photos.slice(0, 4);
          }
        } catch (error) {
          console.error(`Error loading preview for ${trip.id}:`, error);
          setError(`Failed to load photos for ${trip.name}`);
        }
      }

      setTripPreviews(previews);
      setLoading(false);
    }

    loadTripPreviews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16 min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-center">
                  <div
                    className="group relative w-full overflow-hidden rounded-2xl bg-gray-100"
                    style={{ aspectRatio: "4/3" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedTrips.map((trip) => (
              <div key={trip.id} className="flex items-center justify-center">
                <Link
                  href={trip.path}
                  className="group relative w-full overflow-hidden rounded-2xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-lg"
                  style={{ aspectRatio: "4/3" }}
                >
                  <div className="absolute inset-0">
                    {tripPreviews[trip.id]?.length > 0 ? (
                      <div className="grid grid-cols-2 gap-1 h-full">
                        {tripPreviews[trip.id].map((photo, index) => (
                          <div
                            key={photo.id}
                            className="relative overflow-hidden"
                          >
                            <img
                              src={photo.imageUrl}
                              alt=""
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h2 className="text-xl md:text-3xl font-extrabold tracking-wider text-white group-hover:text-gray-200 transition-colors duration-300 drop-shadow-lg">
                      {trip.name}
                    </h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
