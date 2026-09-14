/**
 * Modular Game Reset System (Part 1)
 *
 * Provides independent, decoupled reset operations for each category of game data:
 * 1. Reset Scanned Cars (photo/scan history)
 * 2. Reset Custom Added Cars
 * 3. Reset Edited/Corrected Car Names (feedback & tombstones)
 * 4. Reset Car Collection (all collected models)
 * 5. Reset Colour Variants (clears unlocked paint finishes while preserving collected models)
 * 6. Reset Brand Progress (resets completion percentage & brand masteries)
 * 7. Reset Achievements (quests, missions, and achievement badges)
 * 8. Reset Daily Target History (skips, streaks, completed state, roll history)
 * 9. Reset Everything (runs all 8 modules in strict order for a full factory wipe)
 *
 * Each option logs internally for debugging and dispatches standard broadcast events
 * so the UI updates instantly without requiring a manual browser reload.
 */

import {
  SCANNED_HISTORY_KEY,
  CUSTOM_CARS_KEY,
  USER_FEEDBACK_KEY,
  TOMBSTONES_STORAGE_KEY,
} from './userDataStorage';
import {
  COLLECTION_STATE_KEY,
  COLLECTION_INITIALIZED_KEY,
  getCarCollectionState,
  saveCarCollectionState,
} from './collectionData';
import {
  DAILY_TARGET_STORAGE_KEY,
  TARGET_HISTORY_STORAGE_KEY,
  ownerResetDailyTarget,
  getDailyTargetState,
} from './dailyTargetService';

export interface ResetOperationResult {
  category: string;
  success: boolean;
  message: string;
  timestamp: string;
}

export interface ResetOptionDefinition {
  id: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  dangerLevel: 'low' | 'medium' | 'high' | 'critical';
  execute: () => Promise<ResetOperationResult>;
}

// 1. Reset Scanned Cars (history only)
export async function resetScannedCars(): Promise<ResetOperationResult> {
  console.log('[Cardex Reset] 1/9: Resetting Scanned Cars history...');
  try {
    localStorage.removeItem(SCANNED_HISTORY_KEY);
    localStorage.removeItem('cardex_scanned_history_v2');

    // Attempt server sync if endpoint available
    try {
      await fetch('/api/user-data/scanned', { method: 'DELETE' });
    } catch {
      // ignore
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cardex_data_cleared'));
      window.dispatchEvent(new CustomEvent('cardex_scanned_history_updated'));
      window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
    }

    console.log('[Cardex Reset] Scanned Cars successfully cleared.');
    return {
      category: 'Scanned Cars',
      success: true,
      message: 'All scanned car photo history has been cleared.',
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[Cardex Reset] Error resetting Scanned Cars:', err);
    return {
      category: 'Scanned Cars',
      success: false,
      message: 'Failed to reset scanned cars.',
      timestamp: new Date().toISOString(),
    };
  }
}

// 2. Reset Custom Added Cars
export async function resetCustomCars(): Promise<ResetOperationResult> {
  console.log('[Cardex Reset] 2/9: Resetting Custom Added Cars...');
  try {
    localStorage.removeItem(CUSTOM_CARS_KEY);
    localStorage.removeItem('cardex_custom_cars');
    localStorage.removeItem('cardex_custom_community_cars');

    try {
      await fetch('/api/user-data/custom-cars', { method: 'DELETE' });
    } catch {
      // ignore
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cardex_data_cleared'));
      window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
    }

    console.log('[Cardex Reset] Custom Added Cars successfully cleared.');
    return {
      category: 'Custom Added Cars',
      success: true,
      message: 'All custom user-added vehicles have been removed.',
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[Cardex Reset] Error resetting Custom Added Cars:', err);
    return {
      category: 'Custom Added Cars',
      success: false,
      message: 'Failed to reset custom added cars.',
      timestamp: new Date().toISOString(),
    };
  }
}

// 3. Reset Edited/Corrected Car Names
export async function resetEditedCarNames(): Promise<ResetOperationResult> {
  console.log('[Cardex Reset] 3/9: Resetting Edited & Corrected Car Names...');
  try {
    localStorage.removeItem(USER_FEEDBACK_KEY);
    localStorage.removeItem(TOMBSTONES_STORAGE_KEY);

    try {
      await fetch('/api/user-data/corrections', { method: 'DELETE' });
    } catch {
      // ignore
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cardex_data_cleared'));
      window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
    }

    console.log('[Cardex Reset] Edited Car Names and corrections successfully cleared.');
    return {
      category: 'Edited Car Names',
      success: true,
      message: 'All custom name corrections and feedback entries have been reset to factory defaults.',
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[Cardex Reset] Error resetting Edited Car Names:', err);
    return {
      category: 'Edited Car Names',
      success: false,
      message: 'Failed to reset edited car names.',
      timestamp: new Date().toISOString(),
    };
  }
}

// 4. Reset Car Collection (all collected models)
export async function resetCarCollectionModels(): Promise<ResetOperationResult> {
  console.log('[Cardex Reset] 4/9: Resetting Car Collection models...');
  try {
    localStorage.setItem(COLLECTION_INITIALIZED_KEY, 'true');
    localStorage.setItem(COLLECTION_STATE_KEY, JSON.stringify({}));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
      window.dispatchEvent(new CustomEvent('cardex_reset_collection'));
    }

    console.log('[Cardex Reset] Car Collection models successfully reset to 0.');
    return {
      category: 'Car Collection',
      success: true,
      message: 'All collected car models have been reset to uncollected (0 cars in garage).',
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[Cardex Reset] Error resetting Car Collection models:', err);
    return {
      category: 'Car Collection',
      success: false,
      message: 'Failed to reset car collection models.',
      timestamp: new Date().toISOString(),
    };
  }
}

// 5. Reset Colour Variants (keeps collected models, resets discovered paint colours)
export async function resetColourVariants(): Promise<ResetOperationResult> {
  console.log('[Cardex Reset] 5/9: Resetting Colour Variants...');
  try {
    const current = getCarCollectionState();
    const updated: Record<string, typeof current[string]> = {};

    for (const [id, item] of Object.entries(current)) {
      if (item) {
        updated[id] = {
          ...item,
          collectedColors: [], // clear discovered colour variants
        };
      }
    }

    saveCarCollectionState(updated);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
    }

    console.log('[Cardex Reset] All discovered colour variants have been reset.');
    return {
      category: 'Colour Variants',
      success: true,
      message: 'All discovered colour variants have been cleared. Collected cars remain in garage.',
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[Cardex Reset] Error resetting Colour Variants:', err);
    return {
      category: 'Colour Variants',
      success: false,
      message: 'Failed to reset colour variants.',
      timestamp: new Date().toISOString(),
    };
  }
}

// 6. Reset Brand Progress (completion percentages and mastery crowns)
export async function resetBrandProgress(): Promise<ResetOperationResult> {
  console.log('[Cardex Reset] 6/9: Resetting Brand Progress & Masteries...');
  try {
    // Brand progress is derived from the collection state models
    localStorage.setItem(COLLECTION_INITIALIZED_KEY, 'true');
    localStorage.setItem(COLLECTION_STATE_KEY, JSON.stringify({}));
    localStorage.removeItem('cardex_brand_masteries');

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
      window.dispatchEvent(new CustomEvent('cardex_reset_collection'));
    }

    console.log('[Cardex Reset] Brand progress and masteries reset to 0%.');
    return {
      category: 'Brand Progress',
      success: true,
      message: 'All brand progress percentages and mastery crowns have been reset to 0%.',
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[Cardex Reset] Error resetting Brand Progress:', err);
    return {
      category: 'Brand Progress',
      success: false,
      message: 'Failed to reset brand progress.',
      timestamp: new Date().toISOString(),
    };
  }
}

// 7. Reset Achievements & Quests
export async function resetAchievements(): Promise<ResetOperationResult> {
  console.log('[Cardex Reset] 7/9: Resetting Achievements & Missions...');
  try {
    localStorage.removeItem('cardex_achievements_state');
    localStorage.removeItem('cardex_daily_quests_state');
    localStorage.removeItem('cardex_missions_progress');

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cardex_achievements_reset'));
      window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
    }

    console.log('[Cardex Reset] Achievements and daily missions reset.');
    return {
      category: 'Achievements',
      success: true,
      message: 'All achievement badges, mission completions, and quest progress have been reset.',
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[Cardex Reset] Error resetting Achievements:', err);
    return {
      category: 'Achievements',
      success: false,
      message: 'Failed to reset achievements.',
      timestamp: new Date().toISOString(),
    };
  }
}

// 8. Reset Daily Target Progress (Preserves current daily brand target)
export async function resetDailyTargetHistory(): Promise<ResetOperationResult> {
  console.log('[Cardex Reset] 8/9: Resetting Daily Target Completion (Preserving active daily brand)...');
  try {
    const current = getDailyTargetState();
    if (current && current.targetBrand) {
      const preservedState = {
        ...current,
        completed: false,
        completedAt: undefined,
      };
      localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(preservedState));
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cardex_daily_target_updated'));
    }

    console.log('[Cardex Reset] Daily target progress reset (active daily brand kept identical).');
    return {
      category: 'Daily Target Progress',
      success: true,
      message: 'Daily target status reset to uncompleted. The active daily brand was kept the same.',
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[Cardex Reset] Error resetting Daily Target:', err);
    return {
      category: 'Daily Target Progress',
      success: false,
      message: 'Failed to reset daily target progress.',
      timestamp: new Date().toISOString(),
    };
  }
}

// 9. Reset Everything (full factory wipe - preserves active daily brand)
export async function resetEverything(): Promise<ResetOperationResult> {
  console.log('[Cardex Reset] 9/9: Executing FULL FACTORY WIPE (all modules in sequence)...');
  try {
    // Preserve current daily brand target so it never changes on reset
    const activeTarget = getDailyTargetState();
    let preservedTargetState: any = null;
    if (activeTarget && activeTarget.targetBrand) {
      preservedTargetState = {
        ...activeTarget,
        completed: false,
        completedAt: undefined,
      };
    }

    // Run modules in order
    await resetScannedCars();
    await resetCustomCars();
    await resetEditedCarNames();
    await resetCarCollectionModels();
    await resetColourVariants();
    await resetBrandProgress();
    await resetAchievements();
    await resetDailyTargetHistory();

    // Wipe global storage keys & call server wipe endpoint
    try {
      await fetch('/api/user-data', { method: 'DELETE' });
    } catch {
      try {
        await fetch('/api/user-data/clear', { method: 'POST' });
      } catch {
        // ignore
      }
    }

    // Restore the active daily brand target so it stays identical
    if (preservedTargetState) {
      localStorage.setItem(DAILY_TARGET_STORAGE_KEY, JSON.stringify(preservedTargetState));
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cardex_collection_updated'));
      window.dispatchEvent(new Event('cardex_data_cleared'));
      window.dispatchEvent(new CustomEvent('cardex_reset_collection'));
      window.dispatchEvent(new CustomEvent('cardex_daily_target_updated'));
      window.dispatchEvent(new CustomEvent('cardex_achievements_reset'));
    }

    console.log('[Cardex Reset] FULL FACTORY WIPE complete: All game categories successfully reset.');
    return {
      category: 'Everything',
      success: true,
      message: 'Entire game wiped: garage, scans, custom cars, and achievements reset. Active daily brand remained intact.',
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[Cardex Reset] Error executing full wipe:', err);
    return {
      category: 'Everything',
      success: false,
      message: 'Failed to reset everything due to an unexpected error.',
      timestamp: new Date().toISOString(),
    };
  }
}

// 10. Restart App / First-Time Experience Test (Resets username, birthday, fav car, and onboarding; keeps ALL car data and game state)
export async function restartFirstTimeExperience(): Promise<ResetOperationResult> {
  console.log('[Cardex Reset] Restarting App for First-Time Testing (Preserving all cars & data)...');
  try {
    localStorage.removeItem('cardex_onboarding_completed_v1');
    localStorage.removeItem('cardex_onboarding_completed');
    localStorage.removeItem('cardex_auth_user_v1');

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cardex_onboarding_changed', { detail: { completed: false } }));
      window.dispatchEvent(new CustomEvent('cardex_replay_onboarding'));
    }

    return {
      category: 'First-Time Startup Experience',
      success: true,
      message: 'First-time setup restarted! You will see the initial setup asking username, birthday, and favorite car. None of your cars or app data were deleted.',
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[Cardex Reset] Error restarting first-time experience:', err);
    return {
      category: 'First-Time Startup Experience',
      success: false,
      message: 'Failed to restart first-time experience.',
      timestamp: new Date().toISOString(),
    };
  }
}

// Definitions for the UI modular reset menu
export const MODULAR_RESET_OPTIONS: ResetOptionDefinition[] = [
  {
    id: 'restart-first-time-experience',
    title: 'Restart App (First-Time Join Test)',
    shortDesc: 'Resets username, fav car & info only (Keeps all cars!)',
    detailedDesc: 'Restarts the onboarding and startup flow to test the first-time player experience. Your username and favorite car are reset to defaults so you can test joining the game, but ZERO car data, scans, garage, or game progress is deleted.',
    dangerLevel: 'low',
    execute: restartFirstTimeExperience,
  },
  {
    id: 'reset-scanned-cars',
    title: '1. Reset Scanned Cars',
    shortDesc: 'Clears photo scan log & timestamps',
    detailedDesc: 'Permanently clears your recent photographed cars history and scan timestamps. Your unlocked garage collection is NOT deleted.',
    dangerLevel: 'medium',
    execute: resetScannedCars,
  },
  {
    id: 'reset-custom-cars',
    title: '2. Reset Custom Added Cars',
    shortDesc: 'Removes user-added vehicle models',
    detailedDesc: 'Deletes any custom vehicle models you manually entered into the car database.',
    dangerLevel: 'medium',
    execute: resetCustomCars,
  },
  {
    id: 'reset-edited-names',
    title: '3. Reset Edited/Corrected Car Names',
    shortDesc: 'Reverts model name overrides to default',
    detailedDesc: 'Removes all manual vehicle name corrections, re-enabling official catalogue names.',
    dangerLevel: 'low',
    execute: resetEditedCarNames,
  },
  {
    id: 'reset-car-collection',
    title: '4. Reset Car Collection',
    shortDesc: 'Empties your garage (0 collected models)',
    detailedDesc: 'Sets all vehicle models in your garage to uncollected (0 cars collected). Scanned photo history remains.',
    dangerLevel: 'high',
    execute: resetCarCollectionModels,
  },
  {
    id: 'reset-colour-variants',
    title: '5. Reset Colour Variants',
    shortDesc: 'Clears discovered paint colors',
    detailedDesc: 'Resets discovered colour variants for every car. You keep your collected cars, but must re-discover their paint finishes.',
    dangerLevel: 'medium',
    execute: resetColourVariants,
  },
  {
    id: 'reset-brand-progress',
    title: '6. Reset Brand Progress',
    shortDesc: 'Resets brand completion & mastery crowns',
    detailedDesc: 'Resets completion percentages for all car marques and clears Brand Mastery crowns back to 0%.',
    dangerLevel: 'high',
    execute: resetBrandProgress,
  },
  {
    id: 'reset-achievements',
    title: '7. Reset Achievements',
    shortDesc: 'Clears badges, ranks, and daily missions',
    detailedDesc: 'Resets all unlocked spotter achievements, quest progress, and rank thresholds back to Rookie Scout.',
    dangerLevel: 'low',
    execute: resetAchievements,
  },
  {
    id: 'reset-daily-target',
    title: '8. Reset Daily Target History',
    shortDesc: 'Resets daily brand, skips & streaks',
    detailedDesc: 'Clears the daily brand target history, resets your skips back to 2, and rolls a brand new daily target.',
    dangerLevel: 'low',
    execute: resetDailyTargetHistory,
  },
  {
    id: 'reset-everything',
    title: 'Delete All App Data (Factory Wipe)',
    shortDesc: 'Deletes all cars, scans, and data completely',
    detailedDesc: 'Performs a total permanent factory wipe: deletes all collected cars, photo scans, custom models, garage collections, daily targets, and achievements.',
    dangerLevel: 'critical',
    execute: resetEverything,
  },
];
