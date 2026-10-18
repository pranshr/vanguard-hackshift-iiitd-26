#include "AHT20.h"
#include "HX711.h"
#include "TCA9548A.h"
#include <ESP_I2S.h>
#include <Wire.h>

#define WIRE Wire
#define NUM_SENSORS 6


const int HX711_DT_PIN = 1;
const int HX711_SCK_PIN = 2;
const int PDM_CLK_PIN = 42;
const int PDM_DATA_PIN = 41;

TCA9548A<TwoWire> TCA;
AHT20 AHT;
HX711 scale;
I2SClass I2S;


void setup() {
  Serial.begin(115200);
  delay(300);

  Serial.println(
    "Initializing XIAO ESP32S3 Sense Multi-Sensor Half Multiplexed Test..."
  );
  Wire.begin(5, 6);
  TCA.begin(WIRE);

  for (uint8_t i = 0; i < NUM_SENSORS; i++) {
    TCA.openChannel(i);
    delay(5);
    AHT.begin();
    TCA.closeChannel(i);
    Serial.printf("[+] Initialized AHT20 on TCA Channel %d\n", i);
  }

  scale.begin(HX711_DT_PIN, HX711_SCK_PIN);
  scale.set_scale(2280.f);
  scale.tare();
  Serial.println("[+] HX711 Scale initialized successfully.");

  I2S.setPinsPdmRx(PDM_CLK_PIN, PDM_DATA_PIN);
  if (!I2S.begin(I2S_MODE_PDM_RX, 16000, I2S_DATA_BIT_WIDTH_16BIT,
                 I2S_SLOT_MODE_MONO)) {
    Serial.println("[-] I2S.begin FAILED");
    while (1)
      delay(1000);
  }
  Serial.println("[+] MIC OK\n");

  Serial.println("--- Starting Main Loop ---");
}

void loop() {
  // AHT20s
  float temperatures[NUM_SENSORS];
  float humidities[NUM_SENSORS];
  bool statuses[NUM_SENSORS];

  for (uint8_t i = 0; i < NUM_SENSORS; i++) {
    TCA.openChannel(i);
    delay(5); // Let the multiplexer settle
    int ret = AHT.getSensor(&humidities[i], &temperatures[i]);
    TCA.closeChannel(i);

    statuses[i] = (ret != 0);
    if (statuses[i]) {
      humidities[i] *= 100.0f; // Convert to percentage
    }
  }

  // HX711 + Load Cell
  float weight = scale.get_units(3);

  // I2S Mic
  int32_t peak = 0;
  for (int i = 0; i < 2000; i++) {
    int s = I2S.read();
    if (s == 0 || s == -1)
      continue;
    int16_t v = (int16_t)s;
    if (abs(v) > peak)
      peak = abs(v);
  }

  // Printing Telemetry
  // Environmental Data
  for (uint8_t i = 0; i < NUM_SENSORS; i++) {
    if (aht_status[i]) {
      Serial.printf("AHT%d [Ch%d] T: %.2f°C H: %.2f%%  |  ", i + 1, i,
                    temperatures[i], humidities[i]);
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
  delay(1000);
}