// WeatherMap.js
import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function WeatherMap({ weather }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Cleanup function for previous map instance
    const cleanupMap = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };

    // Only create map if we have valid coordinates and a map container
    if (weather?.data?.coord && mapRef.current) {
      // Clean up previous instance first
      cleanupMap();

      const { lat, lon } = weather.data.coord;
      
      try {
        // Create new map instance
        mapInstanceRef.current = L.map(mapRef.current).setView([lat, lon], 10);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstanceRef.current);
        
        // Add marker
        L.marker([lat, lon])
          .addTo(mapInstanceRef.current)
          .bindPopup(weather.data.name)
          .openPopup();

        // Force a resize event in case container size changed
        setTimeout(() => {
          mapInstanceRef.current.invalidateSize();
        }, 100);
      } catch (error) {
        console.error("Error initializing map:", error);
        cleanupMap();
      }
    }

    // Cleanup on unmount or when weather data changes
    return cleanupMap;
  }, [weather?.data?.coord]);

  if (!weather?.data?.coord) {
    return null;
  }

  return (
    <div className="glass-card">
      <h3 className="text-xl font-bold mb-4">Weather Map</h3>
      <div className="relative">
        <div ref={mapRef} className="h-[400px] w-full rounded-lg overflow-hidden" />
      </div>
    </div>
  );
}

export default WeatherMap;