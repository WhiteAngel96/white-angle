import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, MapPin } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface GoogleMapProps {
  searchQuery?: string;
  onSearchComplete?: () => void;
}

interface ClinicLocation {
  lat: number;
  lng: number;
  title: string;
  address: string;
  phone: string;
  products: string[];
  id: string;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ searchQuery, onSearchComplete }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<ClinicLocation | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const { t } = useTranslation();

  // Israel coordinates (default location)
  const israelCenter = { lat: 31.0461, lng: 34.8516 };

  // White Angel clinic locations in Israel with detailed information
  const clinicLocations: ClinicLocation[] = [
    { 
      id: 'tel-aviv-center',
      lat: 32.0853, 
      lng: 34.7818, 
      title: 'White Angel Tel Aviv Center',
      address: '123 Dizengoff Street, Tel Aviv, Israel',
      phone: '+972-3-555-0123',
      products: ['White Angel Extra 46%', 'Home Kit 20%', 'Professional Treatment', 'Maintenance Kit']
    },
    { 
      id: 'jerusalem-clinic',
      lat: 31.7683, 
      lng: 35.2137, 
      title: 'White Angel Jerusalem Clinic',
      address: '456 King George Street, Jerusalem, Israel',
      phone: '+972-2-555-0456',
      products: ['White Angel Extra 46%', 'Home Kit 20%', 'Professional Treatment']
    },
    { 
      id: 'haifa-branch',
      lat: 32.7940, 
      lng: 34.9896, 
      title: 'White Angel Haifa Branch',
      address: '789 Herzl Street, Haifa, Israel',
      phone: '+972-4-555-0789',
      products: ['Home Kit 20%', 'Professional Treatment', 'Maintenance Kit']
    },
    { 
      id: 'beer-sheva-office',
      lat: 31.2530, 
      lng: 34.7915, 
      title: 'White Angel Beer Sheva Office',
      address: '321 Ben Gurion Boulevard, Beer Sheva, Israel',
      phone: '+972-8-555-0321',
      products: ['White Angel Extra 46%', 'Home Kit 20%']
    },
    { 
      id: 'herzliya-clinic',
      lat: 32.1052, 
      lng: 34.8368, 
      title: 'White Angel Herzliya Clinic',
      address: '654 Medinat HaYehudim Street, Herzliya, Israel',
      phone: '+972-9-555-0654',
      products: ['White Angel Extra 46%', 'Professional Treatment', 'Maintenance Kit']
    },
    { 
      id: 'rehovot-center',
      lat: 31.8969, 
      lng: 34.8186, 
      title: 'White Angel Rehovot Center',
      address: '987 Weizmann Street, Rehovot, Israel',
      phone: '+972-8-555-0987',
      products: ['Home Kit 20%', 'Professional Treatment']
    }
  ];

  // Initialize Google Maps
  useEffect(() => {
    const initMap = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      if (!apiKey) {
        setMapError('Google Maps API key is not configured. Please add VITE_GOOGLE_MAPS_API_KEY to your environment variables.');
        setIsLoading(false);
        return;
      }

      try {
        const loader = new Loader({
          apiKey: apiKey,
          version: 'weekly',
          libraries: ['places', 'geometry']
        });

        const { Map } = await loader.importLibrary('maps');
        const { Marker } = await loader.importLibrary('marker');

        if (!mapRef.current) return;

        // Create map
        const map = new Map(mapRef.current, {
          center: israelCenter,
          zoom: 7,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        mapInstanceRef.current = map;

        // Create markers for clinic locations
        clinicLocations.forEach((clinic) => {
          const marker = new Marker({
            position: { lat: clinic.lat, lng: clinic.lng },
            map: map,
            title: clinic.title,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: 'hsl(200, 100%, 65%)', // CTA light blue color
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
            },
            animation: google.maps.Animation.DROP
          });

          // Add click listener to marker
          marker.addListener('click', () => {
            setSelectedClinic(clinic);
            map.panTo({ lat: clinic.lat, lng: clinic.lng });
            map.setZoom(14);
          });

          markersRef.current.push(marker);
        });

        setIsLoading(false);
        setMapError(null);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setMapError('Failed to load Google Maps. Please check your API key and internet connection.');
        setIsLoading(false);
      }
    };

    initMap();

    // Cleanup function
    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  // Handle search query changes
  useEffect(() => {
    if (!searchQuery || !mapInstanceRef.current) return;

    setIsMoving(true);
    
    // Find matching clinic or use geocoding
    const searchLower = searchQuery.toLowerCase();
    let targetLocation = israelCenter;
    let targetZoom = 7;
    
    // Check for exact clinic matches first
    const matchingClinic = clinicLocations.find(clinic => 
      clinic.title.toLowerCase().includes(searchLower) ||
      clinic.address.toLowerCase().includes(searchLower)
    );

    if (matchingClinic) {
      targetLocation = { lat: matchingClinic.lat, lng: matchingClinic.lng };
      targetZoom = 14;
      setSelectedClinic(matchingClinic);
    } else {
      // Check for city matches
      if (searchLower.includes('tel aviv') || searchLower.includes('תל אביב')) {
        targetLocation = { lat: 32.0853, lng: 34.7818 };
        targetZoom = 12;
      } else if (searchLower.includes('jerusalem') || searchLower.includes('ירושלים')) {
        targetLocation = { lat: 31.7683, lng: 35.2137 };
        targetZoom = 12;
      } else if (searchLower.includes('haifa') || searchLower.includes('חיפה')) {
        targetLocation = { lat: 32.7940, lng: 34.9896 };
        targetZoom = 12;
      } else if (searchLower.includes('beer sheva') || searchLower.includes('באר שבע')) {
        targetLocation = { lat: 31.2530, lng: 34.7915 };
        targetZoom = 12;
      } else if (searchLower.includes('herzliya') || searchLower.includes('הרצליה')) {
        targetLocation = { lat: 32.1052, lng: 34.8368 };
        targetZoom = 12;
      } else if (searchLower.includes('rehovot') || searchLower.includes('רחובות')) {
        targetLocation = { lat: 31.8969, lng: 34.8186 };
        targetZoom = 12;
      }
    }
    
    // Animate to location
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo(targetLocation);
        mapInstanceRef.current.setZoom(targetZoom);
      }
      setIsMoving(false);
      onSearchComplete?.();
    }, 1000);
  }, [searchQuery, onSearchComplete]);

  if (mapError) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-navy mb-4">{t('pages.findLocation.providersMap')}</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-12 h-12 text-red-400" />
          </div>
          <h4 className="text-lg font-semibold text-red-800 mb-2">Map Configuration Required</h4>
          <p className="text-red-600 mb-4">{mapError}</p>
          <div className="text-sm text-red-500 bg-red-100 rounded-lg p-3">
            <p className="font-medium mb-2">To enable Google Maps:</p>
            <ol className="text-left list-decimal list-inside space-y-1">
              <li>Get a Google Maps API key from Google Cloud Console</li>
              <li>Create a <code className="bg-red-200 px-1 rounded">.env</code> file in your project root</li>
              <li>Add: <code className="bg-red-200 px-1 rounded">VITE_GOOGLE_MAPS_API_KEY=your_api_key_here</code></li>
              <li>Restart your development server</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-navy mb-4">{t('pages.findLocation.providersMap')}</h3>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map Container */}
        <div className={`relative rounded-lg overflow-hidden transition-all duration-500 ${
          selectedClinic ? 'lg:w-2/3' : 'w-full'
        } h-96`}>
          <div 
            ref={mapRef} 
            className="w-full h-full bg-gray-100"
            style={{ minHeight: '384px' }}
          />
          
          {/* Loading overlay */}
          {(isLoading || isMoving) && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <div className="bg-white px-6 py-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-cta-light-blue/30 border-t-cta-light-blue rounded-full animate-spin" />
                  <span className="text-sm font-medium">
                    {isLoading ? 'Loading map...' : t('pages.findLocation.flyingToLocation')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clinic Details Panel */}
        {selectedClinic && (
          <Card className="lg:w-1/3 w-full p-6 animate-slide-in-right">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-lg text-navy mb-1">{selectedClinic.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{selectedClinic.address}</p>
                <p className="text-sm font-medium text-cta-light-blue">{selectedClinic.phone}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedClinic(null)}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mb-4">
              <h5 className="font-semibold text-muted-foreground mb-3">{t('pages.findLocation.availableProducts')}</h5>
              <div className="space-y-2">
                {selectedClinic.products.map((product: string, index: number) => (
                  <div key={index} className="p-3 bg-soft-aqua/10 rounded-lg hover:bg-soft-aqua/20 transition-colors">
                    <span className="text-sm font-medium text-navy">{product}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Button variant="cta" size="sm" className="w-full">
                {t('pages.findLocation.bookAppointment')}
              </Button>
              <Button variant="cta-outline" size="sm" className="w-full">
                Call {selectedClinic.phone}
              </Button>
            </div>
          </Card>
        )}
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-cta-light-blue border-2 border-white shadow-sm" />
          <span className="text-muted-foreground">{t('pages.findLocation.whiteAngelClinics')}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Click on any marker to view clinic details and available products
        </div>
      </div>
    </div>
  );
};