import React from "react";

export function MarqueeTicker() {
  const items = [
    "Every harvest monitored by smart IoT sensors",
    "Continuous scale weight, temperature & acoustic telemetry",
    "Single-origin raw Indian honey · BEE safe",
    "Cryptographic proof from hive to jar",
  ];

  return (
    <div
      className="bg-[var(--ink)] text-[var(--paper)] py-2.5 overflow-hidden border-b border-black select-none"
      role="region"
      aria-label="Announcement ticker"
    >
      <div className="marquee-track flex items-center gap-8 whitespace-nowrap text-xs font-mono uppercase tracking-widest text-[var(--line)]/90">
        {/* Render twice for seamless continuous loop */}
        {[...Array(4)].map((_, loopIdx) => (
          <React.Fragment key={loopIdx}>
            {items.map((item, idx) => (
              <span key={`${loopIdx}-${idx}`} className="flex items-center gap-8">
                <span>{item}</span>
                <span className="text-[var(--signature)] font-bold text-sm">·</span>
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
