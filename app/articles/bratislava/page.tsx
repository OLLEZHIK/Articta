"use client";

import { bratislavaArticle } from "@/content/bratislava/article";
import { Header } from "@/components/layout/Header";
import { ArticleRenderer } from "@/components/article/ArticleRenderer";

export default function BratislavaArticlePage() {
  return (
    <div className="app-viewport">
      <Header />
      <div className="content-wrapper">
        <ArticleRenderer article={bratislavaArticle} />
      </div>
    </div>
  );
}
