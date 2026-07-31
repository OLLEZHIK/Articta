import { Language } from "@/types/language";
import { Variable } from "@/types/variable";

export const translations = {
  ru: {
    // Header & Layout
    articles: "Статьи",
    blog: "Блог",
    about: "О нас",
    share: "Поделиться",
    copied: "Ссылка скопирована в буфер обмена!",

    // Sidebar & Navigation
    tableOfContents: "Содержание",
    continueReading: "Продолжить чтение",
    moreIn: "Ещё в теме",
    modelParameters: "Параметры модели",
    modifiedCount: "Изменено {{modified}} из {{total}}",
    generateReport: "Сформировать отчёт",
    shareLink: "Поделиться ссылкой",
    resetAll: "Сбросить все",

    // Hold to Compare
    holdToCompare: "👁️ Зажмите: Авторский вариант",
    comparingActive: "АВТОРСКИЙ РАСЧЕТ...",
    compareHint: "Зажмите кнопку сравнения, чтобы увидеть исходные значения автора.",

    // Inputs & Variable Cards
    examplePrefix: "Пример:",
    resetSuffix: "сброс",
    holdAuthorVal: "Зажмите: Авторские {{val}}",
    showingAuthorVal: "Авторский вариант: {{val}}",
    holdTitleAttr: "Зажмите кнопку, чтобы временно посмотреть авторское значение по умолчанию",
    clickToResetAttr: "Нажмите, чтобы сбросить к авторскому значению",

    // Report View
    generatedAt: "Сформировано:",
    reportSubtitle: "Интерактивный аналитический отчёт — нажмите на любое значение, чтобы изменить параметр и пересчитать всё в реальном времени.",
    keyMetricsTitle: "Ключевые показатели за 5 лет",
    netProfitBase: "Чистая прибыль (Базовый сценарий)",
    roiTotalEquityLabel: "ROI на реально вложенные деньги",
    monthlyCashFlowLabel: "Ежемесячный Cash Flow",
    accumulatedEquity: "Накопленный капитал в квартире (тело)",
    inputParamsTitle: "Входные параметры модели",
    clickToEditDesc: "Вы можете кликнуть на любое значение в таблице ниже, чтобы изменить его. Все показатели пересчитаются автоматически.",
    parameterHeader: "Параметр",
    valueHeader: "Значение",
    scenario3Title: "Сравнительный расчет 3 сценариев",
    itemIncomeExpenseHeader: "Статья доходов и расходов за 5 лет",
    downloadPdf: "Скачать в PDF / Распечатать",
    copyShareLink: "Скопировать ссылку для делиться",
    resetToDefault: "Сбросить к исходным",

    // Feedback & Comments
    wasHelpful: "Был ли этот материал полезен?",
    like: "Полезно",
    dislike: "Не интересно",
    thankYouFeedback: "Спасибо за вашу оценку!",
    commentsTitle: "Обсуждение и комментарии",
    addCommentPlaceholder: "Напишите ваш комментарий или вопрос по расчетам...",
    authorNamePlaceholder: "Ваше имя (необязательно)",
    postComment: "Опубликовать",
    reply: "Ответить",
    noCommentsYet: "Комментариев пока нет. Будьте первым!",

    // Quick Article Meta & Value Badge
    metaVariables: "21 настраиваемый параметр",
    metaDifficulty: "Продвинутый разбор",
    metaCharts: "3 графика и 5Y модель",
    metaReadTime: "12 мин исследования",
    metaValueText: "Интеллектуальный инструмент: меняйте любые параметры прямо в тексте и боковой панели — модель мгновенно пересчитает ROI под вашу квартиру.",

    // Scenario Table
    monthlyCashFlowTitle: "1. Ежемесячный Cash Flow и Баланс за 5 лет",
    rentPlusBonus: "Аренда с ремонтом + налоговый бонус:",
    expensesPreTax: "Ипотека + коммуналка + страховка:",
    cashFlowPreTax: "Cash Flow до налога от найма:",
    rentalTaxMonthly: "− Налог на доход от найма:",
    cashFlowPostTax: "Cash Flow с учётом налога:",
    cashFlow5yPreTax: "Cash Flow за 5 лет (до налога):",
    cashFlow5yPostTax: "Cash Flow за 5 лет (с налогом):",

    outOfPocketTitle: "2. Итого потраченные личные средства за 5 лет",
    downPayment: "Первоначальный взнос (10%):",
    closingFees: "Оформление сделки + Ремонт:",
    mortgageUtilities5y: "Ипотека + коммуналка + налог найма (5 лет):",
    totalOutOfPocket: "ВСЕГО ПОТРАЧЕНО СВОИХ ДЕНЕГ ЗА 5 ЛЕТ:",

    tableHeaderMetric: "Расчет итоговой чистой прибыли за 5 лет",
    scenarioBad: "Плохой",
    scenarioBase: "Базовый",
    scenarioGood: "Хороший",

    salePrice5y: "Цена продажи квартиры через 5 лет",
    loanBalancePayoff: "− Погашение остатка долга банку по ипотеке",
    netProceedsOnSale: "= Чистая выручка с продажи квартиры на руки",
    rentIncome5y: "+ Накопленный арендный доход (5 лет)",
    taxRefund5y: "+ Накопленный возврат налогов (5 лет)",

    unrecoverableExpensesTitle: "НЕВОЗВРАТНЫЕ РАСХОДЫ (−)",
    interestPaid5y: "− Проценты по ипотеке банку (5 лет)",
    utilitiesInsurance5y: "− Коммуналка и страховка (5 лет)",
    rentalTax5y: "− Налог на доход от найма (5 лет)",
    oneTimeExpenses: "− Разовое оформление сделки",
    renovationCost: "− Стоимость ремонта",

    totalCashReceived: "ВСЕГО ДЕНЕГ НА РУКАХ ПОСЛЕ 5 ЛЕТ",
    totalInvested: "− ВСЕГО ВЛОЖЕНО ИЗ КАРМАНА (Взнос+Оформление+Ремонт+Ипотека/Коммуналка/Налоги)",
    netProfit: "ЧИСТАЯ ПРИБЫЛЬ (Чистый заработок сверху всех вложенных денег)",

    roiInitialPreTax: "1. ROI со стартовых инвестиций (до налога, %)",
    roiInitialPostTax: "↳ с учетом налога от найма (%)",
    roiTotalPreTax: "2. ROI со всего вложенного капитала за 5 лет (до налога, %)",
    roiTotalPostTax: "↳ с учетом налога от найма (%)",

    executiveSummaryTitle: "Чистая прибыль и ROI за 5 лет",
    executiveSummarySub: "Итоговый результат с учётом абсолютно всех расходов, ипотеки, аренды и налогов",
    toggleDetailsShow: "Показать подробную детализацию расходов ↓",
    toggleDetailsHide: "Скрыть подробную детализацию ↑",
    profitFormulaTitle: "Из чего формируется ваш чистый доход:",
  },

  sk: {
    // Header & Layout
    articles: "Články",
    blog: "Blog",
    about: "O nás",
    share: "Zdieľať",
    copied: "Odkaz bol skopírovaný do schránky!",

    // Sidebar & Navigation
    tableOfContents: "Obsah",
    continueReading: "Pokračovať v čítaní",
    moreIn: "Viac v téme",
    modelParameters: "Parametre modelu",
    modifiedCount: "Zmenené {{modified}} z {{total}}",
    generateReport: "Vygenerovať správu",
    shareLink: "Zdieľať odkaz",
    resetAll: "Obnoviť všetko",

    // Hold to Compare
    holdToCompare: "👁️ Podržte: Autorský variant",
    comparingActive: "AUTORSKÝ VÝPOČET...",
    compareHint: "Podržte tlačidlo na porovnanie s pôvodnými hodnotami autora.",

    // Inputs & Variable Cards
    examplePrefix: "Príklad:",
    resetSuffix: "obnoviť",
    holdAuthorVal: "Podržte: Autorské {{val}}",
    showingAuthorVal: "Autorský variant: {{val}}",
    holdTitleAttr: "Podržte tlačidlo pre zobrazenie autorskej hodnoty",
    clickToResetAttr: "Kliknite pre obnovenie na autorskú hodnotu",

    // Report View
    generatedAt: "Vygenerované:",
    reportSubtitle: "Interaktívna analytická správa — kliknite na akúkoľvek hodnotu pre zmenu a prepočet v reálnom čase.",
    keyMetricsTitle: "Kľúčové ukazovatele za 5 rokov",
    netProfitBase: "Čistý zisk (Základný scenár)",
    roiTotalEquityLabel: "ROI z celkových investovaných peňazí",
    monthlyCashFlowLabel: "Mesačný Cash Flow",
    accumulatedEquity: "Kumulovaný kapitál v byte (istina)",
    inputParamsTitle: "Vstupné parametre modelu",
    clickToEditDesc: "Môžete kliknúť na akúkoľvek hodnotu v tabuľke nižšie a zmeniť ju. Všetky ukazovatele sa automaticky prepočítajú.",
    parameterHeader: "Parameter",
    valueHeader: "Hodnota",
    scenario3Title: "Porovnávací výpočet 3 scenárov",
    itemIncomeExpenseHeader: "Položka príjmov a výdavkov za 5 rokov",
    downloadPdf: "Stiahnuť PDF / Vytlačiť",
    copyShareLink: "Kopírovať odkaz na zdieľanie",
    resetToDefault: "Obnoviť pôvodné",

    // Feedback & Comments
    wasHelpful: "Boli tieto informácie užitočné?",
    like: "Užitočné",
    dislike: "Nezaujímavé",
    thankYouFeedback: "Ďakujeme za váš názor!",
    commentsTitle: "Diskusia a komentáre",
    addCommentPlaceholder: "Napište váš komentár alebo otázku k výpočtom...",
    authorNamePlaceholder: "Vaše meno (nepovinné)",
    postComment: "Publikovať",
    reply: "Odpovedať",
    noCommentsYet: "Zatiaľ žiadne komentáre. Buďte prvý!",

    // Quick Article Meta & Value Badge
    metaVariables: "21 nastaviteľných parametrov",
    metaDifficulty: "Pokročilá analýza",
    metaCharts: "3 grafy a 5Y model",
    metaReadTime: "12 min štúdia",
    metaValueText: "Interaktívny nástroj: meňte parametre priamo v texte alebo v bočnom paneli — model okamžite prepočíta ROI pre váš byt.",

    // Scenario Table
    monthlyCashFlowTitle: "1. Mesačný Cash Flow a Bilancia za 5 rokov",
    rentPlusBonus: "Nájom s rekonštrukciou + daňový bonus:",
    expensesPreTax: "Hypotéka + energie + poistenie:",
    cashFlowPreTax: "Cash Flow pred daňou z prenájmu:",
    rentalTaxMonthly: "− Daň z príjmu z prenájmu:",
    cashFlowPostTax: "Cash Flow po zdanení:",
    cashFlow5yPreTax: "Cash Flow za 5 rokov (pred daňou):",
    cashFlow5yPostTax: "Cash Flow za 5 rokov (po zdanení):",

    outOfPocketTitle: "2. Celkovo investované vlastné prostriedky za 5 rokov",
    downPayment: "Akontácia (10%):",
    closingFees: "Vybavenie obchodu + Rekonštrukcia:",
    mortgageUtilities5y: "Hypotéka + energie + daň (5 rokov):",
    totalOutOfPocket: "CELKOVO INVESTOVANÉ VLASTNÉ PEŇAZE ZA 5 ROKOV:",

    tableHeaderMetric: "Výpočet konečného čistého zisku za 5 rokov",
    scenarioBad: "Pesimistický",
    scenarioBase: "Základný",
    scenarioGood: "Optimistický",

    salePrice5y: "Predajná cena bytu po 5 rokoch",
    loanBalancePayoff: "− Splatenie zostatku úveru banke",
    netProceedsOnSale: "= Čistý výnos z predaja bytu do ruky",
    rentIncome5y: "+ Kumulovaný príjem z prenájmu (5 rokov)",
    taxRefund5y: "+ Kumulovaný daňový bonus (5 rokov)",

    unrecoverableExpensesTitle: "NENÁVRATNÉ VÝDAVKY (−)",
    interestPaid5y: "− Zaplatené úroky banke (5 rokov)",
    utilitiesInsurance5y: "− Energie a poistenie (5 rokov)",
    rentalTax5y: "− Daň z príjmu z prenájmu (5 rokov)",
    oneTimeExpenses: "− Jednorazové poplatky kúpy",
    renovationCost: "− Náklady na rekonštrukciu",

    totalCashReceived: "CELKOVÝ PRIJATÝ KAPITÁL PO 5 ROKOCH",
    totalInvested: "− CELKOVO INVESTOVANÉ Z VLASTNÉHO (Akontácia+Poplatky+Rekonštrukcia+Splátky/Energie/Dane)",
    netProfit: "ČISTÝ ZISK (Zisk nad rámec všetkých investovaných peňazí)",

    roiInitialPreTax: "1. ROI z prvej investície (pred daňou, %)",
    roiInitialPostTax: "↳ po zohľadnení dane z prenájmu (%)",
    roiTotalPreTax: "2. ROI z celkového investovaného kapitálu za 5 rokov (pred daňou, %)",
    roiTotalPostTax: "↳ po zohľadnení dane z prenájmu (%)",

    executiveSummaryTitle: "Čistý zisk a ROI za 5 rokov",
    executiveSummarySub: "Konečný výsledok po zohľadnení všetkých výdavkov, hypotéky, nájmu a daní",
    toggleDetailsShow: "Zobraziť podrobnú kalkuláciu ↓",
    toggleDetailsHide: "Skryť podrobnú kalkuláciu ↑",
    profitFormulaTitle: "Z čoho sa skladá váš čistý zisk:",
  },

  en: {
    // Header & Layout
    articles: "Articles",
    blog: "Blog",
    about: "About",
    share: "Share",
    copied: "Link copied to clipboard!",

    // Sidebar & Navigation
    tableOfContents: "On this page",
    continueReading: "Continue Reading",
    moreIn: "More in",
    modelParameters: "Model Parameters",
    modifiedCount: "Modified {{modified}} of {{total}}",
    generateReport: "Generate Report",
    shareLink: "Share Link",
    resetAll: "Reset All",

    // Hold to Compare
    holdToCompare: "👁️ Hold to Compare: Author's Values",
    comparingActive: "SHOWING AUTHOR VALUES...",
    compareHint: "Hold the button to temporarily see the author's baseline calculation.",

    // Inputs & Variable Cards
    examplePrefix: "Example:",
    resetSuffix: "reset",
    holdAuthorVal: "Hold: Author {{val}}",
    showingAuthorVal: "Author's value: {{val}}",
    holdTitleAttr: "Hold the button to temporarily see the author's default value",
    clickToResetAttr: "Click to reset to author's value",

    // Report View
    generatedAt: "Generated:",
    reportSubtitle: "Interactive analytical report — click any value to change parameter and recalculate in real time.",
    keyMetricsTitle: "Key 5-Year Metrics",
    netProfitBase: "Net Profit (Base Case)",
    roiTotalEquityLabel: "Total Outlay ROI",
    monthlyCashFlowLabel: "Monthly Cash Flow",
    accumulatedEquity: "Built Equity (Principal Paid)",
    inputParamsTitle: "Model Input Parameters",
    clickToEditDesc: "You can click any value in the table below to edit it. All metrics recalculate automatically.",
    parameterHeader: "Parameter",
    valueHeader: "Value",
    scenario3Title: "3-Scenario Comparison Breakdown",
    itemIncomeExpenseHeader: "5-Year Revenue & Expense Line Items",
    downloadPdf: "Download PDF / Print",
    copyShareLink: "Copy Share Link",
    resetToDefault: "Reset to Default",

    // Feedback & Comments
    wasHelpful: "Was this article helpful?",
    like: "Helpful",
    dislike: "Not helpful",
    thankYouFeedback: "Thank you for your feedback!",
    commentsTitle: "Discussion & Comments",
    addCommentPlaceholder: "Write a comment or question about calculations...",
    authorNamePlaceholder: "Your name (optional)",
    postComment: "Post Comment",
    reply: "Reply",
    noCommentsYet: "No comments yet. Be the first to share your thoughts!",

    // Quick Article Meta & Value Badge
    metaVariables: "21 Interactive Variables",
    metaDifficulty: "Advanced Analysis",
    metaCharts: "3 Charts & 5Y Model",
    metaReadTime: "12 min research time",
    metaValueText: "Interactive Tool: tweak any variable right in the text or sidebar — the model instantly recalculates 5-year ROI for your property.",

    // Scenario Table
    monthlyCashFlowTitle: "1. Monthly Cash Flow & 5-Year Balance",
    rentPlusBonus: "Rent with renovation + Tax bonus:",
    expensesPreTax: "Mortgage + utilities + insurance:",
    cashFlowPreTax: "Pre-tax Monthly Cash Flow:",
    rentalTaxMonthly: "− Rental income tax:",
    cashFlowPostTax: "Post-tax Monthly Cash Flow:",
    cashFlow5yPreTax: "5-Year Cash Flow (Pre-tax):",
    cashFlow5yPostTax: "5-Year Cash Flow (Post-tax):",

    outOfPocketTitle: "2. Total Out-of-Pocket Money Invested (5 Years)",
    downPayment: "Down payment (10%):",
    closingFees: "Closing fees + Renovation:",
    mortgageUtilities5y: "Mortgage + utilities + tax (5 years):",
    totalOutOfPocket: "TOTAL OUT-OF-POCKET SPENT OVER 5 YEARS:",

    tableHeaderMetric: "5-Year Net Profit & Scenario Breakdown",
    scenarioBad: "Pessimistic",
    scenarioBase: "Base Case",
    scenarioGood: "Optimistic",

    salePrice5y: "Property sale price after 5 years",
    loanBalancePayoff: "− Remaining loan payoff to bank",
    netProceedsOnSale: "= Net proceeds from property sale",
    rentIncome5y: "+ Accumulated rental income (5 years)",
    taxRefund5y: "+ Accumulated tax refunds (5 years)",

    unrecoverableExpensesTitle: "UNRECOVERABLE EXPENSES (−)",
    interestPaid5y: "− Mortgage interest paid to bank (5 years)",
    utilitiesInsurance5y: "− Utilities and insurance (5 years)",
    rentalTax5y: "− Rental income tax (5 years)",
    oneTimeExpenses: "− One-time closing fees",
    renovationCost: "− Renovation cost",

    totalCashReceived: "TOTAL CASH IN HAND AFTER 5 YEARS",
    totalInvested: "− TOTAL OUT-OF-POCKET INVESTED (Down payment + Fees + Renovation + Monthly Outlays)",
    netProfit: "NET PROFIT (Pure profit above all money invested)",

    roiInitialPreTax: "1. Initial Equity ROI (Pre-tax, %)",
    roiInitialPostTax: "↳ including rental tax (%)",
    roiTotalPreTax: "2. Total 5-Year Outlay ROI (Pre-tax, %)",
    roiTotalPostTax: "↳ including rental tax (%)",

    executiveSummaryTitle: "5-Year Net Profit & ROI Breakdown",
    executiveSummarySub: "Final investment yield after all expenses, mortgage, rental income, and taxes",
    toggleDetailsShow: "Show Detailed Financial Breakdown ↓",
    toggleDetailsHide: "Hide Detailed Breakdown ↑",
    profitFormulaTitle: "How Your Net Profit is Formed:",
  },
};

export const VARIABLE_LABELS: Record<Language, Record<string, string>> = {
  ru: {
    propertyPrice: "Стоимость квартиры (€)",
    downPaymentPercent: "Первоначальный взнос (%)",
    valuationFee: "Оценка недвижимости (€)",
    cadastreFee: "Кадастр (€)",
    registrationFee: "Регистрация перехода права (€)",
    signatureFee: "Заверение подписей (€)",
    bankCommission: "Комиссия банка (€)",
    interestRate: "Процентная ставка (%)",
    loanTermYears: "Срок кредита (лет)",
    insuranceMonthly: "Страхование квартиры (€/мес)",
    utilitiesMonthly: "Коммунальные платежи (€/мес)",
    propertyTaxMonthly: "Налог на недвижимость (€/мес)",
    renovationCost: "Стоимость ремонта (€)",
    rentIncreaseFromRenovation: "Прирост аренды от ремонта (€/мес)",
    initialRentMonthly: "Начальная аренда (€/мес)",
    incomeTaxRate: "Налог на доход от найма (%)",
    annualRentGrowth: "Ежегодный рост аренды (%)",
    taxRefundAnnual: "Возврат налогов в год (€)",
    growthBad: "Плохой рост цен (% в год)",
    growthBase: "Базовый рост цен (% в год)",
    growthGood: "Хороший рост цен (% в год)",
  },
  sk: {
    propertyPrice: "Kúpna cena bytu (€)",
    downPaymentPercent: "Akontácia (%)",
    valuationFee: "Znalecký posudok (€)",
    cadastreFee: "Kataster (€)",
    registrationFee: "Registrácia práv (€)",
    signatureFee: "Overenie podpisov (€)",
    bankCommission: "Provízia banky (€)",
    interestRate: "Úroková sadzba (%)",
    loanTermYears: "Splatnosť úveru (roky)",
    insuranceMonthly: "Poistenie bytu (€/mes)",
    utilitiesMonthly: "Energie a správa (€/mes)",
    propertyTaxMonthly: "Daň z nehnuteľností (€/mes)",
    renovationCost: "Náklady na rekonštrukciu (€)",
    rentIncreaseFromRenovation: "Zvýšenie nájmu rekonštrukciou (€/mes)",
    initialRentMonthly: "Počiatočné nájomné (€/mes)",
    incomeTaxRate: "Daň z príjmu z prenájmu (%)",
    annualRentGrowth: "Ročná indexácia nájmu (%)",
    taxRefundAnnual: "Ročný daňový bonus (€/rok)",
    growthBad: "Pesimistický rast cien (%/rok)",
    growthBase: "Základný rast cien (%/rok)",
    growthGood: "Optimistický rast cien (%/rok)",
  },
  en: {
    propertyPrice: "Apartment purchase price (€)",
    downPaymentPercent: "Down payment (%)",
    valuationFee: "Valuation fee (€)",
    cadastreFee: "Cadastre fee (€)",
    registrationFee: "Registration fee (€)",
    signatureFee: "Notary fee (€)",
    bankCommission: "Bank fee (€)",
    interestRate: "Interest rate (%)",
    loanTermYears: "Loan term (years)",
    insuranceMonthly: "Property insurance (€/mo)",
    utilitiesMonthly: "Utilities & HOA (€/mo)",
    propertyTaxMonthly: "Property tax (€/mo)",
    renovationCost: "Renovation cost (€)",
    rentIncreaseFromRenovation: "Rent boost from renovation (€/mo)",
    initialRentMonthly: "Initial rent (€/mo)",
    incomeTaxRate: "Rental income tax rate (%)",
    annualRentGrowth: "Annual rent growth (%)",
    taxRefundAnnual: "Annual tax refund (€/yr)",
    growthBad: "Pessimistic price growth (%/yr)",
    growthBase: "Base case price growth (%/yr)",
    growthGood: "Optimistic price growth (%/yr)",
  },
};

export function getLocalizedVariables(
  variables: Record<string, Variable>,
  lang: Language = "ru"
): Record<string, Variable> {
  const localizedLabels = VARIABLE_LABELS[lang] || VARIABLE_LABELS.ru;
  const result: Record<string, Variable> = {};

  for (const [id, v] of Object.entries(variables)) {
    result[id] = {
      ...v,
      label: localizedLabels[id] || v.label,
    };
  }

  return result;
}

export function getTranslation(lang: Language = "ru") {
  return translations[lang] || translations.ru;
}
