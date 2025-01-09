import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertCircle } from 'lucide-react';
import WeatherCard from "./WeatherCard";
import HourlyForecast from "./HourlyForecast";
import WeatherAlerts from "./WeatherAlerts";
import SearchBar from "./SearchBar";
import WeatherMap from "./WeatherMap";
import WeatherStats from "./weatherstats";
import { getWeatherBackground } from './utils/weatherBackgrounds';

function App() {
  const [query, setQuery] = useState("Hyderabad");
  const [unit, setUnit] = useState("metric");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false
  });

  const search = async (searchQuery) => {
    setWeather({ ...weather, loading: true });
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=${unit}`;

    try {
      const response = await axios.get(url);
      setWeather({ data: response.data, loading: false, error: false });
      setQuery(searchQuery);
    } catch (error) {
      setWeather({ ...weather, data: {}, error: true, loading: false });
    }
  };

  useEffect(() => {
    search(query);
  }, [unit]);

  const weatherCode = weather.data?.weather?.[0]?.icon || 'default';
  const { image } = getWeatherBackground(weatherCode);

  return (
    <div className="weather-app">
      {/* Background Container */}
      <div 
        className="weather-background"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Content Container */}
      <div className="weather-content">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="glass-card">
            <SearchBar onSearch={search} />
            
            {weather.error && (
              <div className="flex items-center justify-center gap-2 text-red-500 mt-4 bg-red-50/50 p-4 rounded-lg">
                <AlertCircle />
                <p>City not found. Please try again.</p>
              </div>
            )}

            {weather.loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : (
              !weather.error && (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
                      className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition text-white font-medium"
                    >
                      Switch to {unit === "metric" ? "°F" : "°C"}
                    </button>
                  </div>
                  
                  <WeatherCard weather={weather} unit={unit} />
                  <WeatherStats weather={weather} unit="metric" />
                  <HourlyForecast weather={weather} unit={unit} />
                  <WeatherAlerts weather={weather} />
                  <WeatherMap weather={weather} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

