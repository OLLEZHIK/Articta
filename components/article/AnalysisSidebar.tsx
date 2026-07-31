"use client";

import { useState, useEffect, useRef } from "react";
import { Variable } from "@/types/variable";
import { formatValue } from "@/lib/formatValue";
import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/i18n";

interface AnalysisSidebarProps {
  variables: Record<string, Variable>;
  visitedVariableIds?: Set<string>;
  activeVariableId?: string | null;
  hasHistory?: boolean;
  isComparing?: boolean;
  onUpdateVariable: (id: string, value: number) => void;
  onResetAll: () => void;
  onStartComparing?: () => void;
  onStopComparing?: () => void;
}

export function AnalysisSidebar({
  variables,
  visitedVariableIds = new Set(),
  activeVariableId = null,
  hasHistory,
  isComparing,
  onUpdateVariable,
  onResetAll,
  onStartComparing,
  onStopComparing,
}: AnalysisSidebarProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const checklistRef = useRef<HTMLDivElement>(null);

  const varList = Object.values(variables);
  const totalCount = varList.length;

  const modifiedCount = varList.filter(
    (v) => v.value !== v.defaultValue
  ).length;

  const visitedCount = varList.filter(
    (v) => visitedVariableIds.has(v.id) || v.value !== v.defaultValue
  ).length;

  const progressPercent = totalCount > 0
    ? Math.max(10, Math.round((visitedCount / totalCount) * 100))
    : 0;

  // Auto-scroll sidebar item into view when active variable changes
  useEffect(() => {
    if (!activeVariableId) return;

    const el = document.getElementById(`sidebar-item-${activeVariableId}`);
    if (el && checklistRef.current) {
      const container = checklistRef.current;
      const elTop = el.offsetTop;
      const elHeight = el.offsetHeight;
      const containerHeight = container.clientHeight;

      container.scrollTo({
        top: Math.max(0, elTop - containerHeight / 2 + elHeight / 2),
        behavior: "smooth",
      });
    }
  }, [activeVariableId]);

  const handleStartEdit = (v: Variable) => {
    setEditingId(v.id);
    setEditValue(String(v.value));
  };

  const handleSaveEdit = (id: string) => {
    const parsed = parseFloat(editValue);
    if (!isNaN(parsed)) {
      onUpdateVariable(id, parsed);
    }
    setEditingId(null);
  };

  const scrollToVariableInArticle = (varId: string) => {
    const el = document.getElementById(`var-block-${varId}`);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  const buildReportUrl = () => {
    const params = new URLSearchParams();
    for (const v of varList) {
      params.set(v.id, String(v.value));
    }
    const basePath = window.location.pathname.endsWith("/")
      ? window.location.pathname.slice(0, -1)
      : window.location.pathname;
    return `${basePath}/report?${params.toString()}`;
  };

  const handleGenerateReport = () => {
    window.open(buildReportUrl(), "_blank");
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}${buildReportUrl()}`;
    navigator.clipboard.writeText(url);
    alert(t.copied);
  };

  return (
    <aside className="analysis-sidebar">
      <div className="analysis-card">
        {/* Header */}
        <div className="analysis-card-header">
          <div className="analysis-title">{t.modelParameters}</div>
          <span className="analysis-badge">Sync Live</span>
        </div>

        {/* Progress Indicator */}
        <div className="analysis-progress-container">
          <div className="analysis-progress-label">
            <span className="analysis-progress-count">
              {t.modifiedCount
                .replace("{{modified}}", String(modifiedCount))
                .replace("{{total}}", String(totalCount))}
            </span>
            <span className="analysis-visited-count">
              ({visitedCount}/{totalCount} {language === "sk" ? "prečítané" : language === "en" ? "in view" : "в фокусе"})
            </span>
          </div>
          <div className="analysis-progress-track">
            <div
              className="analysis-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Status Legend */}
        <div className="analysis-status-legend">
          <div className="legend-chip green" title="Параметр изменен пользователем">
            <span className="dot green" />
            <span>{language === "sk" ? "Zmenené" : language === "en" ? "Modified" : "Изменено"}</span>
          </div>
          <div className="legend-chip blue" title="Параметр пролистан в статье">
            <span className="dot blue" />
            <span>{language === "sk" ? "Prečítané" : language === "en" ? "Visited" : "Пролистано"}</span>
          </div>
          <div className="legend-chip gray" title="Параметр еще не достигнут">
            <span className="dot gray" />
            <span>{language === "sk" ? "Ďalej" : language === "en" ? "Upcoming" : "Далее"}</span>
          </div>
        </div>

        {/* Hold to Compare Quick Button */}
        {hasHistory && onStartComparing && onStopComparing && (
          <button
            type="button"
            onMouseDown={onStartComparing}
            onMouseUp={onStopComparing}
            onMouseLeave={onStopComparing}
            onTouchStart={onStartComparing}
            onTouchEnd={onStopComparing}
            className={`analysis-hold-compare-btn ${isComparing ? "active" : ""}`}
            title={t.compareHint}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>{isComparing ? t.comparingActive : t.holdToCompare}</span>
          </button>
        )}

        {/* Variables Checklist with Auto-scroll */}
        <div className="analysis-checklist" ref={checklistRef}>
          {varList.map((v) => {
            const isModified = v.value !== v.defaultValue;
            const isVisited = visitedVariableIds.has(v.id);
            const isActive = activeVariableId === v.id;
            const isEditing = editingId === v.id;

            return (
              <div
                key={v.id}
                id={`sidebar-item-${v.id}`}
                className={`analysis-item ${isModified ? "modified" : isVisited ? "visited" : "unvisited"} ${isActive ? "active-in-view" : ""}`}
                onClick={() => scrollToVariableInArticle(v.id)}
              >
                <div className="analysis-item-left">
                  {/* Status Indicator Dot: Green if modified, Blue if visited, Muted if upcoming */}
                  <span
                    className={`analysis-status-dot ${
                      isModified
                        ? "dot-modified"
                        : isVisited
                        ? "dot-visited"
                        : "dot-unvisited"
                    }`}
                  >
                    {isModified ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <span className="dot-inner-core" />
                    )}
                  </span>

                  <div className="analysis-item-details">
                    <span className="analysis-item-label">{v.label}</span>
                    {!isEditing ? (
                      <span className="analysis-item-value">
                        {formatValue(v.value, v.type)}
                      </span>
                    ) : (
                      <div className="analysis-item-edit-box" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveEdit(v.id);
                            if (e.key === "Escape") setEditingId(null);
                          }}
                          autoFocus
                          className="analysis-inline-input"
                        />
                        <button
                          onClick={() => handleSaveEdit(v.id)}
                          className="analysis-save-btn"
                        >
                          ✓
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {!isEditing && (
                  <div className="analysis-item-actions" onClick={(e) => e.stopPropagation()}>
                    {isModified && (
                      <button
                        type="button"
                        onClick={() => onUpdateVariable(v.id, v.defaultValue)}
                        className="analysis-reset-single-btn"
                        title={language === "sk" ? "Obnoviť tento parameter" : language === "en" ? "Reset this parameter" : "Сбросить этот параметр"}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                          <path d="M3 3v5h5"></path>
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => handleStartEdit(v)}
                      className="analysis-edit-icon-btn"
                      title="Edit parameter"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Info Hint Box */}
        <div className="analysis-hint-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hint-icon">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>{t.compareHint}</span>
        </div>

        {/* Main Action: Generate Report */}
        <button onClick={handleGenerateReport} className="analysis-primary-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span>{t.generateReport}</span>
        </button>

        {/* Secondary: Copy Share Link */}
        <button onClick={handleCopyLink} className="analysis-share-link-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          <span>{t.shareLink}</span>
        </button>

        {/* Reset Action */}
        <button onClick={onResetAll} className="analysis-reset-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
          <span>{t.resetAll}</span>
        </button>
      </div>
    </aside>
  );
}
