'use client';

export function TravelingCat() {
  return (
    <>
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className="cat-animation-container">
          <svg
            viewBox="0 0 42 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-28 h-auto text-primary opacity-20"
          >
            <path
              d="M40.5 72.5C40.5 44.5 15.5 52.5 1.5 56C19.5 35.5 30.5 20.5 35.5 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="cat-stroke"
            />
          </svg>
        </div>
      </div>
      <style jsx>{`
        .cat-animation-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          animation: move-around 30s linear infinite;
        }

        .cat-stroke {
          stroke-dasharray: 150;
          stroke-dashoffset: 150;
          animation: draw-line 5s ease-in-out infinite;
          filter: drop-shadow(0 0 4px currentColor);
        }

        @keyframes draw-line {
          0% {
            stroke-dashoffset: 150;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -150;
          }
        }

        @keyframes move-around {
          0% {
            transform: translate(-20vw, 10vh) rotate(-20deg);
          }
          25% {
            transform: translate(100vw, 30vh) rotate(20deg);
          }
          50% {
            transform: translate(50vw, 100vh) rotate(0deg);
          }
          75% {
            transform: translate(-10vw, 60vh) rotate(-30deg);
          }
          100% {
            transform: translate(-20vw, 10vh) rotate(-20deg);
          }
        }
      `}</style>
    </>
  );
}
