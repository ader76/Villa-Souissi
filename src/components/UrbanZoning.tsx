import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Ruler, Building2, ArrowBigUp, Layers } from 'lucide-react';

const UrbanZoning: React.FC = () => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const zoneElements = document.querySelectorAll('.zone-item');
    zoneElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            {t('property.zoning')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('property.zoning.value')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="zone-item bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100 transform translate-y-10 opacity-0 transition-all duration-500 ease-out">
            <div className="flex items-start">
              <div className="mr-4">
                <Building2 size={36} className="text-gold-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('urban.height')}
                </h3>
                <p className="text-gray-600 mb-3">
                  {t('urban.height.value')}
                </p>
                <p className="text-gray-600">
                  {t('urban.basement')}
                </p>
              </div>
            </div>
          </div>

          <div className="zone-item bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100 transform translate-y-10 opacity-0 transition-all duration-500 ease-out">
            <div className="flex items-start">
              <div className="mr-4">
                <ArrowBigUp size={36} className="text-gold-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('urban.total.height')}
                </h3>
                <p className="text-gray-600">
                  {t('urban.total.height.value')}
                </p>
              </div>
            </div>
          </div>

          <div className="zone-item bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100 transform translate-y-10 opacity-0 transition-all duration-500 ease-out">
            <div className="flex items-start">
              <div className="mr-4">
                <Ruler size={36} className="text-gold-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('urban.cos')}
                </h3>
                <p className="text-gray-600">
                  {t('urban.cos.value')}
                </p>
              </div>
            </div>
          </div>

          <div className="zone-item bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100 transform translate-y-10 opacity-0 transition-all duration-500 ease-out">
            <div className="flex items-start">
              <div className="mr-4">
                <Layers size={36} className="text-gold-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('urban.cus')}
                </h3>
                <p className="text-gray-600">
                  {t('urban.cus.value')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gold-50 p-8 rounded-lg border border-gold-100 transform translate-y-10 opacity-0 transition-all duration-500 ease-out">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {t('urban.parking')}
          </h3>
          <p className="text-gray-700">
            {t('property.basement.value')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UrbanZoning;