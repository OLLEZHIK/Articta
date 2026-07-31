"use client";

import { useSearchParams, useParams } from "next/navigation";
import { Suspense, useState, useMemo, useCallback, useEffect } from "react";
import { articlesMap, bratislavaArticle } from "@/content";
import { ReportView } from "@/components/article/ReportView";
import { Variable } from "@/types/variable";
import { useLanguage } from "@/components/LanguageProvider";
import { Language } from "@/types/language";

function DynamicReportContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const { language, setLanguage } = useLanguage();
  const slug = (params?.slug as string) || "bratislava";

  const langParam = (searchParams.get("lang") as Language) || language || "ru";

  // Sync site language with URL lang parameter on initial load
  useEffect(() => {
    if (langParam && (langParam === "ru" || langParam === "sk" || langParam === "en")) {
      setLanguage(langParam);
    }
  }, [langParam, setLanguage]);

  const article = articlesMap[slug] || bratislavaArticle;

  const initialVariables = useMemo(() => {
    const vars: Record<string, Variable> = {};
    for (const [id, defaultVar] of Object.entries(article.variables)) {
      const paramValue = searchParams.get(id);
      const value =
        paramValue !== null ? parseFloat(paramValue) : defaultVar.value;
      vars[id] = {
        ...defaultVar,
        value: isNaN(value) ? defaultVar.value : value,
      };
    }
    return vars;
  }, [searchParams, article]);

  const [variables, setVariables] =
    useState<Record<string, Variable>>(initialVariables);

  const results = useMemo(() => article.model(variables), [article, variables]);

  const updateVariable = useCallback((id: string, value: number) => {
    setVariables((prev) => ({
      ...prev,
      [id]: { ...prev[id], value },
    }));
  }, []);

  const resetAll = useCallback(() => {
    setVariables(structuredClone(article.variables));
  }, [article]);

  const reportTitles: Record<string, string> = {
    ru: "Инвестиции в недвижимость в Братиславе. Финансово-аналитический отчёт за 5 лет",
    sk: "Investície do nehnuteľností v Bratislave. Finančno-analytická správa za 5 rokov",
    en: "Bratislava Real Estate Investment. 5-Year Executive Financial Analysis Report",
  };

  const title = reportTitles[langParam] || reportTitles.ru;

  return (
    <ReportView
      title={title}
      articleSlug={slug}
      variables={variables}
      results={results}
      onUpdateVariable={updateVariable}
      onResetAll={resetAll}
    />
  );
}

export default function ArticleReportPage() {
  return (
    <Suspense
      fallback={<div className="report-loading">Формирование отчета…</div>}
    >
      <DynamicReportContent />
    </Suspense>
  );
}
