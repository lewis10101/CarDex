import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Moon,
  Sun,
  BookOpen,
  Search,
  X,
  ChevronRight,
  ShieldCheck,
  Lock,
  Target,
  User,
  Sparkles,
  Edit2,
  Check,
  Car,
  Heart,
  Award,
  Flame,
} from 'lucide-react';
import { PhonePresetId } from '../types';
import { PHONE_PRESETS } from '../constants/phonePresets';
import { UK_ROAD_CARS_BY_BRAND } from '../data/ukRoadCars';
import { ALL_BRANDS_CATALOG } from '../data/brandsCatalog';
import { BrandLogo } from './collection/BrandLogo';
import { normalizeSearchText } from '../utils/textUtils';
import { OwnerSettingsModal } from './settings/OwnerSettingsModal';
import { DrawCarsModal } from './settings/DrawCarsModal';
import {
  getCurrentUser,
  updateCollectorProfile,
  AuthUser,
} from '../services/authSyncService';
import {
  getUserXp,
  getLevelForXp,
  getStreakData,
  getUserCustomization,
} from '../services/progressionService';

interface SettingsPageProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  activePresetId: PhonePresetId;
  onOpenPhoneSizeModal: () => void;
}

export function SettingsPage({
  isDarkMode,
  onToggleDarkMode,
  activePresetId,
  onOpenPhoneSizeModal,
}: SettingsPageProps) {
  const activePreset = PHONE_PRESETS.find((p) => p.id === activePresetId) || PHONE_PRESETS[0];

  // Collector Profile State (Phone Local Storage)
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => getCurrentUser());
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(authUser?.collectorName || '');
  const [editCar, setEditCar] = useState(authUser?.favoriteCar || '');
  const [editBrand, setEditBrand] = useState(authUser?.favoriteBrand || 'Porsche');
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);
  const [showCarSuggestions, setShowCarSuggestions] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Progression & Level State
  const [userXp, setUserXp] = useState(() => getUserXp());
  const [streakData, setStreakData] = useState(() => getStreakData());
  const [userCustom, setUserCustom] = useState(() => getUserCustomization());

  useEffect(() => {
    const handleProgressionSync = () => {
      setUserXp(getUserXp());
      setStreakData(getStreakData());
      setUserCustom(getUserCustomization());
    };
    window.addEventListener('cardex_xp_updated', handleProgressionSync);
    window.addEventListener('cardex_level_up', handleProgressionSync);
    window.addEventListener('cardex_streak_updated', handleProgressionSync);
    window.addEventListener('cardex_customization_updated', handleProgressionSync);
    return () => {
      window.removeEventListener('cardex_xp_updated', handleProgressionSync);
      window.removeEventListener('cardex_level_up', handleProgressionSync);
      window.removeEventListener('cardex_streak_updated', handleProgressionSync);
      window.removeEventListener('cardex_customization_updated', handleProgressionSync);
    };
  }, []);

  const levelInfo = getLevelForXp(userXp);

  // Catalog cars for favorite car search
  const allCatalogCars = React.useMemo(() => {
    const list: { id: string; name: string; brand: string; fullName: string }[] = [];
    ALL_BRANDS_CATALOG.forEach((brand) => {
      brand.cars.forEach((car) => {
        list.push({
          id: car.id,
          name: car.name,
          brand: brand.name,
          fullName: `${brand.name} ${car.name}`,
        });
      });
    });
    return list;
  }, []);

  const suggestedCars = React.useMemo(() => {
    const q = normalizeSearchText(editCar);
    if (!q) return [];
    return allCatalogCars
      .filter(
        (c) =>
          normalizeSearchText(c.fullName).includes(q) ||
          normalizeSearchText(c.name).includes(q) ||
          normalizeSearchText(c.brand).includes(q)
      )
      .slice(0, 10);
  }, [editCar, allCatalogCars]);

  const suggestedBrands = React.useMemo(() => {
    const q = normalizeSearchText(editBrand);
    if (!q) return [];
    return ALL_BRANDS_CATALOG.filter(
      (b) =>
        normalizeSearchText(b.name).includes(q) ||
        normalizeSearchText(b.country).includes(q)
    ).slice(0, 12);
  }, [editBrand]);

  useEffect(() => {
    const handleAuthChange = () => {
      const u = getCurrentUser();
      setAuthUser(u);
      if (u) {
        setEditName(u.collectorName || '');
        setEditCar(u.favoriteCar || '');
        setEditBrand(u.favoriteBrand || 'Porsche');
      }
    };
    window.addEventListener('cardex_auth_state_changed', handleAuthChange);
    return () => {
      window.removeEventListener('cardex_auth_state_changed', handleAuthChange);
    };
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (editName.trim()) {
      updateCollectorProfile({
        collectorName: editName.trim(),
        favoriteCar: editCar.trim() || undefined,
        favoriteBrand: editBrand.trim() || 'Porsche',
      });
      setIsEditingProfile(false);
      setShowBrandSuggestions(false);
      setShowCarSuggestions(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  // UK Registry Viewer Modal
  const [isRegistryModalOpen, setIsRegistryModalOpen] = useState<boolean>(false);
  const [registrySearch, setRegistrySearch] = useState<string>('');

  // Cars in the Draw Modal
  const [isDrawCarsModalOpen, setIsDrawCarsModalOpen] = useState<boolean>(false);

  // Owner & Developer Tools Modal state (Protected by code 258456)
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState<boolean>(false);

  // Filtered UK Road Cars for registry modal
  const filteredBrands = Object.entries(UK_ROAD_CARS_BY_BRAND).filter(([brand, models]) => {
    const q = normalizeSearchText(registrySearch);
    if (!q) return true;
    if (normalizeSearchText(brand).includes(q)) return true;
    return models.some((m) => normalizeSearchText(m).includes(q));
  });

  const totalUkModelsCount = Object.values(UK_ROAD_CARS_BY_BRAND).reduce(
    (acc, models) => acc + models.length,
    0
  );

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 flex items-center justify-between">
        <h1 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-100">
          Settings
        </h1>
        {saveSuccess && (
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full animate-in fade-in">
            Profile Updated
          </span>
        )}
      </div>

      {/* COLLECTOR PROFILE & LOCAL STORAGE PANEL */}
      <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850/80 border border-zinc-200/80 dark:border-zinc-750 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Collector Profile
            </span>
          </div>

          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            Stored On This Phone
          </span>
        </div>

        {!isEditingProfile ? (
          <div className="p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/70 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                    {authUser?.collectorName || 'Collector'}
                  </p>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                    Active Driver Profile
                  </p>
                </div>
              </div>

              <button
                type="button"
                id="settings-edit-profile-btn"
                onClick={() => setIsEditingProfile(true)}
                className="text-xs px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 uppercase font-medium">
                  <Car className="w-3 h-3 text-amber-500" />
                  <span>Favorite Car</span>
                </div>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate mt-0.5">
                  {authUser?.favoriteCar || 'Not set'}
                </p>
              </div>

              <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 uppercase font-medium">
                  <Heart className="w-3 h-3 text-rose-500" />
                  <span>Favorite Brand</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                  <BrandLogo brand={authUser?.favoriteBrand || 'Porsche'} size="sm" />
                  <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                    {authUser?.favoriteBrand || 'Porsche'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveProfile} className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/70 dark:border-zinc-800 space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Collector Name / Handle
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                maxLength={24}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="Enter a username"
                required
              />
            </div>

            {/* Favorite Car */}
            <div className="space-y-1 relative">
              <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Favorite Car
              </label>
              <input
                type="text"
                value={editCar}
                onChange={(e) => {
                  setEditCar(e.target.value);
                  setShowCarSuggestions(true);
                }}
                onFocus={() => setShowCarSuggestions(true)}
                maxLength={40}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="e.g. Porsche 911 GT3, McLaren F1, BMW M3..."
              />
              {showCarSuggestions && editCar.trim() && suggestedCars.length > 0 && (
                <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg max-h-36 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800 p-1">
                  {suggestedCars.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setEditCar(c.fullName);
                        setShowCarSuggestions(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="font-medium truncate">{c.fullName}</span>
                      <span className="text-[10px] text-zinc-400 ml-2 shrink-0">{c.brand}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Favorite Manufacturer */}
            <div className="space-y-1 relative">
              <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Favorite Manufacturer
              </label>
              <input
                type="text"
                value={editBrand}
                onChange={(e) => {
                  setEditBrand(e.target.value);
                  setShowBrandSuggestions(true);
                }}
                onFocus={() => setShowBrandSuggestions(true)}
                maxLength={30}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="e.g. Porsche, Citroën, BMW, Ferrari..."
              />
              {showBrandSuggestions && editBrand.trim() && (
                <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg max-h-40 overflow-y-auto p-1.5 grid grid-cols-2 gap-1">
                  {suggestedBrands.length > 0 ? (
                    suggestedBrands.map((b) => (
                      <button
                        key={b.id || b.name}
                        type="button"
                        onClick={() => {
                          setEditBrand(b.name);
                          setShowBrandSuggestions(false);
                        }}
                        className="text-left px-2 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <BrandLogo brand={b.name} size="sm" />
                        <span className="font-medium truncate">{b.name}</span>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-2 py-2 text-center text-xs text-zinc-400">
                      No matching brand found
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <Check className="w-3 h-3" />
                <span>Save</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditingProfile(false);
                  setShowBrandSuggestions(false);
                  setShowCarSuggestions(false);
                }}
                className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium cursor-pointer transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
          All your spotted cars, photos, and collections are saved directly on this phone. No email account required.
        </p>
      </div>

      {/* DRIVER LEVEL & PROGRESSION ROADMAP CARD */}
      <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850/80 border border-zinc-200/80 dark:border-zinc-750 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Spotter Level & XP
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {streakData.multiplier > 1.0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center gap-1">
                <Flame className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                <span>{streakData.multiplier}x Boost</span>
              </span>
            )}
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              Lvl {levelInfo.level}
            </span>
          </div>
        </div>

        <div className="p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/70 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 dark:from-amber-500/30 dark:to-zinc-800 border border-amber-500/40 dark:border-amber-400/30 flex items-center justify-center text-amber-700 dark:text-amber-300 font-extrabold text-sm shrink-0 shadow-xs">
                L{levelInfo.level}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {userCustom.selectedTitle || levelInfo.title}
                </p>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  {userXp.toLocaleString()} Total XP Earned
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('cardex_open_level_roadmap'))}
              className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              <span>Roadmap</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Level Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] text-zinc-500 dark:text-zinc-400">
              <span>Next Level Progress</span>
              <span>{Math.max(0, Math.min(100, levelInfo.progressPercentage ?? levelInfo.progressPercent ?? 0))}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(0, Math.min(100, levelInfo.progressPercentage ?? levelInfo.progressPercent ?? 0))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
        {/* Theme Setting */}
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {isDarkMode ? (
              <Moon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" strokeWidth={1.5} />
            ) : (
              <Sun className="w-4 h-4 text-zinc-500 dark:text-zinc-400" strokeWidth={1.5} />
            )}
            <div>
              <p className="font-normal text-zinc-900 dark:text-zinc-100">Appearance</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="text-xs px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            Switch to {isDarkMode ? 'Light' : 'Dark'}
          </button>
        </div>

        {/* Viewport Resize Setting */}
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-4 h-4 text-zinc-500 dark:text-zinc-400" strokeWidth={1.5} />
            <div>
              <p className="font-normal text-zinc-900 dark:text-zinc-100">Device Viewport</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {activePreset.name}{' '}
                {activePreset.width
                  ? `(${activePreset.width} × ${activePreset.height} px)`
                  : '(Responsive)'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenPhoneSizeModal}
            className="text-xs px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            Change Size
          </button>
        </div>

        {/* UK Car Catalog / Brand Registry Viewer */}
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-zinc-500 dark:text-zinc-400" strokeWidth={1.5} />
            <div>
              <p className="font-normal text-zinc-900 dark:text-zinc-100">UK Road Car Registry</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {Object.keys(UK_ROAD_CARS_BY_BRAND).length} brands &bull; {totalUkModelsCount} models
              </p>
            </div>
          </div>
          <button
            type="button"
            id="view-uk-registry-btn"
            onClick={() => setIsRegistryModalOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View List</span>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
          </button>
        </div>

        {/* Cars in the Target Draw & Rarity Viewer */}
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Target className="w-4 h-4 text-zinc-500 dark:text-zinc-400" strokeWidth={1.5} />
            <div>
              <p className="font-normal text-zinc-900 dark:text-zinc-100">Cars in the Draw</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                View all draw cars filtered by Common, Mid, Rare, Ultra Rare
              </p>
            </div>
          </div>
          <button
            type="button"
            id="open-draw-cars-btn"
            onClick={() => setIsDrawCarsModalOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View Draw</span>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
          </button>
        </div>

        {/* Owner & Developer Tools (Password Protected: 258456) */}
        <div className="py-4 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">Owner &amp; Developer Tools</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Refresh skips, daily brand targets, and modular data resets
              </p>
            </div>
          </div>
          <button
            type="button"
            id="open-owner-settings-btn"
            onClick={() => setIsOwnerModalOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700/80 bg-amber-50/50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 hover:bg-amber-100/70 dark:hover:bg-amber-950/60 transition-colors font-medium flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Lock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            <span>Open</span>
          </button>
        </div>
      </div>

      {/* UK Registry Modal Viewer */}
      {isRegistryModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsRegistryModalOpen(false);
          }}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                  UK Road Car Registry
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Brand → List of all real model names
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsRegistryModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={registrySearch}
                  onChange={(e) => setRegistrySearch(e.target.value)}
                  placeholder="Filter brands or model names..."
                  className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
              </div>
            </div>

            {/* Registry Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {filteredBrands.length === 0 ? (
                <div className="text-center py-8 text-zinc-400 dark:text-zinc-500">
                  No matching brands or models found.
                </div>
              ) : (
                filteredBrands.map(([brand, models]) => (
                  <div
                    key={brand}
                    className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {brand}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-200/70 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-300 font-medium">
                        {models.length} {models.length === 1 ? 'model' : 'models'}
                      </span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-mono text-[11px]">
                      {models.join(', ')}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
              <span>Showing {filteredBrands.length} of {Object.keys(UK_ROAD_CARS_BY_BRAND).length} brands</span>
              <button
                type="button"
                onClick={() => setIsRegistryModalOpen(false)}
                className="px-3 py-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cars in the Draw Modal (Filters: Common, Mid Rarity, Rare, Ultra Rare) */}
      <DrawCarsModal
        isOpen={isDrawCarsModalOpen}
        onClose={() => setIsDrawCarsModalOpen(false)}
      />

      {/* Owner & Developer Tools Modal (Protected by Code 258456) */}
      <OwnerSettingsModal
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
      />

      <div className="min-h-[160px]" />
    </div>
  );
}
