"use client";

export function CatEars() {
  return (
    <>
      <style>
        {`
          .cat-ear-path {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: cat-ear-draw 1s ease-out forwards 0.5s;
          }

          @keyframes cat-ear-draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path className="cat-ear-path" d="M -5 -10 L 20 -40 L 45 -10" />
        <path
          className="cat-ear-path"
          style={{ animationDelay: "0.7s" }}
          d="M 55 -10 L 80 -40 L 105 -10"
        />
      </svg>
    </>
  );
}
