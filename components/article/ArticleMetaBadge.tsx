"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/i18n";

export function ArticleMetaBadge() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <div className="article-meta-bar">
      {/* 4 Colored Pill Badges Row */}
      <div className="meta-items-strip">
        {/* Pill 1: Blue - Variables */}
        <div className="meta-pill-badge blue">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <span>{t.metaVariables}</span>
        </div>

        {/* Pill 2: Purple - Difficulty */}
        <div className="meta-pill-badge purple">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
          <span>{t.metaDifficulty}</span>
        </div>

        {/* Pill 3: Green - Charts */}
        <div className="meta-pill-badge green">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18"></path>
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
          </svg>
          <span>{t.metaCharts}</span>
        </div>

        {/* Pill 4: Amber - Time */}
        <div className="meta-pill-badge amber">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>{t.metaReadTime}</span>
        </div>
      </div>

      {/* Refined Value Hint Banner */}
      <div className="meta-hint-banner">
        <div className="meta-hint-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        </div>
        <p className="meta-hint-text">{t.metaValueText}</p>
      </div>
    </div>
  );
}
