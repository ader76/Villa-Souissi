// Geolocation and language detection utilities

export interface LocationData {
  country: string;
  countryCode: string;
  region?: string;
  city?: string;
}

export interface LanguageDetectionResult {
  detectedLanguage: 'fr' | 'en' | 'ar';
  source: 'geolocation' | 'cookie' | 'browser' | 'default';
  locationData?: LocationData;
}

// Country to language mapping based on geographic rules
const COUNTRY_LANGUAGE_MAP: Record<string, 'fr' | 'en' | 'ar'> = {
  // UAE - English
  'AE': 'en',
  
  // Maghreb countries - French
  'MA': 'fr', // Morocco
  'DZ': 'fr', // Algeria  
  'TN': 'fr', // Tunisia
  
  // Arabic-speaking countries - Arabic
  'SA': 'ar', // Saudi Arabia
  'EG': 'ar', // Egypt
  'JO': 'ar', // Jordan
  'LB': 'ar', // Lebanon
  'SY': 'ar', // Syria
  'IQ': 'ar', // Iraq
  'YE': 'ar', // Yemen
  'OM': 'ar', // Oman
  'QA': 'ar', // Qatar
  'BH': 'ar', // Bahrain
  'KW': 'ar', // Kuwait
  'LY': 'ar', // Libya
  'SD': 'ar', // Sudan
  
  // English-speaking countries
  'US': 'en',
  'GB': 'en',
  'CA': 'en',
  'AU': 'en',
  'NZ': 'en',
  'IE': 'en',
  'ZA': 'en',
  'IN': 'en',
  'SG': 'en',
  'MY': 'en',
  
  // French-speaking countries
  'FR': 'fr',
  'BE': 'fr',
  'CH': 'fr',
  'LU': 'fr',
  'MC': 'fr',
  'SN': 'fr', // Senegal
  'CI': 'fr', // Ivory Coast
  'ML': 'fr', // Mali
  'BF': 'fr', // Burkina Faso
  'NE': 'fr', // Niger
  'TD': 'fr', // Chad
  'CM': 'fr', // Cameroon
  'GA': 'fr', // Gabon
  'CG': 'fr', // Congo
  'CD': 'fr', // Democratic Republic of Congo
  'MG': 'fr', // Madagascar
};

// Cookie management
const LANGUAGE_COOKIE_NAME = 'villa-language-preference';
const COOKIE_EXPIRY_DAYS = 30;

export function setLanguageCookie(language: 'fr' | 'en' | 'ar'): void {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
  
  document.cookie = `${LANGUAGE_COOKIE_NAME}=${language}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
}

export function getLanguageCookie(): 'fr' | 'en' | 'ar' | null {
  const cookies = document.cookie.split(';');
  
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === LANGUAGE_COOKIE_NAME) {
      const lang = value as 'fr' | 'en' | 'ar';
      if (['fr', 'en', 'ar'].includes(lang)) {
        return lang;
      }
    }
  }
  
  return null;
}

// Geolocation detection using multiple IP services
async function detectLocationFromIP(): Promise<LocationData | null> {
  const services = [
    {
      url: 'https://ipapi.co/json/',
      parser: (data: any) => ({
        country: data.country_name,
        countryCode: data.country_code,
        region: data.region,
        city: data.city
      })
    },
    {
      url: 'https://api.ipgeolocation.io/ipgeo?apiKey=free',
      parser: (data: any) => ({
        country: data.country_name,
        countryCode: data.country_code2,
        region: data.state_prov,
        city: data.city
      })
    },
    {
      url: 'https://ipinfo.io/json',
      parser: (data: any) => ({
        country: data.country,
        countryCode: data.country,
        region: data.region,
        city: data.city
      })
    }
  ];

  for (const service of services) {
    try {
      const response = await fetch(service.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const locationData = service.parser(data);
      
      if (locationData.countryCode && locationData.countryCode.length === 2) {
        console.log('Location detected:', locationData);
        return locationData;
      }
    } catch (error) {
      console.warn(`Geolocation service failed:`, error);
      continue;
    }
  }

  return null;
}

// Browser language detection
function detectBrowserLanguage(): 'fr' | 'en' | 'ar' | null {
  const browserLang = navigator.language || navigator.languages?.[0];
  
  if (!browserLang) return null;
  
  const langCode = browserLang.toLowerCase().split('-')[0];
  
  switch (langCode) {
    case 'fr':
      return 'fr';
    case 'ar':
      return 'ar';
    case 'en':
    default:
      return 'en';
  }
}

// Main language detection function
export async function detectUserLanguage(): Promise<LanguageDetectionResult> {
  try {
    // 1. Check for saved cookie preference first
    const cookieLanguage = getLanguageCookie();
    if (cookieLanguage) {
      console.log('Language from cookie:', cookieLanguage);
      return {
        detectedLanguage: cookieLanguage,
        source: 'cookie'
      };
    }

    // 2. Try geolocation detection
    const locationData = await detectLocationFromIP();
    if (locationData?.countryCode) {
      const geoLanguage = COUNTRY_LANGUAGE_MAP[locationData.countryCode.toUpperCase()];
      if (geoLanguage) {
        console.log('Language from geolocation:', geoLanguage, 'Country:', locationData.country);
        return {
          detectedLanguage: geoLanguage,
          source: 'geolocation',
          locationData
        };
      }
    }

    // 3. Fall back to browser language
    const browserLanguage = detectBrowserLanguage();
    if (browserLanguage) {
      console.log('Language from browser:', browserLanguage);
      return {
        detectedLanguage: browserLanguage,
        source: 'browser'
      };
    }

    // 4. Default fallback
    console.log('Using default language: English');
    return {
      detectedLanguage: 'en',
      source: 'default'
    };

  } catch (error) {
    console.error('Language detection failed:', error);
    return {
      detectedLanguage: 'en',
      source: 'default'
    };
  }
}