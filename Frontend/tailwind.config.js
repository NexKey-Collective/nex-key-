/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ff5a5f',
          light: '#ff7a7e',
          dark: '#e04a4f',
        },
        dark: '#101828',
        'dark-2': '#1e2939',
        'text-body': '#364153',
        'text-muted': '#6a7282',
        'text-faint': '#99a1af',
        'bg-light': '#f9fafb',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
