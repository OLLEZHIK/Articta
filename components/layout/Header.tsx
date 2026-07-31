"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const pathname = usePathname();

  const logoBadgeText = {
    ru: "О проекте",
    sk: "O projekte",
    en: "About",
  }[language] || "О проекте";

  return (
    <header className="header-nav">
      <div className="header-container">
        {/* Brand Logo - Navigates to About Page */}
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
          <span className="header-logo-info-badge">⚡ {logoBadgeText}</span>
        </Link>

        {/* Navigation Links */}
        <nav className="header-links">
          <Link
            href="/articles/tesla"
            className={`header-link ${pathname.startsWith("/articles") ? "active" : ""}`}
          >
            Articles
          </Link>
          <Link
            href="/blog"
            className={`header-link ${pathname.startsWith("/blog") ? "active" : ""}`}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={`header-link ${pathname.startsWith("/about") ? "active" : ""}`}
          >
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Language Switcher */}
          <LanguageSwitcher />
          {/* Theme Toggle */}
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

          {/* Search */}
          <button className="header-search-btn" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Share */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Page link copied to clipboard!");
            }}
            className="header-share-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>
    </header>
  );
}
