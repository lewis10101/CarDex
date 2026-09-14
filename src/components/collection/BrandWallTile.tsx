import React from 'react';
import { Award, Crown } from 'lucide-react';
import { BrandInfo, UserCarCollectionState } from '../../types';
import { getBrandCompletion } from '../../data/collectionData';
import { BrandLogo } from './BrandLogo';
import { BrandProgressRing } from './BrandProgressRing';

interface BrandWallTileProps {
  key?: React.Key;
  brand: BrandInfo;
  collectionState: Record<string, UserCarCollectionState>;
  onClick: (brand: BrandInfo) => void;
}

export function BrandWallTile({ brand, collectionState, onClick }: BrandWallTileProps) {
  const { total, collected, percentage, isMastered } = getBrandCompletion(brand, collectionState);

  return (
    <button
      type="button"
      id={`brand-tile-${brand.id}`}
      onClick={() => onClick(brand)}
      className={`group relative flex flex-col items-center justify-between p-3 rounded-2xl border text-center transition-all duration-200 cursor-pointer overflow-hidden ${
        isMastered
          ? 'bg-gradient-to-b from-yellow-50/40 via-white to-white dark:from-yellow-950/20 dark:via-zinc-900 dark:to-zinc-900 border-yellow-300/80 dark:border-yellow-700/60 shadow-sm hover:shadow-md'
          : 'bg-white dark:bg-zinc-900 border-zinc-200/90 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700'
      } active:scale-[0.98]`}
    >
      {/* Brand Mastery Ribbon Badge if 100% */}
      {isMastered && (
        <div
          className="absolute top-1.5 right-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-950/80 border border-yellow-300 dark:border-yellow-600/60 text-[9px] font-medium text-yellow-700 dark:text-yellow-300 shadow-xs"
          title="Brand Mastery: 100% Cars Collected!"
        >
          <Crown className="w-2.5 h-2.5 text-yellow-600 dark:text-yellow-400" />
          <span className="text-[8px] font-semibold tracking-wide uppercase">Mastered</span>
        </div>
      )}

      {/* Brand Logo Container */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-105">
        <BrandLogo brand={brand.name} size="lg" className="w-full h-full" />
      </div>

      {/* Brand Name */}
      <div className="w-full mt-1.5 mb-2 px-1">
        <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate w-full tracking-tight">
          {brand.name}
        </h3>
        <p className="text-[9px] text-zinc-400 dark:text-zinc-500 truncate">
          {brand.country}
        </p>
      </div>

      {/* Thin Progress Ring */}
      <div className="my-1 flex items-center justify-center">
        <BrandProgressRing
          percentage={percentage}
          size={38}
          strokeWidth={2.5}
          isMastered={isMastered}
        />
      </div>

      {/* 'X / Y cars collected' text */}
      <div className="w-full pt-1 mt-1 border-t border-zinc-100 dark:border-zinc-800/70 text-center">
        <span
          className={`text-[10px] font-medium leading-tight block ${
            isMastered
              ? 'text-yellow-600 dark:text-yellow-400'
              : collected > 0
              ? 'text-zinc-700 dark:text-zinc-300'
              : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          {collected} / {total} collected
        </span>
      </div>
    </button>
  );
}
