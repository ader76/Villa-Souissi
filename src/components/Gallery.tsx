import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { propertyImages } from '../data/propertyData';
import { X, FileText, AlertCircle } from 'lucide-react';

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
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

    const imageElements = document.querySelectorAll('.gallery-item');
    imageElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedImage + 1) % propertyImages.length
      : (selectedImage - 1 + propertyImages.length) % propertyImages.length;
    
    setSelectedImage(newIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      navigateImage('next');
    } else if (e.key === 'ArrowLeft') {
      navigateImage('prev');
    }
  };

  // Check if the image is villa-7.jpg
  const isVilla7 = (imageUrl: string) => {
    return imageUrl.includes('villa-7.jpg');
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            {t('gallery.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertyImages.map((image, index) => (
            <div 
              key={image.id}
              className="gallery-item overflow-hidden rounded-lg shadow-sm border border-gray-100 transform translate-y-10 opacity-0 transition-all duration-500 ease-out cursor-pointer group relative"
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                
                {/* Highly visible note badge for villa-7.jpg */}
                {isVilla7(image.url) && (
                  <>
                    {/* Main prominent badge */}
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 text-center font-bold text-sm shadow-lg border-b-4 border-red-700">
                      <div className="flex items-center justify-center gap-2">
                        <AlertCircle size={18} className="animate-pulse" />
                        <span className="uppercase tracking-wide">Note de renseignements disponible</span>
                        <AlertCircle size={18} className="animate-pulse" />
                      </div>
                    </div>
                    
                    {/* Additional corner badge for extra visibility */}
                    <div className="absolute bottom-3 right-3 bg-yellow-400 text-gray-900 px-3 py-2 rounded-full text-xs font-bold shadow-lg border-2 border-yellow-500 animate-pulse">
                      <div className="flex items-center gap-1">
                        <FileText size={14} />
                        <span>INFO</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gold-500 transition-colors"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          
          <div 
            className="max-w-4xl max-h-[80vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={propertyImages[selectedImage].url} 
              alt={propertyImages[selectedImage].alt}
              className="max-w-full max-h-[80vh] object-contain"
            />
            
            {/* Prominent note badge in lightbox for villa-7.jpg */}
            {isVilla7(propertyImages[selectedImage].url) && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 text-center font-bold text-lg shadow-xl border-b-4 border-red-700">
                <div className="flex items-center justify-center gap-3">
                  <AlertCircle size={24} className="animate-pulse" />
                  <span className="uppercase tracking-wide">Note de renseignements disponible</span>
                  <AlertCircle size={24} className="animate-pulse" />
                </div>
              </div>
            )}
          </div>
          
          {/* Navigation Buttons */}
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;