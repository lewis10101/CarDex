import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Search,
  Target,
  Flame,
} from 'lucide-react';
import {
  getCuratedDailyBrandPool,
  TIER_CONFIG,
  BrandRarityTier,
  DailyTargetBrand,
  sortBrandsByRarity,
  formatBrandDescription,
} from '../../data/dailyTargetService';
import { BrandLogo } from '../collection/BrandLogo';
import { normalizeSearchText } from '../../utils/textUtils';

interface DrawCarsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DrawCarsModal({ isOpen, onClose }: DrawCarsModalProps) {
  const [selectedTier, setSelectedTier] = useState<'all' | BrandRarityTier>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [brandPool, setBrandPool] = useState<DailyTargetBrand[]>(() => getCuratedDailyBrandPool());

  // Listen for draw pool updates (e.g. if modified in owner settings)
  useEffect(() => {
    const handlePoolUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<DailyTargetBrand[]>;
      if (customEvent.detail) {
        setBrandPool(customEvent.detail);
      } else {
        setBrandPool(getCuratedDailyBrandPool());
      }
    };

    window.addEventListener('cardex_draw_pool_updated', handlePoolUpdated);
    return () => {
      window.removeEventListener('cardex_draw_pool_updated', handlePoolUpdated);
    };
  }, []);

  // Update brand pool when modal opens
  useEffect(() => {
    if (isOpen) {
      setBrandPool(getCuratedDailyBrandPool());
    }
  }, [isOpen]);

  // Counts per tier
  const tierStats = useMemo(() => {
    return {
      all: brandPool.length,
      common: brandPool.filter((b) => b.rarityTier === 'common').length,
      'mid-rarity': brandPool.filter((b) => b.rarityTier === 'mid-rarity').length,
      rare: brandPool.filter((b) => b.rarityTier === 'rare').length,
      'ultra-rare': brandPool.filter((b) => b.rarityTier === 'ultra-rare').length,
    };
  }, [brandPool]);

  // Filter brands based on selected tier and search query, sorted by respective rarity
  const filteredBrands = useMemo(() => {
    const matching = brandPool.filter((b) => {
      // Tier filter
      if (selectedTier !== 'all' && b.rarityTier !== selectedTier) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = normalizeSearchText(searchQuery);
        const brandMatch = normalizeSearchText(b.name).includes(q) || normalizeSearchText(b.brand).includes(q);
        const countryMatch = normalizeSearchText(b.country).includes(q);
        const factMatch = normalizeSearchText(b.tagline || '').includes(q) || normalizeSearchText(b.hint || '').includes(q);
        return brandMatch || countryMatch || factMatch;
      }

      return true;
    });

    return sortBrandsByRarity(matching);
  }, [brandPool, selectedTier, searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Cars in the Daily Draw
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  {tierStats.all} Brands
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                All car brands in the daily target draw, filtered by rarity
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tier Filter Tabs */}
        <div className="p-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 space-y-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            {/* All */}
            <button
              type="button"
              id="filter-draw-tier-all"
              onClick={() => setSelectedTier('all')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                selectedTier === 'all'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                  : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/60 hover:bg-zinc-100 dark:hover:bg-zinc-750'
              }`}
            >
              <span>All Marques</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedTier === 'all'
                    ? 'bg-white/20 text-white dark:bg-zinc-900/20 dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-750 text-zinc-600 dark:text-zinc-300'
                }`}
              >
                {tierStats.all}
              </span>
            </button>

            {/* Commons */}
            <button
              type="button"
              id="filter-draw-tier-common"
              onClick={() => setSelectedTier('common')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                selectedTier === 'common'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 hover:bg-blue-100'
              }`}
            >
              <span>Commons</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedTier === 'common'
                    ? 'bg-white/25 text-white'
                    : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                }`}
              >
                {tierStats.common}
              </span>
            </button>

            {/* Mid-Rarity */}
            <button
              type="button"
              id="filter-draw-tier-mid"
              onClick={() => setSelectedTier('mid-rarity')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                selectedTier === 'mid-rarity'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/60 hover:bg-purple-100'
              }`}
            >
              <span>Mid-Rarity</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedTier === 'mid-rarity'
                    ? 'bg-white/25 text-white'
                    : 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200'
                }`}
              >
                {tierStats['mid-rarity']}
              </span>
            </button>

            {/* Rare */}
            <button
              type="button"
              id="filter-draw-tier-rare"
              onClick={() => setSelectedTier('rare')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                selectedTier === 'rare'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 hover:bg-amber-100'
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>Rare</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedTier === 'rare'
                    ? 'bg-white/25 text-white'
                    : 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
                }`}
              >
                {tierStats.rare}
              </span>
            </button>

            {/* Ultra-Rare */}
            <button
              type="button"
              id="filter-draw-tier-ultra"
              onClick={() => setSelectedTier('ultra-rare')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                selectedTier === 'ultra-rare'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/60 hover:bg-rose-100'
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>Ultra-Rare</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedTier === 'ultra-rare'
                    ? 'bg-white/25 text-white'
                    : 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-200'
                }`}
              >
                {tierStats['ultra-rare']}
              </span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search car brands, country, or facts..."
              className="w-full pl-8.5 pr-8 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Simplified Brand Cards List: Brand name, Logo, Country, Fact, Rarity */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredBrands.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                No brands found
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-xs mx-auto">
                No brands match &ldquo;{searchQuery}&rdquo; in this filter.
              </p>
            </div>
          ) : (
            filteredBrands.map((brand) => {
              const tierMeta = TIER_CONFIG[brand.rarityTier];
              const isExotic = brand.rarityTier === 'rare' || brand.rarityTier === 'ultra-rare';

              return (
                <div
                  key={brand.id}
                  className="p-3 rounded-2xl bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex items-center gap-3.5"
                >
                  {/* Brand Logo */}
                  <div className="w-11 h-11 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 p-1.5 flex items-center justify-center shrink-0 shadow-2xs">
                    <BrandLogo brand={brand.brand} size="md" className="w-full h-full" />
                  </div>

                  {/* Brand Details: Name, Country, Fact */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {brand.name}
                      </h4>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60">
                        {brand.country}
                      </span>
                    </div>

                    {/* Fact */}
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5 leading-snug line-clamp-2">
                      {formatBrandDescription(brand)}
                    </p>
                  </div>

                  {/* Rarity Badge */}
                  <div className="shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1 ${tierMeta.badgeBg} ${tierMeta.badgeText} ${tierMeta.borderClass}`}
                    >
                      {isExotic && <Flame className="w-3 h-3 text-amber-500" />}
                      {tierMeta.label}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
          <span>
            Showing <strong className="text-zinc-800 dark:text-zinc-200">{filteredBrands.length}</strong> of{' '}
            <strong className="text-zinc-800 dark:text-zinc-200">{tierStats.all}</strong> brands
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
