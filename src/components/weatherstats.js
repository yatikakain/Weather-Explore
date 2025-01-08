import React from 'react';
import { Wind, Droplets, Sun, Thermometer } from 'lucide-react';

function WeatherStats({ weather, unit }) {
  const { data } = weather;
  
  const stats = [
    {
      icon: <Wind className="h-6 w-6" />,
      label: "Wind Speed",
      value: `${Math.round(data.wind?.speed)} ${unit === 'metric' ? 'm/s' : 'mph'}`
    },
    {
      icon: <Droplets className="h-6 w-6" />,
      label: "Humidity",
      value: `${data.main?.humidity}%`
    },
    {
      icon: <Thermometer className="h-6 w-6" />,
      label: "Feels Like",
      value: `${Math.round(data.main?.feels_like)}°${unit === 'metric' ? 'C' : 'F'}`
    },
    {
      icon: <Sun className="h-6 w-6" />,
      label: "Pressure",
      value: `${data.main?.pressure} hPa`
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white/30 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="flex justify-center mb-2">{stat.icon}</div>
          <p className="text-sm font-medium">{stat.label}</p>
          <p className="text-lg font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default WeatherStats;