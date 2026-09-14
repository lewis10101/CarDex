import { resolveParentModel } from '../utils/modelResolver';
import { UserCarCollectionState } from '../types';
import { ScannedCarEntry } from './userDataStorage';

export type BrandRarityTier = 'common' | 'mid-rarity' | 'rare' | 'ultra-rare';

export interface DailyTargetBrand {
  id: string; // unique slug e.g. 'ford', 'bmw', 'ferrari'
  name: string; // e.g. 'Ford', 'BMW', 'Ferrari'
  brand: string; // Clean model-based brand
  country: string;
  category: string;
  tagline: string;
  hint: string;
  popularModels: string[]; // Clean model parents only (no trims, no variants)
  rarityTier: BrandRarityTier;
  rarity: 'Uncommon' | 'Rare' | 'Epic' | 'Legendary'; // Display alias
  isExotic?: boolean;
  founded?: string; // Established year e.g. '1903', '1916'
}

export const BRAND_ESTABLISHED_YEARS: Record<string, string> = {
  audi: '1909',
  bmw: '1916',
  citroen: '1919',
  citroën: '1919',
  fiat: '1899',
  ford: '1903',
  honda: '1948',
  kia: '1944',
  'land-rover': '1948',
  'land rover': '1948',
  'mercedes-benz': '1926',
  'mercedes benz': '1926',
  mini: '1959',
  nissan: '1933',
  peugeot: '1810',
  renault: '1899',
  seat: '1950',
  skoda: '1895',
  toyota: '1937',
  vauxhall: '1857',
  volkswagen: '1937',
  abarth: '1949',
  'alfa-romeo': '1910',
  'alfa romeo': '1910',
  chrysler: '1925',
  cupra: '2018',
  dacia: '1966',
  dodge: '1900',
  hyundai: '1967',
  jaguar: '1922',
  jeep: '1941',
  lexus: '1989',
  mazda: '1920',
  mg: '1924',
  mitsubishi: '1870',
  polestar: '1996',
  smart: '1994',
  ssangyong: '1954',
  subaru: '1953',
  suzuki: '1909',
  volvo: '1927',
  alpine: '1955',
  'aston-martin': '1913',
  'aston martin': '1913',
  bentley: '1919',
  byd: '1995',
  cadillac: '1902',
  chevrolet: '1911',
  ferrari: '1939',
  lamborghini: '1963',
  lotus: '1948',
  maserati: '1914',
  mclaren: '1963',
  morgan: '1909',
  porsche: '1931',
  'rolls-royce': '1904',
  'rolls royce': '1904',
  bugatti: '1909',
  'de-tomaso': '1959',
  'de tomaso': '1959',
  koenigsegg: '1994',
  pagani: '1992',
  spyker: '1999',
  wiesmann: '1988',
  noble: '1999',
  zenvo: '2007',
  donkervoort: '1978',
  ariel: '1991',
  bac: '2009',
  radical: '1997',
  ginetta: '1958',
  ultima: '1992',
  'gordon-murray': '2017',
  'gordon murray': '2017',
  hennessey: '1991',
  apollo: '2004',
  pininfarina: '1930',
  italdesign: '1968',
  czinger: '2019',
  ssc: '1998',
  saleen: '1983',
  lucid: '2007',
  rivian: '2009',
  fisker: '2007',
  vinfast: '2017',
  hongqi: '1958',
  nio: '2014',
  xpeng: '2014',
  zeekr: '2021',
  'lynk-&-co': '2016',
  'lynk & co': '2016',
  geely: '1986',
  chery: '1997',
  saic: '1955',
  haval: '2013',
  aiways: '2017',
  seres: '1986',
  naran: '2017',
  praga: '1907',
  ktm: '1992',
  caterham: '1973',
  tvr: '1947',
  corvette: '1953',
  gmc: '1912',
  ram: '2010',
  lincoln: '1917',
  infiniti: '1989',
  genesis: '2015',
  'ds-automobiles': '2014',
  'ds automobiles': '2014',
  gwm: '1984',
  omoda: '2022',
  jaecoo: '2023',
};

/**
 * Format brand description string into standard: "Est. [year], [fact or tagline]"
 */
export function formatBrandDescription(brand: {
  id?: string;
  name?: string;
  brand?: string;
  country?: string;
  tagline?: string;
  hint?: string;
  founded?: string;
}): string {
  let year = brand.founded;
  const rawId = (brand.id || '').toLowerCase().trim();
  const rawName = (brand.name || brand.brand || '').toLowerCase().trim();

  if (!year) {
    year =
      BRAND_ESTABLISHED_YEARS[rawId] ||
      BRAND_ESTABLISHED_YEARS[rawName] ||
      BRAND_ESTABLISHED_YEARS[rawId.replace(/[^a-z0-9]/g, '')] ||
      BRAND_ESTABLISHED_YEARS[rawName.replace(/[^a-z0-9]/g, '')];
  }

  if (!year) {
    const match = (brand.tagline || brand.hint || '').match(/(?:founded in|est\.?)\s*(\d{4})/i);
    if (match) {
      year = match[1];
    }
  }

  const foundedYear = year || '1900';

  return `Est. ${foundedYear}`;
}

/**
 * Normalize any brand so its founded year is detected and its tagline is formatted as "Est. [year], [tagline]".
 */
export function normalizeDailyTargetBrand(b: DailyTargetBrand): DailyTargetBrand {
  const formatted = formatBrandDescription(b);
  const match = formatted.match(/^Est\.\s*(\d{4})/i);
  const foundedYear = match ? match[1] : b.founded || '1900';
  return {
    ...b,
    founded: foundedYear,
    tagline: formatted,
  };
}

export interface TierConfig {
  tier: BrandRarityTier;
  label: string;
  chancePercent: number;
  weight: number;
  badgeBg: string;
  badgeText: string;
  borderClass: string;
  description: string;
}

export const TIER_CONFIG: Record<BrandRarityTier, TierConfig> = {
  common: {
    tier: 'common',
    label: 'Common',
    chancePercent: 0,
    weight: 1,
    badgeBg: 'bg-blue-500/10 dark:bg-blue-950/60',
    badgeText: 'text-blue-700 dark:text-blue-300',
    borderClass: 'border-blue-300/70 dark:border-blue-800',
    description: 'Everyday UK road marques (Ford, Vauxhall, BMW, Audi, VW, etc.)',
  },
  'mid-rarity': {
    tier: 'mid-rarity',
    label: 'Mid-Rarity',
    chancePercent: 0,
    weight: 1,
    badgeBg: 'bg-purple-500/10 dark:bg-purple-950/60',
    badgeText: 'text-purple-700 dark:text-purple-300',
    borderClass: 'border-purple-300/70 dark:border-purple-800',
    description: 'Distinctive enthusiast, Scandinavian, Japanese & European brands',
  },
  rare: {
    tier: 'rare',
    label: 'Rare',
    chancePercent: 0,
    weight: 1,
    badgeBg: 'bg-amber-500/10 dark:bg-amber-950/60',
    badgeText: 'text-amber-700 dark:text-amber-300',
    borderClass: 'border-amber-300/70 dark:border-amber-800',
    description: 'Supercars, luxury grand tourers and rare performance legends',
  },
  'ultra-rare': {
    tier: 'ultra-rare',
    label: 'Ultra-Rare',
    chancePercent: 0,
    weight: 1,
    badgeBg: 'bg-rose-500/10 dark:bg-rose-950/60',
    badgeText: 'text-rose-700 dark:text-rose-300',
    borderClass: 'border-rose-300/70 dark:border-rose-800',
    description: 'Boutique multimillion-pound hypercars & bespoke coachbuilt exotics',
  },
};

/**
 * COMPREHENSIVE WEIGHTED BRAND CATALOG
 * All brands strictly return proper model-based brands without trims or sub-variants.
 */

// TIER 1: COMMON UK ROAD BRANDS (60% Chance)
export const COMMON_BRANDS_POOL: DailyTargetBrand[] = [
  {
    id: 'ford',
    name: 'Ford',
    brand: 'Ford',
    country: 'USA / UK',
    category: 'High Frequency UK Road Staple',
    tagline: 'Spot any Ford vehicle on the road',
    hint: 'Look for the classic blue oval emblem — Fiestas, Focuses, Pumas, Kugas, or Transit vans.',
    popularModels: ['Fiesta', 'Focus', 'Puma', 'Kuga', 'Mustang', 'Ranger', 'Transit', 'Mondeo'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'vauxhall',
    name: 'Vauxhall',
    brand: 'Vauxhall',
    country: 'UK',
    category: 'High Frequency UK Road Staple',
    tagline: 'Spot any Vauxhall on the road',
    hint: 'Look for the iconic Griffin crest — Corsas, Astras, Mokkas, Crosslands, or Grandlands.',
    popularModels: ['Corsa', 'Astra', 'Mokka', 'Crossland', 'Grandland', 'Insignia', 'Zafira'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'bmw',
    name: 'BMW',
    brand: 'BMW',
    country: 'Germany',
    category: 'German Premium Executive',
    tagline: 'Spot any BMW vehicle on the road',
    hint: 'Look for the twin-kidney front grille and blue-and-white propeller roundel badge.',
    popularModels: ['1 Series', '3 Series', '5 Series', '2 Series', '4 Series', 'X1', 'X3', 'X5', 'M3', 'M4'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'audi',
    name: 'Audi',
    brand: 'Audi',
    country: 'Germany',
    category: 'German Premium & Quattro',
    tagline: 'Spot any Audi vehicle on the road',
    hint: 'Look for the four interlocking rings badge and distinctive signature LED daytime headlights.',
    popularModels: ['A1', 'A3', 'A4', 'A6', 'Q2', 'Q3', 'Q5', 'Q7', 'TT', 'RS3', 'RS6'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'mercedes-benz',
    name: 'Mercedes-Benz',
    brand: 'Mercedes-Benz',
    country: 'Germany',
    category: 'German Luxury & AMG Performance',
    tagline: 'Spot any Mercedes-Benz on the road',
    hint: 'Look for the famous three-pointed star emblem sitting prominently in the centre grille or bonnet.',
    popularModels: ['A-Class', 'C-Class', 'E-Class', 'CLA', 'GLA', 'GLC', 'GLE', 'S-Class'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'volkswagen',
    name: 'Volkswagen',
    brand: 'Volkswagen',
    country: 'Germany',
    category: 'Everyday German Quality',
    tagline: 'Spot any Volkswagen on the road',
    hint: 'Look for the round VW badge — Golf hatchbacks, Polos, T-Rocs, Tiguans, and ID electrics.',
    popularModels: ['Golf', 'Polo', 'T-Roc', 'Tiguan', 'Passat', 'Scirocco', 'Touareg', 'ID.3', 'ID.4'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'toyota',
    name: 'Toyota',
    brand: 'Toyota',
    country: 'Japan',
    category: 'Japanese Hybrid & Reliability',
    tagline: 'Spot any Toyota vehicle on the road',
    hint: 'Look for the three overlapping oval rings badge — Yarises, Corollas, RAV4s, and Aygo hatchbacks.',
    popularModels: ['Yaris', 'Corolla', 'RAV4', 'Aygo', 'C-HR', 'GR Yaris', 'Supra', 'Hilux', 'Prius'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'nissan',
    name: 'Nissan',
    brand: 'Nissan',
    country: 'Japan',
    category: 'Japanese Crossover & EV',
    tagline: 'Spot any Nissan vehicle on the road',
    hint: 'Look for Sunderland-built Qashqai and Juke crossovers, Micras, or electric Leafs.',
    popularModels: ['Qashqai', 'Juke', 'Micra', 'Leaf', 'X-Trail', 'Ariya', '350Z', '370Z', 'GT-R'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'mini',
    name: 'MINI',
    brand: 'MINI',
    country: 'UK',
    category: 'British Icon & Compact Hatch',
    tagline: 'Spot any MINI on the road',
    hint: 'Look for the circular headlights, contrast roof, and Union Jack LED tail lights.',
    popularModels: ['Cooper', 'Countryman', 'Clubman', 'John Cooper Works', 'Paceman'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'land-rover',
    name: 'Land Rover',
    brand: 'Land Rover',
    country: 'UK',
    category: 'British 4x4 & Luxury SUV',
    tagline: 'Spot any Land Rover or Range Rover on the road',
    hint: 'Look for green oval badges or bold RANGE ROVER lettering across the clamshell bonnet.',
    popularModels: ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover Evoque', 'Range Rover Sport', 'Range Rover Velar'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'honda',
    name: 'Honda',
    brand: 'Honda',
    country: 'Japan',
    category: 'Japanese VTEC & Practicality',
    tagline: 'Spot any Honda on the road',
    hint: 'Look for the silver square H logo — Civics, Jazz superminis, and CR-V SUVs.',
    popularModels: ['Civic', 'Jazz', 'CR-V', 'HR-V', 'Type R', 'e'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'skoda',
    name: 'Skoda',
    brand: 'Skoda',
    country: 'Czech Republic',
    category: 'Value & Practical Engineering',
    tagline: 'Spot any Skoda vehicle on the road',
    hint: 'Look for the winged arrow badge — Octavias, Fabias, Superbs, and Karoq / Kodiaq SUVs.',
    popularModels: ['Octavia', 'Fabia', 'Superb', 'Karoq', 'Kodiaq', 'Kamiq', 'Enyaq'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'seat',
    name: 'SEAT',
    brand: 'SEAT',
    country: 'Spain',
    category: 'Spanish Dynamic & Sporty',
    tagline: 'Spot any SEAT on the road',
    hint: 'Look for the stylized chrome S emblem — Ibizas, Leons, Aronas, and Atecas.',
    popularModels: ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'fiat',
    name: 'Fiat',
    brand: 'Fiat',
    country: 'Italy',
    category: 'Italian City Cars & Chic',
    tagline: 'Spot any Fiat on the road',
    hint: 'Look for the retro Fiat 500 city car silhouette, round headlights, or rugged Panda 4x4s.',
    popularModels: ['500', 'Panda', 'Punto', 'Tipo', '124 Spider', '500X'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'citroen',
    name: 'Citroën',
    brand: 'Citroën',
    country: 'France',
    category: 'French Comfort & Innovation',
    tagline: 'Spot any Citroën on the road',
    hint: 'Look for the double chevron chrome grille logo and distinctive Airbump door side panels.',
    popularModels: ['C3', 'C4', 'C5 Aircross', 'Berlingo', 'C1', 'DS3'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'renault',
    name: 'Renault',
    brand: 'Renault',
    country: 'France',
    category: 'French Design & Hot Hatches',
    tagline: 'Spot any Renault on the road',
    hint: 'Look for the large chrome diamond badge — Clios, Capturs, Meganes, and electric Zoes.',
    popularModels: ['Clio', 'Captur', 'Megane', 'Scenic', 'Kadjar', 'Zoe', 'Arkana', 'Austral'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'peugeot',
    name: 'Peugeot',
    brand: 'Peugeot',
    country: 'France',
    category: 'French Styling & Lion Heritage',
    tagline: 'Spot any Peugeot on the road',
    hint: 'Look for the roaring lion crest and aggressive claw-like LED daytime running lights.',
    popularModels: ['208', '2008', '308', '3008', '508', '5008', 'RCZ'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
  {
    id: 'kia',
    name: 'Kia',
    brand: 'Kia',
    country: 'South Korea',
    category: 'Korean Innovation & Design',
    tagline: 'Spot any Kia vehicle on the road',
    hint: 'Look for the tiger-nose grille, modern connected KIA lettering, and popular Sportage SUVs.',
    popularModels: ['Sportage', 'Ceed', 'Picanto', 'Rio', 'Niro', 'EV6', 'Stinger'],
    rarityTier: 'common',
    rarity: 'Uncommon',
  },
];

// TIER 2: MID-RARITY BRANDS (25% Chance)
export const MID_RARITY_BRANDS_POOL: DailyTargetBrand[] = [
  {
    id: 'volvo',
    name: 'Volvo',
    brand: 'Volvo',
    country: 'Sweden',
    category: 'Scandinavian Safety & Luxury',
    tagline: 'Spot any Volvo vehicle on the road',
    hint: 'Look for the iconic iron mark badge and Thor’s Hammer LED headlights.',
    popularModels: ['XC90', 'XC60', 'XC40', 'V40', 'V60', 'V90', 'S60', 'S90'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'lexus',
    name: 'Lexus',
    brand: 'Lexus',
    country: 'Japan',
    category: 'Japanese Luxury & F-Performance',
    tagline: 'Spot any Lexus on the road',
    hint: 'Look for the dramatic hourglass spindle grille and sharp L-shaped LED light blades.',
    popularModels: ['IS', 'ES', 'GS', 'LS', 'RX', 'NX', 'UX', 'LC', 'RC F', 'LFA'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'subaru',
    name: 'Subaru',
    brand: 'Subaru',
    country: 'Japan',
    category: 'Boxer Engine & Rally Heritage',
    tagline: 'Spot any Subaru on the road',
    hint: 'Look for the six-star Pleiades constellation badge, hood scoops, and symmetrical AWD.',
    popularModels: ['Impreza', 'WRX', 'BRZ', 'Forester', 'Outback', 'Levorg'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'mazda',
    name: 'Mazda',
    brand: 'Mazda',
    country: 'Japan',
    category: 'Jinba Ittai & Kodo Design',
    tagline: 'Spot any Mazda on the road',
    hint: 'Look for the winged M emblem, Soul Red paint, and MX-5 roadsters.',
    popularModels: ['MX-5', 'Mazda3', 'Mazda6', 'CX-5', 'CX-30', 'CX-60', 'RX-8'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'hyundai',
    name: 'Hyundai',
    brand: 'Hyundai',
    country: 'South Korea',
    category: 'Korean Technology & N-Division',
    tagline: 'Spot any Hyundai on the road',
    hint: 'Look for the slanted oval H badge — Tucsons, Konas, or high-performance i30 N hot hatches.',
    popularModels: ['Tucson', 'i30', 'i20', 'Kona', 'Ioniq 5', 'Ioniq 6', 'Santa Fe'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'alfa-romeo',
    name: 'Alfa Romeo',
    brand: 'Alfa Romeo',
    country: 'Italy',
    category: 'Italian Passion & Cuore Sportivo',
    tagline: 'Spot any Alfa Romeo on the road',
    hint: 'Look for the legendary Scudetto triangular front grille and offset front number plate.',
    popularModels: ['Giulia', 'Stelvio', 'Giulietta', 'MiTo', 'Tonale', '4C'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'jeep',
    name: 'Jeep',
    brand: 'Jeep',
    country: 'USA',
    category: 'American Trail & 4x4',
    tagline: 'Spot any Jeep vehicle on the road',
    hint: 'Look for the 7-slot vertical front grille, round headlights, and rugged Wrangler stance.',
    popularModels: ['Wrangler', 'Grand Cherokee', 'Renegade', 'Compass', 'Gladiator'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'jaguar',
    name: 'Jaguar',
    brand: 'Jaguar',
    country: 'UK',
    category: 'British Grace, Pace & Space',
    tagline: 'Spot any Jaguar on the road',
    hint: 'Look for the snarling Jaguar growler face badge and sleek sporting lines.',
    popularModels: ['F-Type', 'XE', 'XF', 'XJ', 'F-Pace', 'E-Pace', 'I-Pace'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'suzuki',
    name: 'Suzuki',
    brand: 'Suzuki',
    country: 'Japan',
    category: 'Japanese Lightweight 4x4 & Compact',
    tagline: 'Spot any Suzuki on the road',
    hint: 'Look for boxy Jimnys, Swift Sport hot hatches, or compact Vitara SUVs.',
    popularModels: ['Swift', 'Jimny', 'Vitara', 'Ignis', 'SX4 S-Cross'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'cupra',
    name: 'Cupra',
    brand: 'Cupra',
    country: 'Spain',
    category: 'Spanish High-Performance & Copper Accents',
    tagline: 'Spot any Cupra on the road',
    hint: 'Look for the distinctive tribal copper badge and aggressive Formentor crossover profile.',
    popularModels: ['Formentor', 'Born', 'Leon', 'Ateca', 'Tavascan'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'dacia',
    name: 'Dacia',
    brand: 'Dacia',
    country: 'Romania',
    category: 'No-Nonsense Robust Transport',
    tagline: 'Spot any Dacia vehicle on the road',
    hint: 'Look for rugged Dusters, Sanderos, or Jogger multi-seaters.',
    popularModels: ['Duster', 'Sandero', 'Jogger', 'Stepway', 'Logan'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'ds-automobiles',
    name: 'DS Automobiles',
    brand: 'DS Automobiles',
    country: 'France',
    category: 'Parisian Avant-Garde Luxury',
    tagline: 'Spot any DS vehicle on the road',
    hint: 'Look for the interlocking DS monogram and diamond guilloché detailing.',
    popularModels: ['DS 3', 'DS 4', 'DS 7', 'DS 9'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'genesis',
    name: 'Genesis',
    brand: 'Genesis',
    country: 'South Korea',
    category: 'Korean Athletic Luxury',
    tagline: 'Spot any Genesis on the road',
    hint: 'Look for the winged badge, crest grille, and twin-line horizontal headlamps.',
    popularModels: ['G70', 'G80', 'GV70', 'GV80', 'GV60'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'mitsubishi',
    name: 'Mitsubishi',
    brand: 'Mitsubishi',
    country: 'Japan',
    category: 'Three Diamonds & Rally Heritage',
    tagline: 'Spot any Mitsubishi on the road',
    hint: 'Look for the three red diamonds badge, Outlander PHEVs, Shoguns, or L200 pick-ups.',
    popularModels: ['Lancer Evolution', 'Outlander', 'Shogun', 'Eclipse Cross', 'L200', 'Colt'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'chrysler',
    name: 'Chrysler',
    brand: 'Chrysler',
    country: 'USA',
    category: 'American Executive Saloons',
    tagline: 'Spot any Chrysler on the road',
    hint: 'Look for winged blue badge, wide chrome grilles, or the muscular 300C saloon.',
    popularModels: ['300C', 'Crossfire', 'Voyager', 'Pacifica', 'Sebring'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'dodge',
    name: 'Dodge',
    brand: 'Dodge',
    country: 'USA',
    category: 'American Muscle & Performance',
    tagline: 'Spot any Dodge vehicle on the road',
    hint: 'Look for aggressive Challenger coupes, Charger saloons, Durango SUVs, or Ram pick-ups.',
    popularModels: ['Challenger', 'Charger', 'Durango', 'Viper', 'Ram', 'Caliber'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'smart',
    name: 'Smart',
    brand: 'Smart',
    country: 'Germany',
    category: 'Compact Urban Electric',
    tagline: 'Spot any Smart car on the road',
    hint: 'Look for ultra-compact 2-seater Fortwo models or modern #1 / #3 electric crossovers.',
    popularModels: ['Fortwo', 'Forfour', 'Roadster', '#1', '#3'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'abarth',
    name: 'Abarth',
    brand: 'Abarth',
    country: 'Italy',
    category: 'Pocket Rocket Scorpion',
    tagline: 'Spot any Abarth on the road',
    hint: 'Look for the yellow-and-red scorpion shield badge and roaring Record Monza dual exhaust.',
    popularModels: ['595', '695', '124 Spider', '500e'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'mg',
    name: 'MG',
    brand: 'MG',
    country: 'UK / Global',
    category: 'Modern EV & Value Performance',
    tagline: 'Spot any modern MG on the road',
    hint: 'Look for the octagonal MG badge — popular MG4 EV hatchbacks, ZS, and Cybersters.',
    popularModels: ['MG4', 'MG ZS', 'MG HS', 'MG3', 'Cyberster'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
  {
    id: 'polestar',
    name: 'Polestar',
    brand: 'Polestar',
    country: 'Sweden',
    category: 'Electric Performance & Scandinavian Design',
    tagline: 'Spot any Polestar on the road',
    hint: 'Look for the minimalist geometric four-pointed star emblem and fastback Polestar 2 stance.',
    popularModels: ['Polestar 2', 'Polestar 3', 'Polestar 4', 'Polestar 1'],
    rarityTier: 'mid-rarity',
    rarity: 'Rare',
  },
];

// TIER 3: RARE / EXOTIC BRANDS (10% Chance)
export const RARE_EXOTIC_BRANDS_POOL: DailyTargetBrand[] = [
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    brand: 'Lamborghini',
    country: 'Italy',
    category: 'Raging Bull Supercars',
    tagline: 'Spot any Lamborghini on the road',
    hint: 'Look for the golden raging bull shield, wedge styling, scissor doors, and V10/V12 engines.',
    popularModels: ['Huracán', 'Aventador', 'Urus', 'Revuelto', 'Gallardo', 'Murciélago', 'Diablo'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    brand: 'Ferrari',
    country: 'Italy',
    category: 'Prancing Horse Supercars',
    tagline: 'Spot any Ferrari on the road',
    hint: 'Look for the yellow Cavallino Rampante shield, Rosso Corsa red paint, and quad round tail lights.',
    popularModels: ['488', 'F8 Tributo', '296 GTB', 'Roma', 'SF90', '812 Superfast', '458 Italia', 'Purosangue'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
  {
    id: 'mclaren',
    name: 'McLaren',
    brand: 'McLaren',
    country: 'UK',
    category: 'British Carbon Composite Supercars',
    tagline: 'Spot any McLaren on the road',
    hint: 'Look for the speedmark boomerang logo, dihedral butterfly doors, and low carbon aerodynamic stance.',
    popularModels: ['720S', '750S', 'Artura', '570S', 'GT', '600LT', 'P1', 'Senna', '650S'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
  {
    id: 'rolls-royce',
    name: 'Rolls-Royce',
    brand: 'Rolls-Royce',
    country: 'UK',
    category: 'Pinnacle of Ultra-Luxury',
    tagline: 'Spot any Rolls-Royce on the road',
    hint: 'Look for the Spirit of Ecstasy hood ornament, Pantheon chrome grille, and rear coach suicide doors.',
    popularModels: ['Phantom', 'Ghost', 'Wraith', 'Dawn', 'Cullinan', 'Spectre'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
  {
    id: 'bentley',
    name: 'Bentley',
    brand: 'Bentley',
    country: 'UK',
    category: 'Grand Touring & Crewe Luxury',
    tagline: 'Spot any Bentley on the road',
    hint: 'Look for the winged B bonnet mascot, matrix mesh grille, and wide Continental GT haunches.',
    popularModels: ['Continental GT', 'Flying Spur', 'Bentayga', 'Mulsanne', 'Arnage'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin',
    brand: 'Aston Martin',
    country: 'UK',
    category: 'Exotic British Grand Tourers',
    tagline: 'Spot any Aston Martin on the road',
    hint: 'Look for the winged badge, elegant clamshell bonnet, dramatic wide grille, and James Bond pedigree.',
    popularModels: ['Vantage', 'DB11', 'DB12', 'DBS', 'DBX', 'Vanquish', 'Rapide'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
  {
    id: 'porsche',
    name: 'Porsche',
    brand: 'Porsche',
    country: 'Germany',
    category: 'Zuffenhausen Sports Cars',
    tagline: 'Spot any Porsche on the road',
    hint: 'Look for the Stuttgart crest badge, rear-engine flyline, and iconic round headlights.',
    popularModels: ['911', '718 Cayman', 'Boxster', 'Taycan', 'Panamera', 'Cayenne', 'Macan'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
  {
    id: 'maserati',
    name: 'Maserati',
    brand: 'Maserati',
    country: 'Italy',
    category: 'Modena Trident Luxury & Sound',
    tagline: 'Spot any Maserati on the road',
    hint: 'Look for the Neptune trident logo, concave oval front grille, and side fender air portholes.',
    popularModels: ['Ghibli', 'Levante', 'Grecale', 'Quattroporte', 'MC20', 'GranTurismo'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
  {
    id: 'lotus',
    name: 'Lotus',
    brand: 'Lotus',
    country: 'UK',
    category: 'British Lightweight Sports Cars',
    tagline: 'Spot any Lotus on the road',
    hint: 'Look for the round yellow-and-green Chapman badge, mid-engine profile, and focused cockpit.',
    popularModels: ['Emira', 'Elise', 'Exige', 'Evora', 'Eletre', 'Evija', 'Esprit'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
  {
    id: 'alpine',
    name: 'Alpine',
    brand: 'Alpine',
    country: 'France',
    category: 'Dieppe Lightweight Sports Coupes',
    tagline: 'Spot any Alpine sports car on the road',
    hint: 'Look for the arrowed A badge, four circular rally-style front lamps, and Alpine Blue paint.',
    popularModels: ['A110', 'A290', 'A310'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
  {
    id: 'chevrolet',
    name: 'Chevrolet',
    brand: 'Chevrolet',
    country: 'USA',
    category: 'American Sports & Performance',
    tagline: 'Spot any Chevrolet on the road',
    hint: 'Look for the golden bowtie badge — mid-engine Corvette C8s, Camaros, or imported Suburbans.',
    popularModels: ['Corvette', 'Camaro', 'Tahoe', 'Suburban', 'Silverado', 'Impala'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
  {
    id: 'cadillac',
    name: 'Cadillac',
    brand: 'Cadillac',
    country: 'USA',
    category: 'American Luxury & V-Series',
    tagline: 'Spot any Cadillac on the road',
    hint: 'Look for vertical LED blade headlights, crest badge, Escalades, or CT5-V sports saloons.',
    popularModels: ['Escalade', 'CT5', 'CTS', 'ATS', 'XT5', 'Lyriq'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
  {
    id: 'pontiac',
    name: 'Pontiac',
    brand: 'Pontiac',
    country: 'USA',
    category: 'American Heritage Muscle',
    tagline: 'Spot any classic Pontiac on the road',
    hint: 'Look for the red arrowhead badge, split front grilles, Firebirds, Trans Ams, or GTOs.',
    popularModels: ['Firebird', 'Trans Am', 'GTO', 'G8', 'Solstice'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
  {
    id: 'morgan',
    name: 'Morgan',
    brand: 'Morgan',
    country: 'UK',
    category: 'Traditional Handcrafted Coachbuilder',
    tagline: 'Spot any Morgan on the road',
    hint: 'Look for sweeping vintage wings, louvred bonnet, exposed spare wheel, or 3-Wheeler design.',
    popularModels: ['Plus Four', 'Plus Six', '3 Wheeler', 'Aero 8', '4/4'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
  {
    id: 'caterham',
    name: 'Caterham',
    brand: 'Caterham',
    country: 'UK',
    category: 'Track Lightweight Purist Seven',
    tagline: 'Spot any Caterham on the road',
    hint: 'Look for the iconic open-wheel Colin Chapman Seven silhouette, side exhaust, and tiny cockpit.',
    popularModels: ['Seven 170', 'Seven 360', 'Seven 420', 'Seven 620R', 'Superlight'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
  {
    id: 'tvr',
    name: 'TVR',
    brand: 'TVR',
    country: 'UK',
    category: 'British Hand-Built V8 Bruiser',
    tagline: 'Spot any TVR on the road',
    hint: 'Look for dramatic reflex pearlescent paint, no driver aids, bonnet cutouts, and loud exhausts.',
    popularModels: ['Cerbera', 'Chimaera', 'Tuscan', 'Griffith', 'Sagaris', 'Tamora'],
    rarityTier: 'rare',
    rarity: 'Epic',
    isExotic: true,
  },
];

// TIER 4: ULTRA-RARE HYPERCAR BRANDS (5% Chance)
export const ULTRA_RARE_BRANDS_POOL: DailyTargetBrand[] = [
  {
    id: 'pagani',
    name: 'Pagani',
    brand: 'Pagani',
    country: 'Italy',
    category: 'San Cesario Sul Panaro Art Hypercar',
    tagline: 'Spot any Pagani hypercar on the road',
    hint: 'Look for central quad-pipe circular titanium exhaust, leaf-shaped carbon mirrors, and Mercedes-AMG V12.',
    popularModels: ['Zonda', 'Huayra', 'Utopia'],
    rarityTier: 'ultra-rare',
    rarity: 'Legendary',
    isExotic: true,
  },
  {
    id: 'koenigsegg',
    name: 'Koenigsegg',
    brand: 'Koenigsegg',
    country: 'Sweden',
    category: 'Swedish Megacar & Speed Record Breaker',
    tagline: 'Spot any Koenigsegg hypercar on the road',
    hint: 'Look for wraparound fighter-jet canopy cockpit, dihedral synchro-helix doors, and ghost crest emblem.',
    popularModels: ['Jesko', 'Regera', 'Agera', 'CCX', 'Gemera', 'One:1'],
    rarityTier: 'ultra-rare',
    rarity: 'Legendary',
    isExotic: true,
  },
  {
    id: 'bugatti',
    name: 'Bugatti',
    brand: 'Bugatti',
    country: 'France',
    category: 'Molsheim Quad-Turbo W16 Hypercar',
    tagline: 'Spot any Bugatti on the road',
    hint: 'Look for the famous horseshoe grille, distinctive side C-line curve, and red oval Bugatti macaron.',
    popularModels: ['Chiron', 'Veyron', 'Divo', 'Tourbillon', 'Bolide', 'EB110'],
    rarityTier: 'ultra-rare',
    rarity: 'Legendary',
    isExotic: true,
  },
  {
    id: 'rimac',
    name: 'Rimac',
    brand: 'Rimac',
    country: 'Croatia',
    category: 'All-Electric 1900hp Hypercar',
    tagline: 'Spot any Rimac electric hypercar on the road',
    hint: 'Look for neck-snapping Nevera profile, active aerodynamic rear wing, and futuristic blue lighting.',
    popularModels: ['Nevera', 'Concept_One'],
    rarityTier: 'ultra-rare',
    rarity: 'Legendary',
    isExotic: true,
  },
  {
    id: 'de-tomaso',
    name: 'De Tomaso',
    brand: 'De Tomaso',
    country: 'Italy',
    category: 'Italian Design & American V8 Power',
    tagline: 'Spot any De Tomaso on the road',
    hint: 'Look for the T-shaped cattle brand logo, iconic Pantera wedge silhouette, or sculpted P72.',
    popularModels: ['Pantera', 'Mangusta', 'P72', 'Guarà'],
    rarityTier: 'ultra-rare',
    rarity: 'Legendary',
    isExotic: true,
  },
  {
    id: 'spyker',
    name: 'Spyker',
    brand: 'Spyker',
    country: 'Netherlands',
    category: 'Dutch Aviation-Inspired Supercars',
    tagline: 'Spot any Spyker on the road',
    hint: 'Look for aeroplane propeller logo, exposed aircraft-style gear linkage, and turned aluminium dashboard.',
    popularModels: ['C8 Laviolette', 'C8 Spyder', 'C8 Preliator', 'C8 Aileron'],
    rarityTier: 'ultra-rare',
    rarity: 'Legendary',
    isExotic: true,
  },
  {
    id: 'wiesmann',
    name: 'Wiesmann',
    brand: 'Wiesmann',
    country: 'Germany',
    category: 'Bespoke Gecko Sports Cars',
    tagline: 'Spot any Wiesmann on the road',
    hint: 'Look for the silver gecko logo, sweeping retro curves, and BMW M-power twin-turbo engine.',
    popularModels: ['MF3', 'MF4', 'MF5', 'Project Gecko', 'Thunderball'],
    rarityTier: 'ultra-rare',
    rarity: 'Legendary',
    isExotic: true,
  },
  {
    id: 'noble',
    name: 'Noble',
    brand: 'Noble',
    country: 'UK',
    category: 'Leicestershire Twin-Turbo Supercar',
    tagline: 'Spot any Noble supercar on the road',
    hint: 'Look for the twin-N logo, massive carbon rear wing, and rear mid-mounted twin-turbo V8.',
    popularModels: ['M600', 'M12', 'M400', 'M500'],
    rarityTier: 'ultra-rare',
    rarity: 'Legendary',
    isExotic: true,
  },
  {
    id: 'zenvo',
    name: 'Zenvo',
    brand: 'Zenvo',
    country: 'Denmark',
    category: 'Danish Active Centripetal Hypercar',
    tagline: 'Spot any Zenvo hypercar on the road',
    hint: 'Look for aggressive angular Danish bodywork and the patented pivoting Centripetal active rear wing.',
    popularModels: ['TSR-S', 'ST1', 'TSR-GT', 'Aurora'],
    rarityTier: 'ultra-rare',
    rarity: 'Legendary',
    isExotic: true,
  },
  {
    id: 'donkervoort',
    name: 'Donkervoort',
    brand: 'Donkervoort',
    country: 'Netherlands',
    category: 'Ultra-Lightweight Extreme Performance',
    tagline: 'Spot any Donkervoort on the road',
    hint: 'Look for exposed carbon fibre, butterfly doors, and Audi 5-cylinder turbo power.',
    popularModels: ['D8 GTO', 'F22', 'D8 270'],
    rarityTier: 'ultra-rare',
    rarity: 'Legendary',
    isExotic: true,
  },
];

// Default curated pool combining all tiers
export const DEFAULT_CURATED_DAILY_BRAND_POOL: DailyTargetBrand[] = [
  ...COMMON_BRANDS_POOL,
  ...MID_RARITY_BRANDS_POOL,
  ...RARE_EXOTIC_BRANDS_POOL,
  ...ULTRA_RARE_BRANDS_POOL,
];

export const CUSTOM_DRAW_BRANDS_KEY = 'cardex_custom_draw_brands_v2';
export const CUSTOM_DRAW_BASELINE_KEY = 'cardex_custom_draw_brands_baseline';

export const TIER_ORDER: Record<BrandRarityTier, number> = {
  common: 1,
  'mid-rarity': 2,
  rare: 3,
  'ultra-rare': 4,
};

/**
 * Sort brands by their respective rarity tier (Common -> Mid-Rarity -> Rare -> Ultra-Rare),
 * and alphabetically by brand name within each tier.
 */
export function sortBrandsByRarity(brands: DailyTargetBrand[]): DailyTargetBrand[] {
  return [...brands].sort((a, b) => {
    const orderA = TIER_ORDER[a.rarityTier] ?? 99;
    const orderB = TIER_ORDER[b.rarityTier] ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.name.localeCompare(b.name);
  });
}

/**
 * Get the current brand draw pool, incorporating any owner additions or customizations.
 * Persists the user's curated choices as the permanent baseline.
 */
export function getCuratedDailyBrandPool(): DailyTargetBrand[] {
  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(CUSTOM_DRAW_BRANDS_KEY) || localStorage.getItem(CUSTOM_DRAW_BASELINE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeDailyTargetBrand);
        }
      }
    }
  } catch (e) {
    console.warn('Error reading custom draw brands pool:', e);
  }
  return DEFAULT_CURATED_DAILY_BRAND_POOL.map(normalizeDailyTargetBrand);
}

// Active pool instance, kept updated with modifications
export let CURATED_DAILY_BRAND_POOL: DailyTargetBrand[] = getCuratedDailyBrandPool();

// Synchronize with server backend to ensure the user's chosen car pool is preserved across devices/tabs/refreshes
if (typeof window !== 'undefined') {
  try {
    const currentLocal = localStorage.getItem(CUSTOM_DRAW_BRANDS_KEY) || localStorage.getItem(CUSTOM_DRAW_BASELINE_KEY);
    if (currentLocal) {
      const parsed = JSON.parse(currentLocal);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const normalized = parsed.map(normalizeDailyTargetBrand);
        localStorage.setItem(CUSTOM_DRAW_BASELINE_KEY, JSON.stringify(normalized));
        localStorage.setItem(CUSTOM_DRAW_BRANDS_KEY, JSON.stringify(normalized));
        fetch('/api/curated-draw-pool', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brands: normalized }),
        }).catch(() => {});
      }
    } else {
      fetch('/api/curated-draw-pool')
        .then((res) => res.json())
        .then((data) => {
          if (data?.brands && Array.isArray(data.brands) && data.brands.length > 0) {
            const normalized = data.brands.map(normalizeDailyTargetBrand);
            localStorage.setItem(CUSTOM_DRAW_BRANDS_KEY, JSON.stringify(normalized));
            localStorage.setItem(CUSTOM_DRAW_BASELINE_KEY, JSON.stringify(normalized));
            CURATED_DAILY_BRAND_POOL = normalized;
            window.dispatchEvent(new CustomEvent('cardex_draw_pool_updated', { detail: normalized }));
          }
        })
        .catch(() => {});
    }
  } catch {}
}

/**
 * Persist brand draw pool and notify application components.
 */
export function saveCuratedDailyBrandPool(brands: DailyTargetBrand[]): void {
  const normalized = brands.map(normalizeDailyTargetBrand);
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CUSTOM_DRAW_BRANDS_KEY, JSON.stringify(normalized));
      localStorage.setItem(CUSTOM_DRAW_BASELINE_KEY, JSON.stringify(normalized));
      fetch('/api/curated-draw-pool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brands: normalized }),
      }).catch(() => {});
    }
    CURATED_DAILY_BRAND_POOL = normalized;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cardex_draw_pool_updated', { detail: normalized }));
    }
  } catch (e) {
    console.warn('Error saving custom draw brands pool:', e);
  }
}

/**
 * Add a new brand (e.g. from UK database) to the daily draw pool.
 */
export function addBrandToDrawPool(newBrand: DailyTargetBrand): DailyTargetBrand[] {
  const normalizedNew = normalizeDailyTargetBrand(newBrand);
  const current = getCuratedDailyBrandPool();
  const filtered = current.filter((b) => b.id.toLowerCase() !== normalizedNew.id.toLowerCase());
  const updated = [normalizedNew, ...filtered];
  saveCuratedDailyBrandPool(updated);
  return updated;
}

/**
 * Remove a brand from the daily draw pool.
 */
export function removeBrandFromDrawPool(brandId: string): DailyTargetBrand[] {
  const current = getCuratedDailyBrandPool();
  const updated = current.filter((b) => b.id.toLowerCase() !== brandId.toLowerCase());
  saveCuratedDailyBrandPool(updated);
  return updated;
}

/**
 * Update properties of an existing brand in the daily draw pool (e.g. change rarity tier).
 */
export function updateBrandInDrawPool(brandId: string, updates: Partial<DailyTargetBrand>): DailyTargetBrand[] {
  const current = getCuratedDailyBrandPool();
  const updated = current.map((b) => {
    if (b.id.toLowerCase() === brandId.toLowerCase()) {
      return normalizeDailyTargetBrand({ ...b, ...updates });
    }
    return b;
  });
  saveCuratedDailyBrandPool(updated);
  return updated;
}

/**
 * Helper to generate a fully populated DailyTargetBrand with all required metadata
 */
export function createDailyTargetBrandFromCatalog(
  brandName: string,
  country = 'United Kingdom',
  tier: BrandRarityTier = 'common',
  popularModels: string[] = [],
  tagline?: string,
  hint?: string,
  founded?: string
): DailyTargetBrand {
  const cleanId = brandName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  const cleanModels = popularModels.length > 0 ? popularModels : [brandName];
  const autoTagline = tagline || `Spot any authentic ${brandName} vehicle on UK roads`;
  const autoHint = hint || `Look for distinctive ${brandName} badging and design styling on the road.`;
  const isExotic = tier === 'rare' || tier === 'ultra-rare';

  let rarityAlias: 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' = 'Uncommon';
  if (tier === 'mid-rarity') rarityAlias = 'Rare';
  else if (tier === 'rare') rarityAlias = 'Epic';
  else if (tier === 'ultra-rare') rarityAlias = 'Legendary';

  const brandObj: DailyTargetBrand = {
    id: cleanId,
    name: brandName,
    brand: brandName,
    country,
    category: isExotic ? 'Supercar / Exotic' : 'Automotive Manufacturer',
    tagline: autoTagline,
    hint: autoHint,
    popularModels: cleanModels,
    rarityTier: tier,
    rarity: rarityAlias,
    isExotic,
    founded,
  };

  return normalizeDailyTargetBrand(brandObj);
}

/**
 * Reset the daily draw pool. Preserves the user's active baseline list without reverting.
 */
export function resetDrawPoolToDefault(): DailyTargetBrand[] {
  const current = getCuratedDailyBrandPool();
  CURATED_DAILY_BRAND_POOL = current;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cardex_draw_pool_updated', { detail: current }));
  }
  return current;
}

export const DAILY_TARGET_STORAGE_KEY = 'cardex_daily_brand_target_v3';
export const TARGET_HISTORY_STORAGE_KEY = 'cardex_target_brand_history';
export const DAILY_MAX_SKIPS = 2; // 2 skips per day to get a new brand

/**
 * Scaled XP calculation based on car rarity for collections and daily targets.
 * Rarer cars grant significantly higher XP rewards.
 */
export function getCarBaseXpByRarity(rarity?: string): number {
  if (!rarity) return 100;
  const r = rarity.toLowerCase();
  if (r.includes('ultra') || r.includes('hyper') || r.includes('legendary')) return 1000;
  if (r.includes('rare') || r.includes('epic') || r.includes('exotic')) return 500;
  if (r.includes('mid') || r.includes('uncommon') || r.includes('special')) return 250;
  return 100; // Common
}

/**
 * Base XP for a brand rarity tier.
 */
export function getTierBaseXp(tier: BrandRarityTier): number {
  switch (tier) {
    case 'ultra-rare':
      return 1000;
    case 'rare':
      return 500;
    case 'mid-rarity':
      return 250;
    case 'common':
    default:
      return 100;
  }
}

/**
 * Daily Target XP Bounty: triples the car/tier rarity base XP.
 * Common: 100 * 3 = 300 XP
 * Mid-Rarity: 250 * 3 = 750 XP
 * Rare Exotic: 500 * 3 = 1,500 XP
 * Ultra-Rare: 1,000 * 3 = 3,000 XP
 */
export function getDailyTargetXpBounty(tier: BrandRarityTier): number {
  return getTierBaseXp(tier) * 3;
}

export const BASE_DAILY_TARGET_XP = 300;
export const TRIPLE_DAILY_TARGET_XP = 900; // Legacy constant for backward compatibility
export const DOUBLE_DAILY_TARGET_XP = TRIPLE_DAILY_TARGET_XP; // Legacy alias

export interface SelectionDebugInfo {
  chosenTier: BrandRarityTier;
  roll: number;
  tierWeightPercent: number;
  availableInTier: number;
  filteredOutRecentCount: number;
  brand: DailyTargetBrand;
  timestamp: string;
}

export interface DailySpottingTargetState {
  date: string; // YYYY-MM-DD
  targetBrand: DailyTargetBrand;
  skipsRemaining: number;
  authenticSkipsRemaining?: number; // True skips left, immune to temporary dev testing
  maxSkips: number;
  completed: boolean;
  completedAt?: string;
  xpBounty: number;
  baseXp: number;
  skippedBrandIds: string[];
  selectionDebug?: SelectionDebugInfo;
}

/**
 * Gets today's local date string formatted as YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Anti-repeat mechanism: maintains history of recently chosen brands
 * to ensure variety while guaranteeing every brand can appear eventually.
 */
export function getRecentTargetHistory(): string[] {
  try {
    const raw = localStorage.getItem(TARGET_HISTORY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export function recordBrandInHistory(brandId: string): void {
  try {
    const history = getRecentTargetHistory().filter((id) => id !== brandId);
    history.unshift(brandId);
    // Keep last 15 brands to prevent quick repetitions while cycling through full catalog
    const trimmed = history.slice(0, 15);
    localStorage.setItem(TARGET_HISTORY_STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore
  }
}

export function recordTargetHistoryEntry(entry: {
  brandId: string;
  brandName: string;
  country?: string;
  rarityTier?: string;
  rarityLabel?: string;
  completed?: boolean;
  xpBounty?: number;
  date?: string;
}): void {
  try {
    const raw = localStorage.getItem('cardex_garage_target_history_logs');
    let logs: any[] = [];
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) logs = parsed;
    }
    const newLog = {
      ...entry,
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      date: entry.date || new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      completed: !!entry.completed,
      xpBounty: entry.xpBounty || 500,
    };
    logs.unshift(newLog);
    const trimmed = logs.slice(0, 50);
    localStorage.setItem('cardex_garage_target_history_logs', JSON.stringify(trimmed));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cardex_garage_updated'));
    }
  } catch (e) {
    console.warn('Could not record target history entry:', e);
  }
}

/**
 * FAIR TARGET SELECTION ENGINE
 * Uniform brand selection with anti-repeat memory so brands rotate naturally.
 * Supports forcing a tier if requested (e.g. from owner testing).
 */
export function selectTargetBrand(
  excludeBrandIds: string[] = [],
  forceTier?: BrandRarityTier
): { brand: DailyTargetBrand; debug: SelectionDebugInfo } {
  const recentHistory = getRecentTargetHistory();
  const allExcluded = new Set([...excludeBrandIds, ...recentHistory]);

  const activePool = getCuratedDailyBrandPool();
  let pool = activePool;
  if (forceTier) {
    pool = activePool.filter((b) => b.rarityTier === forceTier);
  }

  let eligible = pool.filter((b) => !allExcluded.has(b.id));
  let filteredCount = pool.length - eligible.length;

  // If all brands in this tier/pool are in recent history, relax recent history check
  if (eligible.length === 0) {
    eligible = pool.filter((b) => !excludeBrandIds.includes(b.id));
    filteredCount = pool.length - eligible.length;
  }

  // Fallback if today's excluded list contains everything in this tier
  if (eligible.length === 0) {
    eligible = activePool.filter((b) => !excludeBrandIds.includes(b.id));
    if (eligible.length === 0) {
      eligible = activePool;
    }
  }

  const selectedBrand = eligible[Math.floor(Math.random() * eligible.length)] || activePool[0] || DEFAULT_CURATED_DAILY_BRAND_POOL[0];

  recordBrandInHistory(selectedBrand.id);

  const debug: SelectionDebugInfo = {
    chosenTier: selectedBrand.rarityTier,
    roll: 1.0,
    tierWeightPercent: 0,
    availableInTier: eligible.length,
    filteredOutRecentCount: filteredCount,
    brand: selectedBrand,
    timestamp: new Date().toISOString(),
  };

  return { brand: selectedBrand, debug };
}

// Backward compatible alias
export const selectWeightedTargetBrand = selectTargetBrand;

/**
 * Check whether a car scan matches the current daily target BRAND.
 * Spotting ANY car from the brand satisfies the target!
 */
export function isBrandMatchForDailyTarget(
  target: DailyTargetBrand,
  scanCarName?: string,
  scanMake?: string,
  scanModel?: string
): boolean {
  if (!target) return false;

  const targetBrandLower = target.brand.toLowerCase().trim();
  const targetIdLower = target.id.toLowerCase().trim();
  const makeLower = (scanMake || '').toLowerCase().trim();
  const modelLower = (scanModel || '').toLowerCase().trim();
  const carNameLower = (scanCarName || '').toLowerCase().trim();

  // 1. Direct make match
  if (makeLower) {
    if (makeLower === targetBrandLower || makeLower === targetIdLower) return true;
    if (makeLower.includes(targetBrandLower) || targetBrandLower.includes(makeLower)) return true;
  }

  // 2. Common brand alias matching
  if (targetIdLower === 'chevrolet' && (makeLower.includes('chevy') || carNameLower.includes('chevy'))) return true;
  if (targetIdLower === 'lamborghini' && (makeLower.includes('lambo') || carNameLower.includes('lambo'))) return true;
  if (targetIdLower === 'alfa-romeo' && (makeLower.includes('alfa') || carNameLower.includes('alfa'))) return true;
  if (targetIdLower === 'aston-martin' && (makeLower.includes('aston') || carNameLower.includes('aston'))) return true;
  if (targetIdLower === 'mercedes-benz' && (makeLower.includes('mercedes') || carNameLower.includes('mercedes') || makeLower.includes('amg'))) return true;
  if (targetIdLower === 'volkswagen' && (makeLower.includes('vw') || carNameLower.includes('vw'))) return true;

  // 3. Scan full car name contains brand
  if (carNameLower) {
    if (carNameLower.includes(targetBrandLower) || carNameLower.includes(targetIdLower)) return true;
  }

  // 4. Popular models check (e.g. user scanned "Corvette C8" or "Fiesta ST" where make was omitted)
  if (target.popularModels && target.popularModels.length > 0) {
    for (const model of target.popularModels) {
      const mLower = model.toLowerCase();
      if (modelLower.includes(mLower) || carNameLower.includes(mLower)) {
        return true;
      }
    }
  }

  // 5. Model resolver check
  const resolved = resolveParentModel(scanCarName || scanModel || '', scanMake);
  if (resolved.brand && resolved.brand.toLowerCase().includes(targetBrandLower)) {
    return true;
  }

  return false;
}

export const isCarMatchForDailyTarget = isBrandMatchForDailyTarget;

/**
 * Check if the daily target brand has been spotted today either in recent scans or collection state
 */
export function verifyDailyBrandTargetCompletion(
  target: DailyTargetBrand,
  collectionState: Record<string, UserCarCollectionState> = {},
  recentScans: ScannedCarEntry[] = []
): boolean {
  if (!target) return false;
  const todayDateStr = new Date().toDateString();

  // Check recent scans from today
  const matchedInScans = recentScans.some((scan) => {
    try {
      const scanDate = new Date(scan.scannedAt).toDateString();
      if (scanDate !== todayDateStr) return false;
      return isBrandMatchForDailyTarget(target, scan.carName, scan.make, scan.model);
    } catch {
      return false;
    }
  });

  if (matchedInScans) return true;

  // Check collection state lastScannedDate
  const targetBrandLower = target.brand.toLowerCase();

  return Object.entries(collectionState).some(([carId, state]) => {
    if (!state?.lastScannedDate) return false;
    try {
      const scanDate = new Date(state.lastScannedDate).toDateString();
      if (scanDate !== todayDateStr) return false;

      const idLower = carId.toLowerCase();
      return idLower.includes(targetBrandLower);
    } catch {
      return false;
    }
  });
}

export const verifyDailyTargetCompletion = verifyDailyBrandTargetCompletion;

const SESSION_ACTIVE_KEY = 'cardex_active_session_flag';

// Register beforeunload hook to revert temporary testing skips when app/tab is closed
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    try {
      const raw = localStorage.getItem(DAILY_TARGET_STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data && typeof data.authenticSkipsRemaining === 'number') {
          if (data.skipsRemaining !== data.authenticSkipsRemaining) {
            data.skipsRemaining = data.authenticSkipsRemaining;
            localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(data));
          }
        }
      }
    } catch {}
  });
}

/**
 * Load the active daily target state from localStorage.
 * - Persistent across refreshes
 * - Automatically rolls a new weighted brand at the start of each new calendar day
 * - Reverts test skips to authentic skips on app reopen/reload
 */
export function getDailyTargetState(
  collectionState: Record<string, UserCarCollectionState> = {},
  recentScans: ScannedCarEntry[] = []
): DailySpottingTargetState {
  const today = getTodayDateString();

  try {
    const raw = localStorage.getItem(DAILY_TARGET_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.date === today && parsed.targetBrand) {
        // Guarantee rarityTier is backfilled if older object format
        if (!parsed.targetBrand.rarityTier) {
          const match = CURATED_DAILY_BRAND_POOL.find((b) => b.id === parsed.targetBrand.id);
          parsed.targetBrand.rarityTier = match?.rarityTier || 'common';
        }

        // Initialize authenticSkipsRemaining if missing
        if (typeof parsed.authenticSkipsRemaining !== 'number') {
          parsed.authenticSkipsRemaining = Math.min(DAILY_MAX_SKIPS, parsed.skipsRemaining ?? DAILY_MAX_SKIPS);
        }

        // If a new session has started (app reopened, refreshed, or closed previously), revert test skips to authentic
        if (typeof window !== 'undefined') {
          if (!sessionStorage.getItem(SESSION_ACTIVE_KEY)) {
            sessionStorage.setItem(SESSION_ACTIVE_KEY, 'active');
            if (parsed.skipsRemaining !== parsed.authenticSkipsRemaining) {
              parsed.skipsRemaining = parsed.authenticSkipsRemaining;
              try {
                localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(parsed));
              } catch {}
            }
          }
        }

        if (!parsed.completed) {
          const completedNow = verifyDailyBrandTargetCompletion(
            parsed.targetBrand,
            collectionState,
            recentScans
          );
          if (completedNow) {
            parsed.completed = true;
            parsed.completedAt = new Date().toISOString();
            localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(parsed));
          }
        }

        // Dynamically compute XP bounty based on brand rarity tier (tripled base XP)
        const expectedBounty = getDailyTargetXpBounty(parsed.targetBrand.rarityTier);
        if (parsed.xpBounty !== expectedBounty) {
          parsed.xpBounty = expectedBounty;
          parsed.baseXp = getTierBaseXp(parsed.targetBrand.rarityTier);
          try {
            localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(parsed));
          } catch {
            // ignore
          }
        }
        return parsed as DailySpottingTargetState;
      } else if (parsed && parsed.targetBrand && parsed.date !== today) {
        // Record yesterday's brand into target history
        recordTargetHistoryEntry({
          brandId: parsed.targetBrand.id,
          brandName: parsed.targetBrand.name,
          country: parsed.targetBrand.country,
          rarityTier: parsed.targetBrand.rarityTier,
          rarityLabel: parsed.targetBrand.rarity,
          completed: parsed.completed,
          xpBounty: parsed.xpBounty,
          date: parsed.date,
        });
      }
    }
  } catch (e) {
    console.warn('Could not read daily brand target state:', e);
  }

  // Generate fresh weighted target brand for today
  const { brand: initialBrand, debug } = selectWeightedTargetBrand();
  const initialBounty = getDailyTargetXpBounty(initialBrand.rarityTier);
  const initialBase = getTierBaseXp(initialBrand.rarityTier);

  // Mark session active
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_ACTIVE_KEY, 'active');
  }

  const initialState: DailySpottingTargetState = {
    date: today,
    targetBrand: initialBrand,
    skipsRemaining: DAILY_MAX_SKIPS,
    authenticSkipsRemaining: DAILY_MAX_SKIPS,
    maxSkips: DAILY_MAX_SKIPS,
    completed: false,
    xpBounty: initialBounty,
    baseXp: initialBase,
    skippedBrandIds: [],
    selectionDebug: debug,
  };

  // Check if by chance already spotted today
  if (verifyDailyBrandTargetCompletion(initialBrand, collectionState, recentScans)) {
    initialState.completed = true;
    initialState.completedAt = new Date().toISOString();
  }

  try {
    localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(initialState));
  } catch (e) {
    console.warn('Could not save daily target state:', e);
  }

  return initialState;
}

/**
 * Skip the current target to get a new brand for today using the fair draw system.
 */
export function skipDailyTarget(
  collectionState: Record<string, UserCarCollectionState> = {},
  recentScans: ScannedCarEntry[] = []
): DailySpottingTargetState {
  const current = getDailyTargetState(collectionState, recentScans);

  if (current.completed || current.skipsRemaining <= 0) {
    return current;
  }

  // Save the skipped brand into the target history log
  recordTargetHistoryEntry({
    brandId: current.targetBrand.id,
    brandName: current.targetBrand.name,
    country: current.targetBrand.country,
    rarityTier: current.targetBrand.rarityTier,
    rarityLabel: current.targetBrand.rarity,
    completed: current.completed,
    xpBounty: current.xpBounty,
    date: 'Skipped Today',
  });

  const skipped = [...(current.skippedBrandIds || []), current.targetBrand.id];
  const newSkipsRemaining = Math.max(0, current.skipsRemaining - 1);
  const currentAuthentic = current.authenticSkipsRemaining ?? Math.min(DAILY_MAX_SKIPS, current.skipsRemaining);
  const newAuthentic = Math.max(0, currentAuthentic - 1);

  const { brand: nextBrand, debug } = selectWeightedTargetBrand(skipped);
  const nextBounty = getDailyTargetXpBounty(nextBrand.rarityTier);
  const nextBase = getTierBaseXp(nextBrand.rarityTier);

  const updatedState: DailySpottingTargetState = {
    ...current,
    targetBrand: nextBrand,
    skipsRemaining: newSkipsRemaining,
    authenticSkipsRemaining: newAuthentic,
    skippedBrandIds: skipped,
    completed: false,
    completedAt: undefined,
    xpBounty: nextBounty,
    baseXp: nextBase,
    selectionDebug: debug,
  };

  if (verifyDailyBrandTargetCompletion(nextBrand, collectionState, recentScans)) {
    updatedState.completed = true;
    updatedState.completedAt = new Date().toISOString();
  }

  try {
    localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(updatedState));
    window.dispatchEvent(new CustomEvent('cardex_daily_target_updated', { detail: updatedState }));
  } catch (e) {
    console.warn('Could not save updated daily brand target:', e);
  }

  return updatedState;
}

/**
 * Mark daily target as completed directly
 */
export function markDailyTargetCompleted(): DailySpottingTargetState | null {
  try {
    const raw = localStorage.getItem(DAILY_TARGET_STORAGE_KEY);
    if (raw) {
      const state: DailySpottingTargetState = JSON.parse(raw);
      if (state && !state.completed) {
        state.completed = true;
        state.completedAt = new Date().toISOString();
        localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(state));
        window.dispatchEvent(new CustomEvent('cardex_daily_target_updated', { detail: state }));
        return state;
      }
    }
  } catch (e) {
    console.warn('Could not mark daily target completed:', e);
  }
  return null;
}

/**
 * OWNER / DEVELOPER TESTING CONTROLS
 */

export function ownerRefreshSkips(amount = 3): DailySpottingTargetState {
  const current = getDailyTargetState();
  const updatedState: DailySpottingTargetState = {
    ...current,
    skipsRemaining: (current.skipsRemaining || 0) + amount,
    // Do NOT alter authenticSkipsRemaining! Preserve authentic count so closing/reloading reverts test skips
    authenticSkipsRemaining: current.authenticSkipsRemaining ?? 0,
    skippedBrandIds: [],
  };

  try {
    localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(updatedState));
    window.dispatchEvent(new CustomEvent('cardex_daily_target_updated', { detail: updatedState }));
  } catch (e) {
    console.warn('Could not save owner skips:', e);
  }
  return updatedState;
}

export function ownerSetSkips(count: number): DailySpottingTargetState {
  const current = getDailyTargetState();
  const updatedState: DailySpottingTargetState = {
    ...current,
    skipsRemaining: Math.max(0, count),
    // Do NOT alter authenticSkipsRemaining!
    authenticSkipsRemaining: current.authenticSkipsRemaining ?? 0,
  };

  try {
    localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(updatedState));
    window.dispatchEvent(new CustomEvent('cardex_daily_target_updated', { detail: updatedState }));
  } catch (e) {
    console.warn('Could not save owner skips:', e);
  }
  return updatedState;
}

/**
 * Explicitly reset authentic skips (e.g. if owner wants to grant permanent authentic skips)
 */
export function ownerResetAuthenticSkips(count = 2): DailySpottingTargetState {
  const current = getDailyTargetState();
  const updatedState: DailySpottingTargetState = {
    ...current,
    skipsRemaining: count,
    authenticSkipsRemaining: count,
  };

  try {
    localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(updatedState));
    window.dispatchEvent(new CustomEvent('cardex_daily_target_updated', { detail: updatedState }));
  } catch (e) {
    console.warn('Could not reset authentic skips:', e);
  }
  return updatedState;
}

export function ownerForceTargetBrand(brandId: string): DailySpottingTargetState | null {
  const brand = CURATED_DAILY_BRAND_POOL.find((b) => b.id.toLowerCase() === brandId.toLowerCase());
  if (!brand) return null;

  const current = getDailyTargetState();
  const debug: SelectionDebugInfo = {
    chosenTier: brand.rarityTier,
    roll: 1.0,
    tierWeightPercent: 0,
    availableInTier: CURATED_DAILY_BRAND_POOL.filter((b) => b.rarityTier === brand.rarityTier).length,
    filteredOutRecentCount: 0,
    brand,
    timestamp: new Date().toISOString(),
  };

  const nextBounty = getDailyTargetXpBounty(brand.rarityTier);
  const nextBase = getTierBaseXp(brand.rarityTier);

  const updatedState: DailySpottingTargetState = {
    ...current,
    targetBrand: brand,
    completed: false,
    completedAt: undefined,
    xpBounty: nextBounty,
    baseXp: nextBase,
    selectionDebug: debug,
  };

  try {
    localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(updatedState));
    window.dispatchEvent(new CustomEvent('cardex_daily_target_updated', { detail: updatedState }));
    console.log(`[Cardex Daily Target] Force set target brand to: ${brand.name} (${brand.rarityTier})`);
  } catch (e) {
    console.warn('Could not force target brand:', e);
  }
  return updatedState;
}

// Backward compatible alias
export const ownerSetTargetBrand = ownerForceTargetBrand;

export function ownerRerollTarget(forceTier?: BrandRarityTier): DailySpottingTargetState {
  const current = getDailyTargetState();

  // Record previous target in history before rerolling
  recordTargetHistoryEntry({
    brandId: current.targetBrand.id,
    brandName: current.targetBrand.name,
    country: current.targetBrand.country,
    rarityTier: current.targetBrand.rarityTier,
    rarityLabel: current.targetBrand.rarity,
    completed: current.completed,
    xpBounty: current.xpBounty,
    date: 'Rerolled',
  });

  const { brand: nextBrand, debug } = selectTargetBrand([current.targetBrand.id], forceTier);

  const nextBounty = getDailyTargetXpBounty(nextBrand.rarityTier);
  const nextBase = getTierBaseXp(nextBrand.rarityTier);

  const updatedState: DailySpottingTargetState = {
    ...current,
    targetBrand: nextBrand,
    completed: false,
    completedAt: undefined,
    xpBounty: nextBounty,
    baseXp: nextBase,
    selectionDebug: debug,
  };

  try {
    localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(updatedState));
    window.dispatchEvent(new CustomEvent('cardex_daily_target_updated', { detail: updatedState }));
    console.log(
      `[Cardex Daily Target] Rerolled target brand: ${nextBrand.name} (Tier: ${debug.chosenTier})`
    );
  } catch (e) {
    console.warn('Could not reroll target brand:', e);
  }
  return updatedState;
}

export const ownerRerollWeightedTarget = ownerRerollTarget;
export const ownerRerollTargetBrand = ownerRerollTarget;

export function ownerToggleSpotted(completed?: boolean): DailySpottingTargetState {
  const current = getDailyTargetState();
  const nextCompleted = completed !== undefined ? completed : !current.completed;

  const updatedState: DailySpottingTargetState = {
    ...current,
    completed: nextCompleted,
    completedAt: nextCompleted ? new Date().toISOString() : undefined,
  };

  try {
    localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(updatedState));
    window.dispatchEvent(new CustomEvent('cardex_daily_target_updated', { detail: updatedState }));
  } catch (e) {
    console.warn('Could not toggle spotted status:', e);
  }
  return updatedState;
}

export function ownerResetDailyTarget(): DailySpottingTargetState {
  // Reset completion status while keeping the active daily brand identical
  const current = getDailyTargetState();
  const refreshed: DailySpottingTargetState = {
    ...current,
    completed: false,
    completedAt: undefined,
  };
  try {
    localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(refreshed));
  } catch (e) {
    console.warn('Could not update daily target state:', e);
  }
  window.dispatchEvent(new CustomEvent('cardex_daily_target_updated', { detail: refreshed }));
  return refreshed;
}
