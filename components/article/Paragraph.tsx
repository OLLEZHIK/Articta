import { Variable } from "@/types/variable";
import { parseTemplate } from "@/lib/parseTemplate";
import { InlineVariable } from "./InlineVariable";
import { InlineResult } from "./InlineResult";

interface ParagraphProps {
  content: string;
  variables: Record<string, Variable>;
  results: Record<string, number>;
  onUpdateVariable: (id: string, value: number) => void;
}

export function Paragraph({
  content,
  variables,
  results,
  onUpdateVariable,
}: ParagraphProps) {
  const segments = parseTemplate(content);

  return (
    <p className="article-paragraph">
      {segments.map((segment, index) => {
        switch (segment.type) {
          case "text":
            return <span key={index}>{segment.content}</span>;

          case "variable": {
            const variable = variables[segment.variableId];
            if (!variable) return null;
            return (
              <InlineVariable
                key={segment.variableId}
                variable={variable}
                onUpdate={onUpdateVariable}
              />
            );
          }

          case "result": {
            const value = results[segment.resultId];
            if (value === undefined) return null;
            return (
              <InlineResult
                key={segment.resultId}
                value={value}
                label={segment.resultId}
              />
            );
          }
        }
      })}
    </p>
  );
}