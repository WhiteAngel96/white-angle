import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/// <reference types="google.maps" />

interface GoogleMapProps {
  searchQuery?: string;
  onSearchComplete?: () => void;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ searchQuery, onSearchComplete }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);

  // Israel coordinates (default location)
  const israelCenter = { lat: 31.0461, lng: 34.8516 };

  useEffect(() => {
    if (!isApiKeySet || !apiKey || !mapRef.current) return;

    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['places', 'geocoding']
    });

    loader.load().then(() => {
      if (!mapRef.current) return;

      // Initialize map centered on Israel
      const map = new google.maps.Map(mapRef.current, {
        center: israelCenter,
        zoom: 7,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      mapInstanceRef.current = map;

      // Add some sample markers for White Angel providers in Israel
      const sampleLocations = [
        { lat: 32.0853, lng: 34.7818, title: 'White Angel Tel Aviv Center' },
        { lat: 31.7683, lng: 35.2137, title: 'White Angel Jerusalem Clinic' },
        { lat: 32.7940, lng: 34.9896, title: 'White Angel Haifa Branch' },
        { lat: 31.2530, lng: 34.7915, title: 'White Angel Beer Sheva Office' }
      ];

      sampleLocations.forEach(location => {
        new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.title,
          icon: {
            url: '/placeholder.svg',
            scaledSize: new google.maps.Size(30, 30)
          }
        });
      });
    }).catch(error => {
      console.error('Error loading Google Maps:', error);
    });
  }, [isApiKeySet, apiKey]);

  // Handle search query changes
  useEffect(() => {
    if (!searchQuery || !mapInstanceRef.current || !isApiKeySet) return;

    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === 'OK' && results && results[0] && mapInstanceRef.current) {
        const location = results[0].geometry.location;
        mapInstanceRef.current.setCenter(location);
        mapInstanceRef.current.setZoom(12);
        
        // Add marker for searched location
        new google.maps.Marker({
          position: location,
          map: mapInstanceRef.current,
          title: `Searched: ${searchQuery}`,
          icon: {
            url: '/placeholder.svg',
            scaledSize: new google.maps.Size(40, 40)
          }
        });

        onSearchComplete?.();
      }
    });
  }, [searchQuery, isApiKeySet, onSearchComplete]);

  if (!isApiKeySet) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-navy mb-4">Google Maps Integration</h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Please enter your Google Maps API key to view the interactive map.
          </p>
          <p className="text-sm text-muted-foreground">
            Get your API key from the{' '}
            <a 
              href="https://console.cloud.google.com/google/maps-apis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Cloud Console
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter Google Maps API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={() => setIsApiKeySet(true)}
              disabled={!apiKey}
              variant="cta"
            >
              Load Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-navy mb-4">White Angel Providers Map</h3>
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};