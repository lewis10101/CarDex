import { BrandInfo, CollectionCar, UserCarCollectionState, CarRarity } from '../types';
import { ALL_BRANDS_CATALOG } from './brandsCatalog';
import { resolveParentModel, cleanToCoreModelName } from '../utils/modelResolver';

export const COLLECTION_STATE_KEY = 'cardex_collection_v2_state';

// Comprehensive catalog of 140+ car brands found on UK roads
export const BRANDS_CATALOG: BrandInfo[] = ALL_BRANDS_CATALOG;

// Default collection starts completely clean (0 cars collected)
// Prevents auto-resurrecting old starter cars from 2024 when user clears or resets data
export const DEFAULT_SEED_COLLECTION: Record<string, UserCarCollectionState> = {};

export const COLLECTION_INITIALIZED_KEY = 'cardex_collection_initialized_flag';

export function getCarCollectionState(): Record<string, UserCarCollectionState> {
  try {
    const raw = localStorage.getItem(COLLECTION_STATE_KEY);
    const initialized = localStorage.getItem(COLLECTION_INITIALIZED_KEY);

    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        // Strip out any legacy ghost 2024 seed items that may have lingered from previous app versions
        let hasLegacy2024 = false;
        const cleaned: Record<string, UserCarCollectionState> = {};
        for (const [key, val] of Object.entries(parsed)) {
          const item = val as UserCarCollectionState;
          if (item && item.firstScannedDate && item.firstScannedDate.includes('2024')) {
            hasLegacy2024 = true;
            continue; // purge legacy 2024 starter car
          }
          cleaned[key] = item;
        }
        if (hasLegacy2024) {
          localStorage.setItem(COLLECTION_STATE_KEY, JSON.stringify(cleaned));
        }
        return cleaned;
      }
    }

    // First-time or reset state: persist clean empty state
    localStorage.setItem(COLLECTION_INITIALIZED_KEY, 'true');
    localStorage.setItem(COLLECTION_STATE_KEY, JSON.stringify({}));
    return {};
  } catch (e) {
    console.warn('Could not read collection state from storage:', e);
  }
  return {};
}

export function saveCarCollectionState(state: Record<string, UserCarCollectionState>): void {
  try {
    localStorage.setItem(COLLECTION_INITIALIZED_KEY, 'true');
    localStorage.setItem(COLLECTION_STATE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
  } catch (e) {
    console.warn('LocalStorage quota reached in saveCarCollectionState. Initiating progressive quota-safe save...', e);
    
    // Multi-tier recovery:
    // Attempt 1: Retain user photos only on the latest 5 cars
    // Attempt 2: Retain user photo only on the latest 1 car
    // Attempt 3: Strip all image dataUrls completely, ensuring 100% of all car records, counts, and dates are saved!
    const tiers = [5, 1, 0];
    let saved = false;

    for (const maxPhotos of tiers) {
      try {
        const keys = Object.keys(state);
        const safeState: Record<string, UserCarCollectionState> = {};
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          const item = state[k];
          if (maxPhotos === 0 || (i < keys.length - maxPhotos && item.userPhoto)) {
            safeState[k] = {
              ...item,
              userPhoto: undefined,
              colorSpots: (item.colorSpots || []).map((spot) => ({ ...spot, photoUrl: undefined })),
            };
          } else {
            safeState[k] = item;
          }
        }
        localStorage.setItem(COLLECTION_STATE_KEY, JSON.stringify(safeState));
        window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
        saved = true;
        break;
      } catch (tierErr) {
        console.warn(`Quota recovery tier with ${maxPhotos} photos exceeded. Retrying with stricter limit...`, tierErr);
      }
    }

    if (!saved) {
      console.error('Critical quota error in saveCarCollectionState: unable to write even text metadata.');
    }
  }
}

// Permanently reset all collected cars and colours to empty (0 cars, 0 colours)
export function resetCarCollectionState(): void {
  try {
    localStorage.setItem(COLLECTION_INITIALIZED_KEY, 'true');
    localStorage.setItem(COLLECTION_STATE_KEY, JSON.stringify({}));
    window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
    window.dispatchEvent(new Event('cardex_data_cleared'));
  } catch (e) {
    console.error('Could not reset collection state:', e);
  }
}

// Calculate Brand Completion stats
export function getBrandCompletion(brand: BrandInfo, state: Record<string, UserCarCollectionState>) {
  const total = brand.cars.length;
  if (total === 0) return { total: 0, collected: 0, percentage: 0, isMastered: false };

  const collected = brand.cars.filter((car) => {
    const carState = state[car.id];
    return carState && carState.isCollected;
  }).length;

  const percentage = Math.round((collected / total) * 100);
  const isMastered = collected === total && total > 0;

  return { total, collected, percentage, isMastered };
}

// Check if a car has unlocked Colour Mastery (all variants collected)
export function isCarColourMastered(car: CollectionCar, state?: UserCarCollectionState): boolean {
  if (!state || !state.isCollected) return false;
  if (!car.colorVariants || car.colorVariants.length === 0) return false;
  // All variant names collected
  return car.colorVariants.every((variant) => state.collectedColors.includes(variant.name));
}

// Toggle collected status of a car
export function toggleCarCollected(carId: string, forceStatus?: boolean): Record<string, UserCarCollectionState> {
  const current = getCarCollectionState();
  const existing = current[carId] || {
    carId,
    isCollected: false,
    collectedColors: [],
    scanCount: 0,
  };

  const nextStatus = forceStatus !== undefined ? forceStatus : !existing.isCollected;
  const now = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

  if (!nextStatus) {
    // Completely uncollect / delete from garage state
    delete current[carId];
    saveCarCollectionState(current);
    return current;
  }

  // Find car in catalog to get first color if none collected
  let updatedColors = existing.collectedColors;
  if (updatedColors.length === 0) {
    const allCars = BRANDS_CATALOG.flatMap((b) => b.cars);
    const carDef = allCars.find((c) => c.id === carId);
    if (carDef && carDef.colorVariants.length > 0) {
      updatedColors = [carDef.colorVariants[0].name];
    }
  }

  current[carId] = {
    ...existing,
    isCollected: true,
    collectedColors: updatedColors,
    scanCount: Math.max(1, existing.scanCount || 0),
    firstScannedDate: existing.firstScannedDate || now,
    lastScannedDate: now,
  };

  saveCarCollectionState(current);
  return current;
}

// Permanently uncollect / remove car from user collection
export function uncollectCar(carId: string): Record<string, UserCarCollectionState> {
  const current = getCarCollectionState();
  if (current[carId]) {
    delete current[carId];
    saveCarCollectionState(current);
  }
  return current;
}

// Remove or decrement a car scan from user collection when user deletes a scanned car entry
export function removeScanFromCollection(make?: string, model?: string): void {
  if (!make && !model) return;
  try {
    const current = getCarCollectionState();
    const resolved = resolveParentModel(model || '', make) || (make && model ? resolveParentModel(`${make} ${model}`) : null);
    const resolvedBrandName = resolved?.brand || make || '';
    const resolvedModelName = resolved?.parentModel || (model ? cleanToCoreModelName(model, resolvedBrandName) : '');

    const cleanMake = resolvedBrandName.toLowerCase().trim();
    const cleanModel = resolvedModelName.toLowerCase().trim();

    const brand = BRANDS_CATALOG.find(
      (b) => b.name.toLowerCase() === cleanMake || b.name.toLowerCase().includes(cleanMake) || cleanMake.includes(b.name.toLowerCase())
    );
    if (!brand) return;

    const matchedCar = brand.cars.find(
      (c) =>
        c.name.toLowerCase() === cleanModel ||
        cleanModel.includes(c.name.toLowerCase()) ||
        c.id.replace(/-/g, ' ').includes(cleanModel)
    );

    if (matchedCar && current[matchedCar.id]) {
      const entry = current[matchedCar.id];
      if (entry.scanCount && entry.scanCount > 1) {
        entry.scanCount -= 1;
      } else {
        delete current[matchedCar.id];
      }
      saveCarCollectionState(current);
    }
  } catch (err) {
    console.warn('Could not remove scan from collection:', err);
  }
}

// Toggle a specific colour variant of a car
export function toggleCarColor(carId: string, colorName: string): Record<string, UserCarCollectionState> {
  const current = getCarCollectionState();
  const existing = current[carId] || {
    carId,
    isCollected: false,
    collectedColors: [],
    scanCount: 0,
  };

  const hasColor = existing.collectedColors.includes(colorName);
  let nextColors: string[];

  if (hasColor) {
    nextColors = existing.collectedColors.filter((c) => c !== colorName);
  } else {
    nextColors = [...existing.collectedColors, colorName];
  }

  const now = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const isNowCollected = nextColors.length > 0;

  current[carId] = {
    ...existing,
    isCollected: isNowCollected,
    collectedColors: nextColors,
    scanCount: isNowCollected ? Math.max(1, existing.scanCount) : 0,
    firstScannedDate: existing.firstScannedDate || (isNowCollected ? now : undefined),
    lastScannedDate: isNowCollected ? now : existing.lastScannedDate,
  };

  saveCarCollectionState(current);
  return current;
}

// Set a custom/user-submitted photo for a car
export function setCarUserPhoto(
  carId: string,
  photoDataUrl: string,
  variantName?: string
): Record<string, UserCarCollectionState> {
  const current = getCarCollectionState();
  const existing = current[carId] || {
    carId,
    isCollected: true,
    collectedColors: [],
    colorSpots: [],
    scanCount: 1,
    firstScannedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    lastScannedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
  };

  const updatedSpots = [...(existing.colorSpots || [])];
  if (variantName) {
    const spotIdx = updatedSpots.findIndex((s) => s.colorName.toLowerCase() === variantName.toLowerCase());
    if (spotIdx >= 0) {
      updatedSpots[spotIdx] = {
        ...updatedSpots[spotIdx],
        photoUrl: photoDataUrl,
      };
    } else {
      updatedSpots.push({
        colorName: variantName,
        baseColor: variantName,
        hex: '#71717A',
        photoUrl: photoDataUrl,
        scannedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      });
    }
  }

  current[carId] = {
    ...existing,
    isCollected: true,
    userPhoto: photoDataUrl,
    colorSpots: updatedSpots,
  };

  saveCarCollectionState(current);
  return current;
}

// Clear a custom user photo for a car
export function clearCarUserPhoto(carId: string): Record<string, UserCarCollectionState> {
  const current = getCarCollectionState();
  if (current[carId]) {
    const updated = { ...current[carId] };
    delete updated.userPhoto;
    current[carId] = updated;
    saveCarCollectionState(current);
  }
  return current;
}

// Remove an individual car completely from the user's collection
export function removeCarFromUserCollection(carId: string): boolean {
  const current = getCarCollectionState();
  if (current[carId]) {
    delete current[carId];
    saveCarCollectionState(current);
    try {
      const rawPinned = localStorage.getItem('cardex_garage_pinned');
      if (rawPinned) {
        const pinned: string[] = JSON.parse(rawPinned);
        if (pinned.includes(carId)) {
          const updatedPinned = pinned.filter((id) => id !== carId);
          localStorage.setItem('cardex_garage_pinned', JSON.stringify(updatedPinned));
        }
      }
    } catch {
      // ignore
    }
    window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
    window.dispatchEvent(new CustomEvent('cardex_garage_updated'));
    return true;
  }
  return false;
}

export interface CarScanResult {
  carAdded: boolean;
  isDuplicate: boolean;
  isNewColor: boolean;
  brandName?: string;
  carName?: string;
  carId?: string;
  car?: CollectionCar;
  colorName?: string;
  colorHex?: string;
  xpAwarded: number;
}

// Record a car scan from ScannerPage with color variants and duplicate detection
export function recordCarScanToCollection(
  make: string,
  model: string,
  detectedColor?: { name: string; baseColor?: string; hex?: string } | string,
  userPhoto?: string
): CarScanResult {
  try {
    const current = getCarCollectionState();
    // 1. First resolve parent model and brand via universal resolver
    const resolved = resolveParentModel(model, make) || resolveParentModel(`${make} ${model}`);
    const resolvedBrandName = resolved?.brand || make;
    const resolvedModelName = resolved?.parentModel || cleanToCoreModelName(model, resolvedBrandName);

    const cleanMake = resolvedBrandName.toLowerCase().trim();
    const cleanModel = resolvedModelName.toLowerCase().trim();

    // Match brand or dynamically create to guarantee every scan is saved
    let brand = BRANDS_CATALOG.find(
      (b) => b.name.toLowerCase() === cleanMake || b.name.toLowerCase().includes(cleanMake) || cleanMake.includes(b.name.toLowerCase())
    );

    if (!brand) {
      brand = {
        id: cleanMake.replace(/[^a-z0-9]/g, '-') || 'brand-' + Date.now(),
        name: resolvedBrandName.charAt(0).toUpperCase() + resolvedBrandName.slice(1),
        country: 'Global',
        founded: '1900',
        cars: [],
      };
      BRANDS_CATALOG.push(brand);
    }

    // Match car in brand - prioritize exact core model match or dynamically create
    let matchedCar =
      brand.cars.find((c) => c.name.toLowerCase() === cleanModel) ||
      brand.cars.find(
        (c) =>
          c.name.toLowerCase().includes(cleanModel) ||
          cleanModel.includes(c.name.toLowerCase()) ||
          cleanModel.includes(c.id.replace(/-/g, ' '))
      );

    if (!matchedCar) {
      const safeId = (cleanMake + '-' + cleanModel).replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 45) || 'car-' + Date.now();
      matchedCar = {
        id: safeId,
        name: resolvedModelName ? (resolvedModelName.charAt(0).toUpperCase() + resolvedModelName.slice(1)) : (model || 'Custom Model'),
        brand: brand.name,
        country: brand.country,
        yearIntroduced: 2023,
        rarity: 'Rare' as CarRarity,
        image: '',
        category: 'Spotter Discovery',
        colorVariants: [
          { name: 'Factory Spec', baseColor: 'Standard', hex: '#666666' }
        ],
        trivia: `Discovered and registered live via CarDex Scanner.`,
      };
      brand.cars.push(matchedCar);
    }

    const existing = current[matchedCar.id] || {
      carId: matchedCar.id,
      isCollected: false,
      collectedColors: [],
      colorSpots: [],
      scanCount: 0,
    };

    // Determine detected color metadata
    let rawColorName = '';
    let rawBaseColor = '';
    let rawHex = '#888888';

    if (detectedColor && typeof detectedColor === 'object') {
      rawColorName = (detectedColor.name || '').trim();
      rawBaseColor = (detectedColor.baseColor || detectedColor.name || '').trim();
      rawHex = detectedColor.hex || '#888888';
    } else if (typeof detectedColor === 'string' && detectedColor.trim()) {
      rawColorName = detectedColor.trim();
      rawBaseColor = detectedColor.trim();
    }

    // Match to known catalog variants or create custom color variant
    let finalColorName = rawColorName;
    let finalBaseColor = rawBaseColor;
    let finalHex = rawHex;

    const matchVariant = matchedCar.colorVariants.find(
      (v) =>
        (rawColorName && v.name.toLowerCase() === rawColorName.toLowerCase()) ||
        (rawBaseColor && v.baseColor.toLowerCase() === rawBaseColor.toLowerCase()) ||
        (rawColorName && v.name.toLowerCase().includes(rawColorName.toLowerCase())) ||
        (rawBaseColor && v.name.toLowerCase().includes(rawBaseColor.toLowerCase()))
    );

    if (matchVariant) {
      finalColorName = rawColorName || matchVariant.name;
      finalBaseColor = matchVariant.baseColor;
      finalHex = matchVariant.hex || rawHex;
    } else if (!finalColorName) {
      finalColorName = matchedCar.colorVariants[0]?.name || 'Standard';
      finalBaseColor = matchedCar.colorVariants[0]?.baseColor || 'Grey';
      finalHex = matchedCar.colorVariants[0]?.hex || '#888888';
    }

    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const isAlreadyCarCollected = Boolean(existing.isCollected);
    const existingSpots = existing.colorSpots || [];

    // Check if this specific color variant was already collected for this car
    const hasThisColor =
      existing.collectedColors.some((c) => c.toLowerCase() === finalColorName.toLowerCase()) ||
      existingSpots.some(
        (s) =>
          s.colorName.toLowerCase() === finalColorName.toLowerCase() ||
          (finalBaseColor && s.baseColor.toLowerCase() === finalBaseColor.toLowerCase())
      );

    // CASE 1: DUPLICATE (Car already owned, and this same color variant has already been collected)
    if (isAlreadyCarCollected && hasThisColor) {
      const duplicateXp = 35; // Spotting XP bonus for duplicate encounter
      current[matchedCar.id] = {
        ...existing,
        scanCount: (existing.scanCount || 1) + 1,
        lastScannedDate: now,
      };
      saveCarCollectionState(current);

      return {
        carAdded: false,
        isDuplicate: true,
        isNewColor: false,
        brandName: brand.name,
        carName: matchedCar.name,
        carId: matchedCar.id,
        car: matchedCar,
        colorName: finalColorName,
        colorHex: finalHex,
        xpAwarded: duplicateXp,
      };
    }

    // CASE 2: NEW COLOR VARIANT (Car already owned, but user scanned a new, uncollected color)
    if (isAlreadyCarCollected && !hasThisColor) {
      const newColorXp = 100; // New color variant unlock bonus
      const nextColors = [...existing.collectedColors, finalColorName];
      const nextSpots = [
        ...existingSpots,
        {
          colorName: finalColorName,
          baseColor: finalBaseColor,
          hex: finalHex,
          photoUrl: userPhoto || existing.userPhoto || '',
          scannedAt: now,
        },
      ];

      current[matchedCar.id] = {
        ...existing,
        isCollected: true,
        collectedColors: nextColors,
        colorSpots: nextSpots,
        scanCount: (existing.scanCount || 1) + 1,
        lastScannedDate: now,
        // Update userPhoto to this new spot photo if user uploaded one
        userPhoto: userPhoto || existing.userPhoto,
      };
      saveCarCollectionState(current);

      return {
        carAdded: true,
        isDuplicate: false,
        isNewColor: true,
        brandName: brand.name,
        carName: matchedCar.name,
        carId: matchedCar.id,
        car: matchedCar,
        colorName: finalColorName,
        colorHex: finalHex,
        xpAwarded: newColorXp,
      };
    }

    // CASE 3: BRAND NEW CAR UNLOCKED
    const rarityXpMap: Record<string, number> = {
      Common: 80,
      Uncommon: 150,
      Rare: 350,
      'Ultra Rare': 600,
      Legendary: 1200,
      Epic: 500,
    };
    const newCarXp = rarityXpMap[matchedCar.rarity] || 120;

    const initialSpots = [
      {
        colorName: finalColorName,
        baseColor: finalBaseColor,
        hex: finalHex,
        photoUrl: userPhoto || '',
        scannedAt: now,
      },
    ];

    current[matchedCar.id] = {
      ...existing,
      isCollected: true,
      collectedColors: [finalColorName],
      colorSpots: initialSpots,
      scanCount: 1,
      firstScannedDate: now,
      lastScannedDate: now,
      userPhoto: userPhoto || '',
    };
    saveCarCollectionState(current);

    return {
      carAdded: true,
      isDuplicate: false,
      isNewColor: false,
      brandName: brand.name,
      carName: matchedCar.name,
      carId: matchedCar.id,
      car: matchedCar,
      colorName: finalColorName,
      colorHex: finalHex,
      xpAwarded: newCarXp,
    };
  } catch (e) {
    console.error('Error recording scan to collection:', e);
    return { carAdded: false, isDuplicate: false, isNewColor: false, xpAwarded: 0 };
  }
}
