import { BrandInfo } from '../../types';
import { createBrandWithCars } from './carFactory';

export const JAPANESE_BRANDS: BrandInfo[] = [
  createBrandWithCars(
    {
      id: "toyota",
      name: "Toyota",
      country: "Japan",
      founded: "1937",
    },
    [
      {
            "id": "toyota-gr-yaris",
            "name": "GR Yaris Circuit Pack AWD",
            "brand": "Toyota",
            "country": "Japan",
            "yearIntroduced": 2020,
            "rarity": "Legendary",
            "horsepower": 257,
            "topSpeed": 143,
            "zeroToSixty": 5.2,
            "image": "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Pure White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  },
                  {
                        "name": "Emotional Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Precious Black",
                        "hex": "#0F172A",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "toyota-gr-supra",
            "name": "GR Supra 3.0 Pro Twin-Scroll",
            "brand": "Toyota",
            "country": "Japan",
            "yearIntroduced": 2019,
            "rarity": "Epic",
            "horsepower": 335,
            "topSpeed": 155,
            "zeroToSixty": 4.1,
            "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Prominence Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Horizon Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Matte Storm Grey",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Lightning Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  }
            ]
      },
      {
            "id": "toyota-land-cruiser",
            "name": "Land Cruiser Invincible V8 / 300",
            "brand": "Toyota",
            "country": "Japan",
            "yearIntroduced": 2021,
            "rarity": "Rare",
            "horsepower": 304,
            "topSpeed": 130,
            "zeroToSixty": 6.9,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Precious White Pearl",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  },
                  {
                        "name": "Attitude Black",
                        "hex": "#000000",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Dark Green Mica",
                        "hex": "#14532D",
                        "baseColor": "Green"
                  }
            ]
      },
      {
            "id": "toyota-gr86",
            "name": "GR86 Boxer 2.4 Manual",
            "brand": "Toyota",
            "country": "Japan",
            "yearIntroduced": 2021,
            "rarity": "Epic",
            "horsepower": 231,
            "topSpeed": 140,
            "zeroToSixty": 6.3,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Ignition Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Sapphire Blue",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Crystal Black Silica",
                        "hex": "#111827",
                        "baseColor": "Black"
                  }
            ]
      }
],
    [
      "GR Yaris Circuit Pack AWD",
      "GR Supra 3.0 Pro Twin-Scroll",
      "Land Cruiser Invincible V8 / 300",
      "GR86 Boxer 2.4 Manual",
      "Yaris",
      "Yaris Cross",
      "GR Yaris",
      "Corolla",
      "GR Corolla",
      "Auris",
      "Avensis",
      "Camry",
      "Carina",
      "Prius",
      "Prius+",
      "C-HR",
      "RAV4",
      "bZ4X",
      "Land Cruiser",
      "Hilux",
      "Supra",
      "GR Supra",
      "GT86",
      "GR86",
      "Celica",
      "MR2",
      "Aygo",
      "Aygo X",
      "iQ",
      "Urban Cruiser",
      "Verso",
      "Previa",
      "Alphard",
      "Vellfire",
      "Estima",
      "Proace",
      "Soarer",
      "Chaser",
      "Mark II",
      "Crown",
      "Century"
]
  ),
  createBrandWithCars(
    {
      id: "honda",
      name: "Honda",
      country: "Japan",
      founded: "1948",
    },
    [
      {
            "id": "honda-civic-type-r-fl5",
            "name": "Civic Type R (FL5) 2.0 VTEC Turbo",
            "brand": "Honda",
            "country": "Japan",
            "yearIntroduced": 2022,
            "rarity": "Legendary",
            "horsepower": 325,
            "topSpeed": 171,
            "zeroToSixty": 5.3,
            "image": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Championship White",
                        "hex": "#FDFEFE",
                        "baseColor": "White"
                  },
                  {
                        "name": "Rallye Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Racing Blue Pearl",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Sonic Grey Pearl",
                        "hex": "#64748B",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Crystal Black Pearl",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "honda-nsx-type-s",
            "name": "NSX Type S Twin-Turbo Hybrid",
            "brand": "Honda",
            "country": "Japan",
            "yearIntroduced": 2021,
            "rarity": "Legendary",
            "horsepower": 600,
            "topSpeed": 191,
            "zeroToSixty": 2.7,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Gotham Gray Matte",
                        "hex": "#374151",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Indy Yellow Pearl",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Valencia Red Pearl",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Long Beach Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "honda-s2000-gt",
            "name": "S2000 GT 9000RPM VTEC Roadster",
            "brand": "Honda",
            "country": "Japan",
            "yearIntroduced": 1999,
            "rarity": "Epic",
            "horsepower": 237,
            "topSpeed": 150,
            "zeroToSixty": 6,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Indy Yellow Pearl",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Moonrock Grey",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Silverstone Metallic",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Formula Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  }
            ]
      },
      {
            "id": "honda-e",
            "name": "Honda e Advance EV Retro Compact",
            "brand": "Honda",
            "country": "Japan",
            "yearIntroduced": 2020,
            "rarity": "Common",
            "horsepower": 152,
            "topSpeed": 90,
            "zeroToSixty": 8.3,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Charge Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Platinum White Pearl",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  },
                  {
                        "name": "Crystal Black",
                        "hex": "#111827",
                        "baseColor": "Black"
                  }
            ]
      }
],
    [
      "Civic Type R (FL5) 2.0 VTEC Turbo",
      "NSX Type S Twin-Turbo Hybrid",
      "S2000 GT 9000RPM VTEC Roadster",
      "Honda e Advance EV Retro Compact",
      "Civic",
      "Jazz",
      "Accord",
      "CR-V",
      "HR-V",
      "ZR-V",
      "e",
      "e:Ny1",
      "Prelude",
      "Integra",
      "S2000",
      "NSX",
      "CR-Z",
      "CRX",
      "Insight",
      "Legend",
      "FR-V",
      "Stream",
      "Shuttle",
      "Stepwgn",
      "Elysion",
      "Beat"
]
  ),
  createBrandWithCars(
    {
      id: "nissan",
      name: "Nissan",
      country: "Japan",
      founded: "1933",
    },
    [
      {
            "id": "nissan-gt-r-nismo",
            "name": "GT-R Nismo (R35) VR38DETT",
            "brand": "Nissan",
            "country": "Japan",
            "yearIntroduced": 2020,
            "rarity": "Legendary",
            "horsepower": 600,
            "topSpeed": 205,
            "zeroToSixty": 2.7,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Nismo Stealth Grey",
                        "hex": "#475569",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Brilliant White Pearl",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  },
                  {
                        "name": "Super Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Vibrant Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  }
            ]
      },
      {
            "id": "nissan-skyline-gt-r-r34",
            "name": "Skyline GT-R V-Spec II (R34)",
            "brand": "Nissan",
            "country": "Japan",
            "yearIntroduced": 2000,
            "rarity": "Legendary",
            "horsepower": 276,
            "topSpeed": 165,
            "zeroToSixty": 4.8,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Bayside Blue",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Midnight Purple III",
                        "hex": "#581C87",
                        "baseColor": "Purple"
                  },
                  {
                        "name": "Millennium Jade",
                        "hex": "#84CC16",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Black Pearl",
                        "hex": "#000000",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "nissan-370z-nismo",
            "name": "370Z Nismo 3.7 V6",
            "brand": "Nissan",
            "country": "Japan",
            "yearIntroduced": 2014,
            "rarity": "Rare",
            "horsepower": 350,
            "topSpeed": 155,
            "zeroToSixty": 5,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Storm White with Red Trim",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  },
                  {
                        "name": "Magma Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Gun Metallic",
                        "hex": "#4B5563",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "GT-R Nismo (R35) VR38DETT",
      "Skyline GT-R V-Spec II (R34)",
      "370Z Nismo 3.7 V6",
      "Micra",
      "Note",
      "Almera",
      "Almera Tino",
      "Pulsar",
      "Primera",
      "Bluebird",
      "Silvia",
      "Skyline",
      "GT-R",
      "200SX",
      "240SX",
      "300ZX",
      "350Z",
      "370Z",
      "Z",
      "Qashqai",
      "Juke",
      "X-Trail",
      "Murano",
      "Pathfinder",
      "Patrol",
      "Terrano",
      "Leaf",
      "Ariya",
      "Pixo",
      "Cube",
      "Elgrand",
      "Serena",
      "Figaro",
      "Pao"
]
  ),
  createBrandWithCars(
    {
      id: "mazda",
      name: "Mazda",
      country: "Japan",
      founded: "1920",
    },
    [
      {
            "id": "mazda-mx-5-miata",
            "name": "MX-5 2.0 Skyactiv-G (ND)",
            "brand": "Mazda",
            "country": "Japan",
            "yearIntroduced": 2015,
            "rarity": "Common",
            "horsepower": 181,
            "topSpeed": 136,
            "zeroToSixty": 6.5,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Soul Red Crystal",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Machine Grey Metallic",
                        "hex": "#475569",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Deep Crystal Blue",
                        "hex": "#1E3A8A",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Snowflake White Pearl",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "mazda-rx-7-spirit-r",
            "name": "RX-7 Spirit R Type-A Twin-Rotary",
            "brand": "Mazda",
            "country": "Japan",
            "yearIntroduced": 2002,
            "rarity": "Legendary",
            "horsepower": 276,
            "topSpeed": 160,
            "zeroToSixty": 5,
            "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Titanium Grey Metallic",
                        "hex": "#64748B",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Innocent Blue Mica",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Vintage Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Pure White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      },
      {
            "id": "mazda-rx-8-r3",
            "name": "RX-8 R3 Renesis Rotary",
            "brand": "Mazda",
            "country": "Japan",
            "yearIntroduced": 2008,
            "rarity": "Rare",
            "horsepower": 232,
            "topSpeed": 145,
            "zeroToSixty": 6.4,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Aurora Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Velocity Red",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Diamond Grey",
                        "hex": "#374151",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "MX-5 2.0 Skyactiv-G (ND)",
      "RX-7 Spirit R Type-A Twin-Rotary",
      "RX-8 R3 Renesis Rotary",
      "2",
      "3",
      "5",
      "6",
      "121",
      "323",
      "626",
      "MX-3",
      "MX-5",
      "MX-6",
      "MX-30",
      "RX-7",
      "RX-8",
      "CX-3",
      "CX-30",
      "CX-5",
      "CX-60",
      "CX-80",
      "Tribute",
      "Demio",
      "Bongo Friendee"
]
  ),
  createBrandWithCars(
    {
      id: "subaru",
      name: "Subaru",
      country: "Japan",
      founded: "1953",
    },
    [
      {
            "id": "subaru-impreza-22b-sti",
            "name": "Impreza 22B STi Widebody Icon",
            "brand": "Subaru",
            "country": "Japan",
            "yearIntroduced": 1998,
            "rarity": "Legendary",
            "horsepower": 276,
            "topSpeed": 157,
            "zeroToSixty": 4.6,
            "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Sonic Blue Mica with Gold Wheels",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "subaru-wrx-sti-final-edition",
            "name": "WRX STi Final Edition EJ257",
            "brand": "Subaru",
            "country": "Japan",
            "yearIntroduced": 2018,
            "rarity": "Epic",
            "horsepower": 296,
            "topSpeed": 158,
            "zeroToSixty": 5.2,
            "image": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "WR Blue Pearl",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Crystal Black Silica",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  },
                  {
                        "name": "Pure Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Crystal White Pearl",
                        "hex": "#F9FAFB",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "Impreza 22B STi Widebody Icon",
      "WRX STi Final Edition EJ257",
      "Impreza",
      "WRX",
      "Legacy",
      "Outback",
      "Forester",
      "XV",
      "Crosstrek",
      "BRZ",
      "Levorg",
      "Solterra",
      "SVX",
      "Justy",
      "Tribeca"
]
  ),
  createBrandWithCars(
    {
      id: "mitsubishi",
      name: "Mitsubishi",
      country: "Japan",
      founded: "1970",
    },
    [
      {
            "id": "mitsubishi-lancer-evo-vi-tommi-makinen",
            "name": "Lancer Evolution VI Tommi Mäkinen Edition",
            "brand": "Mitsubishi",
            "country": "Japan",
            "yearIntroduced": 1999,
            "rarity": "Legendary",
            "horsepower": 276,
            "topSpeed": 150,
            "zeroToSixty": 4.4,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Passion Red with WRC Striping",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Scotia White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  },
                  {
                        "name": "Satellite Silver",
                        "hex": "#CBD5E1",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Pyrenean Black",
                        "hex": "#111827",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "mitsubishi-evo-x-fq440-mr",
            "name": "Lancer Evo X FQ-440 MR",
            "brand": "Mitsubishi",
            "country": "Japan",
            "yearIntroduced": 2014,
            "rarity": "Legendary",
            "horsepower": 440,
            "topSpeed": 160,
            "zeroToSixty": 3.6,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Frost White",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  },
                  {
                        "name": "Phantom Black",
                        "hex": "#000000",
                        "baseColor": "Black"
                  }
            ]
      }
],
    [
      "Lancer Evolution VI Tommi Mäkinen Edition",
      "Lancer Evo X FQ-440 MR",
      "Mirage",
      "Colt",
      "Lancer",
      "Lancer Evolution",
      "Galant",
      "Carisma",
      "3000GT",
      "FTO",
      "GTO",
      "Eclipse",
      "Eclipse Cross",
      "ASX",
      "Outlander",
      "Shogun",
      "Shogun Pinin",
      "Shogun Sport",
      "L200",
      "Delica"
]
  ),
  createBrandWithCars(
    {
      id: "lexus",
      name: "Lexus",
      country: "Japan",
      founded: "1989",
    },
    [
      {
            "id": "lexus-lfa",
            "name": "LFA 4.8 V10 9000RPM",
            "brand": "Lexus",
            "country": "Japan",
            "yearIntroduced": 2010,
            "rarity": "Legendary",
            "horsepower": 553,
            "topSpeed": 202,
            "zeroToSixty": 3.6,
            "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Whitest White",
                        "hex": "#FFFFFF",
                        "baseColor": "White"
                  },
                  {
                        "name": "Nürburgring Orange",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Pearl Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Starlight Black",
                        "hex": "#09090B",
                        "baseColor": "Black"
                  }
            ]
      },
      {
            "id": "lexus-lc-500",
            "name": "LC 500 Naturally Aspirated 5.0 V8",
            "brand": "Lexus",
            "country": "Japan",
            "yearIntroduced": 2017,
            "rarity": "Epic",
            "horsepower": 471,
            "topSpeed": 168,
            "zeroToSixty": 4.4,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Structural Blue",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Flare Yellow",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Infrared Red",
                        "hex": "#B91C1C",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Sonic Titanium",
                        "hex": "#64748B",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "LFA 4.8 V10 9000RPM",
      "LC 500 Naturally Aspirated 5.0 V8",
      "IS",
      "ES",
      "GS",
      "LS",
      "CT",
      "RC",
      "LC",
      "LFA",
      "LBX",
      "UX",
      "NX",
      "RX",
      "RZ",
      "GX",
      "LX",
      "SC"
]
  ),
  createBrandWithCars(
    {
      id: "suzuki",
      name: "Suzuki",
      country: "Japan",
      founded: "1909",
    },
    [
      {
            "id": "suzuki-jimny-allgrip",
            "name": "Jimny 1.5 ALLGRIP Pro 4x4",
            "brand": "Suzuki",
            "country": "Japan",
            "yearIntroduced": 2018,
            "rarity": "Common",
            "horsepower": 101,
            "topSpeed": 90,
            "zeroToSixty": 12.5,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Kinetic Yellow with Black Roof",
                        "hex": "#EAB308",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Jungle Green",
                        "hex": "#14532D",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Medium Grey",
                        "hex": "#475569",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Brisk Blue Metallic",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  }
            ]
      },
      {
            "id": "suzuki-swift-sport",
            "name": "Swift Sport 1.4 Boosterjet Hybrid",
            "brand": "Suzuki",
            "country": "Japan",
            "yearIntroduced": 2018,
            "rarity": "Common",
            "horsepower": 127,
            "topSpeed": 130,
            "zeroToSixty": 8.1,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Champion Yellow",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Burning Red Pearl",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Speedy Blue",
                        "hex": "#2563EB",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "Jimny 1.5 ALLGRIP Pro 4x4",
      "Swift Sport 1.4 Boosterjet Hybrid",
      "Swift",
      "Alto",
      "Celerio",
      "Ignis",
      "Splash",
      "Baleno",
      "SX4",
      "S-Cross",
      "Vitara",
      "Grand Vitara",
      "Jimny",
      "Wagon R+",
      "Liana",
      "Swace",
      "Across",
      "Cappuccino",
      "SJ"
]
  ),
  createBrandWithCars(
    {
      id: "infiniti",
      name: "Infiniti",
      country: "Japan",
      founded: "1989",
    },
    [
      {
            "id": "infiniti-q60-red-sport-400",
            "name": "Q60 Red Sport 400 Twin-Turbo V6",
            "brand": "Infiniti",
            "country": "Japan",
            "yearIntroduced": 2016,
            "rarity": "Uncommon",
            "horsepower": 400,
            "topSpeed": 155,
            "zeroToSixty": 4.5,
            "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Dynamic Sunstone Red",
                        "hex": "#991B1B",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Iridium Blue",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Graphite Shadow",
                        "hex": "#374151",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "Q60 Red Sport 400 Twin-Turbo V6",
      "Q30",
      "Q50",
      "Q60",
      "Q70",
      "QX30",
      "QX50",
      "QX70",
      "FX",
      "EX",
      "G37"
]
  ),
  createBrandWithCars(
    {
      id: "isuzu",
      name: "Isuzu",
      country: "Japan",
      founded: "1916",
    },
    [
      {
            "id": "isuzu-d-max-arctic-trucks-at35",
            "name": "D-Max Arctic Trucks AT35 4x4",
            "brand": "Isuzu",
            "country": "Japan",
            "yearIntroduced": 2022,
            "rarity": "Rare",
            "horsepower": 162,
            "topSpeed": 112,
            "zeroToSixty": 12.7,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Obsidian Grey Mica",
                        "hex": "#374151",
                        "baseColor": "Grey"
                  },
                  {
                        "name": "Valencia Orange",
                        "hex": "#EA580C",
                        "baseColor": "Orange"
                  },
                  {
                        "name": "Spinel Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  }
            ]
      },
      {
            "id": "isuzu-vehicross",
            "name": "VehiCROSS 3.2 V6 AWD Rare Icon",
            "brand": "Isuzu",
            "country": "Japan",
            "yearIntroduced": 1997,
            "rarity": "Rare",
            "horsepower": 215,
            "topSpeed": 115,
            "zeroToSixty": 8.8,
            "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Proton Yellow with Matte Black Cladding",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Ironman Silver",
                        "hex": "#94A3B8",
                        "baseColor": "Grey"
                  }
            ]
      }
],
    [
      "D-Max Arctic Trucks AT35 4x4",
      "VehiCROSS 3.2 V6 AWD Rare Icon",
      "D-Max",
      "Rodeo",
      "Trooper",
      "Bighorn",
      "VehiCROSS"
]
  ),
  createBrandWithCars(
    {
      id: "daihatsu",
      name: "Daihatsu",
      country: "Japan",
      founded: "1951",
    },
    [
      {
            "id": "daihatsu-copen-turbo",
            "name": "Copen 660cc Turbo Kei Roadster",
            "brand": "Daihatsu",
            "country": "Japan",
            "yearIntroduced": 2002,
            "rarity": "Uncommon",
            "horsepower": 63,
            "topSpeed": 106,
            "zeroToSixty": 11.7,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Yellow Gold Metallic",
                        "hex": "#FACC15",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Dark Red Mica",
                        "hex": "#7F1D1D",
                        "baseColor": "Red"
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
      "Copen 660cc Turbo Kei Roadster",
      "Copen",
      "Sirion",
      "Terios",
      "Cuore",
      "Charade",
      "Move",
      "YRV",
      "Fourtrak",
      "Sportrak",
      "Materia"
]
  ),
  createBrandWithCars(
    {
      id: "mitsuoka",
      name: "Mitsuoka",
      country: "Japan",
      founded: "1968",
    },
    [
      {
            "id": "mitsuoka-orochi",
            "name": "Orochi V6 Japanese Exotic",
            "brand": "Mitsuoka",
            "country": "Japan",
            "yearIntroduced": 2006,
            "rarity": "Legendary",
            "horsepower": 233,
            "topSpeed": 155,
            "zeroToSixty": 6.5,
            "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Mitsuoka Pearl Purple",
                        "hex": "#6B21A8",
                        "baseColor": "Purple"
                  },
                  {
                        "name": "Gold Pearl",
                        "hex": "#D97706",
                        "baseColor": "Yellow"
                  }
            ]
      },
      {
            "id": "mitsuoka-viewt",
            "name": "Viewt Classic Jaguar MK II Homage",
            "brand": "Mitsuoka",
            "country": "Japan",
            "yearIntroduced": 1993,
            "rarity": "Rare",
            "horsepower": 79,
            "topSpeed": 95,
            "zeroToSixty": 13,
            "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "British Racing Green Classic",
                        "hex": "#064E3B",
                        "baseColor": "Green"
                  },
                  {
                        "name": "Vintage Cream White",
                        "hex": "#FEF3C7",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "Orochi V6 Japanese Exotic",
      "Viewt Classic Jaguar MK II Homage"
]
  ),
  createBrandWithCars(
    {
      id: "datsun",
      name: "Datsun",
      country: "Japan",
      founded: "1931",
    },
    [
      {
            "id": "datsun-240z",
            "name": "240Z Fairlady L24 Inline-6",
            "brand": "Datsun",
            "country": "Japan",
            "yearIntroduced": 1969,
            "rarity": "Legendary",
            "horsepower": 151,
            "topSpeed": 125,
            "zeroToSixty": 8,
            "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Safari Gold (Code 920)",
                        "hex": "#D97706",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Monte Carlo Red",
                        "hex": "#DC2626",
                        "baseColor": "Red"
                  },
                  {
                        "name": "Universal Blue",
                        "hex": "#1D4ED8",
                        "baseColor": "Blue"
                  }
            ]
      }
],
    [
      "240Z Fairlady L24 Inline-6"
]
  ),
  createBrandWithCars(
    {
      id: "acura",
      name: "Acura",
      country: "Japan",
      founded: "1986",
    },
    [
      {
            "id": "acura-integra-type-s",
            "name": "Integra Type S 2.0 Turbo 6MT",
            "brand": "Acura",
            "country": "Japan",
            "yearIntroduced": 2023,
            "rarity": "Epic",
            "horsepower": 320,
            "topSpeed": 167,
            "zeroToSixty": 5.1,
            "image": "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&auto=format&fit=crop&q=80",
            "colorVariants": [
                  {
                        "name": "Tiger Eye Pearl",
                        "hex": "#D97706",
                        "baseColor": "Yellow"
                  },
                  {
                        "name": "Apex Blue Pearl",
                        "hex": "#0284C7",
                        "baseColor": "Blue"
                  },
                  {
                        "name": "Platinum White Pearl",
                        "hex": "#F8FAFC",
                        "baseColor": "White"
                  }
            ]
      }
],
    [
      "Integra Type S 2.0 Turbo 6MT"
]
  ),
];
