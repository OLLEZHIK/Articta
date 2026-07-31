export type Block =
  | HeadingBlock
  | ParagraphBlock
  | ResultBlock
  | ImageBlock
  | ChartBlock
  | DividerBlock
  | CalloutBlock
  | VariableInputBlock
  | ScenarioTableBlock
  | ExpensesGridBlock
  | ClosingFeesGridBlock;

export interface BaseBlock {
  id: string;
  type: string;
}

export interface HeadingBlock extends BaseBlock {
  type: "heading";
  content: string;
  level?: 1 | 2 | 3;
}

export interface ParagraphBlock extends BaseBlock {
  type: "paragraph";
  content: string;
}

export interface ResultBlock extends BaseBlock {
  type: "result";
  label: string;
  resultId: string;
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface ChartBar {
  label: string;
  resultId: string;
  color: string;
}

export interface ChartBlock extends BaseBlock {
  type: "chart";
  title: string;
  bars: ChartBar[];
}

export interface DividerBlock extends BaseBlock {
  type: "divider";
}

export interface CalloutBlock extends BaseBlock {
  type: "callout";
  variant: "info" | "warning" | "insight";
  content: string;
}

export interface VariableInputBlock extends BaseBlock {
  type: "variableInput";
  variableId: string;
  example?: string;
  description?: string;
}

export interface ScenarioTableBlock extends BaseBlock {
  type: "scenarioTable";
  title: string;
}

export interface ExpensesGridBlock extends BaseBlock {
  type: "expensesGrid";
}

export interface ClosingFeesGridBlock extends BaseBlock {
  type: "closingFeesGrid";
}