import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Crown, Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { BrandInfo, CollectionCar, UserCarCollectionState, CarRarity } from '../../types';
import { getBrandCompletion } from '../../data/collectionData';
import { BrandLogo } from './BrandLogo';
import { BrandProgressRing } from './BrandProgressRing';
import { CarGridCard } from './CarGridCard';
import { CarDetailScreen } from './CarDetailScreen';
import {
  GarageFilterModal,
  GarageFilterCategory,
  CarSortOption,
} from './GarageFilterModal';
import { resetScrollToTop } from '../../utils/scrollHelper';
import { resolveParentModel, cleanToCoreModelName } from '../../utils/modelResolver';
import { normalizeSearchText } from '../../utils/textUtils';

interface BrandGarageScreenProps {
  brand: BrandInfo;
  collectionState: Record<string, UserCarCollectionState>;
  onBack: () => void;
  onStateUpdate: () => void;
}

const RARITY_WEIGHT: Record<CarRarity, number> = {
  Legendary: 6,
  'Ultra Rare': 5,
  Epic: 4,
  Rare: 3,
  Uncommon: 2,
  Common: 1,
};

const COMMON_COLOURS = [
  { id: 'all', label: 'All Colours', hex: '' },
  { id: 'black', label: 'Black', hex: '#18181B' },
  { id: 'white', label: 'White', hex: '#F4F4F5' },
  { id: 'silver', label: 'Silver / Grey', hex: '#9CA3AF' },
  { id: 'red', label: 'Red', hex: '#EF4444' },
  { id: 'blue', label: 'Blue', hex: '#3B82F6' },
  { id: 'green', label: 'Green', hex: '#10B981' },
  { id: 'yellow', label: 'Yellow', hex: '#F59E0B' },
  { id: 'orange', label: 'Orange', hex: '#F97316' },
];

export function BrandGarageScreen({
  brand,
  collectionState,
  onBack,
  onStateUpdate,
}: BrandGarageScreenProps) {
  const [selectedCar, setSelectedCar] = useState<CollectionCar | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'collected' | 'missing'>('all');
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  const [colourFilter, setColourFilter] = useState<string>('all');
  const [eraFilter, setEraFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<CarSortOption>('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterModalCategory, setFilterModalCategory] = useState<GarageFilterCategory>('status');

  useEffect(() => {
    resetScrollToTop(false);
  }, [selectedCar]);

  const { total, collected, percentage, isMastered } = getBrandCompletion(brand, collectionState);

  // Available discovered colors for this brand's collected vehicles
  const discoveredBrandColours = useMemo(() => {
    const coloursSet = new Set<string>();
    brand.cars.forEach((car) => {
      const state = collectionState[car.id];
      if (state?.isCollected) {
        state.colorSpots?.forEach((s) => {
          if (s.colorName) coloursSet.add(s.colorName.toLowerCase());
          if (s.baseColor) coloursSet.add(s.baseColor.toLowerCase());
        });
        state.collectedColors?.forEach((c) => coloursSet.add(c.toLowerCase()));
      }
    });
    return coloursSet;
  }, [brand.cars, collectionState]);

  const activeFiltersCount =
    (statusFilter !== 'all' ? 1 : 0) +
    (rarityFilter !== 'all' ? 1 : 0) +
    (colourFilter !== 'all' ? 1 : 0) +
    (eraFilter !== 'all' ? 1 : 0) +
    (sortOption !== 'default' ? 1 : 0);

  const hasActiveFilters = activeFiltersCount > 0 || Boolean(searchQuery.trim());

  const resetGarageFilters = () => {
    setStatusFilter('all');
    setRarityFilter('all');
    setColourFilter('all');
    setEraFilter('all');
    setSortOption('default');
  };

  const openFilterModal = (category: GarageFilterCategory = 'status') => {
    setFilterModalCategory(category);
    setIsFilterModalOpen(true);
  };

  // Filter cars with variant resolution, rarity, colors, and era
  const filteredCars = useMemo(() => {
    let list = brand.cars.filter((car) => {
      const state = collectionState[car.id];
      const isCol = Boolean(state?.isCollected);

      // 1. Status Filter
      if (statusFilter === 'collected' && !isCol) return false;
      if (statusFilter === 'missing' && isCol) return false;

      // 2. Rarity Filter
      if (rarityFilter !== 'all' && car.rarity.toLowerCase() !== rarityFilter.toLowerCase()) {
        return false;
      }

      // 3. Colour Filter (for collected cars, check discovered color spots)
      if (colourFilter !== 'all') {
        if (!isCol) return false;
        const targetColor = colourFilter.toLowerCase();
        const hasColorMatch =
          state?.colorSpots?.some(
            (s) =>
              s.colorName.toLowerCase().includes(targetColor) ||
              (s.baseColor && s.baseColor.toLowerCase().includes(targetColor))
          ) ||
          state?.collectedColors?.some((c) => c.toLowerCase().includes(targetColor));

        if (!hasColorMatch) return false;
      }

      // 4. Era Filter
      if (eraFilter !== 'all') {
        const year = car.yearIntroduced || 2020;
        if (eraFilter === '2020s' && year < 2020) return false;
        if (eraFilter === '2010s' && (year < 2010 || year > 2019)) return false;
        if (eraFilter === '2000s' && (year < 2000 || year > 2009)) return false;
        if (eraFilter === 'classic' && year >= 2000) return false;
      }

      // 5. Search Query Filter
      if (!searchQuery.trim()) return true;
      const q = normalizeSearchText(searchQuery);
      const cLower = normalizeSearchText(car.name);
      if (cLower.includes(q)) return true;

      const resolved = resolveParentModel(q, brand.name);
      if (resolved && cLower === normalizeSearchText(resolved.parentModel)) return true;

      const core = normalizeSearchText(cleanToCoreModelName(q, brand.name));
      if (core && cLower === core) return true;

      return false;
    });

    // Sort cars
    return [...list].sort((a, b) => {
      if (sortOption === 'year-desc') {
        return (b.yearIntroduced || 0) - (a.yearIntroduced || 0);
      }
      if (sortOption === 'year-asc') {
        return (a.yearIntroduced || 0) - (b.yearIntroduced || 0);
      }
      if (sortOption === 'power-desc') {
        return (b.horsepower || 0) - (a.horsepower || 0);
      }
      if (sortOption === 'speed-desc') {
        return (b.topSpeed || 0) - (a.topSpeed || 0);
      }
      if (sortOption === 'accel-asc') {
        return (a.zeroToSixty || 99) - (b.zeroToSixty || 99);
      }
      if (sortOption === 'rarity-desc') {
        return (RARITY_WEIGHT[b.rarity] || 1) - (RARITY_WEIGHT[a.rarity] || 1);
      }
      return a.name.localeCompare(b.name);
    });
  }, [brand.cars, collectionState, statusFilter, rarityFilter, colourFilter, eraFilter, searchQuery, sortOption]);

  if (selectedCar) {
    return (
      <CarDetailScreen
        car={selectedCar}
        state={collectionState[selectedCar.id]}
        onBack={() => setSelectedCar(null)}
        onStateUpdate={onStateUpdate}
      />
    );
  }

  return (
    <div className="w-full min-h-full flex flex-col bg-zinc-50/50 dark:bg-zinc-950 pb-16">
      {/* Top Navigation */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Collections</span>
        </button>

        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
          {brand.name} Garage
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Brand Garage Header Hero Card */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isMastered
              ? 'bg-gradient-to-br from-yellow-50/70 via-white to-amber-50/30 dark:from-yellow-950/30 dark:via-zinc-900 dark:to-zinc-900 border-yellow-300 dark:border-yellow-700/60 shadow-xs'
              : 'bg-white dark:bg-zinc-900 border-zinc-200/90 dark:border-zinc-800 shadow-xs'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800 p-2 flex items-center justify-center border border-zinc-100 dark:border-zinc-700/50 shadow-2xs">
                <BrandLogo brand={brand.name} size="lg" className="w-full h-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {brand.name}
                  </h1>
                  {isMastered && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-950/70 border border-yellow-300 dark:border-yellow-600 text-yellow-800 dark:text-yellow-300 text-[10px] font-semibold">
                      <Crown className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                      Mastered
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                  {brand.country} &bull; Founded in {brand.founded}
                </p>
              </div>
            </div>

            {/* Thin Progress Ring */}
            <div className="flex flex-col items-center shrink-0">
              <BrandProgressRing
                percentage={percentage}
                size={48}
                strokeWidth={3}
                isMastered={isMastered}
              />
            </div>
          </div>

          {/* Progress Bar & Status Text */}
          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-zinc-600 dark:text-zinc-400">
                Garage Completion
              </span>
              <span
                className={`font-semibold ${
                  isMastered
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-zinc-900 dark:text-zinc-100'
                }`}
              >
                {collected} of {total} cars collected ({percentage}%)
              </span>
            </div>

            <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isMastered
                    ? 'bg-yellow-500'
                    : percentage > 0
                    ? 'bg-emerald-500'
                    : 'bg-zinc-300 dark:bg-zinc-700'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Brand Mastery Celebration Banner */}
          {isMastered && (
            <div className="mt-3 p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-800 dark:text-yellow-300 flex items-center gap-2 text-xs">
              <Crown className="w-4 h-4 text-yellow-600 dark:text-yellow-400 shrink-0" />
              <span>
                <strong>Brand Mastery Achieved!</strong> You own every registered vehicle from {brand.name}.
              </span>
            </div>
          )}
        </div>

        {/* Search Garage Models */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          <input
            id="brand-garage-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${brand.name} models (e.g. Aventador, Roma, 911)...`}
            className="w-full pl-9 pr-9 py-2 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-hidden focus:ring-1 focus:ring-zinc-400 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Action Bar (Left: Filter button + Reset All; Right: Collected count) */}
        <div className="flex items-center justify-between pt-1 pb-0.5 text-xs">
          <div className="flex items-center gap-2">
            {/* Main Filters Button */}
            <button
              type="button"
              onClick={() => openFilterModal('status')}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                activeFiltersCount > 0
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-2xs'
                  : 'bg-zinc-100/90 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-zinc-900 text-[9px] font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Reset All Button (Visible when any filter is active) */}
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={resetGarageFilters}
                className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors cursor-pointer whitespace-nowrap"
                title="Reset all garage filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">
              {collected} of {total} collected ({percentage}%)
            </span>
            <span className="text-zinc-400 dark:text-zinc-500 font-mono">
              ({filteredCars.length} showing)
            </span>
          </div>
        </div>

        {/* Garage Filter Modal */}
        <GarageFilterModal
          isOpen={isFilterModalOpen}
          brandName={brand.name}
          initialCategory={filterModalCategory}
          statusFilter={statusFilter}
          rarityFilter={rarityFilter}
          colourFilter={colourFilter}
          eraFilter={eraFilter}
          sortOption={sortOption}
          totalMatchingCars={filteredCars.length}
          totalCarsInBrand={total}
          collectedCarsCount={collected}
          onSelectStatus={setStatusFilter}
          onSelectRarity={setRarityFilter}
          onSelectColour={setColourFilter}
          onSelectEra={setEraFilter}
          onSelectSort={setSortOption}
          onResetAll={resetGarageFilters}
          onClose={() => setIsFilterModalOpen(false)}
        />

        {/* Clean Grid of All Cars from Brand */}
        <div className="grid grid-cols-2 gap-3">
          {filteredCars.map((car) => (
            <CarGridCard
              key={car.id}
              car={car}
              state={collectionState[car.id]}
              onClick={(c) => setSelectedCar(c)}
            />
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="p-8 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              No cars match the active filters in this garage.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetGarageFilters}
                className="mt-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 underline cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
