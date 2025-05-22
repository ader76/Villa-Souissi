import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { parse } from 'accept-language-parser';
import { translations } from '../data/translations';

export type Language = 'fr' | 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  
  useEffect(() => {
    const detectLanguage = () => {
      const userLanguages = parse(navigator.language);
      if (userLanguages.length > 0) {
        const primaryLang = userLanguages[0].code;
        if (primaryLang === 'ar') {
          setLanguage('ar');
        } else if (primaryLang === 'fr') {
          setLanguage('fr');
        } else {
          setLanguage('en');
        }
      }
    };

    detectLanguage();
  }, []);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};