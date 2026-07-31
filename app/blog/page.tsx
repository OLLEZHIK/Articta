import { Header } from "@/components/layout/Header";
import Link from "next/link";

interface ArticleCard {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "Finance" | "Technology" | "Economics" | "Business" | "Real Estate";
  categoryColor: string;
  readTime: string;
  date: string;
  interactiveVars: number;
}

const articles: ArticleCard[] = [
  {
    id: "bratislava",
    slug: "/articles/bratislava",
    title: "Инвестиции в недвижимость в Братиславе: Расчет ROI за 5 лет",
    description:
      "Разбор покупки квартиры в ипотеку с 10% взносом: ремонт в стиле Pinterest, окупаемость, аренда, налоговые вычеты и 3 сценария (Плохой, Базовый, Хороший).",
    category: "Real Estate",
    categoryColor: "#10b981",
    readTime: "9 мин чтения",
    date: "Июль 2026",
    interactiveVars: 18,
  },
  {
    id: "tesla",
    slug: "/articles/tesla",
    title: "Tesla: Interactive Valuation & Financial Overview",
    description:
      "Adjust annual revenue, growth rates, margins, and P/E ratio to model different valuation scenarios for Tesla, Inc.",
    category: "Finance",
    categoryColor: "#3b82f6",
    readTime: "6 min read",
    date: "July 2026",
    interactiveVars: 6,
  },
  {
    id: "nvidia",
    slug: "/articles/tesla",
    title: "NVIDIA: AI Chip Demand & Data Center Growth Model",
    description:
      "Model H100/B200 GPU shipment volumes, ASPs, and gross margin sensitivity across hyperscaler AI capital expenditure.",
    category: "Technology",
    categoryColor: "#06b6d4",
    readTime: "8 min read",
    date: "July 2026",
    interactiveVars: 8,
  },
  {
    id: "saas-unit-economics",
    slug: "/articles/tesla",
    title: "SaaS Unit Economics: LTV/CAC & Net Revenue Retention",
    description:
      "Simulate payback periods, churn rate impact, and gross margins for early-to-mid stage B2B software companies.",
    category: "Business",
    categoryColor: "#64748b",
    readTime: "7 min read",
    date: "June 2026",
    interactiveVars: 7,
  },
];

export default function BlogPage() {
  return (
    <div className="app-viewport">
      <Header />
      <main className="static-page-container">
        <div className="static-page-hero">
          <span className="static-badge">Articta Research & Articles</span>
          <h1 className="static-title">Интерактивные статьи и модели</h1>
          <p className="static-lead">
            Исследуйте практические финансовые и экономические модели. Меняйте входные параметры в статьях и проверяйте собственные гипотезы.
          </p>
        </div>

        <hr className="article-divider" />

        <div className="blog-grid">
          {articles.map((article) => (
            <Link key={article.id} href={article.slug} className="blog-card">
              <div className="blog-card-meta">
                <span
                  className="blog-category"
                  style={{
                    backgroundColor: `${article.categoryColor}15`,
                    color: article.categoryColor,
                    borderColor: `${article.categoryColor}30`,
                  }}
                >
                  {article.category}
                </span>
                <span className="blog-interactive-tag">
                  ⚡ {article.interactiveVars} параметров
                </span>
              </div>

              <h2 className="blog-card-title">{article.title}</h2>
              <p className="blog-card-desc">{article.description}</p>

              <div className="blog-card-footer">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
