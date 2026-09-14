import React, { useState, useEffect, useMemo } from 'react';
import {
  Warehouse,
  Car,
  Layers,
  Wrench,
  Sparkles,
  Clock,
  BarChart3,
  Crown,
  Heart,
  Target,
  Plus,
  Pin,
  PinOff,
  Edit3,
  Trash2,
  Check,
  X,
  Search,
  ChevronRight,
  Star,
  Calendar,
  Shield,
  Award,
  Tag,
  Flame,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { AppTab, CollectionCar, CarRarity } from '../../types';
import {
  isMyGarageEnabled,
  getMyGarageStats,
  getPinnedCarIds,
  togglePinCar,
  getCarNotes,
  saveCarNote,
  getUserCollections,
  createUserCollection,
  deleteUserCollection,
  addCarToCollection,
  removeCarFromCollection,
  getCustomCarMetadata,
  saveCustomCarMetadata,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getDailyTargetLogs,
  calculateSpotXp,
  WishlistItem,
  WishlistTag,
  MyGarageCollection,
} from '../../services/myGarageService';
import {
  getScannedCarsHistory,
  getCustomCarsList,
  getLocalCustomCars,
  ScannedCarEntry,
  CustomCarItem,
} from '../../data/userDataStorage';
import { BRANDS_CATALOG, getCarCollectionState, getBrandCompletion } from '../../data/collectionData';
import { BrandLogo } from '../collection/BrandLogo';
import { getDailyTargetState } from '../../data/dailyTargetService';
import { normalizeSearchText, matchCarQuery } from '../../utils/textUtils';
import { PlaylistDetailView } from './PlaylistDetailView';
import { CarDetailScreen } from '../collection/CarDetailScreen';
import { LevelProgressionModal } from '../progression/LevelProgressionModal';
import {
  getUserXp,
  getLevelForXp,
  awardCollectionActionXp,
  awardCarNoteXp,
} from '../../services/progressionService';

export type GarageSection =
  | 'cars'
  | 'collections'
  | 'custom'
  | 'highlights'
  | 'timeline'
  | 'stats'
  | 'brands'
  | 'wishlist'
  | 'daily-targets';

interface GaragePageProps {
  onNavigate?: (tab: AppTab) => void;
  resetTrigger?: number;
}

export function GaragePage({ onNavigate, resetTrigger }: GaragePageProps) {
  const [activeSection, setActiveSection] = useState<GarageSection>('cars');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Core Data
  const isEnabled = isMyGarageEnabled();
  const [collectionMap, setCollectionMap] = useState(() => getCarCollectionState());
  const [scannedHistory, setScannedHistory] = useState<ScannedCarEntry[]>(() => getScannedCarsHistory());
  const [customCars, setCustomCars] = useState<CustomCarItem[]>(() => getLocalCustomCars());
  const [pinnedCarIds, setPinnedCarIds] = useState<string[]>(() => getPinnedCarIds());
  const [userCollections, setUserCollections] = useState<MyGarageCollection[]>(() => getUserCollections());
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => getWishlist());
  const [targetLogs, setTargetLogs] = useState(() => getDailyTargetLogs());
  const [selectedCarForDetail, setSelectedCarForDetail] = useState<CollectionCar | null>(null);
  const [isProgressionModalOpen, setIsProgressionModalOpen] = useState(false);
  const stats = useMemo(() => getMyGarageStats(), [refreshTrigger, scannedHistory, collectionMap]);

  // Reset to initial My Cars view whenever bottom nav icon is tapped or reset triggered
  useEffect(() => {
    setActiveSection('cars');
    setSelectedPlaylistId(null);
    setSelectedCarForDetail(null);
  }, [resetTrigger]);

  useEffect(() => {
    const handleReset = () => {
      setActiveSection('cars');
      setSelectedPlaylistId(null);
      setSelectedCarForDetail(null);
    };
    window.addEventListener('cardex_reset_garage', handleReset);
    return () => {
      window.removeEventListener('cardex_reset_garage', handleReset);
    };
  }, []);

  // Catalog Flat Cars
  const allCatalogCars = useMemo(() => BRANDS_CATALOG.flatMap((b) => b.cars), []);

  // All Searchable Cars (Catalog + Custom cars for comprehensive search)
  const allSearchableCars = useMemo(() => {
    const list: CollectionCar[] = [...allCatalogCars];
    if (Array.isArray(customCars)) {
      customCars.forEach((c) => {
        const customId = c.id || `custom-${c.fullName}`;
        if (!list.some((existing) => existing.id === customId)) {
          list.push({
            id: customId,
            name: c.fullName || `${c.make || ''} ${c.model || ''}`.trim() || 'Custom Car',
            brand: c.make || 'Custom',
            country: 'Custom',
            yearIntroduced: new Date().getFullYear(),
            rarity: 'Rare' as CarRarity,
            image: '',
            colorVariants: [],
          });
        }
      });
    }
    return list;
  }, [allCatalogCars, customCars]);

  // Sync with storage events and fetch server custom cars safely
  useEffect(() => {
    let isMounted = true;
    const loadCustom = () => {
      getCustomCarsList()
        .then((list) => {
          if (isMounted && Array.isArray(list)) {
            setCustomCars(list);
          }
        })
        .catch(() => {});
    };

    loadCustom();

    const handleUpdate = () => {
      setCollectionMap(getCarCollectionState());
      setScannedHistory(getScannedCarsHistory());
      setCustomCars(getLocalCustomCars());
      loadCustom();
      setPinnedCarIds(getPinnedCarIds());
      setUserCollections(getUserCollections());
      setWishlist(getWishlist());
      setTargetLogs(getDailyTargetLogs());
      setRefreshTrigger((prev) => prev + 1);
    };

    window.addEventListener('cardex_garage_updated', handleUpdate);
    window.addEventListener('cardex_collection_updated', handleUpdate);
    window.addEventListener('cardex_scanned_history_updated', handleUpdate);
    window.addEventListener('cardex_daily_target_updated', handleUpdate);
    window.addEventListener('cardex_customization_updated', handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener('cardex_garage_updated', handleUpdate);
      window.removeEventListener('cardex_collection_updated', handleUpdate);
      window.removeEventListener('cardex_scanned_history_updated', handleUpdate);
      window.removeEventListener('cardex_daily_target_updated', handleUpdate);
      window.removeEventListener('cardex_customization_updated', handleUpdate);
    };
  }, []);

  // Active Pinned Cars list
  const pinnedCars = useMemo(() => {
    return allCatalogCars.filter((c) => pinnedCarIds.includes(c.id));
  }, [allCatalogCars, pinnedCarIds]);

  // Collected Cars list from state (empty if user has not spotted any car yet!)
  const collectedCars = useMemo(() => {
    return allCatalogCars.filter((c) => collectionMap[c.id]?.isCollected);
  }, [allCatalogCars, collectionMap]);

  // Modals state
  const [selectedCarForNote, setSelectedCarForNote] = useState<CollectionCar | null>(null);
  const [noteText, setNoteText] = useState('');

  const [isNewCollectionModalOpen, setIsNewCollectionModalOpen] = useState(false);
  const [newCollectionTitle, setNewCollectionTitle] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');
  const [selectedCarIdsForCollection, setSelectedCarIdsForCollection] = useState<string[]>([]);
  const [newCollectionSearch, setNewCollectionSearch] = useState('');

  // Active Playlist for Adding/Managing Cars
  const [activePlaylistForAddCars, setActivePlaylistForAddCars] = useState<MyGarageCollection | null>(null);
  const [playlistCarSearch, setPlaylistCarSearch] = useState('');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

  // Wishlist modal state
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [wishlistSearch, setWishlistSearch] = useState('');
  const [wishlistRarityFilter, setWishlistRarityFilter] = useState<string>('All');
  const [wishlistNote, setWishlistNote] = useState('');

  // Search in My Cars
  const [carSearchQuery, setCarSearchQuery] = useState('');
  const [carFilterType, setCarFilterType] = useState<string>('all');

  // Filtered cars - strictly based on user's collected cars, never showing random unowned cars!
  const filteredMyCars = useMemo(() => {
    let list = collectedCars;
    if (carSearchQuery.trim()) {
      list = list.filter((c) => matchCarQuery(c, carSearchQuery));
    }
    if (carFilterType === 'pinned') {
      list = list.filter((c) => pinnedCarIds.includes(c.id));
    } else if (carFilterType !== 'all') {
      list = list.filter((c) => c.rarity.toLowerCase() === carFilterType.toLowerCase());
    }
    return list;
  }, [collectedCars, carSearchQuery, carFilterType, pinnedCarIds]);

  // Brand Wall dynamic sorting:
  // 1. Fully mastered brands go straight to the top. If multiple mastered, maintain initial country order (England first).
  // 2. Unmastered brands with spotted cars (>0) come next, sorted by most cars spotted descending.
  // 3. Brands with 0 cars stay in their original catalog order (England first, etc.).
  const sortedBrandWall = useMemo(() => {
    return BRANDS_CATALOG.map((brand, initialIndex) => {
      const comp = getBrandCompletion(brand, collectionMap);
      return {
        brand,
        initialIndex,
        comp,
      };
    }).sort((a, b) => {
      // 1. Mastered brands go to top
      if (a.comp.isMastered && !b.comp.isMastered) return -1;
      if (!a.comp.isMastered && b.comp.isMastered) return 1;
      if (a.comp.isMastered && b.comp.isMastered) {
        return a.initialIndex - b.initialIndex;
      }

      // 2. Brands with spotted cars (> 0)
      if (a.comp.collected > 0 && b.comp.collected === 0) return -1;
      if (a.comp.collected === 0 && b.comp.collected > 0) return 1;
      if (a.comp.collected > 0 && b.comp.collected > 0) {
        if (b.comp.collected !== a.comp.collected) {
          return b.comp.collected - a.comp.collected;
        }
        return a.initialIndex - b.initialIndex;
      }

      // 3. Brands with 0 cars stay in initial catalog order
      return a.initialIndex - b.initialIndex;
    });
  }, [collectionMap]);

  // Handle Note Save
  const handleOpenNoteModal = (car: CollectionCar) => {
    setSelectedCarForNote(car);
    setNoteText(getCarNotes()[car.id] || '');
  };

  const handleSaveNote = () => {
    if (selectedCarForNote) {
      saveCarNote(selectedCarForNote.id, noteText);
      if (noteText.trim()) {
        awardCarNoteXp(selectedCarForNote.name);
      }
      setSelectedCarForNote(null);
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  // Handle Create Collection
  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionTitle.trim()) return;
    const title = newCollectionTitle.trim();
    createUserCollection(title, newCollectionDesc.trim(), undefined, selectedCarIdsForCollection);
    awardCollectionActionXp(title, 'create');
    setNewCollectionTitle('');
    setNewCollectionDesc('');
    setSelectedCarIdsForCollection([]);
    setIsNewCollectionModalOpen(false);
    setUserCollections(getUserCollections());
  };

  // Handle Add to Wishlist
  const handleAddWishlistCar = (car: CollectionCar) => {
    addToWishlist(car, (car.rarity.toLowerCase() as WishlistTag) || 'rare', wishlistNote.trim());
    setIsWishlistModalOpen(false);
    setWishlist(getWishlist());
    setWishlistNote('');
  };

  const sections: { id: GarageSection; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'cars', label: 'My Cars', icon: Car },
    { id: 'collections', label: 'Collections', icon: Layers },
    { id: 'custom', label: 'Custom Cars', icon: Wrench },
    { id: 'highlights', label: 'Highlights', icon: Sparkles },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'stats', label: 'My Stats', icon: BarChart3 },
    { id: 'brands', label: 'Brand Wall', icon: Crown },
    { id: 'wishlist', label: 'Dream Garage', icon: Heart },
    { id: 'daily-targets', label: 'Daily Targets', icon: Target },
  ];

  // Daily target state
  const dailyTarget = getDailyTargetState();

  if (!isEnabled) {
    return (
      <div className="w-full max-w-md mx-auto p-6 text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
          <Warehouse className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">My Garage is Disabled</h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          My Garage is currently turned off in Owner Controls.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setActiveSection('cars');
            setSelectedPlaylistId(null);
          }}
          className="flex items-center gap-2.5 text-left cursor-pointer group"
          title="Return to My Cars"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500/25 transition-colors">
            <Warehouse className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              My Garage
            </h1>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {stats.levelTitle} &bull; {stats.totalCarsSpotted} spotted
            </p>
          </div>
        </button>

        {/* Quick Spotter Rank Badge */}
        <button
          type="button"
          onClick={() => setIsProgressionModalOpen(true)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-amber-100 dark:bg-zinc-800 dark:hover:bg-amber-950/40 border border-zinc-200/80 dark:border-zinc-700/80 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
          title="View 50 Levels & Spotter Progression"
        >
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>Lvl {stats.levelNumber}</span>
        </button>
      </div>

      {/* Horizontal Scrollable Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              id={`garage-tab-${sec.id}`}
              onClick={() => setActiveSection(sec.id)}
              className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 1. MY CARS SECTION */}
      {/* ============================================================ */}
      {activeSection === 'cars' && (
        <div className="space-y-4">
          {/* Pinned / Featured Cars (Up to 3) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                Featured / Pinned Cars ({pinnedCars.length}/3)
              </span>
              <span className="text-[10px] text-zinc-500">Tap pin on any car</span>
            </div>

            {pinnedCars.length === 0 ? (
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850/60 border border-dashed border-zinc-300 dark:border-zinc-750 text-center space-y-1">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">No featured cars pinned yet</p>
                <p className="text-[11px] text-zinc-400">Pin your top 3 dream spots to show them here!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {pinnedCars.map((car) => {
                  const note = getCarNotes()[car.id];
                  return (
                    <div
                      key={car.id}
                      onClick={() => setSelectedCarForDetail(car)}
                      className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 transition-all space-y-2 relative cursor-pointer hover:scale-[1.01] active:scale-[0.99] shadow-xs overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePinCar(car.id);
                          setPinnedCarIds(getPinnedCarIds());
                        }}
                        className="absolute top-2.5 right-2.5 p-1 text-amber-500 hover:text-amber-600 rounded-full hover:bg-amber-50 dark:hover:bg-amber-950/40 cursor-pointer z-10"
                        title="Unpin car"
                      >
                        <PinOff className="w-3.5 h-3.5" />
                      </button>

                      {car.image ? (
                        <div className="w-full h-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50 mb-1">
                          <img
                            src={car.image}
                            alt={car.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1 flex items-center justify-center">
                          <BrandLogo brand={car.brand} className="w-6 h-6 object-contain" />
                        </div>
                      )}

                      <div>
                        <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">{car.name}</p>
                        <p className="text-[10px] text-zinc-500">{car.brand} &bull; {car.rarity}</p>
                      </div>

                      {note && (
                        <p className="text-[10px] text-zinc-600 dark:text-zinc-400 line-clamp-2 bg-zinc-50 dark:bg-zinc-800/80 p-1.5 rounded-lg italic">
                          "{note}"
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-0.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenNoteModal(car);
                          }}
                          className="text-[10px] text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-medium cursor-pointer"
                        >
                          <Edit3 className="w-2.5 h-2.5" />
                          <span>{note ? 'Edit Note' : 'Add Note'}</span>
                        </button>
                        <span className="text-[9px] text-zinc-400 font-medium">Tap to view</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Search & Filter Controls */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80">
                <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  value={carSearchQuery}
                  onChange={(e) => setCarSearchQuery(e.target.value)}
                  placeholder="Search my garage..."
                  className="w-full bg-transparent text-xs text-zinc-900 dark:text-zinc-100 outline-none placeholder:text-zinc-400"
                />
                {carSearchQuery && (
                  <button type="button" onClick={() => setCarSearchQuery('')} className="text-zinc-400 hover:text-zinc-600">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <select
                value={carFilterType}
                onChange={(e) => setCarFilterType(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 text-xs font-semibold text-zinc-700 dark:text-zinc-300 outline-none cursor-pointer"
              >
                <option value="all">All Rarities</option>
                <option value="pinned">Pinned Only</option>
                <option value="Common">Common</option>
                <option value="Uncommon">Uncommon</option>
                <option value="Rare">Rare</option>
                <option value="Epic">Epic</option>
                <option value="Legendary">Legendary</option>
                <option value="Ultra Rare">Ultra Rare</option>
              </select>
            </div>

            {/* Car Cards Grid */}
            {filteredMyCars.length === 0 ? (
              <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-850/60 border border-dashed border-zinc-300 dark:border-zinc-750 text-center space-y-2">
                <Car className="w-8 h-8 text-zinc-400 mx-auto" />
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {collectedCars.length === 0 ? 'No Cars in Garage Yet' : 'No Matching Cars Found'}
                </p>
                <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                  {collectedCars.length === 0
                    ? 'Spot cars on the road or scan them with your camera to build your real-world collection.'
                    : 'Try adjusting your search query or rarity filter.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                {filteredMyCars.map((car) => {
                  const isPinned = pinnedCarIds.includes(car.id);
                  const note = getCarNotes()[car.id];
                  const xp = calculateSpotXp(car.rarity);
                  const isCollected = collectionMap[car.id]?.isCollected;

                  return (
                    <div
                      key={car.id}
                      onClick={() => setSelectedCarForDetail(car)}
                      className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 transition-all flex flex-col justify-between space-y-2 shadow-xs cursor-pointer hover:scale-[1.01] active:scale-[0.99] relative overflow-hidden"
                    >
                      <div className="flex items-start justify-between relative z-10">
                        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1 flex items-center justify-center shrink-0">
                          <BrandLogo brand={car.brand} className="w-6 h-6 object-contain" />
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePinCar(car.id);
                              setPinnedCarIds(getPinnedCarIds());
                            }}
                            className={`p-1 rounded-md transition-colors cursor-pointer ${
                              isPinned
                                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                            }`}
                            title={isPinned ? 'Unpin' : 'Pin to top'}
                          >
                            <Pin className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenNoteModal(car);
                            }}
                            className={`p-1 rounded-md transition-colors cursor-pointer ${
                              note
                                ? 'text-blue-500 bg-blue-50 dark:bg-blue-950/40'
                                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                            }`}
                            title="Add / Edit note"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {car.image && (
                        <div className="w-full h-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50 relative z-10">
                          <img
                            src={car.image}
                            alt={car.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="min-w-0 relative z-10">
                        <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">{car.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[10px] font-semibold text-zinc-500">{car.brand}</span>
                          <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                            {car.rarity || 'Common'}
                          </span>
                        </div>
                      </div>

                      {note && (
                        <p className="text-[10px] text-zinc-600 dark:text-zinc-400 line-clamp-2 bg-zinc-50 dark:bg-zinc-800/60 p-1 rounded italic relative z-10">
                          "{note}"
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[10px] pt-1 border-t border-zinc-100 dark:border-zinc-800 text-zinc-500 relative z-10">
                        <span>+{xp} XP</span>
                        <span className={isCollected ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-zinc-400'}>
                          {isCollected ? 'Spotted' : 'Catalog'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. MY COLLECTIONS SECTION (User Playlists) */}
      {/* ============================================================ */}
      {activeSection === 'collections' && (
        <div className="space-y-4">
          {(() => {
            const activePlaylist = selectedPlaylistId
              ? userCollections.find((c) => c.id === selectedPlaylistId)
              : null;

            if (activePlaylist) {
              return (
                <PlaylistDetailView
                  playlist={activePlaylist}
                  allSearchableCars={allSearchableCars}
                  collectionMap={collectionMap}
                  onBack={() => setSelectedPlaylistId(null)}
                  onPlaylistUpdated={() => {
                    setUserCollections(getUserCollections());
                    setRefreshTrigger((prev) => prev + 1);
                  }}
                  onOpenAddCars={() => {
                    setActivePlaylistForAddCars(activePlaylist);
                    setPlaylistCarSearch('');
                  }}
                />
              );
            }

            return (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                      My Playlists &amp; Collections
                    </h2>
                    <p className="text-[11px] text-zinc-500">
                      Tap any playlist to open and view all cars
                    </p>
                  </div>

                  <button
                    type="button"
                    id="new-collection-button"
                    onClick={() => setIsNewCollectionModalOpen(true)}
                    className="text-xs px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New List</span>
                  </button>
                </div>

                {userCollections.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-850/60 border border-dashed border-zinc-300 dark:border-zinc-750 text-center space-y-2">
                    <Layers className="w-8 h-8 text-zinc-400 mx-auto" />
                    <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      No Custom Collections Yet
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      Group cars into custom lists like "Track Weapons", "Weekend Cruisers", or "90s JDM Icons".
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsNewCollectionModalOpen(true)}
                      className="mt-2 text-xs px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium cursor-pointer"
                    >
                      Create First Collection
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {userCollections.map((col) => {
                      const carsInCol = allSearchableCars.filter((c) => col.carIds.includes(c.id));
                      return (
                        <div
                          key={col.id}
                          onClick={() => setSelectedPlaylistId(col.id)}
                          className="group p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-amber-400/70 dark:hover:border-amber-500/50 space-y-3 shadow-xs transition-all cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div className="min-w-0 flex-1 pr-2">
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                  {col.title}
                                </h3>
                                <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                              </div>
                              {col.description && (
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                                  {col.description}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                onClick={() => {
                                  setActivePlaylistForAddCars(col);
                                  setPlaylistCarSearch('');
                                }}
                                className="text-[11px] px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedPlaylistId(col.id)}
                                className="text-[11px] px-2.5 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <span>View ({col.carIds.length})</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  deleteUserCollection(col.id);
                                  setUserCollections(getUserCollections());
                                }}
                                className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors cursor-pointer"
                                title="Delete collection"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {carsInCol.length > 0 ? (
                            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                              {carsInCol.map((c) => (
                                <div
                                  key={c.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCarForDetail(c);
                                  }}
                                  className="shrink-0 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[11px] font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 hover:bg-amber-100 dark:hover:bg-amber-950/40 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
                                  title="View car details, photo and stats"
                                >
                                  <span className="truncate max-w-[130px]">{c.name}</span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeCarFromCollection(col.id, c.id);
                                      setUserCollections(getUserCollections());
                                    }}
                                    className="text-zinc-400 hover:text-red-500 cursor-pointer"
                                    title="Remove from playlist"
                                  >
                                    <X className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center justify-between pt-1">
                              <p className="text-[11px] text-zinc-400 italic">
                                Tap to open playlist and add cars.
                              </p>
                              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                                <span>Open Playlist</span>
                                <ChevronRight className="w-3 h-3" />
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. MY CUSTOM CARS SECTION */}
      {/* ============================================================ */}
      {activeSection === 'custom' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                My Custom Cars ({(Array.isArray(customCars) ? customCars : []).length})
              </h2>
              <p className="text-[11px] text-zinc-500">
                Unique vehicles and personal builds you have added to your garage
              </p>
            </div>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('collection')}
                className="text-xs px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-colors cursor-pointer"
              >
                Explore Catalog
              </button>
            )}
          </div>

          {(!Array.isArray(customCars) || customCars.length === 0) ? (
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-850/60 border border-dashed border-zinc-300 dark:border-zinc-750 text-center space-y-2">
              <Wrench className="w-8 h-8 text-zinc-400 mx-auto" />
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">No Custom Cars Found</p>
              <p className="text-[11px] text-zinc-500 max-w-sm mx-auto">
                When you add custom vehicle models via the Scanner or add custom community cars, they will appear here with custom tags, notes, and specs.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {customCars.map((car) => {
                const carId = car.id || `custom-${car.fullName}`;
                const meta = getCustomCarMetadata(carId) || {};
                const carName =
                  (car as any).name ||
                  car.fullName ||
                  `${car.make || ''} ${car.model || ''}`.trim() ||
                  'Custom Car';
                const brandName = (car as any).brand || car.make || 'Custom';
                const addedDate = car.addedAt
                  ? new Date(car.addedAt).toLocaleDateString()
                  : 'Recently';

                const matchedCar: CollectionCar = {
                  id: carId,
                  name: carName,
                  brand: brandName,
                  country: 'Custom',
                  yearIntroduced: 2024,
                  rarity: 'Rare' as CarRarity,
                  image: (car as any).image || (car as any).imageThumbnail || '',
                  colorVariants: [{ name: 'Custom Spec', baseColor: 'Custom', hex: '#EAB308' }],
                  category: car.category || 'Custom Build',
                  trivia: meta.notes || `Custom vehicle logged in your garage on ${addedDate}.`,
                };

                return (
                  <div
                    key={carId}
                    onClick={() => setSelectedCarForDetail(matchedCar)}
                    className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-amber-400/60 dark:hover:border-amber-500/40 space-y-2 shadow-xs cursor-pointer transition-all hover:scale-[1.005]"
                    title="Click to view details, photo, and stats"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{carName}</h3>
                          <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400">
                            {car.category || 'Custom'}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500">{brandName} &bull; {car.model || 'Special Build'}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-zinc-400 block">{addedDate}</span>
                        <span className="text-[9px] text-amber-600 dark:text-amber-400 font-medium">Tap to view</span>
                      </div>
                    </div>

                    {meta.notes && (
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/80 p-2 rounded-xl italic">
                        "{meta.notes}"
                      </p>
                    )}

                    {meta.tags && meta.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {meta.tags.map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. MY HIGHLIGHTS SECTION */}
      {/* ============================================================ */}
      {activeSection === 'highlights' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Spotter Highlights &amp; Milestones
            </h2>
            <p className="text-[11px] text-zinc-500">Your top achievements and proudest sightings</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Rarest Spot */}
            <div className="p-4 rounded-2xl bg-linear-to-br from-amber-500/10 to-amber-600/5 dark:from-amber-950/30 dark:to-zinc-900 border border-amber-300/50 dark:border-amber-800/40 space-y-2">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                  Highest Rarity Spot
                </span>
              </div>
              {stats.highlights.rarestCar ? (
                <>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {stats.highlights.rarestCar.name}
                  </p>
                  <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                    {stats.highlights.rarestCar.rarity} Tier
                  </span>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-zinc-400 italic">
                    No cars spotted yet
                  </p>
                  <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                    Awaiting First Spot
                  </span>
                </>
              )}
            </div>

            {/* First Ever Spot */}
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                  First Car Spotted
                </span>
              </div>
              {stats.highlights.firstScannedCar ? (
                <>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {stats.highlights.firstScannedCar.carName}
                  </p>
                  <p className="text-[10px] text-zinc-400">
                    The spark that started your CarDex journey
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-zinc-400 italic">
                    No scans logged yet
                  </p>
                  <p className="text-[10px] text-zinc-400">
                    Scan your first car to log this milestone
                  </p>
                </>
              )}
            </div>

            {/* Favorite Brand */}
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                  Favorite Brand
                </span>
              </div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {stats.mostSpottedBrand && stats.mostSpottedBrand !== 'None' ? stats.mostSpottedBrand : 'None yet'}
              </p>
              <p className="text-[10px] text-zinc-400">Most frequent manufacturer in your garage</p>
            </div>

            {/* Spotting Streak */}
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                  Spotting Streak
                </span>
              </div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {stats.spottingStreak > 0 ? `${stats.spottingStreak} Days Active` : '0 Days'}
              </p>
              <p className="text-[10px] text-zinc-400">Consistently tracking cars on the street</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. MY SPOTTING TIMELINE SECTION */}
      {/* ============================================================ */}
      {activeSection === 'timeline' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Spotting Feed &amp; Timeline
            </h2>
            <p className="text-[11px] text-zinc-500">Chronological history of every sighting</p>
          </div>

          {scannedHistory.length === 0 ? (
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-850/60 border border-dashed border-zinc-300 dark:border-zinc-750 text-center space-y-2">
              <Clock className="w-8 h-8 text-zinc-400 mx-auto" />
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">No Scans Recorded</p>
              <p className="text-[11px] text-zinc-500">
                Snap cars with the Scanner to build your live chronological timeline.
              </p>
            </div>
          ) : (
            <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
              {scannedHistory.map((entry, idx) => {
                const dateStr = new Date(entry.scannedAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });
                const timeStr = new Date(entry.scannedAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                const matchedCar: CollectionCar = allSearchableCars.find(
                  (c) => matchCarQuery(c, entry.carName) || (entry.model && matchCarQuery(c, entry.model))
                ) || {
                  id: entry.id || `scanned-${entry.carName}-${idx}`,
                  name: entry.carName,
                  brand: entry.make || 'Spotted Vehicle',
                  country: 'Global',
                  yearIntroduced: 2023,
                  rarity: 'Rare' as CarRarity,
                  image: entry.imageThumbnail || '',
                  colorVariants: [{ name: 'Spotted Spec', baseColor: 'Standard', hex: '#3B82F6' }],
                  category: 'Street Spot',
                  trivia: `Recorded in your spotting journal on ${dateStr} at ${timeStr}.`,
                };

                return (
                  <div key={entry.id || idx} className="flex items-start gap-3 pl-1 relative">
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold z-10 shrink-0">
                      {idx + 1}
                    </div>

                    <div
                      onClick={() => setSelectedCarForDetail(matchedCar)}
                      className="flex-1 p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2 shadow-xs cursor-pointer hover:border-amber-400/60 dark:hover:border-amber-500/40 transition-all hover:scale-[1.005]"
                      title="Click to view car info, photo, and stats"
                    >
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1 pr-2">
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block truncate">
                            {entry.carName}
                          </span>
                          <p className="text-[11px] text-zinc-500 truncate">
                            {entry.make} {entry.model && `(${entry.model})`}
                          </p>
                        </div>
                        <span className="text-[10px] text-zinc-400 shrink-0">{timeStr} &bull; {dateStr}</span>
                      </div>

                      {entry.imageThumbnail && (
                        <div className="w-full h-24 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700/50">
                          <img
                            src={entry.imageThumbnail}
                            alt={entry.carName}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1 text-[10px] text-zinc-500 border-t border-zinc-100 dark:border-zinc-800">
                        <span className="text-amber-600 dark:text-amber-400 font-medium">Tap to view details</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Confirmed Spot</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* 6. MY STATS SECTION */}
      {/* ============================================================ */}
      {activeSection === 'stats' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Garage Analytics &amp; XP
            </h2>
            <p className="text-[11px] text-zinc-500">Key metrics on your car spotting career</p>
          </div>

          {/* Level Progress */}
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                {stats.levelTitle} (Level {stats.levelNumber})
              </span>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                {stats.totalCarsSpotted} / {stats.nextThreshold} Spots
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${stats.progressPercent}%` }}
              />
            </div>
          </div>

          {/* 4 Stat Boxes */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-850/80 border border-zinc-200/70 dark:border-zinc-750">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Total Spots</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{stats.totalCarsSpotted}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-850/80 border border-zinc-200/70 dark:border-zinc-750">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Total Garage XP</p>
              <p className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                {(stats.totalCarsSpotted * 125).toLocaleString()} XP
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-850/80 border border-zinc-200/70 dark:border-zinc-750">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Active Streak</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{stats.spottingStreak}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-850/80 border border-zinc-200/70 dark:border-zinc-750">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">XP Velocity</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{stats.xpPerDay}</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 7. MY BRAND WALL SECTION */}
      {/* ============================================================ */}
      {activeSection === 'brands' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              My Brand Wall ({BRANDS_CATALOG.length} Brands)
            </h2>
            <p className="text-[11px] text-zinc-500">Every marque you have encountered on the road</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {sortedBrandWall.map(({ brand, comp }) => {
              const hasSpotted = comp.collected > 0;
              const isMastered = comp.isMastered;

              return (
                <div
                  key={brand.name}
                  className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center text-center space-y-1.5 shadow-xs relative ${
                    isMastered
                      ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-400/80 dark:border-amber-600/70 ring-1 ring-amber-400/30'
                      : hasSpotted
                      ? 'bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800'
                      : 'bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200/50 dark:border-zinc-800/40 opacity-60'
                  }`}
                >
                  {isMastered && (
                    <span className="absolute top-2 right-2 text-amber-500 flex items-center gap-0.5" title="Brand Mastered!">
                      <Crown className="w-3.5 h-3.5" />
                    </span>
                  )}

                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1.5 flex items-center justify-center">
                    <BrandLogo brand={brand.name} className="w-8 h-8 object-contain" />
                  </div>

                  <p className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 truncate w-full">
                    {brand.name}
                  </p>

                  <span
                    className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                      isMastered
                        ? 'bg-amber-500 text-white font-bold'
                        : hasSpotted
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                        : 'bg-zinc-200/60 dark:bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {comp.collected}/{comp.total} {isMastered ? 'Mastered' : ''}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 8. MY DREAM GARAGE (WISHLIST) */}
      {/* ============================================================ */}
      {activeSection === 'wishlist' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Dream Garage &amp; Wishlist ({wishlist.length})
              </h2>
              <p className="text-[11px] text-zinc-500">Cars you are hunting for in the wild</p>
            </div>

            <button
              type="button"
              id="add-wishlist-button"
              onClick={() => setIsWishlistModalOpen(true)}
              className="text-xs px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Wishlist</span>
            </button>
          </div>

          {wishlist.length === 0 ? (
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-850/60 border border-dashed border-zinc-300 dark:border-zinc-750 text-center space-y-2">
              <Heart className="w-8 h-8 text-rose-400 mx-auto" />
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Your Wishlist is Empty</p>
              <p className="text-[11px] text-zinc-500">
                Add cars you dream of seeing. When you finally spot them, they get a gold "Wishlist Found!" badge!
              </p>
              <button
                type="button"
                onClick={() => setIsWishlistModalOpen(true)}
                className="mt-2 text-xs px-3 py-1.5 rounded-lg bg-rose-600 text-white font-medium cursor-pointer"
              >
                Add Your Dream Car
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {wishlist.map((item) => {
                const isFound = collectionMap[item.carId]?.isCollected;
                return (
                  <div
                    key={item.carId}
                    className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2 shadow-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1 flex items-center justify-center shrink-0">
                          <BrandLogo brand={item.brand} className="w-6 h-6 object-contain" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{item.carName}</h3>
                            {isFound ? (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-2.5 h-2.5" /> Owned in Garage
                              </span>
                            ) : (
                              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                Not in Garage
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-zinc-500 mt-0.5">{item.brand} &bull; {item.rarity || 'Rare'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isFound ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Found!
                          </span>
                        ) : (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.rarity === 'Legendary'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-300 dark:border-amber-700'
                              : item.rarity === 'Ultra Rare'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-400 border border-purple-300 dark:border-purple-700'
                              : item.rarity === 'Epic'
                              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-300 dark:border-indigo-700'
                              : item.rarity === 'Rare'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-300 dark:border-blue-700'
                              : item.rarity === 'Uncommon'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700'
                              : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                          }`}>
                            {item.rarity || 'Rare'}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            removeFromWishlist(item.carId);
                            setWishlist(getWishlist());
                          }}
                          className="p-1 text-zinc-400 hover:text-red-500 rounded cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {item.notes && (
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/60 p-2 rounded-xl italic">
                        "{item.notes}"
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* 9. MY DAILY TARGETS SECTION */}
      {/* ============================================================ */}
      {activeSection === 'daily-targets' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Daily Spotting Target
            </h2>
            <p className="text-[11px] text-zinc-500">Today's mystery mark &amp; historical streaks</p>
          </div>

          {/* Today's Target Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Today's Target</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  dailyTarget.completed
                    ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
                    : 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300'
                }`}
              >
                {dailyTarget.completed ? 'Completed (+500 XP)' : 'In Progress'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 p-2 flex items-center justify-center shrink-0">
                <BrandLogo brand={dailyTarget.targetBrand.name} className="w-9 h-9 object-contain" />
              </div>
              <div>
                <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {dailyTarget.targetBrand.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {dailyTarget.targetBrand.country} &bull; {dailyTarget.targetBrand.rarityTier.toUpperCase()} Tier
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
              <span>Skips Remaining: {dailyTarget.skipsRemaining}</span>
              <span>Daily Bounty: +{dailyTarget.xpBounty} XP</span>
            </div>
          </div>

          {/* Target History Logs */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Previous Target History</h3>
            {targetLogs.length === 0 ? (
              <p className="text-xs text-zinc-400 italic">No past target days recorded yet.</p>
            ) : (
              <div className="space-y-2">
                {targetLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/70 dark:border-zinc-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">{log.brandName}</span>
                      <p className="text-[10px] text-zinc-400">{log.date}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        log.completed
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                      }`}
                    >
                      {log.completed ? '+XP Claimed' : 'Missed'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* NOTE MODAL */}
      {/* ============================================================ */}
      {selectedCarForNote && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-5 space-y-4 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Personal Car Note</h3>
                <p className="text-xs text-zinc-500">{selectedCarForNote.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCarForNote(null)}
                className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Spotted in London, custom exhaust, sounded unreal..."
              rows={4}
              className="w-full p-3 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500/20"
            />

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveNote}
                className="flex-1 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs cursor-pointer"
              >
                Save Note
              </button>
              <button
                type="button"
                onClick={() => setSelectedCarForNote(null)}
                className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-600 dark:text-zinc-400 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* NEW COLLECTION MODAL */}
      {/* ============================================================ */}
      {isNewCollectionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-5 space-y-3.5 border border-zinc-200 dark:border-zinc-800 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Create New Collection</h3>
                <p className="text-xs text-zinc-500">Group cars into a custom playlist</p>
              </div>
              <button
                type="button"
                onClick={() => setIsNewCollectionModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCollection} className="space-y-3 flex-1 flex flex-col min-h-0">
              <div className="space-y-1 shrink-0">
                <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Collection Title</label>
                <input
                  type="text"
                  value={newCollectionTitle}
                  onChange={(e) => setNewCollectionTitle(e.target.value)}
                  placeholder="e.g. Track Day Monsters"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none"
                  required
                />
              </div>

              <div className="space-y-1 shrink-0">
                <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Description (Optional)</label>
                <input
                  type="text"
                  value={newCollectionDesc}
                  onChange={(e) => setNewCollectionDesc(e.target.value)}
                  placeholder="e.g. Pure race-bred performance"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none"
                />
              </div>

              {/* Cars Selection inside New Collection */}
              <div className="space-y-1.5 flex-1 min-h-0 flex flex-col">
                <div className="flex items-center justify-between shrink-0">
                  <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                    Add Cars ({selectedCarIdsForCollection.length} selected)
                  </label>
                  {selectedCarIdsForCollection.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedCarIdsForCollection([])}
                      className="text-[10px] text-zinc-400 hover:text-red-500 cursor-pointer"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 shrink-0">
                  <Search className="w-3 h-3 text-zinc-400 shrink-0" />
                  <input
                    type="text"
                    value={newCollectionSearch}
                    onChange={(e) => setNewCollectionSearch(e.target.value)}
                    placeholder="Search cars to include..."
                    className="w-full bg-transparent text-xs text-zinc-900 dark:text-zinc-100 outline-none"
                  />
                </div>

                <div className="flex-1 overflow-y-auto space-y-1 divide-y divide-zinc-100 dark:divide-zinc-800 pr-1 max-h-40">
                  {allSearchableCars
                    .filter((c) => {
                      if (!newCollectionSearch.trim()) return true;
                      return matchCarQuery(c, newCollectionSearch);
                    })
                    .slice(0, 30)
                    .map((c) => {
                      const isSelected = selectedCarIdsForCollection.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            setSelectedCarIdsForCollection((prev) =>
                              isSelected ? prev.filter((id) => id !== c.id) : [...prev, c.id]
                            );
                          }}
                          className={`w-full py-1.5 px-2 rounded-lg flex items-center justify-between text-left transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/15 text-amber-900 dark:text-amber-200'
                              : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">{c.name}</p>
                            <p className="text-[10px] text-zinc-400">{c.brand} &bull; {c.rarity}</p>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-amber-500 border-amber-500 text-white'
                                : 'border-zinc-300 dark:border-zinc-700'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 shrink-0">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs cursor-pointer"
                >
                  Create Collection ({selectedCarIdsForCollection.length})
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewCollectionModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-600 dark:text-zinc-400 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ADD CARS TO EXISTING PLAYLIST MODAL */}
      {/* ============================================================ */}
      {activePlaylistForAddCars && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-5 space-y-3.5 border border-zinc-200 dark:border-zinc-800 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Add Cars to &ldquo;{activePlaylistForAddCars.title}&rdquo;
                </h3>
                <p className="text-xs text-zinc-500">
                  {activePlaylistForAddCars.carIds.length} cars currently in this playlist
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePlaylistForAddCars(null)}
                className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 shrink-0">
              <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <input
                type="text"
                value={playlistCarSearch}
                onChange={(e) => setPlaylistCarSearch(e.target.value)}
                placeholder="Search models to add..."
                className="w-full bg-transparent text-xs text-zinc-900 dark:text-zinc-100 outline-none"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 divide-y divide-zinc-100 dark:divide-zinc-800 pr-1 max-h-72">
              {allSearchableCars
                .filter((c) => {
                  if (!playlistCarSearch.trim()) return true;
                  return matchCarQuery(c, playlistCarSearch);
                })
                .slice(0, 40)
                .map((c) => {
                  const isInPlaylist = activePlaylistForAddCars.carIds.includes(c.id);
                  return (
                    <div
                      key={c.id}
                      className="py-2 px-2 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-850 rounded-xl transition-colors"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">{c.name}</p>
                        <p className="text-[10px] text-zinc-500">{c.brand} &bull; {c.rarity}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (isInPlaylist) {
                            removeCarFromCollection(activePlaylistForAddCars.id, c.id);
                          } else {
                            addCarToCollection(activePlaylistForAddCars.id, c.id);
                          }
                          const updated = getUserCollections();
                          setUserCollections(updated);
                          const current = updated.find((u) => u.id === activePlaylistForAddCars.id);
                          if (current) setActivePlaylistForAddCars(current);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0 ${
                          isInPlaylist
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                            : 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                        }`}
                      >
                        {isInPlaylist ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
              <button
                type="button"
                onClick={() => setActivePlaylistForAddCars(null)}
                className="w-full py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ADD TO WISHLIST (DREAM GARAGE) MODAL */}
      {/* ============================================================ */}
      {isWishlistModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-5 space-y-4 border border-zinc-200 dark:border-zinc-800 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Add to Dream Garage</h3>
                <p className="text-xs text-zinc-500">Filter by rarity and pick a car for your hunting list</p>
              </div>
              <button
                type="button"
                onClick={() => setIsWishlistModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-600 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 shrink-0">
              <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <input
                type="text"
                value={wishlistSearch}
                onChange={(e) => setWishlistSearch(e.target.value)}
                placeholder="Search models or brands..."
                className="w-full bg-transparent text-xs text-zinc-900 dark:text-zinc-100 outline-none"
              />
            </div>

            {/* Rarity Filter Buttons (replacing dream/rare/must-spot labels) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 shrink-0">
              {['All', 'Common', 'Uncommon', 'Rare', 'Epic', 'Ultra Rare', 'Legendary'].map((rarity) => (
                <button
                  key={rarity}
                  type="button"
                  onClick={() => setWishlistRarityFilter(rarity)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
                    wishlistRarityFilter === rarity
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {rarity}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 divide-y divide-zinc-100 dark:divide-zinc-800 max-h-56">
              {allSearchableCars
                .filter((c) => {
                  if (wishlistRarityFilter !== 'All' && c.rarity.toLowerCase() !== wishlistRarityFilter.toLowerCase()) {
                    return false;
                  }
                  if (!wishlistSearch.trim()) return true;
                  return matchCarQuery(c, wishlistSearch);
                })
                .slice(0, 35)
                .map((c) => {
                  const isOwned = !!collectionMap[c.id]?.isCollected;
                  return (
                    <div
                      key={c.id}
                      className="py-2 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-850 px-2 rounded-xl cursor-pointer transition-colors"
                      onClick={() => handleAddWishlistCar(c)}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{c.name}</p>
                          {isOwned ? (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 shrink-0">
                              Owned in Garage
                            </span>
                          ) : (
                            <span className="text-[9px] font-medium px-1.5 py-0.2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 shrink-0">
                              Not in Garage
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-0.5">{c.brand} &bull; {c.rarity}</p>
                      </div>
                      <div className="p-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 shrink-0">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Car Detail Screen Modal */}
      {selectedCarForDetail && (
        <CarDetailScreen
          car={selectedCarForDetail}
          state={collectionMap[selectedCarForDetail.id]}
          onBack={() => setSelectedCarForDetail(null)}
          onStateUpdate={() => {
            setCollectionMap(getCarCollectionState());
          }}
        />
      )}

      {/* Level Progression Modal (50 levels) */}
      {isProgressionModalOpen && (
        <LevelProgressionModal
          isOpen={isProgressionModalOpen}
          onClose={() => setIsProgressionModalOpen(false)}
        />
      )}
    </div>
  );
}
