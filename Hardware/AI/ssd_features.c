#include "ssd_features.h"
#include <math.h>
#include <string.h>

#define NH (SSD_N_FFT / 2)                 
static ssd_cpx tw[NH];                     
static ssd_cpx twr[NH + 1];                
static float   hann[SSD_N_FFT];
static float   bandf[SSD_N_BANDS];
static int     tables_ready = 0;
static ssd_cpx zin[NH], zout[NH];          
static const int FAC[10] = { 4,200, 4,50, 2,25, 5,5, 5,1 };   

static inline ssd_cpx cm(ssd_cpx a, ssd_cpx b) { ssd_cpx c = { a.r*b.r - a.i*b.i, a.r*b.i + a.i*b.r }; return c; }
static inline ssd_cpx ca(ssd_cpx a, ssd_cpx b) { ssd_cpx c = { a.r + b.r, a.i + b.i }; return c; }
static inline ssd_cpx cs(ssd_cpx a, ssd_cpx b) { ssd_cpx c = { a.r - b.r, a.i - b.i }; return c; }

static void bfly2(ssd_cpx *F, size_t fs, size_t m) {
    for (size_t k = 0; k < m; ++k) { ssd_cpx t = cm(F[m + k], tw[k * fs]); F[m + k] = cs(F[k], t); F[k] = ca(F[k], t); }
}
static void bfly4(ssd_cpx *F, size_t fs, size_t m) {
    for (size_t u = 0; u < m; ++u) {
        ssd_cpx s0 = cm(F[u + m], tw[u * fs]), s1 = cm(F[u + 2*m], tw[2 * u * fs]), s2 = cm(F[u + 3*m], tw[3 * u * fs]);
        ssd_cpx s5 = cs(F[u], s1); F[u] = ca(F[u], s1);
        ssd_cpx s3 = ca(s0, s2), s4 = cs(s0, s2);
        F[u + 2*m] = cs(F[u], s3); F[u] = ca(F[u], s3);
        F[u + m].r   = s5.r + s4.i; F[u + m].i   = s5.i - s4.r;
        F[u + 3*m].r = s5.r - s4.i; F[u + 3*m].i = s5.i + s4.r;
    }
}
static void bfly5(ssd_cpx *F, size_t fs, size_t m) {
    const float c1 = 0.30901699437494745f, s1 = 0.95105651629515353f, c2 = -0.80901699437494734f, s2 = 0.58778525229247314f;
    for (size_t u = 0; u < m; ++u) {
        ssd_cpx x0 = F[u];
        ssd_cpx a1 = cm(F[u + m],   tw[u * fs]),     a2 = cm(F[u + 2*m], tw[2 * u * fs]);
        ssd_cpx a3 = cm(F[u + 3*m], tw[3 * u * fs]), a4 = cm(F[u + 4*m], tw[4 * u * fs]);
        ssd_cpx A = ca(a1, a4), B = cs(a1, a4), C = ca(a2, a3), D = cs(a2, a3);
        F[u].r = x0.r + A.r + C.r; F[u].i = x0.i + A.i + C.i;
        ssd_cpx E1 = { x0.r + c1*A.r + c2*C.r, x0.i + c1*A.i + c2*C.i };
        ssd_cpx E2 = { x0.r + c2*A.r + c1*C.r, x0.i + c2*A.i + c1*C.i };
        ssd_cpx G1 = { s1*B.r + s2*D.r, s1*B.i + s2*D.i };
        ssd_cpx G2 = { s2*B.r - s1*D.r, s2*B.i - s1*D.i };
        F[u + m].r   = E1.r + G1.i; F[u + m].i   = E1.i - G1.r;     
        F[u + 4*m].r = E1.r - G1.i; F[u + 4*m].i = E1.i + G1.r;     
        F[u + 2*m].r = E2.r + G2.i; F[u + 2*m].i = E2.i - G2.r;     
        F[u + 3*m].r = E2.r - G2.i; F[u + 3*m].i = E2.i + G2.r;     
    }
}
static void kf_work(ssd_cpx *Fout, const ssd_cpx *f, size_t fstride, const int *fac) {
    const int p = *fac++, m = *fac++;
    ssd_cpx *beg = Fout, *end = Fout + p * m;
    if (m == 1) { do { *Fout = *f; f += fstride; } while (++Fout != end); }
    else        { do { kf_work(Fout, f, fstride * p, fac); f += fstride; } while ((Fout += m) != end); }
    Fout = beg;
    switch (p) { case 2: bfly2(Fout, fstride, m); break; case 4: bfly4(Fout, fstride, m); break; case 5: bfly5(Fout, fstride, m); break; }
}

static void power_spectrum(const float *x, float *pw) {
    for (int n = 0; n < NH; ++n) { zin[n].r = x[2*n]; zin[n].i = x[2*n + 1]; }
    kf_work(zout, zin, 1, FAC);
    for (int k = 0; k < NH; ++k) {
        ssd_cpx Zk = zout[k], Zr = zout[(NH - k) % NH];
        ssd_cpx E = { 0.5f * (Zk.r + Zr.r), 0.5f * (Zk.i - Zr.i) };            
        ssd_cpx D = { 0.5f * (Zk.r - Zr.r), 0.5f * (Zk.i + Zr.i) };            
        ssd_cpx O = { D.i, -D.r };                                             
        ssd_cpx X = ca(E, cm(twr[k], O));
        pw[k] = X.r * X.r + X.i * X.i;
    }
}

static void init_tables(void) {
    if (tables_ready) return;
    const double TWO_PI = 6.283185307179586476925286766559;
    for (int k = 0; k < NH; ++k)     { tw[k].r  = (float)cos(TWO_PI * k / NH);        tw[k].i  = (float)(-sin(TWO_PI * k / NH)); }
    for (int k = 0; k <= NH; ++k)    { twr[k].r = (float)cos(TWO_PI * k / SSD_N_FFT); twr[k].i = (float)(-sin(TWO_PI * k / SSD_N_FFT)); }
    for (int n = 0; n < SSD_N_FFT; ++n) hann[n] = (float)(0.5 - 0.5 * cos(TWO_PI * n / SSD_N_FFT));   
    for (int b = 0; b < SSD_N_BANDS; ++b) bandf[b] = (b + 0.5f) * 50.0f;
    tables_ready = 1;
}

void ssd_reset(ssd_t *s) { memset(s, 0, sizeof *s); }
void ssd_init(ssd_t *s)  { init_tables(); ssd_reset(s); }

static void frame_descriptors(ssd_t *s, const float *mag, int want_flux, double acc[SSD_N_OUT], int count_main) {
    static float P[SSD_N_BANDS], p[SSD_N_BANDS], lp[SSD_N_BANDS];   
    float sum = 0.f, mx = 0.f;
    for (int b = 0; b < SSD_N_BANDS; ++b) { P[b] = mag[b] + 1e-12f; sum += P[b]; if (P[b] > mx) mx = P[b]; lp[b] = logf(P[b]); }
    const float inv = 1.0f / sum, lsum = logf(sum);
    float cen = 0.f, mlog = 0.f;
    for (int b = 0; b < SSD_N_BANDS; ++b) { p[b] = P[b] * inv; cen += bandf[b] * p[b]; mlog += lp[b]; }
    float m2 = 0.f, m3 = 0.f, m4 = 0.f, H = 0.f, cum = 0.f, roll = bandf[SSD_N_BANDS - 1]; int rolled = 0;
    for (int b = 0; b < SSD_N_BANDS; ++b) {
        const float dv = bandf[b] - cen, d2 = dv * dv;
        m2 += d2 * p[b]; m3 += d2 * dv * p[b]; m4 += d2 * d2 * p[b];
        H -= p[b] * (lp[b] - lsum);                         
        cum += p[b]; if (!rolled && cum >= 0.85f) { roll = bandf[b]; rolled = 1; }
    }
    const float spr = sqrtf(m2) + 1e-12f;
    if (count_main) {
        acc[0] += cen;  acc[1] += spr;  acc[2] += m3 / (spr * spr * spr);  acc[3] += m4 / (spr * spr * spr * spr);
        acc[4] += (H * 1.4426950408889634f) / log2f((float)SSD_N_BANDS);                       
        acc[5] += roll; acc[6] += expf(mlog / SSD_N_BANDS) / (sum / SSD_N_BANDS); acc[7] += mx / (sum / SSD_N_BANDS);
    }
    if (want_flux && s->prev_valid) {
        float f2 = 0.f; for (int b = 0; b < SSD_N_BANDS; ++b) { const float d = p[b] - s->p_prev[b]; f2 += d * d; }
        acc[8] += sqrtf(f2); s->n_flux++;
    }
    memcpy(s->p_prev, p, sizeof p); s->prev_valid = 1;
}

static void process_frame(ssd_t *s) {
    const uint32_t t = s->frame_idx++;
    int proc = 1, want_flux = 1;
    if (SSD_STRIDE > 1) { const uint32_t r = t % SSD_STRIDE; proc = (r < 2); want_flux = (r == 1); if (r == 0) s->prev_valid = 0; }
    if (!proc) return;
    static float x[SSD_N_FFT], pw[NH], mag[SSD_N_BANDS];             
    uint32_t pos = s->wr;                                   
    for (int i = 0; i < SSD_N_FFT; ++i) { x[i] = hann[i] * (float)s->ring[pos] * (1.0f / 32768.0f); if (++pos == SSD_N_FFT) pos = 0; }
    power_spectrum(x, pw);
    for (int b = 0; b < SSD_N_BANDS; ++b) {
        float e = 0.f; for (int j = 0; j < SSD_BINS_PER_BAND; ++j) e += pw[b * SSD_BINS_PER_BAND + j];
        mag[b] = sqrtf(e);
    }
    frame_descriptors(s, mag, want_flux, s->acc, 1);
    s->n_proc++;
}

void ssd_push(ssd_t *s, const int16_t *x, size_t n) {
    for (size_t i = 0; i < n; ++i) {
        s->ring[s->wr] = x[i]; if (++s->wr == SSD_N_FFT) s->wr = 0;
        s->n_samples++;
        if (s->n_samples >= SSD_N_FFT) {
            if (s->n_samples == SSD_N_FFT) s->since_hop = SSD_HOP;      
            else s->since_hop++;
            if (s->since_hop >= SSD_HOP) { s->since_hop = 0; process_frame(s); }
        }
    }
}
uint32_t ssd_frames(const ssd_t *s) { return s->n_proc; }
void ssd_result(const ssd_t *s, float out[SSD_N_OUT]) {
    const double n = s->n_proc ? (double)s->n_proc : 1.0;
    for (int j = 0; j < 8; ++j) out[j] = (float)(s->acc[j] / n);
    out[8] = (float)(s->n_flux ? s->acc[8] / (double)s->n_flux : 0.0);
}