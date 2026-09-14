import { CarRarity } from '../types';

export type ProgressionTier =
  | 'Bronze'
  | 'Silver'
  | 'Gold'
  | 'Platinum'
  | 'Obsidian'
  | 'Diamond'
  | 'Master'
  | 'Apex'
  | 'Mythic'
  | 'Hyper';

export interface LevelDefinition {
  level: number;
  xpRequired: number; // Cumulative XP to reach this level
  title: string;
  tier: ProgressionTier;
  badgeName: string;
  badgeColorClass: string;
  unlockedFeature: string;
  rarityBoostPercent: number; // e.g. 5 = +5%
  dailyTargetMultiplier: number; // e.g. 1.25 = +25% XP
  extraDailySkips: number;
  cosmeticTitle?: string;
}

export interface CosmeticCustomization {
  equippedTitle: string;
  equippedBadge: string;
  selectedTitle?: string;
}

export interface XpActivityLog {
  id: string;
  type: 'spot' | 'rare_spot' | 'brand_milestone' | 'daily_target' | 'collection' | 'streak' | 'note';
  xpAmount: number;
  description: string;
  timestamp: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  multiplier: number; // 1.0 to 1.5
}

// ----------------------------------------------------
// Handcrafted Levels 1 to 20
// ----------------------------------------------------
export const LEVEL_DEFINITIONS: LevelDefinition[] = [
  {
    level: 1,
    xpRequired: 0,
    title: 'Rookie Spotter',
    tier: 'Bronze',
    badgeName: 'Scout Crest',
    badgeColorClass: 'text-amber-700 bg-amber-150 border-amber-300 dark:border-amber-800/80',
    unlockedFeature: 'Camera Spotter & Road Registry',
    rarityBoostPercent: 0,
    dailyTargetMultiplier: 1.0,
    extraDailySkips: 0,
    cosmeticTitle: 'Rookie Spotter',
  },
  {
    level: 2,
    xpRequired: 250,
    title: 'Street Scout',
    tier: 'Bronze',
    badgeName: 'Bronze Compass',
    badgeColorClass: 'text-amber-700 bg-amber-100 border-amber-300 dark:border-amber-800',
    unlockedFeature: 'Car Color Variant Logs & Photo Notes',
    rarityBoostPercent: 0,
    dailyTargetMultiplier: 1.05,
    extraDailySkips: 0,
    cosmeticTitle: 'Street Scout',
  },
  {
    level: 3,
    xpRequired: 650,
    title: 'Asphalt Tracker',
    tier: 'Bronze',
    badgeName: 'Bronze Cog',
    badgeColorClass: 'text-amber-700 bg-amber-100 border-amber-400 dark:border-amber-750',
    unlockedFeature: 'Amber Sport Spotter Title',
    rarityBoostPercent: 0,
    dailyTargetMultiplier: 1.1,
    extraDailySkips: 0,
    cosmeticTitle: 'Asphalt Tracker',
  },
  {
    level: 4,
    xpRequired: 1200,
    title: 'Paddock Regular',
    tier: 'Silver',
    badgeName: 'Silver Piston',
    badgeColorClass: 'text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700',
    unlockedFeature: 'Advanced Search & Speed Sorting',
    rarityBoostPercent: 0,
    dailyTargetMultiplier: 1.15,
    extraDailySkips: 0,
    cosmeticTitle: 'Paddock Regular',
  },
  {
    level: 5,
    xpRequired: 1950,
    title: 'Motor Enthusiast',
    tier: 'Silver',
    badgeName: 'Silver Wings',
    badgeColorClass: 'text-zinc-700 dark:text-zinc-200 bg-zinc-200/70 dark:bg-zinc-800 border-zinc-400 dark:border-zinc-600',
    unlockedFeature: 'Curated Playlists & Midnight Cobalt Title',
    rarityBoostPercent: 0,
    dailyTargetMultiplier: 1.2,
    extraDailySkips: 0,
    cosmeticTitle: 'Motor Enthusiast',
  },
  {
    level: 6,
    xpRequired: 2900,
    title: 'Marque Connoisseur',
    tier: 'Silver',
    badgeName: 'Silver Shield',
    badgeColorClass: 'text-zinc-700 dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-750 border-zinc-400 dark:border-zinc-500',
    unlockedFeature: 'Rarity Boost I (+5% Rare Target Chance)',
    rarityBoostPercent: 5,
    dailyTargetMultiplier: 1.25,
    extraDailySkips: 0,
    cosmeticTitle: 'Marque Connoisseur',
  },
  {
    level: 7,
    xpRequired: 4100,
    title: 'Apex Hunter',
    tier: 'Gold',
    badgeName: 'Gold Laurels',
    badgeColorClass: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-400/80 dark:border-amber-500/40',
    unlockedFeature: 'Golden Apex Badge & Collector Title',
    rarityBoostPercent: 5,
    dailyTargetMultiplier: 1.3,
    extraDailySkips: 0,
    cosmeticTitle: 'Apex Hunter',
  },
  {
    level: 8,
    xpRequired: 5600,
    title: 'Speedway Veteran',
    tier: 'Gold',
    badgeName: 'Gold Wheel',
    badgeColorClass: 'text-amber-600 dark:text-amber-400 bg-amber-500/15 border-amber-400 dark:border-amber-500/50',
    unlockedFeature: '1.35x Daily Target XP Bounty Scaling',
    rarityBoostPercent: 5,
    dailyTargetMultiplier: 1.35,
    extraDailySkips: 0,
    cosmeticTitle: 'Speedway Veteran',
  },
  {
    level: 9,
    xpRequired: 7400,
    title: 'Grand Tourer',
    tier: 'Gold',
    badgeName: 'Gold Starburst',
    badgeColorClass: 'text-amber-500 dark:text-amber-300 bg-amber-500/20 border-amber-500 dark:border-amber-400',
    unlockedFeature: 'Rarity Boost II (+10% Rare & Ultra Rare)',
    rarityBoostPercent: 10,
    dailyTargetMultiplier: 1.4,
    extraDailySkips: 0,
    cosmeticTitle: 'Grand Tourer',
  },
  {
    level: 10,
    xpRequired: 9600,
    title: 'Supercar Spotter',
    tier: 'Platinum',
    badgeName: 'Platinum Crown',
    badgeColorClass: 'text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border-cyan-400/80 dark:border-cyan-500/40',
    unlockedFeature: 'Carbon Platinum Title & +1 Daily Skip',
    rarityBoostPercent: 10,
    dailyTargetMultiplier: 1.5,
    extraDailySkips: 1,
    cosmeticTitle: 'Supercar Spotter',
  },
  {
    level: 11,
    xpRequired: 12300,
    title: 'Nürburgring Chaser',
    tier: 'Platinum',
    badgeName: 'Platinum Falcon',
    badgeColorClass: 'text-cyan-600 dark:text-cyan-300 bg-cyan-500/15 border-cyan-400 dark:border-cyan-500/50',
    unlockedFeature: '1.6x Daily Target XP Multiplier',
    rarityBoostPercent: 10,
    dailyTargetMultiplier: 1.6,
    extraDailySkips: 1,
    cosmeticTitle: 'Nürburgring Chaser',
  },
  {
    level: 12,
    xpRequired: 15500,
    title: 'Hypercar Scout',
    tier: 'Platinum',
    badgeName: 'Platinum Eagle',
    badgeColorClass: 'text-cyan-500 dark:text-cyan-200 bg-cyan-500/20 border-cyan-400 dark:border-cyan-400',
    unlockedFeature: 'Rarity Boost III (+15% Ultra Rare Chance)',
    rarityBoostPercent: 15,
    dailyTargetMultiplier: 1.7,
    extraDailySkips: 1,
    cosmeticTitle: 'Hypercar Scout',
  },
  {
    level: 13,
    xpRequired: 19300,
    title: 'Monza Specialist',
    tier: 'Obsidian',
    badgeName: 'Obsidian Shard',
    badgeColorClass: 'text-violet-600 dark:text-violet-300 bg-violet-500/10 border-violet-400/80 dark:border-violet-500/40',
    unlockedFeature: 'Obsidian Stealth Title & Crest',
    rarityBoostPercent: 15,
    dailyTargetMultiplier: 1.8,
    extraDailySkips: 1,
    cosmeticTitle: 'Monza Specialist',
  },
  {
    level: 14,
    xpRequired: 23800,
    title: 'Master Curator',
    tier: 'Obsidian',
    badgeName: 'Obsidian Crest',
    badgeColorClass: 'text-violet-600 dark:text-violet-300 bg-violet-500/15 border-violet-400 dark:border-violet-500/50',
    unlockedFeature: '1.9x Daily Target XP Bounty',
    rarityBoostPercent: 15,
    dailyTargetMultiplier: 1.9,
    extraDailySkips: 1,
    cosmeticTitle: 'Master Curator',
  },
  {
    level: 15,
    xpRequired: 29000,
    title: 'Heritage Archivist',
    tier: 'Obsidian',
    badgeName: 'Obsidian Prism',
    badgeColorClass: 'text-violet-500 dark:text-violet-200 bg-violet-500/20 border-violet-400 dark:border-violet-400',
    unlockedFeature: '+2 Daily Skips & 2.0x Bounty Multiplier',
    rarityBoostPercent: 15,
    dailyTargetMultiplier: 2.0,
    extraDailySkips: 2,
    cosmeticTitle: 'Heritage Archivist',
  },
  {
    level: 16,
    xpRequired: 35000,
    title: 'Pinnacle Spotter',
    tier: 'Diamond',
    badgeName: 'Diamond Star',
    badgeColorClass: 'text-sky-500 dark:text-sky-300 bg-sky-500/15 border-sky-400 dark:border-sky-400/70',
    unlockedFeature: 'Diamond Prismatic Title & Star',
    rarityBoostPercent: 20,
    dailyTargetMultiplier: 2.1,
    extraDailySkips: 2,
    cosmeticTitle: 'Pinnacle Spotter',
  },
  {
    level: 17,
    xpRequired: 42000,
    title: 'Aerodynamicist',
    tier: 'Diamond',
    badgeName: 'Diamond Vortex',
    badgeColorClass: 'text-sky-500 dark:text-sky-200 bg-sky-500/20 border-sky-300 dark:border-sky-400',
    unlockedFeature: '2.2x Daily Target XP Scaling',
    rarityBoostPercent: 20,
    dailyTargetMultiplier: 2.2,
    extraDailySkips: 2,
    cosmeticTitle: 'Aerodynamicist',
  },
  {
    level: 18,
    xpRequired: 50000,
    title: 'Prototype Observer',
    tier: 'Diamond',
    badgeName: 'Diamond Nova',
    badgeColorClass: 'text-sky-400 dark:text-sky-100 bg-sky-500/25 border-sky-300 dark:border-sky-300',
    unlockedFeature: 'Maximum Rarity Boost IV (+25%)',
    rarityBoostPercent: 25,
    dailyTargetMultiplier: 2.3,
    extraDailySkips: 2,
    cosmeticTitle: 'Prototype Observer',
  },
  {
    level: 19,
    xpRequired: 60000,
    title: 'Grandmaster Hunter',
    tier: 'Master',
    badgeName: 'Master Chrono',
    badgeColorClass: 'text-rose-500 dark:text-rose-300 bg-rose-500/15 border-rose-400 dark:border-rose-400/80',
    unlockedFeature: '2.4x Daily Target XP Scaling',
    rarityBoostPercent: 25,
    dailyTargetMultiplier: 2.4,
    extraDailySkips: 2,
    cosmeticTitle: 'Grandmaster Hunter',
  },
  {
    level: 20,
    xpRequired: 72000,
    title: 'Apex Legend',
    tier: 'Apex',
    badgeName: 'Apex Golden Crown',
    badgeColorClass: 'text-amber-500 dark:text-amber-200 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 border-amber-400 dark:border-amber-300 shadow-xs',
    unlockedFeature: 'The Legendary Apex Badge & 2.5x Multiplier',
    rarityBoostPercent: 25,
    dailyTargetMultiplier: 2.5,
    extraDailySkips: 3,
    cosmeticTitle: 'Apex Legend',
  },
  {
    level: 21,
    xpRequired: 85000,
    title: 'Circuit Champion',
    tier: 'Master',
    badgeName: 'Gold Laurels & Chequered Flag',
    badgeColorClass: 'text-rose-500 dark:text-rose-300 bg-rose-500/15 border-rose-400 dark:border-rose-400/80',
    unlockedFeature: '2.55x Daily Target Multiplier & +26% Rarity Boost',
    rarityBoostPercent: 26,
    dailyTargetMultiplier: 2.55,
    extraDailySkips: 3,
    cosmeticTitle: 'Circuit Champion',
  },
  {
    level: 22,
    xpRequired: 100000,
    title: 'Velocity Virtuoso',
    tier: 'Master',
    badgeName: 'Master Chronometer',
    badgeColorClass: 'text-rose-500 dark:text-rose-300 bg-rose-500/20 border-rose-400',
    unlockedFeature: '2.60x Multiplier & Aerodynamic Velocity Badge',
    rarityBoostPercent: 27,
    dailyTargetMultiplier: 2.6,
    extraDailySkips: 3,
    cosmeticTitle: 'Velocity Virtuoso',
  },
  {
    level: 23,
    xpRequired: 116000,
    title: 'Marque Titan',
    tier: 'Master',
    badgeName: 'Titanium Ingot',
    badgeColorClass: 'text-rose-400 dark:text-rose-200 bg-rose-500/20 border-rose-300',
    unlockedFeature: 'Titanium Crest & 2.65x Target Scaling',
    rarityBoostPercent: 28,
    dailyTargetMultiplier: 2.65,
    extraDailySkips: 3,
    cosmeticTitle: 'Marque Titan',
  },
  {
    level: 24,
    xpRequired: 133000,
    title: 'Aerocraft Specialist',
    tier: 'Master',
    badgeName: 'Aero Tunnel Wings',
    badgeColorClass: 'text-rose-400 dark:text-rose-200 bg-rose-500/25 border-rose-300',
    unlockedFeature: '+29% Rarity Boost & High Downforce Optics',
    rarityBoostPercent: 29,
    dailyTargetMultiplier: 2.7,
    extraDailySkips: 3,
    cosmeticTitle: 'Aerocraft Specialist',
  },
  {
    level: 25,
    xpRequired: 151000,
    title: 'Track Dominator',
    tier: 'Master',
    badgeName: 'Silver Apex Laurels',
    badgeColorClass: 'text-rose-400 dark:text-rose-100 bg-gradient-to-r from-rose-500/25 to-amber-500/25 border-rose-300',
    unlockedFeature: '2.75x Multiplier & Quarter-Century Spotter Crest',
    rarityBoostPercent: 30,
    dailyTargetMultiplier: 2.75,
    extraDailySkips: 4,
    cosmeticTitle: 'Track Dominator',
  },
  {
    level: 26,
    xpRequired: 170000,
    title: 'Prototype Visionary',
    tier: 'Apex',
    badgeName: 'Apex Prismatic Lens',
    badgeColorClass: 'text-amber-500 dark:text-amber-300 bg-amber-500/20 border-amber-400',
    unlockedFeature: '2.80x Multiplier & Secret Prototype Registry',
    rarityBoostPercent: 30,
    dailyTargetMultiplier: 2.8,
    extraDailySkips: 4,
    cosmeticTitle: 'Prototype Visionary',
  },
  {
    level: 27,
    xpRequired: 190000,
    title: 'Chrono Master',
    tier: 'Apex',
    badgeName: 'Tourbillon Gear',
    badgeColorClass: 'text-amber-500 dark:text-amber-300 bg-amber-500/25 border-amber-400',
    unlockedFeature: '2.85x Multiplier & Millisecond Timing telemetry',
    rarityBoostPercent: 31,
    dailyTargetMultiplier: 2.85,
    extraDailySkips: 4,
    cosmeticTitle: 'Chrono Master',
  },
  {
    level: 28,
    xpRequired: 212000,
    title: 'Le Mans Vanguard',
    tier: 'Apex',
    badgeName: '24H Endurance Beacon',
    badgeColorClass: 'text-amber-500 dark:text-amber-200 bg-amber-500/25 border-amber-300',
    unlockedFeature: '+31% Rarity Boost & 2.90x Target Multiplier',
    rarityBoostPercent: 31,
    dailyTargetMultiplier: 2.9,
    extraDailySkips: 4,
    cosmeticTitle: 'Le Mans Vanguard',
  },
  {
    level: 29,
    xpRequired: 235000,
    title: 'Millennium Collector',
    tier: 'Apex',
    badgeName: 'Millennium Obsidian Crest',
    badgeColorClass: 'text-amber-400 dark:text-amber-200 bg-gradient-to-r from-amber-500/30 to-violet-500/25 border-amber-300',
    unlockedFeature: '2.95x Multiplier & Thousand-Car Archive Title',
    rarityBoostPercent: 32,
    dailyTargetMultiplier: 2.95,
    extraDailySkips: 4,
    cosmeticTitle: 'Millennium Collector',
  },
  {
    level: 30,
    xpRequired: 260000,
    title: 'Apex Sovereign',
    tier: 'Apex',
    badgeName: 'Twin Turbo Golden Sceptre',
    badgeColorClass: 'text-amber-400 dark:text-amber-100 bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-yellow-500/30 border-amber-300 shadow-sm',
    unlockedFeature: '3.0x Daily Target Multiplier & 4 Daily Target Skips',
    rarityBoostPercent: 32,
    dailyTargetMultiplier: 3.0,
    extraDailySkips: 4,
    cosmeticTitle: 'Apex Sovereign',
  },
  {
    level: 31,
    xpRequired: 287000,
    title: 'Carbon Sovereign',
    tier: 'Apex',
    badgeName: 'Woven Carbon Emblem',
    badgeColorClass: 'text-zinc-300 dark:text-zinc-100 bg-zinc-800 border-zinc-500',
    unlockedFeature: '3.05x Target Multiplier & Lightweight Monocoque',
    rarityBoostPercent: 33,
    dailyTargetMultiplier: 3.05,
    extraDailySkips: 4,
    cosmeticTitle: 'Carbon Sovereign',
  },
  {
    level: 32,
    xpRequired: 315000,
    title: 'Bi-Turbo Conqueror',
    tier: 'Apex',
    badgeName: 'Twin Scroll Compressor',
    badgeColorClass: 'text-amber-500 bg-amber-500/20 border-amber-400',
    unlockedFeature: '3.10x Multiplier & Instant Boost Spooling',
    rarityBoostPercent: 33,
    dailyTargetMultiplier: 3.1,
    extraDailySkips: 4,
    cosmeticTitle: 'Bi-Turbo Conqueror',
  },
  {
    level: 33,
    xpRequired: 345000,
    title: 'Stratosphere Hunter',
    tier: 'Apex',
    badgeName: 'Stratospheric Winglet',
    badgeColorClass: 'text-sky-400 dark:text-sky-200 bg-sky-500/25 border-sky-300',
    unlockedFeature: '+34% Rare Target Boost & Mach Velocity Index',
    rarityBoostPercent: 34,
    dailyTargetMultiplier: 3.15,
    extraDailySkips: 4,
    cosmeticTitle: 'Stratosphere Hunter',
  },
  {
    level: 34,
    xpRequired: 377000,
    title: 'V12 Luminary',
    tier: 'Apex',
    badgeName: 'Twelve Cylinder Symphony',
    badgeColorClass: 'text-amber-400 dark:text-amber-200 bg-amber-500/30 border-amber-300',
    unlockedFeature: '3.20x Multiplier & Atmospheric Redline Audio',
    rarityBoostPercent: 34,
    dailyTargetMultiplier: 3.2,
    extraDailySkips: 4,
    cosmeticTitle: 'V12 Luminary',
  },
  {
    level: 35,
    xpRequired: 410000,
    title: 'Zenith Scout',
    tier: 'Apex',
    badgeName: 'Solar Zenith Compass',
    badgeColorClass: 'text-amber-300 dark:text-amber-100 bg-gradient-to-r from-amber-500/35 to-yellow-500/35 border-amber-200',
    unlockedFeature: '3.25x Multiplier & Midday Optics Calibration',
    rarityBoostPercent: 35,
    dailyTargetMultiplier: 3.25,
    extraDailySkips: 5,
    cosmeticTitle: 'Zenith Scout',
  },
  {
    level: 36,
    xpRequired: 445000,
    title: 'Eclipse Tracker',
    tier: 'Mythic',
    badgeName: 'Corona Corona Crest',
    badgeColorClass: 'text-violet-400 dark:text-violet-200 bg-violet-500/25 border-violet-400',
    unlockedFeature: 'Mythic Tier Unlock & 3.30x Daily Multiplier',
    rarityBoostPercent: 35,
    dailyTargetMultiplier: 3.3,
    extraDailySkips: 5,
    cosmeticTitle: 'Eclipse Tracker',
  },
  {
    level: 37,
    xpRequired: 482000,
    title: 'Solstice Archivist',
    tier: 'Mythic',
    badgeName: 'Solstice Sundial',
    badgeColorClass: 'text-violet-400 dark:text-violet-200 bg-violet-500/30 border-violet-300',
    unlockedFeature: '3.35x Multiplier & +36% Rare Target Chance',
    rarityBoostPercent: 36,
    dailyTargetMultiplier: 3.35,
    extraDailySkips: 5,
    cosmeticTitle: 'Solstice Archivist',
  },
  {
    level: 38,
    xpRequired: 521000,
    title: 'Hyperdrive Elite',
    tier: 'Mythic',
    badgeName: 'Tachyon Chamber',
    badgeColorClass: 'text-fuchsia-400 dark:text-fuchsia-200 bg-fuchsia-500/25 border-fuchsia-400',
    unlockedFeature: '3.40x Multiplier & Hyperdrive Radar Optics',
    rarityBoostPercent: 36,
    dailyTargetMultiplier: 3.4,
    extraDailySkips: 5,
    cosmeticTitle: 'Hyperdrive Elite',
  },
  {
    level: 39,
    xpRequired: 562000,
    title: 'Celestial Voyager',
    tier: 'Mythic',
    badgeName: 'Stellar Constellation Core',
    badgeColorClass: 'text-fuchsia-400 dark:text-fuchsia-200 bg-fuchsia-500/30 border-fuchsia-300',
    unlockedFeature: '3.45x Multiplier & Deep Space Telemetry',
    rarityBoostPercent: 37,
    dailyTargetMultiplier: 3.45,
    extraDailySkips: 5,
    cosmeticTitle: 'Celestial Voyager',
  },
  {
    level: 40,
    xpRequired: 605000,
    title: 'Mythic Spotter',
    tier: 'Mythic',
    badgeName: 'Mythic Opal Crown',
    badgeColorClass: 'text-fuchsia-300 dark:text-fuchsia-100 bg-gradient-to-r from-violet-500/30 via-fuchsia-500/30 to-pink-500/30 border-fuchsia-300',
    unlockedFeature: '3.50x Multiplier & Mythic Opal Title',
    rarityBoostPercent: 37,
    dailyTargetMultiplier: 3.5,
    extraDailySkips: 5,
    cosmeticTitle: 'Mythic Spotter',
  },
  {
    level: 41,
    xpRequired: 650000,
    title: 'Astral Horizon',
    tier: 'Mythic',
    badgeName: 'Astral Horizon Ring',
    badgeColorClass: 'text-indigo-400 dark:text-indigo-200 bg-indigo-500/25 border-indigo-400',
    unlockedFeature: '3.55x Multiplier & +38% Rarity Boost',
    rarityBoostPercent: 38,
    dailyTargetMultiplier: 3.55,
    extraDailySkips: 5,
    cosmeticTitle: 'Astral Horizon',
  },
  {
    level: 42,
    xpRequired: 700000,
    title: 'Nebula Master',
    tier: 'Mythic',
    badgeName: 'Cosmic Nebula Cloud',
    badgeColorClass: 'text-indigo-400 dark:text-indigo-200 bg-indigo-500/30 border-indigo-300',
    unlockedFeature: '3.60x Daily Target Multiplier',
    rarityBoostPercent: 38,
    dailyTargetMultiplier: 3.6,
    extraDailySkips: 5,
    cosmeticTitle: 'Nebula Master',
  },
  {
    level: 43,
    xpRequired: 755000,
    title: 'Pulsar Scout',
    tier: 'Mythic',
    badgeName: 'High-Frequency Pulsar',
    badgeColorClass: 'text-cyan-400 dark:text-cyan-200 bg-cyan-500/25 border-cyan-400',
    unlockedFeature: '3.65x Multiplier & +39% Rare Target Chance',
    rarityBoostPercent: 39,
    dailyTargetMultiplier: 3.65,
    extraDailySkips: 5,
    cosmeticTitle: 'Pulsar Scout',
  },
  {
    level: 44,
    xpRequired: 815000,
    title: 'Quantum Strata',
    tier: 'Mythic',
    badgeName: 'Quantum Entangled Piston',
    badgeColorClass: 'text-cyan-400 dark:text-cyan-100 bg-cyan-500/30 border-cyan-300',
    unlockedFeature: '3.70x Daily Multiplier & Subatomic Sensor Tuning',
    rarityBoostPercent: 39,
    dailyTargetMultiplier: 3.7,
    extraDailySkips: 5,
    cosmeticTitle: 'Quantum Strata',
  },
  {
    level: 45,
    xpRequired: 880000,
    title: 'Supernova Hunter',
    tier: 'Mythic',
    badgeName: 'Supernova Shockwave',
    badgeColorClass: 'text-rose-400 dark:text-rose-100 bg-gradient-to-r from-orange-500/30 via-rose-500/30 to-purple-500/30 border-rose-300',
    unlockedFeature: '3.75x Multiplier & +40% Rarity Boost',
    rarityBoostPercent: 40,
    dailyTargetMultiplier: 3.75,
    extraDailySkips: 5,
    cosmeticTitle: 'Supernova Hunter',
  },
  {
    level: 46,
    xpRequired: 950000,
    title: 'Infinite Chassis',
    tier: 'Hyper',
    badgeName: 'Hyper-Vector Ingot',
    badgeColorClass: 'text-emerald-400 dark:text-emerald-200 bg-emerald-500/25 border-emerald-400',
    unlockedFeature: 'Hyper Tier Unlock & 3.80x Multiplier',
    rarityBoostPercent: 40,
    dailyTargetMultiplier: 3.8,
    extraDailySkips: 5,
    cosmeticTitle: 'Infinite Chassis',
  },
  {
    level: 47,
    xpRequired: 1025000,
    title: 'Singularity Spotter',
    tier: 'Hyper',
    badgeName: 'Gravitational Singularity',
    badgeColorClass: 'text-emerald-400 dark:text-emerald-100 bg-emerald-500/30 border-emerald-300',
    unlockedFeature: '3.85x Multiplier & +42% Rare Target Boost',
    rarityBoostPercent: 42,
    dailyTargetMultiplier: 3.85,
    extraDailySkips: 5,
    cosmeticTitle: 'Singularity Spotter',
  },
  {
    level: 48,
    xpRequired: 1105000,
    title: 'Apex Supreme',
    tier: 'Hyper',
    badgeName: 'Double Apex Golden Ring',
    badgeColorClass: 'text-amber-300 dark:text-amber-100 bg-gradient-to-r from-amber-500/35 to-emerald-500/30 border-amber-300',
    unlockedFeature: '3.90x Daily Target Multiplier & +44% Rarity Boost',
    rarityBoostPercent: 44,
    dailyTargetMultiplier: 3.9,
    extraDailySkips: 5,
    cosmeticTitle: 'Apex Supreme',
  },
  {
    level: 49,
    xpRequired: 1190000,
    title: 'Omniverse Curator',
    tier: 'Hyper',
    badgeName: 'Curator Astral Seal',
    badgeColorClass: 'text-amber-300 dark:text-amber-100 bg-gradient-to-r from-yellow-500/35 via-rose-500/30 to-amber-500/35 border-amber-300',
    unlockedFeature: '3.95x Multiplier & Penultimate Master Archival Badge',
    rarityBoostPercent: 45,
    dailyTargetMultiplier: 3.95,
    extraDailySkips: 5,
    cosmeticTitle: 'Omniverse Curator',
  },
  {
    level: 50,
    xpRequired: 1280000,
    title: 'God of the Asphalt',
    tier: 'Hyper',
    badgeName: 'Ultimate Sovereign Crown',
    badgeColorClass: 'text-amber-300 dark:text-amber-100 bg-gradient-to-r from-amber-500/40 via-yellow-400/40 to-rose-500/40 border-amber-300 shadow-md ring-1 ring-amber-400/50',
    unlockedFeature: 'Max Level 50 Crown, 4.0x Multiplier & Infinite Scaling Bonus',
    rarityBoostPercent: 50,
    dailyTargetMultiplier: 4.0,
    extraDailySkips: 5,
    cosmeticTitle: 'God of the Asphalt',
  },
];

// Keys
export const USER_XP_KEY = 'cardex_user_xp';
export const USER_CUSTOMIZATION_KEY = 'cardex_user_customization';
export const XP_STREAK_KEY = 'cardex_xp_streak_data';
export const XP_HISTORY_KEY = 'cardex_xp_history';
export const BRAND_MILESTONES_KEY = 'cardex_brand_milestones_claimed';

/**
 * Returns today's date formatted as YYYY-MM-DD
 */
export function getTodayDateKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns yesterday's date formatted as YYYY-MM-DD
 */
export function getYesterdayDateKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get current total XP from storage, reconciling with existing data if fresh.
 */
export function getUserXp(): number {
  try {
    const raw = localStorage.getItem(USER_XP_KEY);
    if (raw !== null) {
      const parsed = parseInt(raw, 10);
      if (!isNaN(parsed) && parsed >= 0) return parsed;
    }
  } catch {
    // ignore
  }
  return 0;
}

/**
 * Saves XP to storage and dispatches update event
 */
export function setUserXp(xp: number): void {
  try {
    localStorage.setItem(USER_XP_KEY, Math.max(0, Math.floor(xp)).toString());
    window.dispatchEvent(new CustomEvent('cardex_xp_updated', { detail: { xp } }));
  } catch {
    // ignore
  }
}

/**
 * Computes level details from total XP
 */
export function getLevelForXp(xp: number) {
  let currentLevelDef = LEVEL_DEFINITIONS[0];
  let nextLevelDef: LevelDefinition | null = LEVEL_DEFINITIONS[1] || null;

  for (let i = LEVEL_DEFINITIONS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_DEFINITIONS[i].xpRequired) {
      currentLevelDef = LEVEL_DEFINITIONS[i];
      nextLevelDef = LEVEL_DEFINITIONS[i + 1] || null;
      break;
    }
  }

  // Handle Level 50 max cap: level remains 50, but XP and multipliers continue scaling
  if (currentLevelDef.level >= 50) {
    const overflowXp = Math.max(0, xp - currentLevelDef.xpRequired);
    const tierBonusSteps = Math.floor(overflowXp / 25000);
    const scaledDailyMultiplier = Number((currentLevelDef.dailyTargetMultiplier + tierBonusSteps * 0.05).toFixed(2));
    const scaledRarityBoost = Math.min(60, currentLevelDef.rarityBoostPercent + tierBonusSteps);
    const scaledSkips = currentLevelDef.extraDailySkips + Math.floor(tierBonusSteps / 2);

    const xpIntoBonusTier = overflowXp % 25000;
    const xpToNextBonusTier = 25000 - xpIntoBonusTier;
    const progressPercent = Math.min(100, Math.max(0, Math.round((xpIntoBonusTier / 25000) * 100)));

    return {
      level: 50, // Strictly stay at max level 50
      title: currentLevelDef.title,
      tier: currentLevelDef.tier,
      badgeName: currentLevelDef.badgeName,
      badgeColorClass: currentLevelDef.badgeColorClass,
      currentXp: xp,
      currentLevelBaseXp: currentLevelDef.xpRequired + tierBonusSteps * 25000,
      nextLevelBaseXp: currentLevelDef.xpRequired + (tierBonusSteps + 1) * 25000,
      nextLevelXp: currentLevelDef.xpRequired + (tierBonusSteps + 1) * 25000,
      currentLevelXp: xpIntoBonusTier,
      xpToNextLevel: xpToNextBonusTier,
      progressPercent,
      progressPercentage: progressPercent,
      levelDef: currentLevelDef,
      nextLevelDef: null,
      isMaxHandcrafted: true,
      isMaxLevel: true,
      rarityBoostPercent: scaledRarityBoost,
      dailyTargetMultiplier: scaledDailyMultiplier,
      extraDailySkips: scaledSkips,
      bonusMultiplierTiers: tierBonusSteps,
    };
  }

  const currentBaseXp = currentLevelDef.xpRequired;
  const nextBaseXp = nextLevelDef ? nextLevelDef.xpRequired : currentBaseXp + 10000;
  const xpSpan = Math.max(1, nextBaseXp - currentBaseXp);
  const currentLevelXp = Math.max(0, xp - currentBaseXp);
  const xpToNextLevel = Math.max(0, nextBaseXp - xp);
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentLevelXp / xpSpan) * 100)));

  return {
    level: currentLevelDef.level,
    title: currentLevelDef.title,
    tier: currentLevelDef.tier,
    badgeName: currentLevelDef.badgeName,
    badgeColorClass: currentLevelDef.badgeColorClass,
    currentXp: xp,
    currentLevelBaseXp: currentBaseXp,
    nextLevelBaseXp: nextBaseXp,
    nextLevelXp: nextBaseXp,
    currentLevelXp,
    xpToNextLevel,
    progressPercent,
    progressPercentage: progressPercent,
    levelDef: currentLevelDef,
    nextLevelDef,
    isMaxHandcrafted: false,
    rarityBoostPercent: currentLevelDef.rarityBoostPercent,
    dailyTargetMultiplier: currentLevelDef.dailyTargetMultiplier,
    extraDailySkips: currentLevelDef.extraDailySkips,
  };
}

/**
 * Owner & Developer Controls for XP, Levels, and Streaks
 */
export function ownerSetXp(xp: number): void {
  const safeXp = Math.max(0, Math.floor(xp));
  setUserXp(safeXp);
  logXpActivity({
    type: 'spot',
    xpAmount: safeXp,
    description: `Owner Control: Set XP to ${safeXp.toLocaleString()}`,
  });
  window.dispatchEvent(new CustomEvent('cardex_xp_updated', { detail: { xp: safeXp } }));
}

export function ownerAddXp(delta: number): void {
  const current = getUserXp();
  const target = Math.max(0, current + delta);
  ownerSetXp(target);
}

export function ownerSetLevel(targetLevel: number): void {
  const safeLevel = Math.max(1, Math.min(50, Math.floor(targetLevel)));
  const def = LEVEL_DEFINITIONS.find((l) => l.level === safeLevel);
  if (def) {
    ownerSetXp(def.xpRequired);
  }
}

export function ownerResetProgression(): void {
  try {
    localStorage.removeItem(USER_XP_KEY);
    localStorage.removeItem(XP_STREAK_KEY);
    localStorage.removeItem(XP_HISTORY_KEY);
    localStorage.removeItem(BRAND_MILESTONES_KEY);
    localStorage.removeItem(USER_CUSTOMIZATION_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent('cardex_xp_updated', { detail: { xp: 0 } }));
  window.dispatchEvent(
    new CustomEvent('cardex_streak_updated', {
      detail: { currentStreak: 0, longestStreak: 0, multiplier: 1.0 },
    })
  );
  window.dispatchEvent(new CustomEvent('cardex_customization_updated', { detail: getCustomization() }));
}

export function ownerSetStreak(days: number): void {
  const safeDays = Math.max(0, Math.floor(days));
  const mult = safeDays === 0 ? 1.0 : Math.min(1.5, 1.0 + safeDays * 0.05);
  const data: StreakData = {
    currentStreak: safeDays,
    longestStreak: safeDays,
    lastActiveDate: getTodayDateKey(),
    multiplier: parseFloat(mult.toFixed(2)),
  };
  try {
    localStorage.setItem(XP_STREAK_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent('cardex_streak_updated', { detail: data }));
}

export function ownerResetStreak(): void {
  ownerSetStreak(0);
}

export function ownerClearXpHistory(): void {
  try {
    localStorage.removeItem(XP_HISTORY_KEY);
  } catch {
    // ignore
  }
}

/**
 * Streak tracking
 */
export function getStreakData(): StreakData {
  try {
    const raw = localStorage.getItem(XP_STREAK_KEY);
    if (raw) {
      const data = JSON.parse(raw) as StreakData;
      const today = getTodayDateKey();
      const yesterday = getYesterdayDateKey();

      // Check if streak was broken (last active date was before yesterday)
      if (data.lastActiveDate !== today && data.lastActiveDate !== yesterday && data.lastActiveDate) {
        // Streak expired
        return {
          currentStreak: 0,
          longestStreak: data.longestStreak || 0,
          lastActiveDate: data.lastActiveDate,
          multiplier: 1.0,
        };
      }

      const multiplier = Math.min(1.5, 1.0 + data.currentStreak * 0.05);
      return {
        ...data,
        multiplier: parseFloat(multiplier.toFixed(2)),
      };
    }
  } catch {
    // ignore
  }

  return {
    currentStreak: 1,
    longestStreak: 1,
    lastActiveDate: getTodayDateKey(),
    multiplier: 1.05,
  };
}

/**
 * Registers activity for streak purposes
 */
export function touchDailyStreak(): StreakData {
  const current = getStreakData();
  const today = getTodayDateKey();
  const yesterday = getYesterdayDateKey();

  if (current.lastActiveDate === today) {
    return current;
  }

  let newStreak = 1;
  if (current.lastActiveDate === yesterday) {
    newStreak = current.currentStreak + 1;
  }

  const longest = Math.max(current.longestStreak, newStreak);
  const multiplier = Math.min(1.5, 1.0 + newStreak * 0.05);

  const updated: StreakData = {
    currentStreak: newStreak,
    longestStreak: longest,
    lastActiveDate: today,
    multiplier: parseFloat(multiplier.toFixed(2)),
  };

  try {
    localStorage.setItem(XP_STREAK_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('cardex_streak_updated', { detail: updated }));
  } catch {
    // ignore
  }

  return updated;
}

/**
 * Retrieves XP Activity History
 */
export function getXpActivityHistory(): XpActivityLog[] {
  try {
    const raw = localStorage.getItem(XP_HISTORY_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return [];
}

/**
 * Adds an XP log entry
 */
function logXpActivity(entry: Omit<XpActivityLog, 'id' | 'timestamp'>): void {
  try {
    const history = getXpActivityHistory();
    const newEntry: XpActivityLog = {
      ...entry,
      id: 'xp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
    };
    const updated = [newEntry, ...history].slice(0, 30);
    localStorage.setItem(XP_HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

/**
 * Main function to add XP to the user
 */
export function addXp(
  amount: number,
  description: string,
  type: XpActivityLog['type'] = 'spot'
): {
  newXp: number;
  xpAdded: number;
  leveledUp: boolean;
  oldLevel: number;
  newLevel: number;
} {
  const streak = touchDailyStreak();
  const currentXp = getUserXp();
  const oldLevelInfo = getLevelForXp(currentXp);

  // Apply streak multiplier
  const effectiveAdded = Math.round(amount * (streak.multiplier || 1.0));
  const newXp = currentXp + effectiveAdded;

  setUserXp(newXp);
  logXpActivity({
    type,
    xpAmount: effectiveAdded,
    description: streak.multiplier > 1.0 ? `${description} (+${Math.round((streak.multiplier - 1) * 100)}% Streak Bonus)` : description,
  });

  const newLevelInfo = getLevelForXp(newXp);
  const leveledUp = newLevelInfo.level > oldLevelInfo.level;

  if (leveledUp) {
    window.dispatchEvent(
      new CustomEvent('cardex_level_up', {
        detail: {
          oldLevel: oldLevelInfo.level,
          newLevel: newLevelInfo.level,
          title: newLevelInfo.title,
          tier: newLevelInfo.tier,
          levelDef: newLevelInfo.levelDef,
        },
      })
    );
  }

  return {
    newXp,
    xpAdded: effectiveAdded,
    leveledUp,
    oldLevel: oldLevelInfo.level,
    newLevel: newLevelInfo.level,
  };
}

/**
 * Awards XP for a newly spotted vehicle based on its Rarity Tier
 */
export function awardSpotXp(
  rarity?: CarRarity,
  carName?: string,
  isColorVariant = false,
  photoAttached = false
): { xpAdded: number; leveledUp: boolean; newLevel: number } {
  let baseAmount = 100;
  switch (rarity) {
    case 'Legendary':
    case 'Ultra Rare':
      baseAmount = 1500;
      break;
    case 'Epic':
      baseAmount = 800;
      break;
    case 'Rare':
      baseAmount = 450;
      break;
    case 'Uncommon':
      baseAmount = 200;
      break;
    case 'Common':
    default:
      baseAmount = 100;
      break;
  }

  if (isColorVariant) {
    baseAmount += 75;
  }
  if (photoAttached) {
    baseAmount += 75;
  }

  const nameLabel = carName ? `Spotted: ${carName}` : 'New Car Spotted';
  const type: XpActivityLog['type'] =
    rarity === 'Legendary' || rarity === 'Ultra Rare' || rarity === 'Epic' ? 'rare_spot' : 'spot';

  const res = addXp(baseAmount, nameLabel, type);
  return {
    xpAdded: res.xpAdded,
    leveledUp: res.leveledUp,
    newLevel: res.newLevel,
  };
}

/**
 * Awards XP when hitting brand completion milestones (25%, 50%, 75%, 100%)
 */
export function checkAndAwardBrandMilestoneXp(
  brandName: string,
  totalModels: number,
  collectedModels: number
): number {
  if (totalModels <= 0 || collectedModels <= 0) return 0;

  const pct = Math.round((collectedModels / totalModels) * 100);
  let claimedMap: Record<string, number[]> = {};

  try {
    const raw = localStorage.getItem(BRAND_MILESTONES_KEY);
    if (raw) claimedMap = JSON.parse(raw);
  } catch {
    // ignore
  }

  const brandClaimed = claimedMap[brandName] || [];
  let awardedXp = 0;

  const milestones = [
    { threshold: 25, xp: 150, label: '25% Milestone' },
    { threshold: 50, xp: 350, label: '50% Milestone' },
    { threshold: 75, xp: 600, label: '75% Milestone' },
    {
      threshold: 100,
      xp: totalModels >= 20 ? 3000 : totalModels >= 10 ? 2000 : 1200,
      label: '100% Brand Completion Mastery!',
    },
  ];

  for (const m of milestones) {
    if (pct >= m.threshold && !brandClaimed.includes(m.threshold)) {
      brandClaimed.push(m.threshold);
      awardedXp += m.xp;
      addXp(m.xp, `${brandName} Collection ${m.label}`, 'brand_milestone');
    }
  }

  if (awardedXp > 0) {
    claimedMap[brandName] = brandClaimed;
    try {
      localStorage.setItem(BRAND_MILESTONES_KEY, JSON.stringify(claimedMap));
    } catch {
      // ignore
    }
  }

  return awardedXp;
}

/**
 * Awards XP for Daily Target completion scaled by player level
 */
export function awardDailyTargetXp(baseBounty: number, brandName: string): number {
  const currentXp = getUserXp();
  const levelInfo = getLevelForXp(currentXp);
  const scaledAmount = Math.round(baseBounty * (levelInfo.dailyTargetMultiplier || 1.0));

  const desc = `Daily Target Complete: ${brandName} (${levelInfo.dailyTargetMultiplier}x Level Scale)`;
  const res = addXp(scaledAmount, desc, 'daily_target');
  return res.xpAdded;
}

/**
 * Awards XP for creating or growing a playlist collection
 */
export function awardCollectionActionXp(collectionTitle: string, action: 'create' | '5_cars' | '10_cars'): number {
  let xp = 100;
  let desc = `Created Playlist: "${collectionTitle}"`;

  if (action === '5_cars') {
    xp = 75;
    desc = `Playlist Milestone: 5 cars in "${collectionTitle}"`;
  } else if (action === '10_cars') {
    xp = 150;
    desc = `Curator Milestone: 10 cars in "${collectionTitle}"`;
  }

  const res = addXp(xp, desc, 'collection');
  return res.xpAdded;
}

/**
 * Awards XP for writing a car note or pinning
 */
export function awardCarNoteXp(carName: string): number {
  const res = addXp(35, `Field Note Logged: ${carName}`, 'note');
  return res.xpAdded;
}

/**
 * Cosmetic Customization (Equipped Titles & Badges)
 */
export function getCustomization(): CosmeticCustomization {
  try {
    const raw = localStorage.getItem(USER_CUSTOMIZATION_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }

  const currentXp = getUserXp();
  const levelInfo = getLevelForXp(currentXp);

  return {
    equippedTitle: levelInfo.title,
    equippedBadge: levelInfo.badgeName,
  };
}

export function saveCustomization(custom: Partial<CosmeticCustomization>): CosmeticCustomization {
  const existing = getCustomization();
  const updated: CosmeticCustomization = {
    ...existing,
    ...custom,
  };

  try {
    localStorage.setItem(USER_CUSTOMIZATION_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('cardex_customization_updated', { detail: updated }));
  } catch {
    // ignore
  }

  return updated;
}

export const getUserCustomization = getCustomization;
