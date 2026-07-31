"use client";

import { Variable } from "@/types/variable";
import { formatValue } from "@/lib/formatValue";

interface InlineVariableProps {
  variable: Variable;
  onUpdate?: (id: string, value: number) => void;
}

export function InlineVariable({ variable }: InlineVariableProps) {
  return (
    <span
      className="inline-variable inline-variable--fixed"
      title={variable.label}
    >
      {formatValue(variable.value, variable.type)}
    </span>
  );
}
