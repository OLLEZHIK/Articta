"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { LANGUAGES, Language } from "@/types/language";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as Language)}
          className={`lang-btn ${language === lang.code ? "active" : ""}`}
        >
          <span className="lang-label">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
