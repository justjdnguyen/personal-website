"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PhotoCard from "../../components/PhotoCard";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";

const tripMeta = {
  "japan-2025":        { name: "Japan",    sub: "April 2025" },
  "loveland-apr-2025": { name: "Loveland", sub: "April 2025" },
  "loveland-mar-2025": { name: "Loveland", sub: "March 2025" },
  "loveland-feb-2025": { name: "Loveland", sub: "February 2025" },
};

export default function TripPage() {
  const params = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tripId = params?.tripId;
  const meta = tripMeta[tripId] || { name: tripId, sub: "" };

  useEffect(() => {
    if (!tripId) return;
    async function loadPhotos() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/photos?tripId=${tripId}`);
        if (!res.ok) throw new Error("Failed to load photos");
        const data = await res.json();
        setPhotos(data.photos);
      } catch (err) {
        setError("Failed to load photos. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadPhotos();
  }, [tripId]);

  const skeleton = (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 max-w-6xl mx-auto px-6 pb-28">
        <div className="mb-12 h-20 w-48 bg-stone-100 rounded-xl animate-pulse" />
        <div className="columns-2 md:columns-3 lg:columns-4" style={{ columnGap: "0.75rem" }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="break-inside-avoid aspect-[3/4] bg-stone-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) return skeleton;

  if (error) return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 flex items-center justify-center">
        <p className="font-[var(--font-outfit)] text-stone-500">{error}</p>
      </div>
    </div>
  );

  if (photos.length === 0) return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 flex flex-col items-center justify-center gap-3">
        <p className="font-[var(--font-cormorant)] text-3xl text-[#0D0D0D]">No photos yet.</p>
        <p className="font-[var(--font-outfit)] text-stone-400 text-sm">Check back soon.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-28 max-w-6xl mx-auto px-6 pb-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <motion.div whileHover={{ x: -3 }} className="inline-block mb-6">
            <Link
              href="/photos/trips"
              className="inline-flex items-center gap-2 font-[var(--font-outfit)] text-sm text-stone-400 hover:text-[#0D0D0D] transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                <path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              All trips
            </Link>
          </motion.div>
          <div>
            <p className="font-[var(--font-outfit)] text-xs tracking-[0.22em] uppercase text-stone-400 mb-2">{meta.sub}</p>
            <h1 className="font-[var(--font-cormorant)] font-light text-6xl text-[#0D0D0D]">
              {meta.name}
              <span className="font-semibold italic">.</span>
            </h1>
            <p className="font-[var(--font-outfit)] text-sm text-stone-400 mt-2">{photos.length} photos</p>
          </div>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4" style={{ columnGap: "0.75rem" }}>
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.6) }}
              className="break-inside-avoid mb-3"
            >
              <PhotoCard photos={photos} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
