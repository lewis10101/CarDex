// My Garage Service for CarDex
// Manages:
// 1. My Cars: Pinned cars, personal notes, XP calculation
// 2. My Collections: User-created playlist collections
// 3. My Custom Cars: Metadata (notes, tags, colors)
// 4. My Highlights: Rarest spot, first scan, single spot max XP, completed brands, milestones
// 5. My Spotting Timeline: Chronological timeline with XP, brand progress, colors
// 6. My Stats: Spotting streak, most spotted brand, rarest brand, common color, XP/day
// 7. My Brand Wall: Spotted brands with completion %, rarest car, missing models
// 8. My Dream Garage (Wishlist): Saved wishlist cars with dream/rare/must-spot tags
// 9. My Daily Targets: History, streaks, rarity tiers
// 10. Owner Controls simulation & resets

import { CollectionCar, UserCarCollectionState, CarRarity } from '../types';
import { BRANDS_CATALOG, getCarCollectionState, saveCarCollectionState, getBrandCompletion } from '../data/collectionData';
import { getScannedCarsHistory, ScannedCarEntry, saveScannedCar, getCustomCarsList, CustomCarItem } from '../data/userDataStorage';
import { getDailyTargetState, DailySpottingTargetState } from '../data/dailyTargetService';
import { addXp } from './progressionService';

export const GARAGE_ENABLED_KEY = 'cardex_garage_enabled';
export const GARAGE_PINNED_CARS_KEY = 'cardex_garage_pinned_cars';
export const GARAGE_CAR_NOTES_KEY = 'cardex_garage_car_notes';
export const GARAGE_COLLECTIONS_KEY = 'cardex_garage_user_collections';
export const GARAGE_CUSTOM_METADATA_KEY = 'cardex_garage_custom_metadata';
export const GARAGE_WISHLIST_KEY = 'cardex_garage_wishlist';
export const GARAGE_TARGET_LOGS_KEY = 'cardex_garage_target_history_logs';

export type WishlistTag = 'dream' | 'rare' | 'must-spot';

export interface WishlistItem {
  carId: string;
  carName: string;
  brand: string;
  country?: string;
  image?: string;
  rarity?: CarRarity;
  tag: WishlistTag;
  addedAt: string;
  notes?: string;
}

export interface MyGarageCollection {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  carIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomCarMetadata {
  notes?: string;
  tags?: string[];
  colors?: string[];
}

export interface DailyTargetHistoryLog {
  id: string;
  date: string;
  brandId: string;
  brandName: string;
  country: string;
  rarityTier: string;
  rarityLabel: string;
  completed: boolean;
  xpBounty: number;
}

// ----------------------------------------------------
// Feature Flag: Enable/Disable My Garage
// ----------------------------------------------------
export function isMyGarageEnabled(): boolean {
  try {
    const val = localStorage.getItem(GARAGE_ENABLED_KEY);
    return val !== 'false';
  } catch {
    return true;
  }
}

export function setMyGarageEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(GARAGE_ENABLED_KEY, enabled ? 'true' : 'false');
    window.dispatchEvent(new CustomEvent('cardex_garage_updated'));
  } catch {
    // ignore
  }
}

// ----------------------------------------------------
// XP Calculation per Spot
// ----------------------------------------------------
export function calculateSpotXp(rarity?: CarRarity, colorCount = 1): number {
  let base = 125;
  switch (rarity) {
    case 'Legendary':
    case 'Ultra Rare':
      base = 500;
      break;
    case 'Epic':
      base = 350;
      break;
    case 'Rare':
      base = 250;
      break;
    case 'Uncommon':
      base = 175;
      break;
    case 'Common':
    default:
      base = 125;
      break;
  }
  const colorBonus = Math.max(0, colorCount - 1) * 50;
  return base + colorBonus;
}

// ----------------------------------------------------
// Section 1: My Cars (Pinned & Notes)
// ----------------------------------------------------
export function getPinnedCarIds(): string[] {
  try {
    const raw = localStorage.getItem(GARAGE_PINNED_CARS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export function togglePinCar(carId: string): boolean {
  try {
    const current = getPinnedCarIds();
    let updated: string[];
    let isPinned = false;
    if (current.includes(carId)) {
      updated = current.filter((id) => id !== carId);
    } else {
      updated = [carId, ...current];
      isPinned = true;
    }
    localStorage.setItem(GARAGE_PINNED_CARS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('cardex_garage_updated'));
    return isPinned;
  } catch {
    return false;
  }
}

export function getCarNotes(): Record<string, string> {
  try {
    const raw = localStorage.getItem(GARAGE_CAR_NOTES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch {
    // ignore
  }
  return {};
}

export function saveCarNote(carId: string, note: string): void {
  try {
    const notes = getCarNotes();
    if (note.trim()) {
      notes[carId] = note.trim();
    } else {
      delete notes[carId];
    }
    localStorage.setItem(GARAGE_CAR_NOTES_KEY, JSON.stringify(notes));
    window.dispatchEvent(new CustomEvent('cardex_garage_updated'));
  } catch {
    // ignore
  }
}

// ----------------------------------------------------
// Section 2: My Collections (Playlists)
// ----------------------------------------------------
export function getUserCollections(): MyGarageCollection[] {
  try {
    const raw = localStorage.getItem(GARAGE_COLLECTIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export function saveUserCollections(collections: MyGarageCollection[]): void {
  try {
    localStorage.setItem(GARAGE_COLLECTIONS_KEY, JSON.stringify(collections));
    window.dispatchEvent(new CustomEvent('cardex_garage_updated'));
  } catch {
    // ignore
  }
}

export function createUserCollection(
  title: string,
  description?: string,
  coverImage?: string,
  initialCarIds: string[] = []
): MyGarageCollection {
  const collections = getUserCollections();
  const newCol: MyGarageCollection = {
    id: 'col_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    title: title.trim(),
    description: description?.trim(),
    coverImage: coverImage?.trim(),
    carIds: initialCarIds,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  collections.unshift(newCol);
  saveUserCollections(collections);
  return newCol;
}

export function updateUserCollection(
  id: string,
  updates: Partial<Omit<MyGarageCollection, 'id' | 'createdAt'>>
): void {
  const collections = getUserCollections();
  const index = collections.findIndex((c) => c.id === id);
  if (index !== -1) {
    collections[index] = {
      ...collections[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveUserCollections(collections);
  }
}

export function deleteUserCollection(id: string): void {
  const collections = getUserCollections().filter((c) => c.id !== id);
  saveUserCollections(collections);
}

export function toggleCarInCollection(collectionId: string, carId: string): boolean {
  const collections = getUserCollections();
  const index = collections.findIndex((c) => c.id === collectionId);
  if (index === -1) return false;

  const col = collections[index];
  let inCollection = false;
  let updatedCarIds: string[];

  if (col.carIds.includes(carId)) {
    updatedCarIds = col.carIds.filter((id) => id !== carId);
  } else {
    updatedCarIds = [...col.carIds, carId];
    inCollection = true;
  }

  collections[index] = {
    ...col,
    carIds: updatedCarIds,
    updatedAt: new Date().toISOString(),
  };
  saveUserCollections(collections);
  return inCollection;
}

export function addCarToCollection(collectionId: string, carId: string): void {
  const collections = getUserCollections();
  const index = collections.findIndex((c) => c.id === collectionId);
  if (index !== -1 && !collections[index].carIds.includes(carId)) {
    collections[index] = {
      ...collections[index],
      carIds: [...collections[index].carIds, carId],
      updatedAt: new Date().toISOString(),
    };
    saveUserCollections(collections);
  }
}

export function removeCarFromCollection(collectionId: string, carId: string): void {
  const collections = getUserCollections();
  const index = collections.findIndex((c) => c.id === collectionId);
  if (index !== -1 && collections[index].carIds.includes(carId)) {
    collections[index] = {
      ...collections[index],
      carIds: collections[index].carIds.filter((id) => id !== carId),
      updatedAt: new Date().toISOString(),
    };
    saveUserCollections(collections);
  }
}

// ----------------------------------------------------
// Section 3: My Custom Cars Metadata
// ----------------------------------------------------
export function getCustomCarsMetadata(): Record<string, CustomCarMetadata> {
  try {
    const raw = localStorage.getItem(GARAGE_CUSTOM_METADATA_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch {
    // ignore
  }
  return {};
}

export function getCustomCarMetadata(carId: string): CustomCarMetadata | undefined {
  return getCustomCarsMetadata()[carId];
}

export function saveCustomCarMetadata(carId: string, metadata: CustomCarMetadata): void {
  try {
    const all = getCustomCarsMetadata();
    all[carId] = {
      ...all[carId],
      ...metadata,
    };
    localStorage.setItem(GARAGE_CUSTOM_METADATA_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent('cardex_garage_updated'));
  } catch {
    // ignore
  }
}

// ----------------------------------------------------
// Section 8: My Dream Garage (Wishlist)
// ----------------------------------------------------
export function getWishlist(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(GARAGE_WISHLIST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export function saveWishlist(items: WishlistItem[]): void {
  try {
    localStorage.setItem(GARAGE_WISHLIST_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cardex_garage_updated'));
    window.dispatchEvent(new CustomEvent('cardex_wishlist_updated', { detail: items }));
  } catch {
    // ignore
  }
}

export function addToWishlist(car: CollectionCar, tag: WishlistTag = 'dream', notes?: string): WishlistItem {
  const current = getWishlist();
  const existingIdx = current.findIndex((item) => item.carId === car.id);
  const newItem: WishlistItem = {
    carId: car.id,
    carName: car.name,
    brand: car.brand,
    country: car.country,
    image: car.image,
    rarity: car.rarity,
    tag,
    addedAt: new Date().toISOString(),
    notes: notes?.trim(),
  };

  if (existingIdx !== -1) {
    current[existingIdx] = newItem;
  } else {
    current.unshift(newItem);
  }
  saveWishlist(current);
  return newItem;
}

export function removeFromWishlist(carId: string): void {
  const current = getWishlist().filter((item) => item.carId !== carId);
  saveWishlist(current);
}

export function updateWishlistTag(carId: string, tag: WishlistTag): void {
  const current = getWishlist();
  const item = current.find((i) => i.carId === carId);
  if (item) {
    item.tag = tag;
    saveWishlist(current);
  }
}

// ----------------------------------------------------
// Section 9: Daily Targets History Log
// ----------------------------------------------------
export function getDailyTargetLogs(): DailyTargetHistoryLog[] {
  try {
    const raw = localStorage.getItem(GARAGE_TARGET_LOGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }

  // Seed default or current if empty
  const current = getDailyTargetState();
  if (current && current.targetBrand) {
    return [
      {
        id: 'log_today',
        date: 'Today',
        brandId: current.targetBrand.id,
        brandName: current.targetBrand.name,
        country: current.targetBrand.country,
        rarityTier: current.targetBrand.rarityTier,
        rarityLabel: current.targetBrand.rarity,
        completed: current.completed,
        xpBounty: current.xpBounty,
      },
    ];
  }
  return [];
}

export function recordDailyTargetLog(log: Omit<DailyTargetHistoryLog, 'id'>): void {
  try {
    const logs = getDailyTargetLogs();
    const newLog: DailyTargetHistoryLog = {
      ...log,
      id: 'log_' + Date.now(),
    };
    logs.unshift(newLog);
    const trimmed = logs.slice(0, 30);
    localStorage.setItem(GARAGE_TARGET_LOGS_KEY, JSON.stringify(trimmed));
    window.dispatchEvent(new CustomEvent('cardex_garage_updated'));
  } catch {
    // ignore
  }
}

// ----------------------------------------------------
// Section 4 & 6: Highlights & Compact Stats Calculation
// ----------------------------------------------------
export function getMyGarageStatsAndHighlights() {
  const scannedHistory = getScannedCarsHistory();
  const collectionState = getCarCollectionState();

  // Find all user's collected cars from catalog
  const collectedCars: { car: CollectionCar; state: UserCarCollectionState }[] = [];
  const brandCounts: Record<string, number> = {};
  const colorCounts: Record<string, number> = {};
  let totalXpEarned = 0;
  let maxSingleSpotXp = 0;
  let rarestCar: CollectionCar | null = null;
  const rarityRank: Record<CarRarity, number> = {
    'Common': 1,
    'Uncommon': 2,
    'Rare': 3,
    'Epic': 4,
    'Legendary': 5,
    'Ultra Rare': 6,
  };

  BRANDS_CATALOG.forEach((brand) => {
    brand.cars.forEach((c) => {
      const state = collectionState[c.id];
      if (state && state.isCollected) {
        collectedCars.push({ car: c, state });
        brandCounts[c.brand] = (brandCounts[c.brand] || 0) + 1;

        // Colors
        if (state.collectedColors) {
          state.collectedColors.forEach((color) => {
            colorCounts[color] = (colorCounts[color] || 0) + 1;
          });
        }

        // Spot XP
        const xp = calculateSpotXp(c.rarity, state.collectedColors?.length || 1);
        totalXpEarned += xp;
        if (xp > maxSingleSpotXp) {
          maxSingleSpotXp = xp;
        }

        // Rarest check
        if (!rarestCar || (rarityRank[c.rarity] || 0) > (rarityRank[rarestCar.rarity] || 0)) {
          rarestCar = c;
        }
      }
    });
  });

  // Most spotted brand
  let mostSpottedBrand = 'None';
  let maxBrandCount = 0;
  Object.entries(brandCounts).forEach(([b, cnt]) => {
    if (cnt > maxBrandCount) {
      maxBrandCount = cnt;
      mostSpottedBrand = b;
    }
  });

  // Most common color
  let mostCommonColor = 'None';
  let maxColorCount = 0;
  Object.entries(colorCounts).forEach(([color, cnt]) => {
    if (cnt > maxColorCount) {
      maxColorCount = cnt;
      mostCommonColor = color;
    }
  });

  // Completed brands
  let completedBrandsCount = 0;
  const completedBrandNames: string[] = [];
  BRANDS_CATALOG.forEach((brand) => {
    const { isMastered } = getBrandCompletion(brand, collectionState);
    if (isMastered) {
      completedBrandsCount++;
      completedBrandNames.push(brand.name);
    }
  });

  // First car ever scanned
  let firstScannedCar: ScannedCarEntry | null = null;
  if (scannedHistory.length > 0) {
    firstScannedCar = scannedHistory[scannedHistory.length - 1]; // chronological first
  }

  // Spotting streak (calculated from distinct days in scan history)
  const scanDays = new Set(
    scannedHistory.map((s) => new Date(s.scannedAt).toDateString())
  );
  const spottingStreak = Math.max(scanDays.size, scannedHistory.length > 0 ? 1 : 0);

  // XP per day (average over active days)
  const xpPerDay = scanDays.size > 0 ? Math.round(totalXpEarned / scanDays.size) : totalXpEarned;

  // Level progress
  let levelTitle = 'Rookie Scout';
  let levelNumber = 1;
  let nextThreshold = 5;
  const count = collectedCars.length;

  if (count >= 25) {
    levelTitle = 'Apex Spotter';
    levelNumber = 5;
    nextThreshold = 50;
  } else if (count >= 15) {
    levelTitle = 'Master Hunter';
    levelNumber = 4;
    nextThreshold = 25;
  } else if (count >= 8) {
    levelTitle = 'Pavement Tracker';
    levelNumber = 3;
    nextThreshold = 15;
  } else if (count >= 3) {
    levelTitle = 'Street Scout';
    levelNumber = 2;
    nextThreshold = 8;
  }

  return {
    totalCarsSpotted: count,
    mostSpottedBrand: maxBrandCount > 0 ? `${mostSpottedBrand} (${maxBrandCount})` : 'None yet',
    rarestBrandSpotted: rarestCar ? `${(rarestCar as CollectionCar).brand} (${(rarestCar as CollectionCar).rarity})` : 'None yet',
    mostCommonColour: maxColorCount > 0 ? `${mostCommonColor} (${maxColorCount})` : 'None yet',
    spottingStreak: `${spottingStreak} ${spottingStreak === 1 ? 'day' : 'days'}`,
    xpPerDay: `${xpPerDay.toLocaleString()} XP/day`,
    levelTitle,
    levelNumber,
    nextThreshold,
    progressPercent: Math.min(100, Math.round((count / nextThreshold) * 100)),
    highlights: {
      rarestCar,
      firstScannedCar,
      maxSingleSpotXp: maxSingleSpotXp || 125,
      completedBrandsCount,
      completedBrandNames,
    },
  };
}

export const getMyGarageStats = getMyGarageStatsAndHighlights;

// ----------------------------------------------------
// Developer / Owner Simulator & Reset Helpers
// ----------------------------------------------------
export function simulateAddSampleCarsToGarage(): void {
  const allCars = BRANDS_CATALOG.flatMap((b) => b.cars);
  const currentCollection = getCarCollectionState();

  // True Fisher-Yates shuffle to guarantee 5 truly random cars every time
  const shuffledCars = [...allCars];
  for (let i = shuffledCars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCars[i], shuffledCars[j]] = [shuffledCars[j], shuffledCars[i]];
  }

  // Pick 5 cars, preferring uncollected ones if available
  const uncollected = shuffledCars.filter((c) => !currentCollection[c.id]?.isCollected);
  const selectedFive = uncollected.length >= 5 ? uncollected.slice(0, 5) : shuffledCars.slice(0, 5);

  const sampleColors = [
    { name: 'Guards Red', hex: '#E30000', baseColor: 'Red' },
    { name: 'Miami Blue', hex: '#00A3E0', baseColor: 'Blue' },
    { name: 'Nardo Grey', hex: '#7D8082', baseColor: 'Grey' },
    { name: 'British Racing Green', hex: '#004225', baseColor: 'Green' },
    { name: 'Speed Yellow', hex: '#FFCC00', baseColor: 'Yellow' },
    { name: 'Frozen White', hex: '#F0F3F5', baseColor: 'White' },
    { name: 'Midnight Black', hex: '#0D0D0D', baseColor: 'Black' },
    { name: 'Sunset Orange', hex: '#E65100', baseColor: 'Orange' },
    { name: 'Papaya Spark', hex: '#FF8000', baseColor: 'Orange' },
    { name: 'Chalk Grey', hex: '#D1D5DB', baseColor: 'Grey' },
  ];

  const now = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

  selectedFive.forEach((car, index) => {
    const pickedColor = sampleColors[(index * 3 + Math.floor(Math.random() * sampleColors.length)) % sampleColors.length];

    currentCollection[car.id] = {
      carId: car.id,
      isCollected: true,
      collectedColors: [pickedColor.name],
      colorSpots: [
        {
          colorName: pickedColor.name,
          baseColor: pickedColor.baseColor,
          hex: pickedColor.hex,
          photoUrl: car.image || '',
          scannedAt: new Date(Date.now() - index * 3600000).toISOString(),
        },
      ],
      scanCount: 1,
      firstScannedDate: now,
      lastScannedDate: now,
    };

    saveScannedCar({
      carName: `${car.brand} ${car.name}`,
      make: car.brand,
      model: car.name,
      yearRange: `${car.yearIntroduced || 2022}`,
    });

    try {
      const baseRarityXp = car.rarity === 'Legendary' ? 500 : car.rarity === 'Epic' ? 300 : car.rarity === 'Rare' ? 150 : 50;
      addXp(baseRarityXp, `Spotted ${car.brand} ${car.name}`, 'spot');
    } catch {
      // ignore
    }
  });

  saveCarCollectionState(currentCollection);

  // Pin the first random car if not already pinned, and add a note
  const allPinned = getPinnedCarIds();
  if (selectedFive[0] && !allPinned.includes(selectedFive[0].id)) {
    togglePinCar(selectedFive[0].id);
    saveCarNote(
      selectedFive[0].id,
      `Spotted parked outside the city centre! Looked and sounded immaculate in person.`
    );
  }

  window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
  window.dispatchEvent(new CustomEvent('cardex_garage_updated'));
  window.dispatchEvent(new CustomEvent('cardex_scanned_history_updated'));
}

export function simulateAddSampleWishlist(): void {
  const sampleWishlist = BRANDS_CATALOG.flatMap((b) => b.cars).slice(0, 4);
  const tags: WishlistTag[] = ['dream', 'must-spot', 'rare', 'dream'];

  sampleWishlist.forEach((car, i) => {
    addToWishlist(car, tags[i % tags.length], 'Hunting for this around Mayfair and Knightsbridge.');
  });
}

export function simulateAddSampleCollections(): void {
  const allCars = BRANDS_CATALOG.flatMap((b) => b.cars);
  const trackCars = allCars.filter((c) => c.name.includes('GT') || c.name.includes('Pista') || c.name.includes('M3')).slice(0, 4).map((c) => c.id);
  const supercars = allCars.filter((c) => c.rarity === 'Epic' || c.rarity === 'Legendary').slice(0, 5).map((c) => c.id);

  createUserCollection('Track Weapons', 'High-downforce aero beasts built for lap times', undefined, trackCars);
  createUserCollection('Supercar Sundays', 'Spotted around central London and weekend meets', undefined, supercars);
}

export function resetMyGarageData(): void {
  try {
    localStorage.removeItem(GARAGE_PINNED_CARS_KEY);
    localStorage.removeItem(GARAGE_CAR_NOTES_KEY);
    localStorage.removeItem(GARAGE_COLLECTIONS_KEY);
    localStorage.removeItem(GARAGE_CUSTOM_METADATA_KEY);
    localStorage.removeItem(GARAGE_WISHLIST_KEY);
    localStorage.removeItem(GARAGE_TARGET_LOGS_KEY);
    window.dispatchEvent(new CustomEvent('cardex_garage_updated'));
  } catch {
    // ignore
  }
}
