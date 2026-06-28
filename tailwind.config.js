/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        accent: '#06B6D4',
        coral: '#F87171',
        sky: {
          DEFAULT: '#4DA3FF',
          light: '#7BB8FF',
          dark: '#2B8AE8',
        },
        surface: {
          DEFAULT: '#E4E7EC',
          light: '#F0F2F5',
          dark: '#D5D9E0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neuro: '8px 8px 20px #c8ccd3, -8px -8px 20px #ffffff',
        'neuro-inset': 'inset 4px 4px 10px #c8ccd3, inset -4px -4px 10px #ffffff',
        'neuro-sm': '4px 4px 12px #c8ccd3, -4px -4px 12px #ffffff',
        glass: '0 8px 32px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
