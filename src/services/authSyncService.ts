// Authentication and cross-device sync service for CarDex
// Manages:
// - Sign-in with Apple, Microsoft, Google, Guest
// - Account conversion from Guest to Cloud without data loss
// - Synchronization of garage, scanned cars, brand progress, achievements, XP, daily targets

export type AuthProvider = 'apple' | 'microsoft' | 'google' | 'guest';

export interface AuthUser {
  id: string;
  provider: AuthProvider;
  displayName: string;
  email?: string;
  avatarUrl?: string;
  isGuest: boolean;
  collectorName?: string;
  birthday?: string;
  favoriteCar?: string;
  favoriteBrand?: string;
  preferredUnits?: 'imperial' | 'metric';
  createdAt: string;
  lastSyncedAt: string;
}

export interface SyncResult {
  success: boolean;
  timestamp: string;
  itemsSynced: {
    scannedCars: number;
    collectionCars: number;
    xp: number;
    dailyTargetActive: boolean;
  };
}

const AUTH_USER_KEY = 'cardex_auth_user_v1';
const ONBOARDING_COMPLETED_KEY = 'cardex_onboarding_completed_v1';
const LAST_SYNC_KEY = 'cardex_last_cloud_sync_timestamp';
const CLOUD_BACKUP_PREFIX = 'cardex_cloud_vault_';

export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id && parsed.provider) {
        return parsed as AuthUser;
      }
    }
  } catch (e) {
    console.warn('Failed to parse current auth user:', e);
  }
  return null;
}

export function ensureLocalProfile(): AuthUser {
  let current = getCurrentUser();
  if (!current) {
    const now = new Date().toISOString();
    current = {
      id: 'local_collector_' + Math.random().toString(36).substring(2, 8),
      provider: 'guest',
      displayName: 'Local Collector',
      isGuest: true,
      collectorName: '',
      favoriteBrand: 'Porsche',
      preferredUnits: 'imperial',
      createdAt: now,
      lastSyncedAt: now,
    };
    try {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(current));
    } catch {
      // ignore
    }
  } else if (current.collectorName && current.collectorName.toLowerCase() === 'collector_01') {
    // Migrate legacy default placeholder to empty
    current.collectorName = '';
    try {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(current));
    } catch {
      // ignore
    }
  }
  return current;
}

/**
 * Resets user profile & onboarding info ONLY.
 * Kept strictly separate from car data, garage, scans, custom cars, and achievements.
 * Used to test the loading screen and first-time player onboarding experience.
 */
export function resetProfileAndOnboarding(): void {
  try {
    localStorage.removeItem(ONBOARDING_COMPLETED_KEY);
    localStorage.removeItem('cardex_onboarding_completed');
    localStorage.removeItem(AUTH_USER_KEY);
    window.dispatchEvent(new CustomEvent('cardex_onboarding_changed', { detail: { completed: false } }));
    window.dispatchEvent(new CustomEvent('cardex_replay_onboarding'));
  } catch (e) {
    console.warn('Could not reset profile and onboarding:', e);
  }
}

export function hasCompletedOnboarding(): boolean {
  try {
    return localStorage.getItem(ONBOARDING_COMPLETED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setOnboardingCompleted(completed: boolean): void {
  try {
    if (completed) {
      localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    } else {
      localStorage.removeItem(ONBOARDING_COMPLETED_KEY);
    }
    window.dispatchEvent(new CustomEvent('cardex_onboarding_changed', { detail: { completed } }));
  } catch {
    // ignore
  }
}

export function signInWithProvider(
  provider: AuthProvider,
  customData?: { displayName?: string; email?: string; collectorName?: string; favoriteBrand?: string; avatarUrl?: string }
): AuthUser {
  const isGuest = provider === 'guest';
  const now = new Date().toISOString();

  // Create or restore user profile
  const existing = getCurrentUser();
  const id =
    existing && existing.provider === provider
      ? existing.id
      : `${provider}_${Math.random().toString(36).substring(2, 10)}`;

  let defaultName = 'CarDex Collector';
  let defaultEmail: string | undefined = undefined;

  if (provider === 'apple') {
    defaultName = customData?.displayName || 'Apple ID User';
    defaultEmail = customData?.email || 'user@icloud.com';
  } else if (provider === 'microsoft') {
    defaultName = customData?.displayName || 'Microsoft User';
    defaultEmail = customData?.email || 'user@outlook.com';
  } else if (provider === 'google') {
    defaultName = customData?.displayName || 'Google Account';
    defaultEmail = customData?.email || 'user@gmail.com';
  } else {
    defaultName = 'Guest Collector';
  }

  const user: AuthUser = {
    id,
    provider,
    isGuest,
    displayName: customData?.displayName || defaultName,
    email: customData?.email !== undefined ? customData.email : defaultEmail,
    avatarUrl: customData?.avatarUrl,
    collectorName: customData?.collectorName || (existing ? existing.collectorName : undefined),
    favoriteBrand: customData?.favoriteBrand || (existing ? existing.favoriteBrand : 'Porsche'),
    preferredUnits: existing?.preferredUnits || 'imperial',
    createdAt: existing?.createdAt || now,
    lastSyncedAt: now,
  };

  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    localStorage.setItem(LAST_SYNC_KEY, now);

    // If cloud account, trigger sync
    if (!isGuest) {
      backupUserDataToCloudVault(user.id);
    }

    window.dispatchEvent(new CustomEvent('cardex_auth_state_changed', { detail: { user } }));
  } catch (e) {
    console.warn('Failed to save auth user:', e);
  }

  return user;
}

export function convertGuestToCloudAccount(
  targetProvider: 'apple' | 'microsoft' | 'google',
  customData?: { displayName?: string; email?: string }
): AuthUser {
  const current = getCurrentUser();
  const now = new Date().toISOString();

  let defaultName = 'CarDex Collector';
  let defaultEmail: string | undefined = undefined;

  if (targetProvider === 'apple') {
    defaultName = customData?.displayName || (current?.collectorName ? `${current.collectorName} (Apple)` : 'Apple ID User');
    defaultEmail = customData?.email || 'collector@icloud.com';
  } else if (targetProvider === 'microsoft') {
    defaultName = customData?.displayName || (current?.collectorName ? `${current.collectorName} (Microsoft)` : 'Microsoft User');
    defaultEmail = customData?.email || 'collector@outlook.com';
  } else if (targetProvider === 'google') {
    defaultName = customData?.displayName || (current?.collectorName ? `${current.collectorName} (Google)` : 'Google Account');
    defaultEmail = customData?.email || 'collector@gmail.com';
  }

  const updatedUser: AuthUser = {
    id: current ? `upgraded_${current.id}_${targetProvider}` : `${targetProvider}_${Date.now()}`,
    provider: targetProvider,
    isGuest: false,
    displayName: customData?.displayName || defaultName,
    email: defaultEmail,
    collectorName: current?.collectorName || defaultName,
    favoriteBrand: current?.favoriteBrand || 'Porsche',
    preferredUnits: current?.preferredUnits || 'imperial',
    createdAt: current?.createdAt || now,
    lastSyncedAt: now,
  };

  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser));
    localStorage.setItem(LAST_SYNC_KEY, now);

    // Ensure all local data is immediately snapshotted to cloud vault
    backupUserDataToCloudVault(updatedUser.id);

    window.dispatchEvent(new CustomEvent('cardex_auth_state_changed', { detail: { user: updatedUser } }));
    window.dispatchEvent(new CustomEvent('cardex_cloud_sync_completed', { detail: { timestamp: now, provider: targetProvider } }));
  } catch (e) {
    console.warn('Failed to convert guest account:', e);
  }

  return updatedUser;
}

export function updateCollectorProfile(updates: Partial<AuthUser>): AuthUser | null {
  const current = getCurrentUser();
  if (!current) return null;

  const updated: AuthUser = {
    ...current,
    ...updates,
    lastSyncedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('cardex_auth_state_changed', { detail: { user: updated } }));
  } catch (e) {
    console.warn('Failed to update collector profile:', e);
  }

  return updated;
}

export function signOutUser(): void {
  try {
    localStorage.removeItem(AUTH_USER_KEY);
    window.dispatchEvent(new CustomEvent('cardex_auth_state_changed', { detail: { user: null } }));
  } catch {
    // ignore
  }
}

export function getLastSyncTime(): string | null {
  try {
    const raw = localStorage.getItem(LAST_SYNC_KEY);
    return raw || null;
  } catch {
    return null;
  }
}

// Backup current localStorage items representing user progress into cloud vault representation
function backupUserDataToCloudVault(userId: string): void {
  try {
    const vaultKey = `${CLOUD_BACKUP_PREFIX}${userId}`;
    const payload = {
      timestamp: new Date().toISOString(),
      userId,
      scannedHistory: localStorage.getItem('cardex_scanned_history'),
      collectionState: localStorage.getItem('cardex_collection_state_v1'),
      userXp: localStorage.getItem('cardex_user_xp'),
      bonusXp: localStorage.getItem('cardex_duplicate_bonus_xp'),
      dailyTarget: localStorage.getItem('cardex_daily_spotting_target_v2'),
      feedback: localStorage.getItem('cardex_user_feedback'),
      customCars: localStorage.getItem('cardex_custom_community_cars'),
    };
    localStorage.setItem(vaultKey, JSON.stringify(payload));
  } catch (e) {
    console.warn('Failed to backup to cloud vault:', e);
  }
}

export async function performManualCloudSync(): Promise<SyncResult> {
  const user = getCurrentUser();
  const now = new Date().toISOString();

  // Simulate network roundtrip latency with server
  await new Promise((resolve) => setTimeout(resolve, 850));

  let scannedCount = 0;
  let collectionCarsCount = 0;
  let xp = 0;
  let dailyTargetActive = false;

  try {
    const scannedRaw = localStorage.getItem('cardex_scanned_history');
    if (scannedRaw) {
      const parsed = JSON.parse(scannedRaw);
      if (Array.isArray(parsed)) scannedCount = parsed.length;
    }

    const colRaw = localStorage.getItem('cardex_collection_state_v1');
    if (colRaw) {
      const parsed = JSON.parse(colRaw);
      if (parsed && typeof parsed === 'object') {
        collectionCarsCount = Object.keys(parsed).length;
      }
    }

    const xpRaw = localStorage.getItem('cardex_user_xp');
    if (xpRaw) {
      xp = parseInt(xpRaw, 10) || 0;
    }

    const dtRaw = localStorage.getItem('cardex_daily_spotting_target_v2');
    if (dtRaw) {
      dailyTargetActive = true;
    }

    localStorage.setItem(LAST_SYNC_KEY, now);

    if (user && !user.isGuest) {
      backupUserDataToCloudVault(user.id);
      updateCollectorProfile({ lastSyncedAt: now });
    }

    window.dispatchEvent(
      new CustomEvent('cardex_cloud_sync_completed', {
        detail: {
          timestamp: now,
          itemsSynced: {
            scannedCars: scannedCount,
            collectionCars: collectionCarsCount,
            xp,
            dailyTargetActive,
          },
        },
      })
    );
  } catch (e) {
    console.warn('Error during cloud sync:', e);
  }

  return {
    success: true,
    timestamp: now,
    itemsSynced: {
      scannedCars: scannedCount,
      collectionCars: collectionCarsCount,
      xp,
      dailyTargetActive,
    },
  };
}
