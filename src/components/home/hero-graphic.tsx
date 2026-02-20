'use client';

export function HeroGraphic() {
  return (
    <>
      <style>
        {`
          .graphic-path {
            stroke-dasharray: 500;
            stroke-dashoffset: 500;
            animation: draw-in-out 6s ease-in-out infinite;
          }
          .graphic-glow {
            filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.4));
          }
          @keyframes draw-in-out {
            0% {
              stroke-dashoffset: 500;
            }
            50% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 500;
            }
          }
        `}
      </style>
      <svg
        className="w-full h-full overflow-visible graphic-glow"
        viewBox="0 0 200 200"
        fill="none"
        stroke="#FFD700"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Outer square */}
        <path className="graphic-path" style={{ animationDelay: "0s" }} d="M 20 20 L 180 20 L 180 180 L 20 180 Z" />

        {/* Inner diamond */}
        <path className="graphic-path" style={{ animationDelay: "0.5s" }} d="M 100 40 L 160 100 L 100 160 L 40 100 Z" />

        {/* Connecting lines */}
        <path className="graphic-path" style={{ animationDelay: "1s" }} d="M 20 20 L 100 40" />
        <path className="graphic-path" style={{ animationDelay: "1.2s" }} d="M 180 20 L 160 100" />
        <path className="graphic-path" style={{ animationDelay: "1.4s" }} d="M 180 180 L 100 160" />
        <path className="graphic-path" style={{ animationDelay: "1.6s" }} d="M 20 180 L 40 100" />
        
        {/* Central decorative element */}
        <circle className="graphic-path" style={{ animationDelay: "2s" }} cx="100" cy="100" r="12" stroke="#FFD700" strokeWidth="1" />
        <path className="graphic-path" style={{ animationDelay: "2.2s" }} d="M 100 80 L 100 120" stroke="#FFD700" />
        <path className="graphic-path" style={{ animationDelay: "2.4s" }} d="M 80 100 L 120 100" stroke="#FFD700" />
      </svg>
    </>
  );
}
