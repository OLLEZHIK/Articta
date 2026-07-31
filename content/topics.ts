import { TopicNode } from "@/types/topic";

/**
 * Topic Knowledge Tree
 *
 * Structure mirrors Reddit-style paths: investment/property/slovakia
 * Each node can contain articles and child topic nodes.
 */
export const topicTree: TopicNode[] = [
  {
    id: "investment",
    label: "Investment",
    path: "investment",
    articles: [],
    children: [
      {
        id: "property",
        label: "Property",
        path: "investment/property",
        articles: [],
        children: [
          {
            id: "slovakia",
            label: "Slovakia",
            path: "investment/property/slovakia",
            articles: [
              {
                slug: "bratislava",
                title: "ROI of Apartment Investment",
                status: "published",
              },
              {
                slug: "mortgage-strategy",
                title: "Mortgage Strategy",
                status: "coming-soon",
              },
              {
                slug: "renovation-roi",
                title: "Renovation ROI",
                status: "coming-soon",
              },
              {
                slug: "rental-cash-flow",
                title: "Rental Cash Flow",
                status: "coming-soon",
              },
              {
                slug: "taxes-slovakia",
                title: "Taxes in Slovakia",
                status: "coming-soon",
              },
            ],
          },
        ],
      },
      {
        id: "stocks",
        label: "Stocks",
        path: "investment/stocks",
        articles: [
          {
            slug: "tesla-analysis",
            title: "Tesla Stock Analysis",
            status: "coming-soon",
          },
        ],
      },
    ],
  },
];

/**
 * Find the topic branch for a given article slug.
 * Returns the matching TopicNode and the breadcrumb path segments.
 */
export function findTopicForArticle(
  slug: string,
  nodes: TopicNode[] = topicTree,
  breadcrumb: TopicNode[] = []
): { node: TopicNode; breadcrumb: TopicNode[] } | null {
  for (const node of nodes) {
    const currentBreadcrumb = [...breadcrumb, node];

    // Check if this node contains the article
    if (node.articles.some((a) => a.slug === slug)) {
      return { node, breadcrumb: currentBreadcrumb };
    }

    // Recurse into children
    if (node.children) {
      const found = findTopicForArticle(slug, node.children, currentBreadcrumb);
      if (found) return found;
    }
  }

  return null;
}
