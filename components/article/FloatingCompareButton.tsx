"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/i18n";

interface FloatingCompareButtonProps {
  hasHistory: boolean;
  isComparing: boolean;
  onStartComparing: () => void;
  onStopComparing: () => void;
}

export function FloatingCompareButton({
  hasHistory,
  isComparing,
  onStartComparing,
  onStopComparing,
}: FloatingCompareButtonProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);

  if (!hasHistory) return null;

  return (
    <div className="floating-compare-widget">
      <button
        type="button"
        onMouseDown={onStartComparing}
        onMouseUp={onStopComparing}
        onMouseLeave={onStopComparing}
        onTouchStart={onStartComparing}
        onTouchEnd={onStopComparing}
        className={`floating-compare-btn ${isComparing ? "active" : ""}`}
        title={t.compareHint}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="floating-compare-icon"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span>
          {isComparing ? t.comparingActive : t.holdToCompare}
        </span>
      </button>
    </div>
  );
}
