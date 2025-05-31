"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PhotoCard from "../../components/PhotoCard";
import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function TripPage() {
  const params = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPhotos() {
      try {
        setLoading(true);
        setError(null);
        const resolvedParams = await params;
        const response = await fetch(
          `/api/photos?tripId=${resolvedParams.tripId}`
        );
        if (!response.ok) {
          throw new Error("Failed to load photos");
        }
        const data = await response.json();
        setPhotos(data.photos);
      } catch (err) {
        console.error("Error loading photos:", err);
        setError("Failed to load photos. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadPhotos();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16">
          <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 py-8">
            <div className="flex justify-start mb-4">
              <div className="inline-flex items-center text-gray-900">
                <svg
                  className="w-5 h-5 transition-transform duration-200 translate-y-[1px]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="leading-none align-middle text-base ml-1">
                  ALL TRIPS
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-gray-100 rounded-lg" />
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
        <div className="pt-16">
          <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 py-8">
            <div className="text-gray-900 text-center">
              <h2 className="text-xl font-semibold mb-2">Error</h2>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16">
          <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 py-8">
            <div className="text-gray-900 text-center">
              <h2 className="text-xl font-semibold mb-2">No Photos Yet</h2>
              <p>Photos for this trip will be added soon.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 py-8">
          <div className="flex justify-start mb-4">
            <Link
              href="/photos/trips"
              className="inline-flex items-center gap-1 text-gray-900 hover:text-gray-700 transition-colors duration-200 group"
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
              <span className="leading-none align-middle text-base">
                ALL TRIPS
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            {photos.map((photo, index) => (
              <PhotoCard key={photo.id} photos={photos} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
