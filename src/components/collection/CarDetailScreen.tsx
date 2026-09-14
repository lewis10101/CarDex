import React, { useState, useRef, useMemo } from 'react';
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Camera,
  Upload,
  RotateCcw,
} from 'lucide-react';
import {
  CollectionCar,
  UserCarCollectionState,
  CarRarity,
} from '../../types';
import {
  setCarUserPhoto,
  clearCarUserPhoto,
} from '../../data/collectionData';
import { addXp } from '../../services/progressionService';

interface CarDetailScreenProps {
  car: CollectionCar;
  state?: UserCarCollectionState;
  onBack: () => void;
  onStateUpdate: () => void;
}

// Client-side helper to compress image to safe dataURL before local storage
async function compressImageDataUrl(
  dataUrl: string,
  maxWidth = 900,
  maxHeight = 600,
  quality = 0.8
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } else {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

export function CarDetailScreen({
  car,
  state,
  onBack,
  onStateUpdate,
}: CarDetailScreenProps) {
  const isCollected = Boolean(state?.isCollected);
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Swipe gesture tracking refs
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Discovered variants list from real user scans
  interface DiscoveredVariantItem {
    name: string;
    baseColor: string;
    hex: string;
    photoUrl?: string;
    scannedAt?: string;
  }

  const discoveredVariants = useMemo<DiscoveredVariantItem[]>(() => {
    if (!isCollected) return [];

    const list: DiscoveredVariantItem[] = [];

    // 1. Color spots recorded during camera scans
    if (state?.colorSpots && state.colorSpots.length > 0) {
      state.colorSpots.forEach((spot) => {
        list.push({
          name: spot.colorName,
          baseColor: spot.baseColor,
          hex: spot.hex,
          photoUrl: spot.photoUrl,
          scannedAt: spot.scannedAt,
        });
      });
    }

    // 2. Collected colors without specific spots
    if (state?.collectedColors && state.collectedColors.length > 0) {
      state.collectedColors.forEach((colorName) => {
        if (!list.some((item) => item.name.toLowerCase() === colorName.toLowerCase())) {
          list.push({
            name: colorName,
            baseColor: colorName,
            hex: '#3B82F6',
            photoUrl: state.userPhoto,
            scannedAt: state.lastScannedDate,
          });
        }
      });
    }

    // 3. Fallback for scanned cars without specific color metadata
    if (list.length === 0) {
      list.push({
        name: 'Standard Variant',
        baseColor: 'Standard',
        hex: '#71717A',
        photoUrl: state?.userPhoto,
        scannedAt: state?.firstScannedDate,
      });
    }

    return list;
  }, [isCollected, state?.colorSpots, state?.collectedColors, state?.userPhoto, state?.firstScannedDate, state?.lastScannedDate]);

  const activeVariant = discoveredVariants[activeColorIndex] || discoveredVariants[0];
  const activePhoto = activeVariant?.photoUrl || (isCollected ? state?.userPhoto : undefined);
  const hasPhotoForActiveVariant = Boolean(activePhoto);

  // Handle user submitting or changing photo for this car or variant
  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingPhoto(true);
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const rawData = ev.target?.result as string;
        if (rawData) {
          const compressed = await compressImageDataUrl(rawData, 900, 600, 0.8);
          setCarUserPhoto(car.id, compressed, activeVariant?.name);
          addXp(75, `Uploaded photo for ${car.brand} ${car.name}`, 'spot');
          onStateUpdate();
          window.dispatchEvent(new CustomEvent('collection-updated'));
        }
        setIsUploadingPhoto(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Failed to process photo:', err);
      setIsUploadingPhoto(false);
    }
  };

  const handleRevertPhoto = () => {
    clearCarUserPhoto(car.id);
    onStateUpdate();
    window.dispatchEvent(new CustomEvent('collection-updated'));
  };

  // Swipe navigation logic
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || discoveredVariants.length <= 1) return;
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 40;

    if (diff > swipeThreshold) {
      handleNextColor();
    } else if (diff < -swipeThreshold) {
      handlePrevColor();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handlePrevColor = () => {
    if (discoveredVariants.length <= 1) return;
    setActiveColorIndex((prev) => (prev > 0 ? prev - 1 : discoveredVariants.length - 1));
  };

  const handleNextColor = () => {
    if (discoveredVariants.length <= 1) return;
    setActiveColorIndex((prev) => (prev < discoveredVariants.length - 1 ? prev + 1 : 0));
  };

  // Rarity styling badge
  const getRarityBadge = (rarity: CarRarity) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'Epic':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30';
      case 'Rare':
        return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30';
      case 'Uncommon':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'Common':
      default:
        return 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20';
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col bg-white dark:bg-zinc-950 pb-16">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{car.brand} Garage</span>
        </button>

        <span
          className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border ${getRarityBadge(
            car.rarity
          )}`}
        >
          {car.rarity}
        </span>
      </div>

      {/* Hidden file input for photo submission */}
      <input
        ref={photoInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoSelect}
      />

      {/* Hero Image / Missing Vehicle Slot Display */}
      <div
        className="relative w-full aspect-[16/10] bg-zinc-950 overflow-hidden select-none cursor-grab active:cursor-grabbing border-b border-zinc-800"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {!isCollected ? (
          /* Missing Vehicle Screen - clean silhouette, no stock photo */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900">
            <div className="w-16 h-16 rounded-3xl bg-zinc-800/80 border border-dashed border-zinc-700 flex items-center justify-center text-zinc-500 mb-3 shadow-inner">
              <svg
                className="w-8 h-8 opacity-80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider border border-zinc-700">
              Missing from Collection
            </span>
            <p className="text-xs text-zinc-400 mt-2 max-w-xs">
              Spot this {car.name} on the road and scan it to add your real photo to this card!
            </p>
          </div>
        ) : hasPhotoForActiveVariant && activePhoto ? (
          /* Scanned User Photo for Active Variant */
          <>
            <img
              src={activePhoto}
              alt={`${car.name} - ${activeVariant?.name || 'Scan'}`}
              className="w-full h-full object-cover transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10px] font-medium shadow-md">
              <Camera className="w-3 h-3" />
              <span>Your Spot Photo</span>
            </div>
            {activeVariant?.scannedAt && (
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-zinc-300 text-[10px] font-mono shadow-xs">
                <Calendar className="w-3 h-3 text-zinc-400" />
                <span>{activeVariant.scannedAt}</span>
              </div>
            )}
          </>
        ) : (
          /* Collected slot without user photo */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900">
            <div
              className="w-14 h-14 rounded-full border-2 border-dashed border-zinc-600 flex items-center justify-center mb-2 shadow-inner"
              style={{ backgroundColor: `${activeVariant?.hex || '#3B82F6'}22` }}
            >
              <span
                className="w-6 h-6 rounded-full ring-2 ring-white/40 shadow-xs"
                style={{ backgroundColor: activeVariant?.hex || '#3B82F6' }}
              />
            </div>
            <p className="text-sm font-semibold text-zinc-200">
              {activeVariant?.name || 'Unlocked Car'}
            </p>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs">
              Take or upload a photo to display your real spot here!
            </p>
          </div>
        )}

        {/* Dark bottom gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

        {/* Arrow Controls for switching variant photos if multiple colors scanned */}
        {discoveredVariants.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevColor}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
              aria-label="Previous colour variant"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNextColor}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
              aria-label="Next colour variant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Floating Active Variant Indicator if collected */}
        {isCollected && activeVariant && (
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full ring-2 ring-white/80 shadow-xs shrink-0"
                style={{ backgroundColor: activeVariant.hex }}
              />
              <span className="font-medium drop-shadow-xs">{activeVariant.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/90 font-medium text-white flex items-center gap-0.5">
                <Check className="w-2.5 h-2.5" /> Scanned
              </span>
            </div>

            {discoveredVariants.length > 1 && (
              <span className="text-[10px] text-zinc-300 font-mono">
                {activeColorIndex + 1} / {discoveredVariants.length}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Photo Actions Bar for collected cars */}
      {isCollected && (
        <div className="px-4 py-2 bg-zinc-100 dark:bg-zinc-850 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300">
            <Camera className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[11px]">
              {hasPhotoForActiveVariant
                ? `Showing photo for ${activeVariant?.name || 'variant'}`
                : `No photo for ${activeVariant?.name || 'variant'}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {hasPhotoForActiveVariant && (
              <button
                type="button"
                onClick={handleRevertPhoto}
                className="px-2 py-1 rounded-md text-[11px] text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors flex items-center gap-1 cursor-pointer"
                title="Remove photo"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
            <button
              type="button"
              disabled={isUploadingPhoto}
              onClick={() => photoInputRef.current?.click()}
              className="px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <Upload className="w-3 h-3 text-amber-500" />
              <span>
                {isUploadingPhoto
                  ? 'Saving...'
                  : hasPhotoForActiveVariant
                  ? 'Change Photo'
                  : 'Upload Photo'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Discovered Colour Variant Selector (only if multiple colors scanned) */}
      {isCollected && discoveredVariants.length > 1 && (
        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {discoveredVariants.map((variant, idx) => {
              const isSelected = idx === activeColorIndex;
              const hasPhoto = Boolean(variant.photoUrl);
              return (
                <button
                  key={`${variant.name}-${idx}`}
                  type="button"
                  onClick={() => setActiveColorIndex(idx)}
                  className={`relative p-1 rounded-full transition-transform cursor-pointer ${
                    isSelected ? 'scale-125 ring-2 ring-zinc-900 dark:ring-zinc-100' : 'hover:scale-110'
                  }`}
                  title={`${variant.name} (${hasPhoto ? 'Photo saved' : 'Discovered'})`}
                >
                  <span
                    className="w-4 h-4 rounded-full block shadow-xs ring-1 ring-zinc-400 dark:ring-zinc-600"
                    style={{ backgroundColor: variant.hex }}
                  />
                  {hasPhoto && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 ring-1 ring-zinc-900" />
                  )}
                </button>
              );
            })}
          </div>

          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 shrink-0 pl-2 font-mono">
            {discoveredVariants.filter((v) => v.photoUrl).length}/{discoveredVariants.length} photos
          </span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="p-4 space-y-4">
        {/* Car Name & Key Identity */}
        <div>
          <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-0.5">
            {car.brand} &bull; {car.country}
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {car.name}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
            Introduced in {car.yearIntroduced}
          </p>
        </div>

        {/* Real Base Performance Specs */}
        {car.horsepower && (
          <div className="grid grid-cols-3 gap-2 py-1">
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 text-center">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block uppercase">Base Power</span>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {car.horsepower} HP
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 text-center">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block uppercase">Base Top Speed</span>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {car.topSpeed} mph
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 text-center">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block uppercase">0-60 mph</span>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {car.zeroToSixty}s
              </span>
            </div>
          </div>
        )}

        {/* Discovered Colours Section */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              Discovered Colours
            </h3>
            {isCollected && (
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
                {discoveredVariants.length} {discoveredVariants.length === 1 ? 'colour variant' : 'colour variants'}
              </span>
            )}
          </div>

          {isCollected ? (
            <div className="grid grid-cols-1 gap-2">
              {discoveredVariants.map((variant, index) => {
                const isSelected = index === activeColorIndex;
                return (
                  <button
                    key={`${variant.name}-${index}`}
                    type="button"
                    onClick={() => setActiveColorIndex(index)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800/80 shadow-xs'
                        : 'border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-5 h-5 rounded-full shrink-0 ring-1 ring-zinc-400 dark:ring-zinc-500 shadow-2xs"
                        style={{ backgroundColor: variant.hex }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
                          {variant.name}
                        </p>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                          {variant.scannedAt ? `Spotted ${variant.scannedAt}` : 'Discovered in scan'}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 ml-1 flex items-center gap-1.5">
                      {variant.photoUrl ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-1">
                          <Camera className="w-2.5 h-2.5" /> Photo Saved
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                          Discovered
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 text-center">
              <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                Single Slot — Not yet scanned
              </p>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">
                Scan this car in the wild to reveal its real color and add your own photo to the collection.
              </p>
            </div>
          )}
        </div>

        {/* Scan History & Times Scanned */}
        <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-zinc-500" />
              Scan History
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              {state?.scanCount || 0} {(state?.scanCount || 0) === 1 ? 'scan' : 'scans'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-zinc-200/60 dark:border-zinc-800">
            <div>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">First Discovered</span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {state?.firstScannedDate || 'Not yet discovered'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">Last Spotted</span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {state?.lastScannedDate || '—'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
