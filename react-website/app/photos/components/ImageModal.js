"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageModal({ isOpen, onClose, photos, initialIndex }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) setCurrentIndex((i) => i + 1);
  }, [currentIndex, photos.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  useEffect(() => { setCurrentIndex(initialIndex); }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const preventScroll = (e) => e.preventDefault();
    document.addEventListener("wheel", preventScroll, { passive: false });
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("wheel", preventScroll);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) { setCurrentIndex(initialIndex); return; }
    const onKey = (e) => {
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleNext, handlePrev, onClose, initialIndex]);

  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (d > minSwipeDistance) handleNext();
    if (d < -minSwipeDistance) handlePrev();
  };

  if (!isOpen || !photos?.length) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
        style={{ touchAction: "none" }}
        onClick={onClose}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Counter */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 font-[var(--font-outfit)] text-xs text-white/40 tracking-widest">
          {currentIndex + 1} / {photos.length}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          <svg viewBox="0 0 14 14" fill="none" className="w-4 h-4">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Prev */}
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className={`absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 hidden md:flex items-center justify-center text-white/40 hover:text-white transition-all duration-200 ${
            currentIndex === 0 ? "opacity-0 pointer-events-none" : ""
          }`}
        >
          <svg viewBox="0 0 14 14" fill="none" className="w-5 h-5">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center px-16"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={photos[currentIndex].src}
            alt={photos[currentIndex].alt || "Photo"}
            width={1200}
            height={900}
            className="max-h-[85vh] w-auto object-contain rounded-lg"
            priority
          />
        </motion.div>

        {/* Next */}
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className={`absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 hidden md:flex items-center justify-center text-white/40 hover:text-white transition-all duration-200 ${
            currentIndex === photos.length - 1 ? "opacity-0 pointer-events-none" : ""
          }`}
        >
          <svg viewBox="0 0 14 14" fill="none" className="w-5 h-5">
            <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Mobile nav */}
        <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className={`p-3 rounded-full bg-white/10 text-white transition-all ${currentIndex === 0 ? "opacity-0 pointer-events-none" : ""}`}
          >
            <svg viewBox="0 0 14 14" fill="none" className="w-4 h-4">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className={`p-3 rounded-full bg-white/10 text-white transition-all ${currentIndex === photos.length - 1 ? "opacity-0 pointer-events-none" : ""}`}
          >
            <svg viewBox="0 0 14 14" fill="none" className="w-4 h-4">
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
