"use client";

import React, { useState } from "react";
import { JourneyEvent } from "@/data/types";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  User,
  Hash,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Props {
  events: JourneyEvent[];
}

export function JourneyTimeline({ events }: Props) {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [expandedHashes, setExpandedHashes] = useState<Record<number, boolean>>({});

  const handleCopy = (hash: string) => {
    try {
      navigator.clipboard.writeText(hash);
      setCopiedHash(hash);
      setTimeout(() => setCopiedHash(null), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  const toggleExpand = (idx: number) => {
    setExpandedHashes((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-[#E3DACB]">
      {events.map((event, idx) => {
        const isLast = idx === events.length - 1;
        const isExpanded = expandedHashes[idx];

        return (
          <div key={idx} className="relative group">
            {/* Step Node Marker */}
            <div
              className={`absolute -left-[23px] sm:-left-[27px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                isLast
                  ? "bg-[#2F6B3A] border-[#2F6B3A] text-white"
                  : "bg-white border-[#8A4B12] text-[#8A4B12]"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>

            {/* Event Content Card */}
            <div className="bg-[#FAF6EF] border border-[#E3DACB] rounded-lg p-4 sm:p-5 hover:border-[#CFC3AE] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2 border-b border-[#EBE2D3]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A4B12] font-semibold block">
                    Stage {idx + 1} of {events.length} · {event.step.toUpperCase()}
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C1A17] mt-0.5">
                    {event.title}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#665E55] shrink-0 bg-white px-2.5 py-1 rounded border border-[#E3DACB]">
                  <Calendar className="w-3.5 h-3.5 text-[#8A4B12]" />
                  <span>{event.date}</span>
                </div>
              </div>

              {/* Event Metadata: Location & Actor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 text-xs text-[#665E55]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#3F4A3A] shrink-0" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#8A4B12] shrink-0" />
                  <span>{event.actor}</span>
                </div>
              </div>

              {/* Event Description */}
              <p className="text-xs sm:text-sm text-[#1C1A17] leading-relaxed mb-3">
                {event.details}
              </p>

              {/* Cryptographic Event Hash */}
              <div className="pt-2 border-t border-[#EBE2D3] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-[#665E55]">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <Hash className="w-3 h-3 text-[#786E64] shrink-0" />
                  <span className="shrink-0 text-[#786E64]">Event Hash:</span>
                  <span className="text-[#1C1A17] select-all truncate">
                    {isExpanded ? event.hash : `${event.hash.slice(0, 18)}...${event.hash.slice(-8)}`}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="text-[#8A4B12] hover:underline flex items-center gap-0.5 text-[10px]"
                  >
                    <span>{isExpanded ? "Collapse" : "Full Hash"}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  <button
                    onClick={() => handleCopy(event.hash)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[#E3DACB] bg-white text-[#1C1A17] hover:border-[#8A4B12] transition-colors text-[10px]"
                    title="Copy full cryptographic hash"
                  >
                    {copiedHash === event.hash ? (
                      <>
                        <Check className="w-3 h-3 text-[#2F6B3A]" />
                        <span className="text-[#2F6B3A]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#786E64]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
