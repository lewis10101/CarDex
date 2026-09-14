import { CollectionCar, CarColorVariant, CarRarity, BrandInfo } from '../../types';
import { cleanToCoreModelName } from '../../utils/modelResolver';
import { findAccurateCarSpec } from './carSpecsDatabase';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Curated high quality automotive photography based on vehicle archetype
const ARCHETYPE_IMAGES = {
  supercar: [
    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80',
  ],
  sports: [
    'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80',
  ],
  luxury: [
    'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1508974239320-0a029497e820?w=800&auto=format&fit=crop&q=80',
  ],
  suv: [
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=800&auto=format&fit=crop&q=80',
  ],
  hatchback: [
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&auto=format&fit=crop&q=80',
  ],
  saloon: [
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80',
  ],
  classic: [
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=80',
  ],
  ev: [
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&auto=format&fit=crop&q=80',
  ],
};

function getArchetype(brandName: string, modelName: string): keyof typeof ARCHETYPE_IMAGES {
  const m = modelName.toLowerCase();
  const b = brandName.toLowerCase();

  if (m.includes('electric') || m.includes(' ev') || m.startsWith('i') || m.includes('taycan') || m.includes('ioniq') || m.includes('id.') || m.includes('eq') || m.includes('e-tron')) {
    return 'ev';
  }
  if (['ferrari', 'lamborghini', 'mclaren', 'bugatti', 'pagani', 'koenigsegg', 'rimac', 'zenvo', 'apollo'].includes(b) || m.includes('gt3') || m.includes('svj') || m.includes('chiron') || m.includes('valkyrie')) {
    return 'supercar';
  }
  if (m.includes('suv') || m.includes('cross') || m.includes('x5') || m.includes('x3') || m.includes('q7') || m.includes('q5') || m.includes('cayenne') || m.includes('macan') || m.includes('range rover') || m.includes('discovery') || m.includes('defender') || m.includes('sportage') || m.includes('tucson') || m.includes('qashqai') || m.includes('rav4') || m.includes('kuga')) {
    return 'suv';
  }
  if (m.includes('gt') || m.includes('rs') || m.includes('type r') || m.includes('gti') || m.includes('cupra') || m.includes('m3') || m.includes('m4') || m.includes('m5') || m.includes('amg') || m.includes('vantage') || m.includes('911') || m.includes('supra') || m.includes('mustang') || m.includes('corvette') || m.includes('spider') || m.includes('roadster')) {
    return 'sports';
  }
  if (['rolls-royce', 'bentley', 'maybach', 'aston martin'].includes(b) || m.includes('s-class') || m.includes('7 series') || m.includes('a8') || m.includes('panamera') || m.includes('flying spur') || m.includes('phantom')) {
    return 'luxury';
  }
  if (m.includes('fiesta') || m.includes('corsa') || m.includes('polo') || m.includes('clio') || m.includes('208') || m.includes('yaris') || m.includes('micra') || m.includes('ibiza') || m.includes('fabia') || m.includes('i20') || m.includes('rio') || m.includes('swift') || m.includes('up!') || m.includes('500') || m.includes('ka')) {
    return 'hatchback';
  }
  if (['austin', 'morris', 'triumph', 'hillman', 'rover', 'jensen', 'wolseley', 'riley', 'sunbeam', 'talbot', 'singer', 'reliant'].includes(b)) {
    return 'classic';
  }
  return 'saloon';
}

export function getRarity(brandName: string, modelName: string): CarRarity {
  const b = brandName.toLowerCase();
  const m = modelName.toLowerCase();

  // Check accurate DB first
  const dbSpec = findAccurateCarSpec(brandName, modelName);
  if (dbSpec?.rarity) {
    return dbSpec.rarity;
  }

  // Hypercars & boutique ultra exotics
  if (['bugatti', 'koenigsegg', 'pagani', 'rimac', 'zenvo', 'apollo', 'hispano-suiza', 'pininfarina', 'ssc', 'hennessey', 'gordon murray'].includes(b) || m.includes('laferrari') || m.includes('chiron') || m.includes('valkyrie') || m.includes('p1') || m.includes('senna') || m.includes('speedtail') || m.includes('918') || m.includes('carrera gt') || m.includes('tourbillon') || m.includes('jesko') || m.includes('nevera')) {
    return 'Legendary';
  }
  // Supercars & flagship exotics
  if (['ferrari', 'lamborghini', 'mclaren', 'rolls-royce'].includes(b) || m.includes('gt3 rs') || m.includes('gt2 rs') || m.includes('svj') || m.includes('black series') || m.includes('r8') || m.includes('amg gt') || m.includes('viper') || m.includes('mc20')) {
    return 'Epic';
  }
  // Performance sports / prestige / British heritage
  if (['aston martin', 'bentley', 'porsche', 'maserati', 'lotus', 'alpina', 'brabus', 'morgan', 'tvr', 'noble', 'wiesmann', 'alpine', 'ariel', 'bac', 'radical', 'caterham'].includes(b) || m.includes('gt3') || m.includes('gt4') || m.includes('m3') || m.includes('m4') || m.includes('m5') || m.includes('rs6') || m.includes('rs3') || m.includes('corvette') || m.includes('challenger')) {
    return 'Rare';
  }
  // Premium executive marques
  if (['bmw', 'mercedes-benz', 'audi', 'lexus', 'jaguar', 'land rover', 'range rover', 'volvo', 'alfa romeo', 'genesis', 'tesla', 'polestar', 'ds automobiles', 'cupra', 'jeep', 'subaru'].includes(b) || m.includes('focus rs') || m.includes('gr yaris') || m.includes('civic type r') || m.includes('golf r')) {
    return 'Uncommon';
  }
  // High-frequency mainstream models
  return 'Common';
}

function getPerformanceSpecs(brandName: string, modelName: string, rarity: CarRarity) {
  // 1. Check accurate DB first
  const dbSpec = findAccurateCarSpec(brandName, modelName);
  if (dbSpec) {
    return {
      horsepower: dbSpec.horsepower,
      topSpeed: dbSpec.topSpeed,
      zeroToSixty: dbSpec.zeroToSixty,
    };
  }

  // 2. Realistic base factory specs by rarity tier & vehicle archetype
  const archetype = getArchetype(brandName, modelName);

  if (rarity === 'Legendary') {
    return { horsepower: 1200, topSpeed: 250, zeroToSixty: 2.5 };
  }
  if (rarity === 'Epic') {
    return { horsepower: 650, topSpeed: 205, zeroToSixty: 3.1 };
  }
  if (rarity === 'Rare') {
    if (archetype === 'suv') return { horsepower: 450, topSpeed: 175, zeroToSixty: 4.5 };
    return { horsepower: 400, topSpeed: 180, zeroToSixty: 4.1 };
  }
  if (rarity === 'Uncommon') {
    if (archetype === 'suv') return { horsepower: 250, topSpeed: 135, zeroToSixty: 7.2 };
    if (archetype === 'ev') return { horsepower: 300, topSpeed: 125, zeroToSixty: 5.8 };
    return { horsepower: 200, topSpeed: 145, zeroToSixty: 7.4 };
  }

  // Common: everyday base road cars
  if (archetype === 'hatchback') {
    return { horsepower: 95, topSpeed: 114, zeroToSixty: 11.2 };
  }
  if (archetype === 'suv') {
    return { horsepower: 135, topSpeed: 119, zeroToSixty: 10.4 };
  }
  if (archetype === 'ev') {
    return { horsepower: 170, topSpeed: 99, zeroToSixty: 8.2 };
  }
  return { horsepower: 120, topSpeed: 122, zeroToSixty: 10.1 };
}

function getIntroducedYear(modelName: string, brandFounded: string): number {
  // 1. Check accurate DB first
  const dbSpec = findAccurateCarSpec('', modelName);
  if (dbSpec) {
    return dbSpec.introducedYear;
  }

  const m = modelName.toLowerCase();
  // Modern EVs
  if (m.includes('electric') || m.includes('ev') || m.includes('id.') || m.includes('eq') || m.includes('bzt') || m.includes('e-tron')) {
    return 2021;
  }
  // Iconic historical models
  if (m.includes('beetle') || m.includes('2cv') || m.includes('mini')) return 1959;
  if (m.includes('e-type') || m.includes('db5') || m.includes('cortina') || m.includes('mustang')) return 1964;
  if (m.includes('capri') || m.includes('escort') || m.includes('911')) return 1968;
  if (m.includes('golf') || m.includes('passat') || m.includes('civic') || m.includes('3 series')) return 1974;
  if (m.includes('fiesta') || m.includes('corsa') || m.includes('astra') || m.includes('micra')) return 1980;
  if (m.includes('clio') || m.includes('mondeo') || m.includes('a4') || m.includes('punto')) return 1994;
  if (m.includes('focus') || m.includes('yaris') || m.includes('fabia') || m.includes('leon')) return 1999;
  if (m.includes('qashqai') || m.includes('juke') || m.includes('i30') || m.includes('ceed')) return 2007;

  // Default to establishment year or realistic modern era
  const foundedYear = parseInt(brandFounded, 10) || 1995;
  return Math.max(foundedYear, 2014);
}

export function createBrandWithCars(
  brandMeta: { id: string; name: string; country: string; founded: string },
  existingCars: CollectionCar[],
  allModelNames: string[]
): BrandInfo {
  const cars: CollectionCar[] = [];
  const seenModelNames = new Set<string>();
  const seenIds = new Set<string>();

  // 1. Process and normalize existing hand-crafted cars with accurate base specs
  for (const car of existingCars) {
    const pureName = cleanToCoreModelName(car.name, brandMeta.name);
    if (seenModelNames.has(pureName.toLowerCase())) {
      continue;
    }
    seenModelNames.add(pureName.toLowerCase());
    seenIds.add(car.id);

    const dbSpec = findAccurateCarSpec(brandMeta.name, pureName);
    const finalRarity = dbSpec?.rarity || getRarity(brandMeta.name, pureName);
    const finalHp = dbSpec?.horsepower || car.horsepower;
    const finalTopSpeed = dbSpec?.topSpeed || car.topSpeed;
    const finalZeroToSixty = dbSpec?.zeroToSixty || car.zeroToSixty;
    const finalYear = dbSpec?.introducedYear || car.yearIntroduced || getIntroducedYear(pureName, brandMeta.founded);

    cars.push({
      ...car,
      name: pureName,
      rarity: finalRarity,
      horsepower: finalHp,
      topSpeed: finalTopSpeed,
      zeroToSixty: finalZeroToSixty,
      yearIntroduced: finalYear,
      // No predefined mock colors in catalog - user starts with single clean slot
      colorVariants: [],
    });
  }

  // 2. Add all remaining models for this brand with real base factory specs
  for (const modelName of allModelNames) {
    const pureModel = cleanToCoreModelName(modelName, brandMeta.name).trim();
    if (!pureModel || seenModelNames.has(pureModel.toLowerCase())) {
      continue;
    }
    seenModelNames.add(pureModel.toLowerCase());

    // Generate unique ID
    let baseId = `${brandMeta.id}-${slugify(pureModel)}`;
    let finalId = baseId;
    let counter = 2;
    while (seenIds.has(finalId)) {
      finalId = `${baseId}-${counter}`;
      counter++;
    }
    seenIds.add(finalId);

    const archetype = getArchetype(brandMeta.name, pureModel);
    const archetypeList = ARCHETYPE_IMAGES[archetype];
    const image = archetypeList[pureModel.length % archetypeList.length];

    const rarity = getRarity(brandMeta.name, pureModel);
    const specs = getPerformanceSpecs(brandMeta.name, pureModel, rarity);
    const year = getIntroducedYear(pureModel, brandMeta.founded);

    cars.push({
      id: finalId,
      name: pureModel,
      brand: brandMeta.name,
      country: brandMeta.country,
      yearIntroduced: year,
      rarity,
      horsepower: Math.round(specs.horsepower),
      topSpeed: Math.round(specs.topSpeed),
      zeroToSixty: Number(specs.zeroToSixty.toFixed(1)),
      image,
      // Single slot: no predefined colors
      colorVariants: [],
    });
  }

  return {
    ...brandMeta,
    cars,
  };
}

