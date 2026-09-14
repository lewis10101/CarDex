import { CarRarity } from '../../types';

export interface BaseCarSpec {
  horsepower: number;
  topSpeed: number;
  zeroToSixty: number;
  introducedYear: number;
  rarity?: CarRarity;
}

/**
 * True OEM Base Factory Specifications & Accurate Introduction Years.
 * No modifications, no tuning packages, true base production factory specs.
 */
export const ACCURATE_CAR_SPECS_DB: Record<string, BaseCarSpec> = {
  // === FORD ===
  'fiesta': { horsepower: 100, topSpeed: 115, zeroToSixty: 9.8, introducedYear: 1976, rarity: 'Common' },
  'focus': { horsepower: 125, topSpeed: 124, zeroToSixty: 8.9, introducedYear: 1998, rarity: 'Common' },
  'puma': { horsepower: 125, topSpeed: 119, zeroToSixty: 9.8, introducedYear: 1997, rarity: 'Common' },
  'kuga': { horsepower: 150, topSpeed: 121, zeroToSixty: 9.7, introducedYear: 2008, rarity: 'Common' },
  'mondeo': { horsepower: 160, topSpeed: 134, zeroToSixty: 9.2, introducedYear: 1993, rarity: 'Common' },
  'ka': { horsepower: 69, topSpeed: 100, zeroToSixty: 13.1, introducedYear: 1996, rarity: 'Common' },
  'streetka': { horsepower: 95, topSpeed: 107, zeroToSixty: 12.1, introducedYear: 2003, rarity: 'Common' },
  'ecosport': { horsepower: 125, topSpeed: 112, zeroToSixty: 11.0, introducedYear: 2003, rarity: 'Common' },
  'edge': { horsepower: 238, topSpeed: 134, zeroToSixty: 9.6, introducedYear: 2006, rarity: 'Common' },
  'explorer': { horsepower: 300, topSpeed: 143, zeroToSixty: 6.0, introducedYear: 1990, rarity: 'Common' },
  'ranger': { horsepower: 170, topSpeed: 112, zeroToSixty: 11.3, introducedYear: 1982, rarity: 'Common' },
  'transit': { horsepower: 130, topSpeed: 95, zeroToSixty: 13.8, introducedYear: 1965, rarity: 'Common' },
  'galaxy': { horsepower: 150, topSpeed: 122, zeroToSixty: 10.9, introducedYear: 1995, rarity: 'Common' },
  's-max': { horsepower: 165, topSpeed: 127, zeroToSixty: 9.8, introducedYear: 2006, rarity: 'Common' },
  'c-max': { horsepower: 125, topSpeed: 116, zeroToSixty: 11.0, introducedYear: 2003, rarity: 'Common' },
  'b-max': { horsepower: 100, topSpeed: 109, zeroToSixty: 13.2, introducedYear: 2012, rarity: 'Common' },
  'mustang': { horsepower: 310, topSpeed: 155, zeroToSixty: 5.1, introducedYear: 1964, rarity: 'Common' },
  'mustang mach-e': { horsepower: 266, topSpeed: 111, zeroToSixty: 6.1, introducedYear: 2020, rarity: 'Uncommon' },
  'focus rs': { horsepower: 350, topSpeed: 165, zeroToSixty: 4.7, introducedYear: 2002, rarity: 'Uncommon' },
  'focus st': { horsepower: 280, topSpeed: 155, zeroToSixty: 5.7, introducedYear: 2005, rarity: 'Common' },
  'fiesta st': { horsepower: 200, topSpeed: 143, zeroToSixty: 6.5, introducedYear: 2004, rarity: 'Common' },
  'gt': { horsepower: 647, topSpeed: 216, zeroToSixty: 3.0, introducedYear: 2004, rarity: 'Legendary' },
  'gt40': { horsepower: 335, topSpeed: 164, zeroToSixty: 5.1, introducedYear: 1964, rarity: 'Legendary' },
  'escort': { horsepower: 75, topSpeed: 105, zeroToSixty: 12.0, introducedYear: 1968, rarity: 'Common' },
  'escort rs cosworth': { horsepower: 227, topSpeed: 144, zeroToSixty: 5.7, introducedYear: 1992, rarity: 'Rare' },
  'sierra': { horsepower: 105, topSpeed: 115, zeroToSixty: 10.4, introducedYear: 1982, rarity: 'Common' },
  'sierra rs cosworth': { horsepower: 204, topSpeed: 149, zeroToSixty: 6.2, introducedYear: 1986, rarity: 'Rare' },
  'cortina': { horsepower: 75, topSpeed: 98, zeroToSixty: 13.5, introducedYear: 1962, rarity: 'Common' },
  'capri': { horsepower: 138, topSpeed: 122, zeroToSixty: 8.3, introducedYear: 1969, rarity: 'Common' },
  'granada': { horsepower: 135, topSpeed: 112, zeroToSixty: 10.8, introducedYear: 1972, rarity: 'Common' },

  // === VAUXHALL ===
  'corsa': { horsepower: 75, topSpeed: 108, zeroToSixty: 12.4, introducedYear: 1982, rarity: 'Common' },
  'astra': { horsepower: 110, topSpeed: 124, zeroToSixty: 10.2, introducedYear: 1979, rarity: 'Common' },
  'mokka': { horsepower: 100, topSpeed: 117, zeroToSixty: 10.6, introducedYear: 2012, rarity: 'Common' },
  'crossland': { horsepower: 83, topSpeed: 106, zeroToSixty: 14.0, introducedYear: 2017, rarity: 'Common' },
  'grandland': { horsepower: 130, topSpeed: 122, zeroToSixty: 10.1, introducedYear: 2017, rarity: 'Common' },
  'insignia': { horsepower: 140, topSpeed: 127, zeroToSixty: 9.4, introducedYear: 2008, rarity: 'Common' },
  'zafira': { horsepower: 120, topSpeed: 119, zeroToSixty: 10.8, introducedYear: 1999, rarity: 'Common' },
  'adam': { horsepower: 70, topSpeed: 103, zeroToSixty: 14.9, introducedYear: 2012, rarity: 'Common' },
  'meriva': { horsepower: 100, topSpeed: 110, zeroToSixty: 13.9, introducedYear: 2003, rarity: 'Common' },
  'vectra': { horsepower: 122, topSpeed: 126, zeroToSixty: 10.2, introducedYear: 1995, rarity: 'Common' },
  'cavalier': { horsepower: 90, topSpeed: 112, zeroToSixty: 11.0, introducedYear: 1975, rarity: 'Common' },
  'calibra': { horsepower: 115, topSpeed: 127, zeroToSixty: 9.5, introducedYear: 1989, rarity: 'Common' },
  'viva': { horsepower: 75, topSpeed: 106, zeroToSixty: 13.1, introducedYear: 1963, rarity: 'Common' },
  'vx220': { horsepower: 145, topSpeed: 135, zeroToSixty: 5.6, introducedYear: 2000, rarity: 'Rare' },
  'monaro': { horsepower: 328, topSpeed: 160, zeroToSixty: 5.7, introducedYear: 2004, rarity: 'Rare' },
  'vxr8': { horsepower: 417, topSpeed: 155, zeroToSixty: 4.9, introducedYear: 2007, rarity: 'Rare' },

  // === VOLKSWAGEN ===
  'golf': { horsepower: 110, topSpeed: 126, zeroToSixty: 9.2, introducedYear: 1974, rarity: 'Common' },
  'golf gti': { horsepower: 242, topSpeed: 155, zeroToSixty: 6.2, introducedYear: 1976, rarity: 'Common' },
  'golf r': { horsepower: 315, topSpeed: 155, zeroToSixty: 4.5, introducedYear: 2002, rarity: 'Uncommon' },
  'polo': { horsepower: 95, topSpeed: 116, zeroToSixty: 10.8, introducedYear: 1975, rarity: 'Common' },
  'passat': { horsepower: 150, topSpeed: 135, zeroToSixty: 8.7, introducedYear: 1973, rarity: 'Common' },
  'tiguan': { horsepower: 150, topSpeed: 126, zeroToSixty: 9.2, introducedYear: 2007, rarity: 'Common' },
  't-roc': { horsepower: 110, topSpeed: 115, zeroToSixty: 10.8, introducedYear: 2017, rarity: 'Common' },
  't-cross': { horsepower: 95, topSpeed: 112, zeroToSixty: 11.5, introducedYear: 2018, rarity: 'Common' },
  'touareg': { horsepower: 282, topSpeed: 147, zeroToSixty: 6.1, introducedYear: 2002, rarity: 'Uncommon' },
  'arteon': { horsepower: 190, topSpeed: 148, zeroToSixty: 7.7, introducedYear: 2017, rarity: 'Uncommon' },
  'scirocco': { horsepower: 122, topSpeed: 124, zeroToSixty: 9.7, introducedYear: 1974, rarity: 'Common' },
  'beetle': { horsepower: 105, topSpeed: 112, zeroToSixty: 10.9, introducedYear: 1938, rarity: 'Common' },
  'up!': { horsepower: 60, topSpeed: 100, zeroToSixty: 14.4, introducedYear: 2011, rarity: 'Common' },
  'id.3': { horsepower: 204, topSpeed: 99, zeroToSixty: 7.3, introducedYear: 2020, rarity: 'Common' },
  'id.4': { horsepower: 204, topSpeed: 99, zeroToSixty: 8.5, introducedYear: 2020, rarity: 'Common' },
  'id.5': { horsepower: 204, topSpeed: 99, zeroToSixty: 8.4, introducedYear: 2021, rarity: 'Common' },
  'id. buzz': { horsepower: 204, topSpeed: 90, zeroToSixty: 10.2, introducedYear: 2022, rarity: 'Common' },
  'corrado': { horsepower: 136, topSpeed: 132, zeroToSixty: 8.6, introducedYear: 1988, rarity: 'Rare' },

  // === BMW ===
  '1 series': { horsepower: 136, topSpeed: 134, zeroToSixty: 8.5, introducedYear: 2004, rarity: 'Uncommon' },
  '2 series': { horsepower: 184, topSpeed: 147, zeroToSixty: 7.5, introducedYear: 2014, rarity: 'Uncommon' },
  '3 series': { horsepower: 184, topSpeed: 146, zeroToSixty: 7.1, introducedYear: 1975, rarity: 'Uncommon' },
  '4 series': { horsepower: 184, topSpeed: 149, zeroToSixty: 7.5, introducedYear: 2013, rarity: 'Uncommon' },
  '5 series': { horsepower: 184, topSpeed: 146, zeroToSixty: 7.8, introducedYear: 1972, rarity: 'Uncommon' },
  '6 series': { horsepower: 320, topSpeed: 155, zeroToSixty: 5.4, introducedYear: 1976, rarity: 'Uncommon' },
  '7 series': { horsepower: 286, topSpeed: 155, zeroToSixty: 6.1, introducedYear: 1977, rarity: 'Uncommon' },
  '8 series': { horsepower: 340, topSpeed: 155, zeroToSixty: 4.9, introducedYear: 1989, rarity: 'Uncommon' },
  'x1': { horsepower: 136, topSpeed: 129, zeroToSixty: 9.2, introducedYear: 2009, rarity: 'Uncommon' },
  'x2': { horsepower: 140, topSpeed: 127, zeroToSixty: 9.6, introducedYear: 2017, rarity: 'Uncommon' },
  'x3': { horsepower: 184, topSpeed: 134, zeroToSixty: 8.2, introducedYear: 2003, rarity: 'Uncommon' },
  'x4': { horsepower: 184, topSpeed: 134, zeroToSixty: 8.3, introducedYear: 2014, rarity: 'Uncommon' },
  'x5': { horsepower: 335, topSpeed: 151, zeroToSixty: 5.3, introducedYear: 1999, rarity: 'Uncommon' },
  'x6': { horsepower: 335, topSpeed: 155, zeroToSixty: 5.5, introducedYear: 2008, rarity: 'Uncommon' },
  'x7': { horsepower: 375, topSpeed: 155, zeroToSixty: 5.6, introducedYear: 2018, rarity: 'Uncommon' },
  'z3': { horsepower: 118, topSpeed: 122, zeroToSixty: 10.4, introducedYear: 1995, rarity: 'Uncommon' },
  'z4': { horsepower: 197, topSpeed: 149, zeroToSixty: 6.6, introducedYear: 2002, rarity: 'Uncommon' },
  'i3': { horsepower: 170, topSpeed: 93, zeroToSixty: 7.2, introducedYear: 2013, rarity: 'Uncommon' },
  'i4': { horsepower: 335, topSpeed: 118, zeroToSixty: 5.5, introducedYear: 2021, rarity: 'Uncommon' },
  'i8': { horsepower: 369, topSpeed: 155, zeroToSixty: 4.2, introducedYear: 2014, rarity: 'Rare' },
  'ix': { horsepower: 326, topSpeed: 124, zeroToSixty: 6.1, introducedYear: 2021, rarity: 'Uncommon' },
  'm2': { horsepower: 453, topSpeed: 155, zeroToSixty: 4.1, introducedYear: 2015, rarity: 'Rare' },
  'm3': { horsepower: 473, topSpeed: 155, zeroToSixty: 3.9, introducedYear: 1986, rarity: 'Rare' },
  'm4': { horsepower: 473, topSpeed: 155, zeroToSixty: 3.8, introducedYear: 2014, rarity: 'Rare' },
  'm5': { horsepower: 600, topSpeed: 155, zeroToSixty: 3.2, introducedYear: 1984, rarity: 'Rare' },
  'm8': { horsepower: 600, topSpeed: 155, zeroToSixty: 3.1, introducedYear: 2019, rarity: 'Rare' },

  // === AUDI ===
  'a1': { horsepower: 95, topSpeed: 119, zeroToSixty: 10.8, introducedYear: 2010, rarity: 'Uncommon' },
  'a3': { horsepower: 150, topSpeed: 140, zeroToSixty: 8.4, introducedYear: 1996, rarity: 'Uncommon' },
  'a4': { horsepower: 150, topSpeed: 139, zeroToSixty: 8.9, introducedYear: 1994, rarity: 'Uncommon' },
  'a5': { horsepower: 204, topSpeed: 150, zeroToSixty: 7.1, introducedYear: 2007, rarity: 'Uncommon' },
  'a6': { horsepower: 204, topSpeed: 153, zeroToSixty: 7.6, introducedYear: 1994, rarity: 'Uncommon' },
  'a7': { horsepower: 261, topSpeed: 155, zeroToSixty: 5.2, introducedYear: 2010, rarity: 'Uncommon' },
  'a8': { horsepower: 335, topSpeed: 155, zeroToSixty: 5.6, introducedYear: 1994, rarity: 'Uncommon' },
  'q2': { horsepower: 110, topSpeed: 122, zeroToSixty: 10.5, introducedYear: 2016, rarity: 'Uncommon' },
  'q3': { horsepower: 150, topSpeed: 127, zeroToSixty: 9.2, introducedYear: 2011, rarity: 'Uncommon' },
  'q5': { horsepower: 204, topSpeed: 138, zeroToSixty: 7.6, introducedYear: 2008, rarity: 'Uncommon' },
  'q7': { horsepower: 286, topSpeed: 150, zeroToSixty: 6.1, introducedYear: 2005, rarity: 'Uncommon' },
  'q8': { horsepower: 335, topSpeed: 155, zeroToSixty: 5.6, introducedYear: 2018, rarity: 'Uncommon' },
  'tt': { horsepower: 197, topSpeed: 153, zeroToSixty: 6.6, introducedYear: 1998, rarity: 'Uncommon' },
  'r8': { horsepower: 562, topSpeed: 201, zeroToSixty: 3.4, introducedYear: 2006, rarity: 'Epic' },
  'rs3': { horsepower: 401, topSpeed: 155, zeroToSixty: 3.6, introducedYear: 2011, rarity: 'Rare' },
  'rs4': { horsepower: 444, topSpeed: 155, zeroToSixty: 4.1, introducedYear: 2000, rarity: 'Rare' },
  'rs5': { horsepower: 444, topSpeed: 155, zeroToSixty: 3.9, introducedYear: 2010, rarity: 'Rare' },
  'rs6': { horsepower: 591, topSpeed: 155, zeroToSixty: 3.5, introducedYear: 2002, rarity: 'Rare' },
  'rs7': { horsepower: 591, topSpeed: 155, zeroToSixty: 3.5, introducedYear: 2013, rarity: 'Rare' },
  'e-tron': { horsepower: 355, topSpeed: 124, zeroToSixty: 5.5, introducedYear: 2018, rarity: 'Uncommon' },
  'e-tron gt': { horsepower: 469, topSpeed: 152, zeroToSixty: 3.9, introducedYear: 2021, rarity: 'Rare' },

  // === MERCEDES-BENZ ===
  'a-class': { horsepower: 136, topSpeed: 134, zeroToSixty: 8.8, introducedYear: 1997, rarity: 'Uncommon' },
  'b-class': { horsepower: 136, topSpeed: 132, zeroToSixty: 9.4, introducedYear: 2005, rarity: 'Uncommon' },
  'c-class': { horsepower: 204, topSpeed: 153, zeroToSixty: 7.3, introducedYear: 1993, rarity: 'Uncommon' },
  'e-class': { horsepower: 204, topSpeed: 149, zeroToSixty: 7.5, introducedYear: 1953, rarity: 'Uncommon' },
  's-class': { horsepower: 429, topSpeed: 155, zeroToSixty: 4.9, introducedYear: 1972, rarity: 'Uncommon' },
  'cla': { horsepower: 136, topSpeed: 134, zeroToSixty: 9.0, introducedYear: 2013, rarity: 'Uncommon' },
  'cls': { horsepower: 299, topSpeed: 155, zeroToSixty: 6.2, introducedYear: 2004, rarity: 'Uncommon' },
  'gla': { horsepower: 136, topSpeed: 124, zeroToSixty: 9.6, introducedYear: 2013, rarity: 'Uncommon' },
  'glb': { horsepower: 136, topSpeed: 122, zeroToSixty: 9.7, introducedYear: 2019, rarity: 'Uncommon' },
  'glc': { horsepower: 204, topSpeed: 137, zeroToSixty: 7.8, introducedYear: 2015, rarity: 'Uncommon' },
  'gle': { horsepower: 268, topSpeed: 140, zeroToSixty: 6.8, introducedYear: 1997, rarity: 'Uncommon' },
  'gls': { horsepower: 375, topSpeed: 155, zeroToSixty: 5.9, introducedYear: 2006, rarity: 'Uncommon' },
  'g-class': { horsepower: 416, topSpeed: 130, zeroToSixty: 5.6, introducedYear: 1979, rarity: 'Rare' },
  'sl': { horsepower: 375, topSpeed: 171, zeroToSixty: 4.7, introducedYear: 1954, rarity: 'Rare' },
  'slk': { horsepower: 163, topSpeed: 143, zeroToSixty: 7.9, introducedYear: 1996, rarity: 'Uncommon' },
  'slc': { horsepower: 156, topSpeed: 140, zeroToSixty: 8.1, introducedYear: 2016, rarity: 'Uncommon' },
  'amg gt': { horsepower: 469, topSpeed: 189, zeroToSixty: 3.9, introducedYear: 2014, rarity: 'Epic' },
  'amg c63': { horsepower: 469, topSpeed: 155, zeroToSixty: 4.0, introducedYear: 2008, rarity: 'Rare' },
  'amg e63': { horsepower: 563, topSpeed: 155, zeroToSixty: 3.4, introducedYear: 2006, rarity: 'Rare' },
  'slr mclaren': { horsepower: 617, topSpeed: 208, zeroToSixty: 3.6, introducedYear: 2003, rarity: 'Legendary' },
  'sls amg': { horsepower: 563, topSpeed: 197, zeroToSixty: 3.7, introducedYear: 2010, rarity: 'Epic' },

  // === PORSCHE ===
  '911': { horsepower: 379, topSpeed: 182, zeroToSixty: 4.0, introducedYear: 1963, rarity: 'Rare' },
  '911 carrera': { horsepower: 379, topSpeed: 182, zeroToSixty: 4.0, introducedYear: 1963, rarity: 'Rare' },
  '911 turbo': { horsepower: 572, topSpeed: 199, zeroToSixty: 2.7, introducedYear: 1975, rarity: 'Epic' },
  '911 gt3': { horsepower: 502, topSpeed: 198, zeroToSixty: 3.2, introducedYear: 1999, rarity: 'Epic' },
  '911 gt3 rs': { horsepower: 518, topSpeed: 184, zeroToSixty: 3.0, introducedYear: 2003, rarity: 'Legendary' },
  '911 gt2 rs': { horsepower: 690, topSpeed: 211, zeroToSixty: 2.7, introducedYear: 2010, rarity: 'Legendary' },
  '718 cayman': { horsepower: 300, topSpeed: 170, zeroToSixty: 4.9, introducedYear: 2005, rarity: 'Rare' },
  '718 boxster': { horsepower: 300, topSpeed: 170, zeroToSixty: 4.9, introducedYear: 1996, rarity: 'Rare' },
  'cayman': { horsepower: 300, topSpeed: 170, zeroToSixty: 4.9, introducedYear: 2005, rarity: 'Rare' },
  'boxster': { horsepower: 300, topSpeed: 170, zeroToSixty: 4.9, introducedYear: 1996, rarity: 'Rare' },
  'taycan': { horsepower: 402, topSpeed: 143, zeroToSixty: 5.1, introducedYear: 2019, rarity: 'Rare' },
  'panamera': { horsepower: 325, topSpeed: 168, zeroToSixty: 5.3, introducedYear: 2009, rarity: 'Rare' },
  'macan': { horsepower: 261, topSpeed: 144, zeroToSixty: 6.0, introducedYear: 2014, rarity: 'Rare' },
  'cayenne': { horsepower: 348, topSpeed: 154, zeroToSixty: 5.7, introducedYear: 2002, rarity: 'Rare' },
  'carrera gt': { horsepower: 605, topSpeed: 205, zeroToSixty: 3.5, introducedYear: 2003, rarity: 'Legendary' },
  '918 spyder': { horsepower: 875, topSpeed: 214, zeroToSixty: 2.5, introducedYear: 2013, rarity: 'Legendary' },
  '959': { horsepower: 444, topSpeed: 197, zeroToSixty: 3.6, introducedYear: 1986, rarity: 'Legendary' },

  // === TOYOTA ===
  'yaris': { horsepower: 114, topSpeed: 109, zeroToSixty: 9.7, introducedYear: 1999, rarity: 'Common' },
  'gr yaris': { horsepower: 257, topSpeed: 143, zeroToSixty: 5.2, introducedYear: 2020, rarity: 'Uncommon' },
  'corolla': { horsepower: 138, topSpeed: 112, zeroToSixty: 9.2, introducedYear: 1966, rarity: 'Common' },
  'gr corolla': { horsepower: 300, topSpeed: 143, zeroToSixty: 4.9, introducedYear: 2022, rarity: 'Uncommon' },
  'aygo': { horsepower: 71, topSpeed: 99, zeroToSixty: 13.8, introducedYear: 2005, rarity: 'Common' },
  'prius': { horsepower: 121, topSpeed: 112, zeroToSixty: 10.6, introducedYear: 1997, rarity: 'Common' },
  'c-hr': { horsepower: 138, topSpeed: 106, zeroToSixty: 10.2, introducedYear: 2016, rarity: 'Common' },
  'rav4': { horsepower: 215, topSpeed: 112, zeroToSixty: 8.1, introducedYear: 1994, rarity: 'Common' },
  'highlander': { horsepower: 244, topSpeed: 112, zeroToSixty: 8.3, introducedYear: 2000, rarity: 'Common' },
  'land cruiser': { horsepower: 201, topSpeed: 109, zeroToSixty: 9.9, introducedYear: 1951, rarity: 'Uncommon' },
  'hilux': { horsepower: 148, topSpeed: 106, zeroToSixty: 12.8, introducedYear: 1968, rarity: 'Common' },
  'supra': { horsepower: 255, topSpeed: 155, zeroToSixty: 5.0, introducedYear: 1978, rarity: 'Rare' },
  'gr supra': { horsepower: 335, topSpeed: 155, zeroToSixty: 4.1, introducedYear: 2019, rarity: 'Rare' },
  'gt86': { horsepower: 197, topSpeed: 140, zeroToSixty: 7.6, introducedYear: 2012, rarity: 'Common' },
  'gr86': { horsepower: 228, topSpeed: 140, zeroToSixty: 6.3, introducedYear: 2021, rarity: 'Common' },
  'mr2': { horsepower: 138, topSpeed: 130, zeroToSixty: 7.9, introducedYear: 1984, rarity: 'Common' },
  'celica': { horsepower: 140, topSpeed: 127, zeroToSixty: 8.7, introducedYear: 1970, rarity: 'Common' },

  // === NISSAN ===
  'qashqai': { horsepower: 138, topSpeed: 122, zeroToSixty: 9.5, introducedYear: 2006, rarity: 'Common' },
  'juke': { horsepower: 112, topSpeed: 112, zeroToSixty: 10.4, introducedYear: 2010, rarity: 'Common' },
  'micra': { horsepower: 92, topSpeed: 111, zeroToSixty: 11.8, introducedYear: 1982, rarity: 'Common' },
  'leaf': { horsepower: 148, topSpeed: 89, zeroToSixty: 7.9, introducedYear: 2010, rarity: 'Common' },
  'ariya': { horsepower: 214, topSpeed: 99, zeroToSixty: 7.5, introducedYear: 2020, rarity: 'Common' },
  'x-trail': { horsepower: 161, topSpeed: 124, zeroToSixty: 9.6, introducedYear: 2000, rarity: 'Common' },
  'gt-r': { horsepower: 565, topSpeed: 196, zeroToSixty: 2.9, introducedYear: 2007, rarity: 'Epic' },
  'skyline': { horsepower: 276, topSpeed: 155, zeroToSixty: 5.2, introducedYear: 1957, rarity: 'Rare' },
  '350z': { horsepower: 287, topSpeed: 155, zeroToSixty: 5.8, introducedYear: 2002, rarity: 'Common' },
  '370z': { horsepower: 328, topSpeed: 155, zeroToSixty: 5.1, introducedYear: 2008, rarity: 'Common' },

  // === HONDA ===
  'civic': { horsepower: 180, topSpeed: 112, zeroToSixty: 7.8, introducedYear: 1972, rarity: 'Common' },
  'civic type r': { horsepower: 315, topSpeed: 171, zeroToSixty: 5.3, introducedYear: 1997, rarity: 'Uncommon' },
  'jazz': { horsepower: 107, topSpeed: 109, zeroToSixty: 9.4, introducedYear: 2001, rarity: 'Common' },
  'hr-v': { horsepower: 129, topSpeed: 106, zeroToSixty: 10.6, introducedYear: 1998, rarity: 'Common' },
  'cr-v': { horsepower: 181, topSpeed: 116, zeroToSixty: 8.6, introducedYear: 1995, rarity: 'Common' },
  'accord': { horsepower: 192, topSpeed: 125, zeroToSixty: 7.2, introducedYear: 1976, rarity: 'Common' },
  's2000': { horsepower: 237, topSpeed: 150, zeroToSixty: 6.0, introducedYear: 1999, rarity: 'Rare' },
  'nsx': { horsepower: 573, topSpeed: 191, zeroToSixty: 2.9, introducedYear: 1990, rarity: 'Epic' },
  'integra': { horsepower: 197, topSpeed: 145, zeroToSixty: 6.2, introducedYear: 1985, rarity: 'Common' },

  // === HYUNDAI ===
  'i10': { horsepower: 66, topSpeed: 97, zeroToSixty: 14.6, introducedYear: 2007, rarity: 'Common' },
  'i20': { horsepower: 99, topSpeed: 117, zeroToSixty: 10.4, introducedYear: 2008, rarity: 'Common' },
  'i20 n': { horsepower: 201, topSpeed: 143, zeroToSixty: 6.2, introducedYear: 2021, rarity: 'Common' },
  'i30': { horsepower: 118, topSpeed: 122, zeroToSixty: 10.2, introducedYear: 2007, rarity: 'Common' },
  'i30 n': { horsepower: 276, topSpeed: 155, zeroToSixty: 5.4, introducedYear: 2017, rarity: 'Common' },
  'tucson': { horsepower: 148, topSpeed: 117, zeroToSixty: 9.6, introducedYear: 2004, rarity: 'Common' },
  'kona': { horsepower: 118, topSpeed: 112, zeroToSixty: 11.5, introducedYear: 2017, rarity: 'Common' },
  'santa fe': { horsepower: 227, topSpeed: 116, zeroToSixty: 8.9, introducedYear: 2000, rarity: 'Common' },
  'ioniq 5': { horsepower: 168, topSpeed: 115, zeroToSixty: 8.5, introducedYear: 2021, rarity: 'Common' },
  'ioniq 6': { horsepower: 225, topSpeed: 115, zeroToSixty: 7.4, introducedYear: 2022, rarity: 'Common' },

  // === KIA ===
  'picanto': { horsepower: 66, topSpeed: 100, zeroToSixty: 14.1, introducedYear: 2004, rarity: 'Common' },
  'rio': { horsepower: 83, topSpeed: 108, zeroToSixty: 12.2, introducedYear: 1999, rarity: 'Common' },
  'ceed': { horsepower: 118, topSpeed: 118, zeroToSixty: 10.7, introducedYear: 2006, rarity: 'Common' },
  'sportage': { horsepower: 148, topSpeed: 113, zeroToSixty: 9.9, introducedYear: 1993, rarity: 'Common' },
  'sorento': { horsepower: 226, topSpeed: 119, zeroToSixty: 8.6, introducedYear: 2002, rarity: 'Common' },
  'niro': { horsepower: 139, topSpeed: 103, zeroToSixty: 10.4, introducedYear: 2016, rarity: 'Common' },
  'ev6': { horsepower: 226, topSpeed: 115, zeroToSixty: 7.3, introducedYear: 2021, rarity: 'Common' },
  'ev9': { horsepower: 215, topSpeed: 115, zeroToSixty: 9.4, introducedYear: 2023, rarity: 'Uncommon' },
  'stinger': { horsepower: 365, topSpeed: 168, zeroToSixty: 4.7, introducedYear: 2017, rarity: 'Uncommon' },

  // === LAND ROVER ===
  'defender': { horsepower: 296, topSpeed: 119, zeroToSixty: 7.1, introducedYear: 1983, rarity: 'Uncommon' },
  'discovery': { horsepower: 296, topSpeed: 130, zeroToSixty: 7.3, introducedYear: 1989, rarity: 'Uncommon' },
  'discovery sport': { horsepower: 197, topSpeed: 129, zeroToSixty: 8.6, introducedYear: 2014, rarity: 'Uncommon' },
  'range rover': { horsepower: 395, topSpeed: 150, zeroToSixty: 5.5, introducedYear: 1970, rarity: 'Uncommon' },
  'range rover sport': { horsepower: 355, topSpeed: 140, zeroToSixty: 5.7, introducedYear: 2005, rarity: 'Uncommon' },
  'range rover evoque': { horsepower: 197, topSpeed: 134, zeroToSixty: 8.0, introducedYear: 2011, rarity: 'Uncommon' },
  'range rover velar': { horsepower: 247, topSpeed: 135, zeroToSixty: 7.1, introducedYear: 2017, rarity: 'Uncommon' },
  'freelander': { horsepower: 150, topSpeed: 112, zeroToSixty: 10.5, introducedYear: 1997, rarity: 'Uncommon' },

  // === JAGUAR ===
  'f-pace': { horsepower: 247, topSpeed: 135, zeroToSixty: 6.9, introducedYear: 2016, rarity: 'Uncommon' },
  'e-pace': { horsepower: 197, topSpeed: 134, zeroToSixty: 8.0, introducedYear: 2017, rarity: 'Uncommon' },
  'i-pace': { horsepower: 394, topSpeed: 124, zeroToSixty: 4.5, introducedYear: 2018, rarity: 'Uncommon' },
  'xe': { horsepower: 247, topSpeed: 155, zeroToSixty: 6.2, introducedYear: 2015, rarity: 'Uncommon' },
  'xf': { horsepower: 247, topSpeed: 155, zeroToSixty: 6.5, introducedYear: 2007, rarity: 'Uncommon' },
  'xj': { horsepower: 300, topSpeed: 155, zeroToSixty: 5.9, introducedYear: 1968, rarity: 'Uncommon' },
  'f-type': { horsepower: 296, topSpeed: 155, zeroToSixty: 5.4, introducedYear: 2013, rarity: 'Rare' },
  'xk': { horsepower: 290, topSpeed: 155, zeroToSixty: 6.7, introducedYear: 1996, rarity: 'Rare' },
  'e-type': { horsepower: 265, topSpeed: 150, zeroToSixty: 6.9, introducedYear: 1961, rarity: 'Rare' },
  'xjs': { horsepower: 221, topSpeed: 143, zeroToSixty: 7.6, introducedYear: 1975, rarity: 'Rare' },
  'xj220': { horsepower: 542, topSpeed: 217, zeroToSixty: 3.6, introducedYear: 1992, rarity: 'Legendary' },

  // === MINI ===
  'mini': { horsepower: 134, topSpeed: 130, zeroToSixty: 7.9, introducedYear: 1959, rarity: 'Common' },
  'mini cooper': { horsepower: 134, topSpeed: 130, zeroToSixty: 7.9, introducedYear: 1959, rarity: 'Common' },
  'cooper': { horsepower: 134, topSpeed: 130, zeroToSixty: 7.9, introducedYear: 1959, rarity: 'Common' },
  'cooper s': { horsepower: 189, topSpeed: 146, zeroToSixty: 6.5, introducedYear: 1963, rarity: 'Common' },
  'countryman': { horsepower: 134, topSpeed: 127, zeroToSixty: 9.3, introducedYear: 2010, rarity: 'Common' },
  'clubman': { horsepower: 134, topSpeed: 128, zeroToSixty: 8.9, introducedYear: 1969, rarity: 'Common' },
  'paceman': { horsepower: 120, topSpeed: 119, zeroToSixty: 10.4, introducedYear: 2012, rarity: 'Common' },

  // === RENAULT ===
  'clio': { horsepower: 90, topSpeed: 112, zeroToSixty: 12.2, introducedYear: 1990, rarity: 'Common' },
  'megane': { horsepower: 140, topSpeed: 127, zeroToSixty: 9.4, introducedYear: 1995, rarity: 'Common' },
  'captur': { horsepower: 90, topSpeed: 104, zeroToSixty: 13.0, introducedYear: 2013, rarity: 'Common' },
  'kadjar': { horsepower: 140, topSpeed: 124, zeroToSixty: 10.4, introducedYear: 2015, rarity: 'Common' },
  'austral': { horsepower: 197, topSpeed: 109, zeroToSixty: 8.4, introducedYear: 2022, rarity: 'Common' },
  'zoe': { horsepower: 107, topSpeed: 84, zeroToSixty: 11.4, introducedYear: 2012, rarity: 'Common' },
  'twingo': { horsepower: 65, topSpeed: 98, zeroToSixty: 15.1, introducedYear: 1992, rarity: 'Common' },
  'scenic': { horsepower: 140, topSpeed: 121, zeroToSixty: 10.4, introducedYear: 1996, rarity: 'Common' },

  // === PEUGEOT ===
  '208': { horsepower: 75, topSpeed: 102, zeroToSixty: 13.2, introducedYear: 2012, rarity: 'Common' },
  '308': { horsepower: 130, topSpeed: 130, zeroToSixty: 9.6, introducedYear: 2007, rarity: 'Common' },
  '508': { horsepower: 130, topSpeed: 129, zeroToSixty: 9.9, introducedYear: 2010, rarity: 'Common' },
  '2008': { horsepower: 100, topSpeed: 115, zeroToSixty: 10.9, introducedYear: 2013, rarity: 'Common' },
  '3008': { horsepower: 130, topSpeed: 117, zeroToSixty: 10.6, introducedYear: 2008, rarity: 'Common' },
  '5008': { horsepower: 130, topSpeed: 117, zeroToSixty: 10.4, introducedYear: 2009, rarity: 'Common' },
  'rcz': { horsepower: 156, topSpeed: 135, zeroToSixty: 8.3, introducedYear: 2009, rarity: 'Common' },
  '205': { horsepower: 50, topSpeed: 89, zeroToSixty: 16.8, introducedYear: 1983, rarity: 'Common' },

  // === CITROËN ===
  'c1': { horsepower: 72, topSpeed: 99, zeroToSixty: 13.8, introducedYear: 2005, rarity: 'Common' },
  'c3': { horsepower: 83, topSpeed: 103, zeroToSixty: 13.3, introducedYear: 2002, rarity: 'Common' },
  'c4': { horsepower: 100, topSpeed: 114, zeroToSixty: 11.3, introducedYear: 2004, rarity: 'Common' },
  'c5': { horsepower: 130, topSpeed: 124, zeroToSixty: 10.4, introducedYear: 2001, rarity: 'Common' },
  'c5 aircross': { horsepower: 130, topSpeed: 121, zeroToSixty: 10.5, introducedYear: 2017, rarity: 'Common' },
  'berlingo': { horsepower: 100, topSpeed: 103, zeroToSixty: 11.5, introducedYear: 1996, rarity: 'Common' },
  '2cv': { horsepower: 29, topSpeed: 71, zeroToSixty: 33.5, introducedYear: 1948, rarity: 'Common' },
  'ds': { horsepower: 60, topSpeed: 87, zeroToSixty: 21.0, introducedYear: 1955, rarity: 'Rare' },

  // === FIAT ===
  '500': { horsepower: 70, topSpeed: 104, zeroToSixty: 12.9, introducedYear: 1957, rarity: 'Common' },
  'panda': { horsepower: 70, topSpeed: 102, zeroToSixty: 13.9, introducedYear: 1980, rarity: 'Common' },
  'punto': { horsepower: 69, topSpeed: 97, zeroToSixty: 14.4, introducedYear: 1993, rarity: 'Common' },
  'tipo': { horsepower: 100, topSpeed: 119, zeroToSixty: 11.8, introducedYear: 1988, rarity: 'Common' },
  '500x': { horsepower: 120, topSpeed: 117, zeroToSixty: 10.9, introducedYear: 2014, rarity: 'Common' },
  '124 spider': { horsepower: 138, topSpeed: 134, zeroToSixty: 7.5, introducedYear: 1966, rarity: 'Common' },

  // === SKODA ===
  'octavia': { horsepower: 110, topSpeed: 126, zeroToSixty: 10.5, introducedYear: 1996, rarity: 'Common' },
  'fabia': { horsepower: 80, topSpeed: 111, zeroToSixty: 15.1, introducedYear: 1999, rarity: 'Common' },
  'superb': { horsepower: 150, topSpeed: 137, zeroToSixty: 8.8, introducedYear: 2001, rarity: 'Common' },
  'kodiaq': { horsepower: 150, topSpeed: 126, zeroToSixty: 9.7, introducedYear: 2016, rarity: 'Common' },
  'karoq': { horsepower: 110, topSpeed: 118, zeroToSixty: 11.1, introducedYear: 2017, rarity: 'Common' },
  'kamiq': { horsepower: 95, topSpeed: 113, zeroToSixty: 11.1, introducedYear: 2019, rarity: 'Common' },
  'enyaq': { horsepower: 177, topSpeed: 99, zeroToSixty: 8.7, introducedYear: 2020, rarity: 'Common' },

  // === SEAT ===
  'ibiza': { horsepower: 80, topSpeed: 106, zeroToSixty: 15.3, introducedYear: 1984, rarity: 'Common' },
  'leon': { horsepower: 110, topSpeed: 122, zeroToSixty: 10.4, introducedYear: 1999, rarity: 'Common' },
  'arona': { horsepower: 95, topSpeed: 113, zeroToSixty: 11.5, introducedYear: 2017, rarity: 'Common' },
  'ateca': { horsepower: 110, topSpeed: 114, zeroToSixty: 11.4, introducedYear: 2016, rarity: 'Common' },
  'tarraco': { horsepower: 150, topSpeed: 124, zeroToSixty: 9.7, introducedYear: 2018, rarity: 'Common' },

  // === VOLVO ===
  'xc40': { horsepower: 163, topSpeed: 112, zeroToSixty: 9.6, introducedYear: 2017, rarity: 'Uncommon' },
  'xc60': { horsepower: 250, topSpeed: 112, zeroToSixty: 6.9, introducedYear: 2008, rarity: 'Uncommon' },
  'xc90': { horsepower: 250, topSpeed: 112, zeroToSixty: 7.7, introducedYear: 2002, rarity: 'Uncommon' },
  'v40': { horsepower: 120, topSpeed: 118, zeroToSixty: 9.8, introducedYear: 2012, rarity: 'Uncommon' },
  'v60': { horsepower: 163, topSpeed: 112, zeroToSixty: 8.6, introducedYear: 2010, rarity: 'Uncommon' },
  'v90': { horsepower: 197, topSpeed: 112, zeroToSixty: 7.9, introducedYear: 2016, rarity: 'Uncommon' },
  's60': { horsepower: 197, topSpeed: 112, zeroToSixty: 7.9, introducedYear: 2000, rarity: 'Uncommon' },
  's90': { horsepower: 197, topSpeed: 112, zeroToSixty: 7.9, introducedYear: 2016, rarity: 'Uncommon' },
  'c40': { horsepower: 231, topSpeed: 112, zeroToSixty: 7.4, introducedYear: 2021, rarity: 'Uncommon' },

  // === TESLA ===
  'model 3': { horsepower: 283, topSpeed: 140, zeroToSixty: 5.8, introducedYear: 2017, rarity: 'Uncommon' },
  'model y': { horsepower: 295, topSpeed: 135, zeroToSixty: 6.6, introducedYear: 2020, rarity: 'Uncommon' },
  'model s': { horsepower: 670, topSpeed: 149, zeroToSixty: 3.1, introducedYear: 2012, rarity: 'Uncommon' },
  'model x': { horsepower: 670, topSpeed: 149, zeroToSixty: 3.8, introducedYear: 2015, rarity: 'Uncommon' },
  'cybertruck': { horsepower: 600, topSpeed: 112, zeroToSixty: 4.1, introducedYear: 2023, rarity: 'Rare' },
  'roadster': { horsepower: 248, topSpeed: 125, zeroToSixty: 3.7, introducedYear: 2008, rarity: 'Rare' },

  // === FERRARI ===
  '296 gtb': { horsepower: 819, topSpeed: 205, zeroToSixty: 2.9, introducedYear: 2021, rarity: 'Epic' },
  'sf90 stradale': { horsepower: 986, topSpeed: 211, zeroToSixty: 2.5, introducedYear: 2019, rarity: 'Epic' },
  'f8 tributo': { horsepower: 710, topSpeed: 211, zeroToSixty: 2.9, introducedYear: 2019, rarity: 'Epic' },
  'roma': { horsepower: 612, topSpeed: 199, zeroToSixty: 3.4, introducedYear: 2020, rarity: 'Epic' },
  'portofino': { horsepower: 591, topSpeed: 199, zeroToSixty: 3.5, introducedYear: 2017, rarity: 'Epic' },
  '812 superfast': { horsepower: 789, topSpeed: 211, zeroToSixty: 2.8, introducedYear: 2017, rarity: 'Epic' },
  '488 gtb': { horsepower: 661, topSpeed: 205, zeroToSixty: 3.0, introducedYear: 2015, rarity: 'Epic' },
  '458 italia': { horsepower: 562, topSpeed: 202, zeroToSixty: 3.3, introducedYear: 2009, rarity: 'Epic' },
  'f430': { horsepower: 483, topSpeed: 196, zeroToSixty: 3.9, introducedYear: 2004, rarity: 'Epic' },
  '360 modena': { horsepower: 395, topSpeed: 183, zeroToSixty: 4.5, introducedYear: 1999, rarity: 'Epic' },
  'laferrari': { horsepower: 950, topSpeed: 217, zeroToSixty: 2.4, introducedYear: 2013, rarity: 'Legendary' },
  'enzo': { horsepower: 651, topSpeed: 218, zeroToSixty: 3.1, introducedYear: 2002, rarity: 'Legendary' },
  'f50': { horsepower: 512, topSpeed: 202, zeroToSixty: 3.7, introducedYear: 1995, rarity: 'Legendary' },
  'f40': { horsepower: 471, topSpeed: 201, zeroToSixty: 3.8, introducedYear: 1987, rarity: 'Legendary' },
  'purosangue': { horsepower: 715, topSpeed: 193, zeroToSixty: 3.3, introducedYear: 2022, rarity: 'Epic' },
  'daytona sp3': { horsepower: 829, topSpeed: 211, zeroToSixty: 2.8, introducedYear: 2021, rarity: 'Legendary' },

  // === LAMBORGHINI ===
  'revuelto': { horsepower: 1001, topSpeed: 217, zeroToSixty: 2.5, introducedYear: 2023, rarity: 'Epic' },
  'huracan': { horsepower: 602, topSpeed: 202, zeroToSixty: 3.2, introducedYear: 2014, rarity: 'Epic' },
  'aventador': { horsepower: 690, topSpeed: 217, zeroToSixty: 2.9, introducedYear: 2011, rarity: 'Epic' },
  'urus': { horsepower: 657, topSpeed: 190, zeroToSixty: 3.5, introducedYear: 2018, rarity: 'Epic' },
  'gallardo': { horsepower: 493, topSpeed: 192, zeroToSixty: 4.1, introducedYear: 2003, rarity: 'Epic' },
  'murcielago': { horsepower: 572, topSpeed: 205, zeroToSixty: 3.8, introducedYear: 2001, rarity: 'Epic' },
  'diablo': { horsepower: 485, topSpeed: 202, zeroToSixty: 4.5, introducedYear: 1990, rarity: 'Epic' },
  'countach': { horsepower: 370, topSpeed: 179, zeroToSixty: 5.4, introducedYear: 1974, rarity: 'Epic' },
  'miura': { horsepower: 345, topSpeed: 174, zeroToSixty: 6.7, introducedYear: 1966, rarity: 'Epic' },
  'sian': { horsepower: 808, topSpeed: 217, zeroToSixty: 2.8, introducedYear: 2019, rarity: 'Legendary' },
  'veneno': { horsepower: 740, topSpeed: 221, zeroToSixty: 2.8, introducedYear: 2013, rarity: 'Legendary' },
  'centenario': { horsepower: 759, topSpeed: 217, zeroToSixty: 2.8, introducedYear: 2016, rarity: 'Legendary' },

  // === MCLAREN ===
  '750s': { horsepower: 740, topSpeed: 206, zeroToSixty: 2.7, introducedYear: 2023, rarity: 'Epic' },
  '720s': { horsepower: 710, topSpeed: 212, zeroToSixty: 2.8, introducedYear: 2017, rarity: 'Epic' },
  'artura': { horsepower: 671, topSpeed: 205, zeroToSixty: 3.0, introducedYear: 2021, rarity: 'Epic' },
  'mclaren gt': { horsepower: 612, topSpeed: 203, zeroToSixty: 3.1, introducedYear: 2019, rarity: 'Epic' },
  '570s': { horsepower: 562, topSpeed: 204, zeroToSixty: 3.1, introducedYear: 2015, rarity: 'Epic' },
  '650s': { horsepower: 641, topSpeed: 207, zeroToSixty: 2.9, introducedYear: 2014, rarity: 'Epic' },
  'mp4-12c': { horsepower: 592, topSpeed: 205, zeroToSixty: 3.1, introducedYear: 2011, rarity: 'Epic' },
  'p1': { horsepower: 903, topSpeed: 217, zeroToSixty: 2.8, introducedYear: 2013, rarity: 'Legendary' },
  'senna': { horsepower: 789, topSpeed: 208, zeroToSixty: 2.7, introducedYear: 2018, rarity: 'Legendary' },
  'speedtail': { horsepower: 1035, topSpeed: 250, zeroToSixty: 2.8, introducedYear: 2020, rarity: 'Legendary' },
  'elva': { horsepower: 804, topSpeed: 203, zeroToSixty: 2.7, introducedYear: 2020, rarity: 'Legendary' },
  'f1': { horsepower: 618, topSpeed: 240, zeroToSixty: 3.2, introducedYear: 1992, rarity: 'Legendary' },

  // === ASTON MARTIN ===
  'vantage': { horsepower: 503, topSpeed: 195, zeroToSixty: 3.6, introducedYear: 1977, rarity: 'Rare' },
  'db12': { horsepower: 671, topSpeed: 202, zeroToSixty: 3.5, introducedYear: 2023, rarity: 'Rare' },
  'db11': { horsepower: 503, topSpeed: 187, zeroToSixty: 3.9, introducedYear: 2016, rarity: 'Rare' },
  'dbs': { horsepower: 715, topSpeed: 211, zeroToSixty: 3.4, introducedYear: 2007, rarity: 'Epic' },
  'dbx': { horsepower: 542, topSpeed: 181, zeroToSixty: 4.3, introducedYear: 2020, rarity: 'Rare' },
  'db9': { horsepower: 450, topSpeed: 186, zeroToSixty: 4.6, introducedYear: 2004, rarity: 'Rare' },
  'vanquish': { horsepower: 460, topSpeed: 190, zeroToSixty: 4.5, introducedYear: 2001, rarity: 'Rare' },
  'valkyrie': { horsepower: 1160, topSpeed: 250, zeroToSixty: 2.3, introducedYear: 2021, rarity: 'Legendary' },
  'valhalla': { horsepower: 937, topSpeed: 217, zeroToSixty: 2.5, introducedYear: 2023, rarity: 'Legendary' },
  'db5': { horsepower: 282, topSpeed: 143, zeroToSixty: 8.0, introducedYear: 1963, rarity: 'Rare' },

  // === BUGATTI ===
  'chiron': { horsepower: 1479, topSpeed: 261, zeroToSixty: 2.4, introducedYear: 2016, rarity: 'Legendary' },
  'veyron': { horsepower: 987, topSpeed: 253, zeroToSixty: 2.5, introducedYear: 2005, rarity: 'Legendary' },
  'divo': { horsepower: 1479, topSpeed: 236, zeroToSixty: 2.4, introducedYear: 2018, rarity: 'Legendary' },
  'centodieci': { horsepower: 1577, topSpeed: 236, zeroToSixty: 2.4, introducedYear: 2020, rarity: 'Legendary' },
  'bolide': { horsepower: 1578, topSpeed: 310, zeroToSixty: 2.1, introducedYear: 2021, rarity: 'Legendary' },
  'tourbillon': { horsepower: 1775, topSpeed: 276, zeroToSixty: 2.0, introducedYear: 2024, rarity: 'Legendary' },
  'eb110': { horsepower: 553, topSpeed: 213, zeroToSixty: 3.5, introducedYear: 1991, rarity: 'Legendary' },

  // === KOENIGSEGG ===
  'jesko': { horsepower: 1280, topSpeed: 300, zeroToSixty: 2.5, introducedYear: 2019, rarity: 'Legendary' },
  'regera': { horsepower: 1489, topSpeed: 251, zeroToSixty: 2.8, introducedYear: 2015, rarity: 'Legendary' },
  'agera': { horsepower: 947, topSpeed: 260, zeroToSixty: 2.8, introducedYear: 2010, rarity: 'Legendary' },
  'gemera': { horsepower: 1381, topSpeed: 249, zeroToSixty: 1.9, introducedYear: 2020, rarity: 'Legendary' },
  'one:1': { horsepower: 1341, topSpeed: 273, zeroToSixty: 2.8, introducedYear: 2014, rarity: 'Legendary' },
  'cc8s': { horsepower: 646, topSpeed: 240, zeroToSixty: 3.2, introducedYear: 2002, rarity: 'Legendary' },
  'ccx': { horsepower: 795, topSpeed: 245, zeroToSixty: 3.1, introducedYear: 2006, rarity: 'Legendary' },

  // === PAGANI ===
  'utopia': { horsepower: 852, topSpeed: 220, zeroToSixty: 2.8, introducedYear: 2022, rarity: 'Legendary' },
  'huayra': { horsepower: 720, topSpeed: 238, zeroToSixty: 2.8, introducedYear: 2011, rarity: 'Legendary' },
  'zonda': { horsepower: 389, topSpeed: 185, zeroToSixty: 4.2, introducedYear: 1999, rarity: 'Legendary' },

  // === ROLLS-ROYCE ===
  'phantom': { horsepower: 563, topSpeed: 155, zeroToSixty: 5.1, introducedYear: 1925, rarity: 'Epic' },
  'ghost': { horsepower: 563, topSpeed: 155, zeroToSixty: 4.6, introducedYear: 2009, rarity: 'Epic' },
  'cullinan': { horsepower: 563, topSpeed: 155, zeroToSixty: 5.0, introducedYear: 2018, rarity: 'Epic' },
  'wraith': { horsepower: 624, topSpeed: 155, zeroToSixty: 4.4, introducedYear: 2013, rarity: 'Epic' },
  'dawn': { horsepower: 563, topSpeed: 155, zeroToSixty: 4.9, introducedYear: 2015, rarity: 'Epic' },
  'spectre': { horsepower: 577, topSpeed: 155, zeroToSixty: 4.4, introducedYear: 2023, rarity: 'Epic' },

  // === BENTLEY ===
  'continental gt': { horsepower: 542, topSpeed: 198, zeroToSixty: 3.9, introducedYear: 2003, rarity: 'Rare' },
  'flying spur': { horsepower: 542, topSpeed: 198, zeroToSixty: 4.0, introducedYear: 2005, rarity: 'Rare' },
  'bentayga': { horsepower: 542, topSpeed: 180, zeroToSixty: 4.4, introducedYear: 2015, rarity: 'Rare' },
  'mulsanne': { horsepower: 505, topSpeed: 184, zeroToSixty: 5.1, introducedYear: 1980, rarity: 'Rare' },
  'arnage': { horsepower: 350, topSpeed: 150, zeroToSixty: 6.2, introducedYear: 1998, rarity: 'Rare' },

  // === LOTUS ===
  'emira': { horsepower: 360, topSpeed: 180, zeroToSixty: 4.2, introducedYear: 2021, rarity: 'Rare' },
  'eletre': { horsepower: 603, topSpeed: 160, zeroToSixty: 4.5, introducedYear: 2022, rarity: 'Rare' },
  'evija': { horsepower: 1972, topSpeed: 218, zeroToSixty: 2.8, introducedYear: 2019, rarity: 'Legendary' },
  'elise': { horsepower: 118, topSpeed: 126, zeroToSixty: 5.8, introducedYear: 1996, rarity: 'Rare' },
  'exige': { horsepower: 177, topSpeed: 136, zeroToSixty: 4.7, introducedYear: 2000, rarity: 'Rare' },
  'evora': { horsepower: 276, topSpeed: 162, zeroToSixty: 4.9, introducedYear: 2009, rarity: 'Rare' },
  'esprit': { horsepower: 160, topSpeed: 138, zeroToSixty: 6.8, introducedYear: 1976, rarity: 'Rare' },

  // === MAZDA ===
  'mx-5': { horsepower: 130, topSpeed: 127, zeroToSixty: 8.3, introducedYear: 1989, rarity: 'Common' },
  'mazda2': { horsepower: 75, topSpeed: 109, zeroToSixty: 11.3, introducedYear: 2002, rarity: 'Common' },
  'mazda3': { horsepower: 122, topSpeed: 122, zeroToSixty: 10.4, introducedYear: 2003, rarity: 'Common' },
  'mazda6': { horsepower: 145, topSpeed: 129, zeroToSixty: 9.9, introducedYear: 2002, rarity: 'Common' },
  'cx-30': { horsepower: 122, topSpeed: 116, zeroToSixty: 10.6, introducedYear: 2019, rarity: 'Common' },
  'cx-5': { horsepower: 165, topSpeed: 125, zeroToSixty: 10.3, introducedYear: 2012, rarity: 'Common' },
  'cx-60': { horsepower: 323, topSpeed: 124, zeroToSixty: 5.8, introducedYear: 2022, rarity: 'Common' },
  'rx-7': { horsepower: 236, topSpeed: 156, zeroToSixty: 5.1, introducedYear: 1978, rarity: 'Rare' },
  'rx-8': { horsepower: 189, topSpeed: 139, zeroToSixty: 7.2, introducedYear: 2003, rarity: 'Common' },

  // === SUBARU ===
  'impreza': { horsepower: 152, topSpeed: 127, zeroToSixty: 9.0, introducedYear: 1992, rarity: 'Common' },
  'wrx': { horsepower: 271, topSpeed: 145, zeroToSixty: 5.5, introducedYear: 1992, rarity: 'Uncommon' },
  'wrx sti': { horsepower: 300, topSpeed: 158, zeroToSixty: 4.8, introducedYear: 1994, rarity: 'Rare' },
  'forester': { horsepower: 148, topSpeed: 117, zeroToSixty: 11.8, introducedYear: 1997, rarity: 'Common' },
  'outback': { horsepower: 166, topSpeed: 120, zeroToSixty: 10.2, introducedYear: 1994, rarity: 'Common' },
  'brz': { horsepower: 228, topSpeed: 140, zeroToSixty: 6.3, introducedYear: 2012, rarity: 'Common' },

  // === ALFA ROMEO ===
  'giulia': { horsepower: 197, topSpeed: 146, zeroToSixty: 6.6, introducedYear: 1962, rarity: 'Uncommon' },
  'stelvio': { horsepower: 197, topSpeed: 134, zeroToSixty: 7.2, introducedYear: 2016, rarity: 'Uncommon' },
  'tonale': { horsepower: 158, topSpeed: 128, zeroToSixty: 8.8, introducedYear: 2022, rarity: 'Uncommon' },
  'giulietta': { horsepower: 120, topSpeed: 121, zeroToSixty: 9.4, introducedYear: 1954, rarity: 'Uncommon' },
  'mito': { horsepower: 78, topSpeed: 103, zeroToSixty: 12.3, introducedYear: 2008, rarity: 'Uncommon' },
  '4c': { horsepower: 237, topSpeed: 160, zeroToSixty: 4.5, introducedYear: 2013, rarity: 'Rare' },
  '8c competizione': { horsepower: 444, topSpeed: 181, zeroToSixty: 4.2, introducedYear: 2007, rarity: 'Epic' },

  // === MASERATI ===
  'ghibli': { horsepower: 345, topSpeed: 166, zeroToSixty: 5.5, introducedYear: 1967, rarity: 'Rare' },
  'levante': { horsepower: 345, topSpeed: 156, zeroToSixty: 6.0, introducedYear: 2016, rarity: 'Rare' },
  'quattroporte': { horsepower: 424, topSpeed: 179, zeroToSixty: 5.0, introducedYear: 1963, rarity: 'Rare' },
  'grecale': { horsepower: 296, topSpeed: 149, zeroToSixty: 5.6, introducedYear: 2022, rarity: 'Rare' },
  'granturismo': { horsepower: 483, topSpeed: 188, zeroToSixty: 3.9, introducedYear: 2007, rarity: 'Rare' },
  'mc20': { horsepower: 621, topSpeed: 202, zeroToSixty: 2.9, introducedYear: 2020, rarity: 'Epic' },
  'mc12': { horsepower: 621, topSpeed: 205, zeroToSixty: 3.7, introducedYear: 2004, rarity: 'Legendary' },

  // === CHEVROLET ===
  'corvette': { horsepower: 490, topSpeed: 194, zeroToSixty: 2.9, introducedYear: 1953, rarity: 'Rare' },
  'camaro': { horsepower: 275, topSpeed: 155, zeroToSixty: 5.4, introducedYear: 1966, rarity: 'Common' },

  // === DODGE ===
  'challenger': { horsepower: 303, topSpeed: 149, zeroToSixty: 5.3, introducedYear: 1970, rarity: 'Rare' },
  'charger': { horsepower: 292, topSpeed: 149, zeroToSixty: 6.4, introducedYear: 1966, rarity: 'Rare' },
  'viper': { horsepower: 400, topSpeed: 165, zeroToSixty: 4.2, introducedYear: 1991, rarity: 'Epic' },

  // === JEEP ===
  'wrangler': { horsepower: 270, topSpeed: 112, zeroToSixty: 7.1, introducedYear: 1986, rarity: 'Common' },
  'renegade': { horsepower: 120, topSpeed: 115, zeroToSixty: 11.2, introducedYear: 2014, rarity: 'Common' },
  'compass': { horsepower: 130, topSpeed: 120, zeroToSixty: 10.3, introducedYear: 2006, rarity: 'Common' },
  'grand cherokee': { horsepower: 293, topSpeed: 130, zeroToSixty: 7.5, introducedYear: 1992, rarity: 'Uncommon' },

  // === CUPRA ===
  'formentor': { horsepower: 150, topSpeed: 127, zeroToSixty: 8.9, introducedYear: 2020, rarity: 'Uncommon' },
  'born': { horsepower: 204, topSpeed: 99, zeroToSixty: 7.3, introducedYear: 2021, rarity: 'Uncommon' },
  'cupra ateca': { horsepower: 300, topSpeed: 153, zeroToSixty: 4.9, introducedYear: 2018, rarity: 'Uncommon' },
  'cupra leon': { horsepower: 245, topSpeed: 155, zeroToSixty: 5.7, introducedYear: 2020, rarity: 'Uncommon' },
  'tavascan': { horsepower: 282, topSpeed: 112, zeroToSixty: 6.8, introducedYear: 2024, rarity: 'Uncommon' },

  // === POLESTAR ===
  'polestar 1': { horsepower: 609, topSpeed: 155, zeroToSixty: 4.2, introducedYear: 2019, rarity: 'Rare' },
  'polestar 2': { horsepower: 228, topSpeed: 127, zeroToSixty: 7.0, introducedYear: 2020, rarity: 'Uncommon' },
  'polestar 3': { horsepower: 483, topSpeed: 130, zeroToSixty: 4.9, introducedYear: 2022, rarity: 'Uncommon' },
  'polestar 4': { horsepower: 272, topSpeed: 124, zeroToSixty: 6.9, introducedYear: 2023, rarity: 'Uncommon' },

  // === ALPINE ===
  'a110': { horsepower: 249, topSpeed: 155, zeroToSixty: 4.5, introducedYear: 1961, rarity: 'Rare' },
  'a290': { horsepower: 177, topSpeed: 106, zeroToSixty: 7.4, introducedYear: 2024, rarity: 'Rare' },

  // === SMART ===
  'fortwo': { horsepower: 71, topSpeed: 94, zeroToSixty: 14.4, introducedYear: 1998, rarity: 'Common' },
  'forfour': { horsepower: 71, topSpeed: 94, zeroToSixty: 15.9, introducedYear: 2004, rarity: 'Common' },
  '#1': { horsepower: 268, topSpeed: 112, zeroToSixty: 6.7, introducedYear: 2022, rarity: 'Common' },
  '#3': { horsepower: 268, topSpeed: 112, zeroToSixty: 5.8, introducedYear: 2023, rarity: 'Common' },

  // === DACIA ===
  'sandero': { horsepower: 65, topSpeed: 98, zeroToSixty: 16.7, introducedYear: 2008, rarity: 'Common' },
  'duster': { horsepower: 90, topSpeed: 103, zeroToSixty: 13.1, introducedYear: 2010, rarity: 'Common' },
  'jogger': { horsepower: 110, topSpeed: 114, zeroToSixty: 10.5, introducedYear: 2021, rarity: 'Common' },
  'spring': { horsepower: 44, topSpeed: 78, zeroToSixty: 19.1, introducedYear: 2021, rarity: 'Common' },

  // === SUZUKI ===
  'swift': { horsepower: 83, topSpeed: 109, zeroToSixty: 12.2, introducedYear: 1983, rarity: 'Common' },
  'jimny': { horsepower: 101, topSpeed: 90, zeroToSixty: 12.8, introducedYear: 1970, rarity: 'Common' },
  'vitara': { horsepower: 129, topSpeed: 118, zeroToSixty: 9.5, introducedYear: 1988, rarity: 'Common' },
  's-cross': { horsepower: 129, topSpeed: 121, zeroToSixty: 9.5, introducedYear: 2006, rarity: 'Common' },
  'ignis': { horsepower: 83, topSpeed: 103, zeroToSixty: 12.7, introducedYear: 2000, rarity: 'Common' },

  // === MG ===
  'mg4': { horsepower: 170, topSpeed: 100, zeroToSixty: 7.7, introducedYear: 2022, rarity: 'Common' },
  'mg zs': { horsepower: 106, topSpeed: 109, zeroToSixty: 10.9, introducedYear: 2017, rarity: 'Common' },
  'mg hs': { horsepower: 160, topSpeed: 118, zeroToSixty: 9.9, introducedYear: 2018, rarity: 'Common' },
  'mg3': { horsepower: 105, topSpeed: 108, zeroToSixty: 10.4, introducedYear: 2008, rarity: 'Common' },
  'mg5': { horsepower: 154, topSpeed: 115, zeroToSixty: 7.7, introducedYear: 2020, rarity: 'Common' },
  'cyberster': { horsepower: 335, topSpeed: 124, zeroToSixty: 5.0, introducedYear: 2023, rarity: 'Uncommon' },
  'mgf': { horsepower: 118, topSpeed: 120, zeroToSixty: 8.5, introducedYear: 1995, rarity: 'Common' },
  'mgb': { horsepower: 95, topSpeed: 105, zeroToSixty: 12.1, introducedYear: 1962, rarity: 'Common' },

  // === CATERHAM ===
  'seven': { horsepower: 125, topSpeed: 122, zeroToSixty: 4.8, introducedYear: 1973, rarity: 'Rare' },
  'seven 170': { horsepower: 84, topSpeed: 105, zeroToSixty: 6.9, introducedYear: 2021, rarity: 'Rare' },
  'seven 360': { horsepower: 180, topSpeed: 130, zeroToSixty: 4.8, introducedYear: 2015, rarity: 'Rare' },
  'seven 420': { horsepower: 210, topSpeed: 136, zeroToSixty: 3.8, introducedYear: 2015, rarity: 'Rare' },
  'seven 620': { horsepower: 310, topSpeed: 155, zeroToSixty: 2.8, introducedYear: 2013, rarity: 'Rare' },

  // === MORGAN ===
  'plus four': { horsepower: 255, topSpeed: 149, zeroToSixty: 4.8, introducedYear: 1950, rarity: 'Rare' },
  'plus six': { horsepower: 335, topSpeed: 166, zeroToSixty: 4.2, introducedYear: 2019, rarity: 'Rare' },
  'super 3': { horsepower: 118, topSpeed: 130, zeroToSixty: 7.0, introducedYear: 2022, rarity: 'Rare' },

  // === TVR ===
  'cerbera': { horsepower: 350, topSpeed: 185, zeroToSixty: 4.2, introducedYear: 1996, rarity: 'Rare' },
  'sagaris': { horsepower: 406, topSpeed: 185, zeroToSixty: 3.7, introducedYear: 2005, rarity: 'Rare' },
  'tuscan': { horsepower: 360, topSpeed: 180, zeroToSixty: 4.2, introducedYear: 1999, rarity: 'Rare' },
  'chimaera': { horsepower: 240, topSpeed: 152, zeroToSixty: 5.1, introducedYear: 1992, rarity: 'Rare' },
  'griffith': { horsepower: 240, topSpeed: 152, zeroToSixty: 4.7, introducedYear: 1991, rarity: 'Rare' },

  // === ARIEL ===
  'atom': { horsepower: 245, topSpeed: 150, zeroToSixty: 2.8, introducedYear: 2000, rarity: 'Rare' },
  'nomad': { horsepower: 235, topSpeed: 125, zeroToSixty: 3.4, introducedYear: 2015, rarity: 'Rare' },

  // === BAC ===
  'mono': { horsepower: 311, topSpeed: 170, zeroToSixty: 2.7, introducedYear: 2011, rarity: 'Rare' },

  // === RIMAC ===
  'nevera': { horsepower: 1877, topSpeed: 258, zeroToSixty: 1.85, introducedYear: 2021, rarity: 'Legendary' },
  'concept one': { horsepower: 1224, topSpeed: 221, zeroToSixty: 2.5, introducedYear: 2013, rarity: 'Legendary' },

  // === BYD ===
  'atto 3': { horsepower: 201, topSpeed: 99, zeroToSixty: 7.3, introducedYear: 2022, rarity: 'Common' },
  'seal': { horsepower: 308, topSpeed: 112, zeroToSixty: 5.9, introducedYear: 2022, rarity: 'Common' },
  'dolphin': { horsepower: 94, topSpeed: 93, zeroToSixty: 12.3, introducedYear: 2021, rarity: 'Common' },

  // === GWM ORA ===
  '03': { horsepower: 169, topSpeed: 99, zeroToSixty: 8.3, introducedYear: 2020, rarity: 'Common' },
  'funky cat': { horsepower: 169, topSpeed: 99, zeroToSixty: 8.3, introducedYear: 2020, rarity: 'Common' },
};

/**
 * Normalizes a model string to find exact match in specs DB
 */
export function findAccurateCarSpec(brandName: string, modelName: string): BaseCarSpec | null {
  const cleanModel = modelName.toLowerCase().trim();
  const cleanBrand = brandName.toLowerCase().trim();
  const brandAndModel = `${cleanBrand} ${cleanModel}`;

  // Try brand + model match (e.g. "mclaren gt", "cupra leon")
  if (ACCURATE_CAR_SPECS_DB[brandAndModel]) {
    return ACCURATE_CAR_SPECS_DB[brandAndModel];
  }

  // Try direct model match
  if (ACCURATE_CAR_SPECS_DB[cleanModel]) {
    return ACCURATE_CAR_SPECS_DB[cleanModel];
  }

  // Strip brand prefix if included in model string
  const modelWithoutBrand = cleanModel.replace(cleanBrand, '').trim();
  if (modelWithoutBrand && ACCURATE_CAR_SPECS_DB[modelWithoutBrand]) {
    return ACCURATE_CAR_SPECS_DB[modelWithoutBrand];
  }

  // Check substrings for key models (e.g. "Golf GTI" -> "golf gti" or "golf")
  for (const [key, spec] of Object.entries(ACCURATE_CAR_SPECS_DB)) {
    if (cleanModel === key || cleanModel.startsWith(key + ' ') || cleanModel.endsWith(' ' + key) || cleanModel.includes(' ' + key + ' ')) {
      return spec;
    }
  }

  return null;
}
