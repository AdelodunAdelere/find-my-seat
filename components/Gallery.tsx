"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "./Lightbox";

type Photo = { src: string; alt: string };

const ASPECT_RATIOS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]"];

// These photos are unusually tall/narrow and get cropped too aggressively
// at the default ratios above, so they get a taller container instead.
const ASPECT_OVERRIDES: Record<string, string> = {
  "/image2.jpeg": "aspect-[1/2]",
  "/image5.jpeg": "aspect-[3/5]",
};

export default function Gallery({ images }: { images: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  if (images.length === 0) return null;

  return (
    <section className="bg-ivory px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-[11px] tracking-[0.3em] text-gold-deep uppercase">
            Gallery
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Moments to Remember
          </h2>
        </motion.div>

        <div className="mt-14 columns-2 gap-4 sm:columns-3">
          {images.map((photo, index) => (
            <motion.button
              key={photo.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: reduceMotion ? 0 : (index % 3) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              className={`relative mb-4 block w-full overflow-hidden rounded-2xl ring-1 ring-royal/10 ${
                ASPECT_OVERRIDES[photo.src] ??
                ASPECT_RATIOS[index % ASPECT_RATIOS.length]
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="320px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        photos={images}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
