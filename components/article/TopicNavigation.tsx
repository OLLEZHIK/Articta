"use client";

import { findTopicForArticle } from "@/content/topics";
import { TopicNode } from "@/types/topic";
import { useLanguage } from "@/components/LanguageProvider";
import { getTranslation } from "@/lib/i18n";

interface TopicNavigationProps {
  currentSlug: string;
}

export function TopicNavigation({ currentSlug }: TopicNavigationProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const result = findTopicForArticle(currentSlug);

  if (!result) return null;

  const { node, breadcrumb } = result;

  return (
    <div className="topic-nav">
      {/* Breadcrumb Path */}
      <div className="topic-breadcrumb">
        {breadcrumb.map((segment, i) => (
          <span key={segment.id}>
            {i > 0 && <span className="topic-separator">/</span>}
            <span
              className={`topic-segment ${
                i === breadcrumb.length - 1 ? "active" : ""
              }`}
            >
              {segment.label}
            </span>
          </span>
        ))}
      </div>

      {/* Section Title */}
      <div className="topic-section-title">{t.continueReading}</div>

      {/* Article List */}
      <nav className="topic-article-list">
        {node.articles.map((article) => {
          const isCurrent = article.slug === currentSlug;
          const isPublished = article.status === "published";

          return (
            <a
              key={article.slug}
              href={isPublished ? `/articles/${article.slug}` : undefined}
              className={`topic-article-item ${isCurrent ? "current" : ""} ${
                !isPublished ? "coming-soon" : ""
              }`}
              onClick={
                !isPublished
                  ? (e) => e.preventDefault()
                  : undefined
              }
            >
              <span className="topic-article-icon">
                {isCurrent ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : isPublished ? (
                  <span className="topic-dot" />
                ) : (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="topic-lock-icon"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                )}
              </span>
              <span className="topic-article-label">{article.title}</span>
              {!isPublished && (
                <span className="topic-soon-badge">Soon</span>
              )}
            </a>
          );
        })}
      </nav>

      {/* Sibling Topics */}
      {breadcrumb.length >= 2 && (
        <SiblingTopics
          parentNode={breadcrumb[breadcrumb.length - 2]}
          currentPath={node.path}
        />
      )}
    </div>
  );
}

function SiblingTopics({
  parentNode,
  currentPath,
}: {
  parentNode: TopicNode;
  currentPath: string;
}) {
  const siblings = parentNode.children?.filter((c) => c.path !== currentPath);
  if (!siblings || siblings.length === 0) return null;

  return (
    <div className="topic-siblings">
      <div className="topic-siblings-title">
        More in {parentNode.label}
      </div>
      {siblings.map((sibling) => (
        <div key={sibling.id} className="topic-sibling-item">
          <span className="topic-sibling-label">{sibling.label}</span>
          <span className="topic-sibling-count">
            {sibling.articles.length} article{sibling.articles.length !== 1 ? "s" : ""}
          </span>
        </div>
      ))}
    </div>
  );
}
