import { BrandInfo } from '../../types';
import { createBrandWithCars } from './carFactory';

export const KOREAN_BRANDS: BrandInfo[] = [
  createBrandWithCars(
    {
      id: "hyundai",
      name: "Hyundai",
      country: "South Korea",
      founded: "1967",
    },
    [
      {
            "id": "hyundai-ioniq-5-n",
            "name": "Ioniq 5 N 641hp Drift Mode EV",
            "brand": "Hyundai",
            "country": "South Korea",
            "yearIntroduced": 2023,
            "rarity": "Legendary",
            "horsepower": 641,
            "topSpeed": 162,
            "zeroToSixty": 3.4,
            "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Performance Blue Matte with Luminous Orange",
                        "hex": "#60A5FA",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Soultronic Orange Pearl",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Abyss Black Pearl",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Atlas White Matte",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "hyundai-i20-n",
            "name": "i20 N 1.6 T-GDi Pocket Rocket",
            "brand": "Hyundai",
            "country": "South Korea",
            "yearIntroduced": 2021,
            "rarity": "Rare",
            "horsepower": 201,
            "topSpeed": 143,
            "zeroToSixty": 6.2,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Performance Blue",
                        "hex": "#38BDF8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Dragon Red Pearl",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Phantom Black",
                        "hex": "#111827",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "hyundai-i30-n-performance",
            "name": "i30 N Performance Hatchback",
            "brand": "Hyundai",
            "country": "South Korea",
            "yearIntroduced": 2017,
            "rarity": "Common",
            "horsepower": 276,
            "topSpeed": 155,
            "zeroToSixty": 5.4,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Performance Blue",
                        "hex": "#60A5FA",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Shadow Grey",
                        "hex": "#64748B",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Engine Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  }
            ]
      }
],
    [
      "Ioniq 5 N 641hp Drift Mode EV",
      "i20 N 1.6 T-GDi Pocket Rocket",
      "i30 N Performance Hatchback",
      "i10",
      "i20",
      "i30",
      "i40",
      "ix20",
      "ix35",
      "Tucson",
      "Santa Fe",
      "Kona",
      "Bayon",
      "Ioniq",
      "Ioniq 5",
      "Ioniq 6",
      "Coupe",
      "Veloster",
      "Genesis",
      "Trajet",
      "Matrix",
      "Getz",
      "Amica",
      "Terracan",
      "Atoz",
      "Pony",
      "Staria"
]
  ),
  createBrandWithCars(
    {
      id: "kia",
      name: "Kia",
      country: "South Korea",
      founded: "1944",
    },
    [
      {
            "id": "kia-ev6-gt",
            "name": "EV6 GT AWD 577hp Super-Crossover",
            "brand": "Kia",
            "country": "South Korea",
            "yearIntroduced": 2022,
            "rarity": "Legendary",
            "horsepower": 577,
            "topSpeed": 162,
            "zeroToSixty": 3.5,
            "image": "https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Moonscape Matte Grey with Neon Calipers",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Runway Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Yacht Blue",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Snow White Pearl",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "kia-stinger-gt-s",
            "name": "Stinger GT-S 3.3 Twin-Turbo V6",
            "brand": "Kia",
            "country": "South Korea",
            "yearIntroduced": 2017,
            "rarity": "Epic",
            "horsepower": 365,
            "topSpeed": 168,
            "zeroToSixty": 4.7,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "HiChroma Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Ceramic Silver",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Deep Chroma Blue",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Aurora Black Pearl",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "kia-ev9",
            "name": "EV9 GT-Line 7-Seater AWD Flagship",
            "brand": "Kia",
            "country": "South Korea",
            "yearIntroduced": 2023,
            "rarity": "Rare",
            "horsepower": 379,
            "topSpeed": 124,
            "zeroToSixty": 5.3,
            "image": "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Ocean Blue Matte",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Pebble Grey",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Aurora Black",
                        "hex": "#000000",
                        "baseColor": "Black"
                  }
            ]
      }
],
    [
      "EV6 GT AWD 577hp Super-Crossover",
      "Stinger GT-S 3.3 Twin-Turbo V6",
      "EV9 GT-Line 7-Seater AWD Flagship",
      "Picanto",
      "Rio",
      "Ceed",
      "ProCeed",
      "XCeed",
      "Cerato",
      "Soul",
      "Stonic",
      "Niro",
      "Sportage",
      "Sorento",
      "EV3",
      "EV6",
      "EV9",
      "Stinger",
      "Carens",
      "Sedona",
      "Venga",
      "Magentis",
      "Optima",
      "Pride",
      "Shuma"
]
  ),
  createBrandWithCars(
    {
      id: "genesis",
      name: "Genesis",
      country: "South Korea",
      founded: "2015",
    },
    [
      {
            "id": "genesis-gv60-performance",
            "name": "GV60 Performance AWD Boost Mode",
            "brand": "Genesis",
            "country": "South Korea",
            "yearIntroduced": 2022,
            "rarity": "Epic",
            "horsepower": 483,
            "topSpeed": 146,
            "zeroToSixty": 4,
            "image": "https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Sao Paulo Lime",
                        "hex": "#84CC16",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Uyuni White",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  },
                  {
                        "name": "Hanauma Mint",
                        "hex": "#14B8A6",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Vik Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "genesis-g70-shooting-brake",
            "name": "G70 Shooting Brake Sport Luxury",
            "brand": "Genesis",
            "country": "South Korea",
            "yearIntroduced": 2021,
            "rarity": "Rare",
            "horsepower": 242,
            "topSpeed": 146,
            "zeroToSixty": 6.4,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Cavendish Red",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Bond Silver Matte",
                        "hex": "#64748B",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Capri Blue",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "GV60 Performance AWD Boost Mode",
      "G70 Shooting Brake Sport Luxury",
      "G70",
      "G80",
      "GV60",
      "GV70",
      "GV80"
]
  ),
  createBrandWithCars(
    {
      id: "kgm",
      name: "KGM",
      country: "South Korea",
      founded: "2023",
    },
    [
      {
            "id": "kgm-torres-evx",
            "name": "Torres EVX Rugged Adventure EV",
            "brand": "KGM",
            "country": "South Korea",
            "yearIntroduced": 2023,
            "rarity": "Common",
            "horsepower": 204,
            "topSpeed": 109,
            "zeroToSixty": 8.1,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Forest Green",
                        "hex": "#15803D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Iron Metal Grey",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Grand White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "kgm-musso-rhino",
            "name": "Musso Rhino Long-Bed 4x4 Pick-up",
            "brand": "KGM",
            "country": "South Korea",
            "yearIntroduced": 2021,
            "rarity": "Common",
            "horsepower": 199,
            "topSpeed": 113,
            "zeroToSixty": 10.4,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Space Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Indian Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Marble Grey",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "Torres EVX Rugged Adventure EV",
      "Musso Rhino Long-Bed 4x4 Pick-up"
]
  ),
  createBrandWithCars(
    {
      id: "ssangyong",
      name: "SsangYong",
      country: "South Korea",
      founded: "1954",
    },
    [
      {
            "id": "ssangyong-rexton-ultimate",
            "name": "Rexton Ultimate 2.2 Diesel 4x4",
            "brand": "SsangYong",
            "country": "South Korea",
            "yearIntroduced": 2017,
            "rarity": "Common",
            "horsepower": 202,
            "topSpeed": 114,
            "zeroToSixty": 10.7,
            "image": "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Atlantic Blue",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Space Black",
                        "hex": "#000000",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Grand White",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "ssangyong-korando-e-motion",
            "name": "Korando e-Motion All-Electric",
            "brand": "SsangYong",
            "country": "South Korea",
            "yearIntroduced": 2021,
            "rarity": "Common",
            "horsepower": 188,
            "topSpeed": 97,
            "zeroToSixty": 8.5,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Dandy Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Silent Silver",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "Rexton Ultimate 2.2 Diesel 4x4",
      "Korando e-Motion All-Electric",
      "Korando",
      "Rexton",
      "Tivoli",
      "Musso",
      "Rodius",
      "Torres"
]
  ),
  createBrandWithCars(
    {
      id: "daewoo",
      name: "Daewoo",
      country: "South Korea",
      founded: "1982",
    },
    [
      {
            "id": "daewoo-matiz-se",
            "name": "Matiz SE Giugiaro Design City Car",
            "brand": "Daewoo",
            "country": "South Korea",
            "yearIntroduced": 1998,
            "rarity": "Rare",
            "horsepower": 51,
            "topSpeed": 89,
            "zeroToSixty": 17,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Polly Green",
                        "hex": "#22C55E",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Super Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Casablanca White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "daewoo-lanos-sport",
            "name": "Lanos Sport 1.6 16V Coupé",
            "brand": "Daewoo",
            "country": "South Korea",
            "yearIntroduced": 2000,
            "rarity": "Rare",
            "horsepower": 105,
            "topSpeed": 112,
            "zeroToSixty": 11.5,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Sunset Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Cobalt Blue",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "Matiz SE Giugiaro Design City Car",
      "Lanos Sport 1.6 16V Coupé",
      "Matiz",
      "Lanos",
      "Nubira",
      "Leganza",
      "Kalos",
      "Tacuma",
      "Lacetti",
      "Nexia",
      "Espero"
]
  ),
];
