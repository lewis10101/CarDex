import React from 'react';
import { Shield, ChevronRight } from 'lucide-react';
import { BRANDS_CATALOG, getBrandCompletion } from '../../data/collectionData';
import { UserCarCollectionState, AppTab } from '../../types';

interface HomeMarqueRadarProps {
  collectionState: Record<string, UserCarCollectionState>;
  onNavigate?: (tab: AppTab) => void;
}

export function HomeMarqueRadar({ collectionState, onNavigate }: HomeMarqueRadarProps) {
  // Take top 6 prominent brands
  const featuredBrands = BRANDS_CATALOG.slice(0, 6);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-4 sm:p-5 shadow-xs space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Marque Radar
          </h3>
        </div>
        <button
          type="button"
          onClick={() => onNavigate?.('collection')}
          className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>All Brands ({BRANDS_CATALOG.length})</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {featuredBrands.map((brand) => {
          const { total, collected, isMastered } = getBrandCompletion(brand, collectionState);
          const brandPercentage = total > 0 ? Math.round((collected / total) * 100) : 0;

          return (
            <button
              key={brand.id}
              type="button"
              onClick={() => onNavigate?.('collection')}
              className="p-3 rounded-xl bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white">
                  {brand.name}
                </span>
                {isMastered ? (
                  <span className="w-2 h-2 rounded-full bg-amber-500 ring-2 ring-amber-500/20" title="Mastered Marque" />
                ) : (
                  <span className="text-[10px] text-zinc-400 font-mono">{brand.country}</span>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span>{collected}/{total} spotted</span>
                  <span className="font-mono text-[10px]">{brandPercentage}%</span>
                </div>
                <div className="w-full h-1 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isMastered ? 'bg-amber-500' : 'bg-zinc-800 dark:bg-zinc-200'
                    }`}
                    style={{ width: `${brandPercentage}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
