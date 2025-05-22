import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import KeyFeatures from './components/KeyFeatures';
import WhyThisVilla from './components/WhyThisVilla';
import Gallery from './components/Gallery';
import LocationMap from './components/LocationMap';
import UrbanZoning from './components/UrbanZoning';
import BuyerProfiles from './components/BuyerProfiles';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
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
    </LanguageProvider>
  );
}

export default App;