interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <div
      className={`flex h-16 w-auto items-center overflow-hidden md:h-18 ${className}`}
    >
      <img
        src="/brand/jacigreen-logo.png"
        alt="JACIGREEN"
        className="h-full w-auto object-contain object-left"
      />
    </div>
  );
}