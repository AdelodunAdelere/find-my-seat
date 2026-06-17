"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HeroPhotos } from "@/lib/photos";
import { EVENT } from "@/lib/event";
import PhotoCarousel from "./PhotoCarousel";
import SeatSearch from "./SeatSearch";

function splitName(fullName: string) {
  const parts = fullName.trim().split(" ");
  return {
    given: parts.slice(0, -1).join(" "),
    surname: parts[parts.length - 1],
  };
}

function portraitPhotos(photos: HeroPhotos) {
  if (photos.mode === "slideshow") return photos.images;
  if (photos.mode === "couple") {
    return [
      {
        src: photos.couple,
        alt: `${EVENT.celebrant} and ${EVENT.husband} together`,
      },
    ];
  }
  if (photos.mode === "portraits") {
    return [
      { src: photos.celebrant, alt: EVENT.celebrant },
      { src: photos.husband, alt: EVENT.husband },
    ];
  }
  return null;
}

function PortraitFrame({
  images,
}: {
  images: { src: string; alt: string }[] | null;
}) {
  if (!images) {
    const celebrantInitial = EVENT.celebrantFirstName[0].toUpperCase();
    const husbandInitial = EVENT.husband.split(" ")[0][0].toUpperCase();
    return (
      <div className="relative mx-auto h-64 w-52 sm:h-80 sm:w-64">
        <div
          aria-hidden
          className="absolute -inset-5 rounded-full bg-gold/20 blur-2xl"
        />
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 rounded-t-full rounded-b-3xl bg-gold/5 ring-1 ring-gold shadow-[0_20px_45px_-15px_rgba(184,144,43,0.35)]">
          <span className="font-display text-4xl italic text-gold-deep">
            {celebrantInitial}
            <span className="px-1 not-italic text-gold/50">&amp;</span>
            {husbandInitial}
          </span>
          <span aria-hidden className="h-px w-10 bg-gold/40" />
          <span className="text-xs font-semibold tracking-[0.3em] text-gold-deep/80">
            60 · 25
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-64 w-52 sm:h-80 sm:w-64">
      <div
        aria-hidden
        className="absolute -inset-5 rounded-full bg-gold/20 blur-2xl"
      />
      <div className="relative h-full w-full overflow-hidden rounded-t-full rounded-b-3xl ring-1 ring-gold shadow-[0_20px_45px_-15px_rgba(184,144,43,0.35)]">
        <PhotoCarousel photos={images} />
      </div>
    </div>
  );
}

export default function Hero({ photos }: { photos: HeroPhotos }) {
  const reduceMotion = useReducedMotion();
  const images = portraitPhotos(photos);
  const celebrant = splitName(EVENT.celebrant);
  const husband = splitName(EVENT.husband);
  const sharedSurname =
    celebrant.surname === husband.surname ? celebrant.surname : null;

  return (
    <section className="bg-grain relative overflow-hidden bg-royal px-4 py-14 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_12%,_rgba(212,175,55,0.18),_transparent_58%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,_rgba(212,175,55,0.1),_transparent_55%)]"
      />

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-md rounded-[1.75rem] border border-gold/60 bg-paper px-6 py-12 text-center shadow-[0_30px_70px_-20px_rgba(0,0,0,0.45)] sm:px-10 sm:py-14"
      >
        <p className="text-xs font-semibold tracking-[0.3em] text-gold-deep uppercase">
          You&apos;re warmly invited
        </p>

        <div className="mt-8">
          <PortraitFrame images={images} />
        </div>

        <h1 className="mt-8 font-display text-[1.85rem] leading-[1.1] text-royal sm:text-4xl">
          {sharedSurname ? (
            <>
              <span className="block">
                {celebrant.given}{" "}
                <span className="italic text-gold">&amp;</span>{" "}
                {husband.given}
              </span>
              <span className="block">{sharedSurname}</span>
            </>
          ) : (
            <>
              <span className="block">{EVENT.celebrant}</span>
              <span className="block italic text-gold">&amp;</span>
              <span className="block">{EVENT.husband}</span>
            </>
          )}
        </h1>

        <p className="mt-4 font-display text-lg text-gold-deep sm:text-xl">
          {EVENT.celebrantFirstName}&apos;s 60th Birthday
          <span className="px-2 text-gold/50">·</span>
          25 Years of Marriage
        </p>

        <div aria-hidden className="mt-7 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gold/40" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-12 bg-gold/40" />
        </div>

        <div className="mt-6 flex flex-col items-center gap-1.5">
          <p className="text-sm font-semibold tracking-[0.25em] text-royal uppercase">
            {EVENT.dateNumeric}
          </p>
          <p className="text-xs font-medium tracking-[0.3em] text-royal/60 uppercase">
            {EVENT.venue}
          </p>
        </div>

        <div className="mt-9 border-t border-gold/20 pt-8">
          <SeatSearch />
        </div>
      </motion.div>
    </section>
  );
}
