import { useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "/images/jacigreen-biofertilisant-niger.webp",
    alt: "Installation de valorisation des déchets organiques",
    label: "Énergie durable",
  },
  {
    src: "/images/jacigreen-equipe-biodigesteur.webp",
    alt: "Une équipe pose devant un biodigesteur JACIBIOGAZ.",
    label: "Innovation technologique",
  },
  {
    src: "/images/jacigreen-pesee-recolte.webp",
    alt: "Une productrice pèse une récolte de tomates sur un site maraîcher.",
    label: "Agriculture durable",
  },
] as const;

const AUTOPLAY_DELAY = 6500;

export function MobileHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const pauseButtonRef = useRef<HTMLButtonElement>(null);
  const activeSlide = slides[activeIndex] ?? slides[0];

  const goTo = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReducedMotion(preference.matches);
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);

    return () => {
      preference.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (isPaused || isHovering || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(timer);
    };
  }, [isHovering, isPaused, prefersReducedMotion]);

  return (
    <div
      className="absolute inset-0 isolate overflow-hidden bg-primary-container text-on-primary"
      role="region"
      aria-roledescription="carrousel"
      aria-label="Présentation de JACIGREEN"
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      onFocusCapture={(event) => {
        if (event.nativeEvent.target !== pauseButtonRef.current) setIsPaused(true);
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <img
            src={slide.src}
            alt=""
            className="h-full w-full object-cover"
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      ))}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-primary-container/95 via-primary-container/70 to-primary-container/30"
      />

      <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-start gap-space-sm px-margin-mobile py-space-md sm:flex-row sm:items-center sm:justify-between sm:gap-space-md sm:px-margin">
        <div className="flex items-center gap-space-sm">
          <span className="h-px w-8 bg-ochre-text" />
          <p
            aria-live={isPaused ? "polite" : "off"}
            className="font-label-md text-label-md font-semibold tracking-label uppercase"
          >
            JACIGREEN — {activeSlide.label}
          </p>
        </div>

        <div className="flex items-center gap-space-md">
          <div
            className="flex items-center gap-space-sm"
            role="group"
            aria-label="Navigation des images"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => {
                  goTo(index);
                }}
                aria-label={`Afficher l’image ${index + 1} : ${slide.label}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-10 bg-on-primary"
                    : "w-5 bg-on-primary/45 hover:bg-on-primary/75"
                }`}
              />
            ))}
          </div>

          {!prefersReducedMotion ? (
            <button
              ref={pauseButtonRef}
              type="button"
              onClick={() => {
                setIsPaused((paused) => !paused);
              }}
              className="font-label-sm text-label-sm min-h-11 border border-on-primary/50 px-space-md text-on-primary transition-colors hover:bg-on-primary/15"
              aria-label={isPaused ? "Reprendre le carrousel" : "Mettre le carrousel en pause"}
            >
              {isPaused ? "Reprendre" : "Pause"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
