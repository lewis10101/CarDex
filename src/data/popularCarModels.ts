export interface CarModelSuggestion {
  make: string;
  model: string;
  subModel?: string;
  fullName: string;
  category?: string;
}

export const POPULAR_CAR_MODELS: CarModelSuggestion[] = [
  // Porsche
  { make: 'Porsche', model: '911 GT3 RS', fullName: 'Porsche 911 GT3 RS', category: 'Supercar' },
  { make: 'Porsche', model: '911 GT3', fullName: 'Porsche 911 GT3', category: 'Sports Car' },
  { make: 'Porsche', model: '911 Turbo S', fullName: 'Porsche 911 Turbo S', category: 'Supercar' },
  { make: 'Porsche', model: '911 Carrera', fullName: 'Porsche 911 Carrera', category: 'Sports Car' },
  { make: 'Porsche', model: '911 Carrera S', fullName: 'Porsche 911 Carrera S', category: 'Sports Car' },
  { make: 'Porsche', model: '911 GT2 RS', fullName: 'Porsche 911 GT2 RS', category: 'Supercar' },
  { make: 'Porsche', model: '911 Dakar', fullName: 'Porsche 911 Dakar', category: 'Sports Car' },
  { make: 'Porsche', model: '718 Cayman GT4 RS', fullName: 'Porsche 718 Cayman GT4 RS', category: 'Sports Car' },
  { make: 'Porsche', model: '718 Cayman', fullName: 'Porsche 718 Cayman', category: 'Sports Car' },
  { make: 'Porsche', model: '718 Boxster GTS', fullName: 'Porsche 718 Boxster GTS', category: 'Convertible' },
  { make: 'Porsche', model: '718 Boxster', fullName: 'Porsche 718 Boxster', category: 'Convertible' },
  { make: 'Porsche', model: 'Taycan Turbo S', fullName: 'Porsche 718 Boxster', category: 'Electric' },
  { make: 'Porsche', model: 'Taycan 4S', fullName: 'Porsche Taycan 4S', category: 'Electric' },
  { make: 'Porsche', model: 'Panamera Turbo', fullName: 'Porsche Panamera Turbo', category: 'Sedan' },
  { make: 'Porsche', model: 'Macan GTS', fullName: 'Porsche Macan GTS', category: 'SUV' },
  { make: 'Porsche', model: 'Cayenne Turbo GT', fullName: 'Porsche Cayenne Turbo GT', category: 'SUV' },

  // Ford
  { make: 'Ford', model: 'Mustang GT', fullName: 'Ford Mustang GT', category: 'Muscle' },
  { make: 'Ford', model: 'Mustang Mach 1', fullName: 'Ford Mustang Mach 1', category: 'Muscle' },
  { make: 'Ford', model: 'Mustang Dark Horse', fullName: 'Ford Mustang Dark Horse', category: 'Muscle' },
  { make: 'Ford', model: 'Mustang Shelby GT500', fullName: 'Ford Mustang Shelby GT500', category: 'Muscle' },
  { make: 'Ford', model: 'Mustang Shelby GT350', fullName: 'Ford Mustang Shelby GT350', category: 'Muscle' },
  { make: 'Ford', model: 'Mustang EcoBoost', fullName: 'Ford Mustang EcoBoost', category: 'Sports Car' },
  { make: 'Ford', model: 'Mustang Mach-E GT', fullName: 'Ford Mustang Mach-E GT', category: 'Electric' },
  { make: 'Ford', model: 'Ford GT', fullName: 'Ford GT', category: 'Supercar' },
  { make: 'Ford', model: 'Focus RS', fullName: 'Ford Focus RS', category: 'Hot Hatch' },
  { make: 'Ford', model: 'Focus ST', fullName: 'Ford Focus ST', category: 'Hot Hatch' },
  { make: 'Ford', model: 'Fiesta ST', fullName: 'Ford Fiesta ST', category: 'Hot Hatch' },
  { make: 'Ford', model: 'F-150 Raptor', fullName: 'Ford F-150 Raptor', category: 'Truck' },
  { make: 'Ford', model: 'Bronco Raptor', fullName: 'Ford Bronco Raptor', category: 'SUV' },

  // BMW
  { make: 'BMW', model: 'M3 Competition', fullName: 'BMW M3 Competition', category: 'Sports Sedan' },
  { make: 'BMW', model: 'M3 CS', fullName: 'BMW M3 CS', category: 'Sports Sedan' },
  { make: 'BMW', model: 'M4 Competition', fullName: 'BMW M4 Competition', category: 'Coupé' },
  { make: 'BMW', model: 'M4 CSL', fullName: 'BMW M4 CSL', category: 'Coupé' },
  { make: 'BMW', model: 'M5 CS', fullName: 'BMW M5 CS', category: 'Super Sedan' },
  { make: 'BMW', model: 'M5 Competition', fullName: 'BMW M5 Competition', category: 'Super Sedan' },
  { make: 'BMW', model: 'M2 Coupé', fullName: 'BMW M2 Coupé', category: 'Coupé' },
  { make: 'BMW', model: 'M8 Competition', fullName: 'BMW M8 Competition', category: 'Grand Tourer' },
  { make: 'BMW', model: 'M340i', fullName: 'BMW M340i', category: 'Sedan' },
  { make: 'BMW', model: '330i', fullName: 'BMW 330i', category: 'Sedan' },
  { make: 'BMW', model: 'X5 M Competition', fullName: 'BMW X5 M Competition', category: 'SUV' },
  { make: 'BMW', model: 'i4 M50', fullName: 'BMW i4 M50', category: 'Electric' },
  { make: 'BMW', model: 'i8', fullName: 'BMW i8', category: 'Hybrid Sports' },
  { make: 'BMW', model: 'Z4 M40i', fullName: 'BMW Z4 M40i', category: 'Roadster' },

  // Chevrolet
  { make: 'Chevrolet', model: 'Corvette Stingray C8', fullName: 'Chevrolet Corvette Stingray C8', category: 'Sports Car' },
  { make: 'Chevrolet', model: 'Corvette Z06 C8', fullName: 'Chevrolet Corvette Z06 C8', category: 'Supercar' },
  { make: 'Chevrolet', model: 'Corvette E-Ray', fullName: 'Chevrolet Corvette E-Ray', category: 'Supercar' },
  { make: 'Chevrolet', model: 'Corvette ZR1 C7', fullName: 'Chevrolet Corvette ZR1 C7', category: 'Supercar' },
  { make: 'Chevrolet', model: 'Corvette Z06 C7', fullName: 'Chevrolet Corvette Z06 C7', category: 'Sports Car' },
  { make: 'Chevrolet', model: 'Camaro ZL1', fullName: 'Chevrolet Camaro ZL1', category: 'Muscle' },
  { make: 'Chevrolet', model: 'Camaro SS', fullName: 'Chevrolet Camaro SS', category: 'Muscle' },
  { make: 'Chevrolet', model: 'Camaro Z/28', fullName: 'Chevrolet Camaro Z/28', category: 'Muscle' },

  // Mercedes-Benz / AMG
  { make: 'Mercedes-AMG', model: 'GT Coupé', fullName: 'Mercedes-AMG GT Coupé', category: 'Sports Car' },
  { make: 'Mercedes-AMG', model: 'GT Black Series', fullName: 'Mercedes-AMG GT Black Series', category: 'Supercar' },
  { make: 'Mercedes-AMG', model: 'GT 63 S 4-Door', fullName: 'Mercedes-AMG GT 63 S 4-Door', category: 'Super Sedan' },
  { make: 'Mercedes-AMG', model: 'C63 S AMG', fullName: 'Mercedes-AMG C63 S AMG', category: 'Sports Sedan' },
  { make: 'Mercedes-AMG', model: 'E63 S AMG', fullName: 'Mercedes-AMG E63 S AMG', category: 'Super Sedan' },
  { make: 'Mercedes-AMG', model: 'A45 S AMG', fullName: 'Mercedes-AMG A45 S AMG', category: 'Hot Hatch' },
  { make: 'Mercedes-AMG', model: 'G63 AMG', fullName: 'Mercedes-AMG G63 AMG (G-Wagon)', category: 'SUV' },
  { make: 'Mercedes-AMG', model: 'SL63 AMG', fullName: 'Mercedes-AMG SL63 AMG', category: 'Roadster' },
  { make: 'Mercedes-Benz', model: 'C300', fullName: 'Mercedes-Benz C300', category: 'Sedan' },
  { make: 'Mercedes-Benz', model: 'E350', fullName: 'Mercedes-Benz E350', category: 'Sedan' },
  { make: 'Mercedes-Benz', model: 'S580', fullName: 'Mercedes-Benz S580', category: 'Luxury' },

  // Audi
  { make: 'Audi', model: 'R8 V10 Performance', fullName: 'Audi R8 V10 Performance', category: 'Supercar' },
  { make: 'Audi', model: 'RS6 Avant', fullName: 'Audi RS6 Avant', category: 'Wagon' },
  { make: 'Audi', model: 'RS3 Sedan', fullName: 'Audi RS3 Sedan', category: 'Sports Sedan' },
  { make: 'Audi', model: 'RS5 Coupé', fullName: 'Audi RS5 Coupé', category: 'Coupé' },
  { make: 'Audi', model: 'RS7 Sportback', fullName: 'Audi RS7 Sportback', category: 'Super Sedan' },
  { make: 'Audi', model: 'TT RS', fullName: 'Audi TT RS', category: 'Sports Car' },
  { make: 'Audi', model: 'RS e-tron GT', fullName: 'Audi RS e-tron GT', category: 'Electric' },
  { make: 'Audi', model: 'S4', fullName: 'Audi S4', category: 'Sedan' },
  { make: 'Audi', model: 'S5', fullName: 'Audi S5', category: 'Coupé' },

  // Toyota
  { make: 'Toyota', model: 'GR Supra 3.0', fullName: 'Toyota GR Supra 3.0', category: 'Sports Car' },
  { make: 'Toyota', model: 'GR86', fullName: 'Toyota GR86', category: 'Sports Car' },
  { make: 'Toyota', model: 'GR Yaris', fullName: 'Toyota GR Yaris', category: 'Hot Hatch' },
  { make: 'Toyota', model: 'GR Corolla', fullName: 'Toyota GR Corolla', category: 'Hot Hatch' },
  { make: 'Toyota', model: 'Prius', fullName: 'Toyota Prius', category: 'Hybrid' },
  { make: 'Toyota', model: 'Camry TRD', fullName: 'Toyota Camry TRD', category: 'Sedan' },
  { make: 'Toyota', model: 'Corolla', fullName: 'Toyota Corolla', category: 'Sedan' },
  { make: 'Toyota', model: 'RAV4 Prime', fullName: 'Toyota RAV4 Prime', category: 'SUV' },
  { make: 'Toyota', model: 'Land Cruiser', fullName: 'Toyota Land Cruiser', category: 'SUV' },
  { make: 'Toyota', model: '4Runner TRD Pro', fullName: 'Toyota 4Runner TRD Pro', category: 'SUV' },
  { make: 'Toyota', model: 'MR2 Turbo', fullName: 'Toyota MR2 Turbo', category: 'Classic Sports' },

  // Honda
  { make: 'Honda', model: 'Civic Type R FL5', fullName: 'Honda Civic Type R FL5', category: 'Hot Hatch' },
  { make: 'Honda', model: 'Civic Type R FK8', fullName: 'Honda Civic Type R FK8', category: 'Hot Hatch' },
  { make: 'Honda', model: 'Civic Si', fullName: 'Honda Civic Si', category: 'Sports Compact' },
  { make: 'Honda', model: 'S2000', fullName: 'Honda S2000', category: 'Roadster' },
  { make: 'Honda', model: 'NSX Type S', fullName: 'Honda NSX Type S', category: 'Supercar' },
  { make: 'Honda', model: 'NSX NA1', fullName: 'Honda NSX NA1', category: 'Classic Supercar' },
  { make: 'Honda', model: 'Integra Type R DC2', fullName: 'Honda Integra Type R DC2', category: 'Classic Sports' },
  { make: 'Honda', model: 'Accord', fullName: 'Honda Accord', category: 'Sedan' },

  // Nissan
  { make: 'Nissan', model: 'GT-R Nismo (R35)', fullName: 'Nissan GT-R Nismo (R35)', category: 'Supercar' },
  { make: 'Nissan', model: 'GT-R Premium (R35)', fullName: 'Nissan GT-R Premium (R35)', category: 'Supercar' },
  { make: 'Nissan', model: 'Skyline GT-R V-Spec (R34)', fullName: 'Nissan Skyline GT-R V-Spec (R34)', category: 'JDM Legend' },
  { make: 'Nissan', model: 'Skyline GT-R (R33)', fullName: 'Nissan Skyline GT-R (R33)', category: 'JDM Legend' },
  { make: 'Nissan', model: 'Skyline GT-R (R32)', fullName: 'Nissan Skyline GT-R (R32)', category: 'JDM Legend' },
  { make: 'Nissan', model: 'Z Performance (400Z)', fullName: 'Nissan Z Performance (400Z)', category: 'Sports Car' },
  { make: 'Nissan', model: '370Z Nismo', fullName: 'Nissan 370Z Nismo', category: 'Sports Car' },
  { make: 'Nissan', model: '350Z Track', fullName: 'Nissan 350Z Track', category: 'Sports Car' },
  { make: 'Nissan', model: 'Silvia Spec-R (S15)', fullName: 'Nissan Silvia Spec-R (S15)', category: 'JDM Legend' },

  // Dodge
  { make: 'Dodge', model: 'Challenger SRT Demon 170', fullName: 'Dodge Challenger SRT Demon 170', category: 'Muscle' },
  { make: 'Dodge', model: 'Challenger SRT Hellcat', fullName: 'Dodge Challenger SRT Hellcat', category: 'Muscle' },
  { make: 'Dodge', model: 'Challenger R/T Scat Pack', fullName: 'Dodge Challenger R/T Scat Pack', category: 'Muscle' },
  { make: 'Dodge', model: 'Charger SRT Hellcat', fullName: 'Dodge Charger SRT Hellcat', category: 'Muscle Sedan' },
  { make: 'Dodge', model: 'Charger Scat Pack', fullName: 'Dodge Charger Scat Pack', category: 'Muscle Sedan' },
  { make: 'Dodge', model: 'Viper ACR', fullName: 'Dodge Viper ACR', category: 'Supercar' },
  { make: 'Dodge', model: 'Viper GTS', fullName: 'Dodge Viper GTS', category: 'Supercar' },

  // Ferrari
  { make: 'Ferrari', model: 'SF90 Stradale', fullName: 'Ferrari SF90 Stradale', category: 'Hypercar' },
  { make: 'Ferrari', model: '488 Pista', fullName: 'Ferrari 488 Pista', category: 'Supercar' },
  { make: 'Ferrari', model: '488 GTB', fullName: 'Ferrari 488 GTB', category: 'Supercar' },
  { make: 'Ferrari', model: 'F8 Tributo', fullName: 'Ferrari F8 Tributo', category: 'Supercar' },
  { make: 'Ferrari', model: '296 GTB', fullName: 'Ferrari 296 GTB', category: 'Supercar' },
  { make: 'Ferrari', model: '812 Superfast', fullName: 'Ferrari 812 Superfast', category: 'V12 Grand Tourer' },
  { make: 'Ferrari', model: '812 Competizione', fullName: 'Ferrari 812 Competizione', category: 'V12 Supercar' },
  { make: 'Ferrari', model: 'Roma', fullName: 'Ferrari Roma', category: 'Grand Tourer' },
  { make: 'Ferrari', model: 'Daytona SP3', fullName: 'Ferrari Daytona SP3', category: 'Hypercar' },
  { make: 'Ferrari', model: 'LaFerrari', fullName: 'Ferrari LaFerrari', category: 'Hypercar' },
  { make: 'Ferrari', model: '458 Italia', fullName: 'Ferrari 458 Italia', category: 'Supercar' },
  { make: 'Ferrari', model: 'F40', fullName: 'Ferrari F40', category: 'Classic Hypercar' },

  // Lamborghini
  { make: 'Lamborghini', model: 'Revuelto V12', fullName: 'Lamborghini Revuelto V12', category: 'Hypercar' },
  { make: 'Lamborghini', model: 'Aventador SVJ', fullName: 'Lamborghini Aventador SVJ', category: 'V12 Supercar' },
  { make: 'Lamborghini', model: 'Aventador LP700-4', fullName: 'Lamborghini Aventador LP700-4', category: 'V12 Supercar' },
  { make: 'Lamborghini', model: 'Huracán STO', fullName: 'Lamborghini Huracán STO', category: 'Supercar' },
  { make: 'Lamborghini', model: 'Huracán Tecnica', fullName: 'Lamborghini Huracán Tecnica', category: 'Supercar' },
  { make: 'Lamborghini', model: 'Huracán Evo', fullName: 'Lamborghini Huracán Evo', category: 'Supercar' },
  { make: 'Lamborghini', model: 'Huracán Sterrato', fullName: 'Lamborghini Huracán Sterrato', category: 'All-Terrain' },
  { make: 'Lamborghini', model: 'Urus Performante', fullName: 'Lamborghini Urus Performante', category: 'Super SUV' },
  { make: 'Lamborghini', model: 'Urus S', fullName: 'Lamborghini Urus S', category: 'Super SUV' },
  { make: 'Lamborghini', model: 'Countach LPI 800-4', fullName: 'Lamborghini Countach LPI 800-4', category: 'Hypercar' },

  // McLaren
  { make: 'McLaren', model: '765LT', fullName: 'McLaren 765LT', category: 'Supercar' },
  { make: 'McLaren', model: '750S', fullName: 'McLaren 750S', category: 'Supercar' },
  { make: 'McLaren', model: '720S', fullName: 'McLaren 720S', category: 'Supercar' },
  { make: 'McLaren', model: 'Artura', fullName: 'McLaren Artura', category: 'Hybrid Supercar' },
  { make: 'McLaren', model: 'P1', fullName: 'McLaren P1', category: 'Hypercar' },
  { make: 'McLaren', model: 'Senna', fullName: 'McLaren Senna', category: 'Hypercar' },
  { make: 'McLaren', model: '600LT', fullName: 'McLaren 600LT', category: 'Supercar' },
  { make: 'McLaren', model: '570S', fullName: 'McLaren 570S', category: 'Sports Car' },
  { make: 'McLaren', model: 'McLaren GT', fullName: 'McLaren GT', category: 'Grand Tourer' },

  // Aston Martin
  { make: 'Aston Martin', model: 'Vantage V8', fullName: 'Aston Martin Vantage V8', category: 'Sports Car' },
  { make: 'Aston Martin', model: 'Vantage F1 Edition', fullName: 'Aston Martin Vantage F1 Edition', category: 'Sports Car' },
  { make: 'Aston Martin', model: 'DB12', fullName: 'Aston Martin DB12', category: 'Super Tourer' },
  { make: 'Aston Martin', model: 'DB11 V12', fullName: 'Aston Martin DB11 V12', category: 'Grand Tourer' },
  { make: 'Aston Martin', model: 'DBS Superleggera', fullName: 'Aston Martin DBS Superleggera', category: 'Supercar' },
  { make: 'Aston Martin', model: 'DBX 707', fullName: 'Aston Martin DBX 707', category: 'Super SUV' },
  { make: 'Aston Martin', model: 'Valkyrie', fullName: 'Aston Martin Valkyrie', category: 'Hypercar' },

  // Subaru
  { make: 'Subaru', model: 'WRX STI', fullName: 'Subaru WRX STI', category: 'Rally Sports' },
  { make: 'Subaru', model: 'WRX', fullName: 'Subaru WRX', category: 'Sports Sedan' },
  { make: 'Subaru', model: 'BRZ', fullName: 'Subaru BRZ', category: 'Sports Car' },
  { make: 'Subaru', model: 'Impreza 22B STI', fullName: 'Subaru Impreza 22B STI', category: 'JDM Legend' },

  // Mazda
  { make: 'Mazda', model: 'MX-5 Miata ND', fullName: 'Mazda MX-5 Miata ND', category: 'Roadster' },
  { make: 'Mazda', model: 'MX-5 Miata NA', fullName: 'Mazda MX-5 Miata NA', category: 'Classic Roadster' },
  { make: 'Mazda', model: 'RX-7 Spirit R (FD)', fullName: 'Mazda RX-7 Spirit R (FD)', category: 'Rotary Legend' },
  { make: 'Mazda', model: 'RX-8', fullName: 'Mazda RX-8', category: 'Sports Coupé' },
  { make: 'Mazda', model: 'Mazda 3 Turbo', fullName: 'Mazda 3 Turbo', category: 'Hatchback' },

  // Tesla
  { make: 'Tesla', model: 'Model S Plaid', fullName: 'Tesla Model S Plaid', category: 'Electric Super Sedan' },
  { make: 'Tesla', model: 'Model 3 Performance', fullName: 'Tesla Model 3 Performance', category: 'Electric Sports' },
  { make: 'Tesla', model: 'Model 3 Long Range', fullName: 'Tesla Model 3 Long Range', category: 'Electric Sedan' },
  { make: 'Tesla', model: 'Model Y Performance', fullName: 'Tesla Model Y Performance', category: 'Electric SUV' },
  { make: 'Tesla', model: 'Model X Plaid', fullName: 'Tesla Model X Plaid', category: 'Electric SUV' },
  { make: 'Tesla', model: 'Cybertruck Cyberbeast', fullName: 'Tesla Cybertruck Cyberbeast', category: 'Electric Truck' },

  // Volkswagen
  { make: 'Volkswagen', model: 'Golf R (Mk8)', fullName: 'Volkswagen Golf R (Mk8)', category: 'Hot Hatch' },
  { make: 'Volkswagen', model: 'Golf GTI (Mk8)', fullName: 'Volkswagen Golf GTI (Mk8)', category: 'Hot Hatch' },
  { make: 'Volkswagen', model: 'Golf GTI (Mk7)', fullName: 'Volkswagen Golf GTI (Mk7)', category: 'Hot Hatch' },
  { make: 'Volkswagen', model: 'Jetta GLI', fullName: 'Volkswagen Jetta GLI', category: 'Sports Compact' },

  // Hyundai
  { make: 'Hyundai', model: 'Ioniq 5 N', fullName: 'Hyundai Ioniq 5 N', category: 'Electric Hot Hatch' },
  { make: 'Hyundai', model: 'Elantra N', fullName: 'Hyundai Elantra N', category: 'Sports Compact' },
  { make: 'Hyundai', model: 'Veloster N', fullName: 'Hyundai Veloster N', category: 'Hot Hatch' },

  // Lexus
  { make: 'Lexus', model: 'LFA V10', fullName: 'Lexus LFA V10', category: 'Supercar' },
  { make: 'Lexus', model: 'LC 500 V8', fullName: 'Lexus LC 500 V8', category: 'Grand Tourer' },
  { make: 'Lexus', model: 'IS 500 F Sport', fullName: 'Lexus IS 500 F Sport', category: 'V8 Sports Sedan' },
  { make: 'Lexus', model: 'RC F', fullName: 'Lexus RC F', category: 'V8 Coupé' },

  // Alfa Romeo
  { make: 'Alfa Romeo', model: 'Giulia Quadrifoglio', fullName: 'Alfa Romeo Giulia Quadrifoglio', category: 'Sports Sedan' },
  { make: 'Alfa Romeo', model: 'Stelvio Quadrifoglio', fullName: 'Alfa Romeo Stelvio Quadrifoglio', category: 'Performance SUV' },
  { make: 'Alfa Romeo', model: '4C Spider', fullName: 'Alfa Romeo 4C Spider', category: 'Lightweight Sports' },

  // Lotus
  { make: 'Lotus', model: 'Emira V6', fullName: 'Lotus Emira V6', category: 'Sports Car' },
  { make: 'Lotus', model: 'Evora GT', fullName: 'Lotus Evora GT', category: 'Sports Car' },
  { make: 'Lotus', model: 'Exige Cup 430', fullName: 'Lotus Exige Cup 430', category: 'Track Car' },

  // Maserati
  { make: 'Maserati', model: 'MC20 Nettuno', fullName: 'Maserati MC20 Nettuno', category: 'Supercar' },
  { make: 'Maserati', model: 'GranTurismo Trofeo', fullName: 'Maserati GranTurismo Trofeo', category: 'Grand Tourer' },

  // Bugatti
  { make: 'Bugatti', model: 'Chiron Super Sport 300+', fullName: 'Bugatti Chiron Super Sport 300+', category: 'Hypercar' },
  { make: 'Bugatti', model: 'Veyron 16.4 Super Sport', fullName: 'Bugatti Veyron 16.4 Super Sport', category: 'Hypercar' },
  { make: 'Bugatti', model: 'Tourbillon V16', fullName: 'Bugatti Tourbillon V16', category: 'Hypercar' },

  // Koenigsegg
  { make: 'Koenigsegg', model: 'Jesko Attack', fullName: 'Koenigsegg Jesko Attack', category: 'Megacar' },
  { make: 'Koenigsegg', model: 'Agera RS', fullName: 'Koenigsegg Agera RS', category: 'Megacar' },
  { make: 'Koenigsegg', model: 'Regera', fullName: 'Koenigsegg Regera', category: 'Megacar' },

  // Pagani
  { make: 'Pagani', model: 'Huayra BC', fullName: 'Pagani Huayra BC', category: 'Hypercar' },
  { make: 'Pagani', model: 'Zonda Cinque', fullName: 'Pagani Zonda Cinque', category: 'Hypercar' },
  { make: 'Pagani', model: 'Utopia', fullName: 'Pagani Utopia', category: 'Hypercar' },
];

/**
 * Searches and ranks car model suggestions based on user query
 */
export function searchCarModels(query: string, limit = 8): CarModelSuggestion[] {
  const clean = query.trim().toLowerCase();
  if (!clean || clean.length < 1) return [];

  const strippedClean = clean.replace(/[^a-z0-9]/g, '');

  const matches: { item: CarModelSuggestion; score: number }[] = [];

  for (const car of POPULAR_CAR_MODELS) {
    const fullNameLower = car.fullName.toLowerCase();
    const modelLower = car.model.toLowerCase();
    const makeLower = car.make.toLowerCase();
    const strippedFull = fullNameLower.replace(/[^a-z0-9]/g, '');

    let score = 0;

    // Exact match
    if (fullNameLower === clean || modelLower === clean) {
      score += 100;
    }
    // Starts with query
    else if (fullNameLower.startsWith(clean) || modelLower.startsWith(clean)) {
      score += 80;
    }
    // Make starts with query
    else if (makeLower.startsWith(clean)) {
      score += 60;
    }
    // Stripped prefix match (e.g. "911gt3" matches "911 gt3 rs")
    else if (strippedFull.startsWith(strippedClean)) {
      score += 55;
    }
    // Contains query as separate word
    else if (fullNameLower.includes(` ${clean}`) || fullNameLower.includes(`${clean} `)) {
      score += 50;
    }
    // Contains substring
    else if (fullNameLower.includes(clean)) {
      score += 30;
    }
    // Stripped substring match
    else if (strippedFull.includes(strippedClean) && strippedClean.length >= 2) {
      score += 20;
    }

    if (score > 0) {
      matches.push({ item: car, score });
    }
  }

  // Sort by highest score first, then alphabetically
  matches.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.item.fullName.localeCompare(b.item.fullName);
  });

  return matches.slice(0, limit).map((m) => m.item);
}
