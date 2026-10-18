"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Hexagon,
  Droplet,
  Cpu,
  Brain,
  LogOut,
  Thermometer,
  Droplets,
  Scale,
  Activity,
  Plus,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Clock,
  Volume2,
  ArrowUpRight,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  BatteryCharging,
  Wifi,
  WifiOff,
  Layers,
  FileText,
  QrCode,
  Download,
  Send,
  Check,
  Settings,
  User,
  Mail,
  Phone,
  Edit3,
  Globe,
  Languages,
} from "lucide-react";

import { LanguageSelector } from "@/components/storefront/LanguageSelector";
import { setLanguage, getCurrentLanguage } from "@/utils/language";

type TabKey = "home" | "hives" | "harvest" | "sensors" | "advisor" | "settings";

import SensorTelemetryDashboard from "@/components/SensorTelemetryDashboard";

export default function BeekeeperPage() {
  const router = useRouter();
  const [currentUser] = useState<{
    name: string;
    email: string;
    apiary: string;
    role: string;
    phone?: string;
    language?: string;
  } | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const auth = localStorage.getItem("beekeeper_auth");
      return auth ? JSON.parse(auth) : null;
    } catch {
      return null;
    }
  });

  // Authentication check - redirect to login if no auth found
  useEffect(() => {
    try {
      const auth = localStorage.getItem("beekeeper_auth");
      if (!auth) {
        router.replace("/beekeeper/login");
      }
    } catch {
      // ignore SSR or storage exceptions
    }
  }, [router]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("beekeeper_auth");
    } catch { }
    router.push("/beekeeper/login");
  };

  const [activeTab, setActiveTab] = useState<TabKey>(() => {
    if (typeof window === "undefined") return "home";
    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam && ["home", "hives", "harvest", "sensors", "advisor", "settings"].includes(tabParam)) {
        return tabParam as TabKey;
      }
    } catch {}
    return "home";
  });
  const [selectedHive, setSelectedHive] = useState("Hive #02 - Meadow Yard");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isVirtualHiveConnected, setIsVirtualHiveConnected] = useState(true);
  const [colonyCondition, setColonyCondition] = useState<"good" | "alert">("good");

  const hiveMetadata: Record<string, { code: string; crop: string; updated: string }> = {
    "Hive #01 - Orchard Yard": {
      code: "HC-HIVE-01",
      crop: "Wildflower & Apple Orchard",
      updated: "Updated 4 min ago",
    },
    "Hive #02 - Meadow Yard": {
      code: "HC-HIVE-02",
      crop: "Mustard Flower (Sarson)",
      updated: "Updated 11 min ago",
    },
    "Hive #03 - Valley Creek": {
      code: "HC-HIVE-03",
      crop: "Acacia & Clover Bloom",
      updated: "Updated 18 min ago",
    },
  };

  const currentHiveInfo = hiveMetadata[selectedHive] || {
    code: "HC-HIVE-02",
    crop: "Mustard Flower (Sarson)",
    updated: "Updated 11 min ago",
  };

  // User profile & account details state (matching Image 1 & Image 2)
  const [userName, setUserName] = useState(() => currentUser?.name || "Ritesh Kumar");
  const [userRole, setUserRole] = useState(() => currentUser?.role || "Master Apiarist");
  const [userEmail, setUserEmail] = useState(() => currentUser?.email || "kumarritesh2006912@gmail.com");
  const [userPhone, setUserPhone] = useState(() => currentUser?.phone || "+91  97192  13552");
  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
    if (typeof window === "undefined") return "en";
    return currentUser?.language || getCurrentLanguage();
  });
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [editSuccessMsg, setEditSuccessMsg] = useState("");

  // Listen to language changes
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedLanguage(customEvent.detail);
      }
    };
    window.addEventListener("languageChange", handleLangChange);

    return () => {
      window.removeEventListener("languageChange", handleLangChange);
    };
  }, []);

  const handleSaveAccountDetails = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const auth = localStorage.getItem("beekeeper_auth");
      const current = auth ? JSON.parse(auth) : {};
      const updated = {
        ...current,
        name: userName,
        email: userEmail,
        phone: userPhone,
        role: userRole,
        language: selectedLanguage,
      };
      localStorage.setItem("beekeeper_auth", JSON.stringify(updated));
    } catch { }
    setIsEditingAccount(false);
    setEditSuccessMsg("Account details updated successfully!");
    setTimeout(() => setEditSuccessMsg(""), 3500);
  };

  // Inspection quick log modal state
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [inspectionSuccess, setInspectionSuccess] = useState(false);

  // Harvest logging state
  const [harvestHive, setHarvestHive] = useState("Hive #01 - Orchard Yard");
  const [harvestWeight, setHarvestWeight] = useState("18.5");
  const [harvestMoisture, setHarvestMoisture] = useState("17.2");
  const [harvestFloral, setHarvestFloral] = useState("Acacia Wildflower");
  const [createdBatch, setCreatedBatch] = useState<{
    id: string;
    date: string;
    hive: string;
    weight: string;
    moisture: string;
    floral: string;
  } | null>(null);

  // AI Chat prompt state
  const [aiQuery, setAiQuery] = useState("");
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: "user" | "ai"; text: string; time: string }>
  >([
    {
      sender: "ai",
      text: "Greetings, Apiarist Ritesh! I am continuously monitoring your 4 hives. Sensor telemetry across Orchard Yard shows optimal brood regulation (34.8°C) and strong nectar flow (+1.3kg/day). Acoustic levels are steady at 228Hz. How can I assist you with your apiary today?",
      time: "10:15 AM",
    },
  ]);

  // Telemetry state scaffold
  const telemetry = {
    temp: "34.8 °C",
    tempAmbient: "26.4 °C",
    tempStatus: "Optimal Brood Temp (33 - 36°C)",
    humidity: "58.4 %",
    humidityAmbient: "64.2 %",
    humidityStatus: "Healthy Range (50 - 65%)",
    weight: "42.6 kg",
    weightNetGain: "+1.3 kg",
    weightStatus: "+1.3 kg 24h Nectar Influx",
    acoustics: "228 Hz",
    acousticDb: "41.2 dB",
    acousticsStatus: "Calm Worker Foraging (No Swarm Roar)",
  };

  const navItems = [
    { key: "home" as TabKey, label: "Home", icon: Home, badge: "Live" },
    { key: "hives" as TabKey, label: "My Hives", icon: Hexagon, badge: "3 Active" },
    { key: "harvest" as TabKey, label: "Harvest Honey", icon: Droplet, badge: "Ready" },
    { key: "sensors" as TabKey, label: "Sensor Data", icon: Cpu, badge: "4 Ch" },
    { key: "advisor" as TabKey, label: "AI Advisor", icon: Brain, badge: "Active" },
  ];

  // Handle AI question submit
  const handleSendAiQuery = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiQuery.trim()) return;

    const userText = aiQuery.trim();
    const newMessages = [
      ...chatMessages,
      {
        sender: "user" as const,
        text: userText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];

    setChatMessages(newMessages);
    setAiQuery("");

    // Simulated apiculture intelligence response
    setTimeout(() => {
      let responseText =
        "Based on Hive #01 telemetry: Core temp is solid at 34.8°C with acoustic frequency at 228Hz. The colony is actively drawing wax in the honey super. Everything is on schedule.";
      if (userText.toLowerCase().includes("super") || userText.toLowerCase().includes("harvest")) {
        responseText =
          "Telemetry shows a 1.3 kg net daily gain over the last 3 days. Your honey super has reached ~77% capacity with moisture calculated under 17.5%. We recommend adding an empty super box in the morning when forager bees leave for acacia blooms.";
      } else if (userText.toLowerCase().includes("sound") || userText.toLowerCase().includes("acoustic") || userText.toLowerCase().includes("swarm")) {
        responseText =
          "Microphone spectrum analysis shows the peak at 228Hz (steady worker fanning & communication). Swarm preparation typically produces high-frequency piping (350-450Hz) and loud collective roar (>50dB). Current swarm risk is exceptionally low (<2%).";
      } else if (userText.toLowerCase().includes("inspect") || userText.toLowerCase().includes("weather")) {
        responseText =
          "Tomorrow's weather forecast predicts 27°C with gentle 6 km/h winds and zero rain. Between 11:00 AM and 2:00 PM is the ideal inspection window while field bees are out foraging.";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 600);
  };

  const handleRecordHarvest = (e: React.FormEvent) => {
    e.preventDefault();
    const batchId = `BATCH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedBatch({
      id: batchId,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      hive: harvestHive,
      weight: harvestWeight,
      moisture: harvestMoisture,
      floral: harvestFloral,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#24201d]">
      {/* ======================================================== */}
      {/* DESKTOP FULL-HEIGHT FIXED SIDEBAR                         */}
      {/* ======================================================== */}
      <aside className="hidden md:flex w-64 lg:w-72 shrink-0 bg-white border-r border-[#e8e1d7] fixed inset-y-0 left-0 flex-col justify-between p-4 z-40 overflow-y-auto custom-scrollbar">
        <div>
          {/* Top Brand & Portal Info */}
          <div className="pb-5 border-b border-[#e8e1d7] mb-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 flex items-center justify-center text-[#F2A007] shrink-0 group-hover:scale-105 transition-transform">
                <Hexagon className="w-7 h-7 stroke-[2.4]" />
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#24201d] group-hover:text-[var(--signature)] transition-colors block leading-tight">
                  BEE safe
                </span>
                <span className="text-[11px] block text-[#7c7267] font-semibold tracking-wide uppercase">
                  Apiary Management
                </span>
              </div>
            </Link>

            {/* Hardware Node Live Status */}
            <div className="mt-4 p-2.5 bg-[#faf8f5] border border-[#e8e1d7] rounded-lg flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                <span className="font-semibold text-[#24201d]">Telemetry Node</span>
              </div>
              <span className="text-[10px] font-bold text-[#16a34a] bg-white px-2 py-0.5 rounded border border-[#e8ded0]">
                Live 10s
              </span>
            </div>
          </div>


          {/* 5 Main Tabs Navigation */}
          <div className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-[#968a7d]">
            Workflow Navigation
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all text-left ${isActive
                      ? "bg-[#F2A007]/15 text-[#1C1A17] font-bold border border-[#F2A007]/35 shadow-2xs"
                      : "text-[#645d56] hover:bg-[#F2A007]/10 hover:text-[#1C1A17] border border-transparent"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 ${isActive ? "text-[#D97706] stroke-[2.2]" : "text-[#8b7f73]"
                        }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isActive
                        ? "bg-[#F2A007]/25 text-[#8A4B12]"
                        : "bg-[#f4ede3] text-[#7c7267]"
                      }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Apiarist Profile & Actions */}
        <div className="pt-4 border-t border-[#e8e1d7] space-y-3">

          {/* User Profile Card (Matches Image 2 - Clickable to open Profile/Settings) */}
          <div
            onClick={() => setActiveTab("settings")}
            className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-all group ${activeTab === "settings"
              ? "bg-[#f7efe4] border-[#b45309] shadow-xs"
              : "bg-[#faf8f5] border-[#e8e1d7] hover:bg-[#f5ede2] hover:border-[#cfc4b5]"
              }`}
            title="Open Ritesh Kumar Profile & Account Settings"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#f7efe4] border border-[#e2d8cb] flex items-center justify-center text-[#b45309] font-bold text-xs shrink-0">
                {currentUser?.name
                  ? currentUser.name
                    .split(" ")
                    .filter(Boolean)
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                  : "RK"}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#24201d] truncate group-hover:text-[#b45309] transition-colors">
                  {userName || "Ritesh Kumar"}
                </div>
                <div className="text-[10px] text-[#7c7267] font-medium truncate">
                  {userRole || "Master Apiarist"}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 text-[#7c7267] hover:text-[#b45309] hover:bg-white rounded-md border border-transparent hover:border-[#e0d7cb] transition-all cursor-pointer"
              title="Log Out of Apiary"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MAIN APP CONTAINER (Offset for fixed sidebar on desktop) */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen md:pl-64 lg:pl-72">
        {/* Top Header Bar for Desktop & Mobile */}
        <header className="sticky top-0 z-30 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e8e1d7] h-16 px-3 sm:px-8 flex items-center justify-between gap-2">
          {/* Left: Mobile Toggle + Breadcrumb */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="p-2 text-[#4b433b] hover:bg-[#f5ede2] rounded-lg border border-[#e0d7cb] md:hidden cursor-pointer"
              aria-label="Open sidebar drawer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Brand Link */}
            <Link href="/" className="flex items-center gap-1.5 md:hidden group">
              <div className="w-7 h-7 flex items-center justify-center text-[#F2A007] shrink-0">
                <Hexagon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-serif font-bold text-base text-[#24201d] group-hover:text-[var(--signature)] transition-colors hidden sm:inline">
                BEE safe
              </span>
            </Link>

            {/* Desktop Breadcrumbs & Context */}
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-[#7c7267]">
              <span>Apiary</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#24201d] font-bold capitalize">
                {activeTab === "settings" ? "Account & Settings" : activeTab}
              </span>
              <span className="text-[#cfc4b5]">•</span>
              <span className="bg-white border border-[#e0d7cb] px-2 py-0.5 rounded text-[11px] font-semibold text-[#4b433b]">
                {activeTab === "home" ? "All Colonies Fleet" : selectedHive}
              </span>
            </div>
          </div>

          {/* Right Header Status & Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Language Selector — first */}
            <LanguageSelector variant="header" />

            {/* Profile & Settings Button */}
            <button
              onClick={() => setActiveTab("settings")}
              className={`inline-flex items-center justify-center h-9 px-2.5 sm:px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${activeTab === "settings"
                ? "bg-[#f7efe4] text-[#b45309] border-[#b45309]"
                : "text-[#665e55] bg-white border-[#e0d7cb] hover:bg-[#f5ede2] hover:text-[#b45309]"
                }`}
              title="Open Profile & Account Settings"
            >
              <Settings className="w-3.5 h-3.5 text-[#b45309]" />
              <span className="hidden md:inline ml-1">Settings</span>
            </button>

            {/* Header Logout Button */}
            <Link
              href="/"
              className="inline-flex items-center justify-center h-9 w-9 sm:w-auto sm:px-3 text-xs font-semibold text-[#665e55] bg-white border border-[#e0d7cb] rounded-lg hover:bg-[#F2A007]/20 hover:text-[#1C1A17] hover:border-[#F2A007]/40 transition-all cursor-pointer"
              title="Log Out of Apiary"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline ml-1">Log Out</span>
            </Link>
          </div>
        </header>


        {/* Mobile Drawer (Collapsible sidebar on mobile devices) */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-black/40 backdrop-blur-xs flex">
            <div className="w-4/5 max-w-xs bg-white h-full p-4 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#e8e1d7] mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center text-[#F2A007]">
                      <Hexagon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="font-serif font-bold text-lg text-[#24201d]">BEE safe</span>
                  </div>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1.5 rounded-lg text-[#7c7267] hover:bg-[#faf6f0]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>


                <div className="text-[11px] font-bold uppercase tracking-wider text-[#968a7d] mb-2 px-1">
                  Navigation
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.key;
                    return (
                      <button
                        key={item.key}
                        onClick={() => {
                          setActiveTab(item.key);
                          setMobileDrawerOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold rounded-lg transition-all ${isActive
                            ? "bg-[#F2A007]/15 text-[#1C1A17] font-bold border border-[#F2A007]/35 shadow-2xs"
                            : "text-[#645d56] hover:bg-[#F2A007]/10"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? "text-[#D97706] stroke-[2.2]" : "text-[#8b7f73]"}`} />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isActive ? "text-[#D97706]" : "text-[#cfc4b5]"}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Bottom Info */}
              <div className="pt-4 border-t border-[#e8e1d7] text-xs text-[#7c7267] space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("settings");
                    setMobileDrawerOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#faf8f5] hover:bg-[#f5ede2] border border-[#e8e1d7] text-left transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-[#f7efe4] border border-[#e2d8cb] flex items-center justify-center text-[#b45309] font-bold text-xs">
                      {userName ? userName.slice(0, 2).toUpperCase() : "RK"}
                    </div>
                    <div>
                      <div className="font-bold text-[#24201d]">{userName}</div>
                      <div className="text-[10px] text-[#7c7267]">{userRole} • View Profile</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8c7e72]" />
                </button>
                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#665e55] bg-[#faf8f5] border border-[#e0d7cb] rounded-lg"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Log Out
                </Link>
              </div>
            </div>

            <div className="flex-1" onClick={() => setMobileDrawerOpen(false)} />
          </div>
        )}

        {/* Content View Area */}
        <main className="flex-1 p-3.5 sm:p-8 pb-28 sm:pb-28 md:pb-8 max-w-7xl w-full mx-auto">
          {/* ======================================================== */}
          {/* TAB 1: HOME (OPERATIONAL COMMAND CENTER) */}
          {/* ======================================================== */}
          {activeTab === "home" && (
            <div className="space-y-6">
              {/* Overall Colony Fleet Banner */}
              <div className="bg-[#fff8ec] border border-[#f3e3ca] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#b45309] bg-[#fef3c7] border border-[#fde68a] px-2.5 py-0.5 rounded-full shadow-2xs">
                      Apiary Fleet Intelligence
                    </span>
                    <span className="text-xs text-[#7c7267]">3 Managed Colonies Monitored</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#24201d]">
                    Colony Health &amp; Fleet Overview
                  </h1>
                  <p className="text-sm text-[#665e55] mt-1">
                    Overall biological vital monitoring across all active apiary yards — Queen status, population biomass, nectar influx, and disease prevention.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setActiveTab("sensors")}
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1C1A17] bg-white border border-[#e8ded0] rounded-lg hover:bg-[#F2A007]/20 hover:border-[#F2A007]/50 transition-all shadow-2xs cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#1C1A17]" />
                    Hive Sensor Nodes
                  </button>
                  <button
                    onClick={() => setActiveTab("advisor")}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#1C1A17] bg-[#F2A007] rounded-lg hover:bg-[#d98f06] transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    <Brain className="w-3.5 h-3.5" />
                    AI Diagnostic
                  </button>
                </div>
              </div>

              {/* Dynamic Colony Condition Status Banner (Green for Good, Red for Alert) */}
              {colonyCondition === "good" ? (
                <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-100/40 border border-emerald-300/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/25">
                      <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                          Colonies Status: Optimal &amp; Thriving
                        </span>
                        <span className="text-xs text-emerald-700 font-medium">Fleet-wide audit nominal</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#14532d]">
                        All Managed Colonies in Prime Health
                      </h2>
                      <p className="text-xs sm:text-sm text-[#166534] mt-0.5 max-w-3xl">
                        Robust worker workforce, active foraging flight paths, steady nectar accumulation, and zero swarming or disease signatures detected across all 3 apiary yards.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                    <button
                      type="button"
                      onClick={() => setColonyCondition("alert")}
                      className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-white/80 hover:bg-white border border-emerald-300 px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs"
                      title="Simulate Anomaly Warning"
                    >
                      Simulate Alert
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-red-50 via-rose-50 to-red-100/40 border border-red-300/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-red-500/30 animate-pulse">
                      <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-red-800 bg-red-100 border border-red-300 px-2.5 py-0.5 rounded-full">
                          Colony Attention Required: Fleet Anomaly Alert
                        </span>
                        <span className="text-xs text-red-700 font-medium">Yard inspection needed</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#7f1d1d]">
                        Colony Agitation &amp; Swarm Signals Detected
                      </h2>
                      <p className="text-xs sm:text-sm text-[#991b1b] mt-0.5 max-w-3xl">
                        High worker agitation and pre-swarm piping signals detected in Meadow Yard colony. Immediate yard inspection, brood frame check, and honey super addition recommended.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                    <button
                      type="button"
                      onClick={() => setColonyCondition("good")}
                      className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-3.5 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer"
                    >
                      Clear &amp; Mark Normal
                    </button>
                  </div>
                </div>
              )}

              {/* Comprehensive Colony Health Metrics Dashboard (Colony-wide / Fleet-wide Data) */}
              <div className="bg-white border border-[#e8e1d7] rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#f0eae1]">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#b45309] uppercase tracking-wider mb-1">
                      <Layers className="w-4 h-4 text-[#F2A007]" />
                      <span>Apiary Fleet Health Matrix &amp; Biomass Diagnostics</span>
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl text-[#24201d]">
                      Overall Colony Vital Indicators (3 Colonies Fleet)
                    </h3>
                  </div>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full border self-start sm:self-auto ${
                    colonyCondition === "good"
                      ? "text-emerald-800 bg-emerald-50 border-emerald-200"
                      : "text-red-800 bg-red-50 border-red-200"
                  }`}>
                    {colonyCondition === "good" ? "Fleet Health: 98% (Prime)" : "Fleet Health: 62% (Warning)"}
                  </span>
                </div>

                {/* 6 Overall Colony / Fleet-Level Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Metric 1: Colony Population Biomass */}
                  <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e8ded0] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#7c7267]">Colony Biomass Population</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                        3 Colonies Active
                      </span>
                    </div>
                    <div className="text-xl font-black text-[#24201d]">
                      ~145,000 Bees
                    </div>
                    <div className="text-xs text-[#665e55] flex items-center justify-between pt-1 border-t border-[#f0eae1]">
                      <span>Forager Force: ~82,000</span>
                      <span className="font-semibold text-emerald-700">Strong Workforce</span>
                    </div>
                  </div>

                  {/* Metric 2: Queen-Right Status & Laying Rate */}
                  <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e8ded0] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#7c7267]">Queen-Right Viability</span>
                      <span className="font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 text-[10px]">
                        100% Laying
                      </span>
                    </div>
                    <div className="text-xl font-black text-[#24201d]">
                      3 / 3 Queens Active
                    </div>
                    <div className="text-xs text-[#665e55] flex items-center justify-between pt-1 border-t border-[#f0eae1]">
                      <span>Fleet Rate: ~5,400 eggs/day</span>
                      <span className="font-semibold text-emerald-700">Dense Brood</span>
                    </div>
                  </div>

                  {/* Metric 3: Honey Yield & Nectar Flow */}
                  <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e8ded0] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#7c7267]">Apiary Honey Reserve</span>
                      <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[10px]">
                        Flow Active
                      </span>
                    </div>
                    <div className="text-xl font-black text-[#24201d]">
                      128 kg Estimated
                    </div>
                    <div className="text-xs text-[#665e55] flex items-center justify-between pt-1 border-t border-[#f0eae1]">
                      <span>Net Gain: +4.2 kg/day</span>
                      <span className="font-semibold text-amber-800">Harvest Ready</span>
                    </div>
                  </div>

                  {/* Metric 4: Swarm Probability Index */}
                  <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e8ded0] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#7c7267]">Fleet Swarm Risk Index</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                        Threshold: &lt;15%
                      </span>
                    </div>
                    <div className={`text-xl font-black ${colonyCondition === "good" ? "text-emerald-700" : "text-red-700"}`}>
                      {colonyCondition === "good" ? "1.8 % (Very Low)" : "64.2 % (High Alert)"}
                    </div>
                    <div className="text-xs text-[#665e55] flex items-center justify-between pt-1 border-t border-[#f0eae1]">
                      <span>Queen Piping: {colonyCondition === "good" ? "Zero Detected" : "Detected in Meadow"}</span>
                      <span className={`font-semibold ${colonyCondition === "good" ? "text-emerald-700" : "text-red-700"}`}>
                        {colonyCondition === "good" ? "Calm Colony State" : "Swarm Warning"}
                      </span>
                    </div>
                  </div>

                  {/* Metric 5: Pest & Varroa Mite Infestation */}
                  <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e8ded0] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#7c7267]">Varroa &amp; Pest Status</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                        Safe Limit: &lt;3%
                      </span>
                    </div>
                    <div className="text-xl font-black text-[#24201d]">
                      &lt;0.8 % (Clean)
                    </div>
                    <div className="text-xs text-[#665e55] flex items-center justify-between pt-1 border-t border-[#f0eae1]">
                      <span>Organic Mite Wash</span>
                      <span className="font-semibold text-emerald-700">Clean Colonies</span>
                    </div>
                  </div>

                  {/* Metric 6: Forager Flight Velocity */}
                  <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e8ded0] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#7c7267]">Forager Flight Activity</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                        Bloom Active
                      </span>
                    </div>
                    <div className="text-xl font-black text-[#24201d]">
                      142 bees/min
                    </div>
                    <div className="text-xs text-[#665e55] flex items-center justify-between pt-1 border-t border-[#f0eae1]">
                      <span>Foraging Coverage: Sarson &amp; Acacia</span>
                      <span className="font-semibold text-emerald-700">High Traffic</span>
                    </div>
                  </div>
                </div>

                {/* Multi-Colony Yard Status Cards (Showing the 3 Colonies at a Glance) */}
                <div className="pt-4 border-t border-[#f0eae1] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A4B12]">
                      Colony Fleet Status Breakdown
                    </h4>
                    <button
                      onClick={() => setActiveTab("hives")}
                      className="text-xs font-bold text-[#b45309] hover:text-[#1C1A17] hover:underline cursor-pointer"
                    >
                      Manage All Hives &rarr;
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-[#faf8f5] border border-[#e8ded0] rounded-xl space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#24201d]">Hive #01 — Orchard Yard</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Flow Active
                        </span>
                      </div>
                      <div className="text-[11px] text-[#665e55]">Queen Carniolan (2025 Blue) • 42.6 kg Biomass</div>
                      <div className="text-[10px] text-[#7c7267]">Honey Super ~14.8 kg • Brood Rearing Steady</div>
                    </div>

                    <div className="p-3 bg-[#faf8f5] border border-[#e8ded0] rounded-xl space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#24201d]">Hive #02 — Meadow Yard</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          colonyCondition === "good"
                            ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                            : "text-red-700 bg-red-50 border-red-200"
                        }`}>
                          {colonyCondition === "good" ? "Fast Influx" : "Swarm Check"}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#665e55]">Queen Italian Cordovan • 49.1 kg Biomass</div>
                      <div className="text-[10px] text-[#7c7267]">Honey Super ~18.5 kg • Mustard Bloom Peaking</div>
                    </div>

                    <div className="p-3 bg-[#faf8f5] border border-[#e8ded0] rounded-xl space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#24201d]">Hive #03 — Valley Creek</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Brood Solid
                        </span>
                      </div>
                      <div className="text-[11px] text-[#665e55]">Queen Caucasian Hybrid • 36.4 kg Biomass</div>
                      <div className="text-[10px] text-[#7c7267]">Acacia &amp; Clover Bloom • Clean Mite Wash</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Inspection Logs & Upcoming Tasks */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-[#24201d] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#7c7267]" />
                      <span>Recent Apiary Inspection Logs</span>
                    </h3>
                    <button
                      onClick={() => setShowInspectionModal(true)}
                      className="text-xs font-bold text-[#8A4B12] hover:text-[#1C1A17] hover:underline cursor-pointer"
                    >
                      + Add New
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-[#faf8f5] border border-[#e8e1d7] rounded-md flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#16a34a] mt-0.5 shrink-0" />
                      <div>
                        <div className="font-bold text-[#24201d]">
                          Routine Frame & Brood Check (Hive #01)
                        </div>
                        <p className="text-[#665e55] mt-0.5">
                          Checked 10 brood frames. Queen spotted on frame #4. Fresh eggs and healthy pearly white C-shaped larvae observed.
                        </p>
                        <span className="text-[10px] text-[#7c7267] block mt-1">
                          14 Oct 2026 • By Ritesh Kumar
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#faf8f5] border border-[#e8e1d7] rounded-md flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#16a34a] mt-0.5 shrink-0" />
                      <div>
                        <div className="font-bold text-[#24201d]">
                          Honey Super Installed (Hive #01)
                        </div>
                        <p className="text-[#665e55] mt-0.5">
                          Added medium super with foundation wax. Hive weight tared at 38.2 kg on load cell.
                        </p>
                        <span className="text-[10px] text-[#7c7267] block mt-1">
                          08 Oct 2026 • By Ritesh Kumar
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Automated Hive Alert & Recommended Actions */}
                <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8A4B12] uppercase tracking-wider mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      Recommended Apiculture Actions
                    </div>
                    <h3 className="text-base font-bold text-[#24201d] mb-2">
                      Action Required: Prepare Extraction Equipment
                    </h3>
                    <p className="text-xs text-[#665e55] leading-relaxed mb-4">
                      Based on weight trajectory (+1.3 kg/day) and low acoustic swarm activity, Hive #01 super is projected to reach full maturity (18–20 kg capped honey) by Friday. Check capping readiness.
                    </p>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 bg-[#faf8f5] border border-[#e8e1d7] rounded-md flex items-center justify-between">
                        <span className="font-medium text-[#24201d]">1. Clean honey extractor & bottling tanks</span>
                        <span className="text-[10px] font-bold text-[#8A4B12] bg-[#F2A007]/20 border border-[#F2A007]/30 px-2 py-0.5 rounded">Pending</span>
                      </div>
                      <div className="p-2.5 bg-[#faf8f5] border border-[#e8e1d7] rounded-md flex items-center justify-between">
                        <span className="font-medium text-[#24201d]">2. Verify digital refractometer calibration</span>
                        <span className="text-[10px] font-bold text-[#16a34a] bg-[#F2A007]/15 border border-[#F2A007]/30 px-2 py-0.5 rounded">Ready</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("harvest")}
                    className="mt-4 w-full py-2.5 text-xs font-bold text-[#1C1A17] bg-[#F2A007] rounded-lg hover:bg-[#d98f06] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95"
                  >
                    <span>Go to Honey Harvest Workflow</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: MY HIVES (COMPLETE APIARY MANAGEMENT) */}
          {/* ======================================================== */}
          {activeTab === "hives" && (
            <div className="space-y-6">
              <div className="bg-[#fff8ec] border border-[#f3e3ca] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#24201d]">My Hives &amp; Apiary Fleet</h1>
                  <p className="text-sm text-[#665e55] mt-1">
                    Manage your monitored hive hardware nodes, colony configurations, and queens.
                  </p>
                </div>
                <button
                  onClick={() => alert("New hive hardware node pairing workflow initialized. Ready to attach LoRa/WiFi sensor node.")}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-[#1C1A17] bg-[#F2A007] rounded-lg hover:bg-[#d98f06] shadow-xs transition-all cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  Register New Hive Node
                </button>
              </div>

              {/* Multi-Hive Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    name: "Hive #01 - Orchard Yard",
                    queen: "Carniolan (2025 Blue)",
                    config: "10-Frame Deep + 1 Medium Super",
                    status: "Strong / Honey Flow",
                    weight: "42.6 kg",
                    weightTrend: "+1.3 kg/day",
                    temp: "34.8 °C",
                    humidity: "58.4 %",
                    sound: "228 Hz (Calm)",
                    battery: "98% (Solar)",
                    signal: "WiFi (Strong -58dBm)",
                  },
                  {
                    name: "Hive #02 - Meadow Yard",
                    queen: "Italian Cordovan (2025 Blue)",
                    config: "10-Frame Deep + 2 Medium Supers",
                    status: "Nectar Flowing Fast",
                    weight: "49.1 kg",
                    weightTrend: "+1.8 kg/day",
                    temp: "35.2 °C",
                    humidity: "56.8 %",
                    sound: "240 Hz (Very Active)",
                    battery: "94% (Solar)",
                    signal: "LoRaWAN (-74dBm)",
                  },
                  {
                    name: "Hive #03 - Valley Creek",
                    queen: "Caucasian Hybrid (2024 Green)",
                    config: "8-Frame Langstroth Deep",
                    status: "Brood Rearing Steady",
                    weight: "36.4 kg",
                    weightTrend: "+0.5 kg/day",
                    temp: "34.2 °C",
                    humidity: "61.0 %",
                    sound: "215 Hz (Stable)",
                    battery: "91% (Solar)",
                    signal: "WiFi (Good -65dBm)",
                  },
                ].map((h, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#e8e1d7] rounded-lg p-5 space-y-4 shadow-2xs hover:border-[#F2A007] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-[#e8e1d7]">
                        <div className="flex items-center gap-2">
                          <Hexagon className="w-5 h-5 text-[#F2A007]" />
                          <h3 className="font-bold text-sm text-[#24201d]">{h.name}</h3>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#F2A007]/20 border border-[#F2A007]/30 text-[#8A4B12]">
                          {h.status}
                        </span>
                      </div>

                      <div className="mt-3 space-y-2 text-xs text-[#665e55]">
                        <div className="flex justify-between">
                          <span>Queen Strain:</span>
                          <span className="font-semibold text-[#24201d]">{h.queen}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Box Layout:</span>
                          <span className="font-semibold text-[#24201d]">{h.config}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hive Weight:</span>
                          <span className="font-bold text-[#8A4B12]">{h.weight} ({h.weightTrend})</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Core Brood Temp:</span>
                          <span className="font-semibold text-[#24201d]">{h.temp}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Relative Humidity:</span>
                          <span className="font-semibold text-[#24201d]">{h.humidity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Acoustic Frequency:</span>
                          <span className="font-semibold text-[#24201d]">{h.sound}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#f4ede3] flex items-center justify-between text-[11px] text-[#7c7267]">
                        <span className="flex items-center gap-1">
                          <BatteryCharging className="w-3 h-3 text-[#16a34a]" />
                          {h.battery}
                        </span>
                        <span className="flex items-center gap-1">
                          <Wifi className="w-3 h-3 text-[#F2A007]" />
                          {h.signal}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedHive(h.name);
                          setActiveTab("sensors");
                        }}
                        className="flex-1 py-2 text-xs font-semibold text-[#4b433b] bg-[#faf8f5] border border-[#e0d7cb] rounded-lg hover:bg-[#f5ede2] transition-colors cursor-pointer"
                      >
                        Telemetry
                      </button>
                      <button
                        onClick={() => {
                          setSelectedHive(h.name);
                          setActiveTab("home");
                        }}
                        className="flex-1 py-2 text-xs font-bold text-[#1C1A17] bg-[#F2A007] rounded-lg hover:bg-[#d98f06] transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: HARVEST HONEY (FULL HARVEST WORKFLOW) */}
          {/* ======================================================== */}
          {activeTab === "harvest" && (
            <div className="space-y-6">
              <div className="bg-[#fff8ec] border border-[#f3e3ca] rounded-2xl p-5 sm:p-6 shadow-xs">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#24201d]">Honey Harvest &amp; Extraction Workflow</h1>
                <p className="text-sm text-[#665e55] mt-1">
                  Log honey harvest batches, record refractometer moisture grades, and generate certified consumer traceability tags.
                </p>
              </div>

              {/* Pre-Harvest Telemetry Check Banner */}
              <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs">
                <h3 className="font-bold text-base text-[#24201d] mb-3 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-[#F2A007]" />
                  <span>Harvest Readiness Diagnosis ({selectedHive})</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-[#faf8f5] border border-[#e8e1d7] rounded-lg">
                    <div className="text-[#7c7267]">Load Cell Honey Surplus</div>
                    <div className="text-xl font-extrabold text-[#8A4B12] mt-1">+18.5 kg</div>
                    <div className="text-[11px] text-[#16a34a] mt-0.5">✓ Ready for extraction</div>
                  </div>

                  <div className="p-3 bg-[#faf8f5] border border-[#e8e1d7] rounded-lg">
                    <div className="text-[#7c7267]">Estimated Comb Capping</div>
                    <div className="text-xl font-extrabold text-[#24201d] mt-1">85% - 90%</div>
                    <div className="text-[11px] text-[#16a34a] mt-0.5">✓ Moisture sealed properly</div>
                  </div>

                  <div className="p-3 bg-[#faf8f5] border border-[#e8e1d7] rounded-lg">
                    <div className="text-[#7c7267]">Forecasted Weather</div>
                    <div className="text-xl font-extrabold text-[#24201d] mt-1">Dry (0% Rain)</div>
                    <div className="text-[11px] text-[#16a34a] mt-0.5">✓ No humidity interference</div>
                  </div>
                </div>
              </div>

              {/* Honey Harvest Entry Form */}
              <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 sm:p-6 shadow-2xs space-y-6">
                <h3 className="text-base font-bold text-[#24201d]">Record Extraction Batch</h3>

                <form onSubmit={handleRecordHarvest} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#574f46] mb-1.5">
                        Source Hive Box
                      </label>
                      <select
                        value={harvestHive}
                        onChange={(e) => setHarvestHive(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#F2A007] bg-white cursor-pointer"
                      >
                        <option value="Hive #01 - Orchard Yard">Hive #01 - Orchard Yard</option>
                        <option value="Hive #02 - Meadow Yard">Hive #02 - Meadow Yard</option>
                        <option value="Hive #03 - Valley Creek">Hive #03 - Valley Creek</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#574f46] mb-1.5">
                        Harvested Net Honey Weight (kg)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={harvestWeight}
                        onChange={(e) => setHarvestWeight(e.target.value)}
                        placeholder="e.g. 18.5"
                        className="w-full px-3 py-2 text-sm border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#F2A007]"
                      >
                      </input>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#574f46] mb-1.5">
                        Refractometer Moisture Content (%)
                      </label>
                      <input
                        type="text"
                        required
                        value={harvestMoisture}
                        onChange={(e) => setHarvestMoisture(e.target.value)}
                        placeholder="e.g. 17.2%"
                        className="w-full px-3 py-2 text-sm border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#F2A007]"
                      >
                      </input>
                      <span className="text-[11px] text-[#16a34a] font-medium mt-1 block">
                        ✓ Safe grade (&lt;18.6% moisture prevents yeast fermentation)
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#574f46] mb-1.5">
                        Floral Nectar Category
                      </label>
                      <input
                        type="text"
                        required
                        value={harvestFloral}
                        onChange={(e) => setHarvestFloral(e.target.value)}
                        placeholder="e.g. Acacia Wildflower"
                        className="w-full px-3 py-2 text-sm border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#F2A007]"
                      >
                      </input>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#e8e1d7] flex flex-col-reverse sm:flex-row justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setHarvestWeight("18.5");
                        setHarvestMoisture("17.2");
                        setHarvestFloral("Acacia Wildflower");
                      }}
                      className="px-4 py-2 text-xs font-semibold text-[#574f46] bg-[#faf8f5] border border-[#e0d7cb] rounded-lg hover:bg-[#ede3d5] transition-colors cursor-pointer"
                    >
                      Reset Form
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold text-[#1C1A17] bg-[#F2A007] rounded-lg hover:bg-[#d98f06] shadow-xs transition-all cursor-pointer active:scale-95"
                    >
                      Generate Batch Certificate
                    </button>
                  </div>
                </form>
              </div>

              {/* Generated Batch Traceability Card */}
              {createdBatch && (
                <div className="bg-white border-2 border-[#F2A007] rounded-lg p-5 sm:p-6 shadow-md space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#e8e1d7] gap-2">
                    <div>
                      <div className="text-[11px] font-bold text-[#8A4B12] uppercase tracking-wider">
                        Traceable Apiary Certification
                      </div>
                      <h3 className="font-extrabold text-lg text-[#24201d]">
                        Batch #{createdBatch.id}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-[#16a34a] bg-[#F2A007]/15 border border-[#F2A007]/30 px-3 py-1 rounded-md">
                      ✓ Certified Organic & Lab Checked
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-[#faf8f5] rounded-md">
                      <span className="text-[#7c7267] block">Source Hive</span>
                      <strong className="text-[#24201d]">{createdBatch.hive}</strong>
                    </div>
                    <div className="p-3 bg-[#faf8f5] rounded-md">
                      <span className="text-[#7c7267] block">Total Harvest</span>
                      <strong className="text-[#8A4B12]">{createdBatch.weight} kg</strong>
                    </div>
                    <div className="p-3 bg-[#faf8f5] rounded-md">
                      <span className="text-[#7c7267] block">Moisture Ratio</span>
                      <strong className="text-[#16a34a]">{createdBatch.moisture}%</strong>
                    </div>
                    <div className="p-3 bg-[#faf8f5] rounded-md">
                      <span className="text-[#7c7267] block">Nectar Type</span>
                      <strong className="text-[#24201d]">{createdBatch.floral}</strong>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#e8e1d7] text-xs text-[#7c7267]">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-[#F2A007]" />
                      <span>Consumer Traceability QR Code Ready for Packaging</span>
                    </div>
                    <button
                      onClick={() => alert(`Batch ${createdBatch.id} metadata exported to CSV/Label printer.`)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#F2A007] text-[#1C1A17] font-bold rounded-lg hover:bg-[#d98f06] transition-all shadow-xs cursor-pointer active:scale-95"
                    >
                      <Download className="w-4 h-4" />
                      Download Label & QR
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: SENSOR DATA (DEEP MULTI-VECTOR TELEMETRY) */}
          {/* ======================================================== */}
          {activeTab === "sensors" && (
            <div className="space-y-6">
              {/* Reference Top Hive Status Card */}
              <div className="bg-[#fff8ec] border border-[#f3e3ca] rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 sm:gap-4">
                  {/* Bee Avatar */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center shrink-0 shadow-2xs">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 36 36" fill="none">
                      {/* Top Wings */}
                      <ellipse cx="21" cy="11" rx="6.5" ry="4" transform="rotate(-25 21 11)" fill="#7dd3fc" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="1" />
                      <ellipse cx="14" cy="10" rx="5.5" ry="3.5" transform="rotate(-60 14 10)" fill="#bae6fd" fillOpacity="0.85" stroke="#7dd3fc" strokeWidth="1" />

                      {/* Little Legs */}
                      <path d="M14 26 L12 30" stroke="#312e81" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M18 27 L18 31" stroke="#312e81" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M22 26 L24 30" stroke="#312e81" strokeWidth="1.5" strokeLinecap="round" />

                      {/* Body */}
                      <ellipse cx="18" cy="20" rx="9" ry="7.5" fill="#f59e0b" />
                      {/* Stripes */}
                      <path d="M13.5 13 C15 12.8 17 12.8 18.5 13 L18.5 27 C17 27.2 15 27.2 13.5 27 Z" fill="#312e81" />
                      <path d="M20.5 13.8 C21.8 14.5 22.8 15.5 23.5 17.5 L23.5 23 C22.8 25 21.8 26 20.5 26.5 Z" fill="#312e81" />

                      {/* Stinger */}
                      <polygon points="9,20 6.5,20 9,21" fill="#1e1b4b" />

                      {/* Antennae */}
                      <path d="M24 16 C25.5 14 27 13 28.5 13" stroke="#1e1b4b" strokeWidth="1.2" strokeLinecap="round" />
                      <circle cx="28.5" cy="13" r="0.8" fill="#1e1b4b" />
                      <path d="M23 15 C23.5 13 24.5 11.5 25.5 11" stroke="#1e1b4b" strokeWidth="1.2" strokeLinecap="round" />
                      <circle cx="25.5" cy="11" r="0.8" fill="#1e1b4b" />

                      {/* Face Eye */}
                      <circle cx="23.5" cy="19.5" r="1.2" fill="#1e1b4b" />
                    </svg>
                  </div>

                  {/* Details */}
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                        {currentHiveInfo.code}
                      </h2>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        isVirtualHiveConnected
                          ? "bg-[#e0f2fe] text-[#0284c7] border-[#bae6fd]"
                          : "bg-[#fef3c7] text-[#92400e] border-[#fde68a]"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isVirtualHiveConnected ? "bg-[#0284c7] animate-pulse" : "bg-[#b45309]"
                        }`} />
                        {isVirtualHiveConnected ? "IoT Simulated" : "Stored Buffer (1)"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#78716c] font-normal flex-wrap mt-0.5">
                      <span className="font-semibold text-[#9a3412]">{currentHiveInfo.crop}</span>
                      <span className="text-[#a8a29e]">•</span>
                      {isVirtualHiveConnected ? (
                        <>
                          <span>{currentHiveInfo.updated}</span>
                          <span className="text-[#a8a29e]">•</span>
                          <span>Digital Twin</span>
                        </>
                      ) : (
                        <span>WiFi Disconnected • 1 readings stored in local edge buffer</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Controls: Disconnect Virtual Hive & Select Hive Dropdown (Matching Reference 2) */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => setIsVirtualHiveConnected(!isVirtualHiveConnected)}
                    className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer shadow-2xs ${
                      isVirtualHiveConnected
                        ? "text-[#15803d] bg-[#ecfdf5] border border-[#86efac] hover:bg-[#dcfce7]"
                        : "text-[#92400e] bg-[#fffbeb] border border-[#fde047] hover:bg-[#fef9c3]"
                    }`}
                  >
                    {isVirtualHiveConnected ? (
                      <>
                        <Wifi className="w-3.5 h-3.5 text-[#10b981]" />
                        <span>Disconnect Virtual Hive</span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="w-3.5 h-3.5 text-[#d97706]" />
                        <span>Connect Virtual Hive</span>
                      </>
                    )}
                  </button>

                  {/* Select Hive Dropdown (Matching 2nd Reference Image) */}
                  <div className="flex items-center gap-2 bg-white/95 border border-[#e2d8cb] px-3.5 py-1.5 rounded-full shadow-2xs hover:border-[#F2A007] transition-all">
                    <span className="text-xs font-medium text-[#64748b] whitespace-nowrap">
                      Select Hive:
                    </span>
                    <select
                      value={selectedHive}
                      onChange={(e) => setSelectedHive(e.target.value)}
                      className="text-xs font-bold text-[#1e293b] bg-transparent border-none outline-none cursor-pointer pr-1"
                    >
                      <option value="Hive #01 - Orchard Yard">HC-HIVE-01 • Orchard Yard</option>
                      <option value="Hive #02 - Meadow Yard">HC-HIVE-02 • Mustard Flower (Sarson)</option>
                      <option value="Hive #03 - Valley Creek">HC-HIVE-03 • Valley Creek</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Full Interactive Sensor Graphs (Temp, Humidity, Hive Weight) */}
              <SensorTelemetryDashboard initialHiveId={selectedHive} />

              {/* Companion: Bee Acoustic Sound Monitoring */}
              <div className="bg-white border border-[#e8e1d7] rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#f0eae1]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#F2A007] text-[#1C1A17] flex items-center justify-center shadow-2xs">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#24201d]">
                        Bee Acoustic Sound FFT Analyzer
                      </h3>
                      <span className="text-xs text-[#7c7267]">I2S In-Hive MEMS Microphone Real-time Frequency Spectrum</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#16a34a] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
                    228 Hz Normal Buzz
                  </span>
                </div>

                <div className="bg-[#faf8f5] border border-[#e8e1d7] rounded-lg p-4 space-y-3">
                  <div className="flex justify-between text-xs text-[#7c7267]">
                    <span>Peak Harmonic: <strong>228 Hz</strong></span>
                    <span>Sound Intensity: <strong>41.2 dB</strong></span>
                    <span>Swarm Risk Band: <strong className="text-emerald-700">0.8% (Negligible)</strong></span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-medium text-[#574f46]">
                      <span>Harmonic Spectrum Profile</span>
                      <span className="font-bold text-[#16a34a]">Calm Colony Worker Buzz (Optimal)</span>
                    </div>
                    <div className="w-full bg-[#e8e1d7] h-3.5 rounded-sm overflow-hidden flex">
                      <div className="bg-[#F2A007] h-full" style={{ width: "42%" }} title="Worker Hum (150-250Hz)" />
                      <div className="bg-[#d97706] h-full" style={{ width: "12%" }} title="Queen Tone (300-400Hz)" />
                      <div className="bg-[#e8ded0] h-full flex-1" title="High Freq Roar (450-600Hz)" />
                    </div>
                  </div>

                  <p className="text-xs text-[#665e55]">
                    No pre-swarming high frequency spikes (350–500 Hz) or queen piping vibrations detected. Colony status is stable and focused on nectar curing.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: AI ADVISOR (APICULTURE INTELLIGENCE) */}
          {/* ======================================================== */}
          {activeTab === "advisor" && (
            <div className="space-y-6">
              <div className="bg-[#fff8ec] border border-[#f3e3ca] rounded-2xl p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8A4B12] uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  <span>Real-time Multi-Vector AI Diagnostic Engine</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#24201d]">AI Hive Advisor</h1>
                <p className="text-sm text-[#665e55] mt-1">
                  Automated correlation of acoustic frequency, hive weight dynamics, brood temperature, and local forage phenology.
                </p>
              </div>

              {/* Automated Diagnostic Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-[#F2A007]/15 border border-[#F2A007]/30 flex items-center justify-center text-[#8A4B12]">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#24201d]">
                        Acoustic Swarm Prediction Model
                      </h3>
                      <span className="text-[11px] text-[#16a34a] font-semibold">Low Risk (&lt;2%)</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#665e55] leading-relaxed">
                    Worker flight hum has remained steady between 220Hz and 235Hz over the past 7 days. High-frequency swarm roar (450Hz+) and queen piping (350Hz) are absent. Colony is not preparing to cast a swarm.
                  </p>
                </div>

                <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-[#F2A007]/15 border border-[#F2A007]/30 flex items-center justify-center text-[#8A4B12]">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#24201d]">
                        Honey Super & Nectar Flow Timing
                      </h3>
                      <span className="text-[11px] text-[#8A4B12] font-semibold">Action in 2 Days</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#665e55] leading-relaxed">
                    Acacia flower blooms will conclude in approximately 5 days. Since current super is at ~77% fill, add a secondary honey super box before Thursday to prevent honey-bound brood congestion.
                  </p>
                </div>
              </div>

              {/* Interactive AI Chat Console */}
              <div className="bg-white border border-[#e8e1d7] rounded-lg shadow-2xs overflow-hidden flex flex-col h-[460px]">
                <div className="p-4 bg-[#faf8f5] border-b border-[#e8e1d7] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#16a34a] animate-pulse" />
                    <span className="font-bold text-xs text-[#24201d]">
                      Apiculture AI Assistant (Consulting on {selectedHive})
                    </span>
                  </div>
                  <span className="text-[11px] text-[#7c7267]">Grounded in live telemetry</span>
                </div>

                {/* Messages Container */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fdfbf8]">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] rounded-lg p-3 text-xs leading-relaxed shadow-2xs ${msg.sender === "user"
                            ? "bg-[#F2A007] text-[#1C1A17] font-medium shadow-xs"
                            : "bg-white border border-[#e8e1d7] text-[#24201d]"
                          }`}
                      >
                        <div className="flex items-center justify-between gap-4 mb-1">
                          <span className={`font-bold text-[10px] uppercase ${msg.sender === "user" ? "text-[#1C1A17]/80" : "text-[#8A4B12]"}`}>
                            {msg.sender === "user" ? "Ritesh Kumar" : "BEE safe AI"}
                          </span>
                          <span className={`text-[10px] ${msg.sender === "user" ? "text-[#1C1A17]/70" : "text-[#7c7267]"}`}>
                            {msg.time}
                          </span>
                        </div>
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Query Quick Suggestions */}
                <div className="px-4 py-2 bg-[#faf8f5] border-t border-[#e8e1d7] flex gap-2 overflow-x-auto text-[11px]">
                  {[
                    "Should I add a honey super now?",
                    "Analyze acoustic swarm risk",
                    "What is optimal inspection time tomorrow?",
                  ].map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAiQuery(suggestion)}
                      className="px-2.5 py-1 bg-white border border-[#e0d7cb] rounded-md text-[#574f46] hover:bg-[#F2A007]/20 hover:text-[#1C1A17] shrink-0 transition-all cursor-pointer"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                {/* Input Field */}
                <form onSubmit={handleSendAiQuery} className="p-3 bg-white border-t border-[#e8e1d7] flex gap-2">
                  <input
                    type="text"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="Ask AI advisor about colony health, acoustic spikes, floral flow, or treatments..."
                    className="flex-1 px-3 py-2 text-xs border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#F2A007]"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#1C1A17] bg-[#F2A007] rounded-lg hover:bg-[#d98f06] transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: ACCOUNT & SETTINGS (MATCHING IMAGE 1, 2, & 3) */}
          {/* ======================================================== */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-5xl">
              {/* Top Page Heading (from Image 3) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#e8e1d7]">
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center text-[#d97706] shadow-2xs">
                      <Settings className="w-5 h-5 text-[#d97706]" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#24201d] tracking-tight">
                      Account &amp; Settings
                    </h1>
                  </div>
                  <p className="text-xs sm:text-sm text-[#7c7267] mt-1.5 ml-0 sm:ml-10.5">
                    Manage your account language, regional preferences, and voice advisory
                  </p>
                </div>

                {editSuccessMsg && (
                  <div className="inline-flex items-center gap-2 bg-[#f0fdf4] border border-[#bbf7d0] text-[#15803d] px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-2xs animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                    <span>{editSuccessMsg}</span>
                  </div>
                )}
              </div>

              {/* Profile Card & Account Details Container (Images 1, 2, & 3) */}
              <div className="bg-white border border-[#e8e1d7] rounded-2xl shadow-xs overflow-hidden">
                {/* Profile Hero Header */}
                <div className="p-4 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-gradient-to-r from-[#fffcf7] via-white to-[#faf6ee]">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
                    {/* Orange Rounded Avatar with Letter 'R' (from Image 3) */}
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#ea580c] via-[#d97706] to-[#b45309] shadow-md flex items-center justify-center text-white text-2xl sm:text-4xl font-bold font-serif shrink-0 border-2 border-white/60">
                      {userName ? userName.charAt(0).toUpperCase() : "R"}
                    </div>

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#24201d] tracking-tight truncate">
                          {userName}
                        </h2>
                        {/* Designation from Image 2 */}
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#f7efe4] border border-[#e8ded0] text-[#8c7e72]">
                          {userRole}
                        </span>
                      </div>

                      {/* Badges Row (from Image 3) */}
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
                        {/* Badge 1: ● BEEKEEPER */}
                        <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-bold bg-[#fef3c7] text-[#92400e] border border-[#fde68a] shadow-2xs">
                          <span className="w-2 h-2 rounded-full bg-[#d97706]" />
                          BEEKEEPER
                        </span>

                        {/* Badge 2: 🛡️ KVIC Verified */}
                        <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-bold bg-[#fffbeb] text-[#92400e] border border-[#fcd34d] shadow-2xs">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#d97706]" />
                          KVIC Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Registered Metadata */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#ede3d5] md:border-t-0 md:border-l md:pl-6 md:pt-0 w-full md:w-auto text-xs text-[#7c7267]">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#968a7d] tracking-wider">Registered Apiary</div>
                      <div className="font-semibold text-[#24201d] mt-0.5">Orchard Yard · 4 Hives</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#968a7d] tracking-wider">Honey Mission ID</div>
                      <div className="font-mono font-semibold text-[#b45309] mt-0.5">UP-BEE-2026-8849</div>
                    </div>
                  </div>
                </div>

                {/* ======================================================== */}
                {/* ACCOUNT DETAILS SUB-SECTION (EXACTLY MATCHING IMAGE 1) */}
                {/* ======================================================== */}
                <div className="p-4 sm:p-7 border-t border-[#f0e7db] bg-white">
                  {/* Card Section Header with User Icon */}
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#d97706]" />
                      <h3 className="font-bold text-sm sm:text-base text-[#24201d]">
                        Account Details
                      </h3>
                    </div>

                    {!isEditingAccount ? (
                      <button
                        type="button"
                        onClick={() => setIsEditingAccount(true)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#574f46] hover:text-[#b45309] transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#574f46]" />
                        <span>Edit Details</span>
                      </button>
                    ) : null}
                  </div>

                  {/* Clean Divider Line */}
                  <div className="border-t border-[#f0e7db] mb-5" />

                  {/* View Mode vs Edit Mode */}
                  {!isEditingAccount ? (
                    <div className="space-y-4 max-w-4xl">
                      {/* EMAIL ADDRESS */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#8c7e72] uppercase tracking-wider mb-1.5">
                          EMAIL ADDRESS
                        </label>
                        <div className="bg-[#faf5ee] border border-[#ede3d5] rounded-xl px-4 py-3.5 flex items-center gap-3 text-sm text-[#24201d] transition-all">
                          <Mail className="w-4 h-4 text-[#8c7e72] shrink-0" />
                          <span className="font-medium">{userEmail}</span>
                        </div>
                      </div>

                      {/* MOBILE NUMBER (SMS / WHATSAPP ALERTS) */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#8c7e72] uppercase tracking-wider mb-1.5">
                          MOBILE NUMBER (SMS / WHATSAPP ALERTS)
                        </label>
                        <div className="bg-[#faf5ee] border border-[#ede3d5] rounded-xl px-4 py-3.5 flex items-center gap-3 text-sm text-[#24201d] transition-all">
                          <Phone className="w-4 h-4 text-[#8c7e72] shrink-0" />
                          <span className="font-medium">{userPhone}</span>
                        </div>
                      </div>

                      {/* Bottom Right Edit Details Link (Image 1 Alignment) */}
                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setIsEditingAccount(true)}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#574f46] hover:text-[#b45309] transition-colors cursor-pointer group"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#574f46] group-hover:text-[#b45309] transition-colors" />
                          <span>Edit Details</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveAccountDetails} className="space-y-4 max-w-4xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-[#8c7e72] uppercase tracking-wider mb-1.5">
                            FULL NAME
                          </label>
                          <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full bg-white border border-[#b45309] rounded-xl px-4 py-3 text-sm text-[#24201d] focus:outline-none focus:ring-2 focus:ring-[#b45309]/20"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-[#8c7e72] uppercase tracking-wider mb-1.5">
                            DESIGNATION / ROLE
                          </label>
                          <input
                            type="text"
                            value={userRole}
                            onChange={(e) => setUserRole(e.target.value)}
                            className="w-full bg-white border border-[#e0d7cb] rounded-xl px-4 py-3 text-sm text-[#24201d] focus:outline-none focus:border-[#b45309]"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#8c7e72] uppercase tracking-wider mb-1.5">
                          EMAIL ADDRESS
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#8c7e72] absolute left-4 top-3.5" />
                          <input
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full bg-white border border-[#b45309] rounded-xl pl-11 pr-4 py-3 text-sm text-[#24201d] focus:outline-none focus:ring-2 focus:ring-[#b45309]/20 font-medium"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#8c7e72] uppercase tracking-wider mb-1.5">
                          MOBILE NUMBER (SMS / WHATSAPP ALERTS)
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-[#8c7e72] absolute left-4 top-3.5" />
                          <input
                            type="tel"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            className="w-full bg-white border border-[#b45309] rounded-xl pl-11 pr-4 py-3 text-sm text-[#24201d] focus:outline-none focus:ring-2 focus:ring-[#b45309]/20 font-medium"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => setIsEditingAccount(false)}
                          className="px-4 py-2 text-xs font-semibold text-[#574f46] bg-[#faf8f5] border border-[#e0d7cb] rounded-lg hover:bg-[#ede3d5] transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 text-xs font-semibold text-white bg-[#b45309] rounded-lg hover:bg-[#92400e] transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Save Details</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Language Settings Card (Image 3) */}
              <div className="bg-white border border-[#e8e1d7] rounded-2xl shadow-xs p-6 sm:p-7">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#f0e7db]">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center text-[#d97706] shrink-0 shadow-2xs">
                      <Languages className="w-5 h-5 text-[#d97706]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-[#24201d]">
                        Language Settings
                      </h3>
                      <p className="text-xs sm:text-sm text-[#7c7267] mt-0.5">
                        Choose your primary language for the portal, voice advice, and IoT alerts.
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="inline-block px-3 py-1 text-[11px] font-bold rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fde68a] shadow-2xs">
                      {selectedLanguage === "en" ? "English Active" : "Hindi Active"}
                    </span>
                  </div>
                </div>

                {/* Language Option Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {/* Option 1: Hindi */}
                  <div
                    onClick={() => {
                      setSelectedLanguage("hi");
                      setEditSuccessMsg("Language switched to Hindi!");
                      setTimeout(() => setEditSuccessMsg(""), 3000);
                      setLanguage("hi");
                    }}
                    className={`rounded-2xl p-5 flex flex-col justify-between transition-all cursor-pointer text-left relative ${selectedLanguage === "hi"
                      ? "border-2 border-[#d97706] bg-[#fffdf9] shadow-sm"
                      : "border border-[#e8e1d7] bg-[#faf8f5] hover:bg-white hover:border-[#b45309]/50 shadow-2xs"
                      }`}
                  >
                    {selectedLanguage === "hi" && (
                      <div className="w-5 h-5 rounded-full bg-[#d97706] flex items-center justify-center text-white absolute top-4 right-4 shadow-2xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#f3e8ff] text-[#6b21a8] border border-[#e9d5ff]">
                          IN
                        </span>
                        <span className="font-bold text-base text-[#24201d]">Hindi (हिन्दी)</span>
                      </div>
                      <p className="text-xs text-[#665e55] leading-relaxed">
                        Recommended for KVIC rural beekeepers. Complete Hindi audio &amp; AI advisory across the portal.
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#f0e7db] flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#b45309]">
                        KVIC Honey Mission (Recommended)
                      </span>
                      {selectedLanguage === "hi" && (
                        <span className="text-[#16a34a] font-bold text-[10px] bg-[#f0fdf4] border border-[#bbf7d0] px-2 py-0.5 rounded flex items-center gap-1">
                          ✓ Active Language
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Option 2: English (Active in Image 3) */}
                  <div
                    onClick={() => {
                      setSelectedLanguage("en");
                      setEditSuccessMsg("Language switched to English!");
                      setTimeout(() => setEditSuccessMsg(""), 3000);
                      setLanguage("en");
                    }}
                    className={`rounded-2xl p-5 flex flex-col justify-between transition-all cursor-pointer text-left relative ${selectedLanguage === "en"
                      ? "border-2 border-[#d97706] bg-[#fffdf9] shadow-sm"
                      : "border border-[#e8e1d7] bg-[#faf8f5] hover:bg-white hover:border-[#b45309]/50 shadow-2xs"
                      }`}
                  >
                    {selectedLanguage === "en" && (
                      <div className="w-5 h-5 rounded-full bg-[#d97706] flex items-center justify-center text-white absolute top-4 right-4 shadow-2xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <Globe className="w-4 h-4 text-[#0284c7]" />
                        <span className="font-bold text-base text-[#24201d]">English</span>
                      </div>
                      <p className="text-xs text-[#665e55] leading-relaxed">
                        Standard English interface for laboratories, processors and export tracking.
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#f0e7db] flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#574f46]">
                        Supply Chain &amp; Labs
                      </span>
                      {selectedLanguage === "en" && (
                        <span className="text-[#16a34a] font-bold text-[10px] bg-[#f0fdf4] border border-[#bbf7d0] px-2 py-0.5 rounded flex items-center gap-1">
                          ✓ Active Language
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Extended Multilingual Selector Card */}
                <div className="mt-4 p-4 rounded-2xl bg-[#faf8f5] border border-[#e8e1d7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-[#24201d] block">
                      More Regional &amp; Global Languages / अन्य भाषाएं
                    </span>
                    <span className="text-[11px] text-[#7c7267] block">
                      Instantly translate the portal into Punjabi, Bengali, Marathi, Tamil, Telugu, Spanish, French, German, and 100+ languages.
                    </span>
                  </div>
                  <div className="shrink-0">
                    <LanguageSelector variant="header" />
                  </div>
                </div>
              </div>

              {/* Voice Advisory Section */}
              <div className="max-w-2xl">
                {/* Voice Advisory Card */}
                <div className="bg-white border border-[#e8e1d7] rounded-2xl shadow-xs p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center text-[#d97706]">
                        <Volume2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#24201d]">Voice Advisory Engine</h4>
                        <p className="text-[11px] text-[#7c7267]">Audio speech alerts &amp; IoT swarm frequency notifications</p>
                      </div>
                    </div>
                    <p className="text-xs text-[#665e55] leading-relaxed mb-4">
                      AI synthesized verbal guidance for field inspections. Broadcasts spoken instructions in {selectedLanguage === "hi" ? "Hindi (हिंदी)" : "English"} during colony hive opening.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1.5 px-3 bg-[#faf8f5] rounded-lg border border-[#e8e1d7]">
                        <span className="text-[#7c7267]">Acoustic Swarm Siren</span>
                        <span className="font-semibold text-[#16a34a]">Enabled (228 Hz Threshold)</span>
                      </div>
                      <div className="flex justify-between py-1.5 px-3 bg-[#faf8f5] rounded-lg border border-[#e8e1d7]">
                        <span className="text-[#7c7267]">Playback Speed</span>
                        <span className="font-semibold text-[#24201d]">1.0x (Natural Cadence)</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#f0e7db] flex justify-between items-center">
                    <span className="text-[11px] text-[#7c7267]">Status: Active on Handset</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditSuccessMsg("Audio test: Playing sample advisory voice...");
                        setTimeout(() => setEditSuccessMsg(""), 3500);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-[#b45309] bg-[#fef3c7] border border-[#fde68a] rounded-lg hover:bg-[#fde68a] transition-all cursor-pointer"
                    >
                      Test Voice Alert
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Inspection modal removed */}
      {false && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 sm:p-6 w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#e8e1d7] mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#F2A007]" />
                <h3 className="font-bold text-base text-[#24201d]">Log Colony Inspection</h3>
              </div>
              <button
                onClick={() => {
                  setShowInspectionModal(false);
                  setInspectionSuccess(false);
                }}
                className="text-[#7c7267] hover:text-[#24201d] p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {inspectionSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-[#F2A007]/15 border border-[#F2A007]/30 text-[#16a34a] rounded-full mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-bold text-base text-[#24201d]">Inspection Log Saved!</h4>
                <p className="text-xs text-[#665e55]">
                  Telemetry correlations updated for {selectedHive}. Next recommended check: 7 days.
                </p>
                <button
                  onClick={() => {
                    setShowInspectionModal(false);
                    setInspectionSuccess(false);
                  }}
                  className="px-5 py-2 text-xs font-bold text-[#1C1A17] bg-[#F2A007] rounded-lg hover:bg-[#d98f06] shadow-xs cursor-pointer active:scale-95"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setInspectionSuccess(true);
                }}
                className="space-y-3.5 text-xs"
              >
                <div>
                  <label className="block font-bold text-[#574f46] mb-1">
                    Inspected Hive
                  </label>
                  <input
                    type="text"
                    disabled
                    value={selectedHive}
                    className="w-full px-3 py-2 border border-[#e0d7cb] rounded-lg bg-[#faf8f5] text-[#24201d] font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#574f46] mb-1">
                      Queen Seen?
                    </label>
                    <select className="w-full px-3 py-2 border border-[#e0d7cb] rounded-lg bg-white">
                      <option>Yes (Spotted active)</option>
                      <option>No (Fresh eggs present)</option>
                      <option>Queenless suspicion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#574f46] mb-1">
                      Brood Pattern
                    </label>
                    <select className="w-full px-3 py-2 border border-[#e0d7cb] rounded-lg bg-white">
                      <option>Solid & Concentric (A+)</option>
                      <option>Spotty / Scattered</option>
                      <option>Queen Cups / Swarm Cells</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#574f46] mb-1">
                    Colony Temperament
                  </label>
                  <select className="w-full px-3 py-2 border border-[#e0d7cb] rounded-lg bg-white">
                    <option>Calm / Gentle</option>
                    <option>Mildly Defensive</option>
                    <option>Aggressive / Robbing</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#574f46] mb-1">
                    Inspection Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Good honey stores, added queen excluder, acoustic hum normal."
                    defaultValue="Checked central brood frames. Queen active on frame 5. Strong pollen reserves. Acoustic telemetry verified normal."
                    className="w-full px-3 py-2 border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#F2A007]"
                  />
                </div>

                <div className="pt-3 border-t border-[#e8e1d7] flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowInspectionModal(false)}
                    className="px-4 py-2 font-semibold text-[#574f46] bg-[#faf8f5] border border-[#e0d7cb] rounded-lg hover:bg-[#ede3d5] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold text-[#1C1A17] bg-[#F2A007] rounded-lg hover:bg-[#d98f06] shadow-xs cursor-pointer active:scale-95"
                  >
                    Save Inspection Log
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FIXED MOBILE BOTTOM NAVIGATION BAR */}
      {/* 5 clean core tabs: Home, Hives, Harvest, Sensors, AI Advisory */}
      {/* ======================================================== */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-[#e8e1d7] py-2 px-1 flex items-center justify-around shadow-lg">
        {navItems
          .filter((item) => item.key !== "settings")
          .map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            const label =
              item.key === "home"
                ? "Home"
                : item.key === "hives"
                  ? "Hives"
                  : item.key === "harvest"
                    ? "Harvest"
                    : item.key === "sensors"
                      ? "Sensors"
                      : "AI Advisory";

            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer ${isActive ? "text-[#1c1917]" : "text-[#7c7267] hover:text-[#24201d]"
                  }`}
              >
                <Icon
                  className={`w-5 h-5 mb-1 transition-transform ${isActive ? "text-[#F2A007] stroke-[2.4] scale-110" : "text-[#7c7267] stroke-[1.8]"
                    }`}
                />
                <span
                  className={`text-[11px] leading-none ${isActive ? "font-bold text-[#1c1917]" : "font-medium text-[#7c7267]"
                    }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
      </nav>
    </div>
  );
}

