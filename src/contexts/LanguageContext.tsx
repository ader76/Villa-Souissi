import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { translations } from '../data/translations';
import { detectUserLanguage, setLanguageCookie, LanguageDetectionResult } from '../utils/geolocation';

export type Language = 'fr' | 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language, savePreference?: boolean) => void;
  t: (key: string) => string;
  isRTL: boolean;
  isLoading: boolean;
  detectionResult?: LanguageDetectionResult;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);
  const [detectionResult, setDetectionResult] = useState<LanguageDetectionResult>();
  
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        setIsLoading(true);
        const result = await detectUserLanguage();
        
        setDetectionResult(result);
        setLanguageState(result.detectedLanguage);
        
        // Update HTML lang attribute
        document.documentElement.lang = result.detectedLanguage;
        
        // Update HTML dir attribute for RTL languages
        document.documentElement.dir = result.detectedLanguage === 'ar' ? 'rtl' : 'ltr';
        
        console.log('Language initialized:', result);
      } catch (error) {
        console.error('Failed to initialize language:', error);
        setLanguageState('en');
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
      } finally {
        setIsLoading(false);
      }
    };

    initializeLanguage();
  }, []);

  const setLanguage = (lang: Language, savePreference: boolean = true) => {
    setLanguageState(lang);
    
    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Save preference to cookie if requested
    if (savePreference) {
      setLanguageCookie(lang);
      console.log('Language preference saved:', lang);
    }
    
    // Update detection result to reflect manual selection
    if (detectionResult) {
      setDetectionResult({
        ...detectionResult,
        detectedLanguage: lang,
        source: 'cookie'
      });
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      isRTL, 
      isLoading,
      detectionResult 
    }}>
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