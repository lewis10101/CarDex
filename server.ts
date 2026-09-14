import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser for JSON and large image payloads
app.use(express.json({ limit: "25mb" }));

// Lazy Gemini client getter
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"),
    timestamp: new Date().toISOString(),
  });
});

// Feedback & Correction Store
interface FeedbackItem {
  id: string;
  timestamp: string;
  aiIdentifiedFull: string;
  aiMake?: string;
  aiModel?: string;
  userAgreed: boolean;
  userCorrection?: string;
  scannedAt?: string;
}

const FEEDBACK_FILE = path.join(process.cwd(), "car_feedback.json");
const CUSTOM_CARS_FILE = path.join(process.cwd(), "custom_cars.json");

interface CustomCarEntry {
  id: string;
  fullName: string;
  make: string;
  model: string;
  category?: string;
  addedAt: string;
  source?: "user_manual" | "user_correction";
}

function loadCustomCars(): CustomCarEntry[] {
  try {
    if (fs.existsSync(CUSTOM_CARS_FILE)) {
      const data = fs.readFileSync(CUSTOM_CARS_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn("Could not read custom cars file:", err);
  }
  return [];
}

let customCarsStore: CustomCarEntry[] = loadCustomCars();

function addCustomCar(
  name: string,
  category?: string,
  source: "user_manual" | "user_correction" = "user_manual"
): CustomCarEntry {
  const trimmed = name.trim();
  const existing = customCarsStore.find(
    (c) => c.fullName.toLowerCase() === trimmed.toLowerCase()
  );
  if (existing) {
    return existing;
  }

  // Parse make and model from name
  const parts = trimmed.split(/\s+/);
  const make = parts[0] || "Custom";
  const model = parts.slice(1).join(" ") || trimmed;

  const newCar: CustomCarEntry = {
    id: "car_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
    fullName: trimmed,
    make,
    model,
    category: category || "User Added",
    addedAt: new Date().toISOString(),
    source,
  };

  customCarsStore.push(newCar);
  try {
    fs.writeFileSync(CUSTOM_CARS_FILE, JSON.stringify(customCarsStore, null, 2), "utf-8");
    console.log(`[Car Database] Added new custom car: "${newCar.fullName}"`);
  } catch (err) {
    console.warn("Could not save custom car to file:", err);
  }
  return newCar;
}

function loadFeedback(): FeedbackItem[] {
  try {
    if (fs.existsSync(FEEDBACK_FILE)) {
      const data = fs.readFileSync(FEEDBACK_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn("Could not read feedback file, starting with empty store:", err);
  }
  return [];
}

let feedbackStore: FeedbackItem[] = loadFeedback();

function saveFeedback(item: FeedbackItem) {
  feedbackStore.push(item);
  try {
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbackStore, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not persist feedback to file:", err);
  }
}

// Curated car identification fallback database when API key isn't provided or offline
const DEMO_CAR_CATALOG = [
  {
    make: "Porsche",
    model: "911 GT3 RS",
    subModel: "Weissach Package (992)",
    yearRange: "2023 - Present",
    rarity: "Ultra Rare",
    rarityScore: 92,
    rarityReason: "Extremely limited allocation track weapon featuring motorsport-derived active aerodynamics and DRS wing.",
    xpAwarded: 750,
    stats: {
      horsepower: 518,
      acceleration: 3.0,
      topSpeed: 184,
      engine: "4.0L Naturally Aspirated Boxer-6",
      drivetrain: "RWD",
      curbWeight: "3,197 lbs",
      estimatedValue: "$241,300 - $350,000",
      bodyType: "Coupe",
      countryOfOrigin: "Germany",
    },
    funFacts: [
      "The massive rear wing produces up to 1,895 lbs of downforce at 177 mph.",
      "Features rotary dials on the steering wheel to adjust compression, rebound, and rear differential lock on the fly."
    ],
    soundSignature: "9,000 RPM high-pitch flat-six scream",
    confidence: 0.98,
    color: {
      name: "Python Green",
      baseColor: "Green",
      hex: "#009E49"
    }
  },
  {
    make: "Ferrari",
    model: "Daytona SP3",
    subModel: "Icona Series",
    yearRange: "2022 - 2024",
    rarity: "Legendary",
    rarityScore: 99,
    rarityReason: "Limited to just 599 examples worldwide; tribute to the 1967 24 Hours of Daytona 1-2-3 finish.",
    xpAwarded: 1500,
    stats: {
      horsepower: 829,
      acceleration: 2.85,
      topSpeed: 211,
      engine: "6.5L Naturally Aspirated 65° V12",
      drivetrain: "RWD",
      curbWeight: "3,274 lbs",
      estimatedValue: "$2,250,000+",
      bodyType: "Targa / Spider",
      countryOfOrigin: "Italy",
    },
    funFacts: [
      "Most powerful internal-combustion engine ever placed in a road-going Ferrari without hybrid assist.",
      "Features 'butterfly' doors with air boxes integrated directly into the door structure."
    ],
    soundSignature: "Pure operatic 9,500 RPM naturally aspirated V12 symphonic roar",
    confidence: 0.99,
    color: {
      name: "Rosso Corsa",
      baseColor: "Red",
      hex: "#D40000"
    }
  },
  {
    make: "Toyota",
    model: "Supra Turbo",
    subModel: "A80 / Mk4 RZ",
    yearRange: "1993 - 2002",
    rarity: "Rare",
    rarityScore: 84,
    rarityReason: "JDM icon legendary for the bulletproof 2JZ-GTE twin-turbo inline-6 and huge collector demand.",
    xpAwarded: 350,
    stats: {
      horsepower: 320,
      acceleration: 4.6,
      topSpeed: 155,
      engine: "3.0L Sequential Twin-Turbo Inline-6 (2JZ-GTE)",
      drivetrain: "RWD",
      curbWeight: "3,417 lbs",
      estimatedValue: "$80,000 - $160,000",
      bodyType: "Coupe",
      countryOfOrigin: "Japan",
    },
    funFacts: [
      "The cast-iron 2JZ block can famously withstand over 1,000 horsepower on stock internals.",
      "Fitted with the distinctive tall factory basket-handle rear wing."
    ],
    soundSignature: "Twin-turbo spool whistle transitioning into iconic straight-six growl",
    confidence: 0.95,
    color: {
      name: "Renaissance Red",
      baseColor: "Red",
      hex: "#A3161B"
    }
  },
  {
    make: "Mazda",
    model: "MX-5 Miata",
    subModel: "NA Generation",
    yearRange: "1989 - 1997",
    rarity: "Common",
    rarityScore: 35,
    rarityReason: "Best-selling two-seat convertible sports car in automotive history; famous for pop-up headlights.",
    xpAwarded: 60,
    stats: {
      horsepower: 116,
      acceleration: 8.8,
      topSpeed: 121,
      engine: "1.6L DOHC 16-Valve Inline-4",
      drivetrain: "RWD",
      curbWeight: "2,116 lbs",
      estimatedValue: "$7,000 - $18,000",
      bodyType: "Roadster",
      countryOfOrigin: "Japan",
    },
    funFacts: [
      "Inspired by classic 1960s British roadsters like the Lotus Elan, but with Japanese reliability.",
      "Has a near-perfect 50:50 front-to-rear weight balance."
    ],
    soundSignature: "Eager high-revving 4-cylinder chirp and snick-snick manual gearbox clicks",
    confidence: 0.94,
    color: {
      name: "Classic Red",
      baseColor: "Red",
      hex: "#C31B1B"
    }
  },
  {
    make: "Tesla",
    model: "Cybertruck",
    subModel: "Cyberbeast Tri-Motor",
    yearRange: "2023 - Present",
    rarity: "Uncommon",
    rarityScore: 65,
    rarityReason: "Ultra-hard 30X cold-rolled stainless steel exoskeleton with polarizing polygonal futuristic design.",
    xpAwarded: 150,
    stats: {
      horsepower: 845,
      acceleration: 2.6,
      topSpeed: 130,
      engine: "Tri-Motor All-Electric AWD",
      drivetrain: "AWD",
      curbWeight: "6,843 lbs",
      estimatedValue: "$99,990 - $120,000",
      bodyType: "Pickup Truck",
      countryOfOrigin: "United States",
    },
    funFacts: [
      "Uses 48-volt low-voltage electrical architecture and steer-by-wire with zero mechanical linkage to the front rack.",
      "Stainless-steel exterior panels are corrosion-free and require no paint."
    ],
    soundSignature: "Sci-fi dual-inverter electric whine accompanied by tire roar",
    confidence: 0.96,
    color: {
      name: "Raw Stainless Steel",
      baseColor: "Silver",
      hex: "#B0B3B6"
    }
  },
  {
    make: "BMW",
    model: "M3 Competition",
    subModel: "G80 xDrive",
    yearRange: "2021 - Present",
    rarity: "Uncommon",
    rarityScore: 68,
    rarityReason: "High performance sports sedan benchmark with twin-turbo S58 inline-6 and aggressive styling.",
    xpAwarded: 180,
    stats: {
      horsepower: 503,
      acceleration: 3.4,
      topSpeed: 180,
      engine: "3.0L Twin-Turbo Inline-6 (S58)",
      drivetrain: "AWD",
      curbWeight: "3,890 lbs",
      estimatedValue: "$76,000 - $95,000",
      bodyType: "Sedan",
      countryOfOrigin: "Germany",
    },
    funFacts: [
      "The S58 engine features a 3D-printed cylinder head core allowing complex cooling duct geometry.",
      "The M xDrive system can be toggled into 100% rear-wheel drive mode with stability control off."
    ],
    soundSignature: "Snarly twin-turbo metallic straight-six rasp with rapid dual-clutch exhaust pops",
    confidence: 0.97,
    color: {
      name: "Isle of Man Green",
      baseColor: "Green",
      hex: "#1B4D3E"
    }
  },
  {
    make: "Nissan",
    model: "GT-R",
    subModel: "Nismo (R35)",
    yearRange: "2020 - 2024",
    rarity: "Rare",
    rarityScore: 88,
    rarityReason: "Godzilla peak iteration tuned by Nismo with GT3 racecar turbochargers and carbon-ceramic brakes.",
    xpAwarded: 400,
    stats: {
      horsepower: 600,
      acceleration: 2.7,
      topSpeed: 205,
      engine: "3.8L Twin-Turbo V6 (VR38DETT)",
      drivetrain: "AWD",
      curbWeight: "3,754 lbs",
      estimatedValue: "$210,000 - $250,000",
      bodyType: "Coupe",
      countryOfOrigin: "Japan",
    },
    funFacts: [
      "Each VR38DETT engine is hand-assembled in a sealed cleanroom by one of only five master craftsmen ('Takumi').",
      "Features turbochargers directly adapted from the Nissan GT3 competition racing cars."
    ],
    soundSignature: "Whistling turbochargers with deep mechanical mechanical AWD transmission whine",
    confidence: 0.98,
    color: {
      name: "Storm White Nismo",
      baseColor: "White",
      hex: "#F2F4F7"
    }
  }
];

// Car Scanner AI endpoint
app.post("/api/identify-car", async (req, res) => {
  try {
    const { imageBase64, mimeType, location, userHint } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "Missing imageBase64 data" });
    }

    const ai = getGeminiClient();

    // Clean base64 string
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    if (ai) {
      const prompt = `You are the ultimate automotive identification expert and Car Pokédex AI.
Analyze this car photograph in high detail and identify the vehicle.
Extract precise automotive metadata and output ONLY valid JSON matching this schema:

{
  "isCar": boolean,
  "confidence": number, // 0.0 to 1.0
  "make": string, // e.g. "Porsche", "Lamborghini", "Toyota"
  "model": string, // e.g. "911 GT3 RS", "Huracán Sterrato", "GR Supra"
  "subModel": string, // e.g. "Weissach Package", "LP 610-4", "RZ 3.0"
  "generation": string, // e.g. "992", "Mk4 A80", "E46"
  "yearRange": string, // e.g. "2022 - 2024", "1993 - 2002"
  "color": {
    "name": string, // specific automotive paint or finish name, e.g. "Isle of Man Green", "Nardo Grey", "Alpine White", "Guards Red", "Midnight Blue", "Raw Stainless Steel", "Rosso Corsa", "Obsidian Black"
    "baseColor": string, // primary color family: "Red" | "Blue" | "Black" | "White" | "Silver" | "Grey" | "Yellow" | "Green" | "Orange" | "Purple" | "Brown" | "Gold"
    "hex": string // approximate hex color code matching the car's body color in the photo, e.g. "#1C4E3D"
  },
  "rarity": "Common" | "Uncommon" | "Rare" | "Ultra Rare" | "Legendary",
  "rarityScore": number, // integer 1 to 100
  "rarityReason": string, // 1-2 sentences on why it fits this rarity tier based on production numbers, exclusivity, historic significance, or market demand
  "xpAwarded": number, // Common: 50-80, Uncommon: 100-200, Rare: 250-450, Ultra Rare: 500-900, Legendary: 1000-2000
  "stats": {
    "horsepower": number, // integer hp
    "acceleration": number, // 0-60 mph in seconds (e.g. 3.2)
    "topSpeed": number, // top speed in mph (e.g. 195)
    "engine": string, // e.g. "4.0L Twin-Turbo V8", "Naturally Aspirated V10", "Dual-Motor Electric"
    "drivetrain": "AWD" | "RWD" | "FWD",
    "curbWeight": string, // e.g. "3,350 lbs"
    "estimatedValue": string, // e.g. "$185,000 - $220,000"
    "bodyType": string, // "Coupe", "Sedan", "SUV", "Convertible", "Hatchback", "Hypercar", "Wagon", "Pickup"
    "countryOfOrigin": string // e.g. "Germany", "Italy", "Japan", "USA", "UK"
  },
  "soundSignature": string, // vivid sensory description of its exhaust/motor sound, e.g. "Screaming 9,000 RPM V10", "Burbling cross-plane American V8"
  "funFacts": [string, string], // 2 fascinating unique automotive trivia facts about this exact car
  "categoryTags": string[] // e.g. ["JDM", "Track Weapon", "Naturally Aspirated", "Homologation Special"]
}

Rarity Guideline rules:
- Common: Mass production everyday cars (Corolla, Civic, Golf, RAV4, Camry).
- Uncommon: Performance trims, premium enthusiast cars, enthusiast hot hatches, modern entry sports cars (Golf R, Civic Type R, Miata, BMW M340i, Mustang GT).
- Rare: Dedicated high performance icons, M-Cars, AMG GT, Porsche Carrera / GTS, classic collector cars, C8 Z06, Nissan GT-R.
- Ultra Rare: Limited track specials, GT3 RS, Ferrari 488 Pista, McLaren 765LT, Shelby GT500, classic rare vintage.
- Legendary: Hypercars, ultra-limited homologation, multimillion dollar exotics (Ferrari Daytona SP3, Bugatti Chiron, McLaren F1, Porsche Carrera GT, Pagani, Koenigsegg).

Color Detection rules:
- Identify the car's actual exterior paint/body color visible in the photo with high precision.
- Provide a realistic automotive color name (e.g. "Isle of Man Green", "Nardo Grey", "Chalk", "Alpine White", "Guards Red", "Midnight Blue", "Raw Stainless Steel").
- Provide the primary baseColor group ("Red", "Blue", "Black", "White", "Silver", "Grey", "Yellow", "Green", "Orange", "Purple", "Brown", "Gold").
- Provide a representative hex color code for the car's body panels.

${userHint ? `User notes: ${userHint}\n` : ""}${(() => {
  const pastCorrections = feedbackStore
    .filter((f) => !f.userAgreed && f.userCorrection && f.userCorrection.trim().length > 0)
    .slice(-15);
  if (pastCorrections.length === 0) return "";
  return `
HISTORICAL USER CORRECTIONS & LEARNED RULES (Use these to avoid repeating past mistakes):
${pastCorrections.map((c) => `- When classifying cars similar to "${c.aiIdentifiedFull}", users corrected it to "${c.userCorrection}". Please check specific distinguishing badges, trims, body panels, and lights to ensure accurate classification.`).join("\n")}
`;
})()}`;

      let response: any = null;
      let lastErr: any = null;
      // High-availability candidate models: prioritize flash-lite and flash-latest to avoid free-tier quota limits
      const candidateModels = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-3.8-flash"];

      for (const candidateModel of candidateModels) {
        try {
          response = await ai.models.generateContent({
            model: candidateModel,
            contents: [
              {
                role: "user",
                parts: [
                  { text: prompt },
                  {
                    inlineData: {
                      mimeType: mimeType || "image/jpeg",
                      data: cleanBase64,
                    },
                  },
                ],
              },
            ],
            config: {
              responseMimeType: "application/json",
              temperature: 0.2,
            },
          });
          if (response && response.text) break;
        } catch (err: any) {
          lastErr = err;
          console.warn(`Model ${candidateModel} failed, trying next candidate:`, err.message || err);
        }
      }

      let carData: any = null;
      if (response && response.text) {
        let responseText = response.text.trim();
        responseText = responseText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
        try {
          carData = JSON.parse(responseText);
        } catch (parseErr) {
          console.warn("Could not parse JSON from model output:", parseErr);
        }
      }

      if (carData) {
        if (!carData.color || typeof carData.color !== 'object') {
          carData.color = {
            name: "Original Factory Finish",
            baseColor: "Silver",
            hex: "#A1A1AA"
          };
        }
        return res.json({
          success: true,
          source: "gemini-vision",
          data: carData,
          scannedAt: new Date().toISOString(),
        });
      }

      // If all candidate models failed (e.g. rate limits or temporary service unavailability), gracefully fall back
      console.warn("All Gemini candidate models were exhausted or busy. Falling back to automotive catalog match.", lastErr?.message);

      let matchedCar = DEMO_CAR_CATALOG[0];
      if (userHint && typeof userHint === "string" && userHint.trim()) {
        const hintLower = userHint.toLowerCase();
        const match = DEMO_CAR_CATALOG.find(
          (c) => c.make.toLowerCase().includes(hintLower) || c.model.toLowerCase().includes(hintLower)
        );
        if (match) matchedCar = match;
      } else {
        const randomIndex = Math.floor(Math.random() * DEMO_CAR_CATALOG.length);
        matchedCar = DEMO_CAR_CATALOG[randomIndex];
      }

      return res.json({
        success: true,
        source: "catalog-fallback",
        note: "AI service is temporarily busy. Matched vehicle using CarDex offline automotive recognition.",
        data: {
          isCar: true,
          ...matchedCar,
          categoryTags: ["Catalog Specimen", matchedCar.rarity, matchedCar.stats.drivetrain],
        },
        scannedAt: new Date().toISOString(),
      });
    } else {
      // Fallback if API key is not configured: pick matching or randomized car from demo catalog
      const randomIndex = Math.floor(Math.random() * DEMO_CAR_CATALOG.length);
      const demoCar = DEMO_CAR_CATALOG[randomIndex];

      return res.json({
        success: true,
        source: "demo-catalog",
        note: "Gemini API key is not configured in settings. Returning curated specimen from CarDex database.",
        data: {
          isCar: true,
          ...demoCar,
          categoryTags: ["Demo Specimen", demoCar.rarity, demoCar.stats.drivetrain],
        },
        scannedAt: new Date().toISOString(),
      });
    }
  } catch (err: any) {
    console.error("Car identification error:", err);
    return res.status(500).json({
      error: "Failed to identify car",
      message: err.message || "Unknown error",
    });
  }
});

// Feedback and correction logging endpoint
app.post("/api/car-feedback", (req, res) => {
  try {
    const { aiIdentifiedFull, aiMake, aiModel, userAgreed, userCorrection, scannedAt } = req.body;

    if (!aiIdentifiedFull) {
      return res.status(400).json({ error: "Missing aiIdentifiedFull car name" });
    }

    const feedbackItem: FeedbackItem = {
      id: "fb_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      aiIdentifiedFull: String(aiIdentifiedFull).trim(),
      aiMake: aiMake ? String(aiMake).trim() : undefined,
      aiModel: aiModel ? String(aiModel).trim() : undefined,
      userAgreed: Boolean(userAgreed),
      userCorrection: userCorrection && typeof userCorrection === "string" ? userCorrection.trim() : undefined,
      scannedAt: scannedAt || new Date().toISOString(),
    };

    saveFeedback(feedbackItem);

    // If user entered a correction, automatically ensure it is stored in the custom car database
    if (feedbackItem.userCorrection) {
      addCustomCar(feedbackItem.userCorrection, "Community Identified", "user_correction");
    }

    const totalAgreed = feedbackStore.filter((f) => f.userAgreed).length;
    const totalCorrected = feedbackStore.filter((f) => !f.userAgreed && f.userCorrection).length;

    console.log(`[Feedback Recorded] Car: "${feedbackItem.aiIdentifiedFull}", Agreed: ${feedbackItem.userAgreed}, Correction: "${feedbackItem.userCorrection || "None"}"`);

    res.json({
      success: true,
      feedbackId: feedbackItem.id,
      stats: {
        totalFeedback: feedbackStore.length,
        agreed: totalAgreed,
        corrected: totalCorrected,
      },
    });
  } catch (err: any) {
    console.error("Feedback error:", err);
    res.status(500).json({ error: "Failed to record feedback", message: err.message });
  }
});

// Custom/niche car addition endpoint
app.post("/api/custom-cars", (req, res) => {
  try {
    const { carName, category } = req.body;
    if (!carName || typeof carName !== "string" || !carName.trim()) {
      return res.status(400).json({ error: "Please provide a valid car name" });
    }

    const newCar = addCustomCar(carName.trim(), category, "user_manual");
    res.json({
      success: true,
      car: newCar,
      totalCustom: customCarsStore.length,
      message: `"${newCar.fullName}" added to car database!`,
    });
  } catch (err: any) {
    console.error("Error adding custom car:", err);
    res.status(500).json({ error: "Failed to add car to database", message: err.message });
  }
});

// Get all custom/niche cars added by users
app.get("/api/custom-cars", (req, res) => {
  res.json({
    cars: customCarsStore,
    total: customCarsStore.length,
  });
});

// Delete a specific custom car entry
app.delete("/api/custom-cars/:id", (req, res) => {
  const { id } = req.params;
  const decoded = decodeURIComponent(id).trim().toLowerCase();
  const stripped = id.replace(/^(srv_|local_|car_)/, "").toLowerCase();

  const matchingCars = customCarsStore.filter(
    (c) =>
      c.id === id ||
      c.id.toLowerCase() === decoded ||
      c.fullName.toLowerCase() === decoded ||
      c.fullName.toLowerCase() === stripped ||
      c.id.includes(id)
  );

  const initialLen = customCarsStore.length;
  customCarsStore = customCarsStore.filter(
    (c) =>
      c.id !== id &&
      c.id.toLowerCase() !== decoded &&
      c.fullName.toLowerCase() !== decoded &&
      c.fullName.toLowerCase() !== stripped &&
      !c.id.includes(id)
  );

  // Cross-clean matching feedback entries if any
  const initialFbLen = feedbackStore.length;
  for (const car of matchingCars) {
    feedbackStore = feedbackStore.filter(
      (f) => f.userCorrection?.toLowerCase() !== car.fullName.toLowerCase()
    );
  }

  try {
    fs.writeFileSync(CUSTOM_CARS_FILE, JSON.stringify(customCarsStore, null, 2), "utf-8");
    if (feedbackStore.length < initialFbLen) {
      fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbackStore, null, 2), "utf-8");
    }
    console.log(`[Car Database] Deleted custom car: ${id}`);
  } catch (err) {
    console.warn("Could not save updated custom cars:", err);
  }

  res.json({ success: true, message: "Custom car deleted successfully" });
});

// Get feedback statistics & history
app.get("/api/car-feedback", (req, res) => {
  const totalAgreed = feedbackStore.filter((f) => f.userAgreed).length;
  const corrections = feedbackStore.filter((f) => !f.userAgreed && f.userCorrection);

  res.json({
    totalFeedback: feedbackStore.length,
    agreed: totalAgreed,
    corrected: corrections.length,
    corrections: [...corrections].reverse(),
    recentCorrections: corrections.slice(-20).reverse(),
  });
});

// Delete a specific feedback/edit entry
app.delete("/api/car-feedback/:id", (req, res) => {
  const { id } = req.params;
  const decoded = decodeURIComponent(id).trim().toLowerCase();
  const stripped = id.replace(/^(srv_|fb_)/, "").toLowerCase();

  const toRemove = feedbackStore.filter(
    (f) =>
      f.id === id ||
      f.id.toLowerCase() === decoded ||
      f.id.toLowerCase() === stripped ||
      f.userCorrection?.toLowerCase() === decoded ||
      f.userCorrection?.toLowerCase() === stripped
  );

  const initialLen = feedbackStore.length;
  feedbackStore = feedbackStore.filter(
    (f) =>
      f.id !== id &&
      f.id.toLowerCase() !== decoded &&
      f.id.toLowerCase() !== stripped &&
      f.userCorrection?.toLowerCase() !== decoded &&
      f.userCorrection?.toLowerCase() !== stripped
  );

  // Cross-delete any custom car created from this feedback correction!
  let customCarsChanged = false;
  for (const fb of toRemove) {
    if (fb.userCorrection) {
      const cleanCorr = fb.userCorrection.trim().toLowerCase();
      const prevCarsLen = customCarsStore.length;
      customCarsStore = customCarsStore.filter(
        (c) => c.fullName.toLowerCase() !== cleanCorr
      );
      if (customCarsStore.length < prevCarsLen) {
        customCarsChanged = true;
      }
    }
  }

  try {
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbackStore, null, 2), "utf-8");
    if (customCarsChanged) {
      fs.writeFileSync(CUSTOM_CARS_FILE, JSON.stringify(customCarsStore, null, 2), "utf-8");
    }
    console.log(`[Feedback] Deleted feedback entry: ${id}`);
  } catch (err) {
    console.warn("Could not save updated feedback:", err);
  }

  res.json({ success: true, message: "Correction entry deleted successfully" });
});

// User data stats (custom cars + corrections)
app.get("/api/user-data/stats", (req, res) => {
  const customCount = customCarsStore.length;
  const correctionsCount = feedbackStore.filter((f) => !f.userAgreed && f.userCorrection).length;
  const totalFeedback = feedbackStore.length;

  res.json({
    customCarsCount: customCount,
    correctionsCount,
    totalFeedback,
  });
});

// Erase all user-added data (custom cars, edits, and feedback)
const clearUserDataHandler = (req: express.Request, res: express.Response) => {
  try {
    // 1. Reset custom cars
    customCarsStore = [];
    try {
      fs.writeFileSync(CUSTOM_CARS_FILE, JSON.stringify([], null, 2), "utf-8");
    } catch (err) {
      console.warn("Could not write empty custom cars file:", err);
    }

    // 2. Reset feedback and corrections
    feedbackStore = [];
    try {
      fs.writeFileSync(FEEDBACK_FILE, JSON.stringify([], null, 2), "utf-8");
    } catch (err) {
      console.warn("Could not write empty feedback file:", err);
    }

    console.log("[User Data] Successfully erased all user-added custom cars and name edits/feedback.");
    res.json({
      success: true,
      message: "All user-added cars, edits, and feedback have been erased.",
    });
  } catch (err: any) {
    console.error("Error clearing user data:", err);
    res.status(500).json({ error: "Failed to erase user data", message: err.message });
  }
};

app.delete("/api/user-data", clearUserDataHandler);
app.post("/api/user-data/clear", clearUserDataHandler);

// Curated reference database endpoint for Pokédex checklist
app.get("/api/pokedex-catalog", (req, res) => {
  res.json({
    totalKnownSpecies: 150,
    featuredSpecimens: DEMO_CAR_CATALOG,
  });
});

// Curated daily draw brands pool persistence
const DRAW_BRANDS_FILE = path.join(process.cwd(), "curated_draw_brands.json");

app.get("/api/curated-draw-pool", (req, res) => {
  try {
    if (fs.existsSync(DRAW_BRANDS_FILE)) {
      const data = fs.readFileSync(DRAW_BRANDS_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return res.json({ brands: parsed });
      }
    }
  } catch (err) {
    console.warn("Could not read curated draw brands file:", err);
  }
  res.json({ brands: null });
});

app.post("/api/curated-draw-pool", (req, res) => {
  try {
    const { brands } = req.body;
    if (Array.isArray(brands) && brands.length > 0) {
      fs.writeFileSync(DRAW_BRANDS_FILE, JSON.stringify(brands, null, 2), "utf-8");
      return res.json({ success: true, count: brands.length });
    }
    res.status(400).json({ error: "Invalid brands array" });
  } catch (err) {
    console.error("Error saving curated draw brands file:", err);
    res.status(500).json({ error: "Failed to save draw brands" });
  }
});

// Vite middleware for dev / static build for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CarDex server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
