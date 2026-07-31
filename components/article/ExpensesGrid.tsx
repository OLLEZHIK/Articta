"use client";

import { Variable } from "@/types/variable";
import { VariableCardInput } from "./VariableCardInput";
import { InlineResult } from "./InlineResult";
import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/i18n";
import { formatResult } from "@/lib/formatValue";

interface ExpensesGridProps {
  variables: Record<string, Variable>;
  results: Record<string, number>;
  onUpdateVariable: (id: string, value: number) => void;
  onStartComparing?: () => void;
  onStopComparing?: () => void;
  isComparing?: boolean;
}

export function ExpensesGrid({
  variables,
  results,
  onUpdateVariable,
  onStartComparing,
  onStopComparing,
  isComparing,
}: ExpensesGridProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const monthlyMortgage = results.monthlyMortgage ?? 670.98;
  const totalMonthlyExpenses = results.totalMonthlyExpenses ?? 940.98;

  const insuranceVar = variables.insuranceMonthly;
  const utilitiesVar = variables.utilitiesMonthly;
  const propertyTaxVar = variables.propertyTaxMonthly;

  return (
    <div className="step5-expenses-container">
      {/* 4 Standard Input/Result Cards in 1 Row */}
      <div className="step5-cards-row">
        {/* Card 1: Mortgage (Read-only Result Card with standard style) */}
        <div className="variable-card-input mortgage-result-card" data-variable-id="monthlyMortgage">
          <div className="variable-card-box">
            <label className="variable-card-label">
              {language === "sk"
                ? "Hypotekárna platba"
                : language === "en"
                ? "Mortgage Payment"
                : "Ипотечный платёж"}
            </label>
            <div className="variable-card-field">
              <input
                type="text"
                value={`€${formatResult(monthlyMortgage)}`}
                readOnly
                className="variable-card-native-input read-only-input"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Insurance (Standard VariableCardInput) */}
        {insuranceVar && (
          <div data-variable-id="insuranceMonthly">
            <VariableCardInput
              variable={insuranceVar}
              onUpdate={onUpdateVariable}
              onStartComparing={onStartComparing}
              onStopComparing={onStopComparing}
              isComparing={isComparing}
            />
          </div>
        )}

        {/* Card 3: Utilities (Standard VariableCardInput) */}
        {utilitiesVar && (
          <div data-variable-id="utilitiesMonthly">
            <VariableCardInput
              variable={utilitiesVar}
              onUpdate={onUpdateVariable}
              onStartComparing={onStartComparing}
              onStopComparing={onStopComparing}
              isComparing={isComparing}
            />
          </div>
        )}

        {/* Card 4: Property Tax (Standard VariableCardInput) */}
        {propertyTaxVar && (
          <div data-variable-id="propertyTaxMonthly">
            <VariableCardInput
              variable={propertyTaxVar}
              onUpdate={onUpdateVariable}
              onStartComparing={onStartComparing}
              onStopComparing={onStopComparing}
              isComparing={isComparing}
            />
          </div>
        )}
      </div>

      {/* Standard Result Block Underneath */}
      <div className="article-result-block step5-total-result">
        <span className="article-result-label">
          {language === "sk"
            ? "Celkové fixné mesačné výdavky"
            : language === "en"
            ? "Total Fixed Monthly Expenses"
            : "Общие фиксированные расходы в месяц"}
        </span>
        <InlineResult value={totalMonthlyExpenses} label="Total Fixed Monthly Expenses" />
      </div>
    </div>
  );
}
