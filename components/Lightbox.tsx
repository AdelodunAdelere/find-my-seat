"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { ArrowIcon, CloseIcon } from "./icons";

type Photo = { src: string; alt: string };

export default function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        onNavigate(((index as number) + 1) % photos.length);
      }
      if (event.key === "ArrowLeft") {
        onNavigate((index as number) === 0 ? photos.length - 1 : (index as number) - 1);
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, index, photos.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-royal-deep/95 p-4 backdrop-blur-md sm:p-10"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute top-5 right-5 z-10 rounded-full border border-white/20 bg-white/10 p-2.5 text-ivory transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate(index === 0 ? photos.length - 1 : index - 1);
            }}
            aria-label="Previous photo"
            className="absolute left-3 z-10 rounded-full border border-white/20 bg-white/10 p-2.5 text-ivory transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:left-6"
          >
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </button>

          <motion.div
            key={photos[index].src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative h-[70vh] w-full max-w-3xl"
          >
            <Image
              src={photos[index].src}
              alt={photos[index].alt}
              fill
              sizes="768px"
              className="object-contain"
            />
          </motion.div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index + 1) % photos.length);
            }}
            aria-label="Next photo"
            className="absolute right-3 z-10 rounded-full border border-white/20 bg-white/10 p-2.5 text-ivory transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:right-6"
          >
            <ArrowIcon className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
