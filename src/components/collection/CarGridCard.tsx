import React from 'react';
import { Check, Camera } from 'lucide-react';
import { CollectionCar, UserCarCollectionState, CarRarity } from '../../types';

interface CarGridCardProps {
  key?: React.Key;
  car: CollectionCar;
  state?: UserCarCollectionState;
  onClick: (car: CollectionCar) => void;
}

export function CarGridCard({ car, state, onClick }: CarGridCardProps) {
  const isCollected = Boolean(state?.isCollected);
  const colorSpots = state?.colorSpots || [];
  const spotPhoto = colorSpots.find((s) => Boolean(s.photoUrl))?.photoUrl;
  const displayImage = state?.userPhoto || spotPhoto;
  const hasUserPhoto = Boolean(displayImage);
  const discoveredColorsCount = colorSpots.length > 0 ? colorSpots.length : (state?.collectedColors?.length || (isCollected ? 1 : 0));

  // Consistent rarity styling badge matching daily draw and target pools
  const getRarityBadge = (rarity: CarRarity) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'Epic':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30';
      case 'Rare':
        return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30';
      case 'Uncommon':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'Common':
      default:
        return 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20';
    }
  };

  return (
    <button
      type="button"
      id={`car-card-${car.id}`}
      onClick={() => onClick(car)}
      className={`group relative flex flex-col text-left rounded-2xl border p-2.5 transition-all duration-200 cursor-pointer overflow-hidden ${
        isCollected
          ? 'bg-white dark:bg-zinc-900 border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700'
          : 'bg-zinc-50/60 dark:bg-zinc-900/40 border-dashed border-zinc-300/80 dark:border-zinc-800/80 opacity-85 hover:opacity-100'
      } active:scale-[0.98] w-full`}
    >
      {/* Scan Status Badge (Top Right) */}
      <div className="absolute top-2 right-2 z-10">
        {isCollected ? (
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[9px] font-medium backdrop-blur-xs">
            <Check className="w-2.5 h-2.5" />
            <span>Collected</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-zinc-200/60 dark:bg-zinc-800/70 text-zinc-500 dark:text-zinc-400 border border-zinc-300/50 dark:border-zinc-700/50 text-[9px] font-normal backdrop-blur-xs">
            <span>Missing</span>
          </span>
        )}
      </div>

      {/* Car Image / Missing Slot Preview */}
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-850 mb-2 border border-zinc-200/50 dark:border-zinc-800/80">
        {isCollected && hasUserPhoto && displayImage ? (
          <>
            <img
              src={displayImage}
              alt={car.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-1.5 left-1.5 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/75 text-white text-[9px] font-medium backdrop-blur-xs shadow-xs">
              <Camera className="w-2.5 h-2.5 text-amber-400" />
              <span>Your Photo</span>
            </div>
            {discoveredColorsCount > 1 && (
              <div className="absolute bottom-1.5 right-1.5 z-10 px-1.5 py-0.5 rounded-md bg-zinc-900/85 text-zinc-100 border border-zinc-700/50 text-[8px] font-medium backdrop-blur-xs shadow-xs">
                {discoveredColorsCount} colors
              </div>
            )}
          </>
        ) : (
          /* Sleek Missing Car Slot Silhouette & Logo */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-100 via-zinc-200/40 to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 p-3 text-center select-none">
            {/* Background vehicle silhouette outline */}
            <div className="relative flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-zinc-200/70 dark:bg-zinc-800/80 border border-dashed border-zinc-400/50 dark:border-zinc-700/60 flex items-center justify-center text-zinc-400 dark:text-zinc-500 shadow-2xs group-hover:scale-105 transition-transform">
                <svg
                  className="w-6 h-6 opacity-75"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <path d="M9 17h6" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>

              <div className="mt-1.5">
                <span className="inline-block text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800/90 text-zinc-500 dark:text-zinc-400 border border-zinc-300/60 dark:border-zinc-700/50">
                  Missing Car
                </span>
                <p className="text-[8px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                  Scan to unlock
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Car Name & Rarity */}
      <div className="flex-1 flex flex-col justify-between w-full">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span
              className={`text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded border leading-none ${getRarityBadge(
                car.rarity
              )}`}
            >
              {car.rarity}
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
              {car.yearIntroduced}
            </span>
          </div>

          <h4
            className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-1"
            title={car.name}
          >
            {car.name}
          </h4>
        </div>

        {/* Dynamic Discovered Colors (only shown when scanned) */}
        <div className="mt-2 pt-1.5 border-t border-zinc-100 dark:border-zinc-800/70 flex items-center justify-between text-[10px]">
          {isCollected ? (
            <>
              <div className="flex items-center gap-1 overflow-x-hidden">
                {colorSpots.length > 0 ? (
                  colorSpots.slice(0, 5).map((spot, i) => (
                    <div
                      key={i}
                      title={spot.colorName}
                      className="w-2.5 h-2.5 rounded-full ring-1 ring-zinc-400 dark:ring-zinc-600 shadow-2xs shrink-0"
                      style={{ backgroundColor: spot.hex }}
                    />
                  ))
                ) : (
                  <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium">
                    Unlocked
                  </span>
                )}
              </div>
              <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-mono pl-1">
                {discoveredColorsCount} {discoveredColorsCount === 1 ? 'color' : 'colors'}
              </span>
            </>
          ) : (
            <span className="text-[9px] text-zinc-400 dark:text-zinc-500 italic">
              Unscanned
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

