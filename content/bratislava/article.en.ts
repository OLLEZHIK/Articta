import { Article } from "@/types/article";
import { bratislavaVariables } from "./variables";
import { bratislavaModel } from "./model";
import { Block } from "@/types/block";

const bratislavaBlocksEN: Block[] = [
  // ── Header Section ─────────────────────────────────────────
  {
    id: "title",
    type: "heading",
    level: 1,
    content: "Real Estate Investment in Bratislava: 5-Year ROI Calculation",
  },
  {
    id: "intro-1",
    type: "paragraph",
    content:
      "Over the past few years, I have tried almost all popular investment instruments: stocks, bonds, cryptocurrency, and various alternative investment methods.",
  },
  {
    id: "intro-2",
    type: "paragraph",
    content:
      "At some point, I wanted to try real estate. But before buying an apartment, I wanted an answer to just one question: what ROI will I get on my invested money?",
  },
  {
    id: "intro-3",
    type: "paragraph",
    content:
      "When I started looking for information, it turned out that most articles talk about real estate as a 'safe investment', but almost no one calculates the complete economics of the deal. In this article, we will do just that: break down the purchase, mortgage, renovation, rental income, and calculate the 5-year ROI.",
  },
  {
    id: "intro-roi-explanation",
    type: "callout",
    variant: "insight",
    content:
      "**What is ROI (Return on Investment)?**\n\n" +
      "**ROI** measures the net profit generated relative to the actual out-of-pocket equity invested:\n\n" +
      "**ROI = (Net Profit ÷ Total Out-of-Pocket Equity Invested) × 100%**\n\n" +
      "For example, if you invest 20,000 € of your own money (down payment + fees + renovation) and earn 10,000 € in net profit over 5 years after all expenses, your 5-Year ROI is 50% (~10% annualized).",
  },

  // ── Initial Conditions ─────────────────────────────────────
  {
    id: "divider-conditions",
    type: "divider",
  },
  {
    id: "section-conditions",
    type: "heading",
    level: 2,
    content: "Initial Conditions",
  },
  {
    id: "conditions-p1",
    type: "paragraph",
    content:
      "To make the calculations as realistic as possible, we consider 2-room apartments in Bratislava with good transport accessibility requiring cosmetic renovation (5-year holding period). " +
      "The main criteria for selection is a purchase price of around 3300–3600 €/m².",
  },

  // ── Step 1: Purchase Price ─────────────────────────────
  {
    id: "divider-step1",
    type: "divider",
  },
  {
    id: "step-1",
    type: "heading",
    level: 2,
    content: "Step 1. Purchase Price",
  },
  {
    id: "step1-p",
    type: "paragraph",
    content:
      "The base purchase price of the property determines the entire future economics of the project. Specify the property price in the field below:",
  },
  {
    id: "input-price",
    type: "variableInput",
    variableId: "propertyPrice",
    description: "Enter the purchase price of the apartment in euros (€).",
    example: "160 000 €",
  },

  // ── Step 2: Down Payment ──────────────────────────
  {
    id: "divider-step2",
    type: "divider",
  },
  {
    id: "step-2",
    type: "heading",
    level: 2,
    content: "Step 2. Down Payment & Leverage",
  },
  {
    id: "step2-p",
    type: "paragraph",
    content:
      "The main advantage of real estate over many other assets is financial leverage. In our example, the bank finances 90% of the property. Set the down payment percentage paid with your own equity:",
  },
  {
    id: "input-downpayment",
    type: "variableInput",
    variableId: "downPaymentPercent",
    description: "Percentage of down payment using your own equity.",
    example: "10%",
  },
  {
    id: "step2-results",
    type: "callout",
    variant: "info",
    content:
      "At property price {{var:propertyPrice}} and down payment {{var:downPaymentPercent}}:\n" +
      "• Own equity (down payment): {{result:downPayment}} €\n" +
      "• Mortgage loan amount: {{result:loanAmount}} €",
  },

  // ── Step 3: One-time Expenses ───────────────────────────────
  {
    id: "divider-step3",
    type: "divider",
  },
  {
    id: "step-3",
    type: "heading",
    level: 2,
    content: "Step 3. Closing & One-time Purchasing Fees",
  },
  {
    id: "closing-fees-grid-step3",
    type: "closingFeesGrid",
  },

  // ── Step 4: Mortgage ───────────────────────────────────────
  {
    id: "divider-step4",
    type: "divider",
  },
  {
    id: "step-4",
    type: "heading",
    level: 2,
    content: "Step 4. Mortgage & Annuity Payment",
  },
  {
    id: "step4-p",
    type: "paragraph",
    content:
      "In Slovakia, banks offer fixed rates for 5 years. Set the mortgage terms in the fields below:",
  },
  {
    id: "input-interest",
    type: "variableInput",
    variableId: "interestRate",
    description: "Annual mortgage interest rate.",
    example: "3.8%",
  },
  {
    id: "input-term",
    type: "variableInput",
    variableId: "loanTermYears",
    description: "Mortgage loan term in years.",
    example: "30 years",
  },
  {
    id: "formula-callout",
    type: "callout",
    variant: "insight",
    content:
      "Annuity payment formula: P × r × (1+r)^n / ((1+r)^n − 1)\n" +
      "Monthly mortgage payment: {{result:monthlyMortgage}} €/mo.",
  },

  // ── Step 5: Monthly Expenses ───────────────────────────
  {
    id: "divider-step5",
    type: "divider",
  },
  {
    id: "step-5",
    type: "heading",
    level: 2,
    content: "Step 5. Monthly Expenses",
  },
  {
    id: "expenses-grid-step5",
    type: "expensesGrid",
  },

  // ── Step 6: Renovation ──────────────────────
  {
    id: "divider-step6",
    type: "divider",
  },
  {
    id: "step-6",
    type: "heading",
    level: 2,
    content: "Step 6. Pinterest-Style Renovation & Payback",
  },
  {
    id: "step6-p1",
    type: "paragraph",
    content:
      "The main goal of renovation is not to impress guests, but to increase rental rate and apartment appeal with minimal investment (solid colors, stylish lighting, minimalism, quality second-hand appliances). " +
      "Main rule: renovation must pay back at least three times over 5 years.",
  },
  {
    id: "input-renovation-cost",
    type: "variableInput",
    variableId: "renovationCost",
    description: "Renovation cost in euros (€).",
    example: "1 000 €",
  },
  {
    id: "input-rent-increase",
    type: "variableInput",
    variableId: "rentIncreaseFromRenovation",
    description: "Expected monthly rent increase from renovation (€/mo).",
    example: "50 €",
  },
  {
    id: "renovation-callout",
    type: "callout",
    variant: "info",
    content:
      "Investing {{var:renovationCost}} in renovation with rent boost {{var:rentIncreaseFromRenovation}}:\n" +
      "• Additional 5-year income: {{result:renovation5yIncome}} €\n" +
      "• Renovation payback: {{result:renovationPaybackMonths}} months\n" +
      "• Renovation ROI: {{result:renovationRoi}} %",
  },

  // ── Step 7: Rental Income & Taxes ──
  {
    id: "divider-step7",
    type: "divider",
  },
  {
    id: "step-7",
    type: "heading",
    level: 2,
    content: "Step 7. Rental Income, Rental Tax (19%) & Cash Flow",
  },
  {
    id: "step7-cashflow-explanation",
    type: "callout",
    variant: "info",
    content:
      "**What is Cash Flow?**\n\n" +
      "**Cash Flow** represents the net cash remaining in your pocket **each month** after receiving rental income and paying all recurring obligations:\n\n" +
      "**Cash Flow = Rental Income − (Mortgage Payment + Utilities + Insurance + Taxes)**\n\n" +
      "• **Positive Cash Flow (> 0 €)**: The property fully pays for itself and yields passive monthly cash.\n" +
      "• **Negative Cash Flow (< 0 €)**: You must cover a monthly shortfall out of pocket to maintain the asset.",
  },
  {
    id: "step7-p",
    type: "paragraph",
    content:
      "Set initial rent, rental income tax rate (paid on net rent: Rent minus Utilities), annual rent indexation, and mortgage interest tax refund:",
  },
  {
    id: "input-rent",
    type: "variableInput",
    variableId: "initialRentMonthly",
    description: "Initial monthly rent (€/mo).",
    example: "750 €",
  },
  {
    id: "input-tax-rate",
    type: "variableInput",
    variableId: "incomeTaxRate",
    description: "Rental income tax rate (% of Rent minus Utilities).",
    example: "19%",
  },
  {
    id: "input-growth-rent",
    type: "variableInput",
    variableId: "annualRentGrowth",
    description: "Annual rent growth / indexation (%).",
    example: "5.0%",
  },
  {
    id: "input-tax-refund",
    type: "variableInput",
    variableId: "taxRefundAnnual",
    description: "Annual mortgage interest tax refund (€/yr).",
    example: "1 200 €",
  },
  {
    id: "tax-income-callout",
    type: "callout",
    variant: "info",
    content:
      "Rental tax calculation ({{var:incomeTaxRate}}):\n" +
      "• Taxable base (Rent − Utilities): {{result:taxableRentalIncomeMonthly}} €/mo\n" +
      "• Monthly rental tax: {{result:rentalIncomeTaxMonthly}} €/mo\n" +
      "• Total 5-year rental tax: {{result:rentalIncomeTax5y}} €",
  },
  {
    id: "cash-flow-callout",
    type: "callout",
    variant: "insight",
    content:
      "Monthly Net Cash Flow: Rent with renovation ({{result:monthlyRentWithRenovation}} €) + Tax bonus ({{result:taxRefundMonthlyEquivalent}} €) MINUS total expenses including rental tax ({{result:totalMonthlyExpenses}} €).\n" +
      "Net monthly cash flow: {{result:monthlyNetCashFlowYear1}} €/mo.",
  },
  {
    id: "result-cash-flow",
    type: "result",
    label: "Net Monthly Cash Flow (Year 1)",
    resultId: "monthlyNetCashFlowYear1",
  },
  {
    id: "result-rent-5y",
    type: "result",
    label: "Total 5-Year Rental Income",
    resultId: "totalRentIncome5y",
  },

  // ── Step 8: Appreciation ───────────────────
  {
    id: "divider-step8",
    type: "divider",
  },
  {
    id: "step-8",
    type: "heading",
    level: 2,
    content: "Step 8. Property Price Appreciation & 3 Scenarios",
  },
  {
    id: "step8-p",
    type: "paragraph",
    content:
      "Set annual property appreciation rates for three scenarios (Pessimistic, Base, and Optimistic) below:",
  },
  {
    id: "input-growth-bad",
    type: "variableInput",
    variableId: "growthBad",
    description: "Annual price appreciation — Pessimistic scenario (%).",
    example: "2.0%",
  },
  {
    id: "input-growth-base",
    type: "variableInput",
    variableId: "growthBase",
    description: "Annual price appreciation — Base scenario (%).",
    example: "4.5%",
  },
  {
    id: "input-growth-good",
    type: "variableInput",
    variableId: "growthGood",
    description: "Annual price appreciation — Optimistic scenario (%).",
    example: "7.0%",
  },

  // ── Final ROI Table ────────────────────
  {
    id: "divider-results",
    type: "divider",
  },
  {
    id: "section-table",
    type: "heading",
    level: 2,
    content: "Final 5-Year ROI Breakdown",
  },
  {
    id: "table-explanation",
    type: "paragraph",
    content:
      "The summary table below accounts for all cash flows over 5 years: property capital appreciation, rental income, tax refunds, paid-off principal (equity built), minus all unrecoverable costs (interest, utilities, 19% rental tax, closing fees, and renovation).",
  },
  {
    id: "table-roi",
    type: "scenarioTable",
    title: "Income, Expenses & 5-Year ROI Matrix",
  },

  // ── Conclusion ────────────────────────────────────
  {
    id: "conclusion-title",
    type: "heading",
    level: 2,
    content: "Conclusion",
  },
  {
    id: "conclusion-p",
    type: "paragraph",
    content:
      "Most people evaluate real estate investments solely by monthly rent. In reality, total return consists of capital appreciation, rent, leverage (tenant paying down mortgage principal), tax bonuses, and smart renovation payback.",
  },
];

export const bratislavaArticleEN: Article = {
  variables: bratislavaVariables,
  model: bratislavaModel,
  blocks: bratislavaBlocksEN,
};
