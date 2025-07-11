import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { useLanguage } from './contexts/LanguageContext';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import KeyFeatures from './components/KeyFeatures';
import WhyThisVilla from './components/WhyThisVilla';
import Gallery from './components/Gallery';
import LocationMap from './components/LocationMap';
import UrbanZoning from './components/UrbanZoning';
import BuyerProfiles from './components/BuyerProfiles';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const AppContent: React.FC = () => {
  const { isLoading } = useLanguage();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <Hero />
      <KeyFeatures />
      <WhyThisVilla />
      <Gallery />
      <LocationMap />
      <UrbanZoning />
      <BuyerProfiles />
      <ContactSection />
      <Footer />
    </Layout>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;