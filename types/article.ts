import { Block } from "./block";
import { ArticleModel } from "./model";
import { Variable } from "./variable";

export interface Article {
    variables: Record<string, Variable>;
    model: ArticleModel;
    blocks: Block[];
}