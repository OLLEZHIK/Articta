import { Variable } from "./variable";

export type ArticleModel = (
  variables: Record<string, Variable>
) => Record<string, number>;
