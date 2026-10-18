#pragma once
#include <stdint.h>
#include <stddef.h>
#ifdef __cplusplus
extern "C" {
#endif

#ifndef SSD_STRIDE
#define SSD_STRIDE 1   
#endif

#define SSD_SR            16000
#define SSD_N_FFT         1600
#define SSD_HOP           200
#define SSD_N_BANDS       160
#define SSD_BINS_PER_BAND 5
#define SSD_N_OUT         9

typedef struct { float r, i; } ssd_cpx;

typedef struct {
    int16_t ring[SSD_N_FFT];       
    uint32_t wr;                   
    uint32_t n_samples;            
    uint32_t since_hop;            
    uint32_t frame_idx;            
    float    p_prev[SSD_N_BANDS];  
    int      prev_valid;
    double   acc[SSD_N_OUT];       
    uint32_t n_proc;               
    uint32_t n_flux;               
} ssd_t;

void     ssd_init(ssd_t *s);                              
void     ssd_reset(ssd_t *s);                             
void     ssd_push(ssd_t *s, const int16_t *x, size_t n);  
uint32_t ssd_frames(const ssd_t *s);                      
void     ssd_result(const ssd_t *s, float out[SSD_N_OUT]);
#ifdef __cplusplus
}
#endif