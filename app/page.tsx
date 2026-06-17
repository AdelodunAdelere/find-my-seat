import Hero from "@/components/Hero";
import Story from "@/components/Story";
import EventInfo from "@/components/EventInfo";
import Gallery from "@/components/Gallery";
import Countdown from "@/components/Countdown";
import Footer from "@/components/Footer";
import { getGalleryImages, getHeroPhotos } from "@/lib/photos";

export default function Home() {
  const photos = getHeroPhotos();
  const gallery = getGalleryImages();

  return (
    <div className="flex flex-1 flex-col">
      <Hero photos={photos} />
      <Story />
      <EventInfo />
      <Gallery images={gallery} />
      <Countdown />
      <Footer />
    </div>
  );
}
