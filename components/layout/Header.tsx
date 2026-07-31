"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";
import { Language, LANGUAGES } from "@/types/language";
import { getTranslation } from "@/lib/i18n";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = getTranslation(language);

  // Close mobile drawer on route change or Escape key
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLabels = {
    ru: {
      home: "Главная",
      articles: "Модели и Статьи",
      blog: "Блог",
      about: "О платформе",
      logoBadge: "О проекте",
      langTitle: "Язык контента",
      themeTitle: "Тема оформления",
      darkTheme: "🌙 Тёмная тема",
      lightTheme: "☀️ Светлая тема",
    },
    sk: {
      home: "Domov",
      articles: "Modely a Články",
      blog: "Blog",
      about: "O platforme",
      logoBadge: "O projekte",
      langTitle: "Jazyk obsahu",
      themeTitle: "Téma zobrazenia",
      darkTheme: "🌙 Tmavý režim",
      lightTheme: "☀️ Svetlý režim",
    },
    en: {
      home: "Home",
      articles: "Models & Articles",
      blog: "Blog",
      about: "About Platform",
      logoBadge: "About",
      langTitle: "Language",
      themeTitle: "Theme",
      darkTheme: "🌙 Dark Mode",
      lightTheme: "☀️ Light Mode",
    },
  }[language] || {
    home: "Главная",
    articles: "Модели и Статьи",
    blog: "Блог",
    about: "О платформе",
    logoBadge: "О проекте",
    langTitle: "Язык контента",
    themeTitle: "Тема оформления",
    darkTheme: "🌙 Тёмная тема",
    lightTheme: "☀️ Светлая тема",
  };

  return (
    <>
      <header className="header-nav">
        <div className="header-container">
          {/* Brand Logo */}
          <Link
            href="/about"
            className="header-logo"
            title="О проекте Articta (на 3 языках) / About Articta"
          >
            <div className="header-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="header-logo-text">Articta</span>
            <span className="header-logo-info-badge">⚡ {navLabels.logoBadge}</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="header-links">
            <Link
              href="/"
              className={`header-link ${pathname === "/" ? "active" : ""}`}
            >
              {navLabels.home}
            </Link>
            <Link
              href="/articles"
              className={`header-link ${pathname.startsWith("/articles") ? "active" : ""}`}
            >
              {navLabels.articles}
            </Link>
            <Link
              href="/blog"
              className={`header-link ${pathname.startsWith("/blog") ? "active" : ""}`}
            >
              {navLabels.blog}
            </Link>
            <Link
              href="/about"
              className={`header-link ${pathname.startsWith("/about") ? "active" : ""}`}
            >
              {navLabels.about}
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="header-actions">
            <LanguageSwitcher />

            <button
              onClick={toggleTheme}
              className="header-theme-btn"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              title={theme === "light" ? "Dark mode" : "Light mode"}
            >
              {theme === "light" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>

            {/* Share */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert(t.copied || "Copied!");
              }}
              className="header-share-btn"
              title={t.share}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span>{t.share || "Share"}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="header-hamburger-btn"
              aria-label="Open mobile menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Side Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <aside
            className="mobile-drawer-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="drawer-header">
              <div className="drawer-brand">
                <div className="header-logo-icon" style={{ width: 28, height: 28 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                    <path d="M2 17L12 22L22 17"/>
                    <path d="M2 12L12 17L22 12"/>
                  </svg>
                </div>
                <span className="header-logo-text">Articta</span>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="drawer-close-btn"
                aria-label="Close menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="drawer-nav-list">
              <Link
                href="/"
                className={`drawer-nav-item ${pathname === "/" ? "active" : ""}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>{navLabels.home}</span>
              </Link>

              <Link
                href="/articles"
                className={`drawer-nav-item ${pathname.startsWith("/articles") ? "active" : ""}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                <span>{navLabels.articles}</span>
              </Link>

              <Link
                href="/blog"
                className={`drawer-nav-item ${pathname.startsWith("/blog") ? "active" : ""}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <span>{navLabels.blog}</span>
              </Link>

              <Link
                href="/about"
                className={`drawer-nav-item ${pathname.startsWith("/about") ? "active" : ""}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>{navLabels.about}</span>
              </Link>
            </nav>

            {/* Language & Preferences in Drawer */}
            <div className="drawer-footer">
              <div className="drawer-section-title">{navLabels.langTitle}</div>
              <div className="drawer-lang-tabs">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as Language)}
                    className={`drawer-lang-btn ${language === lang.code ? "active" : ""}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              <div className="drawer-section-title" style={{ marginTop: "1rem" }}>{navLabels.themeTitle}</div>
              <button
                onClick={toggleTheme}
                className="drawer-theme-toggle"
              >
                {theme === "light" ? navLabels.darkTheme : navLabels.lightTheme}
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
