import React, { useState } from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'weather-icons-react';
import { Search, Wind, Droplets, Sunrise, Sunset } from 'lucide-react';


const Forecast = ({ weather }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const getWeatherIcon = (description) => {
    switch (description) {
      case 'Clear':
        return <WiDaySunny size={64} color="#000" />;
      case 'Clouds':
        return <WiCloudy size={64} color="#000" />;
      case 'Rain':
        return <WiRain size={64} color="#000" />;
      case 'Snow':
        return <WiSnow size={64} color="#000" />;
      default:
        return <WiDaySunny size={64} color="#000" />;
    }
  };

  const temperature = isCelsius
    ? weather.data.main.temp
    : (weather.data.main.temp * 9/5) + 32;

  const temperatureUnit = isCelsius ? '°C' : '°F';

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-amber-100 p-8">
      <Card className="max-w-lg mx-auto bg-white/80 backdrop-blur">
        <CardHeader>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter city name"
              className="w-full p-3 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{weather.data.name}</h1>
              <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                {getWeatherIcon(weather.data.weather[0].main)}
                <span className="text-4xl font-bold">{temperature.toFixed(1)} {temperatureUnit}</span>
              </div>
              <p className="text-blue-500 mt-1">{weather.data.weather[0].description}</p>
              <button onClick={toggleTemperatureUnit}>
                Toggle to {isCelsius ? '°F' : '°C'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600">Wind Speed</span>
              </div>
              <p className="text-xl font-semibold">{weather.data.wind.speed} m/s</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600">Humidity</span>
              </div>
              <p className="text-xl font-semibold">{weather.data.main.humidity}%</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sunrise className="h-5 w-5 text-orange-500" />
                <span className="text-gray-600">Sunrise</span>
              </div>
              <p className="text-xl font-semibold">{new Date(weather.data.sys.sunrise * 1000).toLocaleTimeString()}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sunset className="h-5 w-5 text-orange-500" />
                <span className="text-gray-600">Sunset</span>
              </div>
              <p className="text-xl font-semibold">{new Date(weather.data.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Forecast;