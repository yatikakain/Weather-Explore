import React from "react";
import { AlertTriangle, CloudRain, Thermometer, Wind, Sun, Cloud } from 'lucide-react';

function WeatherAlerts({ weather }) {
  if (!weather?.data) return null;

  const { main, wind, weather: weatherData } = weather.data;
  const alerts = [];

  // Temperature alerts
  if (main?.temp) {
    if (main.temp > 30) {
      alerts.push({
        type: "Extreme Heat",
        description: "Temperature is very high. Stay hydrated and avoid direct sun exposure!",
        severity: "high",
        icon: <Sun className="h-5 w-5 text-red-500" />
      });
    } else if (main.temp < 0) {
      alerts.push({
        type: "Freezing Temperature",
        description: "Temperature is below freezing. Dress warmly and be careful of ice!",
        severity: "high",
        icon: <Thermometer className="h-5 w-5 text-blue-500" />
      });
    } else if (main.temp > 25) {
      alerts.push({
        type: "High Temperature",
        description: "It's quite warm today. Stay hydrated!",
        severity: "moderate",
        icon: <Thermometer className="h-5 w-5 text-yellow-500" />
      });
    }
  }

  // Weather condition alerts
  if (weatherData?.[0]?.main) {
    const condition = weatherData[0].main.toLowerCase();
    
    if (condition.includes('rain') || condition.includes('drizzle')) {
      alerts.push({
        type: "Rain Alert",
        description: "Rain is expected. Don't forget your umbrella!",
        severity: "moderate",
        icon: <CloudRain className="h-5 w-5 text-blue-500" />
      });
    } else if (condition.includes('thunderstorm')) {
      alerts.push({
        type: "Thunderstorm Warning",
        description: "Thunderstorms expected. Stay indoors if possible!",
        severity: "high",
        icon: <Cloud className="h-5 w-5 text-purple-500" />
      });
    } else if (condition.includes('snow')) {
      alerts.push({
        type: "Snow Alert",
        description: "Snowfall expected. Drive carefully!",
        severity: "moderate",
        icon: <Cloud className="h-5 w-5 text-blue-300" />
      });
    }
  }

  // Wind alerts
  if (wind?.speed) {
    if (wind.speed > 20) {
      alerts.push({
        type: "Strong Winds",
        description: "Very strong winds expected. Secure loose objects outdoors!",
        severity: "high",
        icon: <Wind className="h-5 w-5 text-yellow-500" />
      });
    } else if (wind.speed > 15) {
      alerts.push({
        type: "Moderate Winds",
        description: "Moderate winds expected. Take care with light objects outdoors.",
        severity: "moderate",
        icon: <Wind className="h-5 w-5 text-yellow-400" />
      });
    }
  }

  // Humidity alerts
  if (main?.humidity) {
    if (main.humidity > 80) {
      alerts.push({
        type: "High Humidity",
        description: "Very humid conditions. Stay hydrated!",
        severity: "moderate",
        icon: <Cloud className="h-5 w-5 text-blue-400" />
      });
    }
  }

  if (!alerts.length) {
    return (
      <div className="glass-card space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-green-500" />
          Weather Alerts
        </h3>
        <p className="text-green-700 bg-green-50/50 p-4 rounded-lg">
          No weather alerts for {weather.data.name}. Conditions are favorable!
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card space-y-4">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-yellow-500" />
        Weather Alerts for {weather.data.name}
      </h3>
      <div className="grid gap-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg flex items-start gap-3 ${
              alert.severity === "high"
                ? "bg-red-50/50 text-red-900"
                : alert.severity === "moderate"
                ? "bg-yellow-50/50 text-yellow-900"
                : "bg-blue-50/50 text-blue-900"
            }`}
          >
            {alert.icon}
            <div>
              <h4 className="font-medium">{alert.type}</h4>
              <p className="text-sm mt-1 opacity-90">{alert.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherAlerts;

