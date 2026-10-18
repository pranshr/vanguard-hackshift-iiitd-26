#ifndef MIC_INPUT_H
#define MIC_INPUT_H

#include <stdint.h>
#include <stddef.h>

void init_microphone();
bool read_audio_buffer(int16_t* buffer, size_t length);

#endif