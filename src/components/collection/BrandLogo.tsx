import React, { useState, useEffect } from 'react';

interface BrandLogoProps {
  brand: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Comprehensive mapping of brand names & aliases to official car-logos-dataset slugs
// Comprehensive mapping of brand names & aliases to official car-logos-dataset slugs
const BRAND_SLUG_MAP: Record<string, string> = {
  // American
  'chrysler': 'chrysler',
  'dodge': 'dodge',
  'chevrolet': 'chevrolet',
  'chevy': 'chevrolet',
  'corvette': 'chevrolet-corvette',
  'cadillac': 'cadillac',
  'jeep': 'jeep',
  'pontiac': 'pontiac',
  'ford': 'ford',
  'lincoln': 'lincoln',
  'buick': 'buick',
  'gmc': 'gmc',
  'ram': 'ram',
  'tesla': 'tesla',
  'lucid': 'lucid',
  'rivian': 'rivian',
  'hummer': 'hummer',
  'plymouth': 'plymouth',
  'oldsmobile': 'oldsmobile',
  'mercury': 'mercury',
  'saturn': 'saturn',
  'delorean': 'dmc',
  'dmc': 'dmc',

  // German
  'porsche': 'porsche',
  'bmw': 'bmw',
  'mercedes-benz': 'mercedes-benz',
  'mercedes benz': 'mercedes-benz',
  'mercedes': 'mercedes-benz',
  'audi': 'audi',
  'volkswagen': 'volkswagen',
  'vw': 'volkswagen',
  'mini': 'mini',
  'smart': 'smart',
  'opel': 'opel',
  'alpina': 'alpina',
  'brabus': 'brabus',
  'maybach': 'maybach',
  'wiesmann': 'wiesmann',
  'ruf': 'ruf',
  'apollo': 'apollo',

  // Italian
  'ferrari': 'ferrari',
  'lamborghini': 'lamborghini',
  'maserati': 'maserati',
  'alfa romeo': 'alfa-romeo',
  'alfa-romeo': 'alfa-romeo',
  'fiat': 'fiat',
  'abarth': 'abarth',
  'lancia': 'lancia',
  'pagani': 'pagani',
  'de tomaso': 'de-tomaso',
  'de-tomaso': 'de-tomaso',
  'pininfarina': 'pininfarina',

  // British
  'aston martin': 'aston-martin',
  'aston-martin': 'aston-martin',
  'mclaren': 'mclaren',
  'bentley': 'bentley',
  'rolls-royce': 'rolls-royce',
  'rolls royce': 'rolls-royce',
  'jaguar': 'jaguar',
  'land rover': 'land-rover',
  'land-rover': 'land-rover',
  'range rover': 'land-rover',
  'range-rover': 'land-rover',
  'lotus': 'lotus',
  'vauxhall': 'vauxhall',
  'mg': 'mg',
  'rover': 'rover',
  'tvr': 'tvr',
  'caterham': 'caterham',
  'morgan': 'morgan',
  'austin': 'austin',
  'austin-healey': 'austin',
  'austin healey': 'austin',
  'morris': 'morris',
  'noble': 'noble',
  'ariel': 'ariel',
  'bac': 'bac',
  'triumph': 'triumph',
  'jensen': 'jensen',
  'levc': 'levc',
  'bristol': 'bristol',
  'bowler': 'bowler',
  'marcos': 'marcos',
  'radical': 'radical',
  'ginetta': 'ginetta',
  'westfield': 'westfield',
  'ultima': 'ultima',
  'riley': 'riley',
  'singer': 'singer',
  'leyland': 'leyland',
  'talbot': 'talbot',

  // Japanese
  'toyota': 'toyota',
  'honda': 'honda',
  'nissan': 'nissan',
  'mazda': 'mazda',
  'subaru': 'subaru',
  'lexus': 'lexus',
  'infiniti': 'infiniti',
  'acura': 'acura',
  'mitsubishi': 'mitsubishi',
  'suzuki': 'suzuki',
  'daihatsu': 'daihatsu',
  'isuzu': 'isuzu',
  'datsun': 'datsun',

  // French
  'alpine': 'alpine',
  'renault': 'renault',
  'peugeot': 'peugeot',
  'citroen': 'citroen',
  'citroën': 'citroen',
  'bugatti': 'bugatti',
  'ds': 'ds',
  'ds automobiles': 'ds',
  'ds-automobiles': 'ds',
  'aixam': 'aixam',
  'ligier': 'ligier',
  'venturi': 'venturi',

  // Korean
  'hyundai': 'hyundai',
  'kia': 'kia',
  'genesis': 'genesis',
  'ssangyong': 'ssangyong',
  'kgm': 'ssangyong',
  'daewoo': 'daewoo',

  // Other European
  'volvo': 'volvo',
  'polestar': 'polestar',
  'saab': 'saab',
  'koenigsegg': 'koenigsegg',
  'skoda': 'skoda',
  'škoda': 'skoda',
  'seat': 'seat',
  'cupra': 'cupra',
  'dacia': 'dacia',
  'rimac': 'rimac',
  'spyker': 'spyker',
  'zenvo': 'zenvo',
  'donkervoort': 'donkervoort',
  'ktm': 'ktm',
  'lada': 'lada',
  'hispano-suiza': 'hispano-suiza',
  'proton': 'proton',

  // Chinese & Global EV
  'byd': 'byd',
  'nio': 'nio',
  'xpeng': 'xpeng',
  'geely': 'geely',
  'chery': 'chery',
  'haval': 'haval',
  'great wall': 'great-wall',
  'great-wall': 'great-wall',
  'gwm ora': 'great-wall',
  'gwm': 'great-wall',
  'ora': 'great-wall',
  'hongqi': 'hongqi',
  'zeekr': 'zeekr',
  'lynk & co': 'lynk-and-co',
  'lynk-co': 'lynk-and-co',
  'lynk and co': 'lynk-and-co',
  'omoda': 'omoda',
  'jaecoo': 'omoda',
  'leapmotor': 'leapmotor',
  'maxus': 'maxus',
};

// Bespoke SVG marks for historical / niche marques not in the raw dataset
const BESPOKE_BRAND_EMBLEMS: Record<string, React.ReactNode> = {
  shelby: (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
      <circle cx="50" cy="50" r="46" fill="#09090B" stroke="#3B82F6" strokeWidth="4" />
      <circle cx="50" cy="50" r="39" stroke="#E4E4E7" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M50 18 C38 18 32 26 34 38 C35 44 40 48 44 50 C38 52 34 58 35 66 C36 76 46 82 50 82 C54 82 64 76 65 66 C66 58 62 52 56 50 C60 48 65 44 66 38 C68 26 62 18 50 18 Z" fill="#EF4444" />
      <circle cx="43" cy="30" r="3" fill="#FFFFFF" />
      <circle cx="57" cy="30" r="3" fill="#FFFFFF" />
      <path d="M47 38 L50 44 L53 38" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <text x="50" y="93" textAnchor="middle" fill="#E4E4E7" fontSize="10" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">SHELBY</text>
    </svg>
  ),
  reliant: (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
      <rect x="10" y="20" width="80" height="60" rx="12" fill="#991B1B" stroke="#E4E4E7" strokeWidth="3" />
      <path d="M25 32 L48 32 C58 32 64 38 64 46 C64 54 58 59 48 59 L38 59 L38 72 L25 72 Z M38 41 L38 50 L47 50 C51 50 53 48 53 45.5 C53 43 51 41 47 41 Z" fill="#FFFFFF" />
      <path d="M48 59 L66 72 L52 72 L38 61 Z" fill="#FBBF24" />
      <path d="M15 28 L30 28 M15 72 L30 72 M70 28 L85 28 M70 72 L85 72" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  wolseley: (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
      <ellipse cx="50" cy="50" rx="46" ry="34" fill="#0C4A6E" stroke="#E0F2FE" strokeWidth="4" />
      <ellipse cx="50" cy="50" rx="40" ry="28" stroke="#38BDF8" strokeWidth="2" opacity="0.8" />
      <path d="M26 36 L36 68 L44 44 L50 60 L56 44 L64 68 L74 36" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="3" fill="#38BDF8" />
      <text x="50" y="78" textAnchor="middle" fill="#BAE6FD" fontSize="8" fontWeight="800" letterSpacing="2">WOLSELEY</text>
    </svg>
  ),
  sunbeam: (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
      <circle cx="50" cy="50" r="46" fill="#1E3A8A" stroke="#F59E0B" strokeWidth="4" />
      {/* Radiant Sunburst */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="50"
          x2={50 + 38 * Math.cos((deg * Math.PI) / 180)}
          y2={50 + 38 * Math.sin((deg * Math.PI) / 180)}
          stroke="#FBBF24"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      <circle cx="50" cy="50" r="22" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="16" fill="#1E3A8A" />
      <text x="50" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">SUN</text>
    </svg>
  ),
  matra: (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
      <circle cx="50" cy="50" r="46" fill="#1E40AF" stroke="#E4E4E7" strokeWidth="3" />
      <circle cx="50" cy="50" r="36" fill="#FFFFFF" />
      <path d="M50 18 L76 74 L50 62 L24 74 Z" fill="#DC2626" stroke="#B91C1C" strokeWidth="2" />
      <path d="M50 32 L64 64 L50 56 L36 64 Z" fill="#1E40AF" />
      <text x="50" y="92" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900" letterSpacing="1.5">MATRA</text>
    </svg>
  ),
  microlino: (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs" fill="none">
      <rect x="10" y="14" width="80" height="72" rx="24" fill="#059669" stroke="#E4E4E7" strokeWidth="3" />
      <circle cx="50" cy="50" r="28" fill="#FFFFFF" />
      <path d="M34 60 L34 40 L44 54 L50 46 L56 54 L66 40 L66 60" stroke="#059669" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="22" r="3" fill="#DC2626" />
      <text x="50" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="800" letterSpacing="1">MICROLINO</text>
    </svg>
  ),
};

export function getOfficialLogoSlug(brand: string): string {
  if (!brand) return 'car';
  const clean = brand.toLowerCase().trim().replace(/_/g, ' ');
  if (BRAND_SLUG_MAP[clean]) {
    return BRAND_SLUG_MAP[clean];
  }
  // Try without hyphens or spaces
  const noHyphen = clean.replace(/-/g, ' ');
  if (BRAND_SLUG_MAP[noHyphen]) {
    return BRAND_SLUG_MAP[noHyphen];
  }
  // Standard slug format
  return clean.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function BrandLogo({ brand, className = '', size = 'md' }: BrandLogoProps) {
  const [loadState, setLoadState] = useState<'primary' | 'fallback' | 'failed'>('primary');

  // Reset load state when brand prop changes
  useEffect(() => {
    setLoadState('primary');
  }, [brand]);

  const dimensions = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14 sm:w-16 sm:h-16',
  }[size];

  const hasCustomDimension = className.includes('w-') || className.includes('h-');
  const sizeClass = hasCustomDimension ? '' : dimensions;

  const cleanBrand = (brand || '').toLowerCase().trim();
  const slug = getOfficialLogoSlug(brand);

  // Check bespoke vector mark first (zero network lag, perfectly authentic)
  if (BESPOKE_BRAND_EMBLEMS[cleanBrand] || BESPOKE_BRAND_EMBLEMS[slug]) {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 ${sizeClass} ${className}`}
        title={`${brand} official logo`}
      >
        {BESPOKE_BRAND_EMBLEMS[cleanBrand] || BESPOKE_BRAND_EMBLEMS[slug]}
      </div>
    );
  }

  const primaryUrl = `https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized/${slug}.png`;
  const fallbackUrl = `https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized/${slug}.png`;

  const handlePrimaryError = () => {
    setLoadState('fallback');
  };

  const handleFallbackError = () => {
    setLoadState('failed');
  };

  if (loadState === 'failed') {
    // Elegant stylized badge fallback
    const initials = (brand || 'CAR').slice(0, 2).toUpperCase();
    return (
      <div
        className={`flex items-center justify-center shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 font-bold text-zinc-800 dark:text-zinc-200 text-xs shadow-2xs ${sizeClass} ${className}`}
        title={`${brand} official badge`}
      >
        <span>{initials}</span>
      </div>
    );
  }

  const currentSrc = loadState === 'primary' ? primaryUrl : fallbackUrl;
  const currentOnError = loadState === 'primary' ? handlePrimaryError : handleFallbackError;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${sizeClass} ${className}`}
      title={`${brand} official logo`}
    >
      <img
        src={currentSrc}
        alt={`${brand} official logo`}
        className="w-full h-full object-contain filter drop-shadow-xs transition-opacity duration-200"
        loading="lazy"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onError={currentOnError}
      />
    </div>
  );
}
