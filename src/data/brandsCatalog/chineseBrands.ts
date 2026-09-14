import { BrandInfo } from '../../types';
import { createBrandWithCars } from './carFactory';

export const CHINESE_BRANDS: BrandInfo[] = [
  createBrandWithCars(
    {
      id: "byd",
      name: "BYD",
      country: "China",
      founded: "1995",
    },
    [
      {
            "id": "byd-seal-excellence-awd",
            "name": "Seal Excellence AWD 523hp",
            "brand": "BYD",
            "country": "China",
            "yearIntroduced": 2023,
            "rarity": "Common",
            "horsepower": 523,
            "topSpeed": 112,
            "zeroToSixty": 3.8,
            "image": "https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Arctic Blue",
                        "hex": "#38BDF8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Atlantis Grey",
                        "hex": "#64748B",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Polar White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  },
                  {
                        "name": "Space Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "byd-atto-3-design",
            "name": "Atto 3 Design Blade Battery SUV",
            "brand": "BYD",
            "country": "China",
            "yearIntroduced": 2022,
            "rarity": "Common",
            "horsepower": 201,
            "topSpeed": 99,
            "zeroToSixty": 7.3,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Surfing Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Skiing White",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  },
                  {
                        "name": "Bouldering Grey",
                        "hex": "#475569",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Parkour Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  }
            ]
      },
      {
            "id": "byd-dolphin-design",
            "name": "Dolphin Design EV Compact",
            "brand": "BYD",
            "country": "China",
            "yearIntroduced": 2023,
            "rarity": "Common",
            "horsepower": 201,
            "topSpeed": 100,
            "zeroToSixty": 7,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Surf Blue & Urban Grey Two-Tone",
                        "hex": "#38BDF8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Coral Pink & Urban Grey",
                        "hex": "#FB7185",
                        "baseColor": "Red"
                  }
            ]
      }
],
    [
      "Seal Excellence AWD 523hp",
      "Atto 3 Design Blade Battery SUV",
      "Dolphin Design EV Compact",
      "Atto 3",
      "Dolphin",
      "Seal",
      "Seal U"
]
  ),
  createBrandWithCars(
    {
      id: "omoda",
      name: "Omoda",
      country: "China",
      founded: "2022",
    },
    [
      {
            "id": "omoda-e5-noble",
            "name": "E5 Noble EV Fastback Crossover",
            "brand": "Omoda",
            "country": "China",
            "yearIntroduced": 2024,
            "rarity": "Common",
            "horsepower": 204,
            "topSpeed": 107,
            "zeroToSixty": 7.6,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Titan Green",
                        "hex": "#15803D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Midnight Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Quartz Grey",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Vanilla Blue",
                        "hex": "#7DD3FC",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "omoda-5-turbo",
            "name": "Omoda 5 1.6 TGDi Turbo Petrol",
            "brand": "Omoda",
            "country": "China",
            "yearIntroduced": 2024,
            "rarity": "Common",
            "horsepower": 187,
            "topSpeed": 121,
            "zeroToSixty": 7.9,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Space Black with Red Accents",
                        "hex": "#000000",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Khaki White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "E5 Noble EV Fastback Crossover",
      "Omoda 5 1.6 TGDi Turbo Petrol"
]
  ),
  createBrandWithCars(
    {
      id: "jaecoo",
      name: "Jaecoo",
      country: "China",
      founded: "2023",
    },
    [
      {
            "id": "jaecoo-7-awd",
            "name": "7 All-Terrain AWD Super SUV",
            "brand": "Jaecoo",
            "country": "China",
            "yearIntroduced": 2024,
            "rarity": "Common",
            "horsepower": 194,
            "topSpeed": 112,
            "zeroToSixty": 8,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Model Green",
                        "hex": "#14532D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Carbon Crystal Black",
                        "hex": "#0F172A",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Khaki White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "7 All-Terrain AWD Super SUV"
]
  ),
  createBrandWithCars(
    {
      id: "gwm-ora",
      name: "GWM ORA",
      country: "China",
      founded: "2018",
    },
    [
      {
            "id": "gwm-ora-03-gt",
            "name": "03 GT Funky Cat Aero Edition",
            "brand": "GWM ORA",
            "country": "China",
            "yearIntroduced": 2023,
            "rarity": "Common",
            "horsepower": 169,
            "topSpeed": 99,
            "zeroToSixty": 8.2,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Mars Red with Starry Black Roof",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Aurora Green",
                        "hex": "#22C55E",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Nebula Green",
                        "hex": "#86EFAC",
                        "baseColor": "Green"
                  }
            ]
      },
      {
            "id": "gwm-ora-07",
            "name": "07 Lightning Cat Dual-Motor AWD 408hp",
            "brand": "GWM ORA",
            "country": "China",
            "yearIntroduced": 2024,
            "rarity": "Uncommon",
            "horsepower": 408,
            "topSpeed": 112,
            "zeroToSixty": 4.4,
            "image": "https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Tourmaline Pink",
                        "hex": "#FDA4AF",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Smoky Amethyst Purple",
                        "hex": "#581C87",
                        "baseColor": "Purple"
                  },
                  {
                        "name": "Diamond Silver",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "03 GT Funky Cat Aero Edition",
      "07 Lightning Cat Dual-Motor AWD 408hp",
      "03",
      "07",
      "Funky Cat"
]
  ),
  createBrandWithCars(
    {
      id: "zeekr",
      name: "Zeekr",
      country: "China",
      founded: "2021",
    },
    [
      {
            "id": "zeekr-001-fr",
            "name": "001 FR Quad-Motor 1265hp Hyper-Shooting Brake",
            "brand": "Zeekr",
            "country": "China",
            "yearIntroduced": 2023,
            "rarity": "Legendary",
            "horsepower": 1265,
            "topSpeed": 174,
            "zeroToSixty": 2.07,
            "image": "https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Ghost Grey with Carbon Red Aero",
                        "hex": "#475569",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Electric White & Carbon",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "zeekr-x-privilege-awd",
            "name": "Zeekr X Privilege AWD 428hp Compact",
            "brand": "Zeekr",
            "country": "China",
            "yearIntroduced": 2023,
            "rarity": "Uncommon",
            "horsepower": 428,
            "topSpeed": 118,
            "zeroToSixty": 3.8,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Berlin Grey",
                        "hex": "#374151",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Hangzhou Green",
                        "hex": "#15803D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Palace Beige",
                        "hex": "#FEF3C7",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "001 FR Quad-Motor 1265hp Hyper-Shooting Brake",
      "Zeekr X Privilege AWD 428hp Compact"
]
  ),
  createBrandWithCars(
    {
      id: "nio",
      name: "NIO",
      country: "China",
      founded: "2014",
    },
    [
      {
            "id": "nio-ep9",
            "name": "EP9 Quad-Motor 1360hp Nürburgring Record",
            "brand": "NIO",
            "country": "China",
            "yearIntroduced": 2016,
            "rarity": "Legendary",
            "horsepower": 1360,
            "topSpeed": 194,
            "zeroToSixty": 2.7,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "NIO Blue Racing Livery",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "nio-et5-touring",
            "name": "ET5 Touring Dual-Motor Battery Swap",
            "brand": "NIO",
            "country": "China",
            "yearIntroduced": 2023,
            "rarity": "Rare",
            "horsepower": 483,
            "topSpeed": 124,
            "zeroToSixty": 4,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Sunbathe Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Airspace Blue",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "First Light White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "EP9 Quad-Motor 1360hp Nürburgring Record",
      "ET5 Touring Dual-Motor Battery Swap"
]
  ),
  createBrandWithCars(
    {
      id: "xpeng",
      name: "XPENG",
      country: "China",
      founded: "2014",
    },
    [
      {
            "id": "xpeng-g6-performance-awd",
            "name": "G6 Performance AWD Ultra-Fast 800V",
            "brand": "XPENG",
            "country": "China",
            "yearIntroduced": 2023,
            "rarity": "Common",
            "horsepower": 476,
            "topSpeed": 125,
            "zeroToSixty": 4.1,
            "image": "https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Fiery Orange",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Midnight Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Arctic White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "G6 Performance AWD Ultra-Fast 800V"
]
  ),
  createBrandWithCars(
    {
      id: "geely",
      name: "Geely",
      country: "China",
      founded: "1986",
    },
    [
      {
            "id": "geely-monjaro-hi-x",
            "name": "Monjaro Hi-X Hybrid Flagship SUV",
            "brand": "Geely",
            "country": "China",
            "yearIntroduced": 2022,
            "rarity": "Common",
            "horsepower": 245,
            "topSpeed": 133,
            "zeroToSixty": 7.7,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Emerald Green",
                        "hex": "#065F46",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Matte Grey",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "Monjaro Hi-X Hybrid Flagship SUV"
]
  ),
  createBrandWithCars(
    {
      id: "maxus",
      name: "Maxus",
      country: "China",
      founded: "2011",
    },
    [
      {
            "id": "maxus-mifa-9",
            "name": "MIFA 9 Luxury Electric MPV 7-Seater",
            "brand": "Maxus",
            "country": "China",
            "yearIntroduced": 2022,
            "rarity": "Common",
            "horsepower": 241,
            "topSpeed": 112,
            "zeroToSixty": 8.9,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Meteorite Grey with Black Roof",
                        "hex": "#475569",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Snow Cyan",
                        "hex": "#99F6E4",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Pearl White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "maxus-t90-ev",
            "name": "T90 EV First UK Electric Pick-Up",
            "brand": "Maxus",
            "country": "China",
            "yearIntroduced": 2022,
            "rarity": "Common",
            "horsepower": 177,
            "topSpeed": 75,
            "zeroToSixty": 12.3,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Lava Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Obsidian Black",
                        "hex": "#000000",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Pure White",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "MIFA 9 Luxury Electric MPV 7-Seater",
      "T90 EV First UK Electric Pick-Up"
]
  ),
  createBrandWithCars(
    {
      id: "lynk-and-co",
      name: "Lynk & Co",
      country: "China",
      founded: "2016",
    },
    [
      {
            "id": "lynk-co-01-phev",
            "name": "01 Plug-In Hybrid Membership SUV",
            "brand": "Lynk & Co",
            "country": "China",
            "yearIntroduced": 2020,
            "rarity": "Common",
            "horsepower": 257,
            "topSpeed": 130,
            "zeroToSixty": 8,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Black with Cyan Roof Stripe",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Blue Metallic with Cyan Stripe",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "lynk-co-03-cyan-edition",
            "name": "03+ Cyan Racing Edition 265hp",
            "brand": "Lynk & Co",
            "country": "China",
            "yearIntroduced": 2021,
            "rarity": "Legendary",
            "horsepower": 265,
            "topSpeed": 155,
            "zeroToSixty": 5.7,
            "image": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Cyan Blue Racing with Carbon Wing",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "01 Plug-In Hybrid Membership SUV",
      "03+ Cyan Racing Edition 265hp"
]
  ),
  createBrandWithCars(
    {
      id: "aiways",
      name: "Aiways",
      country: "China",
      founded: "2017",
    },
    [
      {
            "id": "aiways-u6-prime",
            "name": "U6 Prime Electric SUV-Coupé",
            "brand": "Aiways",
            "country": "China",
            "yearIntroduced": 2022,
            "rarity": "Rare",
            "horsepower": 215,
            "topSpeed": 100,
            "zeroToSixty": 6.9,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Canary Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Glacier Blue",
                        "hex": "#38BDF8",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "U6 Prime Electric SUV-Coupé"
]
  ),
  createBrandWithCars(
    {
      id: "leapmotor",
      name: "Leapmotor",
      country: "China",
      founded: "2015",
    },
    [
      {
            "id": "leapmotor-t03",
            "name": "T03 Compact Affordable Urban EV",
            "brand": "Leapmotor",
            "country": "China",
            "yearIntroduced": 2023,
            "rarity": "Common",
            "horsepower": 95,
            "topSpeed": 81,
            "zeroToSixty": 12,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Glacier Blue",
                        "hex": "#7DD3FC",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Light White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "leapmotor-c10",
            "name": "C10 Family Electric D-SUV",
            "brand": "Leapmotor",
            "country": "China",
            "yearIntroduced": 2024,
            "rarity": "Common",
            "horsepower": 228,
            "topSpeed": 106,
            "zeroToSixty": 7.2,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Canopy Grey",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Tundra Grey",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "T03 Compact Affordable Urban EV",
      "C10 Family Electric D-SUV"
]
  ),
  createBrandWithCars(
    {
      id: "hongqi",
      name: "Hongqi",
      country: "China",
      founded: "1958",
    },
    [
      {
            "id": "hongqi-e-hs9-presidential",
            "name": "E-HS9 Presidential \"Rolls-Royce of China\"",
            "brand": "Hongqi",
            "country": "China",
            "yearIntroduced": 2020,
            "rarity": "Rare",
            "horsepower": 543,
            "topSpeed": 124,
            "zeroToSixty": 4.9,
            "image": "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Imperial Two-Tone Purple & Gold",
                        "hex": "#581C87",
                        "baseColor": "Purple"
                  },
                  {
                        "name": "Artisan Green & White",
                        "hex": "#14532D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Midnight Black",
                        "hex": "#000000",
                        "baseColor": "Black"
                  }
            ]
      }
],
    [
      "E-HS9 Presidential \"Rolls-Royce of China\""
]
  ),
  createBrandWithCars(
    {
      id: "chery",
      name: "Chery",
      country: "China",
      founded: "1997",
    },
    [
      {
            "id": "chery-tiggo-8-pro-max",
            "name": "Tiggo 8 Pro Max 7-Seater AWD",
            "brand": "Chery",
            "country": "China",
            "yearIntroduced": 2022,
            "rarity": "Common",
            "horsepower": 250,
            "topSpeed": 130,
            "zeroToSixty": 7.3,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Rhine Blue",
                        "hex": "#1E40AF",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Carbon Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  }
            ]
      }
],
    [
      "Tiggo 8 Pro Max 7-Seater AWD"
]
  ),
  createBrandWithCars(
    {
      id: "great-wall",
      name: "Great Wall",
      country: "China",
      founded: "1984",
    },
    [
      {
            "id": "great-wall-steed-se",
            "name": "Steed 2.0 TD Workhorse Pick-up",
            "brand": "Great Wall",
            "country": "China",
            "yearIntroduced": 2012,
            "rarity": "Common",
            "horsepower": 141,
            "topSpeed": 87,
            "zeroToSixty": 14.5,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Noble White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  },
                  {
                        "name": "Metallic Silver",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "Steed 2.0 TD Workhorse Pick-up"
]
  ),
  createBrandWithCars(
    {
      id: "baojun",
      name: "Baojun",
      country: "China",
      founded: "2010",
    },
    [],
    [
      "Yep",
      "510",
      "530",
      "310",
      "RC-6",
      "Kiwi EV",
      "Cloud",
    ]
  ),
  createBrandWithCars(
    {
      id: "roewe",
      name: "Roewe",
      country: "China",
      founded: "2006",
    },
    [],
    [
      "RX5",
      "i5",
      "i6",
      "Marvel R",
      "eRX5",
      "D7",
    ]
  ),
  createBrandWithCars(
    {
      id: "dongfeng",
      name: "Dongfeng",
      country: "China",
      founded: "1969",
    },
    [],
    [
      "Box",
      "M-Hero 917",
      "Nammi 01",
    ]
  ),
  createBrandWithCars(
    {
      id: "voyah",
      name: "Voyah",
      country: "China",
      founded: "2020",
    },
    [],
    [
      "Free",
      "Dreamer",
      "Passion",
      "Courage",
    ]
  ),
  createBrandWithCars(
    {
      id: "avatr",
      name: "Avatr",
      country: "China",
      founded: "2018",
    },
    [],
    [
      "11",
      "12",
      "07",
    ]
  ),
  createBrandWithCars(
    {
      id: "aito",
      name: "Aito",
      country: "China",
      founded: "2021",
    },
    [],
    [
      "M5",
      "M7",
      "M9",
    ]
  ),
  createBrandWithCars(
    {
      id: "li-auto",
      name: "Li Auto",
      country: "China",
      founded: "2015",
    },
    [],
    [
      "L6",
      "L7",
      "L8",
      "L9",
      "Mega",
    ]
  ),
  createBrandWithCars(
    {
      id: "gac",
      name: "GAC",
      country: "China",
      founded: "1997",
    },
    [],
    [
      "Aion Y",
      "Aion S",
      "Aion V",
      "Emkoo",
      "Empow",
      "GS8",
    ]
  ),
];
