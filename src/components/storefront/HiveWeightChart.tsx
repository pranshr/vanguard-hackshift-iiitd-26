"use client";

import React, { useState } from "react";
import { HiveTelemetryPoint } from "@/data/types";
import { Scale, Thermometer, Calendar } from "lucide-react";

interface Props {
  data: HiveTelemetryPoint[];
  hiveId: string;
}

export function HiveWeightChart({ data, hiveId }: Props) {
  const [activePoint, setActivePoint] = useState<HiveTelemetryPoint | null>(
    data.find((p) => p.isHarvestDay) || data[data.length - 1] || null
  );

  if (!data || data.length === 0) {
    return <div className="p-4 text-xs font-mono text-[#665E55]">No telemetry readings available.</div>;
  }

  // Chart coordinate math
  const width = 800;
  const height = 280;
  const padding = { top: 30, right: 30, bottom: 40, left: 55 };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const minWeight = 20;
  const maxWeight = 42;

  const harvestPoint = data.find((p) => p.isHarvestDay);
  const startWeight = data[0]?.weightKg || 22.1;
  const peakPoint = data.reduce((max, p) => (p.weightKg > max.weightKg ? p : max), data[0]);

  const getX = (index: number) => padding.left + (index / (data.length - 1)) * chartW;
  const getY = (val: number) => {
    const clamped = Math.max(minWeight, Math.min(maxWeight, val));
    return padding.top + chartH - ((clamped - minWeight) / (maxWeight - minWeight)) * chartH;
  };

  // Generate SVG path for line and area
  const pointsString = data
    .map((p, i) => `${getX(i).toFixed(1)},${getY(p.weightKg).toFixed(1)}`)
    .join(" ");

  const areaString = `${getX(0).toFixed(1)},${padding.top + chartH} ${pointsString} ${getX(data.length - 1).toFixed(1)},${padding.top + chartH}`;

  const harvestIndex = data.findIndex((p) => p.isHarvestDay);
  const harvestX = harvestIndex !== -1 ? getX(harvestIndex) : null;
  const harvestY = harvestIndex !== -1 ? getY(data[harvestIndex].weightKg) : null;

  return (
    <div className="bg-[#FAF6EF] border border-[#E3DACB] rounded-lg p-4 sm:p-6">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3DACB] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8A4B12] font-semibold">
              Live Sensor Telemetry
            </span>
            <span className="text-[11px] font-mono text-[#665E55] bg-[#EDE4D4] px-1.5 py-0.5 rounded">
              {hiveId} · HX711 40kg Load Cell
            </span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1A17] mt-0.5">
            75-Day Hive Weight & Nectar Flow Curve
          </h3>
        </div>

        {/* Dynamic active point inspector */}
        {activePoint && (
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded border border-[#E3DACB] text-xs font-mono">
            <div className="flex items-center gap-1 text-[#1C1A17]">
              <Calendar className="w-3.5 h-3.5 text-[#8A4B12]" />
              <span>{activePoint.date} (Day {activePoint.day})</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-[#8A4B12]">
              <Scale className="w-3.5 h-3.5" />
              <span>{activePoint.weightKg.toFixed(2)} kg</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[#3F4A3A]">
              <Thermometer className="w-3.5 h-3.5" />
              <span>{activePoint.tempC}°C</span>
            </div>
          </div>
        )}
      </div>

      {/* Responsive SVG Chart */}
      <div className="relative w-full aspect-[800/280] my-2 select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="nectarAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C98A2B" stopOpacity="0.28" />
              <stop offset="90%" stopColor="#C98A2B" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="nectarLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8A4B12" />
              <stop offset="70%" stopColor="#C98A2B" />
              <stop offset="100%" stopColor="#8A4B12" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[20, 25, 30, 35, 40].map((w) => {
            const y = getY(w);
            return (
              <g key={w}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + chartW}
                  y2={y}
                  stroke="#E3DACB"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  fill="#786E64"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {w}kg
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <polygon points={areaString} fill="url(#nectarAreaGrad)" />

          {/* Line stroke */}
          <polyline
            points={pointsString}
            fill="none"
            stroke="url(#nectarLineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Harvest marker vertical indicator */}
          {harvestX !== null && harvestY !== null && (
            <g>
              <line
                x1={harvestX}
                y1={padding.top}
                x2={harvestX}
                y2={padding.top + chartH}
                stroke="#2F6B3A"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Harvest point circle */}
              <circle
                cx={harvestX}
                cy={harvestY}
                r="6"
                fill="#2F6B3A"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              {/* Harvest Callout Label */}
              <g transform={`translate(${harvestX - 55}, ${padding.top - 6})`}>
                <rect
                  x="0"
                  y="-16"
                  width="110"
                  height="22"
                  rx="4"
                  fill="#2F6B3A"
                />
                <text
                  x="55"
                  y="-2"
                  fill="#FFFFFF"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  HARVEST DAY
                </text>
              </g>
            </g>
          )}

          {/* Active hover crosshair & marker */}
          {activePoint && (
            <g>
              {(() => {
                const idx = data.findIndex((p) => p.day === activePoint.day);
                if (idx === -1) return null;
                const cx = getX(idx);
                const cy = getY(activePoint.weightKg);
                return (
                  <>
                    <line
                      x1={cx}
                      y1={padding.top}
                      x2={cx}
                      y2={padding.top + chartH}
                      stroke="#8A4B12"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      opacity="0.6"
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r="4.5"
                      fill="#8A4B12"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  </>
                );
              })()}
            </g>
          )}

          {/* Interactive touch/mouse overlay rectangles */}
          {data.map((point, i) => {
            const stepW = chartW / data.length;
            const x = getX(i) - stepW / 2;
            return (
              <rect
                key={point.day}
                x={x}
                y={padding.top}
                width={stepW}
                height={chartH}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setActivePoint(point)}
                onClick={() => setActivePoint(point)}
              />
            );
          })}
        </svg>
      </div>

      {/* Timeline X-Axis markers */}
      <div className="flex justify-between items-center text-[10px] font-mono text-[#786E64] px-1 pt-1 border-t border-[#E3DACB]">
        <span>{data[0]?.date} (Flow Begins)</span>
        <span className="text-[#2F6B3A] font-bold">
          {harvestPoint ? `${harvestPoint.date} (Harvest Drop)` : "Mid-Season"}
        </span>
        <span>{data[data.length - 1]?.date} (Post-Harvest)</span>
      </div>

      {/* Key Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-[#E3DACB]">
        <div className="bg-white p-2.5 rounded border border-[#E3DACB]">
          <span className="text-[10px] font-mono uppercase text-[#786E64] block">
            Base Brood Weight
          </span>
          <span className="font-mono text-sm sm:text-base font-bold text-[#1C1A17]">
            {startWeight.toFixed(2)} kg
          </span>
        </div>

        <div className="bg-white p-2.5 rounded border border-[#E3DACB]">
          <span className="text-[10px] font-mono uppercase text-[#786E64] block">
            Peak Nectar Gain
          </span>
          <span className="font-mono text-sm sm:text-base font-bold text-[#8A4B12]">
            +{((peakPoint?.weightKg || 38.6) - startWeight).toFixed(2)} kg
          </span>
        </div>

        <div className="bg-white p-2.5 rounded border border-[#E3DACB]">
          <span className="text-[10px] font-mono uppercase text-[#786E64] block">
            Extracted Honey
          </span>
          <span className="font-mono text-sm sm:text-base font-bold text-[#2F6B3A]">
            {harvestPoint
              ? `${((peakPoint?.weightKg || 38.6) - (data[harvestIndex + 1]?.weightKg || 26.2)).toFixed(2)} kg`
              : "12.40 kg"}
          </span>
        </div>

        <div className="bg-white p-2.5 rounded border border-[#E3DACB]">
          <span className="text-[10px] font-mono uppercase text-[#786E64] block">
            Brood Temp Stability
          </span>
          <span className="font-mono text-sm sm:text-base font-bold text-[#3F4A3A]">
            34.4°C ± 0.6°C
          </span>
        </div>
      </div>
    </div>
  );
}
