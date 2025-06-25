import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [use360Video, setUse360Video] = useState(false);

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

  useEffect(() => {
    // Check if 360 video file exists
    const check360Video = async () => {
      try {
        const response = await fetch('/videos/your-360-video.mp4', { method: 'HEAD' });
        if (response.ok) {
          setUse360Video(true);
        }
      } catch (error) {
        console.log('360 video not found, using fallback');
        setUse360Video(false);
      }
    };

    check360Video();
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
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    setIsVideoError(true);
    setIsVideoLoaded(false);
  };

  if (use360Video) {
    return (
      <div className="relative h-screen">
        {/* 360° Video Background */}
        <div className="absolute inset-0">
          <a-scene 
            embedded 
            style={{ width: '100%', height: '100%' }}
            vr-mode-ui="enabled: false"
            cursor="rayOrigin: mouse"
          >
            <a-assets>
              <video 
                id="vid360" 
                autoPlay 
                loop 
                muted
                playsInline
                crossOrigin="anonymous"
                src="/videos/your-360-video.mp4"
                onLoadedData={handleVideoLoaded}
                onError={handleVideoError}
              />
            </a-assets>
            <a-videosphere 
              src="#vid360" 
              rotation="0 -90 0"
              radius="100"
            />
            <a-camera 
              look-controls="enabled: true"
              wasd-controls="enabled: false"
              position="0 0 0"
            />
          </a-scene>
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        
        {/* Content Overlay */}
        <div 
          ref={heroRef}
          className="relative h-full flex items-center justify-center text-center px-4 transform translate-y-10 opacity-0 transition-all duration-1000 ease-out z-10"
        >
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-lg">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')}
                className="px-8 py-3 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-md transition-colors duration-300 text-lg w-full sm:w-auto shadow-lg"
              >
                {t('hero.cta')}
              </a>
              <a 
                href="#location" 
                onClick={(e) => handleNavClick(e, 'location')}
                className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium rounded-md transition-colors duration-300 text-lg w-full sm:w-auto shadow-lg"
              >
                {t('property.location')}
              </a>
            </div>
            
            {/* 360° Video Instructions */}
            <div className="mt-8 text-white/80 text-sm">
              <p className="drop-shadow-lg">
                🖱️ Click and drag to explore • 📱 Touch and swipe on mobile
              </p>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to regular video/image background
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

        {/* Regular Video Background */}
        {!isMobile && (
          <video
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