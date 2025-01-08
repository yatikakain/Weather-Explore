import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertCircle } from 'lucide-react';
import WeatherCard from "./WeatherCard";
import HourlyForecast from "./HourlyForecast"
import WeatherAlerts from "./WeatherAlerts";
import SearchBar from "./SearchBar";
import WeatherMap from "./WeatherMap";
import WeatherStats from "./weatherstats";

function App() {
  const [query, setQuery] = useState("London");
  const [unit, setUnit] = useState("metric"); // Add temperature unit toggle
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
  }, [unit]); // Refetch when unit changes

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 shadow-lg">
          <SearchBar onSearch={search} />
          
          {weather.error && (
            <div className="flex items-center justify-center gap-2 text-red-500 mt-4">
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
                    className="px-4 py-2 bg-white/30 rounded-lg hover:bg-white/40 transition"
                  >
                    Switch to {unit === "metric" ? "°F" : "°C"}
                  </button>
                </div>
                
                <WeatherCard weather={weather} unit={unit} />
                <WeatherStats weather={weather} unit={unit} />
                <HourlyForecast weather={weather} unit={unit} />
                <WeatherAlerts location={query} />
                <WeatherMap location={query} weather={weather} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;