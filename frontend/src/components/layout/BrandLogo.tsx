interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <span
      className={`relative block h-16 w-28 shrink-0 overflow-hidden md:h-18 md:w-36 ${className}`}
    >
      <img
        src="/brand/jacigreen.png"
        alt="JACIGREEN"
        width="400"
        height="400"
        className="absolute -top-5 -left-2 size-32 max-w-none object-contain md:-top-11 md:-left-4 md:size-40"
      />
    </span>
  );
}
