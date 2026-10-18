#include "ssd_features.h"
#include <Arduino.h>

static ssd_t extractor_state;

void init_ssd_features() {
    ssd_init(&extractor_state);
    Serial.println("[SSD] Streaming feature extractor initialized.");
}

void push_audio_to_ssd(const int16_t* samples, size_t count) {
    ssd_push(&extractor_state, samples, count);
}

void get_ssd_features(float features_out[SSD_N_OUT]) {
    ssd_result(&extractor_state, features_out);
}

void reset_ssd_segment() {
    ssd_reset(&extractor_state);
}