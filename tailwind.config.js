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
        brand: {
          DEFAULT: '#8B5E3C',
          light: '#C49A6C',
          dark: '#6B4423',
        },
        surface: {
          DEFAULT: '#F5F0EB',
          light: '#FAF7F4',
          dark: '#E8DFD6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neuro: '8px 8px 20px #d9cfc4, -8px -8px 20px #ffffff',
        'neuro-inset': 'inset 4px 4px 10px #d9cfc4, inset -4px -4px 10px #ffffff',
        'neuro-sm': '4px 4px 12px #d9cfc4, -4px -4px 12px #ffffff',
        glass: '0 8px 32px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
