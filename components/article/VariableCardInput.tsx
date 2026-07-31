"use client";

import { useState, useEffect } from "react";
import { Variable } from "@/types/variable";
import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/i18n";

interface VariableCardInputProps {
  variable: Variable;
  previousValue?: number;
  isComparing?: boolean;
  example?: string;
  description?: string;
  onUpdate: (id: string, value: number) => void;
  onStartComparing?: () => void;
  onStopComparing?: () => void;
}

export function VariableCardInput({
  variable,
  isComparing,
  example,
  description,
  onUpdate,
}: VariableCardInputProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const [inputValue, setInputValue] = useState(String(variable.value));

  useEffect(() => {
    setInputValue(String(variable.value));
  }, [variable.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed)) {
      onUpdate(variable.id, parsed);
    }
  };

  const handleResetToDefault = () => {
    onUpdate(variable.id, variable.defaultValue);
  };

  const getSuffix = () => {
    if (variable.type === "percent") return "%";
    if (variable.type === "currency") return "€";
    return "";
  };

  const isModifiedFromDefault = variable.value !== variable.defaultValue;

  return (
    <div className={`variable-card-input ${isComparing ? "is-comparing" : ""}`}>
      {description && <p className="variable-card-description">{description}</p>}

      <div className="variable-card-box">
        <label className="variable-card-label">{variable.label}</label>

        <div className="variable-card-field">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="variable-card-native-input"
            placeholder={String(variable.defaultValue)}
          />
          {getSuffix() && <span className="variable-card-suffix">{getSuffix()}</span>}
        </div>
      </div>

      <div className="variable-card-actions">
        {isModifiedFromDefault ? (
          <button
            type="button"
            onClick={handleResetToDefault}
            className="variable-card-example-btn single-reset-btn"
            title={t.clickToResetAttr || "Сбросить на значение автора"}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            <span>{language === "sk" ? "Obnoviť hodnou autora" : language === "en" ? "Reset to author's default" : "Сбросить на значение автора"}</span>
          </button>
        ) : example ? (
          <button
            type="button"
            onClick={handleResetToDefault}
            className="variable-card-example-btn"
            title={t.clickToResetAttr}
          >
            {t.examplePrefix} <span className="example-val">{example}</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
