"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dict, type DictKey } from "./i18n-dict";
import {
  COOKIE_NAME,
  DEFAULT_LOCALE,
  isLocale,
  type Locale,
} from "./locale";

export { COOKIE_NAME, DEFAULT_LOCALE, LOCALES, LOCALE_LABELS, isLocale } from "./locale";
export type { Locale } from "./locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: DictKey) => string;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key) => dict[DEFAULT_LOCALE][key],
});

export function LocaleProvider({
  initialLocale = DEFAULT_LOCALE,
  children,
}: {
  initialLocale?: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      if (typeof document !== "undefined") {
        document.cookie = `${COOKIE_NAME}=${next};path=/;max-age=31536000;SameSite=Lax`;
        try {
          window.localStorage.setItem(COOKIE_NAME, next);
        } catch {
          /* storage unavailable — session-only preference */
        }
      }
    } catch {
      /* cookie unavailable — session-only preference */
    }
  }, []);

  /* Static export: the server always renders the default locale; restore
     the stored preference on the client after hydration. */
  useEffect(() => {
    let stored: unknown = null;
    try {
      stored = window.localStorage.getItem(COOKIE_NAME);
    } catch {
      /* storage unavailable */
    }
    if (!isLocale(stored)) {
      try {
        const pair = document.cookie
          .split("; ")
          .find((part) => part.startsWith(`${COOKIE_NAME}=`));
        stored = pair?.split("=").slice(1).join("=");
      } catch {
        /* cookie unavailable */
      }
    }
    if (isLocale(stored)) setLocaleState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.setAttribute("data-locale", locale);
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: (key) => dict[locale][key] }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useI18n(): LocaleContextValue {
  return useContext(LocaleContext);
}
