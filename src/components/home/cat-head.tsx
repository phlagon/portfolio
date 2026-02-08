"use client";

export function CatHead() {
  return (
    <>
      <style>
        {`
          .cat-head-path {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: cat-head-draw 1s ease-out forwards 1.5s;
          }

          @keyframes cat-head-draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
      <svg
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[120%] h-auto overflow-visible"
        viewBox="0 0 100 50"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Head */}
        <path className="cat-head-path" d="M25,50 C25,25 75,25 75,50" />
        {/* Left Ear */}
        <path className="cat-head-path" style={{ animationDelay: "2s" }} d="M25,25 L40,10 L50,25" />
        {/* Right Ear */}
        <path className="cat-head-path" style={{ animationDelay: "2.2s" }} d="M75,25 L60,10 L50,25" />
      </svg>
    </>
  );
}
