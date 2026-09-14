import React, { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CarItem, CarRarity, CarColor, SortMode } from '../../types';
import { CarCard } from './CarCard';
import { FilterBar } from './FilterBar';

interface BrandCollectionPageProps {
  brand: string;
  cars: CarItem[];
  rarityFilter: 'All' | CarRarity;
  onSelectRarity: (rarity: 'All' | CarRarity) => void;
  sortMode: SortMode;
  onSelectSort: (sort: SortMode) => void;
  colorFilter: 'All' | CarColor;
  onSelectColor: (color: 'All' | CarColor) => void;
  onBack: () => void;
  onSelectCar?: (car: CarItem) => void;
}

export function BrandCollectionPage({
  brand,
  cars,
  rarityFilter,
  onSelectRarity,
  sortMode,
  onSelectSort,
  colorFilter,
  onSelectColor,
  onBack,
  onSelectCar = () => {},
}: BrandCollectionPageProps) {
  const hasActiveFilters =
    rarityFilter !== 'All' ||
    sortMode !== 'default' ||
    colorFilter !== 'All';

  const resetFilters = () => {
    onSelectRarity('All');
    onSelectSort('default');
    onSelectColor('All');
  };

  // Filter and sort cars within this brand
  const filteredCars = useMemo(() => {
    let list = [...cars];

    if (rarityFilter !== 'All') {
      list = list.filter((c) => c.rarity === rarityFilter);
    }

    if (colorFilter !== 'All') {
      list = list.filter((c) => c.color === colorFilter);
    }

    if (sortMode === 'a-z') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMode === 'z-a') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortMode === 'highest-hp') {
      list.sort((a, b) => b.horsepower - a.horsepower);
    } else if (sortMode === 'fastest-0-60') {
      list.sort((a, b) => a.zeroToSixty - b.zeroToSixty);
    } else if (sortMode === 'highest-top-speed') {
      list.sort((a, b) => b.topSpeed - a.topSpeed);
    } else {
      // Default: alphabetical
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [cars, rarityFilter, colorFilter, sortMode]);

  return (
    <div className="w-full flex flex-col">
      {/* Top Header */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            aria-label="Back to all collections"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <div>
            <h1 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
              {brand} Collection
            </h1>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {filteredCars.length} {filteredCars.length === 1 ? 'vehicle' : 'vehicles'} • {cars.length} total
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar (Rarity, Sort, Performance, Colour) */}
      <FilterBar
        rarityFilter={rarityFilter}
        onSelectRarity={onSelectRarity}
        sortMode={sortMode}
        onSelectSort={onSelectSort}
        colorFilter={colorFilter}
        onSelectColor={onSelectColor}
        showBrandFilter={false}
        onResetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* 3-Column Car Grid */}
      <div className="p-3">
        {filteredCars.length === 0 ? (
          <div className="py-16 text-center text-xs text-zinc-400 dark:text-zinc-500">
            No {brand} vehicles match the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} onClick={onSelectCar} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
