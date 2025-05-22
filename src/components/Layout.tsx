import React, { ReactNode } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './Header';

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
    </div>
  );
};

export default Layout;