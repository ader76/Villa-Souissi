import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { buyerProfiles } from '../data/propertyData';
import * as LucideIcons from 'lucide-react';

const BuyerProfiles: React.FC = () => {
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

    const profileElements = document.querySelectorAll('.profile-item');
    profileElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
    return IconComponent ? <IconComponent size={48} className="text-gold-500" /> : null;
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            {t('buyers.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {buyerProfiles.map((profile, index) => (
            <div 
              key={profile.id}
              className="profile-item flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-sm border border-gray-100 transform translate-y-10 opacity-0 transition-all duration-500 ease-out"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">
                {renderIcon(profile.icon)}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t(`buyers.${profile.id}`)}
              </h3>
              <p className="text-gray-600">
                {t(`buyers.${profile.id}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyerProfiles;