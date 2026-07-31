import { ArticleModel } from "@/types/model";

export const bratislavaModel: ArticleModel = (variables) => {
  const propertyPrice = Number(variables.propertyPrice.value);
  const downPaymentPercent = Number(variables.downPaymentPercent.value);

  // Step 2: Down payment & Loan amount
  const downPayment = propertyPrice * (downPaymentPercent / 100);
  const loanAmount = Math.max(0, propertyPrice - downPayment);

  // Step 3: One-time purchasing expenses
  const valuationFee = Number(variables.valuationFee.value);
  const cadastreFee = Number(variables.cadastreFee.value);
  const registrationFee = Number(variables.registrationFee.value);
  const signatureFee = Number(variables.signatureFee.value);
  const bankCommission = Number(variables.bankCommission.value);
  const oneTimeExpenses =
    valuationFee + cadastreFee + registrationFee + signatureFee + bankCommission;

  // Step 4: Mortgage Annuity Formula
  const interestRate = Number(variables.interestRate.value);
  const loanTermYears = Number(variables.loanTermYears.value);
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = Math.max(1, loanTermYears * 12);

  let monthlyMortgage = 0;
  if (monthlyRate > 0 && loanAmount > 0) {
    const compound = Math.pow(1 + monthlyRate, totalMonths);
    monthlyMortgage = (loanAmount * monthlyRate * compound) / (compound - 1);
  } else if (loanAmount > 0) {
    monthlyMortgage = loanAmount / totalMonths;
  }

  // Step 6: Renovation & Rent Increase
  const renovationCost = Number(variables.renovationCost.value);
  const rentIncrease = Number(variables.rentIncreaseFromRenovation.value);
  const renovation5yIncome = rentIncrease * 12 * 5;
  const renovationRoi =
    renovationCost > 0
      ? ((renovation5yIncome - renovationCost) / renovationCost) * 100
      : 0;
  const renovationPaybackMonths =
    rentIncrease > 0 ? renovationCost / rentIncrease : 0;

  // Step 7: Income Tax on Rental Proceeds (Rent minus Utilities)
  const initialRent = Number(variables.initialRentMonthly.value);
  const incomeTaxRate = Number(variables.incomeTaxRate.value);
  const utilitiesMonthly = Number(variables.utilitiesMonthly.value);

  const totalMonthlyRentInflow = initialRent + rentIncrease;
  const taxableRentalIncomeMonthly = Math.max(0, totalMonthlyRentInflow - utilitiesMonthly);
  const rentalIncomeTaxMonthly = taxableRentalIncomeMonthly * (incomeTaxRate / 100);
  const rentalIncomeTax5y = rentalIncomeTaxMonthly * 12 * 5;

  // Monthly Expenses (Mortgage + Insurance + Utilities + Property Tax + Rental Income Tax)
  const insuranceMonthly = Number(variables.insuranceMonthly.value);
  const propertyTaxMonthly = Number(variables.propertyTaxMonthly.value);
  const utilitiesAndInsuranceMonthly = insuranceMonthly + utilitiesMonthly + propertyTaxMonthly;
  const utilitiesAndInsurance5y = utilitiesAndInsuranceMonthly * 60;

  // Pre-Tax expenses (without rental income tax)
  const totalMonthlyExpensesPreTax = monthlyMortgage + utilitiesAndInsuranceMonthly;

  // Post-Tax expenses (with rental income tax)
  const nonMortgageMonthly = utilitiesAndInsuranceMonthly + rentalIncomeTaxMonthly;
  const totalMonthlyExpenses = monthlyMortgage + nonMortgageMonthly;

  // 5-Year Rental Income & Tax Refund
  const annualRentGrowth = Number(variables.annualRentGrowth.value);
  const taxRefundAnnual = Number(variables.taxRefundAnnual.value);
  const taxRefundMonthlyEquivalent = taxRefundAnnual / 12;

  let totalRentIncome5y = 0;
  let currentYearRent = initialRent + rentIncrease;

  for (let year = 1; year <= 5; year++) {
    totalRentIncome5y += currentYearRent * 12;
    currentYearRent *= 1 + annualRentGrowth / 100;
  }

  // Monthly Net Cash Flow Year 1
  const monthlyCashInflowYear1 = totalMonthlyRentInflow + taxRefundMonthlyEquivalent;

  // Pre-Tax Cash Flow (without rental income tax)
  const monthlyNetCashFlowPreTax = monthlyCashInflowYear1 - totalMonthlyExpensesPreTax;
  const total5yCashFlowPreTax = monthlyNetCashFlowPreTax * 12 * 5;

  // Post-Tax Cash Flow (with rental income tax) — this is the "real" cash flow
  const monthlyNetCashFlowPostTax = monthlyCashInflowYear1 - totalMonthlyExpenses;
  const monthlyNetCashFlowYear1 = monthlyNetCashFlowPostTax;
  const total5yCashFlow = monthlyNetCashFlowYear1 * 12 * 5;
  const net5yCashFlowDeficit = monthlyNetCashFlowYear1 < 0 ? Math.abs(total5yCashFlow) : 0;

  // Step 8: 5-Year Mortgage Loan Amortization Balance
  const months5y = Math.min(60, totalMonths);
  let remainingLoanBalance = loanAmount;
  let interestPaid5y = 0;
  let principalPaid5y = 0;

  if (monthlyRate > 0 && loanAmount > 0) {
    const compoundN = Math.pow(1 + monthlyRate, totalMonths);
    const compoundM = Math.pow(1 + monthlyRate, months5y);
    remainingLoanBalance = loanAmount * ((compoundN - compoundM) / (compoundN - 1));
    const totalMortgagePayments5y = monthlyMortgage * months5y;
    principalPaid5y = loanAmount - remainingLoanBalance;
    interestPaid5y = Math.max(0, totalMortgagePayments5y - principalPaid5y);
  }

  const taxRefund5y = taxRefundAnnual * 5;
  const initialEquityInvested = downPayment + oneTimeExpenses + renovationCost;

  const totalNonMortgagePaid5y = nonMortgageMonthly * 60;
  const totalMortgagePaid5y = monthlyMortgage * 60;
  const totalMonthlyExpenses5y = totalMonthlyExpenses * 60;
  const totalAllOutPocket5y = initialEquityInvested + totalMonthlyExpenses5y;

  // Real Net Out-of-Pocket Money Invested by Buyer over 5 Years (Initial Equity + Net Cash Out-of-Pocket Deficit)
  const netTotalEquityPaid5y = initialEquityInvested + net5yCashFlowDeficit;

  const totalUnrecoverableExpenses5y =
    interestPaid5y + totalNonMortgagePaid5y + oneTimeExpenses + renovationCost;

  // Helper for 3 Growth Scenarios
  //
  // 4 MATRIX ROI METRICS:
  // 1) Initial Equity ROI (Pre-Tax)
  // 2) Initial Equity ROI (Post-Tax)
  // 3) Total Net Outlay ROI (Pre-Tax)
  // 4) Total Net Outlay ROI (Post-Tax)
  const calcScenario = (growthPercent: number) => {
    const price5y = propertyPrice * Math.pow(1 + growthPercent / 100, 5);
    const capitalGain = price5y - propertyPrice;

    const netProceedsOnSale = price5y - remainingLoanBalance;
    const totalCashReceived = netProceedsOnSale + totalRentIncome5y + taxRefund5y;

    // Post-Tax Net Profit
    const netProfitPostTax = totalCashReceived - totalAllOutPocket5y;

    // Pre-Tax Net Profit
    const netProfitPreTax = netProfitPostTax + rentalIncomeTax5y;

    // 1. Initial Equity ROI (Pre-Tax)
    const roiInitialPreTax =
      initialEquityInvested > 0 ? (netProfitPreTax / initialEquityInvested) * 100 : 0;

    // 2. Initial Equity ROI (Post-Tax)
    const roiInitialPostTax =
      initialEquityInvested > 0 ? (netProfitPostTax / initialEquityInvested) * 100 : 0;

    // 3. Total Net Outlay ROI (Pre-Tax)
    const roiTotalPreTax =
      netTotalEquityPaid5y > 0 ? (netProfitPreTax / netTotalEquityPaid5y) * 100 : 0;

    // 4. Total Net Outlay ROI (Post-Tax)
    const roiTotalPostTax =
      netTotalEquityPaid5y > 0 ? (netProfitPostTax / netTotalEquityPaid5y) * 100 : 0;

    return {
      price5y: Math.round(price5y),
      capitalGain: Math.round(capitalGain),
      netProfitPostTax: Math.round(netProfitPostTax),
      netProfitPreTax: Math.round(netProfitPreTax),
      roiInitialPreTax: Math.round(roiInitialPreTax * 10) / 10,
      roiInitialPostTax: Math.round(roiInitialPostTax * 10) / 10,
      roiTotalPreTax: Math.round(roiTotalPreTax * 10) / 10,
      roiTotalPostTax: Math.round(roiTotalPostTax * 10) / 10,
    };
  };

  const badScenario = calcScenario(Number(variables.growthBad.value));
  const baseScenario = calcScenario(Number(variables.growthBase.value));
  const goodScenario = calcScenario(Number(variables.growthGood.value));

  return {
    downPayment: Math.round(downPayment),
    loanAmount: Math.round(loanAmount),
    oneTimeExpenses: Math.round(oneTimeExpenses),
    renovationCost: Math.round(renovationCost),
    monthlyMortgage: Math.round(monthlyMortgage * 100) / 100,
    nonMortgageMonthly: Math.round(nonMortgageMonthly * 100) / 100,
    totalMonthlyExpenses: Math.round(totalMonthlyExpenses * 100) / 100,
    totalMonthlyExpensesPreTax: Math.round(totalMonthlyExpensesPreTax * 100) / 100,
    renovation5yIncome: Math.round(renovation5yIncome),
    renovationRoi: Math.round(renovationRoi * 10) / 10,
    renovationPaybackMonths: Math.round(renovationPaybackMonths),
    totalRentIncome5y: Math.round(totalRentIncome5y),
    taxRefund5y: Math.round(taxRefund5y),

    // Rental Income Tax Metrics
    taxableRentalIncomeMonthly: Math.round(taxableRentalIncomeMonthly * 100) / 100,
    rentalIncomeTaxMonthly: Math.round(rentalIncomeTaxMonthly * 100) / 100,
    rentalIncomeTax5y: Math.round(rentalIncomeTax5y),
    utilitiesAndInsurance5y: Math.round(utilitiesAndInsurance5y),

    // Net Monthly Cash Flow Metrics
    monthlyRentWithRenovation: Math.round(totalMonthlyRentInflow),
    taxRefundMonthlyEquivalent: Math.round(taxRefundMonthlyEquivalent * 100) / 100,
    monthlyCashInflowYear1: Math.round(monthlyCashInflowYear1 * 100) / 100,
    monthlyNetCashFlowPreTax: Math.round(monthlyNetCashFlowPreTax * 100) / 100,
    total5yCashFlowPreTax: Math.round(total5yCashFlowPreTax * 100) / 100,
    monthlyNetCashFlowYear1: Math.round(monthlyNetCashFlowYear1 * 100) / 100,
    total5yCashFlow: Math.round(total5yCashFlow * 100) / 100,

    // Detailed 5-Year Totals
    principalPaid5y: Math.round(principalPaid5y),
    interestPaid5y: Math.round(interestPaid5y),
    remainingLoanBalance: Math.round(remainingLoanBalance),
    initialEquityInvested: Math.round(initialEquityInvested),
    net5yCashFlowDeficit: Math.round(net5yCashFlowDeficit * 100) / 100,
    netTotalEquityPaid5y: Math.round(netTotalEquityPaid5y * 100) / 100,
    totalMortgagePaid5y: Math.round(totalMortgagePaid5y),
    totalNonMortgagePaid5y: Math.round(totalNonMortgagePaid5y),
    totalMonthlyExpenses5y: Math.round(totalMonthlyExpenses5y),
    totalAllOutPocket5y: Math.round(totalAllOutPocket5y),
    totalUnrecoverableExpenses5y: Math.round(totalUnrecoverableExpenses5y),

    // Bad Scenario Matrix ROI
    badPrice5y: badScenario.price5y,
    badCapitalGain: badScenario.capitalGain,
    badNetProfit: badScenario.netProfitPostTax,
    badNetProfitPreTax: badScenario.netProfitPreTax,
    badRoiInitialPreTax: badScenario.roiInitialPreTax,
    badRoiInitialPostTax: badScenario.roiInitialPostTax,
    badRoiTotalPreTax: badScenario.roiTotalPreTax,
    badRoiTotalPostTax: badScenario.roiTotalPostTax,

    // Base Scenario Matrix ROI
    basePrice5y: baseScenario.price5y,
    baseCapitalGain: baseScenario.capitalGain,
    baseNetProfit: baseScenario.netProfitPostTax,
    baseNetProfitPreTax: baseScenario.netProfitPreTax,
    baseRoiInitialPreTax: baseScenario.roiInitialPreTax,
    baseRoiInitialPostTax: baseScenario.roiInitialPostTax,
    baseRoiTotalPreTax: baseScenario.roiTotalPreTax,
    baseRoiTotalPostTax: baseScenario.roiTotalPostTax,

    // Good Scenario Matrix ROI
    goodPrice5y: goodScenario.price5y,
    goodCapitalGain: goodScenario.capitalGain,
    goodNetProfit: goodScenario.netProfitPostTax,
    goodNetProfitPreTax: goodScenario.netProfitPreTax,
    goodRoiInitialPreTax: goodScenario.roiInitialPreTax,
    goodRoiInitialPostTax: goodScenario.roiInitialPostTax,
    goodRoiTotalPreTax: goodScenario.roiTotalPreTax,
    goodRoiTotalPostTax: goodScenario.roiTotalPostTax,
  };
};
