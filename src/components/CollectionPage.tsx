import React, { useState, useEffect, useMemo } from 'react';
import { Search, Crown, SlidersHorizontal, X, RotateCcw, ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { BrandInfo, UserCarCollectionState, CarRarity } from '../types';
import {
  BRANDS_CATALOG,
  getCarCollectionState,
  getBrandCompletion,
} from '../data/collectionData';
import { checkAndAwardBrandMilestoneXp } from '../services/progressionService';
import { BrandWallTile } from './collection/BrandWallTile';
import { BrandGarageScreen } from './collection/BrandGarageScreen';
import {
  CollectionFilterModal,
  CollectionFilterCategory,
  CollectionSortOption,
  CollectionStatusFilter,
} from './collection/CollectionFilterModal';
import { resetScrollToTop } from '../utils/scrollHelper';
import { resolveParentModel, cleanToCoreModelName } from '../utils/modelResolver';
import { normalizeSearchText } from '../utils/textUtils';

const SORT_OPTIONS: { id: CollectionSortOption; label: string; shortLabel: string }[] = [
  { id: 'name-asc', label: 'Name (A → Z)', shortLabel: 'A → Z' },
  { id: 'name-desc', label: 'Name (Z → A)', shortLabel: 'Z → A' },
  { id: 'cars-count', label: 'Most Models', shortLabel: 'Models' },
  { id: 'completion-desc', label: 'Highest Completion %', shortLabel: 'Completion' },
  { id: 'scanned-desc', label: 'Most Cars Scanned', shortLabel: 'Scanned' },
];

interface CollectionPageProps {
  resetTrigger?: number;
}

export function CollectionPage({ resetTrigger }: CollectionPageProps) {
  const [collectionState, setCollectionState] = useState<Record<string, UserCarCollectionState>>({});
  const [selectedBrand, setSelectedBrand] = useState<BrandInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<CollectionStatusFilter>('all');
  const [selectedSort, setSelectedSort] = useState<CollectionSortOption>('name-asc');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState<boolean>(false);
  const [filterModalCategory, setFilterModalCategory] = useState<CollectionFilterCategory>('region');

  // Reset all filters only
  const resetFiltersOnly = () => {
    setSelectedRegion('All');
    setSelectedRarity('all');
    setSelectedStatus('all');
    setSelectedSort('name-asc');
  };

  // Reset to top of Collections with all brands shown and search cleared
  const resetToCollections = () => {
    setSelectedBrand(null);
    setSearchQuery('');
    resetFiltersOnly();
    resetScrollToTop(false);
  };

  // Open modal focused on a specific filter's options
  const openFilterModal = (category: CollectionFilterCategory = 'region') => {
    setFilterModalCategory(category);
    setIsFilterModalOpen(true);
  };

  // Reset when resetTrigger changes (e.g. user taps Collections tab button)
  useEffect(() => {
    if (resetTrigger !== undefined && resetTrigger > 0) {
      resetToCollections();
    }
  }, [resetTrigger]);

  // Listen for global reset event
  useEffect(() => {
    const handleResetEvent = () => {
      resetToCollections();
    };

    window.addEventListener('cardex_reset_collection', handleResetEvent);
    return () => {
      window.removeEventListener('cardex_reset_collection', handleResetEvent);
    };
  }, []);

  // Automatically reset scroll to top on mount or when opening/closing a brand garage
  useEffect(() => {
    resetScrollToTop(false);
  }, [selectedBrand]);

  const refreshState = () => {
    const state = getCarCollectionState();
    setCollectionState(state);
    try {
      BRANDS_CATALOG.forEach((brand) => {
        const comp = getBrandCompletion(brand, state);
        if (comp.collected > 0) {
          checkAndAwardBrandMilestoneXp(brand.name, comp.total, comp.collected);
        }
      });
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    refreshState();

    const handleCollectionUpdate = () => {
      refreshState();
    };

    const handleDataCleared = () => {
      refreshState();
    };

    window.addEventListener('cardex_collection_updated', handleCollectionUpdate);
    window.addEventListener('cardex_data_cleared', handleDataCleared);

    return () => {
      window.removeEventListener('cardex_collection_updated', handleCollectionUpdate);
      window.removeEventListener('cardex_data_cleared', handleDataCleared);
    };
  }, []);

  // Overall collection summary metrics
  const stats = useMemo(() => {
    let totalCars = 0;
    let collectedCars = 0;
    let brandMasteries = 0;

    BRANDS_CATALOG.forEach((brand) => {
      const { total, collected, isMastered } = getBrandCompletion(brand, collectionState);
      totalCars += total;
      collectedCars += collected;
      if (isMastered) brandMasteries += 1;
    });

    const overallPct = totalCars > 0 ? Math.round((collectedCars / totalCars) * 100) : 0;

    return { totalCars, collectedCars, brandMasteries, overallPct };
  }, [collectionState]);

  // Regional Filter Categories
  const regions = useMemo(() => {
    return [
      { id: 'All', label: 'All', count: BRANDS_CATALOG.length },
      { id: 'UK', label: 'British', count: BRANDS_CATALOG.filter((b) => b.country === 'United Kingdom').length },
      { id: 'Germany', label: 'German', count: BRANDS_CATALOG.filter((b) => b.country === 'Germany').length },
      { id: 'Italy', label: 'Italian', count: BRANDS_CATALOG.filter((b) => b.country === 'Italy').length },
      { id: 'France', label: 'French', count: BRANDS_CATALOG.filter((b) => b.country === 'France').length },
      { id: 'Japan', label: 'Japanese', count: BRANDS_CATALOG.filter((b) => b.country === 'Japan').length },
      { id: 'USA', label: 'American', count: BRANDS_CATALOG.filter((b) => b.country === 'USA' || b.country === 'United States').length },
      { id: 'Korea', label: 'Korean', count: BRANDS_CATALOG.filter((b) => b.country === 'South Korea').length },
      { id: 'China', label: 'Chinese', count: BRANDS_CATALOG.filter((b) => b.country === 'China').length },
      {
        id: 'Europe',
        label: 'Other Euro',
        count: BRANDS_CATALOG.filter((b) =>
          ['Sweden', 'Spain', 'Czech Republic', 'Croatia', 'Netherlands', 'Denmark', 'Austria', 'Switzerland', 'Russia', 'Malaysia'].includes(b.country)
        ).length,
      },
    ];
  }, []);

  const activeFiltersCount =
    (selectedRegion !== 'All' ? 1 : 0) +
    (selectedRarity !== 'all' ? 1 : 0) +
    (selectedStatus !== 'all' ? 1 : 0) +
    (selectedSort !== 'name-asc' ? 1 : 0);

  const hasActiveFilters = activeFiltersCount > 0 || Boolean(searchQuery.trim());

  // Filtered and sorted brands for Collections
  const filteredBrands = useMemo(() => {
    let list = BRANDS_CATALOG;

    // 1. Regional Filter
    if (selectedRegion === 'UK') {
      list = list.filter((b) => b.country === 'United Kingdom');
    } else if (selectedRegion === 'Germany') {
      list = list.filter((b) => b.country === 'Germany');
    } else if (selectedRegion === 'Italy') {
      list = list.filter((b) => b.country === 'Italy');
    } else if (selectedRegion === 'France') {
      list = list.filter((b) => b.country === 'France');
    } else if (selectedRegion === 'Japan') {
      list = list.filter((b) => b.country === 'Japan');
    } else if (selectedRegion === 'USA') {
      list = list.filter((b) => b.country === 'USA' || b.country === 'United States');
    } else if (selectedRegion === 'Korea') {
      list = list.filter((b) => b.country === 'South Korea');
    } else if (selectedRegion === 'China') {
      list = list.filter((b) => b.country === 'China');
    } else if (selectedRegion === 'Europe') {
      list = list.filter((b) =>
        ['Sweden', 'Spain', 'Czech Republic', 'Croatia', 'Netherlands', 'Denmark', 'Austria', 'Switzerland', 'Russia', 'Malaysia'].includes(b.country)
      );
    }

    // 2. Rarity Filter (brand must feature at least one car with this rarity)
    if (selectedRarity !== 'all') {
      list = list.filter((b) => b.cars.some((c) => c.rarity.toLowerCase() === selectedRarity.toLowerCase()));
    }

    // 3. Collection Status Filter
    if (selectedStatus === 'collected') {
      list = list.filter((b) => getBrandCompletion(b, collectionState).collected > 0);
    } else if (selectedStatus === 'mastered') {
      list = list.filter((b) => getBrandCompletion(b, collectionState).isMastered);
    } else if (selectedStatus === 'in-progress') {
      list = list.filter((b) => {
        const comp = getBrandCompletion(b, collectionState);
        return comp.collected > 0 && !comp.isMastered;
      });
    } else if (selectedStatus === 'uncollected') {
      list = list.filter((b) => getBrandCompletion(b, collectionState).collected === 0);
    }

    // 4. Search Query Filter
    if (searchQuery.trim()) {
      const rawQuery = normalizeSearchText(searchQuery);
      const resolved = resolveParentModel(rawQuery);
      const core = normalizeSearchText(cleanToCoreModelName(rawQuery));

      // Nationality / Demonym expansion (e.g. "german cars" -> Germany, "british cars" -> United Kingdom)
      const demonymMap: Record<string, string[]> = {
        british: ['United Kingdom'],
        uk: ['United Kingdom'],
        english: ['United Kingdom'],
        german: ['Germany'],
        germany: ['Germany'],
        deutsch: ['Germany'],
        italian: ['Italy'],
        italy: ['Italy'],
        french: ['France'],
        france: ['France'],
        japanese: ['Japan'],
        japan: ['Japan'],
        american: ['USA', 'United States'],
        america: ['USA', 'United States'],
        usa: ['USA', 'United States'],
        us: ['USA', 'United States'],
        korean: ['South Korea'],
        korea: ['South Korea'],
        chinese: ['China'],
        china: ['China'],
        swedish: ['Sweden'],
        sweden: ['Sweden'],
        spanish: ['Spain'],
        spain: ['Spain'],
        czech: ['Czech Republic'],
        dutch: ['Netherlands'],
      };

      const strippedQuery = rawQuery
        .replace(/\b(cars|car|brand|brands|supercars|supercar|motors|motor|vehicles|vehicle|auto|autos)\b/g, '')
        .trim()
        .replace(/\s+/g, ' ');

      const matchedCountries = demonymMap[rawQuery] || demonymMap[strippedQuery] || [];

      list = list.filter((b) => {
        const brandNameNorm = normalizeSearchText(b.name);
        const countryNorm = normalizeSearchText(b.country);

        // Direct country match from demonym
        if (matchedCountries.length > 0 && matchedCountries.includes(b.country)) {
          return true;
        }
        if (brandNameNorm.includes(rawQuery) || countryNorm.includes(rawQuery)) {
          return true;
        }
        if (strippedQuery && (brandNameNorm.includes(strippedQuery) || countryNorm.includes(strippedQuery))) {
          return true;
        }
        if (resolved) {
          if (resolved.brand && brandNameNorm === normalizeSearchText(resolved.brand)) {
            return true;
          }
          if (b.cars.some((c) => normalizeSearchText(c.name) === normalizeSearchText(resolved.parentModel))) {
            return true;
          }
        }
        if (core && core !== rawQuery) {
          if (b.cars.some((c) => normalizeSearchText(c.name).includes(core))) {
            return true;
          }
        }
        return b.cars.some((c) => {
          const carNameNorm = normalizeSearchText(c.name);
          return carNameNorm.includes(rawQuery) || (strippedQuery && carNameNorm.includes(strippedQuery));
        });
      });
    }

    // 5. Sorting
    return [...list].sort((a, b) => {
      if (selectedSort === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (selectedSort === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      if (selectedSort === 'cars-count') {
        return b.cars.length - a.cars.length;
      }
      if (selectedSort === 'completion-desc') {
        const compA = getBrandCompletion(a, collectionState).percentage;
        const compB = getBrandCompletion(b, collectionState).percentage;
        return compB - compA || a.name.localeCompare(b.name);
      }
      if (selectedSort === 'scanned-desc') {
        const compA = getBrandCompletion(a, collectionState).collected;
        const compB = getBrandCompletion(b, collectionState).collected;
        return compB - compA || a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [selectedRegion, selectedRarity, selectedStatus, searchQuery, selectedSort, collectionState]);

  // If a brand is selected, render the Brand Garage Screen
  if (selectedBrand) {
    return (
      <BrandGarageScreen
        brand={selectedBrand}
        collectionState={collectionState}
        onBack={() => setSelectedBrand(null)}
        onStateUpdate={refreshState}
      />
    );
  }

  return (
    <div className="w-full flex flex-col bg-zinc-50/40 dark:bg-zinc-950 pb-16">
      {/* Sticky Header with Title and Search */}
      <div className="sticky top-0 z-20 px-3.5 py-2.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800 shadow-xs">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-1.5">
              <span>Collections</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                {BRANDS_CATALOG.length} Brands
              </span>
            </h1>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {stats.collectedCars} / {stats.totalCars} cars collected ({stats.overallPct}%)
            </p>
          </div>

          {stats.brandMasteries > 0 && (
            <div className="flex items-center gap-1.5">
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-950/70 border border-yellow-300 dark:border-yellow-600/70 text-[10px] font-medium text-yellow-700 dark:text-yellow-300"
                title={`${stats.brandMasteries} Brand Masteries achieved`}
              >
                <Crown className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                <span>{stats.brandMasteries}</span>
              </span>
            </div>
          )}
        </div>

        {/* Minimal Search Bar */}
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 140+ brands (e.g. Lotus, Ferrari, BMW)..."
            className="w-full pl-8 pr-7 py-1.5 rounded-xl text-xs bg-zinc-100/90 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-zinc-400 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Filter Action Bar (Left: Filter button + Reset All; Right: Sort By button + dropdown) */}
        <div className="flex items-center justify-between pt-2 pb-0.5 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="collections-filter-button"
              onClick={() => openFilterModal('region')}
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

            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={resetFiltersOnly}
                className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors cursor-pointer whitespace-nowrap"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Right Side: Sort By button and dropdown */}
          <div className="relative">
            <button
              type="button"
              id="collections-sort-by-button"
              onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-100/90 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer whitespace-nowrap"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
              <span>Sort By</span>
              <ChevronDown className="w-3 h-3 text-zinc-400 ml-0.5" />
            </button>

            {isSortMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsSortMenuOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-52 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-xl z-40 p-1.5 space-y-0.5 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-2.5 py-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Sort Brands By
                  </div>
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setSelectedSort(opt.id);
                        setIsSortMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                        selectedSort === opt.id
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {selectedSort === opt.id && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <CollectionFilterModal
        isOpen={isFilterModalOpen}
        initialCategory={filterModalCategory}
        regions={regions}
        selectedRegion={selectedRegion}
        selectedRarity={selectedRarity}
        selectedStatus={selectedStatus}
        totalMatchingBrands={filteredBrands.length}
        onSelectRegion={setSelectedRegion}
        onSelectRarity={setSelectedRarity}
        onSelectStatus={setSelectedStatus}
        onResetAll={resetFiltersOnly}
        onClose={() => setIsFilterModalOpen(false)}
      />

      {/* Clean 3-Column Collections Brand Grid */}
      <div className="p-3">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2 px-0.5 font-mono">
          <span>{filteredBrands.length} brands matching</span>
          {hasActiveFilters && (
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-sans">
              Filtered view
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {filteredBrands.map((brand) => (
            <BrandWallTile
              key={brand.id}
              brand={brand}
              collectionState={collectionState}
              onClick={(b) => setSelectedBrand(b)}
            />
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="p-8 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 mt-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              No brands match your active filters.
            </p>
            <button
              type="button"
              onClick={resetToCollections}
              className="mt-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
