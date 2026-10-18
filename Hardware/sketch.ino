#include "HX711.h"
#include "TCA9548A.h"
#include "AHT20.h"
#include <ESP_I2S.h>
#include <Wire.h>

#define WIRE Wire
#define NUM_SENSORS 6

// MUX Select Pins for Custom Load Cell Mux (Connected to D7, D8, D9)
const int MUX_S0 = 7; // D7
const int MUX_S1 = 8; // D8
const int MUX_S2 = 9; // D9

// HX711 Shared Pins
const int HX711_DT_PIN  = 1; // D0 (Connected to Custom MUX OUT)
const int HX711_SCK_PIN = 2; // D1 (Shared Clock to all load cells)

// Onboard PDM Microphone Pins (Fixed on XIAO ESP32S3 Sense)
const int PDM_CLK_PIN   = 42;
const int PDM_DATA_PIN  = 41;

// Hardware Objects
TCA9548A<TwoWire> TCA;
AHT20 AHT;
HX711 scale;
I2SClass I2S;

void setupMUX() {
  pinMode(MUX_S0, OUTPUT);
  pinMode(MUX_S1, OUTPUT);
  pinMode(MUX_S2, OUTPUT);
}

void selectLoadCellChannel(uint8_t channel) {
  if (channel > 7) return;

  // Set binary address on MUX select lines
  digitalWrite(MUX_S0, (channel & 0x01) ? HIGH : LOW);
  digitalWrite(MUX_S1, (channel & 0x02) ? HIGH : LOW);
  digitalWrite(MUX_S2, (channel & 0x04) ? HIGH : LOW);
  
  delay(5); // Multiplexer settling time
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000) {}

  Serial.println("Initializing Full XIAO ESP32S3 Sense Stack (AHT20 + HX711 + PDM Mic)...\n");

  // 1. Initialize I2C bus on D4 (SDA = 5) and D5 (SCL = 6)
  Wire.begin(5, 6);
  TCA.begin(WIRE);

  // 2. Initialize all 6 AHT20 sensors across TCA9548A channels 0 to 5
  for (uint8_t i = 0; i < NUM_SENSORS; i++) {
    TCA.openChannel(i);
    delay(5);
    AHT.begin();
    TCA.closeChannel(i);
    Serial.printf("[+] Initialized AHT20 on TCA Channel %d\n", i);
  }

  // 3. Initialize MUX control pins for Load Cells
  setupMUX();

  // 4. Initialize HX711 Scale Stack
  scale.begin(HX711_DT_PIN, HX711_SCK_PIN);
  scale.set_scale(420.f);   // Calibration factor
  scale.tare();             // Reset baseline
  Serial.println("[+] HX711 Scale Stack initialized successfully.");

  // 5. Initialize Onboard PDM Microphone
  I2S.setPinsPdmRx(PDM_CLK_PIN, PDM_DATA_PIN);
  if (!I2S.begin(I2S_MODE_PDM_RX, 16000, I2S_DATA_BIT_WIDTH_16BIT, I2S_SLOT_MODE_MONO)) {
    Serial.println("[-] PDM Microphone I2S.begin FAILED");
    while (1) delay(1000);
  }
  Serial.println("[+] PDM Microphone initialized successfully.\n");

  Serial.println("--- Starting Main Loop ---");
}

void loop() {
  // --- Read All 6 AHT20 Environmental Sensors ---
  float temperatures[NUM_SENSORS];
  float humidities[NUM_SENSORS];
  bool aht_status[NUM_SENSORS];

  for (uint8_t i = 0; i < NUM_SENSORS; i++) {
    TCA.openChannel(i);
    delay(5); // Let the mux settle
    int ret = AHT.getSensor(&humidities[i], &temperatures[i]);
    TCA.closeChannel(i);

    aht_status[i] = (ret != 0);
    if (aht_status[i]) {
      humidities[i] *= 100.0f; // Convert decimal fraction to percentage
    }
  }

  // --- Read All 6 Multiplexed HX711 Load Cells ---
  float weights[NUM_SENSORS];

  for (uint8_t i = 0; i < NUM_SENSORS; i++) {
    selectLoadCellChannel(i);
    
    if (scale.is_ready()) {
      weights[i] = scale.get_units(3); // Average of 3 readings
    } else {
      weights[i] = -999.0f; // Error flag if channel not ready
    }
  }

  // --- Read Onboard PDM Microphone Peak Amplitude ---
  int32_t mic_peak = 0;
  for (int i = 0; i < 2000; i++) {
    int sample = I2S.read();
    if (sample == 0 || sample == -1) continue;
    int16_t val = (int16_t)sample;
    if (abs(val) > mic_peak) {
      mic_peak = abs(val);
    }
  }

  // --- Print Comprehensive Telemetry Report ---
  Serial.println("================================================================================");
  
  // Environmental Data
  for (uint8_t i = 0; i < NUM_SENSORS; i++) {
    if (aht_status[i]) {
      Serial.printf("AHT%d [Ch%d] T: %.2f°C H: %.2f%%  |  ", i + 1, i, temperatures[i], humidities[i]);
    } else {
      Serial.printf("AHT%d [Ch%d] FAILED  |  ", i + 1, i);
    }
  }
  Serial.println();

  // Load Cell Data
  for (uint8_t i = 0; i < NUM_SENSORS; i++) {
    if (weights[i] != -999.0f) {
      Serial.printf("Scale %d: %.2f g  |  ", i + 1, weights[i]);
    } else {
      Serial.printf("Scale %d: NO DATA  |  ", i + 1);
    }
  }
  Serial.println();

  // Audio Data
  Serial.printf("Audio Feed -> PDM Mic Peak Amplitude: %ld\n\n", (long)mic_peak);

  delay(1000); // 1-second cadence sweep
}