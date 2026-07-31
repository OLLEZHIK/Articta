import React from "react";
import { Variable } from "@/types/variable";
import { parseTemplate } from "@/lib/parseTemplate";
import { InlineVariable } from "./InlineVariable";
import { InlineResult } from "./InlineResult";

interface CalloutProps {
  content: string;
  variant: "info" | "warning" | "insight";
  variables: Record<string, Variable>;
  results: Record<string, number>;
  onUpdateVariable: (id: string, value: number) => void;
}

const variantConfig = {
  info: { icon: "ℹ️", className: "article-callout--info" },
  warning: { icon: "⚠️", className: "article-callout--warning" },
  insight: { icon: "💡", className: "article-callout--insight" },
};

function renderFormattedText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <React.Fragment key={lineIdx}>
        {lineIdx > 0 && <br />}
        {parts.map((part, partIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={partIdx}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </React.Fragment>
    );
  });
}

export function Callout({
  content,
  variant,
  variables,
  results,
  onUpdateVariable,
}: CalloutProps) {
  const segments = parseTemplate(content);
  const config = variantConfig[variant];

  return (
    <div className={`article-callout ${config.className}`}>
      <span className="article-callout__icon">{config.icon}</span>
      <div className="article-callout__text">
        {segments.map((segment, index) => {
          switch (segment.type) {
            case "text":
              return (
                <React.Fragment key={index}>
                  {renderFormattedText(segment.content)}
                </React.Fragment>
              );
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
      </div>
    </div>
  );
}
