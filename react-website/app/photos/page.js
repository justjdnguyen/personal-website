"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const R2 = process.env.NEXT_PUBLIC_R2_URL;

const trips = [
  { id: "sydney-2025",       name: "Sydney",   sub: "Nov 2025", path: "/photos/trips/sydney-2025",       cover: `${R2}/trips/sydney-2025/thumbs/0388383_0388383-R1-005-1.webp` },
  { id: "melbourne-2025",    name: "Melbourne",sub: "Nov 2025", path: "/photos/trips/melbourne-2025",    cover: `${R2}/trips/melbourne-2025/thumbs/0388383_0388383-R2-056-26A.webp` },
  { id: "sf-2025",           name: "San Francisco",  sub: "Sep 2025", path: "/photos/trips/sf-2025",     cover: `${R2}/trips/sf-2025/thumbs/0388383_0388383-R2-042-19A.webp` },
  { id: "austin-2025",       name: "Austin",   sub: "May 2025", path: "/photos/trips/austin-2025",       cover: `${R2}/trips/austin-2025/thumbs/0388383_0388383-R2-004-0A.webp` },
  { id: "japan-2025",        name: "Japan",    sub: "Apr 2025", path: "/photos/trips/japan-2025",        cover: `${R2}/trips/japan-2025/thumbs/1-0704401-R2-032-14A.webp` },
  { id: "loveland-2025",     name: "Loveland", sub: "Feb–Apr 2025", path: "/photos/trips/loveland-2025", cover: `${R2}/trips/loveland-apr-2025/thumbs/1-0704401-R5-071-34.webp` },
];

export default function PhotosPage() {
  const scrollRef = useRef(null);

  const hoverDirRef = useRef(0);
  const rafRef = useRef(null);
  const lastTRef = useRef(0);
  const vRef = useRef(0); // current velocity (px/s)
  
  const MAX_V = 650;   // top speed (px/s) — lower = slower
  const ACCEL = 2600;  // acceleration (px/s^2) — lower = softer ramp
  
  const step = (t) => {
    const el = scrollRef.current;
    const dir = hoverDirRef.current;
    if (!el || dir === 0) return;
  
    const lastT = lastTRef.current || t;
    const dt = Math.min(0.032, (t - lastT) / 1000); // clamp to avoid jumps
    lastTRef.current = t;
  
    // ramp velocity toward target
    const targetV = dir * MAX_V;
    const dv = Math.sign(targetV - vRef.current) * ACCEL * dt;
    if (Math.abs(targetV - vRef.current) <= Math.abs(dv)) vRef.current = targetV;
    else vRef.current += dv;
  
    // stop at ends
    if (dir < 0 && el.scrollLeft <= 0) return;
    if (dir > 0 && el.scrollLeft + el.clientWidth >= el.scrollWidth) return;
  
    el.scrollBy({ left: vRef.current * dt, behavior: "auto" });
    rafRef.current = requestAnimationFrame(step);
  };
  
  const startHoverScroll = (dir) => {
    hoverDirRef.current = dir;
    if (rafRef.current == null) {
      lastTRef.current = 0;
      rafRef.current = requestAnimationFrame(step);
    }
  };
  
  const stopHoverScroll = () => {
    hoverDirRef.current = 0;
    vRef.current = 0;
    lastTRef.current = 0;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };
  useEffect(() => () => stopHoverScroll(), []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-[var(--font-outfit)] text-xs tracking-[0.22em] uppercase text-stone-400 mb-5">
            Film Photography
          </p>
          <h1 className="font-[var(--font-cormorant)] font-light text-[clamp(3.5rem,10vw,7rem)] leading-[0.9] tracking-tight text-[#0D0D0D] mb-6">
            Captured<br />
            <span className="font-semibold italic">on film.</span>
          </h1>
          <p className="font-[var(--font-outfit)] text-stone-500 text-lg max-w-md mb-10">
            Recently got my hands on a film camera. Here&apos;s what I&apos;ve been capturing.
          </p>
          <motion.div whileHover={{ x: 4 }} className="inline-block">
            <Link
              href="/photos/trips"
              className="inline-flex items-center gap-2 font-[var(--font-outfit)] text-sm text-[#0D0D0D] border-b border-[#0D0D0D] pb-0.5"
            >
              View all trips
              <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Carousel */}
      <section className="relative pb-28">
                {/* Hover zones (desktop) */}
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-16 z-20"
             onMouseEnter={() => startHoverScroll(-1)}
             onMouseLeave={stopHoverScroll}
        />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-16 z-20"
             onMouseEnter={() => startHoverScroll(1)}
             onMouseLeave={stopHoverScroll}
        />
        {/* Fade-off gradient on the right */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-40 z-10 bg-gradient-to-l from-white to-transparent" />

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pl-6 md:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pr-16 md:pr-40 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {trips.map((trip, i) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 w-60 md:w-72"
            >
              <Link href={trip.path} className="group block">
                <div className="relative h-96 overflow-hidden rounded-2xl bg-stone-100 mb-4">
                  <Image
                    src={trip.cover}
                    alt={trip.name}
                    fill
                    className="object-cover transition-[transform,filter] duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    sizes="288px"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-[var(--font-cormorant)] text-xl font-semibold text-[#0D0D0D]">{trip.name}</span>
                  <span className="font-[var(--font-outfit)] text-xs text-stone-400">{trip.sub}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
