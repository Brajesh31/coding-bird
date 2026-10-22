import type React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

/**
 * Coding Bird Logo:
 * A modern, geometric developer mark combining code angle brackets with an aerodynamic bird in flight.
 */
export function CodingBirdIcon({ size = 24, className = "", ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="birdGrad" x1="2" y1="4" x2="30" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c084fc" />
          <stop offset="0.5" stopColor="#a855f7" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      {/* Left wing bracket < */}
      <path
        d="M12 7L4 15L12 23"
        stroke="url(#birdGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Flight beak & body */}
      <path
        d="M12 15L20 8L28 15L20 18L12 15Z"
        fill="url(#birdGrad)"
        fillOpacity="0.85"
      />
      {/* Right tail / closure bracket > */}
      <path
        d="M20 25L28 17"
        stroke="url(#birdGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CodingBirdLogo({
  size = 28,
  className = "",
  showText = true,
  textClassName = "text-lg font-bold tracking-tight text-foreground",
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-1.5 shadow-sm backdrop-blur transition-transform duration-300 hover:scale-105">
        <CodingBirdIcon size={size} />
      </div>
      {showText && <span className={textClassName}>Coding Bird</span>}
    </div>
  );
}
