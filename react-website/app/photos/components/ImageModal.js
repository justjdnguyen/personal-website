"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

const ANIMATION_DURATION = 500; // Duration in milliseconds

export default function ImageModal({
  isOpen,
  onClose,
  photos,
  initialIndex,
  originX,
  originY,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const imageRef = useRef(null);
  const modalRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const handleNext = useCallback(() => {
    if (!photos?.length || currentIndex >= photos.length - 1) return;
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, [photos, currentIndex]);

  const handlePrev = useCallback(() => {
    if (!photos?.length || currentIndex <= 0) return;
    setCurrentIndex((prevIndex) => prevIndex - 1);
  }, [photos, currentIndex]);

  useEffect(() => {
    setCurrentIndex(initialIndex || 0);
  }, [initialIndex]);

  // Set animation state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the modal is mounted before animation starts
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
      // Prevent scrolling on the body
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
      // Restore scrolling
      document.body.style.overflow = "";
    }

    return () => {
      // Cleanup: restore scrolling when component unmounts
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset currentIndex when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < photos.length - 1) {
      handleNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      handlePrev();
    }
  };

  if (!isOpen || !photos?.length) return null;

  console.log("Modal Debug:", {
    photos,
    currentIndex,
    currentPhoto: photos[currentIndex],
  });

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 overflow-hidden"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex items-center justify-center gap-4">
            {/* Desktop Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className={`hidden md:block text-white hover:text-gray-300 transition-all duration-300 group ${
                currentIndex === 0
                  ? "pointer-events-none opacity-0"
                  : "opacity-100"
              }`}
            >
              <div className="p-2 rounded-full border-2 border-transparent group-hover:border-white/30 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
            </button>

            <div
              ref={imageRef}
              className="relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[currentIndex].src}
                alt={photos[currentIndex].alt || "Photo"}
                width={1200}
                height={800}
                className="max-h-[80vh] w-auto object-contain rounded-lg"
                priority
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className={`hidden md:block text-white hover:text-gray-300 transition-all duration-300 group ${
                currentIndex === photos.length - 1
                  ? "pointer-events-none opacity-0"
                  : "opacity-100"
              }`}
            >
              <div className="p-2 rounded-full border-2 border-transparent group-hover:border-white/30 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="md:hidden flex justify-center items-center gap-2 mt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className={`p-3 bg-black bg-opacity-50 rounded-full text-white hover:text-gray-200 transition-all duration-300 ${
                currentIndex === 0
                  ? "pointer-events-none opacity-0"
                  : "opacity-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className={`p-3 bg-black bg-opacity-50 rounded-full text-white hover:text-gray-200 transition-all duration-300 ${
                currentIndex === photos.length - 1
                  ? "pointer-events-none opacity-0"
                  : "opacity-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
