import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for the default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function WeatherMap({ weather }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);

  useEffect(() => {
    if (!weather?.data?.coord || !mapRef.current) return;

    const { lat, lon } = weather.data.coord;

    // Initialize map if it doesn't exist
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [lat, lon],
        zoom: 10,
        layers: []
      });

      // Add tile layer
      tileLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    } else {
      // Update map view if it exists
      mapInstanceRef.current.setView([lat, lon], 10);
    }

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    // Add new marker
    const marker = L.marker([lat, lon])
      .addTo(mapInstanceRef.current)
      .bindPopup(weather.data.name)
      .openPopup();

    // Force a resize to handle any container size changes
    setTimeout(() => {
      mapInstanceRef.current.invalidateSize();
    }, 100);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [weather?.data?.coord]);

  return (
    <div className="glass-card bg-white/80">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Weather Map</h3>
      <div 
        ref={mapRef} 
        className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg 
                   transition-all duration-300 hover:shadow-xl border-2 border-white/50" 
      />
    </div>
  );
}
export default WeatherMap;

