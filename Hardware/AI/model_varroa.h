#ifndef MODEL_VARROA_H
#define MODEL_VARROA_H

#define VARROA_FEATURE_COUNT 9 

void init_varroa_model();
float predict_varroa(const float* features);

#endif