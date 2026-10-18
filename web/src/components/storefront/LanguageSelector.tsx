"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown, Check, Search } from "lucide-react";
import {
  SUPPORTED_LANGUAGES,
  getCurrentLanguage,
  setLanguage,
  Language,
} from "@/utils/language";

interface LanguageSelectorProps {
  variant?: "header" | "mobile" | "compact";
  className?: string;
}

export function LanguageSelector({
  variant = "header",
  className = "",
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLangCode, setCurrentLangCode] = useState<string>(() => {
    if (typeof window === "undefined") return "en";
    return getCurrentLanguage();
  });
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Listen for language changes across tabs or other components
  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setCurrentLangCode(customEvent.detail);
      }
    };

    window.addEventListener("languageChange", handleLangChange);
    return () => {
      window.removeEventListener("languageChange", handleLangChange);
    };
  }, []);

  // Close on click outside or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      // Auto-focus search input when opened
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const currentLanguage: Language =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLangCode) ||
    SUPPORTED_LANGUAGES[0];

  const filteredLanguages = SUPPORTED_LANGUAGES.filter((lang) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      lang.name.toLowerCase().includes(q) ||
      lang.nativeName.toLowerCase().includes(q) ||
      lang.code.toLowerCase().includes(q) ||
      (lang.region && lang.region.toLowerCase().includes(q))
    );
  });

  const handleSelect = (code: string) => {
    setCurrentLangCode(code);
    setIsOpen(false);
    setSearchQuery("");
    setLanguage(code);
  };

  // Render for mobile full-width drawer list
  if (variant === "mobile") {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center justify-between px-3 text-[11px] font-mono uppercase tracking-wider text-[var(--muted-ink)]">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[var(--honey)]" />
            <span>Select Language / भाषा चुनें</span>
          </span>
          <span className="text-[10px] bg-[var(--card-tint)] px-2 py-0.5 rounded-full font-bold">
            {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
          </span>
        </div>

        {/* Quick select pills for most popular in mobile */}
        <div className="grid grid-cols-2 gap-2 px-1">
          {SUPPORTED_LANGUAGES.slice(0, 6).map((lang) => {
            const isSelected = lang.code === currentLangCode;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                  isSelected
                    ? "bg-[var(--signature)]/15 border-[var(--signature)] text-[var(--ink)] font-bold shadow-2xs"
                    : "bg-white/80 border-[var(--line)] text-[var(--ink)] hover:bg-white"
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <span className="text-base">{lang.flag}</span>
                  <span className="truncate">{lang.nativeName}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[var(--signature)] shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* View all button trigger */}
        <div className="relative px-1 pt-1" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium bg-white border border-[var(--line)] text-[var(--ink)] hover:border-[var(--signature)] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[var(--muted-ink)]" />
              <span>More Languages ({SUPPORTED_LANGUAGES.length} available)...</span>
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="mt-2 p-2 bg-[var(--sand)] border border-[var(--line)] rounded-2xl shadow-xl space-y-2 z-50">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[var(--muted-ink)]" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search language..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[var(--line)] bg-white focus:outline-none focus:border-[var(--signature)]"
                />
              </div>
              <div className="max-h-52 overflow-y-auto space-y-1 pr-1">
                {filteredLanguages.map((lang) => {
                  const isSelected = lang.code === currentLangCode;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelect(lang.code)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        isSelected
                          ? "bg-[var(--signature)] text-[var(--ink)] font-semibold"
                          : "hover:bg-[var(--card-tint)] text-[var(--ink)]"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                        <span className="text-[10px] opacity-75">({lang.nativeName})</span>
                      </span>
                      {isSelected && <Check className="w-3 h-3 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Header Desktop Pill Variant
  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 h-9 px-2.5 rounded-lg border border-[var(--line)] bg-white hover:bg-[#f5ede2] text-[var(--ink)] hover:border-[var(--signature)] transition-all shadow-2xs group cursor-pointer"
        aria-expanded={isOpen}
        aria-label="Change Language"
        title={`Current Language: ${currentLanguage.name}`}
      >
        <Globe className="w-3.5 h-3.5 text-[var(--muted-ink)] group-hover:text-[var(--signature)] transition-colors" />
        <span className="text-base leading-none">{currentLanguage.flag}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[var(--muted-ink)] group-hover:text-[var(--ink)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-24px)] rounded-2xl bg-[var(--sand)] border border-[var(--line)] shadow-2xl p-2.5 space-y-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between px-2 pt-1 pb-1 border-b border-[var(--line)]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted-ink)] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[var(--honey)]" />
              <span>Language Selection</span>
            </span>
            <span className="text-[10px] font-mono text-[var(--forest)] bg-[var(--tag-bg)] border border-[var(--tag-border)] px-1.5 py-0.5 rounded-full font-medium">
              100% Translated
            </span>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[var(--muted-ink)]" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search e.g. Hindi, Spanish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[var(--line)] bg-white focus:outline-none focus:border-[var(--signature)] text-[var(--ink)]"
            />
          </div>

          {/* Language list */}
          <div className="max-h-64 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {filteredLanguages.length === 0 ? (
              <div className="text-center py-4 text-xs text-[var(--muted-ink)]">
                No matching languages found
              </div>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = lang.code === currentLangCode;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all text-left ${
                      isSelected
                        ? "bg-[var(--signature)] text-[var(--ink)] font-semibold shadow-2xs"
                        : "hover:bg-[var(--card-tint)] text-[var(--ink)]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base shrink-0">{lang.flag}</span>
                      <div className="truncate">
                        <span className="block truncate font-medium">
                          {lang.name}
                        </span>
                        <span
                          className={`text-[10px] block truncate ${
                            isSelected
                              ? "text-[var(--ink)]/80 font-normal"
                              : "text-[var(--muted-ink)]"
                          }`}
                        >
                          {lang.nativeName} {lang.region ? `• ${lang.region}` : ""}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-[var(--ink)] shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
