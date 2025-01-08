/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom colors that match your design
        'weather-blue': '#84cef5',
        'weather-pink': '#f06789',
        'weather-dark': '#1e2432',
      },
      boxShadow: {
        'weather': '0 5px 15px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-weather': 'linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  // Removed the forms plugin to resolve the error
  plugins: [],
}