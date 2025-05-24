import React from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isScrolled = false }) => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const getButtonClass = (lang: Language) => {
    const isActive = language === lang;
    const baseClass = 'py-1 px-2 text-sm transition-colors duration-300';
    
    if (isActive) {
      return `${baseClass} font-bold border-b-2 border-gold-500`;
    }
    
    return `${baseClass} ${isScrolled ? 'text-gray-600' : 'text-white'} hover:text-gold-500`;
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleLanguageChange('fr')}
        className={getButtonClass('fr')}
        aria-label="Switch to French"
      >
        {t('language.french')}
      </button>
      <span className={isScrolled ? 'text-gray-400' : 'text-gray-300'}>|</span>
      <button
        onClick={() => handleLanguageChange('en')}
        className={getButtonClass('en')}
        aria-label="Switch to English"
      >
        {t('language.english')}
      </button>
      <span className={isScrolled ? 'text-gray-400' : 'text-gray-300'}>|</span>
      <button
        onClick={() => handleLanguageChange('ar')}
        className={getButtonClass('ar')}
        aria-label="Switch to Arabic"
      >
        {t('language.arabic')}
      </button>
    </div>
  );
};

export default LanguageSwitcher;