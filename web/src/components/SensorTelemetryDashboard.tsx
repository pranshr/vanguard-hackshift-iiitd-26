"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Thermometer,
  Droplets,
  Scale,
  Wifi,
  WifiOff,
  Radio,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

// =========================================================================
// 🔌 IOT TELEMETRY INTERFACE
// Connect your ESP32 / Arduino / MQTT / WebSocket data to this interface:
// =========================================================================
export interface TelemetryPoint {
  dateLabel: string; // e.g. "17 Oct 2026"
  timestamp: string; // e.g. "11:13:42"
  xLabel: string; // e.g. "11:13"
  rawTime: number; // Unix timestamp ms
  temperature: number; // in °C (e.g. 29.2)
  humidity: number; // in % (e.g. 58.0)
  weight: number; // in kg (e.g. 37.29)
}

type TimeHorizon = "Today" | "7 Days" | "30 Days";
type ActiveMetric = "temp" | "humidity" | "weight" | "all";

// Generate realistic data resembling real hive telemetry with discrete interval points
function generateHistoryData(horizon: TimeHorizon): TelemetryPoint[] {
  const points: TelemetryPoint[] = [];
  const baseTime = new Date(2026, 9, 17, 0, 7, 0).getTime(); // Oct 17, 2026

  let count = 48; // Discrete interval points
  let stepMs = ((17 * 3600 + 15 * 60) * 1000) / count; // 00:07 to 17:22

  if (horizon === "7 Days") {
    count = 56;
    stepMs = (7 * 24 * 3600 * 1000) / count;
  } else if (horizon === "30 Days") {
    count = 60;
    stepMs = (30 * 24 * 3600 * 1000) / count;
  }

  // Realistic curve starting ~34.4°C at night, cooling slightly to ~29.2°C at midday/afternoon, settling ~29.8°C
  for (let i = 0; i <= count; i++) {
    const timeMs = baseTime + i * stepMs;
    const d = new Date(timeMs);
    const progress = i / count;

    // Smooth temperature trajectory matching the user's reference graph
    const tempDip = Math.sin(progress * Math.PI) * 5.2;
    const tempNoise = Math.sin(i * 1.3) * 0.25 + (i % 3 === 0 ? 0.15 : -0.15) * 0.3;
    const temp = Number((34.5 - tempDip + tempNoise).toFixed(1));

    // Humidity fluctuates inversely with daytime temperature
    const humWave = Math.sin(progress * Math.PI) * 8.5;
    const hum = Number((54.0 + humWave + ((i % 4) * 0.4 - 0.6)).toFixed(1));

    // Hive weight: steady baseline around 37kg with daylight nectar influx
    const weightGain = progress * 1.6;
    const weight = Number((36.5 + weightGain + Math.sin(i * 0.8) * 0.12).toFixed(2));

    const dateStr = d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const timeStr = d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const xLabelStr = d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    points.push({
      dateLabel: dateStr,
      timestamp: timeStr,
      xLabel: xLabelStr,
      rawTime: timeMs,
      temperature: temp,
      humidity: hum,
      weight: weight,
    });
  }

  return points;
}

// Cubic Bézier smoothing function
function createSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i !== points.length - 2 ? points[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return d;
}

export default function SensorTelemetryDashboard({
  initialHiveId = "Hive #01 - Orchard Yard",
}: {
  initialHiveId?: string;
}) {
  const [horizon, setHorizon] = useState<TimeHorizon>("Today");
  // Default to "all" as requested
  const [activeMetric, setActiveMetric] = useState<ActiveMetric>("all");
  const [isLiveStream, setIsLiveStream] = useState(true);
  const [data, setData] = useState<TelemetryPoint[]>(() => generateHistoryData("Today"));
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showIotModal, setShowIotModal] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Re-generate dataset when horizon changes
  const handleHorizonChange = (newHorizon: TimeHorizon) => {
    setHorizon(newHorizon);
    setData(generateHistoryData(newHorizon));
    if (newHorizon !== "Today") {
      setIsLiveStream(false);
    } else {
      setIsLiveStream(true);
    }
  };

  // -------------------------------------------------------------
  // Real-time IoT Packet Simulation
  // (Connect WebSocket / MQTT / REST here)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!isLiveStream || horizon !== "Today") return;

    const interval = setInterval(() => {
      const now = new Date();
      setData((prev) => {
        if (prev.length === 0) return prev;
        const last = prev[prev.length - 1];

        // Micro variations
        const dTemp = (Math.random() - 0.5) * 0.18;
        const dHum = (Math.random() - 0.5) * 0.35;
        const dWeight = (Math.random() - 0.4) * 0.03;

        const newPoint: TelemetryPoint = {
          dateLabel: now.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          timestamp: now.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          xLabel: now.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          rawTime: now.getTime(),
          temperature: Number((last.temperature + dTemp).toFixed(1)),
          humidity: Number(Math.max(40, Math.min(80, last.humidity + dHum)).toFixed(1)),
          weight: Number((last.weight + dWeight).toFixed(2)),
        };

        return [...prev.slice(1), newPoint];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveStream, horizon]);

  // Set default hover indicator around index 30 (around 12:20 as shown in reference)
  useEffect(() => {
    if (data.length > 30) {
      setHoverIndex(30);
    }
  }, []);

  // SVG dimensions (responsive aspect ratio 980 x 440)
  const svgWidth = 980;
  const svgHeight = 440;
  const padLeft = 55;
  const padRight = 25;
  const padTop = 30;
  const padBottom = 48;

  const plotWidth = svgWidth - padLeft - padRight;
  const plotHeight = svgHeight - padTop - padBottom;

  // Define Y-axis bounds based on active metric
  const yConfig = useMemo(() => {
    if (activeMetric === "temp") {
      return {
        min: 20,
        max: 40,
        unit: "°C",
        ticks: [20, 25, 30, 35, 40],
        color: "#c2410c",
        fillGradient: "url(#tempAreaGrad)",
        dotFill: "#ea580c",
      };
    } else if (activeMetric === "humidity") {
      return {
        min: 30,
        max: 80,
        unit: "%",
        ticks: [30, 40, 50, 60, 70, 80],
        color: "#0284c7",
        fillGradient: "url(#humAreaGrad)",
        dotFill: "#0284c7",
      };
    } else if (activeMetric === "weight") {
      return {
        min: 30,
        max: 45,
        unit: "kg",
        ticks: [30, 33, 36, 39, 42, 45],
        color: "#b45309",
        fillGradient: "url(#weightAreaGrad)",
        dotFill: "#b45309",
      };
    } else {
      // In "all" mode, show the temperature scale (20°C - 40°C) as the primary base
      return {
        min: 20,
        max: 40,
        unit: "°C",
        ticks: [20, 25, 30, 35, 40],
        color: "#c2410c",
        fillGradient: "url(#tempAreaGrad)",
        dotFill: "#ea580c",
      };
    }
  }, [activeMetric]);

  // Scaled Coordinates Calculation
  const getScaledY = (value: number, min: number, max: number) => {
    const clamped = Math.max(min, Math.min(max, value));
    return padTop + plotHeight - ((clamped - min) / (max - min)) * plotHeight;
  };

  // Build point positions for SVG
  const pointsTemp = useMemo(() => {
    return data.map((d, i) => {
      const x = padLeft + (i / (data.length - 1)) * plotWidth;
      const y = getScaledY(d.temperature, 20, 40);
      return { x, y, point: d };
    });
  }, [data, plotWidth]);

  const pointsHumidity = useMemo(() => {
    return data.map((d, i) => {
      const x = padLeft + (i / (data.length - 1)) * plotWidth;
      const y = getScaledY(d.humidity, 30, 80);
      return { x, y, point: d };
    });
  }, [data, plotWidth]);

  const pointsWeight = useMemo(() => {
    return data.map((d, i) => {
      const x = padLeft + (i / (data.length - 1)) * plotWidth;
      const y = getScaledY(d.weight, 30, 45);
      return { x, y, point: d };
    });
  }, [data, plotWidth]);

  // Active points based on selected pill
  const activePoints = useMemo(() => {
    if (activeMetric === "humidity") return pointsHumidity;
    if (activeMetric === "weight") return pointsWeight;
    return pointsTemp;
  }, [activeMetric, pointsTemp, pointsHumidity, pointsWeight]);

  // Curves & Area Paths
  const linePath = useMemo(() => createSmoothPath(activePoints), [activePoints]);
  const areaPath = useMemo(() => {
    if (activePoints.length === 0) return "";
    const first = activePoints[0];
    const last = activePoints[activePoints.length - 1];
    const bottomY = padTop + plotHeight;
    return `${linePath} L ${last.x.toFixed(1)} ${bottomY} L ${first.x.toFixed(1)} ${bottomY} Z`;
  }, [linePath, activePoints, padTop, plotHeight]);

  // Unified Mouse & Touch coordinate finder
  const updateHoverFromClientX = (clientX: number) => {
    if (!svgRef.current || data.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const relativeX = (mouseX / rect.width) * svgWidth;

    let closestIdx = 0;
    let minDist = Infinity;

    activePoints.forEach((p, idx) => {
      const dist = Math.abs(p.x - relativeX);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = idx;
      }
    });

    setHoverIndex(closestIdx);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    updateHoverFromClientX(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length > 0) {
      updateHoverFromClientX(e.touches[0].clientX);
    }
  };

  // Hovered data point & position
  const currentHoverPoint = hoverIndex !== null && data[hoverIndex] ? data[hoverIndex] : null;
  const currentHoverPos = hoverIndex !== null && activePoints[hoverIndex] ? activePoints[hoverIndex] : null;

  // Responsive X-axis intervals
  const allXIndices = useMemo(() => {
    const total = data.length;
    const labelsCount = 15;
    const indices: number[] = [];
    for (let i = 0; i < labelsCount; i++) {
      const idx = Math.min(total - 1, Math.round((i / (labelsCount - 1)) * (total - 1)));
      if (!indices.includes(idx)) indices.push(idx);
    }
    return indices;
  }, [data.length]);

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* ======================================================== */}
      {/* MAIN CARD: SENSOR HISTORY                                */}
      {/* ======================================================== */}
      <div
        ref={containerRef}
        className="bg-white border border-[#e8e1d7] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-7 shadow-xs w-full"
      >
        {/* Top Header: Fully responsive flex layout, fits all buttons cleanly without sliding */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-[#f3ede4]">
          {/* Left: Title & Subtitle (Discrete Interval Points removed as requested) */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1e1b18] tracking-tight">
              Sensor History
            </h2>
            <p className="text-xs sm:text-sm text-[#7c7267] mt-0.5 sm:mt-1 font-medium flex items-center gap-2">
              <span>Telemetry generated by calibrated 24/7 Digital Twin</span>
              {isLiveStream && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live IoT
                </span>
              )}
            </p>
          </div>

          {/* Right Controls: Horizon Pills & Metric Filter Pills (Full-width responsive on mobile, inline on desktop) */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5">
            {/* 1. Time Horizon Switcher Pills */}
            <div className="w-full sm:w-auto flex items-center justify-between bg-[#f2ede6] p-1 rounded-full border border-[#e4dcce]">
              {(["Today", "7 Days", "30 Days"] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => handleHorizonChange(h)}
                  className={`flex-1 sm:flex-none text-center px-3 sm:px-3.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    horizon === h
                      ? "bg-white text-[#24201d] shadow-xs"
                      : "text-[#7c7267] hover:text-[#24201d]"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>

            {/* 2. Metric Pills (All, Temp, Humidity, Weight) */}
            <div className="w-full sm:w-auto grid grid-cols-4 sm:flex items-center gap-1 sm:gap-1.5">
              {/* All Pill */}
              <button
                onClick={() => setActiveMetric("all")}
                className={`flex items-center justify-center gap-1 px-2 sm:px-3 py-1 text-xs font-bold rounded-full border transition-all cursor-pointer whitespace-nowrap text-center ${
                  activeMetric === "all"
                    ? "bg-white border-[#24201d] text-[#24201d] shadow-xs ring-1 ring-[#24201d]"
                    : "bg-[#faf8f5] border-[#e2d8cb] text-[#665e55] hover:bg-white"
                }`}
                title="View All 3 curves on one canvas"
              >
                <span>All</span>
              </button>

              {/* Temp Pill */}
              <button
                onClick={() => setActiveMetric("temp")}
                className={`flex items-center justify-center gap-1 px-1.5 sm:px-3 py-1 text-xs font-bold rounded-full border transition-all cursor-pointer whitespace-nowrap text-center ${
                  activeMetric === "temp"
                    ? "bg-white border-[#24201d] text-[#24201d] shadow-xs ring-1 ring-[#24201d]"
                    : "bg-[#faf8f5] border-[#e2d8cb] text-[#665e55] hover:bg-white"
                }`}
              >
                <Thermometer className="w-3.5 h-3.5 text-[#d946ef] stroke-[2.2] shrink-0" />
                <span>Temp</span>
              </button>

              {/* Humidity Pill */}
              <button
                onClick={() => setActiveMetric("humidity")}
                className={`flex items-center justify-center gap-1 px-1.5 sm:px-3 py-1 text-xs font-bold rounded-full border transition-all cursor-pointer whitespace-nowrap text-center ${
                  activeMetric === "humidity"
                    ? "bg-white border-[#24201d] text-[#24201d] shadow-xs ring-1 ring-[#24201d]"
                    : "bg-[#faf8f5] border-[#e2d8cb] text-[#665e55] hover:bg-white"
                }`}
              >
                <Droplets className="w-3.5 h-3.5 text-[#0284c7] stroke-[2.2] shrink-0" />
                <span>
                  <span className="inline sm:hidden">Hum</span>
                  <span className="hidden sm:inline">Humidity</span>
                </span>
              </button>

              {/* Weight Pill */}
              <button
                onClick={() => setActiveMetric("weight")}
                className={`flex items-center justify-center gap-1 px-1.5 sm:px-3 py-1 text-xs font-bold rounded-full border transition-all cursor-pointer whitespace-nowrap text-center ${
                  activeMetric === "weight"
                    ? "bg-white border-[#24201d] text-[#24201d] shadow-xs ring-1 ring-[#24201d]"
                    : "bg-[#faf8f5] border-[#e2d8cb] text-[#665e55] hover:bg-white"
                }`}
              >
                <Scale className="w-3.5 h-3.5 text-[#f59e0b] stroke-[2.2] shrink-0" />
                <span>Weight</span>
              </button>
            </div>
          </div>
        </div>


        {/* ======================================================== */}
        {/* GRAPH CANVAS & FLOATING POP CARD                         */}
        {/* ======================================================== */}
        <div className="relative w-full pt-2 sm:pt-4 select-none touch-none">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto overflow-visible cursor-crosshair block"
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchMove}
            onTouchMove={handleTouchMove}
          >
            <defs>
              {/* Temperature Area Gradient */}
              <linearGradient id="tempAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#ffedd5" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
              </linearGradient>

              {/* Humidity Area Gradient */}
              <linearGradient id="humAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#e0f2fe" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
              </linearGradient>

              {/* Weight Area Gradient */}
              <linearGradient id="weightAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fde68a" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#fef3c7" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Subtle Horizontal Gridlines & Y-Axis Labels */}
            {yConfig.ticks.map((val, idx) => {
              const y =
                padTop +
                plotHeight -
                ((val - yConfig.min) / (yConfig.max - yConfig.min)) * plotHeight;
              return (
                <g key={`y-${idx}`}>
                  <line
                    x1={padLeft}
                    y1={y}
                    x2={padLeft + plotWidth}
                    y2={y}
                    stroke="#e8edf2"
                    strokeWidth="1"
                  />
                  <text
                    x={padLeft - 8}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="11"
                    fill="#94a3b8"
                    fontWeight="500"
                  >
                    {val}
                    {yConfig.unit}
                  </text>
                </g>
              );
            })}

            {/* Vertical Gridlines & X-Axis Time Labels */}
            {allXIndices.map((ptIdx, loopIdx) => {
              const p = activePoints[ptIdx];
              if (!p) return null;
              const isEvenLabel = loopIdx % 2 === 0;

              return (
                <g key={`x-${ptIdx}`}>
                  <line
                    x1={p.x}
                    y1={padTop}
                    x2={p.x}
                    y2={padTop + plotHeight}
                    stroke="#edf2f7"
                    strokeWidth="1"
                  />
                  <text
                    x={p.x}
                    y={padTop + plotHeight + 18}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#94a3b8"
                    fontWeight="500"
                    className={isEvenLabel ? "" : "opacity-40 sm:opacity-100"}
                  >
                    {p.point.xLabel}
                  </text>
                </g>
              );
            })}

            {/* Outer Box Borders */}
            <line
              x1={padLeft}
              y1={padTop}
              x2={padLeft + plotWidth}
              y2={padTop}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
            <line
              x1={padLeft}
              y1={padTop + plotHeight}
              x2={padLeft + plotWidth}
              y2={padTop + plotHeight}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
            <line
              x1={padLeft}
              y1={padTop}
              x2={padLeft}
              y2={padTop + plotHeight}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
            <line
              x1={padLeft + plotWidth}
              y1={padTop}
              x2={padLeft + plotWidth}
              y2={padTop + plotHeight}
              stroke="#e2e8f0"
              strokeWidth="1"
            />

            {/* Area Fill Under Curve (solo modes) */}
            {activeMetric !== "all" && (
              <path d={areaPath} fill={yConfig.fillGradient} />
            )}

            {/* Multi-series curves if "All" is selected */}
            {activeMetric === "all" ? (
              <>
                {/* 1. Temperature Curve */}
                <path
                  d={createSmoothPath(pointsTemp)}
                  fill="none"
                  stroke="#c2410c"
                  strokeWidth="2.4"
                />
                {/* 2. Humidity Curve */}
                <path
                  d={createSmoothPath(pointsHumidity)}
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.2"
                />
                {/* 3. Weight Curve */}
                <path
                  d={createSmoothPath(pointsWeight)}
                  fill="none"
                  stroke="#b45309"
                  strokeWidth="2.2"
                />
              </>
            ) : (
              /* Primary single metric curve */
              <path
                d={linePath}
                fill="none"
                stroke={yConfig.color}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Discrete interval points dots */}
            {activePoints.map((p, idx) => (
              <circle
                key={`dot-${idx}`}
                cx={p.x}
                cy={p.y}
                r="2.2"
                fill={yConfig.dotFill}
                opacity="0.95"
              />
            ))}

            {/* Vertical cursor indicator line */}
            {currentHoverPos && (
              <g>
                <line
                  x1={currentHoverPos.x}
                  y1={padTop}
                  x2={currentHoverPos.x}
                  y2={padTop + plotHeight}
                  stroke="#64748b"
                  strokeWidth="1.2"
                  opacity="0.8"
                />
                {activeMetric === "all" ? (
                  <>
                    <circle
                      cx={pointsTemp[hoverIndex ?? 30]?.x ?? currentHoverPos.x}
                      cy={pointsTemp[hoverIndex ?? 30]?.y ?? currentHoverPos.y}
                      r="4.5"
                      fill="#ffffff"
                      stroke="#c2410c"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx={pointsHumidity[hoverIndex ?? 30]?.x ?? currentHoverPos.x}
                      cy={pointsHumidity[hoverIndex ?? 30]?.y ?? currentHoverPos.y}
                      r="4"
                      fill="#ffffff"
                      stroke="#0284c7"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx={pointsWeight[hoverIndex ?? 30]?.x ?? currentHoverPos.x}
                      cy={pointsWeight[hoverIndex ?? 30]?.y ?? currentHoverPos.y}
                      r="4"
                      fill="#ffffff"
                      stroke="#b45309"
                      strokeWidth="2.5"
                    />
                  </>
                ) : (
                  <circle
                    cx={currentHoverPos.x}
                    cy={currentHoverPos.y}
                    r="5.5"
                    fill="#ffffff"
                    stroke={yConfig.color}
                    strokeWidth="3"
                  />
                )}
              </g>
            )}
          </svg>

          {/* ======================================================== */}
          {/* FLOATING POP CARD (TOOLTIP)                              */}
          {/* "ALL" MODE: Shows all 3 details                          */}
          {/* "SOLO" MODE: Shows ONLY that specific metric's data      */}
          {/* ======================================================== */}
          {currentHoverPos && currentHoverPoint && (
            <>
              {activeMetric === "all" ? (
                /* All 3 Details in "All" mode */
                <div
                  className="hidden md:block absolute z-40 pointer-events-none transform -translate-y-1/2 bg-white rounded-2xl shadow-xl border border-gray-100 p-3.5 sm:p-4 w-48 sm:w-56 transition-all duration-75"
                  style={{
                    left: `clamp(12px, ${(currentHoverPos.x / svgWidth) * 100 + (currentHoverPos.x > svgWidth * 0.7 ? -26 : 2.5)}%, calc(100% - 230px))`,
                    top: `${Math.max(25, Math.min(75, (currentHoverPos.y / svgHeight) * 100))}%`,
                  }}
                >
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-gray-500 pb-1.5 sm:pb-2 mb-1.5 sm:mb-2 border-b border-gray-100">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="truncate">
                      {currentHoverPoint.dateLabel} • {currentHoverPoint.timestamp}
                    </span>
                  </div>

                  {/* Temperature */}
                  <div className="flex items-center justify-between py-0.5 sm:py-1 text-xs">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Thermometer className="w-3.5 h-3.5 text-[#d946ef] stroke-[2.2]" />
                      <span className="text-gray-600 font-medium">Temperature</span>
                    </div>
                    <span className="font-bold text-[#1f2937]">
                      {currentHoverPoint.temperature}°C
                    </span>
                  </div>

                  {/* Humidity */}
                  <div className="flex items-center justify-between py-0.5 sm:py-1 text-xs">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Droplets className="w-3.5 h-3.5 text-[#0284c7] stroke-[2.2]" />
                      <span className="text-gray-600 font-medium">Humidity</span>
                    </div>
                    <span className="font-bold text-[#1f2937]">
                      {currentHoverPoint.humidity}%
                    </span>
                  </div>

                  {/* Weight */}
                  <div className="flex items-center justify-between py-0.5 sm:py-1 text-xs">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Scale className="w-3.5 h-3.5 text-[#f59e0b] stroke-[2.2]" />
                      <span className="text-gray-600 font-medium">Weight</span>
                    </div>
                    <span className="font-bold text-[#1f2937]">
                      {currentHoverPoint.weight} kg
                    </span>
                  </div>
                </div>
              ) : (
                /* SOLO MODE: ONLY icon + reading value (no label, no date & time) */
                <div
                  className="hidden md:flex items-center gap-2 absolute z-40 pointer-events-none transform -translate-y-1/2 bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-1.5 transition-all duration-75"
                  style={{
                    left: `clamp(12px, ${(currentHoverPos.x / svgWidth) * 100 + (currentHoverPos.x > svgWidth * 0.7 ? -16 : 2.5)}%, calc(100% - 130px))`,
                    top: `${Math.max(20, Math.min(80, (currentHoverPos.y / svgHeight) * 100))}%`,
                  }}
                >
                  {activeMetric === "temp" && (
                    <>
                      <Thermometer className="w-4 h-4 text-[#d946ef] stroke-[2.2]" />
                      <span className="font-extrabold text-[#1f2937] text-sm">
                        {currentHoverPoint.temperature}°C
                      </span>
                    </>
                  )}

                  {activeMetric === "humidity" && (
                    <>
                      <Droplets className="w-4 h-4 text-[#0284c7] stroke-[2.2]" />
                      <span className="font-extrabold text-[#1f2937] text-sm">
                        {currentHoverPoint.humidity}%
                      </span>
                    </>
                  )}

                  {activeMetric === "weight" && (
                    <>
                      <Scale className="w-4 h-4 text-[#f59e0b] stroke-[2.2]" />
                      <span className="font-extrabold text-[#1f2937] text-sm">
                        {currentHoverPoint.weight} kg
                      </span>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* ======================================================== */}
        {/* BOTTOM TIMELINE SCRUBBER / RANGE SLIDER                  */}
        {/* ======================================================== */}
        <div className="mt-5 sm:mt-8 pt-2 sm:pt-3 flex items-center gap-2">
          {/* Left Arrow Button */}
          <button
            onClick={() => setHoverIndex((prev) => Math.max(0, (prev ?? 0) - 1))}
            className="w-8 h-8 sm:w-7 sm:h-7 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors shrink-0"
            aria-label="Previous time interval"
          >
            <ChevronLeft className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
          </button>

          {/* Interactive Range Track */}
          <div className="flex-1 h-3 sm:h-3 bg-gray-100 rounded-full p-0.5 relative flex items-center border border-gray-200 overflow-hidden">
            <div
              className="h-full bg-[#f59e0b] rounded-full transition-all flex items-center justify-center relative"
              style={{
                width: "82%",
                marginLeft: `${Math.min(18, Math.max(0, ((hoverIndex ?? 30) / (data.length - 1)) * 18))}%`,
              }}
            >
              <div className="w-2.5 h-1 bg-white rounded-full opacity-90 shadow-xs" />
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() =>
              setHoverIndex((prev) => Math.min(data.length - 1, (prev ?? 0) + 1))
            }
            className="w-8 h-8 sm:w-7 sm:h-7 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors shrink-0 cursor-pointer"
            aria-label="Next time interval"
          >
            <ChevronRight className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 2. REAL-TIME TELEMETRY KPI STATS & HARDWARE NODE STATUS  */}
      {/* ======================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {/* Metric 1: Temp Live */}
        <div className="bg-white border border-[#e8e1d7] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0">
              <Thermometer className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wide block">
                Temperature
              </span>
              <span className="text-base sm:text-xl font-extrabold text-[#24201d]">
                {data[data.length - 1]?.temperature ?? 29.2}°C
              </span>
            </div>
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
            Optimal
          </span>
        </div>

        {/* Metric 2: Humidity Live */}
        <div className="bg-white border border-[#e8e1d7] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
              <Droplets className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wide block">
                Humidity
              </span>
              <span className="text-base sm:text-xl font-extrabold text-[#24201d]">
                {data[data.length - 1]?.humidity ?? 58.0}%
              </span>
            </div>
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200 self-start sm:self-auto">
            Safe
          </span>
        </div>

        {/* Metric 3: Weight Live */}
        <div className="bg-white border border-[#e8e1d7] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
              <Scale className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wide block">
                Hive Weight
              </span>
              <span className="text-base sm:text-xl font-extrabold text-[#24201d]">
                {data[data.length - 1]?.weight ?? 37.29} kg
              </span>
            </div>
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
            +1.3kg
          </span>
        </div>

        {/* Action: IoT Configuration & Controls */}
        <div className="bg-[#faf8f5] border border-[#e8ded0] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 col-span-2 lg:col-span-1">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#8a7f72] uppercase tracking-wide block">
              Node Status
            </span>
            <span className="text-xs font-bold text-[#24201d] flex items-center gap-1.5 mt-0.5">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              ESP32 Ready
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setIsLiveStream(!isLiveStream)}
              className="p-1.5 sm:p-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              title={isLiveStream ? "Pause Live Stream" : "Resume Live Stream"}
            >
              {isLiveStream ? (
                <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
              )}
            </button>
            <button
              onClick={() => setShowIotModal(true)}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-bold text-[#b45309] bg-[#f7efe4] border border-[#e8ded0] rounded-lg hover:bg-[#ede3d5] transition-colors whitespace-nowrap cursor-pointer"
            >
              Connect IoT
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. IOT BACKEND INTEGRATION MODAL                        */}
      {/* ======================================================== */}
      {showIotModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white border border-[#e8e1d7] rounded-2xl p-5 sm:p-6 w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#e8e1d7] mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#b45309]" />
                <h3 className="font-bold text-base sm:text-lg text-[#24201d]">
                  IoT Hardware Connection
                </h3>
              </div>
              <button
                onClick={() => setShowIotModal(false)}
                className="text-gray-400 hover:text-gray-700 text-sm font-bold p-1 rounded-md cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4 text-xs text-gray-600">
              <p>
                Jab aapka hardware (ESP32 / NodeMCU / LoRa / MQTT) ready ho, to bas WebSocket ya REST API endpoint se JSON packet bhejiye:
              </p>

              <pre className="bg-[#1e1b18] text-[#f5ede2] p-3 rounded-xl text-[11px] font-mono leading-relaxed overflow-x-auto">
{`// Expected IoT Packet for this graph:
{
  "timestamp": "11:13:42",
  "temperature": 29.2,   // in °C
  "humidity": 58.0,      // in %
  "weight": 37.29        // in kg
}`}
              </pre>

              <p className="text-[11px] text-gray-500">
                Front-end automatically is single graph canvas par curve aur tooltip update kar dega!
              </p>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowIotModal(false)}
                  className="w-full sm:w-auto px-4 py-2 bg-[#b45309] text-white font-bold rounded-lg hover:bg-[#92400e] transition-all text-center cursor-pointer"
                >
                  Theek Hai, Samjh Gaya
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
