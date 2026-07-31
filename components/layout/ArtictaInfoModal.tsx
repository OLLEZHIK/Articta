"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { Language, LANGUAGES } from "@/types/language";

interface ArtictaInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_INFO = {
  ru: {
    badge: "О проекте Articta",
    subtitle: "Интерактивная образовательно-аналитическая платформа",
    essenceTitle: "⚡ В чём суть Articta?",
    essenceText:
      "Articta стирает грань между статичными статьями и аналитическим софтом. Пользователь не просто читает материал, а работает с ним: меняет входные параметры и мгновенно получает пересчитанные результаты. Статьи здесь — это не просто текст, а интеллектуальные живые инструменты.",
    featuresTitle: "Ключевые фишки и возможности",
    features: [
      {
        icon: "🧠",
        title: "Исполняемые знания (Executable Knowledge)",
        desc: "Каждый материал — не сухой текст, а гибкая финансово-техническая модель. Все выводы подкреплены живыми расчетами.",
      },
      {
        icon: "⚡",
        title: "Мгновенный перерасчет в реальном времени",
        desc: "Изменяйте переменные прямо внутри текста или в боковой панели — формулы, графики и ROI обновляются на лету.",
      },
      {
        icon: "📊",
        title: "Сравнительный анализ 3 сценариев",
        desc: "Оценивайте позитивные, базовые и пессимистичные варианты развития событий в один клик.",
      },
      {
        icon: "📄",
        title: "Генерация персональных PDF-отчётов",
        desc: "Формируйте и экспортируйте аналитические отчёты со своими собственными сценариями для печати и отправки.",
      },
    ],
    targetTitle: "Для кого создан проект?",
    targetText:
      "Для инвесторов, аналитиков, предпринимателей и всех, кто предпочитает проверяемые факты и живые расчеты статичным суждениям.",
    homeBtn: "На главную",
    exploreBtn: "Исследовать модель Tesla →",
    closeBtn: "Закрыть",
  },
  sk: {
    badge: "O projekte Articta",
    subtitle: "Interaktívna vzdelávacia a analytická platforma",
    essenceTitle: "⚡ Aká je podstata Articta?",
    essenceText:
      "Articta stiera hranicu medzi statickými článkami a analytickým softvérom. Používateľ článok len nečíta, ale aktívne s ním pracuje: mení vstupné parametre a okamžite získava prepočítané výsledky. Články tu nie sú len textom, ale živými intelektuálnymi nástrojmi.",
    featuresTitle: "Kľúčové funkcie a možnosti",
    features: [
      {
        icon: "🧠",
        title: "Spustiteľné vedomosti (Executable Knowledge)",
        desc: "Každý materiál je interaktívny nástroj. Všetky závery sú podporené živými výpočtami.",
      },
      {
        icon: "⚡",
        title: "Okamžitý prepočet v reálnom čase",
        desc: "Zmeňte premenné priamo v texte alebo v bočnom paneli — vzorce, grafy a ROI sa okamžite prispôsobia.",
      },
      {
        icon: "📊",
        title: "Porovnávacia analýza 3 scenárov",
        desc: "Hodnoťte optimistické, základné a pesimistické scenáre na jeden klik.",
      },
      {
        icon: "📄",
        title: "Generovanie vlastných PDF správ",
        desc: "Vytvárajte a exportujte analytické správy s vašimi vlastnými číslami na tlač a zdieľanie.",
      },
    ],
    targetTitle: "Pre koho je projekt určený?",
    targetText:
      "Pre investorov, analytikov, podnikateľov a všetkých, ktorí uprednostňujú overiteľné fakty a živé výpočty pred statickými názormi.",
    homeBtn: "Hlavná stránka",
    exploreBtn: "Preskúmať model Tesla →",
    closeBtn: "Zatvoriť",
  },
  en: {
    badge: "About Articta",
    subtitle: "Interactive educational & analytical platform",
    essenceTitle: "⚡ What is the essence of Articta?",
    essenceText:
      "Articta bridges the gap between static articles and interactive analytical software. Instead of passively reading research, users actively engage with it: tweaking input parameters to watch results recalculate live. Content here is an active tool, not just text.",
    featuresTitle: "Key Features & Capabilities",
    features: [
      {
        icon: "🧠",
        title: "Executable Knowledge",
        desc: "Every article is an active computational tool rather than passive text. Conclusions are backed by live calculations.",
      },
      {
        icon: "⚡",
        title: "Real-time Instant Recalculation",
        desc: "Modify input variables directly within text or sidebars — charts, tables, and 5-year ROI adapt instantly.",
      },
      {
        icon: "📊",
        title: "3-Scenario Comparison Breakdown",
        desc: "Compare optimistic, baseline, and pessimistic outcomes in a single click.",
      },
      {
        icon: "📄",
        title: "Custom PDF & Report Generation",
        desc: "Generate printable, shareable valuation reports with your tailored assumptions in one click.",
      },
    ],
    targetTitle: "Who is Articta for?",
    targetText:
      "For investors, analysts, entrepreneurs, and curious minds who value verifiable facts and dynamic modeling over static claims.",
    homeBtn: "Homepage",
    exploreBtn: "Explore Tesla Model →",
    closeBtn: "Close",
  },
};

export function ArtictaInfoModal({ isOpen, onClose }: ArtictaInfoModalProps) {
  const { language, setLanguage } = useLanguage();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const info = PROJECT_INFO[language] || PROJECT_INFO.ru;

  return (
    <div className="articta-modal-backdrop" onClick={onClose}>
      <div
        className="articta-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="articta-modal-title"
      >
        {/* Modal Header */}
        <div className="articta-modal-header">
          <div className="articta-modal-brand">
            <div className="articta-modal-logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="articta-modal-title-row">
                <h2 id="articta-modal-title" className="articta-modal-title">Articta</h2>
                <span className="articta-modal-badge">{info.badge}</span>
              </div>
              <p className="articta-modal-subtitle">{info.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="articta-modal-close-btn"
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* 3 Languages Switcher Tabs */}
        <div className="articta-modal-lang-tabs">
          <span className="articta-modal-lang-label">Язык / Jazyk / Language:</span>
          <div className="articta-modal-lang-buttons">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as Language)}
                className={`articta-lang-tab ${language === lang.code ? "active" : ""}`}
              >
                {lang.code === "ru" && "🇷🇺 Русский"}
                {lang.code === "sk" && "🇸🇰 Slovenčina"}
                {lang.code === "en" && "🇬🇧 English"}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="articta-modal-body">
          {/* Essence Box */}
          <div className="articta-essence-box">
            <h3>{info.essenceTitle}</h3>
            <p>{info.essenceText}</p>
          </div>

          {/* Features Grid */}
          <div className="articta-modal-section">
            <h4>{info.featuresTitle}</h4>
            <div className="articta-features-grid">
              {info.features.map((feat, idx) => (
                <div key={idx} className="articta-feature-card">
                  <div className="articta-feature-icon">{feat.icon}</div>
                  <div>
                    <h5 className="articta-feature-title">{feat.title}</h5>
                    <p className="articta-feature-desc">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience / Mission */}
          <div className="articta-target-box">
            <h4>🎯 {info.targetTitle}</h4>
            <p>{info.targetText}</p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="articta-modal-footer">
          <Link
            href="/"
            onClick={onClose}
            className="articta-modal-secondary-btn"
          >
            🏠 {info.homeBtn}
          </Link>
          <Link
            href="/articles/tesla"
            onClick={onClose}
            className="articta-modal-primary-btn"
          >
            {info.exploreBtn}
          </Link>
        </div>
      </div>
    </div>
  );
}
