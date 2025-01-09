import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

const defaults = {
  color: 'white',
  size: 112,
  animate: true
};

const iconMap = {
  '01d': 'CLEAR_DAY',
  '01n': 'CLEAR_NIGHT',
  '02d': 'PARTLY_CLOUDY_DAY',
  '02n': 'PARTLY_CLOUDY_NIGHT',
  '03d': 'CLOUDY',
  '03n': 'CLOUDY',
  '04d': 'CLOUDY',
  '04n': 'CLOUDY',
  '09d': 'RAIN',
  '09n': 'RAIN',
  '10d': 'RAIN',
  '10n': 'RAIN',
  '11d': 'SLEET',
  '11n': 'SLEET',
  '13d': 'SNOW',
  '13n': 'SNOW',
  '50d': 'FOG',
  '50n': 'FOG',
};

function AnimatedWeatherIcon({ icon, size = defaults.size }) {
  const iconName = iconMap[icon] || 'CLEAR_DAY';
  
  return (
    <div className="weather-icon">
      <ReactAnimatedWeather
        icon={iconName}
        color={defaults.color}
        size={size}
        animate={defaults.animate}
      />
    </div>
  );
}

export default AnimatedWeatherIcon;

