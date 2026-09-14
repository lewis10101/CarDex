import { BrandInfo } from '../../types';
import { createBrandWithCars } from './carFactory';

export const FRENCH_BRANDS: BrandInfo[] = [
  createBrandWithCars(
    {
      id: "renault",
      name: "Renault",
      country: "France",
      founded: "1899",
    },
    [
      {
            "id": "renault-megane-rs-trophy-r",
            "name": "Mégane R.S. Trophy-R",
            "brand": "Renault",
            "country": "France",
            "yearIntroduced": 2019,
            "rarity": "Legendary",
            "horsepower": 296,
            "topSpeed": 163,
            "zeroToSixty": 5.4,
            "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Mother of Pearl White with Red Accents",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  },
                  {
                        "name": "Liquid Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Titanium Grey",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "renault-clio-v6-phase-2",
            "name": "Clio V6 Renault Sport Phase 2",
            "brand": "Renault",
            "country": "France",
            "yearIntroduced": 2003,
            "rarity": "Legendary",
            "horsepower": 252,
            "topSpeed": 153,
            "zeroToSixty": 5.8,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Liquid Yellow (Jaune Sirius)",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Illiad Blue",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Titanium Silver",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Mars Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  }
            ]
      },
      {
            "id": "renault-5-turbo",
            "name": "5 Turbo 2 Mid-Engine Rally Icon",
            "brand": "Renault",
            "country": "France",
            "yearIntroduced": 1983,
            "rarity": "Legendary",
            "horsepower": 158,
            "topSpeed": 125,
            "zeroToSixty": 6.6,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Grenade Red",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Olympe Blue",
                        "hex": "#0284C7",
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
            "id": "renault-5-e-tech",
            "name": "5 E-Tech 100% Electric Icon",
            "brand": "Renault",
            "country": "France",
            "yearIntroduced": 2024,
            "rarity": "Common",
            "horsepower": 150,
            "topSpeed": 93,
            "zeroToSixty": 7.9,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Pop Green",
                        "hex": "#22C55E",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Pop Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Starry Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  }
            ]
      }
],
    [
      "Mégane R.S. Trophy-R",
      "Clio V6 Renault Sport Phase 2",
      "5 Turbo 2 Mid-Engine Rally Icon",
      "5 E-Tech 100% Electric Icon",
      "5",
      "9",
      "11",
      "19",
      "21",
      "25",
      "Clio",
      "Megane",
      "Laguna",
      "Safrane",
      "Vel Satis",
      "Twingo",
      "Modus",
      "Wind",
      "Scenic",
      "Grand Scenic",
      "Espace",
      "Captur",
      "Kadjar",
      "Austral",
      "Rafale",
      "Koleos",
      "Arkana",
      "Zoe",
      "Twizy",
      "Avantime",
      "Kangoo"
]
  ),
  createBrandWithCars(
    {
      id: "peugeot",
      name: "Peugeot",
      country: "France",
      founded: "1810",
    },
    [
      {
            "id": "peugeot-205-gti",
            "name": "205 GTi 1.9 Hot Hatch Legend",
            "brand": "Peugeot",
            "country": "France",
            "yearIntroduced": 1986,
            "rarity": "Legendary",
            "horsepower": 128,
            "topSpeed": 128,
            "zeroToSixty": 7.8,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Cherry Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Miami Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Sorrento Green",
                        "hex": "#064E3B",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Graphite Grey",
                        "hex": "#374151",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "peugeot-508-pse",
            "name": "508 Peugeot Sport Engineered Hybrid4",
            "brand": "Peugeot",
            "country": "France",
            "yearIntroduced": 2021,
            "rarity": "Rare",
            "horsepower": 355,
            "topSpeed": 155,
            "zeroToSixty": 5.2,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Selenium Grey with Kryptonite Accents",
                        "hex": "#475569",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Perla Nera Black",
                        "hex": "#111827",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Okenite White",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "peugeot-208-gti-by-peugeot-sport",
            "name": "208 GTi by Peugeot Sport",
            "brand": "Peugeot",
            "country": "France",
            "yearIntroduced": 2015,
            "rarity": "Uncommon",
            "horsepower": 208,
            "topSpeed": 143,
            "zeroToSixty": 6.5,
            "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Coupe Franche (Matte Black / Lacquered Red)",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Ice Silver",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Rioja Red",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  }
            ]
      }
],
    [
      "205 GTi 1.9 Hot Hatch Legend",
      "508 Peugeot Sport Engineered Hybrid4",
      "208 GTi by Peugeot Sport",
      "106",
      "107",
      "108",
      "205",
      "206",
      "207",
      "208",
      "306",
      "307",
      "308",
      "309",
      "405",
      "406",
      "407",
      "508",
      "605",
      "607",
      "806",
      "807",
      "1007",
      "2008",
      "3008",
      "4007",
      "4008",
      "5008",
      "RCZ",
      "Bipper",
      "Partner",
      "Rifter",
      "Traveller",
      "Ion"
]
  ),
  createBrandWithCars(
    {
      id: "citroen",
      name: "Citroën",
      country: "France",
      founded: "1919",
    },
    [
      {
            "id": "citroen-ds-23-pallas",
            "name": "DS 23 Pallas Hydropneumatic",
            "brand": "Citroën",
            "country": "France",
            "yearIntroduced": 1972,
            "rarity": "Legendary",
            "horsepower": 141,
            "topSpeed": 117,
            "zeroToSixty": 10.4,
            "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Vert Argenté (Silver Green)",
                        "hex": "#4ADE80",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Blanc Meije",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  },
                  {
                        "name": "Bleu Delta",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Noir",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "citroen-2cv6",
            "name": "2CV6 Charleston Two-Tone",
            "brand": "Citroën",
            "country": "France",
            "yearIntroduced": 1981,
            "rarity": "Rare",
            "horsepower": 29,
            "topSpeed": 71,
            "zeroToSixty": 33.5,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Delage Red & Black Charleston",
                        "hex": "#7F1D1D",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Heliotrope Yellow & Black",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Cormorant Grey & Night Grey",
                        "hex": "#64748B",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "citroen-saxo-vts",
            "name": "Saxo VTS 16V Pocket Rocket",
            "brand": "Citroën",
            "country": "France",
            "yearIntroduced": 1996,
            "rarity": "Rare",
            "horsepower": 118,
            "topSpeed": 127,
            "zeroToSixty": 7.7,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Poseidon Blue",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Wicked Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Biarritz Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "citroen-ami-buggy",
            "name": "My Ami Buggy EV Urban",
            "brand": "Citroën",
            "country": "France",
            "yearIntroduced": 2022,
            "rarity": "Uncommon",
            "horsepower": 8,
            "topSpeed": 28,
            "zeroToSixty": 10,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Khaki Green with Yellow Accents",
                        "hex": "#4D7C0F",
                        "baseColor": "Green"
                  }
            ]
      }
],
    [
      "DS 23 Pallas Hydropneumatic",
      "2CV6 Charleston Two-Tone",
      "Saxo VTS 16V Pocket Rocket",
      "My Ami Buggy EV Urban",
      "2CV",
      "AX",
      "Saxo",
      "C1",
      "C2",
      "C3",
      "C3 Aircross",
      "C3 Picasso",
      "C4",
      "C4 Cactus",
      "C4 X",
      "C4 Picasso",
      "Grand C4 Picasso",
      "C4 SpaceTourer",
      "C5",
      "C5 Aircross",
      "C5 X",
      "C6",
      "C8",
      "BX",
      "ZX",
      "Xsara",
      "Xsara Picasso",
      "Xantia",
      "XM",
      "Berlingo",
      "Dispatch",
      "SpaceTourer",
      "Ami",
      "Nemo"
]
  ),
  createBrandWithCars(
    {
      id: "alpine",
      name: "Alpine",
      country: "France",
      founded: "1955",
    },
    [
      {
            "id": "alpine-a110-r",
            "name": "A110 R Carbon Lightweight",
            "brand": "Alpine",
            "country": "France",
            "yearIntroduced": 2022,
            "rarity": "Legendary",
            "horsepower": 300,
            "topSpeed": 177,
            "zeroToSixty": 3.9,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Racing Matte Blue",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Deep Black",
                        "hex": "#0F172A",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Glacier White",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "alpine-a110-1600s",
            "name": "A110 1600S Berlinette Monte Carlo",
            "brand": "Alpine",
            "country": "France",
            "yearIntroduced": 1970,
            "rarity": "Legendary",
            "horsepower": 138,
            "topSpeed": 134,
            "zeroToSixty": 6.9,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Alpine Metallic Blue",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Competition Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  }
            ]
      }
],
    [
      "A110 R Carbon Lightweight",
      "A110 1600S Berlinette Monte Carlo",
      "A110",
      "A290",
      "A610",
      "GTA"
]
  ),
  createBrandWithCars(
    {
      id: "bugatti",
      name: "Bugatti",
      country: "France",
      founded: "1909",
    },
    [
      {
            "id": "bugatti-chiron-super-sport",
            "name": "Chiron Super Sport 300+ W16",
            "brand": "Bugatti",
            "country": "France",
            "yearIntroduced": 2019,
            "rarity": "Legendary",
            "horsepower": 1578,
            "topSpeed": 304,
            "zeroToSixty": 2.3,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Jet Orange & Exposed Carbon Black",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "French Racing Blue & Carbon",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Nocturne Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "bugatti-tourbillon",
            "name": "Tourbillon V16 Cosworth Hybrid",
            "brand": "Bugatti",
            "country": "France",
            "yearIntroduced": 2024,
            "rarity": "Legendary",
            "horsepower": 1800,
            "topSpeed": 276,
            "zeroToSixty": 2,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Argent & French Blue Two-Tone",
                        "hex": "#3B82F6",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Aerolite Silver",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "bugatti-eb110-ss",
            "name": "EB110 Super Sport Quad-Turbo V12",
            "brand": "Bugatti",
            "country": "France",
            "yearIntroduced": 1992,
            "rarity": "Legendary",
            "horsepower": 603,
            "topSpeed": 221,
            "zeroToSixty": 3.2,
            "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Bugatti Blue",
                        "hex": "#1E40AF",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Silver Metallic",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "Chiron Super Sport 300+ W16",
      "Tourbillon V16 Cosworth Hybrid",
      "EB110 Super Sport Quad-Turbo V12"
]
  ),
  createBrandWithCars(
    {
      id: "ds-automobiles",
      name: "DS Automobiles",
      country: "France",
      founded: "2014",
    },
    [
      {
            "id": "ds-9-e-tense-360",
            "name": "DS 9 E-Tense 360 4x4 Opera",
            "brand": "DS Automobiles",
            "country": "France",
            "yearIntroduced": 2021,
            "rarity": "Uncommon",
            "horsepower": 355,
            "topSpeed": 155,
            "zeroToSixty": 5.6,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Midnight Blue",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Crystal Pearl",
                        "hex": "#F1F5F9",
                        "baseColor": "White"
                  },
                  {
                        "name": "Perla Nera Black",
                        "hex": "#0F172A",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "ds-4-rivoli",
            "name": "DS 4 Rivoli E-Tense Hybrid",
            "brand": "DS Automobiles",
            "country": "France",
            "yearIntroduced": 2021,
            "rarity": "Common",
            "horsepower": 222,
            "topSpeed": 145,
            "zeroToSixty": 7.7,
            "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Copper Gold",
                        "hex": "#B45309",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Velvet Red",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Pearl White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "DS 9 E-Tense 360 4x4 Opera",
      "DS 4 Rivoli E-Tense Hybrid",
      "DS 3",
      "DS 3 Crossback",
      "DS 4",
      "DS 4 Crossback",
      "DS 5",
      "DS 7",
      "DS 7 Crossback",
      "DS 9"
]
  ),
  createBrandWithCars(
    {
      id: "dacia",
      name: "Dacia",
      country: "France",
      founded: "1966",
    },
    [
      {
            "id": "dacia-duster-4x4",
            "name": "Duster TCe 150 4x4 Extreme",
            "brand": "Dacia",
            "country": "France",
            "yearIntroduced": 2021,
            "rarity": "Common",
            "horsepower": 148,
            "topSpeed": 123,
            "zeroToSixty": 9.7,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Dusty Khaki with Copper Accents",
                        "hex": "#4D7C0F",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Arizona Orange",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Iron Blue",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "dacia-jogger",
            "name": "Jogger Hybrid 140 Extreme 7-Seater",
            "brand": "Dacia",
            "country": "France",
            "yearIntroduced": 2022,
            "rarity": "Common",
            "horsepower": 140,
            "topSpeed": 111,
            "zeroToSixty": 9.8,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Terracotta Brown",
                        "hex": "#9A3412",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Shadow Grey",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "Duster TCe 150 4x4 Extreme",
      "Jogger Hybrid 140 Extreme 7-Seater",
      "Sandero",
      "Sandero Stepway",
      "Duster",
      "Jogger",
      "Spring",
      "Logan",
      "Logan MCV"
]
  ),
  createBrandWithCars(
    {
      id: "venturi",
      name: "Venturi",
      country: "France",
      founded: "1984",
    },
    [
      {
            "id": "venturi-400-gt",
            "name": "400 GT French Supercar Carbon Brakes",
            "brand": "Venturi",
            "country": "France",
            "yearIntroduced": 1994,
            "rarity": "Legendary",
            "horsepower": 408,
            "topSpeed": 181,
            "zeroToSixty": 4.1,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Bleu de France",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Rouge Racing",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  }
            ]
      }
],
    [
      "400 GT French Supercar Carbon Brakes"
]
  ),
  createBrandWithCars(
    {
      id: "matra",
      name: "Matra",
      country: "France",
      founded: "1964",
    },
    [
      {
            "id": "matra-rancho",
            "name": "Rancho Grand Raid All-Road Trailblazer",
            "brand": "Matra",
            "country": "France",
            "yearIntroduced": 1977,
            "rarity": "Rare",
            "horsepower": 80,
            "topSpeed": 91,
            "zeroToSixty": 15.2,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Colorado Gold",
                        "hex": "#D97706",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Vert Forêt",
                        "hex": "#166534",
                        "baseColor": "Green"
                  }
            ]
      },
      {
            "id": "matra-murena",
            "name": "Murena 2.2 3-Seater Sports Coupé",
            "brand": "Matra",
            "country": "France",
            "yearIntroduced": 1980,
            "rarity": "Rare",
            "horsepower": 118,
            "topSpeed": 122,
            "zeroToSixty": 9.3,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Rouge Mephisto",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Platine Silver",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "Rancho Grand Raid All-Road Trailblazer",
      "Murena 2.2 3-Seater Sports Coupé"
]
  ),
  createBrandWithCars(
    {
      id: "aixam",
      name: "Aixam",
      country: "France",
      founded: "1983",
    },
    [
      {
        "id": "aixam-city",
        "name": "City",
        "brand": "Aixam",
        "country": "France",
        "yearIntroduced": 2008,
        "rarity": "Common",
        "horsepower": 8,
        "topSpeed": 28,
        "zeroToSixty": 12.0,
        "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
        "colorVariants": [
          {
            "name": "Garnet Red",
            "hex": "#991B1B",
            "baseColor": "Red"
          },
          {
            "name": "Titanium Grey",
            "hex": "#64748B",
            "baseColor": "Grey"
          },
          {
            "name": "Pure White",
            "hex": "#F8FAFC",
            "baseColor": "White"
          },
          {
            "name": "Steel Blue",
            "hex": "#1E3A8A",
            "baseColor": "Blue"
          }
        ]
      },
      {
        "id": "aixam-coupe",
        "name": "Coupé",
        "brand": "Aixam",
        "country": "France",
        "yearIntroduced": 2011,
        "rarity": "Common",
        "horsepower": 8,
        "topSpeed": 28,
        "zeroToSixty": 11.5,
        "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
        "colorVariants": [
          {
            "name": "Metallic Grey",
            "hex": "#4B5563",
            "baseColor": "Grey"
          },
          {
            "name": "Sapphire Blue",
            "hex": "#2563EB",
            "baseColor": "Blue"
          },
          {
            "name": "Pearl White",
            "hex": "#F1F5F9",
            "baseColor": "White"
          }
        ]
      },
      {
        "id": "aixam-crossline-crossover",
        "name": "Crossline/Crossover",
        "brand": "Aixam",
        "country": "France",
        "yearIntroduced": 2005,
        "rarity": "Common",
        "horsepower": 8,
        "topSpeed": 28,
        "zeroToSixty": 13.0,
        "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
        "colorVariants": [
          {
            "name": "Matte Grey",
            "hex": "#374151",
            "baseColor": "Grey"
          },
          {
            "name": "Desert Sand",
            "hex": "#D97706",
            "baseColor": "Orange"
          },
          {
            "name": "Glacier White",
            "hex": "#F8FAFC",
            "baseColor": "White"
          }
        ]
      },
      {
        "id": "aixam-pro",
        "name": "Pro",
        "brand": "Aixam",
        "country": "France",
        "yearIntroduced": 2010,
        "rarity": "Common",
        "horsepower": 8,
        "topSpeed": 28,
        "zeroToSixty": 14.0,
        "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
        "colorVariants": [
          {
            "name": "Polar White",
            "hex": "#FFFFFF",
            "baseColor": "White"
          },
          {
            "name": "Urban Grey",
            "hex": "#6B7280",
            "baseColor": "Grey"
          }
        ]
      }
    ],
    [
      "City",
      "Coupé",
      "Crossline/Crossover",
      "Pro"
    ]
  ),
  createBrandWithCars(
    {
      id: "ligier",
      name: "Ligier",
      country: "France",
      founded: "1968",
    },
    [
      {
            "id": "ligier-js50-sport",
            "name": "JS50 Sport Ultimate DCI",
            "brand": "Ligier",
            "country": "France",
            "yearIntroduced": 2022,
            "rarity": "Common",
            "horsepower": 8,
            "topSpeed": 28,
            "zeroToSixty": 12,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Asphalt Grey with Red Decals",
                        "hex": "#374151",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Pure White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "ligier-js2-r",
            "name": "JS2 R Endurance Cup Racer",
            "brand": "Ligier",
            "country": "France",
            "yearIntroduced": 2019,
            "rarity": "Legendary",
            "horsepower": 330,
            "topSpeed": 175,
            "zeroToSixty": 3.8,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Ligier French Blue Racing Livery",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "JS50 Sport Ultimate DCI",
      "JS2 R Endurance Cup Racer"
]
  ),
  createBrandWithCars(
    {
      id: "simca",
      name: "Simca",
      country: "France",
      founded: "1934",
    },
    [],
    [
      "1000",
      "1100",
      "1301",
      "1501",
      "1307",
      "Aronde",
      "Vedette",
      "Chambord",
    ]
  ),
  createBrandWithCars(
    {
      id: "facel-vega",
      name: "Facel Vega",
      country: "France",
      founded: "1954",
    },
    [],
    [
      "FV",
      "HK500",
      "Facel II",
      "Facellia",
      "Excellence",
    ]
  ),
  createBrandWithCars(
    {
      id: "panhard",
      name: "Panhard",
      country: "France",
      founded: "1891",
    },
    [],
    [
      "Dyna Z",
      "PL 17",
      "24 CT",
      "Dyna X",
    ]
  ),
  createBrandWithCars(
    {
      id: "pgo",
      name: "PGO",
      country: "France",
      founded: "1985",
    },
    [],
    [
      "Speedster II",
      "Cévennes",
      "Hemera",
    ]
  ),
  createBrandWithCars(
    {
      id: "microcar",
      name: "Microcar",
      country: "France",
      founded: "1984",
    },
    [],
    [
      "M.Go",
      "Dué",
      "Virgo",
      "MC1",
      "MC2",
    ]
  ),
  createBrandWithCars(
    {
      id: "chatenet",
      name: "Chatenet",
      country: "France",
      founded: "1984",
    },
    [],
    [
      "CH40",
      "CH46",
      "Media",
      "Barooder",
      "Speedino",
    ]
  ),
  createBrandWithCars(
    {
      id: "mega",
      name: "Mega",
      country: "France",
      founded: "1992",
    },
    [],
    [
      "Track",
      "Monte Carlo",
      "Club",
      "Ranch",
    ]
  ),
  createBrandWithCars(
    {
      id: "talbot-lago",
      name: "Talbot-Lago",
      country: "France",
      founded: "1935",
    },
    [],
    [
      "T150",
      "T26 Record",
      "Grand Sport",
    ]
  ),
];
