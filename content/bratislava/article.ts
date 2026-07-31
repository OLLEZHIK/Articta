import { Article } from "@/types/article";
import { bratislavaArticleRU } from "./article.ru";
import { bratislavaArticleSK } from "./article.sk";
import { bratislavaArticleEN } from "./article.en";
import { Language } from "@/types/language";

export { bratislavaArticleRU, bratislavaArticleSK, bratislavaArticleEN };

export function getBratislavaArticle(lang: Language = "ru"): Article {
  switch (lang) {
    case "sk":
      return bratislavaArticleSK;
    case "en":
      return bratislavaArticleEN;
    case "ru":
    default:
      return bratislavaArticleRU;
  }
}

export const bratislavaArticle: Article = bratislavaArticleRU;
