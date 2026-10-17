"use client";

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region?: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", region: "Global / UK / US" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", region: "India (National)" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳", region: "Punjab, India" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳", region: "Bengal / Sundarbans" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳", region: "Maharashtra, India" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳", region: "Tamil Nadu, India" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳", region: "Telangana / AP" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳", region: "Gujarat, India" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇮🇳", region: "Kashmir / India" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", region: "Spain / Latin America" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", region: "France / Europe" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", region: "Germany / Europe" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", region: "Japan" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", region: "Middle East" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "简体中文", flag: "🇨🇳", region: "China" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", region: "Eurasia" },
];

/**
 * Read the current language from cookies or localStorage
 */
export function getCurrentLanguage(): string {
  if (typeof window === "undefined") return "en";

  try {
    // Check localStorage first
    const saved = localStorage.getItem("bee_safe_language");
    if (saved) return saved;

    // Check googtrans cookie
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, val] = cookie.trim().split("=");
      if (name === "googtrans" && val) {
        // format usually /en/hi
        const parts = decodeURIComponent(val).split("/");
        const target = parts[parts.length - 1];
        if (target) return target;
      }
    }
  } catch {
    // Ignore error
  }
  return "en";
}

/**
 * Set the target language across Google Translate cookies and localStorage
 */
export function setLanguage(langCode: string) {
  if (typeof window === "undefined") return;

  const target = langCode || "en";
  localStorage.setItem("bee_safe_language", target);

  const hostname = window.location.hostname;

  if (target === "en") {
    // Clear the cookie for default English
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;

    if (hostname.includes(".")) {
      const parts = hostname.split(".");
      if (parts.length > 1) {
        const rootDomain = parts.slice(-2).join(".");
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain};`;
      }
    }

    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = "";
      select.dispatchEvent(new Event("change"));
    }

    window.dispatchEvent(new CustomEvent("languageChange", { detail: "en" }));
    window.location.reload();
    return;
  }

  // Set the googtrans cookie for all relevant scopes
  const cookieVal = `/en/${target}`;
  document.cookie = `googtrans=${cookieVal}; path=/;`;
  document.cookie = `googtrans=${cookieVal}; path=/; domain=${hostname};`;
  document.cookie = `googtrans=${cookieVal}; path=/; domain=.${hostname};`;

  if (hostname.includes(".")) {
    const parts = hostname.split(".");
    if (parts.length > 1) {
      const rootDomain = parts.slice(-2).join(".");
      document.cookie = `googtrans=${cookieVal}; path=/; domain=.${rootDomain};`;
    }
  }

  // Broadcast custom event
  window.dispatchEvent(new CustomEvent("languageChange", { detail: target }));

  // Trigger Google Translate Combo if mounted
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (select) {
    select.value = target;
    select.dispatchEvent(new Event("change"));
  } else {
    // Reload page to apply cookie
    window.location.reload();
  }
}
