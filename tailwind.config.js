/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
};
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        '1000': '1000px', // Adds a utility class `h-1000`
        '1200': '1200px', // Adds a utility class `h-1200`
      },
      maxHeight: {
        '1000': '1000px',
        '1200': '1200px'
      }
    },
  },
  plugins: [],
}