import React from 'react';
import { Wind, Droplets, Sun, Thermometer } from 'lucide-react';

function WeatherStats({ weather, unit }) {
  const { data } = weather;
  
  const stats = [
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${Math.round(data.wind?.speed)} ${unit === 'metric' ? 'm/s' : 'mph'}`,
      animationClass: "animate-[spin_3s_linear_infinite]",
      iconColor: "black",
      bgGradient: "from-black-400/20 to-black-600/20"
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${data.main?.humidity}%`,
      animationClass: "animate-bounce",
      iconColor: "green",
      bgGradient: "from-green-300/20 to-green-500/20"
    },
    {
      icon: Thermometer,
      label: "Feels Like",
      value: `${Math.round(data.main?.feels_like)}°${unit === 'metric' ? 'C' : 'F'}`,
      animationClass: "animate-pulse",
      iconColor: "#EF4444",
      bgGradient: "from-red-400/20 to-red-600/20"
    },
    {
      icon: Sun,
      label: "Pressure",
      value: `${data.main?.pressure} hPa`,
      animationClass: "animate-pulse",
      iconColor: "#FBBF24",
      bgGradient: "from-amber-400/20 to-amber-600/20"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="relative group">
            <div className={`stat-card glass-card-hover bg-gradient-to-br ${stat.bgGradient} backdrop-blur-md border-white/10 hover:border-white/20`}>
              <div className="relative h-24 flex flex-col items-center justify-center overflow-hidden">
                <div className={`relative mb-2 transform transition-all duration-300 group-hover:scale-110 ${stat.animationClass}`}>
                  <Icon 
                    className="h-8 w-8"
                    style={{ color: stat.iconColor }}
                    strokeWidth={1.5}
                  />
                </div>
                
                <p className="text-sm font-medium text-white/90">
                  {stat.label}
                </p>
                
                <p className="text-lg font-bold mt-1 text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WeatherStats;