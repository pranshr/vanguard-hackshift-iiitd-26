"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            autoDisplay?: boolean;
            includedLanguages?: string;
          },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export function GoogleTranslateScript() {
  useEffect(() => {
    // Setup callback function for Google Translate
    window.googleTranslateElementInit = function () {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };
  }, []);

  return (
    <>
      {/* Hidden container where Google Translate attaches its combo selector */}
      <div
        id="google_translate_element"
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
        aria-hidden="true"
      />

      <Script
        id="google-translate-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement({
                  pageLanguage: 'en',
                  autoDisplay: false
                }, 'google_translate_element');
              }
            }
          `,
        }}
      />
      <Script
        id="google-translate-script"
        strategy="afterInteractive"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      />
    </>
  );
}
