/**
 * Formats a numeric value based on the variable type.
 *
 * - "currency" → "100 €"
 * - "percent"  → "20%"
 * - "number"   → "100"
 */
export function formatValue(
  value: number,
  type: "currency" | "percent" | "number"
): string {
  const formatted = value.toLocaleString("ru-RU");
  switch (type) {
    case "currency":
      return `€${formatted}`;
    case "percent":
      return `${value}%`;
    case "number":
      return formatted;
  }
}

/**
 * Formats a computed result value with French/Russian space thousand separators.
 */
export function formatResult(value: number): string {
  return value.toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
