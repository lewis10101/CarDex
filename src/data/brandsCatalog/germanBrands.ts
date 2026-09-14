import { BrandInfo } from '../../types';
import { createBrandWithCars } from './carFactory';

export const GERMAN_BRANDS: BrandInfo[] = [
  createBrandWithCars(
    {
      id: "porsche",
      name: "Porsche",
      country: "Germany",
      founded: "1931",
    },
    [
      {
            "id": "porsche-911-gt3-rs",
            "name": "911 GT3 RS (992)",
            "brand": "Porsche",
            "country": "Germany",
            "yearIntroduced": 2022,
            "rarity": "Legendary",
            "horsepower": 518,
            "topSpeed": 184,
            "zeroToSixty": 3,
            "image": "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Guards Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Shark Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Python Green",
                        "hex": "#16A34A",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Arctic Grey",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Racing Yellow",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  }
            ]
      },
      {
            "id": "porsche-718-gt4-rs",
            "name": "718 Cayman GT4 RS",
            "brand": "Porsche",
            "country": "Germany",
            "yearIntroduced": 2021,
            "rarity": "Epic",
            "horsepower": 493,
            "topSpeed": 196,
            "zeroToSixty": 3.2,
            "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Arctic Grey",
                        "hex": "#475569",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Shark Blue",
                        "hex": "#0EA5E9",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Guards Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "porsche-taycan-turbo-s",
            "name": "Taycan Turbo S",
            "brand": "Porsche",
            "country": "Germany",
            "yearIntroduced": 2019,
            "rarity": "Legendary",
            "horsepower": 750,
            "topSpeed": 161,
            "zeroToSixty": 2.6,
            "image": "https://images.unsplash.com/photo-1555353540-64580b51c258?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Frozen Blue Metallic",
                        "hex": "#38BDF8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Gentian Blue",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Carrara White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  },
                  {
                        "name": "Volcano Grey",
                        "hex": "#334155",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "porsche-911-turbo-s",
            "name": "911 Turbo S (992)",
            "brand": "Porsche",
            "country": "Germany",
            "yearIntroduced": 2020,
            "rarity": "Legendary",
            "horsepower": 640,
            "topSpeed": 205,
            "zeroToSixty": 2.6,
            "image": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "GT Silver Metallic",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Jet Black Metallic",
                        "hex": "#0F172A",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Carmine Red",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  }
            ]
      }
],
    [
      "911 GT3 RS (992)",
      "718 Cayman GT4 RS",
      "Taycan Turbo S",
      "911 Turbo S (992)",
      "911",
      "Boxster",
      "Cayman",
      "Panamera",
      "Macan",
      "Cayenne",
      "Taycan",
      "924",
      "944",
      "968",
      "928",
      "Carrera GT",
      "918 Spyder"
]
  ),
  createBrandWithCars(
    {
      id: "bmw",
      name: "BMW",
      country: "Germany",
      founded: "1916",
    },
    [
      {
            "id": "bmw-m3-competition",
            "name": "M3 Competition (G80)",
            "brand": "BMW",
            "country": "Germany",
            "yearIntroduced": 2020,
            "rarity": "Epic",
            "horsepower": 503,
            "topSpeed": 180,
            "zeroToSixty": 3.8,
            "image": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Isle of Man Green",
                        "hex": "#065F46",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Sao Paulo Yellow",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Toronto Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Portimao Blue",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Frozen Brilliant White",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "bmw-m5-cs",
            "name": "M5 CS Club Sport",
            "brand": "BMW",
            "country": "Germany",
            "yearIntroduced": 2021,
            "rarity": "Legendary",
            "horsepower": 627,
            "topSpeed": 190,
            "zeroToSixty": 2.9,
            "image": "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Frozen Deep Green",
                        "hex": "#022C22",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Brands Hatch Grey",
                        "hex": "#374151",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "bmw-m2-coupe",
            "name": "M2 Coupé (G87)",
            "brand": "BMW",
            "country": "Germany",
            "yearIntroduced": 2023,
            "rarity": "Epic",
            "horsepower": 453,
            "topSpeed": 177,
            "zeroToSixty": 3.9,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Zandvoort Blue",
                        "hex": "#38BDF8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Toronto Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Black Sapphire",
                        "hex": "#111827",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Alpine White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "bmw-m8-competition",
            "name": "M8 Competition Gran Coupé",
            "brand": "BMW",
            "country": "Germany",
            "yearIntroduced": 2019,
            "rarity": "Legendary",
            "horsepower": 617,
            "topSpeed": 190,
            "zeroToSixty": 3,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Marina Bay Blue",
                        "hex": "#1E40AF",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Motegi Red",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Dravit Grey",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "M3 Competition (G80)",
      "M5 CS Club Sport",
      "M2 Coupé (G87)",
      "M8 Competition Gran Coupé",
      "1 Series",
      "2 Series",
      "2 Series Active Tourer",
      "2 Series Gran Coupe",
      "3 Series",
      "3 Series Compact",
      "4 Series",
      "4 Series Gran Coupe",
      "5 Series",
      "5 Series Gran Turismo",
      "6 Series",
      "6 Series Gran Coupe",
      "6 Series Gran Turismo",
      "7 Series",
      "8 Series",
      "8 Series Gran Coupe",
      "X1",
      "X2",
      "X3",
      "X4",
      "X5",
      "X6",
      "X7",
      "XM",
      "Z3",
      "Z4",
      "Z8",
      "i3",
      "i4",
      "i5",
      "i7",
      "i8",
      "iX",
      "iX1",
      "iX2",
      "iX3",
      "M1",
      "M2",
      "M3",
      "M4",
      "M5",
      "M6",
      "M8"
]
  ),
  createBrandWithCars(
    {
      id: "mercedes-benz",
      name: "Mercedes-Benz",
      country: "Germany",
      founded: "1926",
    },
    [
      {
            "id": "mercedes-amg-gt-black-series",
            "name": "AMG GT Black Series",
            "brand": "Mercedes-Benz",
            "country": "Germany",
            "yearIntroduced": 2020,
            "rarity": "Legendary",
            "horsepower": 720,
            "topSpeed": 202,
            "zeroToSixty": 3.1,
            "image": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Magmabeam Orange",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "High-Tech Silver",
                        "hex": "#9CA3AF",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Obsidian Black",
                        "hex": "#0F172A",
                        "baseColor": "Black"
                  },
                  {
                        "name": "AMG Green Hell Magno",
                        "hex": "#15803D",
                        "baseColor": "Green"
                  }
            ]
      },
      {
            "id": "mercedes-c63s-amg",
            "name": "C63 S AMG V8 Biturbo",
            "brand": "Mercedes-Benz",
            "country": "Germany",
            "yearIntroduced": 2015,
            "rarity": "Epic",
            "horsepower": 503,
            "topSpeed": 180,
            "zeroToSixty": 3.9,
            "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Selenite Grey Magno",
                        "hex": "#374151",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Polar White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  },
                  {
                        "name": "Brilliant Blue",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Designo Cardinal Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  }
            ]
      },
      {
            "id": "mercedes-g63-amg",
            "name": "G63 AMG G-Wagon",
            "brand": "Mercedes-Benz",
            "country": "Germany",
            "yearIntroduced": 2018,
            "rarity": "Legendary",
            "horsepower": 577,
            "topSpeed": 149,
            "zeroToSixty": 4.4,
            "image": "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "G Manufaktur Olive Green",
                        "hex": "#3F6212",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Obsidian Black Metallic",
                        "hex": "#000000",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Diamond White Bright",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  },
                  {
                        "name": "Arabian Grey",
                        "hex": "#6B7280",
                        "baseColor": "Grey"
                  }
            ]
      },
      {
            "id": "mercedes-a45s-amg",
            "name": "A45 S AMG 4MATIC+",
            "brand": "Mercedes-Benz",
            "country": "Germany",
            "yearIntroduced": 2019,
            "rarity": "Epic",
            "horsepower": 415,
            "topSpeed": 168,
            "zeroToSixty": 3.9,
            "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Sun Yellow",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Mountain Grey Magno",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Cosmos Black",
                        "hex": "#111827",
                        "baseColor": "Black"
                  }
            ]
      }
],
    [
      "AMG GT Black Series",
      "C63 S AMG V8 Biturbo",
      "G63 AMG G-Wagon",
      "A45 S AMG 4MATIC+",
      "190",
      "A-Class",
      "B-Class",
      "C-Class",
      "CL",
      "CLA",
      "CLC",
      "CLK",
      "CLS",
      "E-Class",
      "S-Class",
      "SL",
      "SLC",
      "SLK",
      "SLR McLaren",
      "SLS AMG",
      "AMG GT",
      "AMG SL",
      "G-Class",
      "GLA",
      "GLB",
      "GLC",
      "GLE",
      "GLS",
      "ML",
      "GL",
      "R-Class",
      "X-Class",
      "V-Class",
      "EQA",
      "EQB",
      "EQC",
      "EQE",
      "EQS",
      "EQV",
      "Citan"
]
  ),
  createBrandWithCars(
    {
      id: "audi",
      name: "Audi",
      country: "Germany",
      founded: "1909",
    },
    [
      {
            "id": "audi-r8-v10",
            "name": "R8 V10 Performance Quattro",
            "brand": "Audi",
            "country": "Germany",
            "yearIntroduced": 2019,
            "rarity": "Legendary",
            "horsepower": 612,
            "topSpeed": 205,
            "zeroToSixty": 3.1,
            "image": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Vegas Yellow",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Kemora Grey",
                        "hex": "#64748B",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Tango Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Ascari Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Mythos Black",
                        "hex": "#0F172A",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "audi-rs6-avant",
            "name": "RS6 Avant Quattro",
            "brand": "Audi",
            "country": "Germany",
            "yearIntroduced": 2020,
            "rarity": "Legendary",
            "horsepower": 591,
            "topSpeed": 190,
            "zeroToSixty": 3.5,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Nardo Grey",
                        "hex": "#6B7280",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Sebring Black Crystal",
                        "hex": "#111827",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Navarra Blue",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Tango Red Metallic",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  }
            ]
      },
      {
            "id": "audi-rs3-sportback",
            "name": "RS3 Sportback (8Y)",
            "brand": "Audi",
            "country": "Germany",
            "yearIntroduced": 2021,
            "rarity": "Epic",
            "horsepower": 394,
            "topSpeed": 180,
            "zeroToSixty": 3.8,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Kyalami Green",
                        "hex": "#22C55E",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Kemora Grey",
                        "hex": "#475569",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Glacier White",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  },
                  {
                        "name": "Turbo Blue",
                        "hex": "#38BDF8",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "audi-tt-rs",
            "name": "TT RS Iconic Edition",
            "brand": "Audi",
            "country": "Germany",
            "yearIntroduced": 2022,
            "rarity": "Rare",
            "horsepower": 394,
            "topSpeed": 174,
            "zeroToSixty": 3.7,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Nardo Grey",
                        "hex": "#6B7280",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Daytona Grey",
                        "hex": "#374151",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "R8 V10 Performance Quattro",
      "RS6 Avant Quattro",
      "RS3 Sportback (8Y)",
      "TT RS Iconic Edition",
      "80",
      "90",
      "100",
      "200",
      "Coupe",
      "Cabriolet",
      "A1",
      "A2",
      "A3",
      "S3",
      "RS3",
      "A4",
      "S4",
      "RS4",
      "A4 Allroad",
      "A5",
      "S5",
      "RS5",
      "A6",
      "S6",
      "RS6",
      "A6 Allroad",
      "A7",
      "S7",
      "RS7",
      "A8",
      "S8",
      "TT",
      "TTS",
      "TT RS",
      "R8",
      "Q2",
      "SQ2",
      "Q3",
      "RS Q3",
      "Q4 e-tron",
      "Q5",
      "SQ5",
      "Q6 e-tron",
      "Q7",
      "SQ7",
      "Q8",
      "SQ8",
      "RS Q8",
      "e-tron",
      "e-tron GT",
      "RS e-tron GT"
]
  ),
  createBrandWithCars(
    {
      id: "volkswagen",
      name: "Volkswagen",
      country: "Germany",
      founded: "1937",
    },
    [
      {
            "id": "vw-golf-r-mk8",
            "name": "Golf R 20 Years (Mk8)",
            "brand": "Volkswagen",
            "country": "Germany",
            "yearIntroduced": 2022,
            "rarity": "Epic",
            "horsepower": 328,
            "topSpeed": 168,
            "zeroToSixty": 4.6,
            "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Lapiz Blue Metallic",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Pure White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  },
                  {
                        "name": "Deep Black Pearl",
                        "hex": "#0F172A",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "vw-golf-gti-clubsport",
            "name": "Golf GTI Clubsport 45",
            "brand": "Volkswagen",
            "country": "Germany",
            "yearIntroduced": 2021,
            "rarity": "Rare",
            "horsepower": 296,
            "topSpeed": 166,
            "zeroToSixty": 5.6,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Moonstone Grey",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Kings Red Metallic",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Oryx White Pearl",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "vw-id-buzz",
            "name": "ID. Buzz Style EV",
            "brand": "Volkswagen",
            "country": "Germany",
            "yearIntroduced": 2022,
            "rarity": "Common",
            "horsepower": 201,
            "topSpeed": 90,
            "zeroToSixty": 10.2,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Pomelo Yellow & Candy White",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Energetic Orange & White",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Bay Leaf Green & White",
                        "hex": "#16A34A",
                        "baseColor": "Green"
                  }
            ]
      }
],
    [
      "Golf R 20 Years (Mk8)",
      "Golf GTI Clubsport 45",
      "ID. Buzz Style EV",
      "Polo",
      "Golf",
      "Golf Plus",
      "Golf SV",
      "Jetta",
      "Vento",
      "Bora",
      "Passat",
      "CC",
      "Arteon",
      "Scirocco",
      "Corrado",
      "Beetle",
      "New Beetle",
      "Up!",
      "Lupo",
      "Fox",
      "T-Cross",
      "Taigo",
      "T-Roc",
      "Tiguan",
      "Tiguan Allspace",
      "Touareg",
      "Touran",
      "Sharan",
      "ID.3",
      "ID.4",
      "ID.5",
      "ID.7",
      "ID. Buzz",
      "Caddy Life",
      "Caravelle",
      "Multivan",
      "California",
      "Phaeton",
      "Eos"
]
  ),
  createBrandWithCars(
    {
      id: "alpina",
      name: "Alpina",
      country: "Germany",
      founded: "1965",
    },
    [
      {
            "id": "alpina-b3-touring",
            "name": "B3 Touring 3.0 Bi-Turbo AWD",
            "brand": "Alpina",
            "country": "Germany",
            "yearIntroduced": 2020,
            "rarity": "Legendary",
            "horsepower": 488,
            "topSpeed": 188,
            "zeroToSixty": 3.7,
            "image": "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Alpina Green II",
                        "hex": "#064E3B",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Alpina Blue Metallic",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Mineral White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "alpina-b5-gt",
            "name": "B5 GT V8 Bi-Turbo",
            "brand": "Alpina",
            "country": "Germany",
            "yearIntroduced": 2023,
            "rarity": "Legendary",
            "horsepower": 625,
            "topSpeed": 205,
            "zeroToSixty": 3.4,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Alpina Blue with Gold Deko-Set",
                        "hex": "#1E40AF",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Chalk",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "B3 Touring 3.0 Bi-Turbo AWD",
      "B5 GT V8 Bi-Turbo"
]
  ),
  createBrandWithCars(
    {
      id: "brabus",
      name: "Brabus",
      country: "Germany",
      founded: "1977",
    },
    [
      {
            "id": "brabus-rocket-900",
            "name": "Rocket 900 V8 Bi-Turbo",
            "brand": "Brabus",
            "country": "Germany",
            "yearIntroduced": 2020,
            "rarity": "Legendary",
            "horsepower": 900,
            "topSpeed": 205,
            "zeroToSixty": 2.8,
            "image": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Stealth Grey Widestar",
                        "hex": "#374151",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Obsidian Black Carbon",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  }
            ]
      }
],
    [
      "Rocket 900 V8 Bi-Turbo"
]
  ),
  createBrandWithCars(
    {
      id: "maybach",
      name: "Maybach",
      country: "Germany",
      founded: "1909",
    },
    [
      {
            "id": "maybach-s680",
            "name": "Mercedes-Maybach S 680 V12 4MATIC",
            "brand": "Maybach",
            "country": "Germany",
            "yearIntroduced": 2021,
            "rarity": "Legendary",
            "horsepower": 621,
            "topSpeed": 155,
            "zeroToSixty": 4.4,
            "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Kalahari Gold & Rubellite Red Two-Tone",
                        "hex": "#B45309",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "High-Tech Silver & Nautical Blue",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "Mercedes-Maybach S 680 V12 4MATIC"
]
  ),
  createBrandWithCars(
    {
      id: "opel",
      name: "Opel",
      country: "Germany",
      founded: "1862",
    },
    [
      {
            "id": "opel-manta-400",
            "name": "Manta 400 Group B Rally Legend",
            "brand": "Opel",
            "country": "Germany",
            "yearIntroduced": 1983,
            "rarity": "Legendary",
            "horsepower": 144,
            "topSpeed": 130,
            "zeroToSixty": 7.5,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Polar White with Opel Motorsport Stripes",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  },
                  {
                        "name": "Carmine Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  }
            ]
      },
      {
            "id": "opel-calibra-turbo",
            "name": "Calibra 2.0 Turbo 4x4",
            "brand": "Opel",
            "country": "Germany",
            "yearIntroduced": 1992,
            "rarity": "Rare",
            "horsepower": 204,
            "topSpeed": 152,
            "zeroToSixty": 6.8,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Rioja Red",
                        "hex": "#7F1D1D",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Magnetic Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Star Silver",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "Manta 400 Group B Rally Legend",
      "Calibra 2.0 Turbo 4x4",
      "Corsa",
      "Astra",
      "Vectra",
      "Insignia",
      "Manta",
      "Calibra",
      "Kadett",
      "Omega",
      "Senator",
      "Monza",
      "Speedster",
      "GT",
      "Mokka",
      "Crossland",
      "Grandland",
      "Zafira",
      "Meriva"
]
  ),
  createBrandWithCars(
    {
      id: "smart",
      name: "Smart",
      country: "Germany",
      founded: "1994",
    },
    [
      {
            "id": "smart-brabus-roadster",
            "name": "Roadster Coupé Brabus V6",
            "brand": "Smart",
            "country": "Germany",
            "yearIntroduced": 2003,
            "rarity": "Rare",
            "horsepower": 101,
            "topSpeed": 119,
            "zeroToSixty": 9.8,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Speed Silver",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Jack Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Racing Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  }
            ]
      },
      {
            "id": "smart-1-brabus",
            "name": "#1 Brabus AWD Electric 422hp",
            "brand": "Smart",
            "country": "Germany",
            "yearIntroduced": 2022,
            "rarity": "Uncommon",
            "horsepower": 422,
            "topSpeed": 112,
            "zeroToSixty": 3.9,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Laser Red with Eclipse Black Roof",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Cyber Silver",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "Roadster Coupé Brabus V6",
      "#1 Brabus AWD Electric 422hp",
      "ForTwo",
      "ForFour",
      "Roadster",
      "#1",
      "#3"
]
  ),
  createBrandWithCars(
    {
      id: "wiesmann",
      name: "Wiesmann",
      country: "Germany",
      founded: "1988",
    },
    [
      {
            "id": "wiesmann-mf5",
            "name": "GT MF5 BMW V10",
            "brand": "Wiesmann",
            "country": "Germany",
            "yearIntroduced": 2008,
            "rarity": "Legendary",
            "horsepower": 507,
            "topSpeed": 193,
            "zeroToSixty": 3.9,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Gecko Green",
                        "hex": "#16A34A",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Deep Silver Metallic",
                        "hex": "#64748B",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "GT MF5 BMW V10"
]
  ),
  createBrandWithCars(
    {
      id: "borgward",
      name: "Borgward",
      country: "Germany",
      founded: "1919",
    },
    [],
    [
      "Isabella",
      "Hansa 1500",
      "P100",
      "BX7",
      "BX5",
    ]
  ),
  createBrandWithCars(
    {
      id: "bitter",
      name: "Bitter",
      country: "Germany",
      founded: "1971",
    },
    [],
    [
      "CD",
      "SC",
      "Type 3",
    ]
  ),
  createBrandWithCars(
    {
      id: "gumpert",
      name: "Gumpert",
      country: "Germany",
      founded: "2004",
    },
    [],
    [
      "Apollo",
      "Nathalie",
    ]
  ),
  createBrandWithCars(
    {
      id: "isdera",
      name: "Isdera",
      country: "Germany",
      founded: "1982",
    },
    [],
    [
      "Imperator 108i",
      "Commendatore 112i",
      "Spyder 036i",
    ]
  ),
  createBrandWithCars(
    {
      id: "melkus",
      name: "Melkus",
      country: "Germany",
      founded: "1959",
    },
    [],
    [
      "RS 1000",
      "RS 2000",
    ]
  ),
  createBrandWithCars(
    {
      id: "trabant",
      name: "Trabant",
      country: "Germany",
      founded: "1957",
    },
    [],
    [
      "601",
      "P50",
      "1.1",
    ]
  ),
  createBrandWithCars(
    {
      id: "wartburg",
      name: "Wartburg",
      country: "Germany",
      founded: "1898",
    },
    [],
    [
      "311",
      "312",
      "353",
      "1.3",
    ]
  ),
  createBrandWithCars(
    {
      id: "karmann",
      name: "Karmann",
      country: "Germany",
      founded: "1901",
    },
    [],
    [
      "Ghia",
    ]
  ),
];
