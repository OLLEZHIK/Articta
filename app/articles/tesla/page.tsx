"use client";

import { ArticleRenderer } from "@/components/article/ArticleRenderer";
import { bratislavaArticle } from "@/content/bratislava/article";
import { Header } from "@/components/layout/Header";

export default function TeslaPage() {
  return (
    <div className="app-viewport">
      <Header />
      <div className="content-wrapper">
        <ArticleRenderer article={bratislavaArticle} />
      </div>
    </div>
  );
}
