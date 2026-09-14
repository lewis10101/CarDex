import React, { useState } from 'react';
import { CarRarity, CarColor, SortMode, FilterCategory } from '../../types';
import { RotateCcw } from 'lucide-react';

interface FilterBarProps {
  rarityFilter: 'All' | CarRarity;
  onSelectRarity: (rarity: 'All' | CarRarity) => void;
  sortMode: SortMode;
  onSelectSort: (sort: SortMode) => void;
  colorFilter: 'All' | CarColor;
  onSelectColor: (color: 'All' | CarColor) => void;
  brandFilter?: 'All' | string;
  onSelectBrand?: (brand: 'All' | string) => void;
  availableBrands?: string[];
  showBrandFilter?: boolean;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const RARITIES: ('All' | CarRarity)[] = [
  'All',
  'Common',
  'Uncommon',
  'Rare',
  'Ultra Rare',
  'Legendary',
];

const SORTS: { id: SortMode; label: string }[] = [
  { id: 'default', label: 'Default' },
  { id: 'a-z', label: 'A → Z' },
  { id: 'z-a', label: 'Z → A' },
];

const PERFORMANCES: { id: SortMode; label: string }[] = [
  { id: 'highest-hp', label: 'Highest HP' },
  { id: 'fastest-0-60', label: 'Fastest 0–60' },
  { id: 'highest-top-speed', label: 'Highest Top Speed' },
];

const COLORS: ('All' | CarColor)[] = [
  'All',
  'Red',
  'Blue',
  'Black',
  'White',
  'Silver',
  'Grey',
  'Yellow',
  'Green',
];

export function FilterBar({
  rarityFilter,
  onSelectRarity,
  sortMode,
  onSelectSort,
  colorFilter,
  onSelectColor,
  brandFilter = 'All',
  onSelectBrand,
  availableBrands = [],
  showBrandFilter = true,
  onResetFilters,
  hasActiveFilters,
}: FilterBarProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('rarity');

  const categories: { id: FilterCategory; label: string; activeCount: boolean }[] = [
    { id: 'rarity', label: 'Rarity', activeCount: rarityFilter !== 'All' },
    {
      id: 'sort',
      label: 'Sort',
      activeCount: sortMode === 'a-z' || sortMode === 'z-a',
    },
    {
      id: 'performance',
      label: 'Performance',
      activeCount:
        sortMode === 'highest-hp' ||
        sortMode === 'fastest-0-60' ||
        sortMode === 'highest-top-speed',
    },
    ...(showBrandFilter
      ? [{ id: 'brand' as FilterCategory, label: 'Brand', activeCount: brandFilter !== 'All' }]
      : []),
    { id: 'color', label: 'Colour', activeCount: colorFilter !== 'All' },
  ];

  return (
    <div className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 py-2.5 px-3 space-y-2">
      {/* Category Selection Row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const isCurrent = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-2.5 py-1 rounded-full text-xs transition-colors whitespace-nowrap border ${
                  isCurrent
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 font-medium'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <span>{cat.label}</span>
                {cat.activeCount && (
                  <span
                    className={`ml-1.5 inline-block w-1.5 h-1.5 rounded-full ${
                      isCurrent
                        ? 'bg-white dark:bg-zinc-900'
                        : 'bg-zinc-900 dark:bg-zinc-100'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 shrink-0 transition-colors"
            title="Reset all filters"
          >
            <RotateCcw className="w-2.5 h-2.5" strokeWidth={1.5} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Sub-Category Options Row (Scrolls horizontally with small pill-style buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {/* Rarity Pills */}
        {activeCategory === 'rarity' &&
          RARITIES.map((r) => {
            const isSelected = rarityFilter === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => onSelectRarity(r)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] border whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-400 dark:border-zinc-600 font-medium'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                {r}
              </button>
            );
          })}

        {/* Sort Pills */}
        {activeCategory === 'sort' &&
          SORTS.map((s) => {
            const isSelected = sortMode === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectSort(s.id)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] border whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-400 dark:border-zinc-600 font-medium'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                {s.label}
              </button>
            );
          })}

        {/* Performance Pills */}
        {activeCategory === 'performance' &&
          PERFORMANCES.map((p) => {
            const isSelected = sortMode === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectSort(isSelected ? 'default' : p.id)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] border whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-400 dark:border-zinc-600 font-medium'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                {p.label}
              </button>
            );
          })}

        {/* Brand Pills */}
        {activeCategory === 'brand' && (
          <>
            <button
              type="button"
              onClick={() => onSelectBrand('All')}
              className={`px-2.5 py-0.5 rounded-full text-[11px] border whitespace-nowrap transition-colors ${
                brandFilter === 'All'
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-400 dark:border-zinc-600 font-medium'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              All Brands
            </button>
            {availableBrands.map((b) => {
              const isSelected = brandFilter === b;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => onSelectBrand(b)}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] border whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-400 dark:border-zinc-600 font-medium'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {b}
                </button>
              );
            })}
          </>
        )}

        {/* Colour Pills */}
        {activeCategory === 'color' &&
          COLORS.map((c) => {
            const isSelected = colorFilter === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => onSelectColor(c)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] border whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-400 dark:border-zinc-600 font-medium'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                {c === 'All' ? 'All Colours' : c}
              </button>
            );
          })}
      </div>
    </div>
  );
}
