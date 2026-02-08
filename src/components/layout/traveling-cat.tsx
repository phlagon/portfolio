'use client';

export function TravelingCat() {
  return (
    <>
      <div className="fixed inset-0 -z-1 overflow-hidden pointer-events-none">
        <div className="cat-animation-container" style={{ animationName: 'move-around-1', animationDuration: '30s' }}>
          <svg viewBox="0 0 42 74" fill="none" className="w-28 h-auto text-primary opacity-30">
            <path d="M40.5 72.5C40.5 44.5 15.5 52.5 1.5 56C19.5 35.5 30.5 20.5 35.5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="cat-stroke" style={{ animationDuration: '8s' }} />
          </svg>
        </div>
        <div className="cat-animation-container" style={{ animationName: 'move-around-2', animationDuration: '40s' }}>
          <svg viewBox="0 0 80 80" fill="none" className="w-40 h-auto text-primary opacity-20">
            <path d="M 10 80 C 20 20, 70 20, 70 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="cat-stroke" style={{ animationDuration: '10s', animationDelay: '2s' }} />
          </svg>
        </div>
        <div className="cat-animation-container" style={{ animationName: 'move-around-3', animationDuration: '35s' }}>
          <svg viewBox="0 0 50 100" fill="none" className="w-20 h-auto text-primary opacity-25">
            <path d="M25,0 C-15,30 65,70 25,100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="cat-stroke" style={{ animationDuration: '9s', animationDelay: '4s' }} />
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
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .cat-stroke {
          stroke-dasharray: 150 50;
          stroke-dashoffset: 200;
          animation-name: snake;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          filter: drop-shadow(0 0 4px currentColor);
        }

        @keyframes snake {
          to {
            stroke-dashoffset: -200;
          }
        }

        @keyframes move-around-1 {
          0% { transform: translate(-20vw, 10vh) rotate(-20deg); }
          25% { transform: translate(120vw, 30vh) rotate(20deg); }
          50% { transform: translate(50vw, 120vh) rotate(0deg); }
          75% { transform: translate(-20vw, 60vh) rotate(-30deg); }
          100% { transform: translate(-20vw, 10vh) rotate(-20deg); }
        }
        @keyframes move-around-2 {
          0% { transform: translate(120vw, 80vh) rotate(10deg); }
          50% { transform: translate(-20vw, 20vh) rotate(-10deg); }
          100% { transform: translate(120vw, 80vh) rotate(10deg); }
        }
        @keyframes move-around-3 {
          0% { transform: translate(40vw, -20vh) rotate(0deg); }
          50% { transform: translate(60vw, 120vh) rotate(180deg); }
          100% { transform: translate(40vw, -20vh) rotate(360deg); }
        }
      `}</style>
    </>
  );
}
