export const getWeatherBackground = (weatherCode) => {
  const backgrounds = {
    // Clear sky
    '01d': {
      image: '/images/sunny.jpeg',
      gradient: 'from-yellow-400/30 to-sky-400/30'
    },
    '01n': {
      image:'/images/cloudy-night.jpeg',
      gradient: 'from-gray-900/30 to-blue-900/30'
    },
    // Few clouds
    '02d': {
      image: '/images/cloudy.jpeg',
      gradient: 'from-blue-400/30 to-gray-300/30'
    },
    '02n': {
      image: '/images/cloudy-night.jpeg',
      gradient: 'from-gray-900/30 to-blue-800/30'
    },
    // Scattered/broken clouds
    '03d': {
      image: '/images/clody.jpeg',
      gradient: 'from-gray-400/30 to-gray-300/30'
    },
    '03n': {
      image: '/images/cloudy-night.jpeg',
      gradient: 'from-gray-800/30 to-blue-900/30'
    },
    '04d': {
      image: '/images/clody.jpeg',
      gradient: 'from-gray-400/30 to-gray-300/30'
    },
    '04n': {
      image: '/images/cloudy-night.jpeg',
      gradient: 'from-gray-800/30 to-blue-900/30'
    },
    // Rain
    '09d': {
      image: '/images/rainy mrng.jpeg',
      gradient: 'from-gray-600/30 to-blue-700/30'
    },
    '09n': {
      image: '/images/rainy-night.jpg',
      gradient: 'from-gray-900/30 to-blue-800/30'
    },
    '10d': {
      image: '/images/rainy mrng.jpeg',
      gradient: 'from-gray-600/30 to-blue-700/30'
    },
    '10n': {
      image: '/images/rainy-night.jpg',
      gradient: 'from-gray-900/30 to-blue-800/30'
    },
    // Default
    default: {
      image: '/images/background.png',
      gradient: 'from-blue-400/30 to-blue-600/30'
    }
  };

  return backgrounds[weatherCode] || backgrounds.default;
};

