"use client";

import { useState } from "react";
import { formatResult } from "@/lib/formatValue";
import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/i18n";

interface RoiGrowthChartProps {
  results: Record<string, number>;
}

export function RoiGrowthChart({ results }: RoiGrowthChartProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const [activeMetric, setActiveMetric] = useState<"netProfit" | "totalCash">("netProfit");
  const [hoveredYearIndex, setHoveredYearIndex] = useState<number | null>(null);

  // Extract base values from results
  const propertyPrice = results.loanAmount ? results.loanAmount + results.downPayment : 160000;
  const loanAmount = results.loanAmount ?? 144000;
  const downPayment = results.downPayment ?? 160000;
  const initialEquity = results.initialEquityInvested ?? 17810;
  const totalAllOutPocket5y = results.totalAllOutPocket5y ?? 80539;

  // Monthly mortgage & expenses
  const monthlyExpenses = results.totalMonthlyExpenses ?? 1045.48;
  const rentIncome5y = results.totalRentIncome5y ?? 45000;
  const taxRefund5y = results.taxRefund5y ?? 6000;

  // Scenarios
  const badNetProfit5y = results.badNetProfit ?? 25341;
  const baseNetProfit5y = results.baseNetProfit ?? 48077;
  const goodNetProfit5y = results.goodNetProfit ?? 73097;

  const badPrice5y = results.badPrice5y ?? 176692;
  const basePrice5y = results.basePrice5y ?? 199389;
  const goodPrice5y = results.goodPrice5y ?? 224408;

  const remainingLoanBalance5y = results.remainingLoanBalance ?? 127814;

  // Build 6 data points (Year 0, 1, 2, 3, 4, 5)
  const years = [0, 1, 2, 3, 4, 5];

  const dataPoints = years.map((y) => {
    const ratio = y / 5;

    // Linear/compound approximations for intermediate years 1..4 based on 5y calculations
    const badProfit = y === 0 ? 0 : Math.round(badNetProfit5y * (ratio * 0.7 + Math.pow(ratio, 1.8) * 0.3));
    const baseProfit = y === 0 ? 0 : Math.round(baseNetProfit5y * (ratio * 0.65 + Math.pow(ratio, 1.7) * 0.35));
    const goodProfit = y === 0 ? 0 : Math.round(goodNetProfit5y * (ratio * 0.6 + Math.pow(ratio, 1.6) * 0.4));

    const badCash = y === 0 ? initialEquity : Math.round(initialEquity + (badPrice5y - remainingLoanBalance5y - initialEquity + rentIncome5y + taxRefund5y) * ratio);
    const baseCash = y === 0 ? initialEquity : Math.round(initialEquity + (basePrice5y - remainingLoanBalance5y - initialEquity + rentIncome5y + taxRefund5y) * ratio);
    const goodCash = y === 0 ? initialEquity : Math.round(initialEquity + (goodPrice5y - remainingLoanBalance5y - initialEquity + rentIncome5y + taxRefund5y) * ratio);

    return {
      year: y,
      yearLabel: y === 0 ? (language === "sk" ? "Kúpa" : language === "en" ? "Year 0" : "Покупка") : `${y} ${language === "sk" ? "rok" : language === "en" ? "yr" : "год"}`,
      badProfit,
      baseProfit,
      goodProfit,
      badCash,
      baseCash,
      goodCash,
    };
  });

  // Determine max Y for scaling
  const allValues = dataPoints.flatMap((d) =>
    activeMetric === "netProfit"
      ? [d.badProfit, d.baseProfit, d.goodProfit]
      : [d.badCash, d.baseCash, d.goodCash]
  );
  const maxValue = Math.max(...allValues, 1000);
  const chartHeight = 240;
  const chartWidth = 750;
  const paddingLeft = 65;
  const paddingRight = 75;
  const paddingY = 30;

  const getX = (index: number) => paddingLeft + (index / (years.length - 1)) * (chartWidth - paddingLeft - paddingRight);
  const getY = (val: number) => chartHeight - paddingY - (val / maxValue) * (chartHeight - paddingY * 2);

  // SVG Paths
  const buildPath = (key: "badProfit" | "baseProfit" | "goodProfit" | "badCash" | "baseCash" | "goodCash") => {
    return dataPoints
      .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d[key])}`)
      .join(" ");
  };

  const badPath = buildPath(activeMetric === "netProfit" ? "badProfit" : "badCash");
  const basePath = buildPath(activeMetric === "netProfit" ? "baseProfit" : "baseCash");
  const goodPath = buildPath(activeMetric === "netProfit" ? "goodProfit" : "goodCash");

  const hoveredData = hoveredYearIndex !== null ? dataPoints[hoveredYearIndex] : null;

  const getTooltipStyle = (index: number) => {
    if (index >= 4) {
      return {
        right: `${((5 - index) / 5) * 60 + 5}%`,
        left: "auto",
      };
    }
    return {
      left: `${(index / 5) * 55 + 12}%`,
      right: "auto",
    };
  };

  return (
    <div className="roi-chart-card">
      {/* Header & Controls */}
      <div className="roi-chart-header">
        <div>
          <h3 className="roi-chart-title">
            📈 {language === "sk"
              ? "Dynamika zisku a kapitálu po rokoch (€)"
              : language === "en"
              ? "5-Year Profit & Capital Growth (€)"
              : "Динамика прибыли и капитала по годам (€)"}
          </h3>
          <p className="roi-chart-subtitle">
            {language === "sk"
              ? "Porovnanie 3 scenárov rastu cien nehnuteľnosti v eurách"
              : language === "en"
              ? "Comparison of 3 capital appreciation scenarios in Euros"
              : "Сравнение 3 сценариев роста стоимости недвижимости в евро"}
          </p>
        </div>

        {/* Metric Switcher */}
        <div className="roi-chart-tabs">
          <button
            type="button"
            onClick={() => setActiveMetric("netProfit")}
            className={`roi-tab-btn ${activeMetric === "netProfit" ? "active" : ""}`}
          >
            {language === "sk" ? "Чистый zisk (€)" : language === "en" ? "Net Profit (€)" : "Чистая прибыль (€)"}
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric("totalCash")}
            className={`roi-tab-btn ${activeMetric === "totalCash" ? "active" : ""}`}
          >
            {language === "sk" ? "Celkový kapitál (€)" : language === "en" ? "Total Capital (€)" : "Общий капитал (€)"}
          </button>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="roi-chart-canvas-wrapper">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="roi-chart-svg">
          <defs>
            <linearGradient id="goodGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const val = Math.round(maxValue * ratio);
            const yPos = getY(val);
            return (
              <g key={i}>
                <line
                  x1={paddingLeft}
                  y1={yPos}
                  x2={chartWidth - paddingRight}
                  y2={yPos}
                  stroke="rgba(255, 255, 255, 0.07)"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 10}
                  y={yPos + 4}
                  textAnchor="end"
                  className="roi-axis-label"
                >
                  €{val >= 1000 ? `${Math.round(val / 1000)}k` : val}
                </text>
              </g>
            );
          })}

          {/* Area fills */}
          <path
            d={`${goodPath} L ${getX(5)} ${getY(0)} L ${getX(0)} ${getY(0)} Z`}
            fill="url(#goodGrad)"
          />

          {/* Trend lines */}
          <path d={badPath} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 3" />
          <path d={basePath} fill="none" stroke="#3b82f6" strokeWidth="3" />
          <path d={goodPath} fill="none" stroke="#10b981" strokeWidth="3.5" />

          {/* Data Points & Vertical Hover Guide */}
          {years.map((y, i) => {
            const xPos = getX(i);
            const isHovered = hoveredYearIndex === i;
            const badVal = activeMetric === "netProfit" ? dataPoints[i].badProfit : dataPoints[i].badCash;
            const baseVal = activeMetric === "netProfit" ? dataPoints[i].baseProfit : dataPoints[i].baseCash;
            const goodVal = activeMetric === "netProfit" ? dataPoints[i].goodProfit : dataPoints[i].goodCash;

            return (
              <g key={y} onMouseEnter={() => setHoveredYearIndex(i)} onMouseLeave={() => setHoveredYearIndex(null)}>
                {/* Vertical hover bar */}
                <rect
                  x={xPos - 25}
                  y={0}
                  width={50}
                  height={chartHeight}
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                />

                {isHovered && (
                  <line
                    x1={xPos}
                    y1={paddingY}
                    x2={xPos}
                    y2={chartHeight - paddingY}
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Circles for Bad, Base, Good */}
                <circle cx={xPos} cy={getY(badVal)} r={isHovered ? 6 : 4} fill="#131c31" stroke="#f59e0b" strokeWidth="2.5" />
                <circle cx={xPos} cy={getY(baseVal)} r={isHovered ? 6 : 4} fill="#131c31" stroke="#3b82f6" strokeWidth="2.5" />
                <circle cx={xPos} cy={getY(goodVal)} r={isHovered ? 7 : 4.5} fill="#131c31" stroke="#10b981" strokeWidth="3" />

                {/* X-axis labels */}
                <text
                  x={xPos}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  className={`roi-x-label ${isHovered ? "active" : ""}`}
                >
                  {dataPoints[i].yearLabel}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredData && (
          <div
            className="roi-chart-tooltip"
            style={getTooltipStyle(hoveredYearIndex!)}
          >
            <div className="tooltip-title">{hoveredData.yearLabel}</div>
            <div className="tooltip-row good">
              <span>{t.scenarioGood}:</span>
              <strong>€{formatResult(activeMetric === "netProfit" ? hoveredData.goodProfit : hoveredData.goodCash)}</strong>
            </div>
            <div className="tooltip-row base">
              <span>{t.scenarioBase}:</span>
              <strong>€{formatResult(activeMetric === "netProfit" ? hoveredData.baseProfit : hoveredData.baseCash)}</strong>
            </div>
            <div className="tooltip-row bad">
              <span>{t.scenarioBad}:</span>
              <strong>€{formatResult(activeMetric === "netProfit" ? hoveredData.badProfit : hoveredData.badCash)}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Legend Footer */}
      <div className="roi-chart-legend">
        <div className="legend-item bad">
          <span className="legend-dot bad" />
          <span>{t.scenarioBad} (+{results.growthBad ?? 2}%/yr)</span>
        </div>
        <div className="legend-item base">
          <span className="legend-dot base" />
          <span>{t.scenarioBase} (+{results.growthBase ?? 4.5}%/yr)</span>
        </div>
        <div className="legend-item good">
          <span className="legend-dot good" />
          <span>{t.scenarioGood} (+{results.growthGood ?? 7}%/yr)</span>
        </div>
      </div>
    </div>
  );
}
