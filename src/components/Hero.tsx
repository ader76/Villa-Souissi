import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { propertyImages } from '../data/propertyData';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (heroRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('translate-y-10');
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(heroRef.current);
      return () => observer.disconnect();
    }
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
  };

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error);
        setIsVideoError(true);
      });
      setIsVideoLoaded(true);
    }
  };

  const handleVideoError = () => {
    setIsVideoError(true);
    setIsVideoLoaded(false);
  };

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        {/* Fallback Image */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isVideoLoaded && !isVideoError && !isMobile ? 'opacity-0' : 'opacity-100'}`}>
          <img 
            src="/images/villa-1.png"
            alt="Villa Prestige"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Video Background */}
        {!isMobile && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded && !isVideoError ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            preload="auto"
          >
            <source src="/videos/villa-souissi.mp4" type="video/mp4" />
          </video>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      
      {/* Content */}
      <div 
        ref={heroRef}
        className="relative h-full flex items-center justify-center text-center px-4 transform translate-y-10 opacity-0 transition-all duration-1000 ease-out"
      >
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')}
              className="px-8 py-3 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-md transition-colors duration-300 text-lg w-full sm:w-auto"
            >
              {t('hero.cta')}
            </a>
            <a 
              href="#location" 
              onClick={(e) => handleNavClick(e, 'location')}
              className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium rounded-md transition-colors duration-300 text-lg w-full sm:w-auto"
            >
              {t('property.location')}
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;