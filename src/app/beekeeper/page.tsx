"use client";

import Link from "next/link";
import { useState } from "react";
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
  Sun,
  Calendar,
  Layers,
  FileText,
  QrCode,
  Download,
  Send,
  HelpCircle,
  Play,
  Sliders,
  Check,
  ExternalLink,
} from "lucide-react";

type TabKey = "home" | "hives" | "harvest" | "sensors" | "advisor";

export default function BeekeeperPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [selectedHive, setSelectedHive] = useState("Hive #01 - Orchard Yard");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Time range filter for sensor data
  const [sensorTimeRange, setSensorTimeRange] = useState<"24h" | "7d" | "30d">("24h");

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
    <div className="min-h-screen flex flex-col md:flex-row bg-[#faf8f5] text-[#24201d]">
      {/* ======================================================== */}
      {/* DESKTOP FULL-HEIGHT SIDEBAR (Full height on laptop screens) */}
      {/* ======================================================== */}
      <aside className="hidden md:flex w-64 lg:w-72 shrink-0 bg-white border-r border-[#e8e1d7] h-screen sticky top-0 flex-col justify-between p-4 z-40 overflow-y-auto">
        <div>
          {/* Top Brand & Portal Info */}
          <div className="pb-5 border-b border-[#e8e1d7] mb-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f7efe4] border border-[#e8e1d7] rounded-lg flex items-center justify-center text-[#b45309] shrink-0 shadow-2xs">
                <Hexagon className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-[#24201d] block">
                  BEE-Safe
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

          {/* Quick Active Hive Selector inside Sidebar */}
          <div className="mb-5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#968a7d] mb-1.5 px-1">
              Active Hive
            </label>
            <select
              value={selectedHive}
              onChange={(e) => setSelectedHive(e.target.value)}
              className="w-full text-xs font-semibold bg-white border border-[#e0d7cb] text-[#24201d] rounded-lg p-2.5 focus:outline-none focus:border-[#b45309] shadow-2xs cursor-pointer"
            >
              <option value="Hive #01 - Orchard Yard">Hive #01 - Orchard Yard</option>
              <option value="Hive #02 - Meadow Yard">Hive #02 - Meadow Yard</option>
              <option value="Hive #03 - Valley Creek">Hive #03 - Valley Creek</option>
            </select>
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all text-left ${
                    isActive
                      ? "bg-[#f7efe4] text-[#1c1917] font-bold border border-[#e8ded0] shadow-2xs"
                      : "text-[#645d56] hover:bg-[#faf6f0] hover:text-[#24201d] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-[#b45309]" : "text-[#8b7f73]"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isActive
                        ? "bg-[#b45309] text-white"
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
          {/* Quick Inspection Action */}
          <button
            onClick={() => setShowInspectionModal(true)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-[#4b433b] bg-[#faf8f5] border border-[#e0d7cb] rounded-lg hover:bg-[#f5ede2] transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-[#b45309]" />
            <span>Log Inspection</span>
          </button>

          {/* User Profile Card */}
          <div className="p-3 bg-[#faf8f5] border border-[#e8e1d7] rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#f7efe4] border border-[#e2d8cb] flex items-center justify-center text-[#b45309] font-bold text-xs shrink-0">
                RK
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#24201d] truncate">
                  Ritesh Kumar
                </div>
                <div className="text-[10px] text-[#7c7267] font-medium truncate">
                  Master Apiarist
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="p-1.5 text-[#7c7267] hover:text-[#b45309] hover:bg-white rounded-md border border-transparent hover:border-[#e0d7cb] transition-all"
              title="Log Out to Home"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MAIN APP CONTAINER */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar for Desktop & Mobile */}
        <header className="sticky top-0 z-30 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e8e1d7] h-16 px-4 sm:px-8 flex items-center justify-between">
          {/* Left: Mobile Toggle + Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="p-2 text-[#4b433b] hover:bg-[#f5ede2] rounded-lg border border-[#e0d7cb] md:hidden"
              aria-label="Open sidebar drawer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Brand Link */}
            <Link href="/" className="flex items-center gap-2 md:hidden">
              <div className="w-8 h-8 bg-[#f7efe4] border border-[#e8e1d7] rounded-lg flex items-center justify-center text-[#b45309]">
                <Hexagon className="w-5 h-5" />
              </div>
              <span className="font-bold text-base text-[#24201d]">BEE-Safe</span>
            </Link>

            {/* Desktop Breadcrumbs & Context */}
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-[#7c7267]">
              <span>Apiary</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#24201d] font-bold capitalize">{activeTab}</span>
              <span className="text-[#cfc4b5]">•</span>
              <span className="bg-white border border-[#e0d7cb] px-2 py-0.5 rounded text-[11px] font-semibold text-[#4b433b]">
                {selectedHive}
              </span>
            </div>
          </div>

          {/* Right Header Status & Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Quick Status Badges */}
            <div className="hidden lg:flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-[#574f46] bg-white border border-[#e8e1d7] px-2.5 py-1 rounded-lg">
                <Sun className="w-3.5 h-3.5 text-[#d97706]" />
                <span>27°C Sunny</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#16a34a] bg-white border border-[#e8e1d7] px-2.5 py-1 rounded-lg font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Colony Healthy</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#574f46] bg-white border border-[#e8e1d7] px-2.5 py-1 rounded-lg">
                <BatteryCharging className="w-3.5 h-3.5 text-[#16a34a]" />
                <span>Solar 98%</span>
              </div>
            </div>

            {/* Quick Log Inspection Button */}
            <button
              onClick={() => setShowInspectionModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#b45309] rounded-lg hover:bg-[#92400e] transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Inspection</span>
              <span className="sm:hidden">Inspect</span>
            </button>

            {/* Header Logout Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#665e55] bg-white border border-[#e0d7cb] rounded-lg hover:bg-[#f5ede2] hover:text-[#b45309] hover:border-[#cfc4b5] transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </Link>
          </div>
        </header>

        {/* Mobile Horizontal Tabs Row (Quick thumb switching on mobile) */}
        <div className="md:hidden bg-white border-b border-[#e8e1d7] px-3 py-2 sticky top-16 z-20 overflow-x-auto flex gap-1.5 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-all ${
                  isActive
                    ? "bg-[#f7efe4] text-[#1c1917] border border-[#e8ded0]"
                    : "text-[#645d56] bg-white border border-transparent hover:bg-[#faf6f0]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#b45309]" : "text-[#8b7f73]"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Drawer (Collapsible sidebar on mobile devices) */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-black/40 backdrop-blur-xs flex">
            <div className="w-4/5 max-w-xs bg-white h-full p-4 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#e8e1d7] mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#f7efe4] rounded-lg flex items-center justify-center text-[#b45309]">
                      <Hexagon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-base text-[#24201d]">BEE-Safe Portal</span>
                  </div>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1.5 rounded-lg text-[#7c7267] hover:bg-[#faf6f0]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Hive Selector in Drawer */}
                <div className="mb-4">
                  <label className="block text-[11px] font-bold text-[#7c7267] uppercase mb-1">
                    Select Apiary Hive
                  </label>
                  <select
                    value={selectedHive}
                    onChange={(e) => setSelectedHive(e.target.value)}
                    className="w-full text-xs font-semibold bg-[#faf8f5] border border-[#e0d7cb] text-[#24201d] rounded-lg p-2.5 focus:outline-none focus:border-[#b45309]"
                  >
                    <option value="Hive #01 - Orchard Yard">Hive #01 - Orchard Yard</option>
                    <option value="Hive #02 - Meadow Yard">Hive #02 - Meadow Yard</option>
                    <option value="Hive #03 - Valley Creek">Hive #03 - Valley Creek</option>
                  </select>
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
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                          isActive
                            ? "bg-[#f7efe4] text-[#1c1917] border border-[#e8ded0]"
                            : "text-[#645d56] hover:bg-[#faf6f0]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? "text-[#b45309]" : "text-[#8b7f73]"}`} />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#cfc4b5]" />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Bottom Info */}
              <div className="pt-4 border-t border-[#e8e1d7] text-xs text-[#7c7267] space-y-2">
                <div className="flex justify-between">
                  <span>Apiarist:</span>
                  <span className="font-semibold text-[#24201d]">Ritesh Kumar</span>
                </div>
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
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {/* ======================================================== */}
          {/* TAB 1: HOME (OPERATIONAL COMMAND CENTER) */}
          {/* ======================================================== */}
          {activeTab === "home" && (
            <div className="space-y-6">
              {/* Colony Banner */}
              <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#b45309] bg-[#f7efe4] px-2 py-0.5 rounded">
                      Langstroth 10-Frame Deep
                    </span>
                    <span className="text-xs text-[#7c7267]">Last telemetry packet: 8s ago</span>
                  </div>
                  <h1 className="text-2xl font-bold text-[#24201d]">
                    Colony Health & Live Telemetry
                  </h1>
                  <p className="text-sm text-[#665e55] mt-1">
                    Monitoring <span className="font-semibold text-[#24201d]">{selectedHive}</span> — Queen Carniolan (Active brood rearing, no swarm signals).
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setActiveTab("sensors")}
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#4b433b] bg-[#faf8f5] border border-[#e0d7cb] rounded-lg hover:bg-[#f5ede2] transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#b45309]" />
                    Live Sensors
                  </button>
                  <button
                    onClick={() => setActiveTab("advisor")}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#b45309] rounded-lg hover:bg-[#92400e] transition-all shadow-xs"
                  >
                    <Brain className="w-3.5 h-3.5" />
                    AI Diagnostic
                  </button>
                </div>
              </div>

              {/* 4 Core Parameter Cards (Temp, Humidity, Hive Weight, Bee Acoustic Monitoring) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Temperature */}
                <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs hover:border-[#b45309]/50 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7c7267]">
                      Temperature
                    </span>
                    <div className="w-8 h-8 rounded-md bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309]">
                      <Thermometer className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-[#24201d]">
                    {telemetry.temp}
                  </div>
                  <div className="text-xs text-[#665e55] mt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] shrink-0" />
                    <span>{telemetry.tempStatus}</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#f4ede3] text-[11px] text-[#7c7267] flex justify-between">
                    <span>Ambient: {telemetry.tempAmbient}</span>
                    <span className="font-semibold text-[#16a34a]">Stable Δ8.4°C</span>
                  </div>
                </div>

                {/* 2. Humidity */}
                <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs hover:border-[#b45309]/50 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7c7267]">
                      Humidity
                    </span>
                    <div className="w-8 h-8 rounded-md bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309]">
                      <Droplets className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-[#24201d]">
                    {telemetry.humidity}
                  </div>
                  <div className="text-xs text-[#665e55] mt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] shrink-0" />
                    <span>{telemetry.humidityStatus}</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#f4ede3] text-[11px] text-[#7c7267] flex justify-between">
                    <span>Ambient: {telemetry.humidityAmbient}</span>
                    <span className="font-semibold text-[#16a34a]">Well Ventilated</span>
                  </div>
                </div>

                {/* 3. Hive Weight */}
                <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs hover:border-[#b45309]/50 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7c7267]">
                      Hive Weight
                    </span>
                    <div className="w-8 h-8 rounded-md bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309]">
                      <Scale className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-[#24201d]">
                    {telemetry.weight}
                  </div>
                  <div className="text-xs text-[#665e55] mt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b45309] shrink-0" />
                    <span>{telemetry.weightStatus}</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#f4ede3] text-[11px] text-[#7c7267] flex justify-between">
                    <span>Honey Super: ~14.8 kg</span>
                    <span className="font-semibold text-[#b45309]">Flow Active</span>
                  </div>
                </div>

                {/* 4. Bee Acoustic Monitoring */}
                <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs hover:border-[#b45309]/50 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7c7267]">
                      Acoustic Sound
                    </span>
                    <div className="w-8 h-8 rounded-md bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309]">
                      <Activity className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-[#24201d]">
                    {telemetry.acoustics}
                  </div>
                  <div className="text-xs text-[#665e55] mt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] shrink-0" />
                    <span>{telemetry.acousticsStatus}</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#f4ede3] text-[11px] text-[#7c7267] flex justify-between">
                    <span>Power: {telemetry.acousticDb}</span>
                    <span className="font-semibold text-[#16a34a]">Swarm Risk &lt;2%</span>
                  </div>
                </div>
              </div>

              {/* Realistic Operational Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Real-time Acoustic Spectrum Stream Card */}
                <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 lg:col-span-2 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#e8e1d7]">
                    <div>
                      <h3 className="font-bold text-base text-[#24201d] flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-[#b45309]" />
                        <span>Acoustic Frequency Spectrum & Colony Resonance</span>
                      </h3>
                      <p className="text-xs text-[#7c7267] mt-0.5">
                        High-precision MEMS microphone capturing in-hive vibration harmonics.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#16a34a] bg-[#f7efe4] px-2.5 py-1 rounded-md self-start sm:self-auto">
                      Normal Brood Hum (200-250 Hz)
                    </span>
                  </div>

                  {/* Simulated Acoustic Waveform / Bar Spectrum */}
                  <div className="p-4 bg-[#faf8f5] border border-[#e8e1d7] rounded-lg space-y-3">
                    <div className="flex justify-between items-end h-24 gap-1.5 px-2">
                      {[35, 42, 60, 85, 95, 78, 55, 40, 28, 22, 18, 15, 12, 14, 11].map((h, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className={`w-full rounded-xs transition-all ${
                              idx >= 3 && idx <= 5
                                ? "bg-[#b45309]"
                                : idx > 8
                                ? "bg-[#cfc4b5]"
                                : "bg-[#d97706]"
                            }`}
                            style={{ height: `${h}%` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-[#7c7267] font-semibold border-t border-[#e8ded0] pt-1">
                      <span>100 Hz</span>
                      <span className="text-[#b45309] font-bold">228 Hz (Peak)</span>
                      <span>350 Hz (Queen)</span>
                      <span>500 Hz (Swarm Band)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-2.5 bg-[#faf8f5] border border-[#e8e1d7] rounded-md">
                      <div className="text-[11px] text-[#7c7267]">Brood Vibration</div>
                      <div className="font-bold text-[#24201d]">228 Hz (Normal)</div>
                    </div>
                    <div className="p-2.5 bg-[#faf8f5] border border-[#e8e1d7] rounded-md">
                      <div className="text-[11px] text-[#7c7267]">Queen Piping Alert</div>
                      <div className="font-bold text-[#16a34a]">None Detected</div>
                    </div>
                    <div className="p-2.5 bg-[#faf8f5] border border-[#e8e1d7] rounded-md">
                      <div className="text-[11px] text-[#7c7267]">Swarming Prediction</div>
                      <div className="font-bold text-[#16a34a]">Low Probability (1.8%)</div>
                    </div>
                  </div>
                </div>

                {/* Colony Status & Queen Card */}
                <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs space-y-4">
                  <div className="pb-3 border-b border-[#e8e1d7]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#b45309] uppercase tracking-wider mb-1">
                      <Layers className="w-3.5 h-3.5" />
                      Colony Health Matrix
                    </div>
                    <h3 className="font-bold text-base text-[#24201d]">Queen & Brood Metrics</h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between pb-2 border-b border-[#f4ede3]">
                      <span className="text-[#665e55]">Queen Breed:</span>
                      <span className="font-bold text-[#24201d]">Carniolan (Apis m. carnica)</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#f4ede3]">
                      <span className="text-[#665e55]">Marking Color:</span>
                      <span className="font-bold text-[#b45309]">Blue (Year 2025)</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#f4ede3]">
                      <span className="text-[#665e55]">Laying Pattern:</span>
                      <span className="font-bold text-[#16a34a]">Dense & Concentric (Solid)</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#f4ede3]">
                      <span className="text-[#665e55]">Varroa Mite Status:</span>
                      <span className="font-bold text-[#16a34a]">Clean (&lt;1% per 100 bees)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#665e55]">Last Inspection:</span>
                      <span className="font-semibold text-[#24201d]">3 days ago (14 Oct)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#f7efe4] border border-[#e8ded0] rounded-lg text-xs text-[#574f46]">
                    <strong>Apiarist Tip:</strong> Acacia nectar flow is peaking in your district. Keep entrance reducers open for optimal forager bee traffic.
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
                      className="text-xs font-semibold text-[#b45309] hover:underline"
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
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#b45309] uppercase tracking-wider mb-2">
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
                        <span className="text-[10px] font-bold text-[#b45309] bg-[#f7efe4] px-2 py-0.5 rounded">Pending</span>
                      </div>
                      <div className="p-2.5 bg-[#faf8f5] border border-[#e8e1d7] rounded-md flex items-center justify-between">
                        <span className="font-medium text-[#24201d]">2. Verify digital refractometer calibration</span>
                        <span className="text-[10px] font-bold text-[#16a34a] bg-[#f7efe4] px-2 py-0.5 rounded">Ready</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("harvest")}
                    className="mt-4 w-full py-2.5 text-xs font-semibold text-white bg-[#b45309] rounded-lg hover:bg-[#92400e] transition-all flex items-center justify-center gap-2"
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
              <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                <div>
                  <h1 className="text-2xl font-bold text-[#24201d]">My Hives & Apiary Fleet</h1>
                  <p className="text-sm text-[#665e55] mt-1">
                    Manage your monitored hive hardware nodes, colony configurations, and queens.
                  </p>
                </div>
                <button
                  onClick={() => alert("New hive hardware node pairing workflow initialized. Ready to attach LoRa/WiFi sensor node.")}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#b45309] rounded-lg hover:bg-[#92400e] shadow-xs"
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
                    className="bg-white border border-[#e8e1d7] rounded-lg p-5 space-y-4 shadow-2xs hover:border-[#b45309]/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-[#e8e1d7]">
                        <div className="flex items-center gap-2">
                          <Hexagon className="w-5 h-5 text-[#b45309]" />
                          <h3 className="font-bold text-sm text-[#24201d]">{h.name}</h3>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#f7efe4] text-[#b45309]">
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
                          <span className="font-bold text-[#b45309]">{h.weight} ({h.weightTrend})</span>
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
                          <Wifi className="w-3 h-3 text-[#b45309]" />
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
                        className="flex-1 py-2 text-xs font-semibold text-[#4b433b] bg-[#faf8f5] border border-[#e0d7cb] rounded-lg hover:bg-[#f5ede2]"
                      >
                        Telemetry
                      </button>
                      <button
                        onClick={() => {
                          setSelectedHive(h.name);
                          setActiveTab("home");
                        }}
                        className="flex-1 py-2 text-xs font-semibold text-white bg-[#b45309] rounded-lg hover:bg-[#92400e]"
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
              <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 sm:p-6 shadow-2xs">
                <h1 className="text-2xl font-bold text-[#24201d]">Honey Harvest & Extraction Workflow</h1>
                <p className="text-sm text-[#665e55] mt-1">
                  Log honey harvest batches, record refractometer moisture grades, and generate certified consumer traceability tags.
                </p>
              </div>

              {/* Pre-Harvest Telemetry Check Banner */}
              <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs">
                <h3 className="font-bold text-base text-[#24201d] mb-3 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-[#b45309]" />
                  <span>Harvest Readiness Diagnosis ({selectedHive})</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-[#faf8f5] border border-[#e8e1d7] rounded-lg">
                    <div className="text-[#7c7267]">Load Cell Honey Surplus</div>
                    <div className="text-xl font-extrabold text-[#b45309] mt-1">+18.5 kg</div>
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
                        className="w-full px-3 py-2 text-sm border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#b45309] bg-white cursor-pointer"
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
                        className="w-full px-3 py-2 text-sm border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#b45309]"
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
                        className="w-full px-3 py-2 text-sm border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#b45309]"
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
                        className="w-full px-3 py-2 text-sm border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#b45309]"
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
                      className="px-4 py-2 text-xs font-semibold text-[#574f46] bg-[#faf8f5] border border-[#e0d7cb] rounded-lg hover:bg-[#ede3d5]"
                    >
                      Reset Form
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-[#b45309] rounded-lg hover:bg-[#92400e] shadow-xs"
                    >
                      Generate Batch Certificate
                    </button>
                  </div>
                </form>
              </div>

              {/* Generated Batch Traceability Card */}
              {createdBatch && (
                <div className="bg-white border-2 border-[#b45309] rounded-lg p-5 sm:p-6 shadow-md space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#e8e1d7] gap-2">
                    <div>
                      <div className="text-[11px] font-bold text-[#b45309] uppercase tracking-wider">
                        Traceable Apiary Certification
                      </div>
                      <h3 className="font-extrabold text-lg text-[#24201d]">
                        Batch #{createdBatch.id}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-[#16a34a] bg-[#f7efe4] px-3 py-1 rounded-md">
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
                      <strong className="text-[#b45309]">{createdBatch.weight} kg</strong>
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
                      <QrCode className="w-5 h-5 text-[#b45309]" />
                      <span>Consumer Traceability QR Code Ready for Packaging</span>
                    </div>
                    <button
                      onClick={() => alert(`Batch ${createdBatch.id} metadata exported to CSV/Label printer.`)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#f7efe4] text-[#b45309] font-bold rounded-lg hover:bg-[#ede3d5]"
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
              <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
                <div>
                  <h1 className="text-2xl font-bold text-[#24201d]">
                    Multi-Channel Sensor Telemetry
                  </h1>
                  <p className="text-sm text-[#665e55] mt-1">
                    Continuous streaming data: Temperature probes, SHT40 Humidity, Strain-Gauge Load Cells, and MEMS Acoustic Spectrum.
                  </p>
                </div>

                {/* Time Range Selector */}
                <div className="flex items-center gap-1.5 bg-[#faf8f5] border border-[#e0d7cb] p-1 rounded-lg">
                  {(["24h", "7d", "30d"] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setSensorTimeRange(range)}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                        sensorTimeRange === range
                          ? "bg-[#b45309] text-white"
                          : "text-[#665e55] hover:bg-[#ede3d5]"
                      }`}
                    >
                      {range.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Sensor Channels Comprehensive Deep Dive */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Temperature Telemetry */}
                <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-md bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309]">
                        <Thermometer className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#24201d]">
                          Brood & Ambient Temperature (DS18B20)
                        </h3>
                        <span className="text-[11px] text-[#7c7267]">Center comb probe #1</span>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-[#16a34a] bg-[#f7efe4] px-2.5 py-1 rounded-md">
                      34.8 °C
                    </span>
                  </div>

                  {/* Temperature Curve Chart Mock */}
                  <div className="bg-[#faf8f5] border border-[#e8e1d7] rounded-md p-3 space-y-3">
                    <div className="flex justify-between text-xs text-[#7c7267]">
                      <span>Brood Core: 34.8°C</span>
                      <span>Outer Frame: 29.2°C</span>
                      <span>Outside Air: 26.4°C</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-[#574f46]">
                        <span>Brood Thermoregulation Target (33°C – 36°C)</span>
                        <span className="font-bold text-[#16a34a]">98.2% Optimal</span>
                      </div>
                      <div className="w-full bg-[#e8e1d7] h-3 rounded-xs overflow-hidden">
                        <div className="bg-[#b45309] h-full" style={{ width: "96%" }} />
                      </div>
                    </div>

                    <p className="text-[11px] text-[#665e55]">
                      Thermocouple indicates consistent metabolic cluster warmth. No chilling or overheating events detected.
                    </p>
                  </div>
                </div>

                {/* 2. Humidity Telemetry */}
                <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-md bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309]">
                        <Droplets className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#24201d]">
                          In-Hive Relative Humidity (SHT40)
                        </h3>
                        <span className="text-[11px] text-[#7c7267]">Sintered PTFE breathing cap</span>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-[#16a34a] bg-[#f7efe4] px-2.5 py-1 rounded-md">
                      58.4 %
                    </span>
                  </div>

                  <div className="bg-[#faf8f5] border border-[#e8e1d7] rounded-md p-3 space-y-3">
                    <div className="flex justify-between text-xs text-[#7c7267]">
                      <span>Internal RH: 58.4%</span>
                      <span>Ambient RH: 64.2%</span>
                      <span>Dew Point: 18.2°C</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-[#574f46]">
                        <span>Chalkbrood/Fungal Mold Prevention Margin</span>
                        <span className="font-bold text-[#16a34a]">Safe</span>
                      </div>
                      <div className="w-full bg-[#e8e1d7] h-3 rounded-xs overflow-hidden">
                        <div className="bg-[#b45309] h-full" style={{ width: "70%" }} />
                      </div>
                    </div>

                    <p className="text-[11px] text-[#665e55]">
                      Worker fanning ventilation is maintaining ideal humidity for larval development and honey curing.
                    </p>
                  </div>
                </div>

                {/* 3. Hive Weight Telemetry */}
                <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-md bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309]">
                        <Scale className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#24201d]">
                          Load Cell Hive Scale (4x Strain Gauge)
                        </h3>
                        <span className="text-[11px] text-[#7c7267]">Temperature-compensated base</span>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-[#b45309] bg-[#f7efe4] px-2.5 py-1 rounded-md">
                      42.6 kg
                    </span>
                  </div>

                  <div className="bg-[#faf8f5] border border-[#e8e1d7] rounded-md p-3 space-y-3">
                    <div className="flex justify-between text-xs text-[#7c7267]">
                      <span>Starting Weight: 41.3 kg</span>
                      <span>Daytime Influx: +1.6 kg</span>
                      <span>Night Curing Evap: -0.3 kg</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-[#574f46]">
                        <span>Honey Super Capacity (Target 55 kg)</span>
                        <span className="font-bold text-[#b45309]">77% Full</span>
                      </div>
                      <div className="w-full bg-[#e8e1d7] h-3 rounded-xs overflow-hidden">
                        <div className="bg-[#b45309] h-full" style={{ width: "77%" }} />
                      </div>
                    </div>

                    <p className="text-[11px] text-[#665e55]">
                      Net gain of +1.3 kg / 24h reflects abundant acacia blossom nectar intake.
                    </p>
                  </div>
                </div>

                {/* 4. Bee Acoustic Sound Monitoring */}
                <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-md bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309]">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#24201d]">
                          Bee Acoustic Sound FFT Analyzer
                        </h3>
                        <span className="text-[11px] text-[#7c7267]">I2S In-Hive MEMS Microphone</span>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-[#16a34a] bg-[#f7efe4] px-2.5 py-1 rounded-md">
                      228 Hz Normal
                    </span>
                  </div>

                  <div className="bg-[#faf8f5] border border-[#e8e1d7] rounded-md p-3 space-y-3">
                    <div className="flex justify-between text-xs text-[#7c7267]">
                      <span>Peak Vibration: 228 Hz</span>
                      <span>Volume: 41.2 dB</span>
                      <span>Swarm Band: 0.8%</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-[#574f46]">
                        <span>Harmonic Profile</span>
                        <span className="font-bold text-[#16a34a]">Calm Colony Worker Buzz</span>
                      </div>
                      <div className="w-full bg-[#e8e1d7] h-3 rounded-xs overflow-hidden flex">
                        <div className="bg-[#b45309] h-full" style={{ width: "40%" }} title="Worker Hum (150-250Hz)" />
                        <div className="bg-[#d97706] h-full" style={{ width: "10%" }} title="Queen Tone (300-400Hz)" />
                        <div className="bg-[#e8ded0] h-full flex-1" title="High Freq Roar (450-600Hz)" />
                      </div>
                    </div>

                    <p className="text-[11px] text-[#665e55]">
                      No pre-swarming frequency spikes or queen piping vibrations detected. Colony is content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: AI ADVISOR (APICULTURE INTELLIGENCE) */}
          {/* ======================================================== */}
          {activeTab === "advisor" && (
            <div className="space-y-6">
              <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#b45309] uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4" />
                  Real-time Multi-Vector AI Diagnostic Engine
                </div>
                <h1 className="text-2xl font-bold text-[#24201d]">AI Hive Advisor</h1>
                <p className="text-sm text-[#665e55] mt-1">
                  Automated correlation of acoustic frequency, hive weight dynamics, brood temperature, and local forage phenology.
                </p>
              </div>

              {/* Automated Diagnostic Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309]">
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
                    <div className="w-8 h-8 rounded-md bg-[#f7efe4] border border-[#e8ded0] flex items-center justify-center text-[#b45309]">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#24201d]">
                        Honey Super & Nectar Flow Timing
                      </h3>
                      <span className="text-[11px] text-[#b45309] font-semibold">Action in 2 Days</span>
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
                        className={`max-w-[85%] sm:max-w-[75%] rounded-lg p-3 text-xs leading-relaxed shadow-2xs ${
                          msg.sender === "user"
                            ? "bg-[#b45309] text-white"
                            : "bg-white border border-[#e8e1d7] text-[#24201d]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4 mb-1">
                          <span className={`font-bold text-[10px] uppercase ${msg.sender === "user" ? "text-white/80" : "text-[#b45309]"}`}>
                            {msg.sender === "user" ? "Ritesh Kumar" : "BEE-Safe AI"}
                          </span>
                          <span className={`text-[10px] ${msg.sender === "user" ? "text-white/70" : "text-[#7c7267]"}`}>
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
                      className="px-2.5 py-1 bg-white border border-[#e0d7cb] rounded-md text-[#574f46] hover:bg-[#f5ede2] hover:text-[#b45309] shrink-0 transition-all"
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
                    className="flex-1 px-3 py-2 text-xs border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#b45309]"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#b45309] rounded-lg hover:bg-[#92400e] transition-all shadow-xs"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ======================================================== */}
      {/* QUICK LOG INSPECTION MODAL */}
      {/* ======================================================== */}
      {showInspectionModal && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#e8e1d7] rounded-lg p-5 sm:p-6 w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#e8e1d7] mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#b45309]" />
                <h3 className="font-bold text-base text-[#24201d]">Log Colony Inspection</h3>
              </div>
              <button
                onClick={() => {
                  setShowInspectionModal(false);
                  setInspectionSuccess(false);
                }}
                className="text-[#7c7267] hover:text-[#24201d] p-1"
              >
                ✕
              </button>
            </div>

            {inspectionSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-[#f7efe4] border border-[#e8ded0] text-[#16a34a] rounded-full mx-auto flex items-center justify-center">
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
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#b45309] rounded-lg hover:bg-[#92400e]"
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
                    className="w-full px-3 py-2 border border-[#e0d7cb] rounded-lg focus:outline-none focus:border-[#b45309]"
                  />
                </div>

                <div className="pt-3 border-t border-[#e8e1d7] flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowInspectionModal(false)}
                    className="px-4 py-2 font-semibold text-[#574f46] bg-[#faf8f5] border border-[#e0d7cb] rounded-lg hover:bg-[#ede3d5]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-semibold text-white bg-[#b45309] rounded-lg hover:bg-[#92400e]"
                  >
                    Save Inspection Log
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
