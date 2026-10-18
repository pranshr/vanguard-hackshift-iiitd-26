#include "velxio-chip.h"
#include <stdio.h>
#include <stdlib.h>

typedef struct {
  vx_pin pin_s0;
  vx_pin pin_s1;
  vx_pin pin_s2;
  vx_pin pin_en;
  vx_pin pin_out;
  vx_pin pin_in[8];
} chip_state_t;

static void update_mux(chip_state_t *s) {
  // Check Enable pin (Active LOW: VX_HIGH means disabled)
  if (vx_pin_read(s->pin_en) == VX_HIGH) {
    vx_pin_write(s->pin_out, VX_LOW);
    return;
  }

  // Read select lines to form a 3-bit channel index (0 to 7)
  int s0 = (vx_pin_read(s->pin_s0) == VX_HIGH) ? 1 : 0;
  int s1 = (vx_pin_read(s->pin_s1) == VX_HIGH) ? 1 : 0;
  int s2 = (vx_pin_read(s->pin_s2) == VX_HIGH) ? 1 : 0;

  int selected_channel = (s2 << 2) | (s1 << 1) | s0;
  if (selected_channel > 7) selected_channel = 7;

  // Read the selected input pin and write its state to OUT
  int signal = vx_pin_read(s->pin_in[selected_channel]);
  vx_pin_write(s->pin_out, signal);
}

static void on_pin_change(void *ud, vx_pin pin, int value) {
  chip_state_t *s = ud;
  update_mux(s);
}

void chip_setup(void) {
  chip_state_t *s = malloc(sizeof(*s));

  // Register control and output pins
  s->pin_s0  = vx_pin_register("S0",  VX_INPUT);
  s->pin_s1  = vx_pin_register("S1",  VX_INPUT);
  s->pin_s2  = vx_pin_register("S2",  VX_INPUT);
  s->pin_en  = vx_pin_register("EN",  VX_INPUT);
  s->pin_out = vx_pin_register("OUT", VX_OUTPUT);

  // Register all 8 input channel pins
  char pin_name[8];
  for (int i = 0; i < 8; i++) {
    snprintf(pin_name, sizeof(pin_name), "IN%d", i);
    s->pin_in[i] = vx_pin_register(pin_name, VX_INPUT);
    vx_pin_watch(s->pin_in[i], VX_EDGE_BOTH, on_pin_change, s);
  }

  // Watch control lines for changes
  vx_pin_watch(s->pin_s0, VX_EDGE_BOTH, on_pin_change, s);
  vx_pin_watch(s->pin_s1, VX_EDGE_BOTH, on_pin_change, s);
  vx_pin_watch(s->pin_s2, VX_EDGE_BOTH, on_pin_change, s);
  vx_pin_watch(s->pin_en, VX_EDGE_BOTH, on_pin_change, s);

  vx_log("Custom 8:1 MUX ready");
  update_mux(s);
}