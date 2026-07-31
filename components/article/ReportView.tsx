"use client";

import { Variable } from "@/types/variable";
import { formatValue, formatResult } from "@/lib/formatValue";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation, getLocalizedVariables } from "@/lib/i18n";
import { RoiGrowthChart } from "./RoiGrowthChart";

interface ReportViewProps {
  title: string;
  articleSlug: string;
  variables: Record<string, Variable>;
  results: Record<string, number>;
  onUpdateVariable: (id: string, value: number) => void;
  onResetAll: () => void;
}

function EditableRow({
  variable,
  onUpdate,
}: {
  variable: Variable;
  onUpdate: (id: string, value: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputVal, setInputVal] = useState(String(variable.value));

  useEffect(() => {
    setInputVal(String(variable.value));
  }, [variable.value]);

  const commit = () => {
    const parsed = parseFloat(inputVal);
    if (!isNaN(parsed)) {
      onUpdate(variable.id, parsed);
    } else {
      setInputVal(String(variable.value));
    }
    setIsEditing(false);
  };

  const getSuffix = () => {
    if (variable.type === "percent") return "%";
    if (variable.type === "currency") return "€";
    return "";
  };

  return (
    <div className="report-table-row">
      <span className="report-table-label">{variable.label}</span>
      {!isEditing ? (
        <span
          onClick={() => setIsEditing(true)}
          className="report-table-val editable"
          title="Click to edit value"
        >
          {formatValue(variable.value, variable.type)} <span className="no-print">✏️</span>
        </span>
      ) : (
        <div className="report-inline-edit">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") {
                setInputVal(String(variable.value));
                setIsEditing(false);
              }
            }}
            autoFocus
            className="report-table-input"
          />
          <span className="report-edit-affix">{getSuffix()}</span>
        </div>
      )}
    </div>
  );
}

export function ReportView({
  title,
  articleSlug,
  variables,
  results,
  onUpdateVariable,
  onResetAll,
}: ReportViewProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);

  // Localize variable labels live
  const localizedVariables = getLocalizedVariables(variables, language);

  const now = new Date();
  const dateString = now.toLocaleDateString(
    language === "sk" ? "sk-SK" : language === "en" ? "en-US" : "ru-RU",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const varList = Object.values(localizedVariables);
  const halfLength = Math.ceil(varList.length / 2);
  const col1Vars = varList.slice(0, halfLength);
  const col2Vars = varList.slice(halfLength);

  const roiVal = results.baseRoiTotalPostTax ?? 59.7;
  const netProfitVal = results.baseNetProfit ?? 48077;
  const monthlyCashVal = results.monthlyNetCashFlowYear1 ?? 54.52;
  const equityPaidVal = results.principalPaid5y ?? 16186;

  // Investment Feasibility Verdict Badge
  const getVerdict = () => {
    if (roiVal >= 30) {
      return {
        badgeClass: "verdict-high",
        icon: "🚀",
        text: language === "sk"
          ? "Vysoká investičná atraktivita (ROI > 30%)"
          : language === "en"
          ? "High Investment Feasibility (ROI > 30%)"
          : "Высокая инвестиционная привлекательность (ROI > 30%)",
        desc: language === "sk"
          ? "Projekt vykazuje vynikajúci výnos vďaka efektívnemu pákovému efektu hypotéky a stabilnému nájomnému."
          : language === "en"
          ? "The project yields exceptional return due to mortgage leverage efficiency and stable rental income."
          : "Проект показывает отличную доходность благодаря эффекту кредитного плеча и стабильному арендному потоку.",
      };
    }
    if (roiVal >= 15) {
      return {
        badgeClass: "verdict-moderate",
        icon: "📊",
        text: language === "sk"
          ? "Mierny investičný potenciál (ROI 15–30%)"
          : language === "en"
          ? "Moderate Return Potential (ROI 15–30%)"
          : "Умеренный инвестиционный потенциал (ROI 15–30%)",
        desc: language === "sk"
          ? "Aktívum vykazuje stabilný výnos s miernym rizikom a postupnou akumuláciou kapitálu."
          : language === "en"
          ? "Asset yields stable return with moderate risk and steady capital accumulation."
          : "Актив показывает стабильную доходность с умеренным риском и постепенным накоплением капитала.",
      };
    }
    return {
      badgeClass: "verdict-conservative",
      icon: "🛡️",
      text: language === "sk"
        ? "Konzervatívny scenár (ROI < 15%)"
        : language === "en"
        ? "Conservative Scenario (ROI < 15%)"
        : "Консервативный сценарий (ROI < 15%)",
      desc: language === "sk"
        ? "Ochrana kapitálu pred infláciou s minimálnym rizikom."
        : language === "en"
        ? "Capital protection against inflation with low risk."
        : "Защита капитала от инфляции с минимальным риском.",
    };
  };

  const verdict = getVerdict();

  const buildShareUrl = () => {
    const params = new URLSearchParams();
    params.set("lang", language);
    for (const v of varList) {
      params.set(v.id, String(v.value));
    }
    return `${window.location.origin}/articles/${articleSlug}/report?${params.toString()}`;
  };

  return (
    <div className="report-page">
      {/* ──────────────── PAGE 1: HEADER & MODEL INPUT PARAMETERS ──────────────── */}
      <div className="report-print-page print-page-1">
        {/* Report Header */}
        <header className="report-header">
          <div className="report-brand">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="report-brand-name">Articta Research</span>
          </div>
          <div className="report-meta">
            <span>{t.generatedAt} {dateString}</span>
          </div>
        </header>

        {/* Title */}
        <h1 className="report-title">{title}</h1>
        <p className="report-subtitle">{t.reportSubtitle}</p>

        {/* Section 1: Input Parameters at the VERY BEGINNING */}
        <section className="report-section" style={{ marginTop: "1rem" }}>
          <h2 className="report-section-title">{t.inputParamsTitle}</h2>
          <p className="report-section-desc">{t.clickToEditDesc}</p>
          <div className="report-table-2col">
            <div className="report-table col-half">
              <div className="report-table-header">
                <span>{t.parameterHeader}</span>
                <span>{t.valueHeader}</span>
              </div>
              {col1Vars.map((v) => (
                <EditableRow key={v.id} variable={v} onUpdate={onUpdateVariable} />
              ))}
            </div>

            <div className="report-table col-half">
              <div className="report-table-header">
                <span>{t.parameterHeader}</span>
                <span>{t.valueHeader}</span>
              </div>
              {col2Vars.map((v) => (
                <EditableRow key={v.id} variable={v} onUpdate={onUpdateVariable} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ──────────────── PAGE 2: FINANCIAL ANALYSIS, VERDICT & KPIs ──────────────── */}
      <div className="report-print-page print-page-2">
        {/* Decision Feasibility Verdict Banner */}
        <div className={`report-verdict-banner ${verdict.badgeClass}`}>
          <div className="verdict-header">
            <span className="verdict-icon">{verdict.icon}</span>
            <span className="verdict-title">{verdict.text}</span>
          </div>
          <p className="verdict-desc">{verdict.desc}</p>
        </div>

        {/* Summary KPI Cards */}
        <section className="report-section">
          <h2 className="report-section-title">{t.keyMetricsTitle}</h2>
          <div className="report-results-grid">
            <div className="report-result-card profit-card">
              <div className="report-result-label">{t.netProfitBase}</div>
              <div className="report-result-value highlight green">
                €{formatResult(netProfitVal)}
              </div>
              <span className="report-kpi-sub">5-Year Cumulative Net Profit</span>
            </div>

            <div className="report-result-card roi-card">
              <div className="report-result-label">{t.roiTotalEquityLabel}</div>
              <div className="report-result-value highlight blue">
                {formatResult(roiVal)}%
              </div>
              <span className="report-kpi-sub">Post-Tax Total ROI</span>
            </div>

            <div className="report-result-card cash-card">
              <div className="report-result-label">{t.monthlyCashFlowLabel}</div>
              <div className="report-result-value">
                {monthlyCashVal >= 0 ? "+" : ""}€{formatResult(monthlyCashVal)}/
                {language === "sk" ? "mes" : language === "en" ? "mo" : "мес"}
              </div>
              <span className="report-kpi-sub">Year 1 Net Operating Cash Flow</span>
            </div>

            <div className="report-result-card equity-card">
              <div className="report-result-label">{t.accumulatedEquity}</div>
              <div className="report-result-value">€{formatResult(equityPaidVal)}</div>
              <span className="report-kpi-sub">Mortgage Principal Paid Off</span>
            </div>
          </div>
        </section>

        {/* Decision Summary Takeaway Box */}
        <div className="report-decision-takeaway">
          <h3 className="takeaway-title">
            💡{" "}
            {language === "sk"
              ? "Zhrnutie pre rozhodovanie"
              : language === "en"
              ? "Executive Decision Takeaway"
              : "Итоговое резюме для принятия решения"}
          </h3>
          <p className="takeaway-text">
            {language === "sk"
              ? `Pri počiatočnom vklade €${formatResult(
                  results.initialEquityInvested ?? 17810
                )} a celkových výdavkoch €${formatResult(
                  results.totalAllOutPocket5y ?? 80539
                )} za 5 rokov projekt generuje čistý zisk €${formatResult(
                  netProfitVal
                )} v základnom scenári (+4.5%/rok). Zároveň sa v nehnuteľnosti akumuluje €${formatResult(
                  equityPaidVal
                )} splatenej istiny.`
              : language === "en"
              ? `With an initial capital outlay of €${formatResult(
                  results.initialEquityInvested ?? 17810
                )} and total 5-year investment of €${formatResult(
                  results.totalAllOutPocket5y ?? 80539
                )}, the project yields €${formatResult(
                  netProfitVal
                )} in net profit under the base case (+4.5%/yr), while building €${formatResult(
                  equityPaidVal
                )} in principal home equity.`
              : `При первоначальном вложении €${formatResult(
                  results.initialEquityInvested ?? 17810
                )} и общих затратах €${formatResult(
                  results.totalAllOutPocket5y ?? 80539
                )} за 5 лет проект генерирует чистую прибыль €${formatResult(
                  netProfitVal
                )} в базовом сценарии (+4.5%/год). Одновременно в объекте аккумулируется €${formatResult(
                  equityPaidVal
                )} выплаченного тела кредита.`}
          </p>
        </div>
      </div>

      {/* ──────────────── PAGE 3: CHART, SCENARIOS & FOOTER ──────────────── */}
      <div className="report-print-page print-page-3">
        {/* 5-Year Dynamic Euro ROI Chart */}
        <section className="report-section">
          <h2 className="report-section-title">
            {language === "sk"
              ? "Dynamika rastu kapitálu za 5 rokov"
              : language === "en"
              ? "5-Year Capital Growth Dynamics"
              : "Динамика роста капитала за 5 лет"}
          </h2>
          <RoiGrowthChart results={results} />
        </section>

        {/* Scenario Table Breakdown */}
        <section className="report-section" style={{ marginTop: "1.25rem" }}>
          <h2 className="report-section-title">{t.scenario3Title}</h2>
          <div className="scenario-table-wrapper" style={{ marginTop: "0.5rem" }}>
            <table className="scenario-table">
              <thead>
                <tr>
                  <th className="cell-metric">{t.itemIncomeExpenseHeader}</th>
                  <th className="cell-scenario bad">
                    {t.scenarioBad} (+{results.growthBad ?? 2}%)
                  </th>
                  <th className="cell-scenario base">
                    {t.scenarioBase} (+{results.growthBase ?? 4.5}%)
                  </th>
                  <th className="cell-scenario good">
                    {t.scenarioGood} (+{results.growthGood ?? 7}%)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="cell-metric">{t.salePrice5y}</td>
                  <td className="nowrap">€{formatResult(results.badPrice5y ?? 0)}</td>
                  <td className="nowrap">€{formatResult(results.basePrice5y ?? 0)}</td>
                  <td className="nowrap">€{formatResult(results.goodPrice5y ?? 0)}</td>
                </tr>
                <tr>
                  <td className="cell-metric">{t.loanBalancePayoff}</td>
                  <td className="negative nowrap">
                    −€{formatResult(results.remainingLoanBalance ?? 0)}
                  </td>
                  <td className="negative nowrap">
                    −€{formatResult(results.remainingLoanBalance ?? 0)}
                  </td>
                  <td className="negative nowrap">
                    −€{formatResult(results.remainingLoanBalance ?? 0)}
                  </td>
                </tr>
                <tr className="row-total-inflow">
                  <td className="cell-metric">{t.netProceedsOnSale}</td>
                  <td className="positive nowrap">
                    €
                    {formatResult(
                      (results.badPrice5y ?? 0) -
                        (results.remainingLoanBalance ?? 0)
                    )}
                  </td>
                  <td className="positive nowrap">
                    €
                    {formatResult(
                      (results.basePrice5y ?? 0) -
                        (results.remainingLoanBalance ?? 0)
                    )}
                  </td>
                  <td className="positive nowrap">
                    €
                    {formatResult(
                      (results.goodPrice5y ?? 0) -
                        (results.remainingLoanBalance ?? 0)
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="cell-metric">{t.rentIncome5y}</td>
                  <td className="positive nowrap">
                    +€{formatResult(results.totalRentIncome5y ?? 0)}
                  </td>
                  <td className="positive nowrap">
                    +€{formatResult(results.totalRentIncome5y ?? 0)}
                  </td>
                  <td className="positive nowrap">
                    +€{formatResult(results.totalRentIncome5y ?? 0)}
                  </td>
                </tr>
                <tr>
                  <td className="cell-metric">{t.taxRefund5y}</td>
                  <td className="positive nowrap">
                    +€{formatResult(results.taxRefund5y ?? 0)}
                  </td>
                  <td className="positive nowrap">
                    +€{formatResult(results.taxRefund5y ?? 0)}
                  </td>
                  <td className="positive nowrap">
                    +€{formatResult(results.taxRefund5y ?? 0)}
                  </td>
                </tr>
                <tr className="row-total-outflow">
                  <td className="cell-metric">{t.totalInvested}</td>
                  <td className="negative nowrap">
                    −€{formatResult(results.totalAllOutPocket5y ?? 0)}
                  </td>
                  <td className="negative nowrap">
                    −€{formatResult(results.totalAllOutPocket5y ?? 0)}
                  </td>
                  <td className="negative nowrap">
                    −€{formatResult(results.totalAllOutPocket5y ?? 0)}
                  </td>
                </tr>
                <tr className="row-profit">
                  <td className="cell-metric">{t.netProfit}</td>
                  <td
                    className={
                      (results.badNetProfit ?? 0) < 0
                        ? "negative nowrap"
                        : "positive nowrap"
                    }
                  >
                    €{formatResult(results.badNetProfit ?? 0)}
                  </td>
                  <td
                    className={
                      (results.baseNetProfit ?? 0) < 0
                        ? "negative nowrap"
                        : "positive nowrap"
                    }
                  >
                    €{formatResult(results.baseNetProfit ?? 0)}
                  </td>
                  <td
                    className={
                      (results.goodNetProfit ?? 0) < 0
                        ? "negative nowrap"
                        : "positive nowrap"
                    }
                  >
                    €{formatResult(results.goodNetProfit ?? 0)}
                  </td>
                </tr>
                <tr className="row-roi row-roi-total">
                  <td className="cell-metric">{t.roiTotalPostTax}</td>
                  <td
                    className={
                      (results.badRoiTotalPostTax ?? 0) < 0
                        ? "negative nowrap"
                        : "positive nowrap"
                    }
                  >
                    {formatResult(results.badRoiTotalPostTax ?? 0)}%
                  </td>
                  <td
                    className={
                      (results.baseRoiTotalPostTax ?? 0) < 0
                        ? "negative nowrap"
                        : "positive nowrap"
                    }
                  >
                    {formatResult(results.baseRoiTotalPostTax ?? 0)}%
                  </td>
                  <td
                    className={
                      (results.goodRoiTotalPostTax ?? 0) < 0
                        ? "negative nowrap"
                        : "positive nowrap"
                    }
                  >
                    {formatResult(results.goodRoiTotalPostTax ?? 0)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <footer className="report-footer">
          <p>
            {language === "sk"
              ? "Správa bola vygenerovaná platformou Articta — interaktívna analytika finančno-vzdelávacích štúdií."
              : language === "en"
              ? "Report generated by Articta — interactive analytics for financial and educational research."
              : "Отчет сформирован платформой Articta — интерактивная аналитика финансово-образовательных исследований."}
          </p>
          <p className="report-footer-url">articta.com/articles/{articleSlug}</p>
        </footer>
      </div>

      {/* Action Bar (hidden when printing) */}
      <div className="report-actions no-print">
        <button onClick={() => window.print()} className="report-download-btn">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          {t.downloadPdf}
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(buildShareUrl());
            alert(t.copied);
          }}
          className="report-share-btn"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          {t.copyShareLink}
        </button>
        <button onClick={onResetAll} className="report-reset-btn">
          {t.resetToDefault}
        </button>
      </div>
    </div>
  );
}
