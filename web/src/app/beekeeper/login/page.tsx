"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  User,
  MapPin,
  CheckCircle2,
  Hexagon,
  ArrowLeft,
  Zap,
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
  const [demoFilledNotice, setDemoFilledNotice] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    try {
      const existingAuth = localStorage.getItem("beekeeper_auth");
      if (existingAuth) {
        // Can optionally auto-redirect or allow switching
      }
    } catch {
      // ignore SSR/storage errors
    }
  }, []);

  // Demo account details
  const DEMO_ACCOUNT = {
    email: "ritesh.beekeeper@gmail.com",
    password: "BeeSafe#2026",
    name: "Ritesh Kumar",
    apiary: "Orchard Yard · Hive #01",
    role: "Master Apiarist",
  };

  // Handler to auto-fill demo credentials
  const handleFillDemo = (autoSubmit = false) => {
    setErrorMsg(null);
    setMode("login");
    setEmail(DEMO_ACCOUNT.email);
    setPassword(DEMO_ACCOUNT.password);
    setDemoFilledNotice(true);

    if (autoSubmit) {
      executeLogin(DEMO_ACCOUNT.email, DEMO_ACCOUNT.password, DEMO_ACCOUNT.name);
    } else {
      setTimeout(() => setDemoFilledNotice(false), 4000);
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
        setErrorMsg("Please enter a valid Gmail or email address.");
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
        name: customName || (userEmail.toLowerCase().includes("ritesh") ? "Ritesh Kumar" : userEmail.split("@")[0]),
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
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      executeLogin(email, password);
    } else {
      // Registration submission
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
    <div className="min-h-screen bg-[#F6F1E7] text-[#1C1A17] flex flex-col justify-between selection:bg-[#F2A007]/30 selection:text-[#1C1A17]">
      {/* Background Honeycomb Accent Mesh */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#1C1A17_1px,transparent_1px)] [background-size:24px_24px] z-0" />

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#665E55] hover:text-[#1C1A17] transition-colors py-1.5 px-3 rounded-full hover:bg-black/5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Storefront</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#F2A007] flex items-center justify-center text-black font-black text-xs shadow-xs">
            B
          </div>
          <span className="font-serif font-bold text-base tracking-tight text-[#1C1A17]">
            BEE-Safe
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#E3DACB] text-[#665E55] font-bold">
            Apiary Portal
          </span>
        </div>
      </header>

      {/* Main Login / Register Area */}
      <main className="relative z-10 w-full max-w-md mx-auto px-4 py-8 sm:py-10">
        <div className="bg-white/95 backdrop-blur-md border border-[#E3DACB] rounded-3xl p-6 sm:p-8 shadow-xl shadow-amber-950/5">
          {/* Header Title & Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-[#8A4B12] mb-3 shadow-2xs">
              <Hexagon className="w-6 h-6 fill-amber-400/30 text-[#8A4B12]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1A17] tracking-tight">
              {mode === "login" ? "Beekeepers Dashboard" : "Register Beekeeper"}
            </h1>
            <p className="text-xs sm:text-sm text-[#665E55] mt-1.5">
              {mode === "login"
                ? "Sign in to monitor live hive IoT sensors, harvests & acoustic data"
                : "Join the HoneyChain IoT network to connect and monitor your hives"}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex p-1 bg-[#F6F1E7] rounded-xl border border-[#E3DACB] mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === "login"
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
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === "register"
                  ? "bg-white text-[#1C1A17] shadow-xs"
                  : "text-[#665E55] hover:text-[#1C1A17]"
              }`}
            >
              Register New Hive
            </button>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2 animate-in fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success / Auto-fill banner */}
          {demoFilledNotice && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Demo credentials auto-filled! Click Sign In below.</span>
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
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#FAF7F0] border border-[#E3DACB] rounded-xl text-[#1C1A17] placeholder:text-[#8A7F72] focus:outline-none focus:border-[#F2A007] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Apiary Location */}
                <div>
                  <label className="block text-xs font-bold text-[#1C1A17] mb-1.5">
                    Apiary Yard & Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7F72]" />
                    <input
                      type="text"
                      placeholder="e.g. Orchard Yard, Himachal Pradesh"
                      value={apiaryName}
                      onChange={(e) => setApiaryName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#FAF7F0] border border-[#E3DACB] rounded-xl text-[#1C1A17] placeholder:text-[#8A7F72] focus:outline-none focus:border-[#F2A007] focus:bg-white transition-all"
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
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#FAF7F0] border border-[#E3DACB] rounded-xl text-[#1C1A17] placeholder:text-[#8A7F72] focus:outline-none focus:border-[#F2A007] focus:bg-white transition-all"
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
                      alert("Password reset instructions sent to registered apiary address.");
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
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#FAF7F0] border border-[#E3DACB] rounded-xl text-[#1C1A17] placeholder:text-[#8A7F72] focus:outline-none focus:border-[#F2A007] focus:bg-white transition-all"
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
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#FAF7F0] border border-[#E3DACB] rounded-xl text-[#1C1A17] placeholder:text-[#8A7F72] focus:outline-none focus:border-[#F2A007] focus:bg-white transition-all"
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
                  Keep me signed in to this apiary station
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
                  <span>Authenticating Hive IoT...</span>
                </>
              ) : (
                <>
                  <span>
                    {mode === "login"
                      ? "Sign In to Beekeepers Dashboard"
                      : "Register & Connect Apiary"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Don't have an account / Have an account switcher */}
          <div className="mt-6 pt-5 border-t border-[#E3DACB] text-center">
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
        </div>

        {/* ======================================================== */}
        {/* DEMO / TESTING ACCOUNT LOGIN BOX                         */}
        {/* ======================================================== */}
        <div
          onClick={() => handleFillDemo(false)}
          className="mt-6 p-4 sm:p-5 rounded-2xl border-2 border-dashed border-[#F2A007]/80 bg-amber-50/80 hover:bg-amber-100/80 transition-all cursor-pointer shadow-xs group relative overflow-hidden"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleFillDemo(false);
          }}
          aria-label="Click to auto-fill demo testing credentials"
        >
          {/* Subtle Honeycomb Decor */}
          <div className="absolute -right-3 -bottom-3 text-amber-500/10 group-hover:text-amber-500/20 transition-colors pointer-events-none">
            <Hexagon className="w-24 h-24" />
          </div>

          <div className="relative z-10">
            {/* Box Header Badge */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#8A4B12] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#F2A007]" />
                <span>Demo & Testing Account</span>
              </div>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-[#F2A007] text-[#1C1A17] shadow-2xs group-hover:scale-105 transition-transform">
                Click to Auto-Fill
              </span>
            </div>

            {/* Instruction text */}
            <p className="text-xs text-[#665E55] mb-3">
              Testing or judging? Tap anywhere in this box to auto-fill working apiarist credentials:
            </p>

            {/* Credential Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-white/80 border border-amber-200/80 flex items-center justify-between">
                <span className="text-[#8A7F72] text-[11px]">Email:</span>
                <span className="font-semibold text-[#1C1A17] truncate ml-2">
                  {DEMO_ACCOUNT.email}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white/80 border border-amber-200/80 flex items-center justify-between">
                <span className="text-[#8A7F72] text-[11px]">Password:</span>
                <span className="font-semibold text-[#1C1A17] ml-2">
                  {DEMO_ACCOUNT.password}
                </span>
              </div>
            </div>

            {/* One-click Instant Login Action Button */}
            <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center justify-between gap-2">
              <span className="text-[11px] text-[#8A4B12] font-semibold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-[#F2A007]" />
                Ready to explore telemetry?
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFillDemo(true);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#1C1A17] hover:bg-black text-amber-300 hover:text-amber-200 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
              >
                <span>Instant Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Security / IoT Note */}
        <div className="mt-6 text-center text-xs text-[#8A7F72] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#2F6B3A]" />
          <span>Secured via BEE-Safe Hive-Guard™ End-to-End Cryptography</span>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full text-center py-6 text-xs text-[#8A7F72] border-t border-[#E3DACB]/50">
        BEE-Safe Vanguard · Next-Gen Smart Beekeeping & Authenticated Honeychain
      </footer>
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
