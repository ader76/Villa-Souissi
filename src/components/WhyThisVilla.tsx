import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { whyReasons } from '../data/propertyData';
import * as LucideIcons from 'lucide-react';

const WhyThisVilla: React.FC = () => {
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

    const reasonElements = document.querySelectorAll('.reason-item');
    reasonElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
    return IconComponent ? <IconComponent size={28} className="text-gold-500" /> : null;
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            {t('why.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whyReasons.map((reason, index) => (
            <div 
              key={reason.id}
              className="reason-item bg-white p-8 rounded-lg shadow-sm border border-gray-100 transform translate-y-10 opacity-0 transition-all duration-500 ease-out"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start">
                <div className="mr-4">
                  {renderIcon(reason.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t(`why.${reason.id}`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`why.${reason.id}.desc`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyThisVilla;