/**
 * Text utility functions for accent-insensitive and case-insensitive search and matching.
 * Handles diacritics (e.g. Citroën -> citroen, Škoda -> skoda, Koenigsegg -> koenigsegg, etc.)
 */

export function normalizeSearchText(text: string | null | undefined): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function matchesSearchQuery(target: string | null | undefined, query: string | null | undefined): boolean {
  const normQuery = normalizeSearchText(query);
  if (!normQuery) return true;
  const normTarget = normalizeSearchText(target);
  if (!normTarget) return false;
  return normTarget.includes(normQuery);
}

/**
 * Robust search query matcher for cars across brand, model, full name, id, and tokenized keywords.
 * Fixes the issue where typing "Porsche 911" returned no results because "Porsche" wasn't in the model name
 * and "911" wasn't in the brand name.
 */
export function matchCarQuery(
  param1: any,
  param2?: any,
  param3?: any,
  param4?: any
): boolean {
  let rawQuery = '';
  let brand = '';
  let name = '';
  let model = '';
  let idStr = '';

  if (typeof param1 === 'string' && typeof param2 === 'string') {
    // Called as matchCarQuery(query, brand, name, id)
    rawQuery = param1;
    brand = normalizeSearchText(param2);
    name = normalizeSearchText(param3 || '');
    idStr = normalizeSearchText((param4 || '').replace(/[-_]/g, ' '));
  } else if (param1 && typeof param1 === 'object') {
    // Called as matchCarQuery(car, query)
    rawQuery = typeof param2 === 'string' ? param2 : '';
    brand = normalizeSearchText(param1.brand || param1.make || '');
    model = normalizeSearchText(param1.model || '');
    name = normalizeSearchText(param1.name || '');
    idStr = param1.id ? normalizeSearchText(param1.id.replace(/[-_]/g, ' ')) : '';
  } else {
    rawQuery = typeof param2 === 'string' ? param2 : typeof param1 === 'string' ? param1 : '';
  }

  if (!rawQuery || !rawQuery.trim()) return true;
  const q = normalizeSearchText(rawQuery).trim();
  if (!q) return true;

  // Combine all names: "porsche 911 gt3 rs"
  const fullName = `${brand} ${name} ${model}`.replace(/\s+/g, ' ').trim();

  // 1. Direct substring checks
  if (
    fullName.includes(q) ||
    name.includes(q) ||
    brand.includes(q) ||
    (model && model.includes(q)) ||
    (idStr && idStr.includes(q))
  ) {
    return true;
  }

  // 2. Tokenized multi-word matching
  // E.g., user types "porsche 911" -> tokens: ["porsche", "911"]
  // Every token must match somewhere in fullName or idStr
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length > 0) {
    const allTokensMatch = tokens.every(
      (token) => fullName.includes(token) || idStr.includes(token) || brand.includes(token) || name.includes(token)
    );
    if (allTokensMatch) return true;
  }

  return false;
}

