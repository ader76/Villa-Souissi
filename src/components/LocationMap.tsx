import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Navigation, Building2, GraduationCap, Heart } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom red marker for the villa
const redMarker = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LocationMap: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const villaPosition: [number, number] = [33.96748571041638, -6.848215135226545];

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

    return () => observer.disconnect();
  }, []);

  return (
    <section id="location" ref={sectionRef} className="relative py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            {t('map.title')}
          </h2>
          <div className="flex items-center justify-center text-xl text-gray-600">
            <MapPin size={24} className="text-gold-500 mr-2 flex-shrink-0" />
            <p>{t('property.location.value')}</p>
          </div>
        </div>

        <div className="relative space-y-6">
          <div className="relative z-10 rounded-lg overflow-hidden shadow-lg max-w-[600px] mx-auto">
            <MapContainer 
              center={villaPosition} 
              zoom={18} 
              scrollWheelZoom={false}
              className="w-full h-[500px]"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              />
              <Marker position={villaPosition} icon={redMarker}>
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold">Villa Prestige</p>
                    <p className="text-gray-600">{t('property.location.value')}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="relative z-10 bg-white rounded-lg shadow-sm p-6 max-w-[600px] mx-auto">
            <div className="text-center">
              <h3 className="font-medium text-gray-900 mb-2">Villa Prestige Location</h3>
              <p className="text-gray-600 text-sm mb-4">{t('property.location.value')}</p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${villaPosition[0]},${villaPosition[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-md transition-colors duration-300"
              >
                <Navigation className="mr-2" size={18} />
                {t('map.directions')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;