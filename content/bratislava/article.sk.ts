import { Article } from "@/types/article";
import { bratislavaVariables } from "./variables";
import { bratislavaModel } from "./model";
import { Block } from "@/types/block";

const bratislavaBlocksSK: Block[] = [
  // ── Header Section ─────────────────────────────────────────
  {
    id: "title",
    type: "heading",
    level: 1,
    content: "Investícia do nehnuteľností v Bratislave: Výpočet ROI na 5 rokov",
  },
  {
    id: "intro-1",
    type: "paragraph",
    content:
      "Za posledných niekoľko rokov som vyskúšal takmer všetky populárne investičné nástroje: akcie, dlhopisy, kryptomeny a rôzne alternatívne investičné metódy.",
  },
  {
    id: "intro-2",
    type: "paragraph",
    content:
      "V určitom momente som chcel vyskúšať nehnuteľnosti. Ale pred kúpou bytu som chcel odpoveď len na jednu otázku: aké ROI získam zo svojich investovaných peňazí?",
  },
  {
    id: "intro-3",
    type: "paragraph",
    content:
      "Keď som začal hľadať informácie, ukázalo sa, že väčšina článkov hovorí o nehnuteľnostiach ako o 'bezpečnej investícii', ale takmer nikto nepočítal kompletnú ekonomiku obchodu. V tomto článku urobíme presne to: rozoberieme kúpu, hypotéku, rekonštrukciu, prenájom a vypočítame 5-ročné ROI.",
  },
  {
    id: "intro-roi-explanation",
    type: "callout",
    variant: "insight",
    content:
      "**Čo je ROI (Return on Investment)?**\n\n" +
      "**ROI** (návratnosť investície) je kľúčový ukazovateľ efektívnosti vložených peňazí. Ukazuje, aké percento čistého zisku ste dosiahli v pomere k celkovým vlastným investovaným prostriedkom z vlastného vrecka:\n\n" +
      "**ROI = (Čistý zisk ÷ Celkovo investovaný vlastný kapitál) × 100%**\n\n" +
      "Napríklad, ak ste investovali 20 000 € vlastných peňazí (akontácia + poplatky + rekonštrukcia) a po 5 rokoch dosiahnete čistý zisk 10 000 € nad rámec všetkých výdavkov, váš ROI bude 50% (~10% ročne).",
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
    content: "Východiskové podmienky",
  },
  {
    id: "conditions-p1",
    type: "paragraph",
    content:
      "Aby boli výpočty čo najrealistickejšie, uvažujeme o 2-izbových bytoch v Bratislave s dobrou dopravnou dostupnosťou vyžadujúcich kozmetickú rekonštrukciu (doba držania 5 rokov). " +
      "Hlavným kritériom výberu je kúpna cena približne 3300–3600 €/m².",
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
    content: "Krok 1. Kúpna cena",
  },
  {
    id: "step1-p",
    type: "paragraph",
    content:
      "Základná kúpna cena nehnuteľnosti určuje celú budúcu ekonomiku projektu. Zadajte cenu nehnuteľnosti v poli nižšie:",
  },
  {
    id: "input-price",
    type: "variableInput",
    variableId: "propertyPrice",
    description: "Zadajte kúpnu cenu bytu v eurách (€).",
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
    content: "Krok 2. Akontácia a úverový pákový efekt",
  },
  {
    id: "step2-p",
    type: "paragraph",
    content:
      "Hlavnou výhodou nehnuteľností oproti mnohým iným aktívam je finančná páka. V našom príklade banka financuje 90% nehnuteľnosti. Nastavte percento akontácie z vlastných zdrojov:",
  },
  {
    id: "input-downpayment",
    type: "variableInput",
    variableId: "downPaymentPercent",
    description: "Percento akontácie hradené z vlastných zdrojov.",
    example: "10%",
  },
  {
    id: "step2-results",
    type: "callout",
    variant: "info",
    content:
      "Pri cene nehnuteľnosti {{var:propertyPrice}} a akontácii {{var:downPaymentPercent}}:\n" +
      "• Vlastné zdroje (akontácia): {{result:downPayment}} €\n" +
      "• Výška hypotekárneho úveru: {{result:loanAmount}} €",
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
    content: "Krok 3. Jednorazové poplatky pri kúpe",
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
    content: "Krok 4. Hypotéka a anuitná splátka",
  },
  {
    id: "step4-p",
    type: "paragraph",
    content:
      "Na Slovensku banky ponúkajú fixáciu úroku na 5 rokov. Nastavte podmienky hypotéky v poliach nižšie:",
  },
  {
    id: "input-interest",
    type: "variableInput",
    variableId: "interestRate",
    description: "Ročná úroková sadzba hypotéky.",
    example: "3.8%",
  },
  {
    id: "input-term",
    type: "variableInput",
    variableId: "loanTermYears",
    description: "Doba splatnosti hypotéky v rokoch.",
    example: "30 rokov",
  },
  {
    id: "formula-callout",
    type: "callout",
    variant: "insight",
    content:
      "Vzorec anuitnej splátky: P × r × (1+r)^n / ((1+r)^n − 1)\n" +
      "Mesačná splátka hypotéky: {{result:monthlyMortgage}} €/mes.",
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
    content: "Krok 5. Mesačné výdavky",
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
    content: "Krok 6. Rekonštrukcia v štýle Pinterest a návratnosť",
  },
  {
    id: "step6-p1",
    type: "paragraph",
    content:
      "Hlavným cieľom rekonštrukcie nie je ohromiť hostí, ale zvýšiť nájomné a atraktivitu bytu pri minimálnych investíciách (jednofarebné steny, štýlové osvetlenie, minimalizmus, kvalitné spotrebiče z druhej ruky). " +
      "Základné pravidlo: rekonštrukcia sa musí vrátiť minimálne trojnásobne za 5 rokov.",
  },
  {
    id: "input-renovation-cost",
    type: "variableInput",
    variableId: "renovationCost",
    description: "Náklady na rekonštrukciu v eurách (€).",
    example: "1 000 €",
  },
  {
    id: "input-rent-increase",
    type: "variableInput",
    variableId: "rentIncreaseFromRenovation",
    description: "Očakávané zvýšenie nájomného z rekonštrukcie (€/mes).",
    example: "50 €",
  },
  {
    id: "renovation-callout",
    type: "callout",
    variant: "info",
    content:
      "Investovaním {{var:renovationCost}} do rekonštrukcie so zvýšením nájmu o {{var:rentIncreaseFromRenovation}}:\n" +
      "• Dodatočný príjem za 5 rokov: {{result:renovation5yIncome}} €\n" +
      "• Návratnosť rekonštrukcie: {{result:renovationPaybackMonths}} mesiacov\n" +
      "• ROI rekonštrukcie: {{result:renovationRoi}} %",
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
    content: "Krok 7. Príjem z prenájmu, daň z prenájmu (19%) a Cash Flow",
  },
  {
    id: "step7-cashflow-explanation",
    type: "callout",
    variant: "info",
    content:
      "**Čo je Cash Flow (Penažný tok)?**\n\n" +
      "**Cash Flow** je pravidelný čistý mesačný prebytok peňazí, ktorý vám zostane v ruke **každý mesiac** po prijatí nájomného a zaplatení všetkých výdavkov:\n\n" +
      "**Cash Flow = Príjem z prenájmu − (Splátka hypotéky + Energie + Poistenie + Daň)**\n\n" +
      "• **Kladný Cash Flow (> 0 €)**: byt plne pokrýva svoje náklady a prináša čistý pasívny príjem každý mesiac.\n" +
      "• **Záporný Cash Flow (< 0 €)**: za vlastníctvo nehnuteľnosti musíte každý mesiac doplácať z vlastného vrecka.",
  },
  {
    id: "step7-p",
    type: "paragraph",
    content:
      "Zadajte počiatočné nájomné, sadzbu dane z príjmu z prenájmu (platí sa z čistého nájmu: Nájom mínus Energie), ročnú indexáciu nájomného a daňový bonus na úroky z hypotéky:",
  },
  {
    id: "input-rent",
    type: "variableInput",
    variableId: "initialRentMonthly",
    description: "Počiatočné mesačné nájomné (€/mes).",
    example: "750 €",
  },
  {
    id: "input-tax-rate",
    type: "variableInput",
    variableId: "incomeTaxRate",
    description: "Sadzba dane z príjmu z prenájmu (% z Nájom mínus Energie).",
    example: "19%",
  },
  {
    id: "input-growth-rent",
    type: "variableInput",
    variableId: "annualRentGrowth",
    description: "Ročná indexácia / rast nájomného (%).",
    example: "5.0%",
  },
  {
    id: "input-tax-refund",
    type: "variableInput",
    variableId: "taxRefundAnnual",
    description: "Ročný daňový bonus na úroky z hypotéky (€/rok).",
    example: "1 200 €",
  },
  {
    id: "tax-income-callout",
    type: "callout",
    variant: "info",
    content:
      "Výpočet dane z prenájmu ({{var:incomeTaxRate}}):\n" +
      "• Zdaniteľný základ (Nájom − Energie): {{result:taxableRentalIncomeMonthly}} €/mes\n" +
      "• Mesačná daň z prenájmu: {{result:rentalIncomeTaxMonthly}} €/mes\n" +
      "• Celková daň z prenájmu za 5 rokov: {{result:rentalIncomeTax5y}} €",
  },
  {
    id: "cash-flow-callout",
    type: "callout",
    variant: "insight",
    content:
      "Mesačný čistý Cash Flow: Nájomné s rekonštrukciou ({{result:monthlyRentWithRenovation}} €) + daňový bonus ({{result:taxRefundMonthlyEquivalent}} €) MÍNUS celkové výdavky vrátane dane z prenájmu ({{result:totalMonthlyExpenses}} €).\n" +
      "Čistý mesačný cash flow: {{result:monthlyNetCashFlowYear1}} €/mes.",
  },
  {
    id: "result-cash-flow",
    type: "result",
    label: "Čistý mesačný Cash Flow (1. rok)",
    resultId: "monthlyNetCashFlowYear1",
  },
  {
    id: "result-rent-5y",
    type: "result",
    label: "Celkový príjem z prenájmu za 5 rokov",
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
    content: "Krok 8. Rast ceny nehnuteľnosti a 3 scenáre",
  },
  {
    id: "step8-p",
    type: "paragraph",
    content:
      "Zadajte ročnú mieru zhodnotenia nehnuteľnosti pre tri scenáre (Pesimistický, Základný a Optimistický) nižšie:",
  },
  {
    id: "input-growth-bad",
    type: "variableInput",
    variableId: "growthBad",
    description: "Ročný rast ceny — Pesimistický scenár (%).",
    example: "2.0%",
  },
  {
    id: "input-growth-base",
    type: "variableInput",
    variableId: "growthBase",
    description: "Ročný rast ceny — Základný scenár (%).",
    example: "4.5%",
  },
  {
    id: "input-growth-good",
    type: "variableInput",
    variableId: "growthGood",
    description: "Ročný rast ceny — Optimistický scenár (%).",
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
    content: "Konečný prehľad ROI za 5 rokov",
  },
  {
    id: "table-explanation",
    type: "paragraph",
    content:
      "Súhrnná tabuľka nižšie zohľadňuje všetky peňažné toky za 5 rokov: zhodnotenie ceny nehnuteľnosti, príjem z prenájmu, daňový bonus, splatenú istinu, mínus všetky nenávratné náklady (úroky, energie, 19% daň z prenájmu, poplatky a rekonštrukcia).",
  },
  {
    id: "table-roi",
    type: "scenarioTable",
    title: "Matica príjmov, výdavkov a 5-ročného ROI",
  },

  // ── Záver ────────────────────────────────────
  {
    id: "conclusion-title",
    type: "heading",
    level: 2,
    content: "Záver",
  },
  {
    id: "conclusion-p",
    type: "paragraph",
    content:
      "Väčšina ľudí hodnotí investície do nehnuteľností výhradne podľa mesačného nájomného. V skutočnosti sa celkový výnos skladá z rastu ceny nehnuteľnosti, nájomného, úverovej páky (nájomca spláca istinu), daňových bonusov a rozumného zhodnotenia rekonštrukciou.",
  },
];

export const bratislavaArticleSK: Article = {
  variables: bratislavaVariables,
  model: bratislavaModel,
  blocks: bratislavaBlocksSK,
};
