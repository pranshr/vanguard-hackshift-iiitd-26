export interface ProductSize {
  size: "250g" | "500g" | "Tasting Trio (3x150g)" | string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  botanicalOrigin: string;
  region: string;
  shortTag: string;
  colorName: string;
  colorHex: string;
  tasteIntensity: number; // 1 (mild) to 5 (bold)
  tasteNotes: string[];
  pairings: string[];
  crystallisationNote: string;
  description: string;
  sizes: ProductSize[];
  activeBatchId: string;
  image: string;
  inStock: boolean;
  isTastingBox?: boolean;
  category?: "Honey" | "Accessory" | "Superfood" | "Pantry";
  bestFor?: string;
  bullets?: string[];
}

export interface HiveTelemetryPoint {
  day: number;
  date: string;
  weightKg: number;
  tempC: number;
  humidityPercent: number;
  isHarvestDay?: boolean;
}

export interface JourneyEvent {
  step: "hive" | "harvest" | "processing" | "lab" | "packed" | "chain";
  title: string;
  date: string;
  location: string;
  actor: string;
  status: "verified" | "completed" | "pending";
  details: string;
  hash: string;
}

export interface LabReport {
  testType: string;
  labName: string;
  accreditation: string;
  date: string;
  status: "Passed - NMR Pure" | "Pending Review";
  moisturePercent: number; // typically 16 - 18%
  c4SugarsPercent: number; // adulteration threshold CSE < 7%, ours < 1.5%
  fructoseGlucoseRatio: number;
  pollenCountPer10g: number;
  ipfsCid: string;
  reportUrl: string;
}

export interface BlockchainRecord {
  network: "Ethereum Sepolia Testnet";
  contractAddress: string;
  txHash: string;
  blockNumber: number;
  merkleRoot: string;
  timestamp: string;
  etherscanUrl: string;
  tamperEvidentNote: string;
}

export interface BatchRecord {
  id: string;
  productId: string;
  productName: string;
  flora: string;
  region: string;
  district: string;
  harvestDate: string;
  packDate: string;
  hiveId: string;
  hiveLocation: string;
  beekeeper: {
    name: string;
    region: string;
    experienceYears: number;
    quote: string;
  };
  acousticStatus: {
    health: string;
    confidencePercent: number;
    model: string;
  };
  telemetry: HiveTelemetryPoint[];
  events: JourneyEvent[];
  labReport: LabReport;
  blockchain: BlockchainRecord;
  isDemo: boolean;
}
