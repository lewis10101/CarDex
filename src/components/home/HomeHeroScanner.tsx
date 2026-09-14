import React from 'react';
import { Camera, Sparkles, Crosshair, ArrowRight } from 'lucide-react';
import { AppTab } from '../../types';

interface HomeHeroScannerProps {
  onNavigate?: (tab: AppTab) => void;
}

export function HomeHeroScanner({ onNavigate }: HomeHeroScannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 text-white border border-zinc-800 shadow-xl">
      {/* Subtle grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Viewfinder crosshairs decoration */}
      <div className="absolute top-3 left-3 text-zinc-600 pointer-events-none">
        <div className="w-3 h-3 border-t-2 border-l-2 border-zinc-500" />
      </div>
      <div className="absolute top-3 right-3 text-zinc-600 pointer-events-none">
        <div className="w-3 h-3 border-t-2 border-r-2 border-zinc-500" />
      </div>
      <div className="absolute bottom-3 left-3 text-zinc-600 pointer-events-none">
        <div className="w-3 h-3 border-b-2 border-l-2 border-zinc-500" />
      </div>
      <div className="absolute bottom-3 right-3 text-zinc-600 pointer-events-none">
        <div className="w-3 h-3 border-b-2 border-r-2 border-zinc-500" />
      </div>

      <div className="relative p-5 sm:p-6 flex flex-col items-center text-center space-y-4">
        {/* Radar live badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-[11px] text-zinc-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-medium tracking-wide uppercase">AI Spotter Lens Ready</span>
        </div>

        {/* Center aperture button icon */}
        <div className="relative my-1">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border-2 border-zinc-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Camera className="w-7 h-7 text-white" strokeWidth={1.75} />
            <div className="absolute inset-0 rounded-full border border-dashed border-zinc-400/40 animate-[spin_20s_linear_infinite]" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1 text-black shadow">
            <Sparkles className="w-3 h-3" />
          </div>
        </div>

        {/* Headlines */}
        <div className="space-y-1.5 max-w-xs">
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Spot &amp; Identify Any Car
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Snap a vehicle on the street to identify make, model, specs, and add rare colour variants to your garage.
          </p>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          id="home-open-scanner-button"
          onClick={() => onNavigate?.('scanner')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-medium text-xs tracking-wide transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Camera className="w-4 h-4 text-zinc-900" />
          <span>Launch AI Scanner</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
        </button>
      </div>
    </div>
  );
}
