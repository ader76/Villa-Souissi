import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { propertyFeatures } from '../data/propertyData';
import * as LucideIcons from 'lucide-react';

const KeyFeatures: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureElements = document.querySelectorAll('.feature-item');
    featureElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
    return IconComponent ? <IconComponent size={32} className="text-gold-500" /> : null;
  };

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            {t('property.features')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {propertyFeatures.map((feature, index) => (
            <div 
              key={feature.id}
              className="feature-item bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 transform translate-y-10 opacity-0 transition-all duration-500 ease-out"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">
                {renderIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t(`property.${feature.id}`)}
              </h3>
              <p className="text-gray-600">
                {t(`property.${feature.id}.value`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gray-50 rounded-lg border border-gray-100">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
            {t('urban.title')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <div className="w-2 h-2 rounded-full bg-gold-500"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">{t('urban.height')}: {t('urban.height.value')}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <div className="w-2 h-2 rounded-full bg-gold-500"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">{t('urban.total.height')}: {t('urban.total.height.value')}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <div className="w-2 h-2 rounded-full bg-gold-500"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">{t('urban.cos')}: {t('urban.cos.value')}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <div className="w-2 h-2 rounded-full bg-gold-500"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">{t('urban.cus')}: {t('urban.cus.value')}</p>
              </div>
            </div>
            
            <div className="flex items-start md:col-span-2">
              <div className="mr-3 mt-1">
                <div className="w-2 h-2 rounded-full bg-gold-500"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">{t('urban.basement')}</p>
              </div>
            </div>
            
            <div className="flex items-start md:col-span-2">
              <div className="mr-3 mt-1">
                <div className="w-2 h-2 rounded-full bg-gold-500"></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">{t('urban.parking')}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  {t('status.title')}
                </h4>
                <p className="text-gray-600">{t('status.availability')}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  {t('status.price')}
                </h4>
                <p className="text-gold-600 font-bold text-xl">{t('status.price.value')}</p>
                <p className="text-sm text-gray-500 mt-1">{t('status.listed')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;