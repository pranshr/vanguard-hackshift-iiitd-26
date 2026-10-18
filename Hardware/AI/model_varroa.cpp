#include "model_varroa.h"
#include "svm_model.h"
#include "svm_predict.h"

void init_varroa_model() {
    // Initialization if needed
}

float predict_varroa(const float* features) {
    return svm_decision(features); 
}