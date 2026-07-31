"use client";

import { Header } from "@/components/layout/Header";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

const HOME_CONTENT = {
  ru: {
    badge: "Образовательно-аналитическая платформа",
    heroTitle: "Исследования, которые можно протестировать на своих цифрах.",
    heroLead:
      "Articta превращает финансовые статьи и аналитические разборы в интерактивные инструменты. Меняйте параметры прямо в тексте и получайте персональные расчеты.",
    ctaPrimary: "Открыть модель Братиславы →",
    ctaSecondary: "О платформе",

    featuredTitle: "Интерактивные исследования и модели",
    featuredSub: "Выберите материал для детального анализа и перерасчета на ваших вводных данных",
    cardCta: "Интерактивный перерасчет →",

    articles: [
      {
        slug: "bratislava",
        category: "Финансы",
        categoryColor: "#2563eb",
        title: "Инвестиции в недвижимость в Братиславе. Расчет ROI за 5 лет",
        desc: "Полный экономический разбор покупки 2-комнатной квартиры: ипотека, налоговый вычет, ремонт в стиле Pinterest, доход от аренды и итоговая чистая прибыль.",
        params: "21 параметр",
        readTime: "12 мин",
        href: "/articles/bratislava",
      },
      {
        slug: "tesla",
        category: "Технологии / Финансы",
        categoryColor: "#06b6d4",
        title: "Оценка стоимости компании Tesla. Интерактивная DCF-модель",
        desc: "Анализ денежных потоков Tesla: моделирование выручки, маржинальности FSD, Robotaxi и ставки дисконтирования с онлайн-перерасчетом целевой цены акций.",
        params: "18 параметров",
        readTime: "15 мин",
        href: "/articles/tesla",
      },
    ],

    whyTitle: "Почему Articta?",
    whyList: [
      {
        icon: "⚡",
        title: "Исполняемые знания",
        desc: "Вместо статичного текста вы получаете инструмент, реагирующий на ваши гипотезы.",
      },
      {
        icon: "📊",
        title: "Мгновенный перерасчет",
        desc: "Изменение одной цифры на лету обновляет все графики, итоговые таблицы и ROI.",
      },
      {
        icon: "📄",
        title: "Экспорт в PDF",
        desc: "Генерация профессионального отчёта с вашими персональными цифрами в 1 клик.",
      },
    ],
  },

  sk: {
    badge: "Vzdelávacia a analytická platforma",
    heroTitle: "Štúdie, ktoré si môžete vyskúšať na vlastných číslach.",
    heroLead:
      "Articta mení finančné články a analytické rozbory na interaktívne nástroje. Zmeňte parametre priamo v texte a získajte vlastné výpočty.",
    ctaPrimary: "Otvoriť model Bratislava →",
    ctaSecondary: "O platforme",

    featuredTitle: "Interaktívne štúdie a modely",
    featuredSub: "Vyberte si materiál pre detailnú analýzu a prepočet",
    cardCta: "Interaktívny prepočet →",

    articles: [
      {
        slug: "bratislava",
        category: "Financie",
        categoryColor: "#2563eb",
        title: "Investície do nehnuteľností v Bratislave. Výpočet ROI za 5 rokov",
        desc: "Kompletný ekonomický rozbor kúpy 2-izbového bytu: hypotéka, daňový bonus, rekonštrukcia, príjem z prenájmu a čistý zisk.",
        params: "21 parametrov",
        readTime: "12 min",
        href: "/articles/bratislava",
      },
      {
        slug: "tesla",
        category: "Technológie / Financie",
        categoryColor: "#06b6d4",
        title: "Valuácia spoločnosti Tesla. Interaktívny DCF model",
        desc: "Analýza cash flow spoločnosti Tesla: modelovanie tržieb, FSD, Robotaxi a diskontnej sadzby s prepočtom cieľovej ceny akcií.",
        params: "18 parametrov",
        readTime: "15 min",
        href: "/articles/tesla",
      },
    ],

    whyTitle: "Prečo Articta?",
    whyList: [
      {
        icon: "⚡",
        title: "Spustiteľné vedomosti",
        desc: "Namiesto statického textu získate nástroj, ktorý reaguje na vaše hypotézy.",
      },
      {
        icon: "📊",
        title: "Okamžitý prepočet",
        desc: "Zmena jedného čísla okamžite aktualizuje grafy, tabuľky a ROI.",
      },
      {
        icon: "📄",
        title: "Export do PDF",
        desc: "Vygenerovanie profesionálnej správy s vašimi číslami na 1 klik.",
      },
    ],
  },

  en: {
    badge: "Educational & Analytical Platform",
    heroTitle: "Research papers you can test with your own numbers.",
    heroLead:
      "Articta transforms financial reports and analytical essays into interactive executable tools. Tweak parameters directly in text and see live recalculations.",
    ctaPrimary: "Open Bratislava Model →",
    ctaSecondary: "About Platform",

    featuredTitle: "Featured Interactive Models",
    featuredSub: "Select a research paper to tweak assumptions and analyze live scenarios",
    cardCta: "Interactive Model →",

    articles: [
      {
        slug: "bratislava",
        category: "Finance",
        categoryColor: "#2563eb",
        title: "Bratislava Real Estate Investment. 5-Year ROI Breakdown",
        desc: "Complete economic analysis of buying a 2-room apartment: mortgage, tax refund, renovation, rental income, and net profit calculation.",
        params: "21 variables",
        readTime: "12 min",
        href: "/articles/bratislava",
      },
      {
        slug: "tesla",
        category: "Technology & Finance",
        categoryColor: "#06b6d4",
        title: "Tesla Valuation Model. Interactive DCF Breakdown",
        desc: "Cash flow modeling for Tesla: revenue growth, FSD margins, Robotaxi optionality, and discount rate live stock price targets.",
        params: "18 variables",
        readTime: "15 min",
        href: "/articles/tesla",
      },
    ],

    whyTitle: "Why Articta?",
    whyList: [
      {
        icon: "⚡",
        title: "Executable Knowledge",
        desc: "Instead of static text, you get micro-software that tests your exact hypotheses.",
      },
      {
        icon: "📊",
        title: "Real-time Recalculations",
        desc: "Adjusting any variable updates formulas, scenario tables, and ROI on the fly.",
      },
      {
        icon: "📄",
        title: "Custom PDF Exports",
        desc: "Generate printable, shareable valuation reports with your assumptions in one click.",
      },
    ],
  },
};

export default function HomePage() {
  const { language } = useLanguage();
  const content = HOME_CONTENT[language] || HOME_CONTENT.ru;

  return (
    <div className="app-viewport">
      <Header />
      <main className="static-page-container">
        {/* Hero Section */}
        <div className="static-page-hero">
          <span className="static-badge">{content.badge}</span>
          <h1 className="static-title">{content.heroTitle}</h1>
          <p className="static-lead">{content.heroLead}</p>
          <div className="about-cta-buttons" style={{ marginTop: "1rem" }}>
            <Link href="/articles/bratislava" className="static-primary-btn">
              {content.ctaPrimary}
            </Link>
            <Link href="/about" className="about-secondary-btn">
              {content.ctaSecondary}
            </Link>
          </div>
        </div>

        <hr className="article-divider" />

        {/* Featured Articles Section */}
        <div className="about-section-header">
          <h2>{content.featuredTitle}</h2>
          <p className="static-lead" style={{ fontSize: "1rem" }}>{content.featuredSub}</p>
        </div>

        <div className="blog-grid" style={{ marginTop: "1.5rem" }}>
          {content.articles.map((art) => (
            <Link key={art.slug} href={art.href} className="blog-card">
              <div>
                <div className="blog-card-meta">
                  <span
                    className="blog-category"
                    style={{
                      borderColor: art.categoryColor,
                      color: art.categoryColor,
                      backgroundColor: `${art.categoryColor}15`,
                    }}
                  >
                    {art.category}
                  </span>
                  <span className="blog-interactive-tag">⚡ {art.params}</span>
                </div>
                <h3 className="blog-card-title" style={{ marginTop: "0.85rem" }}>
                  {art.title}
                </h3>
                <p className="blog-card-desc" style={{ marginTop: "0.5rem" }}>
                  {art.desc}
                </p>
              </div>

              <div className="blog-card-footer">
                <span>⏱️ {art.readTime}</span>
                <span>•</span>
                <span>{content.cardCta}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Why Articta Section */}
        <div className="about-section-header" style={{ marginTop: "4rem" }}>
          <h2>{content.whyTitle}</h2>
        </div>
        <section className="static-grid" style={{ margin: "1.5rem 0" }}>
          {content.whyList.map((item, idx) => (
            <div key={idx} className="static-card">
              <div className="static-card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}