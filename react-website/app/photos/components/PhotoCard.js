"use client";
import { useState } from "react";
import ImageModal from "./ImageModal";
import Image from "next/image";

export default function PhotoCard({
  photo,
  photos,
  index,
  blurb,
  onPhotoClick,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("PhotoCard Debug:", { photos, index, currentPhoto });
    setIsModalOpen(true);
  };

  // Handle both single photo and photos array cases
  const currentPhoto = photo || (photos && photos[index]);

  if (!currentPhoto) {
    return null;
  }

  return (
    <>
      <div
        className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col border-2 border-gray-200"
        onClick={handleClick}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-b-lg">
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.alt || "Photo"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
        <div className="p-4 flex-shrink-0">
          <time className="text-base font-medium text-gray-600">
            {new Date(currentPhoto.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {blurb && (
            <p className="mt-2 text-sm text-gray-700 line-clamp-2">{blurb}</p>
          )}
        </div>
      </div>
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        photos={photos}
        initialIndex={index}
      />
    </>
  );
}
