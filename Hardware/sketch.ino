#include "HX711.h"
#include <Adafruit_BME280.h>
#include <ESP_I2S.h>
#include <Wire.h>

const int HX711_DT_PIN = 1;
const int HX711_SCK_PIN = 2;
const int PDM_CLK_PIN = 42;
const int PDM_DATA_PIN = 41;

HX711 scale;
Adafruit_BME280 bme;
I2SClass I2S;

void setup() {
  Serial.begin(115200);
  delay(300);

  Serial.println("Initializing XIAO ESP32S3 Sense Multi-Sensor Test...\n");

  if (!bme.begin(0x76)) {
    Serial.println(
        "[-] BME280 Error: Could not find a valid sensor, check wiring!");
  } else {
    Serial.println("[+] BME280 initialized successfully.");
  }

  scale.begin(HX711_DT_PIN, HX711_SCK_PIN);
  scale.set_scale(2280.f);
  scale.tare();            
  Serial.println("[+] HX711 Scale initialized successfully.");

  I2S.setPinsPdmRx(PDM_CLK_PIN, PDM_DATA_PIN);
  if (!I2S.begin(I2S_MODE_PDM_RX, 16000, I2S_DATA_BIT_WIDTH_16BIT, I2S_SLOT_MODE_MONO)) {
    Serial.println("[-] I2S.begin FAILED");
    while (1)
      delay(1000);
  }
  Serial.println("[+] MIC OK\n");

  Serial.println("--- Starting Main Loop ---");
}

void loop() {

  float temp = bme.readTemperature();
  float humidity = bme.readHumidity();
  float pressure = bme.readPressure() / 100.0F;

  float weight = scale.get_units(3);

  int32_t peak = 0;
  for (int i = 0; i < 2000; i++) {
    int s = I2S.read();
    if (s == 0 || s == -1)
      continue;
    int16_t v = (int16_t)s;
    if (abs(v) > peak)
      peak = abs(v);
  }

  Serial.printf("Temp: %f °C | Humidity: %f % | Pressure: %f hPa | ", temp, humidity, pressure);
  Serial.printf("Weight: %f g | ");
  Serial.printf("Mic Peak=%ld\n", (long)peak);

  delay(100);
}