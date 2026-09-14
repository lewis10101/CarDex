import React, { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 950);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      id="cardex-splash-screen"
      onClick={onComplete}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#09090b] text-white cursor-pointer select-none overflow-hidden"
    >
      {/* Spacer */}
      <div className="h-10" />

      {/* Center Brand Mark */}
      <div className="flex flex-col items-center text-center px-6">
        <div className="w-20 h-20 mb-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl flex items-center justify-center p-4 transition-transform active:scale-95">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            {/* Hexagonal crest */}
            <polygon
              points="50,6 92,28 92,72 50,94 8,72 8,28"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeLinejoin="round"
              fill="#18181b"
            />
            {/* Speed dial arc */}
            <path
              d="M30 65 A 28 28 0 1 1 70 65"
              stroke="#e4e4e7"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="5 3"
            />
            {/* Needle */}
            <line
              x1="50"
              y1="50"
              x2="66"
              y2="34"
              stroke="#f59e0b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="50" cy="50" r="4.5" fill="#fafafa" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
          Car<span className="text-amber-400">Dex</span>
        </h1>
        <p className="mt-1.5 text-xs font-medium tracking-widest text-zinc-400 uppercase">
          Spot • Collect • Explore
        </p>
      </div>

      {/* Clean footer */}
      <div className="pb-8 text-[11px] text-zinc-600 font-medium tracking-wide">
        UK Automotive Field Guide
      </div>
    </div>
  );
}
