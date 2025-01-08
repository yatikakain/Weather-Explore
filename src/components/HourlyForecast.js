import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock } from 'lucide-react';

function HourlyForecast({ weather, unit }) {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHourlyData = async () => {
      // Only fetch if we have coordinates
      if (weather?.data?.coord) {
        try {
          setLoading(true);
          setError(null);
          const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
          const { lat, lon } = weather.data.coord;
          const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
          
          const response = await axios.get(url);
          // Take first 8 entries for 24-hour forecast
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
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Hourly Forecast
        </h3>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Hourly Forecast
        </h3>
        <p className="text-red-500 mt-4">{error}</p>
      </div>
    );
  }

  if (!hourlyData?.length) {
    return null;
  }

  return (
    <div className="glass-card space-y-4">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Hourly Forecast
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {hourlyData.map((hour, index) => (
          <div key={index} className="bg-white/40 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/50 transition-all">
            <div className="text-sm font-medium text-gray-700">
              {new Date(hour.dt * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <div className="text-2xl font-bold my-2 text-gray-900">
              {Math.round(hour.main.temp)}°
            </div>
            <div className="text-sm text-gray-600 capitalize">
              {hour.weather[0].description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default HourlyForecast;