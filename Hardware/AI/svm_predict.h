// Pure C99, no heap, no dependencies except <math.h>. Model data lives in flash (const).
#pragma once
#include <math.h>
#include "svm_model.h"

// raw[9] in the order given in svm_model.h. Returns the SVM decision value (> 0 -> "infested-like").
static inline float svm_decision(const float raw[SVM_N_FEATURES]) {
    float z[SVM_N_FEATURES];
    for (int j = 0; j < SVM_N_FEATURES; ++j) {
        float v = (raw[j] - SVM_MEAN[j]) / SVM_SCALE[j];
        if (v >  SVM_CLIP) v =  SVM_CLIP;
        if (v < -SVM_CLIP) v = -SVM_CLIP;
        z[j] = v;
    }
    float acc = SVM_INTERCEPT;
    for (int i = 0; i < SVM_N_SV; ++i) {
        const float *s = &SVM_SV[i * SVM_N_FEATURES];
        float d2 = 0.0f;
        for (int j = 0; j < SVM_N_FEATURES; ++j) { float t = z[j] - s[j]; d2 += t * t; }
        acc += SVM_DUAL[i] * expf(-SVM_GAMMA * d2);
    }
    return acc;
}
