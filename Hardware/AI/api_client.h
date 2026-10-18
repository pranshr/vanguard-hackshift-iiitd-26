#ifndef API_CLIENT_H
#define API_CLIENT_H

void init_wifi_and_api();
void send_telemetry_to_api(bool anomaly_detected, float score);

#endif