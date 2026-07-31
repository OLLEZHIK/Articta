"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

export function MobileBottomBar() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const labels = {
    ru: { home: "Главная", articles: "Модели", blog: "Блог", about: "О проекте" },
    sk: { home: "Domov", articles: "Modely", blog: "Blog", about: "O projekte" },
    en: { home: "Home", articles: "Models", blog: "Blog", about: "About" },
  }[language] || { home: "Главная", articles: "Модели", blog: "Блог", about: "О проекте" };

  return (
    <div className="mobile-bottom-bar">
      <Link
        href="/"
        className={`mobile-tab-item ${pathname === "/" ? "active" : ""}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span>{labels.home}</span>
      </Link>

      <Link
        href="/articles"
        className={`mobile-tab-item ${pathname.startsWith("/articles") ? "active" : ""}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
        <span>{labels.articles}</span>
      </Link>

      <Link
        href="/blog"
        className={`mobile-tab-item ${pathname.startsWith("/blog") ? "active" : ""}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
        <span>{labels.blog}</span>
      </Link>

      <Link
        href="/about"
        className={`mobile-tab-item ${pathname.startsWith("/about") ? "active" : ""}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>{labels.about}</span>
      </Link>
    </div>
  );
}
