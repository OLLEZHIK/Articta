import { Variable } from "@/types/variable";

export const bratislavaVariables: Record<string, Variable> = {
  // Step 1 & 2: Property & Mortgage Down Payment
  propertyPrice: {
    id: "propertyPrice",
    label: "Стоимость квартиры (€)",
    type: "currency",
    value: 160000,
    defaultValue: 160000,
    editable: true,
  },
  downPaymentPercent: {
    id: "downPaymentPercent",
    label: "Первоначальный взнос (%)",
    type: "percent",
    value: 10,
    defaultValue: 10,
    editable: true,
  },

  // Step 3: One-time purchasing expenses
  valuationFee: {
    id: "valuationFee",
    label: "Оценка недвижимости (€)",
    type: "currency",
    value: 200,
    defaultValue: 200,
    editable: true,
  },
  cadastreFee: {
    id: "cadastreFee",
    label: "Кадастр (€)",
    type: "currency",
    value: 100,
    defaultValue: 100,
    editable: true,
  },
  registrationFee: {
    id: "registrationFee",
    label: "Регистрация перехода права (€)",
    type: "currency",
    value: 100,
    defaultValue: 100,
    editable: true,
  },
  signatureFee: {
    id: "signatureFee",
    label: "Заверение подписей (€)",
    type: "currency",
    value: 10,
    defaultValue: 10,
    editable: true,
  },
  bankCommission: {
    id: "bankCommission",
    label: "Комиссия банка (€)",
    type: "currency",
    value: 400,
    defaultValue: 400,
    editable: true,
  },

  // Step 4: Mortgage Parameters
  interestRate: {
    id: "interestRate",
    label: "Процентная ставка (%)",
    type: "percent",
    value: 3.8,
    defaultValue: 3.8,
    editable: true,
  },
  loanTermYears: {
    id: "loanTermYears",
    label: "Срок кредита (лет)",
    type: "number",
    value: 30,
    defaultValue: 30,
    editable: true,
  },

  // Step 5: Monthly Expenses
  insuranceMonthly: {
    id: "insuranceMonthly",
    label: "Страхование квартиры (€/мес)",
    type: "currency",
    value: 15,
    defaultValue: 15,
    editable: true,
  },
  utilitiesMonthly: {
    id: "utilitiesMonthly",
    label: "Коммунальные платежи (€/мес)",
    type: "currency",
    value: 250,
    defaultValue: 250,
    editable: true,
  },
  propertyTaxMonthly: {
    id: "propertyTaxMonthly",
    label: "Налог на недвижимость (€/мес)",
    type: "currency",
    value: 5,
    defaultValue: 5,
    editable: true,
  },

  // Step 6: Renovation
  renovationCost: {
    id: "renovationCost",
    label: "Стоимость ремонта (€)",
    type: "currency",
    value: 1000,
    defaultValue: 1000,
    editable: true,
  },
  rentIncreaseFromRenovation: {
    id: "rentIncreaseFromRenovation",
    label: "Прирост аренды от ремонта (€/мес)",
    type: "currency",
    value: 50,
    defaultValue: 50,
    editable: true,
  },

  // Step 7: Rental Income, Tax & Tax Refund
  initialRentMonthly: {
    id: "initialRentMonthly",
    label: "Начальная аренда (€/мес)",
    type: "currency",
    value: 750,
    defaultValue: 750,
    editable: true,
  },
  incomeTaxRate: {
    id: "incomeTaxRate",
    label: "Налог на доход от найма (%)",
    type: "percent",
    value: 19,
    defaultValue: 19,
    editable: true,
  },
  annualRentGrowth: {
    id: "annualRentGrowth",
    label: "Ежегодный рост аренды (%)",
    type: "percent",
    value: 5,
    defaultValue: 5,
    editable: true,
  },
  taxRefundAnnual: {
    id: "taxRefundAnnual",
    label: "Возврат налогов в год (€)",
    type: "currency",
    value: 1200,
    defaultValue: 1200,
    editable: true,
  },

  // Step 8: Capital Appreciation Scenarios
  growthBad: {
    id: "growthBad",
    label: "Плохой рост цен (% в год)",
    type: "percent",
    value: 2,
    defaultValue: 2,
    editable: true,
  },
  growthBase: {
    id: "growthBase",
    label: "Базовый рост цен (% в год)",
    type: "percent",
    value: 4.5,
    defaultValue: 4.5,
    editable: true,
  },
  growthGood: {
    id: "growthGood",
    label: "Хороший рост цен (% в год)",
    type: "percent",
    value: 7,
    defaultValue: 7,
    editable: true,
  },
};
