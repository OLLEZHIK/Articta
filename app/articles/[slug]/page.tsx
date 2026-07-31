"use client";

import { useParams } from "next/navigation";
import { bratislavaArticle } from "@/content/bratislava/article";
import { Header } from "@/components/layout/Header";
import { ArticleRenderer } from "@/components/article/ArticleRenderer";

export default function DynamicArticlePage() {
  const params = useParams();
  const slug = (params?.slug as string) || "bratislava";

  return (
    <div className="app-viewport">
      <Header />
      <div className="content-wrapper">
        <ArticleRenderer article={bratislavaArticle} articleSlug={slug} />
      </div>
    </div>
  );
}
