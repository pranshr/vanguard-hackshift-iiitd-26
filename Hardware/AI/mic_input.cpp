#include "mic_input.h"
#include <Arduino.h>

// 1 = Simulated / Mock Data for local testing
// 0 = Physical XIAO ESP32S3 Sense (Onboard PDM Mic)
#define USE_SIMULATED_MIC 1

#if !USE_SIMULATED_MIC
#include <driver/i2s.h>
#define PDM_CLK_PIN  42
#define PDM_DATA_PIN 41
#define SAMPLE_RATE  16000
#endif

void init_microphone() {
    #if USE_SIMULATED_MIC
        Serial.println("[MIC_INPUT] Initialized in SIMULATED/MOCK mode.");
    #else
        Serial.println("[MIC_INPUT] Initializing XIAO ESP32S3 PDM Microphone...");
        i2s_config_t i2s_config = {
            .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX | I2S_MODE_PDM),
            .sample_rate = SAMPLE_RATE,
            .bits_per_sample = I2S_BITS_PER_SAMPLE_32BIT,
            .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,
            .communication_format = I2S_COMM_FORMAT_STANDI,
            .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
            .dma_buf_count = 4,
            .dma_buf_len = 256,
            .use_apll = false,
            .tx_desc_auto_clear = false,
            .fixed_mclk = 0
        };

        i2s_pin_config_t pin_config = {
            .bck_io_num = I2S_PIN_NO_CHANGE,
            .ws_io_num = PDM_CLK_PIN,
            .data_out_num = I2S_PIN_NO_CHANGE,
            .data_in_num = PDM_DATA_PIN
        };

        i2s_driver_install(I2S_NUM_0, &i2s_config, 0, NULL);
        i2s_set_pin(I2S_NUM_0, &pin_config);
        i2s_zero_dma_buffer(I2S_NUM_0);
    #endif
}

bool read_audio_buffer(int16_t* buffer, size_t length) {
    #if USE_SIMULATED_MIC
        for (size_t i = 0; i < length; i++) {
            buffer[i] = (int16_t)(32767.0f * sinf(millis() * 0.01f + i * 0.1f));
        }
        delay(100);
        return true;
    #else
        size_t bytesRead = 0;
        int32_t s_buffer[length];
        i2s_read(I2S_NUM_0, (void*)s_buffer, sizeof(s_buffer), &bytesRead, portMAX_DELAY);
        
        size_t samplesRead = bytesRead / sizeof(int32_t);
        if (samplesRead > 0) {
            for (size_t i = 0; i < length && i < samplesRead; i++) {
                buffer[i] = (int16_t)(s_buffer[i] >> 16);
            }
            return true;
        }
        return false;
    #endif
}