"use client";

import { useState, useMemo, useCallback } from "react";
import { Article } from "@/types/article";
import { Variable } from "@/types/variable";

import { useLanguage } from "@/components/LanguageProvider";
import { getLocalizedVariables } from "@/lib/i18n";

export function useArticle(article: Article) {
  const { language } = useLanguage();

  const [variables, setVariables] = useState<Record<string, Variable>>(
    () => structuredClone(article.variables)
  );

  const [isComparing, setIsComparing] = useState(false);

  // Default author values for comparison
  const defaultVariables = useMemo(() => {
    const defaultVars: Record<string, Variable> = {};
    for (const [id, v] of Object.entries(article.variables)) {
      defaultVars[id] = {
        ...v,
        value: v.defaultValue,
      };
    }
    return defaultVars;
  }, [article]);

  const updateVariable = useCallback((id: string, value: number) => {
    setVariables((prev) => ({
      ...prev,
      [id]: { ...prev[id], value },
    }));
  }, []);

  const resetVariable = useCallback((id: string) => {
    setVariables((prev) => ({
      ...prev,
      [id]: { ...prev[id], value: prev[id].defaultValue },
    }));
  }, []);

  const resetAll = useCallback(() => {
    setVariables(structuredClone(article.variables));
  }, [article]);

  const startComparing = useCallback(() => {
    setIsComparing(true);
  }, []);

  const stopComparing = useCallback(() => {
    setIsComparing(false);
  }, []);

  const isModifiedFromDefault = useMemo(() => {
    return Object.values(variables).some((v) => v.value !== v.defaultValue);
  }, [variables]);

  const activeVariables = useMemo(() => {
    const vars = isComparing ? defaultVariables : variables;
    return getLocalizedVariables(vars, language);
  }, [isComparing, defaultVariables, variables, language]);

  const results = useMemo(
    () => article.model(activeVariables),
    [article, activeVariables]
  );

  return {
    variables: activeVariables,
    currentVariables: variables,
    defaultVariables,
    isComparing,
    hasHistory: isModifiedFromDefault,
    results,
    blocks: article.blocks,
    updateVariable,
    resetVariable,
    resetAll,
    startComparing,
    stopComparing,
  };
}
