import fs from "fs";
import path from "path";
import { EVENT } from "@/lib/event";

const EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const SLIDESHOW_PATTERN = /^image(\d+)\.(jpg|jpeg|png|webp)$/i;

function findPublicFile(basename: string): string | null {
  for (const ext of EXTENSIONS) {
    const filename = `${basename}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", filename))) {
      return `/${filename}`;
    }
  }
  return null;
}

function findSlideshowImages(): string[] {
  const publicDir = path.join(process.cwd(), "public");
  return fs
    .readdirSync(publicDir)
    .filter((file) => SLIDESHOW_PATTERN.test(file))
    .sort(
      (a, b) =>
        Number(a.match(SLIDESHOW_PATTERN)?.[1]) -
        Number(b.match(SLIDESHOW_PATTERN)?.[1])
    )
    .map((file) => `/${file}`);
}

export type HeroPhotos =
  | { mode: "slideshow"; images: { src: string; alt: string }[] }
  | { mode: "couple"; couple: string }
  | { mode: "portraits"; celebrant: string; husband: string }
  | { mode: "none" };

export function getHeroPhotos(): HeroPhotos {
  const slideshow = findSlideshowImages();
  if (slideshow.length > 0) {
    return {
      mode: "slideshow",
      images: slideshow.map((src) => ({
        src,
        alt: `${EVENT.celebrantName} `,
      })),
    };
  }

  const couple = findPublicFile("couple");
  if (couple) {
    return { mode: "couple", couple };
  }

  const celebrant = findPublicFile("celebrant");
  const husband = findPublicFile("husband");
  if (celebrant && husband) {
    return { mode: "portraits", celebrant, husband };
  }

  return { mode: "none" };
}

export function getGalleryImages(): { src: string; alt: string }[] {
  return findSlideshowImages().map((src, index) => ({
    src,
    alt: `${EVENT.celebrantName} — photo ${index + 1}`,
  }));
}
