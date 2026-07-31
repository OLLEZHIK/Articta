"use client";

import { Variable } from "@/types/variable";
import { VariableCardInput } from "./VariableCardInput";
import { InlineResult } from "./InlineResult";
import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/i18n";

interface ClosingFeesGridProps {
  variables: Record<string, Variable>;
  results: Record<string, number>;
  onUpdateVariable: (id: string, value: number) => void;
  onStartComparing?: () => void;
  onStopComparing?: () => void;
  isComparing?: boolean;
}

export function ClosingFeesGrid({
  variables,
  results,
  onUpdateVariable,
  onStartComparing,
  onStopComparing,
  isComparing,
}: ClosingFeesGridProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const oneTimeTotal = results.oneTimeExpenses ?? 810;

  const valuationVar = variables.valuationFee;
  const cadastreVar = variables.cadastreFee;
  const registrationVar = variables.registrationFee;
  const signatureVar = variables.signatureFee;
  const bankCommVar = variables.bankCommission;

  return (
    <div className="step-fees-container">
      {/* 5 Standard Input Cards in 1 Row */}
      <div className="step-fees-cards-row">
        {/* Card 1: Valuation */}
        {valuationVar && (
          <div data-variable-id="valuationFee">
            <VariableCardInput
              variable={valuationVar}
              onUpdate={onUpdateVariable}
              onStartComparing={onStartComparing}
              onStopComparing={onStopComparing}
              isComparing={isComparing}
            />
          </div>
        )}

        {/* Card 2: Cadastre */}
        {cadastreVar && (
          <div data-variable-id="cadastreFee">
            <VariableCardInput
              variable={cadastreVar}
              onUpdate={onUpdateVariable}
              onStartComparing={onStartComparing}
              onStopComparing={onStopComparing}
              isComparing={isComparing}
            />
          </div>
        )}

        {/* Card 3: Registration */}
        {registrationVar && (
          <div data-variable-id="registrationFee">
            <VariableCardInput
              variable={registrationVar}
              onUpdate={onUpdateVariable}
              onStartComparing={onStartComparing}
              onStopComparing={onStopComparing}
              isComparing={isComparing}
            />
          </div>
        )}

        {/* Card 4: Notary / Signature */}
        {signatureVar && (
          <div data-variable-id="signatureFee">
            <VariableCardInput
              variable={signatureVar}
              onUpdate={onUpdateVariable}
              onStartComparing={onStartComparing}
              onStopComparing={onStopComparing}
              isComparing={isComparing}
            />
          </div>
        )}

        {/* Card 5: Bank Commission */}
        {bankCommVar && (
          <div data-variable-id="bankCommission">
            <VariableCardInput
              variable={bankCommVar}
              onUpdate={onUpdateVariable}
              onStartComparing={onStartComparing}
              onStopComparing={onStopComparing}
              isComparing={isComparing}
            />
          </div>
        )}
      </div>

      {/* Standard Result Block Underneath */}
      <div className="article-result-block step-fees-total-result">
        <span className="article-result-label">
          {language === "sk"
            ? "Celkové jednorazové poplatky pri kúpe"
            : language === "en"
            ? "Total One-time Closing Fees"
            : "Общие разовые расходы на оформление"}
        </span>
        <InlineResult value={oneTimeTotal} label="Total One-time Closing Fees" />
      </div>
    </div>
  );
}
