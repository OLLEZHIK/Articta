"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/i18n";
import { Variable } from "@/types/variable";
import { useMemo } from "react";

interface StickyVariableDockProps {
  variables: Record<string, Variable>;
  hasHistory: boolean;
  isComparing: boolean;
  onResetAll: () => void;
  onStartComparing: () => void;
  onStopComparing: () => void;
}

export function StickyVariableDock({
  variables,
  hasHistory,
  isComparing,
  onResetAll,
  onStartComparing,
  onStopComparing,
}: StickyVariableDockProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);

  // Count modified variables
  const modifiedCount = useMemo(() => {
    return Object.values(variables).filter(
      (v) => Math.abs(v.value - v.defaultValue) > 0.0001
    ).length;
  }, [variables]);

  const totalCount = Object.keys(variables).length;

  const modifiedText = {
    ru: `Изменено ${modifiedCount} из ${totalCount}`,
    sk: `Zmenené ${modifiedCount} z ${totalCount}`,
    en: `Modified ${modifiedCount} of ${totalCount}`,
  }[language] || `Изменено ${modifiedCount} из ${totalCount}`;

  const holdText = {
    ru: isComparing ? "👁️ АВТОРСКИЕ ЦИФРЫ..." : "👁️ Зажмите: Авторский вариант",
    sk: isComparing ? "👁️ AUTORSKÉ HODNOTY..." : "👁️ Podržte: Autorský variant",
    en: isComparing ? "👁️ SHOWING AUTHOR VALUES..." : "👁️ Hold to Compare: Author's Values",
  }[language] || (isComparing ? "👁️ АВТОРСКИЕ ЦИФРЫ..." : "👁️ Зажмите: Авторский вариант");

  return (
    <div className="sticky-variable-dock-wrapper">
      <div className={`sticky-variable-dock ${isComparing ? "comparing-mode" : ""}`}>
        {/* Variable Modified Indicator */}
        <div className="dock-stat">
          <span className="dock-stat-dot" />
          <span className="dock-stat-text">{modifiedText}</span>
          {modifiedCount > 0 && (
            <button
              onClick={onResetAll}
              className="dock-reset-btn"
              title={t.resetAll}
            >
              ↺ {t.resetSuffix || "сбросить"}
            </button>
          )}
        </div>

        <div className="dock-divider" />

        {/* Hold to Compare Button */}
        <button
          type="button"
          onMouseDown={onStartComparing}
          onMouseUp={onStopComparing}
          onMouseLeave={onStopComparing}
          onTouchStart={onStartComparing}
          onTouchEnd={onStopComparing}
          className={`dock-hold-btn ${isComparing ? "active" : ""}`}
          title={t.compareHint}
        >
          <span>{holdText}</span>
        </button>
      </div>
    </div>
  );
}
