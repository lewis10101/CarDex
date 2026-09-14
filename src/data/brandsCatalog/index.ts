import { BrandInfo } from '../../types';
import { BRITISH_BRANDS } from './britishBrands';
import { GERMAN_BRANDS } from './germanBrands';
import { ITALIAN_BRANDS } from './italianBrands';
import { FRENCH_BRANDS } from './frenchBrands';
import { JAPANESE_BRANDS } from './japaneseBrands';
import { AMERICAN_BRANDS } from './americanBrands';
import { KOREAN_BRANDS } from './koreanBrands';
import { CHINESE_BRANDS } from './chineseBrands';
import { OTHER_EUROPEAN_BRANDS } from './otherEuropeanBrands';
import { INTERNATIONAL_BRANDS } from './internationalBrands';

// Combine all regional brand lists into a comprehensive automotive catalog
export const ALL_BRANDS_CATALOG: BrandInfo[] = [
  ...BRITISH_BRANDS,
  ...GERMAN_BRANDS,
  ...ITALIAN_BRANDS,
  ...FRENCH_BRANDS,
  ...JAPANESE_BRANDS,
  ...AMERICAN_BRANDS,
  ...KOREAN_BRANDS,
  ...CHINESE_BRANDS,
  ...OTHER_EUROPEAN_BRANDS,
  ...INTERNATIONAL_BRANDS,
];

// Quick map by ID or normalized name for fast lookups
export const BRANDS_BY_ID = new Map<string, BrandInfo>(
  ALL_BRANDS_CATALOG.map((brand) => [brand.id, brand])
);

export const BRANDS_BY_NAME = new Map<string, BrandInfo>(
  ALL_BRANDS_CATALOG.map((brand) => [brand.name.toLowerCase(), brand])
);

export {
  BRITISH_BRANDS,
  GERMAN_BRANDS,
  ITALIAN_BRANDS,
  FRENCH_BRANDS,
  JAPANESE_BRANDS,
  AMERICAN_BRANDS,
  KOREAN_BRANDS,
  CHINESE_BRANDS,
  OTHER_EUROPEAN_BRANDS,
  INTERNATIONAL_BRANDS,
};
