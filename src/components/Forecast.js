import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";


function Forecast({ weather }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit

  useEffect(() => {
    const fetchForecastData = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.shecodes.io/weather/v1/forecast?query=${data.city}&key=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        setForecastData(response.data.daily);
      } catch (error) {
        console.log("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();
  }, [data.city]);

  const formatDay = (dateString) => {
    const options = { weekday: "short" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToCelsius = (temperature) => {
    return Math.round((temperature - 32) * (5 / 9));
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    if (isCelsius) {
      return Math.round(temperature);
    } else {
      return convertToFahrenheit(temperature);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '--:--';
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <div className="city-name">
        <h2>
          {data.city}, <span>{data.country}</span>
        </h2>
      </div>
      <div className="date">
        <span>{getCurrentDate()}</span>
      </div>
      <div className="temp">
        {data.condition.icon_url && (
          <img
            src={data.condition.icon_url}
            alt={data.condition.description}
            className="temp-icon"
          />
        )}
        {renderTemperature(data.temperature.current)}
        <sup className="temp-deg" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup>
      </div>
      <p className="weather-des">{data.condition.description}</p>
      <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="WIND" size="40"/>
          <div>
            <p className="wind">{data.wind.speed}m/s</p>
            <p>Wind speed</p>
          </div>
        </div>
        <div className="col">
          <ReactAnimatedWeather icon="RAIN" size="40"/>
          <div>
            <p className="humidity">{data.temperature.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
        {/* Sunrise */}
        <div className="col">
          <ReactAnimatedWeather icon="CLEAR_DAY" size="40"/>
          <div>
            <p className="sunrise">
              {forecastData.length > 0 
                ? formatTime(forecastData[0].sunrise)
                : '--:--'}
            </p>
            <p>Sunrise</p>
          </div>
        </div>

        {/* Sunset */}
        <div className="col">
          <ReactAnimatedWeather icon="CLEAR_NIGHT" size="40"/>
          <div>
            <p className="sunset">
              {forecastData.length > 0 
                ? formatTime(forecastData[0].sunset)
                : '--:--'}
            </p>
            <p>Sunset</p>
          </div>
        </div>
      </div>
    </div>
  );
}        

export default Forecast;
