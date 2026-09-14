// Utility for managing and clearing all user-added data:
// - Cars scanned (history)
// - Custom cars added to database
// - Edits/corrections to car names in database
// - Durable tombstone tracking to prevent deleted data from resurfacing

import { removeScanFromCollection } from './collectionData';

export const SCANNED_HISTORY_KEY = 'cardex_scanned_history';
export const CUSTOM_CARS_KEY = 'cardex_custom_community_cars';
export const USER_FEEDBACK_KEY = 'cardex_user_feedback';
export const TOMBSTONES_STORAGE_KEY = 'cardex_deleted_tombstones';
export const DUPLICATE_XP_KEY = 'cardex_duplicate_bonus_xp';

export function getDuplicateBonusXp(): number {
  try {
    const raw = localStorage.getItem(DUPLICATE_XP_KEY);
    if (raw) {
      const val = parseInt(raw, 10);
      if (!isNaN(val) && val > 0) return val;
    }
  } catch {
    // ignore
  }
  return 0;
}

export function addDuplicateBonusXp(amount: number): number {
  try {
    const current = getDuplicateBonusXp();
    const next = current + Math.max(0, amount);
    localStorage.setItem(DUPLICATE_XP_KEY, next.toString());
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cardex_xp_updated', { detail: { added: amount, totalBonus: next } }));
    }
    return next;
  } catch {
    return 0;
  }
}

export interface ScannedCarEntry {
  id: string;
  carName: string;
  make?: string;
  model?: string;
  yearRange?: string;
  scannedAt: string;
  imageThumbnail?: string;
  isCustomName?: boolean;
  isUnregistered?: boolean;
}

export interface CustomCarItem {
  id: string;
  fullName: string;
  make: string;
  model: string;
  category?: string;
  addedAt?: string;
  source?: string;
}

export interface CorrectionEntry {
  id: string;
  timestamp: string;
  aiIdentifiedFull: string;
  aiMake?: string;
  aiModel?: string;
  userAgreed: boolean;
  userCorrection?: string;
  scannedAt?: string;
}

export interface DeletedTombstones {
  customCars: string[]; // lowercase trimmed full names
  customCarIds: string[]; // IDs
  feedbackIds: string[]; // feedback entry IDs
  scannedCarIds: string[]; // scanned car IDs
}

// Read deleted tombstones to ensure deleted data is never resurrected
export function getDeletedTombstones(): DeletedTombstones {
  try {
    const raw = localStorage.getItem(TOMBSTONES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          customCars: Array.isArray(parsed.customCars) ? parsed.customCars : [],
          customCarIds: Array.isArray(parsed.customCarIds) ? parsed.customCarIds : [],
          feedbackIds: Array.isArray(parsed.feedbackIds) ? parsed.feedbackIds : [],
          scannedCarIds: Array.isArray(parsed.scannedCarIds) ? parsed.scannedCarIds : [],
        };
      }
    }
  } catch (e) {
    console.warn('Could not read tombstones:', e);
  }
  return { customCars: [], customCarIds: [], feedbackIds: [], scannedCarIds: [] };
}

export function saveDeletedTombstones(tombstones: DeletedTombstones): void {
  try {
    localStorage.setItem(TOMBSTONES_STORAGE_KEY, JSON.stringify(tombstones));
  } catch (e) {
    console.warn('Could not save tombstones:', e);
  }
}

export function addCustomCarTombstone(fullName?: string, id?: string): void {
  const current = getDeletedTombstones();
  let changed = false;
  if (fullName && fullName.trim()) {
    const clean = fullName.trim().toLowerCase();
    if (!current.customCars.includes(clean)) {
      current.customCars.push(clean);
      changed = true;
    }
  }
  if (id && id.trim()) {
    const cleanId = id.trim();
    if (!current.customCarIds.includes(cleanId)) {
      current.customCarIds.push(cleanId);
      changed = true;
    }
  }
  if (changed) saveDeletedTombstones(current);
}

export function removeCustomCarTombstone(fullName: string): void {
  const current = getDeletedTombstones();
  const clean = fullName.trim().toLowerCase();
  current.customCars = current.customCars.filter((c) => c !== clean);
  current.customCarIds = current.customCarIds.filter((id) => !id.includes(clean));
  saveDeletedTombstones(current);
}

export function isCustomCarTombstoned(fullName?: string, id?: string): boolean {
  const current = getDeletedTombstones();
  if (fullName) {
    const clean = fullName.trim().toLowerCase();
    if (current.customCars.includes(clean)) return true;
  }
  if (id) {
    const cleanId = id.trim();
    if (current.customCarIds.includes(cleanId)) return true;
    const stripped = cleanId.replace(/^(srv_|local_|car_)/, '');
    if (current.customCars.includes(stripped.toLowerCase())) return true;
  }
  return false;
}

// Get all scanned cars history (purging any tombstoned entries)
export function getScannedCarsHistory(): ScannedCarEntry[] {
  try {
    const raw = localStorage.getItem(SCANNED_HISTORY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const tombstones = getDeletedTombstones();
        return parsed.filter((c) => c && c.id && !tombstones.scannedCarIds.includes(c.id));
      }
    }
  } catch (e) {
    console.warn('Could not read scanned cars history:', e);
  }
  return [];
}

// Delete individual scanned car entry and remove it from collection if applicable
export function deleteScannedCar(id: string): ScannedCarEntry[] {
  try {
    const existing = getScannedCarsHistory();
    const itemToDelete = existing.find((c) => c.id === id);
    const updated = existing.filter((c) => c.id !== id);
    localStorage.setItem(SCANNED_HISTORY_KEY, JSON.stringify(updated));

    // Record tombstone
    const tombstones = getDeletedTombstones();
    if (!tombstones.scannedCarIds.includes(id)) {
      tombstones.scannedCarIds.push(id);
      saveDeletedTombstones(tombstones);
    }

    // Also remove from garage collection if applicable
    if (itemToDelete) {
      removeScanFromCollection(itemToDelete.make, itemToDelete.model);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
      window.dispatchEvent(new Event('cardex_data_cleared'));
    }
    return updated;
  } catch (e) {
    console.warn('Could not delete scanned car entry:', e);
    return getScannedCarsHistory();
  }
}

// Save a scanned car to history
export function saveScannedCar(car: {
  carName: string;
  make?: string;
  model?: string;
  yearRange?: string;
  imageThumbnail?: string;
}) {
  try {
    const existing = getScannedCarsHistory();
    const newEntry: ScannedCarEntry = {
      id: 'scan_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      carName: car.carName,
      make: car.make,
      model: car.model,
      yearRange: car.yearRange,
      scannedAt: new Date().toISOString(),
      imageThumbnail: car.imageThumbnail,
    };
    existing.unshift(newEntry);
    // Allow extensive car history (up to 1000 logged cars)
    const trimmed = existing.slice(0, 1000);
    // Try saving directly
    const tiers = [5, 1, 0];
    let saved = false;

    try {
      localStorage.setItem(SCANNED_HISTORY_KEY, JSON.stringify(trimmed));
      saved = true;
    } catch {
      // Progressively recover space by trimming thumbnails while preserving all car data
      for (const maxThumbs of tiers) {
        try {
          const pruned = trimmed.map((item, index) => {
            if (maxThumbs === 0 || index >= maxThumbs) {
              return { ...item, imageThumbnail: undefined };
            }
            return item;
          });
          localStorage.setItem(SCANNED_HISTORY_KEY, JSON.stringify(pruned));
          saved = true;
          break;
        } catch {
          // continue to stricter tier
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cardex_scanned_history_updated'));
    }
  } catch (e) {
    console.warn('Could not save scanned car:', e);
  }
}

// Update the latest scanned car entry with user's custom name
export function updateLatestScannedCarName(
  newName: string,
  make?: string,
  model?: string,
  isUnregistered: boolean = true
): void {
  try {
    const existing = getScannedCarsHistory();
    if (existing.length > 0) {
      existing[0] = {
        ...existing[0],
        carName: newName,
        make: make || existing[0].make,
        model: model || existing[0].model,
        isCustomName: true,
        isUnregistered,
      };
      localStorage.setItem(SCANNED_HISTORY_KEY, JSON.stringify(existing));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('cardex_scanned_history_updated'));
      }
    }
  } catch (e) {
    console.warn('Could not update latest scanned car name:', e);
  }
}

// Synchronous local custom cars getter
export function getLocalCustomCars(): CustomCarItem[] {
  try {
    const localRaw = localStorage.getItem(CUSTOM_CARS_KEY);
    if (localRaw) {
      const parsed = JSON.parse(localRaw);
      if (Array.isArray(parsed)) {
        return parsed
          .filter((c) => c && c.fullName && !isCustomCarTombstoned(c.fullName, c.id))
          .map((c) => ({
            id: c.id || 'local_' + c.fullName,
            fullName: c.fullName,
            make: c.make || '',
            model: c.model || '',
            category: c.category || 'User Added',
            addedAt: c.addedAt || new Date().toISOString(),
            source: c.source || 'user_manual',
          }));
      }
    }
  } catch (e) {
    console.warn('Could not read local custom cars:', e);
  }
  return [];
}

// Get custom cars list (combining server and local, strictly pruning tombstoned items)
export async function getCustomCarsList(): Promise<CustomCarItem[]> {
  const map = new Map<string, CustomCarItem>();

  // 1. Local custom cars
  try {
    const localRaw = localStorage.getItem(CUSTOM_CARS_KEY);
    if (localRaw) {
      const parsed = JSON.parse(localRaw);
      if (Array.isArray(parsed)) {
        let hasTombstoned = false;
        const cleanParsed = parsed.filter((c) => {
          if (!c || !c.fullName) return false;
          if (isCustomCarTombstoned(c.fullName, c.id)) {
            hasTombstoned = true;
            return false;
          }
          return true;
        });
        if (hasTombstoned) {
          localStorage.setItem(CUSTOM_CARS_KEY, JSON.stringify(cleanParsed));
        }
        cleanParsed.forEach((c) => {
          map.set(c.fullName.toLowerCase(), {
            id: c.id || 'local_' + c.fullName,
            fullName: c.fullName,
            make: c.make || '',
            model: c.model || '',
            category: c.category || 'User Added',
            addedAt: c.addedAt || new Date().toISOString(),
            source: c.source || 'user_manual',
          });
        });
      }
    }
  } catch (e) {
    console.warn('Could not read local custom cars:', e);
  }

  // 2. Server custom cars
  try {
    const res = await fetch('/api/custom-cars');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.cars)) {
        const tombstonedOnServer: string[] = [];
        data.cars.forEach((c: any) => {
          if (c && c.fullName) {
            if (isCustomCarTombstoned(c.fullName, c.id)) {
              tombstonedOnServer.push(c.fullName);
              return;
            }
            map.set(c.fullName.toLowerCase(), {
              id: c.id || 'srv_' + c.fullName,
              fullName: c.fullName,
              make: c.make || '',
              model: c.model || '',
              category: c.category || 'User Added',
              addedAt: c.addedAt || new Date().toISOString(),
              source: c.source || 'user_manual',
            });
          }
        });

        // If any tombstoned car was still reported by server, purge it asynchronously
        if (tombstonedOnServer.length > 0) {
          tombstonedOnServer.forEach((name) => {
            fetch(`/api/custom-cars/${encodeURIComponent(name)}`, { method: 'DELETE' }).catch(() => {});
          });
        }
      }
    }
  } catch (e) {
    console.warn('Could not fetch server custom cars:', e);
  }

  return Array.from(map.values()).sort((a, b) => {
    const timeA = a.addedAt ? new Date(a.addedAt).getTime() : 0;
    const timeB = b.addedAt ? new Date(b.addedAt).getTime() : 0;
    return timeB - timeA;
  });
}

// Delete individual custom car entry permanently
export async function deleteCustomCar(id: string, fullName?: string): Promise<boolean> {
  // 1. Add to permanent tombstones immediately so it can never resurrect
  addCustomCarTombstone(fullName, id);

  // 2. Remove from local storage keys
  try {
    const localRaw = localStorage.getItem(CUSTOM_CARS_KEY);
    if (localRaw) {
      const parsed = JSON.parse(localRaw);
      if (Array.isArray(parsed)) {
        const filtered = parsed.filter(
          (c) => c.id !== id && (!fullName || c.fullName?.toLowerCase() !== fullName.toLowerCase())
        );
        localStorage.setItem(CUSTOM_CARS_KEY, JSON.stringify(filtered));
      }
    }
  } catch (e) {
    console.warn('Could not remove from local storage:', e);
  }

  // Also remove from allCarDatabase key 'cardex_custom_community_cars'
  try {
    const raw = localStorage.getItem('cardex_custom_community_cars');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const filtered = parsed.filter(
          (c) => c.id !== id && (!fullName || c.fullName?.toLowerCase() !== fullName.toLowerCase())
        );
        localStorage.setItem('cardex_custom_community_cars', JSON.stringify(filtered));
      }
    }
  } catch (e) {
    console.warn('Could not remove from cardex_custom_community_cars:', e);
  }

  // 3. If there was an associated feedback correction with this car name, remove it locally too
  try {
    const fbRaw = localStorage.getItem(USER_FEEDBACK_KEY);
    if (fbRaw && fullName) {
      const parsed = JSON.parse(fbRaw);
      if (Array.isArray(parsed)) {
        const filtered = parsed.filter(
          (f) => f.userCorrection?.toLowerCase() !== fullName.toLowerCase()
        );
        localStorage.setItem(USER_FEEDBACK_KEY, JSON.stringify(filtered));
      }
    }
  } catch (e) {
    console.warn('Could not prune feedback for custom car:', e);
  }

  // 4. Remove from server store
  try {
    await fetch(`/api/custom-cars/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (fullName) {
      await fetch(`/api/custom-cars/${encodeURIComponent(fullName)}`, {
        method: 'DELETE',
      });
      // Also delete any feedback that had this correction
      await fetch(`/api/car-feedback/${encodeURIComponent(fullName)}`, {
        method: 'DELETE',
      });
    }
  } catch (e) {
    console.warn('Could not delete from server:', e);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cardex_data_cleared'));
  }
  return true;
}

// Get corrections list (filtering out any tombstoned entries)
export async function getCorrectionsList(): Promise<CorrectionEntry[]> {
  const tombstones = getDeletedTombstones();
  try {
    const res = await fetch('/api/car-feedback');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.corrections)) {
        return data.corrections.filter((c: CorrectionEntry) => {
          if (tombstones.feedbackIds.includes(c.id)) return false;
          if (c.userCorrection && tombstones.customCars.includes(c.userCorrection.trim().toLowerCase())) return false;
          return true;
        });
      }
    }
  } catch (e) {
    console.warn('Could not fetch corrections:', e);
  }

  // Fallback to local storage if any
  try {
    const raw = localStorage.getItem(USER_FEEDBACK_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed
          .filter((f) => !f.userAgreed && f.userCorrection)
          .filter((c: CorrectionEntry) => {
            if (tombstones.feedbackIds.includes(c.id)) return false;
            if (c.userCorrection && tombstones.customCars.includes(c.userCorrection.trim().toLowerCase())) return false;
            return true;
          });
      }
    }
  } catch {
    // ignore
  }

  return [];
}

// Delete individual correction entry permanently
export async function deleteCorrectionEntry(id: string, correctionName?: string): Promise<boolean> {
  // 1. Record tombstone
  const tombstones = getDeletedTombstones();
  if (!tombstones.feedbackIds.includes(id)) {
    tombstones.feedbackIds.push(id);
  }
  if (correctionName) {
    const cleanCorr = correctionName.trim().toLowerCase();
    if (!tombstones.customCars.includes(cleanCorr)) {
      tombstones.customCars.push(cleanCorr);
    }
  }
  saveDeletedTombstones(tombstones);

  // 2. Local delete from feedback
  try {
    const raw = localStorage.getItem(USER_FEEDBACK_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const filtered = parsed.filter(
          (f) => f.id !== id && (!correctionName || f.userCorrection?.toLowerCase() !== correctionName.toLowerCase())
        );
        localStorage.setItem(USER_FEEDBACK_KEY, JSON.stringify(filtered));
      }
    }
  } catch (e) {
    console.warn('Could not remove feedback from localStorage:', e);
  }

  // 3. If it created a custom car with correctionName, also remove that custom car!
  if (correctionName) {
    try {
      const customRaw = localStorage.getItem(CUSTOM_CARS_KEY);
      if (customRaw) {
        const parsed = JSON.parse(customRaw);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter(
            (c) => c.fullName?.toLowerCase() !== correctionName.toLowerCase()
          );
          localStorage.setItem(CUSTOM_CARS_KEY, JSON.stringify(filtered));
        }
      }
    } catch {
      // ignore
    }
  }

  // 4. Server delete
  try {
    await fetch(`/api/car-feedback/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (correctionName) {
      await fetch(`/api/custom-cars/${encodeURIComponent(correctionName)}`, {
        method: 'DELETE',
      });
      await fetch(`/api/car-feedback/${encodeURIComponent(correctionName)}`, {
        method: 'DELETE',
      });
    }
  } catch (e) {
    console.warn('Could not delete feedback from server:', e);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cardex_data_cleared'));
  }
  return true;
}

// Get combined user data summary
export async function getUserDataSummary(): Promise<{
  scannedCount: number;
  customCarsCount: number;
  correctionsCount: number;
  total: number;
}> {
  const scannedCount = getScannedCarsHistory().length;
  let customCarsCount = 0;
  let correctionsCount = 0;

  // Local custom cars (clean)
  try {
    const localCarsRaw = localStorage.getItem(CUSTOM_CARS_KEY);
    if (localCarsRaw) {
      const parsed = JSON.parse(localCarsRaw);
      if (Array.isArray(parsed)) {
        customCarsCount = parsed.filter((c) => c && !isCustomCarTombstoned(c.fullName, c.id)).length;
      }
    }
  } catch {
    // ignore
  }

  // Check server stats as well
  try {
    const res = await fetch('/api/user-data/stats');
    if (res.ok) {
      const data = await res.json();
      if (typeof data.customCarsCount === 'number') {
        customCarsCount = Math.max(customCarsCount, data.customCarsCount);
      }
      if (typeof data.correctionsCount === 'number') {
        correctionsCount = data.correctionsCount;
      }
    }
  } catch {
    // fallback to local stats
  }

  return {
    scannedCount,
    customCarsCount,
    correctionsCount,
    total: scannedCount + customCarsCount + correctionsCount,
  };
}

// Erase all user-added data permanently
export async function eraseAllUserData(): Promise<{ success: boolean; message: string }> {
  // 1. Wipe client-side storage completely
  try {
    localStorage.removeItem(SCANNED_HISTORY_KEY);
    localStorage.removeItem(CUSTOM_CARS_KEY);
    localStorage.removeItem(USER_FEEDBACK_KEY);
    localStorage.removeItem('cardex_custom_community_cars');
    localStorage.removeItem(TOMBSTONES_STORAGE_KEY);
    localStorage.removeItem(DUPLICATE_XP_KEY);
    localStorage.setItem('cardex_collection_v2_state', JSON.stringify({}));
    localStorage.setItem('cardex_collection_initialized_flag', 'true');
  } catch (e) {
    console.warn('Could not remove local storage keys:', e);
  }

  // 2. Wipe server-side stores and await completion
  try {
    const res = await fetch('/api/user-data', {
      method: 'DELETE',
    });
    if (!res.ok) {
      await fetch('/api/user-data/clear', { method: 'POST' });
    }
  } catch (e) {
    console.warn('Could not call server-side clear endpoint:', e);
  }

  // 3. Dispatch broadcast events so active screens reset immediately
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
    window.dispatchEvent(new Event('cardex_data_cleared'));
  }

  return {
    success: true,
    message: 'All scanned cars, custom cars, and database name edits have been permanently erased.',
  };
}

// Reset the entire game: Garage collection, scanned history, custom cars, edits, and daily targets
export async function resetWholeGame(): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Erase all scanned cars, custom cars, corrections, and database additions
    await eraseAllUserData();

    // 2. Wipe collection state completely
    localStorage.removeItem('cardex_collection_v2_state');
    localStorage.setItem('cardex_collection_v2_state', JSON.stringify({}));
    localStorage.setItem('cardex_collection_initialized_flag', 'true');

    // 3. Wipe daily target state
    localStorage.removeItem('cardex_daily_target_v1');

    // 4. Dispatch all events
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
      window.dispatchEvent(new Event('cardex_data_cleared'));
      window.dispatchEvent(new CustomEvent('cardex_reset_collection'));
      window.dispatchEvent(new CustomEvent('cardex_daily_target_updated'));
    }

    return {
      success: true,
      message: 'The entire game has been reset to brand new (0 cars, 0 scans, fresh daily target).',
    };
  } catch (err) {
    console.error('Failed to reset whole game:', err);
    return {
      success: false,
      message: 'Failed to reset whole game due to an unexpected error.',
    };
  }
}
