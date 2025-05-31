"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";

const featuredTrips = [
  { id: "japan-2025", name: "JAPAN 2025", path: "/photos/trips/japan-2025" },
  {
    id: "loveland-feb-2025",
    name: "LOVELAND FEB 2025",
    path: "/photos/trips/loveland-feb-2025",
  },
  {
    id: "loveland-apr-2025",
    name: "LOVELAND APR 2025",
    path: "/photos/trips/loveland-apr-2025",
  },
];

export default function PhotosPage() {
  return (
    <div className="fixed inset-0 bg-white overflow-hidden">
      <Navbar />
      <div className="h-full flex flex-col items-center justify-center">
        <h1 className="text-[20vw] font-light tracking-tighter text-gray-900 leading-none flex">
          {"PHOTOS".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block"
              style={{
                animation: `float 2s ease-in-out ${index * 0.1}s infinite`,
                userSelect: "none",
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
        <div className="relative">
          <p
            className="mt-8 text-lg text-gray-600 max-w-md text-center"
            style={{ userSelect: "none" }}
          >
            Recently got my hands on a film camera.
            <br />
            Here&apos;s what I&apos;ve been capturing.
          </p>
          <div
            className="absolute -right-12 top-[80%] w-40 h-40"
            style={{ userSelect: "none" }}
          >
            <Image
              src="/images/hand-drawn-arrow.png"
              alt="Hand drawn arrow"
              width={160}
              height={160}
              className="w-full h-full object-contain"
              draggable="false"
            />
          </div>
        </div>
        <div className="mt-24">
          <Link
            href="/photos/trips"
            className="inline-block px-6 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-300"
          >
            View All
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
