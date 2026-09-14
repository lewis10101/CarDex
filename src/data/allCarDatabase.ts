import { CarModelSuggestion } from './popularCarModels';
import { getUkRoadCarCatalogFlat } from './ukRoadCars';
import { resolveParentModel, cleanToCoreModelName } from '../utils/modelResolver';
import { isCustomCarTombstoned } from './userDataStorage';
import { normalizeSearchText } from '../utils/textUtils';

// Master Aggregation across all brands - Clean official production models only
export const COMPREHENSIVE_CAR_CATALOG: CarModelSuggestion[] = getUkRoadCarCatalogFlat();

const LOCAL_STORAGE_KEY = 'cardex_custom_community_cars';

export interface CustomCarRecord {
  id: string;
  fullName: string;
  make: string;
  model: string;
  category?: string;
  addedAt: string;
}

// Helper to get all custom cars stored locally, ignoring tombstoned entries
export function getLocalCustomCars(): CustomCarRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        let hasTombstoned = false;
        const valid = parsed.filter((c) => {
          if (!c || !c.fullName) return false;
          if (isCustomCarTombstoned(c.fullName, c.id)) {
            hasTombstoned = true;
            return false;
          }
          return true;
        });
        if (hasTombstoned) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(valid));
        }
        return valid;
      }
    }
  } catch (e) {
    console.warn('Could not read local custom cars:', e);
  }
  return [];
}

// Helper to delete a specific custom car locally
export function deleteLocalCustomCar(fullNameOrId: string) {
  try {
    const existing = getLocalCustomCars();
    const clean = fullNameOrId.toLowerCase().trim();
    const updated = existing.filter(
      (c) => c.id !== fullNameOrId && c.fullName.toLowerCase().trim() !== clean
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Could not delete local custom car:', e);
  }
}

// Helper to clear all custom cars stored locally
export function clearLocalCustomCars() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (e) {
    console.warn('Could not clear local custom cars:', e);
  }
}

// Helper to save a custom car locally
export function saveLocalCustomCar(car: CustomCarRecord) {
  try {
    const existing = getLocalCustomCars();
    if (!existing.some((c) => c.fullName.toLowerCase() === car.fullName.toLowerCase())) {
      existing.unshift(car);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
    }
  } catch (e) {
    console.warn('Could not save local custom car:', e);
  }
}

// Search all models: master catalog + custom cars
export function searchMasterCarCatalog(
  query: string,
  customCars: CustomCarRecord[] = [],
  limit = 10
): CarModelSuggestion[] {
  const clean = normalizeSearchText(query);
  if (!clean) return [];

  // Combine static catalog and custom community cars (avoiding duplicates)
  const seen = new Set<string>();
  const combined: CarModelSuggestion[] = [];

  // 1. Prioritize user custom cars first
  for (const c of customCars) {
    const key = normalizeSearchText(c.fullName);
    if (!seen.has(key)) {
      seen.add(key);
      combined.push({
        make: c.make || 'Custom',
        model: c.model || c.fullName,
        fullName: c.fullName,
        category: c.category || 'User Added',
      });
    }
  }

  // 2. Add full catalog
  for (const c of COMPREHENSIVE_CAR_CATALOG) {
    const key = normalizeSearchText(c.fullName);
    if (!seen.has(key)) {
      seen.add(key);
      combined.push(c);
    }
  }

  const strippedClean = clean.replace(/[\s\-_/.]/g, '');
  const resolved = resolveParentModel(query);
  const coreClean = normalizeSearchText(cleanToCoreModelName(query));
  const strippedCore = coreClean.replace(/[\s\-_/.]/g, '');

  const matches: { item: CarModelSuggestion; score: number }[] = [];

  for (const car of combined) {
    const fullNameLower = normalizeSearchText(car.fullName);
    const modelLower = normalizeSearchText(car.model);
    const makeLower = normalizeSearchText(car.make);
    const strippedFull = fullNameLower.replace(/[\s\-_/.]/g, '');

    let score = 0;

    // 1. Variant/Trim Resolution Match (100% parent model mapping)
    if (resolved) {
      const resolvedParentLower = normalizeSearchText(resolved.parentModel);
      const resolvedBrandLower = normalizeSearchText(resolved.brand || '');

      if (modelLower === resolvedParentLower) {
        if (resolvedBrandLower && makeLower === resolvedBrandLower) {
          score += 1000;
        } else if (!resolvedBrandLower) {
          score += 900;
        } else {
          score += 700;
        }
      }
    }

    // 2. Core Cleaned Query Match
    if (coreClean && coreClean !== clean) {
      if (modelLower === coreClean || fullNameLower === coreClean) {
        score += 850;
      } else if (modelLower.startsWith(coreClean) || fullNameLower.startsWith(coreClean)) {
        score += 650;
      } else if (strippedCore && strippedFull.includes(strippedCore)) {
        score += 500;
      }
    }

    // 3. Exact match on raw query
    if (fullNameLower === clean || modelLower === clean) {
      score += 300;
    }
    // Starts with exact query
    else if (fullNameLower.startsWith(clean) || modelLower.startsWith(clean)) {
      score += 200;
    }
    // Make starts with query (e.g. "por" -> Porsche, "ast" -> Aston Martin, "sko" -> Škoda)
    else if (makeLower.startsWith(clean)) {
      score += 150;
    }
    // Stripped prefix match (e.g. "911gt3" matches "911")
    else if (strippedFull.startsWith(strippedClean)) {
      score += 120;
    }
    // Word boundary match
    else if (fullNameLower.includes(` ${clean}`) || fullNameLower.includes(`${clean} `)) {
      score += 90;
    }
    // Substring match in full name or model
    else if (fullNameLower.includes(clean) || modelLower.includes(clean)) {
      score += 60;
    }
    // Stripped substring match
    else if (strippedFull.includes(strippedClean) && strippedClean.length >= 2) {
      score += 40;
    }

    if (score > 0) {
      matches.push({ item: car, score });
    }
  }

  matches.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.item.fullName.localeCompare(b.item.fullName);
  });

  return matches.slice(0, limit).map((m) => m.item);
}
