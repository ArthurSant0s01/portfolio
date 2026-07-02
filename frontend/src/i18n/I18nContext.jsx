import { createContext, useContext, useEffect, useState } from "react";
import en from "./en.json";
import pt from "./pt.json";

const dict = { en, pt };
const I18nContext = createContext(null);

function detectDefault() {
  const saved = typeof localStorage !== "undefined" && localStorage.getItem("lang");
  if (saved && dict[saved]) return saved;
  if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("pt")) return "pt";
  return "en";
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectDefault);

  const setLang = (l) => {
    if (!dict[l]) return;
    localStorage.setItem("lang", l);
    setLangState(l);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ t: dict[lang], lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
