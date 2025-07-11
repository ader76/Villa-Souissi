import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { ChevronDown, Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isScrolled = false }) => {
  const { language, setLanguage, t, detectionResult } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Language options with native names and flag emojis
  const languageOptions = [
    { 
      code: 'fr' as Language, 
      name: 'Français', 
      flag: '🇫🇷',
      nativeName: 'Français'
    },
    { 
      code: 'en' as Language, 
      name: 'English', 
      flag: '🇺🇸',
      nativeName: 'English'
    },
    { 
      code: 'ar' as Language, 
      name: 'العربية', 
      flag: '🇸🇦',
      nativeName: 'العربية'
    }
  ];

  const currentLanguage = languageOptions.find(lang => lang.code === language);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang, true); // Save preference
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, lang: Language) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLanguageChange(lang);
    }
  };

  const getDetectionInfo = () => {
    if (!detectionResult) return '';
    
    switch (detectionResult.source) {
      case 'geolocation':
        return detectionResult.locationData 
          ? `Detected from ${detectionResult.locationData.country}`
          : 'Detected from location';
      case 'cookie':
        return 'Saved preference';
      case 'browser':
        return 'Browser language';
      case 'default':
        return 'Default language';
      default:
        return '';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Current Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 ${
          isScrolled 
            ? 'text-gray-700 hover:bg-gray-100' 
            : 'text-white hover:bg-white/10'
        }`}
        aria-label={`Current language: ${currentLanguage?.nativeName}. Click to change language.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe size={16} />
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="font-medium text-sm">{currentLanguage?.nativeName}</span>
        <ChevronDown 
          size={14} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          role="listbox"
          aria-label="Language selection"
        >
          {/* Detection Info */}
          {detectionResult && (
            <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">
              <div className="flex items-center space-x-1">
                <Globe size={12} />
                <span>{getDetectionInfo()}</span>
              </div>
            </div>
          )}
          
          {/* Language Options */}
          {languageOptions.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              onKeyDown={(e) => handleKeyDown(e, lang.code)}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50 ${
                language === lang.code 
                  ? 'bg-gold-50 text-gold-700 font-medium' 
                  : 'text-gray-700'
              }`}
              role="option"
              aria-selected={language === lang.code}
              tabIndex={0}
            >
              <span className="text-lg">{lang.flag}</span>
              <div className="flex-1">
                <div className="font-medium">{lang.nativeName}</div>
                <div className="text-xs text-gray-500">{lang.name}</div>
              </div>
              {language === lang.code && (
                <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;