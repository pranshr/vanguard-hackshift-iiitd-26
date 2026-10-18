#include "mic_input.h"
#include "ssd_features.h"
#include "model_varroa.h"
#include "api_client.h"

#define CHUNK_SIZE 200  

int16_t audio_chunk[CHUNK_SIZE];
float feature_vector[SSD_N_OUT]; 
ssd_t extractor_state;

void setup() {
    Serial.begin(115200);
    delay(1500); 

    Serial.println("\n--- Starting Beehive Acoustic Monitor ---");

    init_wifi_and_api();
    init_microphone();
    
    ssd_init(&extractor_state);
    Serial.println("[SSD] Streaming feature extractor initialized.");

    init_varroa_model();

    Serial.println("Initialization complete. Entering monitoring loop.");
}

void loop() {
    if (read_audio_buffer(audio_chunk, CHUNK_SIZE)) {
        ssd_push(&extractor_state, audio_chunk, CHUNK_SIZE);

        if (ssd_frames(&extractor_state) > 0) {
            ssd_result(&extractor_state, feature_vector);

            float score = predict_varroa(feature_vector);
            bool alert_flag = (score > 0.0f);

            Serial.printf("Frames Processed: %u | SVM Score: %.4f | Alert: %s\n", 
                          ssd_frames(&extractor_state), score, alert_flag ? "TRUE" : "FALSE");

            send_telemetry_to_api(alert_flag, score);
        }
    }

    delay(1500);
}