import React, { useState, useEffect } from 'react';
import { hasCompletedOnboarding, ensureLocalProfile } from '../../services/authSyncService';

interface LoadingScreenProps {
  onComplete: (destination: 'onboarding' | 'home') => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [statusText, setStatusText] = useState('Loading your collection...');
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStatusText('Updating car index...');
      setProgress(60);
    }, 400);

    const t2 = setTimeout(() => {
      setStatusText('Syncing local garage...');
      setProgress(90);
    }, 750);

    const t3 = setTimeout(() => {
      setProgress(100);
      ensureLocalProfile();
      const onboarded = hasCompletedOnboarding();

      if (onboarded) {
        onComplete('home');
      } else {
        onComplete('onboarding');
      }
    }, 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      id="cardex-loading-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#09090b] text-white p-6 select-none overflow-hidden"
    >
      <div className="h-6" />

      {/* Center Logo & Progress */}
      <div className="flex flex-col items-center max-w-xs w-full text-center px-4">
        <div className="w-16 h-16 mb-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center p-3.5 shadow-lg">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            <polygon
              points="50,6 92,28 92,72 50,94 8,72 8,28"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeLinejoin="round"
              fill="#18181b"
            />
            <path
              d="M30 65 A 28 28 0 1 1 70 65"
              stroke="#e4e4e7"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="5 3"
            />
            <circle cx="50" cy="50" r="4.5" fill="#fafafa" />
          </svg>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-white mb-1">
          Car<span className="text-amber-400">Dex</span>
        </h2>

        <p className="text-xs text-zinc-400 mb-6 transition-all duration-200">
          {statusText}
        </p>

        {/* Minimalist Progress Track */}
        <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="pb-6 text-[11px] text-zinc-600 font-medium">
        UK Automotive Field Guide
      </div>
    </div>
  );
}
