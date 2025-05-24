import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { contactInfo } from '../data/propertyData';

const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();

  const formatPhoneNumber = (phone: string) => {
    return isRTL ? phone.replace('+', '') + '+' : phone;
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Villa Prestige</h3>
            <p className="text-gray-400 mb-4">
              {t('property.location.value')}
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">{t('contact.title')}</h3>
            <p className="text-gray-400 mb-2">
              {t('contact.phone')}: {formatPhoneNumber(contactInfo.phone)}
            </p>
            <p className="text-gray-400 mb-2">{t('contact.email')}: {contactInfo.email}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">{t('hero.cta')}</h3>
            <p className="text-gray-400 mb-4">
              {t('status.availability')}
            </p>
            <a
              href="#contact"
              className="inline-block px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-md transition-colors duration-300"
            >
              {t('hero.cta')}
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Villa Prestige. {t('footer.rights')}.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-gold-400 text-sm transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-gray-500 hover:text-gold-400 text-sm transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;