export type Language = "ru" | "sk" | "en";

export interface LocalizedString {
  ru: string;
  sk: string;
  en: string;
}

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "sk", label: "SK" },
  { code: "en", label: "EN" },
];
