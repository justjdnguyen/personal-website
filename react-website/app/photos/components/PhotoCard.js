"use client";
import { useState } from "react";
import ImageModal from "./ImageModal";
import Image from "next/image";

export default function PhotoCard({ photo, photos, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentPhoto = photo || (photos && photos[index]);
  if (!currentPhoto) return null;

  const aspectRatio =
    currentPhoto.width && currentPhoto.height
      ? currentPhoto.width / currentPhoto.height
      : null;

  return (
    <>
      <div
        className="group relative overflow-hidden rounded-xl bg-stone-100 cursor-pointer"
        style={aspectRatio ? { aspectRatio } : {}}
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={currentPhoto.thumb || currentPhoto.src}
          alt={currentPhoto.alt || "Photo"}
          fill
          loading="lazy"
          placeholder={currentPhoto.lqip ? "blur" : "empty"}
          blurDataURL={currentPhoto.lqip ?? undefined}
          className="object-cover transition-[transform,filter] duration-500 group-hover:scale-[1.03] grayscale group-hover:grayscale-0"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
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
