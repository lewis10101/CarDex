/**
 * Universal Car Model Resolver & Variant Normalizer
 * Automatically maps trims, variants, engine specs, performance packages,
 * and special editions to their official core production parent model.
 * 
 * Examples:
 * - "F-Type R V8 Supercharged" -> "F-Type" (Jaguar)
 * - "I-Pace EV400 AWD" -> "I-Pace" (Jaguar)
 * - "F-Pace SVR Edition 1988" -> "F-Pace" (Jaguar)
 * - "M3 Competition (G80)" -> "M3" (BMW)
 * - "911 GT3 RS (992)" -> "911" (Porsche)
 */

import { normalizeSearchText } from './textUtils';

export interface ResolvedModel {
  parentModel: string;
  brand: string;
  originalQuery: string;
  matchType: 'exact' | 'alias' | 'prefix' | 'stripped';
}

// Explicit mappings for popular and special variants, trims, and editions
export const EXPLICIT_VARIANT_MAP: Record<string, { brand: string; parentModel: string }> = {
  // Jaguar
  'f-type r': { brand: 'Jaguar', parentModel: 'F-Type' },
  'f-type r v8': { brand: 'Jaguar', parentModel: 'F-Type' },
  'f-type r v8 supercharged': { brand: 'Jaguar', parentModel: 'F-Type' },
  'f-type svr': { brand: 'Jaguar', parentModel: 'F-Type' },
  'f-type project 7': { brand: 'Jaguar', parentModel: 'F-Type' },
  'f-type v6': { brand: 'Jaguar', parentModel: 'F-Type' },
  'f-type v6 s': { brand: 'Jaguar', parentModel: 'F-Type' },
  'f-type 400 sport': { brand: 'Jaguar', parentModel: 'F-Type' },
  'f-type chequered flag': { brand: 'Jaguar', parentModel: 'F-Type' },
  'f-pace svr': { brand: 'Jaguar', parentModel: 'F-Pace' },
  'f-pace svr edition 1988': { brand: 'Jaguar', parentModel: 'F-Pace' },
  'f-pace r-dynamic': { brand: 'Jaguar', parentModel: 'F-Pace' },
  'f-pace r-sport': { brand: 'Jaguar', parentModel: 'F-Pace' },
  'i-pace ev400': { brand: 'Jaguar', parentModel: 'I-Pace' },
  'i-pace ev400 awd': { brand: 'Jaguar', parentModel: 'I-Pace' },
  'i-pace hse': { brand: 'Jaguar', parentModel: 'I-Pace' },
  'i-pace black': { brand: 'Jaguar', parentModel: 'I-Pace' },
  'e-pace p300': { brand: 'Jaguar', parentModel: 'E-Pace' },
  'e-pace r-dynamic': { brand: 'Jaguar', parentModel: 'E-Pace' },
  'xf r-sport': { brand: 'Jaguar', parentModel: 'XF' },
  'xf s': { brand: 'Jaguar', parentModel: 'XF' },
  'xf svr': { brand: 'Jaguar', parentModel: 'XF' },
  'xf sportbrake': { brand: 'Jaguar', parentModel: 'XF' },
  'xf portfolio': { brand: 'Jaguar', parentModel: 'XF' },
  'xf chequered flag': { brand: 'Jaguar', parentModel: 'XF' },
  'xe sv project 8': { brand: 'Jaguar', parentModel: 'XE' },
  'xe r-sport': { brand: 'Jaguar', parentModel: 'XE' },
  'xe s': { brand: 'Jaguar', parentModel: 'XE' },
  'xj supersport': { brand: 'Jaguar', parentModel: 'XJ' },
  'xjr': { brand: 'Jaguar', parentModel: 'XJ' },
  'xjr575': { brand: 'Jaguar', parentModel: 'XJ' },

  // BMW
  'm3 competition': { brand: 'BMW', parentModel: 'M3' },
  'm3 competition (g80)': { brand: 'BMW', parentModel: 'M3' },
  'm3 cs': { brand: 'BMW', parentModel: 'M3' },
  'm3 csl': { brand: 'BMW', parentModel: 'M3' },
  'm3 gts': { brand: 'BMW', parentModel: 'M3' },
  'm3 touring': { brand: 'BMW', parentModel: 'M3' },
  'm4 competition': { brand: 'BMW', parentModel: 'M4' },
  'm4 csl': { brand: 'BMW', parentModel: 'M4' },
  'm4 cs': { brand: 'BMW', parentModel: 'M4' },
  'm4 gts': { brand: 'BMW', parentModel: 'M4' },
  'm5 competition': { brand: 'BMW', parentModel: 'M5' },
  'm5 cs': { brand: 'BMW', parentModel: 'M5' },
  'm5 cs club sport': { brand: 'BMW', parentModel: 'M5' },
  'm2 competition': { brand: 'BMW', parentModel: 'M2' },
  'm2 cs': { brand: 'BMW', parentModel: 'M2' },
  'm2 coupe (g87)': { brand: 'BMW', parentModel: 'M2' },
  'm8 competition': { brand: 'BMW', parentModel: 'M8' },
  'm8 competition gran coupe': { brand: 'BMW', parentModel: 'M8' },
  '320d': { brand: 'BMW', parentModel: '3 Series' },
  '320d m sport': { brand: 'BMW', parentModel: '3 Series' },
  '330i': { brand: 'BMW', parentModel: '3 Series' },
  '330i m sport': { brand: 'BMW', parentModel: '3 Series' },
  '330e': { brand: 'BMW', parentModel: '3 Series' },
  '335i': { brand: 'BMW', parentModel: '3 Series' },
  'm340i': { brand: 'BMW', parentModel: '3 Series' },
  'm340d': { brand: 'BMW', parentModel: '3 Series' },
  '318i': { brand: 'BMW', parentModel: '3 Series' },
  '320i': { brand: 'BMW', parentModel: '3 Series' },
  '328i': { brand: 'BMW', parentModel: '3 Series' },
  '520d': { brand: 'BMW', parentModel: '5 Series' },
  '530d': { brand: 'BMW', parentModel: '5 Series' },
  '530e': { brand: 'BMW', parentModel: '5 Series' },
  'm550i': { brand: 'BMW', parentModel: '5 Series' },
  '540i': { brand: 'BMW', parentModel: '5 Series' },
  '118i': { brand: 'BMW', parentModel: '1 Series' },
  '120d': { brand: 'BMW', parentModel: '1 Series' },
  'm135i': { brand: 'BMW', parentModel: '1 Series' },
  'm140i': { brand: 'BMW', parentModel: '1 Series' },
  'm240i': { brand: 'BMW', parentModel: '2 Series' },
  '220i': { brand: 'BMW', parentModel: '2 Series' },
  '2 series active tourer': { brand: 'BMW', parentModel: '2 Series' },
  '2 series gran coupe': { brand: 'BMW', parentModel: '2 Series' },
  '3 series compact': { brand: 'BMW', parentModel: '3 Series' },
  '3 series touring': { brand: 'BMW', parentModel: '3 Series' },
  '4 series gran coupe': { brand: 'BMW', parentModel: '4 Series' },
  '5 series touring': { brand: 'BMW', parentModel: '5 Series' },
  '6 series gran coupe': { brand: 'BMW', parentModel: '6 Series' },
  '6 series gran turismo': { brand: 'BMW', parentModel: '6 Series' },
  '8 series gran coupe': { brand: 'BMW', parentModel: '8 Series' },

  // Porsche
  '911 gt3': { brand: 'Porsche', parentModel: '911' },
  '911 gt3 rs': { brand: 'Porsche', parentModel: '911' },
  '911 gt3 rs (992)': { brand: 'Porsche', parentModel: '911' },
  '911 gt2': { brand: 'Porsche', parentModel: '911' },
  '911 gt2 rs': { brand: 'Porsche', parentModel: '911' },
  '911 turbo': { brand: 'Porsche', parentModel: '911' },
  '911 turbo s': { brand: 'Porsche', parentModel: '911' },
  '911 turbo s (992)': { brand: 'Porsche', parentModel: '911' },
  '911 carrera': { brand: 'Porsche', parentModel: '911' },
  '911 carrera s': { brand: 'Porsche', parentModel: '911' },
  '911 carrera 4s': { brand: 'Porsche', parentModel: '911' },
  '911 carrera gts': { brand: 'Porsche', parentModel: '911' },
  '911 targa': { brand: 'Porsche', parentModel: '911' },
  '911 targa 4s': { brand: 'Porsche', parentModel: '911' },
  '911 speedster': { brand: 'Porsche', parentModel: '911' },
  '911 dakar': { brand: 'Porsche', parentModel: '911' },
  '911 s/t': { brand: 'Porsche', parentModel: '911' },
  '718 cayman': { brand: 'Porsche', parentModel: '718 Cayman' },
  'cayman': { brand: 'Porsche', parentModel: '718 Cayman' },
  'cayman s': { brand: 'Porsche', parentModel: '718 Cayman' },
  'cayman gts': { brand: 'Porsche', parentModel: '718 Cayman' },
  'cayman gt4': { brand: 'Porsche', parentModel: '718 Cayman' },
  '718 cayman gt4': { brand: 'Porsche', parentModel: '718 Cayman' },
  '718 cayman gt4 rs': { brand: 'Porsche', parentModel: '718 Cayman' },
  '718 boxster': { brand: 'Porsche', parentModel: '718 Boxster' },
  'boxster': { brand: 'Porsche', parentModel: '718 Boxster' },
  'boxster s': { brand: 'Porsche', parentModel: '718 Boxster' },
  'boxster gts': { brand: 'Porsche', parentModel: '718 Boxster' },
  '718 spyder': { brand: 'Porsche', parentModel: '718 Boxster' },
  '718 spyder rs': { brand: 'Porsche', parentModel: '718 Boxster' },
  'taycan': { brand: 'Porsche', parentModel: 'Taycan' },
  'taycan 4s': { brand: 'Porsche', parentModel: 'Taycan' },
  'taycan gts': { brand: 'Porsche', parentModel: 'Taycan' },
  'taycan turbo': { brand: 'Porsche', parentModel: 'Taycan' },
  'taycan turbo s': { brand: 'Porsche', parentModel: 'Taycan' },
  'taycan cross turismo': { brand: 'Porsche', parentModel: 'Taycan' },
  'taycan sport turismo': { brand: 'Porsche', parentModel: 'Taycan' },
  'panamera turbo': { brand: 'Porsche', parentModel: 'Panamera' },
  'panamera gts': { brand: 'Porsche', parentModel: 'Panamera' },
  'macan gts': { brand: 'Porsche', parentModel: 'Macan' },
  'macan turbo': { brand: 'Porsche', parentModel: 'Macan' },
  'cayenne turbo': { brand: 'Porsche', parentModel: 'Cayenne' },
  'cayenne turbo gt': { brand: 'Porsche', parentModel: 'Cayenne' },
  'cayenne gts': { brand: 'Porsche', parentModel: 'Cayenne' },

  // Aston Martin
  'dbs superleggera': { brand: 'Aston Martin', parentModel: 'DBS' },
  'dbs superleggera v12': { brand: 'Aston Martin', parentModel: 'DBS' },
  'dbs 770 ultimate': { brand: 'Aston Martin', parentModel: 'DBS' },
  'vantage f1 edition': { brand: 'Aston Martin', parentModel: 'Vantage' },
  'v8 vantage': { brand: 'Aston Martin', parentModel: 'Vantage' },
  'v12 vantage': { brand: 'Aston Martin', parentModel: 'Vantage' },
  'vantage s': { brand: 'Aston Martin', parentModel: 'Vantage' },
  'db12 super tourer': { brand: 'Aston Martin', parentModel: 'DB12' },
  'dbx707': { brand: 'Aston Martin', parentModel: 'DBX' },
  'dbx707 v8 super suv': { brand: 'Aston Martin', parentModel: 'DBX' },
  'valkyrie v12 hypercar': { brand: 'Aston Martin', parentModel: 'Valkyrie' },
  'valkyrie amr pro': { brand: 'Aston Martin', parentModel: 'Valkyrie' },

  // Mercedes-Benz
  'c63 amg': { brand: 'Mercedes-Benz', parentModel: 'C-Class' },
  'c63 amg s': { brand: 'Mercedes-Benz', parentModel: 'C-Class' },
  'c43 amg': { brand: 'Mercedes-Benz', parentModel: 'C-Class' },
  'c220d': { brand: 'Mercedes-Benz', parentModel: 'C-Class' },
  'c200': { brand: 'Mercedes-Benz', parentModel: 'C-Class' },
  'c300': { brand: 'Mercedes-Benz', parentModel: 'C-Class' },
  'a45 amg': { brand: 'Mercedes-Benz', parentModel: 'A-Class' },
  'a45s amg': { brand: 'Mercedes-Benz', parentModel: 'A-Class' },
  'a35 amg': { brand: 'Mercedes-Benz', parentModel: 'A-Class' },
  'a180': { brand: 'Mercedes-Benz', parentModel: 'A-Class' },
  'a200': { brand: 'Mercedes-Benz', parentModel: 'A-Class' },
  'e63 amg': { brand: 'Mercedes-Benz', parentModel: 'E-Class' },
  'e63s amg': { brand: 'Mercedes-Benz', parentModel: 'E-Class' },
  'e220d': { brand: 'Mercedes-Benz', parentModel: 'E-Class' },
  's63 amg': { brand: 'Mercedes-Benz', parentModel: 'S-Class' },
  's65 amg': { brand: 'Mercedes-Benz', parentModel: 'S-Class' },
  'g63 amg': { brand: 'Mercedes-Benz', parentModel: 'G-Class' },
  'g500': { brand: 'Mercedes-Benz', parentModel: 'G-Class' },
  'amg gt r': { brand: 'Mercedes-Benz', parentModel: 'AMG GT' },
  'amg gt black series': { brand: 'Mercedes-Benz', parentModel: 'AMG GT' },
  'amg gt c': { brand: 'Mercedes-Benz', parentModel: 'AMG GT' },
  'amg gt s': { brand: 'Mercedes-Benz', parentModel: 'AMG GT' },

  // Audi
  'a4 s-line': { brand: 'Audi', parentModel: 'A4' },
  'a4 avant': { brand: 'Audi', parentModel: 'A4' },
  'a4 allroad': { brand: 'Audi', parentModel: 'A4' },
  's4': { brand: 'Audi', parentModel: 'S4' },
  'rs4': { brand: 'Audi', parentModel: 'RS4' },
  'rs4 avant': { brand: 'Audi', parentModel: 'RS4' },
  'a6 avant': { brand: 'Audi', parentModel: 'A6' },
  'a6 allroad': { brand: 'Audi', parentModel: 'A6' },
  's6': { brand: 'Audi', parentModel: 'S6' },
  'rs6': { brand: 'Audi', parentModel: 'RS6' },
  'rs6 avant': { brand: 'Audi', parentModel: 'RS6' },
  'rs6 avant performance': { brand: 'Audi', parentModel: 'RS6' },
  'a3 sportback': { brand: 'Audi', parentModel: 'A3' },
  's3': { brand: 'Audi', parentModel: 'S3' },
  'rs3': { brand: 'Audi', parentModel: 'RS3' },
  'rs3 sportback': { brand: 'Audi', parentModel: 'RS3' },
  'r8 v10': { brand: 'Audi', parentModel: 'R8' },
  'r8 v10 plus': { brand: 'Audi', parentModel: 'R8' },
  'r8 v10 performance': { brand: 'Audi', parentModel: 'R8' },
  'r8 gt': { brand: 'Audi', parentModel: 'R8' },
  'tt rs': { brand: 'Audi', parentModel: 'TT RS' },
  'tts': { brand: 'Audi', parentModel: 'TT' },

  // Volkswagen
  'golf gti': { brand: 'Volkswagen', parentModel: 'Golf' },
  'golf gti clubsport': { brand: 'Volkswagen', parentModel: 'Golf' },
  'golf gti clubsport edition 45': { brand: 'Volkswagen', parentModel: 'Golf' },
  'golf r': { brand: 'Volkswagen', parentModel: 'Golf' },
  'golf r 20 years': { brand: 'Volkswagen', parentModel: 'Golf' },
  'golf gtd': { brand: 'Volkswagen', parentModel: 'Golf' },
  'golf gte': { brand: 'Volkswagen', parentModel: 'Golf' },
  'golf r32': { brand: 'Volkswagen', parentModel: 'Golf' },
  'golf estate': { brand: 'Volkswagen', parentModel: 'Golf' },
  'polo gti': { brand: 'Volkswagen', parentModel: 'Polo' },
  'up! gti': { brand: 'Volkswagen', parentModel: 'Up!' },

  // Ford
  'focus rs': { brand: 'Ford', parentModel: 'Focus' },
  'focus rs500': { brand: 'Ford', parentModel: 'Focus' },
  'focus st': { brand: 'Ford', parentModel: 'Focus' },
  'focus st-line': { brand: 'Ford', parentModel: 'Focus' },
  'focus zetec': { brand: 'Ford', parentModel: 'Focus' },
  'focus titanium': { brand: 'Ford', parentModel: 'Focus' },
  'focus active': { brand: 'Ford', parentModel: 'Focus' },
  'fiesta st': { brand: 'Ford', parentModel: 'Fiesta' },
  'fiesta st-line': { brand: 'Ford', parentModel: 'Fiesta' },
  'fiesta zetec s': { brand: 'Ford', parentModel: 'Fiesta' },
  'fiesta active': { brand: 'Ford', parentModel: 'Fiesta' },
  'mustang gt': { brand: 'Ford', parentModel: 'Mustang' },
  'mustang mach 1': { brand: 'Ford', parentModel: 'Mustang' },
  'mustang shelby gt500': { brand: 'Ford', parentModel: 'Mustang' },
  'mustang bullitt': { brand: 'Ford', parentModel: 'Mustang' },
  'mustang dark horse': { brand: 'Ford', parentModel: 'Mustang' },

  // Vauxhall
  'corsa vxr': { brand: 'Vauxhall', parentModel: 'Corsa' },
  'corsa vxr nürburgring edition': { brand: 'Vauxhall', parentModel: 'Corsa' },
  'corsa gsi': { brand: 'Vauxhall', parentModel: 'Corsa' },
  'astra vxr': { brand: 'Vauxhall', parentModel: 'Astra' },
  'astra gsi': { brand: 'Vauxhall', parentModel: 'Astra' },
  'insignia vxr': { brand: 'Vauxhall', parentModel: 'Insignia' },

  // Land Rover / Range Rover
  'defender 90': { brand: 'Land Rover', parentModel: 'Defender' },
  'defender 110': { brand: 'Land Rover', parentModel: 'Defender' },
  'defender 130': { brand: 'Land Rover', parentModel: 'Defender' },
  'defender v8': { brand: 'Land Rover', parentModel: 'Defender' },
  'defender 90 v8 carpathian': { brand: 'Land Rover', parentModel: 'Defender' },
  'range rover sv': { brand: 'Range Rover', parentModel: 'Range Rover' },
  'range rover autobiography': { brand: 'Range Rover', parentModel: 'Range Rover' },
  'range rover sport svr': { brand: 'Range Rover', parentModel: 'Range Rover Sport' },
  'range rover sport sv': { brand: 'Range Rover', parentModel: 'Range Rover Sport' },
  'range rover sport sv edition one': { brand: 'Range Rover', parentModel: 'Range Rover Sport' },

  // Lotus
  'emira v6': { brand: 'Lotus', parentModel: 'Emira' },
  'emira v6 first edition': { brand: 'Lotus', parentModel: 'Emira' },
  'emira i4': { brand: 'Lotus', parentModel: 'Emira' },
  'exige sport 410': { brand: 'Lotus', parentModel: 'Exige' },
  'exige cup 430': { brand: 'Lotus', parentModel: 'Exige' },
  'elise sport 240': { brand: 'Lotus', parentModel: 'Elise' },
  'elise cup 250': { brand: 'Lotus', parentModel: 'Elise' },

  // MINI
  'mini cooper': { brand: 'MINI', parentModel: 'Hatch' },
  'mini cooper s': { brand: 'MINI', parentModel: 'Hatch' },
  'mini john cooper works': { brand: 'MINI', parentModel: 'Hatch' },
  'mini jcw': { brand: 'MINI', parentModel: 'Hatch' },
  'john cooper works gp': { brand: 'MINI', parentModel: 'Hatch' },
  'john cooper works gp (gp3)': { brand: 'MINI', parentModel: 'Hatch' },

  // Honda
  'civic type r': { brand: 'Honda', parentModel: 'Civic' },
  'civic type s': { brand: 'Honda', parentModel: 'Civic' },
  'civic vtec': { brand: 'Honda', parentModel: 'Civic' },
  'integra type r': { brand: 'Honda', parentModel: 'Integra' },

  // Renault
  'clio renaultsport': { brand: 'Renault', parentModel: 'Clio' },
  'clio renaultsport 182': { brand: 'Renault', parentModel: 'Clio' },
  'clio 172': { brand: 'Renault', parentModel: 'Clio' },
  'clio 182': { brand: 'Renault', parentModel: 'Clio' },
  'clio 197': { brand: 'Renault', parentModel: 'Clio' },
  'clio 200': { brand: 'Renault', parentModel: 'Clio' },
  'clio v6': { brand: 'Renault', parentModel: 'Clio' },
  'megane renaultsport': { brand: 'Renault', parentModel: 'Megane' },
  'megane r.s.': { brand: 'Renault', parentModel: 'Megane' },
  'megane r.s. trophy': { brand: 'Renault', parentModel: 'Megane' },
  'megane r.s. trophy-r': { brand: 'Renault', parentModel: 'Megane' },
  'megane trophy-r': { brand: 'Renault', parentModel: 'Megane' },

  // Bentley
  'continental gt speed': { brand: 'Bentley', parentModel: 'Continental GT' },
  'continental gt v8': { brand: 'Bentley', parentModel: 'Continental GT' },
  'continental gt w12': { brand: 'Bentley', parentModel: 'Continental GT' },
  'continental gt mulliner': { brand: 'Bentley', parentModel: 'Continental GT' },
  'bentayga speed': { brand: 'Bentley', parentModel: 'Bentayga' },
  'bentayga ewb': { brand: 'Bentley', parentModel: 'Bentayga' },
  'flying spur mulliner': { brand: 'Bentley', parentModel: 'Flying Spur' },
  'flying spur speed': { brand: 'Bentley', parentModel: 'Flying Spur' },

  // Rolls-Royce
  'phantom viii': { brand: 'Rolls-Royce', parentModel: 'Phantom' },
  'phantom viii extended': { brand: 'Rolls-Royce', parentModel: 'Phantom' },
  'cullinan black badge': { brand: 'Rolls-Royce', parentModel: 'Cullinan' },
  'cullinan black badge suv': { brand: 'Rolls-Royce', parentModel: 'Cullinan' },
  'ghost black badge': { brand: 'Rolls-Royce', parentModel: 'Ghost' },
  'spectre ultra-luxury ev': { brand: 'Rolls-Royce', parentModel: 'Spectre' },

  // Tesla
  'model s plaid': { brand: 'Tesla', parentModel: 'Model S' },
  'model s plaid tri-motor': { brand: 'Tesla', parentModel: 'Model S' },
  'model 3 performance': { brand: 'Tesla', parentModel: 'Model 3' },
  'model 3 performance highland': { brand: 'Tesla', parentModel: 'Model 3' },
  'model x plaid': { brand: 'Tesla', parentModel: 'Model X' },
  'cybertruck cyberbeast': { brand: 'Tesla', parentModel: 'Cybertruck' },
  'cybertruck cyberbeast tri-motor': { brand: 'Tesla', parentModel: 'Cybertruck' },

  // Dodge
  'challenger srt hellcat': { brand: 'Dodge', parentModel: 'Challenger' },
  'challenger srt demon': { brand: 'Dodge', parentModel: 'Challenger' },
  'challenger srt demon 170': { brand: 'Dodge', parentModel: 'Challenger' },
  'challenger scat pack': { brand: 'Dodge', parentModel: 'Challenger' },
  'charger srt hellcat': { brand: 'Dodge', parentModel: 'Charger' },
  'viper acr': { brand: 'Dodge', parentModel: 'Viper' },
  'viper acr extreme aero': { brand: 'Dodge', parentModel: 'Viper' },

  // Chevrolet & Corvette
  'camaro zl1': { brand: 'Chevrolet', parentModel: 'Camaro' },
  'camaro zl1 1le': { brand: 'Chevrolet', parentModel: 'Camaro' },
  'camaro ss': { brand: 'Chevrolet', parentModel: 'Camaro' },
  'corvette stingray': { brand: 'Chevrolet', parentModel: 'Corvette' },
  'corvette z06': { brand: 'Chevrolet', parentModel: 'Corvette' },
  'corvette zr1': { brand: 'Chevrolet', parentModel: 'Corvette' },
  'corvette e-ray': { brand: 'Chevrolet', parentModel: 'Corvette' },
  'z06 flat-plane crank v8': { brand: 'Chevrolet', parentModel: 'Corvette' },

  // Cadillac
  'ct5-v blackwing': { brand: 'Cadillac', parentModel: 'CT5' },
  'ct4-v blackwing': { brand: 'Cadillac', parentModel: 'CT4' },
  'escalade-v': { brand: 'Cadillac', parentModel: 'Escalade' },

  // Jeep & RAM
  'wrangler rubicon': { brand: 'Jeep', parentModel: 'Wrangler' },
  'wrangler rubicon 392': { brand: 'Jeep', parentModel: 'Wrangler' },
  'grand cherokee trackhawk': { brand: 'Jeep', parentModel: 'Grand Cherokee' },
  '1500 trx': { brand: 'RAM', parentModel: '1500' },
  '1500 trx hellcat': { brand: 'RAM', parentModel: '1500' },

  // Plymouth & Buick
  'superbird 426 hemi': { brand: 'Plymouth', parentModel: 'Superbird' },
  'superbird 426 hemi nascar wing car': { brand: 'Plymouth', parentModel: 'Superbird' },
  'prowler retro hot rod': { brand: 'Plymouth', parentModel: 'Prowler' },
  'gnx mclaren legend': { brand: 'Buick', parentModel: 'Grand National' },
  'grand national gnx': { brand: 'Buick', parentModel: 'Grand National' },

  // Additional Trims & Editions
  'continental gt speed w12': { brand: 'Bentley', parentModel: 'Continental GT' },
  'model s plaid tri-motor 1020hp': { brand: 'Tesla', parentModel: 'Model S' },
  'gr yaris circuit pack': { brand: 'Toyota', parentModel: 'GR Yaris' },
  'lancer evo x fq-440 mr': { brand: 'Mitsubishi', parentModel: 'Lancer Evolution' },
  'lancer evo x': { brand: 'Mitsubishi', parentModel: 'Lancer Evolution' },
  'lancer evo': { brand: 'Mitsubishi', parentModel: 'Lancer Evolution' },
  'impreza 22b sti': { brand: 'Subaru', parentModel: 'Impreza' },
  'impreza 22b': { brand: 'Subaru', parentModel: 'Impreza' },
  'atto 3 design blade battery suv': { brand: 'BYD', parentModel: 'Atto 3' },
  'golf r 20 years edition': { brand: 'Volkswagen', parentModel: 'Golf' },
};

/**
 * Strips trims, packages, engine badges, and special edition names
 * from any car model string to reveal the core production model.
 */
export function cleanToCoreModelName(rawModel: string, brandHint?: string): string {
  if (!rawModel) return '';

  let s = rawModel
    // 1. Remove parenthetical specs e.g. (G80), (992), (GP3), (W205), (E46)
    .replace(/\s*\([^)]*\)/g, '')
    // Remove slash-separated generation/market codes e.g. " / 300"
    .replace(/\s*\/\s*\d+/g, '')
    // 2. Specific multi-word special editions, trim packages & custom designations
    .replace(/\b(carbon series|black series|code red|super sport 300\+?|super sport|spirit r type-a|spirit r|type-a|special equipe|charleston two-tone|gts ford \d+ cleveland|pro twin-scroll|red sport \d+|twin motor performance|twin stromberg|twinair cross|iconic edition|edition 1|edition one|first edition|special edition|final edition|heritage edition|anniversary edition|nürburgring edition|clubsport edition \d+|f1 edition|black edition|carbon edition|limited edition|launch edition|cyan racing edition.*|tommi m[aä]kinen edition|bst edition.*|vr38dett|crabwalk.*|boost mode|polestar engineered|v6 first edition|edition 1988|superleggera v12|superleggera|super suv|v12 hypercar|sv edition one|ev400 awd|r v8 supercharged|svr edition 1988|john cooper works gp|plaid tri-motor|cyberbeast tri-motor|tri-motor|dual-motor|single-motor|performance highland|extreme aero|track pack|flat-plane crank|nascar wing car|retro hot rod|mclaren legend|black badge suv|black badge|ultimate series hypercar|ultra-luxury ev|extended wheelbase|extended|88 classic|109 classic|speed|mulliner|hot hatch legend|hot hatch|membership suv|blade battery suv|flagship suv|rugged classic|cult classic|d-suv|family electric|electric coup[eé]-suv|suv-coup[eé]|circuit pack|invincible|boxer manual|advance ev retro|v-spec.*|renesis rotary|22b sti widebody icon|fq-\d+.*|naturally aspirated|allgrip pro|allgrip|arctic trucks.*|rare icon|660cc kei|japanese exotic|classic jaguar.*|fairlady l24 inline-6|6mt|5mt|9000rpm|dsg|pdk)\b/gi, '')
    // 3. Induction descriptors (Twin-Turbo, Bi-Turbo, Quad-Turbo, etc.)
    .replace(/\b(twin-turbo|bi-turbo|quad-turbo|twin-scroll|twin-rotary|quad-|twin-|bi-)\b/gi, '')
    // 4. Performance trims and variant tags
    .replace(/\b(competition gran coup[eé]|competition coup[eé]|competition|cs club sport|club sport|clubsport|supercharged|turbocharged|biturbo|twin turbo|twinpower|turbo s|turbo|gt4 rs|gt3 rs|gt2 rs|gt3|gt2|gt4|carpathian|trophy-r|trophy|cup|quadrifoglio|autobiography|portfolio|chequered flag|r-sport|r-dynamic|s-line|m sport|amg line|st-line|n-line|gt-line|vrs|cupra|type r|type s|gti|gtd|gte|vxr|svr|amg|m performance|nismo|pista speciale|pista|rhd launch edition|blackwing|demon \d+|demon|hellcat|scat pack|srt-?8|srt|trackhawk|trailhawk|rubicon \d+|rubicon|sahara|overland|zl1 1le|zl1|1le|plaid|cyberbeast|highland|hyper-suv|hypercar)\b/gi, '')
    // 5. Engines & Drivetrain tags
    .replace(/\b(w16|v16|v12|v10|v8|v6|w12|hemi|ev\d+|awd|4wd|4x4|4matic\+?|xdrive|quattro|phev|mhev|hybrid|plug-in|e-hybrid|tdi|cdi|dci|hdi|crdi|tsi|tfsi|ecoboost|puretech|vtec|d\d{3}|p\d{3})\b/gi, '')
    // 6. Engine displacement / power remnants e.g. 6.2, 3.7, 3.8, 1000hp, 265hp, 351, 900
    .replace(/\b\d+\.\d+l?\b/gi, '')
    .replace(/\b\d+hp\b/gi, '')
    // 7. Redundant body style suffixes when attached to a model name
    .replace(/\b(sportback|sportbrake|gran coup[eé]|active tourer|touring|compact|avant|allroad|estate|saloon|sedan|cabriolet|convertible|roadster|spider|coup[eé]|3-door hatch|5-door hatch|3-door|5-door)\b/gi, '')
    .trim();

  // Strip dangling symbols like '+', '-', '_' at ends
  s = s.replace(/^[-_\s+]+|[-_\s+]+$/g, '').replace(/\s+/g, ' ');

  // Brand-specific model cleanups
  const bLower = (brandHint || '').toLowerCase();
  if (bLower === 'mini' && (/john cooper works/i.test(rawModel) || /cooper/i.test(s) || /classic mini/i.test(rawModel))) return 'Hatch';

  if (bLower === 'mercedes-benz' || bLower === 'mercedes') {
    if (/^gt\b/i.test(s) || /amg gt/i.test(rawModel)) return 'GT';
    if (/^c63\b/i.test(s) || /^c\s?\d{2,3}\b/i.test(s)) return 'C-Class';
    if (/^g63\b/i.test(s) || /g-wagon/i.test(rawModel) || /^g\s?\d{2,3}\b/i.test(s)) return 'G-Class';
    if (/^a45\b/i.test(s) || /^a\s?\d{2,3}\b/i.test(s)) return 'A-Class';
    if (/^e63\b/i.test(s) || /^e\s?\d{2,3}\b/i.test(s)) return 'E-Class';
    if (/^s63\b/i.test(s) || /^s\s?\d{2,3}\b/i.test(s)) return 'S-Class';
  }

  if (bLower === 'audi') {
    if (/^r8\b/i.test(s)) return 'R8';
    if (/^rs3\b/i.test(s) || /^s3\b/i.test(s)) return 'A3';
    if (/^rs4\b/i.test(s) || /^s4\b/i.test(s)) return 'A4';
    if (/^rs5\b/i.test(s) || /^s5\b/i.test(s)) return 'A5';
    if (/^rs6\b/i.test(s) || /^s6\b/i.test(s)) return 'A6';
    if (/^rs7\b/i.test(s) || /^s7\b/i.test(s)) return 'A7';
    if (/^s8\b/i.test(s)) return 'A8';
    if (/^tt\b/i.test(s) || /^tts\b/i.test(s) || /^tt rs\b/i.test(s)) return 'TT';
    if (/^sq2\b/i.test(s)) return 'Q2';
    if (/^rs q3\b/i.test(s) || /^sq3\b/i.test(s)) return 'Q3';
    if (/^sq5\b/i.test(s)) return 'Q5';
    if (/^sq7\b/i.test(s)) return 'Q7';
    if (/^sq8\b/i.test(s) || /^rs q8\b/i.test(s)) return 'Q8';
  }

  if (bLower === 'tesla') {
    if (/model s/i.test(s)) return 'Model S';
    if (/model 3/i.test(s)) return 'Model 3';
    if (/model x/i.test(s)) return 'Model X';
    if (/model y/i.test(s)) return 'Model Y';
    if (/cybertruck/i.test(s)) return 'Cybertruck';
    if (/roadster/i.test(s)) return 'Roadster';
    if (/semi/i.test(s)) return 'Semi';
  }

  if (bLower === 'bentley') {
    if (/continental gt/i.test(s)) return 'Continental GT';
    if (/continental/i.test(s)) return 'Continental GT';
    if (/bentayga/i.test(s)) return 'Bentayga';
    if (/flying spur/i.test(s)) return 'Flying Spur';
    if (/mulsanne/i.test(s)) return 'Mulsanne';
    if (/arnage/i.test(s)) return 'Arnage';
  }

  if (bLower === 'land rover') {
    if (/defender/i.test(s)) return 'Defender';
    if (/discovery sport/i.test(s)) return 'Discovery Sport';
    if (/discovery/i.test(s)) return 'Discovery';
    if (/freelander/i.test(s)) return 'Freelander';
    if (/series iii/i.test(s)) return 'Series III';
    if (/series ii/i.test(s)) return 'Series II';
    if (/series i/i.test(s)) return 'Series I';
  }

  if (bLower === 'rolls-royce') {
    if (/phantom/i.test(s)) return 'Phantom';
    if (/ghost/i.test(s)) return 'Ghost';
    if (/wraith/i.test(s)) return 'Wraith';
    if (/dawn/i.test(s)) return 'Dawn';
    if (/cullinan/i.test(s)) return 'Cullinan';
    if (/spectre/i.test(s)) return 'Spectre';
    if (/silver ghost/i.test(s)) return 'Silver Ghost';
    if (/silver shadow/i.test(s)) return 'Silver Shadow';
    if (/silver cloud/i.test(s)) return 'Silver Cloud';
    if (/silver spirit/i.test(s)) return 'Silver Spirit';
    if (/silver dawn/i.test(s)) return 'Silver Dawn';
    if (/silver spur/i.test(s)) return 'Silver Spur';
    if (/silver seraph/i.test(s)) return 'Silver Seraph';
  }

  if (bLower === 'lotus') {
    if (/elise/i.test(s)) return 'Elise';
    if (/exige/i.test(s)) return 'Exige';
    if (/evora/i.test(s)) return 'Evora';
    if (/emira/i.test(s)) return 'Emira';
    if (/eletre/i.test(s)) return 'Eletre';
    if (/evija/i.test(s)) return 'Evija';
    if (/emeya/i.test(s)) return 'Emeya';
    if (/esprit/i.test(s)) return 'Esprit';
  }

  if (bLower === 'mclaren') {
    if (/765lt/i.test(s)) return '765LT';
    if (/720s/i.test(s)) return '720S';
    if (/750s/i.test(s)) return '750S';
    if (/675lt/i.test(s)) return '675LT';
    if (/650s/i.test(s)) return '650S';
    if (/600lt/i.test(s)) return '600LT';
    if (/570s/i.test(s)) return '570S';
    if (/570gt/i.test(s)) return '570GT';
    if (/540c/i.test(s)) return '540C';
    if (/12c/i.test(s)) return '12C';
    if (/p1/i.test(s)) return 'P1';
    if (/f1/i.test(s)) return 'F1';
    if (/senna/i.test(s)) return 'Senna';
    if (/speedtail/i.test(s)) return 'Speedtail';
    if (/elva/i.test(s)) return 'Elva';
    if (/artura/i.test(s)) return 'Artura';
  }

  if (bLower === 'cadillac') {
    if (/ct5/i.test(s)) return 'CT5';
    if (/ct4/i.test(s)) return 'CT4';
    if (/ct6/i.test(s)) return 'CT6';
    if (/cts/i.test(s)) return 'CTS';
    if (/ats/i.test(s)) return 'ATS';
    if (/escalade/i.test(s)) return 'Escalade';
    if (/lyriq/i.test(s)) return 'Lyriq';
    if (/celestiq/i.test(s)) return 'Celestiq';
  }

  if (bLower === 'dodge') {
    if (/challenger/i.test(s)) return 'Challenger';
    if (/charger/i.test(s)) return 'Charger';
    if (/viper/i.test(s)) return 'Viper';
    if (/durango/i.test(s)) return 'Durango';
  }

  if (bLower === 'jeep') {
    if (/grand cherokee/i.test(s)) return 'Grand Cherokee';
    if (/cherokee/i.test(s)) return 'Cherokee';
    if (/wrangler/i.test(s)) return 'Wrangler';
    if (/gladiator/i.test(s)) return 'Gladiator';
    if (/wagoneer/i.test(s)) return 'Wagoneer';
  }

  if (bLower === 'chevrolet') {
    if (/camaro/i.test(s)) return 'Camaro';
    if (/corvette/i.test(s)) return 'Corvette';
    if (/silverado/i.test(s)) return 'Silverado';
  }

  if (bLower === 'ram') {
    if (/1500/i.test(s)) return '1500';
    if (/2500/i.test(s)) return '2500';
    if (/3500/i.test(s)) return '3500';
  }

  if (bLower === 'plymouth') {
    if (/superbird/i.test(s)) return 'Superbird';
    if (/prowler/i.test(s)) return 'Prowler';
    if (/barracuda/i.test(s) || /cuda/i.test(s)) return 'Barracuda';
    if (/road runner/i.test(s)) return 'Road Runner';
  }

  if (bLower === 'buick') {
    if (/gnx/i.test(s) || /grand national/i.test(s)) return 'Grand National';
    if (/riviera/i.test(s)) return 'Riviera';
    if (/skylark/i.test(s)) return 'Skylark';
  }

  if (bLower === 'corvette') {
    return 'Corvette';
  }

  if (bLower === 'alpina') {
    if (/^b3\b/i.test(s)) return 'B3';
    if (/^b5\b/i.test(s)) return 'B5';
  }

  if (bLower === 'brabus') {
    if (/rocket/i.test(s)) return 'Rocket';
  }

  if (bLower === 'pagani') {
    if (/utopia/i.test(s)) return 'Utopia';
    if (/huayra/i.test(s)) return 'Huayra';
    if (/zonda/i.test(s)) return 'Zonda';
  }

  if (bLower === 'de tomaso') {
    if (/pantera/i.test(s)) return 'Pantera';
  }

  if (bLower === 'bugatti') {
    if (/chiron/i.test(s)) return 'Chiron';
    if (/eb110/i.test(s)) return 'EB110';
    if (/veyron/i.test(s)) return 'Veyron';
    if (/tourbillon/i.test(s)) return 'Tourbillon';
    if (/divo/i.test(s)) return 'Divo';
  }

  if (bLower === 'toyota') {
    if (/gr yaris/i.test(s)) return 'GR Yaris';
    if (/gr corolla/i.test(s)) return 'GR Corolla';
    if (/gr86/i.test(s)) return 'GR86';
    if (/gt86/i.test(s)) return 'GT86';
    if (/land cruiser/i.test(s)) return 'Land Cruiser';
    if (/supra/i.test(s)) return 'Supra';
    if (/prius/i.test(s)) return 'Prius';
    if (/yaris cross/i.test(s)) return 'Yaris Cross';
    if (/corolla cross/i.test(s)) return 'Corolla Cross';
    if (/corolla/i.test(s)) return 'Corolla';
    if (/yaris/i.test(s)) return 'Yaris';
  }

  if (bLower === 'honda') {
    if (/s2000/i.test(s)) return 'S2000';
    if (/honda e/i.test(s) || /^e$/i.test(s)) return 'Honda e';
    if (/nsx/i.test(s)) return 'NSX';
    if (/civic/i.test(s)) return 'Civic';
  }

  if (bLower === 'nissan') {
    if (/skyline/i.test(s)) return 'Skyline';
    if (/gt-r/i.test(s)) return 'GT-R';
    if (/370z/i.test(s)) return '370Z';
    if (/350z/i.test(s)) return '350Z';
    if (/300zx/i.test(s)) return '300ZX';
  }

  if (bLower === 'mazda') {
    if (/rx-8/i.test(s)) return 'RX-8';
    if (/rx-7/i.test(s)) return 'RX-7';
    if (/mx-5/i.test(s) || /miata/i.test(rawModel)) return 'MX-5';
  }

  if (bLower === 'subaru') {
    if (/wrx/i.test(s)) return 'WRX';
    if (/impreza/i.test(s)) return 'Impreza';
  }

  if (bLower === 'mitsubishi') {
    if (/lancer evo/i.test(s) || /evolution/i.test(s)) return 'Lancer Evolution';
    if (/lancer/i.test(s)) return 'Lancer';
  }

  if (bLower === 'lexus') {
    if (/lfa/i.test(s)) return 'LFA';
    if (/lc/i.test(s)) return 'LC';
  }

  if (bLower === 'suzuki') {
    if (/jimny/i.test(s)) return 'Jimny';
  }

  if (bLower === 'isuzu') {
    if (/d-max/i.test(s)) return 'D-Max';
    if (/vehicross/i.test(s)) return 'VehiCROSS';
  }

  if (bLower === 'mitsuoka') {
    if (/viewt/i.test(s)) return 'Viewt';
    if (/orochi/i.test(s)) return 'Orochi';
  }

  if (bLower === 'datsun') {
    if (/240z/i.test(s)) return '240Z';
  }

  if (bLower === 'acura') {
    if (/integra/i.test(s)) return 'Integra';
  }

  if (bLower === 'byd') {
    if (/atto 3/i.test(s)) return 'Atto 3';
  }

  if (bLower === 'geely') {
    if (/monjaro/i.test(s)) return 'Monjaro';
  }

  if (bLower === 'lynk & co' || bLower === 'lynk &amp; co') {
    if (/01/i.test(s)) return '01';
  }

  if (bLower === 'aiways') {
    if (/u6/i.test(s)) return 'U6';
  }

  if (bLower === 'leapmotor') {
    if (/c10/i.test(s)) return 'C10';
  }

  if (bLower === 'polestar') {
    if (/4\b/i.test(s)) return 'Polestar 4';
    if (/3\b/i.test(s)) return 'Polestar 3';
    if (/2\b/i.test(s)) return 'Polestar 2';
    if (/1\b/i.test(s)) return 'Polestar 1';
  }

  if (bLower === 'seat') {
    if (/ibiza/i.test(s)) return 'Ibiza';
    if (/leon/i.test(s)) return 'Leon';
  }

  if (bLower === 'skoda' || bLower === 'škoda') {
    if (/octavia/i.test(s)) return 'Octavia';
    if (/superb/i.test(s)) return 'Superb';
    if (/fabia/i.test(s)) return 'Fabia';
  }

  if (bLower === 'lada') {
    if (/niva/i.test(s)) return 'Niva';
    if (/riva/i.test(s)) return 'Riva';
  }

  if (bLower === 'mg') {
    if (/mgb/i.test(s)) return 'MGB';
    if (/mga/i.test(s)) return 'MGA';
    if (/mgf/i.test(s)) return 'MGF';
    if (/mgtf/i.test(s) || /tf/i.test(s)) return 'TF';
  }

  if (bLower === 'peugeot') {
    if (/205/i.test(s)) return '205';
  }

  if (bLower === 'infiniti') {
    if (/q60/i.test(s)) return 'Q60';
  }

  if (bLower === 'ford') {
    if (/^gt\b/i.test(s)) return 'GT';
    if (/ranger/i.test(s)) return 'Ranger';
    if (/focus/i.test(s)) return 'Focus';
    if (/fiesta/i.test(s)) return 'Fiesta';
    if (/mustang/i.test(s) && !/mach-e/i.test(s)) return 'Mustang';
  }

  if (bLower === 'shelby') {
    if (/gt500/i.test(s)) return 'GT500';
    if (/gt350/i.test(s)) return 'GT350';
    if (/cobra/i.test(s)) return 'Cobra';
  }

  if (bLower === 'kia') {
    if (/stinger/i.test(s)) return 'Stinger';
  }

  if (bLower === 'koenigsegg') {
    if (/jesko/i.test(s)) return 'Jesko';
    if (/regera/i.test(s)) return 'Regera';
    if (/gemera/i.test(s)) return 'Gemera';
    if (/agera/i.test(s)) return 'Agera';
    if (/cc850/i.test(s)) return 'CC850';
  }

  if (bLower === 'zenvo') {
    if (/aurora/i.test(s)) return 'Aurora';
    if (/tsr/i.test(s)) return 'TSR';
  }

  if (bLower === 'hillman') {
    if (/avenger/i.test(s)) return 'Avenger';
  }

  if (bLower === 'fiat') {
    if (/panda/i.test(s)) return 'Panda';
  }

  if (bLower === 'volvo') {
    if (/ex30/i.test(s)) return 'EX30';
    if (/^v60/i.test(s)) return 'V60';
  }

  // Cross-brand universal model recognizers
  if (/^911\b/i.test(s)) return '911';
  if (/^taycan\b/i.test(s)) return 'Taycan';
  if (/^718 cayman\b/i.test(s) || /^cayman\b/i.test(s)) return '718 Cayman';
  if (/^718 boxster\b/i.test(s) || /^boxster\b/i.test(s)) return '718 Boxster';
  if (/^f-type\b/i.test(s)) return 'F-Type';
  if (/^f-pace\b/i.test(s)) return 'F-Pace';
  if (/^i-pace\b/i.test(s)) return 'I-Pace';
  if (/^e-pace\b/i.test(s)) return 'E-Pace';
  if (/^e-type\b/i.test(s)) return 'E-Type';
  if (/^c-type\b/i.test(s)) return 'C-Type';
  if (/^d-type\b/i.test(s)) return 'D-Type';
  if (/^xkr\b/i.test(s)) return 'XK';
  if (/^m3\b/i.test(s)) return 'M3';
  if (/^m5\b/i.test(s)) return 'M5';
  if (/^m2\b/i.test(s)) return 'M2';
  if (/^m4\b/i.test(s)) return 'M4';
  if (/^m8\b/i.test(s)) return 'M8';
  if (/^5 series gran turismo\b/i.test(s)) return '5 Series';
  if (/^6 series gran turismo\b/i.test(s)) return '6 Series';
  if (/^2 series active tourer\b/i.test(s) || /^2 series gran coupe\b/i.test(s)) return '2 Series';
  if (/^3 series compact\b/i.test(s) || /^3 series touring\b/i.test(s)) return '3 Series';
  if (/^4 series gran coupe\b/i.test(s)) return '4 Series';
  if (/^6 series gran coupe\b/i.test(s)) return '6 Series';
  if (/^8 series gran coupe\b/i.test(s)) return '8 Series';
  if (/^dbs\b/i.test(s)) return 'DBS';
  if (/^vantage\b/i.test(s) || /vantage$/i.test(s)) return 'Vantage';
  if (/^db12\b/i.test(s)) return 'DB12';
  if (/^db11\b/i.test(s)) return 'DB11';
  if (/^dbx707\b/i.test(s) || /^dbx\b/i.test(s)) return 'DBX';
  if (/^valkyrie\b/i.test(s)) return 'Valkyrie';
  if (/^emira\b/i.test(s)) return 'Emira';
  if (/^corsa\b/i.test(s)) return 'Corsa';
  if (/^fiesta\b/i.test(s)) return 'Fiesta';
  if (/^focus\b/i.test(s)) return 'Focus';
  if (/^mustang\b/i.test(s) && !/mach-e/i.test(s)) return 'Mustang';
  if (/^golf\b/i.test(s)) return 'Golf';
  if (/^polo\b/i.test(s)) return 'Polo';
  if (/^civic\b/i.test(s)) return 'Civic';
  if (/^clio\b/i.test(s)) return 'Clio';
  if (/^megane\b/i.test(s)) return 'Megane';
  if (/^2cv/i.test(s)) return '2CV';
  if (/^488/i.test(s)) return '488';
  if (/^gt-r/i.test(s)) return 'GT-R';
  if (/^370z/i.test(s)) return '370Z';
  if (/^lancer evolution/i.test(s)) return 'Lancer Evolution';
  if (/^stingray/i.test(s) || (bLower === 'corvette' && /stingray/i.test(rawModel))) return 'Corvette';
  if (/^hummer ev/i.test(s)) return 'Hummer EV';
  if (/^gv60/i.test(s)) return 'GV60';
  if (/^gv80/i.test(s)) return 'GV80';
  if (/^03 gt funky cat/i.test(s) || /funky cat/i.test(s)) return 'Funky Cat';
  if (/^03\b/i.test(s)) return '03';
  if (/^polestar 2/i.test(s)) return 'Polestar 2';
  if (/^le[oó]n/i.test(s)) return 'León';
  if (/^allegro/i.test(s)) return 'Allegro';
  if (/^vxr8/i.test(s)) return 'VXR8';
  if (/^tt rs/i.test(s)) return 'TT';

  return s || rawModel;
}

// All recognized brand prefixes for auto-stripping in global searches
const COMMON_BRAND_PREFIXES: { prefix: string; brand: string }[] = [
  { prefix: 'aston martin', brand: 'Aston Martin' },
  { prefix: 'mercedes-benz', brand: 'Mercedes-Benz' },
  { prefix: 'mercedes benz', brand: 'Mercedes-Benz' },
  { prefix: 'mercedes', brand: 'Mercedes-Benz' },
  { prefix: 'land rover', brand: 'Land Rover' },
  { prefix: 'range rover', brand: 'Range Rover' },
  { prefix: 'rolls-royce', brand: 'Rolls-Royce' },
  { prefix: 'rolls royce', brand: 'Rolls-Royce' },
  { prefix: 'austin-healey', brand: 'Austin-Healey' },
  { prefix: 'austin healey', brand: 'Austin-Healey' },
  { prefix: 'alfa romeo', brand: 'Alfa Romeo' },
  { prefix: 'ds automobiles', brand: 'DS Automobiles' },
  { prefix: 'gwm ora', brand: 'GWM ORA' },
  { prefix: 'lynk & co', brand: 'Lynk & Co' },
  { prefix: 'lynk and co', brand: 'Lynk & Co' },
  { prefix: 'great wall', brand: 'Great Wall' },
  { prefix: 'de tomaso', brand: 'De Tomaso' },
  { prefix: 'jaguar', brand: 'Jaguar' },
  { prefix: 'porsche', brand: 'Porsche' },
  { prefix: 'bmw', brand: 'BMW' },
  { prefix: 'audi', brand: 'Audi' },
  { prefix: 'volkswagen', brand: 'Volkswagen' },
  { prefix: 'vw', brand: 'Volkswagen' },
  { prefix: 'bentley', brand: 'Bentley' },
  { prefix: 'ferrari', brand: 'Ferrari' },
  { prefix: 'lamborghini', brand: 'Lamborghini' },
  { prefix: 'maserati', brand: 'Maserati' },
  { prefix: 'lotus', brand: 'Lotus' },
  { prefix: 'mclaren', brand: 'McLaren' },
  { prefix: 'mini', brand: 'MINI' },
  { prefix: 'vauxhall', brand: 'Vauxhall' },
  { prefix: 'mg', brand: 'MG' },
  { prefix: 'ford', brand: 'Ford' },
  { prefix: 'toyota', brand: 'Toyota' },
  { prefix: 'honda', brand: 'Honda' },
  { prefix: 'nissan', brand: 'Nissan' },
  { prefix: 'mazda', brand: 'Mazda' },
  { prefix: 'subaru', brand: 'Subaru' },
  { prefix: 'mitsubishi', brand: 'Mitsubishi' },
  { prefix: 'lexus', brand: 'Lexus' },
  { prefix: 'suzuki', brand: 'Suzuki' },
  { prefix: 'infiniti', brand: 'Infiniti' },
  { prefix: 'renault', brand: 'Renault' },
  { prefix: 'peugeot', brand: 'Peugeot' },
  { prefix: 'citroen', brand: 'Citroën' },
  { prefix: 'citroën', brand: 'Citroën' },
  { prefix: 'fiat', brand: 'Fiat' },
  { prefix: 'hyundai', brand: 'Hyundai' },
  { prefix: 'kia', brand: 'Kia' },
  { prefix: 'genesis', brand: 'Genesis' },
  { prefix: 'volvo', brand: 'Volvo' },
  { prefix: 'polestar', brand: 'Polestar' },
  { prefix: 'skoda', brand: 'Škoda' },
  { prefix: 'škoda', brand: 'Škoda' },
  { prefix: 'seat', brand: 'SEAT' },
  { prefix: 'cupra', brand: 'Cupra' },
  { prefix: 'tesla', brand: 'Tesla' },
  { prefix: 'corvette', brand: 'Corvette' },
  { prefix: 'chevrolet', brand: 'Chevrolet' },
  { prefix: 'dodge', brand: 'Dodge' },
  { prefix: 'jeep', brand: 'Jeep' },
  { prefix: 'shelby', brand: 'Shelby' },
  { prefix: 'cadillac', brand: 'Cadillac' },
  { prefix: 'bugatti', brand: 'Bugatti' },
  { prefix: 'pagani', brand: 'Pagani' },
  { prefix: 'koenigsegg', brand: 'Koenigsegg' },
  { prefix: 'alpina', brand: 'Alpina' },
  { prefix: 'brabus', brand: 'Brabus' },
  { prefix: 'caterham', brand: 'Caterham' },
  { prefix: 'tvr', brand: 'TVR' },
  { prefix: 'morgan', brand: 'Morgan' },
  { prefix: 'ariel', brand: 'Ariel' },
  { prefix: 'bac', brand: 'BAC' },
  { prefix: 'radical', brand: 'Radical' },
  { prefix: 'westfield', brand: 'Westfield' },
  { prefix: 'ginetta', brand: 'Ginetta' },
  { prefix: 'noble', brand: 'Noble' },
  { prefix: 'rover', brand: 'Rover' },
  { prefix: 'austin', brand: 'Austin' },
  { prefix: 'triumph', brand: 'Triumph' },
  { prefix: 'byd', brand: 'BYD' },
  { prefix: 'zeekr', brand: 'Zeekr' },
  { prefix: 'nio', brand: 'NIO' },
  { prefix: 'xpeng', brand: 'XPENG' },
  { prefix: 'geely', brand: 'Geely' },
  { prefix: 'omoda', brand: 'Omoda' },
  { prefix: 'jaecoo', brand: 'Jaecoo' },
  { prefix: 'saab', brand: 'Saab' },
  { prefix: 'rimac', brand: 'Rimac' },
  { prefix: 'zenvo', brand: 'Zenvo' },
];

/**
 * Universal resolution function:
 * Resolves any search query (including trims, editions, engines, or partial names)
 * to the exact parent model and brand 100% of the time.
 */
export function resolveParentModel(
  query: string,
  brandHint?: string,
  knownModelsForBrand?: string[]
): ResolvedModel | null {
  const q = query.trim();
  if (!q) return null;
  const qLower = normalizeSearchText(q);

  // 0. Detect and strip brand prefix if present
  let effectiveBrand = brandHint || '';
  let subQuery = qLower;

  if (!effectiveBrand) {
    for (const b of COMMON_BRAND_PREFIXES) {
      const normPrefix = normalizeSearchText(b.prefix);
      if (qLower.startsWith(normPrefix + ' ') || qLower === normPrefix) {
        effectiveBrand = b.brand;
        subQuery = qLower.slice(normPrefix.length).trim();
        break;
      }
    }
  } else {
    const bPrefix = normalizeSearchText(effectiveBrand) + ' ';
    if (qLower.startsWith(bPrefix)) {
      subQuery = qLower.slice(bPrefix.length).trim();
    }
  }

  // 1. Direct explicit variant dictionary lookup on full query and subQuery
  if (EXPLICIT_VARIANT_MAP[qLower]) {
    const match = EXPLICIT_VARIANT_MAP[qLower];
    if (!effectiveBrand || effectiveBrand.toLowerCase() === match.brand.toLowerCase()) {
      return {
        parentModel: match.parentModel,
        brand: match.brand,
        originalQuery: q,
        matchType: 'alias',
      };
    }
  }

  if (subQuery && subQuery !== qLower && EXPLICIT_VARIANT_MAP[subQuery]) {
    const match = EXPLICIT_VARIANT_MAP[subQuery];
    return {
      parentModel: match.parentModel,
      brand: match.brand,
      originalQuery: q,
      matchType: 'alias',
    };
  }

  // 2. BMW numerical engine badge series mapping (e.g. 320d, 330i, M340i -> 3 Series, M3 Competition -> M3)
  const isBmw = !effectiveBrand || effectiveBrand.toLowerCase().includes('bmw');
  if (isBmw) {
    const target = subQuery || qLower;
    if (/^m3\b/i.test(target)) return { parentModel: 'M3', brand: 'BMW', originalQuery: q, matchType: 'alias' };
    if (/^m4\b/i.test(target)) return { parentModel: 'M4', brand: 'BMW', originalQuery: q, matchType: 'alias' };
    if (/^m5\b/i.test(target)) return { parentModel: 'M5', brand: 'BMW', originalQuery: q, matchType: 'alias' };
    if (/^m2\b/i.test(target)) return { parentModel: 'M2', brand: 'BMW', originalQuery: q, matchType: 'alias' };
    if (/^m8\b/i.test(target)) return { parentModel: 'M8', brand: 'BMW', originalQuery: q, matchType: 'alias' };
    if (/^[1]\d{2}[a-z]?(\s|$)/i.test(target)) return { parentModel: '1 Series', brand: 'BMW', originalQuery: q, matchType: 'alias' };
    if (/^[2]\d{2}[a-z]?(\s|$)/i.test(target)) return { parentModel: '2 Series', brand: 'BMW', originalQuery: q, matchType: 'alias' };
    if (/^[3]\d{2}[a-z]?(\s|$)/i.test(target)) return { parentModel: '3 Series', brand: 'BMW', originalQuery: q, matchType: 'alias' };
    if (/^[4]\d{2}[a-z]?(\s|$)/i.test(target)) return { parentModel: '4 Series', brand: 'BMW', originalQuery: q, matchType: 'alias' };
    if (/^[5]\d{2}[a-z]?(\s|$)/i.test(target)) return { parentModel: '5 Series', brand: 'BMW', originalQuery: q, matchType: 'alias' };
    if (/^[6]\d{2}[a-z]?(\s|$)/i.test(target)) return { parentModel: '6 Series', brand: 'BMW', originalQuery: q, matchType: 'alias' };
    if (/^[7]\d{2}[a-z]?(\s|$)/i.test(target)) return { parentModel: '7 Series', brand: 'BMW', originalQuery: q, matchType: 'alias' };
    if (/^[8]\d{2}[a-z]?(\s|$)/i.test(target)) return { parentModel: '8 Series', brand: 'BMW', originalQuery: q, matchType: 'alias' };
    if (/^m\d{3}[a-z]?(\s|$)/i.test(target)) {
      if (target.startsWith('m135') || target.startsWith('m140')) return { parentModel: '1 Series', brand: 'BMW', originalQuery: q, matchType: 'alias' };
      if (target.startsWith('m235') || target.startsWith('m240')) return { parentModel: '2 Series', brand: 'BMW', originalQuery: q, matchType: 'alias' };
      if (target.startsWith('m340')) return { parentModel: '3 Series', brand: 'BMW', originalQuery: q, matchType: 'alias' };
      if (target.startsWith('m440')) return { parentModel: '4 Series', brand: 'BMW', originalQuery: q, matchType: 'alias' };
      if (target.startsWith('m550')) return { parentModel: '5 Series', brand: 'BMW', originalQuery: q, matchType: 'alias' };
      if (target.startsWith('m850')) return { parentModel: '8 Series', brand: 'BMW', originalQuery: q, matchType: 'alias' };
    }
  }

  // 3. Mercedes numerical badge class mapping (e.g. C63 AMG, C220d -> C-Class)
  const isMercedes = !effectiveBrand || effectiveBrand.toLowerCase().includes('mercedes');
  if (isMercedes) {
    const target = subQuery || qLower;
    if (/^c\s?\d{2,3}/i.test(target)) return { parentModel: 'C-Class', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
    if (/^e\s?\d{2,3}/i.test(target)) return { parentModel: 'E-Class', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
    if (/^s\s?\d{2,3}/i.test(target)) return { parentModel: 'S-Class', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
    if (/^a\s?\d{2,3}/i.test(target)) return { parentModel: 'A-Class', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
    if (/^b\s?\d{2,3}/i.test(target)) return { parentModel: 'B-Class', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
    if (/^g\s?\d{2,3}/i.test(target) || /g-wagon/i.test(target)) return { parentModel: 'G-Class', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
    if (/^cla\s?\d{2,3}/i.test(target)) return { parentModel: 'CLA', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
    if (/^cls\s?\d{2,3}/i.test(target)) return { parentModel: 'CLS', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
    if (/^gla\s?\d{2,3}/i.test(target)) return { parentModel: 'GLA', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
    if (/^glb\s?\d{2,3}/i.test(target)) return { parentModel: 'GLB', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
    if (/^glc\s?\d{2,3}/i.test(target)) return { parentModel: 'GLC', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
    if (/^gle\s?\d{2,3}/i.test(target)) return { parentModel: 'GLE', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
    if (/^gls\s?\d{2,3}/i.test(target)) return { parentModel: 'GLS', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
    if (/^sl\s?\d{2,3}/i.test(target)) return { parentModel: 'SL', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
    if (/^slk\s?\d{2,3}/i.test(target)) return { parentModel: 'SLK', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
    if (/amg gt/i.test(target) || /^gt\b/i.test(target)) return { parentModel: 'GT', brand: 'Mercedes-Benz', originalQuery: q, matchType: 'alias' };
  }

  // 4. Audi performance trims (RS3, S3 -> A3; RS4, S4 -> A4, etc.)
  const isAudi = !effectiveBrand || effectiveBrand.toLowerCase().includes('audi');
  if (isAudi) {
    const target = subQuery || qLower;
    if (/^rs3\b/i.test(target) || /^s3\b/i.test(target)) return { parentModel: 'A3', brand: 'Audi', originalQuery: q, matchType: 'alias' };
    if (/^rs4\b/i.test(target) || /^s4\b/i.test(target)) return { parentModel: 'A4', brand: 'Audi', originalQuery: q, matchType: 'alias' };
    if (/^rs5\b/i.test(target) || /^s5\b/i.test(target)) return { parentModel: 'A5', brand: 'Audi', originalQuery: q, matchType: 'alias' };
    if (/^rs6\b/i.test(target) || /^s6\b/i.test(target)) return { parentModel: 'A6', brand: 'Audi', originalQuery: q, matchType: 'alias' };
    if (/^rs7\b/i.test(target) || /^s7\b/i.test(target)) return { parentModel: 'A7', brand: 'Audi', originalQuery: q, matchType: 'alias' };
    if (/^s8\b/i.test(target)) return { parentModel: 'A8', brand: 'Audi', originalQuery: q, matchType: 'alias' };
    if (/^sq2\b/i.test(target)) return { parentModel: 'Q2', brand: 'Audi', originalQuery: q, matchType: 'alias' };
    if (/^rs q3\b/i.test(target) || /^sq3\b/i.test(target)) return { parentModel: 'Q3', brand: 'Audi', originalQuery: q, matchType: 'alias' };
    if (/^sq5\b/i.test(target)) return { parentModel: 'Q5', brand: 'Audi', originalQuery: q, matchType: 'alias' };
    if (/^sq7\b/i.test(target)) return { parentModel: 'Q7', brand: 'Audi', originalQuery: q, matchType: 'alias' };
    if (/^sq8\b/i.test(target) || /^rs q8\b/i.test(target)) return { parentModel: 'Q8', brand: 'Audi', originalQuery: q, matchType: 'alias' };
    if (/^tts\b/i.test(target) || /^tt rs\b/i.test(target)) return { parentModel: 'TT', brand: 'Audi', originalQuery: q, matchType: 'alias' };
    if (/^rs e-tron gt\b/i.test(target)) return { parentModel: 'e-tron GT', brand: 'Audi', originalQuery: q, matchType: 'alias' };
  }

  // 5. Known models prefix matching (e.g. "F-Type R V8" starts with "F-Type")
  if (knownModelsForBrand && knownModelsForBrand.length > 0) {
    const target = subQuery || qLower;
    const sorted = [...knownModelsForBrand].sort((a, b) => b.length - a.length);
    for (const m of sorted) {
      const mLower = m.toLowerCase();
      if (target === mLower) {
        return { parentModel: m, brand: effectiveBrand || '', originalQuery: q, matchType: 'exact' };
      }
      if (target.startsWith(mLower + ' ') || target.startsWith(mLower + '-')) {
        return { parentModel: m, brand: effectiveBrand || '', originalQuery: q, matchType: 'prefix' };
      }
    }
  }

  // 6. Algorithmic trim/variant stripping on subQuery and full query
  const cleanedSub = cleanToCoreModelName(subQuery, effectiveBrand);
  if (cleanedSub && cleanedSub.toLowerCase() !== qLower) {
    return {
      parentModel: cleanedSub,
      brand: effectiveBrand || '',
      originalQuery: q,
      matchType: 'stripped',
    };
  }

  const cleaned = cleanToCoreModelName(q, effectiveBrand);
  if (cleaned && cleaned.toLowerCase() !== qLower) {
    return {
      parentModel: cleaned,
      brand: effectiveBrand || '',
      originalQuery: q,
      matchType: 'stripped',
    };
  }

  return null;
}
