import { BrandInfo } from '../../types';
import { createBrandWithCars } from './carFactory';

export const INTERNATIONAL_BRANDS: BrandInfo[] = [
  createBrandWithCars(
    {
      id: 'holden',
      name: 'Holden',
      country: 'Australia',
      founded: '1856',
    },
    [],
    [
      'Commodore',
      'Monaro',
      'Torana',
      'Kingswood',
      'Statesman',
      'Calais',
      'Caprice',
      'Ute',
      'Sandman',
    ]
  ),
  createBrandWithCars(
    {
      id: 'hsv',
      name: 'HSV',
      country: 'Australia',
      founded: '1987',
    },
    [],
    [
      'Clubsport',
      'Maloo',
      'Senator',
      'GTS',
    ]
  ),
  createBrandWithCars(
    {
      id: 'tata',
      name: 'Tata',
      country: 'India',
      founded: '1945',
    },
    [],
    [
      'Sierra',
      'Safari',
      'Nexon',
      'Harrier',
      'Altroz',
      'Tiago',
      'Punch',
      'Nano',
      'Indica',
    ]
  ),
  createBrandWithCars(
    {
      id: 'mahindra',
      name: 'Mahindra',
      country: 'India',
      founded: '1945',
    },
    [],
    [
      'Thar',
      'Scorpio',
      'XUV700',
      'Bolero',
      'XUV300',
    ]
  ),
  createBrandWithCars(
    {
      id: 'w-motors',
      name: 'W Motors',
      country: 'United Arab Emirates',
      founded: '2012',
    },
    [],
    [
      'Lykan HyperSport',
      'Fenyr SuperSport',
    ]
  ),
  createBrandWithCars(
    {
      id: 'devel',
      name: 'Devel',
      country: 'United Arab Emirates',
      founded: '2013',
    },
    [],
    [
      'Sixteen',
    ]
  ),
  createBrandWithCars(
    {
      id: 'vuhl',
      name: 'Vuhl',
      country: 'Mexico',
      founded: '2010',
    },
    [],
    [
      '05',
    ]
  ),
  createBrandWithCars(
    {
      id: 'mastretta',
      name: 'Mastretta',
      country: 'Mexico',
      founded: '1987',
    },
    [],
    [
      'MXT',
    ]
  ),
];
