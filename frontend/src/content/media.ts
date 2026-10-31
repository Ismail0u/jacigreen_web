import type { MediaAspect, MediaIcon } from "~/components/ui/MediaFrame";

export interface MediaPlacement {
  page: string;
  src?: string;
  alt: string;
  aspect: MediaAspect;
  icon: MediaIcon;
}

interface MediaRegistry {
  homeHero: MediaPlacement;
  aboutStory: MediaPlacement;
}

/** Emplacements visuels éditoriaux, distincts des médias fournis par les catalogues API. */
export const MEDIA: MediaRegistry = {
  homeHero: {
    page: "/",
    src: "/images/jacigreen-biofertilisant-niger.webp",
    alt: "Un biofertilisant est recueilli dans un bassin sur un site maraîcher au Niger.",
    aspect: "4/3",
    icon: "eco",
  },
  aboutStory: {
    page: "/a-propos",
    alt: "",
    aspect: "4/3",
    icon: "water_drop",
  },
};
