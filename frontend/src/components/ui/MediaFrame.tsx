import type { CSSProperties } from "react";

export type MediaAspect = "16/9" | "4/3" | "3/2" | "1/1";
export type MediaIcon = "eco" | "water_drop" | "solar_power" | "agriculture";

const DIMENSIONS: Record<MediaAspect, { width: number; height: number }> = {
  "16/9": { width: 1600, height: 900 },
  "4/3": { width: 1200, height: 900 },
  "3/2": { width: 1200, height: 800 },
  "1/1": { width: 900, height: 900 },
};

interface MediaFrameProps {
  src?: string | null;
  alt: string;
  aspect: MediaAspect;
  icon?: MediaIcon;
  priority?: boolean;
  className?: string;
}

export function MediaFrame({
  src,
  alt,
  aspect,
  icon = "eco",
  priority = false,
  className = "",
}: MediaFrameProps) {
  const style: CSSProperties = { aspectRatio: aspect.replace("/", " / ") };

  return (
    <div
      className={`relative w-full overflow-hidden border border-outline-variant bg-surface-container-high ${className}`}
      style={style}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          width={DIMENSIONS[aspect].width}
          height={DIMENSIONS[aspect].height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          data-placeholder=""
          className="flex size-full items-center justify-center bg-surface-container-high"
        >
          <span className="material-symbols-outlined text-4xl text-on-surface-variant/35">
            {icon}
          </span>
        </div>
      )}
    </div>
  );
}
