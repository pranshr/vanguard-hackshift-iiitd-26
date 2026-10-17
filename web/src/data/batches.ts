import { BatchRecord, HiveTelemetryPoint } from "./types";

/**
 * Generates 75 days of realistic hive telemetry data showing:
 * 1. Base brood nest weight (~22 kg)
 * 2. Exponential accumulation during nectar flow (peaking at ~38.5 kg)
 * 3. Marked harvest day drop (super extraction of ~12.2 kg)
 * 4. Regulated brood core temperature (33.8°C – 35.2°C)
 */
function generateTelemetry(
  startDate: string,
  harvestDayIndex: number,
  peakGainKg: number,
  harvestDropKg: number,
  baseWeight = 22.4
): HiveTelemetryPoint[] {
  const points: HiveTelemetryPoint[] = [];
  const start = new Date(startDate);

  let currentWeight = baseWeight;

  for (let i = 0; i < 75; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    // Weight curve simulation
    if (i < harvestDayIndex) {
      // S-curve nectar accumulation
      const progress = i / harvestDayIndex;
      const gainFactor = Math.pow(progress, 1.8);
      const dailyNoise = (Math.sin(i * 1.3) * 0.18);
      currentWeight = baseWeight + peakGainKg * gainFactor + dailyNoise;
    } else if (i === harvestDayIndex) {
      // Immediate harvest drop
      currentWeight = currentWeight - harvestDropKg;
    } else {
      // Post harvest stabilization
      const postNoise = (Math.sin(i * 0.8) * 0.15);
      currentWeight = (baseWeight + peakGainKg - harvestDropKg) + postNoise + ((i - harvestDayIndex) * 0.05);
    }

    // Brood nest thermoregulation (bees keep core brood at ~34.5°C)
    const tempNoise = Math.sin(i * 0.5) * 0.4 + (Math.cos(i * 0.3) * 0.2);
    const tempC = Number((34.4 + tempNoise).toFixed(1));

    // Brood humidity
    const humNoise = Math.cos(i * 0.7) * 2.5;
    const humidityPercent = Number((59 + humNoise).toFixed(0));

    points.push({
      day: i + 1,
      date: dateStr,
      weightKg: Number(currentWeight.toFixed(2)),
      tempC,
      humidityPercent,
      isHarvestDay: i === harvestDayIndex,
    });
  }

  return points;
}

export const DEMO_BATCHES: Record<string, BatchRecord> = {
  "HC-2026-MUS-014": {
    id: "HC-2026-MUS-014",
    productId: "prod-litchi",
    productName: "Muzaffarpur Litchi Blossom Raw Honey",
    flora: "Litchi Blossom (Litchi chinensis)",
    region: "Bochaha Orchard Yard, Muzaffarpur",
    district: "Muzaffarpur, Bihar",
    harvestDate: "March 28, 2026",
    packDate: "April 06, 2026",
    hiveId: "Hive #H-04",
    hiveLocation: "Bochaha Sector 2 (26.18° N, 85.45° E)",
    beekeeper: {
      name: "Ramdas Mahato",
      region: "Muzaffarpur, Bihar",
      experienceYears: 18,
      quote: "When the litchi bloom opens, you smell it for miles. With the weight scale under Hive #04, we knew the exact afternoon the flow stalled so we harvested without disturbing the brood nest.",
    },
    acousticStatus: {
      health: "Colony Healthy - Normal Foraging Pattern",
      confidencePercent: 98.4,
      model: "Random Forest Classifier on MFCC (40 bands) + Spectral Centroid",
    },
    telemetry: generateTelemetry("2026-01-15", 65, 16.2, 12.4, 22.1),
    events: [
      {
        step: "hive",
        title: "Smart Hive Initialized & Calibrated",
        date: "Jan 15, 2026 · 08:30 IST",
        location: "Bochaha Sector 2, Muzaffarpur",
        actor: "Ramdas Mahato (Certified Beekeeper)",
        status: "verified",
        details: "ESP32 node #ESP-04 paired with HX711 40kg load cell and INMP441 acoustic microphone. Tare weight zeroed at 22.10 kg.",
        hash: "0x8fa14b62e92c617de8394a29c71df1936b1359c2847d8b5a19024fcae1273891",
      },
      {
        step: "harvest",
        title: "Capped Honey Super Extracted",
        date: "March 28, 2026 · 11:15 IST",
        location: "Apiary Extraction Tent, Muzaffarpur",
        actor: "Ramdas Mahato & HoneyChain Field Agent",
        status: "verified",
        details: "Comb capping checked at 94% sealed. Harvest drop recorded: 12.40 kg raw honey from Hive #H-04. Refractometer field reading: 16.3% moisture.",
        hash: "0x3b18c94a0f44e892c90df1a77421376d5402919e18b871c890124ad7651a23bf",
      },
      {
        step: "processing",
        title: "Cold Coarse Filter & Stainless Settling",
        date: "March 30, 2026 · 14:00 IST",
        location: "Regional Clean Facility, Hajipur",
        actor: "S. Roy (Quality Lead)",
        status: "verified",
        details: "Passed through 400-micron stainless screen to catch beeswax cappings without stripping active pollen. Unpasteurized; kept below 36°C.",
        hash: "0xd90142b78918237c154388192a6c117b48992015fa8b3304192bcead7819203a",
      },
      {
        step: "lab",
        title: "NMR Spectroscopy & C4 Testing Passed",
        date: "April 03, 2026 · 16:45 IST",
        location: "National Testing Laboratory, Delhi-NCR",
        actor: "Dr. K. Narayanan (Chief Analytical Chemist)",
        status: "verified",
        details: "Bruker 400 MHz 1H-NMR spectrum matched pure Litchi profile. C4 isotope: negative (<1.1%). Free of high-fructose rice syrup marker peaks.",
        hash: "0x67a914c81048b2915fa829104ccb81924018274a78129bbcd90184fa9281a812",
      },
      {
        step: "packed",
        title: "Glass Jar Packaging & Serialization",
        date: "April 06, 2026 · 10:00 IST",
        location: "HoneyChain Packaging Yard, Patna",
        actor: "Vanguard Packaging Line #2",
        status: "verified",
        details: "Filled into food-grade 250g & 500g glass jars. Individual lid QR code etched with batch hash HC-2026-MUS-014.",
        hash: "0x12b849a0248c891924018ca91204859a710283fa610283ba891029471928019a",
      },
      {
        step: "chain",
        title: "Cryptographic Batch Root Written to Chain",
        date: "April 06, 2026 · 12:22 UTC",
        location: "Ethereum Sepolia Testnet",
        actor: "HoneyChain Smart Contract v1.2",
        status: "verified",
        details: "Batch Merkle root containing all 5 prior stage signatures mined into Sepolia Block #5,489,120.",
        hash: "0x7f9a8b13d42018a90182c47a9812903847291a8291048bcae91823019827461a",
      },
    ],
    labReport: {
      testType: "High-Field 400 MHz 1H-NMR Spectrometry + EA/LC-IRMS C4 Isotope",
      labName: "Bruker BioSpin Accredited Partner Facility",
      accreditation: "NABL / ISO-IEC 17025 Certified",
      date: "April 03, 2026",
      status: "Passed - NMR Pure",
      moisturePercent: 16.4,
      c4SugarsPercent: 1.1,
      fructoseGlucoseRatio: 1.28,
      pollenCountPer10g: 44200,
      ipfsCid: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
      reportUrl: "#",
    },
    blockchain: {
      network: "Ethereum Sepolia Testnet",
      contractAddress: "0x892a0149C3048921820bFa849182301824018261",
      txHash: "0x7f9a8b13d42018a90182c47a9812903847291a8291048bcae91823019827461a",
      blockNumber: 5489120,
      merkleRoot: "0x39a102b48920148192a839102948ca918239019248a91823901284910284910a",
      timestamp: "2026-04-06T12:22:18Z",
      etherscanUrl: "https://sepolia.etherscan.io/tx/0x7f9a8b13d42018a90182c47a9812903847291a8291048bcae91823019827461a",
      tamperEvidentNote: "This record cannot be edited, rolled back, or deleted once confirmed on the Ethereum Sepolia testnet.",
    },
    isDemo: true,
  },
  "HC-2026-KSH-008": {
    id: "HC-2026-KSH-008",
    productId: "prod-acacia",
    productName: "Kashmir White Acacia Raw Honey",
    flora: "White Acacia (Robinia pseudoacacia)",
    region: "Tral Valley High Apiary, Pulwama",
    district: "Pulwama, Jammu & Kashmir",
    harvestDate: "May 22, 2026",
    packDate: "May 30, 2026",
    hiveId: "Hive #H-12",
    hiveLocation: "Tral Valley Slopes (33.93° N, 75.12° E)",
    beekeeper: {
      name: "Bashir Ahmad",
      region: "Pulwama, Jammu & Kashmir",
      experienceYears: 24,
      quote: "Acacia bloom lasts just 11 to 14 days in our valley before mountain storms blow the petals down. Watching hive weight hour by hour tells us when the white nectar is clean before bees start foraging wild clover.",
    },
    acousticStatus: {
      health: "Colony Healthy - Normal Foraging Pattern",
      confidencePercent: 99.1,
      model: "Random Forest Classifier on MFCC (40 bands) + Spectral Centroid",
    },
    telemetry: generateTelemetry("2026-03-10", 64, 18.1, 14.2, 21.8),
    events: [
      {
        step: "hive",
        title: "Smart Hive Deployed in Tral Valley",
        date: "March 10, 2026 · 09:00 IST",
        location: "Tral High Slope, Pulwama",
        actor: "Bashir Ahmad (Master Apiarist)",
        status: "verified",
        details: "Node deployed at 1,820m elevation. Baseline telemetry verified across LTE-M network.",
        hash: "0x448a9128019482b8192a8391029482746190192847a91823901284910284910a",
      },
      {
        step: "harvest",
        title: "High-Altitude Pure Acacia Harvest",
        date: "May 22, 2026 · 10:45 IST",
        location: "Tral Apiary Field Camp",
        actor: "Bashir Ahmad",
        status: "verified",
        details: "Water-white comb frames removed. Net extracted weight: 14.20 kg. Refractive moisture reading: 15.9%.",
        hash: "0x1928374a819203847291048bac91827461028394819203847192840192847192",
      },
      {
        step: "processing",
        title: "Unheated Micro-Screen Filtration",
        date: "May 25, 2026 · 11:30 IST",
        location: "Srinagar Certified Apiary Unit",
        actor: "Mir Farooq (Processing Inspector)",
        status: "verified",
        details: "Gravity settled over 48 hours without heat. Preserves native acacia enzymes and natural clear viscosity.",
        hash: "0x9812739481920384719284019284719203847192830192847192839102948192",
      },
      {
        step: "lab",
        title: "Full NMR Spectral Profile Validated",
        date: "May 28, 2026 · 15:10 IST",
        location: "NABL Food Quality Laboratory, Chandigarh",
        actor: "Dr. Ananya Sharma",
        status: "verified",
        details: "NMR test confirms single-source Robinia pseudoacacia markers. Zero high-fructose rice or beet adulterant.",
        hash: "0x3918274019283746192038471920384719284019284719203847192840192847",
      },
      {
        step: "packed",
        title: "Nitrogen Purged Glass Bottling",
        date: "May 30, 2026 · 13:00 IST",
        location: "HoneyChain Packaging Hub, Pulwama",
        actor: "Quality Assurance Unit",
        status: "verified",
        details: "Bottled into UV-protective glass jars with cryptographic serial seal HC-2026-KSH-008.",
        hash: "0x7182930491827364519283746192837461928374619283746192837461928374",
      },
      {
        step: "chain",
        title: "Sepolia Testnet Batch Seal",
        date: "May 30, 2026 · 14:48 UTC",
        location: "Ethereum Sepolia Testnet",
        actor: "HoneyChain Contract v1.2",
        status: "verified",
        details: "Batch root sealed in Sepolia Block #5,532,840.",
        hash: "0x892a0149c3048921820bfa8491823018240182618920148192a839102948ca91",
      },
    ],
    labReport: {
      testType: "High-Field 400 MHz 1H-NMR Spectrometry + EA/LC-IRMS C4 Isotope",
      labName: "NABL Certified Food Analytics Center",
      accreditation: "ISO-IEC 17025 Certified",
      date: "May 28, 2026",
      status: "Passed - NMR Pure",
      moisturePercent: 15.9,
      c4SugarsPercent: 0.9,
      fructoseGlucoseRatio: 1.48,
      pollenCountPer10g: 38900,
      ipfsCid: "QmZtmD2qtjyjpquQnrA8upPW22646dm6ZssELN4NnikwLM",
      reportUrl: "#",
    },
    blockchain: {
      network: "Ethereum Sepolia Testnet",
      contractAddress: "0x892a0149C3048921820bFa849182301824018261",
      txHash: "0x892a0149c3048921820bfa8491823018240182618920148192a839102948ca91",
      blockNumber: 5532840,
      merkleRoot: "0x2849102948ca918239019248a91823901284910284910a39a102b48920148192",
      timestamp: "2026-05-30T14:48:02Z",
      etherscanUrl: "https://sepolia.etherscan.io/tx/0x892a0149c3048921820bfa8491823018240182618920148192a839102948ca91",
      tamperEvidentNote: "This record cannot be edited, rolled back, or deleted once confirmed on the Ethereum Sepolia testnet.",
    },
    isDemo: true,
  },
  "HC-2026-SUN-021": {
    id: "HC-2026-SUN-021",
    productId: "prod-mangrove",
    productName: "Sundarbans Wild Mangrove Forest Honey",
    flora: "Wild Mangrove (Aegiceras corniculatum & Avicennia)",
    region: "Buffer Boundary Apiary, Gosaba",
    district: "Sundarbans, West Bengal",
    harvestDate: "April 18, 2026",
    packDate: "April 26, 2026",
    hiveId: "Hive #H-09",
    hiveLocation: "Gosaba Island Buffer (22.16° N, 88.80° E)",
    beekeeper: {
      name: "Subal Mondal",
      region: "Sundarbans Buffer, West Bengal",
      experienceYears: 16,
      quote: "Before HoneyChain smart hives, collectors had to venture deep into tiger reserves to hunt wild comb. Our managed buffer apiaries keep families safe, and the sensors let us know when the mangrove nectar has peaked without disturbing the bees.",
    },
    acousticStatus: {
      health: "Colony Healthy - Normal Foraging Pattern",
      confidencePercent: 97.8,
      model: "Random Forest Classifier on MFCC (40 bands) + Spectral Centroid",
    },
    telemetry: generateTelemetry("2026-02-01", 66, 17.4, 13.1, 23.0),
    events: [
      {
        step: "hive",
        title: "Managed Buffer Hive Logged",
        date: "Feb 01, 2026 · 07:15 IST",
        location: "Gosaba Island Buffer Yard",
        actor: "Subal Mondal (Community Apiarist)",
        status: "verified",
        details: "Tidal-safe elevated platform hive initialized with wireless weight and temperature monitoring.",
        hash: "0x1203847192840192847192038471928401928471920384719283019284719283",
      },
      {
        step: "harvest",
        title: "Wild Mangrove Comb Extraction",
        date: "April 18, 2026 · 11:30 IST",
        location: "Gosaba Extraction Center",
        actor: "Subal Mondal",
        status: "verified",
        details: "Dark amber mangrove honey extracted. Weight drop: 13.10 kg. Refractometer test: 17.1% moisture.",
        hash: "0x7890123456789012345678901234567890123456789012345678901234567890",
      },
      {
        step: "processing",
        title: "Cold Filtration & Sediment Removal",
        date: "April 21, 2026 · 14:00 IST",
        location: "Kolkata Processing Laboratory",
        actor: "B. Chattopadhyay",
        status: "verified",
        details: "Coarse mesh screening to eliminate forest debris while protecting natural floral waxes.",
        hash: "0xabcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
      },
      {
        step: "lab",
        title: "NMR Fingerprint Analysis Passed",
        date: "April 24, 2026 · 16:30 IST",
        location: "Eastern Regional Analysis Center, Kolkata",
        actor: "Dr. P. Sen",
        status: "verified",
        details: "Complex tannin and amino acid spectral profile matches authentic Sundarbans mangrove flora. C4 test negative (<1.2%).",
        hash: "0x456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123",
      },
      {
        step: "packed",
        title: "Apothecary Glass Sealed & Serialized",
        date: "April 26, 2026 · 09:30 IST",
        location: "HoneyChain Packaging Hub, Kolkata",
        actor: "Packaging Lead",
        status: "verified",
        details: "Sealed with tamper-evident batch tag HC-2026-SUN-021.",
        hash: "0x89abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234567",
      },
      {
        step: "chain",
        title: "Sepolia Testnet Proof Mined",
        date: "April 26, 2026 · 11:14 UTC",
        location: "Ethereum Sepolia Testnet",
        actor: "HoneyChain Contract v1.2",
        status: "verified",
        details: "Immutable Merkle record sealed in Sepolia Block #5,504,112.",
        hash: "0x6789abcdef0123456789abcdef0123456789abcdef0123456789abcdef012345",
      },
    ],
    labReport: {
      testType: "High-Field 400 MHz 1H-NMR Spectrometry + EA/LC-IRMS C4 Isotope",
      labName: "Eastern Regional Analytical Quality Lab",
      accreditation: "ISO-IEC 17025 Certified",
      date: "April 24, 2026",
      status: "Passed - NMR Pure",
      moisturePercent: 17.1,
      c4SugarsPercent: 1.2,
      fructoseGlucoseRatio: 1.18,
      pollenCountPer10g: 51200,
      ipfsCid: "QmR8Gj9oK23Q3WknFiJnKLwHCnL72vedxjQkDDP1mXW55r",
      reportUrl: "#",
    },
    blockchain: {
      network: "Ethereum Sepolia Testnet",
      contractAddress: "0x892a0149C3048921820bFa849182301824018261",
      txHash: "0x6789abcdef0123456789abcdef0123456789abcdef0123456789abcdef012345",
      blockNumber: 5504112,
      merkleRoot: "0x192839019248a91823901284910284910a39a102b489201481922849102948ca",
      timestamp: "2026-04-26T11:14:30Z",
      etherscanUrl: "https://sepolia.etherscan.io/tx/0x6789abcdef0123456789abcdef0123456789abcdef0123456789abcdef012345",
      tamperEvidentNote: "This record cannot be edited, rolled back, or deleted once confirmed on the Ethereum Sepolia testnet.",
    },
    isDemo: true,
  },
};

export function getBatchById(id: string): BatchRecord | undefined {
  if (!id) return undefined;
  const cleanId = id.trim().toUpperCase();
  if (DEMO_BATCHES[cleanId]) return DEMO_BATCHES[cleanId];

  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(`honeychain_batch_${cleanId}`);
      if (stored) {
        return JSON.parse(stored) as BatchRecord;
      }
    } catch {
      // ignore
    }
  }

  return undefined;
}

export function getAllBatches(): BatchRecord[] {
  return Object.values(DEMO_BATCHES);
}

export function isValidBatchId(id: string): boolean {
  return Boolean(getBatchById(id));
}
