import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className={`text-xl font-serif font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            Villa Prestige
          </h1>
        </div>

        <div className="hidden md:flex items-center space-x-6 ml-auto">
          <nav className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            <ul className="flex space-x-6">
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => handleNavClick(e, 'features')}
                  className="hover:text-gold-600 transition-colors"
                >
                  {t('property.features')}
                </a>
              </li>
              <li>
                <a 
                  href="#location" 
                  onClick={(e) => handleNavClick(e, 'location')}
                  className="hover:text-gold-600 transition-colors"
                >
                  {t('property.location')}
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  onClick={(e) => handleNavClick(e, 'gallery')}
                  className="hover:text-gold-600 transition-colors"
                >
                  {t('gallery.title')}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="hover:text-gold-600 transition-colors"
                >
                  {t('contact.title')}
                </a>
              </li>
            </ul>
          </nav>
          <LanguageSwitcher isScrolled={isScrolled} />
        </div>

        <div className="md:hidden flex items-center ml-auto">
          <LanguageSwitcher isScrolled={isScrolled} />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`ml-4 ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4">
          <nav>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => handleNavClick(e, 'features')}
                  className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded"
                >
                  {t('property.features')}
                </a>
              </li>
              <li>
                <a 
                  href="#location" 
                  onClick={(e) => handleNavClick(e, 'location')}
                  className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded"
                >
                  {t('property.location')}
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  onClick={(e) => handleNavClick(e, 'gallery')}
                  className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded"
                >
                  {t('gallery.title')}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded"
                >
                  {t('contact.title')}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;