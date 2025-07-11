import React from 'react';
import { Globe, Loader2 } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <Globe size={48} className="text-gold-500 mx-auto animate-spin" />
        </div>
        <h2 className="text-xl font-serif font-bold text-gray-900 mb-2">
          Villa Prestige
        </h2>
        <p className="text-gray-600 mb-4">
          Detecting your location...
        </p>
        <div className="flex items-center justify-center space-x-2">
          <Loader2 size={16} className="animate-spin text-gold-500" />
          <span className="text-sm text-gray-500">Setting up your experience</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;