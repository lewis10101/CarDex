import { BRANDS_CATALOG } from './collectionData';

// Complete Unified Registry of Real-World Car Brands and Models on UK Roads
// Fully synchronized 1:1 with the Collections Catalog across all brands and models
export const UK_ROAD_CARS_BY_BRAND: Record<string, string[]> = Object.fromEntries(
  BRANDS_CATALOG.map((brand) => [brand.name, brand.cars.map((car) => car.name)])
);

// Convert to standard CarModelSuggestion list for autocomplete search
export function getUkRoadCarCatalogFlat() {
  const list: { make: string; model: string; fullName: string; category: string }[] = [];
  for (const [brand, models] of Object.entries(UK_ROAD_CARS_BY_BRAND)) {
    for (const model of models) {
      list.push({
        make: brand,
        model,
        fullName: `${brand} ${model}`,
        category: 'UK Road Vehicle',
      });
    }
  }
  return list;
}
