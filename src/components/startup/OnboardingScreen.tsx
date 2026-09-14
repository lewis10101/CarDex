import React, { useState } from 'react';
import {
  getCurrentUser,
  updateCollectorProfile,
  setOnboardingCompleted,
} from '../../services/authSyncService';
import {
  Sparkles,
  Car,
  Camera,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Check,
  Compass,
  Gauge,
  Bell,
  Shuffle,
  Calendar,
  Heart,
} from 'lucide-react';
import { BrandLogo } from '../collection/BrandLogo';
import { ALL_BRANDS_CATALOG } from '../../data/brandsCatalog';
import { Search, X as XIcon } from 'lucide-react';
import { normalizeSearchText } from '../../utils/textUtils';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const NICKNAME_SUGGESTIONS = [
  'ApexHunter',
  'Silverstone',
  'PistaRacer',
  'TurboCollector',
  'MonzaSpotter',
  'V8Whisperer',
  'PetrolheadUK',
  'Nurburgring',
  'SpeedDemon',
  'TrackDayPro',
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const currentUser = getCurrentUser();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [collectorName, setCollectorName] = useState<string>(
    currentUser?.collectorName && currentUser.collectorName.toLowerCase() !== 'collector_01'
      ? currentUser.collectorName
      : ''
  );
  const [birthday, setBirthday] = useState<string>(currentUser?.birthday || '');
  // Start blank as requested
  const [favoriteCar, setFavoriteCar] = useState<string>('');
  const [favoriteBrand, setFavoriteBrand] = useState<string>('');
  const [brandSearchInput, setBrandSearchInput] = useState<string>('');
  const [isCarDropdownOpen, setIsCarDropdownOpen] = useState<boolean>(false);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState<boolean>(false);

  const [units, setUnits] = useState<'imperial' | 'metric'>(currentUser?.preferredUnits || 'imperial');
  const [enableDailyAlerts, setEnableDailyAlerts] = useState<boolean>(true);

  // Flatten all cars across all catalog brands for autocomplete
  const allCatalogCars = React.useMemo(() => {
    const list: { name: string; brand: string; fullName: string }[] = [];
    ALL_BRANDS_CATALOG.forEach((brand) => {
      brand.cars.forEach((car) => {
        list.push({
          name: car.name,
          brand: brand.name,
          fullName: car.name.toLowerCase().startsWith(brand.name.toLowerCase())
            ? car.name
            : `${brand.name} ${car.name}`,
        });
      });
    });
    return list;
  }, []);

  // Filtered cars for favorite car search
  const filteredCars = React.useMemo(() => {
    const q = normalizeSearchText(favoriteCar);
    if (!q) return [];
    return allCatalogCars
      .filter(
        (c) =>
          normalizeSearchText(c.fullName).includes(q) ||
          normalizeSearchText(c.name).includes(q) ||
          normalizeSearchText(c.brand).includes(q)
      )
      .slice(0, 15);
  }, [favoriteCar, allCatalogCars]);

  // Filtered brands for favorite manufacturer search - only display when user starts typing
  const filteredBrands = React.useMemo(() => {
    const q = normalizeSearchText(brandSearchInput);
    if (!q) return [];
    return ALL_BRANDS_CATALOG.filter(
      (b) =>
        normalizeSearchText(b.name).includes(q) ||
        normalizeSearchText(b.country).includes(q)
    );
  }, [brandSearchInput]);

  const handleRandomizeName = () => {
    const random = NICKNAME_SUGGESTIONS[Math.floor(Math.random() * NICKNAME_SUGGESTIONS.length)];
    const num = Math.floor(Math.random() * 90 + 10);
    setCollectorName(`${random}_${num}`);
  };

  const handleFinish = () => {
    updateCollectorProfile({
      collectorName: collectorName.trim() || 'Collector',
      birthday: birthday.trim() || undefined,
      favoriteCar: favoriteCar.trim() || 'Supercar',
      favoriteBrand: favoriteBrand.trim() || 'Porsche',
      preferredUnits: units,
    });
    setOnboardingCompleted(true);
    onComplete();
  };

  return (
    <div
      id="cardex-onboarding-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#09090b] text-white p-4 sm:p-6 overflow-y-auto select-none"
    >
      {/* Top Stepper Indicator */}
      <div className="w-full max-w-md flex items-center justify-between pt-2 sm:pt-4 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-zinc-400">Step {step} of 3</span>
        </div>

        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 rounded-full transition-all duration-300 ${
                step === s
                  ? 'w-6 bg-amber-400'
                  : step > s
                  ? 'w-3 bg-zinc-600'
                  : 'w-2 bg-zinc-800'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleFinish}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* STEP 1: Collector Profile (Username, Birthday, Favorite Car, Favorite Brand) */}
      {step === 1 && (
        <div className="w-full max-w-md my-auto py-2 sm:py-4 space-y-4 sm:space-y-5 animate-in fade-in duration-200">
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-medium mb-1.5">
              <Compass className="w-3 h-3" />
              <span>Collector Setup</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-0.5">
              Welcome to CarDex
            </h2>
            <p className="text-xs text-zinc-400">
              Create your spotter profile before heading into the wild.
            </p>
          </div>

          {/* Username Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="onboarding-callsign-input" className="text-xs font-medium text-zinc-300">
                Collector Username / Call-Sign
              </label>
              <button
                type="button"
                onClick={handleRandomizeName}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <Shuffle className="w-3 h-3" />
                <span>Randomize</span>
              </button>
            </div>
            <input
              type="text"
              id="onboarding-callsign-input"
              value={collectorName}
              onChange={(e) => setCollectorName(e.target.value)}
              maxLength={24}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50 placeholder:text-zinc-500 placeholder:font-normal"
              placeholder="Enter a username"
            />
          </div>

          {/* Birthday Field */}
          <div className="space-y-1.5">
            <label htmlFor="onboarding-birthday-input" className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Your Birthday</span>
            </label>
            <input
              type="date"
              id="onboarding-birthday-input"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-xl text-xs sm:text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            <p className="text-[10px] text-zinc-500">
              Used to celebrate your spotter anniversary and unlock birthday garage bounties.
            </p>
          </div>

          {/* Favorite Car Input with Autocomplete */}
          <div className="space-y-1.5 relative">
            <label htmlFor="onboarding-favcar-input" className="text-xs font-medium text-zinc-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Favorite Car / All-Time Dream Machine</span>
              </span>
              {favoriteCar && (
                <span className="text-[10px] text-amber-400 font-medium">Selected</span>
              )}
            </label>
            <div className="relative">
              <input
                type="text"
                id="onboarding-favcar-input"
                value={favoriteCar}
                onChange={(e) => {
                  setFavoriteCar(e.target.value);
                  setIsCarDropdownOpen(true);
                }}
                onFocus={() => setIsCarDropdownOpen(true)}
                maxLength={50}
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-xl text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50 pr-8"
                placeholder="Type to search any car in the game (e.g. F40, GT3 RS, Supra)..."
              />
              {favoriteCar ? (
                <button
                  type="button"
                  onClick={() => {
                    setFavoriteCar('');
                    setIsCarDropdownOpen(false);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 p-0.5"
                >
                  <XIcon className="w-3.5 h-3.5" />
                </button>
              ) : (
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {isCarDropdownOpen && filteredCars.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 z-30 max-h-48 overflow-y-auto bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl divide-y divide-zinc-800">
                {filteredCars.map((car) => (
                  <button
                    key={`${car.brand}-${car.name}`}
                    type="button"
                    onClick={() => {
                      setFavoriteCar(car.fullName);
                      if (!favoriteBrand) {
                        setFavoriteBrand(car.brand);
                      }
                      setIsCarDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-zinc-800/80 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-semibold text-white truncate">{car.fullName}</p>
                      <p className="text-[10px] text-zinc-400">{car.brand}</p>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 shrink-0">
                      Select
                    </span>
                  </button>
                ))}
              </div>
            )}
            <p className="text-[10px] text-zinc-500">
              Start typing to search all cars across every manufacturer in the game.
            </p>
          </div>

          {/* Favorite Brand Selection with Search */}
          <div className="space-y-1.5 relative">
            <label className="text-xs font-medium text-zinc-300 flex items-center justify-between">
              <span>Favorite Manufacturer</span>
              {favoriteBrand && (
                <span className="text-[10px] text-emerald-400 font-medium">
                  {favoriteBrand} selected
                </span>
              )}
            </label>

            {favoriteBrand ? (
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-amber-500/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 p-1 flex items-center justify-center">
                    <BrandLogo brand={favoriteBrand} size="sm" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{favoriteBrand}</p>
                    <p className="text-[10px] text-zinc-400">Favorite marque saved</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFavoriteBrand('');
                    setBrandSearchInput('');
                    setIsBrandDropdownOpen(true);
                  }}
                  className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="relative">
                  <input
                    type="text"
                    value={brandSearchInput}
                    onChange={(e) => {
                      setBrandSearchInput(e.target.value);
                      setIsBrandDropdownOpen(true);
                    }}
                    onFocus={() => setIsBrandDropdownOpen(true)}
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-xl text-xs sm:text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50 pr-8"
                    placeholder="Type manufacturer name (e.g. Porsche, Citroën, BMW)..."
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                </div>

                {/* Brands Grid / Search Results - only rendered when user types */}
                {brandSearchInput.trim() && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-48 overflow-y-auto pr-1 mt-2">
                    {filteredBrands.length > 0 ? (
                      filteredBrands.map((brand) => (
                        <button
                          key={brand.id || brand.name}
                          type="button"
                          onClick={() => {
                            setFavoriteBrand(brand.name);
                            setBrandSearchInput('');
                            setIsBrandDropdownOpen(false);
                          }}
                          className="p-2 rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer text-center"
                        >
                          <BrandLogo brand={brand.name} size="sm" />
                          <span className="text-[10px] font-medium truncate w-full">
                            {brand.name}
                          </span>
                        </button>
                      ))
                    ) : (
                      <p className="col-span-full py-3 text-center text-xs text-zinc-500">
                        No matching manufacturer found
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: Preferences & Briefing */}
      {step === 2 && (
        <div className="w-full max-w-md my-auto py-4 space-y-5 animate-in fade-in duration-200">
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-medium mb-1.5">
              <Gauge className="w-3 h-3" />
              <span>Collector Preferences</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-0.5">
              Performance Specs
            </h2>
            <p className="text-xs text-zinc-400">
              Configure how engine metrics, speeds, and spotting targets are measured.
            </p>
          </div>

          {/* Speed & Power Units */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-300">
              Speed &amp; Power Units
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setUnits('imperial')}
                className={`py-3 px-3 rounded-xl border flex flex-col items-start transition-all cursor-pointer ${
                  units === 'imperial'
                    ? 'bg-zinc-900 border-amber-400 text-white shadow-xs'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                <span className="text-xs font-semibold">Imperial</span>
                <span className="text-[10px] text-zinc-500">MPH • Horsepower (HP)</span>
              </button>

              <button
                type="button"
                onClick={() => setUnits('metric')}
                className={`py-3 px-3 rounded-xl border flex flex-col items-start transition-all cursor-pointer ${
                  units === 'metric'
                    ? 'bg-zinc-900 border-amber-400 text-white shadow-xs'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                <span className="text-xs font-semibold">Metric</span>
                <span className="text-[10px] text-zinc-500">KM/H • Kilowatts (kW)</span>
              </button>
            </div>
          </div>

          {/* Daily Target Feature Brief */}
          <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Daily Target Bounty System</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Every day, CarDex assigns a mystery manufacturer target. Spotting a car of that brand awards bonus collector XP, streak progress, and garage trophies!
            </p>
            <label className="flex items-center gap-2 pt-1 text-xs text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={enableDailyAlerts}
                onChange={(e) => setEnableDailyAlerts(e.target.checked)}
                className="rounded text-amber-500 focus:ring-0"
              />
              <span>Enable Daily Target Notifications</span>
            </label>
          </div>
        </div>
      )}

      {/* STEP 3: Tutorial Cards */}
      {step === 3 && (
        <div className="w-full max-w-md my-auto py-4 space-y-4 animate-in fade-in duration-200">
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium mb-1.5">
              <Sparkles className="w-3 h-3" />
              <span>How CarDex Works</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-0.5">
              Spot. Scan. Collect.
            </h2>
            <p className="text-xs text-zinc-400">
              Three simple steps to build your ultimate real-world automotive garage.
            </p>
          </div>

          <div className="space-y-2.5">
            {/* Card 1: Spot */}
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white mb-0.5">1. Spot in the Wild</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Notice an interesting car on the street, motorway, or parking lot anywhere in the world.
                </p>
              </div>
            </div>

            {/* Card 2: Scan */}
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white mb-0.5">2. Scan with AI Vision</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Snap a quick photo. CarDex identifies the exact manufacturer, model, year, and power statistics.
                </p>
              </div>
            </div>

            {/* Card 3: Collect */}
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white mb-0.5">3. Master Brand Garages</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Register the car into your brand garage, unlock rarity badges, and achieve 100% brand mastery.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Buttons */}
      <div className="w-full max-w-md pt-3 pb-2 flex items-center justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((prev) => (prev - 1) as 1 | 2)}
            className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            type="button"
            id="onboarding-next-btn"
            onClick={() => setStep((prev) => (prev + 1) as 2 | 3)}
            className="py-2.5 px-5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md ml-auto"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            id="onboarding-launch-btn"
            onClick={handleFinish}
            className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg ml-auto"
          >
            <span>Launch CarDex</span>
            <Check className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
