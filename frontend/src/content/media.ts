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

/** Emplacements visuels éditoriaux. Les sources restent vides jusqu'à réception d'images validées. */
export const MEDIA: MediaRegistry = {
  homeHero: {
    page: "/",
    alt: "",
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
