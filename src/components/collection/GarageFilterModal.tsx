import React, { useState } from 'react';
import { X, RotateCcw, Check, Tag, Sparkles, Palette, Calendar, ArrowUpDown } from 'lucide-react';
import { CarRarity } from '../../types';

export type CarSortOption =
  | 'default'
  | 'year-desc'
  | 'year-asc'
  | 'power-desc'
  | 'speed-desc'
  | 'accel-asc'
  | 'rarity-desc';

export type GarageFilterCategory = 'status' | 'rarity' | 'colour' | 'era' | 'sort';

interface GarageFilterModalProps {
  isOpen: boolean;
  brandName: string;
  initialCategory?: GarageFilterCategory;
  statusFilter: 'all' | 'collected' | 'missing';
  rarityFilter: string;
  colourFilter: string;
  eraFilter: string;
  sortOption: CarSortOption;
  totalMatchingCars: number;
  totalCarsInBrand: number;
  collectedCarsCount: number;
  onSelectStatus: (status: 'all' | 'collected' | 'missing') => void;
  onSelectRarity: (rarity: string) => void;
  onSelectColour: (colour: string) => void;
  onSelectEra: (era: string) => void;
  onSelectSort: (sort: CarSortOption) => void;
  onResetAll: () => void;
  onClose: () => void;
}

const RARITIES = [
  { id: 'all', label: 'All Rarities' },
  { id: 'Legendary', label: 'Legendary' },
  { id: 'Ultra Rare', label: 'Ultra Rare' },
  { id: 'Epic', label: 'Epic' },
  { id: 'Rare', label: 'Rare' },
  { id: 'Uncommon', label: 'Uncommon' },
  { id: 'Common', label: 'Common' },
];

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

const ERAS = [
  { id: 'all', label: 'All Eras', desc: 'All production years' },
  { id: '2020s', label: '2020s (Modern)', desc: 'Vehicles released 2020 and later' },
  { id: '2010s', label: '2010s', desc: 'Vehicles released between 2010–2019' },
  { id: '2000s', label: '2000s', desc: 'Vehicles released between 2000–2009' },
  { id: 'classic', label: 'Classic (Pre-2000)', desc: 'Vintage & classic models released before 2000' },
];

const SORTS: { id: CarSortOption; label: string; desc: string }[] = [
  { id: 'default', label: 'Model Name (A → Z)', desc: 'Alphabetical order' },
  { id: 'year-desc', label: 'Year (Newest First)', desc: 'Latest introductions first' },
  { id: 'year-asc', label: 'Year (Oldest First)', desc: 'Earliest classics first' },
  { id: 'power-desc', label: 'Horsepower (Highest)', desc: 'Most powerful engines first' },
  { id: 'speed-desc', label: 'Top Speed (Highest)', desc: 'Fastest maximum speed' },
  { id: 'accel-asc', label: '0–60 mph (Fastest)', desc: 'Quickest acceleration' },
  { id: 'rarity-desc', label: 'Rarity (Highest First)', desc: 'Legendary & Ultra Rare first' },
];

export function GarageFilterModal({
  isOpen,
  brandName,
  initialCategory = 'status',
  statusFilter,
  rarityFilter,
  colourFilter,
  eraFilter,
  sortOption,
  totalMatchingCars,
  totalCarsInBrand,
  collectedCarsCount,
  onSelectStatus,
  onSelectRarity,
  onSelectColour,
  onSelectEra,
  onSelectSort,
  onResetAll,
  onClose,
}: GarageFilterModalProps) {
  const [activeCategory, setActiveCategory] = useState<GarageFilterCategory>(initialCategory);

  if (!isOpen) return null;

  const activeFiltersCount =
    (statusFilter !== 'all' ? 1 : 0) +
    (rarityFilter !== 'all' ? 1 : 0) +
    (colourFilter !== 'all' ? 1 : 0) +
    (eraFilter !== 'all' ? 1 : 0) +
    (sortOption !== 'default' ? 1 : 0);

  const categories: {
    id: GarageFilterCategory;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    active: boolean;
    displayValue: string;
  }[] = [
    {
      id: 'status',
      label: 'Status',
      icon: Tag,
      active: statusFilter !== 'all',
      displayValue: statusFilter === 'all' ? 'All' : statusFilter,
    },
    {
      id: 'rarity',
      label: 'Rarity',
      icon: Sparkles,
      active: rarityFilter !== 'all',
      displayValue: rarityFilter === 'all' ? 'All' : rarityFilter,
    },
    {
      id: 'colour',
      label: 'Colour',
      icon: Palette,
      active: colourFilter !== 'all',
      displayValue: colourFilter === 'all' ? 'All' : colourFilter,
    },
    {
      id: 'era',
      label: 'Era',
      icon: Calendar,
      active: eraFilter !== 'all',
      displayValue: eraFilter === 'all' ? 'All' : eraFilter,
    },
    {
      id: 'sort',
      label: 'Sort By',
      icon: ArrowUpDown,
      active: sortOption !== 'default',
      displayValue: SORTS.find((s) => s.id === sortOption)?.label || 'Name A→Z',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 transition-all"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-white dark:bg-zinc-900 border-t sm:border border-zinc-200 dark:border-zinc-800 rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {brandName} Garage Filters
            </h2>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-[10px] font-semibold">
                {activeFiltersCount} active
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={onResetAll}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close filters"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Category Selector Tabs/Buttons */}
        <div className="px-3 pt-3 pb-2 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/50">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 px-1">
            Select a filter to configure:
          </p>
          <div className="grid grid-cols-5 gap-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-medium transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                      : 'bg-white dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 mb-1 ${isSelected ? 'text-white dark:text-zinc-900' : 'text-zinc-400'}`} />
                  <span className="text-[10px] leading-tight font-semibold">{cat.label}</span>
                  {cat.active && (
                    <span
                      className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-amber-400' : 'bg-zinc-900 dark:bg-white'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Options Display (Brings up options for the clicked filter button) */}
        <div className="p-4 flex-1 overflow-y-auto max-h-[44vh] space-y-2">
          {/* STATUS OPTIONS */}
          {activeCategory === 'status' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  Collection Ownership:
                </span>
                {statusFilter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => onSelectStatus('all')}
                    className="text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 underline cursor-pointer"
                  >
                    Reset Status
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'all' as const, label: 'All Models', count: totalCarsInBrand, desc: 'Show all cars registered in this garage' },
                  { id: 'collected' as const, label: 'Collected Only', count: collectedCarsCount, desc: 'Only show cars you have scanned and collected' },
                  { id: 'missing' as const, label: 'Missing Only', count: totalCarsInBrand - collectedCarsCount, desc: 'Only show locked vehicles yet to be scanned' },
                ].map((item) => {
                  const isChecked = statusFilter === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectStatus(item.id)}
                      className={`w-full flex items-start justify-between p-3 rounded-xl text-left transition-all cursor-pointer border ${
                        isChecked
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 font-semibold shadow-xs'
                          : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold">{item.label}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                              isChecked
                                ? 'bg-white/20 text-white dark:bg-zinc-900/20 dark:text-zinc-900'
                                : 'bg-zinc-200/70 dark:bg-zinc-700/70 text-zinc-600 dark:text-zinc-400'
                            }`}
                          >
                            {item.count}
                          </span>
                        </div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            isChecked ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'
                          }`}
                        >
                          {item.desc}
                        </div>
                      </div>
                      {isChecked && <Check className="w-4 h-4 shrink-0 ml-2 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* RARITY OPTIONS */}
          {activeCategory === 'rarity' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  Filter by Vehicle Rarity:
                </span>
                {rarityFilter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => onSelectRarity('all')}
                    className="text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 underline cursor-pointer"
                  >
                    Reset Rarity
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {RARITIES.map((r) => {
                  const isChecked = rarityFilter.toLowerCase() === r.id.toLowerCase();
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => onSelectRarity(r.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer border ${
                        isChecked
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 font-semibold shadow-xs'
                          : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${r.id === 'all' ? 'bg-zinc-400' : 'bg-current'}`} />
                        <span>{r.label}</span>
                      </div>
                      {isChecked && <Check className="w-4 h-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* COLOUR OPTIONS */}
          {activeCategory === 'colour' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  Filter Collected Cars by Discovered Colour:
                </span>
                {colourFilter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => onSelectColour('all')}
                    className="text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 underline cursor-pointer"
                  >
                    Reset Colour
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {COMMON_COLOURS.map((col) => {
                  const isChecked = colourFilter.toLowerCase() === col.id.toLowerCase();
                  return (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => onSelectColour(col.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer border ${
                        isChecked
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 font-semibold shadow-xs'
                          : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {col.hex ? (
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20 dark:border-white/20 shadow-2xs"
                            style={{ backgroundColor: col.hex }}
                          />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        )}
                        <span>{col.label}</span>
                      </div>
                      {isChecked && <Check className="w-4 h-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ERA OPTIONS */}
          {activeCategory === 'era' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  Filter by Era Introduced:
                </span>
                {eraFilter !== 'all' && (
                  <button
                    type="button"
                    onClick={() => onSelectEra('all')}
                    className="text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 underline cursor-pointer"
                  >
                    Reset Era
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {ERAS.map((item) => {
                  const isChecked = eraFilter === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectEra(item.id)}
                      className={`w-full flex items-start justify-between p-3 rounded-xl text-left transition-all cursor-pointer border ${
                        isChecked
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 font-semibold shadow-xs'
                          : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold">{item.label}</div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            isChecked ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'
                          }`}
                        >
                          {item.desc}
                        </div>
                      </div>
                      {isChecked && <Check className="w-4 h-4 shrink-0 ml-2 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SORT OPTIONS */}
          {activeCategory === 'sort' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  Sort Garage Models:
                </span>
                {sortOption !== 'default' && (
                  <button
                    type="button"
                    onClick={() => onSelectSort('default')}
                    className="text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 underline cursor-pointer"
                  >
                    Reset Sort
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {SORTS.map((so) => {
                  const isChecked = sortOption === so.id;
                  return (
                    <button
                      key={so.id}
                      type="button"
                      onClick={() => onSelectSort(so.id)}
                      className={`w-full flex items-start justify-between p-3 rounded-xl text-left transition-all cursor-pointer border ${
                        isChecked
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 font-semibold shadow-xs'
                          : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold">{so.label}</div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            isChecked ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'
                          }`}
                        >
                          {so.desc}
                        </div>
                      </div>
                      {isChecked && <Check className="w-4 h-4 shrink-0 ml-2 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Reset All button and Apply button */}
        <div className="p-3.5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center gap-2">
          <button
            type="button"
            onClick={onResetAll}
            disabled={activeFiltersCount === 0}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
              activeFiltersCount > 0
                ? 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-2xs'
                : 'bg-zinc-100 dark:bg-zinc-900/40 text-zinc-400 dark:text-zinc-600 border-transparent cursor-not-allowed'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-xs cursor-pointer text-center"
          >
            View {totalMatchingCars} Models
          </button>
        </div>
      </div>
    </div>
  );
}
