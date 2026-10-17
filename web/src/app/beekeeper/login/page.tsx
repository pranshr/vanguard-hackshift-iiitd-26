"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  User,
  MapPin,
  CheckCircle2,
  Hexagon,
  ArrowLeft,
  Zap,
  Thermometer,
  Activity,
  Cpu,
} from "lucide-react";

function BeekeeperLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/beekeeper";

  // Form Mode: "login" or "register"
  const [mode, setMode] = useState<"login" | "register">("login");

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register Fields
  const [fullName, setFullName] = useState("");
  const [apiaryName, setApiaryName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Feedback states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [demoNotice, setDemoNotice] = useState(false);

  // Pre-load demo account info
  const DEMO_ACCOUNT = {
    email: "ritesh.beekeeper@gmail.com",
    password: "BeeSafe#2026",
    name: "Ritesh Kumar",
    apiary: "Orchard Yard · Hive #01",
    role: "Master Apiarist",
  };

  // Simple handler to fill demo credentials
  const handleFillDemo = (autoLogin = false) => {
    setErrorMsg(null);
    setMode("login");
    setEmail(DEMO_ACCOUNT.email);
    setPassword(DEMO_ACCOUNT.password);
    setDemoNotice(true);

    if (autoLogin) {
      executeLogin(DEMO_ACCOUNT.email, DEMO_ACCOUNT.password, DEMO_ACCOUNT.name);
    } else {
      setTimeout(() => setDemoNotice(false), 3500);
    }
  };

  // Core Login execution
  const executeLogin = (
    userEmail: string,
    userPass: string,
    customName?: string
  ) => {
    setIsLoading(true);
    setErrorMsg(null);

    setTimeout(() => {
      if (!userEmail.includes("@")) {
        setErrorMsg("Please enter a valid email or Gmail address.");
        setIsLoading(false);
        return;
      }

      if (userPass.length < 4) {
        setErrorMsg("Password must be at least 4 characters.");
        setIsLoading(false);
        return;
      }

      // Successful simulated auth
      const authPayload = {
        email: userEmail,
        name:
          customName ||
          (userEmail.toLowerCase().includes("ritesh")
            ? "Ritesh Kumar"
            : userEmail.split("@")[0]),
        apiary: "Orchard Yard · Hive #01",
        role: "Master Apiarist",
        loggedInAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem("beekeeper_auth", JSON.stringify(authPayload));
      } catch (err) {
        console.error("Storage error:", err);
      }

      router.push(redirectPath);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      executeLogin(email, password);
    } else {
      if (!fullName.trim()) {
        setErrorMsg("Please enter your full name.");
        return;
      }
      if (!email.includes("@")) {
        setErrorMsg("Please enter a valid email address.");
        return;
      }
      if (password.length < 6) {
        setErrorMsg("Password should be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match.");
        return;
      }

      executeLogin(email, password, fullName.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F1E7] text-[#1C1A17] flex flex-col lg:flex-row selection:bg-[#F2A007]/30 selection:text-[#1C1A17]">
      {/* ========================================================================= */}
      {/* LEFT HALF: BEEKEEPER SHOWCASE & INFORMATION (Half screen on Desktop)      */}
      {/* ========================================================================= */}
      <div className="relative lg:w-1/2 min-h-[460px] lg:min-h-screen bg-[#181512] text-white flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden">
        {/* Authentic Beekeeper Photography Background with subtle zoom */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/beekeeper-ramdas.jpg"
            alt="Master beekeeper inspecting wooden beehives"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center opacity-40 scale-105"
          />
          {/* Gradient Overlay for high text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181512] via-[#181512]/75 to-[#181512]/60" />
          <div className="absolute inset-0 bg-[radial-gradient(#F2A007_1px,transparent_1px)] [background-size:28px_28px] opacity-10" />
        </div>

        {/* Top Header on Left Panel */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#F2A007] flex items-center justify-center text-black font-black text-sm shadow-md group-hover:scale-105 transition-transform">
              B
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl leading-tight tracking-tight text-white group-hover:text-amber-300 transition-colors">
                BEE safe
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-amber-300/90 font-semibold">
                HoneyChain™ Apiary Station
              </span>
            </div>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-white/10 backdrop-blur-md border border-white/15 text-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            IoT Network Online
          </span>
        </div>

        {/* Center Content: Inspiring Beekeeping Narrative & Live Telemetry Features */}
        <div className="relative z-10 my-8 sm:my-12 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2A007]/20 border border-[#F2A007]/40 text-[#F2A007] text-xs font-bold uppercase tracking-wider mb-4">
            <Hexagon className="w-3.5 h-3.5 fill-[#F2A007]" />
            <span>Apiarist & Hive Administration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
            Empowering Beekeepers with Precision IoT.
          </h2>

          <p className="text-sm sm:text-base text-[#D4C3B2] mt-4 leading-relaxed">
            Monitor brood temperature regulation, daylight nectar weight influx, and acoustic swarm detection across your apiaries in real time.
          </p>

          {/* 3 Key Feature Points */}
          <div className="mt-6 sm:mt-8 space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
                <Thermometer className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white">
                  Real-Time Brood Climate
                </div>
                <div className="text-[11px] text-[#A69B8F] truncate">
                  34.8°C thermal telemetry & humidity regulation alerts
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white">
                  Acoustic Swarm Early-Warning
                </div>
                <div className="text-[11px] text-[#A69B8F] truncate">
                  228 Hz frequency analysis detecting pre-swarm colony behavior
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white">
                  Blockchain Batch Verification
                </div>
                <div className="text-[11px] text-[#A69B8F] truncate">
                  Generate immutable QR credentials protecting raw harvest integrity
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Testimonial on Left Panel */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#A69B8F]">
          <div>
            <span className="font-semibold text-white">Ramdas Patil</span> · Master Apiarist
          </div>
          <div className="flex items-center gap-1 text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Protected Colony Data</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT HALF: CLEAN LOGIN / REGISTER FORM                                  */}
      {/* ========================================================================= */}
      <div className="relative lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-[#F6F1E7]">
        {/* Top Header Navigation on Right Panel */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#665E55] hover:text-[#1C1A17] transition-colors py-1.5 px-3 rounded-full hover:bg-black/5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>

          <span className="text-[11px] font-mono text-[#8A7F72]">
            Apiary Auth v2.6
          </span>
        </div>

        {/* Center Form Card */}
        <div className="my-auto max-w-md w-full mx-auto py-8">
          <div className="mb-6 text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1A17] tracking-tight">
              {mode === "login" ? "Beekeepers Dashboard" : "Register New Apiary"}
            </h1>
            <p className="text-xs sm:text-sm text-[#665E55] mt-1.5">
              {mode === "login"
                ? "Enter your registered Gmail & password to access hive telemetry."
                : "Create an account to connect your IoT smart hives to the dashboard."}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex p-1 bg-[#EDE5D6] rounded-xl border border-[#DDD3C2] mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === "login"
                  ? "bg-white text-[#1C1A17] shadow-xs"
                  : "text-[#665E55] hover:text-[#1C1A17]"
                }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === "register"
                  ? "bg-white text-[#1C1A17] shadow-xs"
                  : "text-[#665E55] hover:text-[#1C1A17]"
                }`}
            >
              Register
            </button>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Auto-filled Demo Notification */}
          {demoNotice && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Demo credentials filled! Click &quot;Sign In to Dashboard&quot; below.</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#1C1A17] mb-1.5">
                    Full Name / Apiarist Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7F72]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ritesh Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#E3DACB] rounded-xl text-[#1C1A17] placeholder:text-[#8A7F72] focus:outline-none focus:border-[#F2A007] transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* Apiary Yard */}
                <div>
                  <label className="block text-xs font-bold text-[#1C1A17] mb-1.5">
                    Apiary Name / Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7F72]" />
                    <input
                      type="text"
                      placeholder="e.g. Orchard Yard, Himachal Pradesh"
                      value={apiaryName}
                      onChange={(e) => setApiaryName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#E3DACB] rounded-xl text-[#1C1A17] placeholder:text-[#8A7F72] focus:outline-none focus:border-[#F2A007] transition-all shadow-2xs"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email / Gmail Field */}
            <div>
              <label className="block text-xs font-bold text-[#1C1A17] mb-1.5">
                Email / Gmail Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7F72]" />
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com or apiarist@beesafe.farm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#E3DACB] rounded-xl text-[#1C1A17] placeholder:text-[#8A7F72] focus:outline-none focus:border-[#F2A007] transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#1C1A17]">
                  Password
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => {
                      alert("Password reset link sent to your registered Gmail address.");
                    }}
                    className="text-[11px] font-semibold text-[#8A4B12] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7F72]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder={mode === "login" ? "Enter your password" : "Create password (min 6 chars)"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-[#E3DACB] rounded-xl text-[#1C1A17] placeholder:text-[#8A7F72] focus:outline-none focus:border-[#F2A007] transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A7F72] hover:text-[#1C1A17] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password (Register mode only) */}
            {mode === "register" && (
              <div>
                <label className="block text-xs font-bold text-[#1C1A17] mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7F72]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#E3DACB] rounded-xl text-[#1C1A17] placeholder:text-[#8A7F72] focus:outline-none focus:border-[#F2A007] transition-all shadow-2xs"
                  />
                </div>
              </div>
            )}

            {/* Remember Me */}
            {mode === "login" && (
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#E3DACB] text-[#F2A007] focus:ring-[#F2A007] cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-xs text-[#665E55] cursor-pointer select-none font-medium"
                >
                  Remember this device
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-2 rounded-xl bg-[#F2A007] hover:bg-[#d98f06] text-[#1C1A17] font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#1C1A17] border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Apiary Credentials...</span>
                </>
              ) : (
                <>
                  <span>
                    {mode === "login"
                      ? "Sign In to Dashboard"
                      : "Register & Connect Hive"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Don't have an account / Have an account switcher */}
          <div className="mt-5 text-center">
            {mode === "login" ? (
              <p className="text-xs sm:text-sm text-[#665E55]">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setErrorMsg(null);
                  }}
                  className="font-bold text-[#8A4B12] hover:text-[#1C1A17] hover:underline cursor-pointer"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-[#665E55]">
                Already have an apiarist account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMsg(null);
                  }}
                  className="font-bold text-[#8A4B12] hover:text-[#1C1A17] hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>

          {/* ========================================================================= */}
          {/* SIMPLIFIED DEMO / TESTING ACCOUNT BOX (Clean & Non-complicated)          */}
          {/* ========================================================================= */}
          <div
            onClick={() => handleFillDemo(false)}
            className="mt-6 p-3.5 rounded-xl border border-amber-300 bg-amber-50/90 hover:bg-amber-100 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-2xs group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleFillDemo(false);
            }}
            title="Click to auto-fill testing email & password"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-amber-200/90 flex items-center justify-center text-amber-900 shrink-0">
                <Zap className="w-4 h-4 fill-amber-500 text-amber-800" />
              </div>
              <div className="min-w-0 text-left">
                <div className="text-xs font-bold text-[#1C1A17] flex items-center gap-1.5">
                  <span>Demo Apiarist Account</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-semibold">
                    1-Click Auto-Fill
                  </span>
                </div>
                <div className="text-[11px] text-[#665E55] truncate font-mono mt-0.5">
                  {DEMO_ACCOUNT.email} · {DEMO_ACCOUNT.password}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFillDemo(true);
              }}
              className="px-3 py-1.5 text-xs font-bold bg-[#1C1A17] hover:bg-black text-amber-300 hover:text-white rounded-lg shrink-0 transition-transform active:scale-95 flex items-center gap-1 shadow-2xs"
            >
              <span>Instant Login</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bottom Minimal Footer */}
        <div className="pt-4 border-t border-[#E3DACB]/60 text-center text-[11px] text-[#8A7F72]">
          BEE safe Vanguard · Smart Apiary IoT & Transparent Honeychain
        </div>
      </div>
    </div>
  );
}

export default function BeekeeperLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F6F1E7] flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-[#F2A007] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BeekeeperLoginForm />
    </Suspense>
  );
}
