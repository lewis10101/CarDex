import React, { useState } from 'react';
import { X, RotateCcw, Check, Globe, Sparkles, Trophy, ArrowUpDown } from 'lucide-react';
import { CarRarity } from '../../types';

export type CollectionSortOption = 'name-asc' | 'name-desc' | 'cars-count' | 'completion-desc' | 'scanned-desc';
export type CollectionStatusFilter = 'all' | 'collected' | 'mastered' | 'in-progress' | 'uncollected';

export type CollectionFilterCategory = 'region' | 'rarity' | 'status';

interface RegionOption {
  id: string;
  label: string;
  count: number;
}

interface CollectionFilterModalProps {
  isOpen: boolean;
  initialCategory?: CollectionFilterCategory;
  regions: RegionOption[];
  selectedRegion: string;
  selectedRarity: string;
  selectedStatus: CollectionStatusFilter;
  totalMatchingBrands: number;
  onSelectRegion: (region: string) => void;
  onSelectRarity: (rarity: string) => void;
  onSelectStatus: (status: CollectionStatusFilter) => void;
  onResetAll: () => void;
  onClose: () => void;
}

const RARITIES = [
  { id: 'all', label: 'All Rarities', color: 'text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800' },
  { id: 'Legendary', label: 'Legendary', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/60' },
  { id: 'Ultra Rare', label: 'Ultra Rare', color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-700/60' },
  { id: 'Epic', label: 'Epic', color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700/60' },
  { id: 'Rare', label: 'Rare', color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700/60' },
  { id: 'Uncommon', label: 'Uncommon', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/60' },
  { id: 'Common', label: 'Common', color: 'text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700' },
];

const STATUS_OPTIONS: { id: CollectionStatusFilter; label: string; desc: string }[] = [
  { id: 'all', label: 'All Garages', desc: 'Show all 140+ manufacturer brands' },
  { id: 'collected', label: 'Collected (>0)', desc: 'Garages where you own at least 1 car' },
  { id: 'in-progress', label: 'In Progress', desc: 'Garages with collected cars but not yet mastered' },
  { id: 'mastered', label: 'Mastered (100%)', desc: 'Garages where you have collected every car' },
  { id: 'uncollected', label: 'Unstarted (0%)', desc: 'Garages with zero scanned cars yet' },
];

const SORT_OPTIONS: { id: CollectionSortOption; label: string; desc: string }[] = [
  { id: 'name-asc', label: 'Name (A → Z)', desc: 'Alphabetical order from A to Z' },
  { id: 'name-desc', label: 'Name (Z → A)', desc: 'Reverse alphabetical order' },
  { id: 'cars-count', label: 'Most Models', desc: 'Brands with the most registered cars' },
  { id: 'completion-desc', label: 'Highest Completion %', desc: 'Most completed garages first' },
  { id: 'scanned-desc', label: 'Most Cars Scanned', desc: 'Total count of scanned cars in garage' },
];

export function CollectionFilterModal({
  isOpen,
  initialCategory = 'region',
  regions,
  selectedRegion,
  selectedRarity,
  selectedStatus,
  totalMatchingBrands,
  onSelectRegion,
  onSelectRarity,
  onSelectStatus,
  onResetAll,
  onClose,
}: CollectionFilterModalProps) {
  const [activeCategory, setActiveCategory] = useState<CollectionFilterCategory>(initialCategory);

  if (!isOpen) return null;

  const activeFiltersCount =
    (selectedRegion !== 'All' ? 1 : 0) +
    (selectedRarity !== 'all' ? 1 : 0) +
    (selectedStatus !== 'all' ? 1 : 0);

  const categories: { id: CollectionFilterCategory; label: string; icon: React.ComponentType<{ className?: string }>; active: boolean; displayValue: string }[] = [
    {
      id: 'region',
      label: 'Region',
      icon: Globe,
      active: selectedRegion !== 'All',
      displayValue: selectedRegion === 'All' ? 'All' : selectedRegion,
    },
    {
      id: 'rarity',
      label: 'Rarity',
      icon: Sparkles,
      active: selectedRarity !== 'all',
      displayValue: selectedRarity === 'all' ? 'All' : selectedRarity,
    },
    {
      id: 'status',
      label: 'Status',
      icon: Trophy,
      active: selectedStatus !== 'all',
      displayValue: selectedStatus === 'all' ? 'All' : selectedStatus,
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
              Filter Brands
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

        {/* Filter Category Tabs / Buttons */}
        <div className="px-4 pt-3 pb-2 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/50">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
            Select a filter to configure:
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-medium transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                      : 'bg-white dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 mb-1 ${isSelected ? 'text-white dark:text-zinc-900' : 'text-zinc-400'}`} />
                  <span className="text-[11px] leading-tight font-semibold">{cat.label}</span>
                  {cat.active && (
                    <span
                      className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-amber-400' : 'bg-zinc-900 dark:bg-white'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Options Display (Brings up the options for the clicked filter button) */}
        <div className="p-4 flex-1 overflow-y-auto max-h-[44vh] space-y-2">
          {/* REGION OPTIONS */}
          {activeCategory === 'region' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  Filter by Brand Origin Country:
                </span>
                {selectedRegion !== 'All' && (
                  <button
                    type="button"
                    onClick={() => onSelectRegion('All')}
                    className="text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 underline cursor-pointer"
                  >
                    Reset Region
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-1">
                {regions.map((reg) => {
                  const isChecked = selectedRegion === reg.id;
                  return (
                    <button
                      key={reg.id}
                      type="button"
                      onClick={() => onSelectRegion(reg.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer border ${
                        isChecked
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 font-semibold'
                          : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{reg.label}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            isChecked
                              ? 'bg-white/20 text-white dark:bg-zinc-900/20 dark:text-zinc-900'
                              : 'bg-zinc-200/70 dark:bg-zinc-700/70 text-zinc-600 dark:text-zinc-400'
                          }`}
                        >
                          {reg.count} brands
                        </span>
                      </div>
                      {isChecked && <Check className="w-4 h-4 shrink-0" />}
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
                  Filter Brands by Car Rarity:
                </span>
                {selectedRarity !== 'all' && (
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
                  const isChecked = selectedRarity.toLowerCase() === r.id.toLowerCase();
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

          {/* GARAGE STATUS OPTIONS */}
          {activeCategory === 'status' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  Filter by Garage Progress:
                </span>
                {selectedStatus !== 'all' && (
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
                {STATUS_OPTIONS.map((st) => {
                  const isChecked = selectedStatus === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => onSelectStatus(st.id)}
                      className={`w-full flex items-start justify-between p-3 rounded-xl text-left transition-all cursor-pointer border ${
                        isChecked
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-xs'
                          : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-xs">{st.label}</div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            isChecked ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'
                          }`}
                        >
                          {st.desc}
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
            View {totalMatchingBrands} Brands
          </button>
        </div>
      </div>
    </div>
  );
}
