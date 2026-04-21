"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const trips = [
  { id: "sydney-2025",    name: "Sydney",        path: "/photos/trips/sydney-2025",    date: { year: 2025, month: 11 } },
  { id: "melbourne-2025", name: "Melbourne",     path: "/photos/trips/melbourne-2025", date: { year: 2025, month: 11 } },
  { id: "sf-2025",        name: "San Francisco", path: "/photos/trips/sf-2025",        date: { year: 2025, month: 9 } },
  { id: "austin-2025",    name: "Austin",        path: "/photos/trips/austin-2025",    date: { year: 2025, month: 5 } },
  { id: "japan-2025",     name: "Japan",    path: "/photos/trips/japan-2025",     date: { year: 2025, month: 4 } },
  { id: "loveland-2025",  name: "Loveland",      path: "/photos/trips/loveland-2025",  date: { year: 2025, month: 4 } },
];

const sortedTrips = [...trips].sort((a, b) => {
  if (b.date.year !== a.date.year) return b.date.year - a.date.year;
  return b.date.month - a.date.month;
});

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [tripsOpen, setTripsOpen] = useState(false);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openTrips = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
    setTripsOpen(true);
  };

  const closeTripsSoon = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setTripsOpen(false), 180);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-stone-100" : "bg-white/80 backdrop-blur-sm border-b border-stone-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Back to portfolio */}
        <motion.a
          href="/"
          whileHover={{ x: -3 }}
          className="flex items-center gap-2 text-stone-400 hover:text-[#0D0D0D] transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
            <path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-[var(--font-outfit)] text-sm tracking-wide">Portfolio</span>
        </motion.a>

        {/* Center logo */}
        <Link href="/photos" className="absolute left-1/2 -translate-x-1/2">
          <span className="font-[var(--font-cormorant)] text-xl font-light tracking-widest text-[#0D0D0D] uppercase">
            Film
          </span>
        </Link>

        {/* Trips dropdown */}
        <div
          className="relative"
          onMouseEnter={openTrips}
          onMouseLeave={closeTripsSoon}
        >
          <button
            onClick={() => setTripsOpen((o) => !o)}
            className="flex items-center gap-1.5 font-[var(--font-outfit)] text-sm text-stone-400 hover:text-[#0D0D0D] transition-colors">
            Trips
            <motion.svg
              animate={{ rotate: tripsOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-3 h-3"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </button>

          <AnimatePresence>
            {tripsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-3 w-52 bg-white border border-stone-100 rounded-xl shadow-xl overflow-hidden"
                onMouseEnter={openTrips}
                onMouseLeave={closeTripsSoon}
              >
                <Link
                  href="/photos/trips"
                  onClick={() => setTripsOpen(false)}
                  className="block px-5 py-3 font-[var(--font-outfit)] text-xs tracking-[0.15em] uppercase text-stone-400 hover:text-[#0D0D0D] hover:bg-stone-50 transition-colors border-b border-stone-100"
                >
                  All Trips
                </Link>
                {sortedTrips.map((trip) => (
                  <Link
                    key={trip.id}
                    href={trip.path}
                    onClick={() => setTripsOpen(false)}
                    className={`block px-5 py-3 font-[var(--font-outfit)] text-sm hover:bg-stone-50 transition-colors ${
                      pathname === trip.path ? "text-[#0D0D0D]" : "text-stone-500 hover:text-[#0D0D0D]"
                    }`}
                  >
                    {trip.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
