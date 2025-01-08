

import React from "react";
import { Cloud, Droplets, Wind, Sun, Thermometer } from 'lucide-react';
import InfoCard from './InfoCard';

function WeatherCard({ weather, unit }) {
  const getWeatherIcon = (weatherCode) => {
    const iconSize = 64;
    switch (weatherCode) {
      case '01d': case '01n': return <Sun size={iconSize} className="text-yellow-500" />;
      case '02d': case '02n': case '03d': case '03n': case '04d': case '04n':
        return <Cloud size={iconSize} className="text-gray-500" />;
      default: return <Cloud size={iconSize} className="text-gray-500" />;
    }
  };

  return (
    <div className="glass-card animate-fade-in space-y-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">{weather.data.name}</h2>
        <div className="flex items-center justify-center">
          {weather.data.weather && getWeatherIcon(weather.data.weather[0].icon)}
        </div>
        <div className="text-6xl font-bold text-gray-900">
          {Math.round(weather.data.main?.temp)}°{unit === 'metric' ? 'C' : 'F'}
        </div>
        <p className="text-xl font-medium text-gray-700 capitalize">
          {weather.data.weather?.[0].description}
        </p>
        <div className="text-sm text-gray-600">
          High: {Math.round(weather.data.main?.temp_max)}° • 
          Low: {Math.round(weather.data.main?.temp_min)}°
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <InfoCard
          icon={<Wind className="text-blue-500" />}
          title="Wind"
          value={`${weather.data.wind?.speed} ${unit === 'metric' ? 'm/s' : 'mph'}`}
        />
        <InfoCard
          icon={<Droplets className="text-blue-400" />}
          title="Humidity"
          value={`${weather.data.main?.humidity}%`}
        />
        <InfoCard
          icon={<Thermometer className="text-red-400" />}
          title="Feels Like"
          value={`${Math.round(weather.data.main?.feels_like)}°`}
        />
        <InfoCard
          icon={<Sun className="text-yellow-500" />}
          title="Pressure"
          value={`${weather.data.main?.pressure} hPa`}
        />
      </div>
    </div>
  );
}

export default WeatherCard;