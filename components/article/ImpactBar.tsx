"use client";

import { Variable } from "@/types/variable";
import { formatResult } from "@/lib/formatValue";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

interface ImpactBarProps {
  variables: Record<string, Variable>;
  results: Record<string, number>;
  defaultResults: Record<string, number>;
  onResetAll: () => void;
  onOpenReport: () => void;
}

export function ImpactBar({
  variables,
  results,
  defaultResults,
  onResetAll,
  onOpenReport,
}: ImpactBarProps) {
  const varList = Object.values(variables);
  const modifiedCount = varList.filter((v) => v.value !== v.defaultValue).length;

  const currentEbitda = results.ebitda ?? 0;
  const defaultEbitda = defaultResults.ebitda ?? 0;
  const ebitdaDiff = currentEbitda - defaultEbitda;

  const currentMarketCap = results.impliedMarketCap ?? 0;
  const defaultMarketCap = defaultResults.impliedMarketCap ?? 0;
  const marketCapDiff = currentMarketCap - defaultMarketCap;

  const animEbitdaDiff = useAnimatedNumber(ebitdaDiff, 400);
  const animMarketCapDiff = useAnimatedNumber(marketCapDiff, 400);

  if (modifiedCount === 0) return null;

  const formatDiff = (diff: number) => {
    const formatted = formatResult(Math.abs(diff));
    if (diff > 0) return `+$${formatted}B`;
    if (diff < 0) return `-$${formatted}B`;
    return `$0`;
  };

  return (
    <div className="impact-bar-floating">
      <div className="impact-bar-content">
        <div className="impact-bar-badge">
          <span className="impact-dot" />
          <span>{modifiedCount} parameter{modifiedCount > 1 ? "s" : ""} changed</span>
        </div>

        <div className="impact-bar-metrics">
          <div className="impact-metric-item">
            <span className="impact-metric-label">EBITDA Impact:</span>
            <span
              className={`impact-metric-value ${
                ebitdaDiff > 0 ? "positive" : ebitdaDiff < 0 ? "negative" : ""
              }`}
            >
              {formatDiff(animEbitdaDiff)}
            </span>
          </div>

          <div className="impact-metric-divider" />

          <div className="impact-metric-item">
            <span className="impact-metric-label">Market Cap Impact:</span>
            <span
              className={`impact-metric-value ${
                marketCapDiff > 0 ? "positive" : marketCapDiff < 0 ? "negative" : ""
              }`}
            >
              {formatDiff(animMarketCapDiff)}
            </span>
          </div>
        </div>

        <div className="impact-bar-actions">
          <button onClick={onResetAll} className="impact-reset-btn">
            Reset
          </button>
          <button onClick={onOpenReport} className="impact-report-btn">
            View Report →
          </button>
        </div>
      </div>
    </div>
  );
}
