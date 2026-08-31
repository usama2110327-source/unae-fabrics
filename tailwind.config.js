/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: '#d4af37',
        ink: '#1a1a2e',
        ember: '#e67e22',
        grape: '#5a4fcf',
        rose: '#c44569',
      },
    },
  },
  plugins: [],
};
