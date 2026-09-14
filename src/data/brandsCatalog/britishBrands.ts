import { BrandInfo } from '../../types';
import { createBrandWithCars } from './carFactory';

export const BRITISH_BRANDS: BrandInfo[] = [
  createBrandWithCars(
    {
      id: "aston-martin",
      name: "Aston Martin",
      country: "United Kingdom",
      founded: "1913",
    },
    [
      {
            "id": "aston-dbs-superleggera",
            "name": "DBS Superleggera V12",
            "brand": "Aston Martin",
            "country": "United Kingdom",
            "yearIntroduced": 2018,
            "rarity": "Legendary",
            "horsepower": 715,
            "topSpeed": 211,
            "zeroToSixty": 3.4,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Xenon Grey",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Hyper Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Onyx Black",
                        "hex": "#111827",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Cosmos Blue",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "aston-vantage-f1",
            "name": "Vantage F1 Edition",
            "brand": "Aston Martin",
            "country": "United Kingdom",
            "yearIntroduced": 2021,
            "rarity": "Epic",
            "horsepower": 527,
            "topSpeed": 195,
            "zeroToSixty": 3.6,
            "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Aston Martin Racing Green",
                        "hex": "#064E3B",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Lunar White",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  },
                  {
                        "name": "Jet Black",
                        "hex": "#000000",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "aston-db12",
            "name": "DB12 Super Tourer",
            "brand": "Aston Martin",
            "country": "United Kingdom",
            "yearIntroduced": 2023,
            "rarity": "Legendary",
            "horsepower": 671,
            "topSpeed": 202,
            "zeroToSixty": 3.5,
            "image": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Storm Purple",
                        "hex": "#4C1D95",
                        "baseColor": "Purple"
                  },
                  {
                        "name": "Minotaur Green",
                        "hex": "#14532D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Magnetic Silver",
                        "hex": "#64748B",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "aston-dbx707",
            "name": "DBX707 V8 Super SUV",
            "brand": "Aston Martin",
            "country": "United Kingdom",
            "yearIntroduced": 2022,
            "rarity": "Epic",
            "horsepower": 697,
            "topSpeed": 193,
            "zeroToSixty": 3.1,
            "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Apex Grey",
                        "hex": "#334155",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "China Grey",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Plasma Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "aston-valkyrie",
            "name": "Valkyrie V12 Hypercar",
            "brand": "Aston Martin",
            "country": "United Kingdom",
            "yearIntroduced": 2021,
            "rarity": "Legendary",
            "horsepower": 1160,
            "topSpeed": 250,
            "zeroToSixty": 2.5,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "British Racing Green",
                        "hex": "#047857",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Skyfall Silver",
                        "hex": "#9CA3AF",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "DBS Superleggera V12",
      "Vantage F1 Edition",
      "DB12 Super Tourer",
      "DBX707 V8 Super SUV",
      "Valkyrie V12 Hypercar",
      "DB7",
      "DB9",
      "DB11",
      "DB12",
      "DBS",
      "DBS Superleggera",
      "Vanquish",
      "Vantage",
      "V8 Vantage",
      "V12 Vantage",
      "Virage",
      "Rapide",
      "DBX",
      "Cygnet",
      "One-77",
      "Valkyrie",
      "Valour"
]
  ),
  createBrandWithCars(
    {
      id: "bentley",
      name: "Bentley",
      country: "United Kingdom",
      founded: "1919",
    },
    [
      {
            "id": "bentley-continental-gt",
            "name": "Continental GT Speed W12",
            "brand": "Bentley",
            "country": "United Kingdom",
            "yearIntroduced": 2021,
            "rarity": "Legendary",
            "horsepower": 650,
            "topSpeed": 208,
            "zeroToSixty": 3.5,
            "image": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Candy Red",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Anthracite Satin",
                        "hex": "#1E293B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Silver Frost",
                        "hex": "#E2E8F0",
                        "baseColor": "White"
                  },
                  {
                        "name": "Verdant Green",
                        "hex": "#065F46",
                        "baseColor": "Green"
                  }
            ]
      },
      {
            "id": "bentley-bentayga-speed",
            "name": "Bentayga Speed",
            "brand": "Bentley",
            "country": "United Kingdom",
            "yearIntroduced": 2020,
            "rarity": "Epic",
            "horsepower": 626,
            "topSpeed": 190,
            "zeroToSixty": 3.8,
            "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Dragon Red II",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Beluga Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Sequin Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "bentley-flying-spur",
            "name": "Flying Spur Mulliner",
            "brand": "Bentley",
            "country": "United Kingdom",
            "yearIntroduced": 2022,
            "rarity": "Legendary",
            "horsepower": 626,
            "topSpeed": 207,
            "zeroToSixty": 3.7,
            "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Dark Sapphire",
                        "hex": "#172554",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Glacier White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  },
                  {
                        "name": "Hallmark Silver",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "Continental GT Speed W12",
      "Bentayga Speed",
      "Flying Spur Mulliner",
      "Continental GT",
      "Continental GTC",
      "Continental Flying Spur",
      "Flying Spur",
      "Bentayga",
      "Mulsanne",
      "Arnage",
      "Brooklands",
      "Azure",
      "Turbo R",
      "Eight",
      "Continental R",
      "Continental T"
]
  ),
  createBrandWithCars(
    {
      id: "jaguar",
      name: "Jaguar",
      country: "United Kingdom",
      founded: "1922",
    },
    [
      {
            "id": "jaguar-ftype-r",
            "name": "F-Type R V8 Supercharged",
            "brand": "Jaguar",
            "country": "United Kingdom",
            "yearIntroduced": 2020,
            "rarity": "Epic",
            "horsepower": 575,
            "topSpeed": 186,
            "zeroToSixty": 3.5,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "British Racing Green",
                        "hex": "#064E3B",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Firenze Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Santorini Black",
                        "hex": "#0F172A",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Fuji White",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "jaguar-etype",
            "name": "E-Type Series 1 3.8",
            "brand": "Jaguar",
            "country": "United Kingdom",
            "yearIntroduced": 1961,
            "rarity": "Legendary",
            "horsepower": 265,
            "topSpeed": 150,
            "zeroToSixty": 6.9,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Carmen Red",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Opalescent Silver Blue",
                        "hex": "#38BDF8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "British Racing Green",
                        "hex": "#14532D",
                        "baseColor": "Green"
                  }
            ]
      },
      {
            "id": "jaguar-fpace-svr",
            "name": "F-Pace SVR Edition 1988",
            "brand": "Jaguar",
            "country": "United Kingdom",
            "yearIntroduced": 2022,
            "rarity": "Rare",
            "horsepower": 550,
            "topSpeed": 178,
            "zeroToSixty": 3.8,
            "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Midnight Amethyst",
                        "hex": "#3B0764",
                        "baseColor": "Purple"
                  },
                  {
                        "name": "Ultra Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Hakuba Silver",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "jaguar-ipace",
            "name": "I-Pace EV400 AWD",
            "brand": "Jaguar",
            "country": "United Kingdom",
            "yearIntroduced": 2018,
            "rarity": "Common",
            "horsepower": 395,
            "topSpeed": 124,
            "zeroToSixty": 4.5,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Caesium Blue",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Eiger Grey",
                        "hex": "#475569",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Fuji White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "F-Type R V8 Supercharged",
      "E-Type Series 1 3.8",
      "F-Pace SVR Edition 1988",
      "I-Pace EV400 AWD",
      "X-Type",
      "S-Type",
      "XF",
      "XJ",
      "XE",
      "XK",
      "XK8",
      "XKR",
      "F-Type",
      "E-Pace",
      "F-Pace",
      "I-Pace",
      "XJ220",
      "XJS"
]
  ),
  createBrandWithCars(
    {
      id: "land-rover",
      name: "Land Rover",
      country: "United Kingdom",
      founded: "1948",
    },
    [
      {
            "id": "land-rover-defender-90",
            "name": "Defender 90 V8 Carpathian",
            "brand": "Land Rover",
            "country": "United Kingdom",
            "yearIntroduced": 2021,
            "rarity": "Epic",
            "horsepower": 518,
            "topSpeed": 149,
            "zeroToSixty": 4.9,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Carpathian Grey",
                        "hex": "#374151",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Pangea Green",
                        "hex": "#3F6212",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Tasman Blue",
                        "hex": "#1E40AF",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Fuji White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "land-rover-discovery",
            "name": "Discovery 5 D300",
            "brand": "Land Rover",
            "country": "United Kingdom",
            "yearIntroduced": 2017,
            "rarity": "Common",
            "horsepower": 296,
            "topSpeed": 130,
            "zeroToSixty": 6.5,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Lantau Bronze",
                        "hex": "#78350F",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Charente Grey",
                        "hex": "#475569",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Fuji White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "land-rover-series3",
            "name": "Series III 88 Classic",
            "brand": "Land Rover",
            "country": "United Kingdom",
            "yearIntroduced": 1971,
            "rarity": "Rare",
            "horsepower": 68,
            "topSpeed": 65,
            "zeroToSixty": 24,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Marine Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Bronze Green",
                        "hex": "#166534",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Limestone",
                        "hex": "#F1F5F9",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "Defender 90 V8 Carpathian",
      "Discovery 5 D300",
      "Series III 88 Classic",
      "Defender",
      "Discovery",
      "Discovery Sport",
      "Freelander",
      "Range Rover",
      "Range Rover Sport",
      "Range Rover Velar",
      "Range Rover Evoque"
]
  ),
  createBrandWithCars(
    {
      id: "range-rover",
      name: "Range Rover",
      country: "United Kingdom",
      founded: "1970",
    },
    [
      {
            "id": "range-rover-sport-sv",
            "name": "Range Rover Sport SV Edition One",
            "brand": "Range Rover",
            "country": "United Kingdom",
            "yearIntroduced": 2023,
            "rarity": "Legendary",
            "horsepower": 626,
            "topSpeed": 180,
            "zeroToSixty": 3.6,
            "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Carbon Bronze",
                        "hex": "#78350F",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Obsidian Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Flux Silver",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "range-rover-autobiography",
            "name": "Range Rover Autobiography P530",
            "brand": "Range Rover",
            "country": "United Kingdom",
            "yearIntroduced": 2022,
            "rarity": "Epic",
            "horsepower": 523,
            "topSpeed": 155,
            "zeroToSixty": 4.4,
            "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Batumi Gold",
                        "hex": "#D97706",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Belgravia Green",
                        "hex": "#14532D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Santorini Black",
                        "hex": "#18181B",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "range-rover-evoque",
            "name": "Range Rover Evoque P300e",
            "brand": "Range Rover",
            "country": "United Kingdom",
            "yearIntroduced": 2011,
            "rarity": "Common",
            "horsepower": 305,
            "topSpeed": 132,
            "zeroToSixty": 6.1,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Seoul Pearl Silver",
                        "hex": "#E2E8F0",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Tribeca Blue",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Corinthian Bronze",
                        "hex": "#92400E",
                        "baseColor": "Orange"
                  }
            ]
      }
],
    [
      "Range Rover Sport SV Edition One",
      "Range Rover Autobiography P530",
      "Range Rover Evoque P300e"
]
  ),
  createBrandWithCars(
    {
      id: "lotus",
      name: "Lotus",
      country: "United Kingdom",
      founded: "1948",
    },
    [
      {
            "id": "lotus-emira-v6",
            "name": "Emira V6 First Edition",
            "brand": "Lotus",
            "country": "United Kingdom",
            "yearIntroduced": 2022,
            "rarity": "Epic",
            "horsepower": 400,
            "topSpeed": 180,
            "zeroToSixty": 4.2,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Senna Yellow",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Magma Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Hethel Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Dark Verdant",
                        "hex": "#064E3B",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Shadow Grey",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "lotus-elise-cup-250",
            "name": "Elise Cup 250",
            "brand": "Lotus",
            "country": "United Kingdom",
            "yearIntroduced": 2016,
            "rarity": "Rare",
            "horsepower": 243,
            "topSpeed": 154,
            "zeroToSixty": 3.9,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Vivid Green",
                        "hex": "#22C55E",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Solar Yellow",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Metallic Orange",
                        "hex": "#F97316",
                        "baseColor": "Orange"
                  }
            ]
      },
      {
            "id": "lotus-eletre",
            "name": "Eletre R Hyper-SUV",
            "brand": "Lotus",
            "country": "United Kingdom",
            "yearIntroduced": 2023,
            "rarity": "Legendary",
            "horsepower": 905,
            "topSpeed": 165,
            "zeroToSixty": 2.9,
            "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Kaimu Grey",
                        "hex": "#1E293B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Galloway Green",
                        "hex": "#065F46",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Solar Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  }
            ]
      }
],
    [
      "Emira V6 First Edition",
      "Elise Cup 250",
      "Eletre R Hyper-SUV",
      "Elise",
      "Exige",
      "Evora",
      "Emira",
      "Eletre",
      "Emeya",
      "Esprit",
      "Europa",
      "Elan",
      "340R",
      "2-Eleven"
]
  ),
  createBrandWithCars(
    {
      id: "mclaren",
      name: "McLaren",
      country: "United Kingdom",
      founded: "1963",
    },
    [
      {
            "id": "mclaren-765lt",
            "name": "765LT Spider",
            "brand": "McLaren",
            "country": "United Kingdom",
            "yearIntroduced": 2021,
            "rarity": "Legendary",
            "horsepower": 755,
            "topSpeed": 205,
            "zeroToSixty": 2.7,
            "image": "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Papaya Spark",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Amethyst Black",
                        "hex": "#1F2937",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Sarthe Grey",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Paris Blue",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "mclaren-720s",
            "name": "720S Coupé",
            "brand": "McLaren",
            "country": "United Kingdom",
            "yearIntroduced": 2017,
            "rarity": "Legendary",
            "horsepower": 710,
            "topSpeed": 212,
            "zeroToSixty": 2.8,
            "image": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Memphis Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Silica White",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  },
                  {
                        "name": "Azores Orange",
                        "hex": "#F97316",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Belize Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "mclaren-artura",
            "name": "Artura V6 Hybrid",
            "brand": "McLaren",
            "country": "United Kingdom",
            "yearIntroduced": 2022,
            "rarity": "Epic",
            "horsepower": 671,
            "topSpeed": 205,
            "zeroToSixty": 3,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Flux Green",
                        "hex": "#84CC16",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Ember Orange",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Plateau Grey",
                        "hex": "#6B7280",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "mclaren-p1",
            "name": "P1 Ultimate Series Hypercar",
            "brand": "McLaren",
            "country": "United Kingdom",
            "yearIntroduced": 2013,
            "rarity": "Legendary",
            "horsepower": 903,
            "topSpeed": 217,
            "zeroToSixty": 2.7,
            "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Volcano Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Volcano Orange",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Fire Black",
                        "hex": "#18181B",
                        "baseColor": "Black"
                  }
            ]
      }
],
    [
      "765LT Spider",
      "720S Coupé",
      "Artura V6 Hybrid",
      "P1 Ultimate Series Hypercar",
      "12C",
      "650S",
      "675LT",
      "540C",
      "570S",
      "570GT",
      "600LT",
      "720S",
      "765LT",
      "750S",
      "GT",
      "Artura",
      "P1",
      "Senna",
      "Speedtail",
      "Elva",
      "W1",
      "F1"
]
  ),
  createBrandWithCars(
    {
      id: "mini",
      name: "MINI",
      country: "United Kingdom",
      founded: "1959",
    },
    [
      {
            "id": "mini-jcw-gp",
            "name": "John Cooper Works GP (GP3)",
            "brand": "MINI",
            "country": "United Kingdom",
            "yearIntroduced": 2020,
            "rarity": "Epic",
            "horsepower": 301,
            "topSpeed": 165,
            "zeroToSixty": 5,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Racing Grey Metallic",
                        "hex": "#475569",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Chili Red Accents",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Melting Silver",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "mini-cooper-s",
            "name": "Cooper S 3-Door Hatch",
            "brand": "MINI",
            "country": "United Kingdom",
            "yearIntroduced": 2001,
            "rarity": "Common",
            "horsepower": 189,
            "topSpeed": 146,
            "zeroToSixty": 6.5,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "British Racing Green IV",
                        "hex": "#166534",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Chili Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Island Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Pepper White",
                        "hex": "#FEF3C7",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "mini-classic-cooper",
            "name": "Classic Mini Cooper S 1275",
            "brand": "MINI",
            "country": "United Kingdom",
            "yearIntroduced": 1963,
            "rarity": "Rare",
            "horsepower": 76,
            "topSpeed": 97,
            "zeroToSixty": 10.5,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Tartan Red with Old English White Roof",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Almond Green",
                        "hex": "#4D7C0F",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Surf Blue",
                        "hex": "#38BDF8",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "John Cooper Works GP (GP3)",
      "Cooper S 3-Door Hatch",
      "Classic Mini Cooper S 1275",
      "Hatch",
      "Clubman",
      "Countryman",
      "Paceman",
      "Coupe",
      "Roadster",
      "Convertible",
      "Aceman"
]
  ),
  createBrandWithCars(
    {
      id: "rolls-royce",
      name: "Rolls-Royce",
      country: "United Kingdom",
      founded: "1904",
    },
    [
      {
            "id": "rolls-royce-phantom",
            "name": "Phantom VIII Extended",
            "brand": "Rolls-Royce",
            "country": "United Kingdom",
            "yearIntroduced": 2017,
            "rarity": "Legendary",
            "horsepower": 563,
            "topSpeed": 155,
            "zeroToSixty": 5.1,
            "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Diamond Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "English White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  },
                  {
                        "name": "Salamanca Blue",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Belladonna Purple",
                        "hex": "#581C87",
                        "baseColor": "Purple"
                  }
            ]
      },
      {
            "id": "rolls-royce-spectre",
            "name": "Spectre Ultra-Luxury EV",
            "brand": "Rolls-Royce",
            "country": "United Kingdom",
            "yearIntroduced": 2023,
            "rarity": "Legendary",
            "horsepower": 577,
            "topSpeed": 155,
            "zeroToSixty": 4.4,
            "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Chartreuse & Black Two-Tone",
                        "hex": "#84CC16",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Morganite Pinkish Bronze",
                        "hex": "#FB7185",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Tempest Grey",
                        "hex": "#64748B",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "rolls-royce-cullinan",
            "name": "Cullinan Black Badge SUV",
            "brand": "Rolls-Royce",
            "country": "United Kingdom",
            "yearIntroduced": 2018,
            "rarity": "Legendary",
            "horsepower": 592,
            "topSpeed": 155,
            "zeroToSixty": 4.9,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Forge Yellow & Black",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Infinity Black",
                        "hex": "#020617",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Dark Emerald",
                        "hex": "#064E3B",
                        "baseColor": "Green"
                  }
            ]
      }
],
    [
      "Phantom VIII Extended",
      "Spectre Ultra-Luxury EV",
      "Cullinan Black Badge SUV",
      "Phantom",
      "Ghost",
      "Wraith",
      "Dawn",
      "Cullinan",
      "Spectre",
      "Silver Spirit",
      "Silver Spur",
      "Silver Seraph",
      "Corniche",
      "Camargue"
]
  ),
  createBrandWithCars(
    {
      id: "vauxhall",
      name: "Vauxhall",
      country: "United Kingdom",
      founded: "1857",
    },
    [
      {
            "id": "vauxhall-lotus-carlton",
            "name": "Lotus Carlton 3.6 Biturbo",
            "brand": "Vauxhall",
            "country": "United Kingdom",
            "yearIntroduced": 1990,
            "rarity": "Legendary",
            "horsepower": 377,
            "topSpeed": 177,
            "zeroToSixty": 5.1,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Imperial Green",
                        "hex": "#022C22",
                        "baseColor": "Green"
                  }
            ]
      },
      {
            "id": "vauxhall-vxr8-gts",
            "name": "VXR8 GTS 6.2 Supercharged",
            "brand": "Vauxhall",
            "country": "United Kingdom",
            "yearIntroduced": 2013,
            "rarity": "Rare",
            "horsepower": 577,
            "topSpeed": 155,
            "zeroToSixty": 4.2,
            "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Sting Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Phantom Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Heron White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "vauxhall-astra-vxr",
            "name": "Astra VXR GTC",
            "brand": "Vauxhall",
            "country": "United Kingdom",
            "yearIntroduced": 2012,
            "rarity": "Common",
            "horsepower": 276,
            "topSpeed": 155,
            "zeroToSixty": 5.9,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Arden Blue",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Power Red",
                        "hex": "#EF4444",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Summit White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  },
                  {
                        "name": "Carbon Flash",
                        "hex": "#18181B",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "vauxhall-corsa-vxr",
            "name": "Corsa VXR Nürburgring Edition",
            "brand": "Vauxhall",
            "country": "United Kingdom",
            "yearIntroduced": 2011,
            "rarity": "Uncommon",
            "horsepower": 202,
            "topSpeed": 143,
            "zeroToSixty": 6.5,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Grasshopper Green",
                        "hex": "#84CC16",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Henna Orange",
                        "hex": "#EA580C",
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
            "id": "vauxhall-mokka-electric",
            "name": "Mokka Electric Ultimate",
            "brand": "Vauxhall",
            "country": "United Kingdom",
            "yearIntroduced": 2020,
            "rarity": "Common",
            "horsepower": 154,
            "topSpeed": 93,
            "zeroToSixty": 9,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Mamba Green",
                        "hex": "#22C55E",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Voltaic Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Quartz Grey",
                        "hex": "#64748B",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "Lotus Carlton 3.6 Biturbo",
      "VXR8 GTS 6.2 Supercharged",
      "Astra VXR GTC",
      "Corsa VXR Nürburgring Edition",
      "Mokka Electric Ultimate",
      "Corsa",
      "Astra",
      "Vectra",
      "Insignia",
      "Nova",
      "Cavalier",
      "Carlton",
      "Senator",
      "Royale",
      "Belmont",
      "Viva",
      "Adam",
      "Agila",
      "Tigra",
      "Calibra",
      "VX220",
      "Monaro",
      "VXR8",
      "Mokka",
      "Crossland",
      "Grandland",
      "Frontera",
      "Monterey",
      "Antara",
      "Meriva",
      "Zafira",
      "Sintra",
      "Combo Life",
      "Vivaro Life"
]
  ),
  createBrandWithCars(
    {
      id: "mg",
      name: "MG",
      country: "United Kingdom",
      founded: "1924",
    },
    [
      {
            "id": "mg4-xpower",
            "name": "MG4 EV XPOWER AWD",
            "brand": "MG",
            "country": "United Kingdom",
            "yearIntroduced": 2023,
            "rarity": "Uncommon",
            "horsepower": 429,
            "topSpeed": 124,
            "zeroToSixty": 3.7,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Racing Green Matte",
                        "hex": "#14532D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Camden Grey",
                        "hex": "#475569",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Dynamic Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Holborn Blue",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "mg-cyberster",
            "name": "Cyberster GT Roadster",
            "brand": "MG",
            "country": "United Kingdom",
            "yearIntroduced": 2024,
            "rarity": "Rare",
            "horsepower": 503,
            "topSpeed": 125,
            "zeroToSixty": 3.2,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Inca Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Dynamic Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "English White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "mg-mgb-roadster",
            "name": "MGB Roadster Classic",
            "brand": "MG",
            "country": "United Kingdom",
            "yearIntroduced": 1962,
            "rarity": "Rare",
            "horsepower": 95,
            "topSpeed": 105,
            "zeroToSixty": 11.2,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "British Racing Green",
                        "hex": "#15803D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Damask Red",
                        "hex": "#7F1D1D",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Primrose Yellow",
                        "hex": "#FEF08A",
                        "baseColor": "Yellow"
                  }
            ]
      },
      {
            "id": "mg-zs-ev",
            "name": "ZS EV Trophy",
            "brand": "MG",
            "country": "United Kingdom",
            "yearIntroduced": 2019,
            "rarity": "Common",
            "horsepower": 154,
            "topSpeed": 108,
            "zeroToSixty": 8.2,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Battersea Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Arctic White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  },
                  {
                        "name": "Black Pearl",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  }
            ]
      }
],
    [
      "MG4 EV XPOWER AWD",
      "Cyberster GT Roadster",
      "MGB Roadster Classic",
      "ZS EV Trophy",
      "MG3",
      "MG4 EV",
      "MG5 EV",
      "MG6",
      "ZS",
      "HS",
      "Cyberster",
      "TF",
      "MGF",
      "ZR",
      "ZT",
      "MGB",
      "RV8",
      "Metro",
      "Maestro",
      "Montego"
]
  ),
  createBrandWithCars(
    {
      id: "caterham",
      name: "Caterham",
      country: "United Kingdom",
      founded: "1973",
    },
    [
      {
            "id": "caterham-seven-620r",
            "name": "Seven 620R Supercharged",
            "brand": "Caterham",
            "country": "United Kingdom",
            "yearIntroduced": 2013,
            "rarity": "Legendary",
            "horsepower": 310,
            "topSpeed": 155,
            "zeroToSixty": 2.79,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Acid Green",
                        "hex": "#84CC16",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Hyper Orange",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Gunmetal Grey",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "caterham-seven-360",
            "name": "Seven 360 Duratec",
            "brand": "Caterham",
            "country": "United Kingdom",
            "yearIntroduced": 2014,
            "rarity": "Rare",
            "horsepower": 180,
            "topSpeed": 130,
            "zeroToSixty": 4.8,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Gulf Blue & Orange",
                        "hex": "#38BDF8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "British Racing Green",
                        "hex": "#14532D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Vintage White",
                        "hex": "#FEF3C7",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "Seven 620R Supercharged",
      "Seven 360 Duratec",
      "Seven",
      "21"
]
  ),
  createBrandWithCars(
    {
      id: "tvr",
      name: "TVR",
      country: "United Kingdom",
      founded: "1947",
    },
    [
      {
            "id": "tvr-sagaris",
            "name": "Sagaris 4.0 Speed Six",
            "brand": "TVR",
            "country": "United Kingdom",
            "yearIntroduced": 2005,
            "rarity": "Legendary",
            "horsepower": 400,
            "topSpeed": 185,
            "zeroToSixty": 3.7,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Chameleon Orange/Purple",
                        "hex": "#C026D3",
                        "baseColor": "Purple"
                  },
                  {
                        "name": "Reflex Charcoal",
                        "hex": "#334155",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Formula Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  }
            ]
      },
      {
            "id": "tvr-cerbera",
            "name": "Cerbera 4.5 V8 AJP8",
            "brand": "TVR",
            "country": "United Kingdom",
            "yearIntroduced": 1997,
            "rarity": "Rare",
            "horsepower": 420,
            "topSpeed": 195,
            "zeroToSixty": 3.9,
            "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Cascade Indigo",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Starmist Crimson",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Silver Stardust",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "tvr-tuscan",
            "name": "Tuscan Speed Six",
            "brand": "TVR",
            "country": "United Kingdom",
            "yearIntroduced": 1999,
            "rarity": "Rare",
            "horsepower": 360,
            "topSpeed": 180,
            "zeroToSixty": 4.2,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Chameleon Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Sunset Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  }
            ]
      }
],
    [
      "Sagaris 4.0 Speed Six",
      "Cerbera 4.5 V8 AJP8",
      "Tuscan Speed Six",
      "Chimaera",
      "Griffith",
      "Cerbera",
      "Tuscan",
      "Tamora",
      "T350",
      "Sagaris",
      "S-Series",
      "Tasmin"
]
  ),
  createBrandWithCars(
    {
      id: "morgan",
      name: "Morgan",
      country: "United Kingdom",
      founded: "1909",
    },
    [
      {
            "id": "morgan-plus-six",
            "name": "Plus Six BMW B58 Turbo",
            "brand": "Morgan",
            "country": "United Kingdom",
            "yearIntroduced": 2019,
            "rarity": "Rare",
            "horsepower": 335,
            "topSpeed": 166,
            "zeroToSixty": 4.2,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Malvern Silver",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Sport Blue",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Brunswick Green",
                        "hex": "#14532D",
                        "baseColor": "Green"
                  }
            ]
      },
      {
            "id": "morgan-super-3",
            "name": "Super 3 Tricycle",
            "brand": "Morgan",
            "country": "United Kingdom",
            "yearIntroduced": 2022,
            "rarity": "Rare",
            "horsepower": 118,
            "topSpeed": 130,
            "zeroToSixty": 7,
            "image": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Desert Sand",
                        "hex": "#D97706",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "RAF Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Matt Olive",
                        "hex": "#4D7C0F",
                        "baseColor": "Green"
                  }
            ]
      }
],
    [
      "Plus Six BMW B58 Turbo",
      "Super 3 Tricycle",
      "Plus Four",
      "Plus Six",
      "Plus 8",
      "4/4",
      "Roadster",
      "Aero 8",
      "Super 3",
      "3-Wheeler"
]
  ),
  createBrandWithCars(
    {
      id: "ariel",
      name: "Ariel",
      country: "United Kingdom",
      founded: "1991",
    },
    [
      {
            "id": "ariel-atom-4",
            "name": "Atom 4 Turbo Honda K20C",
            "brand": "Ariel",
            "country": "United Kingdom",
            "yearIntroduced": 2018,
            "rarity": "Legendary",
            "horsepower": 320,
            "topSpeed": 162,
            "zeroToSixty": 2.8,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Chassis Black with Orange",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Chassis Red with Carbon",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  }
            ]
      },
      {
            "id": "ariel-nomad",
            "name": "Nomad All-Terrain",
            "brand": "Ariel",
            "country": "United Kingdom",
            "yearIntroduced": 2015,
            "rarity": "Rare",
            "horsepower": 235,
            "topSpeed": 125,
            "zeroToSixty": 3.4,
            "image": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Kevlar Green",
                        "hex": "#15803D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Tactical Tan",
                        "hex": "#B45309",
                        "baseColor": "Orange"
                  }
            ]
      }
],
    [
      "Atom 4 Turbo Honda K20C",
      "Nomad All-Terrain",
      "Atom",
      "Nomad",
      "Hipercar"
]
  ),
  createBrandWithCars(
    {
      id: "bac",
      name: "BAC",
      country: "United Kingdom",
      founded: "2009",
    },
    [
      {
            "id": "bac-mono-r",
            "name": "Mono R Single-Seater",
            "brand": "BAC",
            "country": "United Kingdom",
            "yearIntroduced": 2019,
            "rarity": "Legendary",
            "horsepower": 343,
            "topSpeed": 170,
            "zeroToSixty": 2.5,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Apex White & Red",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  },
                  {
                        "name": "Graphene Grey",
                        "hex": "#1E293B",
                        "baseColor": "Black"
                  }
            ]
      }
],
    [
      "Mono R Single-Seater",
      "Mono"
]
  ),
  createBrandWithCars(
    {
      id: "radical",
      name: "Radical",
      country: "United Kingdom",
      founded: "1997",
    },
    [
      {
            "id": "radical-sr3-xxr",
            "name": "SR3 XXR Track Weapon",
            "brand": "Radical",
            "country": "United Kingdom",
            "yearIntroduced": 2022,
            "rarity": "Rare",
            "horsepower": 232,
            "topSpeed": 141,
            "zeroToSixty": 3.1,
            "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Daytona Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Gulf Orange",
                        "hex": "#F97316",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Monza Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  }
            ]
      }
],
    [
      "SR3 XXR Track Weapon",
      "SR1",
      "SR3",
      "SR8",
      "SR10",
      "RXC"
]
  ),
  createBrandWithCars(
    {
      id: "westfield",
      name: "Westfield",
      country: "United Kingdom",
      founded: "1982",
    },
    [
      {
            "id": "westfield-sport-250",
            "name": "Sport 250 EcoBoost",
            "brand": "Westfield",
            "country": "United Kingdom",
            "yearIntroduced": 2016,
            "rarity": "Rare",
            "horsepower": 252,
            "topSpeed": 145,
            "zeroToSixty": 3.6,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Viper Blue",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Chrome Yellow",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  }
            ]
      }
],
    [
      "Sport 250 EcoBoost",
      "SE",
      "SEi",
      "Sport 250",
      "Megabusa",
      "XI"
]
  ),
  createBrandWithCars(
    {
      id: "ginetta",
      name: "Ginetta",
      country: "United Kingdom",
      founded: "1958",
    },
    [
      {
            "id": "ginetta-g40r",
            "name": "G40R Road Coupé",
            "brand": "Ginetta",
            "country": "United Kingdom",
            "yearIntroduced": 2011,
            "rarity": "Rare",
            "horsepower": 200,
            "topSpeed": 140,
            "zeroToSixty": 5.5,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Solar Orange",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Polar White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "ginetta-akula",
            "name": "Akula V8 Supercar",
            "brand": "Ginetta",
            "country": "United Kingdom",
            "yearIntroduced": 2024,
            "rarity": "Legendary",
            "horsepower": 600,
            "topSpeed": 200,
            "zeroToSixty": 2.9,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Typhoon Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Racing Silver",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "G40R Road Coupé",
      "Akula V8 Supercar",
      "G40",
      "G55",
      "G56",
      "G60"
]
  ),
  createBrandWithCars(
    {
      id: "noble",
      name: "Noble",
      country: "United Kingdom",
      founded: "1999",
    },
    [
      {
            "id": "noble-m600",
            "name": "M600 Twin Turbo V8",
            "brand": "Noble",
            "country": "United Kingdom",
            "yearIntroduced": 2010,
            "rarity": "Legendary",
            "horsepower": 650,
            "topSpeed": 225,
            "zeroToSixty": 3,
            "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Speed Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Gloss Carbon Blue",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "noble-m12",
            "name": "M12 GTO-3R",
            "brand": "Noble",
            "country": "United Kingdom",
            "yearIntroduced": 2003,
            "rarity": "Rare",
            "horsepower": 352,
            "topSpeed": 170,
            "zeroToSixty": 3.7,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Monza Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Titanium Silver",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "M600 Twin Turbo V8",
      "M12 GTO-3R",
      "M12",
      "M400",
      "M15",
      "M600",
      "M500"
]
  ),
  createBrandWithCars(
    {
      id: "rover",
      name: "Rover",
      country: "United Kingdom",
      founded: "1878",
    },
    [
      {
            "id": "rover-sd1-vitesse",
            "name": "SD1 3500 V8 Vitesse",
            "brand": "Rover",
            "country": "United Kingdom",
            "yearIntroduced": 1982,
            "rarity": "Rare",
            "horsepower": 190,
            "topSpeed": 135,
            "zeroToSixty": 7.1,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Moonraker Blue",
                        "hex": "#1E40AF",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Opaline Green",
                        "hex": "#15803D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Targa Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  }
            ]
      },
      {
            "id": "rover-200-brm",
            "name": "200 BRM 1.8 VVC",
            "brand": "Rover",
            "country": "United Kingdom",
            "yearIntroduced": 1998,
            "rarity": "Rare",
            "horsepower": 143,
            "topSpeed": 127,
            "zeroToSixty": 7.9,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Brooklands Green with Orange Grille",
                        "hex": "#064E3B",
                        "baseColor": "Green"
                  }
            ]
      },
      {
            "id": "rover-75-v8",
            "name": "75 4.6 V8 Mustang Powered",
            "brand": "Rover",
            "country": "United Kingdom",
            "yearIntroduced": 2004,
            "rarity": "Rare",
            "horsepower": 256,
            "topSpeed": 151,
            "zeroToSixty": 6.2,
            "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Monogram Typhoon",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Starlight Silver",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Royal Blue",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "SD1 3500 V8 Vitesse",
      "200 BRM 1.8 VVC",
      "75 4.6 V8 Mustang Powered",
      "100",
      "200",
      "400",
      "600",
      "800",
      "25",
      "45",
      "75",
      "Streetwise",
      "CityRover",
      "Metro",
      "Montego",
      "SD1"
]
  ),
  createBrandWithCars(
    {
      id: "austin",
      name: "Austin",
      country: "United Kingdom",
      founded: "1905",
    },
    [
      {
            "id": "austin-mini",
            "name": "Mini 1000 City",
            "brand": "Austin",
            "country": "United Kingdom",
            "yearIntroduced": 1959,
            "rarity": "Rare",
            "horsepower": 39,
            "topSpeed": 75,
            "zeroToSixty": 19.5,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Old English White",
                        "hex": "#FEF3C7",
                        "baseColor": "White"
                  },
                  {
                        "name": "Tartan Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Island Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "austin-metro",
            "name": "Metro 1.3 Turbo",
            "brand": "Austin",
            "country": "United Kingdom",
            "yearIntroduced": 1982,
            "rarity": "Rare",
            "horsepower": 93,
            "topSpeed": 109,
            "zeroToSixty": 9.4,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Black with Red Stripe",
                        "hex": "#18181B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Silver Leaf",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "austin-allegro",
            "name": "Allegro 1.5 Special Equipe",
            "brand": "Austin",
            "country": "United Kingdom",
            "yearIntroduced": 1973,
            "rarity": "Rare",
            "horsepower": 68,
            "topSpeed": 89,
            "zeroToSixty": 16,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Harvest Gold",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Tara Green",
                        "hex": "#15803D",
                        "baseColor": "Green"
                  }
            ]
      }
],
    [
      "Mini 1000 City",
      "Metro 1.3 Turbo",
      "Allegro 1.5 Special Equipe",
      "Mini",
      "Metro",
      "Maestro",
      "Montego",
      "Ambassador",
      "Allegro",
      "Princess",
      "Maxi"
]
  ),
  createBrandWithCars(
    {
      id: "morris",
      name: "Morris",
      country: "United Kingdom",
      founded: "1912",
    },
    [
      {
            "id": "morris-minor-1000",
            "name": "Minor 1000 Traveller",
            "brand": "Morris",
            "country": "United Kingdom",
            "yearIntroduced": 1956,
            "rarity": "Rare",
            "horsepower": 48,
            "topSpeed": 73,
            "zeroToSixty": 24.8,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Almond Green with Ash Wood",
                        "hex": "#166534",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Trafalgar Blue",
                        "hex": "#1E40AF",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Old English White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "morris-marina",
            "name": "Marina 1.8 TC Coupe",
            "brand": "Morris",
            "country": "United Kingdom",
            "yearIntroduced": 1971,
            "rarity": "Rare",
            "horsepower": 94,
            "topSpeed": 100,
            "zeroToSixty": 11.7,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Blaze Orange",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Limeflower",
                        "hex": "#84CC16",
                        "baseColor": "Green"
                  }
            ]
      }
],
    [
      "Minor 1000 Traveller",
      "Marina 1.8 TC Coupe"
]
  ),
  createBrandWithCars(
    {
      id: "triumph",
      name: "Triumph",
      country: "United Kingdom",
      founded: "1885",
    },
    [
      {
            "id": "triumph-tr6",
            "name": "TR6 2.5 PI Petrol Injection",
            "brand": "Triumph",
            "country": "United Kingdom",
            "yearIntroduced": 1968,
            "rarity": "Rare",
            "horsepower": 150,
            "topSpeed": 120,
            "zeroToSixty": 8.2,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Damson Red",
                        "hex": "#7F1D1D",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Pimento Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "British Racing Green",
                        "hex": "#14532D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Inca Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  }
            ]
      },
      {
            "id": "triumph-stag",
            "name": "Stag 3.0 V8 Convertible",
            "brand": "Triumph",
            "country": "United Kingdom",
            "yearIntroduced": 1970,
            "rarity": "Rare",
            "horsepower": 145,
            "topSpeed": 118,
            "zeroToSixty": 9.3,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Carmine Red",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Tahiti Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Maple Brown",
                        "hex": "#78350F",
                        "baseColor": "Orange"
                  }
            ]
      },
      {
            "id": "triumph-dolomite-sprint",
            "name": "Dolomite Sprint 16V",
            "brand": "Triumph",
            "country": "United Kingdom",
            "yearIntroduced": 1973,
            "rarity": "Rare",
            "horsepower": 127,
            "topSpeed": 119,
            "zeroToSixty": 8.4,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Mimosa Yellow with Vinyl Roof",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Brooklands Green",
                        "hex": "#166534",
                        "baseColor": "Green"
                  }
            ]
      }
],
    [
      "TR6 2.5 PI Petrol Injection",
      "Stag 3.0 V8 Convertible",
      "Dolomite Sprint 16V",
      "Spitfire",
      "TR6",
      "TR7",
      "TR8",
      "Stag",
      "Dolomite",
      "Acclaim"
]
  ),
  createBrandWithCars(
    {
      id: "reliant",
      name: "Reliant",
      country: "United Kingdom",
      founded: "1935",
    },
    [
      {
            "id": "reliant-robin",
            "name": "Robin 850 3-Wheeler",
            "brand": "Reliant",
            "country": "United Kingdom",
            "yearIntroduced": 1973,
            "rarity": "Rare",
            "horsepower": 40,
            "topSpeed": 85,
            "zeroToSixty": 16.5,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Custard Yellow",
                        "hex": "#FDE047",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Post Office Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Sky Blue",
                        "hex": "#38BDF8",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "reliant-scimitar-gte",
            "name": "Scimitar GTE SE6 Ford V6",
            "brand": "Reliant",
            "country": "United Kingdom",
            "yearIntroduced": 1968,
            "rarity": "Rare",
            "horsepower": 138,
            "topSpeed": 121,
            "zeroToSixty": 8.9,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Highland Green",
                        "hex": "#166534",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Signal Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  }
            ]
      }
],
    [
      "Robin 850 3-Wheeler",
      "Scimitar GTE SE6 Ford V6",
      "Robin",
      "Rialto",
      "Scimitar",
      "Kitten"
]
  ),
  createBrandWithCars(
    {
      id: "hillman",
      name: "Hillman",
      country: "United Kingdom",
      founded: "1907",
    },
    [
      {
            "id": "hillman-imp",
            "name": "Imp Rear-Engine",
            "brand": "Hillman",
            "country": "United Kingdom",
            "yearIntroduced": 1963,
            "rarity": "Rare",
            "horsepower": 39,
            "topSpeed": 80,
            "zeroToSixty": 22,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Balmoral Grey",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Loch Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "hillman-avenger-tiger",
            "name": "Avenger Tiger 1.5 Twin Stromberg",
            "brand": "Hillman",
            "country": "United Kingdom",
            "yearIntroduced": 1972,
            "rarity": "Legendary",
            "horsepower": 92,
            "topSpeed": 108,
            "zeroToSixty": 8.9,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Sundance Yellow with Black Stripes",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Wardance Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  }
            ]
      }
],
    [
      "Imp Rear-Engine",
      "Avenger Tiger 1.5 Twin Stromberg"
]
  ),
  createBrandWithCars(
    {
      id: "austin-healey",
      name: "Austin-Healey",
      country: "United Kingdom",
      founded: "1952",
    },
    [
      {
            "id": "austin-healey-3000",
            "name": "3000 Mk III BJ8",
            "brand": "Austin-Healey",
            "country": "United Kingdom",
            "yearIntroduced": 1964,
            "rarity": "Legendary",
            "horsepower": 150,
            "topSpeed": 122,
            "zeroToSixty": 9.8,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Healey Blue over Ivory White",
                        "hex": "#38BDF8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Colorado Red over Black",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "British Racing Green",
                        "hex": "#14532D",
                        "baseColor": "Green"
                  }
            ]
      },
      {
            "id": "austin-healey-sprite",
            "name": "Sprite Mk I Frogeye",
            "brand": "Austin-Healey",
            "country": "United Kingdom",
            "yearIntroduced": 1958,
            "rarity": "Rare",
            "horsepower": 43,
            "topSpeed": 82,
            "zeroToSixty": 20.5,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Leaf Green",
                        "hex": "#166534",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Cherry Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Speedwell Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "3000 Mk III BJ8",
      "Sprite Mk I Frogeye"
]
  ),
  createBrandWithCars(
    {
      id: "jensen",
      name: "Jensen",
      country: "United Kingdom",
      founded: "1934",
    },
    [
      {
            "id": "jensen-interceptor-ff",
            "name": "Interceptor FF 4WD Chrysler 440 V8",
            "brand": "Jensen",
            "country": "United Kingdom",
            "yearIntroduced": 1966,
            "rarity": "Legendary",
            "horsepower": 330,
            "topSpeed": 140,
            "zeroToSixty": 7.3,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Brienz Blue",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Tangerine Orange",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Crystal Blue",
                        "hex": "#7DD3FC",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "Interceptor FF 4WD Chrysler 440 V8"
]
  ),
  createBrandWithCars(
    {
      id: "lister",
      name: "Lister",
      country: "United Kingdom",
      founded: "1954",
    },
    [
      {
            "id": "lister-stealth",
            "name": "Stealth 666hp Super SUV",
            "brand": "Lister",
            "country": "United Kingdom",
            "yearIntroduced": 2020,
            "rarity": "Legendary",
            "horsepower": 666,
            "topSpeed": 195,
            "zeroToSixty": 3.6,
            "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Lister Green & Yellow",
                        "hex": "#14532D",
                        "baseColor": "Green"
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
      "Stealth 666hp Super SUV"
]
  ),
  createBrandWithCars(
    {
      id: "levc",
      name: "LEVC",
      country: "United Kingdom",
      founded: "1919",
    },
    [
      {
            "id": "levc-tx-taxi",
            "name": "TX Electric Iconic London Taxi",
            "brand": "LEVC",
            "country": "United Kingdom",
            "yearIntroduced": 2017,
            "rarity": "Common",
            "horsepower": 148,
            "topSpeed": 80,
            "zeroToSixty": 13,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Traditional Hackney Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Silver Flake",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Pearl White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "TX Electric Iconic London Taxi"
]
  ),
  createBrandWithCars(
    {
      id: "bristol",
      name: "Bristol",
      country: "United Kingdom",
      founded: "1945",
    },
    [
      {
            "id": "bristol-fighter",
            "name": "Fighter 8.0 V10 Gullwing",
            "brand": "Bristol",
            "country": "United Kingdom",
            "yearIntroduced": 2004,
            "rarity": "Legendary",
            "horsepower": 525,
            "topSpeed": 210,
            "zeroToSixty": 4,
            "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Titanium Silver",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Midnight Blue",
                        "hex": "#0F172A",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "Fighter 8.0 V10 Gullwing"
]
  ),
  createBrandWithCars(
    {
      id: "bowler",
      name: "Bowler",
      country: "United Kingdom",
      founded: "1985",
    },
    [
      {
            "id": "bowler-csp-575",
            "name": "CSP 575 V8 Supercharged",
            "brand": "Bowler",
            "country": "United Kingdom",
            "yearIntroduced": 2021,
            "rarity": "Legendary",
            "horsepower": 575,
            "topSpeed": 145,
            "zeroToSixty": 4,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Bowler Racing Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Rally White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "CSP 575 V8 Supercharged"
]
  ),
  createBrandWithCars(
    {
      id: "marcos",
      name: "Marcos",
      country: "United Kingdom",
      founded: "1959",
    },
    [
      {
            "id": "marcos-mantis-gt",
            "name": "Mantis GT Supercharged V8",
            "brand": "Marcos",
            "country": "United Kingdom",
            "yearIntroduced": 1997,
            "rarity": "Legendary",
            "horsepower": 500,
            "topSpeed": 175,
            "zeroToSixty": 3.7,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Venom Purple",
                        "hex": "#581C87",
                        "baseColor": "Purple"
                  },
                  {
                        "name": "Canary Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  }
            ]
      }
],
    [
      "Mantis GT Supercharged V8"
]
  ),
  createBrandWithCars(
    {
      id: "ultima",
      name: "Ultima",
      country: "United Kingdom",
      founded: "1992",
    },
    [
      {
            "id": "ultima-rs",
            "name": "RS LT5 Supercharged Hypercar",
            "brand": "Ultima",
            "country": "United Kingdom",
            "yearIntroduced": 2019,
            "rarity": "Legendary",
            "horsepower": 1200,
            "topSpeed": 250,
            "zeroToSixty": 2.3,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Velocity Blue",
                        "hex": "#2563EB",
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
      "RS LT5 Supercharged Hypercar"
]
  ),
  createBrandWithCars(
    {
      id: "wolseley",
      name: "Wolseley",
      country: "United Kingdom",
      founded: "1901",
    },
    [
      {
            "id": "wolseley-1500",
            "name": "1500 Mk III Illuminated Badge",
            "brand": "Wolseley",
            "country": "United Kingdom",
            "yearIntroduced": 1957,
            "rarity": "Rare",
            "horsepower": 50,
            "topSpeed": 78,
            "zeroToSixty": 24,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Smoke Grey",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Maroon",
                        "hex": "#831843",
                        "baseColor": "Red"
                  }
            ]
      }
],
    [
      "1500 Mk III Illuminated Badge"
]
  ),
  createBrandWithCars(
    {
      id: "riley",
      name: "Riley",
      country: "United Kingdom",
      founded: "1898",
    },
    [
      {
            "id": "riley-elf",
            "name": "Elf Mk III Extended Boot Mini",
            "brand": "Riley",
            "country": "United Kingdom",
            "yearIntroduced": 1961,
            "rarity": "Rare",
            "horsepower": 38,
            "topSpeed": 77,
            "zeroToSixty": 21,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Birch Grey & Damask Red",
                        "hex": "#64748B",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Sandy Beige",
                        "hex": "#D97706",
                        "baseColor": "Yellow"
                  }
            ]
      }
],
    [
      "Elf Mk III Extended Boot Mini"
]
  ),
  createBrandWithCars(
    {
      id: "sunbeam",
      name: "Sunbeam",
      country: "United Kingdom",
      founded: "1905",
    },
    [
      {
            "id": "sunbeam-lotus",
            "name": "Talbot Sunbeam Lotus WRC Legend",
            "brand": "Sunbeam",
            "country": "United Kingdom",
            "yearIntroduced": 1979,
            "rarity": "Legendary",
            "horsepower": 150,
            "topSpeed": 127,
            "zeroToSixty": 6.8,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Embassy Black with Silver Stripes",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Moonstone Blue",
                        "hex": "#38BDF8",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "sunbeam-tiger",
            "name": "Tiger 260 Ford V8",
            "brand": "Sunbeam",
            "country": "United Kingdom",
            "yearIntroduced": 1964,
            "rarity": "Legendary",
            "horsepower": 164,
            "topSpeed": 122,
            "zeroToSixty": 7.8,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Carnival Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Midnight Blue",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Forest Green",
                        "hex": "#166534",
                        "baseColor": "Green"
                  }
            ]
      }
],
    [
      "Talbot Sunbeam Lotus WRC Legend",
      "Tiger 260 Ford V8"
]
  ),
  createBrandWithCars(
    {
      id: "talbot",
      name: "Talbot",
      country: "United Kingdom",
      founded: "1903",
    },
    [
      {
            "id": "talbot-samba-rallye",
            "name": "Samba Rallye 1.2",
            "brand": "Talbot",
            "country": "United Kingdom",
            "yearIntroduced": 1982,
            "rarity": "Rare",
            "horsepower": 90,
            "topSpeed": 109,
            "zeroToSixty": 10.1,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Rouge Vallelunga",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Blanc Meije",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "talbot-horizon",
            "name": "Horizon Ultra",
            "brand": "Talbot",
            "country": "United Kingdom",
            "yearIntroduced": 1978,
            "rarity": "Rare",
            "horsepower": 75,
            "topSpeed": 97,
            "zeroToSixty": 13.5,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Champagne Metallic",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Pacific Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "Samba Rallye 1.2",
      "Horizon Ultra"
]
  ),
  createBrandWithCars(
    {
      id: "singer",
      name: "Singer",
      country: "United Kingdom",
      founded: "1905",
    },
    [
      {
            "id": "singer-chamois",
            "name": "Chamois Coupe Deluxe",
            "brand": "Singer",
            "country": "United Kingdom",
            "yearIntroduced": 1964,
            "rarity": "Rare",
            "horsepower": 42,
            "topSpeed": 82,
            "zeroToSixty": 21,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Polar White over Maroon",
                        "hex": "#831843",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Sherwood Green",
                        "hex": "#166534",
                        "baseColor": "Green"
                  }
            ]
      }
],
    [
      "Chamois Coupe Deluxe"
]
  ),
  createBrandWithCars(
    {
      id: "leyland",
      name: "Leyland",
      country: "United Kingdom",
      founded: "1896",
    },
    [
      {
            "id": "leyland-princess",
            "name": "Princess 2200 HLS Wedge",
            "brand": "Leyland",
            "country": "United Kingdom",
            "yearIntroduced": 1975,
            "rarity": "Rare",
            "horsepower": 110,
            "topSpeed": 104,
            "zeroToSixty": 12,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Tara Green with Black Vinyl Roof",
                        "hex": "#15803D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Opaline Silver",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "Princess 2200 HLS Wedge"
]
  ),
  createBrandWithCars(
    {
      id: "apollo",
      name: "Apollo",
      country: "United Kingdom",
      founded: "2004",
    },
    [
      {
        id: "apollo-intensa-emozione",
        name: "Intensa Emozione (IE) 6.3 Naturally Aspirated V12",
        brand: "Apollo",
        country: "United Kingdom",
        yearIntroduced: 2017,
        rarity: "Legendary",
        horsepower: 780,
        topSpeed: 208,
        zeroToSixty: 2.7,
        image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
        colorVariants: [
          {
            name: "Purple Chameleon Tinted Carbon",
            hex: "#6B21A8",
            baseColor: "Purple"
          },
          {
            name: "Golden Dragon Metallic",
            hex: "#D97706",
            baseColor: "Yellow"
          }
        ]
      }
    ],
    [
      "Intensa Emozione (IE) 6.3 Naturally Aspirated V12"
    ]
  ),
  createBrandWithCars(
    {
      id: "ascari",
      name: "Ascari",
      country: "United Kingdom",
      founded: "1994",
    },
    [],
    [
      "KZ1",
      "A10",
      "Ecosse",
    ]
  ),
  createBrandWithCars(
    {
      id: "panther",
      name: "Panther",
      country: "United Kingdom",
      founded: "1972",
    },
    [],
    [
      "Kallista",
      "Lima",
      "De Ville",
      "J72",
      "Solo",
    ]
  ),
  createBrandWithCars(
    {
      id: "gilbern",
      name: "Gilbern",
      country: "United Kingdom",
      founded: "1959",
    },
    [],
    [
      "GT",
      "Genie",
      "Invader",
    ]
  ),
  createBrandWithCars(
    {
      id: "gordon-keeble",
      name: "Gordon-Keeble",
      country: "United Kingdom",
      founded: "1963",
    },
    [],
    [
      "GK1",
    ]
  ),
  createBrandWithCars(
    {
      id: "jensen-healey",
      name: "Jensen-Healey",
      country: "United Kingdom",
      founded: "1972",
    },
    [],
    [
      "Jensen-Healey",
      "GT",
    ]
  ),
  createBrandWithCars(
    {
      id: "spectre",
      name: "Spectre",
      country: "United Kingdom",
      founded: "1995",
    },
    [],
    [
      "R42",
    ]
  ),
  createBrandWithCars(
    {
      id: "peerless",
      name: "Peerless",
      country: "United Kingdom",
      founded: "1957",
    },
    [],
    [
      "GT",
    ]
  ),
];
