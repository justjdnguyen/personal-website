"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";

const trips = [
  { id: "japan-2025",        name: "Japan",        sub: "April 2025",    path: "/photos/trips/japan-2025",       date: { year: 2025, month: 4 } },
  { id: "loveland-apr-2025", name: "Loveland",     sub: "April 2025",    path: "/photos/trips/loveland-apr-2025", date: { year: 2025, month: 3 } },
  { id: "loveland-mar-2025", name: "Loveland",     sub: "March 2025",    path: "/photos/trips/loveland-mar-2025", date: { year: 2025, month: 2 } },
  { id: "loveland-feb-2025", name: "Loveland",     sub: "February 2025", path: "/photos/trips/loveland-feb-2025", date: { year: 2025, month: 1 } },
];

const sortedTrips = [...trips].sort((a, b) => {
  if (b.date.year !== a.date.year) return b.date.year - a.date.year;
  return b.date.month - a.date.month;
});

export default function TripsPage() {
  const [tripPreviews, setTripPreviews] = useState({});

  useEffect(() => {
    async function loadPreviews() {
      const previews = {};
      for (const trip of sortedTrips) {
        try {
          const res = await fetch(`/api/photos?tripId=${trip.id}`);
          if (!res.ok) continue;
          const data = await res.json();
          if (data.photos?.length > 0) previews[trip.id] = data.photos.slice(0, 1);
        } catch {}
      }
      setTripPreviews(previews);
    }
    loadPreviews();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 max-w-6xl mx-auto px-6 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="font-[var(--font-outfit)] text-xs tracking-[0.22em] uppercase text-stone-400 mb-4">All Trips</p>
          <h1 className="font-[var(--font-cormorant)] font-light text-6xl text-[#0D0D0D]">
            The <span className="font-semibold italic">roll.</span>
          </h1>
        </motion.div>

        <div className="space-y-0">
          {sortedTrips.map((trip, i) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={trip.path}
                className="group flex items-center justify-between border-t border-stone-100 py-7 hover:pl-2 transition-all duration-500"
              >
                <div className="flex items-center gap-8">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                    {tripPreviews[trip.id]?.[0] ? (
                      <img
                        src={tripPreviews[trip.id][0].src}
                        alt=""
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-100" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-[var(--font-cormorant)] text-2xl font-semibold text-[#0D0D0D] leading-tight">{trip.name}</h2>
                    <p className="font-[var(--font-outfit)] text-sm text-stone-400 mt-0.5">{trip.sub}</p>
                  </div>
                </div>

                <motion.svg
                  whileGroupHover={{ x: 4 }}
                  className="w-5 h-5 text-stone-300 group-hover:text-[#0D0D0D] transition-colors duration-500"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </Link>
            </motion.div>
          ))}
          <div className="border-t border-stone-100" />
        </div>
      </div>
    </div>
  );
}
