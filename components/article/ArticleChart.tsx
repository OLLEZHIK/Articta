"use client";

import { ChartBar } from "@/types/block";
import { formatResult } from "@/lib/formatValue";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

interface ArticleChartProps {
  title: string;
  bars: ChartBar[];
  results: Record<string, number>;
}

function AnimatedBar({
  bar,
  value,
  maxValue,
}: {
  bar: ChartBar;
  value: number;
  maxValue: number;
}) {
  const animatedValue = useAnimatedNumber(value, 500);
  const percentage = maxValue > 0 ? (animatedValue / maxValue) * 100 : 0;

  return (
    <div className="article-chart__bar-group">
      <div className="article-chart__bar-label">{bar.label}</div>
      <div className="article-chart__bar-track">
        <div
          className="article-chart__bar-fill"
          style={{
            width: `${Math.max(percentage, 2)}%`,
            backgroundColor: bar.color,
          }}
        />
      </div>
      <div className="article-chart__bar-value">
        {formatResult(animatedValue)}
      </div>
    </div>
  );
}

export function ArticleChart({ title, bars, results }: ArticleChartProps) {
  const values = bars.map((bar) => results[bar.resultId] ?? 0);
  const maxValue = Math.max(...values, 1);

  return (
    <div className="article-chart">
      <div className="article-chart__title">{title}</div>
      <div className="article-chart__bars">
        {bars.map((bar, index) => (
          <AnimatedBar
            key={bar.resultId}
            bar={bar}
            value={values[index]}
            maxValue={maxValue}
          />
        ))}
      </div>
    </div>
  );
}
