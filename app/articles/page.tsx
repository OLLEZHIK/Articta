"use client";

import { Header } from "@/components/layout/Header";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function ArticlesListPage() {
  const { language } = useLanguage();

  const isRu = language === "ru";
  const isSk = language === "sk";

  const title = isRu
    ? "Каталог интерактивных статей"
    : isSk
    ? "Katalóg interaktívnych článkov"
    : "Interactive Articles Directory";

  const lead = isRu
    ? "Выберите материал для детального анализа, настройки параметров и мгновенного онлайн-расчета."
    : isSk
    ? "Vyberte si materiál pre detailnú analýzu, nastavenie parametrov a okamžitý výpočet."
    : "Select an article to tweak variables, model custom scenarios, and view live calculations.";

  return (
    <div className="app-viewport">
      <Header />
      <main className="static-page-container">
        <div className="static-page-hero">
          <span className="static-badge">Articta Research</span>
          <h1 className="static-title">{title}</h1>
          <p className="static-lead">{lead}</p>
        </div>

        <hr className="article-divider" />

        <div className="blog-grid" style={{ marginTop: "1.5rem" }}>
          {/* Article 1: Bratislava */}
          <Link href="/articles/bratislava" className="blog-card">
            <div>
              <div className="blog-card-meta">
                <span
                  className="blog-category"
                  style={{
                    borderColor: "#2563eb",
                    color: "#2563eb",
                    backgroundColor: "rgba(37, 99, 235, 0.1)",
                  }}
                >
                  Finance
                </span>
                <span className="blog-interactive-tag">⚡ 21 параметров</span>
              </div>
              <h3 className="blog-card-title" style={{ marginTop: "0.85rem" }}>
                {isRu
                  ? "Инвестиции в недвижимость в Братиславе. Расчет ROI за 5 лет"
                  : isSk
                  ? "Investície do nehnuteľností v Bratislave. Výpočet ROI za 5 rokov"
                  : "Bratislava Real Estate Investment. 5-Year ROI Model"}
              </h3>
              <p className="blog-card-desc" style={{ marginTop: "0.5rem" }}>
                {isRu
                  ? "Полный экономический разбор покупки 2-комнатной квартиры: ипотека, налоговый вычет, ремонт в стиле Pinterest и чистая прибыль."
                  : isSk
                  ? "Kompletný ekonomický rozbor kúpy 2-izbového bytu: hypotéka, daňový bonus, rekonštrukcia a čistý zisk."
                  : "Complete economic analysis of buying a 2-room apartment: mortgage, tax refund, renovation, and net profit."}
              </p>
            </div>

            <div className="blog-card-footer">
              <span>⏱️ 12 мин</span>
              <span>•</span>
              <span>Открыть интерактивную модель →</span>
            </div>
          </Link>

          {/* Article 2: Tesla */}
          <Link href="/articles/tesla" className="blog-card">
            <div>
              <div className="blog-card-meta">
                <span
                  className="blog-category"
                  style={{
                    borderColor: "#06b6d4",
                    color: "#06b6d4",
                    backgroundColor: "rgba(6, 182, 212, 0.1)",
                  }}
                >
                  Technology / Finance
                </span>
                <span className="blog-interactive-tag">⚡ 18 параметров</span>
              </div>
              <h3 className="blog-card-title" style={{ marginTop: "0.85rem" }}>
                {isRu
                  ? "Оценка стоимости компании Tesla. Интерактивная DCF-модель"
                  : isSk
                  ? "Valuácia spoločnosti Tesla. Interaktívny DCF model"
                  : "Tesla Stock Valuation Model. Interactive DCF Breakdown"}
              </h3>
              <p className="blog-card-desc" style={{ marginTop: "0.5rem" }}>
                {isRu
                  ? "Анализ денежных потоков Tesla: выручка, маржинальность FSD, Robotaxi и целевая цена акций в зависимости от ваших гипотез."
                  : isSk
                  ? "Analýza cash flow spoločnosti Tesla: tržby, FSD, Robotaxi a cieľová cena akcií podľa vašich predpokladov."
                  : "Cash flow modeling for Tesla: revenue growth, FSD margins, Robotaxi optionality, and stock price targets."}
              </p>
            </div>

            <div className="blog-card-footer">
              <span>⏱️ 15 мин</span>
              <span>•</span>
              <span>Открыть интерактивную модель →</span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
