"use client";

import { formatResult } from "@/lib/formatValue";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/i18n";
import { RoiGrowthChart } from "./RoiGrowthChart";

interface ScenarioTableProps {
  title: string;
  results: Record<string, number>;
}

export function ScenarioTable({ title, results }: ScenarioTableProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);

  // Mortgage & 5-Year Expenses Breakdown
  const principalPaid5y = useAnimatedNumber(results.principalPaid5y ?? 0, 400);
  const interestPaid5y = useAnimatedNumber(results.interestPaid5y ?? 0, 400);

  const monthlyNetCashFlowYear1 = useAnimatedNumber(
    results.monthlyNetCashFlowYear1 ?? 0,
    400
  );
  const total5yCashFlow = useAnimatedNumber(results.total5yCashFlow ?? 0, 400);

  const oneTimeExpenses = useAnimatedNumber(results.oneTimeExpenses ?? 0, 400);
  const renovationCost = useAnimatedNumber(results.renovationCost ?? 0, 400);

  const utilitiesAndInsurance5y = useAnimatedNumber(results.utilitiesAndInsurance5y ?? 0, 400);
  const rentalIncomeTax5y = useAnimatedNumber(results.rentalIncomeTax5y ?? 0, 400);

  const totalMonthlyExpenses5y = useAnimatedNumber(results.totalMonthlyExpenses5y ?? 0, 400);
  const totalAllOutPocket5y = useAnimatedNumber(results.totalAllOutPocket5y ?? 0, 400);

  // Scenarios
  const badPrice5y = useAnimatedNumber(results.badPrice5y ?? 0, 400);
  const basePrice5y = useAnimatedNumber(results.basePrice5y ?? 0, 400);
  const goodPrice5y = useAnimatedNumber(results.goodPrice5y ?? 0, 400);

  const remainingLoanBalance = useAnimatedNumber(results.remainingLoanBalance ?? 0, 400);

  const totalRentIncome5y = useAnimatedNumber(results.totalRentIncome5y ?? 0, 400);
  const taxRefund5y = useAnimatedNumber(results.taxRefund5y ?? 0, 400);

  // Net Proceeds on Sale after paying off remaining mortgage
  const badNetProceeds = badPrice5y - remainingLoanBalance;
  const baseNetProceeds = basePrice5y - remainingLoanBalance;
  const goodNetProceeds = goodPrice5y - remainingLoanBalance;

  // Total Cash Received (Sale Net Proceeds + Rent + Tax Refund)
  const badTotalCashReceived = badNetProceeds + totalRentIncome5y + taxRefund5y;
  const baseTotalCashReceived = baseNetProceeds + totalRentIncome5y + taxRefund5y;
  const goodTotalCashReceived = goodNetProceeds + totalRentIncome5y + taxRefund5y;

  const badNetProfit = useAnimatedNumber(results.badNetProfit ?? 0, 400);
  const baseNetProfit = useAnimatedNumber(results.baseNetProfit ?? 0, 400);
  const goodNetProfit = useAnimatedNumber(results.goodNetProfit ?? 0, 400);

  // 1) Initial Equity ROI (Pre-Tax & Post-Tax)
  const badRoiInitialPreTax = useAnimatedNumber(results.badRoiInitialPreTax ?? 0, 400);
  const baseRoiInitialPreTax = useAnimatedNumber(results.baseRoiInitialPreTax ?? 0, 400);
  const goodRoiInitialPreTax = useAnimatedNumber(results.goodRoiInitialPreTax ?? 0, 400);

  const badRoiInitialPostTax = useAnimatedNumber(results.badRoiInitialPostTax ?? 0, 400);
  const baseRoiInitialPostTax = useAnimatedNumber(results.baseRoiInitialPostTax ?? 0, 400);
  const goodRoiInitialPostTax = useAnimatedNumber(results.goodRoiInitialPostTax ?? 0, 400);

  // 2) Total Outlay ROI (Pre-Tax & Post-Tax)
  const badRoiTotalPreTax = useAnimatedNumber(results.badRoiTotalPreTax ?? 0, 400);
  const baseRoiTotalPreTax = useAnimatedNumber(results.baseRoiTotalPreTax ?? 0, 400);
  const goodRoiTotalPreTax = useAnimatedNumber(results.goodRoiTotalPreTax ?? 0, 400);

  const badRoiTotalPostTax = useAnimatedNumber(results.badRoiTotalPostTax ?? 0, 400);
  const baseRoiTotalPostTax = useAnimatedNumber(results.baseRoiTotalPostTax ?? 0, 400);
  const goodRoiTotalPostTax = useAnimatedNumber(results.goodRoiTotalPostTax ?? 0, 400);

  return (
    <div className="scenario-table-container">
      <div className="scenario-table-title">{title}</div>

      {/* Summary Breakdown Cards */}
      <div className="scenario-summary-breakdown">
        <div className="breakdown-box">
          <div className="breakdown-title">{t.monthlyCashFlowTitle}</div>
          <div className="breakdown-row">
            <span>{t.rentPlusBonus}</span>
            <span className="val highlight">+€{formatResult(results.monthlyCashInflowYear1 ?? 0)}</span>
          </div>
          <div className="breakdown-row">
            <span>{t.expensesPreTax}</span>
            <span className="val warning">−€{formatResult(results.totalMonthlyExpensesPreTax ?? 0)}</span>
          </div>

          {/* Pre-Tax Cash Flow */}
          <div className="breakdown-row">
            <span>{t.cashFlowPreTax}</span>
            <span
              className={`val ${
                (results.monthlyNetCashFlowPreTax ?? 0) >= 0 ? "highlight" : "warning"
              }`}
            >
              {(results.monthlyNetCashFlowPreTax ?? 0) >= 0 ? "+" : ""}€{formatResult(results.monthlyNetCashFlowPreTax ?? 0)}{language === "sk" ? "/mes" : language === "en" ? "/mo" : "/мес"}
            </span>
          </div>
          <div className="breakdown-row">
            <span>{t.rentalTaxMonthly}</span>
            <span className="val warning">−€{formatResult(results.rentalIncomeTaxMonthly ?? 0)}{language === "sk" ? "/mes" : language === "en" ? "/mo" : "/мес"}</span>
          </div>

          {/* Post-Tax Cash Flow */}
          <div className="breakdown-row">
            <span>{t.cashFlowPostTax}</span>
            <span
              className={`val ${
                monthlyNetCashFlowYear1 >= 0 ? "highlight" : "warning"
              }`}
            >
              {monthlyNetCashFlowYear1 >= 0 ? "+" : ""}€{formatResult(monthlyNetCashFlowYear1)}{language === "sk" ? "/mes" : language === "en" ? "/mo" : "/мес"}
            </span>
          </div>

          <div className="breakdown-row-divider" />

          {/* 5-Year Totals */}
          <div className="breakdown-row">
            <span>{t.cashFlow5yPreTax}</span>
            <span
              className={`val ${
                (results.total5yCashFlowPreTax ?? 0) >= 0 ? "highlight" : "warning"
              }`}
            >
              {(results.total5yCashFlowPreTax ?? 0) >= 0 ? "+" : ""}€{formatResult(results.total5yCashFlowPreTax ?? 0)}
            </span>
          </div>
          <div className="breakdown-row total">
            <span>{t.cashFlow5yPostTax}</span>
            <span
              className={`val ${
                total5yCashFlow >= 0 ? "highlight" : "warning"
              }`}
            >
              {total5yCashFlow >= 0 ? "+" : ""}€{formatResult(total5yCashFlow)}
            </span>
          </div>
        </div>

        <div className="breakdown-box">
          <div className="breakdown-title">{t.outOfPocketTitle}</div>
          <div className="breakdown-row">
            <span>{t.downPayment}</span>
            <span className="val">€{formatResult(results.downPayment ?? 0)}</span>
          </div>
          <div className="breakdown-row">
            <span>{t.closingFees}</span>
            <span className="val">€{formatResult(oneTimeExpenses + renovationCost)}</span>
          </div>
          <div className="breakdown-row">
            <span>{t.mortgageUtilities5y}</span>
            <span className="val">€{formatResult(totalMonthlyExpenses5y)}</span>
          </div>
          <div className="breakdown-row total">
            <span>{t.totalOutOfPocket}</span>
            <span className="val primary">€{formatResult(totalAllOutPocket5y)}</span>
          </div>
        </div>
      </div>

      {/* Scenarios Comparison Table */}
      <div className="scenario-table-wrapper">
        <table className="scenario-table">
          <thead>
            <tr>
              <th className="cell-metric">{t.tableHeaderMetric}</th>
              <th className="cell-scenario bad">{t.scenarioBad}</th>
              <th className="cell-scenario base">{t.scenarioBase}</th>
              <th className="cell-scenario good">{t.scenarioGood}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="cell-metric">{t.salePrice5y}</td>
              <td className="nowrap">€{formatResult(badPrice5y)}</td>
              <td className="nowrap">€{formatResult(basePrice5y)}</td>
              <td className="nowrap">€{formatResult(goodPrice5y)}</td>
            </tr>
            <tr>
              <td className="cell-metric">{t.loanBalancePayoff}</td>
              <td className="negative nowrap">−€{formatResult(remainingLoanBalance)}</td>
              <td className="negative nowrap">−€{formatResult(remainingLoanBalance)}</td>
              <td className="negative nowrap">−€{formatResult(remainingLoanBalance)}</td>
            </tr>
            <tr className="row-total-inflow">
              <td className="cell-metric">{t.netProceedsOnSale}</td>
              <td className="positive nowrap">€{formatResult(badNetProceeds)}</td>
              <td className="positive nowrap">€{formatResult(baseNetProceeds)}</td>
              <td className="positive nowrap">€{formatResult(goodNetProceeds)}</td>
            </tr>
            <tr>
              <td className="cell-metric">{t.rentIncome5y}</td>
              <td className="positive nowrap">+€{formatResult(totalRentIncome5y)}</td>
              <td className="positive nowrap">+€{formatResult(totalRentIncome5y)}</td>
              <td className="positive nowrap">+€{formatResult(totalRentIncome5y)}</td>
            </tr>
            <tr>
              <td className="cell-metric">{t.taxRefund5y}</td>
              <td className="positive nowrap">+€{formatResult(taxRefund5y)}</td>
              <td className="positive nowrap">+€{formatResult(taxRefund5y)}</td>
              <td className="positive nowrap">+€{formatResult(taxRefund5y)}</td>
            </tr>

            {/* Outflows Breakdown */}
            <tr className="row-subhead">
              <td colSpan={4} className="subhead-title">{t.unrecoverableExpensesTitle}</td>
            </tr>
            <tr>
              <td className="cell-metric">{t.interestPaid5y}</td>
              <td className="negative nowrap">−€{formatResult(interestPaid5y)}</td>
              <td className="negative nowrap">−€{formatResult(interestPaid5y)}</td>
              <td className="negative nowrap">−€{formatResult(interestPaid5y)}</td>
            </tr>
            <tr>
              <td className="cell-metric">{t.utilitiesInsurance5y}</td>
              <td className="negative nowrap">−€{formatResult(utilitiesAndInsurance5y)}</td>
              <td className="negative nowrap">−€{formatResult(utilitiesAndInsurance5y)}</td>
              <td className="negative nowrap">−€{formatResult(utilitiesAndInsurance5y)}</td>
            </tr>
            <tr>
              <td className="cell-metric">{t.rentalTax5y}</td>
              <td className="negative nowrap">−€{formatResult(rentalIncomeTax5y)}</td>
              <td className="negative nowrap">−€{formatResult(rentalIncomeTax5y)}</td>
              <td className="negative nowrap">−€{formatResult(rentalIncomeTax5y)}</td>
            </tr>
            <tr>
              <td className="cell-metric">{t.oneTimeExpenses}</td>
              <td className="negative nowrap">−€{formatResult(oneTimeExpenses)}</td>
              <td className="negative nowrap">−€{formatResult(oneTimeExpenses)}</td>
              <td className="negative nowrap">−€{formatResult(oneTimeExpenses)}</td>
            </tr>
            <tr>
              <td className="cell-metric">{t.renovationCost}</td>
              <td className="negative nowrap">−€{formatResult(renovationCost)}</td>
              <td className="negative nowrap">−€{formatResult(renovationCost)}</td>
              <td className="negative nowrap">−€{formatResult(renovationCost)}</td>
            </tr>

            <tr className="row-total-inflow">
              <td className="cell-metric">{t.totalCashReceived}</td>
              <td className="positive nowrap">€{formatResult(badTotalCashReceived)}</td>
              <td className="positive nowrap">€{formatResult(baseTotalCashReceived)}</td>
              <td className="positive nowrap">€{formatResult(goodTotalCashReceived)}</td>
            </tr>
            <tr className="row-total-outflow">
              <td className="cell-metric">{t.totalInvested}</td>
              <td className="negative nowrap">−€{formatResult(totalAllOutPocket5y)}</td>
              <td className="negative nowrap">−€{formatResult(totalAllOutPocket5y)}</td>
              <td className="negative nowrap">−€{formatResult(totalAllOutPocket5y)}</td>
            </tr>

            {/* Final Net Results */}
            <tr className="row-profit">
              <td className="cell-metric">{t.netProfit}</td>
              <td className={badNetProfit < 0 ? "negative nowrap" : "positive nowrap"}>
                €{formatResult(badNetProfit)}
              </td>
              <td className={baseNetProfit < 0 ? "negative nowrap" : "positive nowrap"}>
                €{formatResult(baseNetProfit)}
              </td>
              <td className={goodNetProfit < 0 ? "negative nowrap" : "positive nowrap"}>
                €{formatResult(goodNetProfit)}
              </td>
            </tr>

            {/* 1) INITIAL EQUITY ROI (Pre-Tax & Post-Tax) */}
            <tr className="row-roi">
              <td className="cell-metric">{t.roiInitialPreTax}</td>
              <td className={badRoiInitialPreTax < 0 ? "negative nowrap" : "positive nowrap"}>
                {formatResult(badRoiInitialPreTax)}%
              </td>
              <td className={baseRoiInitialPreTax < 0 ? "negative nowrap" : "positive nowrap"}>
                {formatResult(baseRoiInitialPreTax)}%
              </td>
              <td className={goodRoiInitialPreTax < 0 ? "negative nowrap" : "positive nowrap"}>
                {formatResult(goodRoiInitialPreTax)}%
              </td>
            </tr>
            <tr className="row-roi row-roi-total">
              <td className="cell-metric">{t.roiInitialPostTax}</td>
              <td className={badRoiInitialPostTax < 0 ? "negative nowrap" : "positive nowrap"}>
                {formatResult(badRoiInitialPostTax)}%
              </td>
              <td className={baseRoiInitialPostTax < 0 ? "negative nowrap" : "positive nowrap"}>
                {formatResult(baseRoiInitialPostTax)}%
              </td>
              <td className={goodRoiInitialPostTax < 0 ? "negative nowrap" : "positive nowrap"}>
                {formatResult(goodRoiInitialPostTax)}%
              </td>
            </tr>

            {/* 2) TOTAL OUTLAY ROI (Pre-Tax & Post-Tax) */}
            <tr className="row-roi" style={{ borderTop: "2px solid var(--border)" }}>
              <td className="cell-metric">{t.roiTotalPreTax}</td>
              <td className={badRoiTotalPreTax < 0 ? "negative nowrap" : "positive nowrap"}>
                {formatResult(badRoiTotalPreTax)}%
              </td>
              <td className={baseRoiTotalPreTax < 0 ? "negative nowrap" : "positive nowrap"}>
                {formatResult(baseRoiTotalPreTax)}%
              </td>
              <td className={goodRoiTotalPreTax < 0 ? "negative nowrap" : "positive nowrap"}>
                {formatResult(goodRoiTotalPreTax)}%
              </td>
            </tr>
            <tr className="row-roi row-roi-total">
              <td className="cell-metric">{t.roiTotalPostTax}</td>
              <td className={badRoiTotalPostTax < 0 ? "negative nowrap" : "positive nowrap"}>
                {formatResult(badRoiTotalPostTax)}%
              </td>
              <td className={baseRoiTotalPostTax < 0 ? "negative nowrap" : "positive nowrap"}>
                {formatResult(baseRoiTotalPostTax)}%
              </td>
              <td className={goodRoiTotalPostTax < 0 ? "negative nowrap" : "positive nowrap"}>
                {formatResult(goodRoiTotalPostTax)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ROI 5-Year Dynamics Chart (X: Years, Y: Euros) */}
      <RoiGrowthChart results={results} />
    </div>
  );
}
