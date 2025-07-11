import React, { ReactNode } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './Header';
import WhatsAppButton from './WhatsAppButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isRTL } = useLanguage();
  
  return (
    <div className={`min-h-screen ${isRTL ? 'font-arabic text-right' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <main>
        {children}
      </main>
      <WhatsAppButton />
    </div>
  );
};

export default Layout;