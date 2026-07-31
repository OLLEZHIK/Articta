"use client";

import { Article } from "@/types/article";
import { useArticle } from "@/hooks/useArticle";
import { TableOfContents } from "./TableOfContents";
import { AnalysisSidebar } from "./AnalysisSidebar";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { InlineResult } from "./InlineResult";
import { ArticleImage } from "./ArticleImage";
import { ArticleChart } from "./ArticleChart";
import { Divider } from "./Divider";
import { Callout } from "./Callout";
import { VariableCardInput } from "./VariableCardInput";
import { ScenarioTable } from "./ScenarioTable";
import { OnboardingHint } from "./OnboardingHint";
import { TopicNavigation } from "./TopicNavigation";
import { ArticleFeedback } from "./ArticleFeedback";
import { ArticleMetaBadge } from "./ArticleMetaBadge";
import { ExpensesGrid } from "./ExpensesGrid";
import { ClosingFeesGrid } from "./ClosingFeesGrid";
import { StickyVariableDock } from "./StickyVariableDock";

import { useLanguage } from "@/components/LanguageProvider";
import { getBratislavaArticle } from "@/content/bratislava/article";
import { useMemo, useState, useEffect } from "react";

interface ArticleRendererProps {
  article: Article;
  articleSlug?: string;
}

export function ArticleRenderer({ article, articleSlug = "bratislava" }: ArticleRendererProps) {
  const { language } = useLanguage();

  const activeArticle = useMemo(() => {
    if (articleSlug === "bratislava") {
      return getBratislavaArticle(language);
    }
    return article;
  }, [article, articleSlug, language]);

  const {
    variables,
    defaultVariables,
    isComparing,
    hasHistory,
    results,
    blocks,
    updateVariable,
    resetAll,
    startComparing,
    stopComparing,
  } = useArticle(activeArticle);

  const [visitedVariableIds, setVisitedVariableIds] = useState<Set<string>>(() => new Set());
  const [activeVariableId, setActiveVariableId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll("[data-variable-id]");
      if (!elements.length) return;

      const viewportCenter = window.innerHeight / 2;
      let closestId: string | null = null;
      let minDistance = Infinity;

      const newlyVisited = new Set<string>();

      elements.forEach((el) => {
        const varId = el.getAttribute("data-variable-id");
        if (!varId) return;

        const rect = el.getBoundingClientRect();

        // Mark as visited if the top of the element has entered upper 80% of viewport
        if (rect.top < window.innerHeight * 0.8) {
          newlyVisited.add(varId);
        }

        // Find element closest to middle of screen
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestId = varId;
        }
      });

      if (newlyVisited.size > 0) {
        setVisitedVariableIds((prev) => {
          let changed = false;
          const next = new Set(prev);
          newlyVisited.forEach((id) => {
            if (!next.has(id)) {
              next.add(id);
              changed = true;
            }
          });
          return changed ? next : prev;
        });
      }

      if (closestId) {
        setActiveVariableId(closestId);
      }
    };

    // Run initial positioning check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blocks]);

  return (
    <>
      <OnboardingHint />

      <div className="four-column-layout">
        {/* Far Left Column: Topic Navigation (Knowledge Tree) */}
        <aside className="topic-sidebar-column">
          <TopicNavigation currentSlug={articleSlug} />
        </aside>

        {/* Left Column: Table of Contents */}
        <TableOfContents blocks={blocks} />

        {/* Main Column: Interactive Article Content */}
        <main className="article-main-column">
          <article className="article-container">
            {blocks.map((block) => {
              switch (block.type) {
                case "heading":
                  return (
                    <div key={block.id} id={block.id}>
                      <Heading content={block.content} level={block.level} />
                      {block.level === 1 && <ArticleMetaBadge />}
                    </div>
                  );

                case "paragraph":
                  return (
                    <Paragraph
                      key={block.id}
                      content={block.content}
                      variables={variables}
                      results={results}
                      onUpdateVariable={updateVariable}
                    />
                  );

                case "variableInput": {
                  const variable = variables[block.variableId];
                  if (!variable) return null;
                  const defaultVar = defaultVariables[block.variableId];
                  return (
                    <div
                      key={block.id}
                      id={`var-block-${block.variableId}`}
                      data-variable-id={block.variableId}
                    >
                      <VariableCardInput
                        variable={variable}
                        previousValue={defaultVar?.value}
                        isComparing={isComparing}
                        example={block.example}
                        description={block.description}
                        onUpdate={updateVariable}
                        onStartComparing={startComparing}
                        onStopComparing={stopComparing}
                      />
                    </div>
                  );
                }

                case "scenarioTable":
                  return (
                    <ScenarioTable
                      key={block.id}
                      title={block.title}
                      results={results}
                    />
                  );

                case "expensesGrid":
                  return (
                    <ExpensesGrid
                      key={block.id}
                      variables={variables}
                      results={results}
                      onUpdateVariable={updateVariable}
                      onStartComparing={startComparing}
                      onStopComparing={stopComparing}
                      isComparing={isComparing}
                    />
                  );

                case "closingFeesGrid":
                  return (
                    <ClosingFeesGrid
                      key={block.id}
                      variables={variables}
                      results={results}
                      onUpdateVariable={updateVariable}
                      onStartComparing={startComparing}
                      onStopComparing={stopComparing}
                      isComparing={isComparing}
                    />
                  );

                case "result":
                  return (
                    <div key={block.id} className="article-result-block">
                      <span className="article-result-label">{block.label}</span>
                      <InlineResult
                        value={results[block.resultId] ?? 0}
                        label={block.label}
                      />
                    </div>
                  );

                case "image":
                  return (
                    <ArticleImage
                      key={block.id}
                      src={block.src}
                      alt={block.alt}
                      caption={block.caption}
                    />
                  );

                case "chart":
                  return (
                    <ArticleChart
                      key={block.id}
                      title={block.title}
                      bars={block.bars}
                      results={results}
                    />
                  );

                case "divider":
                  return <Divider key={block.id} />;

                case "callout":
                  return (
                    <Callout
                      key={block.id}
                      content={block.content}
                      variant={block.variant}
                      variables={variables}
                      results={results}
                      onUpdateVariable={updateVariable}
                    />
                  );

                default:
                  return null;
              }
            })}

            {/* Reactions & Comments Section */}
            <ArticleFeedback articleSlug={articleSlug} />
          </article>
        </main>

        {/* Right Column: Interactive Analysis Sidebar */}
        <AnalysisSidebar
          variables={variables}
          visitedVariableIds={visitedVariableIds}
          activeVariableId={activeVariableId}
          hasHistory={hasHistory}
          isComparing={isComparing}
          onUpdateVariable={updateVariable}
          onResetAll={resetAll}
          onStartComparing={startComparing}
          onStopComparing={stopComparing}
        />
      </div>

      {/* Sticky Floating Dock for Variable Controls & Hold-to-Compare */}
      <StickyVariableDock
        variables={variables}
        hasHistory={hasHistory}
        isComparing={isComparing}
        onResetAll={resetAll}
        onStartComparing={startComparing}
        onStopComparing={stopComparing}
      />
    </>
  );
}