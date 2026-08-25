/** Locale primitives shared by server and client code. */
export type Locale = "zh-Hant" | "zh-CN" | "en";

export const LOCALES: readonly Locale[] = ["zh-Hant", "zh-CN", "en"] as const;

export const DEFAULT_LOCALE: Locale = "zh-Hant";

export const LOCALE_LABELS: Record<Locale, string> = {
  "zh-Hant": "繁體中文",
  "zh-CN": "简体中文",
  en: "English",
};

export const COOKIE_NAME = "bousoville-lang";

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  );
}
