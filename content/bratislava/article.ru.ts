import { Article } from "@/types/article";
import { bratislavaVariables } from "./variables";
import { bratislavaModel } from "./model";
import { Block } from "@/types/block";

const bratislavaBlocksRU: Block[] = [
  // ── Header Section ─────────────────────────────────────────
  {
    id: "title",
    type: "heading",
    level: 1,
    content: "Инвестиции в недвижимость в Братиславе. Расчет ROI за 5 лет",
  },
  {
    id: "intro-1",
    type: "paragraph",
    content:
      "За последние несколько лет я успел попробовать практически все популярные инвестиционные инструменты: акции, облигации, криптовалюту и различные альтернативные способы инвестирования.",
  },
  {
    id: "intro-2",
    type: "paragraph",
    content:
      "В какой-то момент мне захотелось попробовать недвижимость. Но прежде чем покупать квартиру, я хотел получить ответ всего на один вопрос: какой ROI я получу на свои вложенные деньги?",
  },
  {
    id: "intro-3",
    type: "paragraph",
    content:
      "Когда я начал искать информацию, оказалось, что большинство статей говорят о недвижимости как о «надежной инвестиции», но практически никто не считает полную экономику сделки. В этой статье мы сделаем именно это: разберем покупку, ипотеку, ремонт, аренду и посчитаем 5-летний ROI.",
  },
  {
    id: "intro-roi-explanation",
    type: "callout",
    variant: "insight",
    content:
      "**Что такое ROI (Return on Investment)?**\n\n" +
      "**ROI** (коэффициент возврата инвестиций) — это главный показатель эффективности вложенных денег. Он показывает, какой процент чистой прибыли вы получили относительно реально потраченных собственных средств из кармана:\n\n" +
      "**ROI = (Чистая прибыль ÷ Всего вложено собственных денег) × 100%**\n\n" +
      "Например, если вы вложили 20 000 € собственных денег (взнос + оформление + ремонт), а за 5 лет получили 10 000 € чистой прибыли сверху всех расходов, ваш ROI составит 50% (или ~10% годовых).",
  },

  // ── Исходные условия ─────────────────────────────────────
  {
    id: "divider-conditions",
    type: "divider",
  },
  {
    id: "section-conditions",
    type: "heading",
    level: 2,
    content: "Исходные условия",
  },
  {
    id: "conditions-p1",
    type: "paragraph",
    content:
      "Чтобы расчеты были максимально приближены к реальности, мы рассматриваем двухкомнатные квартиры в Братиславе с хорошей транспортной доступностью, требующие косметического ремонта (период владения 5 лет). " +
      "Главный критерий выбора — стоимость покупки в районе 3300–3600 €/м².",
  },

  // ── Шаг 1: Стоимость покупки ─────────────────────────────
  {
    id: "divider-step1",
    type: "divider",
  },
  {
    id: "step-1",
    type: "heading",
    level: 2,
    content: "Шаг 1. Стоимость покупки",
  },
  {
    id: "step1-p",
    type: "paragraph",
    content:
      "Базовая цена покупки объекта определяет всю дальнейшую экономику проекта. Укажите стоимость объекта в поле ниже:",
  },
  {
    id: "input-price",
    type: "variableInput",
    variableId: "propertyPrice",
    description: "Укажите стоимость покупки квартиры в евро (€).",
    example: "160 000 €",
  },

  // ── Шаг 2: Первоначальный взнос ──────────────────────────
  {
    id: "divider-step2",
    type: "divider",
  },
  {
    id: "step-2",
    type: "heading",
    level: 2,
    content: "Шаг 2. Первоначальный взнос и кредитное плечо",
  },
  {
    id: "step2-p",
    type: "paragraph",
    content:
      "Главное преимущество недвижимости перед многими другими активами — возможность использовать кредитное плечо. В нашем примере банк финансирует 90% объекта. Задайте процент первоначального взноса собственными средствами:",
  },
  {
    id: "input-downpayment",
    type: "variableInput",
    variableId: "downPaymentPercent",
    description: "Процент первоначального взноса собственными средствами.",
    example: "10%",
  },
  {
    id: "step2-results",
    type: "callout",
    variant: "info",
    content:
      "При цене квартиры {{var:propertyPrice}} и первоначальном взносе {{var:downPaymentPercent}}:\n" +
      "• Собственные средства (взнос): {{result:downPayment}} €\n" +
      "• Сумма ипотечного кредита: {{result:loanAmount}} €",
  },

  // ── Шаг 3: Разовые расходы ───────────────────────────────
  {
    id: "divider-step3",
    type: "divider",
  },
  {
    id: "step-3",
    type: "heading",
    level: 2,
    content: "Шаг 3. Разовые расходы при покупке",
  },
  {
    id: "closing-fees-grid-step3",
    type: "closingFeesGrid",
  },

  // ── Шаг 4: Ипотека ───────────────────────────────────────
  {
    id: "divider-step4",
    type: "divider",
  },
  {
    id: "step-4",
    type: "heading",
    level: 2,
    content: "Шаг 4. Ипотека и аннуитетный платеж",
  },
  {
    id: "step4-p",
    type: "paragraph",
    content:
      "В Словакии банки предлагают фиксированную ставку на 5 лет. Задайте условия ипотечного кредитования в полях ниже:",
  },
  {
    id: "input-interest",
    type: "variableInput",
    variableId: "interestRate",
    description: "Годовая процентная ставка ипотеки.",
    example: "3.8%",
  },
  {
    id: "input-term",
    type: "variableInput",
    variableId: "loanTermYears",
    description: "Срок ипотечного кредита в годах.",
    example: "30 лет",
  },
  {
    id: "formula-callout",
    type: "callout",
    variant: "insight",
    content:
      "Формула аннуитетного платежа: P × r × (1+r)^n / ((1+r)^n − 1)\n" +
      "Ежемесячный платеж по ипотеке составляет: {{result:monthlyMortgage}} €/мес.",
  },

  // ── Шаг 5: Ежемесячные расходы ───────────────────────────
  {
    id: "divider-step5",
    type: "divider",
  },
  {
    id: "step-5",
    type: "heading",
    level: 2,
    content: "Шаг 5. Ежемесячные расходы",
  },
  {
    id: "expenses-grid-step5",
    type: "expensesGrid",
  },

  // ── Шаг 6: Ремонт в стиле Pinterest ──────────────────────
  {
    id: "divider-step6",
    type: "divider",
  },
  {
    id: "step-6",
    type: "heading",
    level: 2,
    content: "Шаг 6. Ремонт в стиле Pinterest и окупаемость",
  },
  {
    id: "step6-p1",
    type: "paragraph",
    content:
      "Главная цель ремонта — не впечатлить гостей, а увеличить стоимость аренды и привлекательность квартиры при минимальных вложениях. Наша цель — ремонт в стиле Pinterest (однотонные стены, стильный свет, минимализм, качественная б/у техника). " +
      "Главное правило: ремонт должен окупиться минимум в три раза за 5 лет.",
  },
  {
    id: "input-renovation-cost",
    type: "variableInput",
    variableId: "renovationCost",
    description: "Стоимость ремонта в евро (€).",
    example: "1 000 €",
  },
  {
    id: "input-rent-increase",
    type: "variableInput",
    variableId: "rentIncreaseFromRenovation",
    description: "Ожидаемый прирост аренды от ремонта в месяц (€/мес).",
    example: "50 €",
  },
  {
    id: "renovation-callout",
    type: "callout",
    variant: "info",
    content:
      "При вложении {{var:renovationCost}} в ремонт и приросте аренды на {{var:rentIncreaseFromRenovation}}:\n" +
      "• Дополнительный доход за 5 лет: {{result:renovation5yIncome}} €\n" +
      "• Окупаемость ремонта: {{result:renovationPaybackMonths}} мес.\n" +
      "• ROI ремонта: {{result:renovationRoi}} %",
  },

  // ── Шаг 7: Доход от аренды, Налоги и Ежемесячный Cash Flow ──
  {
    id: "divider-step7",
    type: "divider",
  },
  {
    id: "step-7",
    type: "heading",
    level: 2,
    content: "Шаг 7. Арендный доход, налог от найма (19%) и Cash Flow",
  },
  {
    id: "step7-cashflow-explanation",
    type: "callout",
    variant: "info",
    content:
      "**Что такое Cash Flow (Денежный поток)?**\n\n" +
      "**Cash Flow** — это чистый регулярный остаток денег, который остаётся у вас в кармане **каждый месяц** после получения арендной платы и уплаты абсолютно всех расходов:\n\n" +
      "**Cash Flow = Доход от аренды − (Ипотека + Коммуналка + Страховка + Налог)**\n\n" +
      "• **Положительный Cash Flow (> 0 €)**: квартира полностью окупает текущие расходы и приносит пассивный денежный доход каждый месяц.\n" +
      "• **Отрицательный Cash Flow (< 0 €)**: вам приходится ежемесячно доплачивать за владение объектом из собственных личных средств.",
  },
  {
    id: "step7-p",
    type: "paragraph",
    content:
      "Укажите начальную арендную плату, ставку налога на доход от найма (платится с чистой суммы найма: Аренда минус Коммуналка), ежегодный рост аренды и сумму возврата налогов по процентам ипотеки:",
  },
  {
    id: "input-rent",
    type: "variableInput",
    variableId: "initialRentMonthly",
    description: "Начальная арендная плата в месяц (€/мес).",
    example: "750 €",
  },
  {
    id: "input-tax-rate",
    type: "variableInput",
    variableId: "incomeTaxRate",
    description: "Ставка налога на доход от найма (% от суммы: Аренда минус Коммуналка).",
    example: "19%",
  },
  {
    id: "input-growth-rent",
    type: "variableInput",
    variableId: "annualRentGrowth",
    description: "Ежегодная индексация / рост арендной ставки (%).",
    example: "5.0%",
  },
  {
    id: "input-tax-refund",
    type: "variableInput",
    variableId: "taxRefundAnnual",
    description: "Ежегодный возврат налогов по процентам ипотеки (€/год).",
    example: "1 200 €",
  },
  {
    id: "tax-income-callout",
    type: "callout",
    variant: "info",
    content:
      "Расчет налога от найма ({{var:incomeTaxRate}}):\n" +
      "• Налогооблагаемая база (Аренда − Коммуналка): {{result:taxableRentalIncomeMonthly}} €/мес\n" +
      "• Налог на доход от найма в месяц: {{result:rentalIncomeTaxMonthly}} €/мес\n" +
      "• Суммарный налог от найма за 5 лет: {{result:rentalIncomeTax5y}} €",
  },
  {
    id: "cash-flow-callout",
    type: "callout",
    variant: "insight",
    content:
      "Ежемесячный чистый Cash Flow: Поступающая аренда с ремонтом ({{result:monthlyRentWithRenovation}} €) + налоговый возврат ({{result:taxRefundMonthlyEquivalent}} €) МИНУС обязательные рекуррентные расходы с налогом от найма ({{result:totalMonthlyExpenses}} €).\n" +
      "Ежемесячный денежный поток: {{result:monthlyNetCashFlowYear1}} €/мес.",
  },
  {
    id: "result-cash-flow",
    type: "result",
    label: "Чистый ежемесячный Cash Flow (1-й год)",
    resultId: "monthlyNetCashFlowYear1",
  },
  {
    id: "result-rent-5y",
    type: "result",
    label: "Суммарный арендный доход за 5 лет",
    resultId: "totalRentIncome5y",
  },

  // ── Шаг 8: Рост стоимости недвижимости ───────────────────
  {
    id: "divider-step8",
    type: "divider",
  },
  {
    id: "step-8",
    type: "heading",
    level: 2,
    content: "Шаг 8. Рост стоимости недвижимости и 3 сценария",
  },
  {
    id: "step8-p",
    type: "paragraph",
    content:
      "Задайте темпы ежегодного роста цены объекта для трех сценариев (Плохой, Базовый и Хороший) в полях ниже:",
  },
  {
    id: "input-growth-bad",
    type: "variableInput",
    variableId: "growthBad",
    description: "Ежегодный рост цены — Плохой сценарий (%).",
    example: "2.0%",
  },
  {
    id: "input-growth-base",
    type: "variableInput",
    variableId: "growthBase",
    description: "Ежегодный рост цены — Базовый сценарий (%).",
    example: "4.5%",
  },
  {
    id: "input-growth-good",
    type: "variableInput",
    variableId: "growthGood",
    description: "Ежегодный рост цены — Хороший сценарий (%).",
    example: "7.0%",
  },

  // ── Итоговая Таблица ROI и Детализация ────────────────────
  {
    id: "divider-results",
    type: "divider",
  },
  {
    id: "section-table",
    type: "heading",
    level: 2,
    content: "Итоговый расчет ROI за 5 лет",
  },
  {
    id: "table-explanation",
    type: "paragraph",
    content:
      "В сводной таблице ниже учтены абсолютно все денежные потоки за 5 лет: прирост стоимости, доход от аренды, возврат налогов, выплаченное тело кредита (накопленный капитал в квартире), а также вычтены все невозвратные расходы (проценты по ипотеке, коммунальные платежи, налог от найма 19%, налоги, оформление и ремонт).",
  },
  {
    id: "table-roi",
    type: "scenarioTable",
    title: "Детализация доходов, расходов и 5-летнего ROI",
  },

  // ── Вывод ────────────────────────────────────
  {
    id: "conclusion-title",
    type: "heading",
    level: 2,
    content: "Вывод",
  },
  {
    id: "conclusion-p",
    type: "paragraph",
    content:
      "Большинство людей оценивают инвестиции в недвижимость только по размеру ежемесячной аренды. На самом деле итоговая доходность складывается из роста стоимости самого объекта, аренды, кредитного плеча (погашения тела долга арендатором), налоговых возвратов и рационального ремонта.",
  },
];

export const bratislavaArticleRU: Article = {
  variables: bratislavaVariables,
  model: bratislavaModel,
  blocks: bratislavaBlocksRU,
};
