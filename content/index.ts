import { bratislavaArticle } from "./bratislava/article";
import { Article } from "@/types/article";

export { bratislavaArticle };

export const articlesMap: Record<string, Article> = {
  bratislava: bratislavaArticle,
};

export function getArticleBySlug(slug: string): Article | null {
  return articlesMap[slug] || bratislavaArticle;
}
