/**
 * Device detection utilities for CarDex.
 * Detects whether the current device is an Apple product (iPhone, iPad, Mac)
 * to determine whether native Sign in with Apple is supported.
 */

export function isAppleDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const ua = navigator.userAgent || navigator.vendor || '';
  const platform = navigator.platform || '';

  // 1. Explicit iOS checks (iPhone, iPad, iPod)
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  if (isIOS) return true;

  // 2. iPadOS (modern iPads on iOS 13+ report as MacIntel, but have multi-touch)
  const isIPadOS = platform === 'MacIntel' && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1;
  if (isIPadOS) return true;

  // 3. macOS desktop/laptop
  const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/i.test(platform) || /Mac OS X/i.test(ua);
  if (isMac) return true;

  return false;
}

/**
 * Returns true if specifically a mobile Apple device (iPhone or iPad).
 */
export function isAppleMobile(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';

  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isIPadOS = platform === 'MacIntel' && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1;

  return isIOS || isIPadOS;
}
