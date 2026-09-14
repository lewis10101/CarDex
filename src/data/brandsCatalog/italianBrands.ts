import { BrandInfo } from '../../types';
import { createBrandWithCars } from './carFactory';

export const ITALIAN_BRANDS: BrandInfo[] = [
  createBrandWithCars(
    {
      id: "ferrari",
      name: "Ferrari",
      country: "Italy",
      founded: "1939",
    },
    [
      {
            "id": "ferrari-sf90-stradale",
            "name": "SF90 Stradale V8 Hybrid",
            "brand": "Ferrari",
            "country": "Italy",
            "yearIntroduced": 2019,
            "rarity": "Legendary",
            "horsepower": 986,
            "topSpeed": 211,
            "zeroToSixty": 2.5,
            "image": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Rosso Corsa",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Giallo Modena",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Nero Daytona",
                        "hex": "#18181B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Blu Tour de France",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Grigio Silverstone",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "ferrari-488-pista",
            "name": "488 Pista V8 Speciale",
            "brand": "Ferrari",
            "country": "Italy",
            "yearIntroduced": 2018,
            "rarity": "Legendary",
            "horsepower": 710,
            "topSpeed": 211,
            "zeroToSixty": 2.8,
            "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Rosso Corsa with Livery",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Azzurro Dino",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Bianco Avus",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  },
                  {
                        "name": "Grigio Titanio",
                        "hex": "#64748B",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "ferrari-roma",
            "name": "Roma Coupé V8",
            "brand": "Ferrari",
            "country": "Italy",
            "yearIntroduced": 2020,
            "rarity": "Epic",
            "horsepower": 612,
            "topSpeed": 199,
            "zeroToSixty": 3.4,
            "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Blu Pozzi",
                        "hex": "#172554",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Grigio Alloy",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Rosso Mugello",
                        "hex": "#7F1D1D",
                        "baseColor": "Red"
                  }
            ]
      },
      {
            "id": "ferrari-296-gtb",
            "name": "296 GTB V6 Hybrid",
            "brand": "Ferrari",
            "country": "Italy",
            "yearIntroduced": 2021,
            "rarity": "Legendary",
            "horsepower": 819,
            "topSpeed": 205,
            "zeroToSixty": 2.9,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Rosso Imola",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Verde British",
                        "hex": "#14532D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Giallo Triplo Strato",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  }
            ]
      }
],
    [
      "SF90 Stradale V8 Hybrid",
      "488 Pista V8 Speciale",
      "Roma Coupé V8",
      "296 GTB V6 Hybrid",
      "308",
      "328",
      "348",
      "F355",
      "360 Modena",
      "F430",
      "458 Italia",
      "488 GTB",
      "F8 Tributo",
      "296 GTB",
      "12Cilindri",
      "Testarossa",
      "512 TR",
      "F512 M",
      "550 Maranello",
      "575M Maranello",
      "599 GTB",
      "F12berlinetta",
      "812 Superfast",
      "California",
      "Portofino",
      "Roma",
      "FF",
      "GTC4Lusso",
      "Purosangue",
      "F40",
      "F50",
      "Enzo",
      "LaFerrari",
      "Daytona SP3",
      "Mondial"
]
  ),
  createBrandWithCars(
    {
      id: "lamborghini",
      name: "Lamborghini",
      country: "Italy",
      founded: "1963",
    },
    [
      {
            "id": "lamborghini-aventador-svj",
            "name": "Aventador SVJ V12",
            "brand": "Lamborghini",
            "country": "Italy",
            "yearIntroduced": 2018,
            "rarity": "Legendary",
            "horsepower": 759,
            "topSpeed": 219,
            "zeroToSixty": 2.8,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Verde Alceo Matte",
                        "hex": "#84CC16",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Giallo Orion",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Arancio Atlas",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Nero Nemesis",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Rosso Mars",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  }
            ]
      },
      {
            "id": "lamborghini-revuelto",
            "name": "Revuelto V12 Hybrid",
            "brand": "Lamborghini",
            "country": "Italy",
            "yearIntroduced": 2023,
            "rarity": "Legendary",
            "horsepower": 1001,
            "topSpeed": 217,
            "zeroToSixty": 2.5,
            "image": "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Arancio Apodis",
                        "hex": "#F97316",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Bianco Monocerus",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  },
                  {
                        "name": "Grigio Telesto",
                        "hex": "#475569",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Blu Uranus",
                        "hex": "#38BDF8",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "lamborghini-huracan-tecnica",
            "name": "Huracán Tecnica V10",
            "brand": "Lamborghini",
            "country": "Italy",
            "yearIntroduced": 2022,
            "rarity": "Epic",
            "horsepower": 631,
            "topSpeed": 202,
            "zeroToSixty": 3.2,
            "image": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Verde Selvans",
                        "hex": "#22C55E",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Arancio Dac",
                        "hex": "#FB923C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Grigio Nimbus",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "lamborghini-urus-performante",
            "name": "Urus Performante Super SUV",
            "brand": "Lamborghini",
            "country": "Italy",
            "yearIntroduced": 2022,
            "rarity": "Legendary",
            "horsepower": 657,
            "topSpeed": 190,
            "zeroToSixty": 3.3,
            "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Giallo Auge",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Nero Noctis",
                        "hex": "#000000",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Blu Eleos",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "Aventador SVJ V12",
      "Revuelto V12 Hybrid",
      "Huracán Tecnica V10",
      "Urus Performante Super SUV",
      "Countach",
      "Diablo",
      "Murcielago",
      "Gallardo",
      "Aventador",
      "Huracan",
      "Revuelto",
      "Temerario",
      "Urus",
      "Jalpa",
      "LM002"
]
  ),
  createBrandWithCars(
    {
      id: "alfa-romeo",
      name: "Alfa Romeo",
      country: "Italy",
      founded: "1910",
    },
    [
      {
            "id": "alfa-giulia-quadrifoglio",
            "name": "Giulia Quadrifoglio 2.9 V6",
            "brand": "Alfa Romeo",
            "country": "Italy",
            "yearIntroduced": 2016,
            "rarity": "Epic",
            "horsepower": 505,
            "topSpeed": 191,
            "zeroToSixty": 3.8,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Rosso Competizione",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Montreal Green",
                        "hex": "#16A34A",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Misano Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Trofeo White",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  },
                  {
                        "name": "Vulcano Black",
                        "hex": "#111827",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "alfa-stelvio-quadrifoglio",
            "name": "Stelvio Quadrifoglio V6",
            "brand": "Alfa Romeo",
            "country": "Italy",
            "yearIntroduced": 2017,
            "rarity": "Epic",
            "horsepower": 505,
            "topSpeed": 176,
            "zeroToSixty": 3.6,
            "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Rosso Alfa",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Ocre GT Junior",
                        "hex": "#D97706",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Vesuvio Grey",
                        "hex": "#475569",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "alfa-4c-spider",
            "name": "4C Spider Carbon Tub",
            "brand": "Alfa Romeo",
            "country": "Italy",
            "yearIntroduced": 2015,
            "rarity": "Rare",
            "horsepower": 237,
            "topSpeed": 160,
            "zeroToSixty": 4.1,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Giallo Prototipo",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Madreperla White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  },
                  {
                        "name": "Rosso Competizione",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  }
            ]
      }
],
    [
      "Giulia Quadrifoglio 2.9 V6",
      "Stelvio Quadrifoglio V6",
      "4C Spider Carbon Tub",
      "33",
      "75",
      "145",
      "146",
      "147",
      "155",
      "156",
      "159",
      "164",
      "166",
      "Brera",
      "Spider",
      "GTV",
      "GT",
      "MiTo",
      "Giulietta",
      "4C",
      "8C Competizione",
      "Giulia",
      "Stelvio",
      "Tonale",
      "Junior",
      "SZ",
      "RZ"
]
  ),
  createBrandWithCars(
    {
      id: "maserati",
      name: "Maserati",
      country: "Italy",
      founded: "1914",
    },
    [
      {
            "id": "maserati-mc20",
            "name": "MC20 Nettuno Twin Turbo V6",
            "brand": "Maserati",
            "country": "Italy",
            "yearIntroduced": 2020,
            "rarity": "Legendary",
            "horsepower": 621,
            "topSpeed": 202,
            "zeroToSixty": 2.9,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Bianco Audace",
                        "hex": "#F1F5F9",
                        "baseColor": "White"
                  },
                  {
                        "name": "Giallo Genio",
                        "hex": "#FBBF24",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Rosso Vincente",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Blu Infinito",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Nero Enigma",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "maserati-granturismo-trofeo",
            "name": "GranTurismo Trofeo AWD",
            "brand": "Maserati",
            "country": "Italy",
            "yearIntroduced": 2023,
            "rarity": "Epic",
            "horsepower": 542,
            "topSpeed": 199,
            "zeroToSixty": 3.5,
            "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Grigio Cangiante",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Rosso GranTurismo",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Blu Nobile",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "MC20 Nettuno Twin Turbo V6",
      "GranTurismo Trofeo AWD",
      "Ghibli",
      "Quattroporte",
      "Levante",
      "Grecale",
      "GranTurismo",
      "GranCabrio",
      "MC20",
      "3200 GT",
      "Coupe",
      "Spyder",
      "Biturbo"
]
  ),
  createBrandWithCars(
    {
      id: "fiat",
      name: "Fiat",
      country: "Italy",
      founded: "1899",
    },
    [
      {
            "id": "fiat-500e",
            "name": "500e La Prima Electric",
            "brand": "Fiat",
            "country": "Italy",
            "yearIntroduced": 2020,
            "rarity": "Common",
            "horsepower": 117,
            "topSpeed": 93,
            "zeroToSixty": 9,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Rose Gold",
                        "hex": "#FB7185",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Ocean Green",
                        "hex": "#0D9488",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Mineral Grey",
                        "hex": "#64748B",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Glacier Blue",
                        "hex": "#38BDF8",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "fiat-panda-4x4",
            "name": "Panda 4x4 TwinAir Cross",
            "brand": "Fiat",
            "country": "Italy",
            "yearIntroduced": 2012,
            "rarity": "Common",
            "horsepower": 84,
            "topSpeed": 104,
            "zeroToSixty": 12,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Tuscany Green",
                        "hex": "#15803D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Samba Orange",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Gelato White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "fiat-coupe-turbo",
            "name": "Coupé 20V Turbo Plus",
            "brand": "Fiat",
            "country": "Italy",
            "yearIntroduced": 1996,
            "rarity": "Rare",
            "horsepower": 217,
            "topSpeed": 155,
            "zeroToSixty": 6.3,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Speed Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Broom Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Portofino Blue",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "500e La Prima Electric",
      "Panda 4x4 TwinAir Cross",
      "Coupé 20V Turbo Plus",
      "500",
      "500C",
      "500e",
      "500L",
      "500X",
      "600",
      "600e",
      "Panda",
      "Punto",
      "Grande Punto",
      "Punto Evo",
      "Bravo",
      "Brava",
      "Marea",
      "Tipo",
      "Stilo",
      "Coupe",
      "Barchetta",
      "124 Spider",
      "Multipla",
      "Doblo",
      "Qubo",
      "Sedici",
      "Uno",
      "Cinquecento",
      "Seicento",
      "Croma",
      "X1/9",
      "Ulysse"
]
  ),
  createBrandWithCars(
    {
      id: "abarth",
      name: "Abarth",
      country: "Italy",
      founded: "1949",
    },
    [
      {
            "id": "abarth-595-competizione",
            "name": "595 Competizione 1.4 T-Jet",
            "brand": "Abarth",
            "country": "Italy",
            "yearIntroduced": 2012,
            "rarity": "Common",
            "horsepower": 178,
            "topSpeed": 140,
            "zeroToSixty": 6.7,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Campovolo Grey",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Modena Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Scorpione Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Rosso Abarth",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  }
            ]
      },
      {
            "id": "abarth-124-spider",
            "name": "124 Spider Record Monza",
            "brand": "Abarth",
            "country": "Italy",
            "yearIntroduced": 2016,
            "rarity": "Rare",
            "horsepower": 168,
            "topSpeed": 144,
            "zeroToSixty": 6.8,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Turini White with Matte Black Bonnet",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  },
                  {
                        "name": "Costa Brava Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "San Marino Blue",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "abarth-500e-scorpionissima",
            "name": "500e Scorpionissima Electric",
            "brand": "Abarth",
            "country": "Italy",
            "yearIntroduced": 2023,
            "rarity": "Uncommon",
            "horsepower": 153,
            "topSpeed": 96,
            "zeroToSixty": 7,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Acid Green",
                        "hex": "#84CC16",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Poison Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "595 Competizione 1.4 T-Jet",
      "124 Spider Record Monza",
      "500e Scorpionissima Electric",
      "500",
      "595",
      "695",
      "124 Spider",
      "Punto",
      "Grande Punto",
      "500e",
      "600e"
]
  ),
  createBrandWithCars(
    {
      id: "lancia",
      name: "Lancia",
      country: "Italy",
      founded: "1906",
    },
    [
      {
            "id": "lancia-delta-integrale",
            "name": "Delta HF Integrale Evoluzione II",
            "brand": "Lancia",
            "country": "Italy",
            "yearIntroduced": 1993,
            "rarity": "Legendary",
            "horsepower": 212,
            "topSpeed": 137,
            "zeroToSixty": 5.7,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Rosso Monza",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Giallo Ginestra",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Blu Lord",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Bianco Perla",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "lancia-stratos-hf",
            "name": "Stratos HF Dino V6 Rally Icon",
            "brand": "Lancia",
            "country": "Italy",
            "yearIntroduced": 1973,
            "rarity": "Legendary",
            "horsepower": 190,
            "topSpeed": 144,
            "zeroToSixty": 6.8,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Alitalia Rally Livery (White/Green/Red)",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  },
                  {
                        "name": "Rosso Stratos",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Giallo Fly",
                        "hex": "#FBBF24",
                        "baseColor": "Yellow"
                  }
            ]
      }
],
    [
      "Delta HF Integrale Evoluzione II",
      "Stratos HF Dino V6 Rally Icon",
      "Delta",
      "Thema",
      "Dedra",
      "Prisma",
      "Ypsilon",
      "Kappa",
      "Lybra",
      "Thesis",
      "Montecarlo",
      "Beta"
]
  ),
  createBrandWithCars(
    {
      id: "pagani",
      name: "Pagani",
      country: "Italy",
      founded: "1992",
    },
    [
      {
            "id": "pagani-zonda-cinque",
            "name": "Zonda Cinque AMG V12 7.3L",
            "brand": "Pagani",
            "country": "Italy",
            "yearIntroduced": 2009,
            "rarity": "Legendary",
            "horsepower": 669,
            "topSpeed": 217,
            "zeroToSixty": 3.4,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Pearl White with Red Carbon Stripe",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  },
                  {
                        "name": "Exposed Carbon Fiber",
                        "hex": "#18181B",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "pagani-utopia",
            "name": "Utopia V12 Twin-Turbo Manual",
            "brand": "Pagani",
            "country": "Italy",
            "yearIntroduced": 2022,
            "rarity": "Legendary",
            "horsepower": 852,
            "topSpeed": 220,
            "zeroToSixty": 2.8,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Rinascimento Grey",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Nero Puro",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  }
            ]
      }
],
    [
      "Zonda Cinque AMG V12 7.3L",
      "Utopia V12 Twin-Turbo Manual",
      "Zonda",
      "Huayra",
      "Utopia"
]
  ),
  createBrandWithCars(
    {
      id: "de-tomaso",
      name: "De Tomaso",
      country: "Italy",
      founded: "1959",
    },
    [
      {
            "id": "de-tomaso-pantera-gts",
            "name": "Pantera GTS Ford 351 Cleveland V8",
            "brand": "De Tomaso",
            "country": "Italy",
            "yearIntroduced": 1972,
            "rarity": "Legendary",
            "horsepower": 345,
            "topSpeed": 160,
            "zeroToSixty": 5.5,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Rosso Corsa with Matte Black Hood",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Fly Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Viper Blue",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "de-tomaso-p72",
            "name": "P72 Supercharged V8",
            "brand": "De Tomaso",
            "country": "Italy",
            "yearIntroduced": 2020,
            "rarity": "Legendary",
            "horsepower": 700,
            "topSpeed": 221,
            "zeroToSixty": 3,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Liquid Copper Red",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Pearl White & Copper",
                        "hex": "#FEF3C7",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "Pantera GTS Ford 351 Cleveland V8",
      "P72 Supercharged V8",
      "Pantera",
      "Guara",
      "Mangusta"
]
  ),
  createBrandWithCars(
    {
      id: "innocenti",
      name: "Innocenti",
      country: "Italy",
      founded: "1933",
    },
    [
      {
            "id": "innocenti-mini-de-tomaso",
            "name": "Mini De Tomaso Turbo Bertone",
            "brand": "Innocenti",
            "country": "Italy",
            "yearIntroduced": 1983,
            "rarity": "Rare",
            "horsepower": 72,
            "topSpeed": 103,
            "zeroToSixty": 10.8,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Rosso Rally with Black Accents",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Nero Metalizzato",
                        "hex": "#18181B",
                        "baseColor": "Black"
                  }
            ]
      }
],
    [
      "Mini De Tomaso Turbo Bertone"
]
  ),
  createBrandWithCars(
    {
      id: "iveco",
      name: "Iveco",
      country: "Italy",
      founded: "1975",
    },
    [
      {
            "id": "iveco-massif-4x4",
            "name": "Massif 3.0 HPI 4x4 Heavy Duty",
            "brand": "Iveco",
            "country": "Italy",
            "yearIntroduced": 2007,
            "rarity": "Rare",
            "horsepower": 174,
            "topSpeed": 103,
            "zeroToSixty": 12.5,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Desert Sand",
                        "hex": "#D97706",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Olive Green",
                        "hex": "#15803D",
                        "baseColor": "Green"
                  }
            ]
      }
],
    [
      "Massif 3.0 HPI 4x4 Heavy Duty"
]
  ),
  createBrandWithCars(
    {
      id: "autobianchi",
      name: "Autobianchi",
      country: "Italy",
      founded: "1955",
    },
    [],
    [
      "A112",
      "Bianchina",
      "Y10",
      "Primula",
      "Stellina",
    ]
  ),
  createBrandWithCars(
    {
      id: "iso",
      name: "Iso",
      country: "Italy",
      founded: "1953",
    },
    [],
    [
      "Grifo",
      "Rivolta",
      "Lele",
      "Fidia",
      "Isetta",
    ]
  ),
  createBrandWithCars(
    {
      id: "bizzarrini",
      name: "Bizzarrini",
      country: "Italy",
      founded: "1964",
    },
    [],
    [
      "5300 GT",
      "P538",
      "1900 GT Europa",
    ]
  ),
  createBrandWithCars(
    {
      id: "cizeta",
      name: "Cizeta",
      country: "Italy",
      founded: "1988",
    },
    [],
    [
      "V16T",
    ]
  ),
  createBrandWithCars(
    {
      id: "bertone",
      name: "Bertone",
      country: "Italy",
      founded: "1912",
    },
    [],
    [
      "Freeclimber",
      "X1/9",
      "Runabout",
    ]
  ),
  createBrandWithCars(
    {
      id: "mazzanti",
      name: "Mazzanti",
      country: "Italy",
      founded: "2002",
    },
    [],
    [
      "Evantra",
      "Antas",
    ]
  ),
  createBrandWithCars(
    {
      id: "casalini",
      name: "Casalini",
      country: "Italy",
      founded: "1939",
    },
    [],
    [
      "Kerry",
      "M20",
      "Sulky",
      "Ydea",
    ]
  ),
  createBrandWithCars(
    {
      id: "zagato",
      name: "Zagato",
      country: "Italy",
      founded: "1919",
    },
    [],
    [
      "Mostro",
      "TZ3 Stradale",
      "Perana Z-One",
    ]
  ),
  createBrandWithCars(
    {
      id: "qvale",
      name: "Qvale",
      country: "Italy",
      founded: "2000",
    },
    [],
    [
      "Mangusta",
    ]
  ),
  createBrandWithCars(
    {
      id: "spada",
      name: "Spada",
      country: "Italy",
      founded: "2007",
    },
    [],
    [
      "Codatronca",
    ]
  ),
];
