#include "api_client.h"
#include <Arduino.h>

void init_wifi_and_api() {
    Serial.println("[API_CLIENT] Running in Offline/Local Mock Mode.");
}

void send_telemetry_to_api(bool anomaly_detected, float score) {
    Serial.println("\n----------------- TELEMETRY PACKET -----------------");
    Serial.printf("  Varroa Alert Flag : %s\n", anomaly_detected ? "WARNING: TRUE" : "NORMAL (false)");
    Serial.printf("  Confidence Score  : %.4f\n", score);
    Serial.println("-----------------------------------------------------\n");
}