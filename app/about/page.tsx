"use client";

import { Header } from "@/components/layout/Header";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { Language, LANGUAGES } from "@/types/language";

const ABOUT_CONTENT = {
  ru: {
    badge: "О платформе Articta",
    heroTitle: "Знания не должны быть статичными. Это интерактивный инструмент.",
    heroLead:
      "Articta — это образовательно-аналитическая платформа нового поколения. Пользователь не просто читает статью, а работает с ней: меняет входные параметры и мгновенно получает пересчитанные результаты.",
    heroCta: "Открыть модель Братиславы →",

    langLabel: "Язык контента:",

    essenceBadge: "⚡ В ЧЁМ СУТЬ ПРОЕКТА",
    essenceTitle: "Материалы = Интеллектуальные живые инструменты, а не просто текст",
    essenceText1:
      "Обычные статьи предлагают вам готовые чужие цифры и статические выводы. Articta меняет этот подход: мы превращаем аналитические разборы, финансовые оценки и исследовательские статьи в гибкие интерактивные модели.",
    essenceText2:
      "Каждый параметр — от процентной ставки по ипотеке до темпов роста выручки компании — доступен для изменения прямо в тексте. Все зависимости, графики и итоговый ROI пересчитываются мгновенно под вашу персональную ситуацию.",

    featuresTitle: "Ключевые возможности платформы",
    features: [
      {
        icon: "🧠",
        title: "Исполняемые знания (Executable Knowledge)",
        desc: "Вместо чтива на 15 минут вы получаете полноценный микро-софт. Меняйте предпосылки автора и проверяйте их на прочность.",
      },
      {
        icon: "⚡",
        title: "Мгновенный перерасчет на лету",
        desc: "Любое движение ползунка или поле ввода сразу обновляет формулы, итоговые таблицы и аналитические диаграммы.",
      },
      {
        icon: "📊",
        title: "3 Сценария расчетов",
        desc: "Автоматический сравнительный разбор оптимистичного, базового и пессимистичного сценариев развития событий.",
      },
      {
        icon: "📄",
        title: "Генерация отчётов и PDF",
        desc: "Экспорт профессионального отчёта с вашими персональными цифрами в один клик для печати или отправки партнерам.",
      },
    ],

    categoriesTitle: "Ключевые направления исследований",
    categories: [
      { name: "Finance", desc: "Финансовые модели, ипотека, инвест-оценка", color: "#2563eb" },
      { name: "Technology", desc: "Технологические тренды, архитектура ПО", color: "#06b6d4" },
      { name: "Economics", desc: "Макроэкономика, инфляция, рынки", color: "#10b981" },
      { name: "Science", desc: "Научные методы и фундаментальный анализ", color: "#f97316" },
      { name: "Psychology", desc: "Поведенческая экономика и решения", color: "#8b5cf6" },
      { name: "Business", desc: "Юнит-экономика и стратегия компаний", color: "#475569" },
    ],

    targetBadge: "🎯 Для кого",
    targetTitle: "Для кого создана Articta?",
    targetText:
      "Для инвесторов, предпринимателей, финансово грамотных специалистов и всех, кто предпочитает прозрачные, проверяемые факты и живые расчеты статичным экспертным мнениям.",

    ctaTitle: "Готовы протестировать интерактивную модель?",
    ctaText: "Откройте наш подробный разбор инвестиций в недвижимость Братиславы и изменяйте вводные параметры в реальном времени.",
    ctaBtn: "Исследовать модель Братиславы →",
    ctaSecondaryBtn: "Вернуться к статьям",
  },

  sk: {
    badge: "O platforme Articta",
    heroTitle: "Vedomosti nemajú byť statické. Sú interaktívnym nástrojom.",
    heroLead:
      "Articta je vzdelávacia a analytická platforma novej generácie. Používateľ článok len nečíta, ale aktívne s ním pracuje: mení vstupné parametre a okamžite získava prepočítané výsledky.",
    heroCta: "Otvoriť model Bratislava →",

    langLabel: "Jazyk obsahu:",

    essenceBadge: "⚡ PODSTATA PROJEKTU",
    essenceTitle: "Materiály = Živé intelektuálne nástroje, nie len text",
    essenceText1:
      "Bežné články vám ponúkajú cudzie pevné čísla a statické závery. Articta tento prístup mení: meníme analytické rozbory, finančné hodnotenia a výskumné štúdie na flexibilné interaktívne modely.",
    essenceText2:
      "Každý parameter — od úrokovej sadzby hypotéky po tempo rastu tržieb — je možné zmeniť priamo v texte. Všetky vzorce, grafy a výsledný ROI sa okamžite prepočítajú pre vašu konkrétnu situáciu.",

    featuresTitle: "Kľúčové možnosti platformy",
    features: [
      {
        icon: "🧠",
        title: "Spustiteľné vedomosti (Executable Knowledge)",
        desc: "Namiesto 15-minútového čítania získate plnohodnotný mikro-software. Zmeňte predpoklady autora a overte ich v praxi.",
      },
      {
        icon: "⚡",
        title: "Okamžitý prepočet v reálnom čase",
        desc: "Akákoľvek zmena premennej v texte alebo v bočnom paneli okamžite aktualizuje výpočty a analytické diagramy.",
      },
      {
        icon: "📊",
        title: "Porovnanie 3 scenárov",
        desc: "Automatický rozbor optimistického, základného a pesimistického scenára vývoja.",
      },
      {
        icon: "📄",
        title: "Generovanie vlastných PDF správ",
        desc: "Export profesionálnej správ s vašimi vlastnými číslami na jeden klik na tlač alebo zdieľanie.",
      },
    ],

    categoriesTitle: "Kľúčové oblasti výskumu",
    categories: [
      { name: "Finance", desc: "Finančné modely, hypotéky, investície", color: "#2563eb" },
      { name: "Technology", desc: "Technologické trendy, architektúra", color: "#06b6d4" },
      { name: "Economics", desc: "Makroekonómia, inflácia, trhy", color: "#10b981" },
      { name: "Science", desc: "Vedecké metódy a analýza", color: "#f97316" },
      { name: "Psychology", desc: "BiBehaviorálna ekonómia a rozhodovanie", color: "#8b5cf6" },
      { name: "Business", desc: "Unit-ekonomika a stratégia", color: "#475569" },
    ],

    targetBadge: "🎯 Pre kogo",
    targetTitle: "Pre koho je Articta určená?",
    targetText:
      "Pre investorov, podnikateľov, finančných analytikov a všetkých, ktorí uprednostňujú transparentné overiteľné fakty a živé výpočty pred statickými názormi.",

    ctaTitle: "Pripravení vyskúšať prvý interaktívny model?",
    ctaText: "Otvorte náš podrobný rozbor investície do nehnuteľností v Bratislave a zmeňte vstupné parametre v reálnom čase.",
    ctaBtn: "Preskúmať model Bratislava →",
    ctaSecondaryBtn: "Späť na články",
  },

  en: {
    badge: "About Articta Platform",
    heroTitle: "Knowledge is not static. It's an interactive tool.",
    heroLead:
      "Articta is a next-generation educational and analytical platform. Users don't just read articles — they actively interact with them by tweaking input parameters and watching recalculated results live.",
    heroCta: "Open Bratislava Model →",

    langLabel: "Content Language:",

    essenceBadge: "⚡ ESSENCE OF ARTICTA",
    essenceTitle: "Content = Live Executable Tools, Not Just Text",
    essenceText1:
      "Traditional articles force you to rely on fixed numbers and someone else's static assumptions. Articta changes that by transforming research reports and financial models into interactive software.",
    essenceText2:
      "Every variable — from mortgage interest rates to revenue growth projections — can be adjusted right inside the text. Formulas, charts, and 5-year ROI metrics recalculate instantly for your scenario.",

    featuresTitle: "Core Platform Capabilities",
    features: [
      {
        icon: "🧠",
        title: "Executable Knowledge",
        desc: "Instead of passive reading, you get functional analytical micro-software. Test author assumptions against your custom scenario.",
      },
      {
        icon: "⚡",
        title: "Real-time Instant Recalculations",
        desc: "Adjusting any input immediately updates mathematical models, tables, and analytical charts.",
      },
      {
        icon: "📊",
        title: "3-Scenario Breakdown",
        desc: "Compare optimistic, base case, and pessimistic scenarios without complex financial spreadsheets.",
      },
      {
        icon: "📄",
        title: "Custom PDF & Report Exports",
        desc: "Generate printable, shareable valuation reports with your tailored assumptions in one click.",
      },
    ],

    categoriesTitle: "Research Categories",
    categories: [
      { name: "Finance", desc: "Financial models, real estate, investment valuation", color: "#2563eb" },
      { name: "Technology", desc: "Tech trends, software architecture & AI", color: "#06b6d4" },
      { name: "Economics", desc: "Macroeconomics, inflation & market dynamics", color: "#10b981" },
      { name: "Science", desc: "Scientific methodology & quantitative analysis", color: "#f97316" },
      { name: "Psychology", desc: "Behavioral economics & decision-making", color: "#8b5cf6" },
      { name: "Business", desc: "Unit economics, SaaS metrics & corporate strategy", color: "#475569" },
    ],

    targetBadge: "🎯 Audience",
    targetTitle: "Who is Articta Built For?",
    targetText:
      "For investors, analysts, founders, and curious minds who value verifiable facts and dynamic modeling over static opinion pieces.",

    ctaTitle: "Ready to explore your first interactive model?",
    ctaText: "Open our detailed Bratislava Real Estate Investment model and start tweaking assumptions live.",
    ctaBtn: "Explore Bratislava Model →",
    ctaSecondaryBtn: "Browse Articles",
  },
};

export default function AboutPage() {
  const { language, setLanguage } = useLanguage();
  const content = ABOUT_CONTENT[language] || ABOUT_CONTENT.ru;

  return (
    <div className="app-viewport">
      <Header />
      <main className="static-page-container">
        {/* Language selector bar */}
        <div className="about-lang-bar">
          <span className="about-lang-label">{content.langLabel}</span>
          <div className="about-lang-buttons">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as Language)}
                className={`about-lang-btn ${language === lang.code ? "active" : ""}`}
              >
                {lang.code === "ru" && "🇷🇺 Русский"}
                {lang.code === "sk" && "🇸🇰 Slovenčina"}
                {lang.code === "en" && "🇬🇧 English"}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <div className="static-page-hero">
          <span className="static-badge">{content.badge}</span>
          <h1 className="static-title">{content.heroTitle}</h1>
          <p className="static-lead">{content.heroLead}</p>
          <div className="about-cta-buttons" style={{ marginTop: "1.25rem" }}>
            <Link href="/articles/bratislava" className="static-primary-btn">
              {content.heroCta}
            </Link>
          </div>
        </div>

        <hr className="article-divider" />

        {/* Essence Section */}
        <section className="about-essence-card">
          <span className="about-essence-badge">{content.essenceBadge}</span>
          <h2>{content.essenceTitle}</h2>
          <p>{content.essenceText1}</p>
          <p>{content.essenceText2}</p>
        </section>

        {/* Core Pillars / Features */}
        <div className="about-section-header">
          <h2>{content.featuresTitle}</h2>
        </div>
        <section className="static-grid">
          {content.features.map((feat, idx) => (
            <div key={idx} className="static-card">
              <div className="static-card-icon">{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </section>

        {/* Categories Section */}
        <div className="about-section-header">
          <h2>{content.categoriesTitle}</h2>
        </div>
        <section className="about-categories-grid">
          {content.categories.map((cat, idx) => (
            <div key={idx} className="about-category-card" style={{ borderTopColor: cat.color }}>
              <div className="about-category-badge" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                {cat.name}
              </div>
              <p>{cat.desc}</p>
            </div>
          ))}
        </section>

        {/* Target Audience Box */}
        <section className="about-target-box">
          <span className="static-badge">{content.targetBadge}</span>
          <h2>{content.targetTitle}</h2>
          <p>{content.targetText}</p>
        </section>

        {/* CTA Banner */}
        <div className="static-cta-box">
          <h2>{content.ctaTitle}</h2>
          <p>{content.ctaText}</p>
          <div className="about-cta-buttons">
            <Link href="/articles/bratislava" className="static-primary-btn">
              {content.ctaBtn}
            </Link>
            <Link href="/" className="about-secondary-btn">
              {content.ctaSecondaryBtn}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
