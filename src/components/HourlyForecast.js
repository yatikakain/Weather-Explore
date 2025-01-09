import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, CloudRain, Cloud, Sun, Moon } from 'lucide-react';

function HourlyForecast({ weather, unit }) {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getWeatherIcon = (weather, dt) => {
    const hour = new Date(dt * 1000).getHours();
    const isNight = hour >= 18 || hour <= 6;
    const condition = weather.toLowerCase();

    if (condition.includes('rain') || condition.includes('drizzle')) {
      return <CloudRain className="h-8 w-8 text-blue-400 animate-bounce" />;
    } else if (condition.includes('cloud')) {
      return <Cloud className="h-8 w-8 text-gray-400 animate-pulse" />;
    } else {
      return isNight ? 
        <Moon className="h-8 w-8 text-yellow-200 animate-pulse" /> : 
        <Sun className="h-8 w-8 text-yellow-400 animate-spin-slow" />;
    }
  };

  useEffect(() => {
    const fetchHourlyData = async () => {
      if (weather?.data?.coord) {
        try {
          setLoading(true);
          setError(null);
          const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
          const { lat, lon } = weather.data.coord;
          const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
          
          const response = await axios.get(url);
          setHourlyData(response.data.list.slice(0, 8));
        } catch (error) {
          console.error("Error fetching hourly forecast:", error);
          setError("Unable to load hourly forecast");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchHourlyData();
  }, [weather?.data?.coord, unit]);

  if (loading) {
    return (
      <div className="glass-card">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Clock className="h-5 w-5 animate-pulse" />
          Hourly Forecast
        </h3>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Hourly Forecast
        </h3>
        <p className="text-red-400 mt-4 bg-red-400/10 p-4 rounded-lg backdrop-blur-sm">
          {error}
        </p>
      </div>
    );
  }

  if (!hourlyData?.length) return null;

  return (
    <div className="glass-card space-y-6">
      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Hourly Forecast
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {hourlyData.map((hour, index) => (
          <div key={index} className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative bg-black/20 backdrop-blur-md rounded-xl p-4 transition-all duration-300 group-hover:transform group-hover:scale-105 group-hover:bg-black/30">
              <div className="text-sm font-medium text-white">
                {new Date(hour.dt * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              
              <div className="my-3 flex justify-center">
                {getWeatherIcon(hour.weather[0].main, hour.dt)}
              </div>
              
              <div className="text-2xl font-bold mb-2 text-white">
                {Math.round(hour.main.temp)}°
              </div>
              
              <div className="text-sm text-white/90 capitalize">
                {hour.weather[0].description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;