import { NextResponse } from "next/server";

export interface IoTTelemetryPayload {
  hiveId?: string;
  temperature?: number;
  humidity?: number;
  weight?: number;
  frequency?: number;
  battery?: number;
  timestamp?: string;
  source?: string;
}

// Global in-memory ring buffer for recent IoT telemetry readings (holds up to 100 points)
const MAX_BUFFER = 100;

interface GlobalTelemetryStore {
  readings: IoTTelemetryPayload[];
  lastUpdated: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __HONEYCHAIN_TELEMETRY__: GlobalTelemetryStore | undefined;
}

if (!global.__HONEYCHAIN_TELEMETRY__) {
  global.__HONEYCHAIN_TELEMETRY__ = {
    readings: [
      {
        hiveId: "Hive #01 - Orchard Yard",
        temperature: 34.6,
        humidity: 58.4,
        weight: 42.6,
        frequency: 228,
        battery: 94,
        timestamp: new Date().toISOString(),
        source: "esp32-gateway-01",
      },
    ],
    lastUpdated: new Date().toISOString(),
  };
}

export async function GET() {
  const store = global.__HONEYCHAIN_TELEMETRY__!;
  return NextResponse.json({
    status: "online",
    activeHives: ["Hive #01 - Orchard Yard", "Hive #04 - Meadow Yard"],
    gateway: "HoneyChain ESP32 LoRaWAN Node v2.4",
    lastUpdated: store.lastUpdated,
    pointCount: store.readings.length,
    latestReading: store.readings[store.readings.length - 1],
    recentHistory: store.readings.slice(-20),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as IoTTelemetryPayload;

    const newReading: IoTTelemetryPayload = {
      hiveId: body.hiveId || "Hive #01 - Orchard Yard",
      temperature: typeof body.temperature === "number" ? Number(body.temperature.toFixed(2)) : 34.5,
      humidity: typeof body.humidity === "number" ? Number(body.humidity.toFixed(1)) : 58.0,
      weight: typeof body.weight === "number" ? Number(body.weight.toFixed(2)) : 42.5,
      frequency: typeof body.frequency === "number" ? Math.round(body.frequency) : 228,
      battery: typeof body.battery === "number" ? Math.round(body.battery) : 95,
      timestamp: new Date().toISOString(),
      source: body.source || "esp32-http-client",
    };

    const store = global.__HONEYCHAIN_TELEMETRY__!;
    store.readings.push(newReading);
    if (store.readings.length > MAX_BUFFER) {
      store.readings.shift();
    }
    store.lastUpdated = newReading.timestamp!;

    return NextResponse.json({
      success: true,
      message: "Telemetry packet accepted and anchored to HoneyChain buffer.",
      reading: newReading,
      totalBuffered: store.readings.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid JSON telemetry payload.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 400 }
    );
  }
}
