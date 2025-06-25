import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const [isAFrameLoaded, setIsAFrameLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Load A-Frame script
    const script = document.createElement('script');
    script.src = 'https://aframe.io/releases/1.4.2/aframe.min.js';
    script.onload = () => {
      setIsAFrameLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load A-Frame');
      setShowFallback(true);
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector('script[src="https://aframe.io/releases/1.4.2/aframe.min.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
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

  // Fallback hero for mobile or when A-Frame fails to load
  const FallbackHero = () => (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img 
          src="/images/villa-1.png"
          alt="Villa Prestige"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      
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
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );

  // Show fallback for mobile or when A-Frame fails
  if (isMobile || showFallback || !isAFrameLoaded) {
    return <FallbackHero />;
  }

  return (
    <section className="hero-section" style={{ height: '100vh', position: 'relative' }}>
      {/* A-Frame 360° Video Scene */}
      <a-scene 
        embedded 
        style={{ height: '100%', width: '100%' }}
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          <video 
            id="villa360vid" 
            autoPlay 
            loop 
            muted
            playsInline
            crossOrigin="anonymous"
            style={{ display: 'none' }}
            onError={() => setShowFallback(true)}
          >
            <source src="/videos/Villa-Souissi_injected.mp4" type="video/mp4" />
          </video>
        </a-assets>
        <a-videosphere 
          src="#villa360vid" 
          rotation="0 -90 0"
          radius="500"
        ></a-videosphere>
        
        {/* Camera with look controls for mouse/touch interaction */}
        <a-camera 
          look-controls="enabled: true; reverseMouseDrag: false"
          wasd-controls="enabled: false"
          position="0 0 0"
        >
        </a-camera>
      </a-scene>

      {/* Hero Overlay Content */}
      <div 
        className="hero-overlay"
        style={{
          position: 'absolute',
          top: '30%',
          left: '0',
          right: '0',
          width: '100%',
          textAlign: 'center',
          color: 'white',
          zIndex: 10,
          padding: '0 1rem'
        }}
        ref={heroRef}
      >
        <div className="max-w-4xl mx-auto transform translate-y-10 opacity-0 transition-all duration-1000 ease-out">
          <h1 
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              fontFamily: 'Playfair Display, Georgia, serif'
            }}
          >
            {t('hero.title')}
          </h1>
          <p 
            style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              marginBottom: '2rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              color: '#e5e7eb'
            }}
          >
            {t('hero.subtitle')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#d5a84b',
                color: 'white',
                fontWeight: '500',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontSize: '1.125rem',
                transition: 'background-color 0.3s',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c99429'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d5a84b'}
            >
              {t('hero.cta')}
            </a>
            <a 
              href="#location" 
              onClick={(e) => handleNavClick(e, 'location')}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: 'transparent',
                border: '2px solid white',
                color: 'white',
                fontWeight: '500',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontSize: '1.125rem',
                transition: 'background-color 0.3s',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {t('property.location')}
            </a>
          </div>
        </div>
      </div>

      {/* Instructions overlay */}
      <div 
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          textAlign: 'center',
          zIndex: 10,
          fontSize: '0.875rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
        }}
      >
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ 
            width: '1.5rem', 
            height: '2.5rem', 
            border: '2px solid white', 
            borderRadius: '9999px', 
            display: 'flex', 
            justifyContent: 'center',
            margin: '0 auto'
          }}>
            <div style={{ 
              width: '0.25rem', 
              height: '0.75rem', 
              backgroundColor: 'white', 
              borderRadius: '9999px', 
              marginTop: '0.5rem',
              animation: 'bounce 1s infinite'
            }}></div>
          </div>
        </div>
        <p style={{ margin: 0, opacity: 0.8 }}>
          Drag to explore • Click and drag to look around
        </p>
      </div>
    </section>
  );
};

export default Hero;