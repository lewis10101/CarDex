export type AppTab = 'home' | 'garage' | 'scanner' | 'collection' | 'settings';

export type PhonePresetId =
  | 'auto'
  | 'iphone-12'
  | 'iphone-13'
  | 'iphone-14'
  | 'iphone-15'
  | 'iphone-16'
  | 'iphone-17';

export interface PhonePreset {
  id: PhonePresetId;
  name: string;
  width?: number;
  height?: number;
  description: string;
}

export type CarRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Ultra Rare';

export type CarColor =
  | 'Red'
  | 'Blue'
  | 'Black'
  | 'White'
  | 'Silver'
  | 'Grey'
  | 'Yellow'
  | 'Green'
  | 'Orange'
  | 'Purple';

export interface CarColorVariant {
  name: string;
  hex: string;
  baseColor: string;
  imageUrl?: string;
}

export interface CollectionCar {
  id: string;
  name: string;
  brand: string;
  country: string;
  yearIntroduced: number;
  rarity: CarRarity;
  image: string;
  colorVariants: CarColorVariant[];
  horsepower?: number;
  topSpeed?: number;
  zeroToSixty?: number;
  category?: string;
  trivia?: string;
}

export interface UserCarColorSpot {
  colorName: string; // e.g. "Isle of Man Green"
  baseColor: string; // e.g. "Green"
  hex: string; // e.g. "#1C4E3D"
  photoUrl: string; // User scanned photo for this exact color variant
  scannedAt: string; // Timestamp or date
}

export interface UserCarCollectionState {
  carId: string;
  isCollected: boolean;
  collectedColors: string[]; // list of collected variant names
  colorSpots?: UserCarColorSpot[]; // array of spots per color variant with photos
  scanCount: number;
  firstScannedDate?: string;
  lastScannedDate?: string;
  userPhoto?: string; // Custom or scanned photo submitted by the user
}

export interface BrandInfo {
  id: string;
  name: string;
  country: string;
  founded: string;
  cars: CollectionCar[];
}

export interface CarItem {
  id: string;
  name: string;
  brand: string;
  rarity: CarRarity;
  horsepower: number;
  topSpeed: number; // in mph
  zeroToSixty: number; // in seconds
  color: CarColor;
  dateSpotted: string;
  image: string;
}

export type FilterCategory = 'rarity' | 'sort' | 'color' | 'performance' | 'brand';

export type SortMode =
  | 'default'
  | 'a-z'
  | 'z-a'
  | 'highest-hp'
  | 'fastest-0-60'
  | 'highest-top-speed';
