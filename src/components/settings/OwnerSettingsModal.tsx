import React, { useState, useEffect, useMemo } from 'react';
import {
  Lock,
  Unlock,
  ShieldCheck,
  RefreshCw,
  Target,
  Trash2,
  Sparkles,
  CheckCircle2,
  X,
  AlertTriangle,
  KeyRound,
  RotateCcw,
  Zap,
  Layers,
  Award,
  Palette,
  Car,
  Wrench,
  Flame,
  Search,
  Check,
  Info,
  ChevronRight,
  Plus,
  Crown,
  Database,
  Warehouse,
  Play,
  Heart,
} from 'lucide-react';
import {
  isMyGarageEnabled,
  setMyGarageEnabled,
  simulateAddSampleCarsToGarage,
  simulateAddSampleCollections,
  simulateAddSampleWishlist,
  resetMyGarageData,
} from '../../services/myGarageService';
import {
  getDailyTargetState,
  ownerRefreshSkips,
  ownerSetSkips,
  ownerForceTargetBrand,
  ownerRerollTarget,
  ownerToggleSpotted,
  ownerResetDailyTarget,
  getCuratedDailyBrandPool,
  addBrandToDrawPool,
  removeBrandFromDrawPool,
  updateBrandInDrawPool,
  saveCuratedDailyBrandPool,
  sortBrandsByRarity,
  createDailyTargetBrandFromCatalog,
  formatBrandDescription,
  TIER_CONFIG,
  BrandRarityTier,
  DailySpottingTargetState,
  DailyTargetBrand,
  getDailyTargetXpBounty,
} from '../../data/dailyTargetService';
import { ALL_BRANDS_CATALOG } from '../../data/brandsCatalog';
import {
  MODULAR_RESET_OPTIONS,
  ResetOptionDefinition,
} from '../../data/resetService';
import { BrandLogo } from '../collection/BrandLogo';
import { normalizeSearchText } from '../../utils/textUtils';
import { UserCarCollectionState } from '../../types';
import {
  getCarCollectionState,
  removeCarFromUserCollection,
  BRANDS_CATALOG,
} from '../../data/collectionData';
import {
  getUserXp,
  getLevelForXp,
  getStreakData,
  getCustomization,
  saveCustomization,
  ownerSetXp,
  ownerAddXp,
  ownerSetLevel,
  ownerResetProgression,
  ownerSetStreak,
  ownerResetStreak,
  ownerClearXpHistory,
  awardSpotXp,
  awardDailyTargetXp,
  LEVEL_DEFINITIONS,
  StreakData,
  CosmeticCustomization,
} from '../../services/progressionService';

const OWNER_PASSCODE = '258456';
const OWNER_AUTH_SESSION_KEY = 'cardex_owner_authenticated';

interface OwnerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGameReset?: () => void;
}

export function OwnerSettingsModal({
  isOpen,
  onClose,
  onGameReset,
}: OwnerSettingsModalProps) {
  // Authentication state - strictly auto-locks when leaving/closing the modal
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'draw-pool' | 'daily-target' | 'progression' | 'garage' | 'resets'>('draw-pool');

  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // My Garage feature toggle state in Owner Controls
  const [garageEnabled, setGarageEnabled] = useState<boolean>(() => isMyGarageEnabled());
  const [collectionStateSnapshot, setCollectionStateSnapshot] = useState<Record<string, UserCarCollectionState>>(() => getCarCollectionState());
  const [ownedCarsSearch, setOwnedCarsSearch] = useState('');

  // Progression & Level State in Owner Controls
  const [currentXp, setCurrentXp] = useState<number>(() => getUserXp());
  const [customXpInput, setCustomXpInput] = useState<string>('');
  const [targetLevelInput, setTargetLevelInput] = useState<number>(1);
  const [streakDaysInput, setStreakDaysInput] = useState<number>(() => getStreakData().currentStreak);
  const [streakData, setStreakData] = useState<StreakData>(() => getStreakData());
  const [customization, setCustomization] = useState<CosmeticCustomization>(() => getCustomization());

  const currentLevelInfo = useMemo(() => getLevelForXp(currentXp), [currentXp]);

  useEffect(() => {
    const handleProgressionUpdate = () => {
      const xp = getUserXp();
      setCurrentXp(xp);
      const strk = getStreakData();
      setStreakData(strk);
      setStreakDaysInput(strk.currentStreak);
      setCustomization(getCustomization());
    };
    window.addEventListener('cardex_xp_updated', handleProgressionUpdate);
    window.addEventListener('cardex_streak_updated', handleProgressionUpdate);
    window.addEventListener('cardex_customization_updated', handleProgressionUpdate);
    return () => {
      window.removeEventListener('cardex_xp_updated', handleProgressionUpdate);
      window.removeEventListener('cardex_streak_updated', handleProgressionUpdate);
      window.removeEventListener('cardex_customization_updated', handleProgressionUpdate);
    };
  }, []);

  useEffect(() => {
    const handleGarageUpdate = () => {
      setGarageEnabled(isMyGarageEnabled());
      setCollectionStateSnapshot(getCarCollectionState());
    };
    const handleCollectionUpdate = () => {
      setCollectionStateSnapshot(getCarCollectionState());
    };
    window.addEventListener('cardex_garage_updated', handleGarageUpdate);
    window.addEventListener('cardex_collection_updated', handleCollectionUpdate);
    return () => {
      window.removeEventListener('cardex_garage_updated', handleGarageUpdate);
      window.removeEventListener('cardex_collection_updated', handleCollectionUpdate);
    };
  }, []);

  // Target State
  const [targetState, setTargetState] = useState<DailySpottingTargetState>(() => getDailyTargetState());

  // Brand Draw Pool State
  const [drawPool, setDrawPool] = useState<DailyTargetBrand[]>(() => sortBrandsByRarity(getCuratedDailyBrandPool()));
  const [selectedTierFilter, setSelectedTierFilter] = useState<'all' | BrandRarityTier>('all');
  const [brandSearchQuery, setBrandSearchQuery] = useState('');

  // Track brands added in the current session so they stay at the top for now
  const [sessionAddedBrandIds, setSessionAddedBrandIds] = useState<string[]>([]);

  // Database Search & Add State
  const [dbSearchQuery, setDbSearchQuery] = useState('');
  const [pendingAddBrand, setPendingAddBrand] = useState<typeof ALL_BRANDS_CATALOG[0] | null>(null);
  const [pendingRarityTier, setPendingRarityTier] = useState<BrandRarityTier>('common');

  // Active Modular Reset Option for Confirmation Modal
  const [activeResetOption, setActiveResetOption] = useState<ResetOptionDefinition | null>(null);
  const [isExecutingReset, setIsExecutingReset] = useState(false);

  // Tab switching: Leaving draw pool or switching tabs resets temporary add state and resets rarity picker to common
  const handleTabChange = (tab: 'draw-pool' | 'daily-target' | 'progression' | 'garage' | 'resets') => {
    if (tab !== activeTab) {
      if (sessionAddedBrandIds.length > 0) {
        const sorted = sortBrandsByRarity(getCuratedDailyBrandPool());
        saveCuratedDailyBrandPool(sorted);
        setDrawPool(sorted);
        setSessionAddedBrandIds([]);
      }
      setPendingAddBrand(null);
      setPendingRarityTier('common');
      setDbSearchQuery('');
      setActiveTab(tab);
    }
  };

  const handleClose = () => {
    // Re-sort draw pool to its respective rarity so newly added cars filter down to their tier
    if (sessionAddedBrandIds.length > 0) {
      const sorted = sortBrandsByRarity(getCuratedDailyBrandPool());
      saveCuratedDailyBrandPool(sorted);
      setDrawPool(sorted);
      setSessionAddedBrandIds([]);
    }
    setPendingAddBrand(null);
    setPendingRarityTier('common');
    setDbSearchQuery('');
    setBrandSearchQuery('');
    setSelectedTierFilter('all');
    setIsAuthenticated(false);
    setPasscode('');
    setPasscodeError(false);
    setActiveResetOption(null);
    try {
      sessionStorage.removeItem(OWNER_AUTH_SESSION_KEY);
    } catch {
      // ignore
    }
    onClose();
  };

  // Auto-lock & reset when modal is closed or opened fresh
  useEffect(() => {
    if (!isOpen) {
      if (sessionAddedBrandIds.length > 0) {
        const sorted = sortBrandsByRarity(getCuratedDailyBrandPool());
        saveCuratedDailyBrandPool(sorted);
        setDrawPool(sorted);
        setSessionAddedBrandIds([]);
      }
      setPendingAddBrand(null);
      setPendingRarityTier('common');
      setDbSearchQuery('');
      setBrandSearchQuery('');
      setSelectedTierFilter('all');
      setIsAuthenticated(false);
      setPasscode('');
      setPasscodeError(false);
      setActiveResetOption(null);
      try {
        sessionStorage.removeItem(OWNER_AUTH_SESSION_KEY);
      } catch {
        // ignore
      }
    } else {
      setTargetState(getDailyTargetState());
      setDrawPool(sortBrandsByRarity(getCuratedDailyBrandPool()));
      setSessionAddedBrandIds([]);
      setPendingAddBrand(null);
      setPendingRarityTier('common');
      setDbSearchQuery('');
      setBrandSearchQuery('');
      setPasscode('');
      setPasscodeError(false);
      setActiveResetOption(null);
    }
  }, [isOpen]);

  // Handle ESC key to close and auto-lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Listen for daily target and draw pool updates
  useEffect(() => {
    const handleTargetUpdate = () => {
      setTargetState(getDailyTargetState());
    };
    const handlePoolUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<DailyTargetBrand[]>;
      if (customEvent.detail) {
        setDrawPool(customEvent.detail);
      } else {
        setDrawPool(getCuratedDailyBrandPool());
      }
    };

    window.addEventListener('cardex_daily_target_updated', handleTargetUpdate);
    window.addEventListener('cardex_draw_pool_updated', handlePoolUpdate);
    return () => {
      window.removeEventListener('cardex_daily_target_updated', handleTargetUpdate);
      window.removeEventListener('cardex_draw_pool_updated', handlePoolUpdate);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handleVerifyPasscode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passcode.trim() === OWNER_PASSCODE) {
      setIsAuthenticated(true);
      setPasscodeError(false);
      showToast('Owner access verified. Developer tools unlocked.');
    } else {
      setPasscodeError(true);
      setPasscode('');
    }
  };

  const handleLockOwnerMode = () => {
    setIsAuthenticated(false);
    setPasscode('');
    showToast('Owner mode locked.');
  };

  // Owned Cars computation for Owner deletion tool
  const ownedCarsList = useMemo(() => {
    const allCars = BRANDS_CATALOG.flatMap((b) => b.cars);
    const owned: Array<{
      car: typeof allCars[0];
      collectionInfo: UserCarCollectionState;
    }> = [];

    (Object.entries(collectionStateSnapshot) as [string, UserCarCollectionState][]).forEach(([carId, state]) => {
      if (state.isCollected) {
        const found = allCars.find((c) => c.id === carId);
        if (found) {
          owned.push({
            car: found,
            collectionInfo: state,
          });
        }
      }
    });

    if (!ownedCarsSearch.trim()) return owned;
    const q = ownedCarsSearch.toLowerCase().trim();
    return owned.filter(
      (item) =>
        item.car.name.toLowerCase().includes(q) ||
        item.car.brand.toLowerCase().includes(q) ||
        (item.collectionInfo.collectedColors || []).some((c) => c.toLowerCase().includes(q))
    );
  }, [collectionStateSnapshot, ownedCarsSearch]);

  const handleDeleteOwnedCar = (carId: string, carName: string) => {
    const success = removeCarFromUserCollection(carId);
    if (success) {
      setCollectionStateSnapshot(getCarCollectionState());
      showToast(`Removed "${carName}" from your collection.`);
    }
  };

  // Skip handlers
  const handleAddSkips = (count: number) => {
    const updated = ownerRefreshSkips(count);
    setTargetState(updated);
    showToast(`Added ${count} skips! (Current skips: ${updated.skipsRemaining})`);
  };

  const handleSetMaxSkips = () => {
    const updated = ownerSetSkips(99);
    setTargetState(updated);
    showToast('Set skips to 99 (Maximum developer testing allowance).');
  };

  // Daily target controls
  const handleRerollBrand = (forceTier?: BrandRarityTier) => {
    const updated = ownerRerollTarget(forceTier);
    setTargetState(updated);
    const tierName = forceTier ? TIER_CONFIG[forceTier].label : 'Random';
    showToast(`Rerolled target: ${updated.targetBrand.name} (${tierName})`);
  };

  const handleForceSelectBrand = (brand: DailyTargetBrand) => {
    const updated = ownerForceTargetBrand(brand.id);
    if (updated) {
      setTargetState(updated);
      showToast(`Force-set today’s daily target to ${brand.name}!`);
    }
  };

  const handleToggleSpotted = () => {
    const updated = ownerToggleSpotted();
    setTargetState(updated);
    const xp = updated.xpBounty || getDailyTargetXpBounty(updated.targetBrand.rarityTier);
    showToast(
      updated.completed
        ? `Target marked as Spotted! (+${xp.toLocaleString()} XP Claimed)`
        : 'Target marked as Unspotted.'
    );
  };

  const handleResetTargetDay = () => {
    const updated = ownerResetDailyTarget();
    setTargetState(updated);
    showToast('Daily target state reset to fresh day state.');
  };

  // Draw Pool Management Handlers
  const handleUpdateBrandTier = (brandId: string, newTier: BrandRarityTier) => {
    const isExotic = newTier === 'rare' || newTier === 'ultra-rare';
    let rarityAlias: 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' = 'Uncommon';
    if (newTier === 'mid-rarity') rarityAlias = 'Rare';
    else if (newTier === 'rare') rarityAlias = 'Epic';
    else if (newTier === 'ultra-rare') rarityAlias = 'Legendary';

    const updated = updateBrandInDrawPool(brandId, {
      rarityTier: newTier,
      isExotic,
      rarity: rarityAlias,
    });
    setDrawPool(updated);
    const brand = updated.find((b) => b.id.toLowerCase() === brandId.toLowerCase());
    showToast(`Updated ${brand?.name || brandId} rarity to ${TIER_CONFIG[newTier].label}!`);
  };

  const handleRemoveBrand = (brandId: string, brandName: string) => {
    const updated = removeBrandFromDrawPool(brandId);
    setDrawPool(updated);
    showToast(`Removed ${brandName} from daily draw pool.`);
  };

  const handleInitiateAddBrand = (catalogBrand: typeof ALL_BRANDS_CATALOG[0]) => {
    setPendingAddBrand(catalogBrand);
    setPendingRarityTier('common');
  };

  const handleConfirmAddBrandWithTier = (
    catalogBrand: typeof ALL_BRANDS_CATALOG[0],
    tier: BrandRarityTier
  ) => {
    const popularModels = catalogBrand.cars.map((c) => c.name).slice(0, 8);
    const tagline = `${catalogBrand.country} automotive icon, founded in ${catalogBrand.founded}.`;
    const hint = `Look for authentic ${catalogBrand.name} road cars and distinctive badging.`;

    const newBrand = createDailyTargetBrandFromCatalog(
      catalogBrand.name,
      catalogBrand.country,
      tier,
      popularModels,
      tagline,
      hint,
      catalogBrand.founded
    );

    const updated = addBrandToDrawPool(newBrand);
    setDrawPool(updated);
    // Pin this newly added brand at the top of the list for now while on this page
    setSessionAddedBrandIds((prev) => [newBrand.id, ...prev.filter((id) => id !== newBrand.id)]);
    setPendingAddBrand(null);
    setPendingRarityTier('common');
    setDbSearchQuery('');
    showToast(`Added ${catalogBrand.name} to daily draw pool as ${TIER_CONFIG[tier].label}!`);
  };

  // Modular Reset Execution
  const handleExecuteModularReset = async () => {
    if (!activeResetOption) return;
    const optionId = activeResetOption.id;
    setIsExecutingReset(true);
    try {
      const result = await activeResetOption.execute();
      showToast(result.message);
      setTargetState(getDailyTargetState());
      setDrawPool(sortBrandsByRarity(getCuratedDailyBrandPool()));
      if (onGameReset) {
        onGameReset();
      }
      if (optionId === 'restart-first-time-experience' || optionId === 'factory-reset') {
        setTimeout(() => {
          onClose();
        }, 300);
      }
    } catch (err) {
      console.error('Error during modular reset:', err);
      showToast('Error executing reset option.');
    } finally {
      setIsExecutingReset(false);
      setActiveResetOption(null);
    }
  };

  // Filter current draw pool by tier & query
  // Newly added cars stay at the top for now; other cars are filtered and sorted by respective rarity
  const filteredDrawPool = useMemo(() => {
    const matching = drawPool.filter((b) => {
      if (selectedTierFilter !== 'all' && b.rarityTier !== selectedTierFilter) {
        return false;
      }
      if (brandSearchQuery.trim()) {
        const q = normalizeSearchText(brandSearchQuery);
        return (
          normalizeSearchText(b.name).includes(q) ||
          normalizeSearchText(b.brand).includes(q) ||
          normalizeSearchText(b.country).includes(q) ||
          normalizeSearchText(b.tagline || '').includes(q)
        );
      }
      return true;
    });

    if (sessionAddedBrandIds.length > 0) {
      const topAdded: DailyTargetBrand[] = [];
      const remaining: DailyTargetBrand[] = [];

      for (const addedId of sessionAddedBrandIds) {
        const found = matching.find((b) => b.id === addedId);
        if (found) {
          topAdded.push(found);
        }
      }

      for (const b of matching) {
        if (!sessionAddedBrandIds.includes(b.id)) {
          remaining.push(b);
        }
      }

      return [...topAdded, ...sortBrandsByRarity(remaining)];
    }

    return sortBrandsByRarity(matching);
  }, [drawPool, selectedTierFilter, brandSearchQuery, sessionAddedBrandIds]);

  // Set of existing brand names in draw pool (lowercase for lookup)
  const drawPoolBrandSet = useMemo(() => {
    return new Set(drawPool.map((b) => b.name.toLowerCase().trim()));
  }, [drawPool]);

  // Massive Database Search Results
  const databaseSearchResults = useMemo(() => {
    if (!dbSearchQuery.trim()) return [];
    const q = normalizeSearchText(dbSearchQuery);
    return ALL_BRANDS_CATALOG.filter(
      (b) =>
        normalizeSearchText(b.name).includes(q) ||
        normalizeSearchText(b.country).includes(q) ||
        b.cars.some((c) => normalizeSearchText(c.name).includes(q))
    ).slice(0, 15);
  }, [dbSearchQuery]);

  const getOptionIcon = (id: string) => {
    switch (id) {
      case 'reset-scanned-cars':
        return <Car className="w-4 h-4 text-sky-500" />;
      case 'reset-custom-cars':
        return <Wrench className="w-4 h-4 text-violet-500" />;
      case 'reset-edited-names':
        return <Info className="w-4 h-4 text-emerald-500" />;
      case 'reset-car-collection':
        return <Layers className="w-4 h-4 text-amber-500" />;
      case 'reset-colour-variants':
        return <Palette className="w-4 h-4 text-pink-500" />;
      case 'reset-brand-progress':
        return <Crown className="w-4 h-4 text-indigo-500" />;
      case 'reset-achievements':
        return <Award className="w-4 h-4 text-yellow-500" />;
      case 'reset-daily-target':
        return <Target className="w-4 h-4 text-rose-500" />;
      case 'restart-first-time-experience':
        return <Play className="w-4 h-4 text-emerald-500" />;
      case 'factory-reset':
      case 'reset-everything':
        return <Trash2 className="w-4 h-4 text-red-500" />;
      default:
        return <RotateCcw className="w-4 h-4 text-zinc-500" />;
    }
  };

  if (!isOpen) return null;

  const currentTier = targetState.targetBrand.rarityTier || 'common';
  const currentTierConfig = TIER_CONFIG[currentTier];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="w-full max-w-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 my-6 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Owner &amp; Developer Tools
                </h2>
                {isAuthenticated && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800">
                    Active Session
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Daily brand draw editor, testing targets &amp; modular resets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLockOwnerMode}
                title="Lock Owner Mode"
                className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="p-3 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-xl text-xs font-medium flex items-center gap-2 shadow-lg animate-in slide-in-from-top duration-200">
            <Sparkles className="w-4 h-4 text-amber-400 dark:text-amber-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* LOCKED STATE: Passcode Form */}
        {!isAuthenticated ? (
          <form onSubmit={handleVerifyPasscode} className="space-y-4 py-6">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Enter Owner Passcode
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
                Protected area for managing the daily brand draw pool, testing targets, and executing modular resets.
              </p>
            </div>

            <div className="space-y-2 max-w-xs mx-auto">
              <input
                type="password"
                maxLength={10}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setPasscodeError(false);
                }}
                placeholder="Enter 6-digit code..."
                className={`w-full px-4 py-2.5 rounded-xl text-center text-lg tracking-widest font-mono border ${
                  passcodeError
                    ? 'border-red-500 ring-2 ring-red-500/20 bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-300'
                    : 'border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-amber-500/30'
                } outline-none transition-all`}
                autoFocus
              />

              {passcodeError && (
                <p className="text-[11px] text-red-600 dark:text-red-400 text-center font-medium">
                  Incorrect passcode. Please try again.
                </p>
              )}

              <button
                type="submit"
                id="unlock-owner-mode-button"
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Unlock Owner Tools</span>
              </button>
            </div>
          </form>
        ) : (
          /* UNLOCKED STATE */
          <div className="space-y-5">
            {/* Top Section Navigation Tabs (Responsive grid on mobile/desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl text-xs font-semibold">
              <button
                type="button"
                id="owner-tab-draw-pool"
                onClick={() => handleTabChange('draw-pool')}
                className={`py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'draw-pool'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <Database className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="truncate">Draw Pool</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-200/80 dark:bg-zinc-750 text-zinc-700 dark:text-zinc-300">
                  {drawPool.length}
                </span>
              </button>

              <button
                type="button"
                id="owner-tab-daily-target"
                onClick={() => handleTabChange('daily-target')}
                className={`py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'daily-target'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <Target className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">Daily Target</span>
              </button>

              <button
                type="button"
                id="owner-tab-progression"
                onClick={() => handleTabChange('progression')}
                className={`py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'progression'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">XP &amp; Levels</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  L{currentLevelInfo.level}
                </span>
              </button>

              <button
                type="button"
                id="owner-tab-garage"
                onClick={() => handleTabChange('garage')}
                className={`py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'garage'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <Warehouse className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">My Garage</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  garageEnabled
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                    : 'bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400'
                }`}>
                  {garageEnabled ? 'ON' : 'OFF'}
                </span>
              </button>

              <button
                type="button"
                id="owner-tab-resets"
                onClick={() => handleTabChange('resets')}
                className={`py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'resets'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="truncate">Resets</span>
              </button>
            </div>

            {/* TAB 1: CARS IN DAILY DRAW (View, Filter, Edit, Search Database to Add) */}
            {activeTab === 'draw-pool' && (
              <div className="space-y-4">
                {/* Search Massive Database to Add section */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50/50 via-zinc-50 to-amber-50/30 dark:from-rose-950/20 dark:via-zinc-850 dark:to-amber-950/10 border border-rose-200/70 dark:border-zinc-700/80 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        Add Brand from Database
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        Search 140+ real-world UK road marques to inject into the daily draw pool
                      </p>
                    </div>
                  </div>

                  {/* Search Input for Massive Database */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      value={dbSearchQuery}
                      onChange={(e) => setDbSearchQuery(e.target.value)}
                      placeholder="Search massive brand catalog (e.g. Lotus, Pagani, MG, Volvo, Alpine)..."
                      className="w-full pl-8.5 pr-8 py-2 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 outline-none text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-rose-500"
                    />
                    {dbSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setDbSearchQuery('')}
                        className="p-1 text-zinc-400 hover:text-zinc-600 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Search Results from Database */}
                  {databaseSearchResults.length > 0 && (
                    <div className="max-h-48 overflow-y-auto space-y-1.5 p-1 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      {databaseSearchResults.map((catBrand) => {
                        const inPool = drawPoolBrandSet.has(catBrand.name.toLowerCase().trim());
                        return (
                          <div
                            key={catBrand.id}
                            className="p-2 rounded-lg flex items-center justify-between gap-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-7 h-7 rounded-md bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-1 flex items-center justify-center shrink-0">
                                <BrandLogo brand={catBrand.name} size="sm" className="w-full h-full" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                                  {catBrand.name}
                                </p>
                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                                  {catBrand.country} &bull; Est. {catBrand.founded}
                                </p>
                              </div>
                            </div>

                            {inPool ? (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 shrink-0">
                                In Draw
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleInitiateAddBrand(catBrand)}
                                className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-semibold transition-colors flex items-center gap-1 shrink-0 cursor-pointer shadow-2xs"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add to Draw</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Draw Pool Browser & Editor */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                        Current Draw Pool ({drawPool.length} Marques)
                      </h3>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        Edit rarity tiers, remove brands, or force any marque as today’s target
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Search box inside draw pool */}
                      <div className="relative w-full sm:w-64">
                        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="text"
                          value={brandSearchQuery}
                          onChange={(e) => setBrandSearchQuery(e.target.value)}
                          placeholder="Filter draw pool..."
                          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 outline-none text-zinc-800 dark:text-zinc-200 focus:ring-1 focus:ring-rose-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tier Filter Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedTierFilter('all')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
                        selectedTierFilter === 'all'
                          ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                          : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100'
                      }`}
                    >
                      All ({drawPool.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTierFilter('common')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
                        selectedTierFilter === 'common'
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                      }`}
                    >
                      Commons ({drawPool.filter((b) => b.rarityTier === 'common').length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTierFilter('mid-rarity')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
                        selectedTierFilter === 'mid-rarity'
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300'
                      }`}
                    >
                      Mid-Rarity ({drawPool.filter((b) => b.rarityTier === 'mid-rarity').length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTierFilter('rare')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
                        selectedTierFilter === 'rare'
                          ? 'bg-amber-600 text-white'
                          : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
                      }`}
                    >
                      Rare ({drawPool.filter((b) => b.rarityTier === 'rare').length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTierFilter('ultra-rare')}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
                        selectedTierFilter === 'ultra-rare'
                          ? 'bg-rose-600 text-white'
                          : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      Ultra-Rare ({drawPool.filter((b) => b.rarityTier === 'ultra-rare').length})
                    </button>
                  </div>

                  {/* Brand Cards List in Simplified Format: Logo, Name, Country, Fact, Rarity + Edit Controls */}
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {filteredDrawPool.length === 0 ? (
                      <p className="text-xs text-zinc-400 text-center py-6">
                        No marques match filter or search query.
                      </p>
                    ) : (
                      filteredDrawPool.map((b) => {
                        const isActive = targetState.targetBrand.id.toLowerCase() === b.id.toLowerCase();
                        const tierMeta = TIER_CONFIG[b.rarityTier];

                        return (
                          <div
                            key={b.id}
                            className={`p-3 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              isActive
                                ? 'bg-amber-50/80 dark:bg-amber-950/50 border-amber-400 dark:border-amber-700 ring-1 ring-amber-400/40'
                                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
                            }`}
                          >
                            {/* Brand Info (Simplified: Logo, Name, Country, Fact) */}
                            <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                              <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-1 flex items-center justify-center shrink-0">
                                <BrandLogo brand={b.brand} size="md" className="w-full h-full" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                                    {b.name}
                                  </p>
                                  <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                    {b.country}
                                  </span>
                                  <span
                                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${tierMeta.badgeBg} ${tierMeta.badgeText}`}
                                  >
                                    {tierMeta.label}
                                  </span>
                                </div>
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                                  {formatBrandDescription(b)}
                                </p>
                              </div>
                            </div>

                            {/* Editing Controls: Change Tier, Force Target, Remove */}
                            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                              {/* Tier Selector Dropdown */}
                              <select
                                value={b.rarityTier}
                                onChange={(e) =>
                                  handleUpdateBrandTier(b.id, e.target.value as BrandRarityTier)
                                }
                                className="text-[11px] font-medium py-1 px-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer"
                              >
                                <option value="common">Common</option>
                                <option value="mid-rarity">Mid-Rarity</option>
                                <option value="rare">Rare</option>
                                <option value="ultra-rare">Ultra-Rare</option>
                              </select>

                              {/* Force as Target Button */}
                              <button
                                type="button"
                                onClick={() => handleForceSelectBrand(b)}
                                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors shrink-0 cursor-pointer ${
                                  isActive
                                    ? 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 font-bold'
                                    : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                                }`}
                              >
                                {isActive ? 'Active Target' : 'Force Target'}
                              </button>

                              {/* Remove Brand Button */}
                              <button
                                type="button"
                                onClick={() => handleRemoveBrand(b.id, b.name)}
                                title="Remove from draw pool"
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DAILY TARGET TESTING & SKIPS */}
            {activeTab === 'daily-target' && (
              <div className="space-y-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-rose-500" />
                      <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                        Active Daily Target
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-300/50">
                        {targetState.skipsRemaining} Skips Left
                      </span>
                    </div>
                  </div>

                  {/* Target Card */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-1.5 flex items-center justify-center shrink-0">
                          <BrandLogo brand={targetState.targetBrand.brand} size="md" className="w-full h-full" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                              {targetState.targetBrand.name}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${currentTierConfig.badgeBg} ${currentTierConfig.badgeText} ${currentTierConfig.borderClass}`}
                            >
                              {currentTier === 'rare' || currentTier === 'ultra-rare' ? (
                                <Flame className="w-2.5 h-2.5 text-amber-500" />
                              ) : null}
                              {currentTierConfig.label}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                            {targetState.targetBrand.country} &bull; {targetState.targetBrand.category}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={handleToggleSpotted}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                            targetState.completed
                              ? 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                              : 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {targetState.completed
                              ? 'Mark Unspotted'
                              : `Simulate Spot (+${(targetState.xpBounty || getDailyTargetXpBounty(targetState.targetBrand.rarityTier)).toLocaleString()} XP)`}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRerollBrand()}
                          className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Reroll Target</span>
                        </button>
                      </div>
                    </div>

                    {/* Target Readout Details */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px]">
                      <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60">
                        <p className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase font-bold">Rarity Tier</p>
                        <p className="font-semibold text-zinc-800 dark:text-zinc-200 capitalize">
                          {currentTier}
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60">
                        <p className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase font-bold">Target Draw</p>
                        <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                          Fair Brand Draw
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60">
                        <p className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase font-bold">Anti-Repeat</p>
                        <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                          Protected
                        </p>
                      </div>
                      <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60">
                        <p className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase font-bold">Status</p>
                        <p className={`font-semibold ${targetState.completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                          {targetState.completed ? 'Completed' : 'Unspotted'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skip Controls & Test Helpers */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mr-1">
                      Skips Testing:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddSkips(3)}
                      className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 text-xs font-medium text-zinc-800 dark:text-zinc-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3 h-3 text-amber-500" />
                      <span>+3 Skips</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddSkips(10)}
                      className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 text-xs font-medium text-zinc-800 dark:text-zinc-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3 h-3 text-amber-500" />
                      <span>+10 Skips</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSetMaxSkips}
                      className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800 text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3 h-3 text-rose-500 fill-rose-500" />
                      <span>99 Skips</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetTargetDay}
                      className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-750 transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
                    >
                      <RotateCcw className="w-3 h-3 text-zinc-400" />
                      <span>Reset Target Day</span>
                    </button>
                  </div>

                  {/* Reroll Specific Tier Testing Buttons */}
                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                      <span>Reroll Specific Tier:</span>
                      <span className="text-zinc-400">Forces roll into selected rarity</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => handleRerollBrand('common')}
                        className="py-1.5 px-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Common</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRerollBrand('mid-rarity')}
                        className="py-1.5 px-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-medium hover:bg-purple-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Mid-Rarity</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRerollBrand('rare')}
                        className="py-1.5 px-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-medium hover:bg-amber-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Rare</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRerollBrand('ultra-rare')}
                        className="py-1.5 px-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-medium hover:bg-rose-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Ultra-Rare</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MODULAR RESET CONTROLS */}
            {activeTab === 'resets' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-amber-500" />
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                      Reset Controls &bull; Modular Game Data
                    </h3>
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Independent Modules
                  </span>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Select an individual category below to reset only that specific data. Other categories remain completely untouched.
                </p>

                {/* Grid of 9 Modular Reset Options */}
                <div className="space-y-2">
                  {MODULAR_RESET_OPTIONS.map((opt) => {
                    const isEverything = opt.id === 'reset-everything';
                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                          isEverything
                            ? 'bg-red-50/60 dark:bg-red-950/20 border-red-300 dark:border-red-900/60'
                            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                              isEverything
                                ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                            }`}
                          >
                            {getOptionIcon(opt.id)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span
                                className={`text-xs font-bold ${
                                  isEverything
                                    ? 'text-red-700 dark:text-red-400'
                                    : 'text-zinc-900 dark:text-zinc-100'
                                }`}
                              >
                                {opt.title}
                              </span>
                              {isEverything && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800">
                                  Full Factory Wipe
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                              {opt.shortDesc}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          id={`btn-${opt.id}`}
                          onClick={() => setActiveResetOption(opt)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
                            isEverything
                              ? 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
                              : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700'
                          }`}
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: XP & PROGRESSION CONTROLS */}
            {activeTab === 'progression' && (
              <div className="space-y-4">
                {/* Live Progression Overview Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-zinc-50 dark:from-amber-950/20 dark:via-zinc-900 dark:to-zinc-850 border border-amber-200/80 dark:border-amber-900/40 space-y-3.5 shadow-xs">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl border flex flex-col items-center justify-center font-bold shadow-xs ${currentLevelInfo.badgeColorClass}`}>
                        <span className="text-[10px] uppercase tracking-wider font-extrabold opacity-80 leading-none">LVL</span>
                        <span className="text-lg leading-none font-mono mt-0.5">{currentLevelInfo.level}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                            {currentLevelInfo.title}
                          </h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                            {currentLevelInfo.tier} Tier
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                          Badge: {currentLevelInfo.badgeName} &bull; Feature: {currentLevelInfo.unlockedFeature}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base font-extrabold font-mono text-zinc-900 dark:text-zinc-100">
                        {currentXp.toLocaleString()} <span className="text-xs font-sans text-amber-600 dark:text-amber-400">XP</span>
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {currentLevelInfo.level >= 20 ? (
                          <span className="text-amber-600 dark:text-amber-400 font-bold">MAX LEVEL REACHED</span>
                        ) : (
                          <span>{(currentLevelInfo.xpToNextLevel || 0).toLocaleString()} XP to Level {currentLevelInfo.level + 1}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                      <span>Progress to Level {Math.min(20, currentLevelInfo.level + 1)}</span>
                      <span className="font-mono">{Math.round(currentLevelInfo.progressPercentage ?? currentLevelInfo.progressPercent ?? 0)}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(0, Math.min(100, currentLevelInfo.progressPercentage ?? currentLevelInfo.progressPercent ?? 0))}%` }}
                      />
                    </div>
                  </div>

                  {/* Quick Stat Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-zinc-200/60 dark:border-zinc-800">
                    <div className="p-2 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 text-center">
                      <span className="text-[10px] text-zinc-400 uppercase font-medium block">Streak</span>
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-mono">
                        {streakData.currentStreak} Days ({streakData.multiplier}x)
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 text-center">
                      <span className="text-[10px] text-zinc-400 uppercase font-medium block">Target Multiplier</span>
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                        {currentLevelInfo.dailyTargetMultiplier}x
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 text-center">
                      <span className="text-[10px] text-zinc-400 uppercase font-medium block">Rarity Boost</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        +{currentLevelInfo.rarityBoostPercent}%
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 text-center">
                      <span className="text-[10px] text-zinc-400 uppercase font-medium block">Daily Skips</span>
                      <span className="text-xs font-bold text-sky-600 dark:text-sky-400 font-mono">
                        +{currentLevelInfo.extraDailySkips}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct XP Controls */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                        Set XP &amp; Quick Adjustments
                      </h4>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-mono">Current: {currentXp.toLocaleString()} XP</span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={0}
                      value={customXpInput}
                      onChange={(e) => setCustomXpInput(e.target.value)}
                      placeholder="Enter exact XP (e.g. 5000)..."
                      className="flex-1 px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-mono"
                    />
                    <button
                      type="button"
                      id="owner-set-exact-xp-btn"
                      onClick={() => {
                        const val = parseInt(customXpInput, 10);
                        if (!isNaN(val) && val >= 0) {
                          ownerSetXp(val);
                          showToast(`XP set to ${val.toLocaleString()}`);
                          setCustomXpInput('');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                    >
                      Set XP
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      { label: '+250 XP', delta: 250 },
                      { label: '+500 XP', delta: 500 },
                      { label: '+1,000 XP', delta: 1000 },
                      { label: '+2,500 XP', delta: 2500 },
                      { label: '+5,000 XP', delta: 5000 },
                      { label: '+10,000 XP', delta: 10000 },
                      { label: '-500 XP', delta: -500 },
                      { label: '-1,000 XP', delta: -1000 },
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        type="button"
                        onClick={() => {
                          ownerAddXp(btn.delta);
                          showToast(`${btn.delta > 0 ? '+' : ''}${btn.delta.toLocaleString()} XP applied`);
                        }}
                        className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          btn.delta > 0
                            ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400'
                            : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level Jump Selector */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                        Jump to Level (1 - 20)
                      </h4>
                    </div>
                    <span className="text-[11px] text-zinc-500">Auto-sets required XP</span>
                  </div>

                  {/* Quick Jump Buttons for Milestone Levels */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {[
                      { lvl: 1, name: 'L1 Rookie', xp: '0 XP' },
                      { lvl: 2, name: 'L2 Scout', xp: '250 XP' },
                      { lvl: 3, name: 'L3 Tracker', xp: '650 XP' },
                      { lvl: 5, name: 'L5 Enthusiast', xp: '1,950 XP' },
                      { lvl: 7, name: 'L7 Spotter Pro', xp: '4,150 XP' },
                      { lvl: 10, name: 'L10 Apex Scout', xp: '10,000 XP' },
                      { lvl: 15, name: 'L15 Archivist', xp: '27,000 XP' },
                      { lvl: 20, name: 'L20 Apex Legend', xp: '72,000 XP' },
                    ].map((target) => (
                      <button
                        key={target.lvl}
                        type="button"
                        onClick={() => {
                          ownerSetLevel(target.lvl);
                          showToast(`Jumped to Level ${target.lvl} (${target.name})`);
                        }}
                        className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                          currentLevelInfo.level === target.lvl
                            ? 'bg-amber-500/15 border-amber-500 text-amber-800 dark:text-amber-300 font-bold'
                            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-amber-400'
                        }`}
                      >
                        <div className="text-xs font-bold truncate">{target.name}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">{target.xp}</div>
                      </button>
                    ))}
                  </div>

                  {/* Level Slider for any level 1 - 20 */}
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 shrink-0">
                      Pick any level:
                    </span>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      value={targetLevelInput}
                      onChange={(e) => setTargetLevelInput(parseInt(e.target.value, 10))}
                      className="flex-1 accent-amber-600 cursor-pointer"
                    />
                    <button
                      type="button"
                      id="owner-jump-slider-level-btn"
                      onClick={() => {
                        ownerSetLevel(targetLevelInput);
                        showToast(`Jumped to Level ${targetLevelInput}`);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold shrink-0 cursor-pointer"
                    >
                      Jump to L{targetLevelInput}
                    </button>
                  </div>
                </div>

                {/* Streak Controller */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                        XP Streak &amp; Multiplier Control
                      </h4>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      {streakData.currentStreak} Days ({streakData.multiplier}x)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { days: 0, label: '0 Days (1.0x Reset)' },
                      { days: 3, label: '3 Days (1.15x)' },
                      { days: 7, label: '7 Days (1.35x)' },
                      { days: 14, label: '14 Days (1.5x Max)' },
                    ].map((s) => (
                      <button
                        key={s.days}
                        type="button"
                        onClick={() => {
                          ownerSetStreak(s.days);
                          showToast(`Streak set to ${s.days} days`);
                        }}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer text-xs font-semibold ${
                          streakData.currentStreak === s.days
                            ? 'bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-300'
                            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-amber-400'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="number"
                      min={0}
                      max={365}
                      value={streakDaysInput}
                      onChange={(e) => setStreakDaysInput(parseInt(e.target.value, 10) || 0)}
                      placeholder="Custom streak days..."
                      className="w-36 px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-mono"
                    />
                    <button
                      type="button"
                      id="owner-set-custom-streak-btn"
                      onClick={() => {
                        ownerSetStreak(streakDaysInput);
                        showToast(`Streak updated to ${streakDaysInput} days`);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Set Streak Days
                    </button>
                  </div>
                </div>

                {/* Cosmetic Title Testing */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60 space-y-3">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-purple-500" />
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                      Equip Level Customization (Titles)
                    </h4>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Test how level-locked driver call-sign titles display in your driver badge.
                  </p>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                      Equipped Title:
                    </label>
                    <select
                      value={customization.equippedTitle || currentLevelInfo.title}
                      onChange={(e) => {
                        saveCustomization({ equippedTitle: e.target.value });
                        showToast(`Equipped title: "${e.target.value}"`);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium outline-none cursor-pointer"
                    >
                      {LEVEL_DEFINITIONS.map((def) => (
                        <option key={def.level} value={def.title}>
                          Level {def.level}: {def.title} ({def.tier})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Simulation & Action Triggers */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                      Simulate In-Game XP Actions
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        awardSpotXp('Rare', 'Porsche 911 GT3');
                        showToast('Simulated Rare Car Spot (+450 XP with streak boost)');
                      }}
                      className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-left text-xs hover:border-amber-400 transition-all cursor-pointer"
                    >
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">Spot Rare Car</div>
                      <div className="text-[10px] text-zinc-500">+450 Base XP</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        awardSpotXp('Legendary', 'Bugatti Chiron');
                        showToast('Simulated Legendary Car Spot (+1,500 XP with streak boost)');
                      }}
                      className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-left text-xs hover:border-amber-400 transition-all cursor-pointer"
                    >
                      <div className="font-bold text-amber-600 dark:text-amber-400">Spot Legendary</div>
                      <div className="text-[10px] text-zinc-500">+1,500 Base XP</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        awardDailyTargetXp(500, 'Ferrari');
                        showToast('Simulated Daily Target Completion (+500 XP * multiplier)');
                      }}
                      className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-left text-xs hover:border-amber-400 transition-all cursor-pointer"
                    >
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">Daily Target</div>
                      <div className="text-[10px] text-zinc-500">+500 XP * Multiplier</div>
                    </button>
                  </div>
                </div>

                {/* Reset Progression */}
                <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-red-700 dark:text-red-400">
                      Reset Progression Only
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Resets XP to 0, Level to 1, clears streak and cosmetic overrides. Your collection of scanned cars is untouched!
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      id="owner-clear-history-btn"
                      onClick={() => {
                        ownerClearXpHistory();
                        showToast('XP Activity History cleared');
                      }}
                      className="px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      Clear History
                    </button>
                    <button
                      type="button"
                      id="owner-reset-progression-btn"
                      onClick={() => {
                        ownerResetProgression();
                        showToast('Progression reset to Level 1 (0 XP)');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Progression</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: MY GARAGE CONTROLS & SIMULATION */}
            {activeTab === 'garage' && (
              <div className="space-y-4">
                {/* Feature Toggle Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Warehouse className="w-4 h-4 text-amber-600" />
                      <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                        My Garage Feature Toggle
                      </h3>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        garageEnabled
                          ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
                          : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      {garageEnabled ? 'Enabled (Tab Visible)' : 'Disabled (Tab Hidden)'}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Controls whether the "My Garage" tab is active and visible in the bottom navigation bar across CarDex.
                  </p>

                  <button
                    type="button"
                    id="owner-toggle-garage-btn"
                    onClick={() => {
                      const next = !garageEnabled;
                      setMyGarageEnabled(next);
                      setGarageEnabled(next);
                      showToast(`My Garage is now ${next ? 'enabled' : 'disabled'}`);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                      garageEnabled
                        ? 'bg-zinc-200 hover:bg-zinc-300 text-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-zinc-200'
                        : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                    }`}
                  >
                    {garageEnabled ? 'Disable My Garage Tab' : 'Enable My Garage Tab'}
                  </button>
                </div>

                {/* Simulation Tools */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/50 via-zinc-50 to-orange-50/30 dark:from-amber-950/20 dark:via-zinc-850 dark:to-orange-950/10 border border-amber-200/80 dark:border-amber-900/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                      Garage Simulation Tools
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Inject test data into My Garage to instantly test pinned cars, personal notes, user playlist collections, and wishlist hunting:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <button
                      type="button"
                      id="owner-sim-cars-btn"
                      onClick={() => {
                        simulateAddSampleCarsToGarage();
                        showToast('Added 5 random collected cars to your collection and garage!');
                      }}
                      className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400 text-left transition-all cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        <Car className="w-3.5 h-3.5 text-amber-500" />
                        <span>Simulate 5 Cars</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1">
                        Adds 5 random distinct cars from the catalog into your collection with colors, notes &amp; pins.
                      </p>
                    </button>

                    <button
                      type="button"
                      id="owner-sim-collections-btn"
                      onClick={() => {
                        simulateAddSampleCollections();
                        showToast('Created "Track Weapons" and "Supercar Sundays" collections!');
                      }}
                      className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400 text-left transition-all cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        <Layers className="w-3.5 h-3.5 text-blue-500" />
                        <span>Simulate Playlists</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1">
                        Creates "Track Weapons" &amp; "Supercar Sundays" user playlist collections.
                      </p>
                    </button>

                    <button
                      type="button"
                      id="owner-sim-wishlist-btn"
                      onClick={() => {
                        simulateAddSampleWishlist();
                        showToast('Added 4 dream cars to wishlist!');
                      }}
                      className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400 text-left transition-all cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        <Heart className="w-3.5 h-3.5 text-rose-500" />
                        <span>Simulate Wishlist</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1">
                        Populates Dream Garage with dream and must-spot tagged cars.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Owned Cars Manager (View All Owned & Delete Individually) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-emerald-500" />
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                        Owned Cars Manager ({ownedCarsList.length} owned)
                      </h4>
                    </div>
                    <span className="text-[11px] text-zinc-500">
                      Delete individual cars from your collection
                    </span>
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search owned cars by model, brand, or color..."
                      value={ownedCarsSearch}
                      onChange={(e) => setOwnedCarsSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1 divide-y divide-zinc-100 dark:divide-zinc-800/60">
                    {ownedCarsList.length === 0 ? (
                      <div className="py-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
                        {ownedCarsSearch.trim()
                          ? 'No owned cars match your search filter.'
                          : 'No cars currently owned in your collection. Use "Simulate 5 Cars" above or scan cars to add them.'}
                      </div>
                    ) : (
                      ownedCarsList.map(({ car, collectionInfo }) => (
                        <div
                          key={car.id}
                          className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-9 h-9 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200/50 dark:border-zinc-700/50 flex items-center justify-center">
                              {car.image ? (
                                <img
                                  src={car.image}
                                  alt={car.name}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <Car className="w-4 h-4 text-zinc-400" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                                {car.brand} {car.name}
                              </div>
                              <div className="text-[10px] text-zinc-500 flex items-center gap-2">
                                <span className="px-1.5 py-0.2 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                                  {car.rarity}
                                </span>
                                {collectionInfo.collectedColors?.length > 0 && (
                                  <span className="truncate max-w-[120px]">
                                    {collectionInfo.collectedColors.join(', ')}
                                  </span>
                                )}
                                {collectionInfo.firstScannedDate && (
                                  <span className="hidden sm:inline">
                                    Spotted {collectionInfo.firstScannedDate}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteOwnedCar(car.id, `${car.brand} ${car.name}`)}
                            className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors shrink-0 cursor-pointer"
                            title={`Delete ${car.brand} ${car.name} from collection`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Reset Garage Data Only */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      Reset My Garage Data Only
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Clears pinned cars, personal notes, custom playlists, and wishlist items. Catalog and scanned records are preserved.
                    </p>
                  </div>

                  <button
                    type="button"
                    id="owner-reset-garage-btn"
                    onClick={() => {
                      resetMyGarageData();
                      showToast('My Garage custom data reset successfully!');
                    }}
                    className="py-2 px-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Garage Data</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CONFIRMATION MODAL FOR MODULAR RESET OPTION */}
        {activeResetOption && (
          <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-2xl space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    activeResetOption.dangerLevel === 'critical'
                      ? 'bg-red-100 text-red-600 dark:bg-red-950/70 dark:text-red-400'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-400'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Confirm: {activeResetOption.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    {activeResetOption.detailedDesc}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-300">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Notice: </span>
                {activeResetOption.id === 'restart-first-time-experience'
                  ? 'Only username and favorite car are cleared so you can test the initial startup and onboarding screen. Your scanned cars, garage data, and collection records are preserved!'
                  : activeResetOption.id === 'factory-reset' || activeResetOption.id === 'reset-everything'
                  ? 'All CarDex data, progress, and settings will be permanently erased. This cannot be undone.'
                  : 'Only this category will be deleted. Other game data and collection progress remain unaffected.'}
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  disabled={isExecutingReset}
                  onClick={() => setActiveResetOption(null)}
                  className="flex-1 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  id="confirm-modular-reset-btn"
                  disabled={isExecutingReset}
                  onClick={handleExecuteModularReset}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                    activeResetOption.dangerLevel === 'critical'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {isExecutingReset ? (
                    <span>Resetting...</span>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Confirm Reset</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Rarity Selection Popup Modal when adding a brand from database */}
        {pendingAddBrand && (
          <div
            className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
            onClick={() => {
              setPendingAddBrand(null);
              setPendingRarityTier('common');
            }}
          >
            <div
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl p-5 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-1.5 flex items-center justify-center shadow-2xs shrink-0">
                    <BrandLogo brand={pendingAddBrand.name} size="md" className="w-full h-full" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      Select Rarity for {pendingAddBrand.name}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      {pendingAddBrand.country} &bull; Est. {pendingAddBrand.founded}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPendingAddBrand(null);
                    setPendingRarityTier('common');
                  }}
                  className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                Choose which rarity tier this marque should have in the daily draw pool:
              </p>

              {/* 4 Rarity Tier Choices */}
              <div className="space-y-2">
                {(['common', 'mid-rarity', 'rare', 'ultra-rare'] as BrandRarityTier[]).map((tierKey) => {
                  const config = TIER_CONFIG[tierKey];
                  const isSelected = pendingRarityTier === tierKey;
                  return (
                    <button
                      key={tierKey}
                      type="button"
                      onClick={() => setPendingRarityTier(tierKey)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? `${config.badgeBg} ${config.borderClass} ring-2 ring-rose-500/50`
                          : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${config.badgeText}`}>
                            {config.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                          {config.description}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-rose-600 bg-rose-600 text-white'
                            : 'border-zinc-300 dark:border-zinc-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setPendingAddBrand(null);
                    setPendingRarityTier('common');
                  }}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (pendingAddBrand) {
                      handleConfirmAddBrandWithTier(pendingAddBrand, pendingRarityTier);
                    }
                  }}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add as {TIER_CONFIG[pendingRarityTier].label}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
