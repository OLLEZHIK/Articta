"use client";

import { formatResult } from "@/lib/formatValue";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

interface InlineResultProps {
  value: number;
  label: string;
}

export function InlineResult({ value, label }: InlineResultProps) {
  const animatedValue = useAnimatedNumber(value, 500);

  return (
    <span className="inline-result" title={label}>
      {formatResult(animatedValue)}
    </span>
  );
}
