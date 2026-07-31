export interface Variable {
  id: string;
  label: string;
  type: "currency" | "percent" | "number";
  value: number;
  defaultValue: number;
  editable: boolean;
}
