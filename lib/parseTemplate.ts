export type Segment =
  | TextSegment
  | VariableSegment
  | ResultSegment;

export interface TextSegment {
  type: "text";
  content: string;
}

export interface VariableSegment {
  type: "variable";
  variableId: string;
}

export interface ResultSegment {
  type: "result";
  resultId: string;
}

const TEMPLATE_REGEX = /\{\{(var|result):(\w+)\}\}/g;

/**
 * Parses a template string into segments.
 *
 * Example:
 *   "Revenue is {{var:revenue}} giving EBITDA {{result:ebitda}}."
 *   → [
 *       { type: "text", content: "Revenue is " },
 *       { type: "variable", variableId: "revenue" },
 *       { type: "text", content: " giving EBITDA " },
 *       { type: "result", resultId: "ebitda" },
 *       { type: "text", content: "." },
 *     ]
 */
export function parseTemplate(template: string): Segment[] {
  const segments: Segment[] = [];
  let lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = TEMPLATE_REGEX.exec(template)) !== null) {
    // Text before this match
    if (match.index > lastIndex) {
      segments.push({
        type: "text",
        content: template.slice(lastIndex, match.index),
      });
    }

    const [, kind, id] = match;

    if (kind === "var") {
      segments.push({ type: "variable", variableId: id });
    } else {
      segments.push({ type: "result", resultId: id });
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text after last match
  if (lastIndex < template.length) {
    segments.push({
      type: "text",
      content: template.slice(lastIndex),
    });
  }

  return segments;
}
