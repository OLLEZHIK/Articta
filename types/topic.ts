/** Represents a single article entry in a topic tree */
export interface TopicArticle {
  slug: string;
  title: string;
  /** Whether this article is published or coming soon */
  status: "published" | "coming-soon";
}

/** Represents a topic node in the knowledge tree */
export interface TopicNode {
  /** Machine-readable path segment, e.g. "property" */
  id: string;
  /** Human-readable label, e.g. "Property" */
  label: string;
  /** Full path from root, e.g. "investment/property" */
  path: string;
  /** Articles belonging to this specific topic node */
  articles: TopicArticle[];
  /** Child topic nodes */
  children?: TopicNode[];
}

/** Metadata attached to each Article for navigation */
export interface ArticleMeta {
  slug: string;
  title: string;
  /** Topic tree path, e.g. "investment/property/slovakia" */
  topicPath: string;
}
