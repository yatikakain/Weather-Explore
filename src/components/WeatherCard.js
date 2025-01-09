import React from "react";
import { Wind, Droplets, Sun, Thermometer } from 'lucide-react';
import AnimatedWeatherIcon from './AnimatedWeatherIcon';

function WeatherCard({ weather, unit }) {
  if (!weather?.data) return null;

  return (
    <div className="glass-card glass-card-hover slide-up bg-white/80">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* City Name with Gradient */}
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">
          {weather.data.name}
        </h2>
        
        {/* Animated Weather Icon */}
        <div className="transform hover:scale-110 transition-transform duration-300">
          <AnimatedWeatherIcon icon={weather.data.weather?.[0].icon} />
        </div>
        
        {/* Temperature Display */}
        <div className="text-6xl font-bold text-gray-800 transition-all duration-300 hover:text-gray-900">
          {Math.round(weather.data.main?.temp)}°{unit === 'metric' ? 'C' : 'F'}
        </div>
        
        {/* Weather Description */}
        <p className="text-xl font-medium text-gray-700 capitalize">
          {weather.data.weather?.[0].description}
        </p>
        
        {/* Temperature Range */}
        <div className="text-sm text-gray-600 font-medium">
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            High: {Math.round(weather.data.main?.temp_max)}°
          </span>
          <span className="mx-2">•</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            Low: {Math.round(weather.data.main?.temp_min)}°
          </span>
        </div>
      </div>
    </div>
  );
}
export default WeatherCard;