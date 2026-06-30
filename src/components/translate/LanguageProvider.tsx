'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { LANGUAGE_COOKIE_NAME, type Language } from '@/components/translate/translations';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function applyLanguage(language: Language) {
  document.documentElement.lang = language;
  document.documentElement.dataset.language = language;
  document.cookie = `${LANGUAGE_COOKIE_NAME}=${language}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageProvider({
  children,
  initialLanguage,
}: Readonly<{
  children: ReactNode;
  initialLanguage: Language;
}>) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    applyLanguage(language);
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  };

  const toggleLanguage = () => {
    setLanguageState((currentLanguage) => (currentLanguage === 'es' ? 'en' : 'es'));
  };

  return <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
}
