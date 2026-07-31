"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo, useCallback } from "react";
import { bratislavaVariables } from "@/content/bratislava/variables";
import { bratislavaModel } from "@/content/bratislava/model";
import { ReportView } from "@/components/article/ReportView";
import { Variable } from "@/types/variable";

function ReportFallbackContent() {
  const searchParams = useSearchParams();

  const initialVariables = useMemo(() => {
    const vars: Record<string, Variable> = {};
    for (const [id, defaultVar] of Object.entries(bratislavaVariables)) {
      const paramValue = searchParams.get(id);
      const value =
        paramValue !== null ? parseFloat(paramValue) : defaultVar.value;
      vars[id] = {
        ...defaultVar,
        value: isNaN(value) ? defaultVar.value : value,
      };
    }
    return vars;
  }, [searchParams]);

  const [variables, setVariables] =
    useState<Record<string, Variable>>(initialVariables);

  const results = useMemo(() => bratislavaModel(variables), [variables]);

  const updateVariable = useCallback((id: string, value: number) => {
    setVariables((prev) => ({
      ...prev,
      [id]: { ...prev[id], value },
    }));
  }, []);

  const resetAll = useCallback(() => {
    setVariables(structuredClone(bratislavaVariables));
  }, []);

  return (
    <ReportView
      title="Инвестиции в недвижимость в Братиславе. Аналитический отчёт за 5 лет"
      articleSlug="bratislava"
      variables={variables}
      results={results}
      onUpdateVariable={updateVariable}
      onResetAll={resetAll}
    />
  );
}

export default function TeslaReportPage() {
  return (
    <Suspense
      fallback={<div className="report-loading">Формирование отчета…</div>}
    >
      <ReportFallbackContent />
    </Suspense>
  );
}
