"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

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

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/photos";
  const isTrips = pathname.startsWith("/photos/trips");
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTripsClick = (e) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      setIsHovered(!isHovered);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="text-gray-900 hover:text-gray-700 transition-colors duration-200 flex items-center gap-1 group"
            >
              <svg
                className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1 translate-y-[1px]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="leading-none align-middle">PORTFOLIO</span>
            </a>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 z-50">
            <Link
              href="/photos"
              className="block group w-8 h-8"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="w-8 h-8 text-gray-900 hover:text-gray-700 transition-colors duration-200 transform transition-transform duration-200 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 10a2 2 0 100-4 2 2 0 000 4z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 15l-5-5L8 17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div className="flex items-center">
            <div
              className="relative"
              onMouseEnter={() => !isMobile && setIsHovered(true)}
              onMouseLeave={() => !isMobile && setIsHovered(false)}
            >
              <button
                onClick={handleTripsClick}
                className="text-gray-900 hover:text-gray-700 transition-colors duration-200 pl-4 uppercase tracking-wider flex items-center gap-1 group"
              >
                Trips
                <svg
                  className={`w-4 h-4 transform transition-transform duration-200 ${
                    isHovered ? "rotate-180" : ""
                  } group-hover:translate-y-0.5`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                className={`absolute top-full right-0 w-64 bg-white/90 backdrop-blur-sm shadow-lg rounded-md mt-2 py-2 transition-all duration-200 ease-in-out transform origin-top ${
                  isHovered
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  href="/photos/trips"
                  className="block px-6 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors border-b border-gray-200 uppercase tracking-wider"
                  onClick={() => isMobile && setIsHovered(false)}
                >
                  All Trips
                </Link>
                {sortedTrips.map((trip) => (
                  <Link
                    key={trip.id}
                    href={trip.path}
                    className="block px-6 py-2 text-sm text-gray-900 hover:bg-gray-100 transition-colors"
                    onClick={() => isMobile && setIsHovered(false)}
                  >
                    {trip.name}
                  </Link>
                ))}
              </div>
              {/* Invisible padding to create a hover buffer zone */}
              <div className="absolute -bottom-2 left-0 right-0 h-2" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
